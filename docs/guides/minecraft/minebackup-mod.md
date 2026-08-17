---
sidebar_position: 2
title: MineBackup-Mod（模组化服务端联动）
description: 当前 MineBackup-Mod 的安装、命令、热备份、热还原与专用服务端 Sidecar 说明
---

# MineBackup-Mod（模组化服务端联动）

MineBackup-Mod 是 Minecraft 侧的联动模组，连接 MineBackup 或 FolderRewind 与游戏运行时。它负责游戏内命令、世界保存、热备份前协同、热还原前退出，以及还原后的自动重进。

它不能单独运行：必须同时运行一个主程序，并通过 KnotLink 建立通信。

## 它和其他组件如何分工

- **MineBackup / FolderRewind**：保存归档、读取归档并执行实际备份/还原。
- **MineRewind**：FolderRewind 的 Minecraft 专用扩展，负责存档发现、配置创建和当前世界热流程。
- **MineBackup-Mod**：模组化服务端中的游戏内桥梁，负责保存、退出和重进。
- **MineBackupPlugin**：Spigot/Paper 服务端的替代联动实现，不需要与本模组同时安装在同一类服务端上。
- **Death Rewind**：在 MineBackup API v2 之上提供定时检查点和死亡界面回溯。
- **Just Enough Accidents**：在 MineBackup API v2 之上提供事故检测和现场快照。
- **KnotLink**：在主程序、Minecraft 扩展和游戏侧组件之间传输命令与状态。

## 支持范围

| 加载器 | Minecraft 版本 | 映射/运行说明 |
| --- | --- | --- |
| Fabric | 1.21 | Yarn |
| Fabric | 1.21.9～1.21.11 | Mojang |
| Fabric | 26.1～26.1.2 | 官方映射 |
| Fabric | 26.2 | 官方映射 |
| NeoForge | 1.21 | Parchment |
| NeoForge | 26.1～26.1.2 | 官方映射 |
| Forge | 1.20～1.20.4 | 官方映射 |

