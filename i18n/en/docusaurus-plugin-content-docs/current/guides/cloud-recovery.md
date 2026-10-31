---
sidebar_position: 5
title: "Recover from the cloud to a new folder"
description: "Connect to cloud storage, find a backup project, download and verify a version and its dependencies, and restore files to a new local folder."
reviewed_baseline: "1.10-api3.17"
---

# Recover from the cloud to a new folder

When moving to another PC or recovering lost local archives, open the cloud recovery option in the New backup project menu on Home. Choose a connection and directory, then select the project and version to recover.

![Choose a connection method in the cloud recovery wizard.](/img/docs/v1-10-0/cloud-recovery-110-en-light-1604.webp)

## 1. Prepare a connection

Prepare rclone and select the configuration file, remote and directory containing your FolderRewind cloud backups. You can reuse WebDAV, OneDrive, S3 or OpenList connections. See [cloud storage](/docs/guides/cloud-archive) for connection setup.

This recovery workflow reads cloud data. Its temporary connection is used for the current check and recovery; the original project's account, directory and cloud settings stay in place.

## 2. Find a project and version

Find cloud backup projects, select a project, then read its history. The list uses project and source identities from cloud Native History. Expand the details to check IDs when names are similar.

Select a version and review its recovery status, required data and diagnostics. Smart and plugin incremental representations require their complete dependencies. Enable the corresponding materializer for a plugin format. Encrypted backups require the original password.

## 3. Choose a new local folder

Choose a new destination, check free disk space and review the version, cloud directory and local path in the confirmation. A location separate from your existing sources makes the recovered files easy to inspect.

The app downloads the required backup data, verifies sizes, hashes and dependencies, then materializes the files into the new folder. Once the task finishes, inspect the files. A recovered Minecraft world can be loaded in a test instance.

## Use the recovered files

Recovery to a new folder leaves the original source and active branch in place. To start backing up the recovered folder, check its contents and create a project. To continue an existing project, follow [data migration](/docs/guides/data-migration) to import configuration and history and confirm local paths.

After changing an existing project's account or remote directory, you can also reconnect its original repository and retrieve history using the project's original ID.

## Resolve connection and data issues

| Message or symptom | Next step |
| --- | --- |
| No project found | Check the remote and root directory; select the backup location containing `_folderrewind` data |
| Authorization required | Complete authorization in connection settings, then read the directory again |
| Missing archive or dependency | Check the original device's upload results and upload the full dependency set |
| Plugin format unavailable | Enable the matching plugin and check the version again |
| Download or verification failed | Read the task log, check the remote replica and retry |

After canceling, wait for the current task to finish before starting another recovery. The original cloud backups remain available for retrying.
