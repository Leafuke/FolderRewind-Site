---
sidebar_position: 1
title: MineBackup 1.16.2 总览
description: 第一代存档时光机 MineBackup 1.16.2 的能力边界、平台范围与文档导航
---

# MineBackup 1.16.2 总览

MineBackup 是 FolderRewind 的前身项目，也是“存档时光机”第一代。本文档以 MineBackup **1.16.2** 当前源码、CLI 行为和随附文档为准，面向仍在使用 MineBackup 的用户。

MineBackup 仍然适合已有 Minecraft 备份工作流、需要跨平台运行，或依赖 MineBackup-Mod / KnotLink 联动的用户。1.16.2 还提供正式的 headless CLI 路线，适合服务器、VPS、NAS 和 SSH-only 环境。新项目可以评估 FolderRewind，但不应把两个程序的配置文件、插件模型或服务能力混为一谈。

:::caution 版本边界
本栏目描述的是 MineBackup 1.16.2 的行为。1.16 已经弃用 Windows Service Mode，只保留对旧服务的检查与安全清理入口；服务器部署请优先阅读 CLI 学习路径。
:::

## 你希望如何使用 MineBackup？

| 使用场景 | 推荐路线 |
| --- | --- |
| 桌面电脑、需要窗口和设置页 | [GUI 快速开始：安装](/docs/guides/minebackup-v1/installation) → [创建第一套配置](/docs/guides/minebackup-v1/first-config) |
| Minecraft Dedicated Server、VPS、NAS 或 SSH-only Linux | [CLI 与服务器概览](/docs/guides/minebackup-v1/cli/overview) → [5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start) |

普通 Windows/Linux/macOS 桌面用户不需要为了使用 MineBackup 而切换 CLI；CLI 是无图形界面的补充运行方式。

## GUI 与 CLI 的关系

GUI 和 `minebackup-cli` 共享核心 runtime、Profile、History、Backup 和 Restore 数据契约，不是两套互不兼容的产品。CLI 从 1.16.2 起作为正式的 headless/server 运行方式提供；同一 Profile 仍遵守单实例占用规则。

CLI 不等于 `serve`。`minebackup-cli backup` 可以独立完成一次性备份；`serve` 只是可选的长期 Profile runtime，适合常驻服务器、KnotLink 或高频调用。

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
2. **执行层**：手动备份、GUI 自动任务、CLI Job、云同步和热备份。
3. **恢复层**：历史记录、备份链、还原方式、联动退出与重进，以及迁移或异常时的安全门禁。

## 与 FolderRewind 的关系

- **FolderRewind** 是后续产品，面向 Windows 的现代界面和插件生态。
- **MineBackup** 是独立的第一代程序，保留自己的配置、任务、联动和跨平台实现。
- 两者可以并存，但不能把 FolderRewind 的插件设置或当前世界能力直接套到 MineBackup 上。

如果准备迁移，建议先保留 MineBackup 的原配置和归档，在新配置档或新程序中做独立的备份—还原演练，再逐步切换生产流程。

## 推荐阅读顺序

### Desktop

1. [平台支持与安装边界](/docs/guides/minebackup-v1/platform-support)
2. [安装与运行前准备](/docs/guides/minebackup-v1/installation)
3. [创建第一套配置](/docs/guides/minebackup-v1/first-config)
4. [首次备份](/docs/guides/minebackup-v1/first-backup)
5. [首次还原](/docs/guides/minebackup-v1/first-restore)

### CLI

1. [CLI 与服务器模式概览](/docs/guides/minebackup-v1/cli/overview)
2. [5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)
3. [Profile 与 Manifest](/docs/guides/minebackup-v1/cli/profile-manifest)
4. [备份、历史、校验与还原](/docs/guides/minebackup-v1/cli/backup-restore)
5. [CLI 故障排查](/docs/guides/minebackup-v1/cli/troubleshooting)

两条路线都可以最后阅读[故障排查](/docs/guides/minebackup-v1/troubleshooting)；服务器用户还应继续阅读 CLI 的 Job、Serve 和平台部署页。

## 进阶入口

- [备份模式、链完整性与安全删除](/docs/guides/minebackup-v1/backup-modes)
- [历史记录与还原策略](/docs/guides/minebackup-v1/history-and-restore)
- [过滤规则](/docs/guides/minebackup-v1/filters)
- [自动化任务](/docs/guides/minebackup-v1/automation)
- [Special Config](/docs/guides/minebackup-v1/special-mode)
- [热备份与快照机制](/docs/guides/minebackup-v1/hot-backup)
- [KnotLink v2 联动](/docs/guides/minebackup-v1/knotlink-integration)
- [云归档](/docs/guides/minebackup-v1/cloud-archive)
- [配置档、便携模式与 1.15 迁移](/docs/guides/minebackup-v1/data-and-migration)
- [日志与诊断](/docs/guides/minebackup-v1/logging-and-diagnostics)
- [旧 Windows 服务清理](/docs/guides/minebackup-v1/service-mode)

## 最短成功路径

如果只想先建立一个可用闭环：

1. 安装程序并确认压缩工具可用。
2. 创建一套只包含一个世界的普通配置。
3. 使用 Full 模式完成一次手动备份。
4. 在测试世界中从历史记录执行一次还原。
5. 服务器用户则按 CLI 路线完成 `Backup → History → Verify → Restore dry-run`，再启用 Job、Serve 或系统调度。

这样可以把“基础备份失败”和“联动、云同步或迁移失败”分开定位。
