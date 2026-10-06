import {test} from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {checkPublicRelease, checkManualAcceptance} from './check-release-readiness.mjs';

const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function fixture() {
  const bytes = Buffer.from('reviewed payload');
  const baseline = {api: '3.6', sdk: '3.6.0', plugin: '1.9.5', pluginSha256: sha(bytes),
    hostProjectVersion: '1.9.3.0', latestHostRelease: 'v1.9.3'};
  const evidence = {officialHostTag: 'v1.9.3', officialHostPublishedAt: '2026-10-03T09:19:17Z',
    finalScreenshotsVerified: false, manualScenarios: Array.from({length: 8}, (_, i) => ({name: `scenario-${i}`, status: 'pending'}))};
  const pluginUrl = 'https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases/download/v1.9.5/MineRewind-1.9.5.frplugin';
  const data = new Map();
  const host = {tag_name: 'v1.9.3', published_at: evidence.officialHostPublishedAt, draft: false, prerelease: false, assets: []};
  for (const arch of ['x64', 'arm64']) {
    const name = `FolderRewind_1.9.3.0_Setup_${arch}.exe`;
    const url = `https://example.test/${name}`;
    host.assets.push({name, browser_download_url: url}, {name: `${name}.sha256`, browser_download_url: `${url}.sha256`});
    data.set(url, bytes);
    data.set(`${url}.sha256`, `${sha(bytes)}  ${name}\n`);
  }
  const plugin = {tag_name: 'v1.9.5', published_at: '2026-10-03T08:36:11Z', draft: false, prerelease: false,
    assets: [{name: 'MineRewind-1.9.5.frplugin', browser_download_url: pluginUrl}]};
  const catalog = {schemaVersion: 1, entries: [{pluginId: 'com.folderrewind.minerewind', version: '1.9.5',
    channel: 'stable', pluginApi: {major: 3, minor: 6}, artifact: {url: pluginUrl, sha256: sha(bytes)}}]};
  data.set('https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json', {versions: ['3.0.0', '3.6.0']});
  data.set('https://api.github.com/repos/Leafuke/FolderRewind/releases/tags/v1.9.3', host);
  data.set('https://api.github.com/repos/Leafuke/FolderRewind-Plugin-Minecraft/releases/tags/v1.9.5', plugin);
  data.set('https://leafuke.github.io/FolderRewind-Plugin-Catalog/catalog.v1.json', catalog);
  data.set(pluginUrl, bytes);
  return {baseline, evidence, data, host, plugin, catalog, pluginUrl,
    restoreSdk: async sdk => { assert.equal(sdk, '3.6.0'); return true; },
    fetchImpl: async url => {
      if (!data.has(url)) return new Response('missing', {status: 404});
      const value = data.get(url);
      return new Response(typeof value === 'object' && !Buffer.isBuffer(value) ? JSON.stringify(value) : value);
    }};
}

test('verified public release is ready while all manual scenarios remain pending', async () => {
  const result = await checkPublicRelease(fixture());
  assert.equal(result.ready, true);
  assert.equal(result.manualAcceptance.ready, false);
  assert.equal(result.downloads.length, 3);
});

for (const [name, mutate, expected] of [
  ['Host date mismatch', f => { f.host.published_at = '2026-10-02T00:00:00Z'; }, /publication date/],
  ['Host prerelease', f => { f.host.prerelease = true; }, /stable release/],
  ['wrong Host asset version', f => { f.host.assets[0].name = 'FolderRewind_1.9.2.0_Setup_x64.exe'; }, /four reviewed/],
  ['unexpected MSI asset', f => { f.host.assets.push({name: 'installer.msi'}); }, /four reviewed/],
  ['corrupt Setup bytes', f => { f.data.set(f.host.assets[0].browser_download_url, 'corrupt'); }, /checksum mismatch/],
  ['wrong checksum filename', f => { f.data.set(f.host.assets[1].browser_download_url, `${f.baseline.pluginSha256}  wrong.exe`); }, /Invalid checksum/],
  ['corrupt plugin bytes', f => { f.data.set(f.pluginUrl, 'corrupt'); }, /checksum mismatch/],
  ['Catalog version mismatch', f => { f.catalog.entries[0].version = '1.9.3'; }, /Catalog/],
  ['Catalog API mismatch', f => { f.catalog.entries[0].pluginApi.minor = 5; }, /Catalog/],
  ['Catalog hash mismatch', f => { f.catalog.entries[0].artifact.sha256 = '0'.repeat(64); }, /Catalog/],
  ['Catalog URL mismatch', f => { f.catalog.entries[0].artifact.url = 'https://example.test/plugin'; }, /Catalog/],
  ['missing public SDK', f => { f.data.set('https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json', {versions: ['3.0.0']}); }, /not listed/],
  ['failed clean SDK restore', f => { f.restoreSdk = async () => false; }, /restore failed/],
]) {
  test(name + ' closes the public gate', async () => {
    const f = fixture(); mutate(f);
    const result = await checkPublicRelease(f);
    assert.equal(result.ready, false);
    assert.match(result.failures.join('\n'), expected);
  });
}

test('unavailable public data cannot silently pass', async () => {
  const f = fixture(); f.data.delete('https://leafuke.github.io/FolderRewind-Plugin-Catalog/catalog.v1.json');
  await assert.rejects(checkPublicRelease(f), /HTTP 404/);
});

test('manual acceptance requires all eight scenarios and final screenshots', () => {
  const {evidence} = fixture();
  assert.equal(checkManualAcceptance(evidence).length, 2);
  evidence.manualScenarios.forEach(s => { s.status = 'passed'; });
  assert.equal(checkManualAcceptance(evidence).length, 1);
  evidence.finalScreenshotsVerified = true;
  assert.deepEqual(checkManualAcceptance(evidence), []);
  evidence.manualScenarios.pop();
  assert.equal(checkManualAcceptance(evidence).length, 1);
});

test('newer Host API supports older public plugin and SDK without claiming a new public package', async () => {
  const f = fixture();
  Object.assign(f.baseline, {api: '3.9', publicPluginApi: '3.6', exampleApi: '3.6', bundledPlugin: '1.9.8'});
  assert.equal((await checkPublicRelease(f)).ready, true);
});

for (const [name, change] of [
  ['newer plugin minor', {publicPluginApi: '3.10'}],
  ['different plugin major', {publicPluginApi: '4.0'}],
  ['SDK/example mismatch', {exampleApi: '3.5'}],
]) {
  test(name + ' cannot pass compatibility checks', async () => {
    const f = fixture();
    Object.assign(f.baseline, {api: '3.9', publicPluginApi: '3.6', exampleApi: '3.6'}, change);
    assert.equal((await checkPublicRelease(f)).ready, false);
  });
}
