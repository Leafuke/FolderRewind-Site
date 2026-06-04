---
sidebar_position: 2
title: "Tutorial: Building a Game Save Backup Plugin"
description: Build a complete game save backup plugin from scratch, covering all core APIs
---

# Tutorial: Building a Game Save Backup Plugin

In this tutorial, we will build a plugin called **GameRewind** from scratch. It can:

- Auto-discover save directories for common games
- Create snapshots before backup to avoid file locks
- Filter out cache files that don't need backing up
- Preserve user custom settings during restore
- Register hotkeys for one-key backup/restore
- Accept remote commands via KnotLink

After completion, you will have mastered all core capabilities of FolderRewind plugin development.

:::prerequisites
- Completed the environment setup in [Plugin Development Quick Start](./quick-start)
- Familiar with basic C# syntax
:::

## 0. Project Initialization

### Create the project

```powershell
dotnet new classlib -n GameRewind -f net10.0
```

### Write manifest.json

```json
{
  "Id": "com.example.gamerewind",
  "Name": "GameRewind",
  "Version": "1.0.0",
  "Author": "YourName",
  "Description": "Universal game save backup plugin: auto-discover saves, hot backup, hotkeys, remote commands",
  "EntryAssembly": "GameRewind.dll",
  "EntryType": "GameRewind.GameRewindPlugin"
}
```

### Create the main class skeleton

```csharp
using FolderRewind.Models;
using FolderRewind.Services.Plugins;

namespace GameRewind
{
    public class GameRewindPlugin : IFolderRewindPlugin
    {
        public PluginInstallManifest Manifest { get; } = new()
        {
            Id = "com.example.gamerewind",
            Name = "GameRewind",
            Version = "1.0.0",
            Author = "YourName",
            Description = "Universal game save backup plugin",
            EntryAssembly = "GameRewind.dll",
            EntryType = "GameRewind.GameRewindPlugin"
        };

        public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
            => new List<PluginSettingDefinition>();

        public void Initialize(IReadOnlyDictionary<string, string> settingsValues) { }

        public string? OnBeforeBackupFolder(BackupConfig config, ManagedFolder folder,
            IReadOnlyDictionary<string, string> settingsValues) => null;

        public void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder,
            bool success, string? generatedArchiveFileName,
            IReadOnlyDictionary<string, string> settingsValues) { }

        public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(string selectedRootPath,
            IReadOnlyDictionary<string, string> settingsValues)
            => new List<ManagedFolder>();
    }
}
```

> **MineRewind comparison:** MineRewind's main class `MinecraftSavesPlugin` also starts from the same skeleton, except the Manifest Id is `com.folderrewind.minerewind`.

## 1. Config Type Registration & Auto-Discovery

Tell FolderRewind that the plugin can manage "game saves" config types, and automatically scan the user-selected directory.

### Register config types

```csharp
// Add to the GameRewindPlugin class

private const string ConfigTypeName = "Game Saves";

public IReadOnlyList<string> GetSupportedConfigTypes()
{
    return new[] { ConfigTypeName };
}

public bool CanHandleConfigType(string configType)
{
    return string.Equals(configType, ConfigTypeName, StringComparison.OrdinalIgnoreCase);
}
```

> **MineRewind comparison:** MineRewind uses `"Minecraft Saves"` as the config type name, implemented in `MinecraftSavesPlugin.Discovery.cs`.

### Auto-discover save directories

When a user selects a root directory, FolderRewind calls `TryDiscoverManagedFolders`, letting the plugin return a list of manageable folders:

```csharp
public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(
    string selectedRootPath,
    IReadOnlyDictionary<string, string> settingsValues)
{
    var results = new List<ManagedFolder>();

    if (string.IsNullOrWhiteSpace(selectedRootPath) || !Directory.Exists(selectedRootPath))
        return results;

    // Scan subdirectories for game saves containing specific marker files
    foreach (var subDir in Directory.EnumerateDirectories(selectedRootPath))
    {
        // Detection method 1: directories containing save.dat or world.dat are treated as game saves
        if (File.Exists(Path.Combine(subDir, "save.dat")) ||
            File.Exists(Path.Combine(subDir, "world.dat")))
        {
            results.Add(new ManagedFolder
            {
                Path = subDir,
                DisplayName = Path.GetFileName(subDir),
                Description = "Game save"
            });
        }

        // Detection method 2: games with a saves subdirectory (similar to Minecraft structure)
        var savesDir = Path.Combine(subDir, "saves");
        if (Directory.Exists(savesDir))
        {
            foreach (var worldDir in Directory.EnumerateDirectories(savesDir))
            {
                if (File.Exists(Path.Combine(worldDir, "save.dat")))
                {
                    results.Add(new ManagedFolder
                    {
                        Path = worldDir,
                        DisplayName = $"{Path.GetFileName(subDir)} / {Path.GetFileName(worldDir)}",
                        Description = $"Game save ({Path.GetFileName(subDir)})"
                    });
                }
            }
        }
    }

    return results;
}
```

