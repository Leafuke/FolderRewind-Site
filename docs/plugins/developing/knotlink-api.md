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

## 推荐分发结构

建议用 `switch`（或映射表）按命令大写分发：

```csharp
return command.ToUpperInvariant() switch
{
	"PING" => HandlePingAsync(args, hostContext),
	"BACKUP_CURRENT" => HandleBackupAsync(args, settingsValues, hostContext),
	_ => Task.FromResult<string?>(null)
};
```

返回 `null` 代表“本插件不处理该命令”，Host 可继续尝试其他处理者。

## 返回约定

- 返回 `null`：表示不处理该命令
- 返回字符串：表示已处理并作为响应返回

建议使用统一格式：

- 成功：`OK:<message>`
- 失败：`ERROR:<reason>`

## 命令实现建议

- 快速返回：耗时操作放入后台任务
- 参数校验：缺少参数时直接返回 `ERROR:Missing ...`
- 幂等与状态：避免重复触发同一长流程
- 可观测性：对关键路径写日志并广播状态事件

## MineRewind 命令示例

- `BACKUP_CURRENT`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT <backup_file>`

这些命令配合 KnotLink 广播实现“保存-退出-还原-重进”链路。

## 请求/响应示例

### 列出当前活跃世界备份

请求：

```text
LIST_BACKUPS_CURRENT
```

响应：

```text
OK:save_001.7z;save_002.7z
```

### 指定备份热还原

请求：

```text
RESTORE_CURRENT save_002.7z
```

响应：

```text
OK:Hot restore triggered for 'WorldName' with backup 'save_002.7z'
```

## 设计建议

- 快速返回，耗时任务丢到后台执行
- 命令参数要先校验再执行
- 给关键路径打日志并广播状态事件

## 与专题文档联动

- 使用视角：见 [KnotLink 与联动模组](../../guides/minecraft/knotlink-mod)
- 运行链路：见 [热还原机制详解](../../guides/minecraft/hot-restore)

## 相关链接

- [KnotLink 协议与联动](../knotlink)
- [Plugin API 参考](./plugin-api)
