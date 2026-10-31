---
sidebar_position: 20
title: "Minecraft 故障排查"
description: "检查 MineRewind、存档路径、游戏协调与归档依赖，定位地图、区域备份、玩家保留和世界合并的问题，并收集有效日志。"
reviewed_baseline: "1.10-api3.17"
---

# Minecraft 故障排查

先在插件管理确认 MineRewind 的实际运行状态，再检查世界路径、Java／Bedrock 类型和相关任务诊断。

| 现象 | 检查与处理 |
| --- | --- |
| 找不到世界 | 选择实际启动器、saves 或世界目录，查看扫描诊断和草稿路径 |
| 热备份有警告 | 展开一致性详情，检查 KnotLink、游戏组件、握手与保存回执 |
| 区域范围不符 | 核对方块坐标、维度、来源范围和过滤，在有效预览中检查 |
| 快速还原没有变化 | 当前已匹配活动分支目标；需要更早状态时手选历史版本 |
| 还原等待或受阻 | 检查依赖、活动世界数量、文件占用和需要恢复的状态 |
| 玩家数据未按预期保留 | 核对本地设置、单次 true／false、普通 Restore 与布局诊断 |
| 地图空白或不完整 | 检查维度、生成范围、区块状态和历史依赖，再放大或刷新 |
| 合并需要整世界选择 | 阅读保守策略的实体与布局诊断，检查所有维度后选择一侧 |
| 已恢复但游戏尚未重进 | 查看重进警告，确认环境后手动进入 |

## 检查游戏联动

使用 `GET_CAPABILITIES` 查询当前支持的命令，再用 `LIST_BACKUPS` 检查目标。动态文件名按 percent-encoding 编码，通过 `request_id` 关联操作结果。

Java、Bedrock 和普通目录使用相应流程。Bedrock 先关闭游戏，再执行完整文件备份；Java 的地图、玩家 NBT 和热协调由 MineRewind 提供。

## 处理恢复与反馈

出现需要恢复的结果时，保留原始文件和日志，按应用诊断完成恢复。复现问题时记录应用、插件、游戏组件版本、时间、目标路径、操作步骤和实际结果。

地图问题附上维度、坐标与区块状态；合并问题附上所选策略与冲突项。游戏加载失败时同时保存游戏错误日志，便于定位具体数据。

相关指南：[热备份](/docs/guides/minecraft/hot-backup)、[热还原](/docs/guides/minecraft/hot-restore)、[地图](/docs/guides/minecraft/world-preview)、[世界合并](/docs/guides/minecraft/world-merge)。

<span id="仍未解决" />
<span id="先做-60-秒链路体检" />
<span id="命令诊断模板可直接复用" />
<span id="现象-1扫描不到存档" />
<span id="现象-2热备份没有触发协同" />
<span id="现象-3热还原中途取消" />
<span id="现象-4指定备份还原失败" />
<span id="现象-5还原后玩家状态异常" />
<span id="现象与源码定位表" />
<span id="相关链接" />

<span id="先检查链路" />
<span id="诊断与恢复" />
<span id="未找到存档或版别不符" />
