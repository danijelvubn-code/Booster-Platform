import { Check } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Model, ProviderOption } from '@/data/mockData'

function formatEurPer1M(value: number): string {
	return `€${value.toFixed(2)}`
}

type ReviewStepProps = {
	endpointName: string
	useCase: string
	selectedModel: Model
	selectedProvider: ProviderOption
	estimatedMonthlyCost: string
	setStep: (step: 0 | 1 | 2) => void
}

export function ReviewStep({
	endpointName,
	useCase,
	selectedModel,
	selectedProvider,
	estimatedMonthlyCost,
	setStep,
}: ReviewStepProps) {
	return (
		<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
			<div className="space-y-1">
				<h2 className="text-h3 text-foreground">Review &amp; Deploy</h2>
				<p className="text-body-sm text-muted-foreground">
					Review your configuration before deploying. Default budget and safety
					settings can be changed later.
				</p>
			</div>

			<Card className="bg-muted/20">
				<CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
					<CardTitle className="text-body-sm-strong">Basic</CardTitle>
					<button
						type="button"
						onClick={() => setStep(0)}
						className="text-caption text-primary"
					>
						Edit
					</button>
				</CardHeader>
				<CardContent className="grid gap-2 pt-0 text-body-sm md:grid-cols-[8rem_1fr]">
					<span className="text-muted-foreground">Endpoint name:</span>
					<span className="text-foreground">
						{endpointName || selectedModel.domain}
					</span>
					<span className="text-muted-foreground">Use Case:</span>
					<span className="text-foreground">{useCase || '—'}</span>
				</CardContent>
			</Card>

			<Card className="bg-muted/20">
				<CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
					<CardTitle className="text-body-sm-strong">
						Deployment provider
					</CardTitle>
					<button
						type="button"
						onClick={() => setStep(1)}
						className="text-caption text-primary"
					>
						Edit
					</button>
				</CardHeader>
				<CardContent className="grid gap-3 pt-0 text-body-sm md:grid-cols-2">
					<div className="grid grid-cols-[6rem_1fr] gap-y-1.5">
						<span className="text-muted-foreground">Provider:</span>
						<span className="text-foreground">
							{selectedProvider.provider.replace(' AI', '')}
						</span>
						<span className="text-muted-foreground">Context:</span>
						<span className="text-foreground">{selectedProvider.context}</span>
						<span className="text-muted-foreground">Quant:</span>
						<span className="text-foreground">{selectedProvider.quant}</span>
						<span className="text-muted-foreground">Certs:</span>
						<span className="text-foreground">
							{selectedProvider.certs.join(', ')}
						</span>
					</div>
					<div className="grid grid-cols-[7rem_1fr] gap-y-1.5">
						<span className="text-muted-foreground">Input:</span>
						<span className="text-foreground">
							{formatEurPer1M(selectedProvider.inputPer1M)} / 1M
						</span>
						<span className="text-muted-foreground">Output:</span>
						<span className="text-foreground">
							{formatEurPer1M(selectedProvider.outputPer1M)} / 1M
						</span>
						<span className="text-muted-foreground">Avg latency:</span>
						<span className="text-foreground">
							{selectedProvider.latencyMs}ms
						</span>
						<span className="text-muted-foreground">Tokens / second:</span>
						<span className="text-foreground">
							{selectedProvider.tps.toFixed(1)}
						</span>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-muted/20">
				<CardHeader className="pb-3">
					<CardTitle className="text-body-sm-strong">Budget & Safety</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-3 pt-0 text-body-sm md:grid-cols-2">
					<div className="grid grid-cols-[8rem_1fr] gap-y-1.5">
						<span className="text-muted-foreground">Monthly budget:</span>
						<span className="text-foreground">1,000,000 tokens/mo</span>
						<span className="text-muted-foreground">Est. cost:</span>
						<span className="text-foreground">~€{estimatedMonthlyCost}/mo</span>
					</div>
					<div className="grid grid-cols-[6rem_1fr] gap-y-1.5">
						<span className="text-muted-foreground">Alert:</span>
						<span className="text-foreground">at 80%</span>
						<span className="text-muted-foreground">Hard stop:</span>
						<span className="text-foreground">No</span>
					</div>
				</CardContent>
			</Card>

			<div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3">
				<span className="mt-0.5 flex h-icon-16 w-icon-16 items-center justify-center rounded-full border border-border">
					<Check className="h-3 w-3 text-muted-foreground" />
				</span>
				<p className="text-caption text-muted-foreground">
					Your input data and model responses are never used to train models and
					will not be shared with other users or third parties.
				</p>
			</div>
		</div>
	)
}
