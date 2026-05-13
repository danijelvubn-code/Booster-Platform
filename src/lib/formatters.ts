/**
 * Format large numbers in compact notation (K, M, B)
 * @example formatCompactNumber(1500) // "1.5K"
 * @example formatCompactNumber(2500000) // "2.50M"
 */
export function formatCompactNumber(n: number): string {
	if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
	return n.toLocaleString()
}

/**
 * Format token counts with locale-aware thousands separators
 * @example formatTokens(1234567) // "1,234,567"
 */
export function formatTokens(n: number): string {
	return n.toLocaleString()
}

/**
 * Format currency values (EUR)
 * @example formatCurrency(1234.56) // "€1,234.56"
 */
export function formatCurrency(amount: number, currency = 'EUR'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(amount)
}

/**
 * Format large numbers as compact tokens (K, M)
 * @example formatCompactTokens(1500000) // "1.50M"
 */
export function formatCompactTokens(n: number): string {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
	return n.toLocaleString()
}

/**
 * Format percentage values
 * @example formatPercentage(0.1234) // "12.34%"
 */
export function formatPercentage(value: number, decimals = 2): string {
	return `${(value * 100).toFixed(decimals)}%`
}
