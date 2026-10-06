---
sidebar_position: 4
title: "Cloud archives: connections and recovery"
description: "Prepare rclone and OpenList with FolderRewind cloud setup, connect storage, upload archives, sync history and verify recovery to a new directory."
reviewed_baseline: "1.9-api3.9"
---

# Cloud archives: connections and recovery

A cloud copy gives backups another storage location. Verify local backup and restore first, then connect a service, upload one version and test downloading it for recovery.

![The cloud form uses an example address and a blank password; no connection has been verified or saved.](/img/docs/v1-9-6/cloud-en-light-1604.webp)

*The cloud form uses an example address and a blank password; no connection has been verified or saved. Interface version: 1.9.6.*

## 1. Prepare the tools

Open cloud setup from the project's follow-up actions. Version 1.9.6 reuses verified rclone and OpenList installations where possible. Downloads are checked with SHA-256 and try subsequent sources after a failure. Review dependency status and each failed step.

Tool installation, account authorization and connection testing are separate steps. An installed OpenList does not mean a cloud account is signed in; configure its storage afterward.

## 2. Configure a connection

Choose WebDAV, OneDrive, S3 or an OpenList bridge. Set the rclone executable, working directory, configuration file, remote name and `RemoteBasePath` explicitly.

Authorize OneDrive using option names in `rclone config`. For WebDAV, enter the server, path and account. Configure OpenList storage before using its WebDAV. Menu numbers vary by version. Credentials in configuration files should not appear in shared screenshots or complete logs.

Test the connection and confirm both browsing and upload permissions. Listing a directory does not prove write access.

## 3. Upload and recover

Upload a verified backup. Check archive transfer and history synchronization separately. Before recovery, select a version, prepare it and all dependencies, verify sizes and hashes, then restore to a new test directory.

Read-only cloud recovery does not write remote history, retire replicas or change the current source and workspace. Check the formats supported by the entrypoint; plugin archives also require a compatible materializer.

## History and archive files

History synchronization unions immutable packs instead of overwriting a shared `history.json`. Work on two devices may create diverging branches that need review. Synchronization alone does not switch the local workspace. A listed record may still lack downloaded archive bytes.

```text
<RemoteBasePath>/_folderrewind/history/<encoded ConfigId>/
├─ repository.json
└─ packs/<first two characters>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

Saved object keys determine replica locations. Local indexes and workspace state are not shared history facts. Legacy archives may retain their previous remote locations.

## Automation and troubleshooting

Test upload, download and recovery to a new directory before enabling upload after backup. Distinguish local backup success, transfer failure, history-sync failure, divergence and missing dependencies. After cancellation, check which phase completed before retrying.

Old cloud configuration does not automatically migrate into 1.9. Keep the original remote data and Smart dependencies, then reconnect. See the [rclone](https://rclone.org/docs/) and [OpenList](https://doc.oplist.org.cn/) documentation for connection parameters.

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
