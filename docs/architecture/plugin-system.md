---
sidebar_position: 5
title: 插件体系
description: 插件接口、生命周期与 KnotLink 协议
---

# 插件体系

## 接口层次

插件系统围绕 `IFolderRewindPlugin` 核心接口构建，辅以可选的扩展接口：

- **`IFolderRewindBackupFilterProvider`** — 让插件为单次备份贡献过滤规则（白名单/黑名单）。Host 会克隆配置后应用这些规则，不会污染用户保存的配置。
- **`IFolderRewindBackupScopeProvider`** — 让插件按配置声明新的"备份范围/过滤策略"（如 Minecraft 指定区域），并在备份时转化为 Host 可执行的过滤规则。参数由 Host 动态渲染并保存在 `BackupConfig` 中。
- **`IFolderRewindHotkeyProvider`** — 自定义快捷键。
- **`IFolderRewindKnotLinkCommandHandler`** — 扩展 FolderRewind 的 KnotLink 指令集。
- **`IFolderRewindParameterizedKnotLinkCommandHandler`** — 参与新版参数化 KnotLink 指令，与旧接口并存，避免旧插件因 Host 升级而必须重编译。

```mermaid
graph TB
    IFolderRewindPlugin["IFolderRewindPlugin<br/>核心接口"]
    IFilterProvider["IFolderRewindBackupFilterProvider<br/>备份过滤规则"]
    IScopeProvider["IFolderRewindBackupScopeProvider<br/>备份范围发现"]
    IHotkeyProvider["IFolderRewindHotkeyProvider<br/>自定义快捷键"]
    IKnotLinkHandler["IFolderRewindKnotLinkCommandHandler<br/>KnotLink 命令处理"]
    IParameterizedKnotLinkHandler["IFolderRewindParameterizedKnotLinkCommandHandler<br/>参数化 KnotLink 命令处理"]

    IFolderRewindPlugin -.->|可选实现| IFilterProvider
    IFolderRewindPlugin -.->|可选实现| IScopeProvider
    IFolderRewindPlugin -.->|可选实现| IHotkeyProvider
    IFolderRewindPlugin -.->|可选实现| IKnotLinkHandler
    IFolderRewindPlugin -.->|可选实现| IParameterizedKnotLinkHandler
```

### 核心接口 `IFolderRewindPlugin`

插件必须实现的核心接口，定义：

- **生命周期钩子**：`Initialize(settingsValues)` — 由 Host 在插件启用时调用一次（卸载由 Host 侧管理，插件不实现卸载方法）
- **备份/还原钩子**：`OnBeforeBackupFolder()` / `OnAfterBackupFolder()` / `OnBeforeRestoreFolder()` / `OnAfterRestoreFolder()`
- **完全接管**：`WantsToHandleBackup()` / `PerformBackupAsync()` / `WantsToHandleRestore()` / `PerformRestoreAsync()` — 插件可完全接管特定配置的备份/还原流程
- **配置类型发现**：`GetSupportedConfigTypes()` — 返回此插件支持的配置类型列表
- **设置页贡献**：`GetSettingsDefinitions()` — 定义插件可选设置，Host 保存用户填写的值

## 生命周期

```mermaid
graph LR
    Scan["扫描插件目录"] --> Install["安装（从 zip）"]
    Install --> Load["加载（AssemblyLoadContext）"]
    Load --> Enable["启用"]
    Enable --> Run["运行中（钩子调用）"]
    Run --> Disable["禁用"]
    Disable --> Unload["卸载"]
    Unload --> Uninstall["卸载删除"]
```

- **扫描**：`PluginService` 启动时扫描插件目录
- **安装**：支持从 zip 包安装，自动解压到插件目录
- **加载**：使用 `AssemblyLoadContext` 实现插件隔离加载
- **启用/禁用**：运行时切换，无需重启应用
- **版本检查**：通过 GitHub Release 检查插件更新
- **设置持久化**：插件设置由宿主应用持久化管理

## 插件隔离

使用 .NET 的 `AssemblyLoadContext` 实现：

- 每个插件在独立的 AssemblyLoadContext 中加载
- 插件的依赖不会与宿主或其他插件冲突
- 插件卸载时可释放加载的程序集（支持热更新场景）

## KnotLink 协议

KnotLink 是一个基于 TCP 的远程命令/事件协议，继承自 MineBackup：

- **信号发送**（`SignalSender`）：向外部工具发送备份/还原事件通知
- **信号订阅**（`SignalSubscriber`）：监听外部工具发来的命令
- **命令解析**（`KnotLinkCommandParser`）：解析 TCP 消息为结构化命令
- **TCP 通信**（`TcpClient`、`OpenSocketQuerier`、`OpenSocketResponser`）：底层网络通信

典型场景：Minecraft 模组在游戏运行时触发热备份/热还原。

## 参考插件：MineRewind

`FolderRewind-Plugin-Minecraft/MineRewind/` 是官方 Minecraft 存档管理插件，可作为插件开发的参考实现：

- 实现了 `IFolderRewindPlugin` 的完全接管能力
- 处理 Minecraft 存档的特殊备份/还原逻辑
- 集成了 KnotLink 命令处理
