---
sidebar_position: 17
title: Legacy Windows Service Cleanup
description: Inspection and safe cleanup boundaries for the old Windows Service Mode in MineBackup 1.16.2
---

# Legacy Windows Service Cleanup

MineBackup 1.16.2 **cannot install or start Windows Service Mode**. The current release keeps only a compatibility cleanup flow for inspecting and, when safe, removing a MineBackup Windows service left by an older release.

This is not a new background execution mode, and it does not convert normal configurations or unified tasks into a service.

:::note Modern server entry point

Legacy Windows Service Mode is completely different from the new CLI `serve`. For unattended server deployment, start with [CLI `serve`](/en/docs/guides/minebackup-v1/cli/serve), [Linux systemd](/en/docs/guides/minebackup-v1/cli/linux-systemd), or [Windows Task Scheduler](/en/docs/guides/minebackup-v1/cli/windows-task-scheduler). The legacy `--service` cleanup logic remains here, but it is not a new service mechanism.

:::

## What the current release supports

The Windows **Legacy Service Cleanup** tab can:

- inspect the configured legacy service name, ImagePath, and running state;
- determine whether the service really points to an older MineBackup executable;
- stop and remove a validated service after user confirmation and UAC elevation;
- leave the service unchanged when inspection fails, approval is cancelled, or stopping times out.

Non-Windows platforms do not provide this cleanup capability. The `--service` option is deprecated and disabled in 1.16; it does not start a service and normally returns an error immediately.

## Why removal is guarded

The cleanup code does not delete an arbitrary Windows service based only on its name. It rereads the service configuration and requires all of these ImagePath conditions:

1. ImagePath is non-empty and contains one standalone `--service` argument.
2. It has no arguments other than `--service`, with no duplicate token.
3. The executable path is absolute and its filename is `MineBackup.exe`.
4. The file exists and contains MineBackup resources.

If path, argument, executable, or resource validation fails, MineBackup reports the diagnostic and leaves the service untouched. This prevents a same-named service belonging to another installation from being removed.

## Recommended cleanup flow

1. Inspect the service in the **Legacy Service Cleanup** tab and record its name, ImagePath, state, and diagnostic.
2. Confirm that it is an old MineBackup service, and back up any profile, history, or archive data that must be retained.
3. Choose cleanup and approve the UAC prompt. The elevated helper accepts only the cleanup request; it cannot be combined with normal startup, configuration selection, or `--service`.
4. The helper validates the service again. If it is running, it requests a stop and waits up to 15 seconds.
5. It calls the Windows deletion operation only after the service is stopped and validation still succeeds.
6. Inspect the tab again. Cleanup removes only the service registration; it does not delete the profile, world directories, or archive files.

Maintainers can also run the dedicated entry point on Windows:

```text
MineBackup.exe --cleanup-legacy-service "<service-name>"
```

This option must be used by itself and performs the same ImagePath, resource, and state checks. Do not substitute `--service`, and do not bypass validation with `sc delete`.

## If cleanup is refused

- UAC was cancelled: the service was not changed; start the flow again from settings.
- ImagePath is unsafe, the EXE is missing, or resources do not match: do not delete it manually until you confirm whether it belongs to another installation.
- The service did not stop within 15 seconds: the cleanup code does not delete it; investigate the old environment and retry later.
- The service was not found: the recorded name is not installed; MineBackup does not create a replacement service.

After cleanup, read [Troubleshooting](/en/docs/guides/minebackup-v1/troubleshooting) and [Logging and diagnostics](/en/docs/guides/minebackup-v1/logging-and-diagnostics) to confirm that the application is using the normal GUI/task workflow. In 1.16.2 the boundary is “inspect and clean up a legacy service,” not “continue maintaining Service Mode.”
