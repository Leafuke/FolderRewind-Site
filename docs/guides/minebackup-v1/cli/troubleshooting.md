---
sidebar_position: 11
title: CLI 故障排查
description: 按症状、命令、含义和下一步定位 MineBackup 1.16.2 CLI 问题
---

# CLI 故障排查

按下面的顺序定位，不要一开始删除 Profile、History 或归档：

```text
调度器
→ CLI
→ Job
→ Config
→ World
→ archive
```

每次排查保留原始 JSON、stderr、退出码、`doctor` 输出和 Profile `logs/`。

## `profile_busy`

**症状**：命令返回 `profile_busy`，退出码为 `3`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json doctor
```

**含义**：GUI、Serve 或另一个普通 CLI 已经持有同一个 Profile 的单实例锁。

**下一步**：确认是否有 GUI、systemd Serve、Task Scheduler Serve 或另一个 SSH 会话；使用同一账户停止真正的拥有者。不要删除 runtime lock、pipe 或 socket，也不要用第二个 CLI 强行旁路执行。

## `invalid_profile` / `migration_required`

**症状**：`profile validate`、`profile diff` 或 `apply` 返回 `invalid_profile` 或 `migration_required`，通常退出码为 `5`。

**检查命令**：

```bash
minebackup-cli --json profile validate --file server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

**含义**：Manifest schema、UUID、跨引用、路径或 Profile 迁移状态不满足当前 CLI 要求。

**下一步**：以 CLI diagnostics 指出的字段为准，保留已有 ID 和未知字段，做最小修改后重新执行 validate → diff → apply dry-run → apply → doctor。不要用 prune 解决普通 schema 错误，也不要把旧 GUI Task/Special Config 字段混进 CLI Job。

## `target_not_found`

**症状**：命令返回 `target_not_found`，退出码为 `4`；常见于 Config、World、Job 或归档不存在。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json job list
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**含义**：参数不是当前 Profile 中的规范 ID/相对路径，或本地归档链中的文件已经缺失。

**下一步**：复制 `config list`、`world list` 和 `job list` 的实际值，不要猜显示名称、数组索引或绝对世界路径；检查 `saveRoot`、`backupRoot` 和 History 记录。

## `tool_unavailable`

**症状**：Backup、Verify 或 Restore 返回 `tool_unavailable`，退出码为 `8`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**含义**：7-Zip 能力不可用，或启用云后处理时 rclone 不可用/配置不完整。

**下一步**：先看 `doctor` 报告的是内置工具、用户工具、格式能力还是 rclone。确认运行 CLI 的账户能执行工具；`archive.tool` 为空时让 MineBackup 自动发现随包工具。不要把密码或 rclone secret 写入 Manifest。

## `backup_failed`

**症状**：Backup 返回 `backup_failed`，退出码为 `6`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path>
```

**含义**：目标、权限、世界占用、归档工具、磁盘空间或备份链阶段失败；具体原因在 diagnostics/logs。

**下一步**：从 `saveRoot` → 权限 → `backupRoot` 写入 → 7-Zip → History 逐层检查。先用 `--no-network` 区分本地备份与云后处理；不要删除旧链或直接切换 Smart/Full 来掩盖错误。

## `verification_failed`

**症状**：Verify 返回 `verification_failed`，退出码为 `6`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**含义**：最新本地 History 归档链、metadata 或 7-Zip 测试不完整。

**下一步**：保留失败归档和日志，确认 backupRoot 未被外部清理，检查是否只复制了单个增量包而漏掉 Full 基线/metadata。修复后重新 Backup，再 Verify；不要手工编辑 `state.json` 或 History。

## `restore_failed`

**症状**：Restore 返回 `restore_failed`，退出码为 `7`，或 dry-run 被拒绝。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

**含义**：归档链/metadata、7-Zip、目标权限或冷还原门禁不满足；真实 restore 还可能在提交或回滚阶段失败。

**下一步**：先确认 `doctor` 的 `coldRestoreReady`。停止 Minecraft Server 和占用世界的进程，修复路径/权限后重新 dry-run；不要绕过世界占用保护，也不要把 `--confirm` 当成修复开关。

## `partial_success`

**症状**：Job 或网络模式 Backup 返回 `partial_success`，退出码为 `10`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json job show --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

**含义**：部分 Job Stage/Step 成功，或本地备份成功但云后处理失败；本地成果通常不会因此删除。

**下一步**：逐个查看 diagnostics，确认每个世界是否都有 History 和 Verify。不要把部分成功当作完整服务器备份，也不要重复启用并行 Job 直到失败层明确。

## `cancelled`

**症状**：返回 `cancelled`，退出码为 `9`。

**检查命令**：

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
Get-ChildItem -LiteralPath (Join-Path $PROFILE 'logs')
```

**含义**：Ctrl+C、SIGTERM、Ctrl+Break 或 `serve stop` 请求了取消；CLI 会尽量等待已启动备份、子进程树和 IPC/KnotLink 操作收尾。

**下一步**：查看最终 envelope 和日志，确认世界/归档是否处于可继续状态；再次运行前先检查 Profile 是否仍被 Serve 持有。不要用删除临时文件的方式判断取消是否成功。

## World 找不到

始终使用这三步：

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

按 `saveRoot` → `worlds[].path` → 实际目录权限检查。`worlds[].path` 是相对路径，不是世界显示名称。

## 7-Zip 不可用

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

确认 CLI 实际运行账户、内置工具、归档格式和可执行权限。不要只看 GUI 设置页，也不要因为一次 `profile apply` 成功就假设工具可用。

## Serve 无法启动

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json doctor
```

检查：

- 同一个 Profile 是否已有 GUI；
- 是否已有普通 CLI 或另一个 Serve；
- 用户账户是否一致；
- runtime socket/pipe 的本机权限；
- systemd service 或 Task Scheduler 的实际命令和 `--data-dir`。

`serve` 不开放 TCP/UDP 管理端口，不要从网络端口扫描推断它是否启动。

## systemd timer 没有备份

```bash
systemctl status minebackup-serve@server.service
systemctl status minebackup-backup@server.timer
systemctl list-timers 'minebackup-backup@*'
journalctl -u minebackup-backup@server.service
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
```

按 scheduler → CLI → Job → Config → World → archive 定位。手动 `job run` 失败时先修复 CLI；不要通过修改 timer 频率掩盖 Job 错误。

## Restore 被拒绝

检查：

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

重点查看 `coldRestoreReady`、世界占用和归档链。停止服务器并重新执行 Restore dry-run；不要建议绕过世界占用保护或直接使用 `--confirm`。

如果症状不在本页，保留原始 JSON、退出码、stderr、Profile logs 和 `doctor` 输出，再回到[命令、JSON 与退出码](/docs/guides/minebackup-v1/cli/reference)核对契约。
