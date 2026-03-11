---
sidebar_position: 3
title: KnotLink 协议与联动
description: 了解 FolderRewind 与外部程序通过 KnotLink 的通信方式
---

# KnotLink 协议与联动

KnotLink 是 FolderRewind 与外部程序（如游戏模组、脚本工具）通信的桥梁。

## 典型用途

- 在备份前通知外部程序执行保存动作。
- 在还原后通知外部程序重新加载状态。
- 接收外部命令触发备份或还原任务，并在需要时强制执行完整备份。

## 在插件中的接入点

- `PluginHostContext.BroadcastEvent(...)`：广播事件。
- `PluginHostContext.QueryKnotLinkAsync(...)`：请求-响应式查询。
- `IFolderRewindKnotLinkCommandHandler`：扩展可识别命令。

## MineRewind 实战中的命令示例

- `BACKUP_CURRENT`
- `BACKUP <config_id> <folder_index|folder_name> [comment] [FORCE_FULL]`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT`

这些命令的插件实现细节见 [KnotLink Command API](./developing/knotlink-api)。

## 相关链接

- [Plugin API 参考](./developing/plugin-api)
- [KnotLink Command API](./developing/knotlink-api)
- [Minecraft 专题总览](../guides/minecraft/overview)
