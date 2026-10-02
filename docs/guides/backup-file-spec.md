---
sidebar_position: 3
title: "备份载荷与原生历史存储规范"
description: "FolderRewind 1.9 系列备份载荷与原生历史存储规范操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 备份载荷与原生历史存储规范

1.9以配置的不可变 History Repository 为逻辑权威。压缩包是可恢复字节的物理载荷之一，文件名不再代表完整的历史身份、祖先或可还原性。

## 本机仓库

```text
<应用数据目录>/history/<编码后的 ConfigId>/
├─ repository.json
├─ packs/<前两位>/<PackId>.frpack
├─ index/
├─ local-state/
├─ transactions/
└─ quarantine/
```

ConfigId GUID 使用规范无分隔编码，其他 ID 使用稳定哈希编码；不要按显示名找仓库。packs 保存共享历史事实；index 是可重建查询投影；local-state 保存本机 Workspace／Replica Catalog 等，不作云共享事实。

载荷按保存的 Representation／Replica 定位器在配置目标或受控存储中；迁移的旧归档可以保留旧路径。不要把文件夹显示名、压缩包重命名或 `[Full/Smart/Overwrite]` 正则视作新版身份。

## 历史模型

Backup Run 记录一次操作及逐来源结果，Source Version 表示来源逻辑状态，Checkpoint 是配置状态向量。Representation 说明如何物化版本；Replica 是一份物理副本；一次 Commit Pack 原子公开共享事实。备注／Pin／隐藏通过 Annotation 更新，不改写旧事实。

## 维护与迁移

重建索引读取 Commit Packs，不恢复丢失的载荷；丢失 packs 也不能仅靠压缩包文件名补齐分支事实。旧1.8历史只在一次性迁移入口读取；旧 metadata.json 不是原生历史权威。

移动电脑时分别处理配置、历史事实和载荷。`.frhistory` 传输历史 packs，不含备份载荷；参阅[数据迁移](/docs/guides/data-migration)。不要手工编辑 packs 或清空 transactions。

## 保留保护

Pin、分支尖端、Workspace 和安全恢复点保护可物化依赖闭包；重要备注或界面隐藏不应被当作相同的保留保证。物理副本缺失与逻辑版本存在可以同时发生，需先评估恢复能力再清理。

<span id="命名格式规范" />
<span id="字段说明" />
<span id="命名注意事项" />
<span id="源码解析正则" />
<span id="备份文件存储结构" />
<span id="metadatajson-版本说明" />
<span id="默认目标路径规则" />
<span id="与重建历史记录的关系" />
<span id="重要标记与自动清理" />
<span id="自动清理与安全删除" />
<span id="远程命令knotlink补充" />
<span id="相关链接" />
