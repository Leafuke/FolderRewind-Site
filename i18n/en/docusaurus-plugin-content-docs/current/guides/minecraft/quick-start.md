---
sidebar_position: 2
title: "Minecraft quick start"
description: "Enable bundled MineRewind, discover or select Java and Bedrock worlds, check paths and complete your first backup, restore and map preview."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft quick start

## 1. Enable MineRewind

Open plugin management in Settings, enable bundled MineRewind and check its runtime state. Independent updates are available through the official catalog or trusted `.frplugin` packages. See [plugin management](/docs/plugins/using-plugins).

## 2. Find your worlds

Open New backup project → Minecraft from Home. Discover saves automatically or select a directory to scan.

- Automatic discovery combines known locations and remembered roots.
- Select a launcher directory, game root, instance library, `saves`, `minecraftWorlds` or one world.
- Common locations cover official Java, HMCL, PCL2, PCLCE, Prism Launcher, Modrinth App, NetEase and Bedrock. Add portable or custom locations manually.

Choose worlds and review Java/Bedrock kinds, full paths and scope. Enter a name and separate backup destination, then confirm the summary. Different instances can become separate projects.

## 3. Back up and restore

Use a world copy for the first exercise. Exit the game and create a Full backup, find it in history and restore into a test folder. Inspect files and load the world in a test instance.

For Java, open [map preview](/docs/guides/minecraft/world-preview) to browse dimensions and player positions. Keep the game closed for Bedrock operations and use ordinary file backup and restore.

## 4. Add everyday settings

After confirming the workflow, configure [automation](/docs/guides/automation), [retention](/docs/guides/backup-modes) and [cloud copies](/docs/guides/cloud-archive). For in-game operations, prepare KnotLink and game components using [hot backup](/docs/guides/minecraft/hot-backup).

`AutoDiscoverSaves` defaults to enabled; `AutoCreateConfigs` and `PreservePlayerData` default to disabled. Change these in plugin settings as needed. See [hot restore](/docs/guides/minecraft/hot-restore) for player preservation.

<span id="next-steps" />
<span id="recommended-settings" />
<span id="step-1-install-plugin" />
<span id="step-2-scan-minecraft" />
<span id="step-3-verify-one-backup" />

<span id="install-and-enable" />
<span id="discover-instances" />
<span id="validate" />
<span id="next" />
<span id="launchers-and-bedrock" />
