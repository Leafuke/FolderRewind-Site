---
sidebar_position: 1
title: 一代时光机总览（MineBackup）
description: MineBackup 的定位、能力边界与文档导航
---

# 一代时光机总览（MineBackup）

MineBackup 是 FolderRewind 的前身项目，也是“存档时光机”第一代。当前仍在维护，并且在 Minecraft 场景下保留了大量成熟能力。

如果你是服主、整合包测试者，或主要在 Linux / macOS 环境使用存档时光机，MineBackup 依然是一条稳定路线。

本文档栏目基于参考源码整理，目标是提供可直接操作的完整说明书。

## 适合哪些用户

- 已经在使用 MineBackup 的老用户，希望整理规范流程
- 多启动器 / 多实例玩家，希望分配置隔离管理存档
- 需要高频备份和可回滚能力的服主、整合包作者
- 想逐步迁移到 FolderRewind，但要先保证旧工作流稳定的人

## 这一代的核心思路

MineBackup 的设计可以理解为三层：

1. **配置层**：定义路径、压缩、备份策略、过滤规则
2. **执行层**：手动备份、自动化任务、特殊模式批处理
3. **恢复层**：历史记录、还原模式、联动重进与故障兜底

读文档时也建议按这三层理解，问题定位会更快。

## 你能在一代做到什么

- 建立多套配置，分别管理不同启动器/游戏目录
- 执行全量、智能增量、覆写三种备份模式
- 从历史记录中按文件还原，并选择不同还原策略
- 配置自动备份任务与特殊模式自动化流程
- 在需要时启用热备份、快照路径、KnotLink 联动与服务模式

## 与 FolderRewind 的关系

- FolderRewind：新一代主程序，插件生态更完整
- MineBackup：一代主程序，仍适合已有工作流与 Minecraft 用户

你可以把它当成“两个可并存的体系”：

- 想继续稳定生产：保留 MineBackup
- 想逐步升级：在新目录搭建 FolderRewind，再灰度迁移

如果你在使用 MineRewind / MineBackup-Mod 联动链路，建议同时阅读：

- [Minecraft 专题总览](../minecraft/overview)
- [MineBackup 联动模组详解](../minecraft/minebackup-mod)

## 推荐阅读顺序

1. [安装与运行前准备](./installation)
2. [创建第一套配置](./first-config)
3. [首次备份](./first-backup)
4. [首次还原](./first-restore)
5. [故障排查](./troubleshooting)

## 高级主题入口

- [备份模式详解](./backup-modes)
- [历史记录与还原策略](./history-and-restore)
- [自动化任务](./automation)
- [特殊模式（Special Config）](./special-mode)
- [热备份与快照机制](./hot-backup)
- [黑名单与还原白名单](./filters)
- [KnotLink 联动机制](./knotlink-integration)
- [服务模式（Windows）](./service-mode)

## 一次性读完太长？先走最短成功路径

如果你希望 30 分钟内完成可用闭环，直接按下面顺序：

1. [安装与运行前准备](./installation)
2. [创建第一套配置](./first-config)
3. [首次备份](./first-backup)
4. [首次还原](./first-restore)
5. [故障排查](./troubleshooting)

完成后你就具备“可备份、可恢复、可排错”的最小生产能力，再进阶自动化会更稳。
