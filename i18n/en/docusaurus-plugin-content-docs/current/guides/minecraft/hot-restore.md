---
sidebar_position: 4
title: "Minecraft hot restore and player preservation"
description: "Prepare game coordination and the target version, review player-preservation options, then run and verify Minecraft hot restore."
reviewed_baseline: "1.9-api3.9"
---

# Minecraft hot restore and player preservation

Prepare game coordination and the target version, review player-preservation options, then run and verify Minecraft hot restore.

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

## One-shot path preservation

Ordinary Java Restore accepts `restore_preserve_paths`, relative to the unique managed world root. A relative file or directory ending in `/` preserves exact current state, including deletions. This differs from player-field preservation and cannot expand SourceScope. Checkout/Merge do not apply it. See [filter limits](/docs/guides/filters#one-shot-file-and-directory-preservation) for boundaries, ambiguity and staging limits.

```text
cmd=RESTORE;current_save=true;restore_preserve_paths=data/local.dat,datapacks/;preserve_player_data=false;from=panel;request_id=restore-preserve-001
```

These example paths must actually be inside the managed world root; they cannot protect instance directories outside it. Bedrock does not use Java hot coordination or NBT preservation: close the game and use ordinary file restore.

<span id="common-failure-points" />
<span id="execution-flow" />
<span id="prerequisites" />
<span id="related-links" />
<span id="requestresponse-examples" />
<span id="restore-latest" />
<span id="restore-specified-backup" />
<span id="safety-recommendations" />
<span id="sequence-text" />
<span id="source-mapping" />
<span id="state-machine" />
<span id="trigger-methods" />
<span id="typical-final-states" />
