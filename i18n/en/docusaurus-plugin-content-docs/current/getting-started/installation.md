---
sidebar_position: 1
title: Installation Guide
description: Install and launch FolderRewind
---

# Installation Guide

FolderRewind supports two installation methods: **Microsoft Store** and **side-loading**.

:::tip Recommended
Use the Microsoft Store version whenever possible. It is easier to maintain and less likely to cause version conflicts.
:::

## Option 1: Microsoft Store

1. Open the [Microsoft Store page](https://apps.microsoft.com/detail/9nwsdgxdqws4)
2. Click install
3. Launch FolderRewind from the Start menu after installation

> Do not install the Store version and the offline side-loaded package side by side.

## Option 2: Side-loading

This is for users who cannot access Microsoft Store or prefer offline packages.

### Prerequisites

1. Open Windows Settings
2. Go to **System > For Developers**
3. Enable **Developer Mode**
4. Confirm PowerShell allows script execution (required for the install script)

### Installation steps

1. Open [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases)
2. Download the latest package (filename format: `FolderRewind_{version}_{platform}.7z`, e.g. `FolderRewind_1.7.0_x64.7z`)
3. Extract the archive to any directory
4. In the extracted directory, right-click `install.ps1` and select **Run with PowerShell**
   - If you see a prompt saying execution policy is blocked, open a PowerShell terminal and run:
     ```powershell
     Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
     .\install.ps1
     ```
5. Wait for the installation to complete (the script automatically registers the certificate and installs the MSIX package)
6. Launch FolderRewind from the Start menu

## New in side-loaded v1.6.0

### GitHub mirror source

Starting with v1.6.0, side-loaded builds can switch the preferred **GitHub source / mirror source** in Settings.

This affects:

- app update checks and downloads
- online template index retrieval
- template file downloads

Microsoft Store updates are not affected by this setting.

If the official GitHub source is slow in your network environment, switch to a mirror or provide a custom mirror URL.

### Better side-loaded update flow

v1.6.0 also improves the side-loaded update experience, especially when a source is slow or temporarily unavailable.

## Common installation issues

### Running install.ps1 shows "Cannot load file because running scripts is disabled on this system"

Run the following command in PowerShell, then re-run the install script:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\install.ps1
```

This setting only applies to the current PowerShell session and does not affect the system-wide policy.

## What to do right after installation

### 1. Create a test config first

Use a test folder and run one end-to-end backup flow before protecting important data. Confirm the backup destination is writable, the interface works normally, and history records are generated.

### 2. Run automatic core validation

Open **Settings** and run **Automatic Core Feature Validation**. It checks key workflows on the current machine, including:

- backup
- restore
- safe delete
- keep-count cleanup
- shared-lock file handling

If this is your first run after upgrading to v1.6.0, it is strongly recommended.

## System requirements

| Item | Requirement |
| --- | --- |
| OS | Windows 10 1809 or later / Windows 11 |
| Architecture | x64 / ARM64 |
| Runtime | .NET 10 (bundled with the app) |
| Disk space | About 80 MB, excluding backup data |

## Next step

Continue with [First Backup](./first-backup).
