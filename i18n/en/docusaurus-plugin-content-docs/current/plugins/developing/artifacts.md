---
sidebar_position: 20
title: "Artifact transformation, materialization and version metadata"
description: "FolderRewind 1.9 artifact transformation, materialization and version metadata: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Artifact transformation, materialization and version metadata

Artifacts are immutable Host-managed payload nodes, distinct from Source Version, Representation and Replica. ArtifactFormatRef owner/format ID and format version identify content, not extensions or plugin product versions.

## Transform transactions

Declare ArtifactFormats, ArtifactTransformers, RestoreStrategies and matching capabilities. Transformers declare ArtifactRead/ArtifactTransformStaging services plus compatible Kinds, core modes, completeness and failure behavior.

IBackupArtifactTransformerCapability receives completed Primary, candidates, ExpectedGraphRevision and parameters. Allocate new staged artifacts, write relative files, and return an ArtifactGraphPatch with AddedArtifacts, dependencies and result root. The Host validates revision, format, completeness, DAG, hashes and staging boundaries before commit. Never rewrite old archives or commit persistent history yourself.

KeepPrimaryWithWarnings preserves the core result with warnings. RequireTransform cannot report success without the required transform. Behavior must match declarations.

## Completion observation

IBackupCompletionObserverCapability observes committed Version, Representation, root Artifact, GraphRevision, CoreOutcome and CloudQueueCommitted. Return diagnostics without editing archives. hasBackupCompletionObserver must agree with declarations and registration.

## Restore materialization

IRestoreMaterializerCapability handles topologically sorted artifacts within declared format/version/completeness/mode ranges. Declare ArtifactRead and RestoreMaterializationWorkspace. Write relative paths only into the isolated Workspace; the Host owns preflight, integrity, Safe Restore, progress/cancellation and target mutation. Exact materialization does not permit Clean for a partial capture.

## Two metadata contracts

IFolderMetadataCapability describes the live folder for UI. IVersionMetadataProviderCapability reads the same stable capture and returns bounded SchemaId/SchemaVersion/JSON payloads that become immutable version metadata. Do not reread a live world and present its values as historical metadata.

## Verification

Exercise failed transforms, stale revisions, missing dependencies, incompatible formats, invalid paths, cancellation, recovery and post-commit failures. Unpacking alone does not certify game loading. Minecraft .mca/NBT data remains conservative file conflicts, without semantic merge promises.


