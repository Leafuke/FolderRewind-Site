---
sidebar_position: 3
title: "Command and hotkey API"
description: "Declare plugin commands and default hotkeys, execute typed arguments and handle cancellation, conflicts and persisted overrides."
reviewed_baseline: "1.9-api3.9"
---

# Command and hotkey API

Declare plugin commands and default hotkeys, execute typed arguments and handle cancellation, conflicts and persisted overrides.

API 3.9 uses IPluginCommandCapability. PluginCommandDescriptor contains Id, DisplayName and ArgumentSchema, with optional DefaultHotkey/IsGlobalHotkey. The Host owns binding persistence and dispatch.

## Description and execution

This descriptor fragment assumes Id is the plugin's PluginId:

```csharp
new PluginCommandDescriptor(new PluginCommandId(Id, "backup"), "Backup",
    JsonSerializer.SerializeToElement(new { type = "object" }))
{ DefaultHotkey = "Ctrl+Shift+B", IsGlobalHotkey = true };
```

See the [buildable GameRewind tutorial](/docs/plugins/developing/tutorial). ExecuteAsync receives a command identity, JsonElement arguments and invocation context; return OperationOutcome/diagnostics. Request Host Backups/Restores through declared services rather than duplicating workflows.

## Global versus in-app

IsGlobalHotkey=true registers globally; false dispatches within the app. Users can change defaults. Inspect registration diagnostics for collisions; do not assume later plugins override earlier bindings.

## MineRewind and verification

MineRewind defaults to Alt+Ctrl+S backup and Alt+Ctrl+Z Quick Restore of the active world, detected via session.lock. Quick Restore resolves the Host active branch, not the newest timestamp archive.

Exercise bindings, missing/multiple targets, cancellation, removed routing after Disable and duplicate invocations. Never block the UI synchronously; respect operation cancellation and plugin lifetime.

<span id="interface" />
<span id="key-fields" />
<span id="practical-advice" />
<span id="related-links" />
