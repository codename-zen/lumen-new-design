# Lumen Design System v2 — DESIGN.md

> **Single source of truth for all colors, typography, spacing, radius, shadows, and component spec.**
> Every agent working on this project MUST follow this document.
> Enforcement rules: see ENFORCEMENT-RULES.md

---

## 1. COLOR TOKENS

### Light Mode (default)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#ffffff` | Page background, main panel |
| `--color-surface` | `#f7f7f7` | Active nav bg, search bg, user bubble bg |
| `--color-border` | `#e5e5e5` | Divider lines, card borders, sidebar right border |
| `--color-border-light` | `#d1d1d1` | Hover bg for search |
| `--color-icon-default` | `#d1d1d1` | Inactive icons, sidebar toggle icon |
| `--color-text-primary` | `#171717` | Message text, user name, headings |
| `--color-text-secondary` | `#5c5c5c` | Nav labels, breadcrumb active, input text |
| `--color-text-muted` | `#a3a3a3` | Section headers, placeholder, email, inactive breadcrumb |
| `--color-text-avatar` | `#0a0a0a` | Avatar initials |
| `--color-accent` | `#335cff` | Brand icon, New chat, active icons, focus ring |
| `--color-accent-hover` | `#2547cc` | Accent hover state |
| `--color-avatar-bg` | `#e5e5e5` | Avatar circle background |

### Dark Mode (`[data-theme="dark"]`)
| Token | Value |
|-------|-------|
| `--color-bg` | `#0a0a0a` |
| `--color-surface` | `#171717` |
| `--color-border` | `#262626` |
| `--color-border-light` | `#404040` |
| `--color-icon-default` | `#525252` |
| `--color-text-primary` | `#fafafa` |
| `--color-text-secondary` | `#a3a3a3` |
| `--color-text-muted` | `#737373` |
| `--color-text-avatar` | `#fafafa` |
| `--color-accent` | `#4d7cff` |
| `--color-accent-hover` | `#335cff` |
| `--color-avatar-bg` | `#262626` |

### Rules
- NEVER use raw hex in components. Always use token: `color: var(--color-text-primary)`.
- Dynamic API data (e.g., `style="--avatar-bg: #fef3c7"`) is the ONLY exception.
- New colors MUST be added here first, then used via token.

---

## 2. TYPOGRAPHY

### Font Family
```
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **Inter** is the ONLY typeface. Load via Google Fonts: `family=Inter:wght@400;500;600`
- Phosphor Icons for all icons (bold + fill + regular variants)

### Type Scale
| Token | rem | px | Usage |
|-------|-----|----|----|
| `--text-xs` | 0.75rem | 12px | Section labels, disclaimer, badges |
| `--text-sm` | 0.875rem | 14px | Nav labels, breadcrumb, sidebar items, input text |
| `--text-md` | 0.9375rem | 15px | Message text (user + AI), composer placeholder |
| `--text-base` | 1rem | 16px | Brand name, headings |
| `--text-lg` | 1.125rem | 18px | Settings section headings |
| `--text-xl` | 1.25rem | 20px | Icon font-size, empty state title |
| `--text-2xl` | 1.5rem | 24px | Large headings |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `--font-regular` | 400 | Message text, breadcrumb, body |
| `--font-medium` | 500 | Nav labels, input text, badges, body default |
| `--font-semibold` | 600 | Brand name, headings |

### Line Height & Letter Spacing
- Message text: `line-height: 1.5rem (24px)`, `letter-spacing: -0.165px`
- Body default: inherits from body (`font-size: --text-sm`, `font-weight: --font-medium`)
- Breadcrumb: `font-weight: --font-regular (400)` — explicit override from body's 500

### Rules
- NEVER use `text-[NNpx]` hardcoded values. Use token classes.
- Message text (user + AI) MUST be `--text-md` (15px) / `--font-regular` (400) / `-0.165px` letter-spacing.
- Body inherits `--text-sm` (14px) / `--font-medium` (500) — components override per spec.

---

## 3. SPACING

| Token | rem | px | Usage |
|-------|-----|----|----|
| `--space-1` | 0.25rem | 4px | Minimal gaps, icon padding |
| `--space-2` | 0.375rem | 6px | Action icon gap, nav padding |
| `--space-3` | 0.5rem | 8px | Search gap, nav gap, input padding |
| `--space-4` | 0.625rem | 10px | (legacy — avoid) |
| `--space-5` | 0.75rem | 12px | Brand gap, nav item gap |
| `--space-6` | 0.875rem | 14px | Message gap, sidebar nav padding |
| `--space-7` | 1rem | 16px | Chat footer padding, message padding bottom |
| `--space-8` | 1.125rem | 18px | |
| `--space-9` | 1.25rem | 20px | Sidebar header padding-left, rail padding |
| `--space-10` | 1.5rem | 24px | Section spacing |
| `--space-12` | 1.75rem | 28px | |
| `--space-16` | 2rem | 32px | Message padding bottom |

### Rules
- ALWAYS use rem. NEVER use px for spacing.
- px ALLOWED only for: border widths (1px, 2px), outline (2px), box-shadow values, 9999px radius.

---

## 4. BORDER RADIUS

| Token | rem | px | Usage |
|-------|-----|----|----|
| `--radius-sm` | 0.5rem | 8px | Nav items, small buttons |
| `--radius-md` | 0.625rem | 10px | Search, rail items, toggle |
| `--radius-lg` | 1.25rem | 20px | Settings modal, large cards |
| `--radius-xl` | 1.75rem | 28px | Composer card |
| `--radius-full` | 9999px | full | Avatar, new-chat icon circle |

### Message-specific radius (not tokenized — component-specific)
- User bubble: `14px 14px 8px 14px` (asymmetric tail)
- File card: `16px`
- These are intentional design choices, not tokens.

---

## 5. SHADOWS

| Name | Value | Usage |
|------|-------|-------|
| search-default | `0 1px 2px 0 rgba(10,13,20,0.03)` | Search default state |
| search-focus | `0 0 0 1px rgba(10,13,20,0.06), 0 1px 2px 0 rgba(10,13,20,0.06)` | Search focus state |
| composer | `0 20px 20px -10px rgba(23,23,23,0.04), ...` | Composer card |
| modal | `0 0.5rem 1.5rem -0.25rem rgba(10,13,20,0.12), ...` | Settings modal |
| profile-menu | `0 0.5rem 1.5rem -0.25rem rgba(10,13,20,0.08), ...` | Profile popover |

### Rules
- Shadow values are the ONLY place px is allowed in non-border context.
- Use rgba(10,13,20,N) for all shadows — consistent shadow color.

---

## 6. LAYOUT

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width` | 15.25rem (244px) | Expanded sidebar width |
| `--topbar-height` | 3.5rem (56px) | Topbar height (when fixed) |
| Sidebar collapsed width | 4.5rem (72px) | Collapsed rail width |
| Messages max-width | 43.75rem (700px) | Chat messages container |
| Message bubble max-width | 28rem (448px) | User bubble max |
| Composer max-width | 43.75rem (700px) | Composer wrapper |

