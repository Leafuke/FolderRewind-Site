---
sidebar_position: 20
title: "Upgrading to 1.9, migration and recovery"
description: "Upgrade from FolderRewind 1.8 to 1.9.6, preserve configuration and archives, review legacy Smart verification and test recovery before resuming automation."
reviewed_baseline: "1.9-api3.9"
---

# Upgrading to 1.9, migration and recovery

An upgrade from 1.8 migrates configuration, legacy backup history and plugin data. Version 1.9.6 improves Smart metadata handling, retained verification results and Quick Restore.

## Before upgrading

Exit the app and automatic tasks. Back up the entire app-data and archive directories, and record the installation channel, source paths, plugin versions and encryption passwords. `config.json` alone does not include archives or transfer Windows DPAPI password material across devices.

Keep the original copies and [install the appropriate version](/docs/getting-started/installation). Store and Setup use different data directories; follow [migration](/docs/guides/data-migration) when changing channels.

## Check configuration and plugins

Review projects, source ranges and destinations after upgrading. Legacy v2 plugin code is quarantined rather than loaded. Bundled MineRewind can migrate its own data; other plugins need compatible v3 releases. Check actual runtime status before enabling related tasks.

Migration interprets legacy Smart and Overwrite values. New Rolling backups create immutable archives without replacing old ones. Do not edit enum values or remove quarantine directories manually.

## Review the legacy takeover report {/* #193-legacy-takeover-report */}

Select the affected project in history and open the report from the migration notice or More actions:

1. Check each record's source. Assign unassigned records to the correct source.
2. Locate retained archives. Smart backups also need their complete dependencies and metadata.
3. Save changes and verify. Resolve missing dependencies, damaged files or identity issues using the diagnostics.
4. Restore to a test directory and check additions, changes and deletions.

`RestrictedReady` means verified with limited recovery: unknown deletion boundaries permit only overlay restore or recovery to a new directory. File/directory type conflicts still block. Create a new Full backup before Clean, Checkout or Merge.

Version 1.9.6 retains valid verification results, requesting verification again when archives or metadata change. Source or archive-location changes refresh the report and history. Dismissing the notice records a local preference, not completed migration.

## Resume regular tasks after verification

Test Full, Smart or Rolling backups and a restore before enabling automation. A source without an active branch can use its most recent recoverable legacy backup through Quick Restore; an existing branch continues to determine its target.

Old cloud configuration and archives are not automatically moved into native history. Keep remote data, create a new connection and prepare legacy Smart dependencies.

## Rolling back

Exit the new version and use independent pre-upgrade copies of configuration, history and archives. Do not let a 1.8 client write to a 1.9 repository. Keep diagnostics and use Recovery Center for startup or migration failures rather than deleting data files and retrying.
