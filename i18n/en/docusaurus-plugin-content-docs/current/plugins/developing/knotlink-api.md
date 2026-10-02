---
sidebar_position: 5
title: "KnotLink integration and target resolution API"
description: "FolderRewind 1.9 knotlink integration and target resolution api: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# KnotLink integration and target resolution API

API 3.5 uses IKnotLinkIntegrationCapability with Commands, Signals and ExecuteAsync. Wire protocol v2, Server v3, Plugin API3.5, funcList manifestVersion3.0.0 and specVersion1.0 are separate version axes.

## Custom commands

KnotLinkCommandDescriptor includes Command, FunctionName, Arguments, Returns and RequiredArguments. Argument descriptors include input/default/options; signal descriptors expose fields. Metadata must match execution so the Host can generate capabilities.

GameRewind EXAMPLE_ECHO returns data in PluginCommandResult; the Host encodes the v2 response. Do not duplicate raw parsing or accept legacy space-separated commands.

## Semantic selectors

IKnotLinkTargetResolver extends the integration capability and resolves stable ConfigId/FolderId or diagnostics. Do not register it separately. The Host executes the same core command and validation after resolution, without a second operation implementation.

MineRewind matches current_save=true for six variants: BACKUP, LIST_BACKUPS, RESTORE, AUTO_BACKUP, STOP_AUTO_BACKUP and MARK_IMPORTANT. Discovery names are unique, wire cmd stays unchanged, and operation arguments come from KnotLinkCoreCommands.

## Services and verification

Declare KnotLink for events and BackupRequest/RestoreRequest independently for operations. Preserve explicit player-preservation false; unsupported new restore options must return Blocked rather than falling back silently.

Query GET_CAPABILITIES first. status=ok may mean a long task was accepted; completion requires correlated signals. Runtime capabilities are authoritative for available commands, arguments and signals.

<span id="parameterized-command-handler" />
<span id="knotlinkcommandrequest" />
<span id="handler-result" />
<span id="minimal-handler-example" />
<span id="declare-runtime-capabilities" />
<span id="how-minerewind-extends-v2" />
<span id="design-checklist" />
<span id="related-links" />
