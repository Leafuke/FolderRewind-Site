---
sidebar_position: 8
title: 自动化任务
description: 间隔/计划执行与任务系统实践
---

# 自动化任务

MineBackup 支持常规自动备份与统一任务系统（任务类型 + 执行模式 + 触发模式）。

自动化的目标是“稳定重复”，不是“堆更多任务”。先保证单任务稳定，再逐步组合。

## 触发方式

- Once：单次
- Interval：固定间隔
- Scheduled：计划时间

选择建议：

- 日常固定频率：Interval
- 指定时间窗口（如夜间）：Scheduled
- 手动临时执行：Once

## 任务类型

- Backup：执行世界备份
- Command：执行命令
- Script：预留扩展

其中 Backup 与 Command 可以组合成“备份前后处理”链路。

## 执行模式

- Sequential：顺序执行
- Parallel：并行执行

并行能提升效率，但会增加磁盘和 CPU 竞争，建议仅在资源充足且目录独立时使用。

## 实践建议

1. 先用单任务验证稳定性
2. 再组合并行任务，避免同时抢占磁盘
3. 关键任务开启失败告警并设置重试

## 推荐任务编排模板

### 模板 A：稳妥型（推荐新手）

1. Backup（Sequential）
2. Command（Sequential，做清理或通知）

### 模板 B：高频型（进阶）

1. Backup（Scheduled）
2. Command（Parallel，轻量日志任务）

## 自动化上线前检查

启用长期自动化前，建议先连续观察 2~3 个周期：

- 是否按时触发
- 是否存在偶发失败
- 失败后是否能自动重试或被及时发现

通过后再扩大到更多配置。

如果你要做“开机自动运行 + 自动退出”的无人值守流程，继续看 [特殊模式（Special Config）](./special-mode)。
