import { useEffect, useMemo, useState } from 'react'
import { SelectedFilterChips } from '@/components/model-cosmos/filters/SelectedFilterChips'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { apiKeys, endpointRequestLogs } from '@/data/mockData'
import {
	filterEndpointRequestLogs,
	formatProcessingTime,
	formatRequestLogTimestamp,
	type RequestLogProcessingTimeFilter,
	type RequestLogTimeRange,
} from '@/lib/endpoint-request-logs'
import { formatTokens } from '@/lib/formatters'
import { getPaginationWindow } from '@/lib/pagination-window'

const REQUEST_LOGS_PAGE_SIZE = 20

const TIME_RANGE_OPTIONS: { value: RequestLogTimeRange; label: string }[] = [
	{ value: '24h', label: 'Last 24 hours' },
	{ value: '7d', label: 'Last 7 days' },
	{ value: '30d', label: 'Last 30 days' },
	{ value: 'all', label: 'All time' },
]

const PROCESSING_TIME_OPTIONS: {
	value: RequestLogProcessingTimeFilter
	label: string
}[] = [
	{ value: 'all', label: 'Any processing time' },
	{ value: 'under_500', label: 'Under 500 ms' },
	{ value: '500_to_1000', label: '500 ms – 1 s' },
	{ value: 'over_1000', label: 'Over 1 s' },
]

const DEFAULT_TIME_RANGE: RequestLogTimeRange = '7d'
const DEFAULT_PROCESSING_TIME: RequestLogProcessingTimeFilter = 'all'

function getTimeRangeLabel(value: RequestLogTimeRange): string {
	return TIME_RANGE_OPTIONS.find((option) => option.value === value)?.label ?? value
}

function getProcessingTimeLabel(
	value: RequestLogProcessingTimeFilter,
): string {
	return (
		PROCESSING_TIME_OPTIONS.find((option) => option.value === value)?.label ??
		value
	)
}
function getApiKeyName(apiKeyId: string): string {
	return apiKeys.find((key) => key.id === apiKeyId)?.name ?? apiKeyId
}

function RequestLogsEmptyState({
	message,
	onClearFilters,
}: {
	message: string
	onClearFilters?: () => void
}) {
	return (
		<div className="mx-6 mb-6 rounded-lg border border-dashed border-border bg-muted/20 px-6 py-10 text-center">
			<p className="text-body-sm text-muted-foreground">{message}</p>
			{onClearFilters ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="mt-4"
					onClick={onClearFilters}
				>
					Clear filters
				</Button>
			) : null}
		</div>
	)
}

