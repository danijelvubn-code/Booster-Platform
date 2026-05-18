/** API endpoint options marked as legacy for subtle list styling in the catalog toolbar. */
export const LEGACY_API_CAPABILITY_IDS = new Set(['Chat Completions Legacy'])

export function sortApiCapabilitiesForToolbar(opts: string[]): string[] {
	return [...opts].sort((a, b) => {
		const la = LEGACY_API_CAPABILITY_IDS.has(a) ? 1 : 0
		const lb = LEGACY_API_CAPABILITY_IDS.has(b) ? 1 : 0
		if (la !== lb) return la - lb
		return a.localeCompare(b)
	})
}
