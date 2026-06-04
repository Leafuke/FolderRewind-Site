---
sidebar_position: 0
title: Architecture Overview
description: FolderRewind project tech stack and architecture bird's-eye view
---

# Architecture Overview

**FolderRewind** is a WinUI 3-based Windows backup management tool. It adopts the MVVM architecture, organizes business logic through a static service layer, and supports plugin extensions and a remote command protocol.

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | .NET + Windows App SDK | .NET 10 / WinAppSDK 2.1.3 |
| UI | WinUI 3 | — |
| MVVM | CommunityToolkit.Mvvm | 8.4.2 |
| Compression Engine | 7-Zip (7za.exe) | Bundled |
| Cloud Sync | rclone | User-provided |
| System Tray | H.NotifyIcon.WinUI | 2.4.1 |
| Serialization | System.Text.Json + Source Generator | — |
| Settings Controls | CommunityToolkit.WinUI.SettingsControls | 8.2.251219 |

## Architecture Bird's-Eye View

```mermaid
graph TB
    subgraph Views["Views"]
        ShellPage
        HomePage
        SettingsPage
        OtherPages["Other Pages & Dialogs"]
    end

    subgraph ViewModels["ViewModels"]
        VM["Page ViewModels"]
    end

    subgraph Services["Services"]
        ConfigService
        BackupService
        HistoryService
        AutomationService
        PluginService
        OtherSvc["Navigation / Theme / Notification / ..."]
    end

    subgraph Models["Models"]
        AppConfig
        BackupConfig
        ManagedFolder
        OtherModel["HistoryItem / BackupMetadata / ..."]
    end

    subgraph Plugins["Plugin System"]
        IFolderRewindPlugin
        KnotLink
        MineRewind["MineRewind Plugin"]
    end

    subgraph External["External Dependencies"]
        SevenZip["7za.exe"]
        Rclone["rclone"]
    end

    Views --> ViewModels
    ViewModels --> Services
    Services --> Models
    Services --> Plugins
    Plugins --> External
    BackupService --> SevenZip
    CloudSyncService["CloudSyncService"] --> Rclone
```

## Documentation Navigation

| Document | Content |
|---|---|
| [Directory Structure](./directory-structure.md) | Project file tree and directory responsibilities |
| [Architecture Patterns](./patterns.md) | MVVM, static services, Shell navigation, and other core design patterns |
| [Namespace Reference](./namespaces.md) | Namespace layout and key class quick reference |
| [Service Layer Overview](./services.md) | 40+ services grouped by functional domain |
| [Plugin System](./plugin-system.md) | Plugin interface, lifecycle, and KnotLink protocol |
| [Data Models](./data-models.md) | AppConfig hierarchy and serialization strategy |
| [Views & Navigation](./views.md) | Page list, dialogs, and navigation flow |
