---
sidebar_position: 1
title: Installation Guide
description: Choose the Store, MSI, or MSIX installation channel
---

# Installation Guide

FolderRewind is distributed through three channels: **Microsoft Store**, **MSI**, and an **MSIX sideload package**.

:::tip Recommended
Use Microsoft Store whenever it is available. Installation is simple and the Store manages later updates.
:::

:::warning Do not mix channels
Do not install or run the Store, MSI, and MSIX versions side by side. MSI and MSIX/Store use different data directories, and switching channels does not migrate configs, history, or plugins automatically.
:::

## Choose a channel

| Channel | Best for | Installation | Important note |
| --- | --- | --- | --- |
| Microsoft Store | Most users | One-click Store install | Recommended and easiest to keep updated |
| MSI | General users who cannot use Store | Run the `.msi` | This distribution format is still under testing; the installer is not signed with a trusted Authenticode certificate |
| MSIX (`.7z`) | Users comfortable with Developer Mode and PowerShell | Extract and run `install.ps1` | Requires Developer Mode; closest to the Store build |

Choose **x64** for most Intel/AMD Windows devices. Choose **ARM64** only for Windows on Arm.

## Option 1: Microsoft Store

1. Open the [Microsoft Store page](https://apps.microsoft.com/detail/9nwsdgxdqws4).
2. Select Install.
3. Launch FolderRewind from the Start menu.

## Option 2: MSI

1. Open the [latest GitHub Release](https://github.com/Leafuke/FolderRewind/releases/latest).
2. Download the `.msi` for your architecture and the matching `.msi.sha256` file.
3. In the download directory, run the command below and compare the output with the value in the `.sha256` file:

   ```powershell
   Get-FileHash .\FolderRewind_*.msi -Algorithm SHA256
   ```

4. Run the MSI and complete the wizard. It installs to `%LOCALAPPDATA%\Programs\FolderRewind` by default, with an option to choose another local directory.

MSI does not require Developer Mode or manual certificate import. Because the installer is not yet signed with a Windows-trusted Authenticode certificate, Windows may show an unknown-publisher or SmartScreen warning. Download only from the official Release and verify the hash first.

## Option 3: MSIX sideload package

1. Open **Windows Settings > System > For Developers** and enable **Developer Mode**.
2. Open the [latest GitHub Release](https://github.com/Leafuke/FolderRewind/releases/latest).
3. Download the `.7z` for your architecture and the matching `.7z.sha256` file.
4. Verify the download:

   ```powershell
   Get-FileHash .\FolderRewind_*.7z -Algorithm SHA256
   ```

5. Extract the `.7z`, then run the following commands in the extracted directory:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   .\install.ps1
   ```

6. Wait for the script to register the certificate and install the MSIX package, then launch FolderRewind from the Start menu.

`Set-ExecutionPolicy` applies only to the current PowerShell session and does not change the system-wide policy.

## Data directories and channel switching

| Channel | Config and history directory |
| --- | --- |
| Store / MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| MSI | `%LOCALAPPDATA%\FolderRewind` |

The directory contains `config.json`, `history.json`, and `plugins`. Before switching channels:

1. Exit FolderRewind completely.
2. Back up the entire `FolderRewind` data directory for the current channel.
3. Uninstall the old channel.
4. Install the new channel, then import or copy only data you have reviewed by following the [Data Migration Guide](/en/docs/guides/data-migration).

Do not allow two installations to operate on the same active backup workflow.

## Upgrading from an older release

Before upgrading to 1.8, read [v1.8 Upgrade and Startup Recovery](/en/docs/getting-started/v1-8-upgrade). Complete at least one backup-and-restore test with non-production data before protecting important files.

If v1.8.0 cannot start because of a legacy language value, do not delete `config.json`. Upgrade to v1.8.1 or change only `GlobalSettings.Language` as described in the recovery guide.

## Validate immediately after installation

1. Create a config that uses a test directory.
2. Complete one manual backup and one test restore.
3. Run **Automatic Core Feature Validation** in Settings.
4. Confirm the destination is writable and history is generated before enabling automation.

## System requirements

| Item | Requirement |
| --- | --- |
| OS | Windows 10 1809 or later / Windows 11 |
| Architecture | x64 / ARM64 |
| Runtime | .NET 10 (bundled) |
| Disk space | About 80 MB, excluding backup data |

## Next steps

- [v1.8 Upgrade and Startup Recovery](/en/docs/getting-started/v1-8-upgrade)
- [First Backup](/en/docs/getting-started/first-backup)
- [First Restore](/en/docs/getting-started/first-restore)
