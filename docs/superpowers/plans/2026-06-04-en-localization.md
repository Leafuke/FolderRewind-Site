# English Localization Complete Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete and polish the English localization of FolderRewind-Site so all Chinese content has a high-quality English counterpart.

**Architecture:** Docusaurus i18n — Chinese is the default locale (`docs/`, `blog/`), English lives under `i18n/en/`. New translations are created as files under `i18n/en/docusaurus-plugin-content-docs/current/` and `i18n/en/docusaurus-plugin-content-blog/`. Sidebar labels live in `i18n/en/docusaurus-plugin-content-docs/current.json`. UI strings in `i18n/en/code.json`.

**Tech Stack:** Docusaurus 3.9.2, React 19, TypeScript, Markdown

---

## File Map

### Files to create (new translations)

| # | File | Source |
|---|------|--------|
| 1 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/_category_.json` | `docs/architecture/` (sidebar label) |
| 2 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/index.md` | `docs/architecture/index.md` |
| 3 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/directory-structure.md` | `docs/architecture/directory-structure.md` |
| 4 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/patterns.md` | `docs/architecture/patterns.md` |
| 5 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/namespaces.md` | `docs/architecture/namespaces.md` |
| 6 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/services.md` | `docs/architecture/services.md` |
| 7 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/plugin-system.md` | `docs/architecture/plugin-system.md` |
| 8 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/data-models.md` | `docs/architecture/data-models.md` |
| 9 | `i18n/en/docusaurus-plugin-content-docs/current/architecture/views.md` | `docs/architecture/views.md` |
| 10 | `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/_category_.json` | `docs/guides/minebackup-v1/_category_.json` |
| 11–25 | `i18n/en/.../guides/minebackup-v1/*.md` (15 files) | `docs/guides/minebackup-v1/*.md` |
| 26 | `i18n/en/.../plugins/developing/tutorial.md` | `docs/plugins/developing/tutorial.md` |

### Files to modify (infrastructure)

| File | Change |
|------|--------|
| `sidebars.ts` | Add `'项目架构'` category (collapsed: true) at the end |
| `i18n/en/docusaurus-plugin-content-docs/current.json` | Add sidebar label for `项目架构` → "Architecture" |

### Files to modify (polish existing translations)

| Section | Files | Key fixes |
|---------|-------|-----------|
| Getting-started | `intro.md`, `installation.md`, `first-backup.md`, `first-restore.md` | Soften AI banner, fix duplicate heading, fix run-on sentence |
| Guides | 10 top-level + 7 minecraft | Fix fullwidth colons in `minecraft/overview.md` |
| Plugins | `quick-start.md` + 6 others | Fix awkward phrasing, misleading link |
| Blog | 7 release posts | Polish stiff phrasing, standardize "sideloaded" |
| FAQ | `faq.md` | Fix 2 broken links |

---

## Translation Conventions

- **"FolderRewind"** — never translate
- **"存档时光机"** → "FolderRewind" (default); "Backup Time Machine" only as a tagline
- **"MineBackup"** — keep as-is (first-generation predecessor)
- **"一代时光机"** → "MineBackup (Legacy)" or "MineBackup"
- **"MineRewind", "KnotLink"** — keep as-is
- **Code blocks** — copy verbatim, translate code comments only
- **Mermaid diagrams** — translate labels inside diagrams
- **Internal links** — use relative paths (same structure as Chinese source)
- **Admonitions** — translate content, keep `:::` syntax
- **Tone** — friendly/approachable for user docs, technical/precise for dev docs

---

## Task 1: Infrastructure — Sidebar and Category Labels

**Files:**
- Modify: `sidebars.ts`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current.json`

- [ ] **Step 1: Add architecture category to sidebars.ts**

Open `sidebars.ts`. Add the following category after the `plugins` category block (before `'faq'`):

```typescript
    {
      type: 'category',
      label: '项目架构',
      collapsed: true,
      items: [
        'architecture/index',
        'architecture/directory-structure',
        'architecture/patterns',
        'architecture/namespaces',
        'architecture/services',
        'architecture/plugin-system',
        'architecture/data-models',
        'architecture/views',
      ],
    },
