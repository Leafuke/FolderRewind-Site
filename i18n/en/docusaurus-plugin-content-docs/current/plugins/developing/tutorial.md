---
sidebar_position: 2
title: "Tutorial: GameRewind v3 plugin"
description: "FolderRewind 1.9 tutorial: gamerewind v3 plugin: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Tutorial: GameRewind v3 plugin

GameRewind is a buildable API 3.5 example. It discovers supplied roots containing save.dat, proposes drafts, excludes cache files, and asks the Host to back up a config or run a side-effect-free ECHO.

## Complete source

import CodeBlock from '@theme/CodeBlock';
import GameSource from '!!raw-loader!@site/examples/plugins/GameRewind/Plugin.cs';
import GameManifest from '!!raw-loader!@site/examples/plugins/GameRewind/manifest.json?raw';

<CodeBlock language="csharp" title="GameRewind/Plugin.cs">{GameSource}</CodeBlock>
<CodeBlock language="json" title="GameRewind/manifest.json">{GameManifest}</CodeBlock>

## Discovery and ownership

Inspect explicit roots and return ConfigDraft/FolderDraft, never write config.json. The Host assigns managed identities and commits according to the user's creation policy. Unreadable or unmarked roots are not forcibly included. The example does not recursively scan disks.

DiscoveryDefinitionCatalog supplies stable DefinitionId, aliases and external IDs for game discovery and targeted presets. It is not another capability. Production candidate identities must support reconciliation; display titles are insufficient.

## File policy and commands

FilePolicy returns required exclusions within the Host source/filter boundary. The backup command requires configId and uses Backups instead of running an archive engine itself. ECHO declares its own metadata rather than taking over Host BACKUP.

## Hot backup and restore boundaries

The sample does not coordinate a running game or preserve player data. IBackupConsistencyCapability must provide an appropriate lease and stable source; copying a directory under active writes does not prove consistency. IRestoreCoordinatorCapability coordinates the external environment while the Host performs once-only mutation.

IRestoreStagingPreparationCapability proposes relative files for ordinary Restore; never write live paths after restore. Checkout/Merge do not invoke player preservation. IConfigReconciliationCapability proposes revision-bound changes; recompute stale proposals.

## Build and test

```powershell
node scripts/pack-plugin.mjs GameRewind
```

Create a test directory with save.dat, install and review declarations, enable, discover and review drafts, then back up and restore test content. Check diagnostics and resource release on failure/cancellation. Stop writers before testing real game data.

See [capability contracts](/docs/plugins/developing/capabilities) and the [API reference](/docs/plugins/developing/plugin-api).

<span id="0-project-initialization" />
<span id="create-the-project" />
<span id="write-manifestjson" />
<span id="create-the-main-class-skeleton" />
<span id="1-config-type-registration--auto-discovery" />
<span id="register-config-types" />
<span id="auto-discover-save-directories" />
<span id="batch-create-configs" />
<span id="2-backup-hooks-snapshots--filtering" />
<span id="before-backup-create-a-snapshot" />
<span id="after-backup-clean-up-the-snapshot" />
<span id="filter-unwanted-files" />
<span id="3-restore-hooks-preserving-user-data" />
<span id="4-plugin-settings" />
<span id="5-hotkeys" />
<span id="6-parameterized-knotlink-commands" />
<span id="7-packaging--publishing" />
<span id="complete-source-code" />
<span id="next-steps" />
