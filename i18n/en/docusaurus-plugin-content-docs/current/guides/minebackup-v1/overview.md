---
sidebar_position: 1
title: MineBackup 1.16.2 Overview
description: The positioning, platform scope, capability boundaries, and documentation map for MineBackup 1.16.2
---

# MineBackup 1.16.2 Overview

MineBackup is the predecessor of FolderRewind and the first generation of the “save time machine”. This section follows the current MineBackup **1.16.2** source, CLI behavior, and accompanying documentation for users who still run MineBackup.

MineBackup remains a good fit for existing Minecraft backup workflows, cross-platform users, and workflows that depend on MineBackup-Mod or KnotLink integration. Starting with 1.16.2 it also provides a formal headless CLI path for servers, VPS hosts, NAS systems, and SSH-only environments. New projects can evaluate FolderRewind, but the two applications should not be treated as sharing the same configuration files, plugin model, or service behavior.

:::caution Version boundary
This section describes MineBackup 1.16.2. Windows Service Mode is deprecated in 1.16: the application can inspect and safely remove an older service, but it cannot install or start one. For server deployment, start with the CLI learning path.
:::

## How do you want to use MineBackup?

| Scenario | Recommended path |
| --- | --- |
| Desktop computer with a window and Settings | [GUI setup: Installation](/en/docs/guides/minebackup-v1/installation) → [Create your first configuration](/en/docs/guides/minebackup-v1/first-config) |
| Minecraft Dedicated Server, VPS, NAS, or SSH-only Linux | [CLI and server overview](/en/docs/guides/minebackup-v1/cli/overview) → [Five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start) |

Ordinary Windows, Linux, and macOS desktop users do not need to switch to the CLI. It is the headless/server execution path.

## How GUI and CLI fit together

The GUI and `minebackup-cli` share the core runtime, Profiles, History, Backup, and Restore data contracts; they are not incompatible products. The CLI is an official headless/server mode starting with 1.16.2, and a Profile still follows the single-instance ownership rule.

CLI does not mean `serve`. `minebackup-cli backup` can perform a one-shot backup by itself. `serve` is an optional long-running Profile runtime for persistent servers, KnotLink, or frequent calls.

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
2. **Execution**: manual backups, desktop automation, CLI Jobs, cloud synchronization, and hot backup.
3. **Recovery**: history, backup chains, restore methods, coordinated exit/rejoin, and migration or failure safety gates.

## Relationship to FolderRewind

- **FolderRewind** is the later product with a modern Windows interface and plugin ecosystem.
- **MineBackup** is an independent first-generation application with its own configuration, task, integration, and cross-platform implementation.
- They can coexist, but FolderRewind plugin settings and current-world behavior must not be copied into MineBackup instructions.

If you plan to migrate, preserve the MineBackup configuration and archives first. Build an independent backup-and-restore drill in the new profile or application before switching a production workflow.

## Recommended reading order

### Desktop

1. [Platform support and installation boundaries](/en/docs/guides/minebackup-v1/platform-support)
2. [Installation and setup](/en/docs/guides/minebackup-v1/installation)
3. [Creating your first configuration](/en/docs/guides/minebackup-v1/first-config)
4. [Your first backup](/en/docs/guides/minebackup-v1/first-backup)
5. [Your first restore](/en/docs/guides/minebackup-v1/first-restore)

### CLI

1. [CLI and server overview](/en/docs/guides/minebackup-v1/cli/overview)
2. [Five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start)
3. [Profiles and Manifests](/en/docs/guides/minebackup-v1/cli/profile-manifest)
4. [Backup, History, Verify, and Restore](/en/docs/guides/minebackup-v1/cli/backup-restore)
5. [CLI troubleshooting](/en/docs/guides/minebackup-v1/cli/troubleshooting)

Both routes can finish with [Troubleshooting](/en/docs/guides/minebackup-v1/troubleshooting); server users should also continue to the CLI Job, Serve, and platform deployment pages.

## Advanced topics

- [Backup modes, chain integrity, and safe deletion](/en/docs/guides/minebackup-v1/backup-modes)
- [History and restore strategy](/en/docs/guides/minebackup-v1/history-and-restore)
- [Filters](/en/docs/guides/minebackup-v1/filters)
- [Automation tasks](/en/docs/guides/minebackup-v1/automation)
- [Special Config](/en/docs/guides/minebackup-v1/special-mode)
- [Hot backup and snapshots](/en/docs/guides/minebackup-v1/hot-backup)
- [KnotLink v2 integration](/en/docs/guides/minebackup-v1/knotlink-integration)
- [Cloud archive](/en/docs/guides/minebackup-v1/cloud-archive)
- [Profiles, portable mode, and 1.15 migration](/en/docs/guides/minebackup-v1/data-and-migration)
- [Logging and diagnostics](/en/docs/guides/minebackup-v1/logging-and-diagnostics)
- [Legacy Windows service cleanup](/en/docs/guides/minebackup-v1/service-mode)

## Shortest path to a verified workflow

If you only want a working, testable loop first:

1. Install the application and confirm that the compression tool is available.
2. Create a normal configuration containing one world.
3. Complete one manual Full backup.
4. Restore it once from history in a test world.
5. Server users should instead complete `Backup → History → Verify → Restore dry-run` through the CLI before enabling Jobs, Serve, or system scheduling.

This separation keeps a basic backup failure distinct from an integration, cloud, or migration failure.
