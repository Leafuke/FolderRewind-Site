---
sidebar_position: 99
title: "Frequently asked questions"
description: "Find answers about installation, automatic task alerts, retention, cloud recovery, Minecraft maps and world merging, with links to practical guides."
reviewed_baseline: "1.10-api3.17"
---

# Frequently asked questions

## Which installer should I choose?

Microsoft Store is the recommended channel. GitHub provides x64 and ARM64 Setup EXEs with matching checksums. Choose x64 for Intel/AMD PCs and ARM64 for Windows on ARM. See [installation](/docs/getting-started/installation).

## Where can I find the current version and changes?

About shows your installed version. [Downloads](/download) describes the current packages, and the [release log](/blog) records each release.

## Why was there no alert after an automatic backup?

Successful automatic backups and cloud syncs, including no-change runs, stay quiet. Select the bell for results. Important warnings and errors follow your alert settings. See the [notification center](/docs/guides/notifications).

## Where are earlier results after restarting?

The center keeps the latest 200 results from the current session. Use log files for earlier operations and history for created versions.

## How should I choose Full, Smart or Rolling?

Use Full for the first backup or an important milestone, Smart for frequent small changes, and Rolling to use a trusted baseline while creating a new independent archive. See [backup modes](/docs/guides/backup-modes).

## Why are there more versions than my retention count?

The count covers the latest N recoverable versions per source, with protected versions kept additionally. Zero means unlimited. Manual cleanup reports show dependency rebuilding and storage changes.

## Which version does Quick Restore choose?

It uses the unique tip of the active branch. A source with no active branch can select its latest recoverable legacy backup. Select a specific version in history to recover an earlier state.

## How do I remove old backups while keeping later versions?

Use history in the app and review the deletion impact first. The app rebuilds incremental dependencies as needed to preserve recovery of later versions.

## What else is needed when cloud history is available?

The selected version also needs its archives and complete dependencies. [Cloud recovery](/docs/guides/cloud-recovery) reads history, downloads and verifies data and restores it to a new local directory.

## How do I exclude a whole cache folder?

Add a folder rule such as `cache`. It applies to the matching folder and all descendants. Check the effective file preview before saving. See [filters](/docs/guides/filters).

## Can the Minecraft map show older backups?

Yes. Enable MineRewind and select a locally preparable Java world version to browse its historical map or compare two versions. See [map preview](/docs/guides/minecraft/world-preview).

## How can I merge two Minecraft branches?

Choose Minecraft semantic merge for the session, select Conservative or Terrain first, resolve chunk conflicts and review the result. See [world merging](/docs/guides/minecraft/world-merge).

## What should I bring to another PC?

Prepare configuration, `.frhistory` history and archives or cloud copies separately, and keep the encryption password. Follow [data migration](/docs/guides/data-migration) to confirm paths and recovery.

## How can I check an enabled plugin's features?

Review its actual runtime state, settings and diagnostics in plugin management. Complete any requested restart, then check the source's project kind. See [plugin management](/docs/plugins/using-plugins).

## What should I do when recovery is requested?

Keep logs and original files, open the app's controlled recovery workflow and follow the remaining diagnostic steps. Continue related backups or restores once recovery is complete.

<span id="anything-special-for-encrypted-configs-across-devices" />
<span id="backup" />
<span id="can-folderrewind-sync-backups-to-the-cloud" />
<span id="can-i-back-up-game-saves-while-the-game-is-running" />
<span id="can-i-keep-using-my-pc-during-backup" />
<span id="can-i-migrate-configs-and-history-to-a-new-pc" />
<span id="can-i-restore-only-selected-files" />
<span id="data-migration" />
<span id="feedback-and-community" />
<span id="how-can-i-develop-my-own-plugin" />
<span id="how-do-i-install-a-plugin" />
<span id="how-do-i-report-bugs-or-request-features" />
<span id="installation" />
<span id="is-minerewind-free" />
<span id="is-there-a-chinese-speaking-community" />
<span id="plugins" />
<span id="restore" />
<span id="what-operating-systems-does-folderrewind-support" />
<span id="what-should-i-do-if-the-app-wont-launch-after-installation" />
<span id="what-should-i-watch-out-for-when-upgrading-from-an-older-version" />
<span id="whats-the-difference-between-merge-and-replace-when-importing-history" />
<span id="whats-the-difference-between-microsoft-store-msi-and-msix" />
<span id="where-are-backup-files-stored" />
<span id="why-am-i-prompted-for-a-password-before-restore" />
<span id="why-can-deleting-history-be-slower-now" />
<span id="why-did-auto-backup-stop-unexpectedly" />
<span id="why-does-history-show-an-entry-but-view-cant-find-the-backup-file" />
<span id="will-backups-consume-too-much-disk-space" />
<span id="will-restore-overwrite-my-current-files" />

<span id="which-version-do-these-guides-cover" />
<span id="which-installer-should-i-download" />
<span id="where-is-overwrite-backup" />
<span id="why-are-there-more-than-n-retained-versions" />
<span id="why-did-quick-restore-not-select-the-previous-row" />
<span id="can-deleting-a-version-break-later-smart-backups" />
<span id="why-does-a-history-export-contain-no-archives" />
<span id="why-is-an-enabled-plugin-unavailable" />
<span id="why-is-map-preview-missing" />
<span id="why-can-i-see-cloud-history-but-not-restore-it" />
<span id="what-are-the-limits-of-region-and-player-preservation" />
<span id="what-should-i-do-when-recovery-is-required" />
