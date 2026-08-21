---
sidebar_position: 9
title: Windows Task Scheduler
description: Deploy the MineBackup 1.16.2 Serve and Job tasks with the official XML templates
---

# Windows Task Scheduler

Windows servers use the two XML templates supplied in the official package:

```text
MineBackup-Serve.xml
MineBackup-Job.xml
```

They start the long-running `serve` runtime at boot and run a one-shot `job run` on a schedule. Complete the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start) first; do not import an unverified Job into Task Scheduler.

## Deployment order

```text
Manual job run
↓
Import Serve Task
↓
Confirm Serve works
↓
Import Job Task
↓
Trigger it manually
↓
Check the result
↓
Enable the schedule
```

The Serve Task and Job Task must run under the same server account. That account must be able to read and write the Profile, saveRoot, and backupRoot.

## 1. Prepare the CLI, Profile, and Manifest

Download `MineBackup-CLI-<version>-windows-x64.zip` from [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) and extract it to a stable directory, for example:

```text
C:\Program Files\MineBackup CLI\minebackup-cli.exe
```

After preparing the Profile and Manifest, run the checks as the same server account:

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

Use `config list` and `world list` to find the real IDs/paths, then complete one Backup, History, Verify, and Restore dry-run.

## 2. Run the Job manually first

```powershell
& $CLI --data-dir $PROFILE --json job list
& $CLI --data-dir $PROFILE --json job run --job <JobId>
```

Check the process exit code, JSON envelope, History, and Verify. If the manual run fails, fix what the CLI reports before letting a scheduled task repeat it.

## 3. Replace the official XML placeholders

Take `MineBackup-Serve.xml` and `MineBackup-Job.xml` from the official ZIP and replace only these placeholders:

```text
@@MINEBACKUP_CLI@@
@@MINEBACKUP_DATA_DIR@@
@@MINEBACKUP_JOB_ID@@
```

Their values are:

| Placeholder | Replace with |
| --- | --- |
| `@@MINEBACKUP_CLI@@` | The full path to `minebackup-cli.exe` |
| `@@MINEBACKUP_DATA_DIR@@` | The complete Profile root, such as `D:\MineBackup\server-profile` |
| `@@MINEBACKUP_JOB_ID@@` | The Job UUID returned by `job list` |

Keep the XML’s `--json`, `serve`, and `job run --job` arguments. Do not put the GUI executable, the legacy `--service` option, or an invented schedule field into the template.

## 4. Import the Serve Task

Use the Task Scheduler UI:

1. Open **Task Scheduler** and choose **Import Task**.
2. Import the placeholder-replaced `MineBackup-Serve.xml`.
3. Under **Security options**, select the same account used by the Minecraft Server; save that account’s credentials for unattended use.
4. Check **Actions** and confirm the full CLI path and `--data-dir "..." --json serve` arguments.
5. Run the task manually and confirm that it remains running.
6. Check it through the CLI:

```powershell
& $CLI --data-dir $PROFILE --json serve status
```

Serve does not open a TCP/UDP management port; status uses the local CLI/IPC for that Profile.

## 5. Import the Job Task and trigger it manually

Import `MineBackup-Job.xml` only after Serve works:

1. Import the XML under the same server account.
2. Check **Actions** and confirm `--data-dir "..." --json job run --job <JobId>`.
3. Review the Calendar trigger, start time, and enabled state; adjust the schedule for your maintenance window.
4. Do not rely on the schedule yet. Choose **Run** in Task Scheduler to trigger it manually.
5. Check **Last Run Result**, Task History, the CLI JSON envelope, History, and Verify.
6. Enable the schedule only after the manual run succeeds.

The Job Task invokes the Job; the Job does not store the schedule. Task Scheduler owns the time trigger.

## Diagnose a failed task

```text
Task Scheduler
→ Last Run Result / History
→ CLI JSON and exit code
→ serve status
→ Job / Config / World
→ doctor
→ backup archive
```

- Serve does not start: check whether a GUI/CLI already owns the Profile, whether the account is the same, and `serve status`.
- `profile_busy`: do not delete a lock or pipe; stop the other owner first.
- World is missing: run `config list`, `world list`, and `doctor`.
- 7-Zip is unavailable: follow `tool_unavailable` from `doctor`.
- Job returns `partial_success`: inspect every Stage/Step diagnostic; do not treat partial success as a complete backup.

See [Commands, JSON, and exit codes](/en/docs/guides/minebackup-v1/cli/reference) for the response envelope and exit-code table.
