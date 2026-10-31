---
sidebar_position: 3
title: "备份文件与历史存储"
description: "了解归档、不可变历史数据包、本机索引与工作区的存放方式，按版本依赖准备备份，并正确迁移和维护历史资料。"
reviewed_baseline: "1.10-api3.17"
---

# 备份文件与历史存储

一个可还原版本由历史记录和实际文件共同组成。历史保存来源、分支与版本关系，归档或插件 Artifact 保存可恢复内容。

## 本机仓库

```text
<应用数据目录>/history/<编码 ConfigId>/
├─ repository.json
├─ packs/<前两位>/<PackId>.frpack
├─ index/
├─ local-state/
├─ transactions/
└─ quarantine/
```

`packs` 保存不可变共享事实，`index` 支持查询，`local-state` 保存本机工作区和副本位置。归档通过 Representation／Replica 定位，通常在项目选择的备份位置或受控存储中。

## 从一次备份到一个版本

Backup Run 记录本次参与来源的结果。每个 Source Checkpoint 指向一个来源版本，并记录历史延续。Version Representation 描述物化方式和依赖，Storage Replica 描述一份副本。

一个 Commit Pack 原子公开关联事实。备注、Pin 与展示策略使用 Annotation 更新。寻找备份时，以应用中的来源与版本为入口。

## 移动与维护

迁移时分别准备配置、`.frhistory` 和实际归档。历史传输包携带 Pack，归档及增量依赖另外复制，见[数据迁移](/docs/guides/data-migration)。

重建索引会重新读取 Pack。文件或依赖缺失时，优先准备可靠本地副本或云副本，再检查可还原状态。旧版备份通过接管报告定位和验证。

## 保留依赖

保护标记、分支尖端、工作区与安全恢复点参与依赖保留。清理前查看影响与空间报告，通过应用维护本地和云副本，可保持版本关系和归档状态一致。

<span id="metadatajson-版本说明" />
<span id="与重建历史记录的关系" />
<span id="命名格式规范" />
<span id="命名注意事项" />
<span id="备份文件存储结构" />
<span id="字段说明" />
<span id="源码解析正则" />
<span id="相关链接" />
<span id="自动清理与安全删除" />
<span id="远程命令knotlink补充" />
<span id="重要标记与自动清理" />
<span id="默认目标路径规则" />

<span id="备份载荷与原生历史存储规范" />

<span id="历史模型" />
<span id="维护与迁移" />
<span id="保留保护" />
