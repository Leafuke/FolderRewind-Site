---
sidebar_position: 1
title: Minecraft Guide Overview
description: Minecraft save protection with FolderRewind, MineRewind, and MineBackup integration components
---

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

# Minecraft Guide Overview

MineRewind is the official FolderRewind Minecraft extension. It provides backup and restore while Minecraft is running, save discovery, hotkeys, and current-world coordination.

This section also covers several direct integration components. Each one targets a different runtime: MineBackup-Mod for mod-loader servers, MineBackupPlugin for Spigot/Paper, Death Rewind for singleplayer death-screen rewind, and Just Enough Accidents for incident detection.

![FolderRewind, MineRewind, and Minecraft integration component relationship diagram](/img/docs/guides/minecraft/minebackup-ecosystem.png)

*The `Time Machine` question mark is a future/placeholder extension outside this documentation scope. This guide covers only MineBackup-Mod, MineBackupPlugin, Death Rewind, and Just Enough Accidents.*

<MinecraftEcosystem />

## Typical combinations

| Goal | Recommended combination | Key boundary |
| --- | --- | --- |
| Windows singleplayer | FolderRewind + MineRewind + MineBackup-Mod | Requires KnotLink; hot restore exits and rejoins the world |
| Modded dedicated server | FolderRewind or MineBackup + MineBackup-Mod | Uses the built-in Sidecar; MineBackupPlugin is not required |
| Spigot/Paper dedicated server | FolderRewind or MineBackup + MineBackupPlugin | Players reconnect manually after restore |
| Death-screen rewind | MineBackup-Mod + Death Rewind | Fabric 26.1–26.1.2 singleplayer/LAN hosts only |
| Incident snapshots | MineBackup-Mod + JEA | JEA 0.2.0 does not support dedicated servers |

The host, Minecraft integration, and add-on must use compatible versions. Use the project release pages as the final download source:

- [MineBackup-Mod releases](https://github.com/Leafuke/MineBackup/releases)
- [MineBackupPlugin releases](https://github.com/Leafuke/MineBackup-Plugin/releases)
- [Death Rewind releases](https://github.com/Leafuke/DeathRewind/releases)
- [Just Enough Accidents releases](https://github.com/Leafuke/JustEnoughAccidents/releases)
- [MineRewind releases](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases)
- [KnotLink Service releases](https://github.com/KnotLink-Protocol/KnotLinkService/releases)

## MineRewind capabilities

### 1. Save discovery and batch configuration

MineRewind can detect and create configurations for:

- `.minecraft/saves/*`
- `.minecraft/versions/<version>/saves/*`
- `versions/<version>/saves/*`
- `<version>/saves/*`
- `saves/*`
- `mods` folders under the corresponding version can also be included.

The plugin labels the configuration type `Minecraft Saves` and adds required filters such as `session.lock`.

![Scan .minecraft and create world configurations automatically](/img/docs/guides/minecraft/auto-scan-worlds-result.png)

### 2. Hot backup coordination

Hot coordination is selected when:

- a world file is occupied, such as a locked `level.dat`; or
- a command explicitly requests forced hot backup.

When conditions are met and KnotLink is available, MineRewind handshakes with the Minecraft-side component, waits for the world to flush, and then enters the backup pipeline. Handshake failures and timeouts are logged and fall back to normal backup behavior according to the plugin strategy.

### 3. Current-world hot restore

MineRewind supports this current-world restore chain:

1. Handshake with the integration component.
2. Ask it to save and exit the current world.
3. Wait for world files to be released.
4. Restore the latest or specified backup.
5. Send a rejoin signal and wait for the result.

This is the central differentiator of the Minecraft workflow, but it cannot bypass file locks, permissions, or timeouts.

### 4. Global hotkeys

- `Alt+Ctrl+S`: back up the current active world.
- `Alt+Ctrl+Z`: hot-restore the current active world.

You can remap these in the host settings.

### 5. KnotLink parameterized commands

MineRewind extends host commands through parameterized protocol v2:

- `cmd=BACKUP;current_save=true;...`
- `cmd=RESTORE;current_save=true;...`
- `cmd=LIST_BACKUPS;current_save=true`
- `preserve_player_data=true` as a restore override.

### 6. Optional player-data preservation

With `PreservePlayerData` enabled, the plugin can extract player data before restore and write it back to `level.dat` afterward. This is useful when rolling back world construction while trying to preserve player state, but it must be tested in a disposable world first.

## Prerequisites

- A FolderRewind version that satisfies MineRewind's `MinHostVersion`.
- A compatible Minecraft integration component and KnotLink for hot restore.
- Choose MineBackup-Mod or MineBackupPlugin for the server type; do not mix the two server-integration paths.

## Risks and boundaries

- Hot restore depends on integration state; handshake, save, exit, file-release, or rejoin timeouts cancel the flow.
- Specified-backup restore requires the file to exist.
- Selected-region backups are partial, so normal and hot restore force `Overwrite`.
- Death Rewind restores the global latest archive, which may have been created by another component.
- JEA records an incident scene and does not guarantee a pre-accident safe point.
- Always run a manual drill in a test world before relying on automation.

## Next steps

- New users: [Minecraft Quick Start](./quick-start).
- Mod-loader integration: [MineBackup-Mod](./minebackup-mod).
- Spigot/Paper integration: [MineBackupPlugin](./minebackup-plugin).
- Death-screen rewind: [Death Rewind](./death-rewind).
- Incident snapshots: [Just Enough Accidents](./just-enough-accidents).
- Protect large worlds by range: [Selected-Region Backup](./selected-region-backup).
- Backup details: [Hot Backup Mechanism](./hot-backup).
- Restore details: [Hot Restore Mechanism](./hot-restore).
- Integration protocol: [KnotLink and Integration Mod](./knotlink-mod).
- Troubleshooting: [Troubleshooting](./troubleshooting).
