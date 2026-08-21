---
sidebar_position: 14
title: Cloud Archive
description: Use rclone to synchronize history, archives, and portable configuration data in MineBackup 1.16.2
---

# Cloud Archive

MineBackup uses rclone for cloud transport while MineBackup owns configuration, queueing, history analysis, metadata relationships, and safety prompts. Cloud archive supplements local backups; it does not replace local restore verification.

## Prerequisites

1. Complete a local backup-and-restore loop first.
2. Prepare a usable rclone path, remote path, and working directory.
3. Confirm that the remote account is configured in rclone.
4. Enable cloud synchronization in Settings.

rclone is not shipped with MineBackup. After confirmation, Settings can download a pinned managed rclone and validate its SHA-256 and `rclone version` before and after installation. MineBackup does not copy, parse, or upload the user’s rclone credential file.

## Two synchronization modes

| Mode | Content | Suitable for |
| --- | --- | --- |
| History only | History and state information used to analyze a profile | Rebuilding a history index on another machine |
| History + archives | History, archive files, and related metadata | Restoring a complete backup chain off-site |

Settings also control:

- Whether history is synchronized after an upload.
- Whether a missing archive is downloaded automatically before restore.
- Command timeout (the default model is 600 seconds) and retry count.
- The cloud working directory and last exit status.

## Configure the remote

For the target configuration, set:

- The rclone executable, or use the managed installation.
- The remote path.
- The cloud command working directory.
- Synchronization mode, timeout, and retry policy.

Remote paths are built from safe configuration and world path segments. Do not paste local credentials, access tokens, or the complete rclone configuration into ordinary task commands or history comments.

## Per-item history actions

Depending on its state, a history item can:

- Upload the archive and related metadata.
- Download a missing local archive from the cloud.
- Show whether a cloud copy is available.

Upload normally prioritizes the archive, then synchronizes `state` and `record` metadata. If the archive succeeds but metadata is partial, history reports a partial sync; complete the metadata before treating the Smart chain as fully restorable.

Before restoring a cloud-only item:

1. Download the archive from history.
2. Confirm that the local status is usable.
3. Check the Smart chain and metadata.
4. Start restore.

## Portable configuration exchange

`portable-config.json` exchanges an explicit field whitelist and merges by stable `ConfigId`. It can contain the configuration name, logical world definitions, compression/backup/retention policy, blacklists, and portable cloud policy.

It does not upload or overwrite:

- Local save, backup, and snapshot paths.
- Compression, rclone, and font paths.
- Credentials, commands, scripts, and automation tasks.
- Special Config, legacy Service Mode fields, or run results.

A configuration added from the cloud is **Pending Local Binding**. Bind local paths and tools before allowing destructive or automated operations.

## Troubleshooting

- Cloud buttons are disabled: check that the configuration is enabled, the archive exists, and rclone is executable.
- History imports but archive download fails: check remote mapping, working directory, and permissions.
- Metadata is partially synchronized: complete the sync and verify the Smart chain before deleting the local baseline.
- Timeouts or exhausted retries: keep the local archive and inspect the log exit code and remote error.

For the first rollout, rehearse local Full → upload → cloud analysis/download → local restore. Only connect cloud synchronization to automation after this succeeds.
