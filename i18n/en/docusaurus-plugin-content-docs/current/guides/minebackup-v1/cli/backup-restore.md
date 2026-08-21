---
sidebar_position: 5
title: Backup, History, Verify, and Restore
description: Use MineBackup 1.16.2 CLI for Backup, History, Verify, Restore dry-runs, and cold restores
---

# Backup, History, Verify, and Restore

After the Profile has passed `profile apply` and `doctor`, use this task flow to complete the first verifiable loop:

```text
Find Config
  ↓
Find World
  ↓
Run Backup
  ↓
Inspect History
  ↓
Verify
  ↓
Restore dry-run
  ↓
(after separate approval) real Restore
```

## 1. Find the Config

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
```

Record the `configId` you will use. Do not guess it from the Manifest name, array order, or a screenshot; use the canonical UUID returned by the CLI.

## 2. Find the World

```bash
minebackup-cli --data-dir "$PROFILE" --json world list \
  --config <ConfigId>
```

Record the relative path returned by the CLI. `--world` accepts the canonical relative path from the Config, such as `world` or `world_nether`; it does not accept a display name, numeric index, or absolute path.

## 3. Run Backup

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path> \
  --comment "before upgrade"
```

Direct `backup` and a Job Backup Step share change detection, SkipIfUnchanged, Smart chains, retention, metadata, HistoryRepository, and optional cloud post-processing. `--no-network` disables KnotLink and cloud post-processing; judge the local result from the CLI response.

## 4. Inspect History

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

History records the archive chain, metadata, and local-file relationships. History is not the archive itself; disaster recovery must preserve metadata with the archives instead of copying one `.7z` file alone.

## 5. Verify the latest archive

```bash
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
```

`--latest` selects only the newest local History record whose archive actually exists. Verify checks the archive chain and package contents. A successful Verify is stronger evidence of recoverability than a Backup command that merely returned exit code 0.

Make `verify --latest` and the Restore dry-run below part of a regular recovery drill rather than waiting until an incident.

## 6. Restore dry-run

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

The dry-run plans the complete restore chain, validates metadata, and tests each 7-Zip archive without changing the world. Start here during initial setup; do not use `--confirm` yet.

### `clean` and `overwrite`

- **`clean`** switches the target world to a same-filesystem snapshot, restores the archive chain, and applies the preserve rules. It is the better default when the goal is to make the target match the archive, but it handles content outside the chain.
- **`overwrite`** overlays the archive chain without deleting existing files that are absent from the archive and does not promise a complete rollback. Use it only when retaining extra target files is intentional.

Neither mode bypasses world-occupancy protection. A normal CLI restore is a cold restore: stop the Minecraft server and any process holding the world, then run `doctor` and confirm `coldRestoreReady=true`.

## 7. Real Restore: a separate high-risk operation

:::warning A real restore writes to the world

A real restore requires explicit approval and is outside the first CLI tutorial. Complete Verify, the Restore dry-run, server shutdown, and the `doctor` checks first. Confirm the archive, mode, target path, and `backupBefore` behavior. Use `--confirm` only when the CLI explicitly requires it.

:::

After the cold-restore conditions are confirmed, the command shape is:

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --confirm
```

When `restore.backupBefore` is enabled, the actual restore performs a safety backup first. Do not put `--confirm` into the initial setup script, and do not use it to bypass `coldRestoreReady=false`.

## `coldRestoreReady` and `serve`

`doctor` reports whether the world exists, whether it is occupied, and whether the environment is ready for a cold restore. `coldRestoreReady=true` means the ordinary CLI cold-restore gate is satisfied; it does not mean that the selected History record is the right one.

With a long-running `serve` runtime and KnotLink, CLI/GUI can also use the coordinated hot-restore path. That is a separate workflow requiring the server, companion mod, and runtime integration. Complete the local History, Verify, and cold-restore drill here first, then read [Serve runtime](/en/docs/guides/minebackup-v1/cli/serve) and the KnotLink documentation.

## What to preserve when something fails

Keep these artifacts instead of deleting the Profile, History, or archives:

- the raw JSON envelope and process exit code;
- `doctor` output, especially `coldRestoreReady`, 7-Zip, and path diagnostics;
- archive paths and chain information from `history list`;
- the corresponding time range in the Profile `logs/` directory.

Then use [CLI troubleshooting](/en/docs/guides/minebackup-v1/cli/troubleshooting) to work from scheduler → CLI → Job → Config → World → archive.
