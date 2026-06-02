import { createFileRoute, Link } from '@tanstack/react-router'
import {
	ArrowLeft,
	ArrowUpNarrowWide,
	AudioWaveform,
	BadgeCheck,
	Binary,
	BookAudio,
	Box,
	Braces,
	Brain,
	BrainCircuit,
	ChevronDown,
	CircleStop,
	Code2,
	Eye,
	Table as FeatureTableIcon,
	FileArchive,
	FileText,
	FileVolume,
	GitBranchPlus,
	Hammer,
	Image,
	Languages,
	Layers,
	Info,
	ListTree,
	type LucideIcon,
	Maximize,
	MemoryStick,
	MessageSquare,
	MessageSquareDashed,
	MessageSquareMore,
	Mic,
	Plus,
	Scale,
	ShieldCheck,
	Share2,
	Type,
	Video,
	Weight,
} from 'lucide-react'
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type KeyboardEvent,
	type MouseEvent,
	type ReactNode,
} from 'react'
import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import { EnergyScorePill } from '@/components/EnergyScorePill'
import { ModelLifecycleAlert } from '@/components/model-detail/ModelLifecycleAlert'
import {
	ModelPerformanceBenchmarkSection,
	PerformanceBenchmarkDetailsSheet,
	type PerformanceBenchmarkView,
} from '@/components/model-detail/ModelPerformanceBenchmarkSection'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { IconBox } from '@/components/ui/icon-box'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { models } from '@/data/mockData'
import { getModelHostingProvider } from '@/data/model-hosting-providers'
import { getModelPerformanceBenchmark } from '@/data/modelPerformanceBenchmark'
import {
	formatCapabilityWeight,
	getAiIndexScore,
	getModelCapabilityScoreAverage,
	getModelCapabilityScores,
	type ScoredSubcapability,
} from '@/lib/capability-scoring'
import {
	canCreateInferenceEndpoint,
	getModelStatusBadgeVariant,
} from '@/lib/model-lifecycle'
import { getModelBaseFamily } from '@/lib/catalog-filter-meta'
import {
	getModelModalityLabel,
	getModelParameterCount,
	getOverallModelScore,
	modelIsQuantized,
	type ModelRecord,
} from '@/lib/model-metrics'
import { getModelProviderLogoSrc } from '@/lib/model-provider-logos'
import {
	getModelSourceRows,
	sourceGridRowsClass,
} from '@/lib/model-sources'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/cosmos_/$modelId')({
	validateSearch: (search: Record<string, unknown>) => ({
		returnTo:
			typeof search.returnTo === 'string' && search.returnTo.startsWith('/app/')
				? search.returnTo
				: '/app/cosmos',
		returnLabel:
			typeof search.returnLabel === 'string' && search.returnLabel.trim()
				? search.returnLabel.trim()
				: 'Cosmos',
	}),
	component: RouteComponent,
})

type SectionId = (typeof SECTION_IDS)[number]

const SECTION_IDS = [
	'overview',
	'capabilities',
	'performance',
	'modalities',
	'endpoints',
	'features',
	'specifications',
	'sources',
] as const

const NAV: Array<{ id: SectionId; label: string }> = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'capabilities', label: 'Capabilities' },
	{ id: 'performance', label: 'Performance' },
	{ id: 'modalities', label: 'Modalities' },
	{ id: 'endpoints', label: 'Endpoints' },
	{ id: 'features', label: 'Features' },
	{ id: 'specifications', label: 'Specifications' },
	{ id: 'sources', label: 'Sources' },
]

type ModalityValue = 'input_output' | 'input_only' | 'unsupported'

type Availability = 'both' | 'input' | 'none'

function normalizeModalityAvailability(value: ModalityValue): Availability {
	if (value === 'input_output') return 'both'
	if (value === 'input_only') return 'input'
	return 'none'
}

function modalityIcon(key: string): LucideIcon {
	switch (key) {
		case 'text':
			return Type
		case 'image':
			return Image
		case 'audio':
			return Mic
		case 'video':
			return Video
		default:
			return Type
	}
}

type ModelYaml = {
	id: string
	name: string
	version: string
	base_model: string | null
	description: string
	license: string
	status: 'active' | string
	modalities: {
		text: ModalityValue
		image: ModalityValue
		audio: ModalityValue
		video: ModalityValue
	}
	endpoints: Record<
		| 'chat_completions'
		| 'chat_completions_legacy'
		| 'responses'
		| 'embeddings'
		| 'rerank'
		| 'score'
		| 'classify'
		| 'audio_transcriptions'
		| 'audio_translations',
		boolean
	>
	origin: string
	format: string
	quantization: string | null
	dtype: string
	parameters: number
	min_memory_bytes: number
	tokens_per_second: number
	input_price_per_1m?: string
	output_price_per_1m?: string
	type: string
	max_context_length: number
	features: {
		streaming: boolean
		tool_use: boolean
		structured_outputs: boolean
		reasoning: boolean
		stream_cancellation: boolean
	}
	capabilities: {
		inteligence_index: number
		ai_index: number
		categories: Array<{
			id: string
			name: string
			description: string
			score: number | null
			subcapabilities: Array<{
				id: string
				name: string
				description: string
				score: number | null
				weight: number
				benchmarks: Array<{
					id: string
					name: string
					weight: number
					score: number | null
				}>
			}>
		}>
	}
}

function modalityRowsFromYaml(model: ModelYaml) {
	return [
		{
			key: 'text',
			label: 'Text',
			availability: normalizeModalityAvailability(model.modalities.text),
		},
		{
			key: 'image',
			label: 'Image',
			availability: normalizeModalityAvailability(model.modalities.image),
		},
		{
			key: 'audio',
			label: 'Audio',
			availability: normalizeModalityAvailability(model.modalities.audio),
		},
		{
			key: 'video',
			label: 'Video',
			availability: normalizeModalityAvailability(model.modalities.video),
		},
	]
}

function endpointRowsFromYaml(model: ModelYaml) {
	return [
		{
			key: 'chat_completions',
			name: 'Chat Completions',
			supported: model.endpoints.chat_completions,
			icon: MessageSquare,
		},
		{
			key: 'responses',
			name: 'Responses',
			supported: model.endpoints.responses,
			icon: MessageSquareMore,
		},
		{
			key: 'chat_completions_legacy',
			name: 'Chat Completions (Legacy)',
			supported: model.endpoints.chat_completions_legacy,
			icon: MessageSquareDashed,
		},
		{
			key: 'embeddings',
			name: 'Embeddings',
			supported: model.endpoints.embeddings,
			icon: Braces,
		},
		{
			key: 'rerank',
			name: 'Rerank',
			supported: model.endpoints.rerank,
			icon: ArrowUpNarrowWide,
		},
		{
			key: 'score',
			name: 'Score',
			supported: model.endpoints.score,
			icon: BadgeCheck,
		},
		{
			key: 'classify',
			name: 'Classify',
			supported: model.endpoints.classify,
			icon: ListTree,
		},
		{
			key: 'audio_transcriptions',
			name: 'Audio Transcriptions',
			supported: model.endpoints.audio_transcriptions,
			icon: FileVolume,
		},
		{
			key: 'audio_translations',
			name: 'Audio Translations',
			supported: model.endpoints.audio_translations,
			icon: BookAudio,
		},
	]
}

