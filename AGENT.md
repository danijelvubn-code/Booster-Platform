# Booster Webapp — Agent Guide

## What This Is
Frontend for **Booster**, an enterprise AI inference platform. Built with TanStack Start (React 19). The agent's primary job is implementing Figma designs into views alongside the developer.

## Tech Stack
- **Framework**: TanStack Start v1.132 + TanStack Router (file-based routing)
- **Data Fetching**: TanStack Query v5
- **Styling**: Tailwind CSS v4 (config via `@theme` in `styles.css`, no `tailwind.config.js`)
- **UI Primitives**: `@base-ui/react` (headless), `radix-ui` (menus)
- **Component Style**: shadcn pattern — CVA + `cn()` utility
- **Icons**: `lucide-react`
- **Font**: Noto Sans Variable (`@fontsource-variable/noto-sans`)
- **Linting/Formatting**: Biome (`tab` indent, single quotes, no semicolons)
- **Language**: TypeScript (strict), path alias `@/*` → `src/*`
- **Package Manager**: Bun

## Strict Rules

### NEVER hardcode colors
Always use CSS token-based Tailwind classes. No `text-[#404040]`, no `bg-[#ffffff]`.

| Figma token | Tailwind class |
|---|---|
| `text/neutral/900` `#171717` | `text-foreground` |
| `text/neutral/700` `#404040` | `text-accent-foreground` |
| `text/neutral/600` `#525252` | `text-secondary-foreground` |
| `text/neutral/500` `#737373` | `text-muted-foreground` |
| `bg/generic/white` `#ffffff` | `bg-card` or `bg-background` |
| `bg/neutral/50` `#fafafa` | `bg-muted` |
| `border/neutral/300` `#d4d4d4` | `border-border` |
| `bg/primary/500` `#EEC233` | `bg-primary` |
| `text/neutral/900` on primary | `text-primary-foreground` |
| `text/success/600` `#16a34a` | `text-success` |
| `text/info/500` `#3b82f6` | `text-info` |

### NEVER hardcode spacing, tracking, or sizing values
Use Tailwind's built-in scale. No `tracking-[0.02em]`, no `leading-[1.3]`, no `w-[373px]`.

| Instead of | Use |
|---|---|
| `tracking-[0.02em]` | `tracking-wide` |
| `tracking-[0.28px]` | `tracking-wide` |
| `leading-[1.3]` | `leading-tight` |
| `leading-[1.5]` | `leading-normal` |
| `text-[14px]` | `text-sm` |
| `text-[16px]` | `text-base` |
| `text-[24px]` | `text-2xl` |
| `text-[32px]` | `text-3xl` |
| `h-[48px]` | `h-12` |
| `h-[40px]` | `h-10` |
| `gap-[24px]` | `gap-6` |
| `p-[40px]` | `p-10` |

Only use arbitrary values (e.g. `w-[640px]`) for layout-specific fixed dimensions that have no standard Tailwind equivalent.

### Button component — Base UI, not Radix
`Button` uses `@base-ui/react/button`. It does **not** support `asChild`. For link-styled buttons that navigate, use a styled `<Link>` directly:
```tsx
<Link to="/auth/login" className="inline-flex items-center gap-1 text-sm font-semibold text-info hover:underline">
  <ChevronLeft className="size-4" /> Back
</Link>
```

### Shadows must match Figma exactly (include spread)
- **Card**: `0px 25px 60px -15px rgba(16,24,40,0.20), 0px 25px 60px -15px rgba(16,24,40,0.12)`
- **Sidebar**: `0px 3px 6px -2px rgba(16,24,40,0.04), 0px 3px 6px -2px rgba(16,24,40,0.04)`
- **Input**: `shadow-xs` (Tailwind token = `0 1px 2px 0 rgba(0,0,0,0.05)`)

## Figma Files
| File | Key | Usage |
|---|---|---|
| Review File (old) | `HZ10zhPsWQKIE3jfriWDfx` | Sidebar, shell, set-password design |
| Dev Ready (active) | `d1Nf6eSHxHBebKqD7US1vx` | Login, set-password (current designs) |

