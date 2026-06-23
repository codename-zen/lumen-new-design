# Lumen UI Kit — E2E Visual Audit Report
Generated: 2026-06-23
Project: I:\projects\lumen-new-design

## Summary
Total issues found: 80+
Areas audited: Expanded Sidebar, Collapsed Sidebar, Chat View (empty + thread), 5 Placeholder Views, Topbar, Settings Modal, Profile Menu, Responsive/Overflow

---

## 1. EXPANDED SIDEBAR (15 issues)

### Spacing / Overflow
1. **Sidebar overflow:hidden clips content** — Recents items + user profile compete for space, last items get clipped. No scrollable middle region.
2. **Bottom collision** — "Competitive analysis" sits flush against user profile card, no gap.
3. **User profile card no bottom padding** — Card sits on bottom edge of viewport.
4. **Inconsistent section gaps** — Whitespace between nav group → divider → Pinned label → Recents label is not uniform.

### Alignment
5. **Active state highlight misaligned** — "Research & Analysis" highlight left edge doesn't align with nav items above.
6. **Folder icons in Pinned not vertically aligned** — Slight horizontal shift between items.

### Missing Elements (vs Figma reference)
7. **Missing "More options" (three-dot) buttons** on Recents items — Figma reference has per-item kebab buttons.
8. **Missing "Yesterday" section** — Figma has 5 additional items grouped by date.
9. **Missing PRO badge** next to "James Brown" in profile card.
10. **Missing chevron-right** on active "Projects" nav item — Figma shows caret-right on active items.
11. **Section headers not semantic** — "Pinned" and "Recents" are plain divs, should be `<h3>` for accessibility.

### Typography / Color
12. **Search placeholder mismatch** — Shows "Search threads" aria but Figma uses "Search...".
13. **Active state text color not distinct** — Selected item text nearly same color as unselected.
14. **Section labels visually weak** — Small, muted, inconsistent left padding.

### Divider
15. **Dividers not full-width** — Inset from left/right inconsistently.

---

## 2. COLLAPSED SIDEBAR / RAIL (8 issues)

1. **Inconsistent vertical rhythm** — Gaps between logo, divider, +, folder, books not uniform.
2. **Avatar too close to bottom edge** — No bottom margin.
3. **Divider under logo not full-width** — Inset, asymmetric.
4. **Avatar horizontal misalignment** — Not on same center axis as icons above.
5. **Icon style conflict** — 4 different visual styles: filled logo, circular + bg, outline nav, text avatar.
6. **Low-contrast gray icons** — May fail WCAG AA for small icons.
7. **Avatar size mismatch** — Smaller than logo and + button.
8. **Tooltip overflow risk** — Tooltips may clip at left viewport edge.

---

## 3. CHAT VIEW — EMPTY STATE (5 issues)

1. **Redundant placeholder text** — Greeting says "What can I help you with today?" and composer says "How can I help you today?" — nearly identical.
2. **Composer placeholder perspective** — "How can I help you today?" is from AI's perspective, should be user's.
3. **No suggestions/prompt chips** — Empty state has no quick-start suggestions.
4. **Stale breadcrumb** — Shows "Design help / Typography discussion" on empty state, should show "New chat".
5. **No recent threads shown** — Empty state could show recent conversations.

---

## 4. CHAT VIEW — THREAD MESSAGES (18 issues)

### Message Bubbles
1. **User bubble invisible against bg** — Bubble bg #f7f7f7 same as page bg #f7f7f7. No visual distinction.
2. **No timestamp** on user or AI messages.
3. **No sender avatar/name** — Can't distinguish who said what without alignment.
4. **No AI avatar or name label** — AI responses have no "Lumen" or bot icon.

### Typography
5. **Font-size inconsistency** — User messages 15px, AI messages 14px (should match at 15px).
6. **AI responses use `<br>` for line breaks** — Should use `<p>` or semantic list elements.
7. **Numbered lists are plain text** — Not `<ol>`, screen readers won't interpret as list.
8. **Bullet lists are plain text** — Not `<ul>`, same issue.

### Action Icons
9. **Missing aria-label** on copy/thumbs-up/regenerate buttons.
10. **No tooltip/title** on action buttons.
11. **Missing thumbs-down** — Common AI feedback pattern.
12. **Touch targets too small** — 2px padding, should be min 44x44px.
13. **No visible hover state** on action buttons.
14. **No focus ring** for keyboard navigation.

### File Attachment Card
15. **Generic paperclip icon** — Should use file-type-specific icon (PDF document icon).
16. **"PDF" label is plain text** — Should be colored badge/pill.
17. **No download/preview/remove button** on card.
18. **Border-radius inconsistency** — File card 16px vs user bubble 14px/8px.

### Composer
- See empty state issues #1-3 above (redundant text, perspective).
- **"Enterprise Chat" button uses folder icon** — Semantically wrong for model selector.
- **Send button grayed out** — Should turn accent blue when text present.
- **No keyboard shortcut hint** (Enter to send, Shift+Enter for newline).
- **Disclaimer text too small** — Likely fails WCAG AA contrast.

---

## 5. PLACEHOLDER VIEWS — Projects, Library, Research, Web Search, Knowledge Base (10 issues)

