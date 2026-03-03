---
sidebar_position: 2
title: MineBackup Integration Mod Deep Dive
description: Understand how MineBackup works with FolderRewind/MineRewind from prerequisites to full command reference
---

# MineBackup Integration Mod Deep Dive

MineBackup is the Minecraft-side integration mod that connects in-game runtime actions (save, exit, rejoin) with FolderRewind / MineRewind backup and restore flows.

You can treat it as an in-process coordination layer:

- MineRewind handles FolderRewind plugin-side orchestration (discovery, backup/restore coordination)
- MineBackup handles Minecraft runtime cooperation (save-before-hot-backup, exit-before-hot-restore, rejoin-after-restore)
- KnotLink transports commands and events between both sides

---

## 1) Scenarios and capability boundaries

Recommended for:

- Long-term singleplayer survival users (corruption, misoperations, rollback continuity)
- Small server owners or modpack testers (frequent rollback workflows)
- Users who want standardized backup pipelines instead of manual file copy

MineBackup delivers value in two key areas:

1. **Hot backup coordination**: before host backup starts, it triggers in-game full save to reduce runtime inconsistency.
2. **Hot restore coordination**: before restore starts, it saves and exits the current world, then auto-rejoins after restore and reports result.

Operational boundary to keep in mind:

- This is not a guarantee layer. Timeouts, insufficient permissions, or backend communication failures can interrupt the chain.
- Always run at least one full hot-restore drill in a test world first.

---

## 2) Installation and prerequisites

### Environment prerequisites

Based on current integration setup, prepare:

- [KnotLink server](https://github.com/hxh230802/KnotLink/releases)
- FolderRewind host + MineRewind plugin
- MineBackup main program

> The last two are alternatives. You only need one of them according to your deployment path.

### Suggested setup order

1. Install and verify FolderRewind runs normally.
2. Install MineRewind plugin in FolderRewind.
3. Install MineBackup mod in Minecraft.
4. Run the shortest-path validation first (see Scenario 1 below).

### Permission model

- **Singleplayer**: `/mb` commands are directly usable.
- **Dedicated server**: operator-level permission is usually required (moderator-level command check).

---

## 3) Integration flow (critical runtime chain)

### Hot backup chain

When host triggers hot backup, MineBackup:

1. Receives `pre_hot_backup`
2. Performs full world save
3. Freezes auto-save (to avoid write interference during backup window)
4. Sends `WORLD_SAVED`
5. Host executes backup
6. Unfreezes auto-save after backup completes

Safety fallback:

- Auto-save freeze has timeout protection (about 3 minutes), then it auto-recovers with warning broadcast.

### Hot restore chain

When host triggers hot restore, MineBackup:

1. Handles `pre_hot_restore`
2. Saves and exits current world/session
3. Sends `WORLD_SAVE_AND_EXIT_COMPLETE`
4. Waits for restore completion (`restore_finished`/`restore_success`)
5. Handles `rejoin_world` and starts auto-rejoin
6. Sends `REJOIN_RESULT success|failure ...`

Handshake stage:

- On receiving `handshake`, mod replies `HANDSHAKE_RESPONSE <mod_version>` and performs minimum-version compatibility checks.

---

## 4) Full command reference (`/mb`)

| Category | Command | Description |
|---|---|---|
| Local save | `/mb save` | Immediately saves all loaded dimensions on current server |
| Config query | `/mb list_configs` | Queries available configurations from backend |
| World query | `/mb list_worlds <config_id>` | Lists worlds under a config |
| Backup query | `/mb list_backups <config_id> <world_index>` | Lists backups for a specific world |
| Remote backup | `/mb backup <config_id> <world_index> [comment]` | Triggers backup for a target world with optional comment |
| Remote restore | `/mb restore <config_id> <world_index> <backup_file>` | Restores target world from a specific backup file |
| Quick backup | `/mb quicksave [comment]` | Runs local save first, then triggers backup for current world |
| Quick restore | `/mb quickrestore [backup_file]` | No arg restores latest; with arg restores specified backup |
| Auto backup | `/mb auto <config_id> <world_index> <internal_time>` | Starts auto backup and persists local auto-backup config |
| Stop auto backup | `/mb stop <config_id> <world_index>` | Stops auto backup for target world and clears local config |
| WE snapshot bridge | `/mb snap <config_id> <world_index> <backup_file>` | Triggers WorldEdit snapshot-related backend command |
| Manual freeze | `/mb freeze` | Saves and freezes auto-save for external-tool window operations |
| Manual unfreeze | `/mb unfreeze` | Resumes auto-save |

---

## 5) Two practical scenarios

### Scenario 1: Validate the shortest working chain

Goal: verify MineBackup ↔ backend communication works.

Steps:

1. In target world, run:

```text
/mb quicksave baseline_before_test
```

2. After command/backup response appears, run:

```text
/mb quickrestore
```

3. Confirm these milestones appear:

- Restore preparation notification
- World exit and restore waiting
- Auto-rejoin success
- Backend receives `REJOIN_RESULT success`

Success criteria:

- Full `backup -> restore -> rejoin` loop completes and world remains playable.

### Scenario 2: Precise rollback to a specific backup

Goal: roll back to a known good point after corruption/misoperation.

Steps:

1. List available backups:

```text
/mb list_backups <config_id> <world_index>
```

2. Restore to selected backup file:

```text
/mb quickrestore <backup_file>
```

3. If you operate in multi-world / config-scoped workflow, you can also run:

```text
/mb restore <config_id> <world_index> <backup_file>
```

Success criteria:

- Player state reaches expected time point and key world states match target backup.

---

## 6) Common issues and boundaries

### Command sent but no result

Possible causes:

- Backend is not running
- KnotLink channel is not established
- Port/local communication is blocked

Recommendation:

- Start troubleshooting with read-only query commands like `/mb list_configs`.

### Hot restore fails or no auto-rejoin

Common causes:

- Invalid world identifier (missing world / illegal path)
- Rejoin timeout
- Retry budget exhausted

Recommendation:

- Reproduce with `quickrestore` in a test world first.
- If failed, manually enter world from world selection to verify world integrity.

### Commands unavailable on dedicated server

Common cause:

- Insufficient executor permission.

Recommendation:

- Grant adequate operator/management permission and retry.

### Worried about forgetting to unfreeze auto-save

Notes:

- Mod has freeze-timeout fallback and auto-recovers with warning.
- Still recommended to run `/mb unfreeze` proactively after operations.

---

## 7) Suggested reading path with MineRewind docs

1. Start with [Minecraft Guide Overview](./overview)
2. Read this page for MineBackup runtime capabilities
3. Continue with [KnotLink and Integration Mod](./knotlink-mod) for protocol-level details
4. Then deep-dive into [Hot Backup Mechanism](./hot-backup) and [Hot Restore Mechanism](./hot-restore)

If you are implementing integration/protocol side, continue with [KnotLink Protocol and Integration](../../plugins/knotlink).
