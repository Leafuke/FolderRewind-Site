---
sidebar_position: 4
title: KnotLink Command Reference
description: Built-in commands, fields, responses, and signals in FolderRewind 1.8 parameterized protocol v2
---

# KnotLink Command Reference

This page uses FolderRewind 1.8's `funcList.json` as the fact source for built-in commands. Call `GET_CAPABILITIES` at runtime first because plugins can contribute command parameters and signals.

## Common format

```text
key=value;key2=value2
```

- Every request needs `cmd`.
- State-changing commands need `from` and a unique `request_id`.
- `folder` can be a display name or an index within the configuration.
- A response contains at least `status=ok` or `status=error`. Conversation commands also echo `from` and `request_id`.
- Dynamic values must be percent-encoded. For lists, encode each item and join them with commas.

```text
# Comment "pre-release; manual check"
comment=pre-release%3B%20manual%20check

# Two whitelist rules: world data, config=prod
backup_whitelist=world%20data,config%3Dprod
```

## Connection and discovery

| Command | Request fields | Success fields | Purpose |
|---------|----------------|----------------|---------|
| `PING` | `cmd` | `status`, `message` | Check whether the FolderRewind KnotLink endpoint is available |
| `GET_STATUS` | `cmd` | `status`, `data` | Query enabled, initialized, active periodic-backup, and active-task state |
| `GET_CAPABILITIES` | `cmd` | `status`, `content_type`, `encoding`, `manifest_version`, `func_list` | Get the percent-encoded runtime JSON capability manifest |

Example:

```text
> cmd=PING
< status=ok;message=PONG

> cmd=GET_CAPABILITIES
< status=ok;content_type=application%2Fjson;encoding=percent;manifest_version=2.0.0;func_list=%7B...%7D
```

Decode `func_list` and generate requests from the manifest. Do not treat this page as a permanently hardcoded list of plugin capabilities.

## Configuration and history queries

| Command | Request fields | Success fields | Purpose |
|---------|----------------|----------------|---------|
| `LIST_CONFIGS` | `cmd` | `status`, `data` | List backup configurations |
| `LIST_FOLDERS` | `cmd`, `config_id` | `status`, `data` | List managed folders in a configuration |
| `LIST_BACKUPS` | `cmd`, `config_id`, `folder` | `status`, `data` | List archives for a managed folder |
| `GET_CONFIG` | `cmd`, `config_id` | `status`, `data` | Get a summary including name, backup mode, format, and keep count |

Query example:

```text
cmd=LIST_BACKUPS;config_id=demo;folder=0
```

`data` is one percent-encoded field. Parse the v2 payload first, then decode its content.

## `BACKUP`

Queue a backup for one managed folder.

| Field | Required | Meaning |
|-------|----------|---------|
| `config_id` | Yes | Configuration ID |
| `folder` | Yes | Folder name or index |
| `from` | Yes | Caller identifier |
| `request_id` | Yes | Unique correlation ID for this request |
| `comment` | No | One-shot backup comment |
| `backup_mode` | No | One-shot override: `full` or `incremental` |
| `compression_method` | No | `LZMA2`, `Deflate`, `BZip2`, or `zstd` |
| `compression_level` | No | One-shot compression level |
| `backup_blacklist` | No | Comma-delimited one-shot blacklist |
| `backup_whitelist` | No | Comma-delimited one-shot whitelist |
| `backup_scope` | No | Backup-scope ID supplied by a plugin |
| `scope_areas` | No | Example scope parameter; use the runtime manifest for actual fields |
| `scope_dimensions` | No | Example dimension parameter; use the runtime manifest for actual fields |

Overrides apply only to this invocation and are not written back to persistent configuration. The Host validates filters, backup scope, and compression settings before queuing.

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;backup_mode=full;from=panel;request_id=backup-001
```

## `BACKUP_ALL`

Queue every folder in a configuration:

| Field | Required | Meaning |
|-------|----------|---------|
| `config_id`, `from`, `request_id` | Yes | Configuration and conversation metadata |
| `comment` | No | One-shot comment |
| `backup_blacklist`, `backup_whitelist` | No | One-shot filter overrides |
| `backup_scope` | No | Plugin scope ID |

`BACKUP_ALL` does not accept `folder`. Scope parameters must be valid for the configuration's targets or the entire request is rejected.

## `RESTORE`

| Field | Required | Meaning |
|-------|----------|---------|
| `config_id` | Yes | Configuration ID |
| `folder` | Yes | Folder name or index |
| `file` | Yes | Backup archive filename |
| `from` | Yes | Caller identifier |
| `request_id` | Yes | Unique correlation ID |
| `mode` | No | `overwrite` or `clean` |
| `restore_whitelist` | No | Comma-delimited one-shot restore whitelist |

```text
cmd=RESTORE;config_id=demo;folder=World;file=backup%202026-07-30.7z;mode=overwrite;from=panel;request_id=restore-001
```

:::danger Partial-backup rule
For a selected-region or other partial backup, the Host forces `overwrite`. Even if `mode=clean` is supplied, it will not erase files absent from the backup.
:::

## Periodic backup control

| Command | Required fields | Other fields | Purpose |
|---------|-----------------|--------------|---------|
| `AUTO_BACKUP` | `config_id`, `folder`, `interval_minutes`, `from`, `request_id` | — | Start periodic backup for one folder |
| `STOP_AUTO_BACKUP` | `config_id`, `folder`, `from`, `request_id` | — | Stop periodic backup for that folder |

`interval_minutes` must be a valid minute interval. Query status or track task state on the caller before starting it again.

## `MARK_IMPORTANT`

Set or clear the important flag on one archive:

```text
cmd=MARK_IMPORTANT;config_id=demo;folder=0;file=backup.7z;important=true;from=panel;request_id=mark-001
```

`important` accepts `true` or `false`. Supply `config_id`, `folder`, and `file` together to identify the record.

## Response status

| Status | Meaning |
|--------|---------|
| `status=ok` | A query completed, or a long task passed initial validation and was accepted |
| `status=error` | Parsing, field, state, or execution validation failed; read `message` |

For long work, `status=ok` normally means "accepted", not "backup or restore completed." Follow lifecycle and domain signals for the final result.

## Signals

### Command lifecycle

- `command_accepted`
- `command_started`
- `command_progress`
- `command_completed`
- `command_failed`
- `command_error`

These events carry `command` and `request_id`. Progress or error events can add stage, percentage, and reason fields.

### Backup and restore

- One-folder backup: `backup_started`, `backup_success`, `backup_warning`, `backup_failed`
- Whole configuration: `backup_all_started`, `backup_all_completed`, `backup_all_failed`
- Restore: `restore_started`, `restore_success`, `restore_failed`, `restore_finished`
- Periodic backup: `auto_backup_started`, `auto_backup_executed`, `auto_backup_stopped`, `auto_backup_error`

Additional query/state signals include `app_startup`, `status`, `list_configs`, `list_folders`, `list_backups`, `get_config`, and `mark_important`. Plugins can add more through the runtime manifest.

## Related links

- [KnotLink Protocol and Integration](/en/docs/plugins/knotlink)
- [KnotLink Command API](/en/docs/plugins/developing/knotlink-api)
- [Backup Modes and One-Shot Parameters](/en/docs/guides/backup-modes)
