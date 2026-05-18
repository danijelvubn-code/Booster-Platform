/** Case-insensitive substring filter for simple list pickers (toolbar + sheets). */
export function filterStringsBySubstring(
	source: readonly string[],
	query: string,
): string[] {
	const q = query.trim().toLowerCase()
	if (!q) return [...source]
	return source.filter((s) => s.toLowerCase().includes(q))
}
