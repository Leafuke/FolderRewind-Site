---
sidebar_position: 5
title: Your First Restore
description: Perform a verifiable restore drill from history records
---

# Your First Restore

We recommend practicing on a test world first -- do not perform your very first restore directly on your main save.

A safe principle: your first restore should only be a "verifiable, minor rollback." Verify the process first, then handle real incidents.

## Standard Restore Flow

1. Open history and select the target backup
2. Choose the restore method and confirm
3. Wait for the restore to complete, then re-enter the world to verify

## Pre-Restore Checklist

Before executing a restore, confirm the following:

1. The target world is not currently in a high-risk write state
2. The target backup file actually exists and is readable
3. You are aware of the restore scope (full package / partial)
4. You have decided whether to enable "backup before restore" as a safety net

## Restore Method Descriptions

- Clean: Clears then restores -- suitable for a complete rollback
- Overwrite: Overwrites existing files
- Reverse: Reverse strategy (for specific diff scenarios)
- Custom: Custom list of entries to restore

### How to Choose a Restore Method

- Not sure: Start with `Clean`
- Want to preserve the existing directory structure: Try `Overwrite`
- Only restore specific files: Use `Custom`

For a first-time drill, we do not recommend using `Reverse` directly.

## Backup Before Restore

If "backup before restore" is enabled, the system will create a safety-net backup before executing the restore.

We strongly recommend keeping this setting enabled at all times, especially for production worlds.

## Success Criteria

- The target point-in-time state is correctly restored
- Key files are readable
- The operation is still traceable in history

## Post-Restore Verification (3 Minutes)

- Enter the world and confirm block states at key locations
- Check whether recent key progress points match expectations
- If player data integration is enabled, verify that player states are correct

## Rollback Strategy if Restore Fails

If the restore result does not meet expectations:

1. Immediately stop further operations
2. Use "backup before restore" to return to the pre-restore state
3. Re-run the restore with a more clearly identified target backup

Further reading: [History and Restore Strategies](./history-and-restore).
