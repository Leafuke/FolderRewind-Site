---
sidebar_position: 4
title: "服务编排与核心职责"
description: "按子系统查找配置、备份、还原、云传输和插件服务的编排入口。"
reviewed_baseline: "1.9-api3.9"
---

# 服务编排与核心职责

按子系统查找配置、备份、还原、云传输和插件服务的编排入口。

| 子系统 | 当前入口／职责 |
|---|---|
| 配置 | ConfigService、ConfigWriteCoordinator：快照串行持久化、配置恢复模式 |
| 备份 | BackupService：来源解析、捕获与 Host 事务终态；7-Zip 后端处理载荷 |
| 历史 | NativeHistoryCoreGateway、HistoryRuntime、提交／查询／还原服务：原生仓库、索引、Workspace 与门控 |
| 历史交互 | NativeHistoryApplicationService、NativeHistoryRestoreOrchestrator：UI 请求、来源、插件协调和结果映射 |
| 云 | CloudSyncService、RcloneNativeHistoryTransport、HistoryMetadataSyncService／HistoryReplicaSyncService：冻结连接、并集和验证副本 |
| 插件 | PluginService Host 入口与独立 PluginRuntimeManager：静态安装、激活、排空、typed settings 和目录更新 |
| 发现 | GameDiscoveryService 与 provider／三方 Review／DraftTransaction：候选与受控配置提交 |
| 引导 | CloudSetup、MinecraftOnboarding 与创建事务：步骤、诊断和一次提交 |
| 自动化 | AutomationService：可取消调度、条件触发、来源目标与无变更停止 |
| UI | Navigation、AppDialog、Notification、Theme、MiniWindow 及 Dispatcher 适配 |

旧 HistoryService 管理可变 history.json 不再是核心权威，旧 TemplateService／PluginService 单文件清单也不能代表当前模块。优先描述职责与测试边界，具体 partial 文件随实际源码查询。

受控还原先评估／物化／完整性验证，再进入 Host 原子变更；插件协调不能嵌套 Host 写入。云数据操作区分配置导入、packs 同步和 payload 传输。失败诊断与取消传至 UI，不以任务排队成功代替最终成功。

<span id="ui-辅助" />
<span id="其他" />
<span id="安全" />
<span id="插件与扩展" />
<span id="核心备份" />
<span id="系统集成" />
<span id="自动化与调度" />
