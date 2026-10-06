---
sidebar_position: 6
title: "Minecraft 故障排查"
description: "按插件、存档、游戏协调和归档依赖排查 Minecraft 备份还原问题，并保存有效诊断。"
reviewed_baseline: "1.9-api3.9"
---

# Minecraft 故障排查

按插件、存档、游戏协调和归档依赖排查 Minecraft 备份还原问题，并保存有效诊断。

## 先检查链路

检查 Host 支持 API 3.9、MineRewind 来源与版本、Enabled Intent 和 Active、Kind、世界有效路径、session.lock 状态、KnotLink 和游戏组件，以及可物化的历史目标。旧 EnableHotBackup 开关和 v2 钩子不是当前排错入口。

| 现象 | 检查与处理 |
|---|---|
| 未发现世界 | 根路径、AutoDiscoverSaves、实例／定义目录、扫描诊断；审阅草稿而非强行写配置 |
| 备份有警告 | Prefer 降级／握手／快照失败；Require 应阻断；保存日志并测试恢复 |
| 区域不符预期 | 输入方块坐标、floor/512、维度、SourceScope 与过滤、全部.mcc 规则 |
| 快速还原无变化 | 已处于活动分支目标；不会自动选择更早版本 |
| 还原被拒绝 | 分叉、依赖缺失、多个活动世界、协调失败或恢复状态；先准备目标／修复 |
| 玩家没保留 | 本地设置、显式 false、普通 Restore 限定、全部 UUID、布局兼容及提案错误 |
| 已恢复但未重进 | 区分 Host 成功与重进警告，人工确认游戏环境再进入 |

## 诊断与恢复

用 GET_CAPABILITIES 与 LIST_BACKUPS 取得运行时目标及精确参数；文件名动态值需 percent-encoding。安装、激活、Ready／Degraded／Blocked 与 SuccessWithWarnings 是不同阶段。RecoveryRequired／CommittedRecoveryRequired 时不再次发起破坏性请求，不自动重进。

提交问题提供 Host／API／插件／游戏组件版本、时间、request_id、结果和脱敏日志，不上传令牌、私有路径或完整生产存档。真实加载失败需要保留测试副本与游戏错误，不仅提供 NBT 测试通过的结论。

## 未找到存档或版别不符

先确认自动发现与指定根目录扫描的区别；便携／自定义目录手选补足。检查草稿实际 Kind：Java、Bedrock 不能互换。Bedrock 不提供 Java 热协调、NBT 玩家保留或区域范围；普通目录也不要求世界元数据。查看逐来源诊断，不把部分结果或预算超限当成全盘扫描完成。

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
