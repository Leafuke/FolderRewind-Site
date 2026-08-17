---
title: Death Rewind
description: Rewind to the latest MineBackup archive from the death screen in Fabric singleplayer worlds
---

# Death Rewind

Death Rewind is an add-on mod for MineBackup. It periodically asks MineBackup to create checkpoints and adds a “Rewind To A Few Minutes Ago” entry to the death screen in singleplayer worlds.

Since 2.0, Death Rewind no longer connects directly to FolderRewind and no longer duplicates save, auto-save freeze, restore, or rejoin logic. MineBackup API v2 coordinates those operations.

:::warning This is for singleplayer/LAN hosts
Death Rewind 2.0 supports Fabric 26.1–26.1.2 singleplayer worlds and LAN hosts. It does not support dedicated servers, and an ordinary client joining a LAN world cannot initiate world restore.
:::

## Support and prerequisites

| Item | Current baseline |
| --- | --- |
| Minecraft | 26.1–26.1.2 |
| Loader | Fabric Loader 0.18.4+ |
| Dependencies | Fabric API, MineBackup 3.1.0+ |
| Java | Java 25 |
| Runtime | Singleplayer worlds and LAN hosts |
| Current version | Death Rewind 2.0 |

You also need a working MineBackup or FolderRewind + MineRewind backup pipeline. Use the [Death Rewind releases](https://github.com/Leafuke/DeathRewind/releases) as the final download source.

## Installation

1. Install and configure FolderRewind or MineBackup.
2. If you use FolderRewind, install MineRewind and create a `Minecraft Saves` configuration.
3. Install Fabric Loader, Fabric API, and MineBackup 3.1.0 or newer.
4. Put the Death Rewind JAR for Fabric 26.1 in the same `mods` directory.
5. Enter a singleplayer world; the first launch creates `config/death-rewind.json`.

Fabric Loader refuses to load Death Rewind when MineBackup is missing or below 3.1.0.

## Periodic checkpoints

Death Rewind measures the interval in actual server ticks. The timer does not advance while:

- singleplayer is paused;
- the world is not running;
- a Death Rewind checkpoint request is already in flight; or
- the death screen is open.

When the interval is reached, Death Rewind requests a backup for the current world through MineBackup API v2 and passes its full/incremental mode and compression settings.

Only one Death Rewind request can exist at a time. If MineBackup is busy, the backend fails, or the request throws an error, the request is not queued or retried immediately; the next complete cycle tries again.

Death Rewind's timer and MineBackup's `/mb auto` schedule are independent. Both can be enabled, but MineBackup's world-operation gate prevents concurrent changes to the same world.

## Rewinding from the death screen

The death screen adds a “Rewind To A Few Minutes Ago” button below the vanilla buttons. It waits for a 20-tick anti-misclick delay and is enabled only when:

- the game is hosted by the local integrated server;
- MineBackup reports that the current world is operable;
- MineBackup has no other backup, catalog, or restore operation; and
- Death Rewind has not already submitted a restore request.

Clicking it immediately restores the **global latest archive** for the current world. It does not use the `/mb restore` chat countdown. The latest archive may have been created by Death Rewind, JEA, MineBackup auto-backup, or an administrator, so it is not guaranteed to be a Death Rewind checkpoint.

MineBackup owns the entire lifecycle from saving the world and disconnecting the player through FolderRewind restore and client rejoin. If the request is rejected or fails, Death Rewind shows the reason and releases the `forceDeathRewind` lock on vanilla buttons.

## Default configuration

The first world session creates `config/death-rewind.json`:

```json
{
  "schemaVersion": 1,
  "enabled": true,
  "intervalMinutes": 5,
  "showBackupInfo": true,
  "forceDeathRewind": false,
  "backup": {
    "mode": "incremental",
    "compressionMethod": "zstd",
    "compressionLevel": 6
  }
}
```

| Field | Meaning |
| --- | --- |
| `enabled` | Enable Death Rewind for new server sessions |
| `intervalMinutes` | Checkpoint interval, from 1 to 1440 minutes |
| `showBackupInfo` | Show checkpoint results in chat |
| `forceDeathRewind` | Temporarily disable vanilla death buttons while rewind is available or submitted |
| `backup.mode` | `full` or `incremental` |
| `backup.compressionMethod` | `LZMA2`, `Deflate`, `BZip2`, or `zstd` |
| `backup.compressionLevel` | 1–22 for `zstd`; 0–9 for the other algorithms supported by the implementation |

Configuration is read only when the server session starts. Leave and re-enter the world after editing it. Invalid JSON, field types, enums, or ranges disable Death Rewind for that session without silently rewriting the original file.

## Archive retention and boundaries

Death Rewind checkpoints, JEA snapshots, and normal MineBackup/FolderRewind backups share the same archive-retention policy. Death Rewind has no independent quota, fixed slot, or protected archive.

If the first periodic checkpoint has not completed and FolderRewind has no archive for the current world, death-screen rewind fails. It also cannot promise an absolutely safe point before death because the latest archive may already contain damage or other world changes.

## Related documentation

- [Minecraft Guide Overview](/en/docs/guides/minecraft/overview)
- [MineBackup Integration Mod](/en/docs/guides/minecraft/minebackup-mod)
- [MineBackupPlugin (Spigot/Paper)](/en/docs/guides/minecraft/minebackup-plugin)
- [Just Enough Accidents](/en/docs/guides/minecraft/just-enough-accidents)
- [Hot Restore Mechanism](/en/docs/guides/minecraft/hot-restore)

Run a full “create checkpoint → die → rewind → rejoin” drill in a test world before relying on the extension.
