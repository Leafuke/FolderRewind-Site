---
sidebar_position: 20
title: "Minecraft troubleshooting"
description: "Check MineRewind, save paths, game coordination and archive dependencies to diagnose maps, regions, player preservation and world merge issues."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft troubleshooting

First confirm MineRewind's runtime state in plugin management. Then check the world path, Java/Bedrock kind and task diagnostics.

| Symptom | What to check |
| --- | --- |
| World missing | Select the actual launcher, saves or world folder and read scan diagnostics and draft paths |
| Hot backup warning | Review consistency details, KnotLink, game components, handshake and save receipts |
| Unexpected region | Check block coordinates, dimensions, source scope and filters in the effective preview |
| Quick Restore reports no change | The active branch target already matches; select an earlier historical version if needed |
| Restore waits or is blocked | Check dependencies, active-world count, file locks and recovery state |
| Unexpected player preservation | Check local settings, one-time true/false, ordinary Restore and layout diagnostics |
| Empty or incomplete map | Check dimensions, generated bounds, chunk status and historical dependencies; zoom or refresh |
| Merge requests a whole-world choice | Read Conservative policy entity/layout diagnostics and inspect all dimensions |
| Files restored but game not reopened | Read the re-entry warning and enter manually after checking the environment |

## Check game integration

Query `GET_CAPABILITIES`, then use `LIST_BACKUPS` to inspect the target. Percent-encode dynamic filenames and correlate the operation result through `request_id`.

Use the matching workflow for Java, Bedrock or ordinary folders. Close the game for complete Bedrock file backups. MineRewind provides Java maps, player NBT handling and hot coordination.

## Recover and report

For recovery requests, keep original files and logs and complete the app's diagnostic steps. Record app, plugin and game component versions, time, target path, steps and observed result when reproducing an issue.

For maps, include dimension, coordinates and chunk status. For merging, include the policy and conflict item. Keep the game's error log for loading issues to help identify the affected data.

See [hot backup](/docs/guides/minecraft/hot-backup), [hot restore](/docs/guides/minecraft/hot-restore), [maps](/docs/guides/minecraft/world-preview) and [world merging](/docs/guides/minecraft/world-merge).

<span id="60-second-chain-health-check" />
<span id="diagnostic-command-template" />
<span id="related-links" />
<span id="still-not-solved" />
<span id="symptom-1-saves-are-not-discovered" />
<span id="symptom-2-hot-backup-coordination-does-not-trigger" />
<span id="symptom-3-hot-restore-is-cancelled-midway" />
<span id="symptom-4-specified-backup-restore-fails" />
<span id="symptom-5-player-state-is-abnormal-after-restore" />
<span id="symptom-to-source-map" />

<span id="check-the-chain" />
<span id="diagnostics" />
<span id="missing-saves-or-wrong-edition" />
