---
sidebar_position: 3
title: "Plugin API 3.5 参考"
description: "FolderRewind 1.9 系列Plugin API 3.5 参考操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# Plugin API 3.5 参考

公开契约在 `FolderRewind.Plugin.Abstractions`，目标 `net10.0`。SDK 包3.5.0对应 API 3.5；程序集身份保持3.0.0.0。兼容条件是 major 相同且 Host minor 不低于插件请求；不要用应用版本比较替代此规则。

## 生命周期与注册

`IFolderRewindPlugin` 只有 `ActivateAsync(IPluginActivationContext, CancellationToken)` 和 `DeactivateAsync(CancellationToken)`。静态 manifest 定义产品／权限／能力；激活返回 `PluginActivationResult`，其中状态 patch 由 Host 验证并提交。

激活时可以读取 `PluginSettingsSnapshot`、`ConfigSnapshot` 和 `FolderSnapshot`。同一实例只注册一次；实现多种能力接口的实例会贡献其全部契约。每种能力契约最多注册一个实现，内部多个行为自行组合；Manifest 与注册集合必须一致。提交之前能力不可调用，激活阶段不能访问 DataStore。

## 全部能力

| 接口 | 清单能力 | 责任 |
|---|---|---|
| `IDiscoveryCapability` | `Discovery` | 发现候选与配置草稿 |
| `IConfigReconciliationCapability` | `ConfigReconciliation` | 按配置修订提出变更 |
| `IFilePolicyCapability` | `FilePolicy` | 必要包含／排除规则 |
| `IBackupScopeCapability` | `BackupScope` | 参数化范围与就绪结果 |
| `IBackupConsistencyCapability` | `BackupConsistency` | 提供可释放的一致性来源租约 |
| `IFolderMetadataCapability` | `FolderMetadata` | 当前活跃文件夹详情 |
| `IVersionMetadataProviderCapability` | `VersionMetadataProvider` | 同次稳定捕获的版本元数据 |
| `IRestoreCoordinatorCapability` | `RestoreCoordinator` | 配置级环境协调和一次性继续执行 |
| `IRestoreStagingPreparationCapability` | `RestoreStagingPreparation` | 普通还原的有界相对文件提案 |
| `IPluginCommandCapability` | `PluginCommand` | 命令及默认快捷键 |
| `IKnotLinkIntegrationCapability` | `KnotLinkIntegration` | 命令、参数、信号与远程执行 |
| `IProviderStateMigrationCapability` | `ProviderStateMigration` | 版本化不透明提供器状态迁移 |
| `IBackupArtifactTransformerCapability` | `BackupArtifactTransformer` | 受控不可变制品转换 |
| `IBackupCompletionObserverCapability` | `BackupCompletionObserver` | 提交完成后的只读观察 |
| `IRestoreMaterializerCapability` | `RestoreMaterializer` | 向隔离工作区物化制品 |

`IDiscoveryDefinitionCatalog` 附加在 Discovery 实现上，`IKnotLinkTargetResolver` 附加在 KnotLink integration 上；两者不单独注册，也不单独声明 capability。

## 身份与快照

`PluginId` 是产品身份；`ConfigKindRef` 是 OwnerId + KindId；`DiscoveryProviderId` 标识发现来源；`StateOwnerId` 标识状态命名空间。即使文本相同，角色也不能互换。显示名、目录名和装载顺序不决定行为所有权。

`ConfigRevision` 绑定修改提案。设置值为 `JsonElement`；Provider State 带位置与 schemaVersion。插件传递快照、draft、patch、request、result 和 descriptor，不持有可写宿主模型。

## Host 服务

`IPluginHostServices` 提供 Configs、Backups、Restores、History、Notifications、KnotLink、DataStore、TemporaryStorage 和 Logger。Manifest 的 requestedHostServices 限制正式服务入口；Artifact 服务由操作请求显式提供，仍必须声明。

插件代码在宿主进程内运行，拥有当前用户的环境权限。服务门控、哈希和 AssemblyLoadContext 都不是 OS／.NET 安全沙箱。

## 取消、结果与诊断

操作上下文分别提供 `OperationCancellation` 与 `PluginLifetime`。尊重两者，释放租约和暂存资源，不启动无人管理的后台任务。就绪为 Ready／Degraded／Blocked；操作结果为 Success、SuccessWithWarnings、NoChanges、Canceled、Failed、Blocked、RecoveryRequired、CommittedRecoveryRequired。

恢复状态不等于普通失败：CommittedRecoveryRequired 表示持久提交已经发生，但后续恢复未完成；不能自动重试破坏性操作或自动重进游戏。使用 `PluginDiagnostic` 的 Code、Severity、Capability、Owner、Arguments，不把日志文本当稳定接口。

## 停用与设置更新

Host 先撤销路由、取消生命周期并排空操作，再调用 DeactivateAsync。超过有界宽限期会逻辑隔离并报告 RequiresRestart，物理装载上下文可保留到重启。Enabled Intent 不等于 Active，Safe Mode 不改写用户启用意图。

继续阅读[实战教程](/docs/plugins/developing/tutorial)、[设置模式](/docs/plugins/developing/settings-schema)和[命令扩展](/docs/plugins/developing/knotlink-api)。

<span id="核心接口与生命周期" />
<span id="manifest-与目标框架" />
<span id="备份过滤与范围" />
<span id="ifolderrewindbackupfilterprovider" />
<span id="ifolderrewindbackupscopeprovider" />
<span id="备份准备与文件夹详情" />
<span id="ifolderrewindbackuppreparationprovider" />
<span id="ifolderrewindfolderdetailsprovider" />
<span id="还原拦截与配置补全" />
<span id="ifolderrewindrestoreinterceptor" />
<span id="ifolderrewindconfigaugmenter" />
<span id="knotlink-与快捷键" />
<span id="完整接管备份还原" />
<span id="异常线程与兼容性" />
<span id="相关链接" />
