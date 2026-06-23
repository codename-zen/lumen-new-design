# Lumen UI Kit — Build Execution Prompt

> Paste this entire file as the first message in a fresh session.
> Project: I:\projects\lumen-new-design
> GitHub: https://github.com/codename-zen/lumen-new-design

---

## CONTEXT

You are building out a complete UI kit for Lumen v2 Design at `I:\projects\lumen-new-design`. This is a static HTML/CSS/JS prototype (no framework, no build step). The design system is already locked — your job is to build missing pages and components WITHOUT changing existing design style.

## MANDATORY READS — DO THIS FIRST

Before writing ANY code, read these 3 files:

1. `I:\projects\lumen-new-design\DESIGN.md` — all design tokens (colors, typography, spacing, radius, shadows, component spec, CSS architecture)
2. `I:\projects\lumen-new-design\AGENTS.md` — enforcement rules (token-only, BEM, @layer, semantic HTML, no inline styles, no px for spacing)
3. `I:\projects\lumen-new-design\ENFORCEMENT-RULES.md` — 12 hard rules + verification checklist

Also read the existing codebase to understand current patterns:
4. `I:\projects\lumen-new-design\index.html` — current HTML structure, JS routing, component patterns
5. `I:\projects\lumen-new-design\styles.css` — current CSS tokens, @layer architecture, component styles

## DESIGN ENFORCEMENT — NON-NEGOTIABLE

### Token System
- Colors: `var(--color-accent)`, `var(--color-surface)`, `var(--color-text-primary)`, etc. NEVER raw hex in components.
- Typography: `var(--text-sm)`, `var(--text-md)`, `var(--font-regular)`, `var(--font-medium)`, `var(--font-semibold)`. NEVER `text-[NNpx]`.
- Spacing: `var(--space-1)` through `var(--space-16)`. ALWAYS rem. NEVER px (except borders 1px/2px, outlines 2px, box-shadow values, 9999px radius).
- Radius: `var(--radius-sm)` (8px), `var(--radius-md)` (10px), `var(--radius-lg)` (20px), `var(--radius-xl)` (28px), `var(--radius-full)`.
- Font: Inter ONLY via Google Fonts. Icons: Phosphor Icons ONLY (bold + fill + regular CDN).

### CSS Architecture
- ALL CSS inside `@layer reset, base, layout, components, utilities;`
- New components go in `@layer components`
- New layout goes in `@layer layout`
- NEVER add CSS outside @layer blocks

### Component Pattern — Modular & Reusable
- BEM naming: `.block__element--modifier`
- Reuse existing component classes: `.ui-btn`, `.ui-btn--icon`, `.ui-btn--icon-sm`, `.ui-btn--icon-xs`, `.ui-btn--send`, `.ui-btn--mode`, `.ui-btn--outline`, `.ui-btn--select`, `.ui-btn--primary`, `.ui-btn--danger`, `.ui-search`, `.ui-breadcrumb`
- NEVER create new button classes. NEVER create `.search-box` or similar.
- NEVER use `<div onclick>`. Use `<button type="button">` with `aria-label`.
- NEVER use inline `style=""`. Use CSS classes or CSS custom properties for dynamic values.
- Each new component must be self-contained: its own BEM block, reusable across pages.

### Accessibility
- `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` — NEVER `outline: none`
- All inputs need `aria-label` or `<label for>`
- All buttons without visible text need `aria-label`
- Modals need `role="dialog" aria-modal="true" aria-labelledby="title-id"`
- Skip link as first body element
- `prefers-reduced-motion` at end of CSS

### Dark Mode
- Manual only via `<html data-theme="light|dark">`
- NEVER `@media (prefers-color-scheme: dark)`

### DO NOT CHANGE
- Existing sidebar (expanded + collapsed rail) — already done, do not modify
- Existing search component — already done
- Existing chat view (empty state + basic thread) — already done
- Existing settings modal — already done
- Existing profile menu popover — already done
- Existing topbar breadcrumb — already done
- Existing design tokens in `:root` — do not add/remove/change token values
- Existing @layer structure — do not reorder

## REFERENCE

Dev Lumen environment (for component/page reference): https://dev-lumen.zenmail.my.id/
Login: ganysigit1@gmail.com / r3s0lution

Figma design: https://www.figma.com/design/yiYsGAhnfLcsPJi5ZBKyUs/Lumen
Figma reference clone: file:///I:/projects/lumen-design-md/revamp/index.html

## EXECUTION ORDER

Build in this order. After each phase, commit + push to GitHub.

### PHASE 1 — Core Components (P0)

