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
| **Backup hooks and filters** | Run custom logic and filter files before/after backup | Snapshot while game is running |
| **Backup scopes** | Define parameterized backup scope strategies | Select Minecraft regions |
| **Folder details** | Contribute display and identity details for managed folders | Show world metadata |
| **Restore interception** | Validate or enrich a restore before it starts | Preserve game state |
| **Config augmentation** | Add validated plugin-owned config fields | Store scenario-specific settings |
| **Hotkey extensions** | Register custom global or in-app hotkeys | Trigger backup or restore quickly |
| **KnotLink commands** | Receive strict key-value commands over IPC | Integrate with third-party tools |

## Official plugin

### MineRewind

An official save-enhancement plugin built for Minecraft.

- Auto-scan and discover Minecraft saves
- Hot backup while the game is running
- Hot restore with world coordination
- Region-scoped backup support
- Parameterized protocol v2 extensions through KnotLink Server v3

👉 [Minecraft Guide](../guides/minecraft/overview) | [Download](/download)

## Install plugins

1. Download plugin files from a plugin source.
2. Install from FolderRewind **Plugin Management**.
3. Restart the app to load the plugin.

## Become a plugin developer

If you want to build plugins for FolderRewind, start with [Plugin Development Quick Start](./developing/quick-start).

FolderRewind provides these extension interfaces:

- `IFolderRewindPlugin` — Main plugin interface
- `IFolderRewindBackupFilterProvider` — Backup filtering
- `IFolderRewindBackupScopeProvider` — Parameterized backup scopes
- `IFolderRewindBackupPreparationProvider` — Backup preparation and validation
- `IFolderRewindFolderDetailsProvider` — Folder display and identity details
- `IFolderRewindRestoreInterceptor` — Restore validation and interception
- `IFolderRewindConfigAugmenter` — Plugin-owned configuration fields
- `IFolderRewindHotkeyProvider` — Hotkey extension interface
- `IFolderRewindParameterizedKnotLinkCommandHandler` — parameterized KnotLink command handler
- `IFolderRewindKnotLinkCapabilityProvider` — discoverable command and signal manifest

## Related links

- [Plugin Development Quick Start](./developing/quick-start)
- [Install and Manage Plugins](./using-plugins)
- [KnotLink Protocol and Integration](./knotlink)
- [Plugin API Reference](./developing/plugin-api)
- [Minecraft Guide](../guides/minecraft/overview)
