---
sidebar_position: 7
title: Serve 常驻运行时
description: MineBackup 1.16.2 命令行可选配置档常驻运行时的启动、IPC 转发、KnotLink 和取消行为说明
---

# Serve 常驻运行时

> **`serve` 是可选的长期 Profile runtime，不是使用 CLI 的前提。**

一次性 `backup`、`verify`、`restore --dry-run`、`doctor` 和 `job run` 都可以不启动 `serve`。只有在需要长期持有 Profile runtime、KnotLink、热还原或频繁 CLI 调用时，才考虑启用它。

## 什么时候使用 `serve`？

适用场景包括：

- 长期运行的 Minecraft Server；
- 需要 KnotLink 热备份/热还原协调；
- 高频执行 CLI 查询或操作，不希望每次重新加载 Profile；
- 用 systemd 常驻 Profile runtime；
- 希望同一 Profile 由一个 runtime 实例统一持有。

如果你只需要每天运行一次 `job run`，可以先使用一次性 CLI 和系统调度器，不必因为“服务器模式”四个字就启动 `serve`。

## transparent forwarding 是什么？

启动 `serve` 后，普通 CLI 客户端会通过本机 IPC 把请求提交给常驻 runtime：

```text
CLI client
    │
 local IPC
    ▼
  serve
    │
 shared runtime
```

请求的 stdout JSON envelope 和退出码保持与直接执行 CLI 一致；`config list`、`doctor`、`apply`、`backup`、`job`、`verify` 和 `restore` 等命令可以透明转发。

`serve` 不会开放 TCP/UDP 管理端口。Windows 使用当前用户 ACL 的 IPC；Unix 使用权限收紧的本地 socket。不要把它当成远程控制服务，也不要把 Profile socket 暴露给网络。

## 启动、查看和停止

```bash
minebackup-cli --data-dir "$PROFILE" --json serve
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json serve stop
```

生产环境应由 systemd 或 Task Scheduler/服务账户持有它；不要在同一 Profile 上同时启动 GUI、普通 CLI 和第二个 `serve`。

`serve status` 会报告 runtime 运行时间、IPC operation、取消状态、KnotLink 活动和网络/listener 状态。`serve stop` 会停止接收新请求，取消活动 IPC/KnotLink 操作，等待收尾后退出并释放 Profile 锁。

## 取消行为

客户端 Ctrl+C 会根据 operationId 向服务端发送取消请求。服务端会请求已启动的 Backup、Process 和 KnotLink 工作收尾；如果收到第二个控制信号，进程可以立即终止。

客户端连接断开不会获得旁路执行权限，也不会让另一个 CLI 绕过 Profile 锁。取消或停机后，请检查最终 JSON envelope、退出码和 Profile logs。

## `serve` 与 GUI、一次性 CLI 的关系

- GUI 与 `serve` 对同一 Profile 严格互斥；GUI 不是 `serve` 的控制客户端。
- `serve` 存在时，同一用户的普通 CLI 会转发；如果占用者是 GUI 或另一个普通 CLI，则返回 `profile_busy`。
- `serve` 不会改变 Profile/History/Backup/Restore 的数据契约。
- `--no-network serve` 会禁用 KnotLink 和 rclone 网络后处理；本地 IPC 仍是本机 runtime 的控制机制。

遇到 `profile_busy` 时，先运行 `serve status`，检查 GUI、另一个 CLI 或同一账户的服务任务，不要删除 runtime lock/socket。

## 最小上线顺序

1. 完成 [5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)。
2. 用 `doctor`、Backup、History、Verify 和 Restore dry-run 验证 Profile。
3. 手动运行一次 `job run --job <JobId>`。
4. 前台启动 `serve`，用 `serve status` 确认运行。
5. 从同一账户执行一次 `config list` 或 `job run`，确认透明转发。
6. 再把 `serve` 放入 [Linux systemd](/docs/guides/minebackup-v1/cli/linux-systemd) 或 [Windows Task Scheduler](/docs/guides/minebackup-v1/cli/windows-task-scheduler)。

`serve` 不能替代 `doctor`，也不能替代 Verify 或 Restore dry-run。它只是让已经正确的 Profile 以长期 runtime 方式运行。
