---
sidebar_position: 3
title: "First restore"
description: "FolderRewind 1.9 first restore: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# First restore

## Select a target

Open config history and select a source version or Checkpoint. Practice with copies; check config/source/path/time/scope/outcome. A list record alone is insufficient without recoverable representation/dependencies.

## Prepare and confirm

Preview/prepare required cloud closure and size/hash checks. Confirm mappings and stopped writers; Minecraft must coordinate when required. Supply encryption credentials and resolve missing providers/sources/recovery states first.

## Modes

- Clean reconstructs within the effective managed boundary, not the entire physical root.
- Overwrite applies captured content without deleting omitted files, potentially retaining later data.
- Partial captures always Overwrite, even with Exact fidelity.

Restore whitelists retain matching current content unless the archive supplies the same path. Safe Restore/pre-restore backup are separate protection options; check the dialog rather than assuming every successful restore creates a long-lived recovery point.

## Verify outcomes

Wait for terminal results and compare files/application loading. NoChanges means no mutation; inspect SuccessWithWarnings. RecoveryRequired/CommittedRecoveryRequired need diagnostics/controlled recovery, not repeated destructive requests.

Quick Restore resolves the active branch tip, not the previous timestamp. See [advanced history](/docs/guides/history-branches). Preservation/whitelist-derived ordinary restores can form Derived baselines.

Check trusted cloud copies before purging missing-local history. Validate copies before production.

## Preservation and legacy checks

To retain current files instead of their archived versions, use the one-shot ordinary-Restore preservation options described in [filters and preservation](/docs/guides/filters#one-shot-file-and-directory-preservation). They also retain current deletions, unlike the restore whitelist. If a migrated version has an unknown deletion boundary, use non-deleting Overwrite or recover to a new directory. Create a new Full backup before Clean or advanced history.

<span id="before-you-start" />
<span id="step-1-enter-the-history-page" />
<span id="step-2-understand-the-history-timeline" />
<span id="step-3-select-a-restore-point" />
<span id="step-4-run-the-restore" />
<span id="step-5-verify-the-restore-result" />
<span id="recommended-safety-settings" />
<span id="troubleshooting" />
<span id="next-step" />
