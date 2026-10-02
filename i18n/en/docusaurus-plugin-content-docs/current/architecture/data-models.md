---
sidebar_position: 6
title: "Configuration and immutable history models"
description: "FolderRewind 1.9 configuration and immutable history models: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Configuration and immutable history models

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
  Branch[Branch Updates] --> CP
  WS[Local Workspace] --> Branch
```

A Commit Pack publishes related Run/Version/Representation/Checkpoint/BranchUpdate facts. Representations carry physical dependencies/fidelity; Versions are logical state. Replica lifecycle differs from local observations. Annotations update comments/Pins/presentation without rewriting Versions.

## Local state and caches

Index/Capture Baseline Cache are rebuildable; Workspace/Local Replica Catalog are local durable state, not shared history. Safety points protect Checkpoint closure without branch advancement. Config/history migration are separate; the legacy HistoryItem list is not the new model.

Public Abstractions record snapshots differ from observable Host models; plugins never retain writable BackupConfig/ManagedFolder references.

<span id="appconfig-hierarchy" />
<span id="core-model-descriptions" />
<span id="appconfig" />
<span id="backupconfig" />
<span id="globalsettings" />
<span id="managedfolder" />
<span id="incremental-backup-metadata" />
<span id="history-and-tasks" />
<span id="serialization" />
