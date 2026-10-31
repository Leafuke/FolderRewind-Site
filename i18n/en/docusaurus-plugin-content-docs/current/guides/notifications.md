---
sidebar_position: 10
title: "Notification center and task results"
description: "Review backup, restore and cloud results from the bell, open related tasks and logs, and choose how the app alerts you."
reviewed_baseline: "1.10-api3.17"
---

# Notification center and task results

Keep working while a backup runs in the background. When you want to check the result, select the bell in the app window.

![The notification center collects results and links to their details, tasks and logs.](/img/docs/v1-10-0/notifications-110-en-light-1604.webp)

## Review an operation

Each record identifies the operation, project and result. Select it to open details, navigate to the related location or read its operation logs. Batch backups summarize new backups, unchanged sources, warnings and failures, making it easier to find a source that needs attention.

Successful automatic backups and cloud syncs, including runs with no changes, quietly leave their results in the center. Important warnings, errors and recovery requests follow your alert settings.

## Organize records

- Switch between All and Unread. The bell badge counts unread important results and errors.
- Mark a record as read after reviewing it, or mark all records as read.
- After clearing read results, you have 10 seconds to undo the action.

The center keeps the latest 200 results from the current app session. After restarting, use log files to look up earlier operations. Your backup versions remain in [history](/docs/guides/history-timeline).

## Choose how you are alerted

Use the notification section in Settings to adjust alerts, the system notification level and completion sounds. Results appear inside the app while it is in the foreground; background system alerts follow your selected level.

Opening a task or log from a notification may filter the page to that operation. Select Show all tasks or Show all logs to return to the complete list.

## Follow up on a warning or failure

Read the details to identify the source and the completed stage. For example, when a local backup succeeds and its cloud upload fails, keep the local version and retry the upload. Recovery requests include diagnostics for completing recovery before further operations.

Continue with [automatic backups](/docs/guides/automation) or [cloud storage](/docs/guides/cloud-archive).
