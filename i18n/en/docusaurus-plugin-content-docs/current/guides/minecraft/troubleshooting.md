---
sidebar_position: 6
title: Troubleshooting
description: Common MineRewind issues, causes, and resolution steps
---

# Troubleshooting

This page follows "check chain first, then symptoms" to reduce trial-and-error.

## 60-second chain health check

Verify in order:

1. Plugin is enabled and `EnableHotBackup` is configured correctly.
2. Config type is `Minecraft Saves`.
3. Current world folder contains `level.dat`.
4. KnotLink and integration mod are online.
5. At least one backup file exists (for restore chain).

Any failed step can make hot backup/hot restore look like "no action" or "fallback".

## Symptom-to-source map

| Symptom | First logic to inspect |
|---|---|
| Saves not discovered | `TryDiscoverManagedFolders(...)` |
| Hot backup not coordinated | pre-return conditions in `OnBeforeBackupFolder(...)` |
| Hot restore ignored | non-reentrancy state machine in `TriggerHotRestoreAsync(...)` |
| Specified backup restore failed | `RESTORE_CURRENT` args and file existence check |
| Player data not preserved | `OnBeforeRestoreFolder` / `OnAfterRestoreFolder` |

## Symptom 1: saves are not discovered

Possible causes:

- Selected directory is not `.minecraft`, `saves`, or version folder
- World folder does not contain `level.dat`

Fix steps:

1. Ensure selected folder is Minecraft root or `saves`.
2. Confirm `level.dat` exists in target world folder.
3. Retry scan or add folder manually.

## Symptom 2: hot backup coordination does not trigger

Possible causes:

- `EnableHotBackup` is disabled
- KnotLink/integration mod unavailable
- World files are not occupied, so flow falls back to regular backup

Note: any early `return null` in `OnBeforeBackupFolder(...)` leads to fallback.

Fix steps:

1. Confirm `EnableHotBackup = true`.
2. Verify integration mod and KnotLink availability.
3. Test forced path via `BACKUP_CURRENT`.

## Symptom 3: hot restore is cancelled midway

Possible causes:

- Handshake timeout or version incompatibility
- World files not released before timeout
- No available backup file

Note: hot restore has staged timeouts (commonly 10s/15s/30s).

Fix steps:

1. Run `LIST_BACKUPS_CURRENT` to confirm backup existence.
2. Verify mod/service status and retry.
3. Use regular restore flow if issue persists.

## Symptom 4: specified backup restore fails

Possible causes:

- Typo in `RESTORE_CURRENT <backup_file>` filename
- Backup file moved or deleted

Fix steps:

1. List backups and copy exact filename.
2. Retry specified restore command.

## Symptom 5: player state is abnormal after restore

Possible causes:

- `PreservePlayerData` not enabled
- World data structure does not satisfy write-back conditions

Fix steps:

1. Enable `PreservePlayerData` in plugin settings.
2. Validate the full preserve flow in a test world first.

## Diagnostic command template

```text
1) BACKUP_CURRENT
2) LIST_BACKUPS_CURRENT
3) RESTORE_CURRENT_LATEST
4) RESTORE_CURRENT <from step2>
```

If step 1 fails, prioritize active-world detection and integration availability.
If step 3/4 fails, prioritize restore prerequisites and backup file existence.

## Still not solved?

- Export logs and include reproduction steps (trigger method, timestamp, command, result)
- Open an issue in community/repository

## Related links

- [Minecraft Guide Overview](./overview)
- [KnotLink and Integration Mod](./knotlink-mod)
- [Install and Manage Plugins](../../plugins/using-plugins)
