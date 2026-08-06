---
sidebar_position: 10
title: Automation Tasks
description: Game-session triggers, interval and scheduled runs, and the unified task system in MineBackup 1.16.1
---

# Automation Tasks

Automation is for repeating a workflow that has already been verified manually. Complete a backup-and-restore drill with a normal configuration before enabling long-running tasks.

## Automatic triggers in a normal configuration

A normal configuration can back up when a game session starts. MineBackup detects session transitions from world-file occupancy:

- When a world is first detected as occupied, `backupOnGameStart` can queue a backup.
- When the world session ends, the global “stop automatic backup on exit” setting can stop related automatic tasks.
- This is not “back up immediately when the application starts”; it targets a detected world session.

For the first run, select one world and observe one start, backup, and exit sequence in the log.

## Unified task system

The MineBackup 1.16 unified task model contains:

| Dimension | Options |
| --- | --- |
| Type | Backup, Command, Script |
| Execution mode | Sequential, Parallel |
| Trigger | Once, Interval, Scheduled |
| Backup target | Configuration and world index |
| Command task | Command text and working directory |

`Script` is still an unimplemented extension and is disabled in the settings UI. Command tasks use the platform command interpreter; do not assume that one command is portable between Windows, Linux, and macOS.

The unified task data model also carries advanced retry, timeout, completion-notification, and error-notification fields. Document and use only fields exposed by the current settings UI; do not assume failed tasks will retry automatically without a corresponding control or log evidence.

## Triggers

- **Once:** run once, useful for manual orchestration or post-migration verification.
- **Interval:** run on a minute-based cycle, subject to the UI’s minimum interval validation.
- **Scheduled:** run by month, day, hour, and minute; month or day `0` means every month or every day.

Schedules use local time. After time-zone, daylight-saving, or sleep changes, check the next-run log rather than inferring behavior from the saved fields alone.

## Sequential and parallel execution

- **Sequential:** waits for the previous task and is appropriate for shared disks or dependent operations.
- **Parallel:** runs alongside the neighboring task when sources, destinations, and resources are independent.

Do not let two tasks modify the same world or profile at the same time. MineBackup’s resource coordination prevents some conflicts, but parallel configurations still compete for storage, CPU, and external commands.

## Before enabling long-running automation

1. Run the same world manually and confirm its history entry.
2. Check that configuration and world indices remain valid.
3. Observe at least two or three trigger periods.
4. Confirm that failures are visible in logs and do not repeat destructive work without a clear reason.
5. Set sensible archive retention and Smart-chain limits.

If a task does not run, check enabled state, schedule fields, target indices, and logs before adding more parallel tasks.

Read [Special Config](./special-mode) for startup execution and unattended exit.
