import type { EndpointRequestLogEntry } from '@/data/mockData'

export type RequestLogTimeRange = '24h' | '7d' | '30d' | 'all'

export type RequestLogProcessingTimeFilter =
	| 'all'
	| 'under_500'
	| '500_to_1000'
	| 'over_1000'

const TIME_RANGE_MS: Record<Exclude<RequestLogTimeRange, 'all'>, number> = {
	'24h': 24 * 60 * 60 * 1000,
	'7d': 7 * 24 * 60 * 60 * 1000,
	'30d': 30 * 24 * 60 * 60 * 1000,
}

function matchesProcessingTimeFilter(
	latencyMs: number,
	filter: RequestLogProcessingTimeFilter,
): boolean {
	switch (filter) {
		case 'under_500':
			return latencyMs < 500
		case '500_to_1000':
			return latencyMs >= 500 && latencyMs < 1000
		case 'over_1000':
			return latencyMs >= 1000
		default:
			return true
	}
}

export function filterEndpointRequestLogs(
	rows: EndpointRequestLogEntry[],
	{
		timeRange,
		processingTime,
		apiKeyId,
	}: {
		timeRange: RequestLogTimeRange
		processingTime: RequestLogProcessingTimeFilter
		apiKeyId: string | 'all'
	},
	now = Date.now(),
): EndpointRequestLogEntry[] {
	return rows.filter((row) => {
		if (apiKeyId !== 'all' && row.apiKeyId !== apiKeyId) return false
		if (!matchesProcessingTimeFilter(row.latencyMs, processingTime)) {
			return false
		}
		if (timeRange === 'all') return true
		const cutoff = now - TIME_RANGE_MS[timeRange]
		return new Date(row.timestamp).getTime() >= cutoff
	})
}

export function formatRequestLogTimestamp(iso: string): string {
	try {
		return new Intl.DateTimeFormat(undefined, {
			dateStyle: 'short',
			timeStyle: 'medium',
		}).format(new Date(iso))
	} catch {
		return iso
	}
}

export function formatProcessingTime(ms: number): string {
	if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`
	return `${ms} ms`
}
