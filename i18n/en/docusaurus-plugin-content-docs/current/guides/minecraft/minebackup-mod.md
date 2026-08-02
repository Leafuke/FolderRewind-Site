---
sidebar_position: 2
title: MineBackup-Mod (Modded-Server Integration)
description: Current MineBackup-Mod installation, commands, hot backup, hot restore, and dedicated-server Sidecar guide
---

# MineBackup-Mod (Modded-Server Integration)

MineBackup-Mod is the Minecraft-side bridge between MineBackup or FolderRewind and the game runtime. It provides in-game commands, world saves, pre-hot-backup coordination, pre-hot-restore exit, and automatic rejoin after restore.

It cannot run on its own: a host application and a KnotLink connection are required.

## How the components fit together

- **MineBackup / FolderRewind**: stores archives and performs the actual backup/restore operation.
- **MineRewind**: the FolderRewind Minecraft extension for save discovery, configuration creation, and current-world hot flows.
- **MineBackup-Mod**: the in-game bridge for mod-loader servers, coordinating save, exit, and rejoin.
- **MineBackupPlugin**: the alternative integration for Spigot/Paper servers; do not install both as the same server integration.
- **Death Rewind**: periodic checkpoints and death-screen rewind on top of MineBackup API v2.
- **Just Enough Accidents**: accident detection and incident snapshots on top of MineBackup API v2.
- **KnotLink**: transports commands and state between the host, Minecraft extension, and in-game component.

## Support matrix

| Loader | Minecraft | Mapping/runtime notes |
| --- | --- | --- |
| Fabric | 1.21 | Yarn |
| Fabric | 1.21.9–1.21.11 | Mojang |
| Fabric | 26.1–26.1.2 | Official mappings |
| Fabric | 26.2 | Official mappings |
| NeoForge | 1.21 | Parchment |
| NeoForge | 26.1–26.1.2 | Official mappings |
| Forge | 1.20–1.20.4 | Official mappings |

Use [MineBackup-Mod releases](https://github.com/Leafuke/MineBackup/releases) or the relevant mod distribution page for final JAR availability. On Windows, the usual pairing is [FolderRewind](https://apps.microsoft.com/detail/9nwsdgxdqws4) + [MineRewind](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases); the standalone [MineBackup host](https://github.com/Leafuke/MineBackup/releases) is another option.

## Prerequisites and installation

1. Install MineBackup, or FolderRewind with MineRewind.
2. Install the [KnotLink service](https://github.com/KnotLink-Protocol/KnotLinkService/releases). On Windows it provides the local `127.0.0.1:6372/6376` endpoints; use the relevant release notes for other platforms.
3. Download a MineBackup-Mod JAR matching both loader and Minecraft version.
4. Put it in the client `mods` directory for singleplayer/LAN, or in the server `mods` directory for a modded dedicated server. Client installation depends on the features you need.
5. Run the host and Minecraft together, then complete a test backup before relying on automation.

For a Spigot/Paper server, use [MineBackupPlugin (Spigot/Paper Integration)](./minebackup-plugin) instead.

## In-game commands

Commands require permission. Dedicated servers normally require OP; in singleplayer, the world owner runs them.

| Command | Arguments | Description |
| --- | --- | --- |
| `/mb save` | none | Save all players and loaded worlds, similar to `/save-all` |
| `/mb backup` | `[comment]` | Back up the current world with an optional comment |
| `/mb restore` | `[filename]` | Restore the current world, using the latest archive when omitted |
| `/mb confirm` | none | Confirm a restore countdown immediately |
| `/mb stop` | none | Cancel a restore countdown before submission |
| `/mb list backups` | `[current [page]]` | Show a paginated, interactive list for the current world |
| `/mb list configs` | none | List host configurations and IDs |
| `/mb list folders` | `<config_id>` | List folders under a configuration |
| `/mb list backups` | `<config_id> <folder>` | List archives for a target |
| `/mb target backup` | `<config_id> <folder> [comment]` | Back up a non-current-world target |
| `/mb target restore` | `<config_id> <folder> <filename>` | Restore a non-current-world target in singleplayer/LAN |
| `/mb auto start` | `<minutes>` | Start scheduled backups for the current world |
| `/mb auto stop` | none | Stop scheduled backups |
| `/mb help` | `[command]` | Show help and examples |

The current-world `/mb list backups` view includes timestamps, comments, and clickable `[Restore]` buttons. Target restore remains restricted by the operation gate and permissions; dedicated servers reject arbitrary target restore.

## Hot backup flow

When the host needs to back up a running world, the mod:

1. Receives the hot-backup request.
2. Performs a full world save.
3. Freezes auto-save during the backup window.
4. Reports that the world is saved.
5. Lets the host execute the backup.
6. Unfreezes auto-save after completion.

The freeze has a timeout fallback, but this remains a best-effort coordination layer. It cannot repair every permission, process, or communication failure.

## Hot restore flow

Current-world hot restore performs:

1. Handshake and minimum-version validation.
2. Save and exit the current world/session.
3. Wait for world files to be released.
4. Restore the latest or specified archive.
5. Receive the restore terminal state.
6. Rejoin automatically or report the rejoin result.

Because this changes the world currently in use, run a complete “backup → restore → rejoin” drill in a test world and keep an independently restorable full archive.

## Dedicated-server Sidecar restore

Modded dedicated-server restore uses the built-in pure-JDK Sidecar and does not require MineBackupPlugin. The default properties are:

```properties
dedicatedRestore.mode=SIDECAR
dedicatedRestore.restartScript=
dedicatedRestore.sidecarStartTimeoutSeconds=5
dedicatedRestore.worldReleaseTimeoutSeconds=8
dedicatedRestore.operationTimeoutSeconds=3600
```

Before restore, the mod validates the restart script, session directory, and operation state. It saves all players, writes a handoff file, and starts the Sidecar. The Sidecar confirms its KnotLink subscription, waits for the parent JVM to exit, repeatedly checks world-file release, and runs the restart script once only after an explicit success, failure, or cancellation terminal state.

Unknown outcomes, disconnects, and timeouts keep the server offline rather than treating silence as safe success. Do not use a panel or wrapper that restarts the JVM immediately after process exit.

## Common boundaries

- If the host is not running or KnotLink is not connected, in-game commands report communication failures.
- A specified archive must exist.
- Hot restore depends on handshake, world-exit, and file-release timeouts.
- After a successful dedicated-server restore, the restart script only starts the server; players reconnect after it is ready.
- `Death Rewind` and JEA share MineBackup retention and do not provide independent permanent slots.

## Related documentation

- [Minecraft Guide Overview](./overview)
- [MineBackupPlugin (Spigot/Paper Integration)](./minebackup-plugin)
- [Death Rewind](./death-rewind)
- [Just Enough Accidents](./just-enough-accidents)
- [KnotLink and Integration Mod](./knotlink-mod)
- [Hot Backup Mechanism](./hot-backup)
- [Hot Restore Mechanism](./hot-restore)
