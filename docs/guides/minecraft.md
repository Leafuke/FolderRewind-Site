---
sidebar_position: 1
title: Minecraft 专题
description: 使用 FolderRewind + MineRewind 保护你的 Minecraft 存档
---

# Minecraft 专题

FolderRewind 的初心源于 Minecraft 存档保护。通过官方插件 **MineRewind**，你可以获得针对 MC 存档的深度优化体验。

## 为什么需要备份 Minecraft 存档？

- 游戏崩溃导致存档损坏
- Mod 冲突破坏世界数据
- 误操作（如拆错建筑、意外死亡丢失物品）
- 想回到之前某个版本的世界状态

## MineRewind 插件功能

| 功能 | 说明 |
|------|------|
| **自动发现存档** | 智能扫描 `.minecraft/saves` 目录，自动识别所有世界 |
| **热备份** | 在游戏运行中安全地创建备份快照，无需退出游戏 |
| **版本识别** | 识别 Minecraft 版本信息，方便标记 |
| **一键配置** | 扫描后自动创建备份配置，零手动设置 |

## 快速开始

### 1. 安装 MineRewind 插件

- 在 FolderRewind 的插件管理界面中安装
- 或从 [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases) 手动下载

### 2. 扫描存档

1. 创建新配置时，选择 **Minecraft** 类型。
2. 插件会自动扫描并列出所有存档文件夹。
3. 选择要保护的世界，确认添加。

### 3. 设置自动备份

推荐配置：

- **间隔备份：** 每 30 分钟自动备份一次
- **启动时备份：** 每次启动 FolderRewind 时自动备份

### 4. 游戏中备份

使用 **Mini 悬浮窗** 或 **全局快捷键**，在游戏中随时触发备份，无需切出游戏。

## 最佳实践

1. **开启间隔备份** — 建议 15~30 分钟间隔，平衡安全与性能
2. **使用收藏功能** — 将最常玩的世界收藏，方便快速操作
3. **定期清理旧备份** — 通过保留策略自动管理磁盘空间
4. **重要时刻手动备份** — 大型建筑前、安装新 Mod 前

## 相关链接

- [首次备份](../getting-started/first-backup) — 基础备份教程
- [自动化任务](./automation) — 详细的自动化设置
- [备份模式详解](./backup-modes) — 了解不同压缩策略
