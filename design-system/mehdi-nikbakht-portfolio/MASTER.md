# Mehdi Nikbakht Portfolio — Design System

This is the project source of truth derived with `ui-ux-pro-max` for a bilingual recruiter-focused portfolio in the Austrian and European software market.

## Direction and rationale

- **Style:** Minimalism and Swiss editorial structure.
- **Personality:** Experienced, precise, reliable, understated and engineering-led.
- **Primary objective:** A recruiter should identify name, seniority, Vienna location, 7+ years of experience and core .NET/SQL expertise within ten seconds.
- **Theme:** Light-only. It provides the most dependable readability and avoids adding a developer-themed dark mode without a user need.
- **Information pattern:** Hero and credibility facts → profile → current Austrian experience → earlier career → technology groups → deliberately curated public work → education/languages → contact.
- **Avoid:** SaaS pricing or logo carousels, playful decoration, gradients as focal elements, hidden credentials, skill meters, excessive glass effects, animated backgrounds and purple/pink AI palettes.

## Design dials

- Variance: **3/10** — centered, systematic, minimal.
- Motion: **2/10** — state feedback only; no content is hidden pending animation.
- Density: **4/10** — readable and efficient without dashboard-like compression.

## Tokens

### Color

| Role | Value | CSS token |
| --- | --- | --- |
| Primary / dark surface | `#0F172A` | `--color-primary` |
| Secondary text | `#334155` | `--color-secondary` |
| Accent / CTA | `#0369A1` | `--color-accent` |
| Accent hover | `#075985` | `--color-accent-strong` |
| Accent tint | `#E0F2FE` | `--color-accent-soft` |
| Page background | `#F8FAFC` | `--color-background` |
| Card surface | `#FFFFFF` | `--color-surface` |
| Primary text | `#020617` | `--color-foreground` |
| Muted text | `#475569` | `--color-muted-foreground` |
| Border | `#E2E8F0` | `--color-border` |
| Keyboard focus | `#0284C7` | `--color-ring` |

Normal text combinations are selected to meet at least WCAG AA 4.5:1 contrast. Blue is reserved for action, current-state emphasis and small navigation cues.

### Typography

- Family: **Inter** for heading and body text, with native system fallbacks.
- Display: `clamp(2.45rem, 6vw, 4.75rem)`.
- Section heading: `clamp(2rem, 4vw, 3.25rem)`.
- Card heading: `clamp(1.5rem, 2vw, 1.875rem)`.
- Body: `1rem / 1.7`; lead copy `1.125rem`.
- Uppercase is limited to short kickers, status labels and company labels.
- Long-form text is constrained to approximately 45–48rem.

### Spacing and layout

- Base rhythm: **4/8px**.
- Scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px`.
- Maximum content width: **1180px**.
- Responsive gutters: 16px on small screens; 24px from tablet upward.
- Section spacing: 64px mobile, 80px tablet, 96px desktop.
- Sticky header height: 68px compact mobile, 72px otherwise.

### Surfaces

- Radius: 6px controls, 10px standard cards, 14px feature surfaces.
- Borders: 1px solid `#E2E8F0`; current experience adds a 4px inset accent.
- Shadows: quiet only — `0 1px 2px` for standard cards and `0 12px 30px` for the portrait/menu layer.
- Cards that are not interactive do not lift or show pointer cursors.

## Components

### Navigation

- Sticky, translucent light header with a compact wordmark.
- Desktop: one-level text navigation plus `DE / EN`.
- Below 1040px: keyboard-accessible menu with at least 44px control targets.
- Every section uses a sticky-header scroll offset; focus must not be obscured.

### Buttons and links

- Primary button: solid blue, white label, 48px minimum height.
- Secondary button: white surface with visible slate border.
- Light inverse button: white on navy contact section.
- Inline links are visibly underlined; external-link SVGs are decorative and hidden from assistive technology.
- Hover changes color/elevation only and does not alter layout bounds.

### Experience

- Editorial vertical cards, never accordions or modals.
- Hierarchy: date/current status → company → role → location → summary → visible bullets → technology tags.
- Toperczer is the only accented current card to communicate Austrian experience without exaggeration.

### Technology tags

- Static semantic list items, not interactive chips.
- Collections wrap; individual known labels remain on one line.
- No progress bars, percentages or skill ratings.

### Projects

- Professional work is represented honestly as primarily private enterprise delivery.
- Tutorial/sample repositories are not promoted as client case studies.
- A single restrained GitHub feature panel leaves room for future documented case studies.

## Responsive breakpoints

- **375px:** compact wordmark, visible language switcher, stacked CTAs/cards, wrapped tag collections, no horizontal overflow.
- **768px:** one-column hero with compact portrait panel; stacked content grids.
- **1024px:** mobile/navigation menu remains active to prevent crowded German labels; two-column hero is retained where space permits.
- **1440px:** content remains capped at 1180px with readable line lengths.

Implementation breakpoints are content-driven at 520px, 700px, 820px and 1040px rather than device-brand specific.

## Motion and accessibility

- State transitions: 180ms ease for hover, focus-adjacent state and menu icon changes.
- No scroll reveal library or invisible-before-JavaScript content.
- `prefers-reduced-motion: reduce` removes smooth scrolling and effectively disables transitions.
- One H1, semantic section headings, visible 3px focus ring, logical source/tab order and a skip link.
- Language state is announced with `aria-pressed`; menu state with `aria-expanded`.
- German content is the primary wrapping constraint.

## Pre-delivery checks

- Verify 375, 768, 1024 and 1440px layouts.
- Verify DE default, DE ↔ EN, and persisted explicit choice.
- Verify keyboard menu, skip link, focus states and sticky-header offsets.
- Verify no horizontal overflow and no hidden/truncated technology labels.
- Verify contrast, metadata updates, canonical URL, reduced motion and static GitHub Pages paths.
