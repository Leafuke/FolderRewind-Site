---
sidebar_position: 4
title: Encrypted Backups
description: Protect backup data with the Encrypted config type
---

# Encrypted Backups

FolderRewind provides encrypted backup through the **Encrypted config type**. After creation, backup and restore follow encrypted workflows.

## Best for

- Privacy documents or account-related data
- Shared devices where accidental access risk should be reduced
- Long-term encrypted archival on local machine

## Create an encrypted config

1. Click **New Config** on the home page.
2. Choose **Encrypted** as config type.
3. Enter config name, set password, and confirm.
4. Open the management page, add folders, and run backup.

:::caution Password policy
In current versions, the encryption password cannot be directly changed after creation.
Please keep it safely.
:::

## Restore behavior

- Password verification is required before restore.
- Restore starts only after successful verification.
- Verification failure aborts restore.

## Storage and security notes

- Password is not stored as plain text in config JSON.
- Password is protected locally with Windows DPAPI (current user scope).
- Verification works in the same machine + same user environment.

## Recommended strategy combinations

- Use with **Auto backup before restore** to reduce operation risk.
- Use with **Automation** for continuous encrypted snapshots.
- For large folders, use Smart Incremental to balance security and performance.

## FAQ

### What if I forget the password?

There is currently no plaintext password recovery.

Recommended:

- Save password in a password manager
- Keep at least one validated non-encrypted fallback backup before changing strategy

### Why does restore fail after importing config?

Importing `config.json` alone is not equal to migrating local encrypted credential storage.
After cross-device migration, validate encrypted restore flow on the new device first.

## Related links

- [First Restore](../getting-started/first-restore)
- [Automation](./automation)
- [Data Migration](./data-migration)
