---
sidebar_position: 3
title: KnotLink Protocol and Integration
description: How FolderRewind communicates with external programs through KnotLink
---

# KnotLink Protocol and Integration

KnotLink is the bridge between FolderRewind and external programs (such as game mods and scripts).

## Typical use cases

- Notify external program to save before backup
- Notify external program to reload state after restore
- Accept external commands to trigger backup or restore

## Plugin integration points

- `PluginHostContext.BroadcastEvent(...)`: broadcast events
- `PluginHostContext.QueryKnotLinkAsync(...)`: request-response query
- `IFolderRewindKnotLinkCommandHandler`: extend recognizable commands

## Example commands in MineRewind

- `BACKUP_CURRENT`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT`

See implementation details in [KnotLink Command API](./developing/knotlink-api).

## Related links

- [Plugin API Reference](./developing/plugin-api)
- [KnotLink Command API](./developing/knotlink-api)
- [Minecraft Guide Overview](../guides/minecraft/overview)
