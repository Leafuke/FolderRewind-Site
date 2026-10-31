---
sidebar_position: 3
title: "Minecraft selected-region backups"
description: "Select Java world areas on the map or by block coordinates, check dimensions and source scope and restore captured region files with Overwrite."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft selected-region backups

Use a rectangular scope when you want to protect part of a world, such as the area around a build. MineRewind maps block coordinates to the involved region files and creates a partial backup.

## Select the area

Select an area in the [map workspace](/docs/guides/minecraft/world-preview), or choose the plugin scope in backup policy, select overworld, nether or end and enter `x1,z1,x2,z2` per line:

```text
-512,-512,512,512
0,0,511,511
```

Use block positions. Region indexes are `floor(block/512)`: -0.5 maps to -1, 511 to 0 and 512 to 1. Corners may be reversed. The selection expands to involved region-file boundaries.

## Check the input

| Input | Range |
| --- | --- |
| areas text | Up to 32 KiB of UTF-8 |
| Rectangles | Up to 128 effective lines; blanks and `#` comments are skipped |
| Coordinates | Finite values from -30000000 to 30000000 |
| Region files | Up to 4096 deduplicated regions per dimension |
| Line format | Four comma-separated numbers |

Resolve empty scopes, invalid coordinates or ambiguous dimensions using diagnostics before saving. Source scope and project filters narrow the result further. Confirm the effective file preview.

## Included files

Selected regions include matching `.mca` files in each dimension's `region`, `entities` and `poi`, plus required world, player and data files. External large chunks include all `c.*.*.mcc` files in relevant dimension directories, so actual size can exceed rectangle estimates.

Recognized Vanilla, Paper/Spigot and newer dimension layouts are supported. For sibling Paper/Spigot dimensions, select the server root containing them as the source and check their paths.

## Restore and inspect

Region backups use Overwrite, restoring captured content and keeping other current regions. Close the game or finish hot coordination, then inspect dimensions, entities, POI and large chunks in a copy.

Region support is for Java worlds. Close Bedrock and use a complete ordinary file backup. See [world merging](/docs/guides/minecraft/world-merge) to combine branch changes.

<span id="configuration" />
<span id="dimensions-and-directory-layouts" />
<span id="input-limits" />
<span id="related-links" />
<span id="relationship-with-filters" />
<span id="safe-restore-rules" />
<span id="when-a-backup-is-rejected" />

<span id="configure-coordinates" />
<span id="limits" />

<span id="restore" />
<span id="edition-boundary" />
