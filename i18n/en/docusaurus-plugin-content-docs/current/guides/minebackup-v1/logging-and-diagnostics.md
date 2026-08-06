---
sidebar_position: 16
title: Logging and Diagnostics
description: Structured logs, session records, and privacy-safe diagnostic exports in MineBackup 1.16.1
---

# Logging and Diagnostics

MineBackup 1.16.1 uses one structured logging path for the GUI, backup and restore work, automation, platform integration, and KnotLink. For troubleshooting, distinguish the **Log panel**, **session log**, **local rotating file**, and **diagnostic export**; they have different retention and privacy behavior.

## Three logging layers

| Layer | Use | Retention |
| --- | --- | --- |
| **Log panel** | Inspect events while running, filter by level/category, and open details. | Current-session records only; clearing the view does not delete files. |
| **Session log** | In-memory records used by the UI, tasks, and diagnostic export. | The newest 20,000 records; it is not a history database restored across launches. |
| **Local file** | Inspect a run outside the application. | `minebackup.log` at 10 MiB, with up to four rotated archives. |

The Command panel’s history is not a log store. Copying a command or filtered result is a local operation and keeps real local paths, so it must not be treated as a sanitized diagnostic package.

## Log levels

The setting is `[General] LogFileLevel=off|info|debug`, with `info` as the default:

| Level | Use |
| --- | --- |
| `Off` | No local `minebackup.log` is written; the Log panel can still show records collected for the current session. Use it when a file is not needed. |
| `Info` | The default level. It records the important results of backup, restore, tasks, migration, cloud, and network operations. |
| `Debug` | Adds stable event IDs, producer threads, context, and source locations to Info output. Use it for a short reproduction. |

Changing the level in settings rebuilds the logging backend immediately and does not require a restart. Debug produces more data; return to Info after reproducing the issue. Legacy `AutoLog` is mapped to Off/Info only when the new key is absent; saving uses `LogFileLevel`.

## Log locations

The log root follows the [profile](./data-and-migration):

| Platform | Log directory |
| --- | --- |
| Windows | `%LOCALAPPDATA%\MineBackup\logs` |
| Linux | `${XDG_STATE_HOME:-~/.local/state}/MineBackup/logs` |
| macOS | `~/Library/Logs/MineBackup` |
| Explicit or portable profile | `<profile>/logs` |

If the profile directory is unwritable, the Log panel and special-mode console remain usable and the status area reports the file-backend error. Do not conclude that MineBackup is idle only because no file appears; inspect the Log panel’s backend status and startup errors first.

## Diagnostic export and redaction

Choose **Export Diagnostics** in the **Log** tab. After confirmation, MineBackup creates a file like this in the log directory:

```text
minebackup-diagnostics-YYYYMMDD-HHMMSS.txt
```

The export contains only the version, platform, profile mode, session/backend status, and currently retained log records. It does not read or package the complete configuration, history, rclone credential file, or other user files. Known profile and home directories, world/archive/snapshot roots, compression and rclone paths, task working directories, rclone remote paths, and URL userinfo/query parameters are replaced.

Arbitrary secrets in external process stdout/stderr cannot be recognized reliably. Open and review the diagnostic export before sharing it. The export is redacted, but local rotating logs can still contain real paths and should be sent only to trusted maintainers.

## Legacy log files are not the current mechanism

1.16.1 no longer writes these legacy files:

- `auto_log.txt`
- `special_mode_log.txt`
- `console_log.txt`

Copies left in an installation directory or old profile are neither migrated nor deleted. For the current version, use `minebackup.log`, the Log panel, and the diagnostic export instead of waiting for a legacy file to change.

## Recommended troubleshooting order

1. In the Log panel, confirm the selected profile, version, and platform capability state at startup.
2. Temporarily switch to `Debug`, reproduce the issue once, and record the world, configuration, task, or `request_id`.
3. For backup/restore issues, check `backupPath`, the external compression tool, Smart metadata, and migration status.
4. For automation, check the trigger time, target index, platform shell differences, and process exit code.
5. For KnotLink or cloud issues, record event IDs, `request_id`, endpoint/remote name, and service version without sharing credentials.
6. Export diagnostics, inspect the redaction result, and provide it with the smallest reproducible procedure and relevant time window.

Related pages: [Troubleshooting](./troubleshooting), [Profiles and migration](./data-and-migration), [KnotLink v2 integration](./knotlink-integration), and [Cloud archive](./cloud-archive).
