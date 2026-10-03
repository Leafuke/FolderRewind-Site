---
sidebar_position: 6
title: "KnotLink and Minecraft companion components"
description: "FolderRewind 1.9 knotlink and minecraft companion components: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# KnotLink and Minecraft companion components

## Versions

The backend baseline is FolderRewind1.9/MineRewind1.9.5/API3.6. Server v3, wire v2 and capability manifestVersion3.0.0 are separate. Install game components according to their Release loader/game matrices, not plugin API versions.

## Minimal integration

Confirm Active plugin, loaded game component and available service. PING, GET_CAPABILITIES, query current world, back up, then restore copies. Selectors resolve stable targets and inherit core options.

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=LIST_BACKUPS;current_save=true
cmd=BACKUP;current_save=true;from=panel;request_id=mc-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=mc-002
```

Six current_save variants cover BACKUP/LIST_BACKUPS/RESTORE/AUTO_BACKUP/STOP_AUTO_BACKUP/MARK_IMPORTANT. Conversations require from/request_id; validate against runtime metadata.

## Replies and terminal states

Handshake, WORLD_SAVED, exit/release, restore/rejoin signals use correlation IDs. Accepted is not completed. Dedicated Sidecar and client rejoin differ; never restart a server while Host writes are active.

Preserve diagnostics for unknown/recovery-required outcomes rather than blindly retrying. See [commands](/docs/plugins/knotlink-commands) for Clean defaults, append rules and Quick Restore.

<span id="prerequisites" />
<span id="current-world-commands" />
<span id="integration-callbacks" />
<span id="minerewind-signals" />
<span id="minimal-integration-test" />
<span id="related-links" />
