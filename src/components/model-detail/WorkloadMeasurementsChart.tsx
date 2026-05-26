import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type {
	PerformanceMeasurement,
	PerformanceWorkload,
} from '@/data/modelPerformanceBenchmark'
import { cn } from '@/lib/utils'

const CHART_WIDTH = 1000
const LABEL_COLUMN_WIDTH = 156
const Y_AXIS_WIDTH = 56
const PLOT_LEFT = LABEL_COLUMN_WIDTH + Y_AXIS_WIDTH
const PLOT_RIGHT = 28
const PANEL_HEIGHT = 126
const PANEL_VERTICAL_PADDING = 24
const PANEL_SECTION_HEIGHT = PANEL_HEIGHT + PANEL_VERTICAL_PADDING * 2
const PANEL_GAP = 0
const TOP_BAND_HEIGHT = 0
const X_AXIS_HEIGHT = 42
const PLOT_TOP = TOP_BAND_HEIGHT
const PANEL_COUNT = 3
const TOTAL_HEIGHT =
	PLOT_TOP +
	PANEL_COUNT * PANEL_SECTION_HEIGHT +
	(PANEL_COUNT - 1) * PANEL_GAP +
	X_AXIS_HEIGHT

type ChartPoint = {
	x: number
	y: number
	concurrency: number
	value: number
}

type PanelSeries = {
	id: string
	label: string
	color: string
	dashed?: boolean
	decimals: number
	points: ChartPoint[]
	path: string
}

type ChartPanel = {
	id: string
	title: string
	subtitle: string
	titleColor: string
	yAxisLabel: string
	series: PanelSeries[]
	yTicks: Array<{ y: number; label: string }>
	sectionTop: number
	sectionHeight: number
	plotTop: number
	plotHeight: number
}

type HoveredConcurrency = {
	concurrency: number
	anchorX: number
	measurementIndex: number
	values: Array<{
		label: string
		color: string
		decimals: number
		value: number
	}>
}

type TooltipPosition = {
	x: number
	y: number
}

function formatMetric(value: number, fractionDigits: number): string {
	return value.toLocaleString(undefined, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	})
}

function oklchWithAlpha(color: string, alpha: number): string {
	return color.replace(/\)$/, ` / ${alpha})`)
}

const GRID_LINE_COLOR = oklchWithAlpha('oklch(var(--foreground))', 0.12)
const PANEL_FILL_COLOR = 'white'
const SECTION_DIVIDER_COLOR = oklchWithAlpha('oklch(var(--border))', 0.7)
const TITLE_COLOR = 'oklch(var(--foreground) / var(--foreground-alpha-primary))'
const PRIMARY_COLOR = 'oklch(var(--primary))'
const INFO_COLOR = 'oklch(var(--info))'
const SUCCESS_COLOR = 'oklch(var(--success))'
const WARNING_COLOR = 'oklch(var(--warning))'
const DESTRUCTIVE_COLOR = 'oklch(var(--destructive))'

export type WorkloadChartLegendItem = {
	id: string
	label: string
	color: string
	dashed?: boolean
}

export const WORKLOAD_CHART_LEGEND_ITEMS: WorkloadChartLegendItem[] = [
	{
		id: 'ttft',
		label: 'Time to first token',
		color: PRIMARY_COLOR,
	},
	{
		id: 'e2e',
		label: 'End-to-end latency',
		color: INFO_COLOR,
		dashed: true,
	},
	{
		id: 'streaming',
		label: 'Streaming speed',
		color: SUCCESS_COLOR,
	},
	{
		id: 'energy',
		label: 'Energy / req',
		color: WARNING_COLOR,
	},
	{
		id: 'carbon',
		label: 'Carbon / req',
		color: DESTRUCTIVE_COLOR,
	},
]

export function WorkloadMeasurementsChartLegend({
	className,
}: {
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm text-muted-foreground',
				className,
			)}
		>
			{WORKLOAD_CHART_LEGEND_ITEMS.map((item) => (
				<div key={item.id} className="flex items-center gap-2">
					<span
						className="h-0 w-7 rounded-full border-t-2"
						style={{
							borderColor: item.color,
							borderTopStyle: item.dashed ? 'dashed' : 'solid',
						}}
						aria-hidden
					/>
					<span>{item.label}</span>
				</div>
			))}
		</div>
	)
}

