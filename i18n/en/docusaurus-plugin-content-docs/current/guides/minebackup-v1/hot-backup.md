---
sidebar_position: 12
title: Hot Backup and Hot Restore
description: Running-world coordination, snapshots, hotkeys, and safety boundaries in MineBackup 1.16.1
---

# Hot Backup and Hot Restore

Hot workflows are for worlds that are still running and may have locked files. They depend on occupancy detection, KnotLink, the companion mod, and bounded waits. They are a best-effort coordination layer, not a guarantee against every lock or communication failure.

## Default hotkeys

The default global hotkeys are:

- `Alt+Ctrl+S`: back up the currently detected active world.
- `Alt+Ctrl+Z`: restore the active world to its latest backup.

You can rebind them in Settings. If the current desktop session cannot provide global hotkeys, MineBackup shows a capability state and diagnostic; ordinary backup and restore should still work.

## Hot-backup flow

When MineBackup detects an occupied world file such as `level.dat`, or the user explicitly requests hot backup, it attempts to:

1. Handshake with the companion mod and check its version.
2. Request a world save and wait for `WORLD_SAVED`.
3. Run the ordinary backup in the safe window, using the snapshot root when required.
4. Release the integration-side wait or freeze after completion.

If handshake, save confirmation, or version checks fail, MineBackup may fall back to a direct snapshot or ordinary backup. Check the log; “the task ended” does not prove that game state was fully coordinated.

## Hot-restore flow

Hot restore changes the world currently in use and is more dangerous:

1. Handshake and check the companion version.
2. Send the save-and-exit request and wait for `WORLD_SAVE_AND_EXIT_COMPLETE`.
3. Wait for the world directory and `level.dat` to be released.
4. Restore the latest or selected archive.
5. Send the restore result.
6. Ask the mod to rejoin the world and wait for `REJOIN_RESULT`.

MineBackup uses a state machine to prevent concurrent hot restores. A second request may be ignored until the first returns to the idle state.

## Preconditions and limits

- An identifiable active world and a usable archive must exist.
- MineBackup-Mod must be at least `3.0.0`; older versions cannot participate in the complete hot workflow.
- KnotLinkService must meet the MineBackup-supported version; service and port boundaries are described in [KnotLink v2 integration](./knotlink-integration).
- An external custom archive is not automatically a safe hot-restore input for a running world.
- After a failure, confirm whether the world exited and files were released before switching back to ordinary restore.

## First drill

1. Create a test world and keep an independent Full archive.
2. Test ordinary backup and restore after closing the game.
3. Test `Alt+Ctrl+S` hot backup.
4. List history and confirm the latest archive before testing `Alt+Ctrl+Z`.
5. Check rejoin status, world state, and logs.

Do not repeatedly trigger a timed-out operation. Return to ordinary backup/restore first, then diagnose the integration.
