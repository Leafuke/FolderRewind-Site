---
sidebar_position: 6
title: Job 工作流
description: 理解 MineBackup 1.16.2 CLI Job、Stage、Step 和外部系统调度
---

# Job 工作流

Job 适合把“已经验证过的工作”编排成一次可重复运行的流程。它不负责时间触发。

> **Job 决定“做什么”，系统调度器决定“什么时候做”。**

## Job、Stage、Step 的心智模型

```text
Job
└── Stage 1
    ├── Step A
    └── Step B
└── Stage 2
    └── Step C
```

- Stage 按数组顺序执行；Stage 1 没有完成前不会进入 Stage 2。
- 同一 Stage 内的 Steps 可能并行；只有全部结束后才进入下一 Stage。
- 当前 Stage 失败会跳过后续 Stage。
- 多个世界位于同一磁盘且没有明确并行需求时，优先为每个世界设计顺序 Stage，减少首次部署的磁盘竞争。

## Job 不包含时间调度

不要把 GUI 的 `Once / Interval / Scheduled` 自动化模型复制到 CLI Job。CLI Job 只包含要执行的 Config、World、Backup 或 Process Step；时间属于系统调度器：

```text
systemd timer
        │
        ▼
minebackup-cli job run
        │
        ▼
       Job
```

Windows Task Scheduler 也调用同一个 `job run` 命令。Job 本身不会保存 cron，也不会因为写入时间字段而自动定时。

## 查看和运行 Job

```bash
minebackup-cli --data-dir "$PROFILE" --json job list
minebackup-cli --data-dir "$PROFILE" --json job show --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
```

第一次运行前先单独执行各个 Config/World 的 Backup、History 和 Verify；然后再运行 Job。`job run` 返回结构化的 Job/Stage/Step 结果，保留原始 JSON 和退出码用于排查。

## Manifest 中的 Job 形状

一个最小 Backup Step 类似这样：

```json
{
  "jobId": "22222222-2222-4222-8222-222222222222",
  "name": "Backup all worlds",
  "stages": [
    {
      "stageId": "33333333-3333-4333-8333-333333333333",
      "name": "Backup",
      "steps": [
        {
          "stepId": "44444444-4444-4444-8444-444444444444",
          "name": "Backup primary world",
          "type": "backup",
          "target": {
            "configId": "11111111-1111-4111-8111-111111111111",
            "worldPath": "world"
          }
        }
      ]
    }
  ]
}
```

示例 UUID 只用于说明结构；新对象应使用互不重复的规范 UUID v4。不要把时间 schedule、旧 GUI Task、Special Config 或旧 Service Mode 字段放入 Job。

## 安全的部署顺序

1. 用 `profile init` 生成或编辑 Manifest。
2. 运行 `profile validate`、`profile diff` 和 `profile apply --dry-run`。
3. 应用 Manifest，再运行 `doctor`。
4. 用 `config list`、`world list` 确认目标。
5. 单独完成一次 Backup → History → Verify → Restore dry-run。
6. 运行 `job list`/`job show` 检查 Job 结构。
7. 手动执行一次 `job run --job <JobId>`，确认退出码和结果。
8. 最后才配置 systemd timer 或 Task Scheduler。

不要为首次 Job 运行添加 `--prune`，也不要把真实 restore 作为默认 Step。Backup Job 成功后仍应检查 History 和 Verify。

## 失败、取消和部分成功

Job 可能出现全部成功、全部失败、取消或部分成功。部分成功意味着某些 Stage/Step 已完成、另一些失败；不要把它当成整个 Job 可恢复的证明。

收到错误时：

- 保留 Job envelope、退出码和 `diagnostics`；
- 先定位失败的 Stage/Step，再检查对应 Config、World 和 archive；
- Ctrl+C、SIGTERM 或 Ctrl+Break 会请求已启动操作和进程树取消；
- 不要用删除 History 或归档的方式“清理”失败。

Job 结构正确但运行时仍可能因为世界不存在、权限、7-Zip、Profile 占用或云后处理失败而报错；`doctor` 和[CLI 故障排查](/docs/guides/minebackup-v1/cli/troubleshooting)是下一步。
