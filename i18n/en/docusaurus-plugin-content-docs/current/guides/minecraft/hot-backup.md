---
sidebar_position: 3
title: "Minecraft hot backup"
description: "Prepare KnotLink and game components to coordinate saving and capture of a running Java world, choose consistency requirements and review backup results."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft hot backup

Hot backup lets you save progress while playing. MineRewind identifies the active world and coordinates saving and capture with the game component.

## Prepare game integration

Complete a backup and restore with the game closed first. Prepare [KnotLink](/docs/guides/minecraft/knotlink-mod) and the [game component](/docs/guides/minecraft/minebackup-mod) for your loader. Query runtime capabilities to check the connection and current-world commands.

Active-world detection combines a valid path with `session.lock` state. Manual backup, the default `Alt+Ctrl+S` and remote commands use the same task workflow.

## Choose consistency requirements

| Setting | Behavior |
| --- | --- |
| Prefer | Prefer coordinated saving; allowed fallback captures retain the backup with warnings |
| Require | Begin capture after handshake, saving and stable-reading conditions are met; otherwise show the blocking diagnostic |

The game component saves the world and reports status. The app then enumerates and archives a controlled source, releasing coordination and temporary resources on completion, cancellation or failure.

## Request and review a backup

Use the app or send:

```text
cmd=BACKUP;current_save=true;backup_mode=smart;from=panel;request_id=hot-001
```

Query capabilities first and correlate the final result through `request_id`. Review the actual outcome in the [notification center](/docs/guides/notifications), expanding warnings to check the capture method used.

For a new modpack, try an online backup, cancellation and historical restore, then inspect builds, entities and players in a world copy.

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

<span id="minecraft-hot-backup-and-consistency-leases" />
<span id="active-target" />
<span id="coordination" />
<span id="prefer-and-require" />
<span id="request-and-acceptance" />
