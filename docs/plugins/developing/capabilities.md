---
sidebar_position: 4
title: "能力与操作契约"
description: "为发现、过滤、备份一致性、还原协调、地图和领域合并设计插件能力，使用修订、只读输入、暂存输出与取消控制完整操作。"
reviewed_baseline: "1.10-api3.17"
---

# 能力与操作契约

插件提供领域知识，Host 负责配置保存、操作编排、历史、事务与目标写入。能力声明、运行注册和请求服务需与实现对应。

## 发现与配置对账

Discovery 返回候选及 `ConfigDraft`、`FolderDraft`。Host 为确认的草稿分配身份并提交。`DiscoveryRequest.IncludeKnownLocations` 控制是否加入机器已知位置；手选目录扫描使用指定根。

Reconciliation 返回带 `ExpectedRevision` 的 `ConfigChangeProposal`，表达来源增删、路径、Provider State 或策略变化。Host 验证修订、字段所有权和影响后提交，过期提案重新计算。

## 文件策略、范围与一致性

`IFilePolicyCapability` 可以返回字符串兼容规则和 `PathFilterRule` 类型化规则。`IBackupScopeCapability` 将参数解析为有效包含范围与就绪状态；这两层在 SourceScope 内工作。

一致性提供器返回 `IConsistencyLease`，租约覆盖枚举与捕获过程，结束时异步释放。`SupportsBoundedSourceView` 配合 `SourceViewLimits` 提供有预算的稳定来源；`SupportsCoordinationOnly` 配合 `CoordinationOnly` 让 Host 准备输入、插件只协调外部写入，`SourcePath` 保持请求来源路径。

`Prefer` 按 Kind 策略允许带警告的降级，`Require` 要求满足一致性条件。准确填写 `IsStableSourceView`，让 Host 选择相应捕获路径。

## 还原与分支操作

`IRestoreCoordinatorCapability` 接收受影响来源、操作 ID、目标身份与操作类型。先协调外部程序，再调用一次 `ContinueMutationAsync`，最后完成外部收尾。

合并分析、冲突决策、构建和验证在协调外准备，实际写入阶段再协调来源。需要恢复处理时保留游戏状态，待 Host 恢复完成后继续。

## 普通还原的保留

`IRestoreStagingPreparationCapability` 读取锁定的 Current／Target，返回相对路径的暂存提案。Host 验证最多 4096 个文件操作、64 MiB 当前内容，再应用到 staging。

玩家保留的 null／true／false 分别表示继承、启用与关闭。需要显式覆盖时，提供器声明 `SupportsPlayerDataOverride`。`RestoreRequestOptions.RestorePreservePaths` 也提供单次相对路径保留，见[过滤指南](/docs/guides/filters#restore-preserve-paths)。这些选项用于普通还原，Checkout／Merge 使用分支目标。

## 地图与领域合并

SpatialPreview 提供只读画面与详情，SpatialComparison 比较固定输入，SpatialScopeSelection 返回可供 Host 保存的范围参数。MergeProvider 从三方输入产生分析和输出计划，用户决策与最终写入由 Host 管理。

按[API 参考](/docs/plugins/developing/plugin-api)声明所需能力与契约，并覆盖取消、缺失输入、过期修订和资源释放场景。

<span id="能力配置与备份还原契约" />
<span id="discovery-与-reconciliation" />
<span id="filepolicyscope-与-consistency" />
<span id="restorecheckout-与-merge" />
<span id="普通还原暂存" />
<span id="单次强保留服务选项" />
