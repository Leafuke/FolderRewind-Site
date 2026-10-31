---
sidebar_position: 4
title: "服务编排与核心职责"
description: "按子系统查找配置、捕获、历史、合并、云恢复、通知与插件服务，理解输入准备、事务提交和界面结果的协作。"
reviewed_baseline: "1.10-api3.17"
---

# 服务编排与核心职责

| 子系统 | 入口与职责 |
| --- | --- |
| 配置 | ConfigService、ConfigWriteCoordinator：快照、串行保存、恢复与迁移激活 |
| 捕获 | BackupService 与 Core 策略：解析范围、差异、压缩输入与捕获结果 |
| 历史 | HistoryRuntime、查询与提交服务：不可变事实、来源分支、Workspace 和索引 |
| 合并 | MergeOperationService、HistoryMerge 服务：计划、决策、结果审阅与受控应用 |
| 地图 | SpatialWorkspace 与 SpatialPreview：固定历史输入、对比、选区和显示状态 |
| 云 | CloudSetupCoordinator、CloudSyncService：连接、授权、上传与同步 |
| 云恢复 | CloudReadOnlyRecoveryService：读取历史、下载依赖并恢复到新位置 |
| OpenList | OpenListRuntimeService：指定本机实例的运行状态与启动管理 |
| 插件 | PluginService 与 PluginRuntimeManager：安装、激活、路由、租约和更新 |
| 发现 | GameDiscoveryService、Review 与 DraftTransaction：候选审阅和项目创建 |
| 自动化 | AutomationService：调度、条件触发、取消与无变化停止 |
| 通知 | NotificationCoordinator、NotificationCenterService：结果聚合、提醒策略与跳转 |

还原先评估、物化和验证，再进入 Host 事务修改目标。插件协调包围实际变更，分析与构建使用暂存输入输出。

云连接、历史同步和载荷传输分别管理结果。取消与诊断沿操作上下文传至 ViewModel，最终结果进入任务、日志与通知中心。

查找具体实现时，按项目与功能目录查看 partial 文件。整体依赖见[架构总览](/docs/architecture/)。

<span id="ui-辅助" />
<span id="其他" />
<span id="安全" />
<span id="插件与扩展" />
<span id="核心备份" />
<span id="系统集成" />
<span id="自动化与调度" />
