---
sidebar_position: 4
title: "Service orchestration and responsibilities"
description: "Locate configuration, capture, history, merging, cloud recovery, notifications and plugin services and follow preparation, commits and UI results."
reviewed_baseline: "1.10-api3.17"
---

# Service orchestration and responsibilities

| Subsystem | Entry points and responsibility |
| --- | --- |
| Configuration | ConfigService, ConfigWriteCoordinator: snapshots, serialized persistence, recovery and migration activation |
| Capture | BackupService and Core policy: scope, differences, compression input and capture outcomes |
| History | HistoryRuntime, query and commit services: immutable facts, source branches, Workspace and index |
| Merging | MergeOperationService and HistoryMerge services: plans, decisions, result review and controlled apply |
| Maps | SpatialWorkspace and SpatialPreview: fixed history inputs, comparison, selection and display state |
| Cloud | CloudSetupCoordinator, CloudSyncService: connections, authorization, upload and sync |
| Cloud recovery | CloudReadOnlyRecoveryService: read history, download dependencies and recover to a new location |
| OpenList | OpenListRuntimeService: status and startup of a specified local instance |
| Plugins | PluginService, PluginRuntimeManager: installation, activation, routes, leases and updates |
| Discovery | GameDiscoveryService, Review, DraftTransaction: candidate review and project creation |
| Automation | AutomationService: scheduling, conditions, cancellation and unchanged-run stopping |
| Notifications | NotificationCoordinator, NotificationCenterService: result aggregation, alert policy and navigation |

Restore assesses, materializes and verifies before the Host transaction changes the destination. Plugin coordination surrounds actual mutation; analysis and building use staged inputs and outputs.

Connections, history sync and payload transfers track outcomes separately. Operation contexts carry cancellation and diagnostics to ViewModels. Final results appear in Tasks, logs and the notification center.

Locate concrete partial files by project and feature directory. See the [architecture overview](/docs/architecture/) for dependencies.

<span id="automation--scheduling" />
<span id="core-backup" />
<span id="other" />
<span id="plugin--extension" />
<span id="security" />
<span id="system-integration" />
<span id="ui-helpers" />

<span id="service-orchestration-and-core-responsibilities" />
