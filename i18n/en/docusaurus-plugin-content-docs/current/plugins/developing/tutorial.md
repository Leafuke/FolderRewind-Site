---
sidebar_position: 2
title: "Tutorial: the GameRewind plugin"
description: "Use the independent GameRewind example to implement discovery, file policies and commands, and learn identities, Host services and coordination extensions."
reviewed_baseline: "1.10-api3.17"
---

# Tutorial: the GameRewind plugin

GameRewind uses public API 3.17 to identify user-provided directories containing `save.dat`, propose configuration drafts, exclude caches and request backups through the Host. It also provides an ECHO command for integration exercises.

## Complete source

import CodeBlock from '@theme/CodeBlock';
import GameSource from '!!raw-loader!@site/examples/plugins/GameRewind/Plugin.cs';
import GameManifest from '!!raw-loader!@site/examples/plugins/GameRewind/manifest.json?raw';

<CodeBlock language="csharp" title="GameRewind/Plugin.cs">{GameSource}</CodeBlock>
<CodeBlock language="json" title="manifest.json">{GameManifest}</CodeBlock>

## Turn directories into drafts

Discovery checks `UserRoots` and returns `ConfigDraft` and `FolderDraft`. The Host assigns source identities and saves projects after confirmation. The attached `IDiscoveryDefinitionCatalog` supplies a stable DefinitionId, aliases and external IDs for discovery and targeted presets.

Use `DiscoveryRequest.IncludeKnownLocations` when deciding whether to include machine-known locations. User-selected scans stay within supplied roots. Stable candidate identities support later reconciliation.

## File policy and commands

FilePolicy returns required exclusions, combined with project filters within source scope. The backup command reads an explicit configId and requests the operation through Backups. ECHO declares its own command and parameters.

Use `IConfigReconciliationCapability` for revision-bound configuration proposals reviewed and committed by the Host.

## Add game coordination

To support hot backup of a writing game, implement `IBackupConsistencyCapability` and coordinate a stable source for the lease. For external restore coordination, implement `IRestoreCoordinatorCapability`, prepare the game environment and call the Host continuation once.

Preserve current data such as player state with relative proposals from `IRestoreStagingPreparationCapability`, validated and staged by the Host. Branch switching and merging use their own target semantics. See the [API reference](/docs/plugins/developing/plugin-api) for map and domain merge extensions.

## Build and practice

```powershell
node scripts/pack-plugin.mjs GameRewind
```

Create a test directory with `save.dat`, install and enable the plugin, run discovery and review its draft. Back up, edit files and restore, then exercise failure and cancellation and inspect diagnostics and disposal.

See [capability design](/docs/plugins/developing/capabilities) for more operation contracts.

<span id="0-project-initialization" />
<span id="1-config-type-registration--auto-discovery" />
<span id="2-backup-hooks-snapshots--filtering" />
<span id="3-restore-hooks-preserving-user-data" />
<span id="4-plugin-settings" />
<span id="5-hotkeys" />
<span id="6-parameterized-knotlink-commands" />
<span id="7-packaging--publishing" />
<span id="after-backup-clean-up-the-snapshot" />
<span id="auto-discover-save-directories" />
<span id="batch-create-configs" />
<span id="before-backup-create-a-snapshot" />
<span id="complete-source-code" />
<span id="create-the-main-class-skeleton" />
<span id="create-the-project" />
<span id="filter-unwanted-files" />
<span id="next-steps" />
<span id="register-config-types" />
<span id="write-manifestjson" />

<span id="tutorial-gamerewind-v3-plugin" />

<span id="discovery-and-ownership" />

<span id="hot-backup-and-restore-boundaries" />
<span id="build-and-test" />
<span id="known-locations-and-selected-roots" />
