---
sidebar_position: 20
title: "制品转换、物化与版本元数据"
description: "实现不可变制品转换和隔离还原物化，核对格式身份、依赖、元数据与提交边界。"
reviewed_baseline: "1.9-api3.9"
---

# 制品转换、物化与版本元数据

实现不可变制品转换和隔离还原物化，核对格式身份、依赖、元数据与提交边界。

API 3.9 中 Artifact 是 Host 管理的不可变载荷节点，与 Source Version、Representation 和 Replica 不同。格式由 owner-qualified ArtifactFormatRef 与格式版本标识；扩展名或插件产品版本不决定格式。

## 转换事务

声明 ArtifactFormats、ArtifactTransformers、RestoreStrategies 及对应能力。Transformer 必须声明 ArtifactRead／ArtifactTransformStaging 服务、支持的配置 Kind、核心模式、完整性和失败策略。

IBackupArtifactTransformerCapability 接收已完成的 Primary、候选、ExpectedGraphRevision 和参数。用 Staging 创建新 Artifact 并写相对文件，返回 AddedArtifacts、依赖及结果根组成的 ArtifactGraphPatch。Host 验证 revision、格式、完整性、依赖图、哈希和 staging 边界后提交。不能改写旧归档或自行分配持久历史事实。

KeepPrimaryWithWarnings 保留核心结果并记录警告；RequireTransform 未完成转换时不能当作成功。选择必须与声明一致。

## 完成观察

IBackupCompletionObserverCapability 接收已提交结果，包括 Version、Representation、Artifact 根、GraphRevision、CoreOutcome 和 CloudQueueCommitted。只返回诊断，不在观察器里修改既有归档。hasBackupCompletionObserver 与声明及注册一致。

## 还原物化

IRestoreMaterializerCapability 按声明格式／版本／完整性／模式处理按拓扑排序的 Artifact。声明 ArtifactRead 与 RestoreMaterializationWorkspace。输出只能写隔离 Workspace 内的相对路径；Host 完成预检、完整性、Safe Restore、进度／取消及实际目标变更。部分捕获不因为物化 Exact 就允许 Clean。

## 两种元数据

IFolderMetadataCapability 描述当前 live 文件夹用于界面。IVersionMetadataProviderCapability 读取本次稳定捕获的只读 Source，返回 SchemaId、SchemaVersion 和有界 JSON payload；数据成为不可变版本元数据，不能在历史显示时重新读取 live 世界冒充旧版本。

## 验证建议

验证失败转换、过期 revision、缺失依赖、格式不兼容、非法相对路径、取消、恢复失败及提交后故障。只证明文件能解压不足以证明游戏能加载；Minecraft 的 .mca／NBT 首发按保守文件冲突处理，不承诺语义合并。