Build these reusable components first in `styles.css` + `index.html`:

1. **Markdown renderer** — render AI responses with: headings (h1-h4), paragraphs, ordered/unordered lists, code blocks (inline + block), tables, blockquotes, bold/italic. Use `--text-md` (15px) / `--font-regular` (400) / `letter-spacing: -0.165px` / `line-height: 24px`. Code blocks: bg `--color-surface`, radius `--radius-sm`, monospace font.

2. **Citation/source cards** — small cards below AI responses showing source document name, snippet, and link. Bordered with `--color-border`, radius `--radius-sm`, compact padding.

3. **Thinking steps expander** — collapsible section above AI response showing reasoning. Header with "Thinking" label + chevron, content area with `--color-text-muted` text, `--text-sm` size. Collapsed by default.

4. **Model selector dropdown** — replace current "Enterprise Chat" button with a proper dropdown: button shows current model name + caret-down, click opens menu with model list. Use `.ui-btn--mode` as base.

5. **File generation result cards** — cards showing generated file (PPTX/DOCX/PDF/MD) with file type icon, filename, download button. Use `--color-border` border, `--radius-md` radius.

6. **Stat cards** — 4-up metric row: each card has icon (32x32, `--color-icon-default`), large number (`--text-2xl`, `--font-semibold`, `--color-text-primary`), label (`--text-sm`, `--color-text-muted`). Card: transparent bg, no border, flex column, gap `--space-2`.

7. **Project card** — grid card: folder icon (top-left, `--color-accent`), "Public" badge (top-right, `--color-surface` bg, `--text-xs`), title (`--text-base`, `--font-medium`), description (`--text-sm`, `--color-text-muted`), metadata row (threads/docs/members with icons, `--text-xs`, `--color-text-muted`), member avatar at bottom. Card: white bg, `--radius-lg`, subtle shadow, hover: bg `--color-surface`.

8. **Team activity feed item** — row: avatar (32x32 circle), name (`--text-sm`, `--font-medium`), "Thread" badge (`--color-surface` bg, `--text-xs`, `--color-accent`), project badge (link, `--text-xs`), thread title (`--text-sm`, `--color-text-secondary`), timestamp (`--text-xs`, `--color-text-muted`).

9. **Empty state** — dashed border card (`1px dashed --color-border`), centered icon + title (`--text-xl`, `--font-semibold`) + subtitle (`--text-sm`, `--color-text-muted`) + CTA button (`.ui-btn--primary`).

10. **Callout banner** — full-width banner: yellow variant (bg `#fef3c7`, text `#92400e`), red variant (bg `#fee2e2`, text `#991b1b`). Icon + text + optional link. Radius `--radius-sm`.

11. **Data table** — semantic `<table>` with: header row (`--color-text-muted`, `--text-xs`, uppercase), body rows (`--color-text-secondary`, `--text-sm`), row hover bg `--color-surface`, border-bottom `1px solid --color-border` between rows.

12. **Filter dropdown** — button with label + caret-down, click opens dropdown menu. Use `.ui-btn--select` as base. Menu: white bg, `--radius-sm`, shadow, items with hover `--color-surface`.

13. **View toggle** — two-button group (list/grid), active button has `--color-surface` bg. Use `.ui-btn--icon-sm` as base.

14. **Secondary sidebar** — for Admin/Enginer pages. Grouped nav: section label (`--text-xs`, `--color-text-muted`, uppercase) + nav items (same style as main sidebar `.nav-link`). Fixed width, `--color-border` right border.

15. **Status tab filters** — tab bar: each tab has label + count badge, active tab has `--color-text-primary` + bottom border `2px solid --color-accent`, inactive has `--color-text-muted`.

16. **Kebab menu** — three-dot button (`.ui-btn--icon-xs`) that opens small dropdown menu with actions (rename, delete, share). Menu: white bg, `--radius-sm`, shadow.

Commit: `feat: P0 core components — markdown renderer, citations, thinking steps, stat cards, project cards, data table, filters, empty state, callout banner, secondary sidebar`

### PHASE 2 — Core Pages (P0)

Build these pages as new views in the routing system (add to `navigateTo` function):

1. **Chat thread (full)** — upgrade existing chat view: add markdown renderer for AI responses, citation/source cards, thinking steps expander, model selector dropdown, file generation result cards. Keep existing message structure, enhance AI response rendering.

2. **Projects list page** — page header (icon + title + "New project" button), breadcrumb "Home / Projects", 2-column grid of project cards. Replace current placeholder.

