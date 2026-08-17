---
title: MineBackupPlugin（Spigot/Paper 联动插件）
description: 为 Spigot 和 Paper 专用服务器提供 FolderRewind/MineBackup 备份、热还原与 Sidecar 安全交接
---

# MineBackupPlugin（Spigot/Paper 联动插件）

MineBackupPlugin 是 Minecraft 模组化服务端之外的联动方案，面向 Spigot、Paper 以及兼容 Bukkit/Spigot API 的专用服务器。它不自行存储备份，而是负责保存世界、通过 KnotLink 请求 MineBackup 或 FolderRewind 执行备份，并在还原时把停服后的文件释放流程交给纯 JDK Sidecar。

:::warning 它不是独立备份程序
运行插件时，后台仍必须有 MineBackup 或 FolderRewind，以及可用的 KnotLink 服务。插件无法脱离主程序单独创建或还原归档。
:::

## 适用范围

| 项目 | 当前基线 |
| --- | --- |
| 服务端 | Spigot、Paper，以及保持 Bukkit/Spigot API 兼容的服务端 |
| Minecraft | 1.21.1～26.2 |
| Java | Java 21 字节码；Minecraft 26.2 服务端可在 Java 25 上运行同一 JAR |
| FolderRewind | 1.16.0 或更高版本 |
| 权限 | 默认只有 OP 拥有 `minebackup.command` |

实际可下载版本和最新兼容矩阵以 [MineBackupPlugin Releases](https://github.com/Leafuke/MineBackup-Plugin/releases) 或 [Modrinth 页面](https://modrinth.com/plugin/minebackupplugin) 为准。

## 前置与安装

准备以下组件：

1. MineBackup 或 FolderRewind 主程序。
2. 如果使用 FolderRewind，安装 MineRewind Minecraft 扩展并配置 Minecraft 存档目标。
3. KnotLink 服务端；Windows 上需要让它监听本机通信端点。
4. 与服务端 Minecraft 版本匹配的 MineBackupPlugin JAR。

安装步骤：

1. 将 JAR 放入服务端的 `plugins` 目录。
2. 启动一次服务端，让插件生成 `plugins/MineBackupPlugin/config.yml`。
3. 确认主程序、Minecraft 扩展和 KnotLink 正在运行。
4. 执行 `/mb status`，检查连接、当前操作、自动保存和 Sidecar 状态。

插件支持 `zh_cn` 与 `en_us`。控制台使用 `default-language`；开启 `follow-player-locale` 后，玩家消息会尽量跟随客户端语言。

## 命令参考

所有命令默认需要 `minebackup.command` 权限。

| 命令 | 作用 |
| --- | --- |
| `/mb help` | 显示帮助 |
| `/mb status` | 查看 KnotLink、当前操作、自动保存、调度和 Sidecar 状态 |
| `/mb save` | 保存全部玩家和全部已加载世界 |
| `/mb backup [comment]` | 备份当前世界，可附加注释 |
| `/mb restore [backup-file]` | 使用指定文件或最新备份还原当前世界 |
| `/mb confirm` | 立即提交倒计时中的还原 |
| `/mb stop` | 取消尚未提交的还原倒计时 |
| `/mb list configs` | 列出 FolderRewind 配置 |
| `/mb list folders <config-id>` | 列出配置中的文件夹 |
| `/mb list backups <config-id> <folder>` | 列出指定目标的归档 |
| `/mb target backup <config-id> <folder> [comment]` | 备份非当前世界目标 |
| `/mb auto start <minutes>` | 开启当前世界定时备份 |
| `/mb auto stop` | 停止定时备份 |
| `/mb reload` | 原子重载插件配置 |

带空格的文件夹、文件名或注释使用双引号；双引号和反斜杠可以用 `\` 转义。所有还原都必须经过当前世界操作门，不支持任意目标还原。

## 默认配置

首次启动生成的 `config.yml`：

```yaml
# MineBackupPlugin 3 configuration
config-version: 2

general:
  debug: false

localization:
  # zh_cn or en_us. Console and non-player messages use this language.
  default-language: zh_cn
  # Each player receives messages in their Minecraft client language when possible.
  follow-player-locale: true

backup:
  freeze-timeout-seconds: 180

restore:
  countdown-seconds: 10

dedicated-restore:
  # SIDECAR or DISABLED
  mode: SIDECAR
  # Empty: discover exactly one start.bat/start.cmd/run.bat/run.cmd or start.sh/run.sh.
  restart-script: ""
  sidecar-start-timeout-seconds: 5
  world-release-timeout-seconds: 8
  operation-timeout-seconds: 3600

auto-backup:
  # 0 disables automatic current-world backups.
  interval-minutes: 0

logging:
  enabled: true
  max-size-mib: 10
  retained-files: 5
```

从 2.x 升级时，旧配置不会被猜测性迁移。插件会先将旧文件保存为 `config-v1-backup-时间.yml`，然后生成 `config-version: 2` 的新配置。

## 热备份

热备份由插件在外部备份开始前协同完成：

1. 保存全部玩家和已加载世界。
2. 在备份窗口内冻结自动保存，避免文件继续写入。
3. 将文件交给主程序执行备份。
4. 备份完成后解除冻结。

自动保存冻结有超时保护。即使外部程序异常，也会在超时后尝试恢复自动保存；操作完成后仍建议检查 `/mb status`。

## 专用服务器热还原与 Sidecar

默认 `dedicated-restore.mode` 为 `SIDECAR`。还原流程如下：

1. 预检唯一的启动脚本、会话目录和当前操作状态。
2. 保存所有玩家与已加载世界，并写入交接状态。
3. 启动纯 JDK Sidecar，确认它已订阅 KnotLink 后才踢出玩家并正常关闭服务器。
4. Sidecar 等待父 JVM 退出，并连续确认世界文件已经释放。
5. 只有收到主程序明确的成功、失败或取消终态后，才执行一次重启脚本。

断连、超时或未知终态会被标记为不确定状态，服务器保持离线，不会把“没有消息”误判为成功。

:::danger 不要让两个重启器同时接管 JVM
不要同时启用面板或 wrapper 的“进程退出立即重启”。它可能在 FolderRewind 尚未完成写入时抢先启动服务器，破坏还原安全边界。
:::

插件不会让被踢出的玩家自动重连。还原成功后，Sidecar 只负责启动配置好的脚本，玩家需要等待服务端恢复后手动连接。

## KnotLink 不可用时会怎样

- 插件仍可以加载，并会持续尝试重连。
- `/mb save` 仍可用于保存当前服务端世界。
- 依赖主程序的备份、还原、查询命令会返回通信错误。

排错时先运行 `/mb status`，确认主程序、KnotLink 和插件看到的当前操作状态，再尝试备份或还原。

## 与其他联动组件的关系

- [Minecraft 专题总览](/docs/guides/minecraft/overview)：选择模组化服务端或 Spigot/Paper 方案。
- [MineBackup 联动模组](/docs/guides/minecraft/minebackup-mod)：模组化服务端的游戏内桥梁。
- [Death Rewind（死亡回溯）](/docs/guides/minecraft/death-rewind)：单人死亡界面回溯扩展。
- [Just Enough Accidents（险兆备份）](/docs/guides/minecraft/just-enough-accidents)：事故检测扩展。
- [KnotLink 与联动模组](/docs/guides/minecraft/knotlink-mod)：协议和热备份/热还原握手细节。

正式世界启用前，请在测试服完整演练一次“备份—还原—启动—手动重连”闭环。
