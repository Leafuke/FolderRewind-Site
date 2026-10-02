---
sidebar_position: 1
title: "Minecraft overview"
description: "FolderRewind 1.9 minecraft overview: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Minecraft overview

FolderRewind1.9 uses MineRewind v3. Bundled candidate1.9.3 requires API3.5; game-side mods/server plugins have independent versions. Verify public artifacts and actual game-loading acceptance before production use.

## Components

FolderRewind owns configuration/history/archives/cloud/Safe Restore. MineRewind supplies instance discovery, scopes, consistency, metadata, coordination and staging proposals. MineBackup-Mod/MineBackupPlugin saves/freezes/exits game worlds; Death Rewind/JEA request operations through game-side APIs.

Single-player/LAN owner, modded dedicated servers and Spigot/Paper have different exit/rejoin semantics. Server Sidecar does not reconnect clients automatically. Consult component release matrices.

## Setup and discovery

Install a trusted .frplugin and explicitly enable it. Static defaults: AutoDiscoverSaves=true, AutoCreateConfigs=false, PreservePlayerData=false. The old EnableHotBackup switch is absent in v3. Review per-instance drafts/Kind/paths before creation; plugins do not save Host configs directly.

## Live operations

Active worlds use held session.lock. Backup consistency leases coordinate saves/stable sources: Prefer may degrade with warnings; Require blocks unavailable consistency. Restore coordinates writers and cannot silently bypass required providers.

Alt+Ctrl+S/Alt+Ctrl+Z request backup/Quick Restore. The Host resolves the active branch's unique local tip, not a guaranteed previous time. KnotLink supports six current_save selectors inheriting core arguments.

## Players and regions

Ordinary Restore can preserve selected NBT fields for all UUIDs; stats/advancements still restore, cross-26.1 preservation blocks, and Checkout/Merge do not preserve players. Region areas use block coordinates and partial captures force Overwrite; see [regions](/docs/guides/minecraft/selected-region-backup).

Start with [setup](/docs/guides/minecraft/quick-start), [hot backup](/docs/guides/minecraft/hot-backup), [hot restore](/docs/guides/minecraft/hot-restore) and [troubleshooting](/docs/guides/minecraft/troubleshooting).

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

<MinecraftEcosystem />

<span id="typical-combinations" />
<span id="minerewind-capabilities" />
<span id="1-save-discovery-and-batch-configuration" />
<span id="2-hot-backup-coordination" />
<span id="3-current-world-hot-restore" />
<span id="4-global-hotkeys" />
<span id="5-knotlink-parameterized-commands" />
<span id="6-optional-player-data-preservation" />
<span id="prerequisites" />
<span id="risks-and-boundaries" />
<span id="next-steps" />
