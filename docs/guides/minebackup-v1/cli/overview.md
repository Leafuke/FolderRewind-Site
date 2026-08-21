---
sidebar_position: 1
title: CLI 与服务器模式概览
description: MineBackup 1.16.2 headless CLI、GUI 关系、适用场景与学习路径
---

# CLI 与服务器模式概览

如果 MineBackup 要运行在 Minecraft Dedicated Server、VPS、NAS 或 SSH-only Linux 上，`minebackup-cli` 是不启动 GUI 也能完成配置、备份、校验和冷还原演练的正式入口。它从 MineBackup 1.16.2 起作为 headless/server 运行方式提供。

## CLI 是什么？

`minebackup-cli` 是一个可独立部署的命令行程序。它可以从空 Profile 生成 Manifest，执行配置校验、环境诊断、一次性 Backup、History 查询、Verify，以及 Restore dry-run。它不弹窗、不要求图形桌面，也不会把 SSH 或服务器账户交给 GUI。

一次性命令不要求先启动常驻服务，例如：

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world world
```

## CLI 与 GUI 是什么关系？

两种入口共享同一个 runtime/core 和数据契约：

```text
GUI                 CLI
 │                   │
 └──── shared runtime/core ────┘
              │
      Profile / History
      Backup / Restore
```

因此 GUI 与 CLI 不是两套互不兼容的产品。它们使用相同的 Profile、History、归档和还原核心；但同一个 Profile 仍然遵守单实例占用规则，不能让 GUI 和 CLI 同时写入同一 Profile。

## 什么场景应该选 CLI？

CLI 特别适合：

- Minecraft Dedicated Server；
- SSH-only Linux、VPS 和 NAS；
- 没有 DISPLAY 或 Wayland 会话的机器；
- 需要 systemd 或 Windows Task Scheduler 调度的长期服务器；
- 希望使用同一服务器账户、固定 Profile 和可审计 JSON 输出的无人值守流程。

普通 Windows/Linux/macOS 桌面用户仍然可以继续使用 GUI。CLI 是服务器/无头场景的补充路径，不是桌面用户的强制迁移方案。

## CLI 不等于 `serve`

```text
minebackup-cli backup
```

本身就能执行一次性操作。`serve` 是可选的长期 Profile runtime，适合长期运行的 Minecraft Server、KnotLink、热还原或高频 CLI 调用。它通过本机 IPC 转发请求，不开放 TCP/UDP 管理端口；CLI 的基本配置、备份和校验不以 `serve` 为前提。

## 推荐学习路径

1. [5 分钟快速开始：完成第一次服务器备份](/docs/guides/minebackup-v1/cli/quick-start)
2. [使用 AI 生成配置](/docs/guides/minebackup-v1/cli/ai-assisted-config)（可选）
3. [Profile 与 Manifest](/docs/guides/minebackup-v1/cli/profile-manifest)
4. [备份、历史、校验与还原](/docs/guides/minebackup-v1/cli/backup-restore)
5. [Job 工作流](/docs/guides/minebackup-v1/cli/jobs) 与 [Serve 常驻运行时](/docs/guides/minebackup-v1/cli/serve)
6. 按平台阅读 [Linux 与 systemd](/docs/guides/minebackup-v1/cli/linux-systemd) 或 [Windows Task Scheduler](/docs/guides/minebackup-v1/cli/windows-task-scheduler)
7. 最后查阅[命令、JSON 与退出码](/docs/guides/minebackup-v1/cli/reference)和[CLI 故障排查](/docs/guides/minebackup-v1/cli/troubleshooting)

所有配置教程都遵循同一条安全链：

```text
generate/edit manifest
        ↓
profile validate → profile diff → profile apply --dry-run
        ↓
profile apply → doctor → backup → history → verify
        ↓
restore --dry-run
```
