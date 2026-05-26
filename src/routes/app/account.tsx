import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Mail, Zap } from 'lucide-react'
import { TokenUsageSection } from '@/components/account/TokenUsageSection'
import { CardGrid } from '@/components/CardGrid'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/StatCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/app/account')({
	component: RouteComponent,
})

const SUPPORT_EMAIL = 'support@booster.x' //TODO: update with real support email, and maybe move it to ENV

function formatMediumDate(isoDate: string): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(`${isoDate}T12:00:00`))
}

function RouteComponent() {
	const { user } = useAuth()
	const displayName = user?.name ?? 'My Account'
	const accountStartDate =
		user?.accountStartDate ?? new Date().toISOString().split('T')[0]
	const accountStartLabel = formatMediumDate(accountStartDate)
	const plan = user?.plan ?? 'Pay Per Use'
	const tokenUsage = user?.tokenUsage ?? { inputTokens: 0, outputTokens: 0 }

	return (
		<PageContainer className="py-6">
			<div className="flex w-full flex-col gap-8">
				<PageHeader title={displayName} />

				<CardGrid cols={{ xs: 1, sm: 2 }}>
					<StatCard icon={Zap} label="Plan" value={plan} />
					<StatCard
						icon={Calendar}
						label="Account Start"
						value={accountStartLabel}
					/>
				</CardGrid>

				<TokenUsageSection
					sinceLabel={accountStartLabel}
					inputTokens={tokenUsage.inputTokens}
					outputTokens={tokenUsage.outputTokens}
				/>

				<Card className="border-border shadow-xs">
					<CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-start gap-3 sm:items-center">
							<Mail
								className="mt-0.5 h-icon-20 w-icon-20 shrink-0 text-muted-foreground sm:mt-0"
								aria-hidden
							/>
							<div>
								<p className="text-body-sm font-medium text-foreground">
									Need help?
								</p>
								<p className="text-body-sm text-muted-foreground">
									Contact {SUPPORT_EMAIL}
								</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="default"
							className="w-full shrink-0 sm:w-auto"
							asChild
						>
							<a href={`mailto:${SUPPORT_EMAIL}`}>Email Support</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		</PageContainer>
	)
}