> **MineRewind comparison:** MineRewind implements more complex discovery logic in `MinecraftSavesPlugin.Discovery.cs` -- it recognizes `.minecraft` directories, `saves` subdirectories, multi-version `versions` directory structures, and automatically creates `ManagedFolder` entries.

### Batch create configs

`TryCreateConfigs` lets users create backup configs in one click instead of adding them manually one by one:

```csharp
public PluginCreateConfigResult TryCreateConfigs(
    string selectedRootPath,
    IReadOnlyDictionary<string, string> settingsValues)
{
    var discovered = TryDiscoverManagedFolders(selectedRootPath, settingsValues);
    if (discovered.Count == 0)
    {
        return new PluginCreateConfigResult { Handled = false };
    }

    var config = new BackupConfig
    {
        Name = $"Game Saves - {Path.GetFileName(selectedRootPath)}",
        ConfigType = ConfigTypeName,
    };

    foreach (var folder in discovered)
    {
        config.SourceFolders.Add(folder);
    }

    return new PluginCreateConfigResult
    {
        Handled = true,
        CreatedConfigs = new[] { config },
        Message = $"Discovered {discovered.Count} game saves"
    };
}
```

> **MineRewind comparison:** MineRewind's `TryCreateConfigs` is more complex -- it creates multiple configs grouped by Minecraft version, each containing the corresponding version's saves and mods folders. See `MinecraftSavesPlugin.Discovery.cs:52-93`.

## 2. Backup Hooks: Snapshots & Filtering

### Before backup: create a snapshot

`OnBeforeBackupFolder` is called before each backup. Return `null` to use the original path; return a new path to replace the backup source.

We use it to create a directory snapshot, avoiding file lock issues while a game is running:

```csharp
private string? _currentSnapshotDir;

public string? OnBeforeBackupFolder(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues)
{
    if (!CanHandleConfigType(config.ConfigType))
        return null;

    // Create a temporary snapshot directory
    var snapshotDir = Path.Combine(Path.GetTempPath(), $"gamerewind_snapshot_{Guid.NewGuid():N}");
    try
    {
        // Use xcopy to copy (preserve directory structure, skip locked files)
        var process = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
        {
            FileName = "xcopy",
            Arguments = $"\"{folder.Path}\" \"{snapshotDir}\" /E /I /Q /Y",
            UseShellExecute = false,
            CreateNoWindow = true
        });
        process?.WaitForExit(30_000);

        if (Directory.Exists(snapshotDir))
        {
            _currentSnapshotDir = snapshotDir;
            return snapshotDir; // Tell the Host to use the snapshot directory as the backup source
        }
    }
    catch
    {
        // Fall back to original path if snapshot fails
        try { if (Directory.Exists(snapshotDir)) Directory.Delete(snapshotDir, true); } catch { }
    }

    return null; // Fall back to original path
}
```

### After backup: clean up the snapshot

```csharp
public void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder,
    bool success, string? generatedArchiveFileName,
    IReadOnlyDictionary<string, string> settingsValues)
{
    // Clean up the temporary snapshot
    if (!string.IsNullOrEmpty(_currentSnapshotDir) && Directory.Exists(_currentSnapshotDir))
    {
        try { Directory.Delete(_currentSnapshotDir, true); } catch { }
        _currentSnapshotDir = null;
    }
}
```

> **MineRewind comparison:** MineRewind's `OnBeforeBackupFolder` (`MinecraftSavesPlugin.Snapshot.cs`) not only creates a snapshot, but also notifies the Minecraft companion mod via KnotLink to perform a world save before backup, ensuring data consistency.

### Filter unwanted files

Implement `IFolderRewindBackupFilterProvider` to exclude cache and temporary files:

