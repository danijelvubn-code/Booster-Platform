import { Link } from '@tanstack/react-router'
import { Check, ExternalLink, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { ScoredModel, WizardState } from '@/lib/model-scoring'
import { cn } from '@/lib/utils'

interface WizardStepResultsProps {
	state: WizardState
	results: ScoredModel[]
}

export function WizardStepResults({ state, results }: WizardStepResultsProps) {
	return (
		<>
			<div>
				<h2 className="text-lg font-semibold">
					Recommended Models for Your Use Case
				</h2>
				<p className="text-sm text-muted-foreground">
					Based on your inputs, here are the best-fit models ranked by
					suitability.
				</p>
			</div>
			<div className="flex flex-wrap gap-2">
				{state.useCase && <Badge variant="secondary">{state.useCase}</Badge>}
				{state.objective && <Badge variant="outline">{state.objective}</Badge>}
			</div>
			<div className="space-y-4">
				{results.map(({ model: m, score, highlights, tags }, idx) => {
					const avgCost = ((m.inputCostPer1M + m.outputCostPer1M) / 2).toFixed(
						2,
					)
					return (
						<Card
							key={m.id}
							className={cn(
								'transition-all',
								idx === 0 && 'border-primary/40 shadow-sm',
							)}
						>
							<CardContent className="p-4 space-y-3">
								<div className="flex items-start justify-between">
									<div>
										<div className="flex items-center gap-2">
											{idx === 0 && (
												<Badge className="bg-primary text-primary-foreground text-[10px]">
													Best Match
												</Badge>
											)}
											<h3 className="font-semibold">{m.name}</h3>
											<span className="text-xs text-muted-foreground">
												{m.provider}
											</span>
										</div>
										<p className="text-xs text-muted-foreground mt-0.5">
											{m.description.split('.')[0]}
										</p>
									</div>
									<div className="text-right">
										<span className="text-2xl font-bold text-primary">
											{score}%
										</span>
										<p className="text-[10px] text-muted-foreground">Match</p>
									</div>
								</div>
								{highlights.length > 0 && (
									<div className="space-y-1">
										<p className="text-xs font-medium text-muted-foreground">
											Key Highlights
										</p>
										<ul className="space-y-0.5">
											{highlights.map((h) => (
												<li
													key={h}
													className="flex items-center gap-1.5 text-xs"
												>
													<Check className="h-3 w-3 text-success shrink-0" />
													{h}
												</li>
											))}
										</ul>
									</div>
								)}
								<div className="grid grid-cols-2 gap-3">
									<div className="bg-muted/50 rounded-md p-2">
										<p className="text-[10px] text-muted-foreground">
											Est. P95 Latency
										</p>
										<p className="text-sm font-semibold">
											~{Math.round((1000 / m.tokensPerSecond) * 100)}ms
										</p>
									</div>
									<div className="bg-muted/50 rounded-md p-2">
										<p className="text-[10px] text-muted-foreground">
											Cost per 1M tokens
										</p>
										<p className="text-sm font-semibold">
											€{parseFloat(avgCost).toFixed(2)}
										</p>
									</div>
								</div>
								{tags.length > 0 && (
									<div className="flex gap-1.5 flex-wrap">
										{tags.map((tag) => (
											<Badge
												key={tag}
												variant="outline"
												className="text-[10px]"
											>
												{tag}
											</Badge>
										))}
										<Badge variant="warning" className="text-[10px]">
											{m.hosting}
										</Badge>
									</div>
								)}
								<div className="flex gap-2 pt-1">
									<Link
										to="/app/cosmos/$modelId"
										params={{ modelId: m.id }}
										search={{
											returnTo: '/app/cosmos/guided',
											returnLabel: 'Guided recommendations',
										}}
									>
										<Button variant="outline" size="sm">
											<ExternalLink className="h-3.5 w-3.5 mr-1" /> View Details
										</Button>
									</Link>
									<Link to="/app/deploy" search={{ model: m.id }}>
										<Button size="sm">
											<Plus className="h-3.5 w-3.5 mr-1" /> Deploy
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</>
	)
}
