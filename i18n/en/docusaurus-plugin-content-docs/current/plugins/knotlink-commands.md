---
sidebar_position: 4
title: "KnotLink command reference"
description: "Look up KnotLink commands, parameters and signals, using the runtime capability manifest to verify backup, restore and protection requests."
reviewed_baseline: "1.9-api3.9"
---

# KnotLink command reference

Look up KnotLink commands, parameters and signals, using the runtime capability manifest to verify backup, restore and protection requests.

Baseline: API 3.9 KnotLinkCoreCommands/current funcList. Query GET_CAPABILITIES at runtime; manifestVersion=3.0.0, specVersion=1.0, wire protocol v2.

## Queries and shared targets

| Command | Target/result |
|---|---|
| PING | message |
| GET_CAPABILITIES | content_type, encoding, manifest_version, func_list |
| LIST_CONFIGS, GET_STATUS | data |
| LIST_FOLDERS, GET_CONFIG | config_id, returns data |
| LIST_BACKUPS | config_id, folder, returns data |

config_id accepts stable ID/name/zero-based index. folder accepts stable ID/name/path/zero-based index. Prefer stable IDs in long-lived scripts. BACKUP, BACKUP_ALL, RESTORE, AUTO_BACKUP, STOP_AUTO_BACKUP, MARK_IMPORTANT and GET_IMPORTANCE require from/request_id.

## Backup options

BACKUP selects one folder; BACKUP_ALL selects a config and rejects folder; AUTO_BACKUP binds a folder and interval_minutes≥1 (descriptor default10). All three share:

| Field | Meaning |
|---|---|
| comment | Per-operation comment |
| backup_mode | full/smart; omission inherits local mode |
| compression_method | LZMA2/Deflate/BZip2/zstd |
| compression_level | Valid integer; omission inherits |
| backup_blacklist | Append/deduplicate local rules; empty does not clear |
| backup_whitelist | Append/deduplicate; nonempty selects whitelist mode |
| backup_scope | Per-operation override; full/all/default/none disables local plugin scope |
| scope_dimensions | overworld/nether/end and supported aliases |
| scope_areas | Block-coordinate rectangles x1,z1,x2,z2, one per line; selected-regions required |

Overrides do not persist and cannot expand source boundaries. STOP_AUTO_BACKUP stops the folder's remote periodic job.

```text
cmd=BACKUP;config_id=demo;folder=World;backup_mode=smart;from=panel;request_id=backup-001
```

## RESTORE

| Field | Meaning |
|---|---|
| file | Optional; omission resolves the active branch, or the latest recoverable legacy backup when no branch is active |
| mode | clean/overwrite; default clean |
| restore_whitelist | Append local rules; Clean retains current matches unless archive supplies the same path |
| restore_preserve_paths | One-shot relative files/directories; comma-separated, trailing / for directories; current content/deletions win within the source boundary |
| preserve_player_data | Minecraft null/true/false: omit to inherit; explicit value overrides this operation |

Partial captures always Overwrite, including Exact representations. Quick Restore blocks divergence/unavailable targets/precondition failures. An already-exact target produces NoChanges, not an older archive selection.

```text
cmd=RESTORE;config_id=demo;folder=World;from=panel;request_id=restore-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=restore-002
cmd=RESTORE;config_id=demo;folder=World;restore_preserve_paths=data/local.dat,datapacks/;from=panel;request_id=restore-003
```

Preservation covers selected NBT fields for all UUIDs, retaining complete current NBT for players absent from the backup. Stats/advancements still restore. Cross-26.1-layout preservation is rejected. Checkout/Merge do not preserve player state.

## Importance and current-world selectors

MARK_IMPORTANT requires file; important defaults true. MineRewind extends current_save=true to BACKUP, LIST_BACKUPS, RESTORE, AUTO_BACKUP, STOP_AUTO_BACKUP, MARK_IMPORTANT and GET_IMPORTANCE. Discovery names differ but wire commands stay the same; use runtime target information.

## Responses and signals

Responses include status=ok/error; conversations echo from/request_id. Dynamic values are percent-encoded. Long-task ok means accepted; correlate lifecycle signals to determine completion. Failed rejoin does not necessarily mean restore failed; never blindly repeat Restore.

<span id="backup" />
<span id="backup-and-restore" />
<span id="backup_all" />
<span id="command-lifecycle" />
<span id="common-format" />
<span id="configuration-and-history-queries" />
<span id="connection-and-discovery" />
<span id="mark_important" />
<span id="periodic-backup-control" />
<span id="related-links" />
<span id="response-status" />
<span id="restore" />
<span id="signals" />

## Create protected backups and query importance

`BACKUP` accepts `protect=true` to atomically protect a complete, unfiltered single-source version. Unchanged data reuses and protects its existing version. Partial or filtered captures are rejected. `BACKUP_ALL` and `AUTO_BACKUP` do not accept this option.

`GET_IMPORTANCE` requires `file` and returns `file` and `important`. It reports protection, not restore readiness. `MARK_IMPORTANT` defaults `important` to true and returns the operation message and final flag. Both support the current MineRewind `current_save` resolver.

```text
cmd=BACKUP;config_id=demo;folder=World;protect=true;from=panel;request_id=protected-001
cmd=GET_IMPORTANCE;config_id=demo;folder=World;file=example.7z;from=panel;request_id=importance-001
```
