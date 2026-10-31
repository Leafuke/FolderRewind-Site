---
sidebar_position: 3
title: "Minecraft 热备份"
description: "准备 KnotLink 与游戏侧组件，在 Java 世界运行时协调保存与文件读取，选择一致性要求，并检查实际备份结果和警告。"
reviewed_baseline: "1.10-api3.17"
---

# Minecraft 热备份

热备份让你在游戏中保存进度。MineRewind 识别活动世界，并与游戏侧组件协调世界保存和读取时机。

## 准备游戏联动

先完成一次关闭游戏后的备份与还原，再准备 [KnotLink](/docs/guides/minecraft/knotlink-mod)和适合加载器的[游戏侧组件](/docs/guides/minecraft/minebackup-mod)。通过运行时能力查询检查连接和当前世界命令。

活动世界结合有效路径与 `session.lock` 状态识别。手动备份、默认 `Alt+Ctrl+S` 和远程命令进入同一任务流程。

## 选择一致性要求

| 设置 | 处理方式 |
| --- | --- |
| Prefer | 优先协调保存；允许的降级路径会保留备份并记录警告 |
| Require | 满足握手、保存及稳定读取条件后开始捕获，条件不足时显示阻断原因 |

开始后，游戏侧组件保存世界并回传状态，应用在受控来源上完成枚举与归档。结束、取消或失败后释放本次协调与临时资源。

## 发起备份并检查结果

可以从应用操作，也可以发送：

```text
cmd=BACKUP;current_save=true;backup_mode=smart;from=panel;request_id=hot-001
```

先查询能力，再使用 `request_id` 关联任务终态。到[通知中心](/docs/guides/notifications)查看实际备份结果；有警告时展开详情，确认本次采用的捕获方式。

第一次用于整合包时，试一次在线备份、取消和历史还原，在世界副本中检查建筑、实体和玩家状态。

<span id="与普通备份的差异" />
<span id="关键超时与行为" />
<span id="典型响应" />
<span id="命令触发示例" />
<span id="执行流程源码对照" />
<span id="推荐实践" />
<span id="流程时序文本版" />
<span id="源码映射" />
<span id="相关链接" />
<span id="触发入口" />
<span id="触发条件" />
<span id="请求" />

<span id="minecraft-热备份与一致性租约" />
<span id="目标与活动检测" />
<span id="协调" />
<span id="prefer-与-require" />
<span id="请求与验证" />
