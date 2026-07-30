import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const englishDocsRoot = path.join(
  root,
  'i18n',
  'en',
  'docusaurus-plugin-content-docs',
  'current',
);
const blogRoot = path.join(root, 'blog');
const englishBlogRoot = path.join(
  root,
  'i18n',
  'en',
  'docusaurus-plugin-content-blog',
);
const sourceRoot = path.join(root, 'src');
const englishCodePath = path.join(root, 'i18n', 'en', 'code.json');

async function listFiles(directory, predicate, prefix = '') {
  const result = [];
  const entries = await readdir(directory, {withFileTypes: true});

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      result.push(...(await listFiles(absolutePath, predicate, relativePath)));
    } else if (predicate(entry.name, relativePath)) {
      result.push(relativePath);
    }
  }

  return result.sort();
}

function compareSets(label, sourceFiles, translatedFiles) {
  const source = new Set(sourceFiles);
  const translated = new Set(translatedFiles);
  const missing = sourceFiles.filter((file) => !translated.has(file));
  const extra = translatedFiles.filter((file) => !source.has(file));

  if (missing.length === 0 && extra.length === 0) {
    return [];
  }

  const errors = [`${label} paths are not in parity.`];
  if (missing.length > 0) {
    errors.push(`  Missing English files: ${missing.join(', ')}`);
  }
  if (extra.length > 0) {
    errors.push(`  Extra English files: ${extra.join(', ')}`);
  }
  return errors;
}

async function collectTranslateIds() {
  const sourceFiles = await listFiles(
    sourceRoot,
    (name) => name.endsWith('.tsx') || name.endsWith('.ts'),
  );
  const ids = new Set();
  const idPattern = /\bid\s*[:=]\s*['"]([^'"]+)['"]/g;

  for (const relativePath of sourceFiles) {
    const content = await readFile(path.join(sourceRoot, relativePath), 'utf8');
    for (const match of content.matchAll(idPattern)) {
      ids.add(match[1]);
    }
  }

  return [...ids].sort();
}

const errors = [];
const markdownPredicate = (name, relativePath) =>
  (name.endsWith('.md') || name.endsWith('.mdx')) &&
  !relativePath.startsWith('superpowers/');

const [docs, englishDocs, blogPosts, englishBlogPosts, translateIds] =
  await Promise.all([
    listFiles(docsRoot, markdownPredicate),
    listFiles(englishDocsRoot, markdownPredicate),
    listFiles(blogRoot, (name) => name.endsWith('.md')),
    listFiles(englishBlogRoot, (name) => name.endsWith('.md')),
    collectTranslateIds(),
  ]);

errors.push(...compareSets('Documentation', docs, englishDocs));
errors.push(...compareSets('Blog', blogPosts, englishBlogPosts));

const englishCode = JSON.parse(await readFile(englishCodePath, 'utf8'));
const missingTranslateIds = translateIds.filter(
  (id) => !Object.hasOwn(englishCode, id),
);
if (missingTranslateIds.length > 0) {
  errors.push(
    `Missing English code translations: ${missingTranslateIds.join(', ')}`,
  );
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `i18n parity OK: ${docs.length} docs, ${blogPosts.length} blog posts, ${translateIds.length} code IDs.`,
  );
}
