---
sidebar_position: 3
title: "Plugin API 参考"
description: "查阅公开 SDK 3.17.0 的生命周期、十九种能力、类型化过滤、空间预览与对比，以及语义合并和宿主服务契约。"
reviewed_baseline: "1.10-api3.17"
---

# Plugin API 参考

FolderRewind 1.10.0 支持 **Plugin API 3.17**，公开 NuGet 包为 **FolderRewind.Plugin.Abstractions 3.17.0**，目标框架为 `net10.0`。API 3.x 的程序集身份保持 `3.0.0.0`。

插件请求相同 API major，且 minor 小于或等于 Host 支持值时兼容。应用版本、插件产品版本、SDK 包版本分别用于各自的发布与兼容判断。

## 生命周期与注册

`IFolderRewindPlugin` 提供 `ActivateAsync(IPluginActivationContext, CancellationToken)` 与 `DeactivateAsync(CancellationToken)`。激活读取设置、配置和文件夹快照，注册 manifest 声明的能力并返回 `PluginActivationResult`。

Host 验证注册集合和状态 patch 后原子提交，随后开放能力调用。每种能力契约注册一个实现；一个实例可以实现多种接口。DataStore 在正式运行阶段使用，激活阶段使用传入快照。

## 全部能力

| 接口 | 能力名 | 负责的内容 |
| --- | --- | --- |
| `IDiscoveryCapability` | `Discovery` | 发现候选和配置草稿 |
| `IConfigReconciliationCapability` | `ConfigReconciliation` | 配置修订提案 |
| `IFilePolicyCapability` | `FilePolicy` | 必要包含与排除规则 |
| `IBackupScopeCapability` | `BackupScope` | 参数化备份范围 |
| `IBackupConsistencyCapability` | `BackupConsistency` | 一致性协调和来源租约 |
| `IFolderMetadataCapability` | `FolderMetadata` | 当前来源详情 |
| `IVersionMetadataProviderCapability` | `VersionMetadataProvider` | 捕获时版本元数据 |
| `IRestoreCoordinatorCapability` | `RestoreCoordinator` | 外部环境协调 |
| `IRestoreStagingPreparationCapability` | `RestoreStagingPreparation` | 普通还原暂存提案 |
| `IPluginCommandCapability` | `PluginCommand` | 命令与默认快捷键 |
| `IKnotLinkIntegrationCapability` | `KnotLinkIntegration` | 远程命令和信号 |
| `IProviderStateMigrationCapability` | `ProviderStateMigration` | 版本化提供器状态迁移 |
| `IBackupArtifactTransformerCapability` | `BackupArtifactTransformer` | 不可变制品转换 |
| `IBackupCompletionObserverCapability` | `BackupCompletionObserver` | 提交完成后的观察 |
| `IRestoreMaterializerCapability` | `RestoreMaterializer` | 隔离工作区物化 |
| `ISpatialPreviewCapability` | `SpatialPreview` | 只读地图、瓦片与位置详情 |
| `ISpatialComparisonCapability` | `SpatialComparison` | 固定输入之间的空间变化 |
| `ISpatialScopeSelectionCapability` | `SpatialScopeSelection` | 地图选区转换为备份范围参数 |
| `IMergeProviderCapability` | `MergeProvider` | 领域合并分析与结果构建 |

manifest 中的能力字符串采用 camelCase，如 `spatialComparison`、`mergeProvider`。`IDiscoveryDefinitionCatalog`、`IKnotLinkTargetResolver` 和 `IArtifactFileViewProvider` 附加在相应能力实现上，随该实现提供服务。

## 身份与 Host 服务

使用 `PluginId` 标识产品，`ConfigKindRef` 标识领域类型，`DiscoveryProviderId` 标识发现提供器，`StateOwnerId` 标识状态所有者。名称用于显示，稳定 ID 用于路由和持久化。

`IPluginHostServices` 提供 Configs、Backups、Restores、History、Notifications、KnotLink、DataStore、TemporaryStorage 和 Logger。需要的服务在 `requestedHostServices` 中声明；Artifact 读取与暂存服务由具体操作上下文提供。

插件以当前用户权限在进程内运行。选择可信代码；服务声明用于说明和约束正式 Host API 的调用范围。

## 类型化文件规则

