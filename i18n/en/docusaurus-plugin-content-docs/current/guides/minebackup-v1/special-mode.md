---
sidebar_position: 9
title: "Special Config Mode"
description: Auto-execute tasks, command chains and unattended workflows
---

# Special Config Mode

Special Config is designed for automated batch scenarios -- "open, execute tasks, then auto-exit."

If you are running unattended backups, this is one of the most important capabilities in MineBackup.

## Key Capabilities

- `autoExecute`: Auto-run tasks on startup
- Command list (legacy compatibility)
- Auto-backup tasks (legacy compatibility)
- Unified task system (new)
- `exitAfterExecution`: Auto-exit after completion

## Typical Use Cases

- Automatically back up and exit at a fixed time every day
- Run commands first, then back up after startup
- Batch back up multiple worlds in sequence

## When to Use

- Overnight batch backups
- Headless execution after boot
- Serial tasks across multiple profiles

## Configuration Tips

- First run through the flow manually in the GUI
- Then switch to auto-execute
- Keep logs and enable exception alerts for critical tasks

## Recommended Setup Steps

1. Create a new Special Config
2. Add a single minimal Backup task
3. Run it manually to verify
4. Enable `autoExecute`
5. Enable `exitAfterExecution` if needed

## Common Pitfalls

- Stacking many parallel tasks from the start
- Going straight to automatic execution without manual verification
- No log persistence, making failures impossible to diagnose

Start with minimal viable automation, then gradually add complexity.
