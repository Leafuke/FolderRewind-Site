---
sidebar_position: 2
title: Platform Support and Installation Boundaries
description: Supported Windows, Linux, and macOS environments and capability degradation rules for MineBackup 1.16.1
---

# Platform Support and Installation Boundaries

MineBackup 1.16.1 keeps backup, restore, history, and core data contracts consistent across platforms. Desktop integration is evaluated separately according to the operating system and the active desktop session.

## Support matrix

| Platform | Supported range | Distribution | Possible desktop capabilities |
| --- | --- | --- | --- |
| Windows x64 | Windows 10 22H2, Windows 11 | Single EXE | Native file dialogs, tray, notifications, global hotkeys, current-user autostart |
| Ubuntu x86_64 | Ubuntu 24.04 and later | `.deb` or AppImage | X11/Wayland selected by session capability; portals, tray, and shortcuts may require permission or degrade |
| Debian x86_64 | Debian 13 and later | AppImage | The same capability-based Linux behavior |
| macOS arm64 | macOS 15 and later | arm64 DMG | Native dialogs, menu bar, notifications, hotkeys, login item |

Linux release builds use the Ubuntu 24.04 toolchain and glibc 2.39 baseline. Ubuntu 22.04 and Debian 12 are outside the current support range. Use [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) for exact asset names and checksums.

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

## Windows Service Mode boundary

Version 1.16 no longer installs or starts Windows Service Mode. The Windows settings page only retains legacy-service inspection and safe cleanup; Linux and macOS do not provide that cleanup path. See [Legacy Windows service cleanup](/en/docs/guides/minebackup-v1/service-mode).

## Minimum post-install verification

1. Start the application and confirm that the profile location is writable.
2. Create a normal configuration containing one world.
3. Confirm that the bundled or selected 7-Zip executable can run.
4. Complete one Full backup.
5. Restore once in a test directory or test world.
6. Only then enable hotkeys, tray integration, cloud synchronization, or KnotLink.
