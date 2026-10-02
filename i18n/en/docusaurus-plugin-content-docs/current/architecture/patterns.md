---
sidebar_position: 2
title: "Architecture patterns and transaction boundaries"
description: "FolderRewind 1.9 architecture patterns and transaction boundaries: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Architecture patterns and transaction boundaries

## MVVM and interactions

ViewModels own semantic state/cancellable commands; views own controls/themes. Interaction services create dialogs on the UI thread, serialize display and return choices. Domain outcomes do not depend on brushes. Cancel stale queries before they overwrite current selection.

## Dependencies and lifetime

Static Host façades such as ConfigService coexist with instance HistoryRuntime/plugin sessions/indexes/transports/operation services. Do not make load contexts/gates/cancellation sources unbounded global state.

## Atomic commit and recovery

Config snapshots serialize writes; a Commit Pack atomically exposes transaction facts. Indexes are rebuildable; Workspace/Replica Catalog are device-local. Config gates/final Guards revalidate identities/revisions, preserving committed semantics after faults.

Journals, isolated staging/quarantine and idempotent compensation handle interruptions. Catching an exception and continuing writes is not success. Keep stage diagnostics/cancellation; RecoveryRequired blocks destructive work.

## Proposals and immutable extensions

Discovery/reconciliation return drafts/patches for Host persistence. Artifact transactions append nodes; materializers write isolated workspaces. Snapshots/proposals/validation/commit replace ordered hooks and writable Host models.

<span id="mvvm-pattern" />
<span id="static-service-architecture" />
<span id="shell-navigation-pattern" />
<span id="configuration-driven-design" />
<span id="partial-class-organization" />
<span id="serialization-strategy" />
