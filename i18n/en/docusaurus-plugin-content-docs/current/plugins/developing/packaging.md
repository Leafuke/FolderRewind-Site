---
sidebar_position: 6
title: Packaging and Release
description: Plugin artifact layout, ZIP conventions, and pre-release checklist
---

# Packaging and Release

## Required artifacts

Plugin release package is usually a `.zip` including at least:

- `manifest.json`
- Entry assembly (for example `MyPlugin.dll`)
- Additional runtime dependencies if needed

## Recommended ZIP layout

```text
MyPlugin.zip
└─ MyPlugin/
   ├─ manifest.json
   ├─ MyPlugin.dll
   └─ ...
```

## Pre-release checklist

- `EntryAssembly` / `EntryType` in `manifest.json` can be loaded correctly
- `MinHostVersion` matches target user host versions
- Install + smoke test on a clean environment

## Versioning recommendations

- Use semantic versioning (`MAJOR.MINOR.PATCH`)
- Include release notes (features/fixes/breaking changes)

## Related links

- [Install and Manage Plugins](../using-plugins)
- [Plugin Auto Update](./auto-update)
