# Lumen New Design — Enforcement Rules

> These rules MUST be followed by ALL agents (Hermes, Pi, Claude Code, Cursor, etc.) working on this project.
> Based on: html-css-guide skill + project conventions

## 1. BUTTON SYSTEM — Use `.ui-btn` Only

**NEVER** create new button classes. Use the unified system:

```css
.ui-btn              /* base */
.ui-btn--icon        /* 32x32 icon button */
.ui-btn--icon-sm     /* 28x28 icon button */
.ui-btn--icon-xs     /* 24x24 icon button */
.ui-btn--outline     /* bordered outline button (Manage, Upload, etc) */
.ui-btn--select      /* dropdown select button (Medium, All roles) */
.ui-btn--filter      /* filter button with avatar */
.ui-btn--mode        /* mode selector (Enterprise Chat) */
.ui-btn--send        /* send button (arrow up) */
.ui-btn--primary     /* accent-filled primary button (Connect) */
.ui-btn--danger      /* red destructive button (Delete, Reset) */
```

**FORBIDDEN:** `.settings-btn-outline`, `.st-btn-danger`, `.st-btn-primary`, `.st-select-btn`, `.st-filter-btn`, or any other ad-hoc button class.

## 2. SEARCH INPUT — Use `.ui-search` Only

**NEVER** create `.search-box`, `.st-search`, or similar. Use:

```css
.ui-search              /* base search component */
.ui-search--settings    /* modifier for settings modal (wider) */
```

## 3. STAT CLASSES — Use BEM Consistently

**NEVER** mix BEM and non-BEM. Always use:

```css
.st-stats              /* container */
.st-stat               /* row */
.st-stat__label        /* left label (40% width) */
.st-stat__value        /* right value */
```

**FORBIDDEN:** `.st-stat-label`, `.st-stat-value` (no double-underscore).

## 4. CSS UNITS — rem Only

**NEVER** use `px` for spacing, sizing, font-size, padding, margin, gap, width, height, border-radius.

Use `rem` (1rem = 16px). Example: `16px` → `1rem`, `14px` → `0.875rem`, `24px` → `1.5rem`.

**px ALLOWED only for:**
- Border widths: `1px`, `2px`
- Outline widths/offsets: `2px`
- Box-shadow offset values
- `9999px` for `border-radius: 9999px` (full circle)
- `1px` for visually-hidden utility

## 5. CSS ARCHITECTURE — Use @layer

All CSS must be wrapped in cascade layers:

```css
@layer reset, base, layout, components, utilities;
```

- `@layer reset` — box-sizing, margin reset
- `@layer base` — `:root` tokens, body, dark mode, typography
- `@layer layout` — app shell, sidebar, main, topbar
- `@layer components` — all UI components
- `@layer utilities` — `.is-hidden`, `.is-shown`, `.skip-link`

## 6. SEMANTIC HTML — No `<div onclick>`

**NEVER** use `<div onclick>`. Use `<button type="button">` for interactive elements.

Add `aria-label` to buttons without visible text. Add `aria-expanded` to toggle buttons.

## 7. ACCESSIBILITY — WCAG 2.1 AA

- **No `outline: none`** — use `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`
- **All inputs need labels** — `<label for="id">` or `aria-label="..."`
- **All images need `alt`** — `alt=""` for decorative
- **Modals need** `role="dialog" aria-modal="true" aria-labelledby="title-id"`
- **Disclosure widgets need** `aria-expanded`, `aria-controls`, `aria-haspopup`
- **Skip link** as first body element: `<a href="#main" class="skip-link">Skip to main content</a>`

## 8. NAMING — BEM Convention

```css
.block {}
.block__element {}
.block--modifier {}
```

- Blocks: `.sidebar`, `.settings`, `.ui-btn`, `.st-row`
- Elements: `.sidebar__header`, `.st-row__left`
- Modifiers: `.ui-btn--danger`, `.st-row--border`

**NEVER** use inconsistent patterns like `.st-stat-label` (should be `.st-stat__label`).

## 9. NO INLINE STYLES

**NEVER** use `style=""` in HTML. All styles go in CSS classes.

If dynamic styling is needed, use CSS custom properties:
```html
<div class="st-member-avatar" style="--avatar-bg: #fef3c7; --avatar-color: #92400e">
```
```css
.st-member-avatar { background: var(--avatar-bg); color: var(--avatar-color); }
```

## 10. DARK MODE — Manual Only

Dark mode is **NOT** automatic. It only activates when user selects it in Appearance settings.

- Default: `<html data-theme="light">`
- Dark: `<html data-theme="dark">`
- System: JS detects `prefers-color-scheme` and sets `data-theme` accordingly

**NEVER** use `@media (prefers-color-scheme: dark)` for auto-dark. Use `[data-theme="dark"]` only.

## 11. PERFORMANCE

- `prefers-reduced-motion` media query required at end of CSS
- Animate only `transform` and `opacity`
- `font-display: swap` for web fonts
- System font stack as fallback

## 12. COMPONENT REGISTRY

All reusable components must be documented in `COMPONENT-REGISTRY.md`:
- Component name
- CSS classes
- HTML usage example
- Variants/modifiers
- Where used

## ENFORCEMENT CHECKLIST

Before claiming any HTML/CSS task complete, verify:

```bash
# No div onclick
grep -c 'div.*onclick' index.html  # Must be 0

# No inline styles
grep -c 'style=' index.html  # Must be 0

# No outline none
grep -c 'outline.*none' styles.css  # Must be 0

# No !important (except utilities + reduced-motion)
grep -c '!important' styles.css  # Must be <= 3

# No forbidden button classes
grep -cE 'settings-btn-outline|st-btn-danger|st-btn-primary|st-select-btn|st-filter-btn' styles.css  # Must be 0

# No non-BEM stat classes
grep -c 'st-stat-label\|st-stat-value' index.html  # Must be 0 (should be st-stat__label)

# @layer present
grep -c '@layer' styles.css  # Must be >= 5

# aria-label present
grep -c 'aria-label' index.html  # Must be > 10

# focus-visible present
grep -c 'focus-visible' styles.css  # Must be > 10

# prefers-reduced-motion present
grep -c 'prefers-reduced-motion' styles.css  # Must be >= 1

# data-theme present (dark mode)
grep -c 'data-theme' styles.css  # Must be >= 1

# px only for borders/outlines (check for non-allowed px)
grep -oP '\d+px' styles.css | grep -vP '^(1|2|9999)px$' | head -5  # Should be empty or only box-shadow
```