function computeEndToEndLatencySeconds(
	measurement: PerformanceMeasurement,
	workload: PerformanceWorkload,
): number {
	return (
		measurement.ttft_ms / 1000 +
		workload.output_tokens.mean / measurement.tokens_per_user_per_s
	)
}

function buildLinePath(points: Array<{ x: number; y: number }>): string {
	if (points.length === 0) return ''
	return points
		.map((point, index) =>
			index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
		)
		.join(' ')
}

function buildYTicks(
	minValue: number,
	maxValue: number,
	plotTop: number,
	plotHeight: number,
	tickCount: number,
	formatTick: (value: number) => string,
): Array<{ y: number; label: string }> {
	const range = maxValue - minValue || maxValue || 1

	return Array.from({ length: tickCount }, (_, index) => {
		const ratio = index / (tickCount - 1)
		const value = maxValue - ratio * range

		return {
			y: plotTop + plotHeight * ratio,
			label: formatTick(value),
		}
	})
}

function scalePoints(
	measurements: PerformanceMeasurement[],
	getValue: (measurement: PerformanceMeasurement) => number,
	xPositions: number[],
	plotTop: number,
	plotHeight: number,
	minValue: number,
	maxValue: number,
): ChartPoint[] {
	const range = maxValue - minValue || maxValue || 1

	return measurements.map((measurement, index) => {
		const value = getValue(measurement)

		return {
			x: xPositions[index] ?? PLOT_LEFT,
			y: plotTop + plotHeight - ((value - minValue) / range) * plotHeight,
			concurrency: measurement.concurrency,
			value,
		}
	})
}

interface WorkloadMeasurementsChartProps {
	workload: PerformanceWorkload
	className?: string
	embedded?: boolean
}

