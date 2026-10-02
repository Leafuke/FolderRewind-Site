---
sidebar_position: 1
title: "Installation guide"
description: "FolderRewind 1.9 installation guide: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Installation guide

FolderRewind1.9 offers Microsoft Store and GitHub Setup EXE for users. This is the1.9 release policy; releases/latest can still point to1.8.2 until publication. Do not treat old assets as1.9.

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

Compare against .sha256 before running the wizard. The default per-user directory is LocalAppData/Programs/FolderRewind; follow actual permission/system prompts. Setup includes its installation engine; no separate MSI is needed. If the correct EXE is unavailable, open the release page rather than falling back to old MSI.

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
