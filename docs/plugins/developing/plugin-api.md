---
sidebar_position: 2
title: Plugin API 参考
description: IFolderRewindPlugin 全量接口说明、调用时序与实战建议
---

# Plugin API 参考

本文基于 `Reference/FolderRewind/FolderRewind/Services/Plugins/IFolderRewindPlugin.cs` 的当前实现整理，目标是让你能直接开始写可用插件。

## 接口定位

`IFolderRewindPlugin` 是插件主入口，负责：

- 插件元信息与设置定义
- 生命周期初始化
- 备份/还原钩子
- 配置类型发现与批量创建
- （可选）完整接管备份/还原

## 最小实现（必须项）

```csharp
public class MyPlugin : IFolderRewindPlugin
{
    public PluginInstallManifest Manifest { get; } = new()
    {
        Id = "com.example.myplugin",
        Name = "MyPlugin",
        Version = "1.0.0",
        Author = "You",
        Description = "My first plugin"
    };

    public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
        => new List<PluginSettingDefinition>();

    public void Initialize(IReadOnlyDictionary<string, string> settingsValues) { }

    public string? OnBeforeBackupFolder(BackupConfig config, ManagedFolder folder,
        IReadOnlyDictionary<string, string> settingsValues)
        => null;

    public void OnAfterBackupFolder(BackupConfig config, ManagedFolder folder,
        bool success, string? generatedArchiveFileName,
        IReadOnlyDictionary<string, string> settingsValues) { }

    public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(string selectedRootPath,
        IReadOnlyDictionary<string, string> settingsValues)
        => new List<ManagedFolder>();
}
```

## 成员详解

## `Manifest`

用于 UI、日志、兼容性检查。建议至少完整填写：

- `Id`：全局唯一，建议反向域名风格
- `Version`：语义化版本
- `EntryAssembly`、`EntryType`：需与 `manifest.json` 一致
- `MinHostVersion`：声明最低宿主版本

## `GetSettingsDefinitions()`

返回插件设置定义。Host 会保存用户输入，并在调用插件方法时通过 `settingsValues` 回传。

实战建议：

- Key 一旦发布尽量保持稳定
- Boolean 默认值统一用字符串 `"true"` / `"false"`
- 为设置写清用途与副作用

## `Initialize(settingsValues)`

插件启用时触发一次。常见用途：

- 读取并缓存设置
- 预热状态
- 一次性修正历史配置

MineRewind 在此处读取 `EnableHotBackup` 与 `PreservePlayerData`，并修复相关过滤规则。

## `SetHostContext(hostContext)`（可选）

宿主注入上下文后，插件可主动执行：

- `BroadcastEvent` 广播信号
- `QueryKnotLinkAsync` 请求-响应
- `SubscribeSignal` 订阅信号
- `LogInfo/LogWarning/LogError` 记录插件日志

## 备份钩子

### `OnBeforeBackupFolder(...)`

- 返回 `null`：继续使用原路径
- 返回新路径：Host 将改用该路径作为备份源

常见用法：

- 快照目录替换
- 备份前通知外部程序先落盘

### `OnBeforeBackupFolderAsync(...)`

Host 优先调用异步版本（默认回退同步版本）。

适用场景：

- 需要 `PluginHostContext` 参与 KnotLink 交互
- 需要短时异步 I/O

### `OnAfterBackupFolder(...)`

用于收尾：

- 清理临时快照
- 写入附加元数据
- 记录结果日志

## 还原钩子

### `OnBeforeRestoreFolder(...)`

可返回任意状态对象（`object`），并在还原后传回。

MineRewind 用它提前提取玩家数据快照。

### `OnAfterRestoreFolder(...)`

收到前置状态对象后可进行写回或后处理。

MineRewind 在此将保留的玩家数据写回 `level.dat`。

## 配置类型与发现

### `GetSupportedConfigTypes()` + `CanHandleConfigType(...)`

用于定义插件专属配置类型。MineRewind 返回 `Minecraft Saves`。

### `TryDiscoverManagedFolders(...)`

用户选择目录后，插件可自动发现可管理文件夹列表。

### `TryCreateConfigs(...)`

用于一键批量创建 `BackupConfig`。若处理成功，返回：

- `Handled = true`
- `CreatedConfigs = [...]`
- 可选 `Message`

## 完整接管流程（高级）

当以下方法返回 `true` 时，Host 不再走内置引擎：

- `WantsToHandleBackup(config)`
- `WantsToHandleRestore(config)`

随后调用：

- `PerformBackupAsync(...)` -> `PluginBackupResult`
- `PerformRestoreAsync(...)` -> `PluginRestoreResult`

推荐在你需要自定义归档格式、远程存储、特殊校验时使用。

## 调用时序（简化）

1. 启用插件 -> `Initialize`
2. 配置创建阶段 -> `TryDiscoverManagedFolders` / `TryCreateConfigs`
3. 备份阶段
   - 若接管：`PerformBackupAsync`
   - 否则：`OnBefore...` -> 内置备份 -> `OnAfter...`
4. 还原阶段同理

## 常见坑

- 在钩子中阻塞过久：会拖慢整体任务
- 未处理异常：插件抛错会影响用户体验
- `settingsValues` 解析不健壮：建议容错 `"1"/"0"/大小写`
- 版本声明过宽：可能在旧 Host 上调用失败

## 相关链接

- [插件开发快速上手](./quick-start)
- [Hotkey API](./hotkey-api)
- [KnotLink Command API](./knotlink-api)
- [MineRewind 总览](../../guides/minecraft/overview)
