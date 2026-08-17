---
sidebar_position: 3
title: Plugin API 参考
description: FolderRewind 1.8 插件接口、生命周期与扩展点
---

# Plugin API 参考

本文以当前 `Services/Plugins/` 源码为准，说明 FolderRewind 1.8 的插件接口。使用本页新增接口的插件应在 `manifest.json` 中声明 `MinHostVersion: "1.8.0"`；如果同时依赖 1.8.1 的修复，再声明 `1.8.1`。

## 核心接口与生命周期

所有插件必须实现 `IFolderRewindPlugin`：

```csharp
public interface IFolderRewindPlugin
{
    PluginInstallManifest Manifest { get; }
    IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions();
    void Initialize(IReadOnlyDictionary<string, string> settingsValues);
    void SetHostContext(PluginHostContext hostContext) { }

    string? OnBeforeBackupFolder(BackupConfig config, ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues);
    void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder, bool success,
        string? generatedArchiveFileName,
        IReadOnlyDictionary<string, string> settingsValues);
    object? OnBeforeRestoreFolder(BackupConfig config, ManagedFolder folder,
        string archiveFileName, IReadOnlyDictionary<string, string> settingsValues) => null;
    void OnAfterRestoreFolder(BackupConfig config, ManagedFolder folder, bool success,
        string archiveFileName, object? state,
        IReadOnlyDictionary<string, string> settingsValues) { }
}
```

配置发现和完整接管成员有默认实现，可以按需覆盖：`GetSupportedConfigTypes`、`CanHandleConfigType`、`TryDiscoverManagedFolders`、`TryCreateConfigs`、`WantsToHandleBackup`、`PerformBackupAsync`、`WantsToHandleRestore` 和 `PerformRestoreAsync`。

Host 通常按以下顺序调用：

```text
加载 manifest → Initialize → SetHostContext
配置发现/创建 → 备份前钩子或完整接管 → 备份后钩子
还原前钩子/拦截器 → 标准还原或完整接管 → 还原后钩子
```

## Manifest 与目标框架

```json
{
  "Id": "com.example.myplugin",
  "Name": "MyPlugin",
  "Version": "1.0.0",
  "EntryAssembly": "MyPlugin.dll",
  "EntryType": "MyPlugin.MyPlugin",
  "MinHostVersion": "1.8.0"
}
```

主程序引用的目标框架为 `net10.0-windows10.0.19041.0`。插件项目应使用兼容的 .NET 10 Windows 目标框架，并从实际安装/构建产物引用接口程序集；不要复制旧站点示例中的目标框架路径。

## 备份过滤与范围

### `IFolderRewindBackupFilterProvider`

```csharp
PluginBackupFilterContribution? GetBackupFilterContribution(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues);
```

返回按次过滤贡献。Host 会克隆有效配置，不会污染用户保存的白名单/黑名单。

### `IFolderRewindBackupScopeProvider`

```csharp
IReadOnlyList<PluginBackupScopeDefinition> GetBackupScopeDefinitions(
    BackupConfig config,
    IReadOnlyDictionary<string, string> settingsValues);

PluginBackupScopeResolution ResolveBackupScope(
    BackupConfig config,
    ManagedFolder folder,
    PluginBackupScopeContext scope,
    IReadOnlyDictionary<string, string> settingsValues);
```

`PluginBackupScopeDefinition` 提供 `Id`、显示名、说明和参数定义；`PluginBackupScopeContext` 携带选中的 `ScopeId` 与参数；解析结果可为 `Applied`、`NotApplicable` 或 `Invalid`，并以 `Append`/`Replace` 合并过滤规则。区域备份使用 `Replace`，因此范围会替换普通白名单。

## 备份准备与文件夹详情

### `IFolderRewindBackupPreparationProvider`

```csharp
string? OnBeforeBackupFolder(
    BackupConfig config,
    ManagedFolder folder,
    BackupInvocationOptions invocationOptions,
    IReadOnlyDictionary<string, string> settingsValues);
```

该接口可以读取触发来源和一致性偏好；未实现时仍调用核心接口的 `OnBeforeBackupFolder`。

### `IFolderRewindFolderDetailsProvider`

