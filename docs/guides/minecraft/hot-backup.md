---
sidebar_position: 3
title: 热备份机制详解
description: MineRewind 如何在游戏运行中安全触发备份
---

# 热备份机制详解

本文面向“已经在用 MineRewind 的进阶用户”，重点说明热备份何时触发、内部如何决策，以及失败时为何会回退到普通备份。

## 源码映射

| 能力 | 核心方法/常量 | 位置 |
|---|---|---|
| 热备份主入口 | `OnBeforeBackupFolder(...)` | `MinecraftSavesPlugin.Snapshot.cs` |
| 强制热备份标记 | `MarkForceHotBackup` / `IsForceHotBackupRequested` | `MinecraftSavesPlugin.Snapshot.cs` |
| 文件占用检测 | `IsFileLocked(...)` | `MinecraftSavesPlugin.Snapshot.cs` |
| 备份握手流程 | `PerformModHandshakeSync("backup", ...)` | `MinecraftSavesPlugin.Restore.cs` |
| 关键开关 | `EnableHotBackup` (`HotBackupSettingKey`) | `MinecraftSavesPlugin.cs` |
| 关键超时 | `HandshakeTimeoutMs` / `WorldSaveTimeoutMs` | `MinecraftSavesPlugin.cs` |

## 触发入口

热备份通常由以下入口触发：

- 普通备份流程（备份前检测到世界文件被占用）
- 全局热键 `Alt+Ctrl+S`
- KnotLink 命令 `BACKUP_CURRENT`

## 触发条件

MineRewind 会优先确认是否属于 Minecraft 世界目录：

- 当前 `ManagedFolder` 下存在 `level.dat`
- 配置类型是 `Minecraft Saves`

满足后，再判断是否需要热备份协同：

- `level.dat` 处于锁定状态
- 或被命令标记为“强制热备份”

不满足上述条件时，插件直接返回 `null`，由宿主继续常规备份。

## 执行流程（源码对照）

1. 读取插件设置并确认 `EnableHotBackup = true`
2. 尝试与联动模组握手（action = `backup`）
3. 若握手成功，发送 `pre_hot_backup` 事件
4. 等待 `WORLD_SAVED` 确认（有超时）
5. 进入宿主备份流程

> 若握手失败、超时或兼容性不足，插件会回退到直接备份流程。

### 流程时序（文本版）

```text
Host backup start
	-> MineRewind.OnBeforeBackupFolder
		 -> 检查 configType + EnableHotBackup + level.dat
		 -> 若锁定/强制热备份: handshake(action=backup)
				-> 成功: Broadcast pre_hot_backup
				-> 等待 WORLD_SAVED (10s)
				-> 无论成功与否都返回给 Host
	-> Host 继续执行备份引擎
```

## 关键超时与行为

- 握手等待：`HandshakeTimeoutMs = 3000`
- 等待世界保存：`WorldSaveTimeoutMs = 10000`
- 超时后策略：记录日志并继续执行常规备份

这意味着热备份协同是“尽力而为”，不会无限阻塞备份任务。

## 命令触发示例

### 请求

```text
BACKUP_CURRENT QuickSave
```

### 典型响应

```text
OK:Backup started for 'WorldName'
```

若无活跃世界：

```text
ERROR:No active world.
```

## 与普通备份的差异

- 普通备份：直接进入备份引擎
- 热备份：先尝试“模组落盘协同”再进入备份

## 推荐实践

- 长时游玩世界建议保留 `EnableHotBackup = true`
- 第一次使用时先做一次手动演练，确认联动链路可用
- 大型整合包建议在关键时刻额外触发一次手动备份

## 相关链接

- [Minecraft 快速开始](./quick-start)
- [热还原机制详解](./hot-restore)
- [KnotLink 与联动模组](./knotlink-mod)
