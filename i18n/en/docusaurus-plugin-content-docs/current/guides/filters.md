---
sidebar_position: 5
title: Filter Rules
description: Configure backup blacklist and restore whitelist
---

# Filter Rules

FolderRewind has two filter groups:

- **Blacklist**: affects backup stage (matched items are excluded)
- **Restore Whitelist**: affects Clean restore stage (matched items are preserved during cleanup)

## Where to configure

1. Open the target config.
2. Click **Config Settings**.
3. Configure:
   - **Blacklist** in the **Filters** section
   - **Restore Whitelist** in the **Restore Policy** section

## Blacklist (backup stage)

Blacklist rules apply during file scan. Common use cases include cache, logs, and temporary files.

### Supported matching methods

- Exact filename match (for example `latest.log`)
- Path-contains match (for example `node_modules`)
- Wildcards (`*`, `?`)
- Regex rules (`regex:` prefix, with regex option enabled)

### Examples

- `*.tmp`
- `cache`
- `regex:^logs/.*\\.txt$`

## Restore Whitelist (Clean restore stage)

During **Clean Restore**, FolderRewind cleans the target directory first.
Items in whitelist are preserved during cleanup.

### Typical use cases

- Preserve local config files
- Preserve machine-specific environment files

### Examples

- `.env.local`
- `user-settings.json`
- `screenshots`

## Best practices

- Run one manual backup and verify results after adding rules.
- Start with precise rules, then broaden if needed.
- Validate regex on a small scope before production use.

## FAQ

### Regex rule is not working

Confirm:

- Rule starts with `regex:`
- "Use regex" is enabled
- Expression is valid

### Old files remain after restore

Check restore mode first. Only Clean restore runs "cleanup + whitelist preserve" logic.

## Related links

- [First Restore](../getting-started/first-restore)
- [Backup Modes](./backup-modes)
