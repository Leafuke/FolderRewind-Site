#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];
const stats = {
  totalFiles: 0,
  missingDescription: 0,
  emptyDescription: 0,
  tooShortZh: 0,
  tooShortEn: 0,
  duplicates: new Map(),
  wrongLocale: 0
};

// Minimum recommended lengths (warnings only)
const MIN_ZH_CHARS = 45;
const MIN_EN_CHARS = 100;

// Detect if description language matches expected locale
function detectLanguage(text) {
  const chineseChars = (text.match(/[一-龥]/g) || []).length;
  const totalChars = text.length;
  return chineseChars / totalChars > 0.3 ? 'zh' : 'en';
}

function checkDescription(filePath, description, expectedLocale) {
  const relPath = path.relative(rootDir, filePath);

  if (!description || description.trim() === '') {
    if (!description) {
      errors.push(`${relPath}: Missing description field`);
      stats.missingDescription++;
    } else {
      errors.push(`${relPath}: Empty description field`);
      stats.emptyDescription++;
    }
    return;
  }

  const trimmed = description.trim();
  const detectedLang = detectLanguage(trimmed);

  // Check language mismatch
  if (expectedLocale === 'zh' && detectedLang === 'en') {
    errors.push(`${relPath}: Chinese locale but English description`);
    stats.wrongLocale++;
  } else if (expectedLocale === 'en' && detectedLang === 'zh') {
    errors.push(`${relPath}: English locale but Chinese description`);
    stats.wrongLocale++;
  }

  // Check length (warnings)
  if (expectedLocale === 'zh' && trimmed.length < MIN_ZH_CHARS) {
    warnings.push(`${relPath}: Description too short (${trimmed.length} chars, recommend ≥${MIN_ZH_CHARS}): "${trimmed}"`);
    stats.tooShortZh++;
  } else if (expectedLocale === 'en' && trimmed.length < MIN_EN_CHARS) {
    warnings.push(`${relPath}: Description too short (${trimmed.length} chars, recommend ≥${MIN_EN_CHARS}): "${trimmed}"`);
    stats.tooShortEn++;
  }

  // Track duplicates
  if (!stats.duplicates.has(trimmed)) {
    stats.duplicates.set(trimmed, []);
  }
  stats.duplicates.get(trimmed).push(relPath);
}

async function checkMarkdownFiles() {
  // Check Chinese docs (exclude superpowers)
  const zhDocs = await glob('docs/**/*.{md,mdx}', {
    cwd: rootDir,
    ignore: ['**/superpowers/**']
  });

  for (const file of zhDocs) {
    stats.totalFiles++;
    const fullPath = path.join(rootDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);
    checkDescription(fullPath, data.description, 'zh');
  }

  // Check English docs
  const enDocs = await glob('i18n/en/docusaurus-plugin-content-docs/current/**/*.{md,mdx}', {
    cwd: rootDir
  });

  for (const file of enDocs) {
    stats.totalFiles++;
    const fullPath = path.join(rootDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);
    checkDescription(fullPath, data.description, 'en');
  }

  // Check Chinese blogs
  const zhBlogs = await glob('blog/**/*.{md,mdx}', { cwd: rootDir });
  for (const file of zhBlogs) {
    stats.totalFiles++;
    const fullPath = path.join(rootDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);
    checkDescription(fullPath, data.description, 'zh');
  }

  // Check English blogs
  const enBlogs = await glob('i18n/en/docusaurus-plugin-content-blog/**/*.{md,mdx}', {
    cwd: rootDir
  });

  for (const file of enBlogs) {
    stats.totalFiles++;
    const fullPath = path.join(rootDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(content);
    checkDescription(fullPath, data.description, 'en');
  }
}

// Find exact duplicates
function reportDuplicates() {
  for (const [desc, files] of stats.duplicates) {
    if (files.length > 1) {
      errors.push(`Duplicate description in ${files.length} files: "${desc}"\n  Files: ${files.join(', ')}`);
    }
  }
}

async function main() {
  console.log('🔍 Checking SEO metadata...\n');

  await checkMarkdownFiles();
  reportDuplicates();

  console.log('📊 Statistics:');
  console.log(`  Total files checked: ${stats.totalFiles}`);
  console.log(`  Missing descriptions: ${stats.missingDescription}`);
  console.log(`  Empty descriptions: ${stats.emptyDescription}`);
  console.log(`  Too short (Chinese): ${stats.tooShortZh}`);
  console.log(`  Too short (English): ${stats.tooShortEn}`);
  console.log(`  Wrong locale: ${stats.wrongLocale}`);
  console.log(`  Duplicate descriptions: ${[...stats.duplicates.values()].filter(f => f.length > 1).length}\n`);

  if (errors.length > 0) {
    console.error('❌ Errors:');
    errors.forEach(err => console.error(`  ${err}`));
    console.error('');
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    warnings.forEach(warn => console.warn(`  ${warn}`));
    console.warn('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All SEO checks passed!');
    process.exit(0);
  } else {
    console.log(`Found ${errors.length} error(s) and ${warnings.length} warning(s).`);
    process.exit(errors.length > 0 ? 1 : 0);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
