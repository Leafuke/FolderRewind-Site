---
sidebar_position: 5
title: Plugin Settings Definition
description: PluginSettingDefinition design conventions and field practices
---

# Plugin Settings Definition

Plugins declare settings through `GetSettingsDefinitions()`. Host renders UI, persists values, and returns them via `settingsValues` in plugin calls.

## Design principles

- Keep keys stable after release
- Describe purpose/default/risk clearly
- Use safe fallback values when parsing fails

## Practical recommendations

- Parse bool values robustly for `true/false/1/0`
- Add min/max boundary checks for numeric settings
- Validate path accessibility for path settings

## Example

MineRewind uses two boolean settings:

- `EnableHotBackup`
- `PreservePlayerData`

## Related links

- [Plugin API Reference](./plugin-api)
- [Plugin Development Quick Start](./quick-start)
