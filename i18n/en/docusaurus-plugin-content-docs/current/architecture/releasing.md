---
title: Releasing plugins, the SDK and FolderRewind
description: A repeatable cross-repository release sequence covering candidate verification, NuGet publication, frozen plugins, bundled Host payloads and public Setup assets.
reviewed_baseline: "development-1.10"
---

# Releasing plugins, the SDK and FolderRewind

Commands use FolderRewind / MineRewind **1.10.0** and Plugin API / NuGet **3.17 / 3.17.0** as examples. Version changes, file generation, upload success and public restore are separate stages; public records determine publication status. Stop subsequent release steps on any nonzero PowerShell command exit code.

## Release order and versions

1. Freeze Host API sources, test the SDK candidate with the independent plugin, then publish NuGet.
2. Wait for public restore, then freeze public SDK provenance and hashes.
3. Build, test and package the plugin with the public SDK; publish the exact `.frplugin` and SHA-256.
4. Bundle the same bytes in Host, update the preset and application versions, verify, then run Release Setup.
5. Verify public downloads before updating the independent Catalog and website. Retain previous public releases for rollback.

| Identity | Example | Location and rule |
| --- | --- | --- |
| Host product / Windows package | `1.10.0` / `1.10.0.0` | `src/FolderRewind/FolderRewind.csproj`, `Package.appxmanifest`, default `ProductVersion` in both Installer `.wixproj` files |
| Plugin product | `1.10.0` | `Version` in `MineRewind/MineRewind.csproj` matches `version` in `manifest.json` |
| Required plugin API | `3.17` | Manifest `pluginApi`; matching major, Host minor at least the required minor |
| NuGet SDK | `3.17.0` | Abstractions `Version`, `PackageVersion`, `FileVersion`; exact plugin `PluginApiPackageVersion` |
| API assembly identity | `3.0.0.0` | Unchanged throughout API 3.x, independent of product versions |

A product-only update can reuse an unchanged, published SDK. Do not rename the API package to `1.10.0` to match product versions.

## 1. Prepare repositories and commit sources

Check Host, MineRewind and Site independently, and Catalog when needed. Nested directories are not Host submodules. Never add plugin sources to the Host solution.

```powershell
$HostRoot = 'D:\Programs\FolderRewind'
$PluginRoot = Join-Path $HostRoot 'FolderRewind-Plugin-Minecraft'
$SiteRoot = Join-Path $HostRoot 'FolderRewind-Site'
$ProductVersion = '1.10.0'
$WindowsVersion = '1.10.0.0'
$ApiVersion = '3.17.0'
git -C $HostRoot status --short
git -C $PluginRoot status --short
git -C $SiteRoot status --short
```

Commit under each repository's conventions using Conventional Commits, for example `chore(release): 准备 1.10.0 发布`. Push required branches and commits, recording exact SHAs. Commit API sources before packing so the NuGet repository commit identifies the candidate's source. Keep candidates, logs, screenshots and acceptance results in ignored `artifacts/` directories.

## 2. Verify and publish NuGet

For API changes, update the public contract baseline and run contract, Runtime, Host and isolated recovery tests. The core test entry point prepares tools and runs all four projects sequentially.

```powershell
Set-Location $HostRoot
dotnet restore FolderRewind.slnx -p:Platform=x64
./scripts/test/Invoke-SetupCoreTests.ps1
$ApiOutput = "artifacts/release-$ProductVersion/nuget"
dotnet pack src/FolderRewind.Plugin.Abstractions/FolderRewind.Plugin.Abstractions.csproj -c Release --no-restore -o $ApiOutput
$ApiCandidate = Join-Path $HostRoot "$ApiOutput/FolderRewind.Plugin.Abstractions.$ApiVersion.nupkg"
```

The candidate must contain only the BCL-only API DLL, XML documentation, README and NuGet metadata, with no package dependencies or Host/Core/Runtime/WinUI implementation. Verify MineRewind using a separate candidate feed and empty NuGet cache before publication; old same-version machine caches are insufficient.

For local candidate verification, create a temporary configuration containing only the candidate directory and NuGet.org. Pass `-p:PluginApiPackageVersion=$ApiVersion` through plugin restore, build and test, using both test commands in step 4 without publishing production packages. Keep temporary configuration and caches in artifacts rather than retaining a local source in production NuGet.Config. The automated workflow already performs this candidate override.

### Automated default-branch publication

`plugin-v3-hardening.yml` is the existing automated NuGet publication entry point. Integrate intended API sources into the default branch first; `plugin_ref` must identify a pushed plugin commit. The workflow reads the SDK version from the same candidate, overrides plugin `PluginApiPackageVersion`, tests the adapter and World, and requires Host tests and x86/x64/ARM64 Release builds.

