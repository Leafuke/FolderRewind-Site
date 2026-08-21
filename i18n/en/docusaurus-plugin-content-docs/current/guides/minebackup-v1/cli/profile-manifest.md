---
sidebar_position: 4
title: Profiles and Manifests
description: Understand the MineBackup 1.16.2 CLI Profile, Config, World, Job, and Manifest lifecycle
---

# Profiles and Manifests

If you remember only one distinction, make it this:

> **Config = what to back up and how; Job = what to execute in one run.**

A Manifest is a reviewable, copyable, declarative input. A Profile is the directory where MineBackup stores the applied configuration, History, and runtime state on the server.

## Start with the object model

```text
Profile
├── Config
│   └── World
└── Job
    └── Stage
        └── Step
```

- **Profile**: the complete MineBackup data root selected by `--data-dir`, including directories such as `config/`, `data/`, `logs/`, `runtime/`, and `tools/`.
- **Config**: one backup definition containing `saveRoot`, `backupRoot`, relative world paths, backup mode, archive, retention, restore, and cloud settings.
- **World**: a directory managed by a Config. `worlds[].path` is the canonical relative path below `saveRoot`.
- **Job**: a one-run workflow that points at Configs and worlds; it has no time schedule.
- **Stage**: an ordered phase inside a Job.
- **Step**: a concrete Backup or Process operation; Steps in one Stage may run concurrently.

A Job describes what to do; the operating-system scheduler decides when to do it. Scheduling belongs to a systemd timer or Windows Task Scheduler. Do not add cron, schedule, Once, Interval, or Scheduled fields to a CLI Manifest.

## The path model: keep four paths separate

| Name | Meaning | Common mistake |
| --- | --- | --- |
| `--data-dir` | Profile root containing MineBackup configuration, History, logs, and runtime | Pointing it at `config/`, `saveRoot`, or a world |
| `saveRoot` | Parent directory containing the worlds/saves | Treating one world directory as the parent |
| `backupRoot` | Archive and MineBackup metadata destination | Confusing it with the Profile or an archive filename |
| `worlds[].path` | World path relative to `saveRoot` | Using a display name, numeric index, or absolute path |
| Manifest path | JSON input read by `profile init/validate/diff/apply` | Copying desktop absolute paths to a server unchanged |

For example:

```text
saveRoot = /srv/minecraft
worlds[].path = world_nether
actual world directory = /srv/minecraft/world_nether
```

Local relative paths in a Manifest are resolved relative to the Manifest file. After apply, MineBackup writes absolute paths. Use absolute paths for server deployment, and escape Windows backslashes as `\\` in JSON (or use forward slashes).

`--data-dir` is not `config/`:

```bash
minebackup-cli --data-dir /var/lib/minebackup/server --json doctor
```

Do not write:

```bash
minebackup-cli --data-dir /var/lib/minebackup/server/config --json doctor
```

## The minimum Manifest shape

The official `profile init` command creates a template with canonical UUIDs. Its top-level structure is:

```json
{
  "schemaVersion": 1,
  "profile": {
    "restorePreserve": ["session.lock"]
  },
  "configs": [],
  "jobs": []
}
```

Use the MineBackup repository’s `packaging/cli/server-manifest.example.json` as the complete server example. Do not assemble a new CLI Job by copying old GUI automation, Special Config, or legacy Windows Service Mode data; the CLI accepts only fields supported by the current schema v1.

## Manifest lifecycle

### 1. Generate a template

```bash
minebackup-cli --json profile init --output server.json
```

This creates an official editable starting point. It cannot know your `saveRoot`, `backupRoot`, or actual world paths.

### 2. Validate the format and references

```bash
minebackup-cli --json profile validate --file server.json
```

This validates JSON, the schema, UUIDs, and Config/Job/Stage/Step references. An editor or AI saying that a file “looks right” is not CLI validity.

### 3. Review the diff

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

`diff` shows additions, updates, and possible removals before the Profile is written. Normal apply merges by ConfigId and JobId; configurations, Jobs, GUI fields, and unknown extension fields not mentioned by the Manifest are preserved.

### 4. Dry-run, then apply

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json --dry-run

minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json
```

The dry-run is the final no-write check before the transactional apply. After a successful apply, the configuration and Job files are committed together; cross-reference failures restore the previous snapshot.

### 5. Export for audit or migration

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile export --output exported.json
```

`profile export` is useful for review, migration, and a secret-free AI audit. Do not copy desktop absolute paths directly to a server. Change `saveRoot`, `backupRoot`, tool paths, and cloud working directories as needed, then repeat validate → diff → dry-run → apply → doctor.

## Merge and prune: when does deletion happen?

Normal `profile apply` merges by stable IDs:

- the same `configId` updates the corresponding Config;
- the same `jobId` updates the corresponding Job;
- other configurations, Jobs, and unknown fields not declared in the Manifest are preserved by default;
- History, archives, and metadata are not deleted by a normal apply.

`--prune --confirm-prune` is explicit deletion behavior. It removes undeclared Configs and Jobs, so it does not belong in initial setup, ordinary validation, or path troubleshooting.

If you truly need to remove obsolete objects, first inspect:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json --prune
```

Review the affected ConfigId/JobId values and History impact. Only after backing up the Profile, archives, and metadata should you explicitly use apply with `--prune --confirm-prune`. It is not a general “make validation pass” button.

## Migrate an existing GUI configuration to a server

The goal is to reuse configuration intent and stable IDs, not to copy desktop paths unchanged:

```text
GUI Profile
  ↓
profile export
  ↓
Change server paths
  ↓
validate
  ↓
diff
  ↓
dry-run
  ↓
apply
  ↓
doctor
```

Example:

```powershell
minebackup-cli.exe --data-dir "D:\MineBackupProfile" --json `
  profile export --output "D:\transfer\server.json"
```

After uploading `server.json` to the server:

1. Confirm the server `saveRoot`, `backupRoot`, and each `worlds[].path`.
2. Keep cloud archive disabled unless explicitly configured; never put credentials in the Manifest.
3. Ensure the same Unix or Windows account that runs CLI/serve can read and write the Profile.
4. Repeat the complete validation chain.
5. Use `config list` and `world list` to confirm the IDs and paths the CLI accepts before the first Backup.

The GUI and `serve` are strictly mutually exclusive for one Profile. Close the GUI during migration; do not let both entry points write to one Profile.

## Safe Manifest editing rules

- Preserve `schemaVersion`, existing UUIDs, and every field that does not need to change.
- New Config, Job, Stage, and Step objects need unique canonical UUID v4 values.
- Keep at least `session.lock` in `profile.restorePreserve`.
- Leave `archive.tool` empty to let MineBackup discover its bundled tool when appropriate.
- Keep `cloud.enabled=false` by default; never put passwords, tokens, keys, or rclone secrets in the file.
- When multiple worlds share a disk and concurrency was not requested, prefer sequential Stages for the first deployment.
- When a field is unfamiliar, consult the official template, CLI validation, and current engineering docs before removing anything.

After the Manifest is ready, return to the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start) for doctor, Backup, History, Verify, and Restore dry-run.
