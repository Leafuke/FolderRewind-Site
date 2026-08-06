---
sidebar_position: 8
title: History and Restore Strategy
description: History maintenance, important markers, deletion choices, and recovery decisions in MineBackup 1.16.1
---

# History and Restore Strategy

History is the traceability layer of a backup. It is more than an archive list: it combines world, configuration, time, type, comment, local-file status, and cloud-copy status into a recovery entry.

## What history shows

Depending on the archive and metadata state, a history item can show:

- The world and owning configuration.
- Creation time, archive type, and user comment.
- Whether a local archive exists and is readable, or only a cloud copy remains.
- Whether the item is marked important.
- Whether the Full baseline and metadata required by a Smart chain are still available.

If history exists but the local archive is missing, do not restore immediately. Download the archive from the cloud or verify the archive path first.

## Maintenance actions

- Add readable comments to important checkpoints.
- Mark pre-update, milestone, and verified-restore archives as important.
- Open the archive directory from history instead of locating it from memory.
- Use the built-in deletion actions so history and local-file state stay consistent.

## Deletion modes

MineBackup distinguishes:

1. Delete history only.
2. Delete the local archive only.
3. Delete both the local archive and history.

The third option can enable safe deletion for Smart archives. Check important items, middle-chain nodes, and incomplete metadata first. Deleting a file in the file manager does not update history or chain state.

## Decide before restoring

Ask three questions:

1. Do I need the complete directory or only a few files?
2. Are there destination files outside the archive that must remain?
3. Is the current world still running or locked by another process?

Typical choices are:

- Complete archive rollback: `Clean`, with the required restore whitelist.
- Keep files outside the archive: `Overwrite`.
- Repair a few files: `Custom`.
- Roll a Smart chain back to a selected point: consider `Reverse` only after confirming chain integrity.

See [Your first restore](./first-restore) for the procedure. Perform the first drill in a test world with pre-restore backup enabled.

## Cloud history

Cloud synchronization can produce local-only, local-and-cloud, or cloud-only history. A cloud-only item may remain visible in history, but download the archive and as much metadata as possible before restoring.

If metadata synchronization is partial, the archive may have uploaded successfully while Smart-chain state or records remain incomplete. “The file exists in the cloud” does not mean the cloud copy is independently restorable; complete synchronization and verify the chain first.

## Habits that preserve recovery

- Keep at least one independent Full baseline.
- Perform actual Smart-chain restore drills instead of relying only on successful backup logs.
- Create a commented Full archive before major upgrades.
- Check whether a later Smart archive still depends on an item before deleting it.
- After enabling cloud archive, rehearse upload → download → local restore once.
