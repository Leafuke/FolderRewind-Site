---
sidebar_position: 3
title: 热备份机制详解
description: MineRewind 如何在游戏运行中安全触发备份
---

# 热备份机制详解

本文解释 MineRewind 在“世界正在运行”时如何尽量安全地完成备份。

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

## 执行流程（简化）

1. 读取插件设置并确认 `EnableHotBackup = true`
2. 尝试与联动模组握手（action = `backup`）
3. 若握手成功，发送 `pre_hot_backup` 事件
4. 等待 `WORLD_SAVED` 确认（有超时）
5. 进入宿主备份流程

> 若握手失败、超时或兼容性不足，插件会回退到直接备份流程。

## 关键超时与行为

- 握手等待：约 3 秒
- 等待世界保存：约 10 秒
- 超时后策略：记录日志并继续执行常规备份

这意味着热备份协同是“尽力而为”，不会无限阻塞备份任务。

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
