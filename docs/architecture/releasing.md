---
title: 插件、SDK 与主程序发布流程
description: 按候选验证、NuGet 发布、插件冻结与分发、Host 内置载荷及 Setup 发布的顺序，完成可重复的跨仓库发布并核对公开产物。
reviewed_baseline: "development-1.10"
---

# 插件、SDK 与主程序发布流程

命令以 FolderRewind / MineRewind **1.10.0**、Plugin API / NuGet **3.17 / 3.17.0** 为例。修改版本、生成文件、上传成功和公开可恢复是不同阶段，发布状态以公开记录为准。PowerShell 命令返回非零退出码时，停止后续发布。

## 发布顺序与版本

1. 冻结 Host API 源码，测试 SDK 候选与独立插件，再发布 NuGet。
2. 等待公共源可恢复，冻结公开 SDK 的来源与哈希。
3. 用公共 SDK 构建、测试、打包插件，发布精确 `.frplugin` 与 SHA-256。
4. Host 内置同一份插件字节，更新预设与主程序版本，验证后运行 Release Setup。
5. 验证公开下载，再更新独立 Catalog 和网站。保留旧公开版本供回退。

| 身份 | 示例 | 修改位置与规则 |
| --- | --- | --- |
| Host 产品 / Windows 包版本 | `1.10.0` / `1.10.0.0` | `src/FolderRewind/FolderRewind.csproj`、`Package.appxmanifest`，两个 Installer `.wixproj` 的默认 `ProductVersion` |
| 插件产品版本 | `1.10.0` | `MineRewind/MineRewind.csproj` 的 `Version` 与 `manifest.json` 的 `version` 一致 |
| 插件所需 API | `3.17` | manifest `pluginApi`；同 major，Host minor 不低于插件要求 |
| NuGet SDK | `3.17.0` | Abstractions 项目的 `Version`、`PackageVersion`、`FileVersion`；插件精确固定 `PluginApiPackageVersion` |
| API 程序集身份 | `3.0.0.0` | API 3.x 保持不变，不跟随产品版本升级 |

仅升级产品时可以复用已公开且契约未变的 SDK；不要为配齐产品版本而把 API 包改为 `1.10.0`。

## 1. 准备各仓库并提交源码

分别检查 Host、MineRewind、Site；需要更新 Catalog 时也单独检查。嵌套目录不是 Host 子模块，不把插件源码加入 Host 解决方案。

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

按各仓库约定提交，采用 Conventional Commits，例如 `chore(release): 准备 1.10.0 发布`。发布所需分支和提交必须已推送；记录精确 SHA。API 源码先提交再打包，NuGet repository commit 应指向候选来源。候选、日志、截图和验收结果放在忽略的 `artifacts/`。

## 2. 验证并发布 NuGet

API 变化时同步维护公开契约基准，运行契约、Runtime、Host 和隔离恢复测试。核心测试入口会准备工具并顺序运行四个测试工程。

```powershell
Set-Location $HostRoot
dotnet restore FolderRewind.slnx -p:Platform=x64
./scripts/test/Invoke-SetupCoreTests.ps1
$ApiOutput = "artifacts/release-$ProductVersion/nuget"
dotnet pack src/FolderRewind.Plugin.Abstractions/FolderRewind.Plugin.Abstractions.csproj -c Release --no-restore -o $ApiOutput
$ApiCandidate = Join-Path $HostRoot "$ApiOutput/FolderRewind.Plugin.Abstractions.$ApiVersion.nupkg"
```

确认候选仅包含 BCL-only API DLL、XML 文档、README 和 NuGet 元数据，没有包依赖或 Host/Core/Runtime/WinUI 实现。发布前用独立候选 feed、空 NuGet 缓存验证 MineRewind，不能仅依赖机器上旧的同名缓存。

