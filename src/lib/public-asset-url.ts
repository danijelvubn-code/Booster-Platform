/**
 * URL for a static file from `public/`, honoring Vite `base` (e.g. `/booster/mvp/`).
 * `path` may be `"brand/logo.svg"` or `"/brand/logo.svg"`.
 */
export function publicAssetUrl(path: string): string {
	const normalized = path.replace(/^\/+/, '')
	return `${import.meta.env.BASE_URL}${normalized}`
}
