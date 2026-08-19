---
sidebar_position: 3
title: KnotLink 协议与联动
description: 深入理解 KnotLink Server v3 与 FolderRewind 参数化协议 v2 的架构、命令发现机制、安全模型与外部工具集成方式，实现游戏模组、脚本与备份系统的可靠联动
---

# KnotLink 协议与联动

KnotLink 是 FolderRewind 与游戏模组、脚本和控制面板之间的通信通道。FolderRewind 1.8 采用全新的远程指令模式，并要求 **KnotLink Server v3**。

## 两个版本号不要混淆

| 名称 | 含义 |
|------|------|
| **KnotLink Server v3** | 提供 TCP/OpenSocket、查询和信号传输的外部服务端版本 |
| **FolderRewind 参数化协议 v2** | FolderRewind 在 KnotLink 负载中使用的严格 `key=value` 指令格式 |

Server v3 是传输服务版本，参数化协议 v2 是 FolderRewind 的消息格式。升级其中一个并不代表另一个也已兼容；1.8 联动环境应同时满足两项要求。

:::warning v1 指令已移除
FolderRewind 1.8 不再解析空格分隔的旧指令。调用方必须发送包含 `cmd=` 的严格键值对负载。
:::

## 协议格式

请求、响应和事件都使用分号分隔字段：

```text
cmd=BACKUP;config_id=demo;folder=0;comment=Before%20upgrade;from=panel;request_id=req-001
```

规则如下：

- 键只允许 ASCII 字母、数字和下划线，内部按小写处理。
- 每段必须恰好包含一个 `=`；空段、重复键和无效转义会拒绝整个请求。
- 值采用 RFC 3986 percent-encoding。空格写为 `%20`，分号写为 `%3B`，等号写为 `%3D`，`%` 写为 `%25`。
- 列表使用逗号分隔；列表中的每一项单独编码。
- `BACKUP`、`RESTORE`、`BACKUP_ALL`、`AUTO_BACKUP`、`STOP_AUTO_BACKUP` 和 `MARK_IMPORTANT` 必须带 `from` 与唯一的 `request_id`。

典型响应：

```text
status=ok;from=panel;request_id=req-001;message=Backup%20task%20queued
```

错误响应使用 `status=error`，并在 `message` 中提供原因。

## 先发现能力，再发送命令

客户端应先发送：

```text
cmd=GET_CAPABILITIES
```

响应中的 `func_list` 是 percent-encoded JSON，包含当前 Host 内置命令、插件贡献的命令和信号。仓库中的 `funcList.json` 是内置命令事实基线；运行时清单可能因已启用插件而扩展。

完整字段见 [KnotLink 命令参考](/docs/plugins/knotlink-commands)。

## 生命周期信号

带会话元数据的长操作会用同一个 `request_id` 广播生命周期：

```text
command_accepted → command_started → command_progress → command_completed
                                      ↘ command_failed / command_error
```

备份、还原和自动备份还会广播各自的业务信号。调用方应以 `request_id` 关联响应和事件，不要只根据到达顺序判断一次操作。

## 插件接入

插件通过以下 1.8 接口参与协议：

- `IFolderRewindParameterizedKnotLinkCommandHandler`：读取 `KnotLinkCommandRequest` 并处理参数化命令。
- `IFolderRewindKnotLinkCapabilityProvider`：把命令和信号定义加入运行时 `func_list`。
- `PluginHostContext`：查询 KnotLink 状态、广播事件、发送命令或执行请求/响应查询。

开发细节见 [KnotLink Command API](/docs/plugins/developing/knotlink-api)。

## 安全建议

- 只在受信任网络和受控端口上运行 KnotLink Server。
- 为每个改变状态的请求生成新的 `request_id`，并在调用方做幂等去重。
- 在实际目录上执行远程还原前，先用测试配置演练完整事件链。
- 不要把 percent-decoding 后的内容直接拼接到 Shell 命令。

## 相关链接

- [KnotLink 命令参考](/docs/plugins/knotlink-commands)
- [KnotLink Command API](/docs/plugins/developing/knotlink-api)
- [Minecraft 与联动模组](/docs/guides/minecraft/knotlink-mod)
- [1.8 升级与恢复](/docs/getting-started/v1-8-upgrade)
