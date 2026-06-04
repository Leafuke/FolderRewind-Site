---
sidebar_position: 4
title: Hotkey API
description: IFolderRewindHotkeyProvider 接口说明与热键设计建议
---

# Hotkey API

`IFolderRewindHotkeyProvider` 用于向 Host 注册插件快捷键，并在触发时执行逻辑。

## 接口定义

```csharp
public interface IFolderRewindHotkeyProvider
{
    IReadOnlyList<PluginHotkeyDefinition> GetHotkeyDefinitions();

    Task OnHotkeyInvokedAsync(
        string hotkeyId,
        bool isGlobalHotkey,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext);
}
```

## PluginHotkeyDefinition 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `Id` | `string` | 插件内唯一标识 |
| `DisplayName` | `string` | 用户可见的名称 |
| `Description` | `string?` | 热键功能描述 |
| `DefaultGesture` | `string?` | 默认手势，如 `"Alt+Ctrl+S"`。为空表示默认不绑定 |
| `IsGlobalHotkey` | `bool` | `true` = 全局热键（`RegisterHotKey`）；`false` = 应用内快捷键（`KeyboardAccelerator`） |

### 全局热键 vs 应用内快捷键

| 特性 | 全局热键 (`IsGlobalHotkey = true`) | 应用内快捷键 (`IsGlobalHotkey = false`) |
|------|-----------------------------------|---------------------------------------|
| 触发范围 | 系统全局，即使 FolderRewind 不在前台 | 仅 FolderRewind 窗口内 |
| 实现方式 | Win32 `RegisterHotKey` | WinUI `KeyboardAccelerator` |
| 适用场景 | 游戏中快速操作 | 应用内操作 |

## 完整示例

```csharp
using FolderRewind.Services.Plugins;

public class MyPlugin : IFolderRewindPlugin, IFolderRewindHotkeyProvider
{
    // ... IFolderRewindPlugin 实现 ...

    public IReadOnlyList<PluginHotkeyDefinition> GetHotkeyDefinitions()
    {
        return new List<PluginHotkeyDefinition>
        {
            new()
            {
                Id = "myplugin.quick_backup",
                DisplayName = "快速备份",
                Description = "一键备份当前活跃配置",
                DefaultGesture = "Ctrl+Shift+B",
                IsGlobalHotkey = true
            },
            new()
            {
                Id = "myplugin.quick_restore",
                DisplayName = "快速还原",
                Description = "一键还原最新备份",
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
        if (string.Equals(hotkeyId, "myplugin.quick_backup", StringComparison.OrdinalIgnoreCase))
        {
            hostContext.LogInfo("快捷键触发：快速备份");
            // ... 备份逻辑 ...
        }
        else if (string.Equals(hotkeyId, "myplugin.quick_restore", StringComparison.OrdinalIgnoreCase))
        {
            hostContext.LogInfo("快捷键触发：快速还原");
            // ... 还原逻辑 ...
        }
    }
}
```

## MineRewind 示例

MineRewind 注册了两个全局热键：

| 热键 | ID | 功能 |
|------|----|----|
| `Alt+Ctrl+S` | `hotbackup.active_world` | 备份当前活跃的 Minecraft 世界 |
| `Alt+Ctrl+Z` | `hotrestore.active_world` | 热还原当前活跃的 Minecraft 世界 |

热键回调会自动检测哪个 Minecraft 世界正在运行（通过 `session.lock` 文件锁定检测），然后触发对应操作。参见 `MinecraftSavesPlugin.Hotkeys.cs`。

## 设计建议

- 避免与常见系统快捷键冲突（如 `Ctrl+C`、`Ctrl+V`、`Alt+Tab`）
- 热键回调中避免长阻塞，耗时操作使用 `Task.Run` 异步执行
- 为失败场景提供日志和用户反馈（通过 `hostContext.LogInfo/LogWarning/LogError`）
- `Id` 一旦发布尽量保持稳定，用户可能已记住自定义绑定

## 相关链接

- [Plugin API 参考](./plugin-api)
- [KnotLink Command API](./knotlink-api)
- [实战教程](./tutorial)
