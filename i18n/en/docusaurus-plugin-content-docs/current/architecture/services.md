---
sidebar_position: 4
title: "Service orchestration and core responsibilities"
description: "Find service entrypoints for configuration, backup, restore, cloud transfer and plugin orchestration."
reviewed_baseline: "1.9-api3.9"
---

# Service orchestration and core responsibilities

Find service entrypoints for configuration, backup, restore, cloud transfer and plugin orchestration.

| Subsystem | Entrypoints/responsibilities |
|---|---|
| Config | ConfigService/ConfigWriteCoordinator: serialized snapshots/recovery mode |
| Backup | BackupService: source resolution/capture/Host transaction outcomes;7-Zip payload backend |
| History | NativeHistoryCoreGateway/HistoryRuntime/commit-query-restore: repositories/indexes/Workspace/gates |
| History UI | NativeHistoryApplicationService/NativeHistoryRestoreOrchestrator: sources/coordinators/result mapping |
| Cloud | CloudSyncService/RcloneNativeHistoryTransport/MetadataSync/ReplicaSync: frozen connections/union/verified replicas |
| Plugins | Host PluginService + PluginRuntimeManager: static install/activation/draining/settings/Catalog |
| Discovery | GameDiscoveryService/providers/three-wayReview/DraftTransaction: candidates/controlled commits |
| Onboarding | CloudSetup/MinecraftOnboarding/creation transactions: steps/diagnostics/single commit |
| Automation | Cancellable schedules/unlock/target/no-change policy |
| UI | Navigation/AppDialog/Notification/Theme/MiniWindow/Dispatcher adapters |

Old mutable history.json HistoryService is not native authority; old single-file TemplateService/PluginService lists do not describe current modules. Follow responsibilities/test boundaries and inspect actual partial files.

Restore assesses/materializes/verifies before atomic Host mutation. Coordinators cannot nest Host writes. Config transfer, packs sync and payload transfer differ. Propagate failure stages/cancellation instead of treating queued work as completed.

<span id="automation--scheduling" />
<span id="core-backup" />
<span id="other" />
<span id="plugin--extension" />
<span id="security" />
<span id="system-integration" />
<span id="ui-helpers" />
