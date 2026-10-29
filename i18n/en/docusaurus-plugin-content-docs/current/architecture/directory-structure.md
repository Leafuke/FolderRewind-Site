---
sidebar_position: 1
title: "Repository directories and build boundaries"
description: "Find the UI, history core, plugin contracts and validation tools, and understand their build boundaries."
reviewed_baseline: "development-1.10"
---

# Repository directories and build boundaries

> This page describes the 1.10 development layout; it does not announce a released version.

```text
FolderRewind.slnx
src/
  FolderRewind/
  FolderRewind.Core/
  FolderRewind.Plugin.Abstractions/
  FolderRewind.Plugin.Runtime/
tests/
  FolderRewind.Tests/
  FolderRewind.Core.Recovery.Tests/
  FolderRewind.TestSupport/
  FolderRewind.Plugin.Abstractions.Tests/
  FolderRewind.Plugin.Runtime.Tests/
Installer/  tools/  benchmarks/  scripts/  docs/
```
Production projects live in src; tests and shared fixtures live in tests. Installer holds installer sources, tools holds standalone probes, benchmarks holds performance runners and analysis, and scripts separates common, build, test, integration, release and maintenance entry points. Generated evidence belongs in ignored artifacts.

The application retains MVVM: Views, ViewModels, Models and Services group files by feature within each layer. Partial types stay together. Controls, Converters, Styles, Strings and Assets retain their roles. Moving files does not rename namespaces or change persisted formats or plugin identities.

Core owns History domain, storage, indexing, capture, restore, merge, retention, migration and replica algorithms plus related headless policies. Startup, windows, notifications, resources and Host composition remain in the application. Core remains Windows-oriented without WinUI; Runtime never references Core and plugins reference only Abstractions.

MineRewind, Catalog, templates and the website remain separate repositories. Host docs retains terminology, effective ADRs and protocol/safety specifications; plans, progress and run reports are not permanent documentation.

<span id="repository-root" />
<span id="main-project-internal-structure" />
<span id="key-entry-files" />
