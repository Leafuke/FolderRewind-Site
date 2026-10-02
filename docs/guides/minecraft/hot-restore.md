---
sidebar_position: 4
title: "Minecraft 热还原与玩家数据保留"
description: "FolderRewind 1.9 系列Minecraft 热还原与玩家数据保留操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# Minecraft 热还原与玩家数据保留

## Host 管理的还原

MineRewind 用配置级 RestoreCoordinator 接收全部受影响来源、OperationId 和 Restore／Checkout／Merge 类型，协调活动世界保存、退出及 session.lock 释放。多个活动世界、握手失败或来源仍占用时拒绝，不绕过环境检查。

准备完成后调用一次 Host continuation；实际写入、Safe Restore 和恢复事务由 Host 管理。插件返回后不能继续写 live 世界。Merge／Checkout同样协调环境，但不启用普通还原玩家保留；零写入合并无需退出。

## 目标和模式

Alt+Ctrl+Z 或 file 省略的 RESTORE 使用活动分支唯一尖端的 Quick Restore。状态已精确匹配时 NoChanges，不选择上一个时间包。远程默认 Clean，部分捕获强制 Overwrite；指定 file 使用可解析的历史目标并验证依赖。

```text
cmd=RESTORE;current_save=true;preserve_player_data=true;from=panel;request_id=restore-001
```

## 玩家保留

PreservePlayerData 本地默认 false；preserve_player_data 省略继承，true／false明确覆盖当前操作。普通 Restore 在锁定只读 Current／Target 视图中生成相对文件提案，Host整批验证并应用到暂存，不在还原后补写 level.dat。

对全部 UUID 保留位置、背包、经验等选定 NBT字段；备份中缺少该玩家时保留当前完整 NBT。统计／进度仍随备份恢复。单人嵌入 Player 与服务器 playerdata／players 布局按实现处理；跨26.1布局保留或不支持显式override时阻断。修改结果 Workspace baseline为Derived。

## 完成与恢复状态

归档写入成功与自动重进成功是不同结果，重进失败可产生 SuccessWithWarnings。RecoveryRequired／CommittedRecoveryRequired 禁止自动重进，应检查恢复诊断再操作。不能对未知提交状态重复点击还原。

先在副本验证多个玩家、显式false、缺失玩家、布局异常、取消、部分捕获和游戏重进。NBT夹具通过不证明真实游戏加载成功。

<span id="源码映射" />
<span id="两种触发方式" />
<span id="执行前提" />
<span id="状态机说明" />
<span id="执行流程源码对照" />
<span id="流程时序文本版" />
<span id="关键状态与结果" />
<span id="常见失败点" />
<span id="请求响应示例" />
<span id="指令还原到最新备份" />
<span id="指令还原到指定备份" />
<span id="安全建议" />
<span id="相关链接" />