export function EndpointRequestLogsSection({
	endpointId,
}: {
	endpointId: string
}) {
	const rows = endpointRequestLogs[endpointId] ?? []
	const [timeRange, setTimeRange] = useState<RequestLogTimeRange>(DEFAULT_TIME_RANGE)
	const [processingTime, setProcessingTime] =
		useState<RequestLogProcessingTimeFilter>(DEFAULT_PROCESSING_TIME)
	const [apiKeyId, setApiKeyId] = useState<string | 'all'>('all')
	const [page, setPage] = useState(1)

	useEffect(() => {
		setTimeRange(DEFAULT_TIME_RANGE)
		setProcessingTime(DEFAULT_PROCESSING_TIME)
		setApiKeyId('all')
		setPage(1)
	}, [endpointId])

	useEffect(() => {
		setPage(1)
	}, [timeRange, processingTime, apiKeyId])

	const apiKeyOptions = useMemo(() => {
		const ids = [...new Set(rows.map((row) => row.apiKeyId))]
		return ids.map((id) => ({ id, name: getApiKeyName(id) }))
	}, [rows])

	const filteredRows = useMemo(() => {
		const filtered = filterEndpointRequestLogs(rows, {
			timeRange,
			processingTime,
			apiKeyId,
		})
		return filtered.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
		)
	}, [rows, timeRange, processingTime, apiKeyId])

	const pagination = getPaginationWindow(
		filteredRows.length,
		page,
		REQUEST_LOGS_PAGE_SIZE,
	)
	const paginatedRows = filteredRows.slice(
		pagination.startIndex,
		pagination.endIndexExclusive,
	)
	const { safePage, totalPages } = pagination

	const hasActiveFilters =
		timeRange !== DEFAULT_TIME_RANGE ||
		processingTime !== DEFAULT_PROCESSING_TIME ||
		apiKeyId !== 'all'

	const activeFilterChips = useMemo(() => {
		const chips = []
		if (timeRange !== DEFAULT_TIME_RANGE) {
			chips.push({
				key: 'time-range',
				label: getTimeRangeLabel(timeRange),
				onRemove: () => setTimeRange(DEFAULT_TIME_RANGE),
			})
		}
		if (processingTime !== DEFAULT_PROCESSING_TIME) {
			chips.push({
				key: 'processing-time',
				label: getProcessingTimeLabel(processingTime),
				onRemove: () => setProcessingTime(DEFAULT_PROCESSING_TIME),
			})
		}
		if (apiKeyId !== 'all') {
			chips.push({
				key: 'api-key',
				label: getApiKeyName(apiKeyId),
				onRemove: () => setApiKeyId('all'),
			})
		}
		return chips
	}, [timeRange, processingTime, apiKeyId])

	const clearFilters = () => {
		setTimeRange(DEFAULT_TIME_RANGE)
		setProcessingTime(DEFAULT_PROCESSING_TIME)
		setApiKeyId('all')
	}

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-h3">Request logs</CardTitle>
				<p className="text-body-sm text-muted-foreground">
					Request-level logs for this endpoint. Prompt and response content are
					not shown.
				</p>
			</CardHeader>
			<CardContent className="space-y-4 px-0 pb-6 pt-0">
				{rows.length === 0 ? (
					<RequestLogsEmptyState message="No request logs are available for this endpoint yet. Traffic will appear here once calls are made." />
				) : (
					<>
						<div className="grid gap-4 px-6 sm:grid-cols-3">
							<div className="space-y-2">
								<Label htmlFor="request-log-time-range">Time range</Label>
								<Select
									value={timeRange}
									onValueChange={(value) =>
										setTimeRange(value as RequestLogTimeRange)
									}
								>
									<SelectTrigger id="request-log-time-range">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{TIME_RANGE_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="request-log-processing-time">
									Processing time
								</Label>
								<Select
									value={processingTime}
									onValueChange={(value) =>
										setProcessingTime(value as RequestLogProcessingTimeFilter)
									}
								>
									<SelectTrigger id="request-log-processing-time">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{PROCESSING_TIME_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="request-log-api-key">API key</Label>
								<Select
									value={apiKeyId}
									onValueChange={setApiKeyId}
								>
									<SelectTrigger id="request-log-api-key">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All API keys</SelectItem>
										{apiKeyOptions.map((option) => (
											<SelectItem key={option.id} value={option.id}>
												{option.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{hasActiveFilters ? (
							<div className="px-6">
								<SelectedFilterChips
									chips={activeFilterChips}
									onClearAll={clearFilters}
								/>
							</div>
						) : null}

						{filteredRows.length === 0 ? (
							<RequestLogsEmptyState
								message={
									hasActiveFilters
										? 'No request logs match the selected filters.'
										: 'No request logs are available for this endpoint yet.'
								}
								onClearFilters={hasActiveFilters ? clearFilters : undefined}
							/>
						) : (
							<>
							<Table
								size="sm"
								containerClassName="overflow-x-auto px-0"
								className="[&_tr]:h-control-md [&_th]:h-control-md [&_th]:py-0 [&_td]:h-control-md [&_td]:py-0"
							>
								<TableHeader>
									<TableRow>
										<TableHead className="whitespace-nowrap pl-6">
											Request timestamp
										</TableHead>
										<TableHead className="whitespace-nowrap">
											API key
										</TableHead>
										<TableHead className="whitespace-nowrap text-right">
											Processing time
										</TableHead>
										<TableHead className="whitespace-nowrap text-right">
											Input tokens
										</TableHead>
										<TableHead className="whitespace-nowrap pr-6 text-right">
											Output tokens
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{paginatedRows.map((row) => (
										<TableRow key={row.id} className="hover:bg-foreground/4">
											<TableCell className="whitespace-nowrap pl-6 tabular-nums text-muted-foreground">
												{formatRequestLogTimestamp(row.timestamp)}
											</TableCell>
											<TableCell className="whitespace-nowrap">
												{getApiKeyName(row.apiKeyId)}
											</TableCell>
											<TableCell className="whitespace-nowrap text-right tabular-nums">
												{formatProcessingTime(row.latencyMs)}
											</TableCell>
											<TableCell className="whitespace-nowrap text-right tabular-nums">
												{formatTokens(row.inputTokens)}
											</TableCell>
											<TableCell className="whitespace-nowrap pr-6 text-right tabular-nums">
												{formatTokens(row.outputTokens)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{filteredRows.length > REQUEST_LOGS_PAGE_SIZE ? (
								<div className="flex flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-center text-body-sm text-muted-foreground sm:text-left">
										Showing {pagination.displayRangeStart}–
										{pagination.displayRangeEnd} of {pagination.totalItems}
									</p>
									<div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
										<Button
											type="button"
											variant="outline"
											size="sm"
											disabled={safePage <= 1}
											onClick={() => setPage((p) => Math.max(1, p - 1))}
										>
											Previous
										</Button>
										<span className="text-body-sm tabular-nums text-muted-foreground">
											Page {safePage} of {totalPages}
										</span>
										<Button
											type="button"
											variant="outline"
											size="sm"
											disabled={safePage >= totalPages}
											onClick={() =>
												setPage((p) => Math.min(totalPages, p + 1))
											}
										>
											Next
										</Button>
									</div>
								</div>
							) : null}
							</>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}
