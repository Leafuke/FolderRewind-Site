# FolderRewind website

The bilingual documentation and release log use Docusaurus. Current FolderRewind
content follows the released **1.10.0** Host, **MineRewind 1.10.0** and public
**Plugin API 3.17 / SDK 3.17.0**. MineBackup guides retain their independent product
baseline. Historical announcements retain their release facts.

## Develop and check

Use Node.js 24. Plugin examples also require .NET 10 and Python 3.10+.

```powershell
npm ci
npm run start
# English development preview:
npm run start:en
```

Keep Chinese files in `docs/` and English counterparts in
`i18n/en/docusaurus-plugin-content-docs/current/` aligned. Preserve existing routes
and anchors or supply a redirect when consolidating a guide.

```powershell
npm run check:all
```

This runs translation tests, bilingual parity, types, contracts, images, SEO,
both production locale builds and built route/anchor checks. `npm run serve`
previews the result in `build/`.

## Public SDK examples

Examples reference the public Abstractions package. Tutorial code blocks read
their actual source files.

```powershell
$env:NUGET_PACKAGES = Join-Path (Get-Location) 'artifacts/public-sdk-packages'
dotnet restore examples/plugins/MinimalPlugin --source https://api.nuget.org/v3/index.json --no-http-cache
dotnet restore examples/plugins/GameRewind --source https://api.nuget.org/v3/index.json --no-http-cache
node scripts/pack-plugin.mjs MinimalPlugin
node scripts/pack-plugin.mjs GameRewind
$hostSource = (Resolve-Path ../).Path
dotnet run --project tools/ExampleValidation "-p:HostRoot=$hostSource" -- artifacts/examples
```

Use the exact Host commit in `audit/baseline.json` for Runtime validation. CI
checks out that commit. `HostRoot` points to the checkout containing `src/`.

## Release and screenshots

`audit/baseline.json` stores reviewed Host/API/SDK versions, separate public and
bundled plugin hashes, exact release tags and original anchors. `audit/pages.json`
indexes the documentation. Local reports and raw captures go in ignored
`artifacts/`.

```powershell
npm run check:release
python scripts/prepare-screenshots.py --input artifacts/refresh-110/captures
```

The release check verifies public SDK restoration, Setup/checksum assets, plugin
bytes and Catalog binding. Screenshot preparation writes document-only WebP pairs
and manifests; homepage resources have their own existing manifest. Capture real
UI with winapp, review each scene and retain its original PNG and release identity.

`npm run prepare:release` reads reviewed templates and the official publication
date in Asia/Shanghai. Existing posts require an explicit edit. Desktop/game
scenarios are tracked separately with `npm run check:acceptance`.
