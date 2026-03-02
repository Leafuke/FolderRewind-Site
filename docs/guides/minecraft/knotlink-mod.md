---
sidebar_position: 5
title: KnotLink 与联动模组
description: MineRewind 与外部模组通信的命令、事件与兼容性要点
---

# KnotLink 与联动模组

MineRewind 的热备份/热还原依赖 KnotLink 通道与联动模组配合。

如果你要先了解 MineBackup 模组面向用户的安装与命令用法，请先看 [MineBackup 联动模组详解](./minebackup-mod)。本文聚焦协议命令与事件层。

## 源码映射

| 能力 | 核心方法 | 位置 |
|---|---|---|
| 命令声明 | `GetKnotLinkCommandDefinitions()` | `MinecraftSavesPlugin.KnotLink.cs` |
| 命令分发 | `TryHandleKnotLinkCommandAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| 握手响应处理 | `HandleHandshakeResponseAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| 保存完成信号 | `HandleWorldSavedAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| 退出完成信号 | `HandleWorldSaveAndExitCompleteAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| 重进结果信号 | `HandleRejoinResultAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |

## 你需要准备

- FolderRewind + MineRewind（版本满足插件最小宿主要求）
- 联动模组（可响应握手、保存、重进事件）
- KnotLink 服务可用（收发链路正常）

## 命令矩阵（外部 -> MineRewind）

| 命令 | 参数 | 说明 | 典型响应 |
|---|---|---|---|
| `BACKUP_CURRENT` | 可选注释 | 触发当前活跃世界备份 | `OK:Backup started...` |
| `LIST_BACKUPS_CURRENT` | 无 | 列出当前世界备份文件 | `OK:file1;file2;...` |
| `RESTORE_CURRENT_LATEST` | 无 | 热还原到最新备份 | `OK:Hot restore triggered...` |
| `RESTORE_CURRENT` | `backup_file` | 热还原到指定备份 | `OK:Hot restore triggered...` |

若无活跃世界或参数缺失，响应通常以 `ERROR:` 开头。

## 事件协议（MineRewind -> 外部）

- `event=handshake`：请求握手与版本协商
- `event=pre_hot_backup`：请求保存世界再备份
- `event=pre_hot_restore`：请求保存并退出后还原
- `event=restore_finished`：还原阶段结果
- `event=rejoin_world`：请求重进世界
- `event=hot_restore_complete`：整条热还原链路完成状态

## 内部回传命令（外部 -> MineRewind）

这些命令通常由联动模组回发给插件：

- `HANDSHAKE_RESPONSE <mod_version>`
- `WORLD_SAVED`
- `WORLD_SAVE_AND_EXIT_COMPLETE`（或兼容别名 `SHUTDOWN_WORLD_SUCCESS`）
- `REJOIN_RESULT <success|failure> [reason]`

## 最小联调脚本（建议顺序）

1. 发送 `BACKUP_CURRENT`，确认最短链路可运行。
2. 发送 `LIST_BACKUPS_CURRENT`，确认备份结果可查询。
3. 发送 `RESTORE_CURRENT_LATEST`，确认热还原主链路。
4. 最后验证 `RESTORE_CURRENT <backup_file>` 的精确还原。

## 兼容性关注点

- 插件内部有最低模组版本判断
- 握手不通过时会回退或中止相应流程
- 命令返回统一建议采用 `OK:` / `ERROR:` 前缀

握手负载中包含 `min_mod_version`，建议联动侧显式记录该值以便排查版本问题。

## 实操建议

- 先执行 `BACKUP_CURRENT` 验证最短链路
- 再测试 `RESTORE_CURRENT_LATEST`，观察保存-退出-重进全流程
- 使用指定备份前先执行 `LIST_BACKUPS_CURRENT`

## 请求/响应示例

### 示例 1：列出备份

请求：

```text
LIST_BACKUPS_CURRENT
```

响应：

```text
OK:world_2026-02-27_19-00.7z;world_2026-02-28_09-30.7z
```

### 示例 2：握手回传

请求：

```text
HANDSHAKE_RESPONSE 1.2.0
```

响应：

```text
OK:Handshake received. Version 1.2.0 (compatible)
```

## 相关链接

- [热备份机制详解](./hot-backup)
- [热还原机制详解](./hot-restore)
- [MineBackup 联动模组详解](./minebackup-mod)
- [KnotLink 协议与联动](../../plugins/knotlink)
