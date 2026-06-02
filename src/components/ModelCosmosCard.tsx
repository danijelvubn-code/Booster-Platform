import {
	BrainCircuit,
	Eye,
	Gauge,
	LogIn,
	LogOut,
	ShieldCheck,
} from 'lucide-react'
import { Fragment } from 'react'
import { EnergyScorePill } from '@/components/EnergyScorePill'
import { MetricCell, MetricsRow } from '@/components/metrics'
import { ModelStatusDot } from '@/components/model-detail/ModelStatusDot'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { HOSTING_PROVIDER_BOOSTER } from '@/data/model-hosting-providers'
import {
	formatContextLength,
	formatEurPer1MForDisplay,
	formatTokensPerSecond,
	getCodingScore,
	getMathScore,
	getModelCatalogBadge,
	getModelSubline,
	getOverallModelScore,
	getReasoningScore,
	type ModelRecord,
	modelHasVisionCapability,
	overallScoreTextClass,
} from '@/lib/model-metrics'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import { cn } from '@/lib/utils'

export type ModelCosmosCardVariant = 'full' | 'basic' | 'catalog'

type ModelCosmosCardProps = {
	model: ModelRecord
	className?: string
	/**
	 * `full` / `basic`: catalog tile (avatar, subline, scores, metrics).
	 * `catalog`: alternate layout with modalities and endpoint badge.
	 */
	variant?: ModelCosmosCardVariant
}

const cosmosCardSurfaceClass =
	'border border-transparent shadow-sm hover:border-primary/40 hover:shadow-md flex min-h-cosmos-card flex-col gap-5 overflow-hidden p-5 transition duration-200 ease-standard'

/** Toggle off to preview cards without the description line. */
const SHOW_COSMOS_CARD_DESCRIPTION = false

function BoosterHostedShield({ model }: { model: ModelRecord }) {
	if (model.hosting !== HOSTING_PROVIDER_BOOSTER) return null

	return (
		<Tooltip delayDuration={300}>
			<TooltipTrigger asChild>
				<span className="inline-flex shrink-0" tabIndex={0}>
					<ShieldCheck
						className="h-icon-16 w-icon-16 text-info"
						strokeWidth={2.75}
						aria-label="Booster Hosted"
					/>
				</span>
			</TooltipTrigger>
			<TooltipContent side="top">Booster Hosted</TooltipContent>
		</Tooltip>
	)
}

function ModelCosmosCardTitle({ model }: { model: ModelRecord }) {
	return (
		<div className="flex min-w-0 flex-1 items-center gap-1.5">
			<p className="truncate text-lg font-semibold leading-tight text-foreground">
				{model.name}
			</p>
			<BoosterHostedShield model={model} />
		</div>
	)
}

function ModelCosmosCardAvatar({
	model,
	className,
}: {
	model: ModelRecord
	className?: string
}) {
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)

	return (
		<div className={cn('relative shrink-0', className)}>
			<div className="bg-muted/50 h-full w-full overflow-hidden rounded-md">
				<Avatar className="h-full w-full rounded-md">
					{providerLogoSrc ? (
						<AvatarImage
							src={providerLogoSrc}
							alt=""
							className="h-full w-full object-contain"
						/>
					) : null}
					<AvatarFallback className="rounded-md text-label">
						{getProviderInitials(model.provider)}
					</AvatarFallback>
				</Avatar>
			</div>
			<ModelStatusDot status={model.status} variant="avatar" />
		</div>
	)
}

function CapabilityMetric({
	label,
	value,
	emphasize,
}: {
	label: string
	value: number
	emphasize?: boolean
}) {
	return (
		<span
			className={cn(
				'whitespace-nowrap text-foreground/75',
				emphasize ? 'text-body-sm-strong' : 'text-body-sm',
			)}
		>
			{label} {value > 0 ? `${value}%` : '—'}
		</span>
	)
}

