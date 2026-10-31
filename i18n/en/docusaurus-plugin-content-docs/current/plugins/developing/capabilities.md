---
sidebar_position: 4
title: "Capabilities and operation contracts"
description: "Design discovery, filtering, consistency, restore, map and merge capabilities using revisions, fixed inputs, staged output and operation cancellation."
reviewed_baseline: "1.10-api3.17"
---

# Capabilities and operation contracts

Plugins supply domain knowledge; the Host owns configuration persistence, orchestration, history, transactions and destination writes. Align declarations, runtime registrations and requested services with the implementation.

## Discovery and reconciliation

Discovery returns candidates, `ConfigDraft` and `FolderDraft`. The Host assigns identities and commits confirmed drafts. `DiscoveryRequest.IncludeKnownLocations` controls machine-known locations; a user-selected scan stays within the supplied roots.

Reconciliation returns a revision-bound `ConfigChangeProposal` for source, path, Provider State or policy changes. The Host validates revision, field ownership and impact before committing. Recompute stale proposals.

## File policy, scope and consistency

`IFilePolicyCapability` supports compatible string rules and typed `PathFilterRule` values. `IBackupScopeCapability` resolves parameters into effective include patterns and readiness. Both operate within SourceScope.

Consistency returns an `IConsistencyLease` covering enumeration and capture, followed by asynchronous disposal. `SupportsBoundedSourceView` and `SourceViewLimits` provide a budgeted stable view. `SupportsCoordinationOnly` and `CoordinationOnly` let the Host prepare inputs while the plugin coordinates external writes; `SourcePath` stays at the requested source.

`Prefer` allows warning-bearing fallback according to Kind policy, while `Require` requires consistency conditions. Report `IsStableSourceView` accurately so the Host can choose the capture path.

## Restore and branch operations

`IRestoreCoordinatorCapability` receives affected sources, operation ID, target identity and operation kind. Coordinate external programs, invoke `ContinueMutationAsync` once and finish external cleanup.

Prepare merge analysis, decisions, building and verification outside coordination. Coordinate the sources when applying writes. If recovery is required, retain the game state until Host recovery finishes.

## Preservation during ordinary restore

`IRestoreStagingPreparationCapability` reads locked Current and Target inputs and returns relative staging proposals. The Host validates up to 4096 file operations and 64 MiB of current content before staging them.

Player preservation uses null, true and false for inherit, enable and disable. Declare `SupportsPlayerDataOverride` for explicit overrides. `RestoreRequestOptions.RestorePreservePaths` supplies one-time relative selections; see [filters](/docs/guides/filters#restore-preserve-paths). These settings belong to ordinary restore; Checkout and Merge use branch targets.

## Maps and domain merging

SpatialPreview supplies read-only imagery and details, SpatialComparison compares fixed inputs, and SpatialScopeSelection returns parameters for the Host to save. MergeProvider analyzes three-way inputs and proposes output; the Host persists user decisions and applies the result.

Use the [API reference](/docs/plugins/developing/plugin-api) for declarations and cover cancellation, missing inputs, stale revisions and resource disposal.

<span id="capabilities-configuration-and-operation-contracts" />

<span id="restore-checkout-and-merge" />
<span id="ordinary-restore-staging" />
<span id="one-shot-preservation-service-options" />
