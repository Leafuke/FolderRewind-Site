---
sidebar_position: 4
title: Service Layer Overview
description: 40+ services grouped by functional domain
---

# Service Layer Overview

FolderRewind organizes its business logic through static service classes. The following groups them by functional domain.

## Core Backup

| Service | File | Responsibility |
|---|---|---|
| `BackupService` | `Services/BackupService.cs` + 6 partial files | Backup/restore orchestration, 7-Zip archiving, file filtering, metadata management, old archive cleanup |
| `HistoryService` | `Services/HistoryService.cs` | Manages backup history records in `history.json`, provides data for the timeline view |
| `ConfigService` | `Services/ConfigService.cs` | Configuration load / save / migration / import / export; single source of truth for application state |

## Automation & Scheduling

| Service | File | Responsibility |
|---|---|---|
| `AutomationService` | `Services/AutomationService.cs` | Scheduled backup engine: interval backups, scheduled tasks, conditional triggers (file lock detection) |
| `FolderWatcherService` | `Services/FolderWatcherService.cs` | File system monitoring, supports event-triggered backups |
| `FileLockService` | `Services/FileLockService.cs` | Detects whether a file is in use, used for conditional automation decisions |

## Plugin & Extension

| Service | File | Responsibility |
|---|---|---|
| `PluginService` | `Services/Plugins/PluginService.cs` | Plugin lifecycle: scanning, installation (zip), uninstallation, loading (AssemblyLoadContext), enable/disable, version checking, settings persistence |
| `KnotLinkService` | `Services/KnotLinkService.cs` | KnotLink remote command/event protocol, allows external tools to trigger backup/restore via TCP |

## UI Helpers

| Service | File | Responsibility |
|---|---|---|
| `NavigationService` | `Services/NavigationService.cs` | Static navigation service, holds an `INavigationHost` reference, dispatches page navigation requests |
| `NotificationService` | `Services/NotificationService.cs` | In-app InfoBar notifications and Windows Toast notifications |
| `ThemeService` | `Services/ThemeService.cs` | Theme management (dark/light/follow system), accent color presets, background material (Mica/Acrylic) |
| `MiniWindowService` | `Services/MiniWindowService.cs` | Manages a compact mini window for quickly triggering a single folder backup |
| `UiDispatcherService` | `Services/UiDispatcherService.cs` | Centralized UI thread dispatcher for non-UI services/ViewModels to post operations |

## System Integration

| Service | File | Responsibility |
|---|---|---|
| `StartupService` | `Services/StartupService.cs` | Windows startup task registration |
| `AppUpdateService` | `Services/AppUpdateService.cs` | GitHub Release update checking with multiple download sources (official/mirror/custom) |
| `SponsorService` | `Services/SponsorService.cs` | Sponsor edition license verification (Microsoft Store entitlement) |
| `CloudSyncService` | `Services/CloudSyncService.cs` | Cloud upload/download via rclone, queues upload after backup, downloads missing archives before restore |

## Security

| Service | File | Responsibility |
|---|---|---|
| `EncryptionService` | `Services/EncryptionService.cs` | Password management for encrypted backups (DPAPI-protected storage) |

## Other

| Service | File | Responsibility |
|---|---|---|
| `I18n` | `Services/I18n.cs` | Internationalization helper, wraps `ResourceLoader` string lookup and formatting, supports `PickBest()` multilingual dictionary |
| `TemplateService` | `Services/TemplateService.cs` | Configuration template creation, export, import, and community sharing |
| `MainWindowService` | `Services/MainWindowService.cs` | Main window reference management and sponsor edition window lifecycle |
| `MemoryTelemetryService` | `Services/Diagnostics/MemoryTelemetryService.cs` | Performance monitoring and memory diagnostics |
