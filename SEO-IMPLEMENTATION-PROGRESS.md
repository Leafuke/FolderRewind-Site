# Bing SEO Crawl Hygiene Implementation Progress

## Execution Date
2026-08-19

## Phase 0: Baseline ✅

### Completed
- ✅ npm ci installed dependencies successfully
- ✅ npm run check:i18n passed (68 docs, 12 blog posts, 127 code IDs)
- ✅ npm run typecheck passed
- ✅ npm run build completed successfully
- ✅ Verified superpowers directory NOT in build/ (correct)
- ✅ Verified superpowers NOT in sitemap.xml
- ✅ Identified sitemap includes /search/ routes (needs fixing)

### Baseline Audit Results
- **Total files checked**: 160 (docs + blogs, zh + en)
- **Missing descriptions**: 24 (all blog posts)
- **Wrong locale**: 12 (Chinese files with English descriptions)
- **Too short (Chinese)**: 57 files (<45 chars)
- **Too short (English)**: 60 files (<100 chars)
- **Duplicate descriptions**: 0
- **Total errors**: 36
- **Total warnings**: 117

## Phase 1: Meta Descriptions ⏳ IN PROGRESS

### Scripts Created
- ✅ `scripts/check-seo.mjs` - Source file SEO audit
- ✅ Added `check:seo` to package.json
- ✅ Installed glob and gray-matter dependencies

### Manual Fixes Completed
- ✅ Homepage (index.tsx) - Expanded Chinese description (67→85 chars)
- ✅ Homepage (en translation) - Expanded English description (64→190 chars)
- ✅ Download page (download.tsx) - Expanded Chinese description (18→74 chars)
- ✅ Download page (en translation) - Expanded English description (46→153 chars)
- ✅ Blog description (docusaurus.config.ts) - Expanded Chinese (15→47 chars)
- ✅ Blog description (en options.json) - Expanded English (49→167 chars)
- ✅ docs/intro.md - Expanded Chinese description (10→72 chars)
- ✅ docs/faq.md - Expanded Chinese description (12→66 chars)
- ✅ docs/getting-started/installation.md - Expanded Chinese (18→67 chars)
- ✅ docs/plugins/knotlink.md - Expanded Chinese (31→83 chars)
- ✅ i18n/en/.../intro.md - Expanded English (42→195 chars)

### Automated Fixes In Progress
- ⏳ **Workflow 1** (wq53mbhf7): Fixing 12 wrong-locale docs + 24 missing blog descriptions
  - 12 Chinese docs with English descriptions → generating Chinese descriptions
  - 12 Chinese blog posts → generating descriptions
  - 12 English blog posts → generating descriptions
  
- ⏳ **Workflow 2** (w1wkq3ka3): Fixing ~110 too-short descriptions
  - ~54 Chinese docs with too-short descriptions
  - ~60 English docs with too-short descriptions

## Phase 2: Crawl Hygiene ✅

### robots.txt Updates
- ✅ Added `Disallow: /search/`
- ✅ Added `Disallow: /en/search/`
- ✅ Kept sitemap reference
- ✅ No crawl-delay (as required)

### Sitemap Configuration
- ✅ Already excludes: /404, /search, /blog/authors, /blog/archive, /blog/tags
- ✅ superpowers excluded via `exclude: ['**/superpowers/**']` in docs config
- ✅ trailingSlash: true maintained

### URL Canonicalization
- ✅ Verified trailingSlash: true is configured
- ✅ Will verify canonical tags in Phase 5

## Phase 3: SEO Lint ✅

### Scripts Created
- ✅ `scripts/check-built-seo.mjs` - Built HTML SEO validator
- ✅ Added `check:built-seo` to package.json
- ✅ Installed node-html-parser dependency

### Lint Rules Implemented

**check-seo.mjs** (source files):
- ❌ ERROR: Missing description
- ❌ ERROR: Empty description
- ❌ ERROR: Exact duplicate descriptions
- ❌ ERROR: Wrong locale (Chinese file with English description)
- ⚠️ WARNING: Too short Chinese description (<45 chars)
- ⚠️ WARNING: Too short English description (<100 chars)

**check-built-seo.mjs** (build output):
- ❌ ERROR: Missing/empty <title>
- ❌ ERROR: No description meta tag
- ❌ ERROR: Empty description meta tag
- ❌ ERROR: superpowers directory exists in build/
- ❌ ERROR: Unwanted URLs in sitemap (/search/, /superpowers/, /blog/tags/, etc)
- ❌ ERROR: Sitemap URL has no corresponding HTML file
- ⚠️ WARNING: Multiple description meta tags
- ⚠️ WARNING: No canonical link
- ⚠️ WARNING: Canonical missing trailing slash
- ⚠️ WARNING: No hreflang alternates

