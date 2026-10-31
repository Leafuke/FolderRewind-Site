---
sidebar_position: 16
title: "Merge Minecraft worlds"
description: "Merge Java world branches with MineRewind, choose Conservative or Terrain first, resolve chunk conflicts on the map and review the result."
reviewed_baseline: "1.10-api3.17"
---

# Merge Minecraft worlds

Branches let you try a build, terrain changes or a different approach separately. To bring changes together, select MineRewind's Minecraft semantic merge in the merge workspace and work through the changes by world and chunk.

## Prepare both sides

Enable MineRewind and create complete backups and branches for the Java world. In advanced history, select the target and source branches and prepare their common ancestor and required local archives.

Open the [merge workspace](/docs/guides/history-branches), then choose Minecraft semantic merge and a policy for this session. File merging is the default. Semantic merging works with ordinary world backups; you can leave the experimental semantic backup setting as it is.

## Choose a policy

| Policy | How it combines world data | When to use it |
| --- | --- | --- |
| Conservative | Handles chunk component bundles; ordinary entity changes can require choosing one side across every dimension of the world | You want explicit review of world state and entity relationships |
| Terrain first | Combines terrain and POI by chunk, retaining ordinary entities from the target across all dimensions; chunks with embedded entities and their POI also retain the target side | Your focus is builds or terrain, with an entity inspection afterward |

Both policies handle known timing, cache and scheduled-update differences. After Terrain first, check the positions of mobs, vehicles and other entities against the resulting terrain.

## Resolve conflicts on the map

1. Read the analysis and locate work by world, dimension and change category.
2. Select chunks in the map or list and inspect the common ancestor, current side and source side.
3. Choose from the options available for each item. Review all dimensions when a decision applies to the whole world.
4. Open the result review, inspect the final files and resolve remaining issues before applying to the target branch.

Follow format and coverage diagnostics by preparing complete inputs or choosing the indicated side. Applying becomes available once blocking items are resolved.

## Check the applied result

Before applying, confirm that current work has a backup or safety snapshot. The app stages, builds and verifies the result, coordinating game state when it writes to the source. Saved merge sessions can be reopened after leaving the page.

After completion, inspect the target branch, historical version and world contents. Try a copied world first and check build edges, structures crossing chunks, entities, POI and each dimension before continuing normal play.

For map browsing and historical version comparisons, see [world map preview](/docs/guides/minecraft/world-preview).