```csharp
Task<IReadOnlyList<FolderDetailsSection>> GetFolderDetailsSectionsAsync(
    BackupConfig config,
    ManagedFolder folder,
    IReadOnlyDictionary<string, string> settingsValues,
    CancellationToken cancellationToken);
```

插件只返回只读键值数据，Host 统一渲染详情对话框。单个插件异常不会阻止其他详情显示。

## 还原拦截与配置补全

### `IFolderRewindRestoreInterceptor`

```csharp
Task<PluginRestoreInterceptionResult> TryInterceptRestoreAsync(
    BackupConfig config,
    ManagedFolder folder,
    string archiveFileName,
    IReadOnlyDictionary<string, string> settingsValues,
    CancellationToken cancellationToken);
```

返回 `Continue` 让 Host 继续，`Handled` 表示插件已完成请求，`Blocked` 表示拒绝还原。使用 `PluginRestoreInterceptionResult.Continue/Handled/Blocked(...)` 创建结果。

### `IFolderRewindConfigAugmenter`

```csharp
PluginConfigAugmentationResult AugmentConfigs(
    PluginConfigAugmentationRequest request,
    IReadOnlyDictionary<string, string> settingsValues);

bool ShouldAugmentAfterSettingsChange(
    IReadOnlyDictionary<string, string> previousSettings,
    IReadOnlyDictionary<string, string> currentSettings) => false;
```

插件返回建议追加的 `ManagedFolder`，Host 负责去重、冲突过滤、保存和通知。不要直接修改 `ConfigService.CurrentConfig`。

## KnotLink 与快捷键

- `IFolderRewindParameterizedKnotLinkCommandHandler`：实现 `TryHandleParameterizedKnotLinkCommandAsync(KnotLinkCommandRequest, settingsValues, hostContext)`，参见 [KnotLink Command API](/docs/plugins/developing/knotlink-api)。
- `IFolderRewindKnotLinkCapabilityProvider`：实现 `GetKnotLinkCapabilities()`，发布运行时可发现的命令和信号。
- `IFolderRewindHotkeyProvider`：实现 `GetHotkeyDefinitions()` 和 `OnHotkeyInvokedAsync(...)`，注册全局或应用内快捷键。

`PluginHostContext` 提供插件 ID、KnotLink 状态、事件广播、查询/发送命令、信号订阅和日志方法。KnotLink 负载必须遵循严格键值对协议 v2。

## 完整接管备份/还原

仅在插件确实拥有不同的归档格式或流程时返回 `WantsToHandleBackup/Restore = true`，再实现：

```csharp
Task<PluginBackupResult> PerformBackupAsync(
    BackupConfig config, ManagedFolder folder, string comment,
    IReadOnlyDictionary<string, string> settingsValues,
    Action<double, string>? progressCallback = null);

Task<PluginRestoreResult> PerformRestoreAsync(
    BackupConfig config, ManagedFolder folder, string archiveFileName,
    IReadOnlyDictionary<string, string> settingsValues,
    Action<double, string>? progressCallback = null);
```

`PluginBackupResult` 包含 `Success`、`GeneratedFileName` 和 `Message`；`PluginRestoreResult` 包含 `Success` 和 `Message`。普通插件应优先使用钩子和扩展接口，避免绕过 Host 的历史、清理和安全策略。

## 异常、线程与兼容性

- 插件运行在宿主进程内；在钩子、命令处理器和详情提供器中捕获预期异常。
- 不要在 UI 线程执行长时间 I/O；使用异步方法，并用 `CancellationToken` 响应取消。
- 不要缓存跨版本的内部模型或直接改写 Host 服务状态。
- 新接口需要 1.8.0，MineRewind 当前 manifest 使用 `MinHostVersion: 1.8.1`；发布前应按实际最低 API 调整。
- ZIP 根目录必须包含 `manifest.json` 和入口程序集，依赖放在同一插件目录。

## 相关链接

- [插件开发快速上手](/docs/plugins/developing/quick-start)
- [实战教程](/docs/plugins/developing/tutorial)
- [KnotLink Command API](/docs/plugins/developing/knotlink-api)
- [插件打包与发布](/docs/plugins/developing/packaging)
- [项目架构：插件体系](/docs/architecture/plugin-system)
