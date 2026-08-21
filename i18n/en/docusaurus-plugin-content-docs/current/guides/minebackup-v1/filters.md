---
sidebar_position: 9
title: Filter Rules
description: Backup blacklists and Clean-restore deletion whitelists in MineBackup 1.16.2
---

# Filter Rules

MineBackup 1.16.2 primarily uses a **blacklist** for configuration-level backup filtering. Restore has a separate **restore whitelist** for the deletion step of Clean restore. MineBackup does not directly provide FolderRewind’s backup-whitelist mode.

## Backup blacklist

Blacklists apply while scanning and creating an archive. Matching files and directories are excluded from the new archive. Typical candidates include:

- Regenerable caches.
- Runtime logs and temporary files.
- Downloads or build outputs that are not part of the recovery point.

Do not exclude `level.dat`, world data, important configuration, or Smart-chain dependencies merely to reduce size. Start with a small number of explicit rules.

## Rule matching

The source path-rule implementation normalizes case and slash direction and supports:

- File-name matches such as `latest.log`.
- Relative-path or directory-segment matches such as `cache` or `logs/server`.
- Absolute-path matches, with an attempt to remap them when the original root changes.
- ECMAScript regular expressions prefixed with `regex:`, matched case-insensitively.

An invalid regular expression is ignored for compatibility and recorded; saving a rule does not prove that it matches. These rules are not arbitrary 7-Zip command-line arguments, and `*` or `?` should not be assumed to be independent shell-wildcard syntax.

## Restore whitelist

The restore whitelist only affects the deletion stage before `Clean` restore: matching files and directories are kept instead of being removed because they are not present in the selected archive.

It does not mean “extract only these archive entries”, and it does not change Overwrite or Custom extraction lists. To restore only selected contents, use the `Custom` method described in [Your first restore](/en/docs/guides/minebackup-v1/first-restore).

Typical uses include:

- Keeping a machine-private configuration.
- Preserving environment-specific files.
- Protecting a directory outside the backup scope from Clean deletion.

## Safe validation workflow

1. Add the rule in a test configuration.
2. Inspect the backup log and archive contents to confirm that important files remain.
3. Use Overwrite or Clean in a copy of the destination and compare the treatment of files outside the archive.
4. Apply the rule to production only after two correct test results.

If a rule is too broad, remove or narrow it instead of hiding the ambiguity under more exceptions.