```csharp
using FolderRewind.Services.Plugins;

public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider
{
    // ... previous code ...

    public PluginBackupFilterContribution? GetBackupFilterContribution(
        BackupConfig config,
        ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues)
    {
        if (!CanHandleConfigType(config.ConfigType))
            return null;

        // Exclude common cache and temporary files
        return new PluginBackupFilterContribution
        {
            UseWhitelistMode = false,
            BackupBlacklist = new[]
            {
                "*.tmp",
                "*.log",
                "cache",
                "__pycache__",
                ".cache"
            }
        };
    }
}
```

> **MineRewind comparison:** MineRewind uses a blacklist to exclude `session.lock`, `voxy`, `DistantHorizons.sqlite`, etc., and uses a restore whitelist to ensure these files are not deleted during restore. See `MinecraftSavesPlugin.cs:171-197`.

## 3. Restore Hooks: Preserving User Data

Some games store user custom settings (such as key bindings, graphics options) in save files. These settings would be lost when restoring a backup.

`OnBeforeRestoreFolder` and `OnAfterRestoreFolder` work together to extract this data before restore and write it back afterward.

```csharp
public object? OnBeforeRestoreFolder(BackupConfig config, ManagedFolder folder,
    string archiveFileName, IReadOnlyDictionary<string, string> settingsValues)
{
    if (!CanHandleConfigType(config.ConfigType))
        return null;

    // Extract user config files that need to be preserved
    var settingsFile = Path.Combine(folder.Path, "user_settings.json");
    if (!File.Exists(settingsFile))
        return null;

    try
    {
        var content = File.ReadAllText(settingsFile);
        return content; // Passed as state to OnAfterRestoreFolder
    }
    catch
    {
        return null;
    }
}

public void OnAfterRestoreFolder(BackupConfig config, ManagedFolder folder,
    bool success, string archiveFileName, object? state,
    IReadOnlyDictionary<string, string> settingsValues)
{
    if (!success || state is not string settingsContent)
        return;

    if (!CanHandleConfigType(config.ConfigType))
        return;

    // Write back the previously saved user config
    var settingsFile = Path.Combine(folder.Path, "user_settings.json");
    try
    {
        File.WriteAllText(settingsFile, settingsContent);
    }
    catch (Exception ex)
    {
        // Failure to write back does not affect the restore result; just log
    }
}
```

**State passing mechanism:** The `object` returned by `OnBeforeRestoreFolder` is passed as-is to the `state` parameter of `OnAfterRestoreFolder`. Returning `null` means no post-restore processing is needed.

> **MineRewind comparison:** MineRewind extracts Minecraft `level.dat` player data (position, inventory) in `OnBeforeRestoreFolder` (`MinecraftSavesPlugin.Restore.cs`) and writes it back in `OnAfterRestoreFolder`. It uses a dedicated `NbtHelper.PlayerDataSnapshot` type as the state.

## 4. Plugin Settings

Declare user-configurable options via `GetSettingsDefinitions`. FolderRewind will automatically render the settings UI and pass back user-entered values when calling plugin methods.

```csharp
private const string ExcludePatternsKey = "ExcludePatterns";
private const string EnableHotBackupKey = "EnableHotBackup";

private bool _enableHotBackup = true;
private List<string> _excludePatterns = new();

public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
{
    return new List<PluginSettingDefinition>
    {
        new()
        {
            Key = EnableHotBackupKey,
            DisplayName = "Enable hot backup",
            Description = "Create snapshots for backup while the game is running (requires more disk space)",
            Type = PluginSettingType.Boolean,
            DefaultValue = "true",
            IsRequired = false
        },
        new()
        {
            Key = ExcludePatternsKey,
            DisplayName = "Additional exclusion rules",
            Description = "One wildcard pattern per line; matching files will not be backed up",
            Type = PluginSettingType.MultilineString,
            DefaultValue = "",
            IsRequired = false
        }
    };
}

public void Initialize(IReadOnlyDictionary<string, string> settingsValues)
{
    // Read settings
    _enableHotBackup = settingsValues.TryGetValue(EnableHotBackupKey, out var v)
        && string.Equals(v, "true", StringComparison.OrdinalIgnoreCase);

    _excludePatterns = settingsValues.TryGetValue(ExcludePatternsKey, out var patterns)
        ? patterns.Split('\n', StringSplitOptions.RemoveEmptyEntries).ToList()
        : new List<string>();
}
```

**PluginSettingType enum values:**

| Value | Rendered control | Description |
|----|----------|------|
| `String` | Text box | Single-line text |
| `Boolean` | Toggle switch | `"true"` / `"false"` |
| `Integer` | Number input | Integer value |
| `Path` | Folder picker | Directory path |
| `MultilineString` | Multiline text box | Multi-line text |

