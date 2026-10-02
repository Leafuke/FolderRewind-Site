---
sidebar_position: 6
title: "Plugin System v3 architecture"
description: "FolderRewind 1.9 plugin system v3 architecture: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Plugin System v3 architecture

## Static packages and sessions

SDK3.5.0 keeps assembly3.0.0.0. manifestVersion3 declares API/Kinds/services/capabilities/settings/artifact semantics. Installation validates canonical paths/bounds/PE/declarations without execution; versioned installs keep journals.

Explicit Enable→snapshot activation/registration→Host validation/atomic state commit→callable Active session. One implementation per contract; intent/state/RequiresRestart differ.

## Ownership

Kind owners route operation capabilities, not DiscoveryProviderId. Reconciliation proposes revision-bound changes. Artifact graphs validate revisions; materializers write isolated Workspaces.

Config-wide RestoreCoordinator receives operation identity/kind/once-only continuation. Ordinary staging differs from Checkout/Merge. The Host owns preflight/Safe Restore/live writes. Recovery-required outcomes prohibit automatic rejoin.

## Trust and cancellation

AssemblyLoadContext isolates dependencies, not OS privileges. Declarations gate formal services; plugins retain ambient rights. Catalog binds exact hashes/provenance, which manifests cannot self-award.

Disable removes routing/cancels/drains before bounded Deactivate. Timeouts may retain physical contexts until restart. Journals recover interrupted update/uninstall. Safe Mode preserves intent.

See all15 [capabilities](/docs/plugins/developing/plugin-api) and [v2 migration](/docs/plugins/developing/migration-v2-v3).

<span id="interface-map" />
<span id="lifecycle" />
<span id="backup-and-restore-extensions" />
<span id="knotlink-subsystem" />
<span id="layout-and-isolation" />
<span id="related-links" />
