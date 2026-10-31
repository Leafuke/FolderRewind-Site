---
sidebar_position: 6
title: "KnotLink and Minecraft companion components"
description: "Configure KnotLink integration with Minecraft and check protocols, component versions, current-world targets and final results."
reviewed_baseline: "1.10-api3.17"
---

# KnotLink and Minecraft companion components

Configure KnotLink integration with Minecraft and check protocols, component versions, current-world targets and final results.

## Versions

Prepare FolderRewind with MineRewind enabled and choose game components for the game version and loader. Communication uses KnotLink Server v3 and parameterized protocol v2; runtime capabilities list available commands.

## Minimal integration

Confirm Active plugin, loaded game component and available service. PING, GET_CAPABILITIES, query current world, back up, then restore copies. Selectors resolve stable targets and inherit core options.

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=LIST_BACKUPS;current_save=true
cmd=BACKUP;current_save=true;from=panel;request_id=mc-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=mc-002
```

Seven current_save variants cover BACKUP/LIST_BACKUPS/RESTORE/AUTO_BACKUP/STOP_AUTO_BACKUP/MARK_IMPORTANT/GET_IMPORTANCE. Conversations require from/request_id; validate against runtime metadata.

## Replies and terminal states

Track handshake, WORLD_SAVED, exit/release and restore/re-entry signals through correlation IDs. Read the final result after request acceptance. Dedicated servers use Sidecar process handoff; clients follow the re-entry workflow.

Preserve diagnostics for unknown/recovery-required outcomes rather than blindly retrying. See [commands](/docs/plugins/knotlink-commands) for Clean defaults, append rules and Quick Restore.

<span id="current-world-commands" />
<span id="integration-callbacks" />
<span id="minerewind-signals" />
<span id="minimal-integration-test" />
<span id="prerequisites" />
<span id="related-links" />
