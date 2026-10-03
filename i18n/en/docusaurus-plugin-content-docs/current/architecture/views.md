---
sidebar_position: 7
title: "Views, onboarding and navigation"
description: "FolderRewind 1.9 views, onboarding and navigation: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.6"
---

# Views, onboarding and navigation

![Settings sections,1.9.2.0/API3.5 Chinese candidate; final release acceptance pending](/img/docs/v1-9/settings-candidate.png)

*Settings sections,1.9.2.0/API3.5 Chinese candidate; final release acceptance pending.*


## Pages

Home creates/templates/batches; FolderManager manages sources; BackupTasks observes jobs; History has normal/advanced and source/Run views; GameDiscovery reviews Beta candidates; CloudSetup configures/tests connections; Log shows diagnostics; Settings groups tools/plugins/templates/transfer.

Current ViewModels include HomePageViewModel, FolderManagerPageViewModel, HistoryPageViewModel, PluginStorePageViewModel, GameDiscoveryPageViewModel and CloudSetupViewModel. Verify actual files rather than legacy HistoryViewModel/PluginStoreViewModel names.

## Dialogs and windows

Config/cloud/template/merge interactions use views and AppDialog services on the UI thread. MiniWindow binds stable sources; RecoveryCenter handles corrupted configuration with ordinary writes blocked.

## Settings and theme

Settings controls cover appearance, behavior, diagnostics, plugins/KnotLink, presets/templates, data and environment. OpenList controls/connection diagnostics expose real readiness. Semantic resources adapt light/dark/system/high-contrast; state also includes text/automation labels.

## Acceptance

Separate navigation from orchestration. Test narrow layouts/DPI/languages/keyboard/cancellation/recovery/deep notification routing. Building source does not verify UI layout or game exit/rejoin.

<span id="page-listing" />
<span id="dialogs" />
<span id="settings-page-sub-controls" />
<span id="navigation-flow" />
<span id="special-windows" />
