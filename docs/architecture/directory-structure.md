---
sidebar_position: 1
title: 目录结构
description: FolderRewind 项目文件树与各目录职责
---

# 目录结构

## 仓库根目录

```
FolderRewind/
├── FolderRewind/                        # 主 WinUI 3 应用项目
├── FolderRewind-Plugin-Minecraft/       # MineRewind 插件项目
│   └── MineRewind/
├── FolderRewind-Site/                   # 官方文档网站（Docusaurus）
├── Reference/                           # 参考代码库（Bili.Copilot, WinUI-Gallery）
├── docs/                                # 内部开发文档
│   ├── PluginDevelopmentGuide.md
│   ├── CodeStructureRefactorPlan.md
│   ├── SponsorEdition.md
│   └── SPONSORS.md
├── .github/                             # GitHub Actions CI/CD 工作流
├── 7za.exe                              # 捆绑的 7-Zip 命令行工具
├── FolderRewind.slnx                    # 解决方案文件
├── README.md / README_en.md
├── CONTRIBUTING.md
└── PRIVACY.md
```

## 主项目内部结构

```
FolderRewind/
├── App.xaml / App.xaml.cs               # 应用入口，启动编排
├── MainWindow.xaml / MainWindow.xaml.cs  # 主窗口，标题栏与托盘管理
├── AppConstants.cs                      # 窗口尺寸常量
├── Models/                              # 数据模型
│   ├── BackupModels.cs                  # 核心模型（AppConfig, BackupConfig 等，~1300 行）
│   ├── BackupMetadata.cs                # 增量备份元数据
│   ├── PluginModels.cs                  # 插件清单模型
│   ├── TemplateModels.cs                # 配置模板模型
│   ├── CloudSyncModels.cs               # 云同步模型
│   ├── HotkeySettings.cs                # 快捷键设置模型
│   ├── LogModels.cs                     # 日志模型
│   └── AppJsonContext.cs                # System.Text.Json 源生成器上下文
├── Services/                            # 业务逻辑服务（静态类）
│   ├── ConfigService.cs                 # 配置管理（config.json）
│   ├── BackupService.cs                 # 备份编排
│   ├── BackupService.Archive.cs         # 7-Zip 归档操作
│   ├── BackupService.Filtering.cs       # 文件过滤逻辑
│   ├── BackupService.Helpers.cs         # 工具方法
│   ├── BackupService.Metadata.cs        # 增量备份元数据管理
│   ├── BackupService.Pruning.cs         # 旧归档清理
│   ├── BackupService.Restore.cs         # 还原逻辑
│   ├── HistoryService.cs                # 备份历史管理
│   ├── AutomationService.cs             # 定时/事件触发自动化
│   ├── NavigationService.cs             # 页面导航
│   ├── ThemeService.cs                  # 主题管理
│   ├── NotificationService.cs           # 通知服务
│   ├── EncryptionService.cs             # 加密密码管理
│   ├── CloudSyncService.cs              # rclone 云同步
│   ├── MiniWindowService.cs             # 迷你窗口管理
│   ├── FolderWatcherService.cs          # 文件系统监控
│   ├── FileLockService.cs               # 文件锁检测
│   ├── StartupService.cs                # 开机自启注册
│   ├── AppUpdateService.cs              # 应用更新检查
│   ├── SponsorService.cs                # 赞助版验证
│   ├── TemplateService.cs               # 配置模板管理
│   ├── I18n.cs                          # 国际化辅助
│   ├── UiDispatcherService.cs           # UI 线程调度
│   ├── MainWindowService.cs             # 主窗口引用管理
│   ├── Plugins/                         # 插件子系统
│   │   ├── PluginService.cs             # 插件生命周期管理
│   │   ├── IFolderRewindPlugin.cs       # 插件核心接口
│   │   ├── IFolderRewindBackupFilterProvider.cs
│   │   ├── IFolderRewindBackupScopeProvider.cs
│   │   ├── IFolderRewindHotkeyProvider.cs
│   │   └── IFolderRewindKnotLinkCommandHandler.cs
│   ├── Hotkeys/                         # 快捷键子系统
│   │   ├── HotkeyManager.cs
│   │   ├── HotkeyParser.cs
│   │   ├── NativeHotkeyService.cs
│   │   ├── HotkeyGesture.cs
│   │   └── HotkeyDefinition.cs
│   ├── KnotLink/                        # KnotLink 协议实现
│   │   ├── SignalSender.cs
│   │   ├── SignalSubscriber.cs
│   │   ├── OpenSocketQuerier.cs
│   │   ├── OpenSocketResponser.cs
│   │   ├── TcpClient.cs
│   │   └── KnotLinkCommandParser.cs
│   └── Diagnostics/                     # 诊断
│       └── MemoryTelemetryService.cs
├── ViewModels/                          # 页面级 ViewModel
│   └── ViewModelBase.cs                 # 基类（ObservableObject + UI 调度）
├── Views/                               # XAML 页面与对话框
│   ├── ShellPage.xaml                   # 导航外壳
│   ├── HomePage.xaml                    # 首页仪表盘
│   ├── FolderManagerPage.xaml           # 来源文件夹管理
│   ├── BackupTasksPage.xaml             # 备份任务进度
│   ├── HistoryPage.xaml                 # 历史时间线
│   ├── LogPage.xaml                     # 日志查看器
│   ├── SettingsPage.xaml                # 设置页
│   ├── MiniWindow.xaml                  # 迷你窗口
│   ├── PluginStorePage.xaml             # 插件商店
│   ├── ConfigSettingsDialog.xaml        # 配置编辑对话框
│   ├── ConfigCloudSyncDialog.xaml       # 云同步配置对话框
│   ├── TemplateManagerDialog.xaml       # 模板管理对话框
│   ├── TemplateSubmissionDialog.xaml    # 模板提交对话框
│   ├── SponsorWindow.xaml               # 赞助版信息窗口
│   └── Settings/                        # 设置页子控件
│       ├── AboutControl.xaml
│       ├── AppearanceLayoutControl.xaml
│       ├── CoreBehaviorControl.xaml
│       ├── DataManagementControl.xaml
│       ├── DiagnosticsControl.xaml
│       ├── PluginsKnotLinkControl.xaml
│       ├── PresetSettingsControl.xaml
│       └── RuntimeEnvControl.xaml
├── Converters/                          # XAML 值转换器
│   └── BoolToVisibility, BoolToColor, StringToBitmap 等
└── Strings/                             # 本地化资源
    ├── zh-CN/Resources.resw
    └── en-US/Resources.resw
```

## 关键入口文件

| 文件 | 启动时职责 |
|---|---|
| `App.xaml.cs` | 加载配置 → 应用语言/主题 → 创建主窗口 → 初始化托盘、插件、自动化、KnotLink、诊断 |
| `MainWindow.xaml.cs` | 标题栏集成（Mica）、主题更新、关闭行为（最小化到托盘 vs 退出）、快捷键初始化 |
| `ShellPage.xaml.cs` | 导航外壳，路由页面导航，管理 InfoBar 通知，运行启动对话框链 |
