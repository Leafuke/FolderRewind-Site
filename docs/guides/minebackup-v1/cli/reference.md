---
sidebar_position: 10
title: 命令、JSON 与退出码
description: MineBackup 1.16.2 CLI 的全局选项、命令语法、JSON envelope、退出码和常用示例查表
---

# 命令、JSON 与退出码

本页只做查表。需要按任务部署时，回到[5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)、[Profile 与 Manifest](/docs/guides/minebackup-v1/cli/profile-manifest)或[备份、历史、校验与还原](/docs/guides/minebackup-v1/cli/backup-restore)。

## 全局选项

全局选项放在命令和子命令之前：

| 选项 | 作用 |
| --- | --- |
| `--data-dir <path>` | 选择完整 Profile 根，不是 `config/` 子目录 |
| `--json` | 让 stdout 只输出一个 schema v1 JSON envelope；进度和日志进入 Profile logs 或 stderr |
| `--no-network` | 禁用 KnotLink 和云后处理；不等于删除本地历史或归档 |
| `--non-interactive` | 禁止交互式行为，适合自动化调用 |
| `--log-level <off\|info\|debug>` | 设置日志级别 |
| `--help` | 显示 CLI 用法 |
| `--version` | 显示 CLI 版本 |

## Profile 命令

```text
profile init --output <manifest.json> [--force]
profile validate --file <manifest.json>
profile diff --file <manifest.json> [--prune]
profile apply --file <manifest.json> [--dry-run] [--prune --confirm-prune]
profile export --output <manifest.json> [--force]
```

首次配置固定使用：

```text
profile validate
→ profile diff
→ profile apply --dry-run
→ profile apply
→ doctor
```

## Profile runtime 与诊断

```text
serve
serve status
serve stop
doctor
```

`serve` 是可选的长期 Profile runtime；`doctor` 检查配置、路径、世界占用、冷还原、工具和运行环境。

## 查询命令

```text
config list
config show --config <ConfigId>
world list --config <ConfigId>
history list --config <ConfigId> --world <relative-path>
job list
job show --job <JobId>
```

Config、Job、Stage 和 Step 使用 Manifest 中的规范 UUID；World 参数使用 Config 中的相对路径。

## 执行命令

```text
job run --job <JobId>
backup --config <ConfigId> --world <relative-path> [--comment <text>]
verify --config <ConfigId> --world <relative-path> (--backup <file> | --latest)
restore --config <ConfigId> --world <relative-path> \
  (--backup <file> | --latest) [--mode clean|overwrite] \
  (--dry-run | --confirm)
```

`restore` 必须明确使用 `--dry-run` 或 `--confirm` 之一。第一次部署只使用 `--dry-run`；真实恢复前必须确认冷还原条件。

## JSON envelope

使用 `--json` 时，stdout 只有一个 schema v1 envelope。日志和进度进入 Profile `logs/` 或 stderr：

```json
{
  "schemaVersion": 1,
  "command": "backup",
  "ok": true,
  "code": "success",
  "data": {},
  "diagnostics": []
}
```

排错时同时保留 JSON、stderr、退出码和 Profile logs。不要只截图终端中最后一行。

## 退出码

下表以当前 CLI 实现和主仓库 `docs/headless-cli.md` 为准：

| 退出码 | `code` | 含义 |
| ---: | --- | --- |
| `0` | `success` / `no_changes` | 成功，或没有需要改变的内容 |
| `2` | `invalid_arguments` | 参数错误，或缺少显式确认 |
| `3` | `profile_busy` | GUI、Serve 或另一个 CLI 占用 Profile |
| `4` | `target_not_found` | Config、World、Job 或备份不存在 |
| `5` | `migration_required` / `invalid_profile` | 需要迁移，或 schema/引用/路径配置无效 |
| `6` | `backup_failed` / `job_failed` / `verification_failed` | 备份、Job 或校验失败 |
| `7` | `restore_failed` | 还原失败 |
| `8` | `tool_unavailable` | 7-Zip 或 rclone 不可用 |
| `9` | `cancelled` | 操作已取消 |
| `10` | `partial_success` | Job 部分成功，或本地备份成功但云后处理失败 |

退出码是机器可读的自动化契约，但定位原因仍需查看 envelope 的 `diagnostics`、stderr 和 `doctor`。

## 工程级 reference

用户教程解释“为什么”和“下一步”；以下主仓库文档解释完整协议与实现边界：

- [`docs/headless-cli.md`](https://github.com/Leafuke/MineBackup/blob/develop/docs/headless-cli.md)：CLI 命令、Manifest、Job、Restore、调度、JSON 和退出码；
- [`docs/profile-runtime-ipc.md`](https://github.com/Leafuke/MineBackup/blob/develop/docs/profile-runtime-ipc.md)：Serve 的 Profile Runtime IPC v2、取消、消息限制和本机权限边界。

当网站教程与 CLI 原始输出不一致时，以当前 CLI 输出、退出码和主仓库实现为准。
