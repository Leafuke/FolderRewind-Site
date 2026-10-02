---
sidebar_position: 1
title: "Plugin development quick start"
description: "FolderRewind 1.9 plugin development quick start: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Plugin development quick start

This guide targets FolderRewind 1.9 and Plugin API 3.5. App, plugin product, package and assembly versions are independent.

## Prerequisites

Install .NET 10 SDK, Node.js 24 and Python 3.10+, an editor supporting .NET 10, and a Host supporting API 3.5. Get the projects from the [website source repository](https://github.com/Leafuke/FolderRewind-Site/tree/codex/docs-1.9-refresh/examples/plugins).

:::info[Release candidate baseline]
The examples require Abstractions 3.5.0. Confirm it is listed on NuGet.org before following the public restore path. A missing version means the release is unavailable; do not replace the reference with FolderRewind.dll. Local package validation on the release branch does not establish public availability.
:::

## Create an independent library

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0
dotnet add MyFirstPlugin package FolderRewind.Plugin.Abstractions --version 3.5.0
```

Reference only `FolderRewind.Plugin.Abstractions`. Set `Private="false"` on that package reference. Do not reference the application, WinUI, Models or Runtime, or bundle the Abstractions DLL.

## Implement the lifecycle

The following is the buildable MinimalPlugin source:

import CodeBlock from '@theme/CodeBlock';
import MinimalSource from '!!raw-loader!@site/examples/plugins/MinimalPlugin/Plugin.cs';

<CodeBlock language="csharp" title="MinimalPlugin/Plugin.cs">{MinimalSource}</CodeBlock>

During activation, read settings/config snapshots and register capabilities. The Host exposes them only after validation and atomic commit. This minimal lifecycle example contributes no backup command.

## Static manifest and settings

import MinimalManifest from '!!raw-loader!@site/examples/plugins/MinimalPlugin/manifest.json';
import MinimalSettings from '!!raw-loader!@site/examples/plugins/MinimalPlugin/settings.schema.json';

<CodeBlock language="json" title="manifest.json">{MinimalManifest}</CodeBlock>
<CodeBlock language="json" title="settings.schema.json">{MinimalSettings}</CodeBlock>

Use `manifestVersion` 3, `pluginApi` 3.5 and exact camelCase fields. The entry type is fully qualified. Even a plugin without settings needs a valid empty settings schema.

## Build, package and install

From the website repository root:

```powershell
node scripts/pack-plugin.mjs MinimalPlugin
Get-FileHash .\artifacts\examples\MinimalPlugin-1.0.0.frplugin -Algorithm SHA256
```

The ZIP-based `.frplugin` has `manifest.json`, `settings.schema.json` and the entry DLL directly at its root. No Abstractions DLL or extra top-level plugin directory is allowed.

Use local install in plugin management and review the declarations. New installs are disabled; code first runs after explicit Enable. Normal transitions are live; restart only when the Host reports RequiresRestart.

## Verify and troubleshoot

Check product, version, provenance, requested services and runtime state. For failures, check API compatibility, entry type, typed settings and manifest/registration agreement. Enabled intent alone does not prove activation succeeded.

Continue with the [tutorial](/docs/plugins/developing/tutorial), [API reference](/docs/plugins/developing/plugin-api) and [packaging guide](/docs/plugins/developing/packaging).

<span id="choose-interfaces" />
<span id="create-the-project" />
<span id="add-manifestjson" />
<span id="implement-the-core-lifecycle" />
<span id="package-and-test" />
<span id="knotlink-and-region-examples" />
<span id="next-steps" />
