---
sidebar_position: 20
title: "Switch and merge branches"
description: "Keep alternative approaches for a source, switch branches, compare text and file results, import resolved files and continue saved merge sessions."
reviewed_baseline: "1.10-api3.17"
---

# Switch and merge branches

Use branches to keep alternative approaches: continue everyday work on one branch and try a change on another. Advanced history lets you switch to a branch or merge changes into a target branch.

![The merge workspace brings changed files, text differences and conflict choices together.](/img/docs/v1-10-0/merge-110-en-light-1604.webp)

## Create and switch branches

Select a project and source in history, open advanced view and create a named branch from a complete recoverable version. Each source manages its own branches.

Select the destination branch, review the source path and uncommitted work, then run Checkout. Choose protection in the confirmation or make a manual backup to keep current work. After switching, check the active branch and files. Subsequent backups continue along that branch.

For adopted legacy backups, restore into a test folder and create a new Full backup as a baseline for everyday branch operations. See [data migration](/docs/guides/data-migration#legacy-upgrade).

## Open the merge workspace

Select the current target branch and the branch to merge from, then prepare their common ancestor and archives. The workspace lists changed files, automatic results and conflicts awaiting your decisions.

File merging is the default. For a Minecraft Java world, you can choose [semantic merging](/docs/guides/minecraft/world-merge) for this session and work by world and chunk.

## Compare text and choose results

1. Select a file in the change list and read the text differences in the two-column view.
2. Keep the current or source version for a conflict, or choose another available outcome such as deletion.
3. To resolve text yourself, prepare a file in your editor and import it as the result for that item.
4. Apply a choice to similar conflicts in a batch, then review important files individually.

Unfinished merge sessions are saved. Return through the merge entry in history to reopen the session and continue.

## Review and apply

Open result review and inspect the files that will be written, replaced or deleted. Confirm the target branch, current path and protection options before applying.

Extraction, result building and verification happen in staging. When writing to the source, the app coordinates external programs and commits the result. An operation that only advances history can finish directly.

After completion, check the files and new target-branch history. Restore whitelists, player preservation and one-time preservation belong to Restore; branch operations apply the merge result.

## Continue after an issue

For missing archives, prepare local or cloud copies and their dependencies. If recovery is requested, save the logs and follow the app's recovery diagnostics before further operations. Two small text files make a useful first exercise for automatic merging, conflict choices and reopening a session.

<span id="branch-checkout-and-file-based-merging" />
<span id="prepare-branches" />
<span id="check-out-a-branch" />
<span id="resolve-differences-in-the-merge-workspace" />
<span id="verify-results-and-handle-failures" />
