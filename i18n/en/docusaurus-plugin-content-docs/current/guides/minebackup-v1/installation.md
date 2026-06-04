---
sidebar_position: 2
title: Installation and Setup
description: Installing, configuring dependencies, and first launch requirements for MineBackup
---

# Installation and Setup

The goal of this page is not just "open the program," but to ensure your very first backup succeeds -- avoiding common path and permission pitfalls.

## Core Dependency

MineBackup's compression workflow depends on 7-Zip. You can provide `7z.exe` in the following ways:

- On Windows, MineBackup bundles 7-Zip internally -- no separate installation needed
- Place it in the same directory as the program (it will be auto-detected)
- Manually specify the 7-Zip executable path in settings

Tip: Even if auto-detection succeeds, we recommend confirming the compression program path on the settings page once, in case it breaks after moving the directory later.

## Platform Notes

- Windows: Full feature set (including service mode)
- Linux / macOS: Core backup and restore are available, but Windows service capabilities do not apply

If you use MineBackup primarily across platforms, double-check path separators and directory permissions.

## What the First-Launch Wizard Does

The initial wizard accomplishes four things:

1. Choose language, font, and theme
2. Select the save root directory (supports Java / Bedrock auto-detection)
3. Select the backup directory
4. Confirm the compression program path

After the wizard finishes, we recommend immediately running an "empty-comment manual backup" test -- verify the pipeline first, then tweak advanced settings.

## Recommended Directory Layout

- `saveRoot`: Only the parent path containing the world directories you want to manage
- `backupPath`: A separate disk directory, not mixed with the save directory
- `snapshotPath`: Optional, used for hot backup temporary snapshots

### Layout Example

- `saveRoot`: `D:/Minecraft/.minecraft/saves`
- `backupPath`: `E:/MineBackup/archives`
- `snapshotPath`: `E:/MineBackup/snapshot-temp`

Principle: Keep the backup directory and save directory on different disks when possible, to reduce the impact of a single disk failure.

## Pre-First-Run Checklist

Before clicking backup for the first time, confirm these 6 items:

1. `saveRoot` exists and is accessible
2. `backupPath` directory is writable
3. At least 1 world has been detected
4. Compression program path is valid
5. No security software is blocking the compression process
6. A hot backup strategy is planned for when the game is running

## Minimal Post-Install Self-Check

1. Can open settings and see the current config
2. Path fields can be saved and persist after restart
3. Can successfully run a minimal backup

## Common Installation Issues

### 1) Wizard cannot auto-detect the save directory

- Manually select the parent directory first
- Then use "Scan Worlds" to confirm detection

### 2) Compression program looks selectable but backup reports an error

- Re-select the compression program path and save
- Avoid directories with restricted permissions in the path

### 3) Path looks correct on Linux / macOS but is not writable

- Use the terminal to verify directory write permissions first
- Try to use a backup path under your user directory

Next: Continue to [Creating Your First Config](./first-config).
