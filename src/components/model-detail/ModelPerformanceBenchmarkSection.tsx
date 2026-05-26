import {
	Activity,
	Clock,
	FileText,
	Gauge,
	Leaf,
	LineChart,
	type LucideIcon,
	MessageCircleQuestion,
	ScrollText,
	Table2,
	Zap,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import { WorkloadMeasurementsChart, WorkloadMeasurementsChartLegend } from '@/components/model-detail/WorkloadMeasurementsChart'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type {
	ModelPerformanceBenchmark,
	PerformanceMeasurement,
	PerformanceWorkload,
	TokenStats,
} from '@/data/modelPerformanceBenchmark'
import { cn } from '@/lib/utils'

const WORKLOAD_ICONS: Record<string, LucideIcon> = {
	document_summarization: FileText,
	document_summarization_long: ScrollText,
	fixed_synth_bmark: Gauge,
	q_and_a: MessageCircleQuestion,
}

const WORKLOAD_ICON_TONES: Record<string, string> = {
	document_summarization: 'border-primary/12 bg-primary/4 text-primary',
	document_summarization_long: 'border-info/12 bg-info/4 text-info',
	fixed_synth_bmark: 'border-success/12 bg-success/4 text-success',
	q_and_a: 'border-warning/12 bg-warning/4 text-warning',
}

function WorkloadIcon({ workloadId }: { workloadId: string }) {
	const Icon = WORKLOAD_ICONS[workloadId] ?? FileText
	const iconClassName =
		WORKLOAD_ICON_TONES[workloadId] ??
		'border-primary/12 bg-primary/4 text-primary'

	return (
		<span
			className={cn(
				'flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md border',
				iconClassName,
			)}
		>
			<Icon className="h-icon-20 w-icon-20" aria-hidden />
		</span>
	)
}

function formatMetric(value: number, fractionDigits: number): string {
	return value.toLocaleString(undefined, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	})
}

function formatTokenStats(stats: TokenStats): string {
	return `${formatMetric(stats.min, 0)} / ${formatMetric(stats.mean, 1)} / ${formatMetric(stats.max, 0)}`
}

type BenchmarkMeasurementContext = {
	workload: PerformanceWorkload
	measurement: PerformanceMeasurement
}

function getBenchmarkMeasurements(
	benchmark: ModelPerformanceBenchmark,
): BenchmarkMeasurementContext[] {
	return benchmark.performance.flatMap(({ workload }) =>
		workload.measurements.map((measurement) => ({
			workload,
			measurement,
		})),
	)
}

function findBestMeasurement(
	measurements: BenchmarkMeasurementContext[],
	getValue: (context: BenchmarkMeasurementContext) => number,
	isBetter: (value: number, bestValue: number) => boolean,
): BenchmarkMeasurementContext | null {
	return measurements.reduce<BenchmarkMeasurementContext | null>(
		(best, current) => {
			if (!best) return current

			const currentValue = getValue(current)
			const bestValue = getValue(best)

			return isBetter(currentValue, bestValue) ? current : best
		},
		null,
	)
}

function computeEndToEndLatencySeconds({
	workload,
	measurement,
}: BenchmarkMeasurementContext): number {
	return (
		measurement.ttft_ms / 1000 +
		workload.output_tokens.mean / measurement.tokens_per_user_per_s
	)
}

type PerformanceKpiTone = {
	labelClassName: string
	iconClassName: string
}