3. **Project detail page** — project header (icon + title + description + "Public" badge), 2-column grid: left = files section (file list with icons + names) + instructions section, right = chat threads list. Breadcrumb "Home / Projects / [name]". Chat composer at bottom.

Commit: `feat: P0 core pages — full chat thread, projects list, project detail`

### PHASE 3 — Important Pages (P1)

1. **Home dashboard** — replace current empty chat state with dashboard: 4 stat cards row, 2-column layout (left: team activity feed, right: projects mini-list). "+ New thread" button in header. Breadcrumb "Home".

2. **Library page** — page header + subtitle, toolbar (view toggle + upload button), filter bar (search + 4 filter dropdowns + count), document data table. Breadcrumb "Home / Library".

3. **General Knowledge page** — page header + subtitle, search + "New Collection" button, collections data table (name, scope badge, docs count, created, actions). Breadcrumb "Home / Knowledge".

4. **History page** — page header, search + type filter + sort dropdown, thread list (reuse recent thread item pattern), empty state with CTA. Breadcrumb "Home / History".

5. **Login page** — full-page split: left = hero (brand logo + "Know More. Search Less." tagline), right = sign in form (email + password + "Sign in" button + "Sign up" link). No sidebar, no topbar.

Commit: `feat: P1 pages — home dashboard, library, general knowledge, history, login`

### PHASE 4 — Admin & Engineer (P2)

1. **Admin section** — secondary sidebar (Overview, Users, Organization, Share Requests, Audit Log, Usage Stats, Storage), 7 sub-pages with stat cards, data tables, callout banners, status tabs, radio card selector, export CSV.

2. **Engineer section** — secondary sidebar (Overview, LLM Providers, Web Search, Workers, Connectors, Logs, Debug Tools, Danger Zone), 7 sub-pages with metric cards, data tables, config forms.

3. **404 page** — centered "404" + "This page could not be found." + link back to home.

Commit: `feat: P2 admin + engineer sections, 404 page`

### PHASE 5 — Polish (P3)

1. **Notification bell dropdown** — bell icon in sidebar footer, click opens dropdown with notification items.
2. **Sidebar project list** — add "PROJECTS" section in sidebar with project links + thread counts + colored dots.
3. **Sidebar recent threads with kebab** — add kebab menu button to each recent thread item.
4. **Breadcrumb multi-level** — support project context breadcrumbs (Home / Projects / [project] / [thread]).

Commit: `feat: P3 polish — notifications, sidebar projects, kebab menus, breadcrumbs`

## VERIFICATION — RUN AFTER EACH PHASE

```bash
# No div onclick
grep -c 'div.*onclick' index.html  # Must be 0

# No inline styles (except CSS custom properties for dynamic data)
grep -cP 'style="[^"]*-' index.html  # Check for non-custom-property inline styles

# No outline none
grep -c 'outline.*none' styles.css  # Must be 0

# @layer present
grep -c '@layer' styles.css  # Must be >= 5

# aria-label present
grep -c 'aria-label' index.html  # Must be > 10

# focus-visible present
grep -c 'focus-visible' styles.css  # Must be > 10

# prefers-reduced-motion present
grep -c 'prefers-reduced-motion' styles.css  # Must be >= 1

# No raw hex in HTML (except in data attributes)
grep -oP '#[0-9a-fA-F]{6}' index.html  # Should be empty

# Font is Inter
grep -c "Inter" index.html  # Must be >= 1

# Phosphor icons loaded
grep -c "phosphor" index.html  # Must be >= 1
```

## RULES

1. Read DESIGN.md + AGENTS.md + ENFORCEMENT-RULES.md BEFORE coding. Follow them strictly.
2. Do NOT change existing design tokens, existing components, or existing pages.
3. Every new component must use existing tokens. NEVER introduce new hex colors, new font sizes, or new spacing values.
4. Every new component must be BEM-named and reusable.
5. Every new page must be added to the `navigateTo` routing function.
6. After each phase: run verification commands, commit, push to GitHub.
7. Test each page in browser (file:///I:/projects/lumen-new-design/index.html) before committing.
8. If a component needs a token that doesn't exist, add it to `:root` in styles.css AND document in DESIGN.md.
9. NEVER use px for spacing. Use rem via tokens.
10. NEVER use inline styles. Use CSS classes.
11. NEVER use `<div onclick>`. Use `<button>`.
12. Match the visual style of existing components exactly — same shadows, same radius, same spacing rhythm, same color palette, same font weights.

## START

Begin with Phase 1. Read the 3 mandatory files first, then build components one by one. After each component, verify it renders correctly in browser. After completing all components in a phase, commit and push.
