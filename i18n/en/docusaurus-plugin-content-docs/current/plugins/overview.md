---
sidebar_position: 1
title: "Plugins and MineRewind"
description: "Explore domain capabilities provided by plugins, protect Minecraft worlds with bundled MineRewind and install extensions from the catalog or local packages."
reviewed_baseline: "1.10-api3.17"
---

# Plugins and MineRewind

Plugins help FolderRewind understand more kinds of data and game saves. The app manages projects, tasks, history, cloud copies and file operations; plugins supply discovery, scope, coordination, previews and domain merging.

## Bundled MineRewind

FolderRewind includes MineRewind for discovering Minecraft saves and creating projects. Java worlds support coordinated hot backups, region scopes, player-state preservation, maps, historical comparisons and semantic merging. Bedrock worlds use complete ordinary file backups; exit the game before operating on them.

| What you want to do | Guide |
| --- | --- |
| Find saves and create a project | [Minecraft quick start](/docs/guides/minecraft/quick-start) |
| Browse terrain and historical changes | [World maps](/docs/guides/minecraft/world-preview) |
| Combine work from branches | [World merging](/docs/guides/minecraft/world-merge) |
| Request operations from the game | [Hot backup](/docs/guides/minecraft/hot-backup), [hot restore](/docs/guides/minecraft/hot-restore) |

## Install and maintain plugins

Open the official catalog in plugin management or install a `.frplugin` from a trusted author. Review its source, version, requested services and description, then enable it and check its runtime state.

Plugins offer different capability combinations. Use the plugin's documentation and runtime state to check feature dependencies. See [plugin management](/docs/plugins/using-plugins) for updating, rolling back and uninstalling, and [Downloads](/download) for bundled and independent release versions.

## Develop an extension

Use the independent public BCL-only SDK. Start with the minimal lifecycle example and add discovery, commands, maps or domain merging. See the [quick start](/docs/plugins/developing/quick-start) and [API reference](/docs/plugins/developing/plugin-api).

<span id="become-a-plugin-developer" />
<span id="install-plugins" />
<span id="minerewind" />
<span id="official-plugin" />
<span id="related-links" />
<span id="what-plugins-can-do" />

<span id="plugin-system-overview" />
<span id="responsibilities" />
<span id="install-and-trust" />
<span id="bundled-and-separate-releases" />