本地候选验证可创建只包含候选目录与 NuGet.org 的临时配置，用 `-p:PluginApiPackageVersion=$ApiVersion` 贯穿插件 restore、build 和 test；使用第 4 步的两组测试命令，不运行正式包发布。临时配置与缓存保存在 artifacts；避免修改正式 NuGet.Config 来长期保留本地源。自动工作流已执行这一候选覆盖过程。

### 默认分支自动发布

`plugin-v3-hardening.yml` 是现有 NuGet 自动发布入口。先把目标 API 源码集成到默认分支；`plugin_ref` 必须是已推送的插件提交。工作流从同一候选读取 SDK 版本，覆盖插件 `PluginApiPackageVersion`，测试 adapter 与 World，并要求 Host 测试及 x86/x64/ARM64 Release 构建通过。

```powershell
$DefaultBranch = gh repo view Leafuke/FolderRewind --json defaultBranchRef --jq .defaultBranchRef.name
$PluginCommit = git -C $PluginRoot rev-parse HEAD
gh workflow run plugin-v3-hardening.yml -R Leafuke/FolderRewind --ref $DefaultBranch -f publish_api=true -f "plugin_ref=$PluginCommit"
gh run list -R Leafuke/FolderRewind --workflow plugin-v3-hardening.yml --event workflow_dispatch --limit 5
# 核对本次运行的分支与 SHA，再把实际 ID 赋给 $ApiRunId。
gh run watch $ApiRunId -R Leafuke/FolderRewind --exit-status
```

`publish_api=true` 会真正发布，且仅允许默认分支；省略开关只做验证。旧默认分支上的成功运行不能证明当前开发分支已发布。使用 CI 发布时，下载本次 `plugin-api-candidate`，后续 `$ApiCandidate` 必须指向这份已测试候选。

### 已授权的人工发布

