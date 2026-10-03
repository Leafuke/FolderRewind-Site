---
sidebar_position: 3
title: "Source management, renaming and historical bindings"
description: "FolderRewind 1.9 source management, renaming and historical bindings: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Source management, renaming and historical bindings

## Add and scope

Add directories/subdirectories or reviewed discovery resources. Stable Source IDs differ from paths/display names. Edit All/Include and preview effective files; source/destination overlap blocks.

## Rename

Use the source menu and review source/archive/related local metadata and config/automation references before the transaction. Failure attempts rollback; incomplete rollback requires path/config review before new operations.

Renaming does not rewrite immutable historical identities or physically rename all cloud objects. Old Version/Source IDs and saved Replica locators remain facts. Inspect repaired local locators instead of batch-renaming archives in Explorer.

## Historical bindings

When Restore/Checkout needs a missing source, confirm a path and reinstate its original stable identity. Exporting to a new directory differs from restoring a historical source binding; matching labels are insufficient.

## Verify

Check paths/scopes/automation, old materializability and new lineage; verify old/new cloud copies. Rediscovery must preserve manual edits through review.

## Failed saves

Interactive configuration changes in 1.9.3 save asynchronously and roll back on failure. Wait for the result, inspect diagnostics and reloaded paths, scopes and identities; UI input alone does not establish persisted configuration. Retain error logs, resolve permissions or disk issues and save again.

<span id="where-to-rename" />
<span id="name-and-conflict-validation" />
<span id="what-the-transaction-migrates" />
<span id="cloud-objects-are-not-physically-renamed" />
<span id="post-rename-checklist" />
<span id="related-links" />
