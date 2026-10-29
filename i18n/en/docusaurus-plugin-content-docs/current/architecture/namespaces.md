---
sidebar_position: 3
title: "Namespaces and contract entrypoints"
description: "Locate implementation entrypoints by namespace and distinguish Host models, public plugin contracts and runtime responsibilities."
reviewed_baseline: "development-1.10"
---

# Namespaces and contract entrypoints

> This page describes the 1.10 development layout; it does not announce a released version.

Namespaces stay stable while directories and assemblies provide the new organizational boundaries.

| Namespace | Responsibility and ownership |
|---|---|
| FolderRewind.Views / ViewModels | Application UI and interactions |
| FolderRewind.Models | Pure models may live in Core; application configuration roots and presentation remain Host-owned |
| FolderRewind.Services | Headless Core policies and application orchestration/adapters, distinguished by project ownership |
| FolderRewind.History.* | Core history capabilities; Host binding entry points remain in the application |
| FolderRewind.Plugin.Abstractions | The only public plugin SDK |
| FolderRewind.Plugin.Runtime | Loading, activation, capability routing and Artifact transactions |

Use project references and actual file locations to identify ownership rather than inferring an assembly from a namespace. Assembly identity, configuration identity and manifest identity are not directory names. Plugins must not add Core, Runtime or application references because of this migration.
