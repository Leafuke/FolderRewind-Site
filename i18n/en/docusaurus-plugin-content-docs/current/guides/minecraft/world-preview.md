---
sidebar_position: 15
title: "World maps, history previews and comparisons"
description: "Browse current and historical Minecraft Java worlds, compare versions on the map and use cave views, height slices, player navigation and region selection."
reviewed_baseline: "1.10-api3.17"
---

# World maps, history previews and comparisons

Open MineRewind's world map to locate an old build, compare changes between backups or choose an area to protect.

![Compare world versions in the map workspace and inspect chunk changes.](/img/docs/v1-10-0/map-compare-110-en-light-1604.webp)

## Open a current world or historical backup

Enable MineRewind and add a valid Java world source. Open map preview from the source menu in the manager. Select a locally preparable version in history to open a historical map or version comparison.

Historical preview first prepares the backup and dependencies in a temporary folder, then reads the world. Encrypted versions require a password; plugin representations require their materializer. Map browsing is read-only.

## Browse and navigate

- Switch world and dimension, pan and zoom to inspect generated terrain.
- Choose a player or saved position from navigation targets, or enter coordinates.
- Use surface, cave or height-slice views and adjust height for the dimension.
- Select a chunk for details and use the status legend to distinguish loaded, pending, ungenerated and unsupported areas.

Visible areas load progressively, with an overview at distant zoom levels. Zoom into a location and let reading finish for more detail. Refresh after the current world changes.

## Compare two versions

Choose the left and right versions and check their world, dimension and dates. Filter added, deleted or modified chunks by category, then locate them on the map or in the change list.

A partial backup's visible content follows its captured coverage. Read status and coverage messages when interpreting a change. To combine work from two branches, use [world merging](/docs/guides/minecraft/world-merge).

## Select a backup region on the map

In a workspace with region selection, draw an area and check its world, dimension and effective scope before using it in backup settings. The selection becomes the plugin's scope parameters, saved by project settings. See [selected-region backups](/docs/guides/minecraft/selected-region-backup).

## If loading needs attention

Check the world path, MineRewind runtime state and the selected version's local dependencies. Try a dimension with generated data and read chunk details for format or access diagnostics. The plugin provides Java maps; Bedrock saves use the ordinary folder backup workflow.

Developers can read the [spatial preview and comparison contracts](/docs/plugins/developing/plugin-api#spatial-preview).

<span id="read-only-world-map-preview" />
<span id="open-the-map" />

<span id="backups-and-region-selection" />
<span id="if-the-map-does-not-load" />
