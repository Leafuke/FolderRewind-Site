---
sidebar_position: 3
title: "KnotLink protocol and integration"
description: "FolderRewind 1.9 knotlink protocol and integration: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# KnotLink protocol and integration

FolderRewind 1.9 keeps KnotLink Server v3 and parameterized wire protocol v2. Current capability manifestVersion=3.0.0, specVersion=1.0 and Plugin API3.6 evolve independently.

## Format and encoding

Requests start with cmd= and use strict semicolon-separated key/value fields. Percent-encode dynamic values per RFC3986; encode list items individually before joining with commas. Legacy space-separated commands are unsupported. Long operations need from/request_id.

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;from=panel;request_id=backup-001
status=ok;from=panel;request_id=backup-001;message=Queued
```

## Discover before invoking

Use cmd=PING, then cmd=GET_CAPABILITIES for percent-encoded JSON func_list. Check commands, plugin selectors, arguments and signals from the runtime list rather than guessing by plugin name.

## Lifecycle and semantics

status=ok may mean accepted, not completed. Correlate later signals using request_id and avoid duplicate destructive requests. Remote Restore defaults Clean; partial captures force Overwrite. Omitting file invokes active-branch Quick Restore, not the preceding timestamp.

## Plugins

API3.6 integration declares commands/signals. Target resolution selects stable IDs and reuses Host operations. MineRewind offers current_save selectors for six folder commands; an active, unambiguous world is required.

See the [command reference](/docs/plugins/knotlink-commands), [developer API](/docs/plugins/developing/knotlink-api) and [Minecraft integration](/docs/guides/minecraft/knotlink-mod).

<span id="do-not-confuse-the-two-version-numbers" />
<span id="wire-format" />
<span id="discover-capabilities-before-sending-commands" />
<span id="lifecycle-signals" />
<span id="plugin-integration" />
<span id="security-guidance" />
<span id="related-links" />
