# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

To preview the English locale:

```bash
npm run start:en
```

## Quality Checks

```bash
npm run check:i18n
npm run typecheck
npm run build
```

`check:i18n` verifies that the English documentation and blog content stay in sync with the default Chinese locale. The local search index is generated during `npm run build` and includes documentation and blog content for each locale. When adding or changing content, update the corresponding English translation files and run the parity check.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


## 1.9 released documentation baseline

Current documentation targets FolderRewind 1.9.3, MineRewind 1.9.5 and Plugin
API 3.6 / public SDK 3.6.0. Assembly identity remains 3.0.0.0. Maintain the
Chinese and English pages together, retain existing routes/anchors, and update
`audit/pages.json` when reviewing content. Independent MineBackup tutorials and
historical release facts keep their own baselines.

```powershell
npm ci
npm run check:all
```

This runs release-policy tests, translation/TypeScript/contract/image/SEO checks,
both locale builds and built-page/route/anchor validation. Tutorial blocks load
actual example sources rather than duplicated C# snippets.

### Public SDK examples

.NET 10, Node 24 and Python 3.10+ are required. Use a fresh package cache and the
public NuGet feed; neither plugin references Host/Runtime implementation code.
Runtime is referenced only by the QA harness. For the sibling Host checkout:

```powershell
$env:NUGET_PACKAGES = (Join-Path (Get-Location) 'artifacts/public-sdk-packages')
dotnet restore examples/plugins/MinimalPlugin --source https://api.nuget.org/v3/index.json --no-http-cache
dotnet restore examples/plugins/GameRewind --source https://api.nuget.org/v3/index.json --no-http-cache
node scripts/pack-plugin.mjs MinimalPlugin
node scripts/pack-plugin.mjs GameRewind
dotnet run --project tools/ExampleValidation -p:HostRoot=.. -- artifacts/examples
```

CI checks out the immutable Host ref from `audit/baseline.json` for Runtime
validation. Compilation and Runtime checks do not certify real game loading.

### Separate publication and desktop acceptance checks

```powershell
npm run check:release
npm run check:acceptance
```

`check:release` verifies a clean public SDK restore, stable Host metadata, exactly
four x64/ARM64 Setup/checksum assets, downloaded bytes and the immutable plugin
Catalog binding. It is used by main CI, predeploy and `prepare:release`.
Network errors and mismatches fail the gate. It writes local evidence under
`artifacts/release-readiness.json`.

`check:acceptance` separately reports the eight desktop/game scenarios and final
screenshots, returning nonzero while they remain pending. A public release may
be documented without claiming those scenarios passed. This task does not
resume GUI automation or deploy. Remaining candidate screenshots retain their
actual 1.9.2.0/API3.5 labels; the obsolete discovery image is no longer shown.

`prepare:release` uses actual GitHub metadata and the Asia/Shanghai publication
date to generate bilingual notices from reviewed templates. It refuses to
overwrite existing posts. The 1.9.3 notices already exist and were reviewed
against the official release body. `audit/catalog-proposal.json` is a retained
historical candidate proposal, not an instruction to edit the public Catalog.
