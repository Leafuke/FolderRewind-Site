---
sidebar_position: 20
title: "Upgrading to1.9, migration and recovery"
description: "FolderRewind 1.9 upgrading to1.9, migration and recovery: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Upgrading to1.9, migration and recovery

This guide covers1.8.x→1.9. Configuration, native history and Plugin System v3 change together. Validate independent copies before production use.

## Before upgrading

Exit the app/automation and identify the channel. Back up the entire app data directory, destinations and required cloud copies; record versions, passwords and paths. config.json alone contains no archives and does not transfer current-user DPAPI password material.

## Configuration and plugins

The Host migrates identities, Provider State, typed settings and Enabled Intent. Flat v2 payloads enter legacy quarantine. Bundled v3 MineRewind can migrate its data offline; other v2 code does not execute. Renaming ZIP is insufficient. Check Kind providers, runtime state and diagnostics before Enable.

## One-time history migration

Unbound legacy configurations read old history.json/archive evidence to build and bind per-config immutable history. The old file is no longer writable authority; new history uses packs, indexes and local state. Missing/unreliable evidence limits restorability without inventing complete states.

Rolling preserves old archives and creates new immutable payloads. Migration interprets old Smart/Overwrite numeric values; do not edit enums manually. Preserve originals and use Recovery Center on failure, never delete history/config/quarantine wholesale.

## Validate and roll back

Check identities/scopes, settings, history, Full/Smart/Rolling, test restores, automation and cloud. Validate forced Overwrite for partial captures, active-branch Quick Restore and safety snapshots before re-enabling tasks.

Do not hand1.9-written data to1.8. Roll back using independent pre-upgrade config/history/archive copies. See [migration](/docs/guides/data-migration) and the [historical1.8 language recovery guide](/docs/getting-started/v1-8-upgrade).


