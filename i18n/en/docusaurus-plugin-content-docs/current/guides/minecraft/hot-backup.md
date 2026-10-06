---
sidebar_position: 3
title: "Minecraft hot backup and consistency leases"
description: "Coordinate save writes while the game is running, review consistency modes and warnings, and verify Minecraft hot backups."
reviewed_baseline: "1.9-api3.9"
---

# Minecraft hot backup and consistency leases

Coordinate save writes while the game is running, review consistency modes and warnings, and verify Minecraft hot backups.

## Active target

MineRewind 1.9.8 resolves a valid world and held session.lock, not only a level.dat lock. Manual backup, hotkeys and current_save selectors enter the same Host workflow. v3 has no old EnableHotBackup switch.

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

<span id="best-practices" />
<span id="command-example" />
<span id="difference-vs-regular-backup" />
<span id="execution-flow" />
<span id="key-timeout-behavior" />
<span id="related-links" />
<span id="request" />
<span id="sequence-text" />
<span id="source-mapping" />
<span id="trigger-conditions" />
<span id="trigger-entry-points" />
<span id="typical-response" />
