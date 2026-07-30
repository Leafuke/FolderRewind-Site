---
sidebar_position: 3
title: Folder Management and Rename
description: Safely rename a managed folder and understand changes to local data, history, and cloud objects
---

# Folder Management and Rename

FolderRewind 1.8 can rename a managed folder from inside the app. This is more than a display-name change: FolderRewind previews and migrates the local directories, config references, and history identity associated with the folder.

:::warning Back up before renaming
Stop related automation tasks and create verified backups of the source folder, FolderRewind configuration, and important history first. If the folder uses cloud archives, also confirm that critical remote backups can be downloaded and restored.
:::

## Where to rename

1. Open **Folder Management**.
2. Open the target folder's menu and select **Rename**.
3. Enter the new name and review the impact preview.
4. Confirm the source path, target path, and references to be updated before continuing.

The preview shows which local directories and references the transaction will handle. Cancel and inspect the configuration first if it does not match your expectations.

## Name and conflict validation

FolderRewind rejects invalid operations before migration begins, including:

- An empty or unchanged name, or a name or character Windows does not allow.
- A missing source directory or an existing target directory.
- A conflict with another managed folder, backup directory, or metadata target.
- Any state where the migration target cannot be determined reliably.

Do not rename the folder outside the app and then try to patch the configuration manually. That can separate its history identity and automation targets from the actual directory.

## What the transaction migrates

A rename runs as a transaction and may migrate:

- The managed source directory.
- The local backup directory.
- The folder metadata directory.
- Path and name references in configuration.
- Automation targets.
- The folder identity used by history records.
- Recently used manager and history paths.

If a step fails, FolderRewind attempts to roll back completed steps in reverse order. File locks, permissions, or disk state can also affect rollback. After a failure, stop new backup and restore work until the source directory, target directory, and configuration references have been checked for consistency.

## Cloud objects are not physically renamed

Existing cloud objects are not moved or renamed with the local folder:

- Old history records keep the remote path saved when each record was created.
- New uploads after the rename may use a remote prefix based on the new name.
- History for one folder can therefore span both the old and new remote prefixes.

This does not automatically mean history was lost. Keep the old remote path until history access and restore tests are complete.

## Post-rename checklist

1. Confirm that the new directory opens and that no unexpected data remains at the old path.
2. Open Config Settings and verify the source path, local backup path, and automation targets.
3. Check the history timeline and make sure old records remain accessible.
4. Run one manual backup and restore it into a test directory.
5. If cloud archive is enabled, validate the download path of one old record and one new record.

## Related links

- [History Timeline](./history-timeline)
- [Automation](./automation)
- [Cloud Archive](./cloud-archive)
- [First Restore](../getting-started/first-restore)
