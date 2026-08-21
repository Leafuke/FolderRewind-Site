---
sidebar_position: 15
title: Profiles and Migration
description: MineBackup 1.16.2 profile layout, portable mode, and the 1.15-to-1.16 migration
---

# Profiles and Migration

MineBackup 1.16.2 manages application data through a profile. It no longer treats the current working directory or the directory beside the executable as a fixed data location. A profile stores settings, history, migration state, logs, and managed tools; archive files are still written to each configuration’s `backupPath`, so the two locations must not be conflated.

## Selecting a profile

### Explicit directory: `--data-dir`

Start MineBackup with an explicit profile root when you need a predictable location:

```text
MineBackup.exe --data-dir "D:\MineBackupProfiles\main"
```

`--data-dir` must be an absolute path. It has the highest priority and creates `config`, `data`, `state`, `cache`, `runtime`, `tools`, and `logs` below that root. An invalid, unwritable, or unsafe path is an error; MineBackup does not silently fall back to another profile.

The option selects the MineBackup application profile. It does not move the world, archive, or snapshot directories already stored in a configuration. Before moving any of those external directories, complete a backup-and-restore drill that you can verify.

### Portable mode

Windows and AppImage support a regular file named `portable.flag` beside the executable or AppImage. On the next launch, MineBackup uses the adjacent `MineBackupData` directory as the profile root:

```text
MineBackup.exe
portable.flag
MineBackupData/
  config/
  data/
  state/
  cache/
  runtime/
  tools/
  logs/
```

An explicit `--data-dir` overrides the marker. A macOS application never writes data inside its `.app` bundle and does not use `portable.flag` to place a profile inside the bundle.

## Default locations

Without `--data-dir` or a portable marker, 1.16.2 uses these platform locations:

| Platform | Profile layout |
| --- | --- |
| Windows | `%LOCALAPPDATA%\MineBackup\{config,data,state,cache,runtime,tools,logs}` |
| Linux | `XDG_CONFIG_HOME/MineBackup`, `XDG_DATA_HOME/MineBackup`, `XDG_STATE_HOME/MineBackup`, and `XDG_CACHE_HOME/MineBackup`; when unset, these fall back to `~/.config`, `~/.local/share`, `~/.local/state`, and `~/.cache`. Tools are under `data/tools`, and logs are under `state/logs`. |
| macOS | `~/Library/Application Support/MineBackup/{config,data,state,tools}`, `~/Library/Caches/MineBackup/{cache,runtime}`, and `~/Library/Logs/MineBackup` for logs. |

Linux uses `XDG_RUNTIME_DIR` only when it belongs to the current user and has safe permissions. Otherwise it creates a private runtime directory below the state root. To confirm the active paths, use the current profile’s **Log** panel and [Logging and diagnostics](/en/docs/guides/minebackup-v1/logging-and-diagnostics).

## The 1.16.2 storage model

| Content | Location | Meaning |
| --- | --- | --- |
| Current configuration | `<profile>/config/config.ini` | Configuration list, stable `ConfigId` values, UI settings, and Special Configs. It is not an EXE-side configuration. |
| History | `<profile>/data/history.json` | Configuration/world history, comments, states, and cloud-copy information. |
| Migration report | `<profile>/state/migration/1.15-to-1.16.json` | Migration units, statuses, messages, and recovery-snapshot paths. |
| Migration snapshots | `<profile>/data/migration-snapshots/1.15/<transaction-id>/` | Recovery material kept from the migration; source files remain in place. |
| World metadata | `<backupPath>/_metadata/<world>/state.json` | Current backup cursor, Full baseline, and file state. |
| Backup records | `<backupPath>/_metadata/<world>/records/*.json` | Archive types, chain relationships, and change records. |

Archive files themselves remain under the configured `backupPath`. The profile migration does not copy external world directories or archive directories.

## Startup migration from 1.15

The 1.16.2 startup sequence parses launch options and AppPaths, acquires the profile’s single-instance lock, discovers old locations and asks for confirmation, performs the 1.15-to-1.16 transaction, then loads 1.16 data and starts desktop, task, and network services. Declining an old-location prompt does not delete the old files or silently import another location.

