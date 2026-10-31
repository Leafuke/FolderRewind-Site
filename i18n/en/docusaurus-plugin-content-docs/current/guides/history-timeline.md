---
sidebar_position: 6
title: "Browse history and manage versions"
description: "Find versions by project, source and backup run, check recovery status, protect milestones, prepare cloud copies and preview archive cleanup."
reviewed_baseline: "1.10-api3.17"
---

# Browse history and manage versions

History brings a folder's saved progress together. Choose a project and source to find versions, add comments, view branches or restore content.

![Browse a source's active branch and recoverable versions.](/img/docs/v1-9-6/history-en-light-1604.webp)

## Find a version

Normal view supports filtering, comments, protection and restore. Browse versions for a source or inspect participating sources in a backup run. Unchanged runs can reuse existing versions.

Advanced view shows source branches, Checkout and Merge. Check the active branch before selecting a version. Each source retains its own branches and checkpoints.

## Prepare recovery

Select a version and inspect scope, recovery status and archive diagnostics. Prepare a local archive or cloud replica and complete dependencies, then review destination and protection options. Clean restores the managed state; Overwrite keeps content outside its coverage.

For Java worlds, open [historical maps and comparisons](/docs/guides/minecraft/world-preview). See [cloud recovery](/docs/guides/cloud-recovery) to recover into a separate folder.

## Quick Restore

Quick Restore uses the active branch's unique tip. A source without an active branch can select its most recent recoverable legacy backup. An already exact state returns `NoChanges`. Choose a specific version for an earlier state.

## Protect and clean up

Protect important versions to keep them beyond count-based cleanup. Counts apply to the latest N recoverable versions per source; see [retention](/docs/guides/backup-modes).

Read the impact preview before deleting. The app rebuilds incremental dependencies as needed to keep later versions, reporting progress and storage changes. Rebuilding needs temporary space. Follow recovery prompts after an interruption.

Presentation hiding, local archive release and cloud replica retirement have their own confirmations. For missing archives, check cloud copies and legacy adoption reports before choosing maintenance actions.

## Branches and current files

Use [branch switching and merging](/docs/guides/history-branches) for alternative approaches. Ordinary restore also offers [current-file preservation](/docs/guides/filters#restore-preserve-paths). Review operation results in the [notification center](/docs/guides/notifications).

<span id="cloud-copy-operations" />
<span id="faq" />
<span id="filtering-and-visualization" />
<span id="how-to-open" />
<span id="management-tips" />
<span id="page-layout" />
<span id="rebuild-history" />
<span id="recommended-restore-flow" />
<span id="related-links" />
<span id="restore-result-is-not-expected" />
<span id="safe-delete" />
<span id="view-says-file-not-found" />
<span id="what-you-can-do" />

<span id="normal-and-advanced-views" />
<span id="check-whether-a-version-is-restorable" />

<span id="protection-and-cleanup" />
<span id="missing-files-and-legacy-history" />
<span id="keep-current-files" />
