---
sidebar_position: 4
title: Hot Restore Mechanism
description: MineRewind save-exit-restore-rejoin flow and timeout strategy
---

# Hot Restore Mechanism

Hot restore targets the **currently active world**, combining the usual "save -> exit -> restore -> rejoin" steps into one automated chain.

![Minecraft backup entries and restore actions on the History Timeline](/img/docs/getting-started/history-timeline-page.webp)

## Source mapping

| Capability | Core methods/constants | Location |
|---|---|---|
| Hot restore entry | `TriggerHotRestoreAsync(...)` | `MinecraftSavesPlugin.Restore.cs` |
| Command entries | `HandleRestoreCurrentLatestAsync` / `HandleRestoreCurrentAsync` | `MinecraftSavesPlugin.KnotLink.cs` |
| Non-reentrancy state machine | `RestoreIdle/RestoreWaitingForMod/RestoreRestoring` + `Interlocked.CompareExchange` | `MinecraftSavesPlugin.cs` / `MinecraftSavesPlugin.Restore.cs` |
| File release waiting | `WaitForWorldReleaseAsync` / `WaitForFileUnlockedAsync` | `MinecraftSavesPlugin.Restore.cs` |
| Timeouts | `WorldExitTimeoutMs` / `FileReleaseTimeoutMs` / `RejoinTimeoutMs` | `MinecraftSavesPlugin.cs` |
| Player data preserve | `OnBeforeRestoreFolder` / `OnAfterRestoreFolder` | `MinecraftSavesPlugin.Restore.cs` |

## Trigger methods

- Hotkey: `Alt+Ctrl+Z`
- KnotLink v2 commands:
  - `cmd=RESTORE;current_save=true;...` (an empty `file` selects the latest backup)
  - Add `file=<encoded backup filename>` for a specified backup

## Prerequisites

- Active world can be identified (world files occupied)
- Available backups exist (latest or specified file)
- Integration mod and KnotLink are available

If any prerequisite fails, flow is cancelled with failure reason.

## State machine

- `RestoreIdle`: idle, can start restore
- `RestoreWaitingForMod`: waiting for mod save-and-exit
- `RestoreRestoring`: performing restore

If another trigger arrives when non-idle, request is ignored and logged.

## Execution flow

1. Handshake (`action = restore`) and check mod version
2. Send `pre_hot_restore`, wait for save-and-exit confirmation
3. Wait for world release (`level.dat` unlock included)
4. Run restore (latest or specified backup)
5. Send `restore_finished`
6. Send `rejoin_world`, wait for rejoin result
7. Broadcast `hot_restore_complete`

### Sequence (text)

```text
TriggerHotRestoreAsync
  -> handshake(action=restore)
  -> pre_hot_restore
  -> wait WORLD_SAVE_AND_EXIT_COMPLETE (10s)
  -> wait world release (15s) + level.dat unlock (10s)
  -> RestoreBackupAsync
  -> restore_finished(status=success/failure)
  -> rejoin_world
  -> wait REJOIN_RESULT (30s)
  -> hot_restore_complete(status=...)
```

## Typical final states

- `full_success`: restore + rejoin succeeded
- `restore_ok_rejoin_failed`: restore succeeded, rejoin failed
- `restore_ok_rejoin_timeout`: restore succeeded, rejoin timed out

If early steps fail (handshake, file release, missing backup file), flow ends early with `restore_cancelled` or `restore_finished;status=failure`.

## Common failure points

- Handshake timeout or incompatible mod version
- World files not released within timeout
- Specified backup file does not exist

## Request/response examples

### Restore latest

Request:

```text
cmd=RESTORE;current_save=true;from=minebackup.mod;request_id=hot-restore-001
```

Response:

```text
OK:Hot restore triggered for 'WorldName'
```

### Restore specified backup

Request:

```text
cmd=RESTORE;current_save=true;file=backup_2026-02-28_18-30-01.7z;from=minebackup.mod;request_id=hot-restore-002
```

Response:

```text
OK:Hot restore triggered for 'WorldName' with backup 'backup_2026-02-28_18-30-01.7z'
```

## Safety recommendations

- Run your first hot restore on a test world
- Before specified restore, run `cmd=LIST_BACKUPS;current_save=true` to verify the exact filename
- If hot restore keeps failing, use regular restore path first
- Enable `PreservePlayerData` before testing player-state retention

## Related links

- [KnotLink and Integration Mod](/en/docs/guides/minecraft/knotlink-mod)
- [Troubleshooting](/en/docs/guides/minecraft/troubleshooting)
- [First Restore](/en/docs/getting-started/first-restore)
