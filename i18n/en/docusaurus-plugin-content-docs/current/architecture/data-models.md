---
sidebar_position: 6
title: "Configuration and immutable history models"
description: "Understand how user configuration, source identities and immutable history relate when maintaining persisted data or diagnosing state."
reviewed_baseline: "1.9-api3.9"
---

# Configuration and immutable history models

Understand how user configuration, source identities and immutable history relate when maintaining persisted data or diagnosing state.

## User configuration

AppConfig holds GlobalSettings, BackupConfigs and templates/presets. BackupConfig includes stableId, ConfigRevision, Kind, HostOrigin, ProviderStates, SourceFolders, Archive, Automation, Filters, BackupScope, Cloud, encryption and HistoryRepositoryBinding.

ManagedFolder has stableId/Path/DisplayName/SourceScope/state. Kind is OwnerId+KindId; history binding stores format rather than sharing machine repository paths. Settings/state and discovery/user ownership differ.

## History facts

```mermaid
flowchart LR
  Run[Backup Run] --> CP[Configuration Checkpoint]
  CP --> SV[Source Versions]
  SV --> Rep[Version Representations]
  Rep --> Copy[Storage Replicas]
  Branch[Source Branch Updates] --> SV
  WS[Local Workspace] --> Branch
```

A Commit Pack publishes related Run/Version/Representation/Checkpoint/BranchUpdate facts. Representations carry physical dependencies/fidelity; Versions are logical state. Replica lifecycle differs from local observations. Annotations update comments/Pins/presentation without rewriting Versions.

## Local state and caches

Index/Capture Baseline Cache are rebuildable; Workspace/Local Replica Catalog are local durable state, not shared history. Safety points protect Checkpoint closure without branch advancement. Config/history migration are separate; the legacy HistoryItem list is not the new model.

Public Abstractions record snapshots differ from observable Host models; plugins never retain writable BackupConfig/ManagedFolder references.

<span id="appconfig" />
<span id="appconfig-hierarchy" />
<span id="backupconfig" />
<span id="core-model-descriptions" />
<span id="globalsettings" />
<span id="history-and-tasks" />
<span id="incremental-backup-metadata" />
<span id="managedfolder" />
<span id="serialization" />

## Source-owned branches

Each source owns its branches and local baseline; two sources in one project can each have `main`. Backing up, checking out or merging one does not switch another's branch. Ordinary restore updates the content baseline while retaining the active branch; Checkout switches it. Configuration checkpoints and backup runs reference participating sources; unrequested sources are not failures.
