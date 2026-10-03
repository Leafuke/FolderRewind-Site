---
sidebar_position: 99
title: "Frequently asked questions"
description: "FolderRewind 1.9 frequently asked questions: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Frequently asked questions

## Which version?

FolderRewind 1.9.3, bundled MineRewind 1.9.5 and Plugin API 3.6 / SDK 3.6.0. Assembly identity remains 3.0.0.0. MineBackup docs keep their independent baseline.

## MSI or MSIX?

Public1.9 GitHub assets are x64/ARM64 Setup EXE/checksums. Store updates are managed by the Store; old MSI/7z belong to historical releases.

## Where is Overwrite backup?

It migrates to Rolling, creating immutable new archives rather than updating old ones. Overwrite restore remains a separate file apply mode.

## Why did Quick Restore not choose the previous row?

It resolves the active branch's unique source tip. Already matched means NoChanges. Explicitly choose older versions; resolve divergence first.

## Why does exported history contain no saves?

.frhistory carries per-config Commit Pack facts, not payloads/local Workspace. Transfer config, archives or trusted replicas and encryption materials separately.

## Enabled plugin unavailable?

Enabled Intent differs from Active. Check API/architecture/schema/declarations/diagnostics. v2 code is incompatible. Safe Mode preserves intent without execution; follow RequiresRestart.

## Cloud record cannot restore?

Restoring needs valid representations/full closure/replicas. History sync differs from payload download. Prepare and verify rather than purging logical records blindly.

## Can selected regions clear the world?

Partial captures force Overwrite; omitted files are not synchronized to the same time. Inputs are block coordinates; all relevant dimension.mcc can be included.

## Which players are preserved?

Ordinary Restore preserves selected NBT fields for all UUIDs; absent players keep complete current NBT. Stats/advancements restore. Explicit false overrides defaults; Checkout/Merge do not preserve and cross-26.1 preservation blocks.

## Recovery required?

Preserve diagnostics/originals and use controlled recovery. CommittedRecoveryRequired means commit happened; do not repeat destructive work or delete config/packs/journals.

<span id="installation" />
<span id="what-operating-systems-does-folderrewind-support" />
<span id="whats-the-difference-between-microsoft-store-msi-and-msix" />
<span id="what-should-i-watch-out-for-when-upgrading-from-an-older-version" />
<span id="what-should-i-do-if-the-app-wont-launch-after-installation" />
<span id="backup" />
<span id="where-are-backup-files-stored" />
<span id="will-backups-consume-too-much-disk-space" />
<span id="can-i-back-up-game-saves-while-the-game-is-running" />
<span id="can-i-keep-using-my-pc-during-backup" />
<span id="can-folderrewind-sync-backups-to-the-cloud" />
<span id="why-did-auto-backup-stop-unexpectedly" />
<span id="restore" />
<span id="will-restore-overwrite-my-current-files" />
<span id="can-i-restore-only-selected-files" />
<span id="why-am-i-prompted-for-a-password-before-restore" />
<span id="why-does-history-show-an-entry-but-view-cant-find-the-backup-file" />
<span id="why-can-deleting-history-be-slower-now" />
<span id="data-migration" />
<span id="can-i-migrate-configs-and-history-to-a-new-pc" />
<span id="whats-the-difference-between-merge-and-replace-when-importing-history" />
<span id="anything-special-for-encrypted-configs-across-devices" />
<span id="plugins" />
<span id="how-do-i-install-a-plugin" />
<span id="is-minerewind-free" />
<span id="how-can-i-develop-my-own-plugin" />
<span id="feedback-and-community" />
<span id="how-do-i-report-bugs-or-request-features" />
<span id="is-there-a-chinese-speaking-community" />
