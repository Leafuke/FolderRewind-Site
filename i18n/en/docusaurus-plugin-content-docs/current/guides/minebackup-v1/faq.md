---
sidebar_position: 19
title: MineBackup 1.16.1 FAQ
description: Product boundaries, backup, restore, migration, and integration answers for MineBackup 1.16.1
---

# MineBackup 1.16.1 FAQ

## How does MineBackup relate to FolderRewind?

MineBackup is the first-generation archive time machine in the FolderRewind ecosystem. It keeps its own profile, Smart chain, KnotLink integration, and cross-platform boundaries. The general FolderRewind documentation is not a MineBackup capability reference; this section and [First-generation overview](./overview) follow MineBackup 1.16.1 source behavior.

## Which platforms does 1.16.1 support?

The release targets Windows x64, Linux x86_64, and arm64 macOS. Tray, notification, hotkey, and KnotLink behavior varies with the desktop session. Linux/macOS are not a simple “degraded Windows mode”: core backup, restore, profile, and task models are shared, while paths, shells, desktop portals, and permissions differ. See [Platform support](./platform-support).

## Can I still install or start Service Mode?

No. 1.16.1 cannot install or start Windows Service Mode. It can only inspect and safely remove an existing, validated legacy MineBackup service on Windows. `--service` is deprecated and disabled. For unattended work, use [Automation Tasks](./automation) or [Special Config](./special-mode).

## Which mode should I use for the first backup?

Start with **Full** in the configuration UI. Confirm that the history entry, archive, and restore loop work before using **Smart**. The UI’s **Overwrite** is another actual backup mode; these labels are not the same terminology as the one-shot KnotLink request’s `backup_mode=full|incremental`.

## What if the Full baseline for Smart was deleted?

Do not edit `state.json` or `records` by hand. When the baseline, archive, or metadata is unsafe, MineBackup establishes a new safe Full. Confirm that the new Full succeeds before continuing with Smart. If this follows a 1.15 migration, check the migration status and [Profiles and migration](./data-and-migration) first.

## Which restore method should I choose?

**Clean** clears the target first, **Overwrite** replaces only files supplied by the archive, **Reverse** undoes the changes represented by a selected archive, and **Custom** restores selected files only. Rehearse the first restore in a test world and enable `backupBefore` when appropriate. A running world must be saved, exited, and allowed to release files first. See [First restore](./first-restore).

## Are hot backup and hot restore guaranteed?

They are best-effort integration workflows, not unconditional consistency guarantees. A handshake failure, version mismatch, or timeout can fall back to a normal backup. Rehearse save, exit, file release, restore, and rejoin end to end in a test world. Use MineBackup-Mod `3.0.0` or later for the documented integration.

## Where are configuration and history stored?

1.16.1 uses a separate profile: the current configuration is `<profile>/config/config.ini`, history is `<profile>/data/history.json`, and logs are under `<profile>/logs` or the platform’s standard log location. Archive files are still controlled by each configuration’s `backupPath` and do not have to be beside the profile. See [Profiles and migration](./data-and-migration).

## How can I start over safely?

Do not delete one legacy configuration file or remove the active profile while MineBackup is running. Close MineBackup, copy the profile, history, and archive inventory that must be retained, and use a new absolute `--data-dir` for an isolated experiment. A profile reset does not automatically delete archives under `backupPath`, but it can disconnect their history, so make a backup first.

## Why can’t I back up immediately after importing from the cloud?

Cloud `portable-config.json` contains only an explicit portable whitelist. It excludes local world paths, archive paths, tool paths, credentials, commands, scripts, and automation. An imported configuration remains pending until you bind local `saveRoot`, world entries, `backupPath`, and optional `snapshotPath`. See [Cloud archive](./cloud-archive).

## Is rclone bundled, and are credentials synchronized?

rclone is not bundled with MineBackup. The managed installer obtains the release-pinned version from the official source only after user confirmation and version/SHA-256 verification. MineBackup does not copy, parse, or upload the user’s rclone credential file; the user remains responsible for remote permissions.

## Which KnotLink versions are required?

MineBackup-Mod must be at least `3.0.0`, and KnotLinkService should be at least `3.2.0.0`. KnotLink v2 uses strict `key=value;key2=value2` syntax; state-changing requests require `from` and `request_id`. The default Windows loopback ports are 6370 and 6378. Old positional arguments, aliases, and free-text commands are not part of the current interface. See [KnotLink v2 integration](./knotlink-integration).

## Will migration delete my old data?

No. The 1.15-to-1.16 migration retains source files and does not rename, move, or recompress the original archives. The migration report and recovery snapshots are stored in the current profile. `Pending`, `Degraded`, or `Failed` states gate related writes or cause the next world backup to establish a safe Full. Read [Profiles and migration](./data-and-migration) and [Logging and diagnostics](./logging-and-diagnostics) before touching legacy data.

## Why can’t I find files such as `auto_log.txt`?

The current release uses `minebackup.log`, the Log panel, and **Export Diagnostics**. Legacy log files are no longer written, migrated, or deleted. Diagnostic export redacts known paths and URL-sensitive values, but review it manually before sharing. See [Logging and diagnostics](./logging-and-diagnostics).

## When should I create a new configuration?

Create one when the world or archive path has changed, a Smart chain cannot be made safe, filters have become difficult to explain, or you need to test a different compression/cloud setup. A new configuration has its own stable `ConfigId` and history association. Do not create one blindly to bypass migration or permission errors; preserve the original profile and diagnostics first.

## Where is the English documentation?

This section has a synchronized English mirror. Links and version boundaries should remain aligned; when a translation appears to disagree with the implementation, MineBackup 1.16.1 source behavior is authoritative and should be reported.
