---
sidebar_position: 8
title: "Automation Tasks"
description: Interval / scheduled execution and task system practices
---

# Automation Tasks

MineBackup supports regular automatic backups and a unified task system (task type + execution mode + trigger mode).

The goal of automation is stable repetition, not piling on more tasks. Make sure a single task runs reliably before combining them.

## Trigger Modes

- **Once**: Run once
- **Interval**: Fixed interval
- **Scheduled**: Specific time

Selection tips:

- Fixed daily frequency: Interval
- A specific time window (e.g., overnight): Scheduled
- Manual ad-hoc execution: Once

## Task Types

- **Backup**: Perform a world backup
- **Command**: Run a command
- **Script**: Reserved for future extension

Backup and Command can be combined into a "before/after backup processing" chain.

## Execution Modes

- **Sequential**: Run tasks one after another
- **Parallel**: Run tasks simultaneously

Parallel execution improves throughput but increases disk and CPU contention. Only use it when resources are plentiful and directories are independent.

## Practical Tips

1. Start with a single task to verify stability
2. Then combine parallel tasks, avoiding simultaneous disk contention
3. Enable failure alerts and retries for critical tasks

## Recommended Task Templates

### Template A: Conservative (Recommended for Beginners)

1. Backup (Sequential)
2. Command (Sequential, for cleanup or notification)

### Template B: High-Frequency (Advanced)

1. Backup (Scheduled)
2. Command (Parallel, lightweight logging task)

## Pre-Launch Checklist

Before enabling long-term automation, observe 2-3 consecutive cycles:

- Did it trigger on time?
- Were there any sporadic failures?
- Did failures trigger automatic retries or timely alerts?

Once verified, roll out to additional profiles.

If you want a "launch on startup + auto-exit" unattended workflow, continue to [Special Config Mode](./special-mode).
