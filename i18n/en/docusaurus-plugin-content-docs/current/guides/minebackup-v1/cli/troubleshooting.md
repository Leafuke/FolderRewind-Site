---
sidebar_position: 11
title: CLI Troubleshooting
description: Diagnose MineBackup 1.16.2 CLI issues by symptom, command, meaning, and next step
---

# CLI Troubleshooting

Diagnose in layers instead of deleting the Profile, History, or archives first:

```text
scheduler
→ CLI
→ Job
→ Config
→ World
→ archive
```

For every investigation, preserve the raw JSON, stderr, exit code, `doctor` output, and Profile `logs/`.

## `profile_busy`

**Symptom**: the command returns `profile_busy`, exit code `3`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json doctor
```

**Meaning**: the GUI, Serve, or another normal CLI owns the Profile’s single-instance lock.

**Next step**: check for a GUI, systemd Serve, Task Scheduler Serve, or another SSH session. Stop the real owner using the same account. Do not delete a runtime lock, pipe, or socket, and do not force a bypass CLI.

## `invalid_profile` / `migration_required`

**Symptom**: `profile validate`, `profile diff`, or `apply` returns `invalid_profile` or `migration_required`, usually exit code `5`.

**Check**:

```bash
minebackup-cli --json profile validate --file server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

**Meaning**: the Manifest schema, UUIDs, cross-references, paths, or Profile migration state does not satisfy the current CLI.

**Next step**: follow the fields named in CLI diagnostics, preserve existing IDs and unknown fields, make the minimum change, and repeat validate → diff → apply dry-run → apply → doctor. Do not use prune to solve a schema error or mix legacy GUI/Special Config fields into a CLI Job.

## `target_not_found`

**Symptom**: the command returns `target_not_found`, exit code `4`; a Config, World, Job, or archive is commonly missing.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json job list
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**Meaning**: the argument is not a canonical ID/relative path in the current Profile, or a file in the local archive chain is missing.

**Next step**: copy the actual values from `config list`, `world list`, and `job list`. Do not guess a display name, array index, or absolute world path. Check `saveRoot`, `backupRoot`, and the History record.

## `tool_unavailable`

**Symptom**: Backup, Verify, or Restore returns `tool_unavailable`, exit code `8`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**Meaning**: 7-Zip capability is unavailable, or rclone is unavailable/incomplete when cloud post-processing is enabled.

**Next step**: follow `doctor`’s distinction between the bundled tool, a user tool, format capability, and rclone. Confirm that the account running the CLI can execute the tool; with an empty `archive.tool`, let MineBackup discover its bundled tool. Never put a password or rclone secret in the Manifest.

## `backup_failed`

**Symptom**: Backup returns `backup_failed`, exit code `6`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path>
```

**Meaning**: the target, permissions, world occupancy, archive tool, disk space, or backup-chain stage failed; the precise cause is in diagnostics/logs.

**Next step**: inspect `saveRoot` → permissions → writable `backupRoot` → 7-Zip → History. Use `--no-network` to separate local backup from cloud post-processing. Do not delete the old chain or switch Smart/Full just to hide the failure.

## `verification_failed`

**Symptom**: Verify returns `verification_failed`, exit code `6`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

**Meaning**: the latest local History archive chain, metadata, or 7-Zip test is incomplete.

**Next step**: preserve the failed archive and logs, check that an external cleanup did not remove files from backupRoot, and confirm that the Full baseline and metadata were not omitted. Repair the source and make a new Backup before verifying again; never edit `state.json` or History by hand.

## `restore_failed`

**Symptom**: Restore returns `restore_failed`, exit code `7`, or the dry-run is rejected.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

**Meaning**: the archive chain/metadata, 7-Zip, target permissions, or cold-restore gate is not satisfied; a real restore can also fail during commit or rollback.

**Next step**: check `coldRestoreReady` from `doctor`. Stop the Minecraft server and processes holding the world, fix paths/permissions, and repeat the dry-run. Do not bypass world-occupancy protection or use `--confirm` as a repair switch.

## `partial_success`

**Symptom**: a Job or network-mode Backup returns `partial_success`, exit code `10`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json job show --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

**Meaning**: some Job Stages/Steps succeeded while others failed, or local Backup succeeded while cloud post-processing failed; local results are normally not deleted.

**Next step**: inspect every diagnostic and confirm that every world has History and Verify. Do not treat partial success as a complete server backup, and do not add parallel Jobs until the failing layer is understood.

## `cancelled`

**Symptom**: the command returns `cancelled`, exit code `9`.

**Check**:

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
Get-ChildItem -LiteralPath (Join-Path $PROFILE 'logs')
```

**Meaning**: Ctrl+C, SIGTERM, Ctrl+Break, or `serve stop` requested cancellation. The CLI tries to let started backups, child process trees, and IPC/KnotLink work finish cancellation.

**Next step**: inspect the final envelope and logs, confirm the world/archive state before retrying, and check whether Serve still owns the Profile. Do not decide that cancellation succeeded by deleting temporary files.

## World is missing

Always use these three checks:

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

Check `saveRoot` → `worlds[].path` → actual directory permissions. `worlds[].path` is a relative path, not the display name.

## 7-Zip is unavailable

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

Confirm the account running the CLI, the bundled tool, archive format, and executable permissions. Do not rely only on the GUI Settings page, and do not infer tool availability from a successful `profile apply`.

## Serve will not start

```bash
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json doctor
```

Check:

- whether a GUI already owns the Profile;
- whether a normal CLI or another Serve is running;
- whether the user account is the same;
- local runtime socket/pipe permissions;
- the actual systemd service or Task Scheduler command and `--data-dir`.

Serve does not open a TCP/UDP management port; do not infer its state from a network port scan.

## A systemd timer does not create a backup

```bash
systemctl status minebackup-serve@server.service
systemctl status minebackup-backup@server.timer
systemctl list-timers 'minebackup-backup@*'
journalctl -u minebackup-backup@server.service
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
```

Trace scheduler → CLI → Job → Config → World → archive. If the manual `job run` fails, fix the CLI first; do not hide a Job error by changing the timer frequency.

## Restore is rejected

Check:

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

Focus on `coldRestoreReady`, world occupancy, and the archive chain. Stop the server and repeat the Restore dry-run; do not bypass world-occupancy protection or jump straight to `--confirm`.

If the symptom is not covered here, preserve the raw JSON, exit code, stderr, Profile logs, and `doctor` output, then return to [Commands, JSON, and exit codes](/en/docs/guides/minebackup-v1/cli/reference).
