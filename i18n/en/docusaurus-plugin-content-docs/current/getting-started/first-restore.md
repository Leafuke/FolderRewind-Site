---
sidebar_position: 3
title: "Your first restore"
description: "Select a historical version, check its destination, restore mode and protection options, and verify added, modified and deleted test files."
reviewed_baseline: "1.10-api3.17"
---

# Your first restore

Practice on the folder from your first backup to learn how to recover earlier content and see how current files change.

## 1. Select a historical version

Open history, select the project and source and find Initial version. Check its date, scope and recovery status, then choose Restore. For a cloud archive, prepare the version and its complete dependencies, or use [cloud recovery to a new folder](/docs/guides/cloud-recovery).

## 2. Check the destination and protection

Confirm the path and let programs using the folder finish writing. Encrypted archives require the original password. Minecraft hot restore also coordinates the game state.

![Check the restore mode and backup-before-restore option in the confirmation.](/img/docs/v1-9-6/restore-detail-en-light-710.webp)

To keep current work, check Backup before restore or create a manual backup first. See [safety snapshots](/docs/guides/safety-snapshots) for protection during branch switches and merges.

## 3. Choose a restore mode

| Mode | File changes |
| --- | --- |
| Clean | Restore the target state within the managed boundary and remove extra content there |
| Overwrite | Write the backed-up files and keep other current content |
| Partial or restricted legacy backup | Use Overwrite, keeping data outside backup coverage |

A restore whitelist preserves current paths during cleanup, while backup files win at matching paths. For current content to take priority, use [one-time preservation](/docs/guides/filters#restore-preserve-paths).

## 4. Run and inspect

Confirm and wait for the task to complete. Open the files and inspect the added, modified and deleted examples. You can load a recovered game world in a copied test instance.

Use the [notification center](/docs/guides/notifications) to review warnings and logs. When recovery is requested, follow the diagnostics before continuing work on the project.

## Quick Restore and branches

Quick Restore uses the unique tip of the active branch. A source with no active branch can select the most recent recoverable legacy backup. To return to an earlier time, select a specific version in history.

To try alternative approaches, [create, switch or merge branches](/docs/guides/history-branches). Player preservation, restore whitelists and one-time preservation belong to the ordinary Restore workflow.

<span id="before-you-start" />
<span id="next-step" />
<span id="recommended-safety-settings" />
<span id="step-1-enter-the-history-page" />
<span id="step-2-understand-the-history-timeline" />
<span id="step-3-select-a-restore-point" />
<span id="step-4-run-the-restore" />
<span id="step-5-verify-the-restore-result" />
<span id="troubleshooting" />

<span id="1-choose-a-version" />
<span id="2-review-the-destination-and-protection" />

<span id="4-run-and-verify" />
<span id="quick-restore-and-branch-operations" />
