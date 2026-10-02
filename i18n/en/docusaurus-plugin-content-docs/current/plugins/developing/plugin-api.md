---
sidebar_position: 3
title: "Plugin API 3.5 reference"
description: "FolderRewind 1.9 plugin api 3.5 reference: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Plugin API 3.5 reference

Public BCL-only contracts live in `FolderRewind.Plugin.Abstractions`, targeting `net10.0`. Package 3.5.0 represents API 3.5; assembly identity remains 3.0.0.0. Compatibility requires equal majors and a Host minor at least as high as the requested minor, independently of the app version.

## Lifecycle and registration

`IFolderRewindPlugin` exposes `ActivateAsync(IPluginActivationContext, CancellationToken)` and `DeactivateAsync(CancellationToken)`. Product, service and capability facts are static manifest data. The Host validates and commits the state patch in `PluginActivationResult`.

Activation reads settings and config/folder snapshots, and registers at most one implementation per capability contract. Compose internal multiplicity yourself. Registration and manifest sets must match; capabilities are unavailable before commit, and activation cannot use DataStore.

## All capabilities

| Interface | Manifest capability | Responsibility |
|---|---|---|
| `IDiscoveryCapability` | `Discovery` | Discovery candidates and config drafts |
| `IConfigReconciliationCapability` | `ConfigReconciliation` | Revision-bound change proposals |
| `IFilePolicyCapability` | `FilePolicy` | Required file policy |
| `IBackupScopeCapability` | `BackupScope` | Parameterized scope and readiness |
| `IBackupConsistencyCapability` | `BackupConsistency` | Disposable consistency source lease |
| `IFolderMetadataCapability` | `FolderMetadata` | Live folder details |
| `IVersionMetadataProviderCapability` | `VersionMetadataProvider` | Metadata from the same stable capture |
| `IRestoreCoordinatorCapability` | `RestoreCoordinator` | Config-level coordination and once-only continuation |
| `IRestoreStagingPreparationCapability` | `RestoreStagingPreparation` | Bounded ordinary-Restore staging proposals |
| `IPluginCommandCapability` | `PluginCommand` | Commands and default hotkeys |
| `IKnotLinkIntegrationCapability` | `KnotLinkIntegration` | Commands, arguments, signals and execution |
| `IProviderStateMigrationCapability` | `ProviderStateMigration` | Versioned opaque provider-state migration |
| `IBackupArtifactTransformerCapability` | `BackupArtifactTransformer` | Controlled immutable artifact transformation |
| `IBackupCompletionObserverCapability` | `BackupCompletionObserver` | Read-only completion observation |
| `IRestoreMaterializerCapability` | `RestoreMaterializer` | Materialization into an isolated workspace |

`IDiscoveryDefinitionCatalog` extends a Discovery implementation; `IKnotLinkTargetResolver` extends KnotLink integration. Neither is registered or declared as a separate capability.

## Identities and snapshots

PluginId identifies the product; ConfigKindRef is OwnerId + KindId; DiscoveryProviderId identifies discovery; StateOwnerId namespaces opaque state. Equal text does not make roles interchangeable. Display names, paths and load order do not establish ownership.

ConfigRevision binds proposals. Settings use JsonElement; Provider State includes a location and schema version. Exchange snapshots, drafts, patches, requests, results and descriptors, never writable Host models.

## Host services

IPluginHostServices provides Configs, Backups, Restores, History, Notifications, KnotLink, DataStore, TemporaryStorage and Logger. requestedHostServices gates the formal façade. Artifact services arrive in operation requests and also require declarations.

Plugins execute in-process with ambient user privileges. Service gating, hashes and AssemblyLoadContext are not an OS/.NET sandbox.

## Cancellation, outcomes and diagnostics

Respect OperationCancellation and PluginLifetime, dispose leases/staging resources, and avoid detached work. Readiness is Ready/Degraded/Blocked. Outcomes are Success, SuccessWithWarnings, NoChanges, Canceled, Failed, Blocked, RecoveryRequired and CommittedRecoveryRequired.

CommittedRecoveryRequired means durable commit happened but subsequent recovery is incomplete. Do not automatically retry destructive work or rejoin a game. PluginDiagnostic carries Code, Severity, Capability, Owner and Arguments; log prose is not a stable interface.

## Disable and settings transitions

The Host removes routing, cancels lifetime, drains operations and calls DeactivateAsync. A bounded timeout isolates the session logically and reports RequiresRestart; physical unloading may wait for restart. Enabled Intent differs from Active, and Safe Mode preserves it.

See the [tutorial](/docs/plugins/developing/tutorial), [settings schema](/docs/plugins/developing/settings-schema) and [command integration](/docs/plugins/developing/knotlink-api).

<span id="core-interface-and-lifecycle" />
<span id="manifest-and-target-framework" />
<span id="backup-filters-and-scopes" />
<span id="ifolderrewindbackupfilterprovider" />
<span id="ifolderrewindbackupscopeprovider" />
<span id="backup-preparation-and-folder-details" />
<span id="ifolderrewindbackuppreparationprovider" />
<span id="ifolderrewindfolderdetailsprovider" />
<span id="restore-interception-and-config-augmentation" />
<span id="ifolderrewindrestoreinterceptor" />
<span id="ifolderrewindconfigaugmenter" />
<span id="knotlink-and-hotkeys" />
<span id="full-backuprestore-takeover" />
<span id="exceptions-threads-and-compatibility" />
<span id="related-links" />
