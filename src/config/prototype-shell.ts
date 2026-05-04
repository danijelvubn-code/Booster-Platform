const mode = import.meta.env.MODE;

/** Production artifact: MVP-only router + assets under `/booster/mvp/`. */
export const IS_MVP_BUILD = mode === "mvp";

/** Production artifact: post-MVP-only router + assets under `/booster/post-mvp/`. */
export const IS_POST_MVP_BUILD = mode === "post-mvp";

/** Local combined prototype: `/booster/mvp/*`, `/booster/post-mvp/*`, optional design-system labs. */
export const IS_COMBINED_PROTOTYPE = !IS_MVP_BUILD && !IS_POST_MVP_BUILD;

export const ROUTER_BASENAME = IS_MVP_BUILD
  ? "/booster/mvp"
  : IS_POST_MVP_BUILD
    ? "/booster/post-mvp"
    : "/booster";

/** Design-system component labs (combined prototype / dev only — not shipped on MVP or post-MVP builds). */
export const DESIGN_SYSTEM_LABS_ROOT = "/design-system/dev/components";

export function mvpPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (IS_MVP_BUILD) return p;
  return `/mvp${p}`;
}

export function postMvpPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (IS_POST_MVP_BUILD) return p;
  return `/post-mvp${p}`;
}

export function dsLabPath(segment: string): string {
  const s = segment.replace(/^\//, "");
  return `${DESIGN_SYSTEM_LABS_ROOT}/${s}`;
}

/** `<Route path={…}>` segment for MVP auth screens (`mvp/login` in combined prototype, `login` in MVP-only build). */
export function mvpAuthRouteSegment(path: string): string {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return IS_MVP_BUILD ? p : `mvp/${p}`;
}

/** `<Route path={…}>` segment for post-MVP auth screens (`post-mvp/login` vs `login`). */
export function postMvpAuthRouteSegment(path: string): string {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return IS_POST_MVP_BUILD ? p : `post-mvp/${p}`;
}
