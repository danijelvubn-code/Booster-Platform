/**
 * URL for a static file from `public/`, honoring Vite `base` (e.g. `/booster/mvp/`).
 * `path` may be `"lovable-uploads/foo.png"` or `"/lovable-uploads/foo.png"`.
 */
export function publicAssetUrl(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
