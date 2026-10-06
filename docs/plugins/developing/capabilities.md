---
sidebar_position: 20
title: "能力、配置与备份还原契约"
description: "设计发现、范围、一致性与还原能力，遵守快照、租约、取消和一次性继续执行契约。"
reviewed_baseline: "1.9-api3.9"
---

# 能力、配置与备份还原契约

设计发现、范围、一致性与还原能力，遵守快照、租约、取消和一次性继续执行契约。

本页解释 API 3.9 的操作边界；签名以 SDK 和 [API 总览](/docs/plugins/developing/plugin-api)为准。

## Discovery 与 Reconciliation

发现返回候选、draft 和诊断，提交由 Host 按用户策略完成。Definition catalog 的非空 ID 在同一 provider 内按 ordinal 唯一；ResolveDefinitionId 只返回已声明 ID 或 null。

对账接受 ConfigSnapshot 和原因，返回包含 ExpectedRevision 的 ConfigChangeProposal。AddFolder、UpdateFolder、RemoveFolder、ProviderOptions、ArtifactTransformPolicy 和 UserPolicy 变更均接受 Host 校验与审阅，不直接保存配置。用户字段与提供器字段的 Ownership、变更 Impact 都需准确表达。

Provider State 用 StateOwnerId + ConfigId + 可选 FolderId 定位；迁移使用 ExpectedSchemaVersion 和新版数据，Host 原子提交，插件不操作用户配置文件。

## FilePolicy、Scope 与 Consistency

配置 Kind 所有者决定运行期提供器，发现身份不决定备份所有者。文件策略与备份范围不能扩大来源硬边界。Scope 返回参数模式、IncludePatterns、Readiness 与诊断；非法范围应 Blocked，不能静默跳过。

Consistency 获取 IConsistencyLease，SourcePath 在本次枚举／归档中有效，结束必须 DisposeAsync。IsStableSourceView 只有真正稳定时才返回 true。Prefer 可按 Kind 策略降级并持久记录警告；Require 不满足一致性时阻断。

## Restore、Checkout 与 Merge

IRestoreCoordinatorCapability 接受全部受影响 Folders、OperationId、TargetIdentity 和 WorkspaceOperationKind。先使外部程序停止写入，再调用一次 ContinueMutationAsync。不要在 continuation 中再次发起 Host 变更。返回后继续执行入口会关闭，已开始的变更会被排空。

Merge 的解包、冲突选择、压缩与校验在协调外完成；协调范围只包含实际写入来源（保护快照可能扩大范围）。零写入操作不需退出游戏。RecoveryRequired 和 CommittedRecoveryRequired 禁止自动重进。

## 普通还原暂存

IRestoreStagingPreparationCapability 仅用于普通 Restore。输入 Current／Target 是锁定只读来源；可通过 IRestoreSourceView 枚举受管相对路径。返回 RestoreStagedFileProposal，Host 批量验证后写 staging。限制为 4096 文件／64 MiB，错误诊断阻断。

玩家保留 override 为 null／true／false。SupportsPlayerDataOverride 默认为 false；不支持显式 override 时拒绝，不可悄悄沿用旧方法。变更后的普通还原 baseline 为 Derived。Checkout／Merge 不启用该保留流程。

## 单次强保留服务选项

`RestoreRequestOptions.RestorePreservePaths` 为普通 Restore／Quick Restore 提供相对路径选择器，当前字节与删除状态优先。Host 校验范围并在暂存中应用；插件不能直接写当前来源。它与 `RestoreWhitelist` 的归档优先规则不同，Checkout／Merge 不使用。具体限制见[过滤指南](/docs/guides/filters#单次文件与目录强保留)。
