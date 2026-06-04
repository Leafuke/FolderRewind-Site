---
sidebar_position: 6
title: "Backup Modes (Full / Smart / Overwrite)"
description: Behavior differences and parameter tips for MineBackup's three backup modes
---

# Backup Modes (Full / Smart / Overwrite)

No single mode is universally best -- the right choice depends on your directory size, backup frequency, and restore habits.

## Full

- Generates a complete package every time
- Straightforward structure, the safest option
- Relatively higher disk usage

**Best for:** Early setup, key milestones, before and after high-risk updates.

## Smart (Incremental)

- Records changes and builds an incremental chain
- During restore, it automatically finds the baseline Full and applies changes in order
- If metadata is corrupted or the baseline is missing, it falls back to Full

**Best for:** Frequent backups, large worlds, saving disk space.

## Overwrite

- Only keeps the latest backup state
- Minimal disk usage, but minimal history depth

**Best for:** Temporary syncing, directories where only the latest state matters.

## Key Parameters

- `skipIfUnchanged`: Skip backup when nothing has changed
- `maxSmartBackupsPerFull`: Trigger a new Full after the incremental chain reaches this threshold
- `keepCount`: Number of backups to retain (works with cleanup policies)

Additional notes:

- `maxSmartBackupsPerFull` only applies to Smart mode
- A very low `keepCount` will shorten your restore window
- Manually deleting packages in a Smart chain can break restorability

## Quick Selection Table

| Scenario | Recommended Mode | Reason |
|---|---|---|
| First-time user running through the flow | Full | Stable and easy to understand |
| Frequent backups during daily survival | Smart | Balances speed and space |
| Temporary test directory | Overwrite | Saves space, easy to maintain |
| Before a major version update | Full | Creates a clear restore anchor |

## Choosing a Mode

- Beginners: Full + skip if unchanged
- Frequent archiving: Smart + set a chain length cap
- Temporary directories: Overwrite

## Switching Between Modes

When switching from one mode to another, it is a good idea to run a Full backup first:

1. Run a Full backup to establish a new anchor point
2. Then switch to Smart / Overwrite
3. Monitor 2-3 backup cycles before applying the change to other profiles

This greatly reduces the chance of history chain confusion after a mode switch.
