---
sidebar_position: 1
title: CLI and Server Overview
description: MineBackup 1.16.2 headless CLI, its relationship with the GUI, use cases, and learning path
---

# CLI and Server Overview

When MineBackup needs to run on a Minecraft Dedicated Server, VPS, NAS, or SSH-only Linux host, `minebackup-cli` is the official entry point for configuring, backing up, verifying, and rehearsing a cold restore without starting the GUI. It is provided as a headless/server mode starting with MineBackup 1.16.2.

## What is the CLI?

`minebackup-cli` is a separately deployable command-line program. It can create a Manifest from an empty Profile, validate configuration, diagnose the environment, run one-shot backups, inspect History, verify an archive, and plan a Restore dry-run. It does not open dialogs or require a desktop session.

A one-shot command does not require the long-running service, for example:

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world world
```

## How do CLI and GUI fit together?

Both entry points share the same runtime/core and data contracts:

```text
GUI                 CLI
 │                   │
 └──── shared runtime/core ────┘
              │
      Profile / History
      Backup / Restore
```

The GUI and CLI are therefore not incompatible products. They use the same Profile, History, archive, and restore core. A Profile still has single-instance ownership, so do not let a GUI and a CLI write to the same Profile at the same time.

## When should you choose the CLI?

The CLI is especially useful for:

- Minecraft Dedicated Server;
- SSH-only Linux, VPS, and NAS hosts;
- systems without a DISPLAY or Wayland session;
- long-running servers scheduled by systemd or Windows Task Scheduler;
- unattended workflows that need one server account, a fixed Profile, and auditable JSON output.

Ordinary Windows, Linux, and macOS desktop users can continue using the GUI. The CLI is the server/headless path, not a forced migration for desktop users.

## CLI is not the same as `serve`

```text
minebackup-cli backup
```

can perform a one-shot operation by itself. `serve` is an optional long-running Profile runtime for persistent Minecraft servers, KnotLink, hot restore, or frequent CLI calls. It forwards requests over local IPC and does not open a TCP/UDP management port. Basic CLI configuration, backup, and verification do not depend on `serve`.

## Recommended learning path

1. [Five-minute quick start: complete the first server backup](/en/docs/guides/minebackup-v1/cli/quick-start)
2. [Use AI to generate a configuration](/en/docs/guides/minebackup-v1/cli/ai-assisted-config) (optional)
3. [Profiles and Manifests](/en/docs/guides/minebackup-v1/cli/profile-manifest)
4. [Backup, History, Verify, and Restore](/en/docs/guides/minebackup-v1/cli/backup-restore)
5. [Job workflows](/en/docs/guides/minebackup-v1/cli/jobs) and [the long-running Serve runtime](/en/docs/guides/minebackup-v1/cli/serve)
6. Read [Linux and systemd](/en/docs/guides/minebackup-v1/cli/linux-systemd) or [Windows Task Scheduler](/en/docs/guides/minebackup-v1/cli/windows-task-scheduler)
7. Finish with [Commands, JSON, and exit codes](/en/docs/guides/minebackup-v1/cli/reference) and [CLI troubleshooting](/en/docs/guides/minebackup-v1/cli/troubleshooting)

Every configuration tutorial follows the same safety chain:

```text
generate/edit manifest
        ↓
profile validate → profile diff → profile apply --dry-run
        ↓
profile apply → doctor → backup → history → verify
        ↓
restore --dry-run
```
