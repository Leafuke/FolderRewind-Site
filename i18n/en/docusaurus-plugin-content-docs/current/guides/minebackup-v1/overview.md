---
sidebar_position: 1
title: MineBackup Overview
description: MineBackup's positioning, capability boundaries, and documentation navigation
---

# MineBackup Overview

MineBackup is the predecessor project to FolderRewind, also known as the first generation of the "archive time machine." It is still actively maintained and retains a wealth of mature capabilities for Minecraft scenarios.

If you are a server owner, modpack tester, or primarily use the archive time machine on Linux / macOS, MineBackup remains a solid choice.

This documentation section is organized based on the reference source code, with the goal of providing a complete, ready-to-use manual.

## Who Is This For

- Existing MineBackup users who want to formalize their workflows
- Players managing multiple launchers / instances who want config-isolated save management
- Server owners and modpack authors who need high-frequency backups and rollback capability
- Users planning a gradual migration to FolderRewind while keeping their current workflow stable

## Core Design Philosophy

MineBackup's design can be understood in three layers:

1. **Configuration Layer**: Defines paths, compression, backup strategies, and filter rules
2. **Execution Layer**: Manual backups, automated tasks, and special-mode batch processing
3. **Restore Layer**: History records, restore modes, and graceful failure handling

Reading the documentation with these three layers in mind will help you troubleshoot issues faster.

## What You Can Do with MineBackup

- Create multiple configs to manage different launchers / game directories independently
- Run Full, Smart Incremental, and Overwrite backup modes
- Restore individual files from history with different restore strategies
- Set up automated backup tasks and special-mode automation workflows
- Enable hot backup, snapshot paths, KnotLink integration, and service mode when needed

## Relationship with FolderRewind

- FolderRewind: The next-generation main program with a more complete plugin ecosystem
- MineBackup: The first-generation main program, still well-suited for existing workflows and Minecraft users

Think of them as "two coexisting systems":

- Want to keep things stable in production: stick with MineBackup
- Want to upgrade gradually: set up FolderRewind in a new directory, then migrate incrementally

If you are using the MineRewind / MineBackup-Mod integration chain, we recommend also reading:

- [Minecraft Topic Overview](../minecraft/overview)
- [MineBackup Mod Integration Details](../minecraft/minebackup-mod)

## Recommended Reading Order

1. [Installation and Setup](./installation)
2. [Creating Your First Config](./first-config)
3. [Your First Backup](./first-backup)
4. [Your First Restore](./first-restore)
5. [Troubleshooting](./troubleshooting)

## Advanced Topics

- [Backup Modes Explained](./backup-modes)
- [History and Restore Strategies](./history-and-restore)
- [Automation Tasks](./automation)
- [Special Mode](./special-mode)
- [Hot Backup and Snapshot Mechanism](./hot-backup)
- [Blacklist and Restore Whitelist](./filters)
- [KnotLink Integration](./knotlink-integration)
- [Service Mode (Windows)](./service-mode)

## Too Long? Start with the Shortest Path to Success

If you want a working end-to-end flow within 30 minutes, follow this order:

1. [Installation and Setup](./installation)
2. [Creating Your First Config](./first-config)
3. [Your First Backup](./first-backup)
4. [Your First Restore](./first-restore)
5. [Troubleshooting](./troubleshooting)

Once complete, you will have the minimum productive capability of "backing up, restoring, and troubleshooting." From there, exploring automation will be much smoother.
