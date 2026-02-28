---
sidebar_position: 1
title: Plugin System Overview
description: Learn about the FolderRewind plugin ecosystem
---

# Plugin System Overview

FolderRewind has a built-in plugin system that allows developers to extend functionality for specific scenarios.

## What plugins can do

| Capability | Description | Example |
|------|------|------|
| **Custom config types** | Define new backup config types | MineRewind adds a "Minecraft" type |
| **Auto discovery** | Scan directory structures intelligently | Discover saves under `.minecraft/saves` |
| **Hot-backup hooks** | Run custom logic before/after backup | Snapshot while game is running |
| **Hotkey extensions** | Register custom global hotkeys | Trigger specific actions quickly |
| **KnotLink commands** | Receive external commands over IPC | Integrate with third-party tools |

## Official plugin

### MineRewind v1.4.0

An official save-enhancement plugin built for Minecraft.

- Auto-scan and discover Minecraft saves
- Hot backup while the game is running
- World version detection

👉 [Minecraft Guide](../guides/minecraft/overview) | [Download](/download)

## Install plugins

1. Download plugin files from a plugin source.
2. Install from FolderRewind **Plugin Management**.
3. Restart the app to load the plugin.

## Become a plugin developer

If you want to build plugins for FolderRewind, start with [Plugin Development Quick Start](./developing/quick-start).

FolderRewind provides these extension interfaces:

- `IFolderRewindPlugin` — Main plugin interface
- `IFolderRewindHotkeyProvider` — Hotkey extension interface
- `IFolderRewindKnotLinkCommandHandler` — KnotLink command interface

## Related links

- [Plugin Development Quick Start](./developing/quick-start)
- [Install and Manage Plugins](./using-plugins)
- [KnotLink Protocol and Integration](./knotlink)
- [Plugin API Reference](./developing/plugin-api)
- [Minecraft Guide](../guides/minecraft/overview)
