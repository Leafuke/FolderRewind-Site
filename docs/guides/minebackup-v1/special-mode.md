---
sidebar_position: 11
title: Special Config
description: MineBackup 1.16.1 的特殊配置、命令任务和无人值守执行规则
---

# Special Config

Special Config 用于“启动后进入特殊模式，执行一组任务，并按需要自动退出”的无人值守流程。它不是普通配置的简单别名，而是拥有独立稳定身份和任务队列的执行入口。

## 核心开关

- `autoExecute`：进入该 Special Config 后自动执行任务。
- `runOnStartup`：通过平台登录启动能力运行该 Special Config；同一时间只应保留明确的启动目标。
- `exitAfterExecution`：一次性任务完成且没有需要继续运行的后台周期任务时自动退出。
- `hideWindow`：在适合无人值守的环境中隐藏特殊模式窗口，但失败仍应通过日志排查。
- `backupOnGameStart`：检测到游戏会话开始时，为配置中的目标触发备份。

同类启动选择由程序规范化，重复的 `autoExecute` 或 `runOnStartup` 选择会被确定性地压缩为一个有效目标。外部启动应使用稳定的 `SpecialConfigId`，不要依赖可重排的配置序号。

## 任务类型

### Backup

选择一个普通配置和世界，继承 Special Config 中的压缩等级、保留数量、线程和低优先级设置，然后执行备份。先用 Once 验证，再改为 Interval 或 Scheduled。

### Command

执行用户提供的命令和工作目录，适合备份前后的清理、通知或外部处理。命令会交给平台解释器：Windows 使用 `cmd.exe`，Linux/macOS 使用 `/bin/sh`，因此命令文本不承诺跨平台可移植。

### Script

当前是预留扩展，设置页禁用该选项，不能把它当作已实现的脚本运行器。

## 执行顺序

统一任务按 ID 和列表顺序组织：

- Sequential 任务等待前置任务完成。
- Parallel 任务可以与前置任务同时运行。
- Interval 和 Scheduled 备份会在可取消的后台线程中运行。
- 特殊模式退出时会请求停止后台任务并等待收尾。

对于“先备份、后命令”的链路使用 Sequential；只有在目标完全独立时才使用 Parallel。

## 推荐配置流程

1. 创建一个 Special Config 并指定唯一名称。
2. 添加一个 Backup / Once 任务，选择一个已验证的世界。
3. 手动运行并确认归档、历史和日志。
4. 再增加 Command、周期或计划任务。
5. 最后才开启 `autoExecute`、登录启动或 `exitAfterExecution`。

## 常见故障

- 配置或世界索引失效：任务会被跳过并写入验证错误。
- 命令在另一平台无效：检查命令解释器和工作目录，不要直接复制 Windows 命令。
- 任务提前退出：检查 `exitAfterExecution` 以及是否仍有周期任务线程。
- 后台任务停不下来：先查看日志，再从 GUI 或任务协调器停止，不要强制删除临时文件。

Special Config 稳定后，再考虑和[配置档、便携模式与迁移](/docs/guides/minebackup-v1/data-and-migration)或[云归档](/docs/guides/minebackup-v1/cloud-archive)组合。
