---
sidebar_position: 4
title: "Cloud storage: connect, upload and sync"
description: "Connect WebDAV, OneDrive, S3 or OpenList storage, verify directory access, upload backup versions and synchronize history for recovery elsewhere."
reviewed_baseline: "1.10-api3.17"
---

# Cloud storage: connect, upload and sync

Keep a cloud copy alongside your local backups. Complete a local backup, connect storage, upload one version and try [recovering to a new folder](/docs/guides/cloud-recovery).

## 1. Prepare rclone and a connection

Open Connect cloud storage / Complete cloud copy from a project's cloud settings, or open cloud connection management in Settings. Prepare the rclone executable, configuration file and working directory, then choose a service:

| Service | What to prepare |
| --- | --- |
| WebDAV | Service URL, username, password and destination directory |
| OneDrive | Complete account authorization in the wizard and choose a directory |
| S3 | Endpoint, region, bucket and access credentials |
| Existing rclone remote | Select a configuration file, read its remotes and choose one |
| OpenList | Mount your storage in OpenList, then connect through WebDAV |

A cloud connection can be shared across projects or limited to one project. Updating shared credentials affects projects using that credential store; review the associated projects before reauthorizing.

## 2. Select and verify a directory

Browse or enter a cloud directory after selecting the remote. Read the directory first, then enable write verification when preparing to upload. The app uploads a dedicated test object of about 8 KiB, reads it back for verification and cleans up that object.

Confirm the account, directory and access result, save the connection, then select a local version to upload. Saving a connection and making the first upload are separate steps so you can check each one.

## 3. Upload one version

Select an existing recoverable version and confirm the upload. The app uploads its archive and required dependencies and synchronizes the corresponding history. Review the task result, then test recovery into another folder.

History identifies the state to recover; archives and their complete dependencies provide the files. Use the [notification center](/docs/guides/notifications) to check local backup, upload and history sync results individually.

## Use OpenList

For an existing local, NAS or remote OpenList service, configure storage on its management page and use its WebDAV address. Select the actual mounted directory, such as the cloud drive's subdirectory within OpenList.

To let FolderRewind start a local instance, specify the OpenList executable, data directory and service address in the runtime environment settings and authorize startup when cloud work needs it. Check the port and instance paths. The management page handles login and storage mounts; FolderRewind accesses the files over WebDAV.

A started local service continues running. Use Stop this instance in Settings when you want to end it.

## Automatic uploads and recovery

After testing upload and recovery, enable automatic uploads after backups. Successful automatic runs and no-change results stay quiet and remain available in the notification center.

For lost local archives or another PC, use [cloud recovery](/docs/guides/cloud-recovery). You can also prepare cloud copies for a selected version in history. If a transfer fails, read the stage and diagnostics before retrying.

## Cloud directory layout

```text
<RemoteBasePath>/_folderrewind/history/<encoded ConfigId>/
├─ repository.json
└─ packs/<first two characters>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

History sync combines immutable packs from multiple devices. Each device keeps its own active branch and workspace. Choose a version or branch in history when you want to adopt another device's state.

For service-specific parameters, see [rclone](https://rclone.org/docs/) and [OpenList](https://doc.oplist.org.cn/).

<span id="1-core-model" />
<span id="2-remote-data-layout" />
<span id="3-rclone-initial-setup-onedrive-example" />
<span id="4-global-settings-prerequisites" />
<span id="5-config-settings---cloud-tab-actual-ui-behavior" />
<span id="6-config-level-sync-dialog-details" />
<span id="7-history-page-cloud-integration" />
<span id="8-best-practices" />
<span id="9-troubleshooting" />
<span id="advanced-upload-section-visible-when-auto-upload-enabled" />
<span id="analysis-importable-count-is-zero" />
<span id="analysis-stage" />
<span id="argument-template-and-variables" />
<span id="auto-upload-switch" />
<span id="button-enable-rules" />
<span id="cloud-sync-section-manual" />
<span id="download-and-install" />
<span id="environment-section" />
<span id="history-cloud-buttons-disabled" />
<span id="metadata-partial-warning" />
<span id="openlist-and-webdav-bridge-references" />
<span id="related-links" />
<span id="restore-from-cloud-only-entry" />
<span id="run-rclone-config" />
<span id="status-and-visual-cues" />
<span id="sync-history-snapshot-after-upload" />
<span id="sync-scopes" />
<span id="templates" />
<span id="timeoutretrylast-run-status" />
<span id="what-uploaddownload-actually-does" />

<span id="cloud-archives-connections-and-recovery" />
<span id="1-prepare-the-tools" />
<span id="2-configure-a-connection" />
<span id="3-upload-and-recover" />
<span id="history-and-archive-files" />
<span id="automation-and-troubleshooting" />
