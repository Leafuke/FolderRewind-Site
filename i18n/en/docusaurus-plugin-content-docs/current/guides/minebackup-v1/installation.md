---
sidebar_position: 3
title: Installation and Setup
description: MineBackup 1.16.2 desktop GUI and headless CLI installation, platform dependencies, and first checks
---

# Installation and Setup

The goal of this page is not merely to open the program. It is to make the first backup run with the correct paths, tools, and permissions. Establish an ordinary backup-and-restore loop before enabling hot backup, cloud archive, or automation.

## Choose your installation path

### A. Desktop GUI

Desktop users can download the GUI asset for their platform from [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases), then follow the compression-tool, profile, and first-run checks on this page.

### B. Headless CLI / Server

Choose the CLI assets for a server, VPS, NAS, or an environment without DISPLAY/Wayland:

```text
MineBackup-CLI-<version>-windows-x64.zip
MineBackup-CLI-<version>-linux-x64.tar.gz
minebackup-cli_<version>_amd64.deb
```

These are asset naming patterns, not fixed version URLs. Always start at [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases). Before the production site claims that the 1.16.2 CLI is downloadable, confirm that the `v1.16.2` Release has actually been published.

The CLI does not require the GUI. Start with [CLI and server overview](/en/docs/guides/minebackup-v1/cli/overview), then complete the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start).

## Download and run the GUI

MineBackup 1.16.2 provides Windows x64, Linux x86_64, and macOS arm64 GUI distributions. Download the asset for your platform from [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) and, when available, verify the SHA-256 checksum published with the release.

See [Platform support and installation boundaries](/en/docs/guides/minebackup-v1/platform-support) for platform ranges and desktop capabilities. The macOS DMG is not Apple-notarized; the first launch may require **Open Anyway** in Privacy & Security.

## Compression tool

MineBackup uses 7-Zip as its archive engine. The current resolver generally checks:

1. The bundled `7za.exe` or the corresponding platform resource.
2. A user-selected path saved in Settings.
3. A 7-Zip installation discoverable on the system.

If the path shown in Settings is unavailable, select the compression executable again and save. Do not assume that opening Settings proves that a backup can run; complete a test backup at minimum.

Cloud archive requires a separate rclone setup. rclone is not distributed with MineBackup; after confirmation, the application can download, verify, and install a managed version. See [Cloud archive](/en/docs/guides/minebackup-v1/cloud-archive).

## What first launch does

The application resolves the profile before loading configuration and history:

- `--data-dir <absolute path>` selects a complete profile root explicitly.
- On Windows or AppImage, an adjacent `portable.flag` selects the neighboring `MineBackupData` profile.
- Without an explicit option, the application uses platform-default configuration, data, state, cache, runtime, tools, and log roots.
- If old locations or 1.15 data are discovered, MineBackup asks for confirmation before migration; source files are not silently deleted.

These rules replace the old assumption that fixed data files always live beside the EXE. See [Profiles, portable mode, and 1.15 migration](/en/docs/guides/minebackup-v1/data-and-migration).

## Plan the directories

Prepare at least two writable locations:

- **Save root:** the parent directory containing the worlds or source folders to manage.
- **Backup root:** the location for archives and MineBackup metadata, preferably on another physical disk.

Hot backup can use an optional `snapshotPath` for temporary snapshot data. It needs enough space and stable write access. Do not put it in a directory that another cleanup process may remove during a task unless every operation is guaranteed to finish in the same session.

## Preflight checklist

Before creating a configuration, confirm:

1. The current user can read the save root.
2. The backup root and snapshot root, if used, are writable.
3. The target disk has enough free space.
4. Security software will not block MineBackup or its 7-Zip child process.
5. Hot Minecraft workflows have a compatible companion mod and KnotLinkService ready.
6. Linux/macOS desktop permissions cover any notification, tray, or shortcut capability you need.

## Minimum post-install test

1. Open Settings and confirm the active profile mode.
2. Create a normal configuration containing one world.
3. Confirm that the compression tool resolves successfully.
4. Complete one manual Full backup.
5. Restore once in a test directory or test world.

Windows Service Mode is not an installation step: version 1.16 cannot install or start it. It can only inspect and remove an older service after the safety checks succeed.
