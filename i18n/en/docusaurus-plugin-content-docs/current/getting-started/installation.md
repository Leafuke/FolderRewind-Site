---
sidebar_position: 1
title: "Installation guide"
description: "FolderRewind 1.9 installation guide: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Installation guide

FolderRewind 1.9.3 was released on 2026-10-03 with MineRewind 1.9.5 bundled. Install through Microsoft Store or GitHub Setup EXE; check the actual Store listing and installed app version.

## Microsoft Store

Install from [Microsoft Store](https://apps.microsoft.com/detail/9nwsdgxdqws4); the Store manages updates. Verify the app version because Store review and GitHub publication can differ.

## Setup EXE

The official [GitHub Release](https://github.com/Leafuke/FolderRewind/releases) exposes only:

```text
FolderRewind_<version>_Setup_x64.exe
FolderRewind_<version>_Setup_x64.exe.sha256
FolderRewind_<version>_Setup_arm64.exe
FolderRewind_<version>_Setup_arm64.exe.sha256
```

Choose x64 for Intel/AMD and arm64 for Windows on ARM. Download matching checksum and verify:

```powershell
Get-FileHash .\FolderRewind_<version>_Setup_x64.exe -Algorithm SHA256
```

Compare against .sha256 before running the bilingual wizard. Choose current-user or all-users installation; all-users installation requires appropriate permissions. Uninstallation preserves settings by default, with optional current-user settings cleanup that preserves backups. Older clients that cannot recognize Setup updates should download manually from the Release page. Setup includes its installation engine; no separate MSI is needed. If the correct EXE is unavailable, open the release page rather than falling back to old MSI.

## Requirements and data paths

Windows10 1809+/Windows11; x64/ARM64 distribution; .NET10 included. Use official asset/installer size information, not the old80MB estimate. Archives/staging/recovery need additional space.

| Channel | Data path |
|---|---|
| Store/legacy MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| Unpackaged Setup | `%LOCALAPPDATA%\FolderRewind` |

The data directory contains config, plugins, per-config history, logs and local state; archives also live in each destination. Channel changes do not automatically migrate these stores. Exit, back up data/archives, uninstall the old channel, then validate migration. Do not run two channels on the same sources concurrently.

## Historical packages

Older releases may contain MSI/MSIX .7z/install.ps1 for their own versions. They are not public1.9 GitHub assets. Developer Mode/certificate scripts are not Setup prerequisites.

Validate a test backup/restore and core checks before automation. See [migration](/docs/guides/data-migration).

<span id="choose-a-channel" />
<span id="option-1-microsoft-store" />
<span id="option-2-msi" />
<span id="option-3-msix-sideload-package" />
<span id="data-directories-and-channel-switching" />
<span id="upgrading-from-an-older-release" />
<span id="validate-immediately-after-installation" />
<span id="system-requirements" />
<span id="next-steps" />