function featureRowsFromYaml(model: ModelYaml) {
	return [
		{
			key: 'streaming',
			name: 'Streaming',
			supported: model.features.streaming,
			icon: AudioWaveform,
		},
		{
			key: 'tool_use',
			name: 'Tool Use',
			supported: model.features.tool_use,
			icon: Hammer,
		},
		{
			key: 'structured_outputs',
			name: 'Structured Outputs',
			supported: model.features.structured_outputs,
			icon: FeatureTableIcon,
		},
		{
			key: 'reasoning',
			name: 'Reasoning',
			supported: model.features.reasoning,
			icon: BrainCircuit,
		},
		{
			key: 'stream_cancellation',
			name: 'Stream Cancellation',
			supported: model.features.stream_cancellation,
			icon: CircleStop,
		},
	]
}

function BackToPrevious({ to, label }: { to: string; label: string }) {
	return (
		<Button asChild variant="ghost" size="sm" className="-ml-3">
			<Link to={to}>
				<ArrowLeft className="mr-1 h-icon-16 w-icon-16" aria-hidden />
				{label}
			</Link>
		</Button>
	)
}

function NavRail({
	active,
	onSelect,
	items = NAV,
}: {
	active: SectionId
	onSelect: (id: SectionId) => void
	items?: Array<{ id: SectionId; label: string }>
}) {
	return (
		<nav
			className="sticky top-8 flex w-40 shrink-0 flex-col"
			aria-label="Model detail sections"
		>
			{items.map((item) => {
				const isActive = active === item.id

				return (
					<button
						key={item.id}
						type="button"
						aria-current={isActive ? 'location' : undefined}
						onClick={() => onSelect(item.id)}
						className={cn(
							'flex h-model-detail-row w-40 max-w-full shrink-0 items-center gap-3 pr-6 text-left text-body-sm transition-colors',
							isActive
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground',
						)}
					>
						<span className="flex h-full w-[3px] shrink-0 justify-center bg-transparent">
							<span
								className={cn(
									'h-full w-px rounded-full bg-border',
									isActive && 'w-[3px] bg-primary',
								)}
							/>
						</span>
						<span className="min-w-0 truncate">{item.label}</span>
					</button>
				)
			})}
		</nav>
	)
}

function SectionTitle({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	const hasCustomWidth = typeof className === 'string' && /\bw-/.test(className)
	return (
		<div
			className={cn(
				'flex h-model-detail-row shrink-0 flex-col justify-center',
				!hasCustomWidth && 'w-28',
				className,
			)}
		>
			<h2 className="w-full min-w-0 text-h3 text-foreground">{children}</h2>
		</div>
	)
}

function scoreToPercent(score: number): number {
	if (!Number.isFinite(score)) return 0
	const percent = score <= 1 ? score * 100 : score
	return Math.round(percent * 10) / 10
}

function formatScore(score: number): string {
	return `${scoreToPercent(score).toFixed(1)}%`
}

function isScoreMissing(score: number | null | undefined): boolean {
	return score == null || !Number.isFinite(score)
}

function sortByScoreDesc<T extends { score: number | null }>(items: readonly T[]): T[] {
	return [...items].sort((left, right) => {
		const leftScore = isScoreMissing(left.score) ? -Infinity : left.score!
		const rightScore = isScoreMissing(right.score) ? -Infinity : right.score!
		return rightScore - leftScore
	})
}

function formatScoreOrMissing(score: number | null | undefined): string {
	if (isScoreMissing(score)) return '- -'
	return formatScore(score)
}

function ScoreOrMissing({
	score,
	className,
}: {
	score: number | null | undefined
	className?: string
}) {
	return (
		<span
			className={cn(
				className,
				isScoreMissing(score) && 'text-muted-foreground',
			)}
		>
			{formatScoreOrMissing(score)}
		</span>
	)
}

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
	reasoning: BrainCircuit,
	knowledge: Brain,
	structured_output: Braces,
	tool_use: Hammer,
	coding: Code2,
	safety: ShieldCheck,
	summarization: FileText,
	classification: ListTree,
	document_understanding: FileText,
	visual_intelligence: Eye,
	audio_understanding: AudioWaveform,
	multimodal_understanding: Layers,
	multilingualism: Languages,
	embedding: Braces,
	reranking: ArrowUpNarrowWide,
}

/** Capabilities list preview count on model detail before expanding. */
const CAPABILITY_PREVIEW_COUNT = 5

function capabilityRowsFromModel(model: ModelRecord) {
	return sortByScoreDesc(
		getModelCapabilityScores(model)
			.filter((capability) => capability.hasBenchmarkResults)
			.map((capability) => ({
				id: capability.id,
				label: capability.displayName,
				score:
					capability.score != null ? scoreToPercent(capability.score) : 0,
				icon: CAPABILITY_ICONS[capability.id] ?? Brain,
			})),
	)
}

type CapabilityScoreRowData = ReturnType<typeof capabilityRowsFromModel>[number]

function CapabilityScoreRow({ row }: { row: CapabilityScoreRowData }) {
	const Icon = row.icon
	return (
		<div className="grid h-control-md min-w-0 w-full max-w-full grid-cols-[minmax(0,14rem)_minmax(0,1fr)_64px] items-center gap-x-5">
			<div className="flex min-w-0 items-center gap-1">
				<IconBox size="xlg" shape="circle">
					<Icon className="text-hierarchy-secondary" aria-hidden />
				</IconBox>
				<span className="min-w-0 truncate text-body-sm text-hierarchy-secondary">
					{row.label}
				</span>
			</div>
			<div className="min-w-0">
				<Progress
					value={row.score}
					size="dense"
					className="bg-muted"
					indicatorClassName="bg-foreground/75"
				/>
			</div>
			<span className="w-[64px] shrink-0 text-right text-body font-semibold tabular-nums text-foreground">
				{row.score.toFixed(1)}%
			</span>
		</div>
	)
}

function capabilityAccordionFromModel(model: ModelRecord) {
	return sortByScoreDesc(
		getModelCapabilityScores(model)
			.filter((capability) => capability.hasBenchmarkResults)
			.map((capability) => ({
				id: capability.id,
				label: capability.displayName,
				description: capability.description,
				icon: CAPABILITY_ICONS[capability.id] ?? Brain,
				score: capability.score,
				subcapabilities: sortByScoreDesc(capability.subcapabilities),
			})),
	)
}

/** Shared column template: benchmark | weight | score */
const SCORE_BREAKDOWN_COLS =
	'grid-cols-[minmax(0,1fr)_112px_112px]' as const

/** Top-level capability row: white at rest, muted gray on bar hover only. */
const capabilityLevelBarClass =
	'!bg-white group-hover:!bg-white hover:!bg-muted/40'

const scoreBreakdownSurfaceClass =
	'!bg-white hover:!bg-white group-hover:!bg-white'
const scoreBreakdownSubcapabilityIndentClass = 'pl-[48px]'
const scoreBreakdownBenchmarkIndentClass = '!pl-[76px]'
const scoreBreakdownBenchmarkCellClass =
	'!py-3 !pr-4 !pl-[76px] align-middle text-left text-body-sm text-muted-foreground'
const scoreBreakdownMetricColClass =
	'w-[112px] max-w-[112px] shrink-0 justify-end text-right tabular-nums !pr-6'
