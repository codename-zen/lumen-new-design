# AGENTS.md — Lumen New Design

> **ALL agents (Hermes, Claude Code, Cursor, etc.) MUST read this file before working on this project.**
> Enforcement rules: see ENFORCEMENT-RULES.md
> Design spec: see DESIGN.md

## Project

Lumen v2 Design UI Kit — HTML/CSS/JS static prototype.
Location: `I:\projects\lumen-new-design`
Files: `index.html` (all markup + JS), `styles.css` (all styles), `app.js` (sidebar persistence)

## MANDATORY READS

Before writing ANY code:
1. Read `DESIGN.md` — all tokens, typography, spacing, component spec
2. Read `ENFORCEMENT-RULES.md` — 12 hard rules + verification checklist
3. Verify current state with: `grep -c '@layer' styles.css` (must be >= 5)

## DESIGN TOKENS — NEVER DEVIATE

### Colors
- Use CSS custom properties ONLY: `var(--color-accent)`, `var(--color-surface)`, etc.
- NEVER hardcode hex in components. Hex ONLY in `:root` token definitions in styles.css.
- New color? Add token to `:root` in styles.css + document in DESIGN.md first.

### Typography
- Font: Inter ONLY (Google Fonts: `family=Inter:wght@400;500;600`)
- Icons: Phosphor Icons ONLY (bold + fill + regular CDN)
- NEVER use `text-[NNpx]`. Use tokens: `var(--text-sm)`, `var(--text-md)`, etc.
- Message text: `--text-md` (15px) / `--font-regular` (400) / `letter-spacing: -0.165px`
- Body default: `--text-sm` (14px) / `--font-medium` (500)

### Spacing
- ALWAYS use rem. NEVER px for spacing.
- px ALLOWED: border widths (1px, 2px), outline (2px), box-shadow values, 9999px radius.

### Radius
- Use tokens: `--radius-sm` (8px), `--radius-md` (10px), `--radius-lg` (20px), `--radius-full`.
- Message bubble radius (14px/14px/8px/14px) and file card (16px) are component-specific — not tokens.

## COMPONENT SYSTEM

### Buttons
NEVER create new button classes. Use:
- `.ui-btn` — base
- `.ui-btn--icon` — 32x32
- `.ui-btn--icon-sm` — 28x28
- `.ui-btn--icon-xs` — 24x24
- `.ui-btn--send` — send button
- `.ui-btn--mode` — model selector
- `.ui-btn--outline` — bordered
- `.ui-btn--select` — dropdown
- `.ui-btn--primary` — accent filled
- `.ui-btn--danger` — destructive

### Search
NEVER create `.search-box` or similar. Use `.ui-search` + `.ui-search--settings`.

### Naming
BEM: `.block__element--modifier`. NEVER mix patterns.

## CSS ARCHITECTURE

```
@layer reset, base, layout, components, utilities;
```
- ALL CSS inside `@layer` blocks.
- Components → `@layer components`
- Layout → `@layer layout`
- Tokens → `@layer base` `:root`

## SEMANTIC HTML

- `<button type="button">` for interactive elements. NEVER `<div onclick>`.
- `aria-label` on buttons without visible text.
- `aria-expanded` on toggle buttons.
- `role="dialog" aria-modal="true"` on modals.
- Skip link as first body element.

## ACCESSIBILITY

- `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` — NEVER `outline: none`.
- All inputs need labels (`<label for>` or `aria-label`).
- `prefers-reduced-motion` media query at end of CSS.

## NO INLINE STYLES

NEVER use `style=""` in HTML. Use CSS classes.
Dynamic styling via CSS custom properties: `style="--avatar-bg: #fef3c7"`.

## DARK MODE

Manual only. `<html data-theme="light|dark">`.
NEVER `@media (prefers-color-scheme: dark)`.

## BEFORE CLAIMING DONE

Run verification:
```bash
grep -c 'div.*onclick' index.html        # Must be 0
grep -c 'style=' index.html               # Must be 0
grep -c 'outline.*none' styles.css        # Must be 0
grep -c '@layer' styles.css               # Must be >= 5
grep -c 'aria-label' index.html           # Must be > 10
grep -c 'focus-visible' styles.css        # Must be > 10
grep -c 'prefers-reduced-motion' styles.css  # Must be >= 1
```
