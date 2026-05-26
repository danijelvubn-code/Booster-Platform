import { Check } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Model } from '@/data/mockData'
import {
	formatEndpointContextWindow,
	formatEndpointEurPer1M,
	formatEndpointMinMemory,
	formatEndpointParameters,
	getEndpointModelCatalogRow,
} from '@/lib/endpoint-model-summary'

function ReviewDetailRow({ label, value }: { label: string; value: string }) {
	return (
		<>
			<dt className="text-muted-foreground">{label}</dt>
			<dd className="min-w-0 text-foreground">{value}</dd>
		</>
	)
}

type ReviewStepProps = {
	endpointName: string
	useCase: string
	selectedModel: Model
	inputCostPer1M: number
	outputCostPer1M: number
	setStep: (step: 0 | 1) => void
}

export function ReviewStep({
	endpointName,
	useCase,
	selectedModel,
	inputCostPer1M,
	outputCostPer1M,
	setStep,
}: ReviewStepProps) {
	const catalogRow = getEndpointModelCatalogRow(selectedModel)

	return (
		<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
			<div className="space-y-1">
				<h2 className="text-h3 text-foreground">Review &amp; Deploy</h2>
				<p className="text-body-sm text-muted-foreground">
					Review your configuration before deploying.
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
				<CardHeader className="pb-3">
					<CardTitle className="text-body-sm-strong">
						Deployment provider
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-x-8 gap-y-4 pt-0 text-body-sm md:grid-cols-2">
					<dl className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-baseline gap-x-4 gap-y-2">
						<ReviewDetailRow
							label="Provider"
							value={selectedModel.hosting}
						/>
						<ReviewDetailRow
							label="Parameters"
							value={formatEndpointParameters(selectedModel)}
						/>
						<ReviewDetailRow
							label="Context Window"
							value={formatEndpointContextWindow(selectedModel)}
						/>
						<ReviewDetailRow
							label="Min. Memory"
							value={formatEndpointMinMemory(selectedModel)}
						/>
						<ReviewDetailRow label="Quant" value={catalogRow.quant} />
					</dl>
					<dl className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-baseline gap-x-4 gap-y-2">
						<ReviewDetailRow
							label="Input Tokens"
							value={formatEndpointEurPer1M(inputCostPer1M)}
						/>
						<ReviewDetailRow
							label="Output Tokens"
							value={formatEndpointEurPer1M(outputCostPer1M)}
						/>
						<ReviewDetailRow
							label="Certs"
							value={catalogRow.certs.join(', ')}
						/>
						<ReviewDetailRow
							label="Avg latency"
							value={`${catalogRow.latencyMs}ms`}
						/>
						<ReviewDetailRow
							label="Tokens / second"
							value={catalogRow.tps.toFixed(1)}
						/>
					</dl>
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
