---
sidebar_position: 3
title: "Plugin API reference"
description: "Reference the public 3.17.0 SDK lifecycle, nineteen capabilities, typed filters, spatial preview and comparison, semantic merging and Host services."
reviewed_baseline: "1.10-api3.17"
---

# Plugin API reference

FolderRewind 1.10.0 supports **Plugin API 3.17**. The public NuGet package is **FolderRewind.Plugin.Abstractions 3.17.0**, targeting `net10.0`. API 3.x retains assembly identity `3.0.0.0`.

A plugin is compatible when its API major matches and its requested minor is no newer than the Host's. Application, plugin product and SDK package versions each serve their own release and compatibility purpose.

## Lifecycle and registration

`IFolderRewindPlugin` provides `ActivateAsync(IPluginActivationContext, CancellationToken)` and `DeactivateAsync(CancellationToken)`. Activation reads settings, configuration and folder snapshots, registers declared capabilities and returns `PluginActivationResult`.

The Host validates registrations and state patches, commits atomically and then exposes the capabilities. Register one implementation per capability contract; one instance can implement several interfaces. Use DataStore during committed runtime and the supplied snapshots during activation.

## All capabilities

| Interface | Capability name | Responsibility |
| --- | --- | --- |
| `IDiscoveryCapability` | `Discovery` | Candidates and configuration drafts |
| `IConfigReconciliationCapability` | `ConfigReconciliation` | Revision-bound configuration proposals |
| `IFilePolicyCapability` | `FilePolicy` | Required inclusion and exclusion rules |
| `IBackupScopeCapability` | `BackupScope` | Parameterized backup scopes |
| `IBackupConsistencyCapability` | `BackupConsistency` | Consistency coordination and source leases |
| `IFolderMetadataCapability` | `FolderMetadata` | Current-source details |
| `IVersionMetadataProviderCapability` | `VersionMetadataProvider` | Capture-time version metadata |
| `IRestoreCoordinatorCapability` | `RestoreCoordinator` | External environment coordination |
| `IRestoreStagingPreparationCapability` | `RestoreStagingPreparation` | Ordinary restore staging proposals |
| `IPluginCommandCapability` | `PluginCommand` | Commands and default shortcuts |
| `IKnotLinkIntegrationCapability` | `KnotLinkIntegration` | Remote commands and signals |
| `IProviderStateMigrationCapability` | `ProviderStateMigration` | Versioned provider-state migration |
| `IBackupArtifactTransformerCapability` | `BackupArtifactTransformer` | Immutable artifact transformation |
| `IBackupCompletionObserverCapability` | `BackupCompletionObserver` | Observation after commit |
| `IRestoreMaterializerCapability` | `RestoreMaterializer` | Isolated workspace materialization |
| `ISpatialPreviewCapability` | `SpatialPreview` | Read-only maps, tiles and point details |
| `ISpatialComparisonCapability` | `SpatialComparison` | Spatial changes between fixed inputs |
| `ISpatialScopeSelectionCapability` | `SpatialScopeSelection` | Map selections to backup scope parameters |
| `IMergeProviderCapability` | `MergeProvider` | Domain merge analysis and result building |

Manifest capability strings use camelCase, such as `spatialComparison` and `mergeProvider`. `IDiscoveryDefinitionCatalog`, `IKnotLinkTargetResolver` and `IArtifactFileViewProvider` extend their corresponding capability implementations.

## Identity and Host services

Use `PluginId` for products, `ConfigKindRef` for domain kinds, `DiscoveryProviderId` for discovery providers and `StateOwnerId` for state owners. Names serve display; stable IDs serve routing and persistence.

`IPluginHostServices` exposes Configs, Backups, Restores, History, Notifications, KnotLink, DataStore, TemporaryStorage and Logger. Declare required services in `requestedHostServices`. Operation contexts provide scoped Artifact read and staging services.

Plugins execute in-process with the current user's permissions. Choose trusted code; service declarations describe and gate formal Host API access.

## Typed file rules

`PathFilterRule` contains `Pattern`, `Target` and `SemanticsVersion`. Targets are `Any`, `File` and `Directory`. New rules use semantics version 2; legacy strings are read as version 1.

