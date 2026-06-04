---
sidebar_position: 11
title: Blacklists and Restore Whitelists
description: Filter rules, exclusion strategies, and restore scope control
---

# Blacklists and Restore Whitelists

Filter rules are key tools for "saving space" and "preventing accidental restores," but they are also the easiest way to lose data if the rules are too aggressive.

## Backup Blacklist

You can exclude files/directories that don't need to be included in the archive. This is useful for:

- Reducing archive size
- Minimizing noise from irrelevant files
- Shortening backup time

Common exclusions: logs, caches, and temporary directories.

### Recommended types to exclude first

- Runtime log directories
- Temporary cache directories
- Regenerable intermediate files

## Restore Whitelist

During restore, you can use a whitelist to recover only specific items, which is ideal for fine-grained rollback.

Applicable scenarios:

- Restoring only files related to a build area
- Rolling back only config files without affecting player progress
- Verifying whether a suspicious file is causing issues

## Practical Tips

- Start with a small blacklist scope in trial runs to avoid accidentally excluding critical data
- When doing custom restores, validate the rules in a test world first

## Safety Strategy

1. Test new rules with a test configuration first
2. Only apply to production after two consecutive backup results look good
3. If something goes wrong, revert the rules first instead of piling on more complex conditions
