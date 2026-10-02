---
sidebar_position: 4
title: "Minecraft hot restore and player preservation"
description: "FolderRewind 1.9 minecraft hot restore and player preservation: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Minecraft hot restore and player preservation

## Host-owned restore

The config-level RestoreCoordinator receives all affected sources, OperationId and Restore/Checkout/Merge kind. It coordinates save/exit/session.lock release. Multiple active worlds, failed handshakes or occupied sources block rather than bypass checks.

Call the Host continuation once after preparation. The Host owns writes/Safe Restore/recovery. Plugins cannot keep writing live worlds afterward. Checkout/Merge coordinate environments without ordinary player preservation; zero-mutation merges skip exit.

## Target and apply mode

Alt+Ctrl+Z or RESTORE without file uses the active branch's unique tip. Already exact returns NoChanges, not a previous archive. Remote default Clean; partial captures force Overwrite. Specified file targets validate history/dependencies.

```text
cmd=RESTORE;current_save=true;preserve_player_data=true;from=panel;request_id=restore-001
```

## Player preservation

Local PreservePlayerData defaults false. Omission inherits; explicit true/false overrides this operation. Ordinary Restore generates relative proposals from locked Current/Target views for whole-batch Host staging, never post-restore live level.dat writes.

Selected position/inventory/experience NBT fields are preserved for all UUIDs; players absent from backup keep full current NBT. Stats/advancements still restore. Embedded single-player Player and server playerdata/players follow implementation layouts. Cross-26.1 preservation/unsupported explicit override blocks. Modified baseline is Derived.

## Completion and recovery

Archive apply and automatic rejoin success differ; failed rejoin may yield SuccessWithWarnings. RecoveryRequired/CommittedRecoveryRequired prohibit rejoin. Inspect recovery before repeating Restore.

Test all players, explicit false, missing players, layout errors, cancellation, partial captures and real rejoin on copies. NBT fixtures do not certify game loading.

<span id="source-mapping" />
<span id="trigger-methods" />
<span id="prerequisites" />
<span id="state-machine" />
<span id="execution-flow" />
<span id="sequence-text" />
<span id="typical-final-states" />
<span id="common-failure-points" />
<span id="requestresponse-examples" />
<span id="restore-latest" />
<span id="restore-specified-backup" />
<span id="safety-recommendations" />
<span id="related-links" />
