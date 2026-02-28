---
sidebar_position: 1
title: Plugin Development Quick Start
description: Build your first FolderRewind plugin from scratch
---

# Plugin Development Quick Start

This guide will help you understand the basics of FolderRewind plugin development.

:::info Prerequisites
- Visual Studio 2022 or later
- .NET 10 SDK
- FolderRewind installed
:::

## Plugin architecture overview

FolderRewind plugins are built on .NET and mainly use these interfaces:

| Interface | Purpose |
|------|------|
| `IFolderRewindPlugin` | Main entry for lifecycle and core functionality |
| `IFolderRewindHotkeyProvider` | Register custom global hotkeys |
| `IFolderRewindKnotLinkCommandHandler` | Handle KnotLink IPC commands |

## Development workflow

### 1. Create a project

Create a .NET class library:

```powershell
dotnet new classlib -n MyPlugin -f net10.0
```

### 2. Add references

Add FolderRewind plugin SDK references to your project.

```xml
<!-- MyPlugin.csproj -->
<ItemGroup>
	<!-- Reference FolderRewind plugin interface assemblies -->
	<!-- Path depends on your FolderRewind installation -->
</ItemGroup>
```

### 3. Implement plugin interfaces

```csharp
using FolderRewind.Plugins;

public class MyPlugin : IFolderRewindPlugin
{
		public string Name => "MyPlugin";
		public string Version => "1.0.0";
		public string Description => "My first FolderRewind plugin";

		// Implement required interface members...
}
```

### 4. Package and test

1. Build and generate your DLL files
2. Put DLL files into FolderRewind's plugin directory
3. Restart FolderRewind and verify plugin loading

## Plugin settings schema

Plugins can define setting schemas, and FolderRewind will render the settings UI automatically.

## Auto-update

Plugins can use GitHub Releases for update checks and delivery.

## References

- [Plugin System Overview](../overview)
- [MineRewind source](https://github.com/Leafuke/FolderRewind)

> More detailed API docs (Plugin API, Hotkey API, KnotLink API, etc.) are provided in this docs section.
