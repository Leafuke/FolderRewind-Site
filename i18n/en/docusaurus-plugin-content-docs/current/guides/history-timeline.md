---
sidebar_position: 6
title: History Timeline
description: View, mark, and restore backups from history
---

# History Timeline

The History Timeline lets you inspect folder backup evolution and run restore actions.

## How to open

1. Enter the target config management page.
2. Select a folder.
3. Click **History Versions**.

## What you can do

- View time, type, notes, and file size per entry
- Search by note keywords
- Mark/unmark important backups (star)
- Edit notes
- Locate backup file in File Explorer
- Restore or delete history entries

## Filtering and visualization

- Switch history scope by config and folder
- Filter results by note keywords
- Enable status color display:
  - Normal
  - Small-file warning
  - Missing-file warning

## Recommended restore flow

1. Click **Restore** on the target entry.
2. Choose mode:
   - Clean Restore
   - Overwrite Restore
3. Wait for completion and verify results.

## Management tips

- Star key milestone backups to prevent accidental cleanup.
- Use notes like "change purpose + date" for better traceability.
- Prefer deleting history entries inside FolderRewind instead of manually deleting incremental archives in File Explorer.
- Run "Clear invalid entries" periodically to remove entries whose archives no longer exist.

## Safe Delete (v1.5.0)

When you delete a backup that belongs to a smart incremental chain, FolderRewind can enable **Safe Delete** to merge required content into the successor backup before removing the current one, reducing the chance of a broken restore chain.

Recommendations:

- Keep **Safe Delete** enabled for long-lived Smart Incremental configs.
- Verify restore results before deleting key milestones.
- For bulk cleanup, prefer the app workflow instead of deleting archives manually.

## Rebuild History (v1.4.2)

If history records are accidentally removed, migration is incomplete, or only backup archives remain, you can use **Rebuild History** to regenerate history entries from backup files.

Recommended prerequisites:

- Keep standard filename format (`[Full/Smart/Overwrite][timestamp]...`)
- Keep directory layout as `DestinationPath/<folder-name>/`

See: [Backup File Specification](./backup-file-spec)

## FAQ

### "View" says file not found

History entry still exists, but archive was moved or deleted. Run "Clear invalid entries" first.

### Restore result is not expected

Verify restore point and restore mode first, then check restore whitelist settings. If the config was upgraded from an older version, go back to test data and validate the chain again.

## Related links

- [First Restore](../getting-started/first-restore)
- [Filter Rules](./filters)
- [Backup File Specification](./backup-file-spec)