开发分支尚未集成默认分支等情况下，可在完成同等候选验证后，通过 [NuGet 上传页面](https://www.nuget.org/packages/manage/upload)提交**同一份**候选：登录 → Browse → 核对 ID、版本、依赖、README → Submit。也可以安全注入 `NUGET_API_KEY` 后使用 .NET 10.0.300+ 环境变量方式：

```powershell
if (-not $env:NUGET_API_KEY) { throw '请先安全设置 NUGET_API_KEY，不要写进仓库或日志。' }
dotnet nuget push $ApiCandidate --source https://api.nuget.org/v3/index.json
```

密钥由维护者或 CI Secret 提供，GitHub Secret 不能下载到本地。不要用 `--skip-duplicate` 掩盖版本冲突；已有版本先核对来源和 DLL，不覆盖，需要修正已发布契约时发布新版本。上传和索引规则见 [NuGet 官方说明](https://learn.microsoft.com/en-us/nuget/nuget-org/publish-a-package)。

## 3. 冻结公开 SDK

等待 NuGet 验证与索引完成，公共版本列表包含目标版本后，在**生成候选的 Host 提交**上运行：

```powershell
Set-Location $HostRoot
(Invoke-RestMethod 'https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json').versions
./scripts/release/Export-PublishedPluginContract.ps1 -CandidatePackage $ApiCandidate -PluginRoot $PluginRoot
Set-Location $PluginRoot
./tools/Verify-Contract.ps1
```

脚本检查 API 源码已提交、候选版本与 repository commit 一致，下载公开包，比对候选 DLL 和 `3.0.0.0` 程序集身份，然后更新 `contracts/source-manifest.json`、`contracts/feed` 与插件 SDK 版本。NuGet 签名可能改变整包哈希，因此记录公开包哈希，要求 DLL 哈希一致。

正式插件 `NuGet.Config` 只从 NuGet.org 恢复；`contracts/feed` 公开包只用于冻结来源与验证，不作为隐藏的本地恢复源。将新精确 `.nupkg` 纳入插件 Git 输入（需要时 `git add -f`），移除已被替代的契约包。`Export-MergeContract.ps1` 生成本地预览契约，不能代替公开发布。

确保 NuGet repository commit 可在远端访问。可为候选来源建立独立 SDK 标签，不使用主程序的产品 tag；确认标签不存在后执行：

```powershell
$ApiSourceCommit = git -C $HostRoot rev-parse HEAD
git -C $HostRoot tag "plugin-api/v$ApiVersion" $ApiSourceCommit
git -C $HostRoot push origin "refs/tags/plugin-api/v$ApiVersion"
```

## 4. 构建、测试和打包插件

更新插件项目和 manifest 产品版本；API 要求与实际能力一致。使用尚不存在的公共恢复缓存：

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

World 测试使用解决方案的默认项目平台，不额外传 `Platform=x64`，否则 `--no-build` 会查错目录。PackFrPlugin 单独生成可移植托管入口；manifest 声明 `any` 时不能装入 x64-only 入口。WinUI 主程序仍使用显式 x64/ARM64。

打包器使用独立 staging 和固定清单，包含根 manifest、领域 DLL、私有依赖、设置模式和 `contract-source.json`。检查版本、API、入口、架构与哈希；禁止携带 `FolderRewind.Plugin.Abstractions.dll`。安装、启用、取消、停用、升级/回退、失败恢复及真实游戏检查见[插件打包与发布](/docs/plugins/developing/packaging)。

## 5. 发布插件并冻结 Host 内置副本

插件 `release-plugin-v3.yml` 只构建、测试并上传 `MineRewind-frplugin` Actions artifact，**不自动创建 GitHub Release**，当前也不由 tag push 触发。可在已推送插件分支手动运行，并核对本次 SHA 对应的测试和产物。

提交最终插件版本、公开 SDK 来源与哈希、`.github/release-notes/v<版本>.md`，推送并记录 `$PluginCommit`。用 `gh release list` 明确确认版本不存在后，发布已验证的两个文件：

```powershell
$PluginCommit = git -C $PluginRoot rev-parse HEAD
gh release create "v$ProductVersion" $PluginPackage "$PluginPackage.sha256" -R Leafuke/FolderRewind-Plugin-Minecraft --target $PluginCommit --title "MineRewind $ProductVersion" --notes-file ".github/release-notes/v$ProductVersion.md"
```

公开下载并校验包与 SHA-256 后，把**同一份字节**复制到 Host `src/FolderRewind/Assets/Plugins/`，更新 `Assets/PluginPresets/minecraft-enhanced-experience.v1.json` 的 `packagePath`。只移除/移存被替代的仓库内置包，最终恰好一份 MineRewind 及校验文件。发布后不重新打包同版本，不用 `--clobber` 替换附件。

## 6. 验证并发布 FolderRewind

统一版本表中的主程序和安装器版本，准备 Host `.github/release-notes/v<版本>.md` 中英文说明。

```powershell
Set-Location $HostRoot
./scripts/release/Get-SetupReleaseMetadata.ps1
dotnet restore FolderRewind.slnx -p:Platform=x64
dotnet build FolderRewind.slnx -c Debug -p:Platform=x64 -p:GenerateAppxPackageOnBuild=false --no-restore
./scripts/test/Invoke-SetupCoreTests.ps1
```

UI 自动验收默认使用 winapp；安装、旧版本升级、卸载和真实游戏验收分别记录。`Test-Legacy182ReleasePayload.ps1` 检查构建/解包目录的单一插件、manifest 和哈希，不等于运行安装器。

提交并推送最终 Host 分支，记录 `$HostCommit`。只有决定正式公开主程序时执行：

```powershell
$HostBranch = git -C $HostRoot branch --show-current
$HostCommit = git -C $HostRoot rev-parse HEAD
gh workflow run release-setup.yml -R Leafuke/FolderRewind --ref $HostBranch
gh run list -R Leafuke/FolderRewind --workflow release-setup.yml --event workflow_dispatch --limit 5
gh run watch $SetupRunId -R Leafuke/FolderRewind --exit-status
gh release view "v$ProductVersion" -R Leafuke/FolderRewind --json url,isDraft,isPrerelease,assets
```

**Release Setup 会自动发布并设为 Latest，没有额外人工批准步骤。** 它核对版本、tag、来源 SHA，运行四组核心测试，构建 x64/ARM64 冻结候选，聚合测试、资源、ICE、生产身份、迁移载荷与精确哈希，再发布两份 Setup EXE 和各自 SHA-256，共四个附件。内部 MSI、测试支持程序集和故障注入产物不得作为公开附件。

报告保存在 `setup-release-report` artifact；`installerExperience: not-run` 不能解释成人工安装体验已通过。只需本地候选时，使用 `scripts/build/Build-SetupCandidate.ps1 -Platform x64 -Version $WindowsVersion`，ARM64 另行构建；不要为获取候选启动正式发布工作流。

## 7. Catalog、网站和发布后检查

确认插件公开下载、版本、哈希、API、架构与 manifest 相符后，按独立 Catalog 仓库规范更新 source 项并通过 CI。内置升级与 Catalog 更新是两个动作，见[官方目录与插件更新](/docs/plugins/developing/auto-update)。

### Catalog 日常维护

Catalog 是安装与更新的目录事实源。替换 Host 内置包不会自动更新 Catalog；先发布并重新下载插件 Release 附件，确认字节后再更新目录。

1. 在独立 `FolderRewind-Plugin-Catalog` 仓库修改 `source/<pluginId>.json`，同步产品版本、频道、固定 Release URL、SHA-256、`pluginApi`、`architectures` 与 `requestedHostServices`。
2. 同步 Artifact 摘要。目录中的 `artifactFormats`、`artifactTransformers`、`restoreStrategies` 是 ID 字符串数组，分别取 manifest 对象的 `formatId`、`transformerId`、`strategyId`，不要直接复制对象数组。API 或声明有变化时，必须完整核对这些字段。
3. 在 Catalog 根目录生成并验证目录，工具会下载实际插件并核对哈希与 manifest：

   ```powershell
   dotnet run --project tools/Catalog.Build -- --source source --output public/catalog.v1.json
   ```

   `public/catalog.v1.json` 由工具生成，不手工维护。提交 PR，检查 CI 后合入 `main`；现有工作流会重新生成并部署 GitHub Pages。最后检查[公开目录](https://leafuke.github.io/FolderRewind-Plugin-Catalog/catalog.v1.json)，并在 Host 中验证发现更新、下载和安装。
4. 只有声明未变的小版本更新，才适合使用 [`update-plugin.yml`](https://github.com/Leafuke/FolderRewind-Plugin-Catalog/blob/main/.github/workflows/update-plugin.yml)。它接收 `pluginId`、`version`、`artifactUrl`、`sha256` 并创建 PR，只更新版本、stable 频道及制品信息，不更新 API、架构、Host 服务和 Artifact 摘要。例如从 API 3.6 升到 3.17，需先完整更新声明，不能只运行该工作流。
5. 同时核对 `presets` 中的安装频道与条目一致；正式上架 stable 时，不应继续要求 candidate。当前格式每个 PluginId 只能有一个条目，旧版保留在 Releases。撤下条目或降低目录版本不会自动降级已安装插件；修复已公开版本时应发布更高版本，不覆盖同版本附件。

### 网站与公开资产

网站同步中英文说明、下载入口和真实已发布基准。在 Site 运行：

```powershell
Set-Location $SiteRoot
npm run check:i18n
npm run typecheck
npm run check:contracts
npm run build
npm run check:built-docs
```

网站现有 `check:release` / `prepare:release` 仍包含 1.9 的已审阅基准和版本约束；用于 1.10 前，需根据真实公开资产更新基准、约束和证据，不能把旧版通过解释为新版验收。博客日期使用正式发布时间的 Asia/Shanghai 日期。

最后确认：NuGet 空缓存恢复成功；插件公开包与内置副本哈希一致；Host tag 指向冻结 SHA；主程序公开附件恰好四个且校验匹配；Catalog 和网站指向同一版本。失败时保留同一候选和运行证据，修复后重新验证，不混用其他提交或运行的文件。
