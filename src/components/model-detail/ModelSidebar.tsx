import { Link } from '@tanstack/react-router'
import { ModelLifecycleAlert } from '@/components/model-detail/ModelLifecycleAlert'
import { StatDisplay } from '@/components/StatDisplay'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	getOverallModelScore,
	getModelParameterSizeLabel,
	type ModelRecord,
	modelHasVisionCapability,
	overallScoreTextClass,
} from '@/lib/model-metrics'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import {
	canCreateInferenceEndpoint,
	getModelStatusBadgeVariant,
} from '@/lib/model-lifecycle'
import { cn } from '@/lib/utils'

interface ModelSidebarProps {
	model: ModelRecord
}

export function ModelSidebar({ model }: ModelSidebarProps) {
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const qualityScore = getOverallModelScore(model)
	const paramLabel = getModelParameterSizeLabel(model)
	const isMultimodal = modelHasVisionCapability(model)

	const heroTags = [
		paramLabel,
		isMultimodal ? 'MULTIMODAL' : 'TEXT',
		'API',
		model.hosting === 'Booster Powered'
			? 'MANAGED'
			: (model.hosting as string | undefined)?.toUpperCase(),
	].filter((t): t is string => Boolean(t))

	const statusBadge = (
		<Badge
			variant={getModelStatusBadgeVariant(model.status)}
			size="20"
			className="font-normal"
		>
			{model.status}
		</Badge>
	)
	const deployAllowed = canCreateInferenceEndpoint(model)

	return (
		<aside className="lg:sticky lg:top-4 lg:z-10 lg:self-start">
			<Card className="flex flex-col overflow-hidden p-0">
				<div
					className={cn(
						'flex items-center gap-3 border-b border-border px-4 py-4',
						qualityScore > 0 ? 'bg-success/7' : 'bg-muted',
					)}
				>
					<div className="bg-card relative h-icon-40 w-icon-40 shrink-0 overflow-hidden rounded-md">
						<Avatar className="h-full w-full rounded-md">
							{providerLogoSrc ? (
								<AvatarImage
									src={providerLogoSrc}
									alt=""
									className="h-full w-full object-contain"
								/>
							) : null}
							<AvatarFallback className="rounded-md text-caption-strong">
								{getProviderInitials(model.provider)}
							</AvatarFallback>
						</Avatar>
					</div>
					<h1 className="text-h3 min-w-0 flex-1 truncate text-foreground">
						{model.name}
					</h1>
					{qualityScore > 0 ? (
						<span
							className={cn(
								'text-h2 shrink-0 tabular-nums',
								overallScoreTextClass(qualityScore),
							)}
						>
							{qualityScore}
						</span>
					) : null}
				</div>

				<div className="space-y-5 border-b border-border p-4">
					<p className="text-body-sm text-muted-foreground">
						{model.description}
					</p>
					{heroTags.length > 0 ? (
						<div className="flex flex-wrap items-center gap-2">
							{heroTags.map((tag) => (
								<Badge
									key={tag}
									variant="outline"
									appearance="ghost"
									size="28"
									className="font-normal"
								>
									{tag}
								</Badge>
							))}
						</div>
					) : null}
				</div>

				<div className="divide-y divide-border">
					<StatDisplay
						variant="horizontal"
						label="Status"
						value={statusBadge}
					/>
					<StatDisplay
						variant="horizontal"
						label="Version"
						value={`v${model.version}`}
					/>
					<StatDisplay
						variant="horizontal"
						label="Domain"
						value={model.domain}
					/>
				</div>

				{model.strengths.length > 0 ? (
					<div className="space-y-2 border-t border-border p-4">
						<p className="text-caption text-muted-foreground tracking-wider uppercase">
							Best used for
						</p>
						<ul className="text-body-sm space-y-1.5 pl-5 text-foreground [list-style:disc]">
							{model.strengths.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</div>
				) : null}

				<div className="space-y-3 border-t border-border p-3">
					<ModelLifecycleAlert model={model} />
					{deployAllowed ? (
						<Button asChild variant="default" size="default" className="w-full">
							<Link
								to="/app/endpoints/deploy_endpoint"
								search={{ model: model.id }}
							>
								Add to Endpoint
							</Link>
						</Button>
					) : (
						<Button
							type="button"
							variant="default"
							size="default"
							className="w-full"
							disabled
						>
							Add to Endpoint
						</Button>
					)}
				</div>
			</Card>
		</aside>
	)
}
