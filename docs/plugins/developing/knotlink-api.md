---
sidebar_position: 5
title: KnotLink Command API
description: IFolderRewindKnotLinkCommandHandler 与参数化命令接口说明
---

# KnotLink Command API

实现 `IFolderRewindKnotLinkCommandHandler` 后，插件可扩展 FolderRewind 的 KnotLink 命令集。外部工具（游戏模组、脚本、远程控制面板）可通过 TCP 协议向 FolderRewind 发送命令。

## 接口定义

### 基础命令接口

```csharp
public interface IFolderRewindKnotLinkCommandHandler
{
    IReadOnlyList<PluginKnotLinkCommandDefinition> GetKnotLinkCommandDefinitions();

    Task<string?> TryHandleKnotLinkCommandAsync(
        string command,
        string args,
        string rawCommand,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext);
}
```

### 参数化命令接口（新版）

```csharp
public interface IFolderRewindParameterizedKnotLinkCommandHandler
{
    Task<PluginParameterizedKnotLinkCommandResult?> TryHandleParameterizedKnotLinkCommandAsync(
        KnotLinkCommandRequest request,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext);
}
```

参数化接口支持结构化请求参数，适合需要复杂输入的命令。两个接口可以同时实现，Host 优先调用参数化版本。

## 数据类型

### PluginKnotLinkCommandDefinition

| 字段 | 类型 | 说明 |
|------|------|------|
| `Command` | `string` | 命令名（不区分大小写），如 `"BACKUP_CURRENT"` |
| `Description` | `string?` | 命令说明（用于文档或未来 UI 展示） |

### PluginParameterizedKnotLinkCommandResult

| 字段 | 类型 | 说明 |
|------|------|------|
| `Handled` | `bool` | 插件是否已处理此命令 |
| `Response` | `string?` | 返回给调用方的响应文本。为空时 Host 补成 `"OK:"` |

静态属性 `NotHandled` 返回 `{ Handled = false, Response = null }`。

## 推荐分发模式

```csharp
public Task<string?> TryHandleKnotLinkCommandAsync(
    string command, string args, string rawCommand,
    IReadOnlyDictionary<string, string> settingsValues,
    PluginHostContext hostContext)
{
    return command.ToUpperInvariant() switch
    {
        "MY_BACKUP" => HandleBackupAsync(args, hostContext),
        "MY_RESTORE" => HandleRestoreAsync(args, hostContext),
        "MY_LIST" => HandleListAsync(hostContext),
        _ => Task.FromResult<string?>(null) // null = 不处理
    };
}
```

## 返回值约定

- 返回 `null`：本插件不处理此命令，Host 继续尝试其他处理者
- 返回字符串：已处理，作为响应返回

建议统一格式：

- 成功：`OK:<message>`
- 失败：`ERROR:<reason>`

## 完整示例

```csharp
public class MyPlugin : IFolderRewindPlugin, IFolderRewindKnotLinkCommandHandler
{
    private PluginHostContext? _hostContext;

    public void SetHostContext(PluginHostContext hostContext)
    {
        _hostContext = hostContext;
    }

    public IReadOnlyList<PluginKnotLinkCommandDefinition> GetKnotLinkCommandDefinitions()
    {
        return new List<PluginKnotLinkCommandDefinition>
        {
            new() { Command = "MY_BACKUP", Description = "触发备份" },
            new() { Command = "MY_LIST", Description = "列出备份" }
        };
    }

    public Task<string?> TryHandleKnotLinkCommandAsync(
        string command, string args, string rawCommand,
        IReadOnlyDictionary<string, string> settingsValues,
        PluginHostContext hostContext)
    {
        return command.ToUpperInvariant() switch
        {
            "MY_BACKUP" => HandleBackupAsync(args, hostContext),
            "MY_LIST" => HandleListAsync(hostContext),
            _ => Task.FromResult<string?>(null)
        };
    }

    private Task<string?> HandleBackupAsync(string args, PluginHostContext hostContext)
    {
        try
        {
            // 耗时操作放入后台，立即返回
            _ = Task.Run(async () =>
            {
                try
                {
                    // ... 执行备份 ...
                    hostContext.LogInfo("备份完成");
                    hostContext.BroadcastEvent("event=my_backup_complete;status=success");
                }
                catch (Exception ex)
                {
                    hostContext.LogError($"备份失败: {ex.Message}");
                }
            });

            return Task.FromResult<string?>("OK:Backup started");
        }
        catch (Exception ex)
        {
            return Task.FromResult<string?>($"ERROR:{ex.Message}");
        }
    }

    private Task<string?> HandleListAsync(PluginHostContext hostContext)
    {
        // 快速操作可同步返回
        var backups = new[] { "backup_001.7z", "backup_002.7z" };
        return Task.FromResult<string?>($"OK:{string.Join(';', backups)}");
    }
}
```

## MineRewind 命令参考

MineRewind 实现了以下命令：

| 命令 | 说明 |
|------|------|
| `BACKUP_CURRENT` | 备份当前活跃的 Minecraft 世界 |
| `RESTORE_CURRENT_LATEST` | 热还原当前世界到最新备份 |
| `LIST_BACKUPS_CURRENT` | 列出当前世界的所有备份 |
| `RESTORE_CURRENT <file>` | 热还原当前世界到指定备份 |
| `RESTORE_CURRENT_WITH_DATA [file]` | 热还原并保留玩家数据 |

以及模组内部信号：`HANDSHAKE_RESPONSE`、`WORLD_SAVED`、`WORLD_SAVE_AND_EXIT_COMPLETE`、`REJOIN_RESULT`。

### 请求/响应示例

**列出备份：**

```text
> LIST_BACKUPS_CURRENT
< OK:save_001.7z;save_002.7z
```

**指定备份热还原：**

```text
> RESTORE_CURRENT save_002.7z
< OK:Hot restore triggered for 'WorldName' with backup 'save_002.7z'
```

**强制完整备份：**

```text
> BACKUP demo_config 0 手动校验 FORCE_FULL
< OK:Backup task queued
```

参见 `MinecraftSavesPlugin.KnotLink.cs` 获取完整实现。

## 设计建议

- **快速返回**：耗时操作放入 `Task.Run`，立即返回 `OK:` 接受请求
- **参数校验**：缺少参数时返回 `ERROR:Missing ...`
- **幂等与状态**：避免重复触发同一长流程
- **可观观测性**：对关键路径写日志并广播状态事件

## 相关链接

- [KnotLink 协议与联动](../knotlink)
- [Plugin API 参考](./plugin-api)
- [实战教程](./tutorial)
