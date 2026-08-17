---
title: Just Enough Accidents
description: Detect high-risk Minecraft states and create MineBackup incident snapshots
---

# Just Enough Accidents

Just Enough Accidents (JEA) is an accident-detection extension for MineBackup. In singleplayer or LAN worlds, it detects high-risk states and asks MineBackup and FolderRewind to create an incident snapshot.

:::warning A snapshot is not an absolute safe point
JEA records the world at the moment a detector fires. It does not guarantee a point before the accident. Low-health and totem detectors may already include damage or a consumed totem.
:::

## Support and prerequisites

| Loader | Minecraft | Additional requirements |
| --- | --- | --- |
| Fabric | 26.1–26.2 | Loader 0.18.4+/0.19.3+, Fabric API, Java 25 |
| NeoForge | 1.21–1.21.8 | NeoForge 21.0.167+, Java 21 |
| Forge | 1.20–1.20.4 | Forge 46+, Java 17 |

All scenarios also require:

- MineBackup 3.1.0+.
- FolderRewind 1.8.0+.
- MineRewind 1.8.0+.
- A singleplayer world or LAN-host permission.

JEA 0.2.0 does not support dedicated servers. On a dedicated server it logs one disabled message, then skips scanning and backup requests. Use the [Just Enough Accidents releases](https://github.com/Leafuke/JustEnoughAccidents/releases) as the final download source.

## Initial detectors

The default detector set includes:

1. Predicted fatal fall.
2. Low air supply.
3. Lava without fire resistance.
4. Low remaining Elytra durability while gliding.
5. Low effective health, including absorption.
6. A successfully triggered totem.
7. A primed creeper near the player.
8. TNT about to explode; underwater TNT is excluded by default.
9. A pet with dangerously low health.
10. Scoreboard requests emitted by data packs or command blocks.

Detections are sent through MineBackup API v2 to create a backup for the current world. After a successful archive, the world owner receives clickable restore text that invokes MineBackup's existing `/mb restore` confirmation flow.

## Cooldown, coalescing, and retention

- Multiple incidents in the same tick merge into one world snapshot.
- After MineBackup accepts a request, JEA enters the default 60-second global cooldown; an immediate rejection does not consume it.
- In-flight requests, cooldown requests, and backend rejections are not queued or retried.
- JEA snapshots share `KeepCount` with normal FolderRewind backups.
- Frequent incidents can normally clean older archives; JEA has no separate quota, fixed slot, or protected slot.

## Scoreboard trigger

JEA does not create the scoreboard objective automatically. A data pack or administrator can run:

```mcfunction
scoreboard objectives add jea_request dummy
scoreboard players add #global jea_request 1
```

JEA merges all values greater than or equal to 1 into one request and resets the `#global` score to 0 before submitting. If cooldown or backend availability prevents the request, the score is not restored or queued.

## Default configuration

The first world session creates `config/just-enough-accidents.json`:

```json
{
  "schemaVersion": 1,
  "enabled": true,
  "cooldownSeconds": 60,
  "backup": {
    "mode": "incremental",
    "compressionMethod": "zstd",
    "compressionLevel": 6
  },
  "detectors": {
    "fatalFall": { "enabled": true },
    "lowAir": {
      "enabled": true,
      "triggerAir": 60,
      "rearmAir": 200
    },
    "lava": { "enabled": true },
    "elytra": {
      "enabled": true,
      "remainingDurability": 10
    },
    "lowHealth": {
      "enabled": true,
      "effectiveHealth": 2.0
    },
    "totem": { "enabled": true },
    "creeper": {
      "enabled": true,
      "normalRadius": 6.0,
      "chargedRadius": 12.0
    },
    "tnt": {
      "enabled": true,
      "radius": 12.0,
      "maxFuseTicks": 40,
      "excludeUnderwater": true
    },
    "petDanger": {
      "enabled": true,
      "radius": 32.0,
      "healthThreshold": 0.25
    }
  },
  "scoreboard": { "enabled": true }
}
```

Configuration is read only at server-session startup; leave and re-enter the world after editing. Invalid JSON, enums, or ranges preserve the original file and disable JEA for the current session.

## Not included in 0.2.0

JEA 0.2.0 does not include:

- periodic safe checkpoints;
- a fixed latest-safe-point slot;
- fatal-damage event detection;
- ordinary fire detection;
- extra explosion detectors for crystals, beds, or respawn anchors;
- pet-death detection;
- automatic restore; or
- dedicated-server support.

The TNT detector above is part of the current detector set; the excluded list refers to additional explosion types.

## Related documentation

- [Minecraft Guide Overview](/en/docs/guides/minecraft/overview)
- [MineBackup Integration Mod](/en/docs/guides/minecraft/minebackup-mod)
- [MineBackupPlugin (Spigot/Paper)](/en/docs/guides/minecraft/minebackup-plugin)
- [Death Rewind](/en/docs/guides/minecraft/death-rewind)
- [FolderRewind filters and backup modes](/en/docs/guides/filters)

Observe one detector, archive, and manual-restore flow in a test world before tuning thresholds for a modpack.
