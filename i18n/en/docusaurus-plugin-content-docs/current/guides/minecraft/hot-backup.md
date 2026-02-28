---
sidebar_position: 3
title: Hot Backup Mechanism
description: How MineRewind safely triggers backup while the game is running
---

# Hot Backup Mechanism

This page targets advanced MineRewind users and explains when hot backup is triggered, how decisions are made, and why fallback to regular backup can happen.

## Source mapping

| Capability | Core methods/constants | Location |
|---|---|---|
| Hot backup entry | `OnBeforeBackupFolder(...)` | `MinecraftSavesPlugin.Snapshot.cs` |
| Force-hot flag | `MarkForceHotBackup` / `IsForceHotBackupRequested` | `MinecraftSavesPlugin.Snapshot.cs` |
| File lock check | `IsFileLocked(...)` | `MinecraftSavesPlugin.Snapshot.cs` |
| Handshake flow | `PerformModHandshakeSync("backup", ...)` | `MinecraftSavesPlugin.Restore.cs` |
| Key switch | `EnableHotBackup` (`HotBackupSettingKey`) | `MinecraftSavesPlugin.cs` |
| Key timeout | `HandshakeTimeoutMs` / `WorldSaveTimeoutMs` | `MinecraftSavesPlugin.cs` |

## Trigger entry points

- Regular backup flow (world file is occupied before backup)
- Global hotkey `Alt+Ctrl+S`
- KnotLink command `BACKUP_CURRENT`

## Trigger conditions

MineRewind first confirms target is a Minecraft world folder:

- `level.dat` exists in current `ManagedFolder`
- Config type is `Minecraft Saves`

Then it decides whether to coordinate hot backup:

- `level.dat` is locked
- Or command requested forced hot backup

If these conditions are not met, plugin returns `null` and host continues normal backup.

## Execution flow

1. Read plugin settings and confirm `EnableHotBackup = true`
2. Handshake with integration mod (`action = backup`)
3. If handshake succeeds, broadcast `pre_hot_backup`
4. Wait for `WORLD_SAVED` confirmation (with timeout)
5. Continue host backup flow

> If handshake fails, times out, or is incompatible, plugin falls back to regular backup.

### Sequence (text)

```text
Host backup start
  -> MineRewind.OnBeforeBackupFolder
      -> check configType + EnableHotBackup + level.dat
      -> if locked/forced: handshake(action=backup)
          -> success: Broadcast pre_hot_backup
          -> wait WORLD_SAVED (10s)
          -> return to Host regardless of result
  -> Host continues backup engine
```

## Key timeout behavior

- Handshake timeout: `HandshakeTimeoutMs = 3000`
- World-save wait timeout: `WorldSaveTimeoutMs = 10000`
- Timeout policy: log and continue regular backup

Hot coordination is best-effort and does not block backup forever.

## Command example

### Request

```text
BACKUP_CURRENT QuickSave
```

### Typical response

```text
OK:Backup started for 'WorldName'
```

If no active world:

```text
ERROR:No active world.
```

## Difference vs regular backup

- Regular backup: directly enters backup engine
- Hot backup: attempts mod save-flush coordination first

## Best practices

- Keep `EnableHotBackup = true` for long-running worlds
- Run one manual chain test before daily use
- Trigger extra manual backup at important moments in heavy modpacks

## Related links

- [Minecraft Quick Start](./quick-start)
- [Hot Restore Mechanism](./hot-restore)
- [KnotLink and Integration Mod](./knotlink-mod)
