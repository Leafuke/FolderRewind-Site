---
sidebar_position: 10
title: Commands, JSON, and Exit Codes
description: A lookup table for MineBackup 1.16.2 CLI options, commands, JSON envelopes, and exit codes
---

# Commands, JSON, and Exit Codes

This page is a lookup table. For task-oriented deployment, return to the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start), [Profiles and Manifests](/en/docs/guides/minebackup-v1/cli/profile-manifest), or [Backup, History, Verify, and Restore](/en/docs/guides/minebackup-v1/cli/backup-restore).

## Global options

Place global options before the command and subcommand:

| Option | Purpose |
| --- | --- |
| `--data-dir <path>` | Select the complete Profile root, not `config/` |
| `--json` | Emit one schema v1 JSON envelope on stdout; progress and logs go to Profile logs or stderr |
| `--no-network` | Disable KnotLink and cloud post-processing; it does not delete local History or archives |
| `--non-interactive` | Disable interactive behavior for automation |
| `--log-level <off\|info\|debug>` | Set the log level |
| `--help` | Show CLI usage |
| `--version` | Show the CLI version |

## Profile commands

```text
profile init --output <manifest.json> [--force]
profile validate --file <manifest.json>
profile diff --file <manifest.json> [--prune]
profile apply --file <manifest.json> [--dry-run] [--prune --confirm-prune]
profile export --output <manifest.json> [--force]
```

The first-setup sequence is always:

```text
profile validate
→ profile diff
→ profile apply --dry-run
→ profile apply
→ doctor
```

## Profile runtime and diagnostics

```text
serve
serve status
serve stop
doctor
```

`serve` is an optional long-running Profile runtime. `doctor` checks configuration, paths, world occupancy, cold-restore state, tools, and the operating environment.

## Query commands

```text
config list
config show --config <ConfigId>
world list --config <ConfigId>
history list --config <ConfigId> --world <relative-path>
job list
job show --job <JobId>
```

Configs, Jobs, Stages, and Steps use canonical UUIDs from the Manifest. The World argument is the relative path from the Config.

## Execution commands

```text
job run --job <JobId>
backup --config <ConfigId> --world <relative-path> [--comment <text>]
verify --config <ConfigId> --world <relative-path> (--backup <file> | --latest)
restore --config <ConfigId> --world <relative-path> \
  (--backup <file> | --latest) [--mode clean|overwrite] \
  (--dry-run | --confirm)
```

`restore` requires exactly one of `--dry-run` or `--confirm`. Initial setup uses only `--dry-run`; confirm the cold-restore gate before any real restore.

## JSON envelope

With `--json`, stdout contains one schema v1 envelope. Logs and progress go to the Profile `logs/` directory or stderr:

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

For diagnosis, preserve the JSON, stderr, exit code, and Profile logs. Do not keep only a screenshot of the last terminal line.

## Exit codes

The table below follows the current CLI implementation and the main repository’s `docs/headless-cli.md`:

| Exit code | `code` | Meaning |
| ---: | --- | --- |
| `0` | `success` / `no_changes` | Succeeded, or there was nothing to change |
| `2` | `invalid_arguments` | Invalid arguments or missing explicit confirmation |
| `3` | `profile_busy` | The GUI, Serve, or another CLI owns the Profile |
| `4` | `target_not_found` | A Config, World, Job, or archive was not found |
| `5` | `migration_required` / `invalid_profile` | Migration is required, or schema/reference/path configuration is invalid |
| `6` | `backup_failed` / `job_failed` / `verification_failed` | Backup, Job, or verification failed |
| `7` | `restore_failed` | Restore failed |
| `8` | `tool_unavailable` | 7-Zip or rclone is unavailable |
| `9` | `cancelled` | The operation was cancelled |
| `10` | `partial_success` | A Job was partially successful, or local backup succeeded while cloud post-processing failed |

The exit code is the machine-readable automation contract, but diagnosis still requires the envelope’s `diagnostics`, stderr, and `doctor`.

## Engineering references

The user tutorial explains why and what to do next. These main-repository documents define the detailed protocol and implementation boundaries:

- [`docs/headless-cli.md`](https://github.com/Leafuke/MineBackup/blob/develop/docs/headless-cli.md): CLI commands, Manifest, Jobs, Restore, scheduling, JSON, and exit codes;
- [`docs/profile-runtime-ipc.md`](https://github.com/Leafuke/MineBackup/blob/develop/docs/profile-runtime-ipc.md): Profile Runtime IPC v2, cancellation, message limits, and local permission boundaries.

When this site’s tutorial differs from raw CLI output, follow the current CLI output, exit code, and main-repository implementation.
