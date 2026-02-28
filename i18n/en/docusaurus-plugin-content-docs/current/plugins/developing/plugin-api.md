---
sidebar_position: 2
title: Plugin API Reference
description: Full IFolderRewindPlugin interface reference, call sequence, and practical guidance
---

# Plugin API Reference

This page is based on the current implementation of `Reference/FolderRewind/FolderRewind/Services/Plugins/IFolderRewindPlugin.cs` and is intended to help you ship usable plugins quickly.

## Interface role

`IFolderRewindPlugin` is the main plugin entry for:

- Plugin metadata and setting definitions
- Lifecycle initialization
- Backup/restore hooks
- Config type discovery and batch creation
- (Optional) complete takeover of backup/restore

## Minimal implementation

```csharp
public class MyPlugin : IFolderRewindPlugin
{
    public PluginInstallManifest Manifest { get; } = new()
    {
        Id = "com.example.myplugin",
        Name = "MyPlugin",
        Version = "1.0.0",
        Author = "You",
        Description = "My first plugin"
    };

    public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
        => new List<PluginSettingDefinition>();

    public void Initialize(IReadOnlyDictionary<string, string> settingsValues) { }

    public string? OnBeforeBackupFolder(BackupConfig config, ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues)
        => null;

    public void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder,
        bool success, string? generatedArchiveFileName,
        IReadOnlyDictionary<string, string> settingsValues) { }

    public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(string selectedRootPath,
        IReadOnlyDictionary<string, string> settingsValues)
        => new List<ManagedFolder>();
}
```

## Member details

## `Manifest`

Used by UI, logs, and compatibility checks. Fill at least:

- `Id`: globally unique (reverse-domain style recommended)
- `Version`: semantic version
- `EntryAssembly`, `EntryType`: must match `manifest.json`
- `MinHostVersion`: minimum host version

## `GetSettingsDefinitions()`

Returns plugin setting definitions. Host stores user values and sends them back via `settingsValues`.

Practical advice:

- Keep key names stable after release
- Use string `"true"` / `"false"` for boolean defaults
- Describe purpose and side effects clearly

## `Initialize(settingsValues)`

Called once when plugin is enabled. Typical uses:

- Read/cache settings
- Warm up state
- One-time correction for historical configs

MineRewind reads `EnableHotBackup` and `PreservePlayerData` here and fixes related filters.

## `SetHostContext(hostContext)` (optional)

After host context injection, plugin can actively:

- `BroadcastEvent`
- `QueryKnotLinkAsync`
- `SubscribeSignal`
- `LogInfo/LogWarning/LogError`

## Backup hooks

### `OnBeforeBackupFolder(...)`

- Return `null`: use original source path
- Return new path: host uses returned path as backup source

Typical uses:

- Snapshot-directory replacement
- Notify external program to flush data before backup

### `OnBeforeBackupFolderAsync(...)`

Host prefers async version (default falls back to sync version).

Best for:

- KnotLink interaction via `PluginHostContext`
- Short async I/O tasks

### `OnAfterBackupFolder(...)`

For post actions:

- Clean temporary snapshots
- Write extra metadata
- Log backup results

## Restore hooks

### `OnBeforeRestoreFolder(...)`

Can return any state object (`object`) and pass it to post-restore hook.

MineRewind uses it to capture player data snapshots before restore.

### `OnAfterRestoreFolder(...)`

Receives pre-restore state for write-back and post-processing.

MineRewind writes preserved player data back to `level.dat` here.

## Config types and discovery

### `GetSupportedConfigTypes()` + `CanHandleConfigType(...)`

Define plugin-specific config types. MineRewind returns `Minecraft Saves`.

### `TryDiscoverManagedFolders(...)`

Given a selected path, plugin can auto-discover manageable folders.

### `TryCreateConfigs(...)`

Batch-create `BackupConfig` items. On handled success, return:

- `Handled = true`
- `CreatedConfigs = [...]`
- optional `Message`

## Full takeover (advanced)

When these return `true`, host bypasses built-in engine:

- `WantsToHandleBackup(config)`
- `WantsToHandleRestore(config)`

Then host calls:

- `PerformBackupAsync(...)` -> `PluginBackupResult`
- `PerformRestoreAsync(...)` -> `PluginRestoreResult`

Use this when you need custom archive formats, remote storage, or special verification.

## Simplified call sequence

1. Enable plugin -> `Initialize`
2. Config creation stage -> `TryDiscoverManagedFolders` / `TryCreateConfigs`
3. Backup stage
   - If takeover: `PerformBackupAsync`
   - Otherwise: `OnBefore...` -> built-in backup -> `OnAfter...`
4. Restore stage is similar

## Common pitfalls

- Blocking too long in hooks
- Unhandled exceptions affecting user experience
- Non-robust `settingsValues` parsing
- Too-wide version compatibility declaration

## Related links

- [Plugin Development Quick Start](./quick-start)
- [Hotkey API](./hotkey-api)
- [KnotLink Command API](./knotlink-api)
- [Minecraft Guide Overview](../../guides/minecraft/overview)