```csharp
var caches = new PathFilterRule("cache", PathFilterTarget.Directory);
var temporaryFiles = new PathFilterRule("*.tmp", PathFilterTarget.File);
```

`FilePolicyResult.TypedRequiredExclusions` and `TypedRequiredInclusions` carry typed rules. `MergeInputBoundary.TypedFilterRules` participates in historical coverage assessment. Rules operate within source scope. See [filter examples](/docs/guides/filters).

## Spatial preview, comparison and selection {/* #spatial-preview */}

`DescribeAsync` returns worlds, layers, view modes and height information. `RenderAsync` returns premultiplied BGRA tiles; `InspectAsync` returns point details. Navigation targets can include height, and `SpatialPreviewMode` describes modes such as surface and caves.

`SpatialPreviewSource.FixedInput` binds history to Host-prepared fixed content. `IsPartial`, coverage information and tile `ContentState` describe captured coverage and reading state. `CacheBudgetBytes` supplies the Host's cache budget. `IsFinal=false` lets the Host schedule bounded refinement of visible tiles.

Comparison uses `DescribeComparisonAsync` and paged `CompareAsync` results for categories and `SpatialChange`, with locations represented by `SpatialSubjectLocation`. `CloseComparisonAsync` and preview's `CloseAsync` release session resources idempotently.

`ResolveSelectionAsync` maps a selection to `BackupScopeId`, parameters, effective bounds and diagnostics. The Host reviews and saves configuration. See the [map guide](/docs/guides/minecraft/world-preview).

## Domain merging {/* #semantic-merge */}

The manifest's `mergeProviders` declares `MergeProviderId`, contract version, compatible kinds and versioned policies. Implement `IMergeProviderCapability`. In `AnalyzeAsync`, read fixed three-way inputs and use `IMergePlanWriter` for output groups, path claims and conflict subjects.

The Host persists analysis and user decisions before calling `BuildAsync`. Read decisions through `IMergeDecisionReader`, then reuse, generate or delete claimed paths through `IMergeOutputWorkspace`. The Host validates results, commits History and writes the destination.

Query coverage with `InspectPathAsync` and `CheckCoverageAsync`, handling unknown or filtered content through explicit diagnostics. Policy versions are independent of product versions; saved sessions bind their policy and fixed inputs.

## Cancellation and results

Observe both `OperationCancellation` and `PluginLifetime` and release leases, streams and temporary resources. Results include Success, SuccessWithWarnings, NoChanges, Canceled, Failed, Blocked, RecoveryRequired and CommittedRecoveryRequired.

`CommittedRecoveryRequired` means history has committed and recovery still has work to finish. Follow the controlled recovery diagnostics. During disable, the Host revokes routes, cancels and drains calls, then invokes Deactivate. `RequiresRestart` identifies resources retained until restart.

Continue with [capability design](/docs/plugins/developing/capabilities), [artifact contracts](/docs/plugins/developing/artifacts) and [the quick start](/docs/plugins/developing/quick-start).

<span id="backup-filters-and-scopes" />
<span id="backup-preparation-and-folder-details" />
<span id="core-interface-and-lifecycle" />
<span id="exceptions-threads-and-compatibility" />
<span id="full-backuprestore-takeover" />
<span id="ifolderrewindbackupfilterprovider" />
<span id="ifolderrewindbackuppreparationprovider" />
<span id="ifolderrewindbackupscopeprovider" />
<span id="ifolderrewindconfigaugmenter" />
<span id="ifolderrewindfolderdetailsprovider" />
<span id="ifolderrewindrestoreinterceptor" />
<span id="knotlink-and-hotkeys" />
<span id="manifest-and-target-framework" />
<span id="related-links" />
<span id="restore-interception-and-config-augmentation" />

<span id="plugin-api-39-reference" />

<span id="identities-and-snapshots" />
<span id="host-services" />
<span id="cancellation-outcomes-and-diagnostics" />
<span id="disable-and-settings-transitions" />
<span id="discovery-scope-in-api-39" />
