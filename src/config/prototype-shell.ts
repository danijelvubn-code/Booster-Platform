const mode = import.meta.env.MODE

/** Production artifact: MVP-only router + assets under `/booster/mvp/`. */
export const IS_MVP_BUILD = mode === 'mvp'

/** Production artifact: post-MVP-only router + assets under `/booster/mvp/post-mvp/`. */
export const IS_POST_MVP_BUILD = mode === 'post-mvp'

/** Local combined prototype: `/booster/mvp/*`, `/booster/mvp/post-mvp/*`, optional design-system labs. */
export const IS_COMBINED_PROTOTYPE = !IS_MVP_BUILD && !IS_POST_MVP_BUILD

export const ROUTER_BASENAME = IS_MVP_BUILD
	? '/booster/mvp'
	: IS_POST_MVP_BUILD
		? '/booster/mvp/post-mvp'
		: '/booster'

/**
 * Prefix for post-MVP primary nav `Link`s in the combined prototype (basename `/booster`).
 * Matches `<Route path="mvp/post-mvp">` segments.
 */
export const POST_MVP_NAV_PREFIX_COMBINED = '/mvp/post-mvp'

/** Design-system component labs (combined prototype / dev only — not shipped on MVP or post-MVP builds). */
export const DESIGN_SYSTEM_LABS_ROOT = '/design-system/dev/components'

export function mvpPath(path: string): string {
	const p = path.startsWith('/') ? path : `/${path}`
	if (IS_MVP_BUILD) return p
	return `/mvp${p}`
}

export function postMvpPath(path: string): string {
	const p = path.startsWith('/') ? path : `/${path}`
	if (IS_POST_MVP_BUILD) return p
	if (IS_MVP_BUILD) return p
	return `${POST_MVP_NAV_PREFIX_COMBINED}${p}`
}

export function dsLabPath(segment: string): string {
	const s = segment.replace(/^\//, '')
	return `${DESIGN_SYSTEM_LABS_ROOT}/${s}`
}

/** `<Route path={…}>` segment for MVP auth screens (`mvp/login` in combined prototype, `login` in MVP-only build). */
export function mvpAuthRouteSegment(path: string): string {
	const p = path.startsWith('/') ? path.slice(1) : path
	return IS_MVP_BUILD ? p : `mvp/${p}`
}
