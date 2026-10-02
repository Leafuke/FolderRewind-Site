---
sidebar_position: 6
title: "Minecraft 故障排查"
description: "FolderRewind 1.9 系列Minecraft 故障排查操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# Minecraft 故障排查

## 先检查链路

检查Host支持API3.5、MineRewind来源与版本、Enabled Intent和Active、Kind、世界有效路径、session.lock状态、KnotLink和游戏组件，以及可物化的历史目标。旧EnableHotBackup开关和v2钩子不是当前排错入口。

| 现象 | 检查与处理 |
|---|---|
| 未发现世界 | 根路径、AutoDiscoverSaves、实例／定义目录、扫描诊断；审阅草稿而非强行写配置 |
| 备份有警告 | Prefer降级／握手／快照失败；Require应阻断；保存日志并测试恢复 |
| 区域不符预期 | 输入方块坐标、floor/512、维度、SourceScope与过滤、全部.mcc规则 |
| 快速还原无变化 | 已处于活动分支目标；不会自动选择更早版本 |
| 还原被拒绝 | 分叉、依赖缺失、多个活动世界、协调失败或恢复状态；先准备目标／修复 |
| 玩家没保留 | 本地设置、显式false、普通Restore限定、全部UUID、布局兼容及提案错误 |
| 已恢复但未重进 | 区分Host成功与重进警告，人工确认游戏环境再进入 |

## 诊断与恢复

用GET_CAPABILITIES与LIST_BACKUPS取得运行时目标及精确参数；文件名动态值需percent-encoding。安装、激活、Ready／Degraded／Blocked与SuccessWithWarnings是不同阶段。RecoveryRequired／CommittedRecoveryRequired时不再次发起破坏性请求，不自动重进。

提交问题提供Host／API／插件／游戏组件版本、时间、request_id、结果和脱敏日志，不上传令牌、私有路径或完整生产存档。真实加载失败需要保留测试副本与游戏错误，不仅提供NBT测试通过的结论。

<span id="先做-60-秒链路体检" />
<span id="现象与源码定位表" />
<span id="现象-1扫描不到存档" />
<span id="现象-2热备份没有触发协同" />
<span id="现象-3热还原中途取消" />
<span id="现象-4指定备份还原失败" />
<span id="现象-5还原后玩家状态异常" />
<span id="命令诊断模板可直接复用" />
<span id="仍未解决" />
<span id="相关链接" />
