---
sidebar_position: 2
title: Platform Support and Installation Boundaries
description: MineBackup 1.16.2 desktop and CLI support ranges, distribution forms, and installation boundaries
---

# Platform Support and Installation Boundaries

MineBackup 1.16.2 keeps backup, restore, history, and core data contracts consistent across platforms. Desktop integration and the headless CLI are separate distribution and runtime boundaries.

## Support matrix

| Platform | Desktop | CLI |
| --- | --- | --- |
| Windows x64 | Officially supported; Windows 10 22H2 and Windows 11 | Official CLI ZIP: `MineBackup-CLI-<version>-windows-x64.zip` |
| Linux x86_64 | Officially supported; Ubuntu 24.04/glibc 2.39 baseline | Portable `.tar.gz` and `.deb` |
| macOS arm64 | Officially supported; macOS 15 and later | CLI-only build validation; no formal CLI release asset at present |

Linux release builds use the Ubuntu 24.04 toolchain and glibc 2.39 baseline. Ubuntu 22.04 and Debian 12 are outside the current support range. Use [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) for exact desktop/CLI asset names and checksums.

The macOS CLI-only build continues to receive build and regression validation, but a self-built result is not an official server download.

## Core capability is separate from desktop integration

Linux desktop services report states such as `Available`, `Unavailable`, `PermissionRequired`, or `Failed`, together with a diagnostic. If a tray host, portal, or shortcut permission is missing:

- Backup, restore, and history should remain available.
- The main window should still be reachable.
- A desktop-dependent feature should show its reason instead of silently pretending success.

For the first run, verify an ordinary backup and restore before working on tray behavior, autostart, or global hotkeys.

## First launch on macOS

The current DMG is arm64, ad-hoc signed, and not Apple-notarized. If macOS blocks the first launch, use **System Settings → Privacy & Security → Open Anyway**.

Do not disable Gatekeeper or remove quarantine metadata with `xattr` to bypass the system security check.

## KnotLink platform differences

KnotLink’s core protocol is cross-platform, but service discovery and installation differ:

- Windows checks App Paths and both 32-bit and 64-bit uninstall registry views, and requires KnotLinkService 3.2.0.0 or newer.
- Linux discovers the service through dpkg information; the service is managed by systemd.
- macOS discovers the service through the Installer receipt; the service is managed by launchd.

MineBackup can download and verify the official service package from the wizard or Settings, then open the platform installer. The user completes the remaining installation steps. See [KnotLink v2 integration](/en/docs/guides/minebackup-v1/knotlink-integration) for the mod minimum version and hot workflows.

## Windows Service Mode and CLI boundary

Version 1.16.2 no longer installs or starts the old Windows Service Mode. The Windows settings page only retains legacy-service inspection and safe cleanup; servers should use [CLI `serve`](/en/docs/guides/minebackup-v1/cli/serve), systemd, or Task Scheduler. Linux and macOS do not provide that cleanup path. See [Legacy Windows service cleanup](/en/docs/guides/minebackup-v1/service-mode).

## Minimum post-install verification

1. Start the application and confirm that the profile location is writable.
2. Create a normal configuration containing one world.
3. Confirm that the bundled or selected 7-Zip executable can run.
4. Complete one Full backup.
5. Restore once in a test directory or test world.
6. Only then enable hotkeys, tray integration, cloud synchronization, or KnotLink.
