---
sidebar_position: 2
title: "Full, Smart and Rolling backups"
description: "FolderRewind 1.9 full, smart and rolling backups: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Full, Smart and Rolling backups

## Compare modes

| Mode | Current behavior | Suggested use |
|---|---|---|
| Full | Independent complete capture of the managed boundary | First backup, milestones, validation |
| Smart | Changes/deletions with baseline representation dependencies | Frequent backups with closure verification |
| Rolling | Copy-on-write immutable new archive reflecting adds/edits/deletions | Reuse baseline while keeping version history |

Rolling **does not update an old archive**; unverifiable baselines fall back to Full. Legacy numeric Incremental=1 maps to Smart, Overwrite=2 to Rolling. Overwrite restore remains a separate apply mode.

## Configure and evaluate

Choose mode in backup policy, checking scope/compression/destination. Full is complete relative to the managed boundary, not the physical disk/root. Losing disposable Smart baseline cache may force Full; deleting payload dependencies can harm restores.

No-change skipping, KeepCount, chain limits and performance presets follow persisted settings. The default chain limit is5; reaching it creates a Full baseline. Retention/protection determines whether old dependencies can be released.

## Retention

Count governs configuration Checkpoints, not one archive list per folder. Pins, branch tips, Workspace baselines, safety snapshots and active work may retain more than the count. Logical history, representation release and replica deletion differ. Use app operations instead of deleting dependencies manually.

## Compression

Levels/threads/low priority/type rules change costs.0 threads means automatic; light uses about half the logical processors, very light at most2. Type rules disable solid. Additional7-Zip arguments affect backup creation only; protected operation/format/password/output/source/progress controls are restricted.

## Partial captures

Partial region/one-shot captures force Overwrite in ordinary/hot Restore, even with Exact representation fidelity. A fixed Source Scope defines the managed boundary; completeness inside it does not mean the whole physical root.

Test file additions, edits, deletions, missing baselines and restores, rather than judging only archive size.

<span id="quick-recommendation" />
<span id="mode-comparison" />
<span id="how-to-configure" />
<span id="choosing-tips" />
<span id="key-settings-strongly-related-to-mode" />
<span id="compression-and-performance" />
<span id="performance-presets-18" />
<span id="additional-7-zip-arguments" />
<span id="restore-rules-for-partial-backups" />
<span id="starter-presets" />
<span id="related-links" />
