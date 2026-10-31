---
sidebar_position: 3
title: "KnotLink protocol and integration"
description: "Connect external tools through KnotLink and distinguish parameterized requests, acceptance and final task completion."
reviewed_baseline: "1.10-api3.17"
---

# KnotLink protocol and integration

Connect external tools through KnotLink and distinguish parameterized requests, acceptance and final task completion.

FolderRewind uses KnotLink Server v3 and parameterized protocol v2. The runtime capability list uses manifestVersion 3.0.0 and specVersion 1.0, generated from core commands and plugin declarations.

## Format and encoding

Requests start with cmd= and use strict semicolon-separated key/value fields. Percent-encode dynamic values per RFC3986; encode list items individually before joining with commas. Legacy space-separated commands are unsupported. Long operations need from/request_id.

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;from=panel;request_id=backup-001
status=ok;from=panel;request_id=backup-001;message=Queued
```

## Discover before invoking

Use cmd=PING, then cmd=GET_CAPABILITIES for percent-encoded JSON func_list. Check commands, plugin selectors, arguments and signals from the runtime list rather than guessing by plugin name.

## Lifecycle and semantics

Queries return their result with status=ok. Long tasks acknowledge acceptance first; correlate their final signals through request_id. Remote Restore defaults to Clean, partial captures use Overwrite and omitting file resolves the active branch Quick Restore target.

## Plugins

API 3.17 integration declares commands/signals. Target resolution selects stable IDs and reuses Host operations. MineRewind offers current_save selectors for seven folder commands; an active, unambiguous world is required.

See the [command reference](/docs/plugins/knotlink-commands), [developer API](/docs/plugins/developing/knotlink-api) and [Minecraft integration](/docs/guides/minecraft/knotlink-mod).

<span id="discover-capabilities-before-sending-commands" />
<span id="do-not-confuse-the-two-version-numbers" />
<span id="lifecycle-signals" />
<span id="plugin-integration" />
<span id="related-links" />
<span id="security-guidance" />
<span id="wire-format" />
