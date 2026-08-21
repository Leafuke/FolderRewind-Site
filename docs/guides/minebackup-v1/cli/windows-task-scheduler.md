---
sidebar_position: 9
title: Windows Task Scheduler
description: 使用 MineBackup 1.16.2 CLI 官方 XML 模板部署 Windows Serve 和 Job Task
---

# Windows Task Scheduler

Windows 服务器使用正式包中的两个 XML 模板：

```text
MineBackup-Serve.xml
MineBackup-Job.xml
```

它们分别负责开机启动长期 `serve` runtime 和按计划执行一次性 `job run`。先完成[5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)，不要直接把未验证的 Job 导入计划任务。

## 部署顺序

```text
手动 job run
↓
导入 Serve Task
↓
确认 Serve 正常
↓
导入 Job Task
↓
手动触发一次
↓
检查退出结果
↓
再启用计划
```

Serve Task 与 Job Task 必须使用同一个服务器账户，并且该账户必须能读写 Profile、saveRoot 和 backupRoot。

## 1. 准备 CLI、Profile 和 Manifest

从 [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) 下载 `MineBackup-CLI-<version>-windows-x64.zip`，把它解压到稳定目录，例如：

```text
C:\Program Files\MineBackup CLI\minebackup-cli.exe
```

准备 Profile 和 Manifest 后，在同一服务器账户下执行：

```powershell
$CLI = 'C:\Program Files\MineBackup CLI\minebackup-cli.exe'
$PROFILE = 'D:\MineBackup\server-profile'
$MANIFEST = 'D:\MineBackup\server.json'

& $CLI --json profile validate --file $MANIFEST
& $CLI --data-dir $PROFILE --json profile diff --file $MANIFEST
& $CLI --data-dir $PROFILE --json profile apply --file $MANIFEST --dry-run
& $CLI --data-dir $PROFILE --json profile apply --file $MANIFEST
& $CLI --data-dir $PROFILE --json --no-network doctor
```

然后用 `config list`、`world list` 找到实际 ID/路径，确认一次 Backup、History、Verify 和 Restore dry-run。

## 2. 先手动运行 Job

```powershell
& $CLI --data-dir $PROFILE --json job list
& $CLI --data-dir $PROFILE --json job run --job <JobId>
```

检查命令退出码、JSON envelope、History 和 Verify。手动运行失败时先修复 CLI 输出指向的问题，不要让计划任务重复失败。

## 3. 替换官方 XML 模板中的占位符

从正式 ZIP 包中取出 `MineBackup-Serve.xml` 和 `MineBackup-Job.xml`，只替换这些占位符：

```text
@@MINEBACKUP_CLI@@
@@MINEBACKUP_DATA_DIR@@
@@MINEBACKUP_JOB_ID@@
```

对应关系：

| 占位符 | 替换为 |
| --- | --- |
| `@@MINEBACKUP_CLI@@` | `minebackup-cli.exe` 的完整路径 |
| `@@MINEBACKUP_DATA_DIR@@` | 完整 Profile 根，例如 `D:\MineBackup\server-profile` |
| `@@MINEBACKUP_JOB_ID@@` | 已通过 `job list` 找到的 Job UUID |

保留 XML 中的 `--json`、`serve` 和 `job run --job` 参数。不要把 GUI 可执行文件、旧 `--service` 参数或自造 schedule 字段写进模板。

## 4. 导入 Serve Task

可以使用任务计划程序图形界面：

1. 打开 **Task Scheduler**，选择 **Import Task**。
2. 导入替换占位符后的 `MineBackup-Serve.xml`。
3. 在 **Security options** 中选择运行 Minecraft Server 的同一个账户；需要无人值守时保存该账户的凭据。
4. 检查 **Actions**，确认命令是 CLI 的完整路径，参数包含 `--data-dir "..." --json serve`。
5. 先手动运行任务，确认任务保持运行。
6. 使用 CLI 检查：

```powershell
& $CLI --data-dir $PROFILE --json serve status
```

Serve 不开放 TCP/UDP 管理端口；状态检查使用同一 Profile 的本机 CLI/IPC。

## 5. 导入 Job Task 并手动触发

Serve 正常后再导入 `MineBackup-Job.xml`：

1. 导入 XML 并使用同一个服务器账户。
2. 在 **Actions** 中确认参数为 `--data-dir "..." --json job run --job <JobId>`。
3. 检查 XML 中的 Calendar trigger、开始时间和启用状态，按你的维护窗口调整计划。
4. 暂时不要依赖计划；先在 Task Scheduler 中选择 **Run** 手动触发。
5. 检查 **Last Run Result**、Task History、CLI JSON envelope、History 和 Verify。
6. 只有手动运行成功后，才启用计划触发。

Job Task 只是调用 Job；Job 不保存定时逻辑，时间由 Task Scheduler 持有。

## 任务失败时怎么查

```text
Task Scheduler
→ Last Run Result / History
→ CLI JSON 与退出码
→ serve status
→ Job / Config / World
→ doctor
→ backup archive
```

- Serve 无法启动：检查同一 Profile 是否已有 GUI/CLI、账户是否一致，以及 `serve status`；
- `profile_busy`：不要删除 lock/pipe，先停止另一个拥有者；
- World 找不到：运行 `config list`、`world list` 和 `doctor`；
- 7-Zip 不可用：以 `doctor` 的 `tool_unavailable` 为准；
- Job 返回 `partial_success`：检查每个 Stage/Step 的 diagnostics，不要把部分成功当成完整备份。

更多退出码和 JSON envelope 见[命令、JSON 与退出码](/docs/guides/minebackup-v1/cli/reference)。
