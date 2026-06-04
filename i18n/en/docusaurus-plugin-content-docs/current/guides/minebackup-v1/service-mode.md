---
sidebar_position: 13
title: Service Mode (Windows)
description: MineBackup's Windows service capabilities, limitations, and recommendations
---

# Service Mode (Windows)

MineBackup includes Windows service configuration and installation interfaces, suitable for long-running unattended tasks.

It is recommended to enable service mode only after running in normal mode stably for a period of time.

## Key Capabilities

- Install / uninstall the service
- Start / stop the service
- Query service installation and running status
- Support for automatic and delayed start configuration

## Recommended Enablement Process

1. First verify task success rate in normal mode
2. Solidify task and log paths
3. Install the service and set the startup policy
4. Monitor service stability for 2-3 days

## Applicable Scenarios

- Scheduled backups on a dedicated machine
- Tasks that need to run persistently in the background

## Operations Recommendations

- Pre-grant read/write permissions for the service account on target directories
- Fix the log output location for easy inspection
- Keep a manual fallback entry (ability to stop the service and switch back to GUI)

## Boundary Notes

- Service mode is primarily for Windows
- On non-Windows platforms, the related interfaces are placeholder implementations

## Risk Notice

- Service mode has fewer on-screen prompts; errors rely more on logs
- Misconfigured tasks may silently fail repeatedly without being noticed

It is recommended to set up at least "one manual check per day."

## Tips

- First verify tasks are stable in normal mode before switching to service mode
- Make the log location clear for easier fault diagnosis
