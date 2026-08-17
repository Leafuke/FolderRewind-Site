---
sidebar_position: 6
title: KnotLink and Integration Mod
description: Integrate MineRewind and a Minecraft mod with Server v3 and parameterized protocol v2
---

# KnotLink and Integration Mod

MineRewind hot backup and hot restore depend on KnotLink and a Minecraft integration mod. A FolderRewind 1.8 environment needs **KnotLink Server v3**, and every FolderRewind/MineRewind command uses strict key-value **parameterized protocol v2**.

## Prerequisites

- FolderRewind 1.8 and MineRewind satisfying its `MinHostVersion`.
- A compatible integration mod that handles handshake, save, exit, and rejoin events.
- A running KnotLink Server v3 with working send and receive paths.

Send `cmd=GET_CAPABILITIES` first. If the runtime manifest does not include MineRewind's `current_save` capabilities, do not continue with current-world commands.

## Current-world commands

MineRewind extends the Host's `BACKUP`, `LIST_BACKUPS`, and `RESTORE` through parameters. It no longer uses a second set of space-delimited commands:

| Purpose | v2 request |
|---------|------------|
| Back up current world | `cmd=BACKUP;current_save=true;from=minebackup.mod;request_id=...` |
| List current-world backups | `cmd=LIST_BACKUPS;current_save=true` |
| Restore latest backup | `cmd=RESTORE;current_save=true;from=minebackup.mod;request_id=...` |
| Restore a selected backup | Add `file=<encoded filename>` to the previous request |
| Preserve player data | Also add `preserve_player_data=true` |

Current-world backup can also use the Host's one-shot `comment`, `backup_mode`, `compression_method`, and `compression_level` overrides. They affect only this invocation.

```text
cmd=BACKUP;current_save=true;comment=QuickSave;backup_mode=full;from=minebackup.mod;request_id=mc-backup-001
```

## Integration callbacks

The mod reports stages back to MineRewind using the same v2 format:

```text
cmd=HANDSHAKE_RESPONSE;mod_version=1.8.0
cmd=WORLD_SAVED
cmd=WORLD_SAVE_AND_EXIT_COMPLETE
cmd=REJOIN_RESULT;result=success
```

Dynamic text such as a failure reason must be percent-encoded:

```text
cmd=REJOIN_RESULT;result=failure;reason=Server%20not%20ready
```

## MineRewind signals

- `handshake` / `handshake_ack` negotiate versions.
- `pre_hot_backup` asks the mod to save before hot backup.
- `hot_restore_requested` asks the mod to begin its current-world restore countdown.
- `pre_hot_restore` asks it to save and exit the world.
- `restore_cancelled` reports a cancelled restore flow.
- `rejoin_world` asks it to rejoin the restored world.
- `hot_restore_complete` reports the final end-to-end status.

The `request_id` in `hot_restore_requested` is reused by the later RESTORE conversation. Correlate one restore by this field, not by event ordering alone.

## Minimal integration test

1. Send `cmd=PING` to check the FolderRewind endpoint.
2. Send `cmd=GET_CAPABILITIES` to inspect MineRewind capabilities and fields.
3. Send current-world `BACKUP` and observe save and backup-completion signals.
4. Send current-world `LIST_BACKUPS` and verify the query result.
5. Run latest-backup `RESTORE` against a test world and observe save, exit, restore, and rejoin.
6. Finally test precise restore with `file` and optional player-data preservation.

:::danger Use a test world first
Hot restore changes a world that is in use. A failed version handshake, stage timeout, or continued world writes can cancel the flow. Rehearse it end to end and keep an independently restorable full backup before production use.
:::

## Related links

- [KnotLink Protocol and Integration](/en/docs/plugins/knotlink)
- [KnotLink Command Reference](/en/docs/plugins/knotlink-commands)
- [Hot Backup Mechanism](/en/docs/guides/minecraft/hot-backup)
- [Hot Restore Mechanism](/en/docs/guides/minecraft/hot-restore)
- [MineBackup Integration Mod Deep Dive](/en/docs/guides/minecraft/minebackup-mod)