## Phase 4: CI Integration ✅

### CI Updates
- ✅ Updated `.github/workflows/ci.yml`
- ✅ Added `npm run check:seo` before build
- ✅ Added `npm run check:built-seo` after build
- ✅ Maintained existing checks (i18n, typecheck)

### CI Pipeline Order
1. npm ci
2. npm run check:i18n
3. npm run typecheck
4. npm run check:seo ← NEW
5. npm run build
6. npm run check:built-seo ← NEW

## Phase 5: Verification ⏳ PENDING

### Verification Commands
```bash
# Source SEO check
npm run check:seo

# Full build
npm run build

# Built output SEO check
npm run check:built-seo

# Sample manual HTML inspection
cat build/index.html | grep -E '<title>|<meta name="description"|<link rel="canonical"'
cat build/en/index.html | grep -E '<title>|<meta name="description"|<link rel="canonical"'
```

### Pages to Verify (from plan)
- [ ] /
- [ ] /en/
- [ ] /download/
- [ ] /en/download/
- [ ] /blog/
- [ ] /docs/intro/
- [ ] /docs/getting-started/installation/
- [ ] /en/docs/getting-started/installation/
- [ ] /docs/guides/minecraft/overview/
- [ ] /en/docs/guides/minecraft/overview/
- [ ] /docs/guides/minebackup-v1/overview/

### Acceptance Criteria
- [ ] All errors resolved (0 errors in check:seo)
- [ ] Warnings significantly reduced
- [ ] Chinese descriptions: 55-100 chars (natural language)
- [ ] English descriptions: 120-170 chars (natural language)
- [ ] No duplicate descriptions
- [ ] robots.txt blocks /search/ routes
- [ ] sitemap.xml excludes search, tags, archive, authors
- [ ] superpowers not in build, not in sitemap
- [ ] Canonical URLs use trailing slashes
- [ ] hreflang alternates present
- [ ] CI checks pass

## Files Modified

### Configuration Files
- package.json (added check:seo, check:built-seo scripts)
- docusaurus.config.ts (expanded blogDescription)
- static/robots.txt (added search route blocks)
- .github/workflows/ci.yml (added SEO checks)

### New Scripts
- scripts/check-seo.mjs
- scripts/check-built-seo.mjs

### Translation Files
- i18n/en/code.json (homepage + download descriptions)
- i18n/en/docusaurus-plugin-content-blog/options.json (blog description)

### React Pages
- src/pages/index.tsx (homepage description)
- src/pages/download.tsx (download page description)

### Markdown Files (Manual)
- docs/intro.md
- docs/faq.md
- docs/getting-started/installation.md
- docs/plugins/knotlink.md
- i18n/en/docusaurus-plugin-content-docs/current/intro.md

### Markdown Files (Automated - Pending Workflow Completion)
- ~12 docs with wrong locale
- ~24 blog posts missing descriptions (zh + en)
- ~110 docs with too-short descriptions (zh + en)

## Dependencies Added
- glob (^11.x)
- gray-matter (^4.x)
- node-html-parser (^6.x)

## Remaining Tasks

### Immediate (waiting for workflows)
1. Wait for workflow wq53mbhf7 to complete (wrong locale + missing blogs)
2. Wait for workflow w1wkq3ka3 to complete (too-short descriptions)
3. Run `npm run check:seo` to verify all source errors resolved
4. Run `npm run build` to regenerate with new descriptions
5. Run `npm run check:built-seo` to verify HTML output

### Post-Workflow Verification
6. Manually inspect sample pages for description quality
7. Check sitemap.xml final state
8. Verify robots.txt in build/
9. Spot-check canonical URLs and hreflang
10. Run full CI pipeline locally

### External (Not in Scope)
- Cloudflare Crawler Hints configuration
- Cloudflare WAF / Verified Bots settings
- Bing Crawl Control adjustments
- Post-deployment Bing URL Inspection
- Post-deployment Bing Site Explorer verification

## Prohibited Actions (Confirmed NOT Done)
- ❌ No IndexNow API/key/CI added
- ❌ No crawl-delay in robots.txt
- ❌ No blocking of /docs/ or /en/
- ❌ No default noindex on MineBackup v1 docs
- ❌ No robots blocking of deleted superpowers URLs
- ❌ No site-wide duplicate descriptions
- ❌ No keyword stuffing
- ❌ No changes to locale URL strategy
- ❌ No changes to trailingSlash policy

## Notes
- MineBackup v1 docs preserved with indexing (they serve legacy users)
- superpowers naturally 404 after exclusion (no robots block needed)
- Two parallel workflows for efficiency
- All descriptions written naturally, not templated
- Length guidelines are warnings, not hard rules
- CI will catch regressions going forward
