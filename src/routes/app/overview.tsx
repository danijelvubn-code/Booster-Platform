import { createFileRoute } from '@tanstack/react-router'
import { TokenUsageSection } from '@/components/account/TokenUsageSection'
import { CardGrid } from '@/components/CardGrid'
import { EndpointOverviewCard } from '@/components/EndpointOverviewCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import OnboardingModal from '@/components/OnboardingModal'
import { endpoints } from '@/data/mockData'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/app/overview')({
	component: RouteComponent,
})

function endpointListSortKey(id: string): number {
	const numeric = Number(id.replace(/^sp-/, ''))
	return Number.isFinite(numeric) ? numeric : 0
}

function getOverviewEndpoints() {
	return [...endpoints]
		.filter((endpoint) => endpoint.id !== 'sp-default')
		.sort(
			(a, b) => endpointListSortKey(b.id) - endpointListSortKey(a.id),
		)
}

function formatMediumDate(isoDate: string): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(`${isoDate}T12:00:00`))
}

/**
 * MVP overview — leaner than post-MVP: no KPI tiles or charts, just the endpoints list.
 */
function RouteComponent() {
	const { user } = useAuth()
	const overviewEndpoints = getOverviewEndpoints()
	const accountStartDate =
		user?.accountStartDate ?? new Date().toISOString().split('T')[0]
	const accountStartLabel = formatMediumDate(accountStartDate)
	const tokenUsage = user?.tokenUsage ?? { inputTokens: 0, outputTokens: 0 }

	return (
		<>
			<OnboardingModal />
			<PageContainer className="pt-6 pb-6" gap="gap-8">
				<PageHeader
					title="Overview"
					description="Monitor your endpoints and model inference activity across the platform."
					descriptionMaxWidthPageIntro
				/>

				<TokenUsageSection
					sinceLabel={accountStartLabel}
					inputTokens={tokenUsage.inputTokens}
					outputTokens={tokenUsage.outputTokens}
				/>

				<section className="flex flex-col gap-3">
					<PageHeader
						titleSize="overview"
						breakAt="md"
						introClassName="max-w-3xl"
						title="Endpoints"
						description="View and manage the stable API endpoints your applications use for model inference."
					/>

					<CardGrid cols={{ xs: 1, md: 2 }}>
						{overviewEndpoints.map((endpoint) => (
							<EndpointOverviewCard
								key={endpoint.id}
								endpoint={endpoint}
								variant="basic"
							/>
						))}
					</CardGrid>
				</section>
			</PageContainer>
		</>
	)
}
