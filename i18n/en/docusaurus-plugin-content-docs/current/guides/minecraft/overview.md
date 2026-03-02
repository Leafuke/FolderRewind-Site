---
sidebar_position: 1
title: Minecraft Guide Overview
description: A complete view of MineRewind-based Minecraft save protection
---

# Minecraft Guide Overview

MineRewind is an official FolderRewind plugin that provides **backup and restore while the game is running** for Minecraft scenarios.

This page focuses on real-world capability boundaries based on current plugin implementation.

MineRewind works best with at least one integration mod or plugin that supports the hot backup/restore coordination and commands.

MineBackup-Mod：https://modrinth.com/mod/minebackup  
MineBackup-Plugin：https://modrinth.com/plugin/minebackupplugin

## Who should read this

- Long-term survival players (world corruption, misoperations, mod conflicts)
- Server/modpack testers (frequent rollbacks)
- Users who want minimal interruption to gameplay

## Implemented capabilities in MineRewind

## 1) Discovery and batch config creation

MineRewind can detect and create configs for:

- `.minecraft/saves/*`
- `.minecraft/versions/<version>/saves/*`
- Corresponding `mods` folders under version directories can also be included

The plugin sets config type to `Minecraft Saves` and auto-adds required filters (for example `session.lock`).

## 2) Hot backup coordination

Before backup, hot coordination is triggered when:

- World files are occupied (for example `level.dat` is locked)
- Or command triggers a forced hot backup

When conditions are met and KnotLink is available, the plugin handshakes with the mod, waits for world save flush, then enters backup.

## 3) Hot restore chain

For active worlds, MineRewind supports:

1. Handshake with integration mod
2. Ask mod to save and exit world
3. Wait for file release
4. Run restore (latest or specified backup)
5. Send rejoin signal and wait for result

This is the most important differentiator in Minecraft workflow.

## 4) Global hotkeys

- `Alt+Ctrl+S`: backup current active world
- `Alt+Ctrl+Z`: hot restore current active world

You can remap these in host settings.

## 5) KnotLink command extensions

Supported commands:

- `BACKUP_CURRENT`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT <backup_file>`

## 6) Optional player data preservation

With `PreservePlayerData` enabled, plugin can extract player data before restore and write it back to `level.dat` after restore.

Useful when you want to roll back world building progress while trying to keep player state.

## Prerequisites

- A compatible FolderRewind version (check plugin `MinHostVersion` in `manifest.json`)
- For hot restore chain, integration mod and KnotLink service must be installed and working

## Risks and boundaries

- Hot restore depends on mod status; timeout cancels the flow
- Specified-backup restore requires actual file existence
- Always run a manual drill before relying on automation

## Next steps

- New users: [Minecraft Quick Start](./quick-start)
- Backup details: [Hot Backup Mechanism](./hot-backup)
- Restore details: [Hot Restore Mechanism](./hot-restore)
- Integration details: [KnotLink and Integration Mod](./knotlink-mod)
- Issues first: [Troubleshooting](./troubleshooting)
- Protocol side: [KnotLink Protocol and Integration](../../plugins/knotlink)
- Dev side: [Plugin API Reference](../../plugins/developing/plugin-api)
