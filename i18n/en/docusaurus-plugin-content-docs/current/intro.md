---
sidebar_position: 0
title: Quick Start
description: Get started with FolderRewind in 5 minutes
---

# Quick Start

Welcome to **FolderRewind (Backup Time Machine)**! This guide helps you complete everything from installation to your first backup in about 5 minutes.

:::caution About the English docs
The current English documentation is AI-translated and may contain inaccuracies. Please double-check key details before applying them in production.
:::

:::caution v1.5.0 upgrade notice
This release introduces breaking changes to backup and restore logic. If you are upgrading from an older version, run several backup-and-restore drills in a test folder, test project, or test save before using it in production.
:::

## What is FolderRewind?

FolderRewind is a modern folder backup manager built with WinUI 3. It can:

- Use the **7-Zip engine** for efficient compression and encrypted backups
- Manage long-running backup history through **improved smart incremental chains**, chain truncation, and safe delete
- Enable **safe restore** in Clean mode and roll back automatically if restore fails
- Invoke **rclone or other third-party tools** to sync backups to cloud or external storage
- Extend functionality for specific scenarios (e.g., Minecraft) through the **plugin system**, where plugins may even take over restore logic

## Quick Start in 3 Steps

### Step 1: Install

Install from Microsoft Store (recommended), or see the [Installation Guide](./getting-started/installation) for sideloading.

> Use Microsoft Store first when possible, and **do not install the Store version and the offline package side by side**.

<a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
	👉 Install from Microsoft Store
</a>

### Step 2: Create a config and add folders

1. Launch FolderRewind and click **New Config**.
2. Choose a config type (usually **Default**) and name it.
3. Open the management page, click **Add Folder**, and pick the folder you want to protect.

> **Minecraft player?** Install the [MineRewind plugin](./guides/minecraft/overview) to auto-scan and discover your save folders.

### Step 3: Run your first backup

On the management page, click **Backup All**, or select one folder first and click **Backup This Folder**.

If you upgraded from an older version or the data is important, perform a restore validation in a test directory right after the first backup.

🎉 Your folder is now protected.

## Next Steps

- [Installation Guide](./getting-started/installation) — Detailed install instructions
- [First Backup](./getting-started/first-backup) — Learn backup options in depth
- [First Restore](./getting-started/first-restore) — Learn how to restore files from history
- [Minecraft Guide](./guides/minecraft/overview) — Essential for Minecraft users
- [Automation](./guides/automation) — Set up automatic backups
