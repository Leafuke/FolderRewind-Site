---
sidebar_position: 2
title: "Five-Minute Quick Start: Complete the First Server Backup"
description: Use MineBackup 1.16.2 CLI to go from a Manifest to Backup, History, Verify, and a Restore dry-run
---

# Five-Minute Quick Start: Complete the First Server Backup

This page has one goal: complete
**Profile → doctor → Backup → History → Verify → Restore dry-run** without starting the GUI. Configure Jobs, IPC, rclone, and KnotLink only after this basic loop works.

## Step 1: Install the CLI

Get the asset for your platform from [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases). Windows uses `MineBackup-CLI-<version>-windows-x64.zip`; Linux uses the portable `.tar.gz` or `minebackup-cli_<version>_amd64.deb`. macOS currently has CLI-only build validation but no formal CLI release asset.

Replace these values with your actual paths:

```bash
CLI=/opt/minebackup-cli/bin/minebackup-cli
PROFILE=/var/lib/minebackup/server
```

Windows PowerShell can use:

```powershell
$CLI = 'C:\Program Files\MineBackup CLI\minebackup-cli.exe'
$PROFILE = 'D:\MineBackup\server-profile'
```

## Step 2: Choose a Profile

`Profile ≠ Minecraft world directory`. A Profile is the root where MineBackup keeps its configuration, history, logs, and runtime state. A typical layout is:

```text
config/
data/
logs/
runtime/
tools/
```

`--data-dir` must point to the complete Profile root, not the `config/` subdirectory. It should not point directly to `saveRoot` or a Minecraft world.

## Step 3: Generate a Manifest

Have the CLI create the official template first, then edit the save root, backup root, and worlds:

```bash
minebackup-cli --json profile init --output server.json
```

You have two choices:

- **Option A: edit it manually**, preserving the template fields and UUIDs while changing the real paths and policy.
- **Option B: ask AI to fill it in**, using [Use AI to generate a configuration](/en/docs/guides/minebackup-v1/cli/ai-assisted-config); AI is optional and cannot replace CLI validation.

## Step 4: Validate and apply in order

Validate the Manifest itself:

```bash
minebackup-cli --json profile validate --file server.json
```

Compare it with the current Profile:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

Run a dry-run that does not write configuration:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json --dry-run
```

Apply only after the diff is what you expect:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json
```

Do not add `--prune --confirm-prune` to the initial setup; it explicitly removes undeclared Configs and Jobs.

## Step 5: Run doctor

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

`profile apply` succeeding does not prove that the worlds, permissions, or tools are usable. `doctor` checks the save path, writable backup root, 7-Zip capability, world occupancy, and cold-restore state.

## Step 6: Find the Config and World, then run the first Backup

Do not guess a Config ID or a displayed world name. Inspect the actual ID and canonical relative path:

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
```

Run one backup:

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path>
```

`<relative-world-path>` is the path relative to `saveRoot` in the Manifest, such as `world`. It is not a display name or an absolute path.

## Step 7: Confirm History

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

Confirm that local History was written and that the referenced archive exists.

## Step 8: Verify

```bash
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
```

`--latest` selects the newest record in local History whose archive actually exists. A successful Verify is an important condition for a completed first setup; do not skip it just because Backup returned success.

## Step 9: Restore dry-run

Plan the restore, validate metadata, and test the archives without writing to the world:

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

Do not perform a real restore or use `--confirm` in the first tutorial. `clean` removes target content outside the archive chain during a real restore, so read [Backup, History, Verify, and Restore](/en/docs/guides/minebackup-v1/cli/backup-restore) separately and confirm that the world is stopped before any real operation.

## Completion checklist

```text
✅ Profile applied
✅ doctor passed
✅ Backup succeeded
✅ History is visible
✅ Verify succeeded
✅ Restore dry-run succeeded
```

If any command returns an error, treat the CLI JSON, exit code, and `doctor` output as authoritative. Keep the raw output instead of guessing a path or deleting the Profile.
