---
title: English Localization Complete Pass
date: 2026-06-04
status: approved
---

# English Localization Complete Pass

## Goal

Complete and polish the English localization of FolderRewind-Site so that all Chinese content has a high-quality English counterpart. This includes translating missing sections, polishing existing translations, and updating infrastructure.

## Scope

### New translations (files to create)

| Section | Files | Location |
|---------|-------|----------|
| Architecture docs | 8 .md + 1 `_category_.json` | `i18n/en/.../current/architecture/` |
| MineBackup v1 docs | 15 .md + 1 `_category_.json` | `i18n/en/.../current/guides/minebackup-v1/` |
| Plugin tutorial | 1 .md | `i18n/en/.../current/plugins/developing/tutorial.md` |

### Existing content to polish

| Section | Files |
|---------|-------|
| Getting-started docs | 3 .md |
| Guides docs | 13 .md |
| Plugin docs | 7 .md |
| FAQ | 1 .md |
| Blog posts | 7 .md |
| UI strings | code.json, navbar.json, footer.json, current.json |

### Infrastructure changes

- Add `'项目架构'` category to `sidebars.ts` (collapsed: true)
- Add `_category_.json` for architecture and minebackup-v1 in English i18n
- Soften AI caution banner in `intro.md`

## Translation Guidelines

### Tone strategy

| Content type | Tone |
|--------------|------|
| Getting-started, guides, FAQ | Friendly, approachable, tutorial-like |
| Plugin development docs | Technical, precise, developer-focused |
| Blog release notes | Neutral, factual, concise |
| UI strings (code.json) | Short, clear, action-oriented |

### Naming conventions

- "FolderRewind" — use as-is, never translate
- "存档时光机" → "FolderRewind" (default); "Backup Time Machine" only as a tagline where branding demands it
- "MineBackup" — keep as-is (first-generation predecessor)
- "MineRewind", "KnotLink" — keep as-is (proper nouns)
- "一代时光机" → "MineBackup (Legacy)" or "MineBackup" depending on context

### Structural rules

- Preserve all markdown structure, frontmatter, and code blocks
- Internal links: use relative paths (same as Chinese source)
- Code blocks, command examples: copy verbatim, translate comments only
- Admonitions (:::caution, :::tip, etc.): translate the content, keep the syntax
- Images: reference the same paths (no image changes needed)

## Execution Order

1. **Infrastructure** — `sidebars.ts` (add architecture section), `_category_.json` files
2. **Architecture docs** (8 new files) — technical tone
3. **MineBackup v1 docs** (15 new files) — friendly/tutorial tone
4. **Plugin tutorial** (1 new file) — technical tone
5. **Polish existing getting-started docs** (3 files) — soften AI banner in `intro.md`
6. **Polish existing guides** (13 files)
7. **Polish existing plugin docs** (7 files)
8. **Polish existing blog posts** (7 files)
9. **Verify UI strings** (code.json, navbar.json, footer.json, current.json)
10. **Final build check** — `npm run build` to verify no broken links

Each step gets its own git commit.

## Quality Bar

- Every English page should read naturally to a native English speaker
- No leftover Chinese text in any English file
- All internal links must resolve (no broken links)
- `npm run build` must pass cleanly
- The AI caution banner in `intro.md` should be softened to: "English is a secondary language — if you spot inaccuracies, contributions are welcome."