### App Shell
```
.app { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: var(--sidebar-width); flex-shrink: 0; position: relative; }
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.main__panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
```

### Sidebar Collapse
- Width transition: `0.3s ease-in-out`
- Content fade: `opacity 0.3s ease-in-out` (sidebar children → opacity:0, pointer-events:none)
- Rail fade: `opacity 0.3s ease-in-out` (rail → opacity:1, pointer-events:auto)
- Rail: absolute overlay, `inset: 0`, `z-index: 5`, `padding: 1.25rem (20px)`

---

## 7. COMPONENT SPEC

### Search (`.ui-search`)
- Height: 2.25rem (36px)
- BG: `--color-surface` (#f7f7f7)
- Radius: `--radius-md` (10px)
- Default shadow: `0 1px 2px 0 rgba(10,13,20,0.03)`
- Focus: bg → `--color-bg` (white), shadow → ring `0 0 0 1px rgba(10,13,20,0.06)`, icon → `--color-accent`
- Placeholder: `--color-text-muted` → focus: `--color-text-secondary`
- Input: `--text-sm` (14px) / `--font-medium` (500) / `--color-text-secondary`
- Icon: `--text-xl` (20px) / `--color-icon-default`

### Nav Links (`.nav-link`)
- Height: 2rem (32px)
- Padding: `--space-2 --space-3 --space-2 --space-2` (6/8/6/6)
- Radius: `--radius-sm` (8px)
- Font: `--text-sm` (14px) / `--font-medium` (500) / `--color-text-secondary`
- Hover: bg `--color-surface`, color `--color-text-primary`
- Active: bg `--color-surface`, icon `--color-accent`
- Icon: `--text-xl` (20px) / `--color-icon-default`

### New Chat (`.nav-link-new-chat`)
- Color: `--color-accent` (blue)
- Icon circle: 1.25rem (20px), bg `rgba(51, 92, 255, 0.1)` (subtle blue), icon `--color-accent`
- Hover: bg `--color-surface`

### Section Items (`.section-item`)
- Same as nav-link but for Pinned/Recents
- Active: bg `--color-surface`, icon `--color-accent`

### Message Bubbles
- User: bg `--color-surface`, radius `14px 14px 8px 14px`, padding `10px 14px`, max-width `28rem`
- AI: transparent bg, padding `0 4px`, no bubble
- Both: `--text-md` (15px) / `--font-regular` (400) / `letter-spacing: -0.165px` / `line-height: 24px` / `--color-text-primary`

### Action Icons (`.msg__actions`)
- 3 buttons: copy, thumbs-up, regenerate
- Each: `ui-btn--icon-xs` (24x24, 2px padding, radius 6px)
- Icon: `--color-text-secondary`

### File Attachment (`.msg__file`)
- BG: `--color-bg` (white), border `1px solid --color-border`, radius 16px
- Padding: `10px 16px 10px 12px`
- Icon: 36px circle, bg `--color-surface`, color `--color-text-secondary`

### Composer (`.ui-composer`)
- Card: bg `--color-bg`, radius `--radius-xl` (28px), multi-layer shadow
- Placeholder: `--text-md` (15px) / `--color-text-muted`
- Input: `contenteditable`, `--text-md` (15px)
- Mode button: `--text-sm` (14px), bg `--color-surface`
- Send button: `ui-btn--send`, 28x28, bg `--color-surface`

### Breadcrumb (`.ui-breadcrumb`)
- Font: `--text-sm` (14px) / `--font-regular` (400)
- Inactive crumb: `--color-text-muted` (#a3a3a3)
- Active crumb: `--color-text-secondary` (#5c5c5c)
- Separator: `/`, same color as inactive

### Topbar (`.topbar`)
- Height: `--topbar-height` (56px) when fixed, or hug
- Padding: `0 --space-9` (0 20px)
- Layout: flex, space-between
- Left: breadcrumb, Right: dots-three-vertical icon button

### Sidebar Rail (`.sidebar-rail`)
- Width: 4.5rem (72px)
- Padding: 1.25rem (20px)
- Layout: flex column, justify-content: space-between
- Logo row: padding-bottom 1.25rem, divider `::after` 1px `--color-border`
- Toggle: 32x32, radius `--radius-md`, hover bg `--color-surface`
- Toggle hover: logo → sidebar-simple icon swap
- Items: 32x32, radius `--radius-md`, gap 0.75rem (12px)
- Primary item (new chat): bg `rgba(51,92,255,0.1)`, color `--color-accent`
- Bottom: divider `::before`, avatar 32x32 circle, bg `--color-surface`

### Buttons (`.ui-btn` system)
- Base: inline-flex, center, gap 10px, radius `--radius-md`, `--text-sm` (14px), `--font-medium` (500)
- `--icon`: 32x32
- `--icon-sm`: 28x28
- `--icon-xs`: 24x24, 2px padding, radius `--radius-sm`
- `--send`: 28x28, bg `--color-surface`
- `--mode`: 28px height, bg `--color-surface`, gap 4px
- Hover: bg `--color-surface`, color `--color-text-primary`
- Focus-visible: outline 2px `--color-accent`, offset 2px

---

## 8. ICONS

- **Phosphor Icons** ONLY (via CDN: bold + fill + regular)
- NEVER inline SVG for UI icons. Exception: brand logos, file-type badges.
- Icon font-size: `--text-xl` (20px) for nav/sidebar, `--text-sm` (14px) for action buttons
- Icon weight: `ph-bold` for line icons, `ph-fill` for filled icons
- Active icon color: `--color-accent`
- Inactive icon color: `--color-icon-default`

---

## 9. MOTION

- Sidebar width: `transition: width 0.3s ease-in-out`
- Sidebar content/rail: `transition: opacity 0.3s ease-in-out`
- Search: `transition: all 0.2s ease-out`
- Nav links: `transition: color 0.2s, background-color 0.2s`
- Toggle hover: `transition: background 0.2s`
- `prefers-reduced-motion`: disable all transitions

---

## 10. Z-INDEX SCALE

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Normal content |
| Sticky | 10 | Sidebar sticky header |
| Topbar | 20 | Topbar |
| Rail | 5 | Collapsed sidebar rail overlay |
| Tooltip | 100 | Collapsed mode tooltips |
| Modal | 1000 | Settings overlay |

---

## 11. CSS ARCHITECTURE

```
@layer reset, base, layout, components, utilities;
```

- `@layer reset` — box-sizing, margin reset
- `@layer base` — `:root` tokens, body, dark mode
- `@layer layout` — app shell, sidebar, main, topbar, chat layout
- `@layer components` — all UI components (search, nav, messages, buttons, modal, etc.)
- `@layer utilities` — `.is-hidden`, `.is-shown`, `.skip-link`

### Rules
- ALL CSS must be inside a `@layer`.
- NEVER add CSS outside layers.
- Components go in `@layer components`.
- Layout goes in `@layer layout`.

---

## 12. VERIFICATION COMMANDS

```bash
# Token compliance — no raw hex in components (except globals.css token defs)
grep -rn '#[0-9a-fA-F]\{6\}' index.html  # Must be 0

# No inline styles
grep -c 'style=' index.html  # Must be 0

# No div onclick
grep -c 'div.*onclick' index.html  # Must be 0

# No outline none
grep -c 'outline.*none' styles.css  # Must be 0

# @layer present
grep -c '@layer' styles.css  # Must be >= 5

# Font is Inter
grep -c "Inter" index.html  # Must be >= 1

# Phosphor icons loaded
grep -c "phosphor" index.html  # Must be >= 1

# All spacing in rem (no px except borders/shadows)
grep -oP '\d+px' styles.css | grep -vP '^(1|2|9999)px$' | head -5  # Should be empty or only box-shadow
```
