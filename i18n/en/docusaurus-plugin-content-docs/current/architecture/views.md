---
sidebar_position: 7
title: "Views, wizards and navigation"
description: "Understand manager, history, merge, spatial, cloud connection and recovery pages, lazy settings, notification navigation, themes and keyboard behavior."
reviewed_baseline: "1.10-api3.17"
---

# Views, wizards and navigation

## Page responsibilities

The manager organizes sources and operations; Tasks shows progress; history presents versions by source and backup run. Creation combines manual selection, discovery, presets and summary review.

| Page | Responsibility |
| --- | --- |
| MergePage | File conflicts, text comparison, manual results, apply review and saved sessions |
| SpatialPreviewPage | Map modes, dimensions, navigation, zoom and point details |
| SpatialWorkspacePage | Fixed version inputs, map comparison, selection and spatial merge locations |
| CloudConnectionsPage | Shared and project-specific connections |
| CloudSetupPage | Connection, authorization, directory and access verification, first upload |
| CloudRecoveryPage | Cloud project discovery, history and new-folder recovery |
| SettingsPage | Appearance, core, plugins, runtime environment and data migration |

ViewModels retain presentation state and asynchronous commands; page code bridges events. Services perform business orchestration.

## Secondary windows and notifications

AppDialog handles configuration, templates and confirmations, with creation, display and results on the UI thread. MiniWindow binds a stable source; RecoveryCenter handles recovery workflows.

The bell opens the notification center. Results link to tasks, logs or history. Closing a flyout or navigating restores keyboard focus for the destination context.

## Settings and display

Settings sections load on demand and release resources during navigation. Appearance supports base font size and light, dark or system themes. Window materials and accent options follow licensing and current settings.

Review English and Chinese, narrow windows, high DPI, keyboard focus, flyouts, cancellation and deep notification navigation. Include loading, empty, diagnostic and resumed-session states for map and merge pages.

<span id="dialogs" />
<span id="navigation-flow" />
<span id="page-listing" />
<span id="settings-page-sub-controls" />
<span id="special-windows" />

<span id="views-onboarding-and-navigation" />
<span id="pages" />
<span id="dialogs-and-windows" />
<span id="settings-and-theme" />
<span id="acceptance" />
<span id="merge-and-map-pages" />