> **MineRewind comparison:** MineRewind defines two boolean settings, `EnableHotBackup` and `PreservePlayerData`, read and cached in `Initialize`. See `MinecraftSavesPlugin.cs:123-161`.

## 5. Hotkeys

Implement `IFolderRewindHotkeyProvider` to register hotkeys:

```csharp
public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider,
    IFolderRewindHotkeyProvider
{
    // ... previous code ...

    public IReadOnlyList<PluginHotkeyDefinition> GetHotkeyDefinitions()
    {
        return new List<PluginHotkeyDefinition>
        {
            new()
            {
                Id = "gamerewind.quick_backup",
                DisplayName = "Quick backup current game",
                Description = "One-key backup of the running game's saves",
                DefaultGesture = "Ctrl+Shift+B",
                IsGlobalHotkey = true
            },
            new()
            {
                Id = "gamerewind.quick_restore",
                DisplayName = "Quick restore current game",
                Description = "One-key restore of the most recent game save backup",
                DefaultGesture = "Ctrl+Shift+R",
                IsGlobalHotkey = true
            }
        };
    }

    public async Task OnHotkeyInvokedAsync(
        string hotkeyId,
        bool isGlobalHotkey,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext)
    {
        switch (hotkeyId)
        {
            case "gamerewind.quick_backup":
                await HandleQuickBackupAsync(hostContext);
                break;
            case "gamerewind.quick_restore":
                await HandleQuickRestoreAsync(hostContext);
                break;
        }
    }

    private async Task HandleQuickBackupAsync(PluginHostContext hostContext)
    {
        // Find the currently active game config and trigger backup
        hostContext.LogInfo("Hotkey triggered: quick backup");
        // ... backup logic ...
    }

    private async Task HandleQuickRestoreAsync(PluginHostContext hostContext)
    {
        hostContext.LogInfo("Hotkey triggered: quick restore");
        // ... restore logic ...
    }
}
```

**Global hotkeys vs. in-app shortcuts:**
- `IsGlobalHotkey = true`: Can be triggered even when FolderRewind is not in the foreground (via system `RegisterHotKey`)
- `IsGlobalHotkey = false`: Only effective within the FolderRewind window (via `KeyboardAccelerator`)

> **MineRewind comparison:** MineRewind registers two global hotkeys: `Alt+Ctrl+S` (backup) and `Alt+Ctrl+Z` (restore). The hotkey callbacks automatically detect the currently active Minecraft world. See `MinecraftSavesPlugin.Hotkeys.cs`.

## 6. KnotLink Remote Commands

Implement `IFolderRewindKnotLinkCommandHandler` to extend FolderRewind's remote command set. External tools (such as game mods, scripts) can send commands via the KnotLink TCP protocol.

```csharp
public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider,
    IFolderRewindHotkeyProvider, IFolderRewindKnotLinkCommandHandler
{
    // ... previous code ...

    private PluginHostContext? _hostContext;

    public void SetHostContext(PluginHostContext hostContext)
    {
        _hostContext = hostContext;
    }

    public IReadOnlyList<PluginKnotLinkCommandDefinition> GetKnotLinkCommandDefinitions()
    {
        return new List<PluginKnotLinkCommandDefinition>
        {
            new() { Command = "GAME_BACKUP", Description = "Backup the currently active game save" },
            new() { Command = "GAME_RESTORE_LATEST", Description = "Restore the most recent game save backup" },
            new() { Command = "GAME_LIST_BACKUPS", Description = "List all game save backups" }
        };
    }

    public Task<string?> TryHandleKnotLinkCommandAsync(
        string command,
        string args,
        string rawCommand,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext)
    {
        return command.ToUpperInvariant() switch
        {
            "GAME_BACKUP" => HandleGameBackupAsync(args, hostContext),
            "GAME_RESTORE_LATEST" => HandleGameRestoreLatestAsync(hostContext),
            "GAME_LIST_BACKUPS" => HandleGameListBackupsAsync(hostContext),
            _ => Task.FromResult<string?>(null) // null = this command is not handled
        };
    }

    private Task<string?> HandleGameBackupAsync(string args, PluginHostContext hostContext)
    {
        try
        {
            // Execute backup asynchronously, return OK immediately
            _ = Task.Run(async () =>
            {
                try
                {
                    // ... backup logic ...
                    hostContext.LogInfo("Remote backup completed");
                    hostContext.BroadcastEvent("event=game_backup_complete;status=success");
                }
                catch (Exception ex)
                {
                    hostContext.LogError($"Remote backup failed: {ex.Message}");
                }
            });

            return Task.FromResult<string?>("OK:Backup started");
        }
        catch (Exception ex)
        {
            return Task.FromResult<string?>($"ERROR:{ex.Message}");
        }
    }

    private Task<string?> HandleGameRestoreLatestAsync(PluginHostContext hostContext)
    {
        try
        {
            _ = Task.Run(async () =>
            {
                try
                {
                    // ... restore logic ...
                    hostContext.LogInfo("Remote restore completed");
                    hostContext.BroadcastEvent("event=game_restore_complete;status=success");
                }
                catch (Exception ex)
                {
                    hostContext.LogError($"Remote restore failed: {ex.Message}");
                }
            });

            return Task.FromResult<string?>("OK:Restore started");
        }
        catch (Exception ex)
        {
            return Task.FromResult<string?>($"ERROR:{ex.Message}");
        }
    }

    private Task<string?> HandleGameListBackupsAsync(PluginHostContext hostContext)
    {
        // Quick operations can return synchronously
        var backups = new[] { "backup_001.7z", "backup_002.7z" };
        return Task.FromResult<string?>($"OK:{string.Join(';', backups)}");
    }
}
```

