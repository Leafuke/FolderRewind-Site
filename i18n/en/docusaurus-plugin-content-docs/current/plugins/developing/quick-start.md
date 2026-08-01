---
sidebar_position: 1
title: Plugin Development Quick Start
description: Build, package, and test a FolderRewind 1.8 plugin
---

# Plugin Development Quick Start

This guide covers the shortest path from a .NET project to an installed FolderRewind 1.8 plugin.

:::info Prerequisites
- Visual Studio 2022 or JetBrains Rider
- .NET 10 SDK
- FolderRewind installed ([Downloads](/en/download))
:::

## Choose interfaces

Every plugin implements `IFolderRewindPlugin`. Add only the optional interfaces you need:

| Interface | Purpose |
|-----------|---------|
| `IFolderRewindBackupFilterProvider` | Per-backup include/exclude rules |
| `IFolderRewindBackupScopeProvider` | Configurable scopes such as selected Minecraft regions |
| `IFolderRewindBackupPreparationProvider` | Trigger and consistency context before backup |
| `IFolderRewindFolderDetailsProvider` | Read-only folder detail sections |
| `IFolderRewindRestoreInterceptor` | Handle or block restore before side effects |
| `IFolderRewindConfigAugmenter` | Suggest discovered folders for existing configs |
| `IFolderRewindParameterizedKnotLinkCommandHandler` | Parameterized KnotLink v2 commands |
| `IFolderRewindKnotLinkCapabilityProvider` | Discoverable KnotLink command/signal manifest |
| `IFolderRewindHotkeyProvider` | Global or in-app hotkeys |

Interfaces introduced in 1.8 require `"MinHostVersion": "1.8.0"`.

## Create the project

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0-windows10.0.19041.0
```

Reference the FolderRewind assembly from the actual build output:

```xml
<Reference Include="FolderRewind">
  <HintPath>..\..\FolderRewind\FolderRewind\bin\Release\net10.0-windows10.0.19041.0\FolderRewind.dll</HintPath>
</Reference>
```

The application uses .NET 10 with Windows App SDK 2.3.1. Use the target framework from the current project file rather than copying an old path.

## Add `manifest.json`

```json
{
  "Id": "com.example.myfirstplugin",
  "Name": "MyFirstPlugin",
  "Version": "1.0.0",
  "Author": "YourName",
  "Description": "My first FolderRewind plugin",
  "EntryAssembly": "MyFirstPlugin.dll",
  "EntryType": "MyFirstPlugin.MyPlugin",
  "MinHostVersion": "1.8.0"
}
```

## Implement the core lifecycle

```csharp
using FolderRewind.Models;
using FolderRewind.Services.Plugins;

public sealed class MyPlugin : IFolderRewindPlugin
{
    public PluginInstallManifest Manifest { get; } = new()
    {
        Id = "com.example.myfirstplugin",
        Name = "MyFirstPlugin",
        Version = "1.0.0",
        Author = "YourName",
        Description = "My first FolderRewind plugin",
        EntryAssembly = "MyFirstPlugin.dll",
        EntryType = "MyFirstPlugin.MyPlugin",
        MinHostVersion = "1.8.0"
    };

    public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
        => Array.Empty<PluginSettingDefinition>();

    public void Initialize(IReadOnlyDictionary<string, string> settingsValues) { }

    public string? OnBeforeBackupFolder(
        BackupConfig config, ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues) => null;

    public void OnAfterBackupFolder(
        BackupConfig config, ManagedFolder folder, bool success,
        string? generatedArchiveFileName,
        IReadOnlyDictionary<string, string> settingsValues) { }

    public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(
        string selectedRootPath,
        IReadOnlyDictionary<string, string> settingsValues)
        => Array.Empty<ManagedFolder>();
}
```

The remaining core methods have default implementations. Add extension interfaces only after deciding which Host behavior the plugin owns.

## Package and test

The ZIP must contain a top-level plugin directory:

```text
MyFirstPlugin.zip
└─ MyFirstPlugin/
   ├─ manifest.json
   ├─ MyFirstPlugin.dll
   └─ dependencies/
```

Install it from **Settings → Plugin Management → Local Install**, restart if requested, and verify the manifest, minimum Host version, settings, and one backup/restore test.

## KnotLink and region examples

- For parameterized commands, follow [KnotLink Command API](./knotlink-api) and declare runtime capabilities.
- For a custom backup scope, follow [Backup Scope API](./plugin-api) and fail closed on invalid parameters.
- For a complete reference implementation, see [MineRewind source](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft).

## Next steps

- [Plugin API Reference](./plugin-api)
- [KnotLink Command API](./knotlink-api)
- [Packaging and Publishing](./packaging)
- [Tutorial: Build a Game Save Backup Plugin](./tutorial)
