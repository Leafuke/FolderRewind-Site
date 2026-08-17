---
sidebar_position: 2
title: Minecraft 快速开始
description: 10 分钟完成 MineRewind 安装、扫描和首次备份
---

# Minecraft 快速开始

## 步骤 1：安装插件

1. 打开 FolderRewind 的插件管理。
2. 安装 `MineRewind`（市场安装或本地 ZIP）。
3. 重启应用。

![FolderRewind 设置页中的 MineRewind 插件卡片](/img/docs/guides/minecraft/mine-rewind-settings.webp)

## 步骤 2：扫描 `.minecraft`

1. 新建配置时选择 Minecraft 相关流程。
2. 选择你的 `.minecraft` 根目录。
3. 让插件自动发现存档并创建配置。

![MineRewind 插件设置，展示自动发现存档和自动识别添加配置开关](/img/docs/guides/minecraft/mine-rewind-plugin-settings.webp)

打开生成的世界配置后，可以在文件夹详情中确认世界名称、游戏模式和存档格式等信息。

![Minecraft 世界详情窗口，展示世界名称、游戏模式、种子和存档格式](/img/docs/guides/minecraft/minecraft-world-details.webp)

## 步骤 3：验证一次备份

1. 选择一个世界执行手动备份。
2. 检查备份记录是否生成。
3. 可选：在测试世界演练一次还原。

## 推荐设置

- `EnableHotBackup = true`
- 若你需要还原后尽量保留玩家状态，再开启 `PreservePlayerData`

## 下一步

- [Minecraft 专题总览](/docs/guides/minecraft/overview)
- [热备份机制详解](/docs/guides/minecraft/hot-backup)
- [热还原机制详解](/docs/guides/minecraft/hot-restore)
- [自动化任务](/docs/guides/automation)
- [备份模式详解](/docs/guides/backup-modes)
