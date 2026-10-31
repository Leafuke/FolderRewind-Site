---
sidebar_position: 5
title: "制品转换、增量与物化"
description: "实现不可变 Artifact 转换、增量输入和隔离物化，使用固定文件视图服务历史预览，并由宿主管理格式、依赖与提交。"
reviewed_baseline: "1.10-api3.17"
---

# 制品转换、增量与物化

Artifact 是 Host 管理的不可变载荷节点。插件用 owner-qualified `ArtifactFormatRef` 和格式版本描述内容，Host 管理存储保护、依赖、完整性与生命周期。

## 声明与转换

在 manifest 中声明格式、transformer、restore strategy 和所需服务。`IBackupArtifactTransformerCapability` 接收 Primary、参数与预期图修订，通过 ArtifactRead 读取输入，通过 ArtifactTransformStaging 创建相对文件，返回 `ArtifactGraphPatch`。

Host 核对格式、依赖图、修订、哈希与暂存边界后提交。`KeepPrimaryWithWarnings` 可以保留核心结果并记录警告，`RequireTransform` 要求转换完成。

## 增量输入

声明 `supportsIncrementalInput` 后，通过 `ArtifactIncrementalInput` 接收 Host 选定的捕获 ID、输入类型、范围指纹、基线版本与表示，以及新增、修改、删除列表。`Full` 和 `ChangesOnly` 描述本次物理输入。

Host 选择可信基线和检查点，插件根据固定输入建立新的重建配方与依赖，旧制品继续保留。MineRewind 的无损 Full／增量表示使用这类能力；它与世界语义合并分别声明。

## 还原物化与文件视图

`IRestoreMaterializerCapability` 接收按拓扑排序的固定 Artifact 集合，通过 ArtifactRead 读取数据，向 RestoreMaterializationWorkspace 写入相对路径。Host 验证结果并执行目标变更，部分捕获按 Overwrite 应用。

物化器还可以实现 `IArtifactFileViewProvider`，提供固定依赖闭包上的只读 `IArtifactFileView`。文件条目包含相对路径、长度、哈希和配方引用，流由同一解码路径重建。Host 持有读取租约直到视图与流释放，可用于历史比较与预览。

## 完成观察与元数据

`IBackupCompletionObserverCapability` 在历史提交后接收版本、表示、根 Artifact、图修订与云排队状态，返回观察诊断。

`IFolderMetadataCapability` 描述当前来源；`IVersionMetadataProviderCapability` 读取同次稳定捕获并返回带 SchemaId／SchemaVersion 的有界 JSON，随版本保存。

## 验证

覆盖完整与增量输入、删除列表、缺失依赖、过期修订、非法路径、取消和提交后的恢复。领域格式还需用真实应用加载测试结果。合并协议见[领域合并参考](/docs/plugins/developing/plugin-api#semantic-merge)。

<span id="制品转换物化与版本元数据" />
<span id="转换事务" />
<span id="完成观察" />
<span id="还原物化" />
<span id="两种元数据" />
<span id="验证建议" />
