---
sidebar_position: 20
title: "Capabilities, configuration and operation contracts"
description: "Design discovery, scope, consistency and restore capabilities using snapshots, leases, cancellation and one-shot continuations."
reviewed_baseline: "1.9-api3.9"
---

# Capabilities, configuration and operation contracts

Design discovery, scope, consistency and restore capabilities using snapshots, leases, cancellation and one-shot continuations.

These are API 3.9 ownership and operation boundaries; use the SDK and [API overview](/docs/plugins/developing/plugin-api) for signatures.

## Discovery and reconciliation

Discovery returns candidates, drafts and diagnostics; the Host commits under user policy. Definition IDs are nonempty and ordinal-unique within a provider. ResolveDefinitionId returns a declared ID or null.

Reconciliation receives ConfigSnapshot/reason and returns ConfigChangeProposal with ExpectedRevision. AddFolder, UpdateFolder, RemoveFolder, ProviderOptions, ArtifactTransformPolicy and UserPolicy changes undergo Host validation and review. Describe Ownership and Impact accurately and never save configurations directly.

Provider State is located by StateOwnerId + ConfigId + optional FolderId. Migration includes ExpectedSchemaVersion and new data for atomic Host commit.

## File policy, scope and consistency

Config Kind ownership selects runtime behavior; discovery identity does not. File policy and scope cannot expand the source boundary. Scope exposes a parameter schema and returns IncludePatterns, Readiness and diagnostics. Invalid input blocks rather than silently dropping rules.

An IConsistencyLease supplies a SourcePath valid for enumeration/archive and must be disposed. IsStableSourceView is true only for a genuinely stable view. Prefer may degrade under Kind policy with durable warnings; Require blocks unavailable consistency.

## Restore, Checkout and Merge

IRestoreCoordinatorCapability receives all affected Folders, OperationId, TargetIdentity and WorkspaceOperationKind. Stop external writes before calling ContinueMutationAsync once; never nest another Host mutation. The continuation closes after return and already-started mutation drains.

Merge unpacking, choices, compression and verification occur before coordination. Only sources with actual mutations participate, unless safety captures enlarge scope. Zero-mutation operations bypass game exit. RecoveryRequired/CommittedRecoveryRequired prohibit automatic rejoin.

## Ordinary-Restore staging

IRestoreStagingPreparationCapability runs only for ordinary Restore. Current/Target are locked read-only views; IRestoreSourceView optionally exposes the managed relative inventory. Return RestoreStagedFileProposal; the Host validates the whole batch before staging writes. Limits:4096 files/64 MiB; error diagnostics block.

Player preservation override is null/true/false. SupportsPlayerDataOverride defaults false; unsupported explicit overrides must be rejected rather than silently delegated to old methods. Modified ordinary restores create a Derived baseline. Checkout/Merge do not enable this preservation flow.

## One-shot preservation service options

`RestoreRequestOptions.RestorePreservePaths` provides relative selectors for ordinary Restore/Quick Restore, with current bytes and deletions taking precedence. The Host validates scope and applies staging; plugins cannot write live sources directly. Unlike `RestoreWhitelist`, archive content does not win at the same path. Checkout/Merge do not use this option. See [filter limits](/docs/guides/filters#one-shot-file-and-directory-preservation).
