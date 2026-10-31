---
sidebar_position: 1
title: "Minecraft overview"
description: "Protect Minecraft saves with bundled MineRewind, including discovery, hot backup, player preservation, regions, maps, world merging and game integration."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft overview

Start with one world backup and add automatic saves, maps and in-game shortcuts as you need them. Bundled MineRewind recognizes Minecraft worlds and supplies their domain features.

## Choose your task

| Task | Start here |
| --- | --- |
| Find worlds and save the first backup | [Quick start](/docs/guides/minecraft/quick-start) |
| Back up while playing | [Hot backup](/docs/guides/minecraft/hot-backup) |
| Restore while retaining player position or inventory | [Hot restore and preservation](/docs/guides/minecraft/hot-restore) |
| Protect a selected area | [Region backups](/docs/guides/minecraft/selected-region-backup) |
| Browse terrain or compare historical versions | [World maps](/docs/guides/minecraft/world-preview) |
| Combine builds and terrain from branches | [World merging](/docs/guides/minecraft/world-merge) |

## Java, Bedrock and ordinary folders

Java worlds can use maps, regions, player NBT preservation and game coordination. Bedrock worlds use complete ordinary folder backups; exit the game before operating. A Minecraft project can also contain ordinary folders such as modpack settings, handled through the standard file workflow.

Discovery supports common launcher locations and user-selected launchers, instance libraries, saves roots or individual worlds. Check each draft's paths, edition and scope before creating a project.

## Game-side components

FolderRewind stores archives, history and cloud copies. MineRewind reads worlds and coordinates operations. Game-side components provide commands, save/exit and re-entry, while KnotLink carries requests and status.

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

<MinecraftEcosystem />

Single-player, LAN hosts, modded dedicated servers and Spigot/Paper each have their integration workflow. Prepare components matching the game version and loader, then practice backup, restore and re-entry in a test world.

## Everyday use

The default `Alt+Ctrl+S` requests a backup of the current world; `Alt+Ctrl+Z` requests Quick Restore to the active branch's unique tip. Select a particular version in history when you want earlier content.

Ordinary restore can preserve selected state for every player, with statistics and advancements restored from the backup. Branch operations use branch targets and merge results. See [hot restore](/docs/guides/minecraft/hot-restore) for options and [troubleshooting](/docs/guides/minecraft/troubleshooting) for diagnostics.

<span id="1-save-discovery-and-batch-configuration" />
<span id="2-hot-backup-coordination" />
<span id="3-current-world-hot-restore" />
<span id="4-global-hotkeys" />
<span id="5-knotlink-parameterized-commands" />
<span id="6-optional-player-data-preservation" />
<span id="minerewind-capabilities" />
<span id="next-steps" />
<span id="prerequisites" />
<span id="risks-and-boundaries" />
<span id="typical-combinations" />

<span id="components" />
<span id="setup-and-discovery" />
<span id="live-operations" />
<span id="players-and-regions" />
<span id="java-bedrock-and-ordinary-directories" />
<span id="bundled-and-separate-releases" />
