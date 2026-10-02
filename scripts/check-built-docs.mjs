import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'node-html-parser';
const baseline = JSON.parse(fs.readFileSync('audit/baseline.json', 'utf8'));
const errors=[];
let checked=0;
for (const [key, ids] of Object.entries(baseline.anchors)) {
  const [locale,...parts]=key.split('/');
  if(parts.at(-1)==='index') parts.pop(); // Docusaurus index docs keep directory URLs.
  const file=path.join('build',locale==='en'?'en':'','docs',...parts,'index.html');
  if (!fs.existsSync(file)) {errors.push(`Missing original route: ${key}`);continue;}
  const root=parse(fs.readFileSync(file,'utf8'));
  const present=new Set(root.querySelectorAll('[id]').map(el=>el.getAttribute('id')));
  for (const id of ids) if (!present.has(id)) errors.push(`Lost original anchor: ${key}#${id}`);
  checked++;
}
for (const locale of ['','en']) {
  const sitemap=path.join('build',locale,'sitemap.xml');
  if (!fs.existsSync(sitemap)) {errors.push(`Missing locale sitemap: ${locale||'zh'}`);continue;}
  const urls=[...fs.readFileSync(sitemap,'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  for(const url of urls) {
    const pageFile=path.join('build',decodeURIComponent(new URL(url).pathname),'index.html');
    if(!fs.existsSync(pageFile)) continue;
    const root=parse(fs.readFileSync(pageFile,'utf8'));
    for(const link of root.querySelectorAll('a[href]')) {
      const href=link.getAttribute('href');
      if(!href.startsWith('/')||!href.includes('#'))continue;
      const target=new URL(href,'https://folderrewind.top');
      const targetFile=path.join('build',decodeURIComponent(target.pathname),'index.html');
      if(!fs.existsSync(targetFile)) {errors.push(`Broken route: ${url} → ${href}`);continue;}
      const ids=new Set(parse(fs.readFileSync(targetFile,'utf8')).querySelectorAll('[id]').map(el=>el.getAttribute('id')));
      if(target.hash&&!ids.has(decodeURIComponent(target.hash.slice(1))))errors.push(`Broken anchor: ${url} → ${href}`);
    }
  }
}
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exitCode=1;}
else console.log(`Built routes/anchors OK: ${checked} original bilingual routes plus both locale sitemaps.`);
