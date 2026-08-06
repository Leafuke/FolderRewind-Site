---
sidebar_position: 1
title: MineBackup 1.16.1 总览
description: 第一代存档时光机 MineBackup 1.16.1 的能力边界、平台范围与文档导航
---

# MineBackup 1.16.1 总览

MineBackup 是 FolderRewind 的前身项目，也是“存档时光机”第一代。本文档以 MineBackup **1.16.1** 当前源码和随附文档为准，面向仍在使用 MineBackup 的用户。

MineBackup 仍然适合已有 Minecraft 备份工作流、需要跨平台运行，或依赖 MineBackup-Mod / KnotLink 联动的用户。新项目可以评估 FolderRewind，但不应把两个程序的配置文件、插件模型或服务能力混为一谈。

:::caution 版本边界
本栏目描述的是 MineBackup 1.16.1 的行为。1.16 已经弃用 Windows Service Mode，只保留对旧服务的检查与安全清理入口；它也不再把配置和历史固定写在可执行文件旁边。
:::

## MineBackup 能做什么

- 管理 Minecraft 世界或任意文件夹，并按配置隔离不同来源目录。
- 使用 Full、Smart、Overwrite 三种配置级备份模式。
- 通过历史记录、Smart 链元数据和 Clean / Overwrite / Reverse / Custom 方式恢复内容。
- 使用间隔、计划、启动触发、统一任务系统和 Special Config 执行自动化工作。
- 在游戏运行中尝试热备份、热还原，以及通过 KnotLink v2 与联动模组协作。
- 使用 rclone 同步历史记录、备份包和必要的元数据。
- 在 Windows、Linux x86_64 和 macOS arm64 上复用相同的核心备份与历史数据契约。

## 先理解三个层次

MineBackup 的使用可以按三个层次理解：

1. **配置档与备份配置**：决定配置文件、历史、缓存、工具和日志的位置，并定义 `saveRoot`、`backupPath`、压缩、保留和过滤规则。
2. **执行层**：手动备份、自动任务、特殊模式、云同步和热备份。
3. **恢复层**：历史记录、备份链、还原方式、联动退出与重进，以及迁移或异常时的安全门禁。

## 与 FolderRewind 的关系

- **FolderRewind** 是后续产品，面向 Windows 的现代界面和插件生态。
- **MineBackup** 是独立的第一代程序，保留自己的配置、任务、联动和跨平台实现。
- 两者可以并存，但不能把 FolderRewind 的插件设置或当前世界能力直接套到 MineBackup 上。

如果准备迁移，建议先保留 MineBackup 的原配置和归档，在新配置档或新程序中做独立的备份—还原演练，再逐步切换生产流程。

## 推荐阅读顺序

1. [平台支持与安装边界](./platform-support)
2. [安装与运行前准备](./installation)
3. [创建第一套配置](./first-config)
4. [首次备份](./first-backup)
5. [首次还原](./first-restore)
6. [故障排查](./troubleshooting)

## 进阶入口

- [备份模式、链完整性与安全删除](./backup-modes)
- [历史记录与还原策略](./history-and-restore)
- [过滤规则](./filters)
- [自动化任务](./automation)
- [Special Config](./special-mode)
- [热备份与快照机制](./hot-backup)
- [KnotLink v2 联动](./knotlink-integration)
- [云归档](./cloud-archive)
- [配置档、便携模式与 1.15 迁移](./data-and-migration)
- [日志与诊断](./logging-and-diagnostics)
- [旧 Windows 服务清理](./service-mode)

## 最短成功路径

如果只想先建立一个可用闭环：

1. 安装程序并确认压缩工具可用。
2. 创建一套只包含一个世界的普通配置。
3. 使用 Full 模式完成一次手动备份。
4. 在测试世界中从历史记录执行一次还原。
5. 再按需要启用 Smart、自动化、云归档或 KnotLink 热流程。

这样可以把“基础备份失败”和“联动、云同步或迁移失败”分开定位。
