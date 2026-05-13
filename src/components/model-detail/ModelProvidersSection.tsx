import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	formatContextWindowShort,
	formatEurPer1MForDisplay,
	type ModelRecord,
} from '@/lib/model-metrics'
import { cn } from '@/lib/utils'

function SectionHeader({ title }: { title: string }) {
	return (
		<div className="space-y-1">
			<h2 className="text-body-strong text-foreground">{title}</h2>
		</div>
	)
}

interface ModelProvidersSectionProps {
	model: ModelRecord
}

export function ModelProvidersSection({ model }: ModelProvidersSectionProps) {
	const ctxShort = formatContextWindowShort(model.contextLength)
	const inPer1m = formatEurPer1MForDisplay(model.inputCostPer1M)
	const outPer1m = formatEurPer1MForDisplay(model.outputCostPer1M)

	const providerRows = [
		{
			provider: model.provider,
			status: model.status === 'Deprecated' ? 'Inactive' : 'Active',
			context: ctxShort,
			inputPer1M: `€${inPer1m}`,
			outputPer1M: `€${outPer1m}`,
			avgLatency: '620ms',
			tps: model.tokensPerSecond.toFixed(1),
			quant: 'FP16',
			cert: 'GDPR',
		},
		{
			provider: 'Scaleway',
			status: 'Active',
			context: '128K',
			inputPer1M: '€2.80',
			outputPer1M: '€8.40',
			avgLatency: '640ms',
			tps: '26.5',
			quant: 'INT8',
			cert: 'GDPR',
		},
		{
			provider: 'Nebius',
			status: 'Active',
			context: '128K',
			inputPer1M: '€3.10',
			outputPer1M: '€9.20',
			avgLatency: '590ms',
			tps: '29.4',
			quant: 'FP16',
			cert: 'GDPR',
		},
		{
			provider: 'Fireworks',
			status: 'Active',
			context: '128K',
			inputPer1M: '€2.95',
			outputPer1M: '€8.95',
			avgLatency: '610ms',
			tps: '27.8',
			quant: 'Q8',
			cert: 'GDPR',
		},
	] as const

	return (
		<section className="space-y-3">
			<SectionHeader title="Providers" />
			<Card className="overflow-hidden p-0">
				<Table size="md">
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="text-caption-strong text-muted-foreground">
								Provider
							</TableHead>
							<TableHead className="text-caption-strong text-muted-foreground">
								Context
							</TableHead>
							<TableHead className="text-right text-caption-strong text-muted-foreground">
								Input / 1M
							</TableHead>
							<TableHead className="text-right text-caption-strong text-muted-foreground">
								Output / 1M
							</TableHead>
							<TableHead className="text-right text-caption-strong text-muted-foreground">
								Avg latency
							</TableHead>
							<TableHead className="text-right text-caption-strong text-muted-foreground">
								TPS
							</TableHead>
							<TableHead className="text-center text-caption-strong text-muted-foreground">
								Quant
							</TableHead>
							<TableHead className="text-center text-caption-strong text-muted-foreground">
								Certs
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{providerRows.map((row, index) => (
							<TableRow key={`${row.provider}-${index}`}>
								<TableCell>
									<span className="inline-flex items-center gap-2 text-body-sm-strong text-foreground">
										<span
											className={cn(
												'h-2 w-2 shrink-0 rounded-full',
												row.status === 'Active'
													? 'bg-success'
													: 'bg-muted-foreground',
											)}
											aria-hidden
										/>
										{row.provider}
									</span>
								</TableCell>
								<TableCell className="font-mono tabular-nums text-body-sm text-foreground">
									{row.context}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.inputPer1M}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.outputPer1M}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.avgLatency}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.tps}
								</TableCell>
								<TableCell className="text-center text-caption text-muted-foreground">
									{row.quant}
								</TableCell>
								<TableCell className="text-center">
									<Badge
										variant="success"
										appearance="ghost"
										size="24"
										className="font-normal"
										leadingIcon={<CheckCircle2 aria-hidden />}
									>
										{row.cert}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</section>
	)
}
