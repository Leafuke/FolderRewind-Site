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
