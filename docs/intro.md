---
sidebar_position: 0
title: 快速开始
description: 5 分钟上手 FolderRewind
---

# 快速开始

欢迎使用 **FolderRewind（存档时光机）**！本指南将帮助你在 5 分钟内完成从安装到首次备份的全部流程。

:::caution v1.5.0 升级提醒
当前版本的备份与还原逻辑发生了破坏性更改，不能 100% 保证从旧版本升级后的行为仍与此前完全一致。
在投入生产使用前，请务必先在测试目录、测试项目或测试存档中完成几轮备份与还原演练，确认结果符合预期。
:::

## 什么是 FolderRewind？

FolderRewind 是一款基于 WinUI 3 的现代化文件夹备份管理工具。它能够：

- 使用 **7-Zip 引擎** 高效压缩和加密备份
- 通过 **改进的智能增量链**、链长截断与安全删除，管理长期备份历史
- 在 Clean 模式下启用 **安全还原**，异常时自动回滚到初始状态
- 支持通过 **rclone 等第三方工具** 将备份同步到云端或其他存储
- 通过 **插件系统** 为特定场景（如 Minecraft）深度优化，插件甚至可以接管还原逻辑

## 快速上手三步走

### 第一步：安装

从 Microsoft Store 获取（推荐），或参考 [安装指南](./getting-started/installation) 进行侧载安装。

> 建议优先使用 Microsoft Store 下载，**请勿同时安装商店版与当前页面下载的离线版**。

<a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
  👉 从 Microsoft Store 安装
</a>

### 第二步：创建配置并添加文件夹

1. 启动 FolderRewind，点击 **「新建配置」**。
2. 选择配置类型（通常选择 **Default**），为配置命名。
3. 进入管理页面，点击 **「添加文件夹」**，选择要保护的文件夹。

![新建配置与添加文件夹入口](/img/docs/intro/create-config-and-add-folder-entry.png)

> **Minecraft 玩家？** 安装 [MineRewind 插件](./guides/minecraft/overview)后，可自动扫描并发现所有存档文件夹。

### 第三步：执行首次备份

在管理页面点击 **「一键备份所有」**，或先选中文件夹后点击 **「备份此文件夹」**。备份完成后，可在 **历史版本** 中看到这次记录。

如果你是从旧版本升级，或者当前数据非常重要，建议紧接着在测试目录执行一次还原验证，再把这套配置投入生产使用。

🎉 **恭喜！** 你的文件夹已受到保护。

## 下一步

- [安装指南](./getting-started/installation) — 详细的安装说明
- [首次备份](./getting-started/first-backup) — 深入了解备份选项
- [首次还原](./getting-started/first-restore) — 学习如何还原（恢复）文件
- [Minecraft 专题](./guides/minecraft/overview) — MC 玩家必读
- [自动化任务](./guides/automation) — 设置自动备份
