---
sidebar_position: 1
title: "Installation"
description: "Install FolderRewind from Microsoft Store or GitHub, choose x64 or ARM64, verify the package and find the data directory for your channel."
reviewed_baseline: "1.10-api3.17"
---

# Installation

FolderRewind supports Windows 10 version 1809 or later and Windows 11. Install through Microsoft Store or download a Setup package from GitHub.

## Microsoft Store

Open [Microsoft Store](https://apps.microsoft.com/detail/9nwsdgxdqws4) and install the app. The Store manages later updates. Store and GitHub releases have their own publication schedules; check About in the app for your installed version.

## GitHub Setup package

1. Open [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases).
2. Choose x64 for Intel/AMD PCs or ARM64 for Windows on ARM.
3. Download the matching `.sha256` file and check the SHA-256 value in PowerShell:

```powershell
Get-FileHash .\FolderRewind_1.10.0.0_Setup_x64.exe -Algorithm SHA256
```

4. Run the installer and choose the installation path and scope in the English or Chinese wizard. The default is `%LOCALAPPDATA%\Programs\FolderRewind` for the current user. Installation for all users requires administrator access.

Setup includes the .NET and Windows App SDK runtimes. The installer currently has no production code signature, so Windows may show an unknown-publisher or SmartScreen prompt. Download from the official project Release and verify its checksum. You can download an upgrade directly if an older client's updater has yet to find Setup packages.

## Data directories and channels

| Channel | App data directory |
| --- | --- |
| Microsoft Store / older MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| Setup | `%LOCALAPPDATA%\FolderRewind` |

Project settings, plugins, history repositories, logs and local state live in the app data directory. Backup files use the storage location selected for each project. Allow additional disk space for backups and restore staging.

When switching channels, exit the original app, keep its data directory and archives, then migrate configuration, history and source paths into the new installation. Choose one channel for everyday protection of the same sources. See [data migration](/docs/guides/data-migration). Uninstalling keeps settings by default, with an option to clear current-user settings.

Continue with [your first backup](/docs/getting-started/first-backup).

<span id="choose-a-channel" />
<span id="data-directories-and-channel-switching" />
<span id="next-steps" />
<span id="option-1-microsoft-store" />
<span id="option-2-msi" />
<span id="option-3-msix-sideload-package" />
<span id="system-requirements" />
<span id="upgrading-from-an-older-release" />
<span id="validate-immediately-after-installation" />

<span id="installation-guide" />

<span id="setup-exe" />
<span id="requirements-and-data-paths" />
<span id="historical-packages" />
