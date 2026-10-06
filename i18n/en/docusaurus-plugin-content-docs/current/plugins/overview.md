---
sidebar_position: 1
title: "Plugin system overview"
description: "Explore plugin discovery, backup, restore, map and command capabilities, Host responsibilities, compatibility and trusted installation sources."
reviewed_baseline: "1.9-api3.9"
---

# Plugin system overview

Explore plugin discovery, backup, restore, map and command capabilities, Host responsibilities, compatibility and trusted installation sources.

FolderRewind1.9 Plugin System v3 uses a standalone BCL-only SDK, static declarations and capability registration; the current source API is3.6. The Host owns configuration, orchestration, history, retention, cloud ordering, integrity and target writes.

## Responsibilities

Plugins propose discovery/config changes, resolve file policies/scopes, provide consistent sources and folder/version metadata, coordinate restore environments, contribute commands/hotkeys/KnotLink, transform immutable artifacts and materialize them. See all15 contracts in the [API reference](/docs/plugins/developing/plugin-api).

Plugins never save Host configuration directly, rewrite old archives in after-hooks or bypass Safe Restore. Discovery, Kind ownership and state namespaces are separate identities.

## MineRewind

FolderRewind 1.9.6 bundles MineRewind 1.9.8 requiring API 3.9 and contributes instance discovery, drafts, scope, consistency, metadata, restore coordination, preservation and commands/selectors. Verify actual released Host/SDK/plugin versions; old1.8 ZIP plugins are incompatible with v3.

## Install and trust

Catalog and manual `.frplugin` packages undergo static validation. New installs are disabled and first execute after explicit Enable. AssemblyLoadContext isolates dependencies, but plugins execute with ambient user privileges. Curation, hashes and service gating are not a sandbox.

See [management](/docs/plugins/using-plugins), [development](/docs/plugins/developing/quick-start) and [Minecraft](/docs/guides/minecraft/overview).



## Bundled and separate releases

FolderRewind 1.9.6 bundles MineRewind 1.9.8 (API 3.9). The separate plugin Release and official catalog currently provide 1.9.5 (API 3.6), without map preview. Replacing the bundled version with that older package will not add new features. See [read-only preview](/docs/guides/minecraft/world-preview) for the Java map.

<span id="become-a-plugin-developer" />
<span id="install-plugins" />
<span id="minerewind" />
<span id="official-plugin" />
<span id="related-links" />
<span id="what-plugins-can-do" />
