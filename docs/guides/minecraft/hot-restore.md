---
sidebar_position: 4
title: 热还原机制详解
description: MineRewind 的保存-退出-还原-重进流程与超时策略
---

# 热还原机制详解

热还原用于“当前正在游玩的世界”，目标是把常见的“手动保存 -> 退出 -> 还原 -> 重新进入”收敛成单条自动链路。

## 源码映射

| 能力 | 核心方法/常量 | 位置 |
|---|---|---|
| 热还原入口 | `TriggerHotRestoreAsync(...)` | `MinecraftSavesPlugin.Restore.cs` |
| 命令触发入口 | `HandleRestoreCurrentLatestAsync` / `HandleRestoreCurrentAsync` | `MinecraftSavesPlugin.KnotLink.cs` |
| 状态机防重入 | `RestoreIdle/RestoreWaitingForMod/RestoreRestoring` + `Interlocked.CompareExchange` | `MinecraftSavesPlugin.cs` / `MinecraftSavesPlugin.Restore.cs` |
| 文件释放等待 | `WaitForWorldReleaseAsync` / `WaitForFileUnlockedAsync` | `MinecraftSavesPlugin.Restore.cs` |
| 关键超时 | `WorldExitTimeoutMs` / `FileReleaseTimeoutMs` / `RejoinTimeoutMs` | `MinecraftSavesPlugin.cs` |
| 玩家数据保留 | `OnBeforeRestoreFolder` / `OnAfterRestoreFolder` | `MinecraftSavesPlugin.Restore.cs` |

## 两种触发方式

- 热键触发：`Alt+Ctrl+Z`
- KnotLink 命令触发：
  - `RESTORE_CURRENT_LATEST`
  - `RESTORE_CURRENT <backup_file>`

## 执行前提

- 当前有可识别的活跃世界（世界文件处于占用状态）
- 有可用的历史备份（最新或指定文件）
- 联动模组与 KnotLink 正常可用

如果任一条件不满足，流程会中止并记录失败原因。

## 状态机说明

热还原通过原子状态避免并发执行：

- `RestoreIdle`：空闲，可进入流程
- `RestoreWaitingForMod`：等待模组保存并退出
- `RestoreRestoring`：正在执行还原

如果在非空闲状态再次触发，会直接忽略本次请求并记录日志。

## 执行流程（源码对照）

1. 握手（action = `restore`）并校验模组版本
2. 发送 `pre_hot_restore`，等待“保存并退出世界”确认
3. 等待世界文件释放（含 `level.dat` 解锁检查）
4. 执行还原（最新备份或指定备份）
5. 发送 `restore_finished`
6. 发送 `rejoin_world`，等待模组返回重进结果
7. 广播 `hot_restore_complete`

### 流程时序（文本版）

```text
TriggerHotRestoreAsync
  -> handshake(action=restore)
  -> pre_hot_restore
  -> wait WORLD_SAVE_AND_EXIT_COMPLETE (10s)
  -> wait world release (15s) + level.dat unlock (10s)
  -> RestoreBackupAsync
  -> restore_finished(status=success/failure)
  -> rejoin_world
  -> wait REJOIN_RESULT (30s)
  -> hot_restore_complete(status=...)
```

## 关键状态与结果

最终状态通常是以下之一：

- `full_success`：还原成功且重进成功
- `restore_ok_rejoin_failed`：还原成功，但重进失败
- `restore_ok_rejoin_timeout`：还原成功，但重进超时

若链路前段失败（例如握手失败、文件未释放、备份文件缺失），则会提前广播 `restore_cancelled` 或 `restore_finished;status=failure`。

## 常见失败点

- 模组握手超时或版本不兼容
- 世界文件长期占用，未在超时内释放
- 指定备份文件不存在

## 请求/响应示例

### 指令：还原到最新备份

请求：

```text
RESTORE_CURRENT_LATEST
```

响应：

```text
OK:Hot restore triggered for 'WorldName'
```

### 指令：还原到指定备份

请求：

```text
RESTORE_CURRENT backup_2026-02-28_18-30-01.7z
```

响应：

```text
OK:Hot restore triggered for 'WorldName' with backup 'backup_2026-02-28_18-30-01.7z'
```

## 安全建议

- 首次启用热还原时，先在测试世界演练
- 使用指定备份还原前，先通过 `LIST_BACKUPS_CURRENT` 确认文件名
- 热还原失败时优先改用常规还原路径，避免连续重复触发
- 若你需要保留玩家状态，先开启 `PreservePlayerData` 再测试

## 相关链接

- [KnotLink 与联动模组](./knotlink-mod)
- [故障排查](./troubleshooting)
- [首次还原](../../getting-started/first-restore)
