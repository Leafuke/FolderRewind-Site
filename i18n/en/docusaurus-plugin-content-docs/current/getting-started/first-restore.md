---
sidebar_position: 3
title: First Restore
description: Restore your files from a backup
---

# First Restore

Learn how to restore a folder to any historical state.

:::caution v1.5.0 upgrade notice
This release redesigns incremental backup and restore logic. For configs upgraded from older versions, validate restore results in a test directory first.
:::

## Steps

### 1. Open the history page

1. Open FolderRewind.
2. Click the target config card to enter details.
3. Select the folder and open its **History Timeline**.

### 2. Select a restore point

The timeline lists all backups in chronological order. Each entry shows:

- Backup time
- File size
- Archive file name

Select the point you want to restore to.

### 3. Run restore

1. Select a backup entry and click **Restore**.
2. In the confirmation dialog, choose restore mode:
	- **Clean Restore**: cleans target directory before restore (recommended). If **Safe Restore** is enabled, FolderRewind creates a snapshot first and rolls back automatically if restore fails.
	- **Overwrite Restore**: overwrites same-name files and may keep old files
3. Some plugin-driven configs may fully take over restore logic. In that case, follow the plugin prompt and plugin documentation.
4. Confirm and wait for completion.

:::info Encrypted configs
If the config type is encrypted, password verification is required before restore.
:::

:::caution Important
Clean mode removes existing content in the target directory (except whitelist rules).
If unsure, run a manual backup first, and enable both "Auto backup before restore" and "Safe Restore".
:::

### 4. Verify results

Check folder contents and confirm files are restored to the expected state.

## Three recommended safety settings

In **Config Settings → Restore Policy**:

- Enable **Auto backup before restore**
- Enable **Safe Restore** so Clean restore can roll back automatically if something goes wrong
- Configure **Restore Whitelist** to keep specified files/folders in Clean mode

## Troubleshooting

- Backup file missing: the archive may have been moved or deleted manually.
- Password verification failed: confirm the correct password for this config.
- Restore failed midway: if Safe Restore was enabled, FolderRewind will try to roll back automatically; then inspect the task log for the actual cause.
- Unexpected result after restore: confirm restore mode and whitelist settings.

## Next Steps

- [Backup Modes](../guides/backup-modes) — Choose the right strategy
- [Minecraft Guide](../guides/minecraft/overview) — Scenario-specific restore workflow for Minecraft
