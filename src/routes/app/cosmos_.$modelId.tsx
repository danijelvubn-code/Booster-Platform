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
	CheckCircle2,
	CircleStop,
	Code2,
	Cpu,
	Table as FeatureTableIcon,
	FileArchive,
	FileText,
	FileVolume,
	FlaskConical,
	GitBranchPlus,
	Hammer,
	Image,
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
	Share2,
	Type,
	Video,
	Weight,
} from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconBox } from '@/components/ui/icon-box'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { getProviderOptions, models } from '@/data/mockData'
import {
	getModelModalityLabel,
	getOverallModelScore,
	getParamSizeLabel,
	type ModelRecord,
} from '@/lib/model-metrics'
import { getModelProviderLogoSrc } from '@/lib/model-provider-logos'
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
	'modalities',
	'endpoints',
	'features',
	'specifications',
	'sources',
	'providers',
] as const

const NAV: Array<{ id: SectionId; label: string }> = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'capabilities', label: 'Capabilities' },
	{ id: 'modalities', label: 'Modalities' },
	{ id: 'endpoints', label: 'Endpoints' },
	{ id: 'features', label: 'Features' },
	{ id: 'specifications', label: 'Specifications' },
	{ id: 'sources', label: 'Sources' },
	{ id: 'providers', label: 'Providers' },
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
	input_price_per_1m?: string
	output_price_per_1m?: string
	sources: Array<{
		type: string
		repo: string
	}>
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
		categories: Array<{
			name: string
			score: number
			subcategogies?: Array<{
				name: string
				score: number
				benchmarks?: Array<{
					id: string
					weight: number
					score: number
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
}: {
	active: SectionId
	onSelect: (id: SectionId) => void
}) {
	return (
		<nav
			className="sticky top-8 flex w-40 shrink-0 flex-col"
			aria-label="Model detail sections"
		>
			{NAV.map((item) => {
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
	if (score <= 1) return Math.round(score * 100)
	if (score <= 100) return Math.round(score)
	return Math.round(score)
}

function formatScore(score: number): string {
	return `${scoreToPercent(score)}%`
}

function formatEurPer1M(value: number): string {
	return `€${value.toFixed(2)}`
}

const CAPABILITY_ROW_DEFS = [
	{ label: 'Agents', match: /efficiency|agent|batch|throughput/i, icon: Cpu },
	{ label: 'Coding', match: /code|programming|debug/i, icon: Code2 },
	{ label: 'General', match: /language|multilingual|custom/i, icon: Brain },
	{
		label: 'Scientific Reasoning',
		match: /reasoning|math|logical|rag|scientific/i,
		icon: FlaskConical,
	},
] as const

function capabilityRowsFromYaml(model: ModelYaml) {
	const categories = model.capabilities.categories
	return CAPABILITY_ROW_DEFS.map((def) => {
		const match = categories.find((cat) => def.match.test(cat.name))
		const fallbackScore =
			categories.length > 0
				? Math.round(
						categories.reduce(
							(sum, cat) => sum + scoreToPercent(cat.score),
							0,
						) / categories.length,
					)
				: 0
		return {
			label: def.label,
			score: match ? scoreToPercent(match.score) : fallbackScore,
			icon: def.icon,
		}
	})
}

function capabilityAccordionBucketsFromYaml(model: ModelYaml) {
	const summaryRows = capabilityRowsFromYaml(model)
	const categories = model.capabilities.categories
	return CAPABILITY_ROW_DEFS.map((def, index) => ({
		label: def.label,
		icon: def.icon,
		scorePercent: summaryRows[index].score,
		sourceCategories: categories.filter((cat) => def.match.test(cat.name)),
	}))
}

function CapabilityCategoryDetailBody({
	category,
}: {
	category: ModelYaml['capabilities']['categories'][number]
}) {
	if (!category.subcategogies || category.subcategogies.length === 0) {
		return (
			<p className="text-caption text-muted-foreground">
				No subcategories yet.
			</p>
		)
	}
	return (
		<div className="space-y-3">
			{category.subcategogies.map((sub) => (
				<div
					key={sub.name}
					className="overflow-hidden rounded-md border border-border bg-card"
				>
					<div className="flex h-12 items-center justify-between gap-3 px-3">
						<p className="text-body-sm text-foreground">{sub.name}</p>
						<span className="text-body-sm tabular-nums text-muted-foreground">
							{formatScore(sub.score)}
						</span>
					</div>
					{sub.benchmarks && sub.benchmarks.length > 0 ? (
						<div className="border-t border-border">
							<Table containerClassName="overflow-x-auto overflow-y-hidden">
								<TableHeader>
									<TableRow className="hover:bg-transparent">
										<TableHead className="h-10">Benchmark</TableHead>
										<TableHead className="h-10 text-right">Weight</TableHead>
										<TableHead className="h-10 text-right">Score</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{sub.benchmarks.map((b) => (
										<TableRow key={b.id} className="hover:bg-transparent">
											<TableCell className="font-mono text-body-sm">
												{b.id}
											</TableCell>
											<TableCell className="text-right text-body-sm tabular-nums">
												{b.weight}
											</TableCell>
											<TableCell className="text-right text-body-sm tabular-nums">
												{formatScore(b.score)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					) : (
						<div className="border-t border-border px-3 py-2">
							<p className="text-caption text-muted-foreground">
								No benchmarks yet.
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

function getMockParameterCount(model: ModelRecord): number {
	const explicitParam =
		getParamSizeLabel(model.name) ?? getParamSizeLabel(model.description)
	if (explicitParam) {
		return Number.parseFloat(explicitParam.replace('B', '')) * 1_000_000_000
	}

	const haystack =
		`${model.name} ${model.domain} ${model.category}`.toLowerCase()
	if (haystack.includes('mistral large')) return 123_000_000_000
	if (haystack.includes('codestral')) return 22_000_000_000
	if (haystack.includes('deepseek')) return 671_000_000_000
	if (haystack.includes('qwen')) return 72_000_000_000
	if (haystack.includes('llama')) return 70_000_000_000
	if (haystack.includes('code')) return 22_000_000_000
	if (haystack.includes('enterprise')) return 72_000_000_000
	return 32_000_000_000
}

function normalizeModel(model: ModelRecord): ModelYaml {
	const score = getOverallModelScore(model)
	const parameters = getMockParameterCount(model)
	const hasVision = model.strengths.some((s) =>
		/vision|image|multimodal/i.test(s),
	)
	const hasCode = model.category === 'Code' || /code/i.test(model.domain)

	return {
		id: model.id,
		name: model.name,
		version: model.version,
		base_model: null,
		description: model.description,
		license: model.hosting === 'Booster Powered' ? 'Commercial' : 'Open Source',
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
		format: 'API',
		quantization: null,
		dtype: 'bf16',
		parameters,
		min_memory_bytes: Math.max(parameters * 2, 0),
		input_price_per_1m: model.inputCostPer1M.toFixed(2),
		output_price_per_1m: model.outputCostPer1M.toFixed(2),
		sources: [
			{
				type: model.hosting,
				repo: model.provider,
			},
		],
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
			inteligence_index: score / 100,
			categories: model.capabilities.map((cap) => ({
				name: cap.name,
				score: cap.score,
				subcategogies: cap.subs.map((sub) => ({
					name: sub.name,
					score: sub.score,
					benchmarks: model.benchmarks
						.filter((benchmark) => benchmark.category === cap.name)
						.map((benchmark) => ({
							id: benchmark.name,
							weight: 1,
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

function formatMemoryKpi(bytes: number | null | undefined): {
	memoryValue: string
	memoryNumber: string
	memoryUnit: string | null
} {
	if (!bytes) {
		return {
			memoryValue: MISSING_VALUE_PLACEHOLDER,
			memoryNumber: MISSING_VALUE_PLACEHOLDER,
			memoryUnit: null,
		}
	}
	const gb = Math.round(bytes / 1_000_000_000)
	return {
		memoryValue: `${gb} GB`,
		memoryNumber: String(gb),
		memoryUnit: 'GB',
	}
}

const SPEC_GRID_ROW_FIRST_COL =
	'border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(4)]:border-b-0'
const SPEC_GRID_ROW_SECOND_COL =
	'border-b border-transparent py-2 last:border-b-0'

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
			className={cn('flex h-model-detail-row items-center gap-2', className)}
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
			className={cn('flex h-model-detail-row items-center gap-2', className)}
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

function OverviewMetaChip({
	icon: Icon,
	children,
}: {
	icon: LucideIcon
	children: React.ReactNode
}) {
	return (
		<span className="inline-flex h-icon-28 max-w-full shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-2 text-body-sm">
			<Icon
				className="h-icon-20 w-icon-20 shrink-0 text-muted-foreground"
				aria-hidden
			/>
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

	const modelYaml = useMemo(
		() => (model ? normalizeModel(model) : null),
		[model],
	)
	const capabilityRows = useMemo(
		() => (modelYaml ? capabilityRowsFromYaml(modelYaml) : []),
		[modelYaml],
	)
	const capabilityAccordionBuckets = useMemo(
		() => (modelYaml ? capabilityAccordionBucketsFromYaml(modelYaml) : []),
		[modelYaml],
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
	const providerRows = useMemo(
		() =>
			model
				? getProviderOptions(model.id).filter(
						(provider) => provider.id !== 'model-provider-fallback',
					)
				: [],
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
	const providerInitials =
		modelYaml.sources[0]?.repo?.split('/')[0]?.slice(0, 2)?.toUpperCase() ??
		'AI'
	const capabilityScore = `${Math.round(modelYaml.capabilities.inteligence_index * 1000) / 10}`
	const endpointsNewPath = '/app/endpoints/create_endpoint'
	const paramLabel = formatParameters(modelYaml.parameters)
	const ctxShort = formatContextWindow(modelYaml.max_context_length)
	const { memoryValue, memoryNumber, memoryUnit } = formatMemoryKpi(
		modelYaml.min_memory_bytes,
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
						<NavRail active={activeNav} onSelect={scrollToSection} />

						<div className="flex min-w-0 flex-1 flex-col gap-4">
							<div
								ref={assignRef('overview')}
								data-section="overview"
								id="model-detail-overview"
								className="relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 shadow-sm"
							>
								<div
									className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90"
									aria-hidden
								/>

								<div className="relative flex flex-col gap-4">
									<div className="flex flex-wrap items-start gap-3">
										<div className="flex size-icon-72 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted/50">
											<Avatar className="!h-[44px] !w-[44px] rounded-lg">
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
															variant={
																modelYaml.status === 'active'
																	? 'success'
																	: 'muted'
															}
															appearance="pill"
															size="28"
															className="font-normal"
														>
															{modelYaml.status === 'active'
																? 'Active'
																: modelYaml.status}
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
																Aggregated score from model capability
																categories in this catalog.
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
													<OverviewMetaChip icon={Scale}>
														<span className="min-w-0 truncate text-muted-foreground">
															License:{' '}
															<span className="text-foreground">
																{modelYaml.license ?? '-'}
															</span>
														</span>
													</OverviewMetaChip>
													<OverviewMetaChip icon={Share2}>
														<span className="min-w-0 truncate text-muted-foreground">
															Providers:{' '}
															<span className="text-foreground">
																{modelYaml.sources.length}
															</span>
														</span>
													</OverviewMetaChip>
												</div>

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
														Inference Endpoint
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex min-w-0 flex-col gap-8 overflow-x-clip rounded-lg border border-border bg-card shadow-sm">
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
														kpiValueToneClass(memoryValue),
													)}
												>
													{memoryNumber}
												</p>
												{memoryUnit ? (
													<span className="text-body-sm text-muted-foreground">
														{memoryUnit}
													</span>
												) : null}
											</div>
											<p className="text-caption text-muted-foreground">
												MIN. MEMORY
											</p>
										</StatColumn>
										<StatColumn showDivider>
											<div className="flex flex-wrap items-baseline gap-2">
												<p
													className={cn(
														'text-h1 font-bold tabular-nums',
														kpiValueToneClass(inputPrice),
													)}
												>
													{inputPrice}
												</p>
												<span className="flex min-w-0 flex-1 items-center gap-1 text-body-sm text-muted-foreground">
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
											<div className="flex flex-wrap items-baseline gap-2">
												<p
													className={cn(
														'text-h1 font-bold tabular-nums',
														kpiValueToneClass(outputPrice),
													)}
												>
													{outputPrice}
												</p>
												<span className="flex min-w-0 flex-1 items-center gap-1 text-body-sm text-muted-foreground">
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
													category. Score Breakdown includes subcategories,
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
												maxWidth="sheet"
											>
												<div className="rounded-lg border border-border bg-card p-4">
													<div className="flex items-center justify-between gap-4">
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
															<p className="text-[20px] font-semibold tabular-nums leading-none text-foreground">
																{formatScore(
																	modelYaml.capabilities.inteligence_index,
																)}
															</p>
															<p className="text-caption text-muted-foreground">
																Intelligence index
															</p>
														</div>
													</div>
												</div>

												<Accordion
													type="multiple"
													className="w-full rounded-lg border border-border"
												>
													{capabilityAccordionBuckets.map((bucket) => {
														const Icon = bucket.icon
														return (
															<AccordionItem
																key={bucket.label}
																value={bucket.label}
																className="border-border"
															>
																<AccordionTrigger className="h-16 px-4 py-0 text-left text-body-sm [&>svg]:ml-3">
																	<div className="flex w-full min-w-0 flex-1 items-center justify-between gap-4 text-left">
																		<span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left text-foreground">
																			<IconBox size="lg" shape="circle">
																				<Icon
																					className="text-hierarchy-secondary"
																					aria-hidden
																				/>
																			</IconBox>
																			<span className="min-w-0 flex-1 truncate text-left text-body-sm-strong">
																				{bucket.label}
																			</span>
																		</span>
																		<span className="shrink-0 tabular-nums text-foreground">
																			{formatScore(bucket.scorePercent)}
																		</span>
																	</div>
																</AccordionTrigger>
																<AccordionContent className="px-4 pb-4 pt-0 text-foreground">
																	{bucket.sourceCategories.length === 0 ? (
																		<p className="text-caption text-muted-foreground">
																			No source categories mapped to this group
																			yet.
																		</p>
																	) : (
																		<div className="space-y-6">
																			{bucket.sourceCategories.map((cat) => (
																				<div
																					key={cat.name}
																					className="space-y-3"
																				>
																					{bucket.sourceCategories.length >
																					1 ? (
																						<div className="flex items-center justify-between gap-3 border-b border-border pb-2">
																							<p className="text-body-sm-strong text-foreground">
																								{cat.name}
																							</p>
																							<span className="text-body-sm tabular-nums text-muted-foreground">
																								{formatScore(cat.score)}
																							</span>
																						</div>
																					) : null}
																					<CapabilityCategoryDetailBody
																						category={cat}
																					/>
																				</div>
																			))}
																		</div>
																	)}
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
											{capabilityRows.map((row) => {
												const Icon = row.icon
												return (
													<div
														key={row.label}
														className="grid h-control-md min-w-0 w-full max-w-full grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] items-center gap-x-5"
													>
														<div className="flex min-w-0 items-center gap-1">
															<IconBox size="xlg" shape="circle">
																<Icon
																	className="text-hierarchy-secondary"
																	aria-hidden
																/>
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
																indicatorClassName="bg-muted-foreground"
															/>
														</div>
														<span className="w-10 shrink-0 text-right text-body font-semibold tabular-nums text-foreground">
															{row.score}%
														</span>
													</div>
												)
											})}
										</div>
									</div>
								</div>

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
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-x-10',
										)}
									>
										{endpointsLeft.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(5)]:border-b-0"
											/>
										))}
										{endpointsRight.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent py-2 last:border-b-0"
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
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-10',
										)}
									>
										{featuresLeft.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(3)]:border-b-0"
											/>
										))}
										{featuresRight.map((row) => (
											<ModelDetailSupportRow
												key={row.name}
												icon={row.icon}
												label={row.name}
												supported={row.supported}
												className="border-b border-transparent py-2 last:border-b-0"
											/>
										))}
									</div>
								</div>

								<Separator />

								<div
									ref={assignRef('specifications')}
									data-section="specifications"
									id="model-detail-specifications"
									className="flex flex-wrap items-start gap-16 px-6 max-lg:flex-col max-lg:gap-6"
								>
									<SectionTitle className="w-auto shrink-0">
										Specifications
									</SectionTitle>
									<div
										className={cn(
											'grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0',
											'md:grid-flow-col md:grid-cols-2 md:grid-rows-4 md:gap-x-10',
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
								className="flex min-w-0 gap-16 rounded-lg border border-border bg-card px-6 py-6 shadow-sm max-lg:flex-col max-lg:gap-6"
							>
								<SectionTitle>Sources</SectionTitle>
								<div className="flex min-w-0 flex-1 flex-col gap-3">
									{modelYaml.sources.map((source) => (
										<div
											key={`${source.type}-${source.repo}`}
											className="flex items-center gap-3 rounded-md border border-border p-3"
										>
											<IconBox size="xlg" shape="circle" className="bg-muted">
												<FileText
													className="text-hierarchy-secondary"
													aria-hidden
												/>
											</IconBox>
											<div className="min-w-0">
												<p className="text-body-sm-strong text-foreground">
													{source.repo}
												</p>
												<p className="text-body-sm text-muted-foreground">
													{source.type}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<div
								ref={assignRef('providers')}
								data-section="providers"
								id="model-detail-providers"
								className="mb-[30vh] flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-card px-6 py-6 shadow-sm"
							>
								<SectionTitle>Providers</SectionTitle>
								<div className="min-w-0">
									<div className="overflow-x-auto rounded-lg border border-border">
										<Table>
											<TableHeader>
												<TableRow className="h-14 hover:bg-transparent">
													<TableHead>Provider</TableHead>
													<TableHead>Context</TableHead>
													<TableHead className="text-right">In / 1M</TableHead>
													<TableHead className="text-right">Out / 1M</TableHead>
													<TableHead className="text-right">Latency</TableHead>
													<TableHead className="text-right">TPS</TableHead>
													<TableHead className="text-right">Quant.</TableHead>
													<TableHead className="text-right">Certs</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{providerRows.map((provider) => (
													<TableRow
														key={provider.id}
														className="h-14 hover:bg-muted/50"
													>
														<TableCell className="text-body-sm text-foreground">
															{provider.provider}
														</TableCell>
														<TableCell className="text-body-sm text-foreground">
															{provider.context}
														</TableCell>
														<TableCell className="text-right text-body-sm text-foreground">
															{formatEurPer1M(provider.inputPer1M)}
														</TableCell>
														<TableCell className="text-right text-body-sm text-foreground">
															{formatEurPer1M(provider.outputPer1M)}
														</TableCell>
														<TableCell className="text-right text-body-sm text-foreground">
															{provider.latencyMs}ms
														</TableCell>
														<TableCell className="text-right text-body-sm text-foreground">
															{provider.tps.toFixed(1)}
														</TableCell>
														<TableCell className="text-right text-body-sm text-foreground">
															{provider.quant}
														</TableCell>
														<TableCell className="text-right">
															<Badge
																variant="success"
																appearance="ghost"
																size="24"
																className="font-normal"
																leadingIcon={<CheckCircle2 aria-hidden />}
															>
																{provider.certs.join(', ')}
															</Badge>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	)
}
