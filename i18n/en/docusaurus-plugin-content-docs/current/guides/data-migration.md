---
sidebar_position: 8
title: "Move configuration, history and archives"
description: "Move configuration, history and archives separately when changing computers or installation channels, then verify paths and restore results."
reviewed_baseline: "1.9-api3.9"
---

# Move configuration, history and archives

When changing computers or installation channels, preserve configuration, history and archive bytes separately. Exporting one does not guarantee restoration on another device.

![Export configuration and history separately. Native-history import merges and deduplicates packs.](/img/docs/v1-9-6/migration-detail-en-light-1310.webp)

*Export configuration and history separately. Native-history import merges and deduplicates packs. Interface version: 1.9.6.*

## Prepare three kinds of data

| Data | Contains | Also needs |
| --- | --- | --- |
| Configuration export | Projects, sources and settings | New device paths, plugins and encryption passwords |
| `.frhistory` | Repository information and immutable history packs | Actual archives and all dependencies |
| Archives or trusted cloud replicas | Recoverable file contents | Matching history, source bindings and decryption material |

Local workspace state, indexes, replica locations and DPAPI password material have device boundaries. A history export does not transfer all of them.

## Export and import configuration

This workflow applies to 1.9.x builds containing the migration transaction fixes. The 1.9.6 screenshot above only locates the Settings entry.

Stop automatic tasks on the old client and keep a complete data copy. Export through Data migration in Settings, using local JSON or a verified cloud connection.

Inspect project names, project IDs, sources and backup paths before confirming import. Confirmation prepares a candidate only; the current configuration remains active. Cancel the pending import or choose Restart and apply configuration. Restart waits for active tasks and preserves the latest original configuration. The new process activates before initializing services; interrupted activation restores the previous configuration.

Imported projects retain their original project/source identities and configured automation/cloud switches. Separate migration permissions pause each capability until the batch check and confirmation. Pending cloud bindings do not block confirmed local backup, and unfinished projects do not block finished projects. Importing `config.json` does not make old paths valid or transfer local password storage. If a bound history repository has not been migrated, import its history before completing project setup.

Choose Restore on this computer or Migrate to another computer in the import preview. A matching target project defaults to local restore; otherwise cross-device migration is selected. Both modes validate actual state.

## Export and import history

Export defaults to All projects with a project count. Choose Selected projects to expand the list, select all or clear selection. Project IDs are available in details. New v2 `.frhistory` bundles support multiple projects, and the importer also reads v1 single-project bundles. Empty history is reported as zero. A missing or damaged bound repository needs attention rather than being silently omitted.

Before import, inspect the source application version, transfer format, project/source IDs, version/branch/Pack counts and same-ID project association. Bundles contain a manifest, repository descriptors and immutable Packs with `IncludesPayloads=false`. Archives, the old device workspace and SQLite indexes are excluded.

Native history imports merge and deduplicate facts without replacing lists or rewriting Pack identity. Each project commits independently. A batch may partially complete; retry safely according to its report. If a commit decision requires recovery, retain its transaction and staging directories. The application completes the union before reading the repository.

Results separately report metadata commit, project association, local initialization and added/duplicate Pack counts. An unmatched repository waits for the original configuration; import that configuration instead of assigning history to a same-name project with different IDs.

## Complete local setup

All status, progress and contextual actions belong inside Data migration. Projects are checked automatically; one Review and resume ready projects confirmation resumes selected backup/cloud capabilities. Use Relocate project paths in a batch to preview a shared root change and save selected projects together. Other corrections can use individual path setup, preview a root mapping (for example `D:\Games` → `E:\Games`), or edit source and destination paths. Sources must be accessible; the destination must be writable and must not overlap sources. Prepare required plugins and encryption passwords on the target device.

Missing workspace state initializes with Unknown baselines; a missing local replica catalog initializes empty. History import preserves valid local state. Local restore retains valid branches, baselines and replica state where identities, paths and source semantics match; only changed sources reset. Cross-device migration cannot infer current state from old-device hints. Corruption requires controlled recovery and cannot be hidden by initialization.

The first backup from Unknown state establishes a self-contained full baseline and a new branch, without inventing old-device branch state or incremental dependencies. Use Checkout to resume an old branch. Local restore reuses only matching cloud bindings already on the target; cross-device migration requires rebinding. Confirmation does not replay startup backups or upload existing archives in bulk, and switches configured off stay off.

Older builds may already have rewritten switches to off. Read original switches from configuration loads a previous export JSON and restores only automatic backup/cloud switches for matching identities, without replacing paths, rules or credentials. Execution still requires confirmation. Batch failures or cancellation retain completed project decisions; remaining projects can be retried.

## Move archives and verify

Valid local state does not mean old versions are restorable. This migration change adds no payload-availability checker; reports explicitly state that backup archives are unverified.

Copy archives and incremental dependencies independently, or prepare trusted cloud replicas. An empty replica catalog does not automatically recognize copied archives, and old absolute paths do not become new-device locations. Restore retains existing replica, dependency and safety checks. Restore a test copy and check files and application loading before enabling automation; retain old-device data until verification succeeds.

Cloud history synchronization merges facts without copying the local workspace or overwriting another device's history by timestamp.

## Upgrading from 1.8 or rolling back

Review the [legacy takeover report](/docs/getting-started/v1-9-upgrade#193-legacy-takeover-report) during upgrade. Unknown deletion boundaries permit overlay or new-directory recovery. Roll back with independent pre-upgrade copies; do not let a 1.8 client modify a 1.9 repository.

<span id="config-migration" />
<span id="entry" />
<span id="export-config" />
<span id="export-history" />
<span id="history-migration" />
<span id="import-config" />
<span id="import-history" />
<span id="notes" />
<span id="recommended-order-on-a-new-pc" />
<span id="related-links" />
