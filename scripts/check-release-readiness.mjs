import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';

export function checkManualAcceptance(evidence) {
  const failures = [];
  if (!evidence.finalScreenshotsVerified) failures.push('Final released-version screenshots are incomplete.');
  if (evidence.manualScenarios?.length !== 8 || evidence.manualScenarios.some(s => s.status !== 'passed'))
    failures.push('Eight isolated desktop/game acceptance scenarios are incomplete.');
  return failures;
}

function restorePublicSdk(sdk) {
  const cache = fs.mkdtempSync(path.join(os.tmpdir(), 'fr-public-restore-'));
  try {
    const project = path.join(cache, 'Probe.csproj');
    fs.writeFileSync(project, `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework></PropertyGroup><ItemGroup><PackageReference Include="FolderRewind.Plugin.Abstractions" Version="${sdk}" /></ItemGroup></Project>`);
    return spawnSync('dotnet', ['restore', project, '--packages', path.join(cache, 'packages'), '--source', 'https://api.nuget.org/v3/index.json', '--no-http-cache'], {stdio: 'inherit'}).status === 0;
  } finally {
    fs.rmSync(cache, {recursive: true, force: true});
  }
}

// Tests inject dependencies; the deployment CLI always uses public network data.
export async function checkPublicRelease({baseline, evidence, fetchImpl = fetch, restoreSdk = restorePublicSdk}) {
  const failures = [];
  const downloads = [];
  const api = baseline.api.split('.').map(Number);
  if (!/^\d+\.\d+$/.test(baseline.api) || !/^\d+\.\d+\.\d+$/.test(baseline.sdk))
    throw new Error('Invalid reviewed API/SDK version.');
  async function response(url) {
    const result = await fetchImpl(url, {headers: {'User-Agent': 'FolderRewind-docs-release-check'}, signal: AbortSignal.timeout(300000)});
    if (!result.ok) throw new Error(`${url}: HTTP ${result.status}`);
    return result;
  }
  async function json(url) { return (await response(url)).json(); }
  async function hash(url) {
    const result = await response(url);
    if (!result.body) throw new Error(`Empty download: ${url}`);
    const digest = crypto.createHash('sha256');
    for await (const chunk of result.body) digest.update(chunk);
    return digest.digest('hex');
  }
  async function release(repo, tag) {
    const result = await json(`https://api.github.com/repos/Leafuke/${repo}/releases/tags/${tag}`);
    if (result.tag_name !== tag || result.draft || result.prerelease || !result.published_at)
      failures.push(`${repo} ${tag} is not the expected published stable release.`);
    return result;
  }
  async function verify(asset, expected) {
    const actual = await hash(asset.browser_download_url);
    downloads.push({name: asset.name, sha256: actual, expectedSha256: expected});
    if (actual !== expected) failures.push(`Downloaded checksum mismatch: ${asset.name}`);
  }
  const sdkVersions = await json('https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json');
  if (!sdkVersions.versions.includes(baseline.sdk)) failures.push(`Public SDK ${baseline.sdk} is not listed.`);
  else if (!await restoreSdk(baseline.sdk)) failures.push('Clean public SDK restore failed.');
  const hostTag = evidence.officialHostTag;
  if (!/^v?1\.9\.\d+(?:\.\d+)?$/.test(hostTag ?? '') || hostTag !== baseline.latestHostRelease) {
    failures.push('Official Host tag does not match the reviewed 1.9 release.');
  } else {
    const host = await release('FolderRewind', hostTag);
    if (host.published_at !== evidence.officialHostPublishedAt)
      failures.push('Recorded Host publication date does not match official metadata.');
    const version = baseline.hostProjectVersion;
    if (version.replace(/\.0$/, '') !== hostTag.replace(/^v/, '').replace(/\.0$/, ''))
      failures.push('Host project version does not match tag.');
    const allowed = ['x64', 'arm64'].flatMap(arch => ['.exe', '.exe.sha256'].map(suffix => `FolderRewind_${version}_Setup_${arch}${suffix}`));
    if (host.assets.length !== allowed.length || allowed.some(name => host.assets.filter(a => a.name === name).length !== 1))
      failures.push('Host release must contain exactly the four reviewed Setup/checksum assets.');
    for (const arch of ['x64', 'arm64']) {
      const name = `FolderRewind_${version}_Setup_${arch}.exe`;
      const exe = host.assets.find(a => a.name === name);
      const checksum = host.assets.find(a => a.name === `${name}.sha256`);
      if (!exe || !checksum) continue;
      const match = /^([a-fA-F0-9]{64})(?:\s+\*?(.+))?$/.exec((await (await response(checksum.browser_download_url)).text()).trim());
      if (!match || (match[2] && match[2] !== name)) failures.push(`Invalid checksum file: ${name}`);
      else await verify(exe, match[1].toLowerCase());
    }
  }
  const pluginTag = `v${baseline.plugin}`;
  const pluginUrl = `https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases/download/${pluginTag}/MineRewind-${baseline.plugin}.frplugin`;
  const plugin = await release('FolderRewind-Plugin-Minecraft', pluginTag);
  const asset = plugin.assets.find(a => a.name === `MineRewind-${baseline.plugin}.frplugin`);
  if (!asset || asset.browser_download_url !== pluginUrl) failures.push('Official plugin asset missing or URL mismatched.');
  else await verify(asset, baseline.pluginSha256);
  const catalog = await json('https://leafuke.github.io/FolderRewind-Plugin-Catalog/catalog.v1.json');
  const entries = catalog.entries?.filter(p => p.pluginId === 'com.folderrewind.minerewind') ?? [];
  const entry = entries[0];
  if (catalog.schemaVersion !== 1 || entries.length !== 1 || entry.version !== baseline.plugin || entry.channel !== 'stable'
    || entry.pluginApi?.major !== api[0] || entry.pluginApi?.minor !== api[1]
    || entry.artifact?.sha256 !== baseline.pluginSha256 || entry.artifact?.url !== pluginUrl)
    failures.push(`Official Catalog does not bind reviewed MineRewind ${baseline.plugin}/API ${baseline.api} artifact.`);
  const manualFailures = checkManualAcceptance(evidence);
  return {ready: failures.length === 0, failures, downloads, sdk: baseline.sdk, hostTag, pluginTag,
    manualAcceptance: {ready: manualFailures.length === 0, failures: manualFailures}};
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  let result;
  try {
    result = await checkPublicRelease({baseline: JSON.parse(fs.readFileSync('audit/baseline.json', 'utf8')),
      evidence: JSON.parse(fs.readFileSync('audit/acceptance.json', 'utf8'))});
  } catch (error) {
    result = {ready: false, failures: [error.message]};
  }
  fs.mkdirSync('artifacts', {recursive: true});
  fs.writeFileSync('artifacts/release-readiness.json', JSON.stringify({...result, checkedAt: new Date().toISOString()}, null, 2) + '\n');
  if (!result.ready) {
    console.error('Public release gate CLOSED:\n' + result.failures.map(f => ` - ${f}`).join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Public release gate OPEN: public SDK, Host assets, plugin bytes and Catalog verified.');
    if (!result.manualAcceptance.ready) console.log('Desktop/game acceptance remains pending; see npm run check:acceptance.');
  }
}
