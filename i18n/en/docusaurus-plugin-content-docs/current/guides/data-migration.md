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

Stop automatic tasks on the old client and keep a complete data copy. Export through Data migration in Settings, using local JSON or a verified cloud connection.

Configuration import replaces current settings, so preserve the destination device's original configuration first. Check sources, archive locations, plugins and passwords. Importing `config.json` does not make old paths valid or migrate local password storage.

## Export and import history

Open the intended project in history before exporting `.frhistory`, then check `ConfigId` in its manifest. With no selected project, export uses the first configuration; choose explicitly beforehand.

The transfer contains a manifest, `repository.json` and `packs`, with `IncludesPayloads=false`. Native-history import unions immutable facts and deduplicates packs. Reimporting the same pack does not add it twice. Without a matching project it may create an orphan repository, not a complete source configuration.

The UI may still show legacy “merge or replace” wording. Native history uses merge and deduplication, not the old list-replacement behavior of `history.json`.

## Move archives and verify

Copy archives and incremental dependencies separately, or prepare trusted cloud replicas. Old absolute paths do not automatically become valid locations on the new device. Check bindings and available archives; recover to a new directory first if necessary.

After import, restore a test copy and check files and application loading before enabling automation. Cloud history synchronization does not move the local workspace or overwrite another device's history by timestamp.

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
