---
sidebar_position: 20
title: "Safety snapshots and recovery points"
description: "FolderRewind 1.9 safety snapshots and recovery points: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Safety snapshots and recovery points

A safety snapshot is an Exact, branch-independent recovery point before destructive history apply. It never advances the active branch and differs from temporary staging or ordinary automatic backup.

## Use

Review uncommitted work/protection during Checkout/Merge/controlled Restore. Failed protection must stop the operation. Inspect completed points and source/config scope through advanced history.

## Restore and release

Choose a point, confirm Checkpoint/bindings, prepare full dependencies and restore through the Host. Do not copy staging directories. Retained points protect materialization closure and can exceed KeepCount.

Explicitly release only when no longer needed. Release is not immediate deletion of every logical fact/shared payload; the Host evaluates other protection roots.

## Failures

For RecoveryRequired/CommittedRecoveryRequired, locks or missing bytes, inspect diagnostics instead of repeating destructive writes. Test points remain inspectable/restorable/releasable across restart.

## Restricted legacy history

Verifying legacy payloads does not establish historical deletion boundaries. Restricted recovery and safety recovery points are separate concepts: permission to export or use non-deleting Overwrite does not grant Clean, Checkout or Merge. Establish a reliable baseline with a new Full backup after upgrading.

