---
sidebar_position: 1
title: "Plugin development quick start"
description: "Create an independent plugin with public SDK 3.17.0, implement its lifecycle and manifest, build a .frplugin and verify installation and activation."
reviewed_baseline: "1.10-api3.17"
---

# Plugin development quick start

Start with a minimal lifecycle plugin. Build, package and install it first, then add the capabilities you need.

## Prepare the environment and project

Install .NET 10 SDK, Node.js 24 and Python 3.10+ and get the [website repository examples](https://github.com/Leafuke/FolderRewind-Site/tree/main/examples/plugins). The public `FolderRewind.Plugin.Abstractions 3.17.0` NuGet package supplies API 3.17.

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0
dotnet add MyFirstPlugin package FolderRewind.Plugin.Abstractions --version 3.17.0
```

Reference Abstractions only. Set `Private="false"` on that reference so the Host supplies the shared contract assembly at runtime.

## Implement the lifecycle

This code is loaded directly from the buildable example:

import CodeBlock from '@theme/CodeBlock';
import MinimalSource from '!!raw-loader!@site/examples/plugins/MinimalPlugin/Plugin.cs';

<CodeBlock language="csharp" title="MinimalPlugin/Plugin.cs">{MinimalSource}</CodeBlock>

Activation reads snapshots and registers capabilities, which the Host validates before exposing. This minimal example exercises activation and deactivation. Add discovery or commands as your next step.

## Manifest and settings

import MinimalManifest from '!!raw-loader!@site/examples/plugins/MinimalPlugin/manifest.json?raw';
import MinimalSettings from '!!raw-loader!@site/examples/plugins/MinimalPlugin/settings.schema.json?raw';

<CodeBlock language="json" title="manifest.json">{MinimalManifest}</CodeBlock>
<CodeBlock language="json" title="settings.schema.json">{MinimalSettings}</CodeBlock>

Use `manifestVersion=3`, an API major/minor and a stable plugin ID. The entry type is fully qualified. Supply a valid empty settings array when the plugin has no settings.

## Build and install

Run from the website repository root:

```powershell
node scripts/pack-plugin.mjs MinimalPlugin
Get-FileHash .\artifacts\examples\MinimalPlugin-1.0.0.frplugin -Algorithm SHA256
```

The package root contains the manifest, settings and plugin DLL, with private dependencies alongside them. Open plugin management, install the local package, review its declarations and enable it.

Check runtime state and activation diagnostics. For loading issues, review API compatibility, entry type, settings and capability registration. Complete any restart requested by the interface.

Continue with [GameRewind](/docs/plugins/developing/tutorial), the [API reference](/docs/plugins/developing/plugin-api) and [packaging](/docs/plugins/developing/packaging).

<span id="add-manifestjson" />
<span id="choose-interfaces" />
<span id="create-the-project" />
<span id="implement-the-core-lifecycle" />
<span id="knotlink-and-region-examples" />
<span id="next-steps" />
<span id="package-and-test" />

<span id="prerequisites" />
<span id="create-an-independent-library" />

<span id="static-manifest-and-settings" />
<span id="build-package-and-install" />
<span id="verify-and-troubleshoot" />
