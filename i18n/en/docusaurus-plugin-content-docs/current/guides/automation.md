---
sidebar_position: 3
title: Automation
description: Configure scheduled, interval, and on-startup automatic backups
---

# Automation

FolderRewind supports three automation modes — set it once, and it runs forever.

## Before you begin

- At least one folder has been added to this config.
- A writable backup target path is configured.
- You have run at least one manual backup successfully.

## Where to configure

1. Open the target config from the home page.
2. Click **Config Settings**.
3. Open the **Automation** tab.
4. Enable **Auto Backup**.

## Automation modes

### Interval backup

Runs backup at a fixed minute interval.

- **Setting:** `Run interval (minutes)`
- **Range:** `1 ~ 10080` minutes
- **Recommendation:** Start with `30` or `60` minutes

### Scheduled backup

When **Scheduled Mode** is enabled, you can add multiple schedule entries.

Each entry can set:

- Month (or "Every month")
- Day (or "Every day")
- Hour and minute

Examples:

- Every day at `02:00`
- Every month on day `1` at `03:30`
- Day `1` and day `15` as separate entries

### On-startup backup

Enable "Run on app startup" to trigger one backup when the app starts.

- **Use case:** Create a snapshot when you open the app for the first time each day
- **Recommendation:** Use together with interval mode

## Stop after repeated no-change runs

You can enable **Stop auto tasks after repeated no-change detections**:

1. Enable the option.
2. Set threshold `N`.

Behavior:

- Auto backup is turned off automatically when no-change is detected `N` times in a row.
- The counter resets after a change is detected.

## Recommended combinations

- On-startup + every 30 minutes
- On-startup + daily scheduled backup at 22:00
- Interval + stop after repeated no-change

## Suggested presets

### General documents

- Interval: `60` minutes
- On-startup backup: Enabled
- Stop after no-change: Enabled, threshold `5`

### Minecraft saves

- Interval: `15~30` minutes
- On-startup backup: Enabled
- Optional nightly schedule (for example `03:00`)

## Retention policy (important)

Automation creates many backups. Configure retention in backup policy:

- Set **Keep latest backup count**.
- If using smart incremental mode, also set a **max chain length**.

## Troubleshooting

- Task not triggered: check whether auto backup is still enabled for this config.
- Scheduled mode seems invalid: verify hour/minute values in each schedule entry.
- Auto tasks stopped unexpectedly: likely caused by repeated no-change stop; re-enable auto backup manually.

## Related links

- [Backup Modes](./backup-modes)
- [Minecraft Guide](./minecraft/overview)