1. **Missing "Create project" CTA** — Projects page has no call-to-action button.
2. **Placeholder text "In development"** — Confusing, sounds like feature is broken, not empty state.
3. **No descriptive copy** — Just title + "In development", no explanation of what the feature is.
4. **Icon too generic and low contrast** — Gray folder icon lacks visual weight.
5. **No secondary actions** — No "Try a template" or "Import" options.
6. **All 5 placeholders identical structure** — Only icon + title differ, no route-specific content.
7. **No loading state** — No skeleton/spinner for when content loads.
8. **Breadcrumb shows as dropdown** — Not a proper breadcrumb path.
9. **No empty state illustration** — Just a small icon, no engaging empty state.
10. **Topbar right side only has dots menu** — No contextual actions per route.

---

## 6. TOPBAR / BREADCRUMB (8 issues)

1. **Active breadcrumb same weight as inactive** — Both 400, should differentiate.
2. **Active crumb color too light** — #5c5c5c, should be #171717 for stronger hierarchy.
3. **No bottom border/separator** — Topbar blends into content area.
4. **Stale breadcrumb on empty state** — Shows thread title when should show "New chat".
5. **No back/return arrow** — Can't navigate back from thread.
6. **Breadcrumb dropdown chevron too small** — Inadequate hit area.
7. **No semantic `<nav aria-label="breadcrumb">`** — Accessibility gap.
8. **Right side only dots menu** — No share, export, or contextual actions.

---

## 7. SETTINGS MODAL (12 issues)

1. **Modal truncated at bottom** — Content clipped, no scroll in content area.
2. **No active tab state** — Selected sidebar tab not visually highlighted.
3. **Tab labels mismatch page title** — Header says "Workspace overview" but no "Overview" tab exists.
4. **Close button too small and low contrast** — Hard to see and click.
5. **Avatar/text vertical misalignment** in owner row.
6. **Progress bars misaligned** — Team seats and Storage bars at different positions.
7. **Progress bar scales inconsistent** — Different segment sizes between bars.
8. **Uneven section spacing** — Gaps between Overview, Activity, Plan usage vary.
9. **Sidebar truncated at bottom** — Last section clipped.
10. **No hover state on sidebar tabs**.
11. **"Manage" button lacks hierarchy** — Blends into background.
12. **Sidebar icons not aligned** with labels.

---

## 8. PROFILE MENU POPOVER (8 issues)

1. **Overlaps trigger** — No gap between popover and profile button.
2. **Width too narrow** — Cramped, insufficient horizontal padding.
3. **Missing "Profile" or "Account" link** — User info block not clearly clickable.
4. **"v1.0.0 • Terms & Conditions" in menu** — Footer metadata mixed with action items.
5. **Logout not visually separated** — Should have divider before destructive action.
6. **Integrations icon semantically wrong** — Sparkle icon, should be plug/puzzle.
7. **Logout icon ambiguous** — Arrow icon, should be door-exit/power-off.
8. **Uneven vertical spacing** between menu items.

---

## 9. ACCESSIBILITY (14 issues)

1. Sidebar section headers not `<h3>` semantic
2. Action icon buttons missing `aria-label`
3. Composer input missing `aria-label`
4. Chat messages missing `role` and `aria-live`
5. AI responses use plain text lists, not `<ol>`/`<ul>`
6. Line breaks via `<br>` instead of `<p>`
7. File card missing semantic role
8. Disclaimer text fails contrast at small size
9. Breadcrumb missing `<nav aria-label="breadcrumb">`
10. No focus rings on interactive elements
11. Send button disabled state not via `aria-disabled`
12. Profile menu button missing `aria-haspopup`
13. Action buttons touch targets too small (2px padding)
14. No visible skip-to-main-content

---

## 10. DESIGN TOKEN ISSUES (4 issues)

1. **--color-surface (#f7f7f7) used for BOTH page bg AND user message bubbles** — No visual distinction.
2. **--color-accent not on send button** — Grayed out, should be blue when active.
3. **Font weight 400 on breadcrumb** — Body inherits 500, breadcrumb overrides to 400 but active should be 500.
4. **Border-radius inconsistency** — File card 16px, user bubble 14px/8px, search 10px, modal 16px — no unified scale.

---

## PRIORITY RANKING

### P0 — Critical (blocks usability)
- Sidebar overflow:hidden clips content
- User bubble invisible against bg (same #f7f7f7)
- Modal truncated at bottom (no scroll)
- Stale breadcrumb on empty state
- Font-size inconsistency user 15px vs AI 14px

### P1 — High (visual polish)
- Missing active tab state in Settings
- Missing "Create project" CTA in Projects
- Missing PRO badge, "More options" buttons, "Yesterday" section
- Topbar no bottom border
- Profile popover overlaps trigger
- Action buttons no hover/aria
- Composer placeholder perspective wrong

### P2 — Medium (consistency)
- Border-radius inconsistency across components
- Icon style conflict in collapsed rail
- Section header semantics
- Divider width/alignment
- Profile menu icon semantics

### P3 — Low (nice-to-have)
- Timestamps on messages
- AI avatar/name label
- Keyboard shortcut hints
- Empty state illustrations
- Loading states
