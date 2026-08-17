---
sidebar_position: 3
title: Plugin API Reference
description: FolderRewind 1.8 plugin interfaces, lifecycle, and extension points
---

# Plugin API Reference

This page follows the current `Services/Plugins/` source. A plugin using the interfaces introduced in 1.8 should declare `MinHostVersion: "1.8.0"` in `manifest.json`; use `1.8.1` when it also depends on the 1.8.1 fixes.

## Core interface and lifecycle

Every plugin implements `IFolderRewindPlugin`:

```csharp
public interface IFolderRewindPlugin
{
    PluginInstallManifest Manifest { get; }
    IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions();
    void Initialize(IReadOnlyDictionary<string, string> settingsValues);
    void SetHostContext(PluginHostContext hostContext) { }

    string? OnBeforeBackupFolder(BackupConfig config, ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues);
    void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder, bool success,
        string? generatedArchiveFileName,
        IReadOnlyDictionary<string, string> settingsValues);
    object? OnBeforeRestoreFolder(BackupConfig config, ManagedFolder folder,
        string archiveFileName, IReadOnlyDictionary<string, string> settingsValues) => null;
    void OnAfterRestoreFolder(BackupConfig config, ManagedFolder folder, bool success,
        string archiveFileName, object? state,
        IReadOnlyDictionary<string, string> settingsValues) { }
}
```

Configuration discovery and full takeover members have default implementations: `GetSupportedConfigTypes`, `CanHandleConfigType`, `TryDiscoverManagedFolders`, `TryCreateConfigs`, `WantsToHandleBackup`, `PerformBackupAsync`, `WantsToHandleRestore`, and `PerformRestoreAsync`.

The usual call order is:

```text
load manifest → Initialize → SetHostContext
discover/create config → backup hook or full takeover → after-backup hook
restore hook/interceptor → standard restore or full takeover → after-restore hook
```

## Manifest and target framework

```json
{
  "Id": "com.example.myplugin",
  "Name": "MyPlugin",
  "Version": "1.0.0",
  "EntryAssembly": "MyPlugin.dll",
  "EntryType": "MyPlugin.MyPlugin",
  "MinHostVersion": "1.8.0"
}
```

The application target framework is `net10.0-windows10.0.19041.0`. Plugin projects should use a compatible .NET 10 Windows target and reference the interface assembly from the actual installation/build output; do not copy a target path from older site content.

## Backup filters and scopes

### `IFolderRewindBackupFilterProvider`

```csharp
PluginBackupFilterContribution? GetBackupFilterContribution(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues);
```

The contribution applies to one backup invocation. The Host clones the effective config and does not mutate the saved whitelist/blacklist.

### `IFolderRewindBackupScopeProvider`

```csharp
IReadOnlyList<PluginBackupScopeDefinition> GetBackupScopeDefinitions(
    BackupConfig config,
    IReadOnlyDictionary<string, string> settingsValues);

PluginBackupScopeResolution ResolveBackupScope(
    BackupConfig config,
    ManagedFolder folder,
    PluginBackupScopeContext scope,
    IReadOnlyDictionary<string, string> settingsValues);
```

`PluginBackupScopeDefinition` supplies an ID, display name, description, and parameter definitions. `PluginBackupScopeContext` carries the selected `ScopeId` and parameters. A resolution is `Applied`, `NotApplicable`, or `Invalid`, and can merge rules with `Append` or `Replace`. Selected-region backup uses `Replace`, so its calculated scope replaces the regular whitelist.

## Backup preparation and folder details

### `IFolderRewindBackupPreparationProvider`

```csharp
string? OnBeforeBackupFolder(
    BackupConfig config,
    ManagedFolder folder,
    BackupInvocationOptions invocationOptions,
    IReadOnlyDictionary<string, string> settingsValues);
```

This interface can inspect trigger source and consistency preferences. If it is not implemented, the core `OnBeforeBackupFolder` hook still runs.

### `IFolderRewindFolderDetailsProvider`

