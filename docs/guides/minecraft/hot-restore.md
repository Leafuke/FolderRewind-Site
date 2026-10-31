---
sidebar_position: 4
title: "Minecraft 热还原与玩家保留"
description: "协调 Java 世界保存、退出与还原，选择目标版本和玩家状态保留方式，通过通知与测试世界检查文件恢复和游戏重进结果。"
reviewed_baseline: "1.10-api3.17"
---

# Minecraft 热还原与玩家保留

热还原会先协调游戏保存与退出，等世界文件释放后，由 FolderRewind 恢复目标内容。准备好游戏侧组件，再用测试世界走完一次流程。

## 选择目标与方式

在历史中选择明确版本，或用 `Alt+Ctrl+Z` 请求活动分支唯一尖端的快速还原。当前内容已经精确匹配时，结果为 `NoChanges`。

远程 RESTORE 默认 Clean；区域备份等部分捕获使用 Overwrite。指定 `file` 时，应用准备相应历史目标和完整依赖。

```text
cmd=RESTORE;current_save=true;preserve_player_data=true;from=panel;request_id=restore-001
```

## 保留玩家状态

在插件设置中启用 `PreservePlayerData`，普通还原会保留所有玩家的位置、朝向、维度、背包、末影箱、经验等选定 NBT 字段。备份中没有的玩家保留完整当前 NBT；统计与进度随备份恢复。

远程参数 `preserve_player_data` 省略时继承本地设置，true／false 明确控制本次操作。玩家布局需兼容，跨旧布局与 26.1 布局时按诊断处理。

应用先在暂存区组合目标与保留数据，再执行还原。Checkout 和 Merge 使用分支结果；此处玩家保留用于普通 Restore。

## 保留某个当前文件或目录

`restore_preserve_paths` 使用唯一受管世界根下的相对路径。目录以 `/` 结尾，所选内容及其当前删除状态优先，具体范围和限额见[强保留说明](/docs/guides/filters#restore-preserve-paths)。

```text
cmd=RESTORE;current_save=true;restore_preserve_paths=data/local.dat,datapacks/;preserve_player_data=false;from=panel;request_id=restore-preserve-001
```

## 检查还原与重进

从[通知中心](/docs/guides/notifications)分别查看文件恢复和游戏重进结果。重进失败时先检查游戏环境，文件恢复结果保留在详情中。需要恢复处理时，完成应用诊断中的步骤后再进入世界。

先在副本中检查多个玩家、显式关闭保留、缺失玩家、取消和游戏重进。Bedrock 使用关闭游戏后的普通文件还原。

<span id="两种触发方式" />
<span id="关键状态与结果" />
<span id="安全建议" />
<span id="常见失败点" />
<span id="执行前提" />
<span id="执行流程源码对照" />
<span id="指令还原到指定备份" />
<span id="指令还原到最新备份" />
<span id="流程时序文本版" />
<span id="源码映射" />
<span id="状态机说明" />
<span id="相关链接" />
<span id="请求响应示例" />

<span id="minecraft-热还原与玩家数据保留" />
<span id="host-管理的还原" />
<span id="目标和模式" />
<span id="玩家保留" />
<span id="完成与恢复状态" />
<span id="单次路径强保留" />
