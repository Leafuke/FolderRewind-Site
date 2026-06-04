---
sidebar_position: 3
title: Namespace Reference
description: Quick reference of namespace responsibilities and key classes
---

# Namespace Reference

All source code resides under the `FolderRewind` root namespace.

| Namespace | Responsibility | Key Classes | Source Directory |
|---|---|---|---|
| `FolderRewind` | Application entry point and window | `App`, `MainWindow`, `AppConstants` | Root directory |
| `FolderRewind.Models` | Data model definitions | `AppConfig`, `BackupConfig`, `ManagedFolder`, `ArchiveSettings`, `AutomationSettings`, `FilterSettings`, `HistoryItem`, `BackupTask` | `Models/` |
| `FolderRewind.Services` | Business logic (static services) | `ConfigService`, `BackupService`, `HistoryService`, `AutomationService`, `NavigationService`, `ThemeService`, `NotificationService`, `I18n` | `Services/` |
| `FolderRewind.Services.Plugins` | Plugin interfaces and management | `IFolderRewindPlugin`, `PluginService`, `IFolderRewindBackupFilterProvider`, `IFolderRewindBackupScopeProvider`, `IFolderRewindHotkeyProvider`, `IFolderRewindKnotLinkCommandHandler` | `Services/Plugins/` |
| `FolderRewind.Services.Hotkeys` | Hotkey management | `HotkeyManager`, `HotkeyParser`, `NativeHotkeyService`, `HotkeyGesture`, `HotkeyDefinition` | `Services/Hotkeys/` |
| `FolderRewind.Services.KnotLink` | KnotLink protocol implementation | `SignalSender`, `SignalSubscriber`, `OpenSocketQuerier`, `OpenSocketResponser`, `TcpClient`, `KnotLinkCommandParser` | `Services/KnotLink/` |
| `FolderRewind.Services.Diagnostics` | Performance diagnostics | `MemoryTelemetryService` | `Services/Diagnostics/` |
| `FolderRewind.ViewModels` | Page-level ViewModels | `ViewModelBase` (base class), per-page ViewModels | `ViewModels/` |
| `FolderRewind.Views` | XAML pages and dialogs | `ShellPage`, `HomePage`, `SettingsPage`, `ConfigSettingsDialog`, etc. | `Views/` |
| `FolderRewind.Converters` | XAML value converters | `BoolToVisibility`, `BoolToColor`, `StringToBitmap`, etc. | `Converters/` |
