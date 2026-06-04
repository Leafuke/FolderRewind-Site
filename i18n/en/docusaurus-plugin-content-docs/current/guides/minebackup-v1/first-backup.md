---
sidebar_position: 4
title: Your First Backup
description: Validate your paths and compression pipeline starting with a manual backup
---

# Your First Backup

The core goal of your first backup is to "verify that your config actually works," not to achieve the highest compression ratio.

## Basic Steps

1. Select the target world in the main interface
2. Enter an optional comment (we recommend marking the test time)
3. Trigger the backup and observe the console log

Recommended comment format: `baseline_YYYYMMDD_HHMM` -- this makes future lookups much clearer.

## What Happens During a Backup

- Validates the target path and compression program availability
- Determines the Full / Smart / Overwrite flow based on the current mode
- Creates a snapshot when needed (hot backup path)
- Writes a history record entry

## Log Checkpoints to Watch

You only need to watch these categories to quickly determine success:

- Backup start header log
- Backup directory and compression program confirmation log
- (Optional) Hot backup snapshot creation log
- Backup end header log

If an external command failure or file lock message appears midway, check hot backup settings and path permissions first.

## Key Results to Confirm

- Backup files actually appear in `backupPath/WorldName/`
- The history window shows a new entry
- If "skip if unchanged" is enabled, the second backup will skip as expected

## Two Things to Do Immediately After Backup

1. Add a recognizable comment to this backup in the history list
2. Open the backup directory and confirm the archive file size is normal (not 0 KB or suspiciously small)

These two steps help avoid "looks successful but is actually unusable" false positives.

## Common First-Backup Failure Causes

- `7z.exe` path is invalid
- Backup directory is not writable
- World is locked and hot backup pipeline is not ready

## Quickest Recovery Strategy for First Failure

1. Switch the mode back to Full
2. Temporarily disable complex filter rules
3. Run the manual backup again

Get one stable success first, then gradually enable Smart mode, filters, and automation.

Next: Continue to [Your First Restore](./first-restore).