The migration follows these boundaries:

- Configuration and Special Config entries receive stable `ConfigId` / `SpecialConfigId` values and are atomically persisted in the current profile.
- Legacy configuration, history, and world metadata are read and validated before being converted to the `config.ini`, `history.json`, `state.json`, and `records/*.json` model.
- Original files are not deleted, moved, renamed, or recompressed. Archive contents are not recompressed as part of migration.
- The migration report and recovery snapshots remain in the current profile. The settings page can show each unit’s status, message, snapshot location, and retry action for failed or degraded units.

## Statuses and write gates

The migration report can contain these statuses:

| Status | Meaning and handling |
| --- | --- |
| `NotNeeded` | No matching legacy data exists, or an existing 1.16 state is authoritative. |
| `Succeeded` | Read, conversion, atomic commit, and read-back validation completed. |
| `Pending` | A prerequisite configuration transaction has not completed; dependent history, world, or cloud writes wait. |
| `Degraded` | Recognized data was migrated, but some items, timestamps, archives, or chain links could not be reconstructed completely. |
| `Failed` | Reading, snapshot creation, writing, or validation failed; the source is not treated as migrated. |

If the configuration transaction fails, configuration persistence is blocked. Dependent history, world, and cloud units report `Pending` instead of writing while identity is unstable. A history migration failure likewise blocks history persistence until it is retried or repaired.

When world metadata is `Degraded` or `Failed`, MineBackup deliberately does not commit an incomplete `state.json`. The next backup for that world establishes a new safe Full chain. Do not manually splice old `records` together; verify that the archive directory is readable and that the archive files are present, then run a normal Full backup and inspect its history entry.

## A safe upgrade workflow

1. Stop other programs that write the world or archive directories, and copy the profile and important archive inventory if it must be retained.
2. Launch 1.16.2 and review the old-location prompt and the target profile path.
3. Wait for the migration summary. If it reports `Pending`, `Degraded`, or `Failed`, open [Logging and diagnostics](/en/docs/guides/minebackup-v1/logging-and-diagnostics) and the migration report; do not delete the old files.
4. Run a Full backup for one test world, then perform a Clean or Custom restore drill.
5. Confirm that `history.json` and the world bindings are correct before enabling Smart, automation, or cloud archives.

Importing `portable-config.json` from the cloud restores only its portable whitelist. New configurations remain pending until you bind local `saveRoot`, world entries, `backupPath`, and optional `snapshotPath` again. See [Cloud archive](/en/docs/guides/minebackup-v1/cloud-archive).

## Migrate an existing GUI configuration to the headless CLI

Do not copy desktop paths directly to a server. Export through the CLI, change the server paths, and apply it again:

```text
GUI Profile
  ↓
profile export
  ↓
Change server saveRoot / backupRoot / world paths
  ↓
validate
  ↓
diff
  ↓
profile apply --dry-run
  ↓
profile apply
  ↓
doctor
```

Example:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile export --output server.json
```

After export, translate GUI `backupPath` and related desktop fields into the CLI Manifest’s `backupRoot` and `worlds[].path`, while preserving existing UUIDs and fields that do not need to change. Do not put passwords, tokens, rclone secrets, or cloud credentials in the file. Close the GUI during migration, then use `config list`, `world list`, and `doctor` to confirm what the server accepts.

## Do not use the old reset rule

Deleting an EXE-side `config.ini` or one legacy history file does not fully reset a 1.16.2 profile and can disconnect external archives from their history. If you need a clean start, first confirm the active profile root in settings and logs, export or copy anything that must be retained, and only then handle the profile while MineBackup is closed. Do not delete an active profile directory while the application is running.

Related pages: [Installation](/en/docs/guides/minebackup-v1/installation), [First configuration](/en/docs/guides/minebackup-v1/first-config), [CLI Profiles and Manifest](/en/docs/guides/minebackup-v1/cli/profile-manifest), [Cloud archive](/en/docs/guides/minebackup-v1/cloud-archive), and [Legacy Windows Service Cleanup](/en/docs/guides/minebackup-v1/service-mode).
