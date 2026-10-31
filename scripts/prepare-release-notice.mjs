import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

// Publication uses verified public artifacts; desktop/game acceptance is tracked separately.
const gate=spawnSync(process.execPath,['scripts/check-release-readiness.mjs'],{stdio:'inherit'});
if(gate.status!==0)process.exit(gate.status??1);
const evidence=JSON.parse(fs.readFileSync('audit/acceptance.json','utf8'));
const baseline=JSON.parse(fs.readFileSync('audit/baseline.json','utf8'));
const response=await fetch(`https://api.github.com/repos/Leafuke/FolderRewind/releases/tags/${evidence.officialHostTag}`,{headers:{'User-Agent':'FolderRewind-docs-release-check'}});
if(!response.ok)throw new Error(`Official release metadata unavailable: ${response.status}`);
const release=await response.json();
const version=release.tag_name.replace(/^v/,'');
if(release.tag_name!==baseline.latestHostRelease||!/^\d+\.\d+\.\d+(?:\.\d+)?$/.test(version)||!release.published_at)throw new Error('Expected the reviewed published release');
const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(release.published_at));
const part=type=>parts.find(p=>p.type===type).value;
const date=`${part('year')}-${part('month')}-${part('day')}`;
const name=`${date}-v${version}-release.md`;
const outputs=[['zh','blog'],['en','i18n/en/docusaurus-plugin-content-blog']].map(([locale,dir])=>{
  const template=fs.readFileSync(`scripts/templates/release-notice.${locale}.md`,'utf8');
  const contents=template.replaceAll('{{VERSION}}',version).replaceAll('{{RELEASE_URL}}',release.html_url);
  return [path.join(dir,name),contents];
});
for(const [file] of outputs)if(fs.existsSync(file))throw new Error(`Publication notice exists; review it explicitly: ${file}`);
for(const [file,contents]of outputs)fs.writeFileSync(file,contents);
console.log(`Prepared both notices from official tag ${release.tag_name}, Asia/Shanghai date ${date}. Run checks and review before committing.`);
