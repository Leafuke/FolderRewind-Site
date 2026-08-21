---
sidebar_position: 7
title: The Long-Running Serve Runtime
description: Configure the optional MineBackup 1.16.2 Profile runtime, IPC forwarding, and cancellation behavior
---

# The Long-Running Serve Runtime

> **`serve` is an optional long-running Profile runtime, not a prerequisite for using the CLI.**

One-shot `backup`, `verify`, `restore --dry-run`, `doctor`, and `job run` work without `serve`. Consider it only when you need a persistent Profile runtime, KnotLink, hot restore, or frequent CLI calls.

## When should you use `serve`?

Typical cases include:

- a long-running Minecraft Server;
- KnotLink hot-backup or hot-restore coordination;
- frequent CLI queries or operations without reloading the Profile each time;
- a Profile runtime managed by systemd;
- one runtime instance holding a Profile for the server account.

If you only need one `job run` per day, use the one-shot CLI with the operating-system scheduler first. “Server mode” does not mean that `serve` must run.

## What is transparent forwarding?

After `serve` starts, a normal CLI client submits requests to the runtime over local IPC:

```text
CLI client
    │
 local IPC
    ▼
  serve
    │
 shared runtime
```

The stdout JSON envelope and exit code remain the same as direct CLI execution. Commands such as `config list`, `doctor`, `apply`, `backup`, `job`, `verify`, and `restore` can be forwarded transparently.

`serve` does not open a TCP/UDP management port. Windows uses current-user ACLs for IPC; Unix uses a permission-restricted local socket. It is not a remote control service, and the Profile socket must not be exposed to a network.

## Start, inspect, and stop

```bash
minebackup-cli --data-dir "$PROFILE" --json serve
minebackup-cli --data-dir "$PROFILE" --json serve status
minebackup-cli --data-dir "$PROFILE" --json serve stop
```

In production, let systemd or a Task Scheduler/service account own the runtime. Do not start a GUI, a normal CLI, and a second `serve` against one Profile.

`serve status` reports runtime uptime, IPC operations, cancellation state, KnotLink activity, and network/listener state. `serve stop` stops accepting new requests, cancels active IPC/KnotLink work, waits for cleanup, exits, and releases the Profile lock.

## Cancellation

Ctrl+C in a client sends a cancellation request identified by operationId. The server asks started Backup, Process, and KnotLink work to finish cancellation; a second control signal may terminate immediately.

A dropped client connection does not grant bypass execution and does not let another CLI skip Profile ownership. After cancellation or shutdown, inspect the final JSON envelope, exit code, and Profile logs.

## `serve`, the GUI, and one-shot CLI

- The GUI and `serve` are strictly mutually exclusive for one Profile; the GUI is not a `serve` control client.
- When `serve` exists, a normal CLI from the same user is forwarded. If the owner is a GUI or another normal CLI, the result is `profile_busy`.
- `serve` does not change the Profile/History/Backup/Restore data contracts.
- `--no-network serve` disables KnotLink and rclone network post-processing; local IPC remains the local runtime control mechanism.

For `profile_busy`, start with `serve status` and check the GUI, another CLI, or a service task owned by the same account. Do not delete the runtime lock or socket.

## A minimal rollout sequence

1. Complete the [five-minute quick start](/en/docs/guides/minebackup-v1/cli/quick-start).
2. Validate the Profile with `doctor`, Backup, History, Verify, and Restore dry-run.
3. Run `job run --job <JobId>` manually once.
4. Start `serve` in the foreground and confirm it with `serve status`.
5. From the same account, run `config list` or `job run` once to confirm forwarding.
6. Put `serve` under [Linux systemd](/en/docs/guides/minebackup-v1/cli/linux-systemd) or [Windows Task Scheduler](/en/docs/guides/minebackup-v1/cli/windows-task-scheduler).

`serve` does not replace `doctor`, Verify, or a Restore dry-run. It only keeps an already-correct Profile running as a long-lived runtime.
