import { Info } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Model } from '@/data/mockData'
import {
	formatEndpointContextWindow,
	formatEndpointEurPer1M,
	formatEndpointMinMemory,
	formatEndpointParameters,
	getEndpointModelCatalogRow,
} from '@/lib/endpoint-model-summary'
import {
	getModelModalityLabel,
	getOverallModelScore,
	overallScoreTextClass,
} from '@/lib/model-metrics'
import { getModelStatusBadgeVariant } from '@/lib/model-lifecycle'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import { cn } from '@/lib/utils'

function ModelSummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-3 px-4 py-3">
			<span className="text-body-sm text-muted-foreground">{label}</span>
			<span className="min-w-0 truncate text-right text-body-sm text-foreground">
				{value}
			</span>
		</div>
	)
}

export function ModelSummarySidebarEmpty({
	onSelectModel,
}: {
	onSelectModel: () => void
}) {
	return (
		<aside className="min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
			<Card className="relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent"
				/>
				<div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
					<p className="max-w-[240px] text-body-sm text-muted-foreground">
						Please select the underlying model that will serve this inference
						endpoint.
					</p>
					<Button
						type="button"
						className="w-full max-w-[240px]"
						onClick={onSelectModel}
					>
						Browse models
					</Button>
				</div>
			</Card>
		</aside>
	)
}

export function ModelSummarySidebar({
	model,
	inputCostPer1M,
	outputCostPer1M,
}: {
	model: Model
	inputCostPer1M: number
	outputCostPer1M: number
}) {
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const capabilityScore = getOverallModelScore(model)
	const parameterLabel = formatEndpointParameters(model)
	const minMemoryLabel = formatEndpointMinMemory(model)
	const modalityLabel = getModelModalityLabel(model)
	const providerInitials = getProviderInitials(model.provider)
	const licenseLabel =
		model.hosting === 'Booster Hosted' ? 'Commercial' : 'Open Source'
	const catalogRow = getEndpointModelCatalogRow(model)

	return (
		<aside className="min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
			<Card className="relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent"
				/>

				<div className="relative space-y-4 border-b border-border p-4">
					<div className="flex items-start gap-3">
						<Avatar className="h-icon-40 w-icon-40 rounded-lg border border-border bg-background">
							{providerLogoSrc ? (
								<AvatarImage src={providerLogoSrc} alt="" />
							) : null}
							<AvatarFallback className="rounded-lg text-body-sm-strong">
								{providerInitials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<h2 className="truncate text-body-sm-strong text-foreground">
								{model.name}
							</h2>
							<p className="text-caption text-muted-foreground">
								{model.provider}
							</p>
						</div>
					</div>

					<p className="text-body-sm text-muted-foreground">
						{model.description}
					</p>

					<div className="flex flex-wrap gap-2">
						<Badge
							variant={getModelStatusBadgeVariant(model.status)}
							appearance="pill"
							size="24"
						>
							{model.status}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{modalityLabel}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{licenseLabel}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{model.hosting}
						</Badge>
					</div>
				</div>

				<div className="relative flex items-center justify-between gap-3 border-b border-border px-4 py-3">
					<div className="flex items-center gap-1">
						<span className="text-body-sm text-muted-foreground">
							Capability score
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="h-icon-16 w-icon-16 cursor-help text-muted-foreground" />
							</TooltipTrigger>
							<TooltipContent className="max-w-page-intro">
								Aggregated score from model capability benchmarks in this
								catalog.
							</TooltipContent>
						</Tooltip>
					</div>
					<span
						className={cn(
							'text-h2 leading-none tabular-nums',
							overallScoreTextClass(capabilityScore),
						)}
					>
						{capabilityScore}
					</span>
				</div>

				<div className="relative divide-y divide-border">
					<ModelSummaryRow label="Parameters" value={parameterLabel} />
					<ModelSummaryRow
						label="Context Window"
						value={formatEndpointContextWindow(model)}
					/>
					<ModelSummaryRow label="Min. Memory" value={minMemoryLabel} />
					<ModelSummaryRow
						label="Input Tokens"
						value={formatEndpointEurPer1M(inputCostPer1M)}
					/>
					<ModelSummaryRow
						label="Output Tokens"
						value={formatEndpointEurPer1M(outputCostPer1M)}
					/>
					<ModelSummaryRow
						label="Tokens per second"
						value={catalogRow.tps.toFixed(1)}
					/>
				</div>
			</Card>
		</aside>
	)
}
