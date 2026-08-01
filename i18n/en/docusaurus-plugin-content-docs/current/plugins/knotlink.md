---
sidebar_position: 3
title: KnotLink Protocol and Integration
description: Understand KnotLink Server v3, FolderRewind parameterized protocol v2, and external integrations
---

# KnotLink Protocol and Integration

KnotLink is the communication channel between FolderRewind and game mods, scripts, or control panels. FolderRewind 1.8 uses a new remote-command model and requires **KnotLink Server v3**.

## Do not confuse the two version numbers

| Name | Meaning |
|------|---------|
| **KnotLink Server v3** | The external service version providing TCP/OpenSocket, query, and signal transport |
| **FolderRewind parameterized protocol v2** | FolderRewind's strict `key=value` message format carried over KnotLink |

Server v3 is the transport service version; parameterized protocol v2 is FolderRewind's payload format. Upgrading one does not imply compatibility with the other. A 1.8 integration must satisfy both.

:::warning v1 commands were removed
FolderRewind 1.8 no longer parses legacy space-delimited commands. Callers must send a strict key-value payload containing `cmd=`.
:::

## Wire format

Requests, responses, and events use semicolon-delimited fields:

```text
cmd=BACKUP;config_id=demo;folder=0;comment=Before%20upgrade;from=panel;request_id=req-001
```

Rules:

- Keys contain only ASCII letters, digits, and underscores, and are normalized to lowercase internally.
- Every segment has exactly one `=`. Empty segments, duplicate keys, and invalid escapes reject the whole request.
- Values use RFC 3986 percent-encoding. A space is `%20`, a semicolon is `%3B`, an equals sign is `%3D`, and `%` is `%25`.
- Lists are comma-delimited, with each item encoded separately.
- `BACKUP`, `RESTORE`, `BACKUP_ALL`, `AUTO_BACKUP`, `STOP_AUTO_BACKUP`, and `MARK_IMPORTANT` require `from` and a unique `request_id`.

A typical response:

```text
status=ok;from=panel;request_id=req-001;message=Backup%20task%20queued
```

Errors use `status=error` and explain the reason in `message`.

## Discover capabilities before sending commands

Clients should begin with:

```text
cmd=GET_CAPABILITIES
```

The response's `func_list` field is percent-encoded JSON containing built-in Host commands plus commands and signals contributed by plugins. The repository's `funcList.json` is the fact baseline for built-in commands; the runtime manifest may grow with enabled plugins.

See [KnotLink Command Reference](./knotlink-commands) for every field.

## Lifecycle signals

Long operations carrying conversation metadata broadcast lifecycle events with the same `request_id`:

```text
command_accepted → command_started → command_progress → command_completed
                                      ↘ command_failed / command_error
```

Backup, restore, and periodic backup also emit domain-specific signals. Correlate responses and events by `request_id`; do not infer an operation from arrival order alone.

## Plugin integration

Plugins participate in the protocol through these 1.8 interfaces:

- `IFolderRewindParameterizedKnotLinkCommandHandler` reads `KnotLinkCommandRequest` and handles parameterized commands.
- `IFolderRewindKnotLinkCapabilityProvider` contributes command and signal definitions to the runtime `func_list`.
- `PluginHostContext` exposes KnotLink state, event broadcasting, command sending, and request-response queries.

See [KnotLink Command API](./developing/knotlink-api) for implementation details.

## Security guidance

- Run KnotLink Server only on trusted networks and controlled ports.
- Generate a new `request_id` for every state-changing request and deduplicate it on the caller side.
- Rehearse the complete event chain with a test configuration before remote restore touches a real directory.
- Never concatenate percent-decoded values directly into shell commands.

## Related links

- [KnotLink Command Reference](./knotlink-commands)
- [KnotLink Command API](./developing/knotlink-api)
- [Minecraft and Integration Mod](../guides/minecraft/knotlink-mod)
- [1.8 Upgrade and Recovery](../getting-started/v1-8-upgrade)
