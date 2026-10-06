---
sidebar_position: 99
title: "Frequently asked questions"
description: "Answers to FolderRewind 1.9.6 installation, retention, Quick Restore, incremental deletion, migration, plugins and world-preview questions."
reviewed_baseline: "1.9-api3.9"
---

# Frequently asked questions

## Which version do these guides cover?

Current guides are reviewed against FolderRewind 1.9.6, bundled MineRewind 1.9.8 and Host API 3.9. The separate public plugin is 1.9.5; public examples use SDK 3.6.0. MineBackup guides and older announcements retain their own version context.

## Which installer should I download?

Prefer Microsoft Store. GitHub provides Setup EXE installers and checksums: x64 for Intel/AMD PCs, ARM64 for Windows on ARM. Current GitHub releases do not offer separate MSI, MSIX or sideload archives. See [installation](/docs/getting-started/installation).

## Where is overwrite backup?

Legacy Overwrite backup maps to Rolling, which creates new archives and retains older versions. Overwrite on the restore page still means overlay restoration. See [backup modes](/docs/guides/backup-modes).

## Why are there more than N retained versions?

Retention counts the latest N recoverable versions per source, with protected versions kept in addition. 0 means unlimited. Automatic cleanup requires a net space saving, and incremental reconstruction may need temporary space. Read the manual cleanup report for details.

## Why did Quick Restore not select the previous row?

It prefers the active branch's unique tip. Without an active branch, it can select the most recent recoverable legacy backup. Choose a specific version in history to recover an earlier state.

## Can deleting a version break later Smart backups?

In-app deletion previews the impact and can rebuild dependencies to keep later versions recoverable. Deleting archive files directly can break the chain. Use [history](/docs/guides/history-timeline) and check the outcome.

## Why does a history export contain no archives?

`.frhistory` contains history facts, not backup bytes or the local workspace. Moving computers also requires configuration, archives or trusted cloud replicas, and encryption recovery material. See [migration](/docs/guides/data-migration).

## Why is an enabled plugin unavailable?

Enable intent is separate from actual runtime status. Check API, architecture, settings and diagnostics. Safe Mode suspends execution; follow `RequiresRestart` when shown. Legacy v2 plugins cannot load directly.

## Why is map preview missing?

It needs FolderRewind 1.9.6, bundled MineRewind 1.9.8 and a valid Java save source. Bedrock, ordinary folders and the separate public plugin 1.9.5 do not offer it. See [world preview](/docs/guides/minecraft/world-preview).

## Why can I see cloud history but not restore it?

Records and archive bytes synchronize separately. Prepare the selected version and every dependency, then check transfer and verification results. Missing local files alone are not a reason to erase records.

## What are the limits of region and player preservation?

Regions use block coordinates and Overwrite restore; uncaptured areas do not return to the same time. Ordinary restore can retain selected player NBT fields for all UUIDs, while statistics and advancements can still revert. Checkout and Merge do not preserve players, and preservation across 26.1 storage layouts is rejected.

## What should I do when recovery is required?

Keep diagnostics and original files, then use controlled recovery. `CommittedRecoveryRequired` means a commit has already happened. Do not repeat destructive operations or delete configuration, history packs or transaction directories.

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
