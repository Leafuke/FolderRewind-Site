---
sidebar_position: 15
title: FAQ (MineBackup Legacy)
description: Frequently asked questions about MineBackup
---

# FAQ (MineBackup Legacy)

## Is MineBackup still maintained?

Yes. This site retains its documentation as a legacy product.

## Should I use MineBackup or FolderRewind?

- New users are recommended to use FolderRewind first
- If you already have a stable workflow with MineBackup and rely on existing integration links, you can continue using MineBackup
- Linux/macOS users can only use MineBackup; FolderRewind currently supports Windows only

If you plan to migrate, keep the legacy configuration and run a trial verification in a new directory. Do not perform a full replacement directly.

## Can I use MineBackup-Mod without the main program?

Integration scenarios still require the main program to handle the backup and restore workflow.

## Which mode should I use for my first backup?

Start with Full mode. Once the workflow is proven stable, switch to Smart mode.

## Why is the restore not ideal even though the backup succeeded?

Common causes:

- The wrong backup point was selected
- The Smart chain has a break
- The restore method doesn't match the current target

Replicate the issue in a test world first, and enable "pre-restore backup" as a safety net.

## Why should I rehearse in a test world first?

Hot backup, hot restore, and integration communication all have external dependencies. Rehearsing first avoids irreversible damage to your main save.

## What are the differences between Linux/macOS and Windows?

- Core backup and restore workflows are the same
- Windows supports service mode
- Path and permission handling on Linux/macOS requires more upfront verification

## When should I create a new configuration instead of fixing the old one?

Consider creating a new one when:

- The history chain has been chaotic for a long time
- Too many rules have accumulated and are hard to trace back
- The directory structure has changed significantly

## When will the English documentation be available?

This section was launched in Chinese first; the English version is being completed alongside it.

## How do I reset the entire program to its first-launch state?

Close MineBackup. In the folder where MineBackup.exe is located, find and delete the files `config.ini` and `history.dat`. The next time you start the program, it will behave like a fresh install and show the setup wizard again.

## Where are my configuration and history files stored?

They are stored in the same directory as MineBackup.exe: `config.ini` (all settings) and `history.dat` (all backup history). This means MineBackup is a "portable" application -- you can move the entire folder anywhere, and all your configuration will follow.

## What if I accidentally deleted the [Full] base archive for Smart backups?

Don't worry. The next time you run a Smart backup, the program will detect the missing base archive and automatically create a brand-new [Full] full backup as the starting point of a new backup chain.