```csharp
Task<IReadOnlyList<FolderDetailsSection>> GetFolderDetailsSectionsAsync(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues,
    CancellationToken cancellationToken);
```

Plugins return read-only key/value data; the Host renders the details dialog. An exception from one provider does not prevent other details from rendering.

## Restore interception and config augmentation

### `IFolderRewindRestoreInterceptor`

```csharp
Task<PluginRestoreInterceptionResult> TryInterceptRestoreAsync(
    BackupConfig config,
    ManagedFolder folder,
    string archiveFileName,
    IReadOnlyDictionary<string, string> settingsValues,
    CancellationToken cancellationToken);
```

Return `Continue` to let the Host proceed, `Handled` when the plugin completed the request, or `Blocked` to reject it. Use `PluginRestoreInterceptionResult.Continue/Handled/Blocked(...)`.

### `IFolderRewindConfigAugmenter`

```csharp
PluginConfigAugmentationResult AugmentConfigs(
    PluginConfigAugmentationRequest request,
    IReadOnlyDictionary<string, string> settingsValues);

bool ShouldAugmentAfterSettingsChange(
    IReadOnlyDictionary<string, string> previousSettings,
    IReadOnlyDictionary<string, string> currentSettings) => false;
```

Return folders to suggest adding. The Host deduplicates, filters conflicts, saves, and notifies the user. Do not mutate `ConfigService.CurrentConfig` directly.

## KnotLink and hotkeys

- `IFolderRewindParameterizedKnotLinkCommandHandler` implements `TryHandleParameterizedKnotLinkCommandAsync(KnotLinkCommandRequest, settingsValues, hostContext)`; see [KnotLink Command API](/en/docs/plugins/developing/knotlink-api).
- `IFolderRewindKnotLinkCapabilityProvider` implements `GetKnotLinkCapabilities()` and publishes discoverable commands and signals.
- `IFolderRewindHotkeyProvider` implements `GetHotkeyDefinitions()` and `OnHotkeyInvokedAsync(...)` for global or in-app hotkeys.

`PluginHostContext` exposes the plugin ID, KnotLink state, event broadcasting, query/send operations, signal subscriptions, and logging. KnotLink payloads must follow strict key-value protocol v2.

## Full backup/restore takeover

Return `WantsToHandleBackup/Restore = true` only when the plugin owns a genuinely different archive format or workflow, then implement:

```csharp
Task<PluginBackupResult> PerformBackupAsync(
    BackupConfig config, ManagedFolder folder, string comment,
    IReadOnlyDictionary<string, string> settingsValues,
    Action<double, string>? progressCallback = null);

Task<PluginRestoreResult> PerformRestoreAsync(
    BackupConfig config, ManagedFolder folder, string archiveFileName,
    IReadOnlyDictionary<string, string> settingsValues,
    Action<double, string>? progressCallback = null);
```

`PluginBackupResult` has `Success`, `GeneratedFileName`, and `Message`; `PluginRestoreResult` has `Success` and `Message`. Prefer hooks and extension interfaces for ordinary plugins so Host history, cleanup, and safety policy remain active.

## Exceptions, threads, and compatibility

- Plugins run in the Host process; catch expected exceptions in hooks, handlers, and detail providers.
- Do not perform long I/O on the UI thread; use async APIs and honor `CancellationToken`.
- Do not cache internal models across versions or mutate Host service state directly.
- New interfaces require 1.8.0. The current MineRewind manifest uses `MinHostVersion: 1.8.1`; set the minimum to the actual API you require.
- A ZIP root must contain `manifest.json` and the entry assembly, with dependencies beside it.

## Related links

- [Plugin Development Quick Start](/en/docs/plugins/developing/quick-start)
- [Tutorial](/en/docs/plugins/developing/tutorial)
- [KnotLink Command API](/en/docs/plugins/developing/knotlink-api)
- [Packaging and Publishing](/en/docs/plugins/developing/packaging)
- [Architecture: Plugin System](/en/docs/architecture/plugin-system)
