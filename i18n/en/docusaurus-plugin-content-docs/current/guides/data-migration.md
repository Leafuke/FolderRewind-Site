---
sidebar_position: 8
title: "Upgrade and migrate configuration and history"
description: "Prepare configuration, history, archives and passwords when upgrading or moving PCs, confirm project paths and finish legacy backup adoption and recovery tests."
reviewed_baseline: "1.10-api3.17"
---

# Upgrade and migrate configuration and history

When upgrading, moving PCs or switching installation channels, keep the original data and migrate configuration, history and archives separately. After a test restore, you can resume everyday backups.

## Prepare your files

| Material | How to prepare it | Purpose |
| --- | --- | --- |
| Configuration | Export JSON in Data migration or use a verified cloud connection | Bring projects, sources and backup policies |
| History | Export `.frhistory` for all or selected projects | Bring versions, branches and history |
| Archives | Copy backup storage and complete incremental dependencies, or prepare cloud copies | Supply recoverable file content |
| Passwords and plugins | Keep encryption passwords separately and prepare required plugins | Decrypt and read backup formats in the new environment |

Stop automatic tasks in the original client and keep copies of its full app data and archive directories. See [installation](/docs/getting-started/installation#data-directories-and-channels) for channel-specific paths.

## Import configuration and restart

Open Data migration on the destination device, select the configuration file and preview projects, sources and backup paths. Choose Local recovery or Cross-device migration. Local recovery can retain matching valid branches and baselines; cross-device migration checks the new local environment.

Confirmation prepares a pending configuration. Choose Restart and apply configuration to switch, or cancel the import before restarting. The app waits for active tasks and saves the original configuration before switching.

The original automation and cloud switches are retained while migration checks restore permission to run each function. To recover switches turned off by an older build, use Read original switches from configuration with the original exported JSON.

## Import history

Import `.frhistory` and check project IDs, sources, versions and branches. Multi-project files are processed per project and existing packs are deduplicated. Each project reports history commit, association and local initialization results. Retry incomplete projects from the report.

History packages carry history records; prepare archives from the material checklist separately. If no project with the original ID exists, import its configuration and check the association.

## Complete local setup

The app checks imported projects in a batch. Review paths, plugins, passwords and cloud connections in Data migration, then choose Check and resume ready projects. Local backup and cloud functions are assessed separately, so ready projects can resume first.

If several projects moved from `D:\Games` to `E:\Games`, use batch path relocation and review the selected projects before saving. Adjust other sources and destinations individually. Sources must be accessible and backup storage writable, with separate source and destination locations.

The first backup on a new device establishes an independent Full baseline and new branch. Use Checkout from history to continue an original branch. Local recovery reuses matching valid local state and cloud bindings; cross-device migration needs a new cloud binding.

## Prepare archives and test recovery

Review archive verification status in the migration report. Copied archives still need valid replica locations and complete dependencies. Prepare cloud data with the [cloud recovery guide](/docs/guides/cloud-recovery).

Restore a version into a test folder, check file contents and game loading, then enable automation. Keep original-device copies until these checks finish. Local password material uses Windows user-scoped DPAPI; prepare the encryption password using the [encryption guide](/docs/guides/encryption).

<span id="193-legacy-history-adoption-report" />

## Adopt legacy backups {/* #legacy-upgrade */}

When upgrading from 1.8 with older archives, open the legacy backup adoption report in history:

1. Check source assignments and assign unallocated records.
2. Locate archives and include Smart metadata and incremental dependencies.
3. Save and verify, then resolve missing-file or identity diagnostics.
4. Restore into a test folder and create a new Full backup as the current branch baseline.

Versions with unrecorded deletion coverage receive a restricted recovery status, supporting Overwrite or recovery to a new directory. Once a new complete baseline is ready, continue with Clean, branch switching and merging.

Migration keeps old v2 plugin code in quarantine; use compatible v3 plugins for those features. Prepare cloud connections again and retain the original remote data and incremental dependencies.

## Roll back or finish recovery

To roll back, exit the current app and use the independently saved pre-upgrade configuration, history and archives. If startup or migration is interrupted, keep the logs, open the recovery center and follow its diagnostics.

<span id="config-migration" />
<span id="entry" />
<span id="export-config" />
<span id="export-history" />
<span id="history-migration" />
<span id="import-config" />

<span id="notes" />
<span id="recommended-order-on-a-new-pc" />
<span id="related-links" />

<span id="move-configuration-history-and-archives" />
<span id="prepare-three-kinds-of-data" />
<span id="export-and-import-configuration" />
<span id="export-and-import-history" />

<span id="move-archives-and-verify" />
<span id="upgrading-from-18-or-rolling-back" />
