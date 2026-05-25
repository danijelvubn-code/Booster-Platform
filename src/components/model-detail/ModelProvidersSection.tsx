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
import { getModelCatalogProviderRows } from '@/data/model-hosting-providers'
import {
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
	const providerRows = getModelCatalogProviderRows(model)

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
						{providerRows.map((row) => (
							<TableRow key={row.id}>
								<TableCell>
									<span className="inline-flex items-center gap-2 text-body-sm-strong text-foreground">
										<span
											className={cn(
												'h-2 w-2 shrink-0 rounded-full bg-success',
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
									€{formatEurPer1MForDisplay(row.inputPer1M)}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									€{formatEurPer1MForDisplay(row.outputPer1M)}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.latencyMs}ms
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums text-body-sm text-foreground">
									{row.tps.toFixed(1)}
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
										{row.certs.join(', ')}
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
