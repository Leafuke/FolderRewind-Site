---
sidebar_position: 6
title: KnotLink 与联动模组
description: 使用 Server v3 和参数化协议 v2 联动 MineRewind 与 Minecraft 模组
---

# KnotLink 与联动模组

MineRewind 的热备份与热还原依赖 KnotLink 和 Minecraft 联动模组。FolderRewind 1.8 环境需要 **KnotLink Server v3**，所有 FolderRewind/MineRewind 指令使用严格键值对的**参数化协议 v2**。

## 前置条件

- FolderRewind 1.8 与满足 `MinHostVersion` 的 MineRewind。
- 能处理握手、保存、退出和重进事件的兼容联动模组。
- 已启动且收发链路正常的 KnotLink Server v3。

先发送 `cmd=GET_CAPABILITIES`。如果运行时清单中没有 MineRewind 的 `current_save` 能力，不要继续发送当前世界命令。

## 当前世界命令

MineRewind 通过参数扩展 Host 的 `BACKUP`、`LIST_BACKUPS` 和 `RESTORE`，不再使用另一套空格分隔的命令：

| 用途 | v2 请求 |
|------|---------|
| 备份当前世界 | `cmd=BACKUP;current_save=true;from=minebackup.mod;request_id=...` |
| 列出当前世界备份 | `cmd=LIST_BACKUPS;current_save=true` |
| 还原到最新备份 | `cmd=RESTORE;current_save=true;from=minebackup.mod;request_id=...` |
| 还原到指定备份 | 上一条再增加 `file=<encoded filename>` |
| 保留玩家数据还原 | 再增加 `preserve_player_data=true` |

当前世界备份还可使用 Host 的一次性 `comment`、`backup_mode`、`compression_method` 和 `compression_level` 覆盖。它们只影响这一次调用。

```text
cmd=BACKUP;current_save=true;comment=QuickSave;backup_mode=full;from=minebackup.mod;request_id=mc-backup-001
```

## 联动回传

模组使用同一 v2 格式把阶段结果回传给 MineRewind：

```text
cmd=HANDSHAKE_RESPONSE;mod_version=1.8.0
cmd=WORLD_SAVED
cmd=WORLD_SAVE_AND_EXIT_COMPLETE
cmd=REJOIN_RESULT;result=success
```

失败原因等动态文本必须 percent-encode：

```text
cmd=REJOIN_RESULT;result=failure;reason=Server%20not%20ready
```

## MineRewind 信号

- `handshake` / `handshake_ack`：版本协商。
- `pre_hot_backup`：请求在热备份前保存世界。
- `hot_restore_requested`：请求联动模组开始当前世界的还原倒计时。
- `pre_hot_restore`：请求保存并退出世界。
- `restore_cancelled`：还原流程被取消。
- `rejoin_world`：请求重进已还原的世界。
- `hot_restore_complete`：整条流程的最终状态。

`hot_restore_requested` 中的 `request_id` 会沿后续 RESTORE 会话复用。联动侧应按此字段关联一次还原，不要仅依赖事件顺序。

## 最小联调顺序

1. `cmd=PING` 检查 FolderRewind 端点。
2. `cmd=GET_CAPABILITIES` 检查 MineRewind 能力和字段。
3. 发送当前世界 `BACKUP`，观察保存与备份完成信号。
4. 发送当前世界 `LIST_BACKUPS`，确认查询结果。
5. 用测试世界执行最新备份 `RESTORE`，观察保存、退出、还原和重进。
6. 最后验证带 `file` 的精确还原和可选的玩家数据保留。

:::danger 先使用测试世界
热还原会改变正在使用的世界。版本握手失败、阶段超时或世界仍在写入时，流程可能取消。正式使用前必须完整演练，并保留可独立还原的完整备份。
:::

## 相关链接

- [KnotLink 协议与联动](../../plugins/knotlink)
- [KnotLink 命令参考](../../plugins/knotlink-commands)
- [热备份机制详解](./hot-backup)
- [热还原机制详解](./hot-restore)
- [MineBackup 联动模组详解](./minebackup-mod)
