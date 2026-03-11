---
sidebar_position: 1
title: Installation Guide
description: How to install FolderRewind
---

# Installation Guide

FolderRewind supports two installation methods: Microsoft Store (recommended) and sideloading.

:::caution v1.5.0 upgrade notice
This release introduces breaking changes to backup and restore logic. If you are upgrading from an older version, run several backup-and-restore tests before using it in production.

Also, **do not install the Store version and the offline package side by side**. It makes troubleshooting and version tracking unnecessarily confusing.
:::

## Method 1: Microsoft Store (Recommended)

1. Open the link below, or search for "FolderRewind" in Microsoft Store:

	 <a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
		 👉 Install from Microsoft Store
	 </a>

2. Click **Get / Install**.
3. Launch FolderRewind from the Start menu after installation.

> **Advantages:** Auto-updates, sandboxed security, and one-click install.

## Method 2: Sideload Installation

Best for users who cannot access Microsoft Store. If you already have the Store version installed, do not keep the sideloaded package alongside it.

### Prerequisites

1. Open **Settings** → **System** → **For developers**.
2. Enable **Developer Mode**.
3. Scroll down, expand the **PowerShell** section, and enable the execution policy option.

### Installation Steps

1. Go to [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases)
2. In the latest release **Assets**, find the package named `FolderRewind_{version}_{platform}.7z`
3. Download and extract it
4. Right-click `install.ps1` and choose **Run with PowerShell**
5. Launch FolderRewind from the Start menu

:::tip First launch suggestion
After your first launch, create a test config, run one backup, and then perform one restore validation to confirm both the target path and the restore result are correct.
:::

## System Requirements

| Item | Requirement |
|------|-------------|
| OS | Windows 10 1809 (17763) or later / Windows 11 |
| Architecture | x64 / ARM64 |
| Runtime | .NET 10 (bundled in app) |
| Disk Space | About 180 MB (excluding backup data) |

## Quick Health Check (1 minute)

1. Open the app and confirm the config card area loads.
2. Click **New Config** and confirm the dialog opens.
3. Create a test config and complete one manual backup.
4. Perform one restore validation in a test directory and confirm the result is correct.

If all checks pass, continue with your real config and automation setup.

## Next Step

Continue with [First Backup](./first-backup).
