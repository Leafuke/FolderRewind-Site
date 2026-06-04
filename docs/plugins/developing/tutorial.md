---
sidebar_position: 2
title: 实战教程：构建游戏存档备份插件
description: 从零开始构建一个通用游戏存档备份插件，覆盖所有核心 API
---

# 实战教程：构建游戏存档备份插件

在本教程中，我们将从零构建一个名为 **GameRewind** 的插件。它能：

- 自动发现常见游戏的存档目录
- 在备份前创建快照，避免文件占用
- 过滤掉不需要备份的缓存文件
- 在还原时保留用户的自定义配置
- 注册快捷键一键备份/还原
- 通过 KnotLink 接受远程命令

完成后，你将掌握 FolderRewind 插件开发的全部核心能力。

:::prerequisites
- 已完成 [插件开发快速上手](./quick-start) 中的环境配置
- 了解 C# 基础语法
:::

## 0. 项目初始化

### 创建项目

```powershell
dotnet new classlib -n GameRewind -f net10.0
```

### 编写 manifest.json

```json
{
  "Id": "com.example.gamerewind",
  "Name": "GameRewind",
  "Version": "1.0.0",
  "Author": "YourName",
  "Description": "通用游戏存档备份插件：自动发现存档、热备份、快捷键、远程命令",
  "EntryAssembly": "GameRewind.dll",
  "EntryType": "GameRewind.GameRewindPlugin"
}
```

### 创建主类骨架

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
            Description = "通用游戏存档备份插件",
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

> **MineRewind 对比：** MineRewind 的主类 `MinecraftSavesPlugin` 也从同样的骨架开始，只是 Manifest 的 Id 为 `com.folderrewind.minerewind`。

## 1. 定义配置类型与自动发现

让插件告诉 FolderRewind「我能管理游戏存档类型的配置」，并自动扫描用户选择的目录。

### 注册配置类型

```csharp
// 在 GameRewindPlugin 类中添加

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

> **MineRewind 对比：** MineRewind 使用 `"Minecraft Saves"` 作为配置类型名，在 `MinecraftSavesPlugin.Discovery.cs` 中实现。

### 自动发现存档目录

当用户选择一个根目录时，FolderRewind 会调用 `TryDiscoverManagedFolders`，让插件返回可管理的文件夹列表：

```csharp
public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(
    string selectedRootPath,
    IReadOnlyDictionary<string, string> settingsValues)
{
    var results = new List<ManagedFolder>();

    if (string.IsNullOrWhiteSpace(selectedRootPath) || !Directory.Exists(selectedRootPath))
        return results;

    // 扫描子目录，查找包含特定标记文件的游戏存档
    foreach (var subDir in Directory.EnumerateDirectories(selectedRootPath))
    {
        // 检测方法 1：包含 save.dat 或 world.dat 的目录视为游戏存档
        if (File.Exists(Path.Combine(subDir, "save.dat")) ||
            File.Exists(Path.Combine(subDir, "world.dat")))
        {
            results.Add(new ManagedFolder
            {
                Path = subDir,
                DisplayName = Path.GetFileName(subDir),
                Description = "游戏存档"
            });
        }

        // 检测方法 2：包含 saves 子目录的游戏（类似 Minecraft 结构）
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
                        Description = $"游戏存档（{Path.GetFileName(subDir)}）"
                    });
                }
            }
        }
    }

    return results;
}
```

> **MineRewind 对比：** MineRewind 在 `MinecraftSavesPlugin.Discovery.cs` 中实现了更复杂的发现逻辑——它能识别 `.minecraft` 目录、`saves` 子目录、`versions` 多版本目录结构，并自动创建 `ManagedFolder`。

### 批量创建配置

`TryCreateConfigs` 让用户一键创建备份配置，而不是手动逐个添加：

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
        Message = $"已发现 {discovered.Count} 个游戏存档"
    };
}
```

> **MineRewind 对比：** MineRewind 的 `TryCreateConfigs` 更复杂——它会按 Minecraft 版本分组创建多个配置，每个配置包含对应版本的存档和 mods 文件夹。参见 `MinecraftSavesPlugin.Discovery.cs:52-93`。

## 2. 备份钩子：快照与过滤

### 备份前：创建快照

`OnBeforeBackupFolder` 在每次备份前调用。返回 `null` 表示使用原始路径；返回新路径则替换备份源。

