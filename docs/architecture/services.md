---
sidebar_position: 4
title: "服务编排与核心职责"
description: "FolderRewind 1.9 系列服务编排与核心职责操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 服务编排与核心职责

| 子系统 | 当前入口／职责 |
|---|---|
| 配置 | ConfigService、ConfigWriteCoordinator：快照串行持久化、配置恢复模式 |
| 备份 | BackupService：来源解析、捕获与Host事务终态；7-Zip后端处理载荷 |
| 历史 | NativeHistoryCoreGateway、HistoryRuntime、提交／查询／还原服务：原生仓库、索引、Workspace与门控 |
| 历史交互 | NativeHistoryApplicationService、NativeHistoryRestoreOrchestrator：UI请求、来源、插件协调和结果映射 |
| 云 | CloudSyncService、RcloneNativeHistoryTransport、HistoryMetadataSyncService／HistoryReplicaSyncService：冻结连接、并集和验证副本 |
| 插件 | PluginService Host入口与独立PluginRuntimeManager：静态安装、激活、排空、typed settings和目录更新 |
| 发现 | GameDiscoveryService与provider／三方Review／DraftTransaction：候选与受控配置提交 |
| 引导 | CloudSetup、MinecraftOnboarding与创建事务：步骤、诊断和一次提交 |
| 自动化 | AutomationService：可取消调度、条件触发、来源目标与无变更停止 |
| UI | Navigation、AppDialog、Notification、Theme、MiniWindow及Dispatcher适配 |

旧HistoryService管理可变history.json不再是核心权威，旧TemplateService／PluginService单文件清单也不能代表当前模块。优先描述职责与测试边界，具体partial文件随实际源码查询。

受控还原先评估／物化／完整性验证，再进入Host原子变更；插件协调不能嵌套Host写入。云数据操作区分配置导入、packs同步和payload传输。失败诊断与取消传至UI，不以任务排队成功代替最终成功。

<span id="核心备份" />
<span id="自动化与调度" />
<span id="插件与扩展" />
<span id="ui-辅助" />
<span id="系统集成" />
<span id="安全" />
<span id="其他" />
