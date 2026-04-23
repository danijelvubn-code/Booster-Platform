# Radix Toast vs Sonner — usage map

This app includes **two** toast systems. Both hosts are mounted in `App.tsx`, but **product code should stick to one convention** to avoid duplicate patterns and styling drift.

## Which to use

| Context | API | Import |
|--------|-----|--------|
| **Default for product features** | Radix Toast + `useToast` / `toast` | `@/hooks/use-toast` |
| **Sonner-only demos / experiments** | Sonner `toast` | `@/components/ui/sonner` |

**Recommendation:** Use **`useToast` from `@/hooks/use-toast`** for new screens and dialogs. It matches the rest of the app (see file list below). Use **Sonner** when you need Sonner-specific behavior (e.g. `toast.promise`, stacking UX) and align styling with `src/components/ui/sonner.tsx`.

**Implementation notes:**

- **Radix:** Primitives in `src/components/ui/toast.tsx`, queue in `src/hooks/use-toast.ts`, host in `src/components/ui/toaster.tsx`.
- **Sonner:** Wrapper in `src/components/ui/sonner.tsx` (theme, `toastOptions.classNames`, position `top-right`).

## Component labs

| Lab route | System |
|-----------|--------|
| `/dev/components/toast` | Radix — `toast()` API and variants |
| `/dev/components/toaster` | Radix — `Toaster` host (`toaster.tsx`) + smoke test |
| `/dev/components/sonner` | Sonner (`toast` from `@/components/ui/sonner`) |

## Files using Radix toast (`@/hooks/use-toast`)

| File | Usage |
|------|--------|
| `src/components/ui/toaster.tsx` | Host: reads queue, renders `Toast` |
| `src/pages/ApiKeysDialog.tsx` | `useToast` |
| `src/components/PlaygroundPanel.tsx` | `useToast` |
| `src/pages/CreateEndpoint.tsx` | `useToast` |
| `src/pages/DeployWizard.tsx` | `useToast` |
| `src/pages/EditEndpoint.tsx` | `useToast` |
| `src/pages/EndpointDetail.tsx` | `useToast` |
| `src/pages/Endpoints.tsx` | `useToast` |
| `src/pages/GuidedModelSelection.tsx` | `useToast` |
| `src/pages/Playground.tsx` | `useToast` |
| `src/pages/Recommendations.tsx` | `useToast` |
| `src/pages/ComponentToastLab.tsx` | `toast` |
| `src/pages/ComponentToasterLab.tsx` | `toast` |

## Files using Sonner (`@/components/ui/sonner`)

| File | Usage |
|------|--------|
| `src/App.tsx` | `<Toaster as Sonner />` — root host only |
| `src/pages/ComponentSonnerLab.tsx` | `toast` |

---

*Update this doc when adding imports from either API.*
