---
sidebar_position: 4
title: KnotLink Command API
description: IFolderRewindKnotLinkCommandHandler interface and command handling patterns
---

# KnotLink Command API

By implementing `IFolderRewindKnotLinkCommandHandler`, plugins can extend host-recognized KnotLink commands.

## Interface

- `GetKnotLinkCommandDefinitions()`: declare command names and descriptions
- `TryHandleKnotLinkCommandAsync(...)`: dispatch and handle command

## Recommended dispatch structure

Use `switch` (or a mapping table) on uppercase command names:

```csharp
return command.ToUpperInvariant() switch
{
    "PING" => HandlePingAsync(args, hostContext),
    "BACKUP_CURRENT" => HandleBackupAsync(args, settingsValues, hostContext),
    _ => Task.FromResult<string?>(null)
};
```

Returning `null` means "this plugin does not handle this command" and host can continue to other handlers.

## Return convention

- Return `null`: not handled
- Return string: handled and returned as response

Recommended format:

- Success: `OK:<message>`
- Failure: `ERROR:<reason>`

## Implementation recommendations

- Return quickly and move long tasks to background
- Validate args early and fail fast (`ERROR:Missing ...`)
- Keep idempotence/state checks for long flows
- Log key paths and broadcast status events

## MineRewind command examples

- `BACKUP_CURRENT`
- `BACKUP <config_id> <folder_index|folder_name> [comment] [FORCE_FULL]`
- `RESTORE_CURRENT_LATEST`
- `LIST_BACKUPS_CURRENT`
- `RESTORE_CURRENT <backup_file>`

These commands work with KnotLink events to build a "save-exit-restore-rejoin" flow.

## Request/response examples

### List backups for active world

Request:

```text
LIST_BACKUPS_CURRENT
```

Response:

```text
OK:save_001.7z;save_002.7z
```

### Hot restore specified backup

Request:

```text
RESTORE_CURRENT save_002.7z
```

Response:

```text
OK:Hot restore triggered for 'WorldName' with backup 'save_002.7z'
```

### Force one full backup

If the config is currently using Smart Incremental mode but you need a one-off Full backup through remote control, append `FORCE_FULL` to the `BACKUP` command:

Request:

```text
BACKUP demo_config 0 manual verification FORCE_FULL
```

Response:

```text
OK:Backup task queued
```

Notes:

- `FORCE_FULL` bypasses the current backup mode only for this one remote invocation.
- It is useful after upgrading old configs, before important milestones, or when you suspect chain issues.
- Do not put long-running Full backups on high-frequency request paths.

## Design advice

- Return fast; run long tasks in background
- Validate command arguments before execution
- Add logs and status broadcasts for critical paths

## Linked guides

- Usage perspective: [KnotLink and Integration Mod](../../guides/minecraft/knotlink-mod)
- Runtime chain: [Hot Restore Mechanism](../../guides/minecraft/hot-restore)

## Related links

- [KnotLink Protocol and Integration](../knotlink)
- [Plugin API Reference](./plugin-api)
