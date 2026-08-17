---
sidebar_position: 2
title: v1.8 Upgrade and Startup Recovery
description: Upgrade from older releases and safely recover from the v1.8.0 language-setting startup failure
---

# v1.8 Upgrade and Startup Recovery

Use this page when upgrading an older installation to FolderRewind 1.8 or when v1.8.0 exits before creating a window.

:::tip Upgrade to v1.8.1 first
v1.8.1 automatically migrates `zh_CN` / `en_US` to `zh-CN` / `en-US`. Unknown values fall back to the system language. If Windows rejects a language override, the app continues with the system language.
:::

## Before upgrading

1. Exit FolderRewind completely, including its tray process.
2. Identify the current channel: Store/MSIX or MSI.
3. Back up `config.json`, `history.json`, and `plugins` from the current data directory.
4. Complete one backup-and-restore test with the current release to establish a known-good baseline.
5. Record recovery information for encrypted configs. Copying `config.json` alone does not migrate the machine-bound encrypted password store.

Data directories:

```text
Store / MSIX:
%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind

MSI:
%LOCALAPPDATA%\FolderRewind
```

## Supported upgrade path

- **v1.7.4 → v1.8.x:** direct upgrade is supported.
- **Earlier than v1.7.4:** run v1.7.4 first to complete legacy config migration, then upgrade to the latest v1.8.x.
- Existing backups and history metadata remain restorable, but the upgraded backup chain and restore result must be retested with non-production data.

Upgrading does not move MSI data to Store/MSIX or vice versa. When switching channels, follow [Installation Guide](/en/docs/getting-started/installation#data-directories-and-channel-switching) to back up data and uninstall the old channel first.

## If v1.8.0 cannot start

1. Confirm FolderRewind has exited completely.
2. Locate `config.json` for the current channel.
3. Create a backup such as `config.before-language-fix.json`.
4. Open the original file in a text editor and locate `Language` under `GlobalSettings`.
5. Change only the value to one of the following:

   ```json
   "Language": "system"
   ```

   `"zh-CN"` and `"en-US"` are also valid.

6. Save the file without breaking its JSON structure.
7. Install or upgrade to v1.8.1, then start FolderRewind.

:::danger Do not delete the whole config
Deleting `config.json` removes application settings, backup configs, and plugin enablement state. Startup recovery requires only a backup and a correction to `GlobalSettings.Language`.
:::

If `Language` is missing, the file cannot be parsed, or the app still cannot start, restore the backup and open a [GitHub Issue](https://github.com/Leafuke/FolderRewind/issues) with logs and a redacted config excerpt.

## v1.8 compatibility changes

### Templates

Template import accepts only the version 1.0 envelope carrying the `FolderRewindTemplate` marker. Re-export and validate non-standard templates in a test environment.

### KnotLink

FolderRewind 1.8 uses the strict key-value **KnotLink parameterized protocol v2** and requires **KnotLink Server v3**. These are different version numbers:

- Server v3 is the external KnotLink server release.
- Parameterized protocol v2 is the request format handled by FolderRewind and plugins.

Plugins using the removed legacy command interface must be upgraded. Plugins that use the new 1.8 APIs should declare `MinHostVersion` as `1.8.0` or later.

### Partial backups

Plugin scopes such as selected-region backup contain only part of the folder. FolderRewind forces Overwrite restore so Clean mode cannot delete files absent from the archive.

## Validate after upgrading

1. Confirm language, theme, configs, and plugin state.
2. Run both Full and Smart Incremental backups against a test directory.
3. Verify that a recent backup can be restored.
4. Review automation targets, filters, and cloud paths.
5. If you use KnotLink, test the connection and confirm the Server version is supported.

Restore production automation only after all checks pass.

## Related pages

- [Installation Guide](/en/docs/getting-started/installation)
- [Data Migration](/en/docs/guides/data-migration)
- [Backup Modes](/en/docs/guides/backup-modes)
- [KnotLink Protocol and Integration](/en/docs/plugins/knotlink)
