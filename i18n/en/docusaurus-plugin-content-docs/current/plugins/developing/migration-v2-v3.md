---
sidebar_position: 20
title: "Migrating v2 plugins to v3 and recovering failures"
description: "Move legacy v2 plugin responsibilities to independent API 3 contracts and redesign activation, discovery, settings, backup and restore."
reviewed_baseline: "1.9-api3.9"
---

# Migrating v2 plugins to v3 and recovering failures

Move legacy v2 plugin responsibilities to independent API 3 contracts and redesign activation, discovery, settings, backup and restore.

Plugin System v3 is a clean break: old v2 code is not loaded. One-time user-data migration is not runtime compatibility. Back up config, plugin data and archives; authors reimplement against the independent SDK.

## Responsibility mapping

| v2 interface/hook | v3 responsibility |
|---|---|
| Initialize, GetSettingsDefinitions | ActivateAsync + static typed settings |
| TryDiscoverManagedFolders, ConfigAugmenter | Discovery/ConfigReconciliation drafts and revision proposals |
| OnBeforeBackupFolder, BackupPreparationProvider | FilePolicy/BackupScope/BackupConsistency |
| OnAfterBackupFolder archive edits | ArtifactTransformer transaction; read-only CompletionObserver |
| OnBeforeRestoreFolder, OnAfterRestoreFolder | RestoreCoordinator/RestoreStagingPreparation; Host writes targets |
| HotkeyProvider | PluginCommandDescriptor |
| ParameterizedKnotLinkCommandHandler, CapabilityProvider | KnotLinkIntegration + optional TargetResolver |

IFolderRewindPlugin keeps its name but changes methods. Remove Host DLL/Models references, string settings and path-based state ownership. Static services/capabilities must match registration.

## User upgrades

The Host can migrate legacy MineRewind data offline using the bundled v3 package, retaining intent and typed state. Old flat payloads enter recoverable legacy quarantine without execution/deletion. Other v2 plugins require new author-provided packages; renaming ZIP to frplugin is insufficient.

## Recovery

Corrupt config enters Recovery Center: preserve diagnostics/original files and use controlled recovery. --safe-mode suppresses code without rewriting Enabled Intent. Let startup journals recover interrupted migration/uninstall; never delete config.json/quarantine/history wholesale.

Verify identities, state, settings, runtime health and restores before restarting automation. RecoveryRequired blocks destructive operations until resolved.
