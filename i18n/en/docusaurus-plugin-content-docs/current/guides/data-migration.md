---
sidebar_position: 8
title: "Migrating configuration, history and payloads"
description: "FolderRewind 1.9 migrating configuration, history and payloads: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Migrating configuration, history and payloads

Transfer config.json, immutable history facts and physical backup bytes separately. Exporting one does not preserve the others; Workspace/Replica Catalog and DPAPI credentials also have device boundaries.

## Configuration

Settings data migration supports local JSON or validated cloud connections. Back up before replacement and review paths. Config import does not migrate local encryption password material. Use Recovery Center for corruption rather than deleting files.

## History transfer

`.frhistory` ZIP contains manifest/repository.json/packs with IncludesPayloads=false. Current export uses the last selected history config, falling back to the first config. Open the desired config in history before export and verify manifest ConfigId.

Import unions/deduplicates immutable facts, without the old history.json replace-list semantics. Invalid format/hash/identity is rejected. Without a matching runtime config an orphan repository may be imported, not a full source configuration. Repeated Pack import is idempotent.

## Bytes and device paths

Copy archives or prepare trusted cloud replicas/full dependency closure independently. History import does not automatically turn old absolute paths into valid new-device realizations. Confirm bindings/locators; if necessary recover into a new directory and create a new config.

## Order and acceptance

Exit old clients→back up data/archives→install matching channel/version→import config→per-config facts→prepare payloads/dependencies→check sources/plugins/encryption/runtime→test restores/loading→automation.

Cloud union does not transfer Workspace or pick device-time winners. Use pre-upgrade copies for rollback;1.8 must not rewrite1.9 packs.

## Taking over 1.8.2 history

After upgrading, open the legacy takeover report in History and check source assignment, archive locations and verification. Migrated versions may still have unknown deletion boundaries: recover to a new directory or use non-deleting Overwrite. A new Full backup establishes a known boundary for advanced history. See the [report workflow](/docs/getting-started/v1-9-upgrade#193-legacy-takeover-report). Old cloud settings are not carried forward automatically; retain remote archives and Smart dependencies before configuring a new connection.

<span id="entry" />
<span id="config-migration" />
<span id="export-config" />
<span id="import-config" />
<span id="history-migration" />
<span id="export-history" />
<span id="import-history" />
<span id="recommended-order-on-a-new-pc" />
<span id="notes" />
<span id="related-links" />
