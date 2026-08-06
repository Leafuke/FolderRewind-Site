---
sidebar_position: 5
title: Your First Backup
description: Validate the configuration, compression engine, history, and backup chain in MineBackup 1.16.1
---

# Your First Backup

The first backup should validate a complete path: the source is readable, the backup root is writable, the compression tool runs, history persists, and the resulting archive can be restored.

## Recommended procedure

1. Select the target world in the main window.
2. Leave the backup mode set to `Full`.
3. Add an optional comment such as `baseline_20260806`.
4. Start the backup and wait for the task to finish.
5. Inspect history and the backup directory.

Do not test Smart, automation, cloud synchronization, and hot integration all at once. Otherwise a failure is difficult to attribute to the base configuration or an external dependency.

## What the application does

A backup task generally:

- Validates the configuration, world path, destination, and compression tool.
- Scans changes and applies blacklist rules.
- Selects the Full, Smart, or Overwrite archive path.
- Performs migration checks, snapshot work, or hot-backup coordination when required.
- Writes the archive, history entry, and Smart-chain metadata.
- Applies retention and safe-deletion policy.
- Runs an independent cloud task afterward if cloud archive is enabled.

## Verify the result

At minimum, confirm:

- A new archive appears below the target world directory in the backup root.
- History shows its time, type, comment, and local/cloud status.
- `_metadata/<world>/state.json` and the relevant `records` data have no obvious error, especially for Smart mode.
- The archive is not zero bytes or implausibly small for the source data.
- Logs contain no compression-tool non-zero exit, permission, or read errors.

With `skipIfUnchanged` enabled, a second backup of an unchanged world may create no new archive. Confirm the skip reason in history and logs instead of treating it as a failure.

## Recovery order for a first failure

1. Check the 7-Zip path and the exit code in the log.
2. Check permissions and free space for the source, backup, and snapshot roots.
3. Temporarily remove complex blacklist rules and return to one world in Full mode.
4. Test an ordinary backup after closing the game.
5. Once that works, test hot backup, Smart mode, or cloud tasks separately.

If migration is Degraded or Failed, MineBackup may deliberately force a new Full chain. This protects the workflow from incomplete legacy metadata; do not bypass it by copying files manually.

## Two actions after the backup

- Add a readable comment in history and mark important milestones as important.
- Restore once in a test directory to verify that “backup succeeded” means more than a file was written: the recovery chain must also be usable.

After this validation, read [Backup modes, chain integrity, and safe deletion](./backup-modes) and [Your first restore](./first-restore).
