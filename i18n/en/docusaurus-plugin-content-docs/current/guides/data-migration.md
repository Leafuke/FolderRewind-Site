---
sidebar_position: 8
title: Data Migration
description: Import and export configs and history records
---

# Data Migration

FolderRewind supports importing/exporting two data types in Settings:

- Config data (`config.json` structure)
- History data (`history.json` structure)

## Entry

1. Open **Settings**.
2. Find **Data Migration** section.
3. Choose import/export as needed.

## Config migration

### Export config

1. Click **Export Config**.
2. Choose a save path (`.json`).
3. Wait for success message.

### Import config

1. Click **Import Config**.
2. Read confirmation prompt and continue.
3. Select a config JSON file.

Importing config replaces current config data. The app attempts to back up old config as `.bak` first.

## History migration

### Export history

1. Click **Export History**.
2. Choose a save path (`.json`).

### Import history

1. Click **Import History**.
2. Select mode:
   - **Merge**: import only missing entries (deduplicated)
   - **Replace**: overwrite current history with imported file
3. Select history JSON and execute.

Replace mode attempts to back up existing history as `.bak` first.

## Recommended order on a new PC

1. Install and launch FolderRewind.
2. Import config.
3. Import history (usually Merge first).
4. Open several configs and verify source/target paths are accessible.
5. Run one manual backup and one restore test.

## Notes

- Across devices, drive letters and directory structures may differ. Verify path validity after import.
- Encrypted configs rely on machine-local credential storage. Validate encrypted restore flow first after migration.

## Related links

- [Encrypted Backups](./encryption)
- [History Timeline](./history-timeline)
