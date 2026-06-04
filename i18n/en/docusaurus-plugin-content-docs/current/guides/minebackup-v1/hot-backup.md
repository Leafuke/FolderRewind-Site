---
sidebar_position: 10
title: "Hot Backup and Snapshots"
description: Backing up running worlds, snapshot paths and integration waiting
---

# Hot Backup and Snapshots

When world files are locked (e.g., `level.dat` is in use) or you explicitly enable hot backup, MineBackup will use the snapshot / integration path instead.

The core value of hot backup: get a usable backup even while the game is running.

## Hot Backup Flow

1. Detect file locks or hot backup toggle
2. If needed, handshake with the integration module and wait for save to complete
3. Create a temporary snapshot directory
4. Compress and back up the snapshot
5. Clean up the snapshot afterwards

## When Hot Backup Is Triggered

- A critical file lock is detected
- Hot backup is explicitly enabled in the config
- The integration path requires a save before backup

## Key Path Parameters

- `snapshotPath`: Snapshot directory (configurable)
- Falls back to the system temp directory if not specified

## Tips for Integration Module Coordination

- Confirm the handshake succeeded before running critical backups
- If a timeout occurs, do not spam retries with high-frequency commands
- Switch back to the manual backup path to verify basic functionality first

## Usage Tips

- Enable hot backup when backing up during gameplay
- Check the snapshot path when disk space is low
- If the integration times out, switch back to manual first

## Common Failure Points

- No write permission for the snapshot directory
- Insufficient disk space on the snapshot drive
- The integration side did not return a "save complete" signal in time

Guiding principle: ensure a single stable success first, then restore automation or the hot path.