export function WorkloadMeasurementsChart({
	workload,
	className,
	embedded = false,
}: WorkloadMeasurementsChartProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const clipId = `workload-chart-${workload.id}`
	const [hoveredConcurrency, setHoveredConcurrency] =
		useState<HoveredConcurrency | null>(null)
	const [tooltipPosition, setTooltipPosition] =
		useState<TooltipPosition | null>(null)

	const chart = useMemo(() => {
		const plotWidth = CHART_WIDTH - PLOT_LEFT - PLOT_RIGHT
		const xStep =
			workload.measurements.length > 1
				? plotWidth / (workload.measurements.length - 1)
				: plotWidth
		const xPositions = workload.measurements.map(
			(_, index) => PLOT_LEFT + index * xStep,
		)
		const xLabels = workload.measurements.map((measurement, index) => ({
			concurrency: measurement.concurrency,
			x: xPositions[index] ?? PLOT_LEFT,
		}))
		const hitBandWidth =
			workload.measurements.length > 1 ? xStep * 0.88 : plotWidth
		const plotBottom =
			PLOT_TOP +
			PANEL_COUNT * PANEL_SECTION_HEIGHT +
			(PANEL_COUNT - 1) * PANEL_GAP -
			PANEL_VERTICAL_PADDING

		const panelLayouts = Array.from({ length: PANEL_COUNT }, (_, index) => ({
			sectionTop: PLOT_TOP + index * (PANEL_SECTION_HEIGHT + PANEL_GAP),
			sectionHeight: PANEL_SECTION_HEIGHT,
			plotTop:
				PLOT_TOP +
				index * (PANEL_SECTION_HEIGHT + PANEL_GAP) +
				PANEL_VERTICAL_PADDING,
			plotHeight: PANEL_HEIGHT,
		}))

		const responsivenessLayout = panelLayouts[0]
		const ttftValues = workload.measurements.map(
			(measurement) => measurement.ttft_ms / 1000,
		)
		const e2eValues = workload.measurements.map((measurement) =>
			computeEndToEndLatencySeconds(measurement, workload),
		)
		const responsivenessMin = 0
		const responsivenessMax = Math.max(...ttftValues, ...e2eValues, 0.1)
		const responsivenessTicks = buildYTicks(
			responsivenessMin,
			responsivenessMax,
			responsivenessLayout.plotTop,
			responsivenessLayout.plotHeight,
			4,
			(value) => formatMetric(value, value >= 10 ? 0 : 1),
		)
		const ttftPoints = scalePoints(
			workload.measurements,
			(measurement) => measurement.ttft_ms / 1000,
			xPositions,
			responsivenessLayout.plotTop,
			responsivenessLayout.plotHeight,
			responsivenessMin,
			responsivenessMax,
		)
		const e2ePoints = scalePoints(
			workload.measurements,
			(measurement) => computeEndToEndLatencySeconds(measurement, workload),
			xPositions,
			responsivenessLayout.plotTop,
			responsivenessLayout.plotHeight,
			responsivenessMin,
			responsivenessMax,
		)

		const interactivityLayout = panelLayouts[1]
		const interactivityValues = workload.measurements.map(
			(measurement) => measurement.tokens_per_user_per_s,
		)
		const interactivityMin = 0
		const interactivityMax = Math.max(...interactivityValues, 1)
		const interactivityTicks = buildYTicks(
			interactivityMin,
			interactivityMax,
			interactivityLayout.plotTop,
			interactivityLayout.plotHeight,
			4,
			(value) => formatMetric(value, 0),
		)
		const interactivityPoints = scalePoints(
			workload.measurements,
			(measurement) => measurement.tokens_per_user_per_s,
			xPositions,
			interactivityLayout.plotTop,
			interactivityLayout.plotHeight,
			interactivityMin,
			interactivityMax,
		)

		const efficiencyLayout = panelLayouts[2]
		const energyValues = workload.measurements.map(
			(measurement) => measurement.kjoules_per_req,
		)
		const carbonValues = workload.measurements.map(
			(measurement) => measurement.kgC02_per_req,
		)
		const efficiencyMin = Math.min(...energyValues, ...carbonValues, 0)
		const efficiencyMax = Math.max(
			...energyValues,
			...carbonValues,
			efficiencyMin + 0.0001,
		)
		const efficiencyTicks = buildYTicks(
			efficiencyMin,
			efficiencyMax,
			efficiencyLayout.plotTop,
			efficiencyLayout.plotHeight,
			4,
			(value) => formatMetric(value, 2),
		)
		const energyPoints = scalePoints(
			workload.measurements,
			(measurement) => measurement.kjoules_per_req,
			xPositions,
			efficiencyLayout.plotTop,
			efficiencyLayout.plotHeight,
			efficiencyMin,
			efficiencyMax,
		)
		const carbonPoints = scalePoints(
			workload.measurements,
			(measurement) => measurement.kgC02_per_req,
			xPositions,
			efficiencyLayout.plotTop,
			efficiencyLayout.plotHeight,
			efficiencyMin,
			efficiencyMax,
		)

		const panels: ChartPanel[] = [
			{
				id: 'responsiveness',
				title: 'Responsiveness',
				subtitle: 'Lower is better',
				titleColor: TITLE_COLOR,
				yAxisLabel: 'Time (s)',
				sectionTop: responsivenessLayout.sectionTop,
				sectionHeight: responsivenessLayout.sectionHeight,
				plotTop: responsivenessLayout.plotTop,
				plotHeight: responsivenessLayout.plotHeight,
				yTicks: responsivenessTicks,
				series: [
					{
						id: 'ttft',
						label: 'Time to first token',
						color: PRIMARY_COLOR,
						decimals: 1,
						points: ttftPoints,
						path: buildLinePath(ttftPoints),
					},
					{
						id: 'e2e',
						label: 'End-to-end latency',
						color: INFO_COLOR,
						dashed: true,
						decimals: 1,
						points: e2ePoints,
						path: buildLinePath(e2ePoints),
					},
				],
			},
			{
				id: 'interactivity',
				title: 'Interactivity',
				subtitle: 'Higher is better',
				titleColor: TITLE_COLOR,
				yAxisLabel: 'tok/s/user',
				sectionTop: interactivityLayout.sectionTop,
				sectionHeight: interactivityLayout.sectionHeight,
				plotTop: interactivityLayout.plotTop,
				plotHeight: interactivityLayout.plotHeight,
				yTicks: interactivityTicks,
				series: [
					{
						id: 'streaming',
						label: 'Streaming speed',
						color: SUCCESS_COLOR,
						decimals: 1,
						points: interactivityPoints,
						path: buildLinePath(interactivityPoints),
					},
				],
			},
			{
				id: 'efficiency',
				title: 'Efficiency impact',
				subtitle: 'Lower is better',
				titleColor: TITLE_COLOR,
				yAxisLabel: 'Per request',
				sectionTop: efficiencyLayout.sectionTop,
				sectionHeight: efficiencyLayout.sectionHeight,
				plotTop: efficiencyLayout.plotTop,
				plotHeight: efficiencyLayout.plotHeight,
				yTicks: efficiencyTicks,
				series: [
					{
						id: 'energy',
						label: 'Energy / req',
						color: WARNING_COLOR,
						decimals: 3,
						points: energyPoints,
						path: buildLinePath(energyPoints),
					},
					{
						id: 'carbon',
						label: 'Carbon / req',
						color: DESTRUCTIVE_COLOR,
						decimals: 3,
						points: carbonPoints,
						path: buildLinePath(carbonPoints),
					},
				],
			},
		]

		return {
			panels,
			xLabels,
			xPositions,
			plotWidth,
			plotBottom,
			hitBandWidth,
		}
	}, [workload])

	const updateTooltipPosition = (anchorX: number) => {
		const svg = svgRef.current
		if (!svg) return

		const rect = svg.getBoundingClientRect()
		const tooltipWidth = 248
		const tooltipHalfWidth = tooltipWidth / 2
		const viewportPadding = 12
		const projectedX = rect.left + (anchorX / CHART_WIDTH) * rect.width

		setTooltipPosition({
			x: Math.min(
				Math.max(projectedX, tooltipHalfWidth + viewportPadding),
				window.innerWidth - tooltipHalfWidth - viewportPadding,
			),
			y: rect.top + rect.height * 0.42,
		})
	}

	const clearConcurrencyTooltip = () => {
		setHoveredConcurrency(null)
		setTooltipPosition(null)
	}

	const showConcurrencyTooltip = (
		measurementIndex: number,
		anchorX: number,
	) => {
		const measurement = workload.measurements[measurementIndex]
		if (!measurement) return

		const values = chart.panels.flatMap((panel) =>
			panel.series.map((series) => ({
				label: series.label,
				color: series.color,
				decimals: series.decimals,
				value: series.points[measurementIndex]?.value ?? 0,
			})),
		)

		setHoveredConcurrency({
			concurrency: measurement.concurrency,
			anchorX,
			measurementIndex,
			values,
		})
		updateTooltipPosition(anchorX)
	}

	return (
		<div
			className={cn(
				'bg-white',
				embedded
					? 'rounded-none border-0'
					: 'space-y-4 rounded-lg border border-border p-4',
				className,
			)}
		>
			<div
				className={cn(
					'relative w-full overflow-x-auto overflow-y-visible bg-white',
					embedded ? 'pb-4' : 'rounded-xl p-2 sm:p-3',
				)}
			>
				<svg
					ref={svgRef}
					viewBox={`0 0 ${CHART_WIDTH} ${TOTAL_HEIGHT}`}
					className="aspect-[1000/564] min-w-[46rem] w-full overflow-visible"
					role="img"
					aria-label={`Performance metrics by concurrency for ${workload.name}`}
				>
					<title>Performance metrics by concurrency</title>
					<defs>
						<clipPath id={`${clipId}-plot`}>
							<rect
								x={PLOT_LEFT}
								y={PLOT_TOP}
								width={chart.plotWidth}
								height={chart.plotBottom - PLOT_TOP}
							/>
						</clipPath>
					</defs>

					{chart.panels.map((panel) => (
						<g key={`panel-background-${panel.id}`} pointerEvents="none">
							<rect
								x={0}
								y={panel.sectionTop}
								width={CHART_WIDTH}
								height={panel.sectionHeight}
								fill={PANEL_FILL_COLOR}
							/>
						</g>
					))}

					{chart.panels.slice(0, -1).map((panel) => (
						<line
							key={`section-divider-${panel.id}`}
							x1={0}
							x2={CHART_WIDTH}
							y1={panel.sectionTop + panel.sectionHeight}
							y2={panel.sectionTop + panel.sectionHeight}
							stroke={SECTION_DIVIDER_COLOR}
							strokeWidth={1}
							pointerEvents="none"
						/>
					))}

					{chart.panels.map((panel) => (
						<g key={panel.id}>
							<text
								x={16}
								y={panel.sectionTop + 24}
								className="text-[14px] font-semibold"
								fill={panel.titleColor}
							>
								{panel.title}
							</text>
							<text
								x={16}
								y={panel.sectionTop + 42}
								className="fill-muted-foreground text-[12px]"
							>
								{panel.subtitle}
							</text>
							<text
								x={16}
								y={panel.sectionTop + 62}
								className="fill-muted-foreground text-[12px] font-medium"
							>
								{panel.yAxisLabel}
							</text>

							{panel.yTicks.map((tick) => (
								<g key={`${panel.id}-${tick.y}`}>
									<line
										x1={PLOT_LEFT}
										x2={CHART_WIDTH - PLOT_RIGHT}
										y1={tick.y}
										y2={tick.y}
										stroke={GRID_LINE_COLOR}
										strokeWidth={1}
										pointerEvents="none"
									/>
									<text
										x={PLOT_LEFT - 8}
										y={tick.y + 4}
										textAnchor="end"
										className="fill-muted-foreground text-[12px] font-medium tabular-nums"
									>
										{tick.label}
									</text>
								</g>
							))}
						</g>
					))}

					{chart.xLabels.map((label, index) => {
						const isActive = hoveredConcurrency?.measurementIndex === index

						return (
							<g
								key={`vgrid-${label.concurrency}`}
								pointerEvents="none"
							>
								{chart.panels.map((panel) => (
									<line
										key={`${label.concurrency}-${panel.id}`}
										x1={label.x}
										x2={label.x}
										y1={panel.plotTop}
										y2={panel.plotTop + panel.plotHeight}
										stroke={isActive ? PRIMARY_COLOR : GRID_LINE_COLOR}
										strokeWidth={isActive ? 1.5 : 1}
										strokeOpacity={isActive ? 0.5 : 1}
										strokeDasharray={isActive ? undefined : '4 4'}
									/>
								))}
							</g>
						)
					})}

					<g clipPath={`url(#${clipId}-plot)`}>
						{chart.panels.flatMap((panel) =>
							panel.series.map((series) => (
								<path
									key={`${panel.id}-${series.id}`}
									d={series.path}
									fill="none"
									stroke={series.color}
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeDasharray={series.dashed ? '6 4' : undefined}
									className="pointer-events-none"
								/>
							)),
						)}
					</g>

					{chart.xLabels.map((label, index) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: invisible SVG columns for chart hover tooltips.
						<rect
							key={`hit-${label.concurrency}`}
							x={label.x - chart.hitBandWidth / 2}
							y={PLOT_TOP}
							width={chart.hitBandWidth}
							height={chart.plotBottom - PLOT_TOP}
							fill="transparent"
							className="cursor-pointer"
							onMouseEnter={() => showConcurrencyTooltip(index, label.x)}
							onMouseLeave={clearConcurrencyTooltip}
						/>
					))}

					<text
						x={16}
						y={TOTAL_HEIGHT - 12}
						className="fill-muted-foreground text-[12px] font-medium"
					>
						Concurrent requests
					</text>

					{chart.xLabels.map((label, index) => {
						const isActive = hoveredConcurrency?.measurementIndex === index

						return (
							<text
								key={label.concurrency}
								x={label.x}
								y={TOTAL_HEIGHT - 12}
								textAnchor="middle"
								className={cn(
									'text-[12px] tabular-nums transition-colors',
									isActive
										? 'fill-foreground font-semibold'
										: 'fill-muted-foreground font-medium',
								)}
							>
								{label.concurrency}
							</text>
						)
					})}
				</svg>

				{hoveredConcurrency && tooltipPosition
					? createPortal(
							<div
								className="pointer-events-none fixed z-50 w-[15.5rem] rounded-lg border border-border/80 bg-popover px-3.5 py-2.5 text-popover-foreground shadow-lg"
								style={{
									left: tooltipPosition.x,
									top: tooltipPosition.y,
									transform: 'translate(-50%, -50%)',
								}}
							>
								<p className="text-caption-strong text-foreground">
									Concurrency {hoveredConcurrency.concurrency}
								</p>
								<dl className="mt-2.5 space-y-2 text-caption text-muted-foreground">
									{hoveredConcurrency.values.map((metricValue) => (
										<div
											key={metricValue.label}
											className="flex items-center justify-between gap-3"
										>
											<dt className="flex min-w-0 items-center gap-2">
												<span
													className="h-2 w-2 shrink-0 rounded-full ring-2 ring-background"
													style={{ backgroundColor: metricValue.color }}
													aria-hidden
												/>
												<span>{metricValue.label}</span>
											</dt>
											<dd className="shrink-0 font-mono tabular-nums text-foreground">
												{formatMetric(metricValue.value, metricValue.decimals)}
											</dd>
										</div>
									))}
								</dl>
							</div>,
							document.body,
						)
					: null}
			</div>
		</div>
	)
}
