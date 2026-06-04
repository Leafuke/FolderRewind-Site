---
sidebar_position: 7
title: "History and Restore Strategy"
description: History window, important markers, renaming, deletion and restore strategies
---

# History and Restore Strategy

History records are MineBackup's core traceability layer. No matter how diligently you back up, if your history is unreadable or unusable, recovery efficiency will drop significantly.

## What the History Window Can Do

- Browse backup entries by world
- Search file names and comments
- View status (present / missing / abnormal size)
- Start a restore with one click

Think of the history window as your "restore console," not just a list viewer.

## Common Maintenance Operations

- Rename backup files
- Mark / unmark important backups
- Open the folder containing a backup
- Clean up stale history entries

## Good Maintenance Habits

- Star important backups as soon as possible
- Add comments to key milestone backups
- Periodically clean up stale entries to keep the list readable
- Only delete backups through the built-in interface to avoid chain corruption

## Deletion Guidelines

- Avoid deleting backups manually in your file explorer
- Prefer the built-in delete function to keep history records and dependency chains consistent
- Be especially careful with Smart chains to prevent broken links

### Recommended Deletion Workflow

1. First check whether the entry is depended on by later increments
2. If unsure, mark it as important and keep it
3. After using the built-in delete, verify that restore still works

## Why Important Markers Matter

When backup count limits are enabled, important entries can serve as a priority basis for retention, reducing the chance of being automatically cleaned up.

## Restore Strategy Tips

- Routine rollback: Prefer the most recent stable backup
- Incident recovery: Pick a clear point in time first, then validate on a small scale
- Chain anomalies: Prefer reverting to the most recent Full, then work forward step by step

This approach greatly reduces the cost of repeated "restore after restore" cycles.
