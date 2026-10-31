---
sidebar_position: 2
title: "Your first backup"
description: "Add a test folder, create a backup project with separate storage, save the first complete version and check its history and task results."
reviewed_baseline: "1.10-api3.17"
---

# Your first backup

Start with a few test files. Once the first backup finishes, you will have a complete version you can recover from history.

## 1. Prepare a folder and backup storage

Create a test folder such as `D:\Demo\Documents` and add a few documents. Choose a separate location such as `D:\Demo\Backups` for backups, with space for archives and temporary files.

## 2. Create a project

Open New backup project, enter a name, choose an ordinary folder project and add the source and backup location. For Minecraft, start with [save discovery](/docs/guides/minecraft/quick-start).

![Review the project name, sources and backup destination before creating it.](/img/docs/v1-9-6/creation-review-en-light-1604.webp)

You can also create a project using a template or game discovery. Check the actual directories and included scope, then confirm the summary. One project can contain several sources, each with its own versions.

## 3. Save the first version

Choose **Full** in backup policy, check filtering, compression and encryption, then save. For the first exercise, use the complete source scope.

Start a backup with a comment such as Initial version. Wait for completion and check each source's result in Tasks or the [notification center](/docs/guides/notifications).

## 4. Find the version and try restoring

Open history, select the project and source, and find Initial version. Check its date, scope and recovery status. Then edit one file, add another and follow [your first restore](/docs/getting-started/first-restore) to recover the original content.

If the task fails, open its logs and check the source path, backup destination, compression tool and password. After the exercise, choose an [everyday backup mode](/docs/guides/backup-modes) and set up [automation](/docs/guides/automation) or [cloud copies](/docs/guides/cloud-archive).

<span id="1-create-a-new-config" />
<span id="2-add-folders-to-back-up" />
<span id="3-run-the-backup" />
<span id="before-you-start" />
<span id="next-step" />
<span id="option-a-view-history-records" />
<span id="option-b-run-automatic-core-validation" />
<span id="path-a-create-a-config-manually" />
<span id="path-b-create-a-config-from-a-template" />
<span id="template-related-next-steps" />
<span id="verify-backup-results" />

<span id="1-prepare-a-folder-and-backup-location" />
<span id="2-create-a-backup-project" />

<span id="4-check-the-result" />