```powershell
$DefaultBranch = gh repo view Leafuke/FolderRewind --json defaultBranchRef --jq .defaultBranchRef.name
$PluginCommit = git -C $PluginRoot rev-parse HEAD
gh workflow run plugin-v3-hardening.yml -R Leafuke/FolderRewind --ref $DefaultBranch -f publish_api=true -f "plugin_ref=$PluginCommit"
gh run list -R Leafuke/FolderRewind --workflow plugin-v3-hardening.yml --event workflow_dispatch --limit 5
# Check this run's branch and SHA, then assign its actual ID to $ApiRunId.
gh run watch $ApiRunId -R Leafuke/FolderRewind --exit-status
```

`publish_api=true` actually publishes and is allowed only on the default branch; omitting it only verifies. Success on an older default branch is not publication evidence for the current development branch. For CI publication, download this run's `plugin-api-candidate`; subsequent `$ApiCandidate` must refer to those tested bytes.

### Authorized manual publication

When development sources have not reached the default branch, for example, equivalent candidate validation can precede submitting the **same** candidate through the [NuGet upload page](https://www.nuget.org/packages/manage/upload): sign in → Browse → verify ID, version, dependencies and README → Submit. Alternatively, securely supply `NUGET_API_KEY` and use environment-variable support in .NET 10.0.300+:

```powershell
if (-not $env:NUGET_API_KEY) { throw 'Supply NUGET_API_KEY securely first; never write it to the repository or logs.' }
dotnet nuget push $ApiCandidate --source https://api.nuget.org/v3/index.json
```

A maintainer or CI Secret supplies the key; GitHub Secrets cannot be downloaded locally. Do not hide version conflicts with `--skip-duplicate`. Verify existing versions' provenance and DLLs instead of replacing them; corrections to a published contract need a new version. See the [official NuGet documentation](https://learn.microsoft.com/en-us/nuget/nuget-org/publish-a-package) for upload and indexing rules.

## 3. Freeze the public SDK

Wait for NuGet validation and indexing. Once the public index includes the version, run this from the **Host commit that produced the candidate**:

```powershell
Set-Location $HostRoot
(Invoke-RestMethod 'https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json').versions
./scripts/release/Export-PublishedPluginContract.ps1 -CandidatePackage $ApiCandidate -PluginRoot $PluginRoot
Set-Location $PluginRoot
./tools/Verify-Contract.ps1
```

The script checks committed API sources, candidate version and repository commit, downloads the public package, compares candidate DLLs and assembly identity `3.0.0.0`, then updates `contracts/source-manifest.json`, `contracts/feed` and the plugin SDK version. Registry signing can change the complete package hash, so record the public package hash while requiring identical DLL hashes.

Production plugin `NuGet.Config` restores only from NuGet.org. The public package in `contracts/feed` freezes provenance for verification, not as a hidden local restore source. Track the new exact `.nupkg` as a plugin Git input (`git add -f` when needed), removing superseded contract packages. `Export-MergeContract.ps1` produces local preview contracts and does not replace public publication.

Ensure the NuGet repository commit is publicly accessible. An independent SDK tag can identify the candidate source without using the Host product tag. After establishing that the tag does not exist, run:

```powershell
$ApiSourceCommit = git -C $HostRoot rev-parse HEAD
git -C $HostRoot tag "plugin-api/v$ApiVersion" $ApiSourceCommit
git -C $HostRoot push origin "refs/tags/plugin-api/v$ApiVersion"
```

## 4. Build, test and package the plugin

Update product versions in the plugin project and manifest, keeping API requirements consistent with actual capabilities. Use a previously nonexistent public restore cache:

```powershell
Set-Location $PluginRoot
$PublicCache = "artifacts/public-sdk-$ApiVersion-$([guid]::NewGuid().ToString('N'))"
dotnet restore FolderRewind-Plugin-Minecraft.slnx -p:Platform=x64 --configfile NuGet.Config --packages $PublicCache --no-http-cache
dotnet build FolderRewind-Plugin-Minecraft.slnx -c Release -p:Platform=x64 --no-restore
dotnet test MineRewind.Tests/MineRewind.Tests.csproj -c Release -p:Platform=x64 --no-restore --no-build
dotnet test MineRewind.World.Tests/MineRewind.World.Tests.csproj -c Release --no-restore --no-build
dotnet msbuild MineRewind/MineRewind.csproj /t:PackFrPlugin /p:Configuration=Release "/p:Version=$ProductVersion"
$PluginPackage = Join-Path $PluginRoot "artifacts/MineRewind-$ProductVersion.frplugin"
Get-Content "$PluginPackage.sha256"
```

World tests use the solution's default project platform. Adding `Platform=x64` makes `--no-build` search the wrong directory. PackFrPlugin independently produces a portable managed entry; a manifest declaring `any` cannot ship an x64-only entry. WinUI Host still uses explicit x64/ARM64.

The packer uses isolated staging and an approved inventory containing the root manifest, domain DLL, private dependencies, settings schema and `contract-source.json`. Verify version, API, entry, architecture and hashes. Never bundle `FolderRewind.Plugin.Abstractions.dll`. See [plugin packaging and publication](/docs/plugins/developing/packaging) for installation, activation, cancellation, deactivation, upgrade/rollback, recovery and real-game checks.

## 5. Publish the plugin and freeze the Host copy

Plugin `release-plugin-v3.yml` only builds, tests and uploads the `MineRewind-frplugin` Actions artifact. It **does not create a GitHub Release** and is not currently triggered by tag pushes. Dispatch it on a pushed plugin branch and check tests and artifacts against that run's SHA.

Commit final plugin versions, public SDK provenance/hashes and `.github/release-notes/v<version>.md`, push and record `$PluginCommit`. Use `gh release list` to establish that the version does not exist before publishing the two verified files:

```powershell
$PluginCommit = git -C $PluginRoot rev-parse HEAD
gh release create "v$ProductVersion" $PluginPackage "$PluginPackage.sha256" -R Leafuke/FolderRewind-Plugin-Minecraft --target $PluginCommit --title "MineRewind $ProductVersion" --notes-file ".github/release-notes/v$ProductVersion.md"
```

Download and verify the public package and SHA-256, then copy the **same bytes** to Host `src/FolderRewind/Assets/Plugins/` and update `packagePath` in `Assets/PluginPresets/minecraft-enhanced-experience.v1.json`. Remove or move only superseded repository bundles, finishing with exactly one MineRewind package and checksum. Do not rebuild a published version or replace attachments with `--clobber`.

## 6. Verify and publish FolderRewind

Align application and installer versions in the table and prepare bilingual Host `.github/release-notes/v<version>.md`.

```powershell
Set-Location $HostRoot
./scripts/release/Get-SetupReleaseMetadata.ps1
dotnet restore FolderRewind.slnx -p:Platform=x64
dotnet build FolderRewind.slnx -c Debug -p:Platform=x64 -p:GenerateAppxPackageOnBuild=false --no-restore
./scripts/test/Invoke-SetupCoreTests.ps1
```

Automated UI acceptance uses winapp by default; record installation, older-version upgrade, uninstall and real-game acceptance separately. `Test-Legacy182ReleasePayload.ps1` verifies a single plugin, manifest and hashes in build/unpacked payloads, not installer execution.

Commit and push the final Host branch, recording `$HostCommit`. Execute this only when choosing to publish the application publicly:

```powershell
$HostBranch = git -C $HostRoot branch --show-current
$HostCommit = git -C $HostRoot rev-parse HEAD
gh workflow run release-setup.yml -R Leafuke/FolderRewind --ref $HostBranch
gh run list -R Leafuke/FolderRewind --workflow release-setup.yml --event workflow_dispatch --limit 5
gh run watch $SetupRunId -R Leafuke/FolderRewind --exit-status
gh release view "v$ProductVersion" -R Leafuke/FolderRewind --json url,isDraft,isPrerelease,assets
```

**Release Setup automatically publishes and marks Latest, with no additional manual approval.** It checks version, tag and source SHA, runs four core test suites, builds frozen x64/ARM64 candidates, aggregates tests, resources, ICE, production identity, migration payload and exact hash evidence, then publishes two Setup EXEs and their SHA-256 files: four attachments total. Internal MSIs, test support assemblies and fault-injection payloads must not be public attachments.

Reports are preserved in `setup-release-report`. `installerExperience: not-run` does not mean manual installation experience passed. For local candidates only, use `scripts/build/Build-SetupCandidate.ps1 -Platform x64 -Version $WindowsVersion`, building ARM64 separately. Do not start production publication merely to obtain candidates.

## 7. Catalog, website and post-release checks

Verify public plugin download, version, hash, API, architecture and manifest before updating source entries under the independent Catalog repository's conventions and passing CI. Bundled upgrades and Catalog updates are separate actions; see [official Catalog and plugin updates](/docs/plugins/developing/auto-update).

Update both website languages, download links and genuinely published baselines. From Site, run:

```powershell
Set-Location $SiteRoot
npm run check:i18n
npm run typecheck
npm run check:contracts
npm run build
npm run check:built-docs
```

Existing website `check:release` / `prepare:release` still include reviewed 1.9 baselines and version restrictions. Before using them for 1.10, update baselines, restrictions and evidence from actual public assets; success for an older version does not validate the new one. Blog dates use official publication time in Asia/Shanghai.

Finally check empty-cache NuGet restore, matching public/bundled plugin hashes, Host tag at the frozen SHA, exactly four public application attachments with valid checksums, and matching Catalog/website versions. Preserve failed candidates and run evidence, fix and reverify, without mixing files from other commits or runs.
