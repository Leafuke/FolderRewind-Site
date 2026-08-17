---
sidebar_position: 5
title: KnotLink Command API
description: Use the FolderRewind 1.8 parameterized command handler and capability provider
---

# KnotLink Command API

FolderRewind 1.8 plugins use parameterized protocol v2. Implement `IFolderRewindParameterizedKnotLinkCommandHandler` to handle commands and `IFolderRewindKnotLinkCapabilityProvider` so clients can discover commands and signals through `GET_CAPABILITIES`.

Plugins using these interfaces should declare:

```json
{
  "MinHostVersion": "1.8.0"
}
```

## Parameterized command handler

```csharp
public interface IFolderRewindParameterizedKnotLinkCommandHandler
{
    Task<PluginParameterizedKnotLinkCommandResult?>
        TryHandleParameterizedKnotLinkCommandAsync(
            KnotLinkCommandRequest request,
            IReadOnlyDictionary<string, string> settingsValues,
            PluginHostContext hostContext);
}
```

The Host completes strict v2 parsing and conversation-metadata validation before calling plugins. Except for `GET_CAPABILITIES` and `PING`, plugin handlers run before built-in commands. A plugin should take over only field combinations it explicitly supports.

## `KnotLinkCommandRequest`

| Member | Meaning |
|--------|---------|
| `Command` | Uppercase value of `cmd` |
| `RawPayload` | Original v2 payload for diagnostics only; do not split it again |
| `Options` | Read-only, percent-decoded, case-insensitive field dictionary |
| `HasOption(key)` | Tests whether a field was supplied |
| `GetString` / `GetStringOrDefault` | Reads a string |
| `GetBool` / `GetBoolOrDefault` | Reads boolean forms including `true/false`, `1/0`, `yes/no`, and `on/off` |
| `GetList` | Reads a comma-delimited list whose items are individually percent-encoded |

Use these accessors instead of reimplementing protocol parsing from `RawPayload`.

## Handler result

```csharp
return new PluginParameterizedKnotLinkCommandResult
{
    Handled = true,
    Response = "status=ok;message=Queued"
};
```

| Return value | Host behavior |
|--------------|---------------|
| `null` or `NotHandled` | Continue to another plugin or built-in command |
| `Handled = true`, `Response = null` | Supply a successful response |
| `Handled = true`, strict `status=...` response | Validate, canonicalize, and return it |
| `OK:...` / `ERROR:...` | Convert it to a v2 `status=ok/error` response |

New code should return strict v2 fields and encode every dynamic value with `KnotLinkProtocolFormatter.EncodeValue` or an equivalent Host-provided encoder.

## Minimal handler example

```csharp
using FolderRewind.Services.KnotLink;
using FolderRewind.Services.Plugins;

public sealed class ExamplePlugin :
    IFolderRewindPlugin,
    IFolderRewindParameterizedKnotLinkCommandHandler
{
    public Task<PluginParameterizedKnotLinkCommandResult?>
        TryHandleParameterizedKnotLinkCommandAsync(
            KnotLinkCommandRequest request,
            IReadOnlyDictionary<string, string> settingsValues,
            PluginHostContext hostContext)
    {
        if (request.Command != "EXAMPLE_ECHO")
        {
            return Task.FromResult<PluginParameterizedKnotLinkCommandResult?>(
                PluginParameterizedKnotLinkCommandResult.NotHandled);
        }

        var text = request.GetStringOrDefault("text");
        var encoded = KnotLinkProtocolFormatter.EncodeValue(text);
        hostContext.LogInfo($"EXAMPLE_ECHO handled: {text}");

        return Task.FromResult<PluginParameterizedKnotLinkCommandResult?>(
            new()
            {
                Handled = true,
                Response = $"status=ok;data={encoded}"
            });
    }
}
```

For long work, validate parameters and state, enqueue background work, and immediately return an accepted response. Broadcast progress and completion with signals carrying the same `request_id`.

## Declare runtime capabilities

```csharp
public PluginKnotLinkCapabilityContribution GetKnotLinkCapabilities()
{
    return new()
    {
        OpenSocket = new[]
        {
            new PluginKnotLinkOpenSocketCapability
            {
                Name = "example_echo",
                Description = "Return the supplied text.",
                Args = new Dictionary<string, KnotLinkFuncArgument>
                {
                    ["cmd"] = KnotLinkFuncListService.Static(
                        "EXAMPLE_ECHO", "Operation command."),
                    ["text"] = KnotLinkFuncListService.Input(
                        "Text to return.", "hello")
                },
                Returns = KnotLinkFuncListService.StatusReturns("data")
            }
        }
    };
}
```

Capability names must be stable and unique, and argument definitions must match fields accepted by the handler. The Host merges plugin contributions into the `func_list` returned by `GET_CAPABILITIES`.

## How MineRewind extends v2

MineRewind no longer creates a second set of space-delimited commands. It extends built-in commands with parameters:

- `cmd=BACKUP;current_save=true;...` backs up the active world.
- `cmd=LIST_BACKUPS;current_save=true` lists backups for the active world.
- `cmd=RESTORE;current_save=true;...` restores the active world; an empty `file` selects the latest backup.
- `preserve_player_data=true` preserves supported player data during current-world restore.

The plugin contributes these capabilities through `IFolderRewindKnotLinkCapabilityProvider`. Query capabilities instead of assuming MineRewind is installed.

## Design checklist

- Return `NotHandled` for unknown commands or field combinations outside the plugin's scope.
- Do not log passwords, tokens, or an unfiltered full payload.
- Correlate long work with `request_id` and prevent duplicate execution.
- Percent-encode dynamic response fields.
- After a plugin update, check `GET_CAPABILITIES` for agreement between declaration and implementation.

## Related links

- [KnotLink Protocol and Integration](/en/docs/plugins/knotlink)
- [KnotLink Command Reference](/en/docs/plugins/knotlink-commands)
- [Plugin API Reference](/en/docs/plugins/developing/plugin-api)
- [Minecraft and Integration Mod](/en/docs/guides/minecraft/knotlink-mod)
