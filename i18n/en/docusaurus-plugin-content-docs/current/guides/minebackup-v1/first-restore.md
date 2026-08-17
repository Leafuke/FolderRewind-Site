---
sidebar_position: 6
title: Your First Restore
description: Safely rehearse history archives, restore methods, and fallback strategy in MineBackup 1.16.1
---

# Your First Restore

Perform the first restore in a test world or copy of the target directory. Restore changes the destination, and a running world may continue writing files. Do not use the only production save for the first drill.

## Standard flow

1. Confirm that the target world is closed, or explicitly use the hot-restore workflow.
2. Open history and select an archive known to exist.
3. Review its type, comment, timestamp, and local/cloud status.
4. Choose a restore method and decide whether to create a pre-restore backup.
5. Wait for the task to finish and inspect the log and history.
6. Open the test world and verify important files and game state.

## Four restore methods

| Method | Behavior | Suitable for |
| --- | --- | --- |
| `Clean` | Cleans the destination before restoring; deletion-whitelisted items are kept | Returning the destination close to a complete archive state |
| `Overwrite` | Overwrites archive contents without proactively deleting extra destination files | Ordinary overwrite, partial archives, or a conservative choice |
| `Reverse` | Finds Smart changes newer than the selected point and applies them in reverse | Specific cases that roll a Smart chain back to a selected node |
| `Custom` | Extracts only the files or directories in the input list | Repairing `level.dat`, region files, or one configuration |

Custom entries are comma-separated. To extract an entire directory, use the `*` suffix shown by the UI. For a first drill, prefer Clean or Overwrite rather than Reverse.

## Backup before restore

When `backupBefore` is enabled, MineBackup creates a safety backup of the current destination before applying the selected archive. Keep it enabled for production worlds, especially before Clean, Reverse, or custom restores.

If the world is still occupied, an ordinary restore may be blocked. Do not force-terminate the game merely to release files. Save and exit normally, or follow the coordinated flow in [Hot backup and snapshots](/en/docs/guides/minebackup-v1/hot-backup) and [KnotLink v2 integration](/en/docs/guides/minebackup-v1/knotlink-integration).

## Partial archive safety

If an archive contains only part of the source directory, Clean cannot reconstruct a complete destination from information outside the archive. Prefer Overwrite; for dangerous Clean cases MineBackup may require an additional confirmation or reject the operation.

Similarly, an external custom archive for a running world is not automatically a safe hot-restore input. Confirm the current world, companion version, and archive source before using hot restore.

## Success criteria

- Important destination files match the selected point in time.
- The game can read the world without obvious leftover writes or corruption.
- History still shows the state before and after the restore.
- The pre-restore safety backup can be selected again if needed.

If the result is wrong, stop, restore the pre-restore backup, and then choose a more explicit archive or method. Do not repeatedly overwrite the same damaged target with several archives.
