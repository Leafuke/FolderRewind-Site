---
sidebar_position: 1
title: MineBackup 1.16.1 Overview
description: The positioning, platform scope, capability boundaries, and documentation map for MineBackup 1.16.1
---

# MineBackup 1.16.1 Overview

MineBackup is the predecessor of FolderRewind and the first generation of the “save time machine”. This section follows the current MineBackup **1.16.1** source and accompanying engineering documentation for users who still run MineBackup.

MineBackup remains a good fit for existing Minecraft backup workflows, cross-platform users, and workflows that depend on MineBackup-Mod or KnotLink integration. New projects can evaluate FolderRewind, but the two applications should not be treated as sharing the same configuration files, plugin model, or service behavior.

:::caution Version boundary
This section describes MineBackup 1.16.1. Windows Service Mode is deprecated in 1.16: the application can inspect and safely remove an older service, but it cannot install or start one. Configuration and history are no longer fixed beside the executable.
:::

## What MineBackup can do

- Manage Minecraft worlds or arbitrary folders with separate backup configurations.
- Use Full, Smart, and Overwrite configuration-level backup modes.
- Restore through history, Smart-chain metadata, and Clean / Overwrite / Reverse / Custom restore methods.
- Run interval, scheduled, startup-triggered, unified-task, and Special Config automation.
- Attempt hot backup and hot restore while a game is running through KnotLink v2.
- Synchronize history, archives, and required metadata with rclone.
- Reuse the core backup and history data contracts on Windows, Linux x86_64, and macOS arm64.

## Three layers to understand first

MineBackup is easiest to use when separated into three layers:

1. **Profile and backup configuration**: the locations for configuration, history, cache, tools, and logs, plus `saveRoot`, `backupPath`, compression, retention, and filters.
2. **Execution**: manual backups, automatic tasks, Special Config, cloud synchronization, and hot backup.
3. **Recovery**: history, backup chains, restore methods, coordinated exit/rejoin, and migration or failure safety gates.

## Relationship to FolderRewind

- **FolderRewind** is the later product with a modern Windows interface and plugin ecosystem.
- **MineBackup** is an independent first-generation application with its own configuration, task, integration, and cross-platform implementation.
- They can coexist, but FolderRewind plugin settings and current-world behavior must not be copied into MineBackup instructions.

If you plan to migrate, preserve the MineBackup configuration and archives first. Build an independent backup-and-restore drill in the new profile or application before switching a production workflow.

## Recommended reading order

1. [Platform support and installation boundaries](./platform-support)
2. [Installation and setup](./installation)
3. [Creating your first configuration](./first-config)
4. [Your first backup](./first-backup)
5. [Your first restore](./first-restore)
6. [Troubleshooting](./troubleshooting)

## Advanced topics

- [Backup modes, chain integrity, and safe deletion](./backup-modes)
- [History and restore strategy](./history-and-restore)
- [Filters](./filters)
- [Automation tasks](./automation)
- [Special Config](./special-mode)
- [Hot backup and snapshots](./hot-backup)
- [KnotLink v2 integration](./knotlink-integration)
- [Cloud archive](./cloud-archive)
- [Profiles, portable mode, and 1.15 migration](./data-and-migration)
- [Logging and diagnostics](./logging-and-diagnostics)
- [Legacy Windows service cleanup](./service-mode)

## Shortest path to a verified workflow

If you only want a working, testable loop first:

1. Install the application and confirm that the compression tool is available.
2. Create a normal configuration containing one world.
3. Complete one manual Full backup.
4. Restore it once from history in a test world.
5. Enable Smart, automation, cloud archive, or KnotLink hot workflows only as needed.

This separation keeps a basic backup failure distinct from an integration, cloud, or migration failure.
