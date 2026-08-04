import {readdir, readFile, stat} from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const staticRoot = path.join(root, 'static');
const sourceRoots = [
  'docs',
  path.join('i18n', 'en', 'docusaurus-plugin-content-docs', 'current'),
  'src',
  'docusaurus.config.ts',
];
const rasterExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
// Keep a small allowance for the intentionally restored legacy cloud screenshots.
const maxRasterBytes = 512 * 1024;
const imageReferencePattern = /(?:https?:\/\/[^"'`\s)]+)?\/?img\/[A-Za-z0-9][A-Za-z0-9_./-]*/g;
const obsoleteTokens = [
  'ori.png',
  'backup-directory-structure.png',
  'config-dialog-',
  'auto-scan-worlds-result',
  'folderrewind-minerewind-architecture',
  'placeholder',
];

async function walk(entry) {
  const info = await stat(entry);
  if (info.isFile()) return [entry];

  const children = await readdir(entry, {withFileTypes: true});
  const files = [];
  for (const child of children) {
    if (child.name === 'node_modules' || child.name === 'build' || child.name === '.docusaurus' || child.name === 'superpowers') continue;
    files.push(...(await walk(path.join(entry, child.name))));
  }
  return files;
}

function normalizeReference(match) {
  const imgIndex = match.lastIndexOf('/img/');
  const relative = imgIndex >= 0 ? match.slice(imgIndex + 1) : match.slice(match.indexOf('img/'));
  return relative.split(/[?#]/, 1)[0].replaceAll('/', path.sep);
}

function isObsolete(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/');
  return obsoleteTokens.some((token) => normalized.includes(token));
}

async function pngDimensions(filePath) {
  const bytes = await readFile(filePath);
  if (bytes.length < 24 || bytes.readUInt32BE(0) !== 0x89504e47) return null;
  return {width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20)};
}

const sourceFiles = [];
for (const sourceRoot of sourceRoots) {
  sourceFiles.push(...(await walk(path.join(root, sourceRoot))));
}

const references = new Map();
for (const sourceFile of sourceFiles) {
  const text = await readFile(sourceFile, 'utf8');
  for (const match of text.matchAll(imageReferencePattern)) {
    const relative = normalizeReference(match[0]);
    const locations = references.get(relative) ?? [];
    locations.push(path.relative(root, sourceFile));
    references.set(relative, locations);
  }
}

const errors = [];
let referencedBytes = 0;
for (const [relative, locations] of [...references.entries()].sort()) {
  const filePath = path.join(staticRoot, relative);
  try {
    const info = await stat(filePath);
    referencedBytes += info.size;
    if (isObsolete(relative)) errors.push(`obsolete image reference: ${relative} (${locations[0]})`);
    if (rasterExtensions.has(path.extname(filePath).toLowerCase()) && info.size > maxRasterBytes) {
      errors.push(`image exceeds ${maxRasterBytes} bytes: ${relative} (${info.size} bytes)`);
    }
    if (path.extname(filePath).toLowerCase() === '.png') {
      const dimensions = await pngDimensions(filePath);
      if (dimensions && (dimensions.width <= 1 || dimensions.height <= 1)) {
        errors.push(`placeholder image dimensions: ${relative} (${dimensions.width}x${dimensions.height})`);
      }
    }
  } catch {
    errors.push(`missing image: ${relative} (${locations[0]})`);
  }
}

const staticFiles = await walk(staticRoot);
let staticRasterBytes = 0;
for (const filePath of staticFiles) {
  const extension = path.extname(filePath).toLowerCase();
  if (!rasterExtensions.has(extension)) continue;
  const info = await stat(filePath);
  staticRasterBytes += info.size;
  const relative = path.relative(staticRoot, filePath);
  if (isObsolete(relative)) errors.push(`obsolete asset remains: ${relative}`);
  if (info.size > maxRasterBytes) {
    errors.push(`image exceeds ${maxRasterBytes} bytes: ${relative} (${info.size} bytes)`);
  }
  if (extension === '.png') {
    const dimensions = await pngDimensions(filePath);
    if (dimensions && (dimensions.width <= 1 || dimensions.height <= 1)) {
      errors.push(`placeholder asset remains: ${relative} (${dimensions.width}x${dimensions.height})`);
    }
  }
}

console.log(`checked ${references.size} referenced images`);
console.log(`referenced asset size: ${(referencedBytes / 1024 / 1024).toFixed(2)} MiB`);
console.log(`static raster size: ${(staticRasterBytes / 1024 / 1024).toFixed(2)} MiB`);

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('image checks passed');
}
