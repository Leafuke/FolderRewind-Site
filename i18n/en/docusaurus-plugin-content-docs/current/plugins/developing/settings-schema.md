---
sidebar_position: 5
title: "Static settings schema and typed values"
description: "Define static plugin settings schemas, read typed snapshots and retain the known-good runtime state when updates fail."
reviewed_baseline: "1.10-api3.17"
---

# Static settings schema and typed values

Define static plugin settings schemas, read typed snapshots and retain the known-good runtime state when updates fail.

API 3.17 settings are static package data referenced by manifest settingsSchema. Installation validates them without executing code. The Host renders controls, validates candidates and transactionally reactivates; invalid settings must not replace known-good values.

## Schema format

```json
{"schemaVersion":1,"settings":[{"key":"EnabledFeature","type":"boolean","default":true,"required":false,"displayName":"Enable example feature","localizedDisplayName":{"zh-CN":"启用示例功能"}}]}
```

schemaVersion supports1. Keys are valid/unique; defaults match types; required is a JSON boolean. An empty settings list is still an array.

| type | JSON value | Purpose |
|---|---|---|
| `string` | string | Single-line text |
| `boolean` | true/false | Switch |
| `integer` | Int64 integer | Numeric value |
| `multiline` | string | Multiple lines |
| `folderPath` | string | Folder path |
| `filePath` | string | File path |
| `enum` | string | Match nonempty, unique enumValues |

displayName, description and their localized dictionaries are supported. Keep keys stable as display text changes.

## Reading

This activation-method fragment assumes settings is context.Settings.Values:

```csharp
bool enabled = settings.TryGetValue("EnabledFeature", out var value)
    && value.GetBoolean();
```

Read JsonElement values according to their declared types. Unknown keys remain with a warning, missing values use valid defaults and required values without defaults produce diagnostics. Manage settings and Provider State separately.

## Acceptance

An invalid type must preserve previous values. Failed settings activation preserves/recovers known-good state; inspect diagnostics and runtime state. Respect cancellation and RequiresRestart when transitions time out.

<span id="design-principles" />
<span id="example" />
<span id="practical-recommendations" />
<span id="related-links" />
