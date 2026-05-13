import { Cpu, Eye, Zap } from 'lucide-react'
import { EnergyScorePill } from '@/components/EnergyScorePill'
import { MetricCell, MetricsRow } from '@/components/metrics'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	formatContextLength,
	formatEurPerTokenFromPer1M,
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
	 * `full`: avatar, scores, sustainability, metrics (phase 2).
	 * `basic`: name, provider, description only (phase 1).
	 * `catalog`: card layout with avatar, model name, modalities, endpoint, and per-token in/out in metric cells.
	 */
	variant?: ModelCosmosCardVariant
}

function ModelCosmosCardFull({
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
	const subline = getModelSubline(model)
	const scoreClass = overallScoreTextClass(overall)
	const grade = (model.sustainability ?? 'B').toUpperCase().charAt(0)

	const isDeprecated = model.status === 'Deprecated'
	const statusSuffix = model.status === 'Active' ? '' : ` · ${model.status}`
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)

	return (
		<Card
			className={cn(
				'hover:border-primary/40 hover:shadow-md flex h-full flex-col gap-4 p-4 transition duration-200 ease-standard',
				isDeprecated && 'opacity-50',
				className,
			)}
		>
			<div className="flex gap-3">
				<div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
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
				<div className="flex min-w-0 flex-1 flex-col gap-0.75">
					<div className="flex h-8 min-w-0 items-center gap-3">
						<p className="min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground/75">
							{model.name}
						</p>
						<div className="flex shrink-0 items-center gap-4">
							<EnergyScorePill grade={grade} />
							<Tooltip delayDuration={800}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											'min-w-9 shrink-0 cursor-default text-left text-lg font-semibold leading-tight',
											scoreClass,
										)}
									>
										{overall > 0 ? `${overall}%` : '—'}
									</p>
								</TooltipTrigger>
								<TooltipContent side="top">
									Aggregated benchmark score
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
					<p className="text-body-sm text-muted-foreground">
						{subline}
						{statusSuffix}
					</p>
				</div>
			</div>

			<div className="flex gap-3">
				<div className="w-14 shrink-0" aria-hidden />
				<div className="text-body-sm text-muted-foreground flex min-w-0 flex-1 flex-wrap items-center gap-3">
					<span className="text-body-sm-strong text-foreground/75 whitespace-nowrap">
						Coding {coding}%
					</span>
					<span className="bg-border h-4 w-px shrink-0" aria-hidden />
					<span className="whitespace-nowrap">Reasoning {reasoning}%</span>
					<span className="bg-border h-4 w-px shrink-0" aria-hidden />
					<span className="whitespace-nowrap">Math {math}%</span>
				</div>
			</div>

			<div className="flex gap-3">
				<div className="w-14 shrink-0" aria-hidden />
				<MetricsRow>
					<MetricCell icon={Zap} label={`${model.tokensPerSecond} tok/s`} />
					<MetricCell
						icon={Cpu}
						label={formatContextLength(model.contextLength)}
					/>
					<MetricCell
						label={`€${model.inputCostPer1M} → €${model.outputCostPer1M} / 1M`}
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
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const isDeprecated = model.status === 'Deprecated'
	const showVision = modelHasVisionCapability(model)
	const catalogBadge = getModelCatalogBadge(model)
	const inEur = formatEurPerTokenFromPer1M(model.inputCostPer1M)
	const outEur = formatEurPerTokenFromPer1M(model.outputCostPer1M)

	return (
		<Card
			className={cn(
				'hover:border-primary/40 hover:shadow-md flex h-full min-h-0 flex-col gap-4 p-4 transition duration-200 ease-standard',
				isDeprecated && 'opacity-50',
				className,
			)}
		>
			<div className="flex min-w-0 flex-1 items-start gap-3">
				<div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
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
				<p className="min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground">
					{model.name}
				</p>
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
						className="[&>span]:font-mono [&>span]:tabular-nums"
						label={`in: €${inEur}`}
					/>
					<MetricCell
						className="[&>span]:font-mono [&>span]:tabular-nums"
						label={`out: €${outEur}`}
					/>
				</MetricsRow>
			</div>
		</Card>
	)
}

function ModelCosmosCardBasic({
	model,
	className,
}: {
	model: ModelRecord
	className?: string
}) {
	return (
		<Card
			className={cn(
				'hover:border-primary/40 hover:shadow-md flex h-cosmos-card-basic min-h-cosmos-card-basic flex-col gap-3 overflow-hidden p-4 transition duration-200 ease-standard',
				className,
			)}
		>
			<div className="flex min-w-0 shrink-0 items-start justify-between gap-3">
				<p className="min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground/75">
					{model.name}
				</p>
				<p className="max-w-40 shrink-0 truncate text-right text-body-sm text-muted-foreground">
					{model.provider}
				</p>
			</div>
			<p className="min-h-0 flex-1 line-clamp-3 text-body-sm text-muted-foreground">
				{model.description}
			</p>
		</Card>
	)
}

export function ModelCosmosCard({
	model,
	className,
	variant = 'full',
}: ModelCosmosCardProps) {
	if (variant === 'basic') {
		return <ModelCosmosCardBasic model={model} className={className} />
	}
	if (variant === 'catalog') {
		return <ModelCosmosCardCatalog model={model} className={className} />
	}
	return <ModelCosmosCardFull model={model} className={className} />
}

/** Phase 1 catalog card: title row + description only. */
export { ModelCosmosCardBasic }
/** Phase 2: full metrics, avatar, and benchmark row. */
export { ModelCosmosCardFull }
/** Catalog tile: avatar, name, modalities vs endpoint, pricing in metric cells. */
export { ModelCosmosCardCatalog }
