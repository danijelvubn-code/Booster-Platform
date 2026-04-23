# Switch component: where each size is used

The UI `Switch` (`src/components/ui/switch.tsx`) supports:

| `size` | Track | Thumb (on) | Use |
|--------|--------|------------|-----|
| **`md`** (default) | `h-6 w-11` | `h-5 w-5`, `translate-x-5` | Standard forms, dialogs, settings rows |
| **`sm`** | `h-5 w-9` | `h-4 w-4`, `translate-x-4` | Denser toolbars or compact panels (use when space is tight) |

## Production / app screens

All of the following rely on the **default `md`** (no `size` prop passed):

| Location | Purpose |
|----------|---------|
| `src/pages/Account.tsx` | Email notifications (alerts dialog) |
| `src/pages/DeployWizard.tsx` | Shadow optimization toggle |
| `src/pages/EditEndpoint.tsx` | Confidential compute (disabled), hard cap, email alerts |
| `src/components/GuardrailsStep.tsx` | Per-guardrail enable switch |

## Dev / QA

| Location | Purpose |
|----------|---------|
| `src/pages/ComponentSwitchLab.tsx` | **Both `sm` and `md`** — matrix, disabled, uncontrolled, and “with description” examples |

## Summary

- **`sm`** is only used in **ComponentSwitchLab** for documentation and manual QA.
- Everywhere else in the app uses **`md`** via the default.

If you add a new screen and need a smaller control, pass `size="sm"` explicitly.
