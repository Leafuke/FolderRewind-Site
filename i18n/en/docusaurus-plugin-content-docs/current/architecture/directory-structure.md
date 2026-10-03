---
sidebar_position: 1
title: "Repository directories and build boundaries"
description: "FolderRewind 1.9 repository directories and build boundaries: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Repository directories and build boundaries

```text
FolderRewind/
  Views/ ViewModels/ Models/ Services/
  History/
    Domain/ Storage/ Index/ LocalState/
    Application/ Representation/ Retention/ Cloud/ Migration/ Merge/
  Assets/ Strings/ Styles/ Controls/ Converters/
FolderRewind.Plugin.Abstractions/
FolderRewind.Plugin.Runtime/
FolderRewind.Tests/
FolderRewind.Plugin.Abstractions.Tests/
FolderRewind.Plugin.Runtime.Tests/
Installer/ .github/ docs/
```

## UI and Host

Views bind interactions; ViewModels own state/async commands. Models are split by configuration/scopes/filters/automation/cloud/plugins/discovery, rather than the old1300-line BackupModels.cs listing. Services includes Host adapters/discovery/Plugins/V3 orchestration.

## Core and external repos

Abstractions has Manifest/Lifecycle/Capabilities/Snapshots/Identifiers/Artifacts/KnotLinkCoreCommands. Runtime owns Activation/Loading/Settings/Packaging/Operations/artifact transactions, not the public plugin reference boundary.

MineRewind, Catalog and website are independent repos. Nearby checkouts do not become Host solution inputs; acceptance pins artifacts. Verify actual project files rather than copying legacy trees.

<span id="repository-root" />
<span id="main-project-internal-structure" />
<span id="key-entry-files" />
