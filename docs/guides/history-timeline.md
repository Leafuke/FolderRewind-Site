---
sidebar_position: 6
title: "历史记录：版本、运行与普通高级视图"
description: "FolderRewind 1.9 系列历史记录：版本、运行与普通高级视图操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 历史记录：版本、运行与普通高级视图

在配置管理中打开历史，选择配置与来源，按来源版本或备份运行查看。Backup Run 是一次操作事实，Checkpoint 是配置状态；无变更运行不一定创建新版本。

## 普通视图

普通视图用于筛选、检查结果、备注、Pin、还原与云副本。根据状态文本和图标判断，不能只凭蓝色／金色节点证明完整性。区分逻辑历史存在、本地载荷存在、云副本、诊断和可物化性。

## 高级视图

启用高级历史操作后管理分支、Workspace、Checkpoint、来源绑定、恢复点和合并。分支不是某个文件夹名；配置 Checkpoint 可涉及多个来源。分叉含多个尖端，需要明确选择／合并，不能默认以最新时间覆盖。

## 普通还原与 Quick Restore

指定 Source Version 或完整配置 Checkpoint 后，Host 评估表示和依赖，准备暂存并确认来源。Clean 仅重建受管边界内目标；Overwrite 覆盖包内数据。部分捕获强制 Overwrite。玩家保留等普通还原提案会形成 Derived baseline。

Quick Restore 使用当前 Workspace 活动分支的唯一尖端对应来源版本。已精确匹配时 NoChanges；分叉、缺少来源／完整依赖或恢复状态异常时阻断，不自动取上一条时间记录。

## 云、删除与重建

先评估并准备需要的云副本及依赖，再执行还原。只缺本地文件不等于版本失效，不应一键清掉所有“缺失”逻辑历史。展示隐藏、释放表示、删除本地副本和退役云副本不同，逐项阅读确认。

重建可重建索引，不靠旧归档命名猜分支。Pin 等保护根会保留依赖；不应手动删压缩包断链。阅读[分支与合并](/docs/guides/history-branches)、[安全恢复点](/docs/guides/safety-snapshots)。

## 单次强保留与旧版本限制

普通 Restore 及其 Quick Restore 入口可通过 KnotLink 的 `restore_preserve_paths` 指定本次保留的相对文件或目录。当前状态优先于归档，包括当前已删除的文件；这是强保留，不是“归档同路径优先”的还原白名单。产生派生状态后，Workspace 不应被理解为精确等于原版本。Checkout 和 Merge 不启用普通还原的强保留或玩家保留。

旧接管版本的删除边界可能未知，即使验证通过也不能执行 Clean 或当作精确分支基线。查看迁移报告，先使用不删除的 Overwrite／恢复到新目录，再建立新的 Full 版本。

<span id="进入方式" />
<span id="页面布局" />
<span id="你可以做什么" />
<span id="筛选与可视化" />
<span id="恢复流程推荐" />
<span id="管理建议" />
<span id="云副本操作" />
<span id="安全删除" />
<span id="重建历史记录" />
<span id="常见问题" />
<span id="点查看提示文件不存在" />
<span id="恢复后内容不如预期" />
<span id="相关链接" />
