import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const baseline=JSON.parse(fs.readFileSync('audit/baseline.json','utf8'));
const evidence=JSON.parse(fs.readFileSync('audit/acceptance.json','utf8'));
const failures=[];
const response=await fetch('https://api.nuget.org/v3-flatcontainer/folderrewind.plugin.abstractions/index.json');
if(!response.ok)throw new Error(`NuGet index unavailable: ${response.status}`);
if(!(await response.json()).versions.includes(baseline.sdk))failures.push(`Public SDK ${baseline.sdk} is not listed.`);
else {
  const cache=fs.mkdtempSync(path.join(os.tmpdir(),'fr-public-restore-'));
  const project=path.join(cache,'Probe.csproj');
  fs.writeFileSync(project,`<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework></PropertyGroup><ItemGroup><PackageReference Include="FolderRewind.Plugin.Abstractions" Version="${baseline.sdk}" /></ItemGroup></Project>`);
  const restore=spawnSync('dotnet',['restore',project,'--packages',path.join(cache,'packages'),'--source','https://api.nuget.org/v3/index.json','--no-http-cache'],{stdio:'inherit'});
  if(restore.status!==0)failures.push('Clean public SDK restore failed.');
}
async function release(repo,tag) {
  const res=await fetch(`https://api.github.com/repos/Leafuke/${repo}/releases/tags/${tag}`,{headers:{'User-Agent':'FolderRewind-docs-release-check'}});
  if(res.status===404){failures.push(`${repo} ${tag} is not public.`);return null;}
  if(!res.ok)throw new Error(`Release lookup failed: ${res.status}`);
  const r=await res.json();if(r.draft||r.prerelease)failures.push(`${repo} is not a stable release.`);return r;
}
const hostTag=evidence.officialHostTag;
if(!hostTag)failures.push('Final official Host tag/date are not frozen.');
else {
  const r=await release('FolderRewind',hostTag);
  if(r){
    const version=r.assets.map(a=>/^FolderRewind_(\d+(?:\.\d+){2,3})_Setup_x64\.exe$/.exec(a.name)?.[1]).find(Boolean);
    if(!version)failures.push('Missing versioned Setup EXE.');
    else{
      const allowed=new Set(['x64','arm64'].flatMap(arch=>['.exe','.exe.sha256'].map(suffix=>`FolderRewind_${version}_Setup_${arch}${suffix}`)));
      for(const name of allowed)if(!r.assets.some(a=>a.name===name))failures.push(`Missing ${name}`);
      for(const asset of r.assets)if(!allowed.has(asset.name))failures.push(`Unexpected public asset: ${asset.name}`);
      if(version.replace(/\.0$/,'')!==hostTag.replace(/^v/,'').replace(/\.0$/,''))failures.push('Host asset version does not match tag.');
    }
  }
}
const plugin=await release('FolderRewind-Plugin-Minecraft',`v${baseline.plugin}`);
if(plugin){const asset=plugin.assets.find(a=>a.name===`MineRewind-${baseline.plugin}.frplugin`);if(!asset)failures.push('Official plugin asset missing.');else{const r=await fetch(asset.browser_download_url);if(!r.ok)throw new Error(`Plugin download failed: ${r.status}`);const hash=crypto.createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex');if(hash!==baseline.pluginSha256)failures.push('Official plugin bytes differ from reviewed artifact.');}}
const catalogResponse=await fetch('https://leafuke.github.io/FolderRewind-Plugin-Catalog/catalog.v1.json');
if(!catalogResponse.ok)failures.push('Official Catalog unavailable.');
else{
  const catalog=await catalogResponse.json();
  const entry=catalog.entries?.find(p=>p.pluginId==='com.folderrewind.minerewind');
  if(!entry||entry.version!==baseline.plugin||entry.pluginApi?.major!==3||entry.pluginApi?.minor!==5||entry.artifact?.sha256!==baseline.pluginSha256)
    failures.push('Official Catalog does not bind reviewed MineRewind1.9.3/API3.5 artifact.');
}
if(!evidence.catalogVerified)failures.push('Catalog artifact/manifest acceptance evidence is incomplete.');
if(evidence.manualScenarios.some(s=>s.status!=='passed'))failures.push('Isolated desktop/game acceptance is incomplete.');
if(!evidence.finalScreenshotsVerified)failures.push('Final released-version screenshots are incomplete.');
fs.mkdirSync('artifacts',{recursive:true});
fs.writeFileSync('artifacts/release-readiness.json',JSON.stringify({ready:failures.length===0,failures},null,2)+'\n');
if(failures.length){console.error('Release gate CLOSED:\n'+failures.map(f=>' - '+f).join('\n'));process.exitCode=1;}
else console.log('Release gate OPEN; prepare publication notice from verified official metadata.');
