---
sidebar_position: 20
title: "Safety snapshots and recovery points"
description: "Protect current content before checkout or merge, inspect independent recovery points, prepare dependencies, restore and release snapshots when finished."
reviewed_baseline: "1.10-api3.17"
---

# Safety snapshots and recovery points

Before checkout or merging, a safety snapshot can retain an exact recovery point for current work. It is stored independently of the active branch, ready to recover the pre-operation state.

## Protect before applying

Review current work and protection options in the Checkout, Merge or applicable controlled-restore confirmation. Wait for protection capture before continuing writes. Open recovery points in advanced history to inspect the affected sources and checkpoints.

## Restore and release

Select a point, check source paths, prepare archives and all dependencies and restore through the app. Retaining a snapshot retains materialization dependencies, so counts can exceed everyday retention.

Once later versions and backups are secure, explicitly release the recovery point. The app evaluates other protection and dependencies when calculating physical cleanup.

## Handle issues

For missing archives, occupied files or recovery requests, read diagnostics and finish the indicated steps. Try creation, viewing after restart, recovery and release on a small project first.

For restricted adopted backups, recover into a new folder and create a Full baseline before branch operations. See [legacy adoption](/docs/guides/data-migration#legacy-upgrade).

<span id="use" />

<span id="failures" />
<span id="restricted-legacy-history" />
