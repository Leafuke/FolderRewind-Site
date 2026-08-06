---
sidebar_position: 11
title: Special Config
description: Special configurations, command tasks, and unattended execution rules in MineBackup 1.16.1
---

# Special Config

Special Config is designed for an unattended flow: start in a special mode, run a task set, and optionally exit. It is not merely an alias for a normal configuration; it has a stable identity and its own task queue.

## Core switches

- `autoExecute`: enter this Special Config and execute its tasks automatically.
- `runOnStartup`: use the platform login-start capability to run this Special Config; keep one deliberate startup target.
- `exitAfterExecution`: exit after one-shot work completes and no periodic background task still needs to run.
- `hideWindow`: hide the special-mode window for suitable unattended environments; failures still require log inspection.
- `backupOnGameStart`: back up configured targets when a game session is detected.

Startup selections are normalized deterministically. Duplicate `autoExecute` or `runOnStartup` selections are reduced to one valid target. External launch should use the stable `SpecialConfigId`, not a reorderable configuration index.

## Task types

### Backup

Select a normal configuration and world. Special Config can override compression level, retention, thread count, and low-priority behavior for the task. Start with a Once task, then move to Interval or Scheduled only after verification.

### Command

Run a user-provided command and working directory for cleanup, notification, or external processing before or after backup. Commands are passed through the platform interpreter: `cmd.exe` on Windows and `/bin/sh` on Linux/macOS. The command text is not promised to be portable.

### Script

This is a reserved extension. The settings UI disables it, so it is not an implemented script runner.

## Execution order

Unified tasks are organized by ID and list order:

- Sequential tasks wait for preceding work.
- Parallel tasks can run beside preceding work.
- Interval and Scheduled backups run in cancellable background threads.
- Shutdown requests stop background work and wait for cleanup.

Use Sequential for “backup, then command” and Parallel only when targets are fully independent.

## Recommended setup

1. Create a Special Config with a unique name.
2. Add one Backup / Once task for a verified world.
3. Run it manually and confirm the archive, history, and log.
4. Add Command, periodic, or scheduled work.
5. Only then enable `autoExecute`, login startup, or `exitAfterExecution`.

## Common failures

- Invalid configuration or world index: the task is skipped with a validation error.
- Command fails on another platform: check its interpreter and working directory instead of copying a Windows command unchanged.
- Early exit: inspect `exitAfterExecution` and whether a periodic task thread remains.
- Background work does not stop: inspect logs and stop through the UI/task coordinator instead of deleting temporary files.

Once Special Config is stable, combine it with [Profiles, portable mode, and migration](./data-and-migration) or [Cloud archive](./cloud-archive) carefully.