const scoreBreakdownMetricCellClass = cn(
	scoreBreakdownMetricColClass,
	'!py-3 !pl-3 align-middle text-body-sm text-muted-foreground',
)
const scoreBreakdownBenchmarkHeadClass =
	'!h-10 !py-0 !pr-4 !pl-[76px] align-middle text-left text-label font-medium text-muted-foreground'
const scoreBreakdownMetricHeadClass = cn(
	scoreBreakdownMetricColClass,
	'!h-10 !py-0 !pl-3 align-middle text-label font-medium text-muted-foreground flex items-center',
)
const scoreBreakdownMetricTriggerCellClass = cn(
	scoreBreakdownMetricColClass,
	'flex !pl-3 items-center self-stretch text-body-sm',
)

function ScoreBreakdownInsetDivider({
	indentClass,
}: {
	indentClass: string
}) {
	return (
		<div className={indentClass} aria-hidden>
			<div className="border-t border-border" />
		</div>
	)
}

/** Benchmark row separators span from the benchmark indent to the right edge. */
const scoreBreakdownBenchmarkRowDividerClass =
	'relative before:pointer-events-none before:absolute before:left-[76px] before:right-0 before:bottom-0 before:border-b before:border-border'

const SCORE_BREAKDOWN_INTRO = {
	title: 'Capabilities',
	body: 'Scores are benchmark-derived. Expand each capability to see sub-capability scores, benchmark weights, and individual benchmark results.',
} as const

const SCORE_BREAKDOWN_TOOLTIPS = {
	capabilityScore:
		'Weighted average of the sub-capability scores below, using each sub-capability’s weight.',
	subcapabilityWeight:
		'Share of the parent capability score attributed to this sub-capability. Weights in this section sum to 100%.',
	subcapabilityScore:
		'Weighted average of the benchmark scores below, using each benchmark’s weight.',
	benchmarkWeight:
		'Share of the sub-capability score attributed to this benchmark. Weights in this section sum to 100%.',
	benchmarkScore: 'Model result on this benchmark evaluation, shown as a percentage.',
} as const

function stopAccordionTogglePropagation(event: MouseEvent | KeyboardEvent) {
	event.stopPropagation()
}

function ScoreBreakdownMetricHint({
	label,
	className,
	children,
}: {
	label: string
	className?: string
	children: ReactNode
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span
					className={cn('cursor-help', className)}
					tabIndex={0}
					onClick={stopAccordionTogglePropagation}
					onKeyDown={stopAccordionTogglePropagation}
				>
					{children}
				</span>
			</TooltipTrigger>
			<TooltipContent side="top" className="max-w-xs">
				{label}
			</TooltipContent>
		</Tooltip>
	)
}

