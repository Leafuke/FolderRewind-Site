---
sidebar_position: 13
title: KnotLink v2 Integration
description: Practical integration flows and boundaries for MineBackup 1.16.2, MineBackup-Mod, and KnotLinkService
---

# KnotLink v2 Integration

MineBackup 1.16.2 implements only the FolderRewind/KnotLink v2 parameterized protocol. A request is a non-empty semicolon-separated key-value map:

```text
key=value;key2=value2
```

Keys are case-insensitive and values use RFC 3986 percent-encoding. Empty segments, duplicate keys, invalid percent escapes, raw reserved characters, or a missing `cmd` are rejected. Old space-separated commands, positional parameters, and aliases are outside the current compatibility range.

## Version and service requirements

- MineBackup: 1.16.2.
- MineBackup-Mod: `3.0.0` or newer.
- KnotLinkService: `3.2.0.0` or newer is required by the current integration path.
- On Windows, the service must expose loopback ports `6370` and `6378`; a startup wait beyond 10 seconds is treated as failure without blocking the main window.

Linux discovers the service through dpkg and macOS through the Installer receipt. The wizard and Settings can download the service package from the official release location, try the text mirror when necessary, and open the platform installer. MineBackup does not complete the remaining system installation steps for the user.

## Recommended headless-server entry point

When a Minecraft Server runs on a host without a logged-in desktop, use [`minebackup-cli serve`](/en/docs/guides/minebackup-v1/cli/serve) to hold the long-lived runtime instead of treating the GUI or legacy Windows Service Mode as a daemon. `serve` keeps backup, history, verification, restore, and the KnotLink runtime for one profile online; the profile still has only one owner at a time. Use `serve status` to inspect KnotLink state and `serve stop` for an orderly shutdown. See [Linux systemd](/en/docs/guides/minebackup-v1/cli/linux-systemd) and [Windows Task Scheduler](/en/docs/guides/minebackup-v1/cli/windows-task-scheduler) for scheduler and account boundaries.

## Check capabilities first

The integration side should begin with:

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=GET_STATUS
```

The capability manifest advertises only commands and parameters MineBackup actually implements. State-changing `BACKUP`, `RESTORE`, `BACKUP_ALL`, `AUTO_BACKUP`, `STOP_AUTO_BACKUP`, and `MARK_IMPORTANT` requests must include both `from` and `request_id`.

## Common current-world commands

| Purpose | v2 request |
| --- | --- |
| List current-world archives | `cmd=LIST_BACKUPS;current_save=true` |
| Back up the current world | `cmd=BACKUP;current_save=true;from=minebackup.mod;request_id=req-1;comment=QuickSave` |
| Restore the latest archive | `cmd=RESTORE;current_save=true;from=minebackup.mod;request_id=req-2` |
| Restore a selected archive | Add `file=<encoded filename>` to the previous request |

When `file` is omitted, `RESTORE` selects the latest archive. One-shot overrides affect only the request; for example, `backup_mode=full` or `backup_mode=incremental` does not permanently change the configuration UI’s Full/Smart/Overwrite selection.

Query `data` is one outer-encoded scalar, not a JSON array or object. Follow MineBackup’s v2 reference for each command-specific payload format.

## Correlate events

Background work normally emits `command_accepted`, `command_started`, and `command_completed` / `command_failed`. Responses and events inherit `from` and `request_id`; integration code should use `request_id` to correlate one operation rather than relying only on event order.

Hot workflows also involve:

- `pre_hot_backup` and `WORLD_SAVED`: save the world before the backup window.
- `pre_hot_restore` and `WORLD_SAVE_AND_EXIT_COMPLETE`: save and exit before releasing files.
- `restore_finished`: the archive restore result.
- `rejoin_world` and `REJOIN_RESULT`: request and report rejoining.
- `hot_restore_complete` or `restore_cancelled`: the final hot-restore state.

## Unsupported extensions

MineBackup v2 does not implement regional scope, backup whitelists, or NBT player-data preservation from other FolderRewind/Minecraft extensions. A non-empty `backup_whitelist`, `backup_scope`, `scope_*`, or `preserve_player_data=true` receives a structured `unsupported_parameter` error; other unknown extension keys may be ignored.

Removed commands include `SET_CONFIG`, `BACKUP_MODS`, `ADD_TO_WE`, `SEND`, `LIST_WORLDS`, and the various `*_CURRENT` aliases.

## Minimum integration drill

1. Keep production saves closed and work with a test world.
2. Start MineBackup, KnotLinkService, and the companion mod.
3. Send `PING`, `GET_CAPABILITIES`, and `GET_STATUS`.
4. Complete one current-world hot backup and inspect history.
5. List archives and hot-restore the latest archive.
6. Confirm each save, exit, file-release, restore, and rejoin stage.

If handshake, version, or timeout checks fail, return to ordinary backup/restore after closing the game. Do not repeatedly retry hot restore against a production world.
