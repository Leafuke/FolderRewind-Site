---
sidebar_position: 3
title: KnotLink 协议与联动
description: 了解 FolderRewind 与外部程序通过 KnotLink 的通信方式
---

# KnotLink 协议与联动

KnotLink 是 FolderRewind 与外部程序（如游戏模组、脚本工具）通信的桥梁，基于 TCP 协议。

## 典型用途

- 在备份前通知外部程序执行保存动作
- 在还原后通知外部程序重新加载状态
- 接收外部命令触发备份或还原任务
- 查询当前备份状态和历史

## 在插件中的接入点

### PluginHostContext API

通过 `SetHostContext` 注入的 `PluginHostContext` 提供以下通信方法：

| 方法 | 用途 |
|------|------|
| `BroadcastEvent(eventData)` | 向所有订阅者广播事件 |
| `BroadcastEventAsync(eventData)` | 异步广播事件 |
| `QueryKnotLinkAsync(question, timeoutMs)` | 发送请求并等待响应 |
| `SubscribeSignal(signalId, onSignal)` | 订阅指定信号通道 |
| `SendKnotLinkCommand(message)` | 发送命令（异步执行，不等待响应） |

状态检查：

| 属性 | 说明 |
|------|------|
| `IsKnotLinkAvailable` | KnotLink 整体是否可用 |
| `IsKnotLinkSenderReady` | 发送器是否就绪 |
| `IsKnotLinkResponserReady` | 响应器是否就绪 |

### 命令扩展接口

- `IFolderRewindKnotLinkCommandHandler` — 扩展可识别的基础命令
- `IFolderRewindParameterizedKnotLinkCommandHandler` — 扩展参数化命令

## MineRewind 实战中的命令

| 命令 | 说明 |
|------|------|
| `BACKUP_CURRENT` | 备份当前活跃的 Minecraft 世界 |
| `BACKUP <config_id> <folder> [comment] [FORCE_FULL]` | 指定配置和文件夹备份 |
| `RESTORE_CURRENT_LATEST` | 热还原当前世界到最新备份 |
| `RESTORE_CURRENT <backup_file>` | 热还原到指定备份 |
| `RESTORE_CURRENT_WITH_DATA [file]` | 热还原并保留玩家数据 |
| `LIST_BACKUPS_CURRENT` | 列出当前世界的所有备份 |

这些命令配合 KnotLink 事件广播实现「保存-退出-还原-重进」完整链路。

插件实现细节见 [KnotLink Command API](./developing/knotlink-api)。

## 相关链接

- [KnotLink Command API](./developing/knotlink-api)
- [Plugin API 参考](./developing/plugin-api)
- [实战教程](./developing/tutorial)
- [Minecraft 专题总览](../guides/minecraft/overview)
