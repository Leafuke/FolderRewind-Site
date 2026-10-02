---
sidebar_position: 20
title: "Branch checkout and file-level merge"
description: "FolderRewind 1.9 branch checkout and file-level merge: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Branch checkout and file-level merge

## Create and switch

In advanced history, create/name a branch from a reliable config Checkpoint. Checkout differs from single-source Restore. Review source mappings and restore stable historical bindings at user-confirmed paths.

Uncommitted work is protected by default with independent safety snapshots. Missing Exact closure, incomplete targets, path conflicts or recovery state block switching. The Workspace records active branch/per-source baselines for future lineage.

## Divergence and merge

Prepare both inputs, common ancestor and necessary cloud replicas. Select the target/input, compute three-way file differences and distinguish no-op/fast-forward from conflict resolution. Choose file versions/allowed resolutions, recompute and confirm.

1.9 uses conservative file-level merge. Minecraft .mca/NBT/stats/advancements remain file conflicts, without chunk/NBT-field semantic merging. Manual world-file splicing is not a supported strategy.

## Apply and failure

Unpacking, resolution, compression, hashes and round-trip checks finish before environment coordination. Only actual mutations require exit/unlock, unless safety captures widen scope; zero-mutation merges bypass exit.

The Host applies/commits under the config operation gate. Pre-commit failures differ from CommittedRecoveryRequired: durable commit happened but recovery is incomplete. Inspect diagnostics/recovery instead of clicking Apply again or automatically rejoining.

## Acceptance

Test branches, multiple tips, uncommitted protection, bindings, conflicts, cancellation, restart recovery and byte equality. Check active branch, Workspace, refreshed history and next-backup lineage.


