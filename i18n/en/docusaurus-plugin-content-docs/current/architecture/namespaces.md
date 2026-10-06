---
sidebar_position: 3
title: "Namespaces and contract entrypoints"
description: "Locate implementation entrypoints by namespace and distinguish Host models, public plugin contracts and runtime responsibilities."
reviewed_baseline: "1.9-api3.9"
---

# Namespaces and contract entrypoints

Locate implementation entrypoints by namespace and distinguish Host models, public plugin contracts and runtime responsibilities.

| Namespace | Responsibility |
|---|---|
| FolderRewind.Views/ViewModels | Pages/interactions/state/commands |
| FolderRewind.Models | User config and Host persistence/UI models |
| FolderRewind.Services | Host orchestration/environment/adapters |
| FolderRewind.Services.Discovery | Providers/manifests/resources/review/draft transactions |
| FolderRewind.Services.Plugins.V3 | SDK snapshot/request mapping and Host runtime adapters |
| FolderRewind.History.Domain | Immutable Version/Checkpoint/Branch/Representation/Replica facts |
| FolderRewind.History.Application | Runtime/commit/Restore/Checkout/Merge/migration/transfer |
| FolderRewind.History.Storage/Index/LocalState | Packs/projections/device state |
| FolderRewind.History.Representation/Retention/Cloud | Materialization/closure protection/shared sync |
| FolderRewind.Plugin.Abstractions | Public plugin SDK boundary |
| FolderRewind.Plugin.Runtime | Host runtime implementation |

Plugin authors import IFolderRewindPlugin/capabilities from Abstractions, not old Host Services.Plugins/Models namespaces. Namespaces/display names are not product identities; manifest API controls compatibility.
