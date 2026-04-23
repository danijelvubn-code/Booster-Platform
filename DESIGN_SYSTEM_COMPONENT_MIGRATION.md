# Design System Component Migration Contract

This document defines how components should be updated to the new token system without regressions.

## 1) Token Usage Rules (Target State)

- Use semantic design tokens in Tailwind classes (`primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `ring`, `background`, `foreground`).
- Prefer semantic utility classes over hardcoded color literals.
- Keep light/dark behavior token-driven (no theme-specific hardcoded colors unless unavoidable).
- Use typography utilities from `src/index.css` where appropriate:
  - `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-body-sm`, `text-label`, `text-caption`, `text-code`.
- Use radius/shadow tokens via normal utilities (`rounded-*`, `shadow-*`) already wired in `tailwind.config.ts`.

## 2) Legacy-to-New Mapping Rules

These are migration defaults for existing component classes.

- `booster-gold` -> `primary`
- `booster-gold-light` -> `chart-2` (or `primary/70` if only visual tint is needed)
- `booster-gold-dark` -> `chart-4` (or `primary` with lower lightness if needed)
- `booster-navy` -> `foreground` or `sidebar-primary` depending on context
- `booster-navy-light` -> `secondary-foreground` or `muted-foreground` depending on context
- `success` -> keep as status semantic for now (temporary alias), later map to dedicated status palette if introduced
- `warning` -> keep as status semantic for now (temporary alias), later map to dedicated status palette if introduced
- `info` -> keep as status semantic for now (temporary alias), later map to dedicated status palette if introduced
- `sidebar-background` -> `sidebar` (already aliased in `src/index.css`)

## 3) Component Styling Guidelines

- Interaction states:
  - Hover: prefer `hover:bg-accent hover:text-accent-foreground`
  - Selected: prefer accent-based selected treatment
  - Pressed: prefer `secondary`-based pressed treatment
  - Focus: use `ring-ring` and existing focus-visible patterns from ui primitives
- Disabled:
  - Keep `disabled:opacity-50` and existing `disabled:pointer-events-none` patterns
- Charts/inline style colors:
  - Use `oklch(var(--token-name))` for direct color strings in JS/TSX.

## 4) Definition of Done (Per Batch)

- No new hardcoded color values introduced.
- Updated components render correctly in both light and dark themes.
- `npm run build` passes.
- Lint on touched files is clean, or only contains pre-existing warnings unrelated to migration.
- Any removed alias usage is confirmed by search before deleting alias tokens.

## 5) Migration Execution Order

1. UI primitives (`src/components/ui/*`)
2. Shell/navigation surfaces (`sidebar`, dialogs, menus, tabs)
3. Data visualization and dashboard surfaces
4. Page-level cleanup and alias retirement
