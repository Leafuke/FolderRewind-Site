---
sidebar_position: 2
title: Backup Modes
description: Learn about the three backup modes in FolderRewind
---

# Backup Modes

FolderRewind provides multiple backup methods powered by the 7-Zip engine, designed for different scenarios.

## Quick recommendation

- Beginner default: **Full Backup** + enable "Skip when no changes"
- Frequent daily use: **Smart Incremental** (faster and smaller)
- Temporary rolling state: **Overwrite** (keep only the latest archive)

## Mode comparison

| Mode | Description | Advantage | Best for |
|------|-------------|-----------|----------|
| **Full** | Creates a complete new archive every time | Simple and stable restore | Beginners, milestones |
| **Smart Incremental** | Packs only changed files and builds an incremental chain | Faster, saves space | Large folders with frequent backups |
| **Overwrite** | Updates the latest archive instead of creating many history files | Minimal storage, simple workflow | Temporary sync or cache-like folders |

:::note Note
"Smart Incremental" in product wording corresponds to Incremental/Smart behavior in code.
:::

## How to configure

1. Open **Config Settings** for the target config.
2. Go to **Backup Policy**.
3. Select mode from **Backup Mode**:
	- Full backup (new file each run)
	- Smart incremental (changed files only)
	- Overwrite backup (update latest backup)
4. Save and run one manual backup for validation.

## Choosing tips

- **Minecraft saves:** Smart Incremental
- **Work docs/projects:** Smart Incremental or Full (based on disk and restore preference)
- **Important archives:** Full + encrypted config
- **Temporary/cache folders:** Overwrite

## Key settings strongly related to mode

In **Config Settings → Backup Policy**, also check:

- **Skip backup when no changes**
- **Keep latest backup count** (`0` means unlimited)
- **Smart chain length limit** (only for Smart Incremental)
- **Safe delete** (helps avoid broken restore chains during cleanup)

## Compression and performance

FolderRewind supports 7z/zip compression with tunable level, method, and threads:

- Higher compression level = smaller size but slower speed
- CPU threads: `0` means automatic
- File-type rules: use lower compression for already-compressed files like `*.zip`/`*.mp4`

## Starter presets

- General office files: Full + skip-no-change + keep 30
- Dev projects: Smart Incremental + chain limit 20 + keep 60
- Large game saves: Smart Incremental + skip-no-change + automation

## Related links

- [First Backup](../getting-started/first-backup)
- [Automation](./automation)