我们用它来创建目录快照，避免游戏运行时的文件占用问题：

```csharp
private string? _currentSnapshotDir;

public string? OnBeforeBackupFolder(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues)
{
    if (!CanHandleConfigType(config.ConfigType))
        return null;

    // 创建临时快照目录
    var snapshotDir = Path.Combine(Path.GetTempPath(), $"gamerewind_snapshot_{Guid.NewGuid():N}");
    try
    {
        // 使用 xcopy 复制（保留目录结构，跳过锁定文件）
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
            return snapshotDir; // 告诉 Host 使用快照目录作为备份源
        }
    }
    catch
    {
        // 快照失败时回退到原始路径
        try { if (Directory.Exists(snapshotDir)) Directory.Delete(snapshotDir, true); } catch { }
    }

    return null; // 回退到原始路径
}
```

### 备份后：清理快照

```csharp
public void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder,
    bool success, string? generatedArchiveFileName,
    IReadOnlyDictionary<string, string> settingsValues)
{
    // 清理临时快照
    if (!string.IsNullOrEmpty(_currentSnapshotDir) && Directory.Exists(_currentSnapshotDir))
    {
        try { Directory.Delete(_currentSnapshotDir, true); } catch { }
        _currentSnapshotDir = null;
    }
}
```

> **MineRewind 对比：** MineRewind 的 `OnBeforeBackupFolder`（`MinecraftSavesPlugin.Snapshot.cs`）不仅创建快照，还会在备份前通过 KnotLink 通知 Minecraft 联动模组执行世界保存，确保数据一致性。

### 过滤不需要的文件

实现 `IFolderRewindBackupFilterProvider` 来排除缓存和临时文件：