`PathFilterRule` 包含 `Pattern`、`Target`、`SemanticsVersion`。作用对象为 `Any`、`File` 或 `Directory`；新规则使用语义版本 2，旧字符串规则按版本 1 读取。

```csharp
var caches = new PathFilterRule("cache", PathFilterTarget.Directory);
var temporaryFiles = new PathFilterRule("*.tmp", PathFilterTarget.File);
```

`FilePolicyResult.TypedRequiredExclusions` 与 `TypedRequiredInclusions` 提供类型化规则，`MergeInputBoundary.TypedFilterRules` 带入历史覆盖判断。规则始终在来源范围内生效。匹配示例见[过滤指南](/docs/guides/filters)。

## 空间预览、对比与选区 {/* #spatial-preview */}

预览提供器用 `DescribeAsync` 返回世界、图层、显示模式与高度信息，`RenderAsync` 返回预乘 BGRA 瓦片，`InspectAsync` 返回位置详情。导航目标可以携带高度；`SpatialPreviewMode` 表达地表、洞穴等模式。

`SpatialPreviewSource.FixedInput` 将历史内容绑定到 Host 准备的固定输入。`IsPartial`、覆盖信息和瓦片 `ContentState` 表达部分捕获与读取状态；`CacheBudgetBytes` 给出 Host 的缓存预算。`IsFinal=false` 时，Host 按可见范围安排后续细化请求。

空间对比通过 `DescribeComparisonAsync`、`CompareAsync` 分页返回类别与 `SpatialChange`，位置使用 `SpatialSubjectLocation`。`CloseComparisonAsync` 与预览的 `CloseAsync` 负责幂等释放会话资源。

选区提供器通过 `ResolveSelectionAsync` 返回 `BackupScopeId`、参数、有效范围与诊断，Host 完成配置审阅和保存。用户操作见[地图指南](/docs/guides/minecraft/world-preview)。

## 领域合并 {/* #semantic-merge */}

manifest 的 `mergeProviders` 声明 `MergeProviderId`、契约版本、兼容 Kind 与版本化策略。实现 `IMergeProviderCapability`，在 `AnalyzeAsync` 中读取固定三方输入，向 `IMergePlanWriter` 写入输出组、路径声明和冲突项。

Host 保存分析计划与用户决策，再调用 `BuildAsync`。提供器从 `IMergeDecisionReader` 读取决策，通过 `IMergeOutputWorkspace` 复用、生成或删除已声明路径。Host 校验结果，完成 History 提交与目标目录写入。

覆盖证据通过 `InspectPathAsync` 和 `CheckCoverageAsync` 查询；未知或已过滤内容由诊断明确处理。策略版本独立于插件产品版本，已保存会话绑定对应策略和固定输入。

## 取消与结果

同时响应 `OperationCancellation` 和 `PluginLifetime`，释放租约、流和临时资源。结果包括 Success、SuccessWithWarnings、NoChanges、Canceled、Failed、Blocked、RecoveryRequired 和 CommittedRecoveryRequired。

`CommittedRecoveryRequired` 表示历史已提交，后续恢复仍需完成；按诊断进入受控恢复流程。停用时 Host 撤销路由、取消并排空调用，再执行 Deactivate；需要重启时显示 `RequiresRestart`。

继续阅读[能力设计](/docs/plugins/developing/capabilities)、[制品契约](/docs/plugins/developing/artifacts)和[开发入门](/docs/plugins/developing/quick-start)。

<span id="ifolderrewindbackupfilterprovider" />
<span id="ifolderrewindbackuppreparationprovider" />
<span id="ifolderrewindbackupscopeprovider" />
<span id="ifolderrewindconfigaugmenter" />
<span id="ifolderrewindfolderdetailsprovider" />
<span id="ifolderrewindrestoreinterceptor" />
<span id="knotlink-与快捷键" />
<span id="manifest-与目标框架" />
<span id="备份准备与文件夹详情" />
<span id="备份过滤与范围" />
<span id="完整接管备份还原" />
<span id="异常线程与兼容性" />
<span id="核心接口与生命周期" />
<span id="相关链接" />
<span id="还原拦截与配置补全" />

<span id="plugin-api-39-参考" />

<span id="身份与快照" />
<span id="host-服务" />
<span id="取消结果与诊断" />
<span id="停用与设置更新" />
<span id="api-36-起的发现范围" />
