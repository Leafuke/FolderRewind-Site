---
sidebar_position: 99
title: FAQ
description: Frequently asked questions about FolderRewind
---

# Frequently Asked Questions (FAQ)

## Installation

### What operating systems does FolderRewind support?

Windows 10 1809 (17763) and above, including Windows 11. Supports x64 and ARM64 architectures.

### What's the difference between Microsoft Store install and sideload install?

- **Store install (recommended):** auto-updates, sandboxed security, one-click install.
- **Sideload install:** requires Developer Mode; useful when Store is unavailable.

Do **not** install the Store version and the offline package side by side. If you need to switch channels, uninstall first or at least make sure you clearly know which build you are actually running.

### What should I watch out for when upgrading from an older version?

This release introduces breaking changes to backup and restore logic, so upgraded behavior cannot be guaranteed to match older versions 100%.

Recommended flow:

1. Pick a test folder or test save.
2. Run several backup-and-restore rounds.
3. Move production data only after the result matches your expectation.

### What should I do if the app won't launch after installation?

1. Confirm your OS version meets minimum requirements.
2. Reinstall the latest version (Store or Release package).
3. Check whether security software blocked the app.
4. Search or report in [GitHub Issues](https://github.com/Leafuke/FolderRewind/issues).

## Backup

### Where are backup files stored?

Each config has its own target path. You can view or modify it in **Config Settings**.

### Will backups consume too much disk space?

You can reduce usage by:

- Using Smart Incremental mode
- Enabling skip when no changes
- Setting "Keep latest backup count"
- Applying lower compression policy for large file types

### Can I back up game saves while the game is running?

With MineRewind, Minecraft hot backup is supported while the game is running. For other games, backing up after pause/exit is still recommended.

### Can I keep using my PC during backup?

Yes. Backups run in the background.

### Can FolderRewind sync backups to the cloud?

Yes. Since v1.7.0, cloud-archive workflow support is complete. The recommended path is syncing backup directories to OneDrive (or other cloud storage) via **rclone**.

Main entry points are:

- enable post-backup auto cloud upload in Config Settings
- use "Sync this config from cloud" for config-level sync
- use per-item upload/download actions in History page

Note: history-page manual upload/download is available in rclone mode only.

Start here:

- [Cloud Archive Guide](./guides/cloud-archive)

### Why did auto backup stop unexpectedly?

You may have enabled "Stop auto tasks after repeated no-change detections". When the threshold is reached, auto backup is disabled and needs to be enabled again manually.

## Restore

### Will restore overwrite my current files?

Two primary modes are available:

- **Clean Restore:** clean target first, then restore (recommended). If Safe Restore is enabled, it can roll back automatically on failure.
- **Overwrite Restore:** overwrite same-name files, may keep old files

For important directories, enable both "Auto backup before restore" and "Safe Restore".

### Can I restore only selected files?

Current versions restore whole folders. Partial restore is planned.

### Why am I prompted for a password before restore?

That config is encrypted. Password verification is required before restore.

### Why does history show an entry but "View" can't find the backup file?

The archive was likely moved or deleted manually. Use "Clear invalid entries" on the history page.

### Why can deleting history be slower now?

If **Safe Delete** is enabled, FolderRewind will repair chain continuity before removing a backup from an incremental chain. That extra safety work takes more time than direct deletion.

## Data migration

### Can I migrate configs and history to a new PC?

Yes. Export/import is available in Settings.

### What's the difference between "Merge" and "Replace" when importing history?

- **Merge:** imports only missing entries (deduplicated)
- **Replace:** overwrites current history with imported data

Before replace, the app attempts to create a `.bak` backup.

### Anything special for encrypted configs across devices?

Encrypted credentials are tied to machine/user-secured storage. Validate encrypted restore flow first after migration.

## Plugins

### How do I install a plugin?

Install from plugin settings with zip import, or open the plugin folder for manual management.

### Is MineRewind free?

Yes. MineRewind is an official free open-source plugin.

### How can I develop my own plugin?

See [Plugin Development Quick Start](/docs/plugins/developing/quick-start).

## Feedback and community

### How do I report bugs or request features?

- **GitHub Issues:** [Report issue](https://github.com/Leafuke/FolderRewind/issues)
- **GitHub Discussions:** [Join discussion](https://github.com/Leafuke/FolderRewind/discussions)

### Is there a Chinese-speaking community?

Yes. You are welcome to discuss in Chinese on GitHub Discussions.

---

> Didn't find your question? Ask in [GitHub Discussions](https://github.com/Leafuke/FolderRewind/discussions).
