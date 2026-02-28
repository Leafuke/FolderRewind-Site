---
sidebar_position: 3
title: First Restore
description: Restore your files from a backup
---

# First Restore

Learn how to restore a folder to any historical state.

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
	- **Clean Restore**: cleans target directory before restore (recommended)
	- **Overwrite Restore**: overwrites same-name files and may keep old files
3. Confirm and wait for completion.

:::info Encrypted configs
If the config type is encrypted, password verification is required before restore.
:::

:::caution Important
Clean mode removes existing content in the target directory (except whitelist rules).
If unsure, run a manual backup first, or enable "Auto backup before restore".
:::

### 4. Verify results

Check folder contents and confirm files are restored to the expected state.

## Two recommended safety settings

In **Config Settings → Restore Policy**:

- Enable **Auto backup before restore**
- Configure **Restore Whitelist** to keep specified files/folders in Clean mode

## Troubleshooting

- Backup file missing: the archive may have been moved or deleted manually.
- Password verification failed: confirm the correct password for this config.
- Unexpected result after restore: confirm restore mode and whitelist settings.

## Next Steps

- [Backup Modes](../guides/backup-modes) — Choose the right strategy
- [Minecraft Guide](../guides/minecraft/overview) — Scenario-specific restore workflow for Minecraft
