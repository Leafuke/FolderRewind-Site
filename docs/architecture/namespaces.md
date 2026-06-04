---
sidebar_position: 3
title: 命名空间参考
description: 各命名空间职责与关键类速查
---

# 命名空间参考

所有源代码位于 `FolderRewind` 根命名空间下。

| 命名空间 | 职责 | 关键类 | 所属目录 |
|---|---|---|---|
| `FolderRewind` | 应用入口与窗口 | `App`, `MainWindow`, `AppConstants` | 根目录 |
| `FolderRewind.Models` | 数据模型定义 | `AppConfig`, `BackupConfig`, `ManagedFolder`, `ArchiveSettings`, `AutomationSettings`, `FilterSettings`, `HistoryItem`, `BackupTask` | `Models/` |
| `FolderRewind.Services` | 业务逻辑（静态服务） | `ConfigService`, `BackupService`, `HistoryService`, `AutomationService`, `NavigationService`, `ThemeService`, `NotificationService`, `I18n` | `Services/` |
| `FolderRewind.Services.Plugins` | 插件接口与管理 | `IFolderRewindPlugin`, `PluginService`, `IFolderRewindBackupFilterProvider`, `IFolderRewindBackupScopeProvider`, `IFolderRewindHotkeyProvider`, `IFolderRewindKnotLinkCommandHandler` | `Services/Plugins/` |
| `FolderRewind.Services.Hotkeys` | 快捷键管理 | `HotkeyManager`, `HotkeyParser`, `NativeHotkeyService`, `HotkeyGesture`, `HotkeyDefinition` | `Services/Hotkeys/` |
| `FolderRewind.Services.KnotLink` | KnotLink 协议实现 | `SignalSender`, `SignalSubscriber`, `OpenSocketQuerier`, `OpenSocketResponser`, `TcpClient`, `KnotLinkCommandParser` | `Services/KnotLink/` |
| `FolderRewind.Services.Diagnostics` | 性能诊断 | `MemoryTelemetryService` | `Services/Diagnostics/` |
| `FolderRewind.ViewModels` | 页面级 ViewModel | `ViewModelBase`（基类），各页面 ViewModel | `ViewModels/` |
| `FolderRewind.Views` | XAML 页面与对话框 | `ShellPage`, `HomePage`, `SettingsPage`, `ConfigSettingsDialog` 等 | `Views/` |
| `FolderRewind.Converters` | XAML 值转换器 | `BoolToVisibility`, `BoolToColor`, `StringToBitmap` 等 | `Converters/` |
