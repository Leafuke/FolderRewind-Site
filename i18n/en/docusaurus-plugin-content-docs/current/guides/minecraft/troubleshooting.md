---
sidebar_position: 6
title: "Minecraft troubleshooting"
description: "FolderRewind 1.9 minecraft troubleshooting: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Minecraft troubleshooting

## Check the chain

Check Host API3.6, MineRewind provenance/version, Enabled Intent and Active, Kind, valid world path/session.lock, KnotLink/game component and materializable history. Old EnableHotBackup/v2 hooks are not current diagnostic entrypoints.

| Symptom | Check/action |
|---|---|
| No worlds | Roots/AutoDiscoverSaves/instance definitions/scan diagnostics; review drafts |
| Backup warnings | Prefer degradation/handshake/snapshot failure; Require must block; test recovery |
| Wrong region | Block coordinates/floor512/dimensions/scopes/filters/all.mcc rule |
| Quick Restore unchanged | Already at active-branch target; no older version selection |
| Restore blocked | Divergence/closure/multiple worlds/coordination/recovery state |
| Player preservation missing | Local setting/explicit false/ordinaryRestore/allUUID/layout/proposal errors |
| Restored but no rejoin | Separate Host success from rejoin warning; inspect before entering |

## Diagnostics

Use GET_CAPABILITIES/LIST_BACKUPS for runtime targets/arguments; percent-encode filenames. Install/activation/readiness/outcomes differ. RecoveryRequired/CommittedRecoveryRequired prohibit destructive retries/automatic rejoin.

Report versions, time, request_id, outcomes and redacted logs. Do not upload tokens/private paths/production worlds. Preserve copied-world game-loading errors; passing NBT tests is insufficient.

## Missing saves or wrong edition

Distinguish automatic discovery from explicit-root scanning and select portable/custom locations manually. Check the draft's actual Kind: Java and Bedrock are not interchangeable. Bedrock lacks Java hot coordination, NBT player preservation and region scope; ordinary folders do not require world metadata. Read per-source diagnostics rather than treating partial/budget-limited results as a completed whole-drive scan.

<span id="60-second-chain-health-check" />
<span id="symptom-to-source-map" />
<span id="symptom-1-saves-are-not-discovered" />
<span id="symptom-2-hot-backup-coordination-does-not-trigger" />
<span id="symptom-3-hot-restore-is-cancelled-midway" />
<span id="symptom-4-specified-backup-restore-fails" />
<span id="symptom-5-player-state-is-abnormal-after-restore" />
<span id="diagnostic-command-template" />
<span id="still-not-solved" />
<span id="related-links" />