function CapabilityCategoryDetailBody({
	subcapabilities,
}: {
	subcapabilities: ScoredSubcapability[]
}) {
	return (
		<Accordion type="multiple">
			{subcapabilities.map((sub, index) => (
				<AccordionItem
					key={sub.id}
					value={sub.id}
					className={cn('border-0', scoreBreakdownSurfaceClass)}
				>
					{index > 0 ? (
						<ScoreBreakdownInsetDivider
							indentClass={scoreBreakdownSubcapabilityIndentClass}
						/>
					) : null}
					<AccordionTrigger
						className={cn(
							scoreBreakdownSurfaceClass,
							'!grid h-16 w-full items-center gap-0 !p-0 py-0 text-left text-body-sm hover:no-underline [&>svg:last-child]:hidden [&[data-state=open]>svg:first-child]:rotate-180',
							SCORE_BREAKDOWN_COLS,
						)}
					>
						<div
							className={cn(
								'flex min-w-0 items-center gap-3',
								scoreBreakdownSubcapabilityIndentClass,
							)}
						>
							<ChevronDown className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground transition-transform duration-200 ease-standard" />
							<div className="min-w-0 flex-1 text-left">
								<p className="text-body-sm text-foreground">{sub.displayName}</p>
								<p className="text-caption text-hierarchy-secondary">
									{sub.description}
								</p>
							</div>
						</div>
						<div
							className={cn(
								scoreBreakdownSurfaceClass,
								scoreBreakdownMetricTriggerCellClass,
								'text-muted-foreground',
							)}
						>
							<ScoreBreakdownMetricHint
								label={SCORE_BREAKDOWN_TOOLTIPS.subcapabilityWeight}
								className="block w-full text-right text-body-sm tabular-nums text-muted-foreground"
							>
								{formatCapabilityWeight(sub.weight)}
							</ScoreBreakdownMetricHint>
						</div>
						<div
							className={cn(
								scoreBreakdownSurfaceClass,
								scoreBreakdownMetricTriggerCellClass,
								'text-foreground',
							)}
						>
							<ScoreBreakdownMetricHint
								label={SCORE_BREAKDOWN_TOOLTIPS.subcapabilityScore}
								className="block w-full text-right text-body-sm tabular-nums text-foreground"
							>
								<ScoreOrMissing score={sub.score} />
							</ScoreBreakdownMetricHint>
						</div>
					</AccordionTrigger>
					<AccordionContent
						className={cn(
							scoreBreakdownSurfaceClass,
							'px-0 pb-0 pt-0 text-foreground',
						)}
					>
						<ScoreBreakdownInsetDivider
							indentClass={scoreBreakdownBenchmarkIndentClass}
						/>
						<div className="w-full" role="table">
							<div
								role="row"
								className={cn(
									'grid w-full items-center gap-0',
									SCORE_BREAKDOWN_COLS,
									scoreBreakdownSurfaceClass,
									'h-10',
									scoreBreakdownBenchmarkRowDividerClass,
								)}
							>
								<div
									role="columnheader"
									className={cn(
										scoreBreakdownSurfaceClass,
										scoreBreakdownBenchmarkHeadClass,
										'flex h-10 items-center',
									)}
								>
									Benchmark
								</div>
								<div
									role="columnheader"
									className={cn(
										scoreBreakdownSurfaceClass,
										scoreBreakdownMetricHeadClass,
									)}
								>
									Weight
								</div>
								<div
									role="columnheader"
									className={cn(
										scoreBreakdownSurfaceClass,
										scoreBreakdownMetricHeadClass,
									)}
								>
									Score
								</div>
							</div>
							{sub.benchmarks.map((benchmark, benchmarkIndex) => (
								<div
									key={`${sub.id}-${benchmark.id}`}
									role="row"
									className={cn(
										'grid w-full items-center gap-0',
										SCORE_BREAKDOWN_COLS,
										scoreBreakdownSurfaceClass,
										benchmarkIndex < sub.benchmarks.length - 1 &&
											scoreBreakdownBenchmarkRowDividerClass,
									)}
								>
									<div
										role="cell"
										className={cn(
											scoreBreakdownSurfaceClass,
											scoreBreakdownBenchmarkCellClass,
										)}
									>
										{benchmark.displayName}
									</div>
									<div
										role="cell"
										className={cn(
											scoreBreakdownSurfaceClass,
											scoreBreakdownMetricCellClass,
											'flex items-center',
										)}
									>
										<ScoreBreakdownMetricHint
											label={SCORE_BREAKDOWN_TOOLTIPS.benchmarkWeight}
											className="block w-full text-right text-body-sm tabular-nums text-muted-foreground"
										>
											{formatCapabilityWeight(benchmark.weight)}
										</ScoreBreakdownMetricHint>
									</div>
									<div
										role="cell"
										className={cn(
											scoreBreakdownSurfaceClass,
											scoreBreakdownMetricCellClass,
											'flex items-center',
										)}
									>
										<ScoreBreakdownMetricHint
											label={SCORE_BREAKDOWN_TOOLTIPS.benchmarkScore}
											className="block w-full text-right text-body-sm tabular-nums text-foreground"
										>
											<ScoreOrMissing
												score={benchmark.score}
												className="text-foreground"
											/>
										</ScoreBreakdownMetricHint>
									</div>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}

function getMockParameterCount(model: ModelRecord): number {
	return getModelParameterCount(model)
}

function normalizeModel(model: ModelRecord): ModelYaml {
	const score = getOverallModelScore(model)
	const parameters = getMockParameterCount(model)
	const isQuantized = modelIsQuantized(model)
	const hasVision = model.strengths.some((s) =>
		/vision|image|multimodal/i.test(s),
	)
	const hasCode = model.category === 'Code' || /code/i.test(model.domain)

	return {
		id: model.id,
		name: model.name,
		version: model.version,
		base_model: isQuantized
			? (getModelBaseFamily(model) ?? model.name)
			: null,
		description: model.description,
		license: model.hosting === 'Booster Hosted' ? 'Commercial' : 'Open Source',
		status: model.status.toLowerCase(),
		modalities: {
			text: 'input_output',
			image: hasVision ? 'input_only' : 'unsupported',
			audio: 'unsupported',
			video: 'unsupported',
		},
		endpoints: {
			chat_completions: true,
			chat_completions_legacy: false,
			responses: true,
			embeddings: !hasCode,
			rerank: model.capabilities.some((cap) => /rag|language/i.test(cap.name)),
			score: true,
			classify: true,
			audio_transcriptions: false,
			audio_translations: false,
		},
		origin: model.provider,
		format: isQuantized ? 'Safetensors' : 'API',
		quantization:
			'quantization' in model && model.quantization ? model.quantization : null,
		dtype: 'bf16',
		parameters,
		min_memory_bytes: Math.max(parameters * 2, 0),
		tokens_per_second: model.tokensPerSecond,
		input_price_per_1m: model.inputCostPer1M.toFixed(2),
		output_price_per_1m: model.outputCostPer1M.toFixed(2),
		type: getModelModalityLabel(model),
		max_context_length: model.contextLength,
		features: {
			streaming: true,
			tool_use: score >= 80,
			structured_outputs: true,
			reasoning: model.capabilities.some((cap) => /reason/i.test(cap.name)),
			stream_cancellation: true,
		},
		capabilities: {
			inteligence_index: (getAiIndexScore(model) ?? score) / 100,
			ai_index: (getAiIndexScore(model) ?? score) / 100,
			categories: getModelCapabilityScores(model).map((capability) => ({
				id: capability.id,
				name: capability.displayName,
				description: capability.description,
				score: capability.score,
				subcapabilities: capability.subcapabilities.map((subcapability) => ({
					id: subcapability.id,
					name: subcapability.displayName,
					description: subcapability.description,
					score: subcapability.score,
					weight: subcapability.weight,
					benchmarks: subcapability.benchmarks.map((benchmark) => ({
						id: benchmark.id,
						name: benchmark.displayName,
						weight: benchmark.weight,
						score: benchmark.score,
					})),
				})),
			})),
		},
	}
}

const MISSING_VALUE_PLACEHOLDER = '- -'

function formatParameters(parameters: number | null | undefined): string {
	if (!parameters) return MISSING_VALUE_PLACEHOLDER
	if (parameters >= 1_000_000_000) {
		return `${Math.round(parameters / 1_000_000_000)}B`
	}
	if (parameters >= 1_000_000) return `${Math.round(parameters / 1_000_000)}M`
	return String(parameters)
}

function formatContextWindow(tokens: number | null | undefined): string {
	if (!tokens) return MISSING_VALUE_PLACEHOLDER
	if (tokens >= 1000) return `${Math.round(tokens / 1000)}K`
	return String(tokens)
}

function formatTokensPerSecondKpi(tps: number | null | undefined): {
	tpsValue: string
	tpsNumber: string
	tpsUnit: string | null
} {
	if (!tps || !Number.isFinite(tps) || tps <= 0) {
		return {
			tpsValue: MISSING_VALUE_PLACEHOLDER,
			tpsNumber: MISSING_VALUE_PLACEHOLDER,
			tpsUnit: null,
		}
	}
	const rounded = Math.round(tps)
	return {
		tpsValue: `${rounded} tok/s`,
		tpsNumber: String(rounded),
		tpsUnit: 'tok/s',
	}
}

const MODEL_DETAIL_LIST_ROW_CLASS =
	'flex h-[56px] min-h-[56px] shrink-0 items-center gap-2'

const SPEC_GRID_ROW_FIRST_COL =
	'border-b border-transparent last:border-b-0 md:[&:nth-child(4)]:border-b-0'
const SPEC_GRID_ROW_SECOND_COL =
	'border-b border-transparent last:border-b-0'

function displayOrMissing(value: string | null | undefined): string {
	return value && value.trim() ? value : MISSING_VALUE_PLACEHOLDER
}

function formatSpecificationMemory(bytes: number | null | undefined): string {
	if (!bytes) return MISSING_VALUE_PLACEHOLDER
	return `${Math.round(bytes / 1_000_000_000)} GB`
}

function formatSpecificationContextWindow(
	tokens: number | null | undefined,
): string {
	if (!tokens) return MISSING_VALUE_PLACEHOLDER
	if (tokens >= 1000) return `${Math.round(tokens / 1000)}K tokens`
	return `${tokens} tokens`
}

function specRowsFromYaml(model: ModelYaml) {
	return [
		{
			icon: Share2,
			label: 'Parameters',
			value: formatParameters(model.parameters),
			className: SPEC_GRID_ROW_FIRST_COL,
		},
		{
			icon: MemoryStick,
			label: 'Min. Memory',
			value: formatSpecificationMemory(model.min_memory_bytes),
			className: SPEC_GRID_ROW_FIRST_COL,
		},
		{
			icon: Maximize,
			label: 'Context Length',
			value: formatSpecificationContextWindow(model.max_context_length),
			className: SPEC_GRID_ROW_FIRST_COL,
		},
		{
			icon: Binary,
			label: 'Data Type',
			value: displayOrMissing(model.dtype),
			className: SPEC_GRID_ROW_FIRST_COL,
		},
		{
			icon: FileArchive,
			label: 'Format',
			value: displayOrMissing(model.format),
			className: SPEC_GRID_ROW_SECOND_COL,
		},
		{
			icon: Weight,
			label: 'Quantization',
			value: displayOrMissing(model.quantization),
			className: SPEC_GRID_ROW_SECOND_COL,
		},
		{
			icon: GitBranchPlus,
			label: 'Origin',
			value: displayOrMissing(model.origin),
			className: SPEC_GRID_ROW_SECOND_COL,
		},
		{
			icon: Box,
			label: 'Base Model',
			value: displayOrMissing(model.base_model),
			className: SPEC_GRID_ROW_SECOND_COL,
		},
	]
}

function kpiValueToneClass(
	value: string,
): 'text-muted-foreground' | 'text-foreground' {
	return value === MISSING_VALUE_PLACEHOLDER
		? 'text-muted-foreground'
		: 'text-foreground'
}

function StatColumn({
	children,
	showDivider,
	isFirst,
}: {
	children: React.ReactNode
	showDivider?: boolean
	isFirst?: boolean
}) {
	return (
		<div
			className={cn(
				'flex min-w-0 flex-1 flex-col gap-1',
				!isFirst && 'pl-0',
				showDivider && 'border-r border-border pr-model-detail-kpi-x',
			)}
		>
			{children}
		</div>
	)
}

function ModelDetailSupportRow({
	icon: Icon,
	label,
	supported,
	className,
}: {
	icon: LucideIcon
	label: string
	supported: boolean
	className?: string
}) {
	return (
		<div
			className={cn(MODEL_DETAIL_LIST_ROW_CLASS, className)}
		>
			<IconBox size="xlg" shape="circle">
				<Icon
					className={cn(
						supported ? 'text-hierarchy-secondary' : 'text-hierarchy-disabled',
					)}
					aria-hidden
				/>
			</IconBox>
			<span
				className={cn(
					'min-w-0 flex-1 text-body-sm',
					supported ? 'text-hierarchy-secondary' : 'text-hierarchy-disabled',
				)}
			>
				{label}
			</span>
			<Badge
				appearance="ghost"
				variant={supported ? 'success' : 'muted'}
				size="24"
				className="w-control-md shrink-0 justify-center tabular-nums px-1"
			>
				{supported ? 'Yes' : 'No'}
			</Badge>
		</div>
	)
}

function SpecRow({
	icon: Icon,
	label,
	value,
	className,
}: {
	icon: LucideIcon
	label: string
	value: string
	className?: string
}) {
	return (
		<div
			className={cn(MODEL_DETAIL_LIST_ROW_CLASS, className)}
		>
			<IconBox size="xlg" shape="circle">
				<Icon className="text-hierarchy-secondary" aria-hidden />
			</IconBox>
			<span className="min-w-0 flex-1 text-body-sm text-hierarchy-secondary">
				{label}
			</span>
			<span
				className={cn(
					'shrink-0 text-label tabular-nums',
					value === MISSING_VALUE_PLACEHOLDER
						? 'text-muted-foreground'
						: 'text-foreground',
				)}
			>
				{value}
			</span>
		</div>
	)
}

function getSourceRowIcon(label: string): LucideIcon {
	switch (label) {
		case 'Provider':
			return Brain
		case 'Type':
			return Layers
		case 'Repo':
			return FileText
		case 'Base URL':
			return Share2
		default:
			return FileText
	}
}

function SourceRow({
	label,
	value,
	href,
	tag,
	className,
}: {
	label: string
	value: string
	href?: string
	tag?: string
	className?: string
}) {
	const Icon = getSourceRowIcon(label)

	return (
		<div className={cn(MODEL_DETAIL_LIST_ROW_CLASS, className)}>
			<IconBox size="xlg" shape="circle">
				<Icon className="text-hierarchy-secondary" aria-hidden />
			</IconBox>
			<span className="min-w-0 flex-1 text-body-sm text-hierarchy-secondary">
				{label}
			</span>
			{tag ? (
				<span className="flex min-w-0 max-w-[min(100%,20rem)] shrink items-center justify-end gap-2">
					<span className="min-w-0 truncate text-label text-foreground">
						{value}
					</span>
					<Badge appearance="ghost" variant="muted" size="24">
						{tag}
					</Badge>
				</span>
			) : href ? (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="min-w-0 max-w-[min(100%,20rem)] shrink truncate text-label text-primary hover:underline"
				>
					{value}
				</a>
			) : (
				<span
					className={cn(
						'min-w-0 max-w-[min(100%,20rem)] shrink truncate text-right text-label',
						value === MISSING_VALUE_PLACEHOLDER
							? 'text-muted-foreground'
							: 'text-foreground',
					)}
				>
					{value}
				</span>
			)}
		</div>
	)
}

function OverviewMetaChip({
	icon: Icon,
	children,
}: {
	icon?: LucideIcon
	children: React.ReactNode
}) {
	return (
		<span className="inline-flex h-icon-28 max-w-full shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-2 text-body-sm">
			{Icon ? (
				<Icon
					className="h-icon-20 w-icon-20 shrink-0 text-muted-foreground"
					aria-hidden
				/>
			) : null}
			{children}
		</span>
	)
}

function RouteComponent() {
	const { modelId } = Route.useParams()
	const { returnTo, returnLabel } = Route.useSearch()
	const model = models.find((m) => m.id === modelId)
	const sectionRefs = useRef<Partial<Record<SectionId, HTMLDivElement | null>>>(
		{},
	)
	const scrollRootRef = useRef<HTMLDivElement | null>(null)
	const [activeNav, setActiveNav] = useState<SectionId>('overview')
	const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(false)
	const [performanceView, setPerformanceView] =
		useState<PerformanceBenchmarkView>('chart')

	useEffect(() => {
		setCapabilitiesExpanded(false)
	}, [modelId])

	const modelYaml = useMemo(
		() => (model ? normalizeModel(model) : null),
		[model],
	)
	const capabilityRows = useMemo(
		() => (model ? capabilityRowsFromModel(model) : []),
		[model],
	)
	const previewCapabilityRows = useMemo(
		() => capabilityRows.slice(0, CAPABILITY_PREVIEW_COUNT),
		[capabilityRows],
	)
	const expandableCapabilityRows = useMemo(
		() => capabilityRows.slice(CAPABILITY_PREVIEW_COUNT),
		[capabilityRows],
	)
	const canExpandCapabilityRows = expandableCapabilityRows.length > 0
	const capabilityAccordionItems = useMemo(
		() => (model ? capabilityAccordionFromModel(model) : []),
		[model],
	)
	const modalityRows = useMemo(
		() => (modelYaml ? modalityRowsFromYaml(modelYaml) : []),
		[modelYaml],
	)
	const endpointRows = useMemo(
		() => (modelYaml ? endpointRowsFromYaml(modelYaml) : []),
		[modelYaml],
	)
	const featureRows = useMemo(
		() => (modelYaml ? featureRowsFromYaml(modelYaml) : []),
		[modelYaml],
	)
	const specRows = useMemo(
		() => (modelYaml ? specRowsFromYaml(modelYaml) : []),
		[modelYaml],
	)
	const sourceRows = useMemo(
		() => (model ? getModelSourceRows(model) : []),
		[model],
	)
	const performanceBenchmark = useMemo(
		() => (model ? getModelPerformanceBenchmark(model) : null),
		[model],
	)
	const assignRef = useCallback(
		(id: SectionId) => (node: HTMLDivElement | null) => {
			sectionRefs.current[id] = node
		},
		[],
	)

	const scrollToSection = useCallback((id: SectionId) => {
		setActiveNav(id)
		sectionRefs.current[id]?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}, [])

	const handleSectionScroll = useCallback(() => {
		const rootTop = scrollRootRef.current?.getBoundingClientRect().top ?? 0
		const nextActive =
			[...SECTION_IDS].reverse().find((id) => {
				const sectionTop =
					sectionRefs.current[id]?.getBoundingClientRect().top ?? Infinity
				return sectionTop - rootTop <= 120
			}) ?? 'overview'
		setActiveNav(nextActive)
	}, [])

	if (!model) {
		return (
			<div className="container py-8">
				<p className="text-body-sm text-muted-foreground">Model not found.</p>
				<Button asChild variant="ghost" className="mt-4">
					<Link to="/app/cosmos" search={{ hosting: '' }}>
						All models
					</Link>
				</Button>
			</div>
		)
	}

	if (!modelYaml) return null

	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const providerInitials = model.provider.slice(0, 2).toUpperCase()
	const capabilityScoreAverage = getModelCapabilityScoreAverage(model)
	const capabilityScore =
		capabilityScoreAverage != null
			? scoreToPercent(capabilityScoreAverage).toFixed(1)
			: MISSING_VALUE_PLACEHOLDER
	const endpointsNewPath = '/app/endpoints/create_endpoint'
	const deployAllowed = canCreateInferenceEndpoint(model)
	const hostingProvider = getModelHostingProvider(model)
	const energyGrade = (model.sustainability ?? 'B').toUpperCase().charAt(0)
	const quantizationLabel =
		modelIsQuantized(model) && modelYaml.quantization
			? modelYaml.quantization
			: null
	const paramLabel = formatParameters(modelYaml.parameters)
	const ctxShort = formatContextWindow(modelYaml.max_context_length)
	const { tpsValue, tpsNumber, tpsUnit } = formatTokensPerSecondKpi(
		modelYaml.tokens_per_second,
	)
	const inputPrice = modelYaml.input_price_per_1m ?? MISSING_VALUE_PLACEHOLDER
	const outputPrice = modelYaml.output_price_per_1m ?? MISSING_VALUE_PLACEHOLDER

	const endpointsLeft = endpointRows.slice(0, 5)
	const endpointsRight = endpointRows.slice(5)
	const featuresLeft = featureRows.slice(0, 3)
	const featuresRight = featureRows.slice(3)

	return (
		<TooltipProvider delayDuration={200}>
			<div
				ref={scrollRootRef}
				className="min-h-0 flex-1 overflow-y-auto"
				onScroll={handleSectionScroll}
			>
				<div className="container space-y-6 py-8">
					<BackToPrevious to={returnTo} label={`Back to ${returnLabel}`} />

					<div className="flex items-start gap-10 rounded-lg">
						<NavRail
							active={activeNav}
							onSelect={scrollToSection}
							items={
								performanceBenchmark
									? NAV
									: NAV.filter((item) => item.id !== 'performance')
							}
						/>

						<div className="flex min-w-0 flex-1 flex-col gap-4">
							<ModelLifecycleAlert model={model} />

							<div
								ref={assignRef('overview')}
								data-section="overview"
								id="model-detail-overview"
								className="border-primary-fade-shell shadow-sm"
							>
								<div className="relative overflow-hidden rounded-lg bg-card p-6">
								<div
									className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90"
									aria-hidden
								/>

								<div className="relative flex flex-col gap-4">
									<div className="flex flex-wrap items-start gap-3">
										<div className="size-icon-72 shrink-0 overflow-hidden rounded-lg bg-muted/50">
											<Avatar className="h-full w-full rounded-lg">
												{providerLogoSrc ? (
													<AvatarImage
														src={providerLogoSrc}
														alt=""
														className="size-full object-contain"
													/>
												) : null}
												<AvatarFallback className="rounded-lg text-label">
													{providerInitials}
												</AvatarFallback>
											</Avatar>
										</div>

										<div className="flex min-w-0 flex-1 flex-col gap-4">
											<div className="flex flex-wrap items-start justify-between gap-4">
												<div className="min-w-0 max-w-[600px] flex-1 space-y-3">
													<div className="flex flex-wrap items-center gap-2 gap-y-2">
														<h1 className="text-display font-bold tracking-tight text-foreground">
															{modelYaml.name}
														</h1>
														<Badge
															variant="muted"
															appearance="pill"
															size="28"
															className="font-normal"
														>
															{modelYaml.type.toUpperCase()}
														</Badge>
														<Badge
															variant={getModelStatusBadgeVariant(model.status)}
															appearance="pill"
															size="28"
															className="font-normal"
														>
															{model.status}
														</Badge>
													</div>

													<p className="text-body-sm text-foreground">
														{modelYaml.description}
													</p>
												</div>

												<div className="flex shrink-0 flex-col items-end gap-2">
													<div className="flex items-center gap-1">
														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	type="button"
																	variant="ghost"
																	size="icon-sm"
																	className="shrink-0 text-muted-foreground hover:text-foreground [&_svg]:h-icon-20 [&_svg]:w-icon-20"
																	aria-label="About capability score"
																>
																	<Info aria-hidden />
																</Button>
															</TooltipTrigger>
															<TooltipContent className="max-w-page-intro">
																Average of evaluated capability scores shown
																for this model.
															</TooltipContent>
														</Tooltip>
														<span className="text-display font-bold text-primary tabular-nums">
															{capabilityScore}
														</span>
													</div>
													<p className="text-caption text-muted-foreground">
														CAPABILITY SCORE
													</p>
												</div>
											</div>

											<div className="flex flex-wrap items-center justify-between gap-3">
												<div className="flex min-w-0 flex-wrap items-center gap-2">
													<EnergyScorePill grade={energyGrade} bordered />
													<OverviewMetaChip>
														<span className="min-w-0 truncate text-foreground">
															v{modelYaml.version}
														</span>
													</OverviewMetaChip>
													<OverviewMetaChip>
														<span className="min-w-0 truncate text-foreground">
															{hostingProvider}
														</span>
													</OverviewMetaChip>
													{quantizationLabel ? (
														<OverviewMetaChip>
															<span className="min-w-0 truncate text-foreground">
																{quantizationLabel}
															</span>
														</OverviewMetaChip>
													) : null}
													<OverviewMetaChip icon={Scale}>
														<span className="min-w-0 truncate text-muted-foreground">
															License:{' '}
															<span className="text-foreground">
																{modelYaml.license ?? '-'}
															</span>
														</span>
													</OverviewMetaChip>
												</div>

												{deployAllowed ? (
													<Button
														asChild
														variant="default"
														size="default"
														className="shadow-xs"
													>
														<Link
															to={endpointsNewPath}
															search={{ model: modelYaml.id }}
														>
															<Plus className="size-icon-16" aria-hidden />
															Create Endpoint
														</Link>
													</Button>
												) : (
													<Button
														type="button"
														variant="default"
														size="default"
														className="shadow-xs"
														disabled
													>
														<Plus className="size-icon-16" aria-hidden />
														Create Endpoint
													</Button>
												)}
											</div>
										</div>
									</div>
								</div>
								</div>
							</div>

							<div className="flex min-w-0 flex-col gap-8 overflow-x-clip rounded-lg bg-card shadow-sm">
								<div className="px-6 pt-8">
									<div className="flex flex-wrap items-stretch gap-5 md:flex-nowrap">
										<StatColumn isFirst showDivider>
											<p
												className={cn(
													'text-h1 font-bold tabular-nums',
													kpiValueToneClass(paramLabel),
												)}
											>
												{paramLabel}
											</p>
											<p className="text-caption text-muted-foreground">
												PARAMETERS
											</p>
										</StatColumn>
										<StatColumn showDivider>
											<div className="flex flex-wrap items-baseline gap-1">
												<p
													className={cn(
														'text-h1 font-bold tabular-nums',
														kpiValueToneClass(ctxShort),
													)}
												>
													{ctxShort}
												</p>
												<span className="text-body-sm text-muted-foreground">
													tokens
												</span>
											</div>
											<p className="text-caption text-muted-foreground">
												CONTEXT WINDOW
											</p>
										</StatColumn>
										<StatColumn showDivider>
											<div className="flex flex-wrap items-baseline gap-1">
												<p
													className={cn(
														'text-h1 font-bold tabular-nums',
														kpiValueToneClass(tpsValue),
													)}
												>
													{tpsNumber}
												</p>
												{tpsUnit ? (
													<span className="text-body-sm text-muted-foreground">
														{tpsUnit}
													</span>
												) : null}
											</div>
											<p className="text-caption text-muted-foreground">
												TOKENS PER SECOND
											</p>
										</StatColumn>
										<StatColumn showDivider>
											<div className="flex flex-nowrap items-baseline gap-2 whitespace-nowrap">
												<p
													className={cn(
														'shrink-0 text-h1 font-bold tabular-nums',
														kpiValueToneClass(inputPrice),
													)}
												>
													{inputPrice}
												</p>
												<span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-body-sm text-muted-foreground">
													€ / 1M
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																type="button"
																variant="ghost"
																size="icon-sm"
																className="shrink-0 [&_svg]:h-icon-16 [&_svg]:w-icon-16"
																aria-label="Input pricing"
															>
																<Info aria-hidden />
															</Button>
														</TooltipTrigger>
														<TooltipContent>
															Estimated public list price per 1M input tokens.
														</TooltipContent>
													</Tooltip>
												</span>
											</div>
											<p className="text-caption text-muted-foreground">
												INPUT TOKENS
											</p>
										</StatColumn>
										<StatColumn>
											<div className="flex flex-nowrap items-baseline gap-1 whitespace-nowrap">
												<p
													className={cn(
														'shrink-0 text-h1 font-bold tabular-nums',
														kpiValueToneClass(outputPrice),
													)}
												>
													{outputPrice}
												</p>
												<span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-body-sm text-muted-foreground">
													€ / 1M
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																type="button"
																variant="ghost"
																size="icon-sm"
																className="shrink-0 [&_svg]:h-icon-16 [&_svg]:w-icon-16"
																aria-label="Output pricing"
															>
																<Info aria-hidden />
															</Button>
														</TooltipTrigger>
														<TooltipContent>
															Estimated public list price per 1M output tokens.
														</TooltipContent>
													</Tooltip>
												</span>
											</div>
											<p className="text-caption text-muted-foreground">
												OUTPUT TOKENS
											</p>
										</StatColumn>
									</div>
								</div>

								<Separator />

								<div
									ref={assignRef('capabilities')}
									data-section="capabilities"
									id="model-detail-capabilities"
									className="flex min-w-0 gap-16 px-6 max-lg:flex-col max-lg:gap-6"
								>
									<SectionTitle>Capabilities</SectionTitle>
									<div className="flex min-w-0 flex-1 flex-col gap-6">
										<Sheet>
											<div className="flex min-w-0 flex-nowrap items-center justify-between gap-4 pt-3">
												<p className="max-w-page-intro min-w-0 text-body-sm text-hierarchy-secondary">
													Capability scores show aggregated performance by task
													category. Score Breakdown includes subcapabilities,
													benchmarks, and weights.
												</p>
												<SheetTrigger asChild>
													<Button
														variant="outline"
														size="sm"
														className="shrink-0 shadow-xs"
													>
														Score Breakdown
													</Button>
												</SheetTrigger>
											</div>
											<AppSideSheetContent
												title="Score breakdown"
												description="Capability score breakdown by category and sub-scores for this model."
												maxWidth="xl"
												chromeClassName="bg-white"
												headerClassName="bg-white"
												toolbarClassName="bg-white px-6 py-4"
												toolbar={
													<div className="flex w-full items-center justify-between gap-4">
														<div className="flex min-w-0 flex-1 items-center gap-3">
															<Avatar className="h-icon-40 w-icon-40 shrink-0 rounded-md">
																{providerLogoSrc ? (
																	<AvatarImage
																		src={providerLogoSrc}
																		alt=""
																		className="size-full object-contain"
																	/>
																) : null}
																<AvatarFallback className="rounded-md text-caption font-semibold">
																	{providerInitials}
																</AvatarFallback>
															</Avatar>
															<p className="min-w-0 truncate text-[20px] font-semibold leading-none text-foreground">
																{modelYaml.name}
															</p>
														</div>
														<div className="flex shrink-0 flex-col items-end gap-1 text-right">
															<ScoreOrMissing
																score={
																	modelYaml.capabilities.ai_index == null
																		? null
																		: modelYaml.capabilities.ai_index * 100
																}
																className="text-[20px] font-semibold tabular-nums leading-none text-foreground"
															/>
															<p className="text-caption text-muted-foreground">
																CAPABILITIES SCORE
															</p>
														</div>
													</div>
												}
												bodyClassName="gap-4 pb-6 pl-6 pr-4"
											>
												<div className="space-y-1">
													<h3 className="text-body-sm-strong text-foreground">
														{SCORE_BREAKDOWN_INTRO.title}
													</h3>
													<p className="text-body-sm text-hierarchy-secondary">
														{SCORE_BREAKDOWN_INTRO.body}
													</p>
												</div>
												<Accordion
													type="multiple"
													className="w-full shrink-0 rounded-lg border border-border bg-white"
												>
													{capabilityAccordionItems.map((capability, index) => {
														const Icon = capability.icon
														const isFirst = index === 0
														const isLast =
															index === capabilityAccordionItems.length - 1
														return (
															<AccordionItem
																key={capability.id}
																value={capability.id}
																className="border-border"
															>
																<AccordionTrigger
																	className={cn(
																		capabilityLevelBarClass,
																		'h-20 items-center gap-3 pl-4 !pr-6 py-0 text-left text-body-sm hover:no-underline [&>svg:last-child]:hidden [&[data-state=open]>svg:first-child]:rotate-180',
																		isFirst && 'rounded-t-lg',
																		isLast && 'rounded-b-lg',
																	)}
																>
																	<ChevronDown className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground transition-transform duration-200 ease-standard" />
																	<span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left text-body-sm-strong text-foreground">
																		<IconBox size="lg" shape="circle">
																			<Icon
																				className="text-hierarchy-secondary"
																				aria-hidden
																			/>
																		</IconBox>
																		<span className="min-w-0 flex-1 truncate text-left">
																			{capability.label}
																		</span>
																	</span>
																	<ScoreBreakdownMetricHint
																		label={
																			SCORE_BREAKDOWN_TOOLTIPS.capabilityScore
																		}
																		className="shrink-0 text-body-sm-strong tabular-nums text-foreground"
																	>
																		<ScoreOrMissing score={capability.score} />
																	</ScoreBreakdownMetricHint>
																</AccordionTrigger>
																<AccordionContent
																	className={cn(
																		scoreBreakdownSurfaceClass,
																		'px-0 pb-0 pt-0 text-foreground',
																	)}
																>
																	<CapabilityCategoryDetailBody
																		subcapabilities={
																			capability.subcapabilities
																		}
																	/>
																</AccordionContent>
															</AccordionItem>
														)
													})}
												</Accordion>

												<p className="text-caption text-muted-foreground">
													Sub-scores drill-down is available in the detailed
													methodology view (prototype).
												</p>
											</AppSideSheetContent>
										</Sheet>

										<div className="flex min-w-0 max-w-full flex-col gap-3 p-0">
											{previewCapabilityRows.map((row) => (
												<CapabilityScoreRow key={row.id} row={row} />
											))}
											{canExpandCapabilityRows ? (
												<Collapsible
													open={capabilitiesExpanded}
													onOpenChange={setCapabilitiesExpanded}
													className="flex flex-col gap-3"
												>
													<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
														<div className="flex flex-col gap-3">
															{expandableCapabilityRows.map((row) => (
																<CapabilityScoreRow key={row.id} row={row} />
															))}
														</div>
													</CollapsibleContent>
													<CollapsibleTrigger asChild>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															className="h-auto self-center px-0 text-body-sm text-hierarchy-secondary hover:text-foreground [&_svg]:text-hierarchy-secondary hover:[&_svg]:text-foreground"
														>
															{capabilitiesExpanded
																? 'Show less'
																: 'Show all'}
															<ChevronDown
																className={cn(
																	'h-icon-16 w-icon-16 shrink-0 transition-transform duration-200 ease-standard',
																	capabilitiesExpanded && 'rotate-180',
																)}
																aria-hidden
															/>
														</Button>
													</CollapsibleTrigger>
												</Collapsible>
											) : null}
										</div>
									</div>
								</div>

								{performanceBenchmark ? (
									<>
										<Separator />

										<div
											ref={assignRef('performance')}
											data-section="performance"
											id="model-detail-performance"
											className="flex min-w-0 gap-16 px-6 max-lg:flex-col max-lg:gap-6"
										>
											<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
												Performance
											</SectionTitle>
											<div className="flex min-w-0 flex-1 flex-col gap-6">
												<div className="flex min-w-0 flex-nowrap items-center justify-between gap-4 pt-3">
													<p className="max-w-page-intro min-w-0 text-body-sm text-hierarchy-secondary">
														Review benchmark results across workloads to balance
														speed, responsiveness, and energy efficiency for your
														use case.
													</p>
													<PerformanceBenchmarkDetailsSheet
														benchmark={performanceBenchmark}
														view={performanceView}
														onViewChange={setPerformanceView}
													>
														<Button
															variant="outline"
															size="sm"
															className="shrink-0 shadow-xs"
														>
															Performance details
														</Button>
													</PerformanceBenchmarkDetailsSheet>
												</div>
												<div className="min-w-0">
													<ModelPerformanceBenchmarkSection
														benchmark={performanceBenchmark}
													/>
												</div>
											</div>
										</div>
									</>
								) : null}

								<Separator />

								<div
									ref={assignRef('modalities')}
									data-section="modalities"
									id="model-detail-modalities"
									className="flex gap-16 px-6 max-lg:flex-col max-lg:gap-6"
								>
									<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
										Modalities
									</SectionTitle>
									<div className="grid min-w-0 flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
										{modalityRows.map((row) => {
											const Icon = modalityIcon(row.key)
											const supported = row.availability !== 'none'
											const highlight =
												row.availability === 'both' ||
												row.availability === 'input'
											return (
												<div
													key={row.key}
													className={cn(
														'flex flex-col gap-2 rounded-lg border bg-card px-4 py-4',
														highlight ? 'border-primary/40' : 'border-border',
														!supported && 'opacity-75',
													)}
												>
													<div className="flex items-center gap-2">
														<IconBox size="lg" shape="square">
															<Icon
																className={cn(
																	supported
																		? 'text-primary'
																		: 'text-muted-foreground',
																)}
																aria-hidden
															/>
														</IconBox>
														<span
															className={cn(
																'text-body-sm',
																supported
																	? 'text-foreground'
																	: 'text-muted-foreground',
															)}
														>
															{row.label}
														</span>
													</div>
													{row.availability === 'both' ? (
														<p className="text-body-sm font-medium text-hierarchy-secondary">
															Input & Output
														</p>
													) : row.availability === 'input' ? (
														<p className="text-body-sm font-medium text-hierarchy-secondary">
															Input
														</p>
													) : (
														<p className="text-body-sm text-muted-foreground">
															Unsupported
														</p>
													)}
												</div>
											)
										})}
									</div>
								</div>

								<Separator />

								<div
									ref={assignRef('endpoints')}
									data-section="endpoints"
									id="model-detail-endpoints"
									className="flex flex-wrap items-start gap-16 px-6"
								>
									<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
										Endpoints
									</SectionTitle>
									<div
										className={cn(
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 auto-rows-[56px] gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(5,56px)] md:gap-x-10',
										)}
									>
										{endpointsLeft.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent last:border-b-0 md:[&:nth-child(5)]:border-b-0"
											/>
										))}
										{endpointsRight.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent last:border-b-0"
											/>
										))}
									</div>
								</div>

								<Separator />

								<div
									ref={assignRef('features')}
									data-section="features"
									id="model-detail-features"
									className="flex flex-wrap items-start gap-16 px-6"
								>
									<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
										Features
									</SectionTitle>
									<div
										className={cn(
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 auto-rows-[56px] gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(3,56px)] md:gap-x-10',
										)}
									>
										{featuresLeft.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent last:border-b-0 md:[&:nth-child(3)]:border-b-0"
											/>
										))}
										{featuresRight.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent last:border-b-0"
											/>
										))}
									</div>
								</div>

								<Separator />

								<div
									ref={assignRef('specifications')}
									data-section="specifications"
									id="model-detail-specifications"
									className="mb-6 flex flex-wrap items-start gap-16 px-6 max-lg:flex-col max-lg:gap-6"
								>
									<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
										Specifications
									</SectionTitle>
									<div
										className={cn(
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 auto-rows-[56px] gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-[repeat(4,56px)] md:gap-x-10',
										)}
									>
										{specRows.map((row) => (
											<SpecRow
												key={row.label}
												icon={row.icon}
												label={row.label}
												value={row.value}
												className={row.className}
											/>
										))}
									</div>
								</div>
							</div>

							<div
								ref={assignRef('sources')}
								data-section="sources"
								id="model-detail-sources"
								className="mb-[30vh] flex min-w-0 flex-wrap items-start gap-16 rounded-lg bg-card px-6 py-6 shadow-sm max-lg:flex-col max-lg:gap-6"
							>
								<SectionTitle className="w-[124px] min-w-[124px] basis-[124px]">
									Sources
								</SectionTitle>
								<div
									className={cn(
										'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 auto-rows-[56px] gap-y-0',
										'md:grid-flow-col md:grid-cols-2 md:gap-x-10',
										sourceGridRowsClass(
											Math.ceil(sourceRows.length / 2),
										),
									)}
								>
									{sourceRows.map((row) => (
										<SourceRow
											key={row.label}
											label={row.label}
											value={row.value}
											href={row.href}
											tag={row.tag}
											className={row.className}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	)
}
