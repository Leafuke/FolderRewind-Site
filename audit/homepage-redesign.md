# Homepage redesign — 2026-10-05

## Follow-up: screenshot edges and motion

User feedback requested cropped screenshot edges, hover-to-front behavior,
sharper hero media, scroll reveals and softer navigation. Presentation images
now crop 2px from all four edges (1604 × 1113). Full-size WebP derivatives are
lossless, up to 82,562 bytes; 800px derivatives use quality 94. Raw PNGs remain
unchanged. The hero always requests the full-size lossless image. Gallery
links/dialogs and no-script links use the cropped full-size WebP, superseding
the original PNG presentation paths described in the initial delivery below.

The hero returns to an untransformed, front-facing view over 480ms on hover
or keyboard focus. Lower-page blocks reveal once with a 620ms fade and 24px
rise. Already-visible content is never hidden; focus reveals a block immediately.
Reduced motion and forced colors disable scroll reveals, including live changes.

`src/routeMotion.ts` uses Docusaurus onRouteUpdate/onRouteDidUpdate: the outgoing
content dims gently during preload, then the destination fades/slides into place
over 280ms. It does not intercept links, delay navigation, change scroll restoration,
or animate hash-only navigation. Animation/listener cleanup handles fast navigation;
reduced-motion and forced-color preferences disable these effects.

Browser checks observed the 1604px hero source, hover/focus return to `transform:
none`, 7 blocks revealing after scrolling to the gallery, and an active 0.35-opacity /
8px entrance transform on back navigation. TypeScript, the full check:all suite,
and a subsequent bilingual build passed. The initial Lighthouse numbers below
predate this refinement and are not asserted as a fresh performance measurement.

## Delivered

The Chinese and English homepages now use a cool gray/teal visual system,
real application captures, numbered sections, a three-step introduction,
manual screenshot tabs, capability rows, secondary ecosystem links and a
download panel. The visual reference was the Fluent-Qt website; no reference
project code, artwork or screenshots were copied. Existing Docusaurus routes,
search, locale menu, theme control and download destinations are retained.

Homepage navigation/footer styling is scoped through the presence of the
homepage CSS-module class. Documentation, download and blog navigation was
checked after client-side navigation: the homepage selectors no longer match.

## Screenshot review

The user supplied 14 PNG files, all 1608 × 1117. Twelve were selected to cover
three scenes, two locales and two themes. Home captures show useful sample
projects rather than an empty state; history captures contain actual version
rows and restore status. Original PNG bytes are preserved and SHA-256 checked.
Responsive 800px and 1608px WebP derivatives retain the entire window.
The largest WebP is 65,740 bytes.

The user confirmed application version **1.9.4**. This is displayed below the
gallery and recorded in `static/img/homepage/manifest.json`; it does not claim
that 1.9.4 is the current public release or change the existing 1.9.3 docs baseline.

| Scene | Chinese light / dark source time | English light / dark source time |
| --- | --- | --- |
| Home | 202500 / 202444 | 203843 / 203759 |
| Advanced history | 203121 / 203313 | 203852 / 203812 |
| Restore confirmation | 203245 / 203330 | 203905 / 203832 |

Source names are `屏幕截图 2026-10-05 <time>.png`. The two remaining Chinese
normal-history captures are not used. The locales contain different sample
histories, and the restore captures select different versions; captions do not
assert identical data. All restore captures show **backup before restore disabled**.
The caption explicitly asks users to check that option and does not imply that
these screenshots demonstrate protected or successful restore execution.

## Validation

- `npm run check:all`: passed, including 4 translation extraction tests, 16 release
  policy tests, bilingual parity, TypeScript, contracts, images, SEO, both builds,
  built SEO for 208 pages and 158 preserved original bilingual routes/anchors.
- Translation IDs are extracted from the TypeScript AST for Docusaurus imports;
  unrelated DOM anchors, objects, comments and strings no longer create false
  translation requirements. Alias imports and missing real translations are tested.
- Both languages × light/dark × 1440, 1024, 768, 390 and 320px: no document
  horizontal overflow or off-screen homepage headings/buttons/links.
- Screenshot tabs, Left/Right/End keyboard navigation, original PNG dialogs,
  Escape/close button, modal focus containment and return to the triggering link:
  verified. Mobile navigation opens/closes and locale navigation resolves correctly.
- Particle pause/resume, off-screen suspension and narrow-screen disabling:
  verified in the browser. The effect contains 96 particles, caps drawing at 30fps
  and DPR at 1.5, and releases animation frames, observers and listeners on cleanup.
- Static HTML and local image/document links checked for both locales; script-free
  preview renders the title, content, images and download links. Original-image
  alternatives for all scenes are present in `noscript`.
- No browser error/warning logs were observed during interaction checks.
- `git diff --check`: passed.

Browser-control limitations: background-tab visibility could not be forced (the
embedded browser kept reporting visible). OS reduced-motion/forced-colors and a
browser-level JavaScript-disabled session were not emulated. Their code paths and
static fallbacks were reviewed, but those specific environment transitions still
need manual verification. No new desktop backup/restore acceptance is claimed.

## Performance and preview artifacts

Lighthouse 12.8.2, Windows Edge headless, default mobile simulated throttling,
fresh local runs, same production build served with gzip for HTML/JS/CSS.
Reports and settings are under ignored `artifacts/homepage/`.

| Run | Performance | Accessibility | CLS | LCP |
| --- | ---: | ---: | ---: | ---: |
| Mobile 1 | 97 | 100 | 0 | 2.550 s |
| Mobile 2 | 97 | 100 | 0 | 2.547 s |
| Mobile 3 | 91 | 100 | 0 | 2.899 s |
| Median | **97** | **100** | **0** | **2.550 s** |
| Desktop (1440 × 1000) | 100 | 100 | 0 | See raw report |

Observed image transfer totals, including below-fold images loaded by the
browser, were 68,048 bytes on mobile and 146,962 bytes on desktop, below 500KB.
Light/dark captures are selected by CSS before hydration, avoiding a late image
source replacement; both hero theme variants remain well within the image budget.

The stock uncompressed `docusaurus serve` runs scored 82 and 75. The target score
therefore assumes production compression; it is not a claim about the currently
deployed site. `artifacts/homepage/serve-compressed.mjs` is a local measurement
fixture, not a new application service or deployment configuration.

- `artifacts/homepage/desktop.jpg`, `mobile.jpg`: Lighthouse viewport captures.
- `artifacts/homepage/lighthouse-mobile-{1,2,3}.json`: three comparable reports.
- `artifacts/homepage/lighthouse-desktop.json`: desktop report.
- `artifacts/homepage/metrics.json`: mobile settings and extracted measurements.

Full-page Lighthouse captures also exist locally, but off-screen lazy images may
not have loaded when captured; use the live preview to inspect the gallery.

## Maintenance

UI copy lives in `src/components/Homepage/copy.ts` with English messages in the
existing locale catalog. `screenshots.ts` is the internal scene/locale/theme asset
contract; the manifest records provenance independently of the public release.
Replace all four variants together when refreshing a scene. Update the version
caption and manifest if the capture version changes.

No dependency or deployment change is required. Prettier and Lighthouse were run
via temporary npm tooling, without adding them to the site's dependencies.