function ModelCosmosCardV4({
	model,
	className,
}: {
	model: ModelRecord
	className?: string
}) {
	const coding = getCodingScore(model)
	const reasoning = getReasoningScore(model)
	const math = getMathScore(model)
	const overall = getOverallModelScore(model)
	const scoreClass = overallScoreTextClass(overall)
	const grade = (model.sustainability ?? 'B').toUpperCase().charAt(0)
	const subline = getModelSubline(model)
	const isDeprecated = model.status === 'Deprecated'
	const inEur = formatEurPer1MForDisplay(model.inputCostPer1M)
	const outEur = formatEurPer1MForDisplay(model.outputCostPer1M)

	const sortedCapabilityMetrics = [
		{ label: 'Coding' as const, value: coding },
		{ label: 'Reasoning' as const, value: reasoning },
		{ label: 'Math' as const, value: math },
	].sort((a, b) => {
		if (b.value !== a.value) return b.value - a.value
		return a.label.localeCompare(b.label)
	})

	return (
		<Card
			className={cn(
				cosmosCardSurfaceClass,
				isDeprecated && 'opacity-50',
				className,
			)}
		>
			<div className="flex gap-3">
				<ModelCosmosCardAvatar model={model} className="h-12 w-12" />
				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<div className="flex min-w-0 items-start gap-3">
						<div className="min-w-0 flex-1">
							<ModelCosmosCardTitle model={model} />
							<p className="truncate text-body-sm text-foreground/75">
								{subline}
							</p>
						</div>
						<div className="flex shrink-0 items-center gap-3">
							<Tooltip delayDuration={800}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											'min-w-9 shrink-0 cursor-default text-right text-lg font-semibold leading-tight tabular-nums',
											overall > 0 ? scoreClass : 'text-muted-foreground',
										)}
									>
										{overall > 0 ? `${overall}%` : '—'}
									</p>
								</TooltipTrigger>
								<TooltipContent side="top">
									Aggregated benchmark score
								</TooltipContent>
							</Tooltip>
							<EnergyScorePill grade={grade} />
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-3">
				<div className="w-12 shrink-0" aria-hidden />
				<div className="flex min-w-0 flex-1 flex-col gap-2">
					<div className="text-body-sm flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
						{sortedCapabilityMetrics.map((metric, index) => (
							<Fragment key={metric.label}>
								{index > 0 ? (
									<span className="bg-border h-4 w-px shrink-0" aria-hidden />
								) : null}
								<CapabilityMetric
									label={metric.label}
									value={metric.value}
									emphasize={index === 0 && metric.value > 0}
								/>
							</Fragment>
						))}
					</div>
					{SHOW_COSMOS_CARD_DESCRIPTION ? (
						<p className="line-clamp-2 h-[42px] min-h-[42px] text-body-sm text-foreground/75">
							{model.description}
						</p>
					) : null}
				</div>
			</div>

			<div className="flex gap-3">
				<div className="w-12 shrink-0" aria-hidden />
				<MetricsRow className="grid-cols-4">
					<MetricCell
						icon={BrainCircuit}
						label={formatContextLength(model.contextLength)}
					/>
					<MetricCell
						icon={Gauge}
						className="[&_span]:font-mono [&_span]:tabular-nums"
						label={formatTokensPerSecond(model.tokensPerSecond)}
					/>
					<MetricCell
						icon={LogIn}
						className="[&_span]:font-mono [&_span]:tabular-nums"
						label={`€${inEur}`}
					/>
					<MetricCell
						icon={LogOut}
						className="[&_span]:font-mono [&_span]:tabular-nums"
						label={`€${outEur}`}
					/>
				</MetricsRow>
			</div>
		</Card>
	)
}

function ModelCosmosCardCatalog({
	model,
	className,
}: {
	model: ModelRecord
	className?: string
}) {
	const isDeprecated = model.status === 'Deprecated'
	const showVision = modelHasVisionCapability(model)
	const catalogBadge = getModelCatalogBadge(model)
	const inEur = formatEurPer1MForDisplay(model.inputCostPer1M)
	const outEur = formatEurPer1MForDisplay(model.outputCostPer1M)

	return (
		<Card
			className={cn(
				'border border-transparent shadow-sm hover:border-primary/40 hover:shadow-md flex h-full min-h-0 flex-col gap-4 p-4 transition duration-200 ease-standard',
				isDeprecated && 'opacity-50',
				className,
			)}
		>
			<div className="flex min-w-0 flex-1 items-start gap-3">
				<ModelCosmosCardAvatar model={model} className="h-14 w-14" />
				<ModelCosmosCardTitle model={model} />
			</div>

			<div className="flex gap-3">
				<div className="w-14 shrink-0" aria-hidden />
				<div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
					<div className="flex min-h-0 min-w-0 flex-1 flex-row flex-wrap items-center justify-start gap-2">
						<span className="shrink-0 text-caption text-muted-foreground">
							Modalities
						</span>
						<div className="flex flex-wrap items-center justify-start gap-1">
							<span
								className="bg-secondary-foreground/4 flex h-icon-24 w-icon-24 shrink-0 items-center justify-center rounded-md border border-border text-caption font-bold text-foreground"
								title="Text"
							>
								T
							</span>
							{showVision ? (
								<span
									className="bg-secondary-foreground/4 flex h-icon-24 w-icon-24 shrink-0 items-center justify-center rounded-sm border border-border"
									title="Vision"
								>
									<Eye
										className="h-icon-16 w-icon-16 text-muted-foreground"
										aria-hidden
									/>
								</span>
							) : null}
						</div>
					</div>
					<div className="flex min-h-0 min-w-0 flex-1 flex-row flex-wrap items-center justify-start gap-2">
						<span className="shrink-0 text-caption text-muted-foreground">
							Endpoint
						</span>
						<Badge variant="outline" size="20" className="shrink-0 font-normal">
							{catalogBadge}
						</Badge>
					</div>
				</div>
			</div>

			<div className="flex gap-3">
				<div className="w-14 shrink-0" aria-hidden />
				<MetricsRow className="grid-cols-2">
					<MetricCell
						icon={LogIn}
						className="[&_span]:font-mono [&_span]:tabular-nums"
						label={`€${inEur}`}
					/>
					<MetricCell
						icon={LogOut}
						className="[&_span]:font-mono [&_span]:tabular-nums"
						label={`€${outEur}`}
					/>
				</MetricsRow>
			</div>
		</Card>
	)
}

export function ModelCosmosCard({
	model,
	className,
	variant = 'full',
}: ModelCosmosCardProps) {
	if (variant === 'catalog') {
		return <ModelCosmosCardCatalog model={model} className={className} />
	}
	return <ModelCosmosCardV4 model={model} className={className} />
}

/** V4 catalog card used on Model Cosmos grid and compact pickers. */
export { ModelCosmosCardV4 as ModelCosmosCardFull }
export { ModelCosmosCardV4 as ModelCosmosCardBasic }
export { ModelCosmosCardCatalog }
