---
title: Development, builds and verification
description: Build, core-test, isolated recovery and performance entry points for the 1.10 development layout.
reviewed_baseline: "development-1.10"
---

# Development, builds and verification

> This page describes the 1.10 development working tree, not a newly published release or SDK.

Use Windows and the WinUI development toolchain. global.json selects the SDK; central package configuration and project overrides declare dependencies. Production projects live in src and tests in tests. Ordinary Host builds do not require website, MineRewind or Catalog sources.

## Build and test

```powershell
$sevenZip = ./scripts/build/Stage-SevenZip.ps1 -Platform x64 | Select-Object -Last 1
dotnet restore FolderRewind.slnx -p:Platform=x64
dotnet build FolderRewind.slnx -c Debug -p:Platform=x64 -p:GenerateAppxPackageOnBuild=false "-p:SevenZipExecutable=$sevenZip" --no-restore
./scripts/test/Test-RepositoryLayout.ps1
./scripts/test/Invoke-SetupCoreTests.ps1
dotnet test tests/FolderRewind.Core.Recovery.Tests/FolderRewind.Core.Recovery.Tests.csproj -c Release -p:FolderRewindFaultInjection=true
```

The first preparation requires `7z.exe` on PATH for extraction. Prepare an architecture-matched 7za.exe through `scripts/build/Stage-SevenZip.ps1` and select it with `SevenZipExecutable`. The core test entry point prepares hash-pinned rclone/OpenList tools and uses isolated directories and local backends. Prepare that test environment before running individual projects directly. Fault-recovery acceptance and probes have separate outputs; shipping Core excludes fault hooks.

PowerShell tools locate the root solution from their own path. Relative path parameters resolve against the repository root, and the caller's working directory is restored. Cross-repository integration scripts expose repository path parameters. Neighboring checkouts are not implicit source dependencies of ordinary Host or plugin builds.

<span id="packaging" />

## Installer payloads

`scripts/build` owns builds, compression-tool preparation and installer payloads; `scripts/test` owns resource, production-identity and isolated-install checks; `scripts/release` owns metadata and release orchestration. The MSI channel selects `FolderRewindDistributionChannel=Msi` and bundles both .NET and Windows App SDK. Check each x64/ARM64 payload's compressor, Core DLL, resources and licenses, excluding test assemblies and fault probes.

Release Setup checks manifest/project version agreement, reads `.github/release-notes/v<version>.md`, and verifies the current run's tests and artifact hashes. Public downloads are Setup EXE files and checksums; MSI is an internal payload. Running the release workflow publishes; ordinary builds and tests do not. Installer experience that was not tested must remain marked not run.

<span id="performance" />

## Performance comparison

Use `tools/BackupPerformanceHost` and `benchmarks/performance`, freezing complete baseline and candidate outputs. Keep inputs, compressor, measurement code, parameters and timing boundaries identical. Use distinct, nonexistent output directories and alternate execution order to reduce cache/order effects. Fixed synthetic cases cover Full/Smart, many small files, history growth and single-byte changes; select relevant matrices according to risk.

Verify results, archive contents and complete samples before interpreting elapsed time, CPU, memory or I/O. Keep binary hashes and raw results in artifacts. Service benchmarks do not replace UI, real-cloud or real-game acceptance, and a single working-set decrease is not evidence of resource lifetime correctness.

## Documentation and contributions

Host docs retains terminology, effective architectural decisions and long-lived protocol/safety constraints. Tutorials and architecture introductions live on this bilingual website. Plans, progress, screenshots, reviews and acceptance reports are not permanent source documentation; retrieve old records through Git history. Describe the reason, actual validation and remaining limits when proposing changes.
