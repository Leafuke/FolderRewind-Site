#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

const errors = [];
const warnings = [];

// Parse sitemap
function parseSitemap() {
  const sitemapPath = path.join(buildDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('sitemap.xml not found in build/');
    return [];
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  return urls;
}

// Check if superpowers exists in build
function checkSuperpowers() {
  const supperpowersPath = path.join(buildDir, 'docs', 'superpowers');
  if (fs.existsSync(supperpowersPath)) {
    errors.push('superpowers directory exists in build/ but should be excluded');
  }

  const enSupperpowersPath = path.join(buildDir, 'en', 'docs', 'superpowers');
  if (fs.existsSync(enSupperpowersPath)) {
    errors.push('superpowers directory exists in build/en/ but should be excluded');
  }
}

// Check individual HTML file
function checkHtmlFile(htmlPath, url) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  const root = parse(content);

  const relPath = path.relative(buildDir, htmlPath);

  // Check title
  const title = root.querySelector('title');
  if (!title || !title.text.trim()) {
    errors.push(`${url}: Missing or empty <title>`);
  }

  // Check description meta tags
  const descriptions = root.querySelectorAll('meta[name="description"]');
  if (descriptions.length === 0) {
    errors.push(`${url}: No <meta name="description"> tag found`);
  } else if (descriptions.length > 1) {
    warnings.push(`${url}: Multiple description meta tags (${descriptions.length} found)`);
  } else {
    const desc = descriptions[0].getAttribute('content');
    if (!desc || desc.trim() === '') {
      errors.push(`${url}: Empty description meta tag`);
    }
  }

  // Check canonical
  const canonical = root.querySelector('link[rel="canonical"]');
  if (!canonical) {
    warnings.push(`${url}: No canonical link found`);
  } else {
    const canonicalUrl = canonical.getAttribute('href');
    // Should have trailing slash per trailingSlash: true config
    if (!canonicalUrl.endsWith('/') && !canonicalUrl.match(/\.(xml|txt|json)$/)) {
      warnings.push(`${url}: Canonical URL missing trailing slash: ${canonicalUrl}`);
    }
  }

  // Check hreflang
  const hreflangs = root.querySelectorAll('link[rel="alternate"][hreflang]');
  if (hreflangs.length === 0) {
    warnings.push(`${url}: No hreflang alternate links found`);
  }
}

// Map URL to file path
function urlToFilePath(url) {
  const parsed = new URL(url);
  let pathname = parsed.pathname;

  // Remove trailing slash to get directory, then look for index.html
  if (pathname.endsWith('/')) {
    return path.join(buildDir, pathname, 'index.html');
  }
  return path.join(buildDir, pathname + '.html');
}

async function main() {
  console.log('🔍 Checking built SEO metadata...\n');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ build/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Check superpowers exclusion
  console.log('Checking superpowers exclusion...');
  checkSuperpowers();

  // Parse sitemap
  console.log('Parsing sitemap...');
  const urls = parseSitemap();
  console.log(`Found ${urls.length} URLs in sitemap\n`);

  // Check for unwanted URLs in sitemap
  const unwantedPatterns = [
    '/search/',
    '/superpowers/',
    '/blog/tags/',
    '/blog/archive/',
    '/blog/authors/',
  ];

  for (const url of urls) {
    for (const pattern of unwantedPatterns) {
      if (url.includes(pattern)) {
        errors.push(`Sitemap contains unwanted URL: ${url}`);
      }
    }
  }

  // Check each URL in sitemap
  console.log('Checking HTML files from sitemap...');
  let checkedCount = 0;

  for (const url of urls) {
    const filePath = urlToFilePath(url);

    if (!fs.existsSync(filePath)) {
      errors.push(`Sitemap URL has no corresponding file: ${url} -> ${filePath}`);
      continue;
    }

    checkHtmlFile(filePath, url);
    checkedCount++;
  }

  console.log(`Checked ${checkedCount} HTML files\n`);

  // Report results
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
    console.log('✅ All built SEO checks passed!');
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
