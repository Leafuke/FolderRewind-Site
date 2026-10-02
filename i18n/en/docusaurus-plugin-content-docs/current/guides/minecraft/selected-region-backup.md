---
sidebar_position: 3
title: "Minecraft selected-region backups"
description: "FolderRewind 1.9 minecraft selected-region backups: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Minecraft selected-region backups

MineRewind1.9 selected-regions takes **block-coordinate** rectangles, creating partial captures. Inputs are not .mca region coordinates or chunk coordinates.

## Configure coordinates

Select the plugin scope in backup policy, explicitly choose overworld/nether/end and enter x1,z1,x2,z2 per line:

```text
# Cross boundaries: region -1,0,1
-512,-512,512,512
# One nonnegative region
0,0,511,511
```

Finite floating values in[-30000000,30000000] are accepted. region=floor(block/512): -0.5→-1,0→0,511→0,512→1. Corners may be reversed; never truncate negatives toward zero.

## Limits

| Input | Limit/rule |
|---|---|
| UTF-8 areas text |32 KiB |
| Effective rectangles |128, excluding blanks/# comments |
| Coordinates | Finite and within world bounds |
| Deduplicated regions |4096 per dimension |
| Format | Four comma-separated numbers, no extra fields |

Empty/invalid/oversized/ambiguous input blocks the operation rather than producing silently incomplete content. Early regions/selectedRegions compatibility fields are not current areas UI semantics.

## Included files

Selected .mca files in region/entities/poi plus essential world/player/data rules are included. For external large-chunk safety, current code includes **all c.*.*.mcc** in the relevant dimension directories, not just referenced files parsed from selected .mca. Size can exceed a rectangle estimate.

Supported recognized Vanilla/Paper/Spigot/26.1 layouts are accepted; ambiguity blocks. SourceScope/config filters can narrow further; scope never expands the source boundary. Inspect archive inventory after changes.

## Restore

Partial captures always Overwrite in ordinary/hot Restore. Clean cannot delete omitted regions; other regions do not return to the same time. Stop writes or complete coordination. Verify dimensions/entities/POI/large chunks and real loading on copies first.

<span id="configuration" />
<span id="dimensions-and-directory-layouts" />
<span id="input-limits" />
<span id="relationship-with-filters" />
<span id="safe-restore-rules" />
<span id="when-a-backup-is-rejected" />
<span id="related-links" />
