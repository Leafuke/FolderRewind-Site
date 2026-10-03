---
sidebar_position: 4
title: "Cloud archives: connections, history and replica recovery"
description: "FolderRewind 1.9 cloud archives: connections, history and replica recovery: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Cloud archives: connections, history and replica recovery

![Read-only cloud recovery setup,1.9.2.0/API3.5 Chinese candidate; credential fields empty](/img/docs/v1-9/cloud-candidate.png)

*Read-only cloud recovery setup,1.9.2.0/API3.5 Chinese candidate; credential fields empty.*


## Connect

Choose WebDAV, OneDrive, S3 or an OpenList-bridged provider in cloud setup. Prepare rclone and explicitly select its config, remote name and RemoteBasePath. Never share credential files. Preparing OpenList does not mean cloud authorization/connection succeeded.

Use option names in rclone config rather than old menu numbers. Authorize OneDrive, enter WebDAV server/path/account, or configure OpenList storage before WebDAV bridging. Tool preparation, browser authorization and connection testing are distinct.

Global/config connection cards select executable, working directory, explicit config and remote. Test and inspect diagnostics; OpenList environment controls are in Settings. Config/history/payload permissions differ; listing directories does not prove upload access.

## Storage

```text
<RemoteBasePath>/_folderrewind/history/<encoded ConfigId>/
├─ repository.json
└─ packs/<first-two>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

Actual object locators follow Host records/transport entrypoints; migrated payloads may keep old locators. Names are not sync identities. local-state/index are not shared facts. Do not infer new layout from old ConfigName/FolderName/history.json.

## Metadata and payloads

Immutable Commit Pack set union replaces shared history.json overwrite, without last-timestamp wins. Conflicting identities, mismatched repositories and invalid packs are rejected. Union can reveal multiple branch tips requiring review/merge; it does not switch the local Workspace.

History and payload transfers differ. Visible versions do not guarantee local recoverable bytes. Replica transfer checks size/hash and lifecycle; prepare the selected Representation's entire closure before Restore/Merge.

## Recover to a new directory

Preview version/dependencies/size/restorability, download trusted closure and choose an isolated new directory. Read-only recovery never uploads history/retires cloud replicas or changes live sources/Workspace. The current recovery entrypoint supports core representations; check plugin format support separately.

## Automation and troubleshooting

Validate local backup/restore, connection, upload/download and new-directory recovery before automatic uploads. Distinguish local success, queued cloud work, transfer failures, metadata sync, divergence and missing bytes. Redact tokens/passwords and retry only after identifying the stage; never empty a cloud repository manually.

See [rclone](https://rclone.org/docs/), [OpenList](https://doc.oplist.org.cn/) and [history](/docs/guides/history-timeline).

## 1.9.3 upgrades and cancellation

Old cloud settings and archives do not automatically migrate into native history. Existing remote data remains intact; create a new connection and retain dependency archives/metadata for old Smart backups. After cancellation, inspect replica and history-stage outcomes and verify a valid closure before retrying. Local backup success and cloud transfer success are separate results.

<span id="1-core-model" />
<span id="2-remote-data-layout" />
<span id="3-rclone-initial-setup-onedrive-example" />
<span id="download-and-install" />
<span id="run-rclone-config" />
<span id="openlist-and-webdav-bridge-references" />
<span id="4-global-settings-prerequisites" />
<span id="5-config-settings---cloud-tab-actual-ui-behavior" />
<span id="environment-section" />
<span id="cloud-sync-section-manual" />
<span id="auto-upload-switch" />
<span id="advanced-upload-section-visible-when-auto-upload-enabled" />
<span id="templates" />
<span id="argument-template-and-variables" />
<span id="sync-history-snapshot-after-upload" />
<span id="timeoutretrylast-run-status" />
<span id="6-config-level-sync-dialog-details" />
<span id="analysis-stage" />
<span id="sync-scopes" />
<span id="7-history-page-cloud-integration" />
<span id="status-and-visual-cues" />
<span id="button-enable-rules" />
<span id="what-uploaddownload-actually-does" />
<span id="restore-from-cloud-only-entry" />
<span id="8-best-practices" />
<span id="9-troubleshooting" />
<span id="history-cloud-buttons-disabled" />
<span id="analysis-importable-count-is-zero" />
<span id="metadata-partial-warning" />
<span id="related-links" />
