---
sidebar_position: 5
title: "Artifact transformation, incrementals and materialization"
description: "Implement immutable artifact transforms, incremental input and isolated materialization, with fixed file views for history and Host-managed dependencies."
reviewed_baseline: "1.10-api3.17"
---

# Artifact transformation, incrementals and materialization

An Artifact is an immutable payload node managed by the Host. Plugins identify content through an owner-qualified `ArtifactFormatRef` and format version. The Host manages storage protection, dependencies, integrity and lifecycle.

## Declarations and transformation

Declare formats, transformers, restore strategies and services in the manifest. `IBackupArtifactTransformerCapability` receives Primary, parameters and an expected graph revision. Read inputs through ArtifactRead, create relative files in ArtifactTransformStaging and return an `ArtifactGraphPatch`.

The Host validates formats, dependencies, revision, hashes and staging boundaries before committing. `KeepPrimaryWithWarnings` can retain the core result with diagnostics; `RequireTransform` requires successful transformation.

## Incremental input

With `supportsIncrementalInput`, receive an `ArtifactIncrementalInput` containing the Host-selected capture ID, input kind, boundary fingerprint, baseline version and representation, and added, modified and deleted paths. `Full` and `ChangesOnly` describe physical capture input.

The Host selects a trusted baseline and checkpoint. The plugin builds new reconstruction recipes and dependencies from fixed input while older artifacts remain intact. MineRewind's lossless Full and incremental representations use these capabilities, with world semantic merging declared separately.

## Materialization and file views

`IRestoreMaterializerCapability` receives a fixed topologically sorted artifact set. Read through ArtifactRead and write relative paths into RestoreMaterializationWorkspace. The Host verifies and applies destination changes, using Overwrite for partial captures.

A materializer can also implement `IArtifactFileViewProvider` to open a read-only `IArtifactFileView` over the fixed dependency closure. File entries contain relative paths, sizes, hashes and recipe references; streams reconstruct through the same decoder. The Host retains read leases until views and streams are disposed, supporting historical comparisons and previews.

## Completion observation and metadata

`IBackupCompletionObserverCapability` receives committed versions, representations, root Artifacts, graph revision and cloud queue state, and returns observer diagnostics.

`IFolderMetadataCapability` describes the live source. `IVersionMetadataProviderCapability` reads the same stable capture and returns bounded JSON with SchemaId and SchemaVersion, stored with the version.

## Validation

Cover Full and ChangesOnly input, deletion lists, missing dependencies, stale revisions, invalid paths, cancellation and recovery after commit. Load domain-format results in the real application as well. See the [domain merge reference](/docs/plugins/developing/plugin-api#semantic-merge).

<span id="artifact-transformation-materialization-and-version-metadata" />
<span id="transform-transactions" />
<span id="completion-observation" />
<span id="restore-materialization" />
<span id="two-metadata-contracts" />
<span id="verification" />
