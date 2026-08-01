---
sidebar_position: 5
title: KnotLink Command API
description: 使用 FolderRewind 1.8 参数化命令处理器与能力提供器
---

# KnotLink Command API

FolderRewind 1.8 插件使用参数化协议 v2。实现 `IFolderRewindParameterizedKnotLinkCommandHandler` 处理命令，实现 `IFolderRewindKnotLinkCapabilityProvider` 让客户端通过 `GET_CAPABILITIES` 发现命令和信号。

使用这些接口的插件应在 `manifest.json` 中设置：

```json
{
  "MinHostVersion": "1.8.0"
}
```

## 参数化命令处理器

```csharp
public interface IFolderRewindParameterizedKnotLinkCommandHandler
{
    Task<PluginParameterizedKnotLinkCommandResult?>
        TryHandleParameterizedKnotLinkCommandAsync(
            KnotLinkCommandRequest request,
            IReadOnlyDictionary<string, string> settingsValues,
            PluginHostContext hostContext);
}
```

Host 会先完成严格 v2 解析和会话元数据校验，再把请求交给插件。除 `GET_CAPABILITIES` 和 `PING` 外，插件处理器先于内置命令运行；插件只应接管自己明确支持的字段组合。

## `KnotLinkCommandRequest`

| 成员 | 说明 |
|------|------|
| `Command` | 已转为大写的 `cmd` 值 |
| `RawPayload` | 原始 v2 负载，仅用于诊断，不要再次自行拆分 |
| `Options` | 已 percent-decoding、键不区分大小写的只读字典 |
| `HasOption(key)` | 判断字段是否出现 |
| `GetString` / `GetStringOrDefault` | 读取字符串 |
| `GetBool` / `GetBoolOrDefault` | 读取 `true/false`、`1/0`、`yes/no`、`on/off` 等布尔形式 |
| `GetList` | 读取逗号分隔且逐项 percent-encoded 的列表 |

优先使用这些访问器，不要从 `RawPayload` 重复实现协议解析器。

## 处理结果

```csharp
return new PluginParameterizedKnotLinkCommandResult
{
    Handled = true,
    Response = "status=ok;message=Queued"
};
```

| 返回值 | Host 行为 |
|--------|-----------|
| `null` 或 `NotHandled` | 继续尝试其他插件或内置命令 |
| `Handled = true`，`Response = null` | 补全为成功响应 |
| `Handled = true`，严格 `status=...` 响应 | 校验并规范化后返回 |
| `OK:...` / `ERROR:...` | 转换为 v2 `status=ok/error` 响应 |

新代码建议直接返回严格 v2 字段，并对所有动态值使用 `KnotLinkProtocolFormatter.EncodeValue` 或 Host 提供的编码能力。

## 最小处理器示例

```csharp
using FolderRewind.Services.KnotLink;
using FolderRewind.Services.Plugins;

public sealed class ExamplePlugin :
    IFolderRewindPlugin,
    IFolderRewindParameterizedKnotLinkCommandHandler
{
    public Task<PluginParameterizedKnotLinkCommandResult?>
        TryHandleParameterizedKnotLinkCommandAsync(
            KnotLinkCommandRequest request,
            IReadOnlyDictionary<string, string> settingsValues,
            PluginHostContext hostContext)
    {
        if (request.Command != "EXAMPLE_ECHO")
        {
            return Task.FromResult<PluginParameterizedKnotLinkCommandResult?>(
                PluginParameterizedKnotLinkCommandResult.NotHandled);
        }

        var text = request.GetStringOrDefault("text");
        var encoded = KnotLinkProtocolFormatter.EncodeValue(text);
        hostContext.LogInfo($"EXAMPLE_ECHO handled: {text}");

        return Task.FromResult<PluginParameterizedKnotLinkCommandResult?>(
            new()
            {
                Handled = true,
                Response = $"status=ok;data={encoded}"
            });
    }
}
```

耗时操作应先完成参数和状态校验，再排入后台，并立即返回“已接受”。后续进度和结果通过带同一 `request_id` 的信号广播。

## 声明运行时能力

```csharp
public PluginKnotLinkCapabilityContribution GetKnotLinkCapabilities()
{
    return new()
    {
        OpenSocket = new[]
        {
            new PluginKnotLinkOpenSocketCapability
            {
                Name = "example_echo",
                Description = "Return the supplied text.",
                Args = new Dictionary<string, KnotLinkFuncArgument>
                {
                    ["cmd"] = KnotLinkFuncListService.Static(
                        "EXAMPLE_ECHO", "Operation command."),
                    ["text"] = KnotLinkFuncListService.Input(
                        "Text to return.", "hello")
                },
                Returns = KnotLinkFuncListService.StatusReturns("data")
            }
        }
    };
}
```

能力名称应稳定且唯一，参数定义必须与处理器实际接受的字段一致。Host 会把插件贡献合并进 `GET_CAPABILITIES` 的 `func_list`。

## MineRewind 的 v2 扩展方式

MineRewind 不再创建另一套空格命令。它扩展内置命令的参数：

- `cmd=BACKUP;current_save=true;...`：备份当前活跃世界。
- `cmd=LIST_BACKUPS;current_save=true`：列出当前世界备份。
- `cmd=RESTORE;current_save=true;...`：还原当前世界；`file` 为空时使用最新备份。
- `preserve_player_data=true`：在当前世界还原中保留受支持的玩家数据。

这些能力由插件的 `IFolderRewindKnotLinkCapabilityProvider` 加入运行时清单。客户端应查询能力，而不是假定 MineRewind 已安装。

## 设计检查

- 对未知命令或不属于插件的参数组合返回 `NotHandled`。
- 不在日志中记录密码、令牌或未经筛选的完整负载。
- 使用 `request_id` 关联长任务，并防止同一请求重复执行。
- 返回前对动态字段 percent-encode。
- 插件升级后用 `GET_CAPABILITIES` 检查声明与实现是否一致。

## 相关链接

- [KnotLink 协议与联动](../knotlink)
- [KnotLink 命令参考](../knotlink-commands)
- [Plugin API 参考](./plugin-api)
- [Minecraft 与联动模组](../../guides/minecraft/knotlink-mod)
