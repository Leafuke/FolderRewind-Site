---
sidebar_position: 6
title: Job Workflows
description: Understand MineBackup 1.16.2 CLI Jobs, Stages, Steps, and external scheduling
---

# Job Workflows

A Job turns work that has already been verified into a repeatable one-run workflow. It does not provide the time trigger.

> **A Job decides what to do; the system scheduler decides when to do it.**

## The Job, Stage, and Step model

```text
Job
└── Stage 1
    ├── Step A
    └── Step B
└── Stage 2
    └── Step C
```

- Stages run in array order; Stage 2 does not begin until Stage 1 completes.
- Steps in one Stage may run concurrently; the next Stage waits for all of them.
- A failed Stage skips later Stages.
- When multiple worlds share a disk and concurrency was not explicitly requested, prefer one sequential Stage per world to reduce disk contention during first deployment.

## Jobs do not contain schedules

Do not copy the GUI’s `Once / Interval / Scheduled` automation model into a CLI Job. A CLI Job contains Config, World, Backup, or Process work; the operating-system scheduler owns the time trigger:

```text
systemd timer
        │
        ▼
minebackup-cli job run
        │
        ▼
       Job
```

Windows Task Scheduler invokes the same `job run` command. A Job does not store cron and does not become scheduled because a time field was added.

## List, inspect, and run Jobs

```bash
minebackup-cli --data-dir "$PROFILE" --json job list
minebackup-cli --data-dir "$PROFILE" --json job show --job <JobId>
minebackup-cli --data-dir "$PROFILE" --json job run --job <JobId>
```

Before the first Job run, execute Backup, History, and Verify separately for each Config/World. Then run the Job manually. Keep the structured Job/Stage/Step response and exit code for diagnosis.

## Job shape in a Manifest

A minimal Backup Step looks like this:

```json
{
  "jobId": "22222222-2222-4222-8222-222222222222",
  "name": "Backup all worlds",
  "stages": [
    {
      "stageId": "33333333-3333-4333-8333-333333333333",
      "name": "Backup",
      "steps": [
        {
          "stepId": "44444444-4444-4444-8444-444444444444",
          "name": "Backup primary world",
          "type": "backup",
          "target": {
            "configId": "11111111-1111-4111-8111-111111111111",
            "worldPath": "world"
          }
        }
      ]
    }
  ]
}
```

The UUIDs are illustrative; new objects need unique canonical UUID v4 values. Do not put time schedules, legacy GUI Tasks, Special Config, or legacy Service Mode fields into a Job.

## A safe deployment sequence

1. Generate or edit the Manifest with `profile init`.
2. Run `profile validate`, `profile diff`, and `profile apply --dry-run`.
3. Apply the Manifest and run `doctor`.
4. Use `config list` and `world list` to confirm the targets.
5. Complete one Backup → History → Verify → Restore dry-run separately.
6. Inspect the Job with `job list` and `job show`.
7. Run `job run --job <JobId>` manually once and check the result and exit code.
8. Configure systemd timer or Task Scheduler only afterward.

Do not add `--prune` to the initial Job flow, and do not make a confirmed real restore a default Step. A successful Backup Job still requires History and Verify checks.

## Failure, cancellation, and partial success

A Job can finish successfully, fail, be cancelled, or be partially successful. Partial success means that some Stages/Steps completed while others failed; it is not proof that the whole Job is recoverable.

When an error occurs:

- preserve the Job envelope, exit code, and `diagnostics`;
- locate the failed Stage/Step before checking its Config, World, and archive;
- Ctrl+C, SIGTERM, and Ctrl+Break request cancellation of started operations and process trees;
- do not delete History or archives as a way to “clean up” a failure.

A structurally valid Job can still fail because a world is missing, permissions are wrong, 7-Zip is unavailable, the Profile is busy, or cloud post-processing failed. Use `doctor` and [CLI troubleshooting](/en/docs/guides/minebackup-v1/cli/troubleshooting) next.
