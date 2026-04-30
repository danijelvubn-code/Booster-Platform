/**
 * Optional build-time flag for tooling (e.g. defaulting storybook or future CI).
 * **Product MVP vs post-MVP UX is route-based** (`/flows/mvp`, `/mvp/*` vs `/flows/post-mvp`, `/login`, …).
 * Use `npm run dev:mvp` only if you read `getAppVariant()` elsewhere; it does not switch login pages.
 */
export type AppVariant = "full" | "mvp";

export function getAppVariant(): AppVariant {
  const v = import.meta.env.VITE_APP_VARIANT;
  return v === "mvp" ? "mvp" : "full";
}

export function isMvpVariant(): boolean {
  return getAppVariant() === "mvp";
}
