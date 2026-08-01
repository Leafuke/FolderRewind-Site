---
sidebar_position: 6
title: Plugin System
description: FolderRewind 1.8 plugin interfaces, lifecycle, and parameterized KnotLink protocol
---

# Plugin System

FolderRewind 1.8 combines a core lifecycle interface with capability-specific optional interfaces. Plugins run in the Host process and load through an isolated collectible `AssemblyLoadContext`; plugins still own their exception and threading discipline.

## Interface map

| Interface | Responsibility |
|-----------|----------------|
| `IFolderRewindPlugin` | Manifest, settings, initialization, backup/restore hooks, discovery, and optional full takeover |
| `IFolderRewindBackupFilterProvider` | Add rules for one backup |
| `IFolderRewindBackupScopeProvider` | Declare and resolve configuration-level scopes |
| `IFolderRewindBackupPreparationProvider` | Inspect trigger source and consistency preferences |
| `IFolderRewindFolderDetailsProvider` | Supply read-only key/value sections to folder details |
| `IFolderRewindRestoreInterceptor` | Continue, handle, or block a restore before a task is created |
| `IFolderRewindConfigAugmenter` | Suggest discovered folders for an existing config |
| `IFolderRewindParameterizedKnotLinkCommandHandler` | Handle strict key-value KnotLink v2 requests |
| `IFolderRewindKnotLinkCapabilityProvider` | Publish discoverable KnotLink commands/signals |
| `IFolderRewindHotkeyProvider` | Register global or in-app hotkeys |

## Lifecycle

Scan the plugin directory → read the manifest and check MinHostVersion → load through an isolated AssemblyLoadContext → Initialize → SetHostContext → register extensions → call backup/restore interfaces per task → disable, unload, or update.

Example plugins using new 1.8 interfaces should declare `MinHostVersion: "1.8.0"`. Current MineRewind uses `1.8.1` because it depends on that release's fixes.

## Backup and restore extensions

- Filters and scope resolutions create an effective per-invocation config; the Host does not modify the saved source config.
- Selected-region scopes can use PluginBackupRuleMergeMode.Replace to replace the regular whitelist and return Invalid for unsafe parameters.
- IFolderRewindBackupPreparationProvider can inspect BackupInvocationOptions; without it, the core OnBeforeBackupFolder still runs.
- Detail providers return data only; the Host owns rendering.
- Restore interceptors return Continue, Handled, or Blocked before side effects.
- Config augmenters return suggestions; the Host deduplicates, handles conflicts, and saves.

## KnotLink subsystem

KnotLinkService provides transport through Server v3, while FolderRewind uses strict parameterized protocol v2:

- KnotLinkCommandParser checks for cmd= and parses fields.
- KnotLinkCommandRequest exposes string, boolean, and list accessors.
- KnotLinkKeyValueCodec validates keys and performs RFC 3986 percent-encoding.
- IFolderRewindParameterizedKnotLinkCommandHandler runs plugin handlers before built-in commands.
- IFolderRewindKnotLinkCapabilityProvider merges plugin commands and signals into GET_CAPABILITIES.

The removed space-delimited commands and legacy handler do not coexist with the new API. See [KnotLink Command Reference](../plugins/knotlink-commands).

## Layout and isolation

- Interfaces live in FolderRewind/Services/Plugins/; PluginService discovers and dispatches them.
- KnotLink protocol helpers live in FolderRewind/Services/KnotLink/.
- Plugins may ship dependency DLLs; PluginLoadContext resolves dependencies from the plugin directory first.
- A plugin root must contain manifest.json and its entry assembly, packaged as ZIP.

## Related links

- [Plugin API Reference](../plugins/developing/plugin-api)
- [KnotLink Command API](../plugins/developing/knotlink-api)
- [Plugin Development Quick Start](../plugins/developing/quick-start)
