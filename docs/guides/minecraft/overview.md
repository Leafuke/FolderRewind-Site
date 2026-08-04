---
sidebar_position: 1
title: Minecraft 专题总览
description: FolderRewind、MineRewind 与 MineBackup 联动组件的 Minecraft 存档保护方案
---

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

# Minecraft 专题总览

MineRewind 是 FolderRewind 官方 Minecraft 扩展，面向 Minecraft 存档提供“游戏运行中备份与还原”、存档发现、热键和当前世界协同能力。

本专题还包含多个直接联动组件。它们各自负责不同运行场景：模组化服务端使用 MineBackup-Mod，Spigot/Paper 使用 MineBackupPlugin，单人死亡回溯使用 Death Rewind，险兆检测使用 Just Enough Accidents。

![FolderRewind、MineRewind 与 Minecraft 联动组件关系图](/img/docs/guides/minecraft/minebackup-ecosystem.png)

![FolderRewind 设置页中的 MineRewind 插件卡片，显示插件已启用](/img/docs/guides/minecraft/mine-rewind-settings.webp)

*图中 `Time Machine` 问号是未纳入本次介绍范围的未来/占位扩展；本文只覆盖 MineBackup-Mod、MineBackupPlugin、Death Rewind 和 Just Enough Accidents。*

<MinecraftEcosystem />

## 典型组合

| 目标场景 | 推荐组合 | 关键限制 |
| --- | --- | --- |
| Windows 单人世界 | FolderRewind + MineRewind + MineBackup-Mod | 需要 KnotLink；热还原会退出并自动重进 |
| 模组化专用服务器 | FolderRewind 或 MineBackup + MineBackup-Mod | 使用内置 Sidecar，不需要 MineBackupPlugin |
| Spigot/Paper 专用服务器 | FolderRewind 或 MineBackup + MineBackupPlugin | 还原后玩家需要手动重新连接 |
| 单人死亡回溯 | MineBackup-Mod + Death Rewind | 只支持 Fabric 26.1～26.1.2 的单人/LAN 房主 |
| 险兆现场快照 | MineBackup-Mod + JEA | JEA 0.2.0 不支持专用服务器 |

主程序、Minecraft 扩展和联动组件必须使用相互兼容的版本。下载时以各项目发布页为准：

- [MineBackup-Mod Releases](https://github.com/Leafuke/MineBackup/releases)
- [MineBackupPlugin Releases](https://github.com/Leafuke/MineBackup-Plugin/releases)
- [Death Rewind Releases](https://github.com/Leafuke/DeathRewind/releases)
- [Just Enough Accidents Releases](https://github.com/Leafuke/JustEnoughAccidents/releases)
- [MineRewind Releases](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases)
- [KnotLink Service Releases](https://github.com/KnotLink-Protocol/KnotLinkService/releases)

## MineRewind 能力

### 1. 存档发现与批量建配置

支持识别以下结构并自动创建配置：

- `.minecraft/saves/*`
- `.minecraft/versions/<version>/saves/*`
- `versions/<version>/saves/*`
- `<version>/saves/*`
- `saves/*`
- 对应版本下的 `mods` 文件夹可一并纳入备份。

插件将配置类型标记为 `Minecraft Saves`，并自动补充必要过滤规则，例如 `session.lock`。

![MineRewind 插件设置，展示自动发现存档和自动识别添加配置开关](/img/docs/guides/minecraft/mine-rewind-plugin-settings.webp)

### 2. 热备份协同

备份前会根据状态决定是否走热备份协同：

- 世界文件被占用，例如 `level.dat` 锁定。
- 命令明确要求强制热备份。

满足条件且 KnotLink 可用时，MineRewind 会与游戏侧组件握手，等待世界保存落盘后再进入备份流程。握手失败或超时会记录原因，并按插件策略回退到常规备份。

### 3. 当前世界热还原

MineRewind 支持以下当前世界热还原链路：

1. 与联动组件握手。
2. 请求保存并退出当前世界。
3. 等待世界文件释放。
4. 还原最新或指定备份。
5. 发送重进信号并等待结果。

这是 Minecraft 专题中最重要的差异化能力，但它不能绕过文件占用、权限和超时边界。

### 4. 全局热键

- `Alt+Ctrl+S`：备份当前活跃世界。
- `Alt+Ctrl+Z`：热还原当前活跃世界。

可以在 Host 中调整热键映射。

### 5. KnotLink 参数化命令

MineRewind 通过参数化协议 v2 扩展 Host 命令：

- `cmd=BACKUP;current_save=true;...`
- `cmd=RESTORE;current_save=true;...`
- `cmd=LIST_BACKUPS;current_save=true`
- `preserve_player_data=true` 作为还原覆盖参数。

### 6. 可选的玩家数据保留

启用 `PreservePlayerData` 后，插件可以在还原前提取玩家数据，并在还原后写回 `level.dat`。这适合想回滚建筑进度、同时尽量保留玩家状态的场景，但必须先在测试世界验证。

## 使用前置条件

- 使用满足 MineRewind `MinHostVersion` 的 FolderRewind。
- 若要使用热还原，安装并运行兼容的 Minecraft 联动组件和 KnotLink。
- 根据运行场景选择 MineBackup-Mod 或 MineBackupPlugin，不要把两种服务端方案混用。

## 风险与边界

- 热还原依赖联动组件状态，握手、保存、退出、文件释放或重进超时都会取消流程。
- 指定备份还原要求文件真实存在。
- 指定区域备份属于部分备份，普通还原和热还原都会强制使用 `Overwrite`。
- Death Rewind 使用全局最新归档，归档不一定由它自己创建。
- JEA 记录事故现场，不保证是事故前的安全点。
- 所有自动化链路都应先在测试世界手动演练。

## 下一步

- 新用户先看 [Minecraft 快速开始](./quick-start)。
- 了解模组化服务端联动看 [MineBackup-Mod](./minebackup-mod)。
- 了解 Spigot/Paper 联动看 [MineBackupPlugin](./minebackup-plugin)。
- 需要死亡回溯看 [Death Rewind](./death-rewind)。
- 需要险兆快照看 [Just Enough Accidents](./just-enough-accidents)。
- 超大型世界按范围保护看 [指定区域备份](./selected-region-backup)。
- 了解热备份看 [热备份机制详解](./hot-backup)。
- 了解热还原看 [热还原机制详解](./hot-restore)。
- 联动接入看 [KnotLink 与联动模组](./knotlink-mod)。
- 出现异常先看 [故障排查](./troubleshooting)。
