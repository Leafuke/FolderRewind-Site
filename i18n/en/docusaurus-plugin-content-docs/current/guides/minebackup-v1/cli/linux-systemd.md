---
sidebar_position: 8
title: Linux and systemd
description: Deploy a Linux server with MineBackup 1.16.2 CLI, the official systemd templates, and a timer
---

# Linux and systemd

This page puts a verified CLI Profile into a Linux production chain:

```text
Install .deb
↓
Prepare Profile
↓
Prepare Manifest
↓
doctor
↓
Manual job run
↓
Configure env
↓
Enable serve
↓
Enable timer
↓
Check status
↓
Check journal
```

Complete the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start) first and confirm Backup, History, Verify, and Restore dry-run before handing the workflow to systemd.

## 1. Install the CLI

Download `minebackup-cli_<version>_amd64.deb` or the portable `MineBackup-CLI-<version>-linux-x64.tar.gz` from [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases). For a `.deb`:

```bash
sudo apt install ./minebackup-cli_<version>_amd64.deb
minebackup-cli --version
```

For a portable package, place its directory at a stable location and use the real CLI path in the systemd environment. Do not rely on a temporary interactive-shell PATH for a service.

## 2. Prepare the Profile, save root, and backup root

Example variables:

```bash
PROFILE=/var/lib/minebackup/server
SAVE_ROOT=/srv/minecraft
BACKUP_ROOT=/var/backups/minecraft
JOB_ID=22222222-2222-4222-8222-222222222222
```

The Unix user running MineBackup (the official templates default to `minecraft`) must:

- read `saveRoot`;
- write `backupRoot`;
- read and write the Profile;
- be the same account used by `serve` and one-shot CLI commands.

Do not open the same Profile in the GUI as another user. Permission problems commonly appear first in `doctor` or as `target_not_found`; do not run one command as root and leave ownership inconsistent.

## 3. Prepare and validate the Manifest

Generate or edit `server.json` as described in [Profiles and Manifests](/en/docs/guides/minebackup-v1/cli/profile-manifest). Ensure that `saveRoot` is the parent of the worlds, `backupRoot` is the archive root, and each `worlds[].path` is relative. Then run the complete sequence:

```bash
minebackup-cli --json profile validate --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file /etc/minebackup/server.json --dry-run
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

Then inspect the Config, World, and Job:

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json job list
```

## 4. Run one Job manually

Do not enable the timer first. Run the same command that the repository template will call:

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  job run --job "$JOB_ID"
```

Check the exit code, Job/Stage/Step envelope, History, and Verify. If the manual run fails, fix the CLI/Profile first instead of letting the timer repeat the same error.

## 5. Configure the official `.env`

The `.env` file contains instance paths and a Job ID; it does not replace the Manifest and should not contain passwords. Use the `example.env` supplied by the package, normally installed at:

```text
/usr/share/doc/minebackup-cli/examples/systemd.env
```

Copy it for the instance and edit it:

```bash
sudo install -d -m 0750 /etc/minebackup
sudo cp /usr/share/doc/minebackup-cli/examples/systemd.env \
  /etc/minebackup/server.env
sudoedit /etc/minebackup/server.env
```

Confirm at least these variables:

```dotenv
MINEBACKUP_DATA_DIR=/var/lib/minebackup/server
MINEBACKUP_SAVE_ROOT=/srv/minecraft
MINEBACKUP_BACKUP_ROOT=/var/backups/minecraft
MINEBACKUP_JOB_ID=22222222-2222-4222-8222-222222222222
```

## 6. Use the repository-provided unit files

Do not invent new unit files. The official package provides these templates:

```text
minebackup-serve@.service
minebackup-backup@.service
minebackup-backup@.timer
```

Their responsibilities are:

- `.service`: runs `minebackup-cli ... serve` as the long-running Profile runtime;
- `minebackup-backup@.service`: runs the one-shot `job run --job ...` operation;
- `.timer`: decides when to trigger the backup service; `Persistent=true` can catch up a missed schedule.

The templates default to the `minecraft` user and group, a restrictive umask, and constrained system permissions. If your server account differs, adjust User/Group according to your package operations policy, then make sure Serve and Job use the same account and can access all four paths.

## 7. Enable Serve, then enable the timer

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now minebackup-serve@server.service
sudo systemctl enable --now minebackup-backup@server.timer
```

Confirm the long-running runtime first:

```bash
systemctl status minebackup-serve@server.service
minebackup-cli --data-dir "$PROFILE" --json serve status
```

Then inspect the timer and the latest Job:

```bash
systemctl list-timers 'minebackup-backup@*'
systemctl status minebackup-backup@server.service
journalctl -u minebackup-backup@server.service
```

The timer’s ordinary `job run` command forwards through local IPC to Serve; no second command model is needed, and the timer must not start the GUI.

## Layered diagnosis when no backup appears

Check in this order:

```text
scheduler
→ systemctl status / list-timers
→ journalctl
→ CLI envelope / exit code
→ Job / Config / World
→ archive and backupRoot
```

Common boundaries:

- Serve is not running: inspect `serve status` and `minebackup-serve@server.service`.
- Job failed: run the same `job run` manually and inspect Job/Stage/Step diagnostics.
- World is missing: run `config list`, `world list`, and `doctor`; do not guess the path.
- 7-Zip is unavailable: follow the `tool_unavailable` diagnosis from `doctor`.
- Permission denied: check the Unix account used by the unit, not only the SSH account.

Continue with [Commands, JSON, and exit codes](/en/docs/guides/minebackup-v1/cli/reference) and [CLI troubleshooting](/en/docs/guides/minebackup-v1/cli/troubleshooting).
