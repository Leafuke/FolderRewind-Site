import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const baseline = JSON.parse(fs.readFileSync('audit/baseline.json', 'utf8'));
const inventory = JSON.parse(fs.readFileSync('audit/pages.json', 'utf8'));
const errors = [];
const deprecated = /using FolderRewind\.(?:Models|Services)|\bGetSettingsDefinitions\s*\(|\bOnBeforeBackupFolder\s*\(|\bOnAfterBackupFolder\s*\(|\bInitialize\s*\(|IFolderRewindHotkeyProvider|IFolderRewindParameterizedKnotLinkCommandHandler/;
for (const item of inventory.pages.filter(p => p.product !== 'MineBackup')) {
  if (!item.status.startsWith('source-checked') && !item.status.startsWith('historical-')) errors.push(`Unaudited page: ${item.path}`);
  const zh = fs.readFileSync(item.path, 'utf8');
  const en = fs.readFileSync(item.english, 'utf8');
  if (item.path.includes('v1-8-upgrade')) continue;
  if (item.path.includes('migration-v2-v3')) continue; // Explicitly labeled responsibility mapping.
  for (const [file, text] of [[item.path, zh], [item.english, en]]) {
    const {data, content} = matter(text);
    if (data.reviewed_baseline !== '1.9-api3.5') errors.push(`Missing reviewed baseline: ${file}`);
    for (const match of content.matchAll(/```csharp\n([\s\S]*?)```/g)) {
      if (deprecated.test(match[1])) errors.push(`Legacy plugin C# contract: ${file}`);
    }
  }
  const wire = text => [...text.matchAll(/```text\n([\s\S]*?)```/g)].map(m => m[1]).filter(t => /^cmd=/m.test(t)).map(t => t.trim());
  if (JSON.stringify(wire(zh)) !== JSON.stringify(wire(en))) errors.push(`Translated wire examples differ: ${item.path}`);
}
for (const name of ['MinimalPlugin', 'GameRewind']) {
  const root = path.join('examples/plugins', name);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  const project = fs.readFileSync(path.join(root, `${name}.csproj`), 'utf8');
  if (manifest.manifestVersion !== 3 || manifest.pluginApi.major !== 3 || manifest.pluginApi.minor !== 5)
    errors.push(`Example API drift: ${name}`);
  if (!project.includes(`Version="${baseline.sdk}"`) || /ProjectReference|HintPath|Microsoft.UI.Xaml/.test(project))
    errors.push(`Example SDK boundary drift: ${name}`);
}
const api = fs.readFileSync('docs/plugins/developing/plugin-api.md', 'utf8');
const kinds = ['Discovery','ConfigReconciliation','FilePolicy','BackupScope','BackupConsistency','FolderMetadata','RestoreCoordinator','PluginCommand','KnotLinkIntegration','ProviderStateMigration','BackupArtifactTransformer','BackupCompletionObserver','RestoreMaterializer','VersionMetadataProvider','RestoreStagingPreparation'];
for (const kind of kinds) if (!api.includes('`'+kind+'`')) errors.push(`Undocumented capability: ${kind}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Contracts OK: ${inventory.pages.length} bilingual pages, 15 capabilities.`);