**Return value conventions:**
- Return `null`: This plugin does not handle this command; the Host continues to try other handlers
- Return `"OK:..."`: Command accepted
- Return `"ERROR:..."`: Command failed

**PluginHostContext common APIs:**

| Method | Purpose |
|------|------|
| `LogInfo(message)` | Log an info message |
| `LogWarning(message)` | Log a warning message |
| `LogError(message, ex?)` | Log an error message |
| `BroadcastEvent(eventData)` | Broadcast a KnotLink event |
| `QueryKnotLinkAsync(question, timeoutMs)` | Request-response style query |
| `SubscribeSignal(signalId, onSignal)` | Subscribe to a signal channel |

> **MineRewind comparison:** MineRewind implements commands such as `BACKUP_CURRENT`, `RESTORE_CURRENT_LATEST`, `LIST_BACKUPS_CURRENT`, `RESTORE_CURRENT`, and `RESTORE_CURRENT_WITH_DATA`, and handles handshakes and status signals from the Minecraft companion mod. See `MinecraftSavesPlugin.KnotLink.cs`.

## 7. Packaging & Publishing

```powershell
# Build
dotnet publish -c Release -o ./publish

# Package
$staging = "staging/GameRewind"
New-Item -ItemType Directory -Path $staging -Force
Copy-Item -Path "./publish/*" -Destination $staging -Recurse
Copy-Item -Path "./manifest.json" -Destination $staging
Compress-Archive -Path "./staging/GameRewind" -DestinationPath "./GameRewind.zip" -Force
Remove-Item -Path "./staging" -Recurse -Force
```

Final ZIP structure:

```text
GameRewind.zip
└─ GameRewind/
   ├─ manifest.json
   └─ GameRewind.dll
```

After installing into FolderRewind, verify the plugin has loaded in the plugin management UI, then:

1. Create a game saves type backup config
2. Test the auto-discovery feature
3. Trigger a backup and verify that snapshots and filtering work correctly
4. Trigger a restore and verify that user data preservation works correctly
5. Test the hotkeys
6. Send commands via KnotLink to test

## Complete Source Code

The complete GameRewind plugin source code includes the following members:

- `IFolderRewindPlugin` -- Core interface (Manifest, settings, initialization, backup/restore hooks, config discovery)
- `IFolderRewindBackupFilterProvider` -- Backup filtering (exclude cache files)
- `IFolderRewindHotkeyProvider` -- Hotkeys (Ctrl+Shift+B/R)
- `IFolderRewindKnotLinkCommandHandler` -- Remote commands (GAME_BACKUP, etc.)

The code snippets from each section above combine into a complete, runnable plugin. It is recommended to implement them step by step in order, packaging and testing after each step.

## Next Steps

- [Plugin API Reference](./plugin-api) -- Full interface documentation and advanced usage
- [Hotkey API](./hotkey-api) -- Advanced hotkey topics
- [KnotLink Command API](./knotlink-api) -- Advanced remote command topics
- [MineRewind source](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft) -- A more complex official reference implementation
