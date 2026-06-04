---
sidebar_position: 14
title: Troubleshooting
description: Diagnosing MineBackup issues from common logs and symptoms
---

# Troubleshooting

It is recommended to troubleshoot in order: "basics first, then advanced":

1. Paths and permissions
2. Compression program availability
3. Backup mode and chain integrity
4. Integration communication
5. Automated tasks

## 1) Compression program not found

Symptom: Backup fails immediately after starting, reporting that `7z.exe` cannot be found.

Fix: Re-specify the compression program path in settings, then run a manual backup to verify.

Note: If you are using a portable directory, re-confirm the compression program path after moving the program.

## 2) Backup fails while the game is running

Symptom: Reports file lock or snapshot failure.

Fix:

- Enable hot backup
- Configure a writable `snapshotPath`
- If using integration, verify that the KnotLink link is working

Recommended approach: First verify that "a normal backup after closing the game" succeeds, then move on to the hot link.

## 3) Smart backup cannot be restored

Symptom: Reports that the baseline Full is missing or the chain is broken.

Fix:

- Check whether the most recent Full still exists in history
- Run a new Full to reset the chain

If the history chain has been chaotic for a long time, consider creating a new configuration and re-establishing the backup baseline.

## 4) Automated tasks not running as expected

Symptom: Interval tasks don't trigger or produce no output after triggering.

Fix:

- Check whether the task is enabled
- Validate the config index and world index
- Reproduce with a single-task mode first

Additional checks:

- Whether the trigger mode matches the current time window
- Whether parallel tasks are causing resource contention

## 5) Post-restore state doesn't match expectations

Fix:

- Reproduce in a test world first
- Use "pre-restore backup" to keep a rollback point
- If necessary, restore from a specific backup file instead

## 6) How to quickly determine "is it a config issue or a program issue"

The quickest method:

1. Create a minimal configuration (1 world, Full mode, no filters)
2. Run the backup and restore loop
3. If the minimal config succeeds, the problem is likely in the original configuration rules
4. If the minimal config fails, look at the environment or program chain

This approach can significantly shorten troubleshooting time.
