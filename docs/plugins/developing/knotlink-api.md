---
sidebar_position: 4
title: KnotLink Command API
description: IFolderRewindKnotLinkCommandHandler 接口与命令处理模式
---

# KnotLink Command API

实现 `IFolderRewindKnotLinkCommandHandler` 后，插件可扩展 Host 可识别的 KnotLink 命令。

## 接口

- `GetKnotLinkCommandDefinitions()`：声明命令名与说明
- `TryHandleKnotLinkCommandAsync(...)`：按命令分发处理

## 返回约定

- 返回 `null`：表示不处理该命令
- 返回字符串：表示已处理并作为响应返回

建议使用统一格式：

- 成功：`OK:<message>`
- 失败：`ERROR:<reason>`

## MineRewind 命令示例

- `BACKUP_CURRENT`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT <backup_file>`

这些命令配合 KnotLink 广播实现“保存-退出-还原-重进”链路。

## 设计建议

- 快速返回，耗时任务丢到后台执行
- 命令参数要先校验再执行
- 给关键路径打日志并广播状态事件

## 相关链接

- [KnotLink 协议与联动](../knotlink)
- [Plugin API 参考](./plugin-api)
