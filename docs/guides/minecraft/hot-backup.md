---
sidebar_position: 3
title: "Minecraft 热备份与一致性租约"
description: "FolderRewind 1.9 系列Minecraft 热备份与一致性租约操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# Minecraft 热备份与一致性租约

## 目标与活动检测

MineRewind 1.9.5 通过有效世界路径及 session.lock 判断活动世界，不以 level.dat 锁定作为唯一依据。手动备份、快捷键或 current_save 选择器都进入同一 Host 流程，v3没有旧 EnableHotBackup 开关。

## 协调

Host 按 Kind 与配置一致性意图解析就绪性，调用 IBackupConsistencyCapability。活动世界需要 KnotLink／模组握手和 WORLD_SAVED；插件创建本次操作可用的快照来源，返回可释放租约，让枚举／归档读取同一来源。

成功结束、取消或异常都应释放临时数据。插件不从 OnBeforeBackupFolder 返回替代路径，也不在备份后改既有归档。

## Prefer 与 Require

Prefer 在允许 rawWithWarnings 的配置上可降级，记录 SuccessWithWarnings 和具体协调／快照诊断；不等于证明游戏一致性。Require 在握手、落盘或稳定来源不可用时阻断。指定范围提供器缺失／参数非法不得把部分保护悄悄扩大成全量。

## 请求与验证

```text
cmd=BACKUP;current_save=true;backup_mode=smart;from=panel;request_id=hot-001
```

先查询能力，再检查 status=ok 和后续同 request_id 的结果。无活跃世界或多目标时读取诊断；不能把请求接受当完成。分别演练在线协调、离线警告、Require 阻断、取消、临时目录清理及真实归档恢复。

<span id="源码映射" />
<span id="触发入口" />
<span id="触发条件" />
<span id="执行流程源码对照" />
<span id="流程时序文本版" />
<span id="关键超时与行为" />
<span id="命令触发示例" />
<span id="请求" />
<span id="典型响应" />
<span id="与普通备份的差异" />
<span id="推荐实践" />
<span id="相关链接" />