版本号和 JAR 下载以 [MineBackup-Mod Releases](https://github.com/Leafuke/MineBackup/releases) 或对应模组发布页为准。Windows 用户通常使用 [FolderRewind](https://apps.microsoft.com/detail/9nwsdgxdqws4) + [MineRewind](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases)；其他平台也可以使用 [MineBackup 主程序](https://github.com/Leafuke/MineBackup/releases)。

## 安装前置

1. 安装 MineBackup，或安装 FolderRewind 与 MineRewind。
2. 安装 [KnotLink 服务端](https://github.com/KnotLink-Protocol/KnotLinkService/releases)。Windows 上需要让它提供本机通信端点 `127.0.0.1:6372/6376`；Linux/macOS 的通信方式以对应发布说明为准。
3. 下载与你的加载器、Minecraft 版本匹配的 MineBackup-Mod JAR。
4. 单人/LAN 场景放入客户端 `mods`；专用模组化服务端场景放入服务端 `mods`，客户端是否安装取决于你要使用的客户端功能。
5. 同时启动主程序和 Minecraft，再先完成一次测试备份。

如果运行的是 Spigot/Paper，而不是模组化服务端，请改用 [MineBackupPlugin（Spigot/Paper 联动插件）](/docs/guides/minecraft/minebackup-plugin)。

## 游戏内命令

所有命令都需要权限：专用服务器通常要求 OP；单人世界由世界所有者使用。

| 命令 | 参数 | 说明 |
| --- | --- | --- |
| `/mb save` | 无 | 保存全部玩家和全部已加载世界，效果接近 `/save-all` |
| `/mb backup` | `[注释]` | 备份当前世界，可附加注释 |
| `/mb restore` | `[文件名]` | 还原当前世界；省略文件名时使用最新归档 |
| `/mb confirm` | 无 | 立即确认倒计时中的还原 |
| `/mb stop` | 无 | 取消尚未提交的还原倒计时 |
| `/mb list backups` | `[current [页码]]` | 显示当前世界可交互的分页归档列表 |
| `/mb list configs` | 无 | 列出主程序配置及 ID |
| `/mb list folders` | `<config_id>` | 列出配置中的文件夹 |
| `/mb list backups` | `<config_id> <folder>` | 列出指定目标归档 |
| `/mb target backup` | `<config_id> <folder> [注释]` | 备份非当前世界目标 |
| `/mb target restore` | `<config_id> <folder> <文件名>` | 单机/LAN 下还原非当前世界目标 |
| `/mb auto start` | `<分钟>` | 启动当前世界定时备份 |
| `/mb auto stop` | 无 | 停止当前世界定时备份 |
| `/mb help` | `[指令]` | 显示帮助和示例 |

`/mb list backups` 的当前世界列表包含时间、注释和可点击的 `[还原]` 按钮。所有目标还原都受当前操作门和权限约束；专用服务器不会接受任意目标还原。

## 热备份流程

当主程序需要在世界仍运行时备份，模组会：

1. 接收热备份请求。
2. 执行完整世界保存。
3. 在备份窗口内冻结自动保存。
4. 回传世界已经保存的信号。
5. 让主程序执行备份。
6. 备份完成后解除冻结。

冻结有超时保护；但它仍是尽力而为的协同层，不代表任何外部程序、权限或通信故障都能自动修复。

## 热还原流程

当前世界热还原会经历：

1. 握手和最低版本检查。
2. 保存并退出当前世界/会话。
3. 等待世界文件释放。
4. 还原最新归档或指定归档。
5. 接收还原终态。
6. 自动重进或返回重进结果。

本流程会改变正在使用的世界。首次使用时必须在测试世界完成一次完整“备份—还原—重进”演练，并保留一份可独立还原的完整归档。

## 专用服务端 Sidecar 还原

当前模组化专用服务端还原由内置纯 JDK Sidecar 负责安全交接，不需要额外安装 MineBackupPlugin。默认配置如下：

```properties
dedicatedRestore.mode=SIDECAR
dedicatedRestore.restartScript=
dedicatedRestore.sidecarStartTimeoutSeconds=5
dedicatedRestore.worldReleaseTimeoutSeconds=8
dedicatedRestore.operationTimeoutSeconds=3600
```

还原时，模组会先验证重启脚本、会话目录和操作状态，再保存所有玩家，写入交接文件并启动 Sidecar。Sidecar 会确认已经订阅 KnotLink、等待父 JVM 退出、连续确认世界文件释放，最后只在收到主程序明确成功/失败/取消终态后执行一次重启脚本。

未知结果、断连或超时会让服务端保持离线，不会把静默当成安全成功。不要同时使用会在 JVM 退出后立即重启的面板或 wrapper。

## 常见边界

- 主程序未运行或 KnotLink 未建立时，游戏内命令会报告通信失败。
- 指定归档文件必须真实存在。
- 热还原依赖模组握手、世界退出和文件释放超时。
- 专用服务端还原成功后，重启脚本只负责重新启动服务端；玩家需要等待服务端起来后重新连接。
- `Death Rewind` 和 JEA 共享 MineBackup 的归档保留策略，不能提供独立的永久保护槽位。

## 相关文档

- [Minecraft 专题总览](/docs/guides/minecraft/overview)
- [MineBackupPlugin（Spigot/Paper 联动插件）](/docs/guides/minecraft/minebackup-plugin)
- [Death Rewind（死亡回溯）](/docs/guides/minecraft/death-rewind)
- [Just Enough Accidents（险兆备份）](/docs/guides/minecraft/just-enough-accidents)
- [KnotLink 与联动模组](/docs/guides/minecraft/knotlink-mod)
- [热备份机制详解](/docs/guides/minecraft/hot-backup)
- [热还原机制详解](/docs/guides/minecraft/hot-restore)