function PerformanceKpiCard({
	label,
	value,
	unit,
	workload,
	icon: Icon,
	tone,
}: {
	label: string
	value: string
	unit?: string
	workload?: string
	icon: LucideIcon
	tone: PerformanceKpiTone
}) {
	return (
		<div className="rounded-md border border-border bg-white px-3 py-3 shadow-xs">
			<div className="flex items-start gap-3">
				<span
					className={cn(
						'flex h-icon-32 w-icon-32 shrink-0 items-center justify-center rounded-md border',
						tone.iconClassName,
					)}
				>
					<Icon className="h-icon-16 w-icon-16" aria-hidden />
				</span>
				<div className="min-w-0">
					<p
						className={cn(
							'truncate text-body-sm font-medium',
							tone.labelClassName,
						)}
					>
						{label}
					</p>
					<div className="mt-0.5 flex min-w-0 items-baseline gap-1 whitespace-nowrap">
						<p className="truncate text-h3 font-bold tabular-nums text-foreground">
							{value}
						</p>
						{unit ? (
							<span className="shrink-0 text-body-sm text-muted-foreground">
								{unit}
							</span>
						) : null}
					</div>
					{workload ? (
						<p className="mt-1 truncate text-caption text-muted-foreground">
							{workload}
						</p>
					) : null}
				</div>
			</div>
		</div>
	)
}

function PerformanceKpiStrip({
	benchmark,
}: {
	benchmark: ModelPerformanceBenchmark
}) {
	const measurements = getBenchmarkMeasurements(benchmark)
	const fastestTtft = findBestMeasurement(
		measurements,
		({ measurement }) => measurement.ttft_ms,
		(value, bestValue) => value < bestValue,
	)
	const fastestEndToEnd = findBestMeasurement(
		measurements,
		computeEndToEndLatencySeconds,
		(value, bestValue) => value < bestValue,
	)
	const peakStreamingSpeed = findBestMeasurement(
		measurements,
		({ measurement }) => measurement.tokens_per_user_per_s,
		(value, bestValue) => value > bestValue,
	)
	const bestEnergy = findBestMeasurement(
		measurements,
		({ measurement }) => measurement.kjoules_per_req,
		(value, bestValue) => value < bestValue,
	)
	const bestCarbon = findBestMeasurement(
		measurements,
		({ measurement }) => measurement.kgC02_per_req,
		(value, bestValue) => value < bestValue,
	)

	const kpis: Array<{
		label: string
		value: string
		unit?: string
		workload?: string
		icon: LucideIcon
		tone: PerformanceKpiTone
	}> = [
		{
			label: 'First token',
			value: fastestTtft
				? formatMetric(
						fastestTtft.measurement.ttft_ms,
						fastestTtft.measurement.ttft_ms >= 100 ? 0 : 1,
					)
				: '—',
			unit: fastestTtft ? 'ms' : undefined,
			workload: fastestTtft?.workload.name,
			icon: Clock,
			tone: {
				labelClassName: 'text-primary',
				iconClassName: 'border-primary/12 bg-primary/4 text-primary',
			},
		},
		{
			label: 'E2E latency',
			value: fastestEndToEnd
				? formatMetric(computeEndToEndLatencySeconds(fastestEndToEnd), 1)
				: '—',
			unit: fastestEndToEnd ? 's' : undefined,
			workload: fastestEndToEnd?.workload.name,
			icon: Gauge,
			tone: {
				labelClassName: 'text-info',
				iconClassName: 'border-info/12 bg-info/4 text-info',
			},
		},
		{
			label: 'Stream speed',
			value: peakStreamingSpeed
				? formatMetric(
						peakStreamingSpeed.measurement.tokens_per_user_per_s,
						peakStreamingSpeed.measurement.tokens_per_user_per_s >= 100 ? 0 : 1,
					)
				: '—',
			unit: peakStreamingSpeed ? 'tok/s/user' : undefined,
			workload: peakStreamingSpeed?.workload.name,
			icon: Activity,
			tone: {
				labelClassName: 'text-success',
				iconClassName: 'border-success/12 bg-success/4 text-success',
			},
		},
		{
			label: 'Energy / req',
			value: bestEnergy
				? formatMetric(bestEnergy.measurement.kjoules_per_req * 1000, 2)
				: '—',
			unit: bestEnergy ? 'J' : undefined,
			workload: bestEnergy?.workload.name,
			icon: Zap,
			tone: {
				labelClassName: 'text-warning',
				iconClassName: 'border-warning/12 bg-warning/4 text-warning',
			},
		},
		{
			label: 'Carbon / req',
			value: bestCarbon
				? formatMetric(bestCarbon.measurement.kgC02_per_req * 1000, 2)
				: '—',
			unit: bestCarbon ? 'gCO₂e' : undefined,
			workload: bestCarbon?.workload.name,
			icon: Leaf,
			tone: {
				labelClassName: 'text-destructive',
				iconClassName:
					'border-destructive/12 bg-destructive/4 text-destructive',
			},
		},
	]

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{kpis.map(({ label, value, unit, workload, icon, tone }) => (
				<PerformanceKpiCard
					key={label}
					label={label}
					value={value}
					unit={unit}
					workload={workload}
					icon={icon}
					tone={tone}
				/>
			))}
		</div>
	)
}

function MetadataRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
			<dt className="shrink-0 text-caption text-muted-foreground">{label}</dt>
			<dd className="min-w-0 break-all text-body-sm text-foreground">
				{value}
			</dd>
		</div>
	)
}

export type PerformanceBenchmarkView = 'chart' | 'table' | 'details'

function PerformanceBenchmarkMetadataContent({
	benchmark,
}: {
	benchmark: ModelPerformanceBenchmark
}) {
	const { metadata } = benchmark

	return (
		<div className="space-y-4">
			<p className="text-body-sm text-muted-foreground">{metadata.description}</p>
			<dl className="grid gap-3">
				<MetadataRow label="Experiment" value={metadata.experiment_id} />
				<MetadataRow label="Deployment" value={metadata.deployment_id} />
				<MetadataRow label="Model" value={metadata.model} />
				<MetadataRow label="Hardware" value={metadata.hardware} />
				<MetadataRow label="Provider" value={metadata.provider} />
				<MetadataRow label="Image" value={metadata.image} />
				<MetadataRow label="Timestamp" value={metadata.timestamp} />
			</dl>
		</div>
	)
}

export function PerformanceBenchmarkViewTabs({
	view,
	onViewChange,
}: {
	view: PerformanceBenchmarkView
	onViewChange: (view: PerformanceBenchmarkView) => void
}) {
	return (
		<Tabs
			value={view}
			onValueChange={(value) => onViewChange(value as PerformanceBenchmarkView)}
			size="sm"
		>
			<TabsList>
				<TabsTrigger value="table" className="gap-1.5">
					<Table2 aria-hidden />
					Table view
				</TabsTrigger>
				<TabsTrigger value="chart" className="gap-1.5">
					<LineChart aria-hidden />
					Chart view
				</TabsTrigger>
				<TabsTrigger value="details" className="gap-1.5">
					<FileText aria-hidden />
					Experiment details
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

function WorkloadMeasurementsPanel({
	workload,
	showTableView,
}: {
	workload: PerformanceWorkload
	showTableView: boolean
}) {
	return (
		<>
			<div className="grid sm:grid-cols-2">
				<div className="px-4 py-3">
					<p className="text-caption text-muted-foreground">
						Input tokens (min / mean / max)
					</p>
					<p className="font-mono tabular-nums text-body-sm text-foreground">
						{formatTokenStats(workload.input_tokens)}
					</p>
				</div>
				<div className="px-4 py-3">
					<p className="text-caption text-muted-foreground">
						Output tokens (min / mean / max)
					</p>
					<p className="font-mono tabular-nums text-body-sm text-foreground">
						{formatTokenStats(workload.output_tokens)}
					</p>
				</div>
			</div>
			{showTableView ? (
				<WorkloadMeasurementsTable workload={workload} />
			) : (
				<WorkloadMeasurementsChart
					workload={workload}
					embedded
					className="rounded-none border-0"
				/>
			)}
		</>
	)
}

function WorkloadMeasurementsTable({
	workload,
}: {
	workload: PerformanceWorkload
}) {
	return (
		<div className="overflow-x-auto border-t border-border bg-white">
			<Table size="md">
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead className="text-caption-strong text-muted-foreground">
							Concurrency
						</TableHead>
						<TableHead className="text-right text-caption-strong text-muted-foreground">
							TTFT (ms)
						</TableHead>
						<TableHead className="text-right text-caption-strong text-muted-foreground">
							Tokens / user / s
						</TableHead>
						<TableHead className="text-right text-caption-strong text-muted-foreground">
							Tokens / s
						</TableHead>
						<TableHead className="text-right text-caption-strong text-muted-foreground">
							kJ / req
						</TableHead>
						<TableHead className="text-right text-caption-strong text-muted-foreground">
							kgCO₂ / req
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{workload.measurements.map((measurement) => (
						<TableRow key={measurement.concurrency}>
							<TableCell className="font-mono tabular-nums text-body-sm text-foreground">
								{measurement.concurrency}
							</TableCell>
							<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
								{formatMetric(measurement.ttft_ms, 1)}
							</TableCell>
							<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
								{formatMetric(measurement.tokens_per_user_per_s, 1)}
							</TableCell>
							<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
								{formatMetric(measurement.tokens_per_s, 1)}
							</TableCell>
							<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
								{formatMetric(measurement.kjoules_per_req, 3)}
							</TableCell>
							<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
								{formatMetric(measurement.kgC02_per_req, 3)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

function WorkloadDetailsContent({
	benchmark,
	showTableView,
}: {
	benchmark: ModelPerformanceBenchmark
	showTableView: boolean
}) {
	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="text-body-strong text-foreground">Workloads</h3>
				<Badge
					variant="muted"
					appearance="ghost"
					size="24"
					className="font-normal"
				>
					{benchmark.performance.length} profiles
				</Badge>
			</div>
			<Accordion
				type="multiple"
				defaultValue={[benchmark.performance[0]?.workload.id]}
				className="flex flex-col gap-3"
			>
				{benchmark.performance.map(({ workload }) => (
					<AccordionItem
						key={workload.id}
						value={workload.id}
						className="overflow-hidden rounded-lg border border-border border-b-border bg-white shadow-xs last:border-b-border"
					>
						<AccordionTrigger
							className={cn(
								'px-4 py-4 hover:bg-transparent hover:no-underline group-hover:bg-transparent',
								'data-[state=open]:border-b data-[state=open]:border-border',
							)}
						>
							<div className="flex min-w-0 flex-1 items-center gap-3 text-left">
								<WorkloadIcon workloadId={workload.id} />
								<div className="flex min-w-0 flex-1 flex-col items-start gap-1">
									<span className="text-body-sm-strong text-foreground">
										{workload.name}
									</span>
									<span className="text-caption text-muted-foreground">
										{workload.distribution}
									</span>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="bg-transparent px-0 pb-0 pt-0 group-hover:bg-transparent">
							<WorkloadMeasurementsPanel
								workload={workload}
								showTableView={showTableView}
							/>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export function PerformanceBenchmarkDetailsSheet({
	benchmark,
	view,
	onViewChange,
	children,
}: {
	benchmark: ModelPerformanceBenchmark
	view: PerformanceBenchmarkView
	onViewChange: (view: PerformanceBenchmarkView) => void
	children: ReactNode
}) {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<AppSideSheetContent
				title="Performance details"
				description="Detailed benchmark workload measurements for this model."
				maxWidth="xxl"
				toolbar={
					<div className="flex items-center px-6 py-3">
						<PerformanceBenchmarkViewTabs
							view={view}
							onViewChange={onViewChange}
						/>
					</div>
				}
				footer={view === 'chart' ? <WorkloadMeasurementsChartLegend /> : undefined}
			>
				{view === 'details' ? (
					<PerformanceBenchmarkMetadataContent benchmark={benchmark} />
				) : (
					<WorkloadDetailsContent
						benchmark={benchmark}
						showTableView={view === 'table'}
					/>
				)}
			</AppSideSheetContent>
		</Sheet>
	)
}

interface ModelPerformanceBenchmarkSectionProps {
	benchmark: ModelPerformanceBenchmark
}

export function ModelPerformanceBenchmarkSection({
	benchmark,
}: ModelPerformanceBenchmarkSectionProps) {
	return (
		<div className="flex min-w-0 flex-col gap-6">
			<PerformanceKpiStrip benchmark={benchmark} />
		</div>
	)
}
