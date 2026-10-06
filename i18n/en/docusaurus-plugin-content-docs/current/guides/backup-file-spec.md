---
sidebar_position: 3
title: "Backup payloads and native history storage"
description: "Understand archives, history packs and local indexes so you can preserve dependencies and migrate restorable data."
reviewed_baseline: "1.9-api3.9"
---

# Backup payloads and native history storage

Understand archives, history packs and local indexes so you can preserve dependencies and migrate restorable data.

The1.9 immutable per-config History Repository is logical authority. Archives are physical payloads; filenames no longer fully encode identity, ancestry or restorability.

## Local repository

```text
<app-data>/history/<encoded ConfigId>/
├─ repository.json
├─ packs/<first-two>/<PackId>.frpack
├─ index/
├─ local-state/
├─ transactions/
└─ quarantine/
```

GUID ConfigIds use normalized separator-free encoding; other IDs use stable hashes. packs hold shared facts; index is disposable projection; local-state holds device Workspace/Replica Catalog and is not shared history.

Representation/Replica locators identify payloads in config destinations/controlled storage; migrated archives may retain old locations. Folder labels, renaming archives and old `[Full/Smart/Overwrite]` regexes do not establish native identity.

## Model

Backup Run describes one invocation/results; Source Version is logical source state; Checkpoint is a config-wide state vector. Representation defines materialization and Replica a physical copy. Commit Packs publish shared facts atomically. Annotation updates comments/Pins/presentation without rewriting facts.

## Maintenance and transfer

Index rebuild reads packs and cannot recreate lost bytes. Archive filenames cannot reconstruct missing branch facts. Old1.8 history is read only during migration; metadata.json is not native authority.

Transfer config, facts and payloads separately. `.frhistory` contains packs without backup bytes; see [migration](/docs/guides/data-migration). Never edit packs or empty transactions manually.

## Protection

Pins, branch tips, Workspace and safety points protect materialization dependencies. Comments or presentation hiding are not equivalent retention guarantees. Logical versions can exist while bytes are missing; assess recovery before cleanup.

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
