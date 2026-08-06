---
sidebar_position: 18
title: Troubleshooting
description: Diagnose MineBackup 1.16.1 by profile, backup chain, restore, automation, integration, and cloud layer
---

# Troubleshooting

Identify the layer where the failure occurs and change one variable at a time. Preserve the profile, archives, and logs while investigating; do not delete an active directory just to “reset” the application.

## The shortest diagnostic path

1. Open [Logging and diagnostics](./logging-and-diagnostics) and confirm the version, platform, active profile root, and failure time.
2. Check world paths, `backupPath`, `snapshotPath`, permissions, and free space.
3. Run a normal Full backup for one world, then restore it in a test copy.
4. Add Smart, filters, automation, KnotLink, or cloud archives only after the basic loop works.

If a minimal configuration completes “Full backup → visible history → restore,” the problem is usually in the original paths, chain, filters, or external integration. If the minimal configuration also fails, focus on the platform, tool, and permission layer.

## 1. MineBackup opened the wrong profile

In 1.16.1, configuration and history are not necessarily beside the EXE. Confirm:

- whether the launch used `--data-dir <absolute path>`;
- whether `portable.flag` is beside the Windows executable or AppImage;
- whether the profile root shown in the log is the expected directory;
- whether another MineBackup instance holds the profile lock.

For an isolated experiment, launch with a new absolute `--data-dir` rather than deleting the existing profile. See [Profiles and migration](./data-and-migration) for the layout and defaults.

## 2. 7-Zip is missing or the backup fails immediately

Check the compression-tool result from the installation page. The resolver can use the built-in tool, `7z`/`7z.exe` on the system path, or a manually selected executable. Confirm that the selected file exists, is executable for the current user, and that the archive directory is writable.

First complete a Full backup with the default format, then change LZMA2, Deflate, BZip2, zstd, or the compression level one at a time. After moving the application or profile, recheck manually selected tool paths; changing the profile does not move external tools automatically.

## 3. A backup fails while the game is running

Normal backup can fail when files are locked or still being written. First verify a normal Full backup after leaving the game:

- If the normal backup also fails, check the world path, permissions, disk, compression tool, and filters.
- If the normal backup succeeds, check KnotLink v2, the MineBackup-Mod version, the snapshot directory, and the save/exit workflow.
- Hot backup is a best-effort integration flow. A handshake failure, version mismatch, or timeout can fall back to a normal backup; it is not an unconditional consistency guarantee.

Hot restore must be rehearsed end to end in a test world. An interruption during save, exit, file-release waiting, restore, or rejoin can leave a state that needs manual confirmation.

## 4. Smart cannot be created or reports a broken chain

Smart depends on `_metadata/<world>/state.json`, `records/*.json`, a Full baseline, and the referenced archives still existing. Check:

- whether the latest Full and its Smart archives are still under `backupPath`;
- whether `BasedOnFullBackup` / `PreviousBackupFileName` still resolve to archive files;
- whether archives were moved, renamed, or partially deleted by hand;
- whether a 1.15 migration just completed with `Degraded`/`Failed`, or the Smart-chain limit was reached.

When metadata, the baseline, migration state, or the chain is unsafe, MineBackup establishes a new Full. Do not splice old records manually. After the new Full succeeds, enable Smart again; see [Backup modes](./backup-modes) for `keepCount` and `maxSmartBackupsPerFull`.

## 5. The restored world is not what was expected

Confirm the selected archive, world, and restore method:

- **Clean** clears the target before restoring and is appropriate when the target must match the archive.
- **Overwrite** replaces files supplied by the archive; extra target files can remain.
- **Reverse** undoes the changes represented by a selected archive and depends on its chain links and files.
- **Custom** applies selected files and cannot guarantee whole-world consistency by itself.

Enable `backupBefore` as a fallback point, but do not treat it as a substitute for a test world. When the world is running, exit and wait for file release first. Before restoring an external or partial archive, record the target directory and the restore-before-backup point.

## 6. An automation task or Special Config does not run

Check in this order:

- Normal-configuration `backupOnGameStart` targets a detected game-session start, not application startup; stopping automatic backup on exit is global.
- Confirm that the task is enabled, its configuration/world indices are valid, and the trigger is Once, Interval, or Scheduled as intended.
- Check whether Sequential/Parallel execution makes tasks compete for the same world, archive directory, disk, or external command.
- Confirm that the Special Config uses a stable `SpecialConfigId` and that `autoExecute`, `runOnStartup`, and `exitAfterExecution` form the intended workflow.
- Command tasks use `cmd.exe` on Windows and `/bin/sh` on Linux/macOS. Batch syntax, path rules, and PowerShell commands are not automatically portable.
- `Script` is still unimplemented; do not treat it as an enabled script task.

Disable parallel work and reproduce once with a Once task. Use Debug logging to inspect the trigger, process exit code, and task target.

## 7. KnotLink integration fails

Confirm MineBackup-Mod is at least `3.0.0` and KnotLinkService is at least `3.2.0.0`. On Windows, check the default loopback endpoints: port 6370 for the main service and 6378 for the related service. Requests must use strict `key=value;key2=value2` syntax; state-changing requests require `from` and `request_id`.

Do not keep trying old positional arguments, aliases, or free-text commands. Check endpoint/version capability first, then follow the event associated with the `request_id`. See [KnotLink v2 integration](./knotlink-integration) for MineBackup usage and [plugin documentation](../../plugins/knotlink-commands) for developer-facing details.

## 8. Cloud archive or rclone fails

- rclone is not bundled with MineBackup. For the managed installer, confirm user approval and the pinned version/SHA-256 verification.
- Check the remote name, remote path, and local `backupPath`, but never share credential files or secrets embedded in commands.
- Distinguish **History only** from **History + archives**; a successful history upload does not mean archive files were uploaded.
- A configuration imported from the cloud remains pending until local world and archive paths are bound again.
- If one history entry has an incomplete cloud copy, restore or re-upload the corresponding archive and metadata before trying a cloud restore.

See [Cloud archive](./cloud-archive) for the complete user workflow.

## 9. 1.15 migration reports Pending, Degraded, or Failed

Do not delete legacy configuration or history to bypass migration. Open the migration summary and [Profiles and migration](./data-and-migration):

- `Pending` usually means the configuration identity transaction is incomplete, so dependent history, world, or cloud writes are gated.
- `Degraded` means recognized data was migrated but could not be reconstructed completely; the next backup for that world establishes a safe Full.
- `Failed` means reading, snapshotting, committing, or validation failed; source files should remain available.

Check the snapshot path and error in the log, retry the migration unit, and then run a Full-and-restore loop for a test world.

## 10. Legacy Windows Service problems

MineBackup 1.16.1 cannot install or start Service Mode. Use [Legacy Windows Service Cleanup](./service-mode) to inspect and remove only a validated old service; non-Windows platforms do not provide this cleanup. Do not use `--service` or bypass the validation with a service-management command.

## Before sending diagnostics

Temporarily enable Debug, reproduce once, and use **Export Diagnostics**. Open the file and confirm that redaction is adequate, then provide the MineBackup version, platform, profile mode, affected configuration/world, operation time, smallest reproduction, and `request_id`. Do not upload credentials, remote authentication data, or unchecked local rotating logs.
