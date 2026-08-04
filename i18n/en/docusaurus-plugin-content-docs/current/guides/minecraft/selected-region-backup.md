---
sidebar_position: 3
title: Minecraft Selected-Region Backup
description: Select region files by dimension with FolderRewind 1.8 and safely restore a partial world backup
---

# Minecraft Selected-Region Backup

FolderRewind 1.8 can back up only region files within selected ranges of a Minecraft world. This is useful for partitioning protection of very large worlds, but the result is a **partial backup**, not a complete world snapshot.

:::danger Partial backups use Overwrite restore only
For both normal and hot restore, a selected-region backup is forced to **Overwrite**. **Clean** is unavailable because it could delete world files that were never included in the backup.
:::

## Configuration

1. Open **Config Settings** for the Minecraft world.
2. Go to **Backup Policy** and set the backup scope to **Minecraft Selected Regions**.
3. Select the dimensions to protect.
4. Enter one region range per line in `x1,z1,x2,z2` format.
5. Save, run a manual backup, and validate it against a test copy first.

![Minecraft config settings showing the backup type and path fields with path values hidden](/img/docs/guides/minecraft/minecraft-region-config-settings.webp)

For example:

```text
# Rectangle around spawn
-2,-2,2,2

# A second range
10,8,14,12
```

These are `.mca` **region-file coordinates**, not block or chunk coordinates. Either pair of opposite corners may come first.

## Dimensions and directory layouts

Ranges can be selected independently for the Overworld, Nether, and End. FolderRewind recognizes supported world layouts including:

| Dimension | Common directory examples |
|-----------|---------------------------|
| Overworld | `region/`, `entities/`, `poi/` |
| Nether | `DIM-1/region/`, plus corresponding Paper/Spigot world directories |
| End | `DIM1/region/`, plus corresponding Paper/Spigot world directories |

Detection covers legacy Vanilla layout, split-dimension Paper/Spigot layouts, and supported layouts used by Minecraft 26.1 and later. If a directory ambiguously matches multiple layouts, the backup is rejected instead of guessing.

For every selected region, FolderRewind includes the matching `.mca` files from `region`, `entities`, and `poi`, along with referenced external `.mcc` files. It also preserves essential world files needed for a valid restore.

## Input limits

| Item | Limit |
|------|-------|
| Configuration text | 32 KiB maximum |
| Effective range lines | Up to 128 per configuration (blank lines and comments excluded) |
| Coordinate range | `-30000000` to `30000000` |
| Deduplicated region files | Up to 4096 per dimension |
| Line format | Exactly `x1,z1,x2,z2`, with four integers |

Lines beginning with `#` may be used as comments. Out-of-range coordinates, missing or extra fields, non-integers, or an expanded selection above the limit reject the **entire backup**. FolderRewind does not silently skip bad lines and produce an incomplete result.

## Relationship with filters

Selected-region mode replaces the normal backup whitelist with the calculated region scope. Do not rely on a regular whitelist to expand the backup: the region selection is the source of truth for this run's scope.

Exclusion rules should still be used carefully. Reinspect backup contents and repeat a restore test after changing filters or region ranges.

## Safe restore rules

- Normal restore and hot restore are both forced to **Overwrite**.
- **Clean** is unavailable, so unselected regions and other files are not erased first.
- Overwrite restores only packaged content; it does not rewind the rest of the target world to the same point in time.
- Stop server writes before a normal restore. For hot restore, follow MineRewind's world unload and reload flow.
- Before first production use, copy the world and validate dimensions, entities, POI data, and external chunk files.

## When a backup is rejected

Check:

1. Every line uses exactly `x1,z1,x2,z2`.
2. Coordinates, line count, text size, and deduplicated region count are within limits.
3. Selected dimensions exist and the world layout is supported and unambiguous.
4. The world directory is complete and readable by the process account.

Do not remove essential directories mentioned by an error just to bypass validation. Selected-region mode fails closed: a rejection normally means FolderRewind cannot guarantee a safely restorable result.

## Related links

- [Minecraft Overview](./overview)
- [First Backup](../../getting-started/first-backup)
- [First Restore](../../getting-started/first-restore)
- [Filters](../filters)
- [Minecraft Hot Restore](./hot-restore)
