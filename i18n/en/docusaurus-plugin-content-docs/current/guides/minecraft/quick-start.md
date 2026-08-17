---
sidebar_position: 2
title: Minecraft Quick Start
description: Finish MineRewind setup, scan, and first backup in 10 minutes
---

# Minecraft Quick Start

## Step 1: Install plugin

1. Open Plugin Management in FolderRewind.
2. Install `MineRewind` (market or local ZIP).
3. Restart the app.

![MineRewind plugin card in FolderRewind Settings](/img/docs/guides/minecraft/mine-rewind-settings.webp)

## Step 2: Scan `.minecraft`

1. Choose Minecraft-related flow when creating config.
2. Select your `.minecraft` root folder.
3. Let plugin auto-discover saves and create configs.

![MineRewind plugin settings showing the save discovery and automatic config switches](/img/docs/guides/minecraft/mine-rewind-plugin-settings.webp)

Open a generated world config to confirm its world name, game mode, and save format in the folder details.

![Minecraft world details dialog showing the world name, game mode, seed, and save format](/img/docs/guides/minecraft/minecraft-world-details.webp)

## Step 3: Verify one backup

1. Select one world and run manual backup.
2. Check whether backup history is generated.
3. Optional: run one restore drill in a test world.

## Recommended settings

- `EnableHotBackup = true`
- Enable `PreservePlayerData` if you want to preserve player state after restore when possible

## Next steps

- [Minecraft Guide Overview](/en/docs/guides/minecraft/overview)
- [Hot Backup Mechanism](/en/docs/guides/minecraft/hot-backup)
- [Hot Restore Mechanism](/en/docs/guides/minecraft/hot-restore)
- [Automation](/en/docs/guides/automation)
- [Backup Modes](/en/docs/guides/backup-modes)
