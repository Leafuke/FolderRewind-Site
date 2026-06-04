---
sidebar_position: 1
title: Directory Structure
description: FolderRewind project file tree and directory responsibilities
---

# Directory Structure

## Repository Root

```
FolderRewind/
├── FolderRewind/                        # Main WinUI 3 application project
├── FolderRewind-Plugin-Minecraft/       # MineRewind plugin project
│   └── MineRewind/
├── FolderRewind-Site/                   # Official documentation site (Docusaurus)
├── Reference/                           # Reference codebases (Bili.Copilot, WinUI-Gallery)
├── docs/                                # Internal development documentation
│   ├── PluginDevelopmentGuide.md
│   ├── CodeStructureRefactorPlan.md
│   ├── SponsorEdition.md
│   └── SPONSORS.md
├── .github/                             # GitHub Actions CI/CD workflows
├── 7za.exe                              # Bundled 7-Zip command-line tool
├── FolderRewind.slnx                    # Solution file
├── README.md / README_en.md
├── CONTRIBUTING.md
└── PRIVACY.md
```

## Main Project Internal Structure

```
FolderRewind/
├── App.xaml / App.xaml.cs               # Application entry point, startup orchestration
├── MainWindow.xaml / MainWindow.xaml.cs  # Main window, title bar and tray management
├── AppConstants.cs                      # Window size constants
├── Models/                              # Data models
│   ├── BackupModels.cs                  # Core models (AppConfig, BackupConfig, etc., ~1300 lines)
│   ├── BackupMetadata.cs                # Incremental backup metadata
│   ├── PluginModels.cs                  # Plugin manifest models
│   ├── TemplateModels.cs                # Configuration template models
│   ├── CloudSyncModels.cs               # Cloud sync models
│   ├── HotkeySettings.cs                # Hotkey settings model
│   ├── LogModels.cs                     # Log models
│   └── AppJsonContext.cs                # System.Text.Json source generator context
├── Services/                            # Business logic services (static classes)
│   ├── ConfigService.cs                 # Configuration management (config.json)
│   ├── BackupService.cs                 # Backup orchestration
│   ├── BackupService.Archive.cs         # 7-Zip archive operations
│   ├── BackupService.Filtering.cs       # File filtering logic
│   ├── BackupService.Helpers.cs         # Utility methods
│   ├── BackupService.Metadata.cs        # Incremental backup metadata management
│   ├── BackupService.Pruning.cs         # Old archive cleanup
│   ├── BackupService.Restore.cs         # Restore logic
│   ├── HistoryService.cs                # Backup history management
│   ├── AutomationService.cs             # Scheduled/event-triggered automation
│   ├── NavigationService.cs             # Page navigation
│   ├── ThemeService.cs                  # Theme management
│   ├── NotificationService.cs           # Notification service
│   ├── EncryptionService.cs             # Encryption password management
│   ├── CloudSyncService.cs              # rclone cloud sync
│   ├── MiniWindowService.cs             # Mini window management
│   ├── FolderWatcherService.cs          # File system monitoring
│   ├── FileLockService.cs               # File lock detection
│   ├── StartupService.cs                # Startup registration
│   ├── AppUpdateService.cs              # App update checking
│   ├── SponsorService.cs                # Sponsor edition verification
│   ├── TemplateService.cs               # Configuration template management
│   ├── I18n.cs                          # Internationalization helper
│   ├── UiDispatcherService.cs           # UI thread dispatching
│   ├── MainWindowService.cs             # Main window reference management
│   ├── Plugins/                         # Plugin subsystem
│   │   ├── PluginService.cs             # Plugin lifecycle management
│   │   ├── IFolderRewindPlugin.cs       # Core plugin interface
│   │   ├── IFolderRewindBackupFilterProvider.cs
│   │   ├── IFolderRewindBackupScopeProvider.cs
│   │   ├── IFolderRewindHotkeyProvider.cs
│   │   └── IFolderRewindKnotLinkCommandHandler.cs
│   ├── Hotkeys/                         # Hotkey subsystem
│   │   ├── HotkeyManager.cs
│   │   ├── HotkeyParser.cs
│   │   ├── NativeHotkeyService.cs
│   │   ├── HotkeyGesture.cs
│   │   └── HotkeyDefinition.cs
│   ├── KnotLink/                        # KnotLink protocol implementation
│   │   ├── SignalSender.cs
│   │   ├── SignalSubscriber.cs
│   │   ├── OpenSocketQuerier.cs
│   │   ├── OpenSocketResponser.cs
│   │   ├── TcpClient.cs
│   │   └── KnotLinkCommandParser.cs
│   └── Diagnostics/                     # Diagnostics
│       └── MemoryTelemetryService.cs
├── ViewModels/                          # Page-level ViewModels
│   └── ViewModelBase.cs                 # Base class (ObservableObject + UI dispatching)
├── Views/                               # XAML pages and dialogs
│   ├── ShellPage.xaml                   # Navigation shell
│   ├── HomePage.xaml                    # Home dashboard
│   ├── FolderManagerPage.xaml           # Source folder management
│   ├── BackupTasksPage.xaml             # Backup task progress
│   ├── HistoryPage.xaml                 # History timeline
│   ├── LogPage.xaml                     # Log viewer
│   ├── SettingsPage.xaml                # Settings page
│   ├── MiniWindow.xaml                  # Mini window
│   ├── PluginStorePage.xaml             # Plugin store
│   ├── ConfigSettingsDialog.xaml        # Configuration edit dialog
│   ├── ConfigCloudSyncDialog.xaml       # Cloud sync configuration dialog
│   ├── TemplateManagerDialog.xaml       # Template management dialog
│   ├── TemplateSubmissionDialog.xaml    # Template submission dialog
│   ├── SponsorWindow.xaml               # Sponsor edition info window
│   └── Settings/                        # Settings page sub-controls
│       ├── AboutControl.xaml
│       ├── AppearanceLayoutControl.xaml
│       ├── CoreBehaviorControl.xaml
│       ├── DataManagementControl.xaml
│       ├── DiagnosticsControl.xaml
│       ├── PluginsKnotLinkControl.xaml
│       ├── PresetSettingsControl.xaml
│       └── RuntimeEnvControl.xaml
├── Converters/                          # XAML value converters
│   └── BoolToVisibility, BoolToColor, StringToBitmap, etc.
└── Strings/                             # Localization resources
    ├── zh-CN/Resources.resw
    └── en-US/Resources.resw
```

## Key Entry Files

| File | Startup Responsibility |
|---|---|
| `App.xaml.cs` | Load configuration -> Apply language/theme -> Create main window -> Initialize tray, plugins, automation, KnotLink, diagnostics |
| `MainWindow.xaml.cs` | Title bar integration (Mica), theme updates, close behavior (minimize to tray vs. exit), hotkey initialization |
| `ShellPage.xaml.cs` | Navigation shell, routes page navigation, manages InfoBar notifications, runs startup dialog chain |
