---
sidebar_position: 7
title: Backup Modes, Chain Integrity, and Safe Deletion
description: Full, Smart, and Overwrite modes and Smart-chain maintenance rules in MineBackup 1.16.2
---

# Backup Modes, Chain Integrity, and Safe Deletion

MineBackup’s configuration UI still exposes **Full, Smart, and Overwrite** backup modes. They determine how archives are created, how history grows, and which files are required during restore.

Do not confuse these configuration modes with `backup_mode=full|incremental` in a one-shot KnotLink request. The request value is a per-call override; it does not permanently change the configuration.

## Mode comparison

| Mode | Actual behavior | Strength | Cost |
| --- | --- | --- | --- |
| `Full` | Creates a new archive containing the current complete file state | Straightforward and has fewer restore dependencies | More storage and compression time |
| `Smart` | Uses a Full baseline, stores changes in Smart archives, and links them through metadata | Faster and smaller for frequent backups | Depends on the baseline, records, and chain order |
| `Overwrite` | Maintains an overwrite archive for the current state rather than accumulating the same history depth | Saves space and is simple for temporary synchronization | Fewer historical rollback points |

## How the Smart chain works

Smart backup requires an available Full baseline. Each Smart archive records:

- Which Full it is based on.
- Which Smart archive precedes it.
- Added, modified, deleted, and current complete file lists.
- The current chain state and last-backup information.

This data lives under `_metadata/<world>/` in `state.json` and `records/` below the backup root. Keeping only archive files while deleting metadata does not guarantee that a Smart archive can still be Clean-restored.

## When MineBackup creates a new Full

MineBackup forces Full when:

- No usable Full baseline exists.
- Smart metadata is missing, invalid, or cannot form a complete chain.
- The 1.15 → 1.16 migration completed only partially and the old chain is unsafe to continue.
- The Smart count reaches `maxSmartBackupsPerFull`.
- Another safety check determines that the existing chain cannot be continued reliably.

The default `maxSmartBackupsPerFull` is 5. It limits Smart archives after each Full; it is not the total history retention count.

## Important parameters

- `skipIfUnchanged`: skip a backup when nothing changed.
- `keepCount`: limit automatic retention; `0` means unlimited.
- `maxSmartBackupsPerFull`: bound a Smart chain and create a new Full at the threshold.
- `backupBefore`: create a safety backup before restore.
- `isSafeDelete`: attempt to preserve chain restorability when deleting a Smart archive.

Do not set retention so low that it removes the Full baseline and the Smart archives that depend on it together. After changing policy, observe several real backups before applying it elsewhere.

## Smart safe deletion

Deleting a Smart or Full archive in the file manager can make history, files, and metadata disagree. The history page’s safe deletion handles the chain position:

- Important backups or important targets are not forcibly modified.
- A chain-tail archive can use ordinary deletion.
- A middle Smart archive may need to be extracted and merged, then promote the later target to a new Full.
- If a step fails, the operation should abort with the original data retained rather than silently deleting half the chain.

If you only want to hide one history item, choose “history only” deletion instead of deleting the local archive. For important worlds, verify history and restore after deletion.

## Recommendations

- New configurations and milestones: `Full`.
- High-frequency Minecraft saves: `Smart` with a sensible chain limit and safe deletion.
- Temporary synchronization or latest-state-only data: `Overwrite`.
- Switching modes: create and verify a manual Full, then observe the next two or three backups.

When starting over or recovering from a broken chain, return to Full. Do not repair Smart by manually copying, renaming, or deleting files.
