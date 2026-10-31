---
sidebar_position: 3
title: "Automatic backup tasks"
description: "Run backups by interval, schedule, startup or file unlock, choose sources and review background results alongside retention and cloud uploads."
reviewed_baseline: "1.10-api3.17"
---

# Automatic backup tasks

Once you are comfortable with manual backup and restore, let FolderRewind save regularly while the app is running. Open Automation in project settings and choose a trigger and sources.

![Choose a trigger and backup targets in automation settings.](/img/docs/v1-9-6/automation-en-light-1604.webp)

## Choose a trigger

| Trigger | Use case | Settings |
| --- | --- | --- |
| Interval | Keep saving while you work | Interval in minutes and selected sources |
| Schedule | Save at fixed times | Month, day, hour and minute; 0 for month or day means every month or day |
| Startup | Save once when opening the app | Project switch and source state after startup |
| File unlock | Back up after a program releases a file | A source-relative path and an observed locked-to-unlocked transition |

File unlock responds to a change from occupied to released. For Minecraft, try `session.lock`: run the game, exit and observe the trigger.

## Save and observe a run

Check the source selection and save. Use Tasks to review the trigger time and result, or select the [notification center](/docs/guides/notifications) for a summary.

Successful automatic backups and no-change results stay quiet. Important warnings and errors follow your notification settings. Skip when unchanged avoids repeated archives. A configured threshold can stop a task after consecutive unchanged runs; changes reset the counter.

## Add retention and cloud uploads

Choose a per-source retention count in resource settings and protect important versions separately. See [backup modes and retention](/docs/guides/backup-modes).

After testing cloud connections and recovery, enable uploads after backups. Local capture, archive upload and history sync have their own results. Keep the local version and retry the affected cloud stage if a transfer fails.

## Pause, cancel and troubleshoot

Turn off automation or stop a task to prevent later triggers. Cancel running backups from Tasks and wait for cleanup before another operation on the same project. The initial backup started by the creation wizard is also available in global Tasks.

If a trigger is missed, check that the app is running, automation is enabled, the right sources are selected and the schedule matches. Plugin sources such as Minecraft also require the plugin and consistency conditions. Open task diagnostics for the chosen source and waiting conditions.

<span id="automation-modes" />
<span id="before-you-begin" />
<span id="condition-based-backup-mode-v170" />
<span id="general-documents" />
<span id="interval-backup" />
<span id="minecraft-saves" />
<span id="on-startup-backup" />
<span id="recommended-combinations" />
<span id="related-links" />
<span id="retention-policy-important" />
<span id="scheduled-backup" />
<span id="selected-auto-backup-targets-v170" />
<span id="stop-after-repeated-no-change-runs" />
<span id="suggested-presets" />
<span id="troubleshooting" />
<span id="where-to-configure" />

<span id="save-and-observe-one-run" />
<span id="cloud-upload-and-cancellation" />
<span id="if-a-task-does-not-run" />
