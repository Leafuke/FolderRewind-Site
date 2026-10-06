---
sidebar_position: 2
title: "Backup modes and retention"
description: "Compare Full, Smart and Rolling, set per-source retention, understand protected versions and cleanup reports, and choose compression settings."
reviewed_baseline: "1.9-api3.9"
---

# Backup modes and retention

Use Full for the first backup. Choose Smart or Rolling for regular saves. All three keep version history; they differ in archive construction, dependencies and storage cost.

![The Resources tab holds per-source retention, immediate cleanup and reports.](/img/docs/v1-9-6/retention-detail-en-light-1305.webp)

*The Resources tab holds per-source retention, immediate cleanup and reports. Interface version: 1.9.6.*

## Choose a mode

| Mode | How it works | Useful for |
| --- | --- | --- |
| Full | Saves the entire managed range in an independent archive | First backups, milestones and a new baseline after upgrading |
| Smart | Records additions, changes and deletions relative to a baseline; restore needs the baseline and incremental chain | Large folders with small changes between saves |
| Rolling | Builds a new archive of the complete state from a trusted baseline, retaining older archives | Reusing baseline processing while keeping versions |

Rolling does not overwrite the previous archive. An unusable baseline can cause fallback to Full. Legacy Incremental maps to Smart; legacy backup Overwrite maps to Rolling. Overwrite on the restore page means something different: overlay restoration.

## Configure and verify

Choose the mode, archive format and location in the project's backup policy. A full capture covers the source's managed range; excluded content is outside that backup.

The default Smart chain limit is 5, after which a new Full baseline is created. Skip if unchanged can mean a run creates no new version. Test additions, changes and deletions after changing modes.

## Keep the latest N versions

Since 1.9.4, the retention count applies to **the latest N recoverable versions of each source**. **0** means unlimited retention. Protected versions are kept in addition, so the actual count can be higher.

Automatic cleanup runs only when it can reclaim space overall. Rebuilding an incremental chain needs temporary disk space; a cleanup that would increase usage is skipped automatically. Deleting Smart dependencies in File Explorer can break later restores.

## Manual cleanup and reports

![Manual cleanup report: local archives, actual space changes and source results.](/img/docs/v1-9-6/cleanup-en-light-1604.webp)

*Manual cleanup report: local archives, actual space changes and source results.*

Run immediate cleanup in project settings and review each source's result. You may choose to prioritize reaching the retention count, but that can increase disk usage.

Retention cleanup affects local archives, retaining logical history and cloud copies. Before deleting a history node, review the impact preview. The app can rebuild dependencies to keep later versions recoverable. See [history management](/docs/guides/history-timeline).

## Compression and partial captures

0 compression threads selects automatically. Light presets use roughly half the logical processors; the lightest uses at most 2. File-type compression rules disable solid archives. Advanced 7-Zip arguments cannot replace app-controlled output, source, password or progress options.

Partial captures, including selected Minecraft regions, always restore with Overwrite. An exactly readable archive does not justify deleting files outside its captured range.

<span id="additional-7-zip-arguments" />
<span id="choosing-tips" />
<span id="compression-and-performance" />
<span id="how-to-configure" />
<span id="key-settings-strongly-related-to-mode" />
<span id="mode-comparison" />
<span id="performance-presets-18" />
<span id="quick-recommendation" />
<span id="related-links" />
<span id="restore-rules-for-partial-backups" />
<span id="starter-presets" />
