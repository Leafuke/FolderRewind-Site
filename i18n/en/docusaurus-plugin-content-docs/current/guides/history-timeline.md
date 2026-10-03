---
sidebar_position: 6
title: "History: versions, runs and normal/advanced views"
description: "FolderRewind 1.9 history: versions, runs and normal/advanced views: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# History: versions, runs and normal/advanced views

Open history from configuration management; select config/source and source-version or Backup-Run view. A Run is an operation fact, a Checkpoint configuration state; no-change runs need not create a version.

## Normal view

Filter results, inspect outcomes, comments, Pins, Restore and cloud replicas. Use text/icons, not blue/gold nodes alone to infer integrity. Logical history, local bytes, cloud replicas, diagnostics and materializability are distinct.

## Advanced view

Manage branches, Workspace, Checkpoints, source bindings, safety points and merges. A branch is not a folder label; a Checkpoint can cover several sources. Multiple tips indicate divergence requiring explicit selection/merge rather than newest-time overwrite.

## Restore and Quick Restore

Select a Source Version or complete Checkpoint. The Host assesses representations/dependencies, stages and confirms bindings. Clean reconstructs within managed boundaries; Overwrite applies included content. Partial captures force Overwrite. Ordinary preservation proposals create Derived baselines.

Quick Restore uses the active Workspace branch's unique tip/source version. Already exact yields NoChanges. Divergence, missing sources/dependencies or recovery-required state blocks; it does not select the previous timestamp row.

## Cloud, deletion and rebuilding

Prepare required cloud replicas/closure before Restore. Missing local bytes do not invalidate logical history; do not purge all missing records blindly. Suppression, representation release, local deletion and cloud retirement differ—read each confirmation.

Rebuild indexes from packs rather than guessing branches from old filenames. Protection roots retain dependencies. See [branches/merge](/docs/guides/history-branches) and [safety snapshots](/docs/guides/safety-snapshots).

## One-shot preservation and legacy limits

Ordinary Restore, including its Quick Restore entrypoint, accepts relative files or directories through KnotLink `restore_preserve_paths`. Current state wins over the archive, including current deletions. This differs from the restore whitelist, where archive content at the same path wins. Derived content means the Workspace need not exactly match the original version. Checkout and Merge do not enable ordinary-Restore path or player preservation.

Legacy takeover versions may have unknown deletion boundaries even after verification. They cannot use Clean or serve as exact branch baselines. Review the migration report, recover through non-deleting Overwrite or a new directory, then create a new Full version.

<span id="how-to-open" />
<span id="page-layout" />
<span id="what-you-can-do" />
<span id="filtering-and-visualization" />
<span id="recommended-restore-flow" />
<span id="management-tips" />
<span id="cloud-copy-operations" />
<span id="safe-delete" />
<span id="rebuild-history" />
<span id="faq" />
<span id="view-says-file-not-found" />
<span id="restore-result-is-not-expected" />
<span id="related-links" />