```

- [ ] **Step 2: Add English sidebar label for architecture**

Open `i18n/en/docusaurus-plugin-content-docs/current.json`. Add the following entry:

```json
  "sidebar.docs.category.项目架构": {
    "message": "Architecture",
    "description": "The label for category '项目架构' in sidebar 'docs'"
  }
```

- [ ] **Step 3: Verify sidebar category JSON files exist**

Ensure these files exist (create if missing):

`i18n/en/docusaurus-plugin-content-docs/current/architecture/_category_.json`:
```json
{
  "label": "Architecture",
  "position": 4,
  "link": {
    "type": "generated-index",
    "description": "FolderRewind project architecture — MVVM patterns, services, data models, and plugin system."
  }
}
```

`i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/_category_.json`:
```json
{
  "label": "MineBackup (Legacy)",
  "position": 9,
  "link": {
    "type": "generated-index",
    "description": "Complete guide for MineBackup (first-generation FolderRewind): installation, configuration, backup, restore, automation, and advanced features."
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add sidebars.ts i18n/en/docusaurus-plugin-content-docs/current.json i18n/en/docusaurus-plugin-content-docs/current/architecture/_category_.json i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/_category_.json
git commit -m "feat(i18n): add architecture sidebar category and English category labels"
```

---

## Task 2: Architecture Docs — index.md and directory-structure.md

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/index.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/directory-structure.md`

**Tone:** Technical, precise

- [ ] **Step 1: Translate architecture/index.md**

Read `docs/architecture/index.md` (86 lines, 1 Mermaid diagram). Translate to English. Key points:
- Title: "Architecture Overview"
- Translate the tech stack table
- Translate Mermaid diagram labels (Views, ViewModels, Services, Models, Plugins, External)
- Translate the documentation navigation table
- Keep all code/technical references intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/index.md`.

- [ ] **Step 2: Translate architecture/directory-structure.md**

Read `docs/architecture/directory-structure.md` (135 lines, 2 plain-text code blocks). Translate to English. Key points:
- Title: "Directory Structure"
- Translate prose descriptions, keep directory tree listings as-is
- Translate the key entry files table at the end
- Keep all paths and filenames unchanged

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/directory-structure.md`.

- [ ] **Step 3: Verify no Chinese text remains**

Check both files for any remaining Chinese characters (excluding code blocks and file paths).

- [ ] **Step 4: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/architecture/index.md i18n/en/docusaurus-plugin-content-docs/current/architecture/directory-structure.md
git commit -m "docs(i18n): translate architecture overview and directory structure"
```

---

## Task 3: Architecture Docs — patterns.md and namespaces.md

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/patterns.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/namespaces.md`

**Tone:** Technical, precise

- [ ] **Step 1: Translate architecture/patterns.md**

Read `docs/architecture/patterns.md` (71 lines, 1 Mermaid diagram). Translate to English. Key points:
- Title: "Architectural Patterns"
- Translate MVVM, static service architecture, Shell navigation, config-driven design, partial class organization, serialization sections
- Translate Mermaid diagram labels (ShellPage, ContentFrame, NavigationService, Pages)
- Keep code references like `[ObservableProperty]`, `AppJsonContext` intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/patterns.md`.

- [ ] **Step 2: Translate architecture/namespaces.md**

Read `docs/architecture/namespaces.md` (23 lines, table only). Translate to English. Key points:
- Title: "Namespace Reference"
- Translate table headers (Namespace, Responsibility, Key Classes, Source Directory)
- Translate responsibility descriptions
- Keep namespace names and class names intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/namespaces.md`.

- [ ] **Step 3: Verify no Chinese text remains**

- [ ] **Step 4: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/architecture/patterns.md i18n/en/docusaurus-plugin-content-docs/current/architecture/namespaces.md
git commit -m "docs(i18n): translate architecture patterns and namespaces"
```

---

## Task 4: Architecture Docs — services.md and plugin-system.md

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/services.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/plugin-system.md`

**Tone:** Technical, precise

- [ ] **Step 1: Translate architecture/services.md**

Read `docs/architecture/services.md` (67 lines, tables). Translate to English. Key points:
- Title: "Service Layer Overview"
- Translate domain group headers (Core Backup, Automation & Scheduling, Plugin & Extension, UI Helpers, System Integration, Security, Other)
- Translate table headers and responsibility descriptions
- Keep service class names intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/services.md`.

- [ ] **Step 2: Translate architecture/plugin-system.md**

Read `docs/architecture/plugin-system.md` (91 lines, 2 Mermaid diagrams). Translate to English. Key points:
- Title: "Plugin System"
- Translate Mermaid diagram labels (interface hierarchy and lifecycle)
- Translate interface descriptions and lifecycle explanations
- Keep all interface names (`IFolderRewindPlugin`, etc.) and protocol details intact
- Translate the KnotLink protocol section

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/plugin-system.md`.

- [ ] **Step 3: Verify no Chinese text remains**

- [ ] **Step 4: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/architecture/services.md i18n/en/docusaurus-plugin-content-docs/current/architecture/plugin-system.md
git commit -m "docs(i18n): translate architecture services and plugin system"
```

---

## Task 5: Architecture Docs — data-models.md and views.md

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/data-models.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/architecture/views.md`

**Tone:** Technical, precise

- [ ] **Step 1: Translate architecture/data-models.md**

Read `docs/architecture/data-models.md` (91 lines, 1 Mermaid diagram). Translate to English. Key points:
- Title: "Data Models"
- Translate Mermaid diagram labels (AppConfig hierarchy)
- Translate model descriptions (AppConfig, BackupConfig, ManagedFolder, etc.)
- Translate metadata models section
- Keep all class names, property names, and file references intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/data-models.md`.

- [ ] **Step 2: Translate architecture/views.md**

Read `docs/architecture/views.md` (70 lines, 1 Mermaid diagram). Translate to English. Key points:
- Title: "Views and Navigation"
- Translate page listing table, dialog listing table, settings sub-controls table
- Translate Mermaid diagram labels (navigation flow)
- Keep XAML file names, ViewModel names, and navigation tags intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/architecture/views.md`.

- [ ] **Step 3: Verify no Chinese text remains**

- [ ] **Step 4: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/architecture/data-models.md i18n/en/docusaurus-plugin-content-docs/current/architecture/views.md
git commit -m "docs(i18n): translate architecture data models and views"
```

---

## Task 6: MineBackup v1 Docs — Batch 1 (overview, installation, first-config, first-backup, first-restore)

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/overview.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/installation.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-config.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-backup.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-restore.md`

**Tone:** Friendly, approachable (user-facing docs)

- [ ] **Step 1: Translate overview.md**

Read `docs/guides/minebackup-v1/overview.md` (~85 lines). Translate to English. Key points:
- Title: "MineBackup Overview"
- Explain this is the first-generation predecessor to FolderRewind
- Translate feature list and comparison with FolderRewind

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/overview.md`.

- [ ] **Step 2: Translate installation.md**

Read `docs/guides/minebackup-v1/installation.md` (~88 lines). Translate. Title: "Installation and Setup".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/installation.md`.

- [ ] **Step 3: Translate first-config.md**

Read `docs/guides/minebackup-v1/first-config.md` (~148 lines, 3 code blocks, 3 images). Translate. Title: "Creating Your First Config". Keep image paths and code blocks intact, translate comments.

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-config.md`.

- [ ] **Step 4: Translate first-backup.md**

Read `docs/guides/minebackup-v1/first-backup.md` (~64 lines). Translate. Title: "Your First Backup".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-backup.md`.

- [ ] **Step 5: Translate first-restore.md**

Read `docs/guides/minebackup-v1/first-restore.md` (~70 lines). Translate. Title: "Your First Restore".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-restore.md`.

- [ ] **Step 6: Verify no Chinese text remains in all 5 files**

- [ ] **Step 7: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/overview.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/installation.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-config.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-backup.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/first-restore.md
git commit -m "docs(i18n): translate minebackup-v1 getting started (5 files)"
```

---

## Task 7: MineBackup v1 Docs — Batch 2 (backup-modes, history-and-restore, automation, special-mode, hot-backup)

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/backup-modes.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/history-and-restore.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/automation.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/special-mode.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/hot-backup.md`

**Tone:** Friendly, approachable

- [ ] **Step 1: Translate backup-modes.md**

Read `docs/guides/minebackup-v1/backup-modes.md` (~70 lines). Translate. Title: "Backup Modes (Full / Smart / Overwrite)".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/backup-modes.md`.

- [ ] **Step 2: Translate history-and-restore.md**

Read `docs/guides/minebackup-v1/history-and-restore.md` (~57 lines). Translate. Title: "History and Restore Strategy".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/history-and-restore.md`.

- [ ] **Step 3: Translate automation.md**

Read `docs/guides/minebackup-v1/automation.md` (~69 lines). Translate. Title: "Automation Tasks".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/automation.md`.

- [ ] **Step 4: Translate special-mode.md**

Read `docs/guides/minebackup-v1/special-mode.md` (~54 lines). Translate. Title: "Special Config Mode".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/special-mode.md`.

- [ ] **Step 5: Translate hot-backup.md**

Read `docs/guides/minebackup-v1/hot-backup.md` (~51 lines). Translate. Title: "Hot Backup and Snapshots".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/hot-backup.md`.

- [ ] **Step 6: Verify no Chinese text remains in all 5 files**

- [ ] **Step 7: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/backup-modes.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/history-and-restore.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/automation.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/special-mode.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/hot-backup.md
git commit -m "docs(i18n): translate minebackup-v1 guides batch 2 (5 files)"
```

---

## Task 8: MineBackup v1 Docs — Batch 3 (filters, knotlink-integration, service-mode, troubleshooting, faq)

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/filters.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/knotlink-integration.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/service-mode.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/troubleshooting.md`
- Create: `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/faq.md`

**Tone:** Friendly, approachable

- [ ] **Step 1: Translate filters.md**

Read `docs/guides/minebackup-v1/filters.md` (~47 lines). Translate. Title: "Blacklists and Restore Whitelists".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/filters.md`.

- [ ] **Step 2: Translate knotlink-integration.md**

Read `docs/guides/minebackup-v1/knotlink-integration.md` (~51 lines). Translate. Title: "KnotLink Integration".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/knotlink-integration.md`.

- [ ] **Step 3: Translate service-mode.md**

Read `docs/guides/minebackup-v1/service-mode.md` (~54 lines). Translate. Title: "Service Mode (Windows)".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/service-mode.md`.

- [ ] **Step 4: Translate troubleshooting.md**

Read `docs/guides/minebackup-v1/troubleshooting.md` (~81 lines). Translate. Title: "Troubleshooting".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/troubleshooting.md`.

- [ ] **Step 5: Translate faq.md**

Read `docs/guides/minebackup-v1/faq.md` (~70 lines). Translate. Title: "FAQ (MineBackup Legacy)".

Write to `i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/faq.md`.

- [ ] **Step 6: Verify no Chinese text remains in all 5 files**

- [ ] **Step 7: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/filters.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/knotlink-integration.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/service-mode.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/troubleshooting.md i18n/en/docusaurus-plugin-content-docs/current/guides/minebackup-v1/faq.md
git commit -m "docs(i18n): translate minebackup-v1 guides batch 3 (5 files)"
```

---

## Task 9: Plugin Tutorial Translation

**Files:**
- Create: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/tutorial.md`

**Tone:** Technical, precise (developer docs)

- [ ] **Step 1: Translate plugins/developing/tutorial.md**

Read `docs/plugins/developing/tutorial.md` (~669 lines). This is the longest single file. Translate to English. Key points:
- Title: "Tutorial: Building a Game Save Backup Plugin"
- Translate all prose, section headers, and table content
- Keep all code blocks intact except Chinese comments — translate those to English
- Translate `DisplayName`, `Description` strings in code (they're user-facing Chinese UI strings)
- Keep `MineRewind 对比` comparison blocks as "MineRewind comparison:" sidebars
- Translate the PluginHostContext API table
- Keep all interface names, method signatures, and code structure intact

Write to `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/tutorial.md`.

- [ ] **Step 2: Update English quick-start.md to link to tutorial**

Read `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/quick-start.md`. Add a link to the tutorial in the References section:

```markdown
- [Tutorial: Building a Game Save Backup Plugin](./tutorial) — build a complete plugin step by step
```

- [ ] **Step 3: Fix known issues in quick-start.md**

While editing, fix these known issues:
- Line 81: Change `[MineRewind source](https://github.com/Leafuke/FolderRewind)` to `[MineRewind source](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft)`
- Line 83: Change "this docs section" to "the docs below"

- [ ] **Step 4: Verify no Chinese text remains**

- [ ] **Step 5: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/tutorial.md i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/quick-start.md
git commit -m "docs(i18n): translate plugin tutorial and fix quick-start references"
```

---

## Task 10: Polish Getting-Started Docs + Soften AI Banner

**Files:**
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/intro.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/getting-started/installation.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/getting-started/first-backup.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/getting-started/first-restore.md`

**Tone:** Friendly, approachable

- [ ] **Step 1: Fix intro.md**

Read `i18n/en/docusaurus-plugin-content-docs/current/intro.md`. Apply these fixes:

1. **Lines 11-13 — Soften AI banner:** Replace:
   ```markdown
   :::caution About the English docs
   The current English documentation is AI-translated and may contain inaccuracies. Please double-check key details before applying them in production.
   :::
   ```
   With:
   ```markdown
   :::caution Note
   English is a secondary language for this project — if you spot inaccuracies, contributions are welcome.
   :::
   ```

2. **Line 9 — Fix run-on sentence:** Replace:
   ```markdown
   Welcome to **FolderRewind (Backup Time Machine)**. It is a modern backup tool for important files, project data, and game saves, and also the successor to MineBackup.
   ```
   With:
   ```markdown
   Welcome to **FolderRewind** — a modern backup tool for important files, project data, and game saves. FolderRewind is the successor to MineBackup.
   ```

3. **Lines 82-84 — Remove duplicate heading:** Delete the `### v1.6.0: template workflow` heading (line 82 area), keep only `### Template workflow`.

- [ ] **Step 2: Review installation.md**

Read `i18n/en/.../getting-started/installation.md`. The agent review found no issues — verify it reads naturally. Make any minor polish if needed.

- [ ] **Step 3: Review first-backup.md**

Read `i18n/en/.../getting-started/first-backup.md`. No issues found — verify and move on.

- [ ] **Step 4: Review first-restore.md**

Read `i18n/en/.../getting-started/first-restore.md`. Minor polish if needed (the "take over" phrasing at line 39).

- [ ] **Step 5: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/intro.md i18n/en/docusaurus-plugin-content-docs/current/getting-started/installation.md i18n/en/docusaurus-plugin-content-docs/current/getting-started/first-backup.md i18n/en/docusaurus-plugin-content-docs/current/getting-started/first-restore.md
git commit -m "docs(i18n): polish getting-started docs and soften AI banner"
```

---

## Task 11: Polish Existing Guides

**Files:**
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/backup-file-spec.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/backup-modes.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/cloud-archive.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/data-migration.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/encryption.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/filters.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/history-timeline.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/mini-window.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/template-sharing.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/guides/automation.md`

**Tone:** Friendly, approachable

- [ ] **Step 1: Fix guides/automation.md**

Read and fix line 89: "Best practice is combining" → "Best practice is to combine"

- [ ] **Step 2: Review remaining top-level guides**

Read each of the remaining 9 top-level guide files. The agent review found them clean — verify each reads naturally. Make minor polish if needed.

- [ ] **Step 3: Fix minecraft/overview.md — leftover fullwidth colons**

Read `i18n/en/docusaurus-plugin-content-docs/current/guides/minecraft/overview.md`. Fix lines 15-16:
- Replace `：` (fullwidth colon) with `:` (standard colon) in the mod link lines
- Or better: reformat as proper Markdown links

- [ ] **Step 4: Review remaining minecraft guides**

Read each of the 6 remaining minecraft guide files. The agent review found them clean — verify.

- [ ] **Step 5: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/guides/
git commit -m "docs(i18n): polish existing guide translations"
```

---

## Task 12: Polish Existing Plugin Docs

**Files:**
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/overview.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/using-plugins.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/knotlink.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/plugin-api.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/hotkey-api.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/knotlink-api.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/settings-schema.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/packaging.md`
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/plugins/developing/auto-update.md`

**Tone:** Technical, precise

- [ ] **Step 1: Review all plugin docs**

The agent review found all 9 plugin docs (excluding quick-start, already handled in Task 9) to be clean and well-translated. Read each file and verify. No changes expected unless minor polish is needed.

- [ ] **Step 2: Commit (only if changes made)**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/plugins/
git commit -m "docs(i18n): polish existing plugin doc translations"
```

If no changes were needed, skip this commit.

---

## Task 13: Polish Existing Blog Posts

**Files:**
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-01-15-v1.4.0-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-02-20-v1.4.1-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-03-01-v1.4.2-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-03-11-v1.5.0-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-03-21-v1.6.0-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-04-05-v1.6.1-release.md`
- Modify: `i18n/en/docusaurus-plugin-content-blog/2026-04-16-v1.7.0-release.md`

**Tone:** Neutral, factual, concise

- [ ] **Step 1: Fix v1.4.0-release.md (most issues)**

Read and fix:
- "you will have a one-time opportunity to set a password" → "you can only set the password once"
- "Support for plugins to invoke connectivity features" → "Plugins can now invoke connectivity features"
- "reducing additional time consumption" → "reducing extra processing time"
- "Fixed adjustable range issues for compression levels corresponding to different compression algorithms" → "Fixed the valid range for compression-level sliders per algorithm"

- [ ] **Step 2: Fix v1.4.2-release.md**

Read and fix:
- "Support for displaying more historical node information" → "More detail on history entries"

- [ ] **Step 3: Fix v1.5.0-release.md**

Read and fix:
- "more operational guard rails" → "more operational safeguards"
- "test save" → "test save file" or just remove
- "Added safe deletion for history records" → "Added safe-delete for history records"

- [ ] **Step 4: Fix v1.6.0-release.md**

Read and fix:
- Standardize "side-loaded" → "sideloaded" throughout the file
- "Recommended after upgrading" → "Post-upgrade checklist"

- [ ] **Step 5: Fix v1.6.1-release.md**

Read and fix:
- "better background-task ergonomics" → "better background-task management"
- "this update should feel more stable" → "this update should improve stability"

- [ ] **Step 6: Fix v1.7.0-release.md**

Read and fix:
- "Choose selected auto-backup targets" → "Select specific auto-backup targets"

- [ ] **Step 7: Review v1.4.1-release.md**

The agent review found this file clean — verify and move on.

- [ ] **Step 8: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-blog/
git commit -m "docs(i18n): polish blog post translations"
```

---

## Task 14: Polish FAQ

**Files:**
- Modify: `i18n/en/docusaurus-plugin-content-docs/current/faq.md`

- [ ] **Step 1: Fix broken links in faq.md**

Read `i18n/en/docusaurus-plugin-content-docs/current/faq.md`. Fix:
1. Line 76: `./guides/cloud-archive` → `../guides/cloud-archive` (wrong relative path from FAQ)
2. Line 139: `/docs/plugins/developing/quick-start` → `../plugins/developing/quick-start` (absolute path → relative)

- [ ] **Step 2: Review rest of FAQ**

Verify the rest reads naturally. Make minor polish if needed.

- [ ] **Step 3: Commit**

```bash
git add i18n/en/docusaurus-plugin-content-docs/current/faq.md
git commit -m "fix(i18n): fix broken links in English FAQ"
```

---

## Task 15: Verify UI Strings

**Files:**
- Review: `i18n/en/code.json`
- Review: `i18n/en/docusaurus-theme-classic/navbar.json`
- Review: `i18n/en/docusaurus-theme-classic/footer.json`
- Review: `i18n/en/docusaurus-plugin-content-docs/current.json`

- [ ] **Step 1: Review code.json**

Read `i18n/en/code.json`. The agent review found it fully translated. Verify all strings read naturally. Check for any "Backup Time Machine" references that should be simplified.

Note: `download.description` uses "Backup Time Machine" — this is acceptable as a tagline. `homepage.cta.desc` also uses it — acceptable.

- [ ] **Step 2: Review navbar.json, footer.json, current.json**

Read all three files. The agent review found them clean. Verify sidebar labels match the spec:
- `开始使用` → "Getting Started" ✅
- `使用指南` → "Guides" ✅
- `Minecraft 专题` → "Minecraft Guide" ✅
- `一代时光机（MineBackup）` → "MineBackup (Legacy)" ✅
- `插件生态` → "Plugins" ✅
- `插件开发` → "Plugin Development" ✅
- `项目架构` → "Architecture" (added in Task 1)

- [ ] **Step 3: Commit (only if changes made)**

If any changes were needed:
```bash
git add i18n/en/code.json i18n/en/docusaurus-theme-classic/ i18n/en/docusaurus-plugin-content-docs/current.json
git commit -m "fix(i18n): polish English UI strings"
```

If no changes needed, skip.

---

## Task 16: Final Build Check

- [ ] **Step 1: Install dependencies**

```bash
cd d:/Programs/FolderRewind/FolderRewind-Site
npm install
```

- [ ] **Step 2: Build Chinese locale**

```bash
npm run build -- --locale zh-Hans
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Build English locale**

```bash
npm run build -- --locale en
```

Expected: Build succeeds with no broken link errors.

- [ ] **Step 4: If build fails, fix issues**

Common issues:
- Broken relative links in translated docs
- Missing `_category_.json` files
- Sidebar references to non-existent docs

Fix any issues and rebuild until clean.

- [ ] **Step 5: Final commit (if fixes needed)**

```bash
git add -A
git commit -m "fix(i18n): fix build issues from localization pass"
```

---

## Completion Checklist

After all tasks are done, verify:

- [ ] All 57 Chinese docs have English counterparts
- [ ] All 7 blog posts have English translations
- [ ] `sidebars.ts` includes the architecture category
- [ ] `current.json` has the architecture sidebar label
- [ ] No English file contains leftover Chinese text (outside code blocks)
- [ ] `intro.md` has the softened AI banner
- [ ] `faq.md` has no broken links
- [ ] `minecraft/overview.md` has no fullwidth colons
- [ ] `npm run build -- --locale en` passes cleanly
- [ ] `npm run build -- --locale zh-Hans` passes cleanly
