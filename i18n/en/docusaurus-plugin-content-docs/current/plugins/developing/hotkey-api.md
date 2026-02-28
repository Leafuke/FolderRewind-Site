---
sidebar_position: 3
title: Hotkey API
description: IFolderRewindHotkeyProvider reference and hotkey design guidelines
---

# Hotkey API

`IFolderRewindHotkeyProvider` allows plugins to register hotkeys and execute logic when triggered.

## Interface

- `GetHotkeyDefinitions()`: return hotkey definition list
- `OnHotkeyInvokedAsync(...)`: callback when hotkey is triggered

## Key fields

`PluginHotkeyDefinition` important fields:

- `Id`: unique ID within plugin
- `DisplayName`: user-visible name
- `DefaultGesture`: for example `Alt+Ctrl+S`
- `IsGlobalHotkey`: whether it is global

## Practical advice

- Avoid conflicts with common OS/system shortcuts
- Keep callback non-blocking; use async tasks for long operations
- Provide logs and status feedback for failure paths

MineRewind examples:

- `Alt+Ctrl+S`: backup current active world
- `Alt+Ctrl+Z`: hot restore current active world

## Related links

- [Plugin API Reference](./plugin-api)
- [KnotLink Command API](./knotlink-api)
