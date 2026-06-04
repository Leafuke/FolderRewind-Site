---
sidebar_position: 4
title: 服务层概览
description: 40+ 服务按功能域分组说明
---

# 服务层概览

FolderRewind 的业务逻辑通过静态服务类组织。以下按功能域分组说明。

## 核心备份

| 服务 | 文件 | 职责 |
|---|---|---|
| `BackupService` | `Services/BackupService.cs` + 6 个 partial 文件 | 备份/还原编排，7-Zip 归档，文件过滤，元数据管理，旧归档清理 |
| `HistoryService` | `Services/HistoryService.cs` | 管理 `history.json` 中的备份历史记录，为时间线视图提供数据 |
| `ConfigService` | `Services/ConfigService.cs` | 配置的加载/保存/迁移/导入/导出，应用状态的单一真相源 |

## 自动化与调度

| 服务 | 文件 | 职责 |
|---|---|---|
| `AutomationService` | `Services/AutomationService.cs` | 定时备份引擎：间隔备份、计划任务、条件触发（文件锁检测） |
| `FolderWatcherService` | `Services/FolderWatcherService.cs` | 文件系统监控，为事件触发备份提供支持 |
| `FileLockService` | `Services/FileLockService.cs` | 检测文件是否被占用，用于条件自动化判断 |

## 插件与扩展

| 服务 | 文件 | 职责 |
|---|---|---|
| `PluginService` | `Services/Plugins/PluginService.cs` | 插件生命周期：扫描、安装（zip）、卸载、加载（AssemblyLoadContext）、启用/禁用、版本检查、设置持久化 |
| `KnotLinkService` | `Services/KnotLinkService.cs` | KnotLink 远程命令/事件协议，允许外部工具通过 TCP 触发备份/还原 |

## UI 辅助

| 服务 | 文件 | 职责 |
|---|---|---|
| `NavigationService` | `Services/NavigationService.cs` | 静态导航服务，持有 INavigationHost 引用，分发页面导航请求 |
| `NotificationService` | `Services/NotificationService.cs` | 应用内 InfoBar 通知与 Windows Toast 通知 |
| `ThemeService` | `Services/ThemeService.cs` | 主题管理（深色/浅色/跟随系统）、强调色预设、背景材质（Mica/Acrylic） |
| `MiniWindowService` | `Services/MiniWindowService.cs` | 管理紧凑的迷你窗口，用于快速触发单个文件夹的备份 |
| `UiDispatcherService` | `Services/UiDispatcherService.cs` | 集中式 UI 线程调度器，供非 UI 服务/ViewModel 投递操作 |

## 系统集成

| 服务 | 文件 | 职责 |
|---|---|---|
| `StartupService` | `Services/StartupService.cs` | Windows 开机自启任务注册 |
| `AppUpdateService` | `Services/AppUpdateService.cs` | GitHub Release 更新检查，支持多下载源（官方/镜像/自定义） |
| `SponsorService` | `Services/SponsorService.cs` | 赞助版许可证验证（Microsoft Store 权益） |
| `CloudSyncService` | `Services/CloudSyncService.cs` | 通过 rclone 实现云上传/下载，备份后排队上传，还原前下载缺失归档 |

## 安全

| 服务 | 文件 | 职责 |
|---|---|---|
| `EncryptionService` | `Services/EncryptionService.cs` | 加密备份的密码管理（DPAPI 保护存储） |

## 其他

| 服务 | 文件 | 职责 |
|---|---|---|
| `I18n` | `Services/I18n.cs` | 国际化辅助，封装 `ResourceLoader` 的字符串查找与格式化，支持 `PickBest()` 多语言字典 |
| `TemplateService` | `Services/TemplateService.cs` | 配置模板的创建、导出、导入和社区分享 |
| `MainWindowService` | `Services/MainWindowService.cs` | 主窗口引用管理与赞助版窗口生命周期 |
| `MemoryTelemetryService` | `Services/Diagnostics/MemoryTelemetryService.cs` | 性能监控与内存诊断 |
