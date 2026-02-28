---
sidebar_position: 2
title: First Backup
description: Complete your first folder backup
---

# First Backup

This tutorial walks you through creating a config, adding folders, and finishing your first backup.

## Prerequisite

- You have completed [Installation](./installation)

## Overview

1. Create a config
2. Add folders to protect
3. Run backup (single folder or all folders)
4. Verify the backup in history

## 1) Create a config

1. On the home page, click **New Config**.
2. Choose a config type:
	- **Default**: General use (recommended for beginners)
	- **Encrypted**: Encrypted config (password required during restore)
	- Other plugin types: Provided by enabled plugins (for example, Minecraft-related types)
3. Enter a config name.
4. Confirm and open the generated config card to enter the **Management** page.

:::tip About plugin types
Config types are dynamically extended by plugins. Without plugins, you'll usually only see Default and Encrypted.
:::

## 2) Add folders

On the **Management** page, click **Add Folder**. You can choose:

- **Select a single folder** (most common)
- **Batch import subfolders** (imports all first-level subfolders under a selected directory)
- **Scan (plugin auto-discovery)** (plugins discover manageable folders from known structures)

After adding folders, they appear in the list and are usually marked as "Never backed up" at first.

> **Tip:** A folder is the smallest management unit. One config can contain multiple folders that share the same backup rules.

## 3) Run your first backup

Choose one:

- **Backup All**: runs backup for all folders in the current config.
- **Backup This Folder**: select one folder and back up only that folder (you can add a backup note).

You can monitor progress on the task page. After completion, a history record is created.

## 4) Verify the result

1. Select a folder on the management page and click **History Versions**.
2. Check whether a new history entry appears (time, type, size).
3. Click **View** to locate the backup file in File Explorer.

## Optional: recommended settings before your first backup

In **Config Settings**, consider:

- **Backup Mode**: Full / Smart Incremental / Overwrite
- **Skip backup when no changes**: avoids unnecessary archives

## FAQ

- No history after backup? Confirm your target path is configured and writable.
- Plugin scan found nothing? Confirm the plugin is enabled and the selected path matches the plugin's supported structure.

## Next Steps

- [First Restore](./first-restore) — Restore files from backup history
- [Automation](../guides/automation) — Configure scheduled automatic backups
