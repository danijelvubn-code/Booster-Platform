import { Check, CheckCircle2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { ProviderOption } from '@/data/mockData'
import { cn } from '@/lib/utils'

type ProviderSort =
	| 'recommended'
	| 'lowest-cost'
	| 'lowest-latency'
	| 'highest-throughput'
	| 'largest-context'

const PROVIDER_SORT_LABELS: Record<ProviderSort, string> = {
	recommended: 'Recommended',
	'lowest-cost': 'Lowest cost',
	'lowest-latency': 'Lowest latency',
	'highest-throughput': 'Highest throughput',
	'largest-context': 'Largest context',
}

function formatEurPer1M(value: number): string {
	return `€${value.toFixed(2)}`
}

type ProviderSelectionStepProps = {
	providerSort: ProviderSort
	setProviderSort: (value: ProviderSort) => void
	selectedProvider: ProviderOption
	selectedProviderId: string
	setSelectedProviderId: (value: string) => void
	sortedProviders: ProviderOption[]
}

export function ProviderSelectionStep({
	providerSort,
	setProviderSort,
	selectedProvider,
	setSelectedProviderId,
	sortedProviders,
}: ProviderSelectionStepProps) {
	return (
		<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div className="space-y-1">
					<h2 className="text-h3 text-foreground">
						Select deployment provider
					</h2>
					<p className="text-body-sm text-muted-foreground">
						Select the provider that best matches your cost, performance,
						context, and compliance requirements.
					</p>
				</div>
				<Select
					value={providerSort}
					onValueChange={(value) => setProviderSort(value as ProviderSort)}
				>
					<SelectTrigger className="w-48">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(PROVIDER_SORT_LABELS).map(([value, label]) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="overflow-x-auto rounded-lg border border-border">
				<Table>
					<TableHeader>
						<TableRow className="h-14 hover:bg-transparent">
							<TableHead className="w-10" />
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
						{sortedProviders
							.filter((provider) => provider.id !== 'model-provider-fallback')
							.map((provider) => {
								const isSelected = selectedProvider.id === provider.id
								return (
									<TableRow
										key={provider.id}
										className={cn(
											'h-14 cursor-pointer',
											isSelected ? 'bg-primary/5' : 'hover:bg-muted/50',
										)}
										onClick={() => setSelectedProviderId(provider.id)}
									>
										<TableCell>
											<span
												className={cn(
													'flex h-icon-16 w-icon-16 items-center justify-center rounded-full border',
													isSelected
														? 'border-primary bg-primary'
														: 'border-border bg-background',
												)}
											>
												{isSelected ? (
													<Check className="h-3 w-3 text-primary-foreground" />
												) : null}
											</span>
										</TableCell>
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
								)
							})}
					</TableBody>
				</Table>
			</div>

			<p className="text-center text-body-sm text-muted-foreground">
				Provider choice affects cost, latency, throughput, and context window.
			</p>
		</div>
	)
}
