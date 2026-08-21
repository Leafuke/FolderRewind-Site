---
sidebar_position: 5
title: 备份、历史、校验与还原
description: 用 MineBackup 1.16.2 CLI 完成 Backup、History、Verify、Restore dry-run 和冷还原
---

# 备份、历史、校验与还原

当 Profile 已经通过 `profile apply` 和 `doctor` 后，按下面的用户任务完成第一个可验证闭环：

```text
查 Config
  ↓
查 World
  ↓
执行 Backup
  ↓
查看 History
  ↓
Verify
  ↓
Restore dry-run
  ↓
（另行确认后）真实 Restore
```

## 1. 查 Config

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
```

记录要使用的 `configId`。不要从 Manifest 的名称、数组顺序或网页截图猜 ID；以 CLI 返回的规范 UUID 为准。

## 2. 查 World

```bash
minebackup-cli --data-dir "$PROFILE" --json world list \
  --config <ConfigId>
```

记录 CLI 返回的相对路径。`--world` 接受 Config 中的规范相对路径，例如 `world` 或 `world_nether`，不接受显示名称、数字索引或绝对路径。

## 3. 执行 Backup

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path> \
  --comment "before upgrade"
```

直接 `backup` 与 Job 的 Backup Step 共用变化检测、SkipIfUnchanged、Smart 链、保留策略、metadata、HistoryRepository 和可选云后处理。若使用 `--no-network`，会禁用 KnotLink 和云后处理；本地备份成果仍应按 CLI 返回结果判断。

## 4. 查看 History

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

History 记录归档链、元数据和本地文件关系。历史记录不是归档文件本身；灾难恢复时必须连同 metadata 一起保存，不能只复制某个 `.7z` 文件。

## 5. Verify 最新归档

```bash
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
```

`--latest` 只会选择本地 History 中最新且归档实际存在的记录。Verify 会检查归档链和包内容；Verify 成功比“Backup 命令退出码为 0”更能证明可恢复性。

建议定期把 `verify --latest` 和下面的 `restore --dry-run` 作为灾难恢复演练，而不是等到真正故障时才第一次运行。

## 6. Restore dry-run

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

dry-run 会规划完整恢复链、验证 metadata 并测试每个 7-Zip 包，不修改世界。首次部署只能从这里开始，不要直接使用 `--confirm`。

### `clean` 和 `overwrite`

- **`clean`**：把目标世界切换到同文件系统快照，恢复归档链并按 preserve 规则处理目标内容；它更接近“让目标回到归档状态”，适合作为默认恢复方式，但会处理归档链之外的内容。
- **`overwrite`**：逐链覆盖归档中的文件，不删除归档里不存在的现有文件，也不承诺完整回滚。适合你明确需要保留目标额外文件时使用。

两种方式都不能绕过世界占用保护。普通 CLI restore 是冷还原：先停止 Minecraft Server 和其他会打开世界文件的进程，再运行 `doctor` 并确认 `coldRestoreReady=true`。

## 7. 真实 Restore：单独的高风险操作

:::warning 真实恢复会写入世界

真实恢复必须明确确认，并且不属于第一次 CLI 教程。先完成 Verify、Restore dry-run、服务器停机和 `doctor` 检查，再由管理员确认归档、模式、目标路径和 `backupBefore` 行为。只有 CLI 明确要求时才使用 `--confirm`。

:::

确认冷还原条件后，命令的形式是：

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --confirm
```

如果 Config 开启 `restore.backupBefore`，实际还原前会先执行安全备份。不要把 `--confirm` 写进首次安装脚本，也不要用它绕过 `coldRestoreReady=false`。

## `coldRestoreReady` 与 `serve`

`doctor` 会报告世界是否存在、是否被占用以及是否满足冷还原条件。`coldRestoreReady=true` 只表示普通 CLI 冷还原的运行环境门禁已满足，不代表你已经选择了正确的历史记录。

长期运行 `serve` 并配合 KnotLink 时，CLI/GUI 还可以使用热还原协调器；这是另一条需要服务器、模组和运行时联动的路径，不会改变普通 `restore --dry-run` 的安全要求。先把本页的本地 History、Verify 和冷还原演练做好，再阅读 [Serve 常驻运行时](/docs/guides/minebackup-v1/cli/serve) 和 KnotLink 文档。

## 出现错误时保留什么？

保留以下信息，不要先删除 Profile、History 或归档：

- 原始 JSON envelope 和进程退出码；
- `doctor` 输出，尤其是 `coldRestoreReady`、7-Zip 和路径诊断；
- `history list` 返回的归档路径和链信息；
- Profile `logs/` 中对应时间段的日志。

随后按[CLI 故障排查](/docs/guides/minebackup-v1/cli/troubleshooting)从 scheduler → CLI → Job → Config → World → archive 逐层定位。
