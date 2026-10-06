---
sidebar_position: 2
title: "Tutorial: GameRewind v3 plugin"
description: "Learn discovery, file policies and commands through the buildable GameRewind example, with operations performed through Host services."
reviewed_baseline: "1.9-api3.9"
---

# Tutorial: GameRewind v3 plugin

Learn discovery, file policies and commands through the buildable GameRewind example, with operations performed through Host services.

GameRewind is a buildable API 3.6 example. It discovers supplied roots containing save.dat, proposes drafts, excludes cache files, and asks the Host to back up a config or run a side-effect-free ECHO.

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

## Known locations and selected roots

The GameRewind example checks only supplied `UserRoots` containing `save.dat`; it defines no known-location catalog. A production provider may merge read-only machine hints when `IncludeKnownLocations=true`; false keeps selected-root scope. Do not scan entire drives, write launcher settings or persist candidates directly as configurations.

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
