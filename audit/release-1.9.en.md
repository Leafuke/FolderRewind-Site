---
slug: v{{VERSION}}-release
title: FolderRewind v{{VERSION}} released
authors: [leafuke]
tags: [release]
description: FolderRewind 1.9 introduces immutable native history, branches and safety points, reviewed game discovery, cloud replica recovery and standalone Plugin API 3.6 with migration guidance.
---

Find official metadata and assets for FolderRewind {{VERSION}} in the [Release]({{RELEASE_URL}}).

{/* truncate */}

## Changes

- Full, Smart and Rolling: immutable new Rolling archives preserve existing payloads.
- Native history, configuration Checkpoints, branches, file-level merge and safety points.
- Reviewed discovery Beta and source scopes for user-owned configurations.
- Cloud history union, trusted replica preparation and recovery into new directories.
- Plugin System v3, independent Abstractions3.6.0, static.frplugin, typed settings and Catalog.
- Bundled MineRewind 1.9.5: launcher/Bedrock discovery and Java ordinary-Restore all-UUID preservation, block-coordinate scopes and config-level coordination.

## Upgrade and use

Back up config/history/plugin data/archives/encryption materials. Old v2 code is not loaded; data migrates under Host control. Use pre-upgrade copies to roll back to old versions.

[Install](/docs/getting-started/installation) · [Upgrade](/docs/getting-started/v1-9-upgrade) · [Plugin migration](/docs/plugins/developing/migration-v2-v3) · [History](/docs/guides/history-timeline) · [Discovery](/docs/guides/game-discovery) · [Cloud](/docs/guides/cloud-archive)

GitHub provides x64/ARM64 Setup EXE/SHA-256; verify actual Store availability. Minecraft merge stays file-conservative and partial captures force Overwrite. Contract fixtures are not game-loading acceptance.
