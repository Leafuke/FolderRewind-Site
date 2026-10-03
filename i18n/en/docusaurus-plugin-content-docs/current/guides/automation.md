---
sidebar_position: 3
title: "Automated backup tasks"
description: "FolderRewind 1.9 automated backup tasks: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Automated backup tasks

## Prerequisites

Verify manual backups/scopes/restores before enabling config automation. Tasks respect config gates, provider readiness and cancellation; avoid another installation/writer acting on the same data.

## Triggers and targets

Use minute intervals, month/day/hour/minute schedules, startup, selected sources, unlock conditions and repeated-no-change stop. Month/day0 means every month/day. One trigger records source outcomes/Run without necessarily creating a Checkpoint.

FileUnlocked monitors a relative path's locked→released transition, not repeated unlocked state. Minecraft examples use session.lock; do not assume level.dat is reliably locked. The actual writer must expose a detectable lock.

## No-change and retention

Repeated no-change can disable automation; changes reset the counter. Inspect and explicitly re-enable. KeepCount governs Checkpoints; Pins/branches/Workspace/safety/dependencies may retain more. Smart chain limits/Full baselines do not replace restore testing.

## Cloud and diagnostics

Cloud transfer is separate from local success. Distinguish NoChanges/SuccessWithWarnings/Blocked/canceled/failed. Unavailable Require consistency blocks; Prefer degradation retains warnings.

Test startup/interval/scheduled boundaries, target choice, unlock transitions, no-change stop, cancellation and busy operations before unattended use.

## Cancellation and results

Completed local backup and subsequent cloud transfer are recorded separately. Canceling upload does not invalidate an already completed local backup. Review per-source outcomes and terminal task state before choosing what to retry. Backups started by the setup wizard run as global tasks; leaving the page does not cancel a started backup. Cancel through the task entrypoint.

<span id="before-you-begin" />
<span id="where-to-configure" />
<span id="automation-modes" />
<span id="interval-backup" />
<span id="scheduled-backup" />
<span id="on-startup-backup" />
<span id="selected-auto-backup-targets-v170" />
<span id="condition-based-backup-mode-v170" />
<span id="stop-after-repeated-no-change-runs" />
<span id="recommended-combinations" />
<span id="suggested-presets" />
<span id="general-documents" />
<span id="minecraft-saves" />
<span id="retention-policy-important" />
<span id="troubleshooting" />
<span id="related-links" />