Always use `mcp__plugin_figma_figma__get_design_context`. Extract node IDs from URLs: `node-id=X-Y` → `X:Y`.
Figma MCP exports vectors as image assets — reconstruct SVGs manually from the asset URL if needed (fetch the URL, check if it's SVG).

## CSS Design Tokens (`styles.css`)
Tokens live in `:root` / `.dark` as OKLCH values. Exposed to Tailwind via `@theme inline {}`.
Adding a new token requires entries in **both** places.

Key token mappings:
```css
--primary:            oklch(0.827 0.162 87.6)   /* #EEC233 */
--foreground:         oklch(0.141 0 0)           /* #171717 */
--accent-foreground:  oklch(0.313 0 0)           /* #404040 */
--secondary-foreground: oklch(0.391 0 0)         /* #525252 */
--muted-foreground:   oklch(0.514 0 0)           /* #737373 */
--muted:              oklch(0.982 0 0)           /* #fafafa */
--border:             oklch(0.855 0 0)           /* #d4d4d4 */
--success:            oklch(0.608 0.168 149.6)   /* #16a34a */
--info:               oklch(0.600 0.200 264.1)   /* #3b82f6 */
```

## Project Structure
```
src/
  routes/
    __root.tsx              # Root layout, theme init script
    index.tsx               # Redirects → /auth/login
    auth/
      login.tsx             # Login page
      set-password.tsx      # Set/reset password (search param: token)
    app/
      route.tsx             # App shell — sidebar layout
      endpoints.tsx         # Endpoints (stub)
      cosmos.tsx      # Model Cosmos (stub)
      observe.tsx           # Observe (stub)
  components/ui/
    button.tsx              # CVA button (Base UI)
    input.tsx               # Input (Base UI), h-10, bg-background
    label.tsx               # Form label
    logo.tsx                # ⚡ Booster SVG logo — props: height, showText, textClassName
    card.tsx, badge.tsx, dropdown-menu.tsx, …
  hooks/use-theme.ts        # light/dark/auto — sets .dark class on <html>
  lib/utils.ts              # cn() helper
  styles.css                # Tailwind @theme + CSS tokens
```

## Logo Component
`src/components/ui/logo.tsx` — SVG extracted from Figma (exact path data).
```tsx
<Logo height={20} />                                    // sidebar
<Logo height={18} textClassName="uppercase tracking-widest" />  // card header
<Logo height={80} textClassName="text-white text-7xl uppercase" /> // hero
<Logo height={20} showText={false} />                   // icon only
```
Props: `height` (number, default 24) · `showText` (boolean, default true) · `textClassName` (string)

## App Shell Layout
`h-screen flex bg-muted p-2 gap-2` — sidebar (`w-[200px]`) + main content (`flex-1`), both `bg-card rounded-xl border border-border`.

Sidebar structure:
1. Logo header (60px, border-b)
2. Primary nav: Cosmos — active style `bg-primary/10 border border-primary/30`
3. Separator → main nav: Overview, Endpoints, Observe, Optimize
4. Separator → Help, Settings
5. User row with dropdown (opens `side="top"`)

## Auth Pages Layout Pattern
All auth pages share the same shell:
- Full-screen background: `<video>` (webm) + `<img>` poster fallback, `object-cover`
- Dark overlay: `bg-black/60 backdrop-blur-sm`
- Left: `hidden lg:flex flex-1` — `<Logo height={80} textClassName="text-white …" />`
- Right: `w-[640px] shrink-0 p-10` — white card `flex-1 bg-card rounded-3xl`

## TanStack Router Patterns
- Search params validated with Zod: `validateSearch: z.object({ token: z.string() })`
- Access in component: `const { token } = Route.useSearch()`
- File-based: `src/routes/auth/set-password.tsx` → `/auth/set-password`

## Dev Commands
```bash
bun run dev      # Dev server on :3000
bun run check    # Biome lint + format check
bun biome check --write src/path/to/file.tsx  # Auto-fix a specific file
```
