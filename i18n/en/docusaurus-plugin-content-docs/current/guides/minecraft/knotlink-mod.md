---
sidebar_position: 5
title: KnotLink and Integration Mod
description: Commands, events, and compatibility points between MineRewind and external mods
---

# KnotLink and Integration Mod

MineRewind's hot backup/restore depends on KnotLink transport plus an integration mod.

## Source mapping

| Capability | Core methods | Location |
|---|---|---|
| Command definitions | `GetKnotLinkCommandDefinitions()` | `MinecraftSavesPlugin.KnotLink.cs` |
| Command dispatch | `TryHandleKnotLinkCommandAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| Handshake response handler | `HandleHandshakeResponseAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| World-saved signal | `HandleWorldSavedAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| Save-exit complete signal | `HandleWorldSaveAndExitCompleteAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |
| Rejoin result signal | `HandleRejoinResultAsync(...)` | `MinecraftSavesPlugin.KnotLink.cs` |

## Required setup

- FolderRewind + MineRewind (host version compatible)
- Integration mod that supports handshake/save/rejoin events
- Working KnotLink service

## Command matrix (external -> MineRewind)

| Command | Args | Meaning | Typical response |
|---|---|---|---|
| `BACKUP_CURRENT` | Optional note | Backup current active world | `OK:Backup started...` |
| `LIST_BACKUPS_CURRENT` | None | List backups of current world | `OK:file1;file2;...` |
| `RESTORE_CURRENT_LATEST` | None | Hot restore to latest backup | `OK:Hot restore triggered...` |
| `RESTORE_CURRENT` | `backup_file` | Hot restore to specified backup | `OK:Hot restore triggered...` |

If no active world or missing args, responses usually start with `ERROR:`.

## Event protocol (MineRewind -> external)

- `event=handshake`: handshake + version negotiation
- `event=pre_hot_backup`: request save before backup
- `event=pre_hot_restore`: request save-and-exit before restore
- `event=restore_finished`: restore stage result
- `event=rejoin_world`: request world rejoin
- `event=hot_restore_complete`: final chain status

## Callback commands (external -> MineRewind)

These are usually sent back by the integration mod:

- `HANDSHAKE_RESPONSE <mod_version>`
- `WORLD_SAVED`
- `WORLD_SAVE_AND_EXIT_COMPLETE` (or alias `SHUTDOWN_WORLD_SUCCESS`)
- `REJOIN_RESULT <success|failure> [reason]`

## Minimal integration test script

1. Send `BACKUP_CURRENT` to verify shortest path.
2. Send `LIST_BACKUPS_CURRENT` to verify query path.
3. Send `RESTORE_CURRENT_LATEST` to verify hot restore main chain.
4. Verify precise restore via `RESTORE_CURRENT <backup_file>`.

## Compatibility points

- Plugin enforces minimum mod version checks
- Handshake failure leads to fallback or cancellation
- Unified response prefixes `OK:` / `ERROR:` are recommended

Handshake payload contains `min_mod_version`; record it explicitly on integration side for easier diagnostics.

## Practical recommendations

- Start with `BACKUP_CURRENT` to verify shortest chain first
- Then test `RESTORE_CURRENT_LATEST` end-to-end
- Run `LIST_BACKUPS_CURRENT` before specified restore

## Request/response examples

### Example 1: list backups

Request:

```text
LIST_BACKUPS_CURRENT
```

Response:

```text
OK:world_2026-02-27_19-00.7z;world_2026-02-28_09-30.7z
```

### Example 2: handshake callback

Request:

```text
HANDSHAKE_RESPONSE 1.2.0
```

Response:

```text
OK:Handshake received. Version 1.2.0 (compatible)
```

## Related links

- [Hot Backup Mechanism](./hot-backup)
- [Hot Restore Mechanism](./hot-restore)
- [KnotLink Protocol and Integration](../../plugins/knotlink)
