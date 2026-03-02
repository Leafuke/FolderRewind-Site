---
sidebar_position: 1
title: Minecraft 专题总览
description: 基于 MineRewind 的 Minecraft 存档保护方案全景介绍
---

# Minecraft 专题总览

MineRewind 是 FolderRewind 官方插件，面向 Minecraft 场景提供“可运行中的备份与还原”能力。

本文基于当前插件源码能力整理，重点覆盖你在实战中真正会用到的功能边界。

需要添加插件 MineRewind 以及至少一个联动模组或者联动插件以获得最优效果。

MineBackup-Mod：https://modrinth.com/mod/minebackup  
MineBackup-Plugin：https://modrinth.com/plugin/minebackupplugin

如果你希望系统了解 Minecraft 端联动模组本身（安装前置、完整命令、热还原重进链路与边界），建议继续阅读：

- [MineBackup 联动模组详解](./minebackup-mod)

## 适合谁

- 生存档长期玩家（担心崩档、误操作、Mod 冲突）
- 服务器/整合包测试者（频繁回档）
- 需要“尽量少中断游戏流程”的用户

## MineRewind 已实现能力

## 1) 目录发现与批量建配置

支持识别以下结构并自动创建配置：

- `.minecraft/saves/*`
- `.minecraft/versions/<version>/saves/*`
- 对应版本下的 `mods` 文件夹可一并纳入备份

插件将配置类型标记为 `Minecraft Saves`，并自动补充必要过滤规则（如 `session.lock`）。

## 2) 热备份协同

备份前会根据状态决定是否走热备份协同：

- 世界文件被占用（如 `level.dat` 锁定）时
- 或命令触发了“强制热备份”

在满足条件且 KnotLink 可用时，插件会尝试与联动模组握手并等待存档落盘，再进入备份流程。

## 3) 热还原链路

MineRewind 支持“当前活跃世界”的热还原流程：

1. 与联动模组握手
2. 请求模组保存并退出世界
3. 等待文件释放
4. 执行还原（最新备份或指定备份）
5. 发送重进世界信号并等待结果

这是当前 Minecraft 专题中最重要的差异化能力。

## 4) 全局热键

- `Alt+Ctrl+S`：备份当前活跃世界
- `Alt+Ctrl+Z`：热还原当前活跃世界

你可以在 Host 中调整热键映射。

## 5) KnotLink 命令扩展

插件已扩展以下命令：

- `BACKUP_CURRENT`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT <backup_file>`

## 6) 可选的玩家数据保留

启用 `PreservePlayerData` 后，插件可在还原前提取玩家数据，并在还原后写回 `level.dat`。

适合“想回档建筑进度，但尽量保留玩家状态”的场景。

## 使用前置条件

- 使用支持版本的 FolderRewind（以插件 `manifest.json` 中 `MinHostVersion` 为准）
- 若要使用热还原链路，需要安装并正常运行联动模组与 KnotLink 服务

## 风险与边界

- 热还原依赖联动模组状态，超时会自动取消流程
- 指定备份文件还原要求文件真实存在
- 任何自动化链路都建议先做一次手动演练

## 下一步

- 新用户先看 [Minecraft 快速开始](./quick-start)
- 了解备份细节看 [热备份机制详解](./hot-backup)
- 了解还原细节看 [热还原机制详解](./hot-restore)
- 联动接入看 [KnotLink 与联动模组](./knotlink-mod)
- MineBackup 模组能力看 [MineBackup 联动模组详解](./minebackup-mod)
- 出现异常先看 [故障排查](./troubleshooting)
- 开发者看 [KnotLink 协议与联动](../../plugins/knotlink)
- 插件开发看 [Plugin API 参考](../../plugins/developing/plugin-api)
