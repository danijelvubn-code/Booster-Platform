import { LogIn, LogOut } from 'lucide-react'
import { CardGrid } from '@/components/CardGrid'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/StatCard'
import { formatCompactTokens } from '@/lib/formatters'

export function TokenUsageSection({
	sinceLabel,
	inputTokens,
	outputTokens,
}: {
	sinceLabel: string
	inputTokens: number
	outputTokens: number
}) {
	return (
		<section className="flex flex-col gap-3">
			<PageHeader
				titleSize="overview"
				breakAt="md"
				introClassName="max-w-3xl"
				title="Token Usage"
				description={`Total consumption since ${sinceLabel}`}
			/>
			<CardGrid cols={{ xs: 1, sm: 2 }}>
				<StatCard
					icon={LogIn}
					label="Input Tokens"
					value={formatCompactTokens(inputTokens)}
					bgColor="bg-info/12"
					textColor="text-info"
					className="border-0 shadow-sm"
				/>
				<StatCard
					icon={LogOut}
					label="Output Tokens"
					value={formatCompactTokens(outputTokens)}
					bgColor="bg-success/12"
					textColor="text-success"
					className="border-0 shadow-sm"
				/>
			</CardGrid>
		</section>
	)
}
