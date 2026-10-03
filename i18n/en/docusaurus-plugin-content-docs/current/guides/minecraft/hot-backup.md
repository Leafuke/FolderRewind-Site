---
sidebar_position: 3
title: "Minecraft hot backup and consistency leases"
description: "FolderRewind 1.9 minecraft hot backup and consistency leases: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Minecraft hot backup and consistency leases

## Active target

MineRewind1.9.5 resolves a valid world and held session.lock, not only a level.dat lock. Manual backup, hotkeys and current_save selectors enter the same Host workflow. v3 has no old EnableHotBackup switch.

## Coordination

The Host resolves Kind/readiness/consistency intent and calls IBackupConsistencyCapability. Active worlds coordinate KnotLink/mod handshake/WORLD_SAVED. A disposable snapshot source feeds the same enumeration/archive capture.

Success, cancellation and failure must release temporary data. v3 does not return replacement paths through OnBeforeBackupFolder or edit archives afterward.

## Prefer and Require

With permitted rawWithWarnings, Prefer can degrade to SuccessWithWarnings plus specific coordination/snapshot diagnostics; it is not proof of game consistency. Require blocks unavailable handshake/save/stable source. Missing/invalid region providers must not silently broaden protection.

## Request and acceptance

```text
cmd=BACKUP;current_save=true;backup_mode=smart;from=panel;request_id=hot-001
```

Query capabilities and correlate final signals. Missing/multiple worlds produce diagnostics; accepted is not finished. Test online coordination, offline warnings, Require blocking, cancellation, cleanup and real archive restores.

<span id="source-mapping" />
<span id="trigger-entry-points" />
<span id="trigger-conditions" />
<span id="execution-flow" />
<span id="sequence-text" />
<span id="key-timeout-behavior" />
<span id="command-example" />
<span id="request" />
<span id="typical-response" />
<span id="difference-vs-regular-backup" />
<span id="best-practices" />
<span id="related-links" />
