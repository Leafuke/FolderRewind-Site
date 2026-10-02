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


## 1.9 maintenance and release branch

Work stays on `codex/docs-1.9-refresh` until the public-release gate is satisfied.
Every changed current document has a Chinese and English counterpart and a
source audit entry. Keep existing routes and compatibility anchors. Independent
MineBackup files are hash-protected; historical posts retain their dated facts.

```powershell
npm ci
npm run check:all
```

`check:all` checks translations, TypeScript, current API contracts, images,
metadata, both locale builds, both sitemaps and original routes/anchors.
C# tutorial blocks import the actual example source via the raw source loader.

### Candidate examples (SDK 3.5.0 is not yet public)

.NET10 and Python3.10+ are required. QA alone may pack the pinned Host SDK into
an isolated candidate feed. Plugins still have only a public PackageReference,
never a Host/Runtime ProjectReference. For a local sibling checkout:

```powershell
dotnet pack ../FolderRewind.Plugin.Abstractions -c Release -o artifacts/feed
$env:NUGET_PACKAGES = (Join-Path (Get-Location) 'artifacts/candidate-packages')
dotnet restore examples/plugins/MinimalPlugin --source artifacts/feed
dotnet restore examples/plugins/GameRewind --source artifacts/feed
node scripts/pack-plugin.mjs MinimalPlugin
node scripts/pack-plugin.mjs GameRewind
dotnet run --project tools/ExampleValidation -p:HostRoot=.. -- artifacts/examples
```

The validator references Runtime only as a QA harness; normal plugin users do
not need Host source. See `audit/MANUAL_ACCEPTANCE.md` for the eight desktop/game
scenarios. Compile/runtime tests do not certify those scenarios.

### Publication gate

```powershell
npm run check:release
```

It must reject absent public SDK, nonpublic Host/plugin assets, incorrect
Catalog binding, incomplete actual acceptance or final-version screenshots.
The deploy command has the same predeploy hook, and main CI includes the gate.
Candidate screenshots explicitly identify1.9.2.0/API3.5 and Chinese UI.
Do not fabricate a1.9 publication date/tag while preparing docs. NuGet only
listed3.0.0 and official latest releases were1.8.2 at the initial audit.
