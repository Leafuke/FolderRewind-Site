---
sidebar_position: 3
title: "Backup files and history storage"
description: "Understand archives, immutable history packs, local indexes and workspaces, prepare version dependencies and migrate backup data correctly."
reviewed_baseline: "1.10-api3.17"
---

# Backup files and history storage

A recoverable version combines history records with file content. History stores sources, branches and version relationships; archives or plugin Artifacts provide recoverable bytes.

## Local repository

```text
<app data>/history/<encoded ConfigId>/
├─ repository.json
├─ packs/<first two characters>/<PackId>.frpack
├─ index/
├─ local-state/
├─ transactions/
└─ quarantine/
```

`packs` contains immutable shared facts, `index` supports queries and `local-state` holds device workspaces and replica locations. Representation/Replica locators point to archives, usually in project backup storage or controlled storage.

## From a run to a version

A Backup Run records participating source outcomes. Each Source Checkpoint refers to a source version and records history continuation. A Version Representation describes materialization and dependencies; a Storage Replica describes one copy.

A Commit Pack atomically publishes related facts. Annotations update comments, Pins and presentation. Use the app's source and version entries to locate backups.

## Move and maintain data

Prepare configuration, `.frhistory` and archives separately during migration. History packages carry Packs, with archives and incremental dependencies copied separately. See [data migration](/docs/guides/data-migration).

Rebuilding the index rereads Packs. For missing files or dependencies, prepare reliable local or cloud copies and reassess recovery status. Locate and verify older backups through the adoption report.

## Retain dependencies

Protection, branch tips, workspaces and safety points participate in dependency retention. Read impact and space reports before cleanup and manage local and cloud copies through the app to keep archive state and version relationships consistent.

<span id="auto-cleanup-and-safe-delete" />
<span id="backup-storage-structure" />
<span id="default-destination-path" />
<span id="field-definition" />
<span id="filename-format" />
<span id="important-flag-and-auto-pruning" />
<span id="metadatajson-version" />
<span id="naming-notes" />
<span id="related-links" />
<span id="relationship-to-rebuild-history" />
<span id="remote-command-knotlink" />
<span id="source-code-parsing-regex" />

<span id="backup-payloads-and-native-history-storage" />

<span id="model" />
<span id="maintenance-and-transfer" />
<span id="protection" />