```csharp
using FolderRewind.Services.Plugins;

public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider
{
    // ... 之前的代码 ...

    public PluginBackupFilterContribution? GetBackupFilterContribution(
        BackupConfig config,
        ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues)
    {
        if (!CanHandleConfigType(config.ConfigType))
            return null;

        // 排除常见的缓存和临时文件
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

> **MineRewind 对比：** MineRewind 使用黑名单排除 `session.lock`、`voxy`、`DistantHorizons.sqlite` 等文件，同时使用还原白名单确保这些文件在还原时不被删除。参见 `MinecraftSavesPlugin.cs:171-197`。

## 3. 还原钩子：保留用户数据

有些游戏在存档中保存用户自定义设置（如按键绑定、画质选项）。还原备份时这些设置会丢失。

`OnBeforeRestoreFolder` 和 `OnAfterRestoreFolder` 配合使用，可以在还原前提取这些数据，还原后写回。

```csharp
public object? OnBeforeRestoreFolder(BackupConfig config, ManagedFolder folder,
    string archiveFileName, IReadOnlyDictionary<string, string> settingsValues)
{
    if (!CanHandleConfigType(config.ConfigType))
        return null;

    // 提取需要保留的用户配置文件
    var settingsFile = Path.Combine(folder.Path, "user_settings.json");
    if (!File.Exists(settingsFile))
        return null;

    try
    {
        var content = File.ReadAllText(settingsFile);
        return content; // 作为 state 传递给 OnAfterRestoreFolder
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

    // 将之前保存的用户配置写回
    var settingsFile = Path.Combine(folder.Path, "user_settings.json");
    try
    {
        File.WriteAllText(settingsFile, settingsContent);
    }
    catch (Exception ex)
    {
        // 写回失败不影响还原结果，仅记录日志
    }
}
```

**state 传递机制：** `OnBeforeRestoreFolder` 返回的 `object` 会原样传递给 `OnAfterRestoreFolder` 的 `state` 参数。返回 `null` 表示不需要还原后处理。

> **MineRewind 对比：** MineRewind 在 `OnBeforeRestoreFolder`（`MinecraftSavesPlugin.Restore.cs`）中提取 Minecraft 的 `level.dat` 玩家数据（位置、物品栏），在 `OnAfterRestoreFolder` 中写回。它使用专门的 `NbtHelper.PlayerDataSnapshot` 类型作为 state。

## 4. 插件设置

通过 `GetSettingsDefinitions` 声明用户可配置的选项。FolderRewind 会自动渲染设置界面，并在调用插件方法时传回用户填写的值。

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
            DisplayName = "启用热备份",
            Description = "在游戏运行时创建快照进行备份（需要更多磁盘空间）",
            Type = PluginSettingType.Boolean,
            DefaultValue = "true",
            IsRequired = false
        },
        new()
        {
            Key = ExcludePatternsKey,
            DisplayName = "额外排除规则",
            Description = "每行一个通配符模式，匹配的文件不会被备份",
            Type = PluginSettingType.MultilineString,
            DefaultValue = "",
            IsRequired = false
        }
    };
}

public void Initialize(IReadOnlyDictionary<string, string> settingsValues)
{
    // 读取设置
    _enableHotBackup = settingsValues.TryGetValue(EnableHotBackupKey, out var v)
        && string.Equals(v, "true", StringComparison.OrdinalIgnoreCase);

    _excludePatterns = settingsValues.TryGetValue(ExcludePatternsKey, out var patterns)
        ? patterns.Split('\n', StringSplitOptions.RemoveEmptyEntries).ToList()
        : new List<string>();
}
```

**PluginSettingType 枚举值：**

| 值 | 渲染控件 | 说明 |
|----|----------|------|
| `String` | 文本框 | 单行文本 |
| `Boolean` | 开关 | `"true"` / `"false"` |
| `Integer` | 数字输入 | 整数值 |
| `Path` | 文件夹选择器 | 目录路径 |
| `MultilineString` | 多行文本框 | 多行文本 |

> **MineRewind 对比：** MineRewind 定义了 `EnableHotBackup` 和 `PreservePlayerData` 两个布尔设置，在 `Initialize` 中读取并缓存。参见 `MinecraftSavesPlugin.cs:123-161`。

## 5. 快捷键

实现 `IFolderRewindHotkeyProvider` 来注册快捷键：

```csharp
public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider,
    IFolderRewindHotkeyProvider
{
    // ... 之前的代码 ...

    public IReadOnlyList<PluginHotkeyDefinition> GetHotkeyDefinitions()
    {
        return new List<PluginHotkeyDefinition>
        {
            new()
            {
                Id = "gamerewind.quick_backup",
                DisplayName = "快速备份当前游戏",
                Description = "一键备份正在运行的游戏存档",
                DefaultGesture = "Ctrl+Shift+B",
                IsGlobalHotkey = true
            },
            new()
            {
                Id = "gamerewind.quick_restore",
                DisplayName = "快速还原当前游戏",
                Description = "一键还原最近的游戏存档备份",
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
        // 查找当前活跃的游戏配置并触发备份
        hostContext.LogInfo("快捷键触发：快速备份");
        // ... 备份逻辑 ...
    }

    private async Task HandleQuickRestoreAsync(PluginHostContext hostContext)
    {
        hostContext.LogInfo("快捷键触发：快速还原");
        // ... 还原逻辑 ...
    }
}
```

**全局热键 vs 应用内快捷键：**
- `IsGlobalHotkey = true`：即使 FolderRewind 不在前台也能触发（通过系统 `RegisterHotKey`）
- `IsGlobalHotkey = false`：仅在 FolderRewind 窗口内有效（通过 `KeyboardAccelerator`）

> **MineRewind 对比：** MineRewind 注册了 `Alt+Ctrl+S`（备份）和 `Alt+Ctrl+Z`（还原）两个全局热键。热键回调中会自动检测当前活跃的 Minecraft 世界。参见 `MinecraftSavesPlugin.Hotkeys.cs`。

## 6. KnotLink 远程命令

实现 `IFolderRewindKnotLinkCommandHandler` 来扩展 FolderRewind 的远程命令集。外部工具（如游戏模组、脚本）可以通过 KnotLink TCP 协议发送命令。

```csharp
public class GameRewindPlugin : IFolderRewindPlugin, IFolderRewindBackupFilterProvider,
    IFolderRewindHotkeyProvider, IFolderRewindKnotLinkCommandHandler
{
    // ... 之前的代码 ...

    private PluginHostContext? _hostContext;

    public void SetHostContext(PluginHostContext hostContext)
    {
        _hostContext = hostContext;
    }

    public IReadOnlyList<PluginKnotLinkCommandDefinition> GetKnotLinkCommandDefinitions()
    {
        return new List<PluginKnotLinkCommandDefinition>
        {
            new() { Command = "GAME_BACKUP", Description = "备份当前活跃游戏存档" },
            new() { Command = "GAME_RESTORE_LATEST", Description = "还原最近的游戏存档备份" },
            new() { Command = "GAME_LIST_BACKUPS", Description = "列出所有游戏存档备份" }
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
            _ => Task.FromResult<string?>(null) // null = 不处理此命令
        };
    }

    private Task<string?> HandleGameBackupAsync(string args, PluginHostContext hostContext)
    {
        try
        {
            // 异步执行备份，立即返回 OK
            _ = Task.Run(async () =>
            {
                try
                {
                    // ... 备份逻辑 ...
                    hostContext.LogInfo("远程备份完成");
                    hostContext.BroadcastEvent("event=game_backup_complete;status=success");
                }
                catch (Exception ex)
                {
                    hostContext.LogError($"远程备份失败: {ex.Message}");
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
                    // ... 还原逻辑 ...
                    hostContext.LogInfo("远程还原完成");
                    hostContext.BroadcastEvent("event=game_restore_complete;status=success");
                }
                catch (Exception ex)
                {
                    hostContext.LogError($"远程还原失败: {ex.Message}");
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
        // 快速操作可同步返回
        var backups = new[] { "backup_001.7z", "backup_002.7z" };
        return Task.FromResult<string?>($"OK:{string.Join(';', backups)}");
    }
}
```

**返回值约定：**
- 返回 `null`：本插件不处理此命令，Host 继续尝试其他处理者
- 返回 `"OK:..."` ：命令已接受
- 返回 `"ERROR:..."`：命令失败

**PluginHostContext 常用 API：**

| 方法 | 用途 |
|------|------|
| `LogInfo(message)` | 记录信息日志 |
| `LogWarning(message)` | 记录警告日志 |
| `LogError(message, ex?)` | 记录错误日志 |
| `BroadcastEvent(eventData)` | 广播 KnotLink 事件 |
| `QueryKnotLinkAsync(question, timeoutMs)` | 请求-响应式查询 |
| `SubscribeSignal(signalId, onSignal)` | 订阅信号通道 |

> **MineRewind 对比：** MineRewind 实现了 `BACKUP_CURRENT`、`RESTORE_CURRENT_LATEST`、`LIST_BACKUPS_CURRENT`、`RESTORE_CURRENT`、`RESTORE_CURRENT_WITH_DATA` 等命令，并处理来自 Minecraft 联动模组的握手和状态信号。参见 `MinecraftSavesPlugin.KnotLink.cs`。

## 7. 打包与发布

```powershell
# 编译
dotnet publish -c Release -o ./publish

# 打包
$staging = "staging/GameRewind"
New-Item -ItemType Directory -Path $staging -Force
Copy-Item -Path "./publish/*" -Destination $staging -Recurse
Copy-Item -Path "./manifest.json" -Destination $staging
Compress-Archive -Path "./staging/GameRewind" -DestinationPath "./GameRewind.zip" -Force
Remove-Item -Path "./staging" -Recurse -Force
```

最终 ZIP 结构：

```text
GameRewind.zip
└─ GameRewind/
   ├─ manifest.json
   └─ GameRewind.dll
```

安装到 FolderRewind 后，在插件管理界面确认插件已加载，然后：

1. 创建一个游戏存档类型的备份配置
2. 测试自动发现功能
3. 触发一次备份，验证快照和过滤是否生效
4. 触发一次还原，验证用户数据保留是否生效
5. 测试快捷键
6. 通过 KnotLink 发送命令测试

## 完整源码

完整的 GameRewind 插件源码包含以下成员：

- `IFolderRewindPlugin` — 核心接口（Manifest、设置、初始化、备份/还原钩子、配置发现）
- `IFolderRewindBackupFilterProvider` — 备份过滤（排除缓存文件）
- `IFolderRewindHotkeyProvider` — 快捷键（Ctrl+Shift+B/R）
- `IFolderRewindKnotLinkCommandHandler` — 远程命令（GAME_BACKUP 等）

以上各节的代码片段组合在一起就是一个完整可运行的插件。建议按顺序逐步实现，每完成一步就打包测试。

## 下一步

- [Plugin API 参考](./plugin-api) — 接口全量说明和高级用法
- [Hotkey API](./hotkey-api) — 快捷键进阶
- [KnotLink Command API](./knotlink-api) — 远程命令进阶
- [MineRewind 源码](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft) — 更复杂的官方参考实现
