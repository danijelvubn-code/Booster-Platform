import { createFileRoute } from '@tanstack/react-router'
import { CardGrid } from '@/components/CardGrid'
import { EndpointOverviewCard } from '@/components/EndpointOverviewCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import OnboardingModal from '@/components/OnboardingModal'
import { endpoints } from '@/data/mockData'

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

/**
 * MVP overview — leaner than post-MVP: no KPI tiles or charts, just the endpoints list.
 */
function RouteComponent() {
	const overviewEndpoints = getOverviewEndpoints()

	return (
		<>
			<OnboardingModal />
			<PageContainer className="pt-6 pb-6" gap="gap-8">
				<PageHeader
					title="Overview"
					description="Monitor your endpoints and model inference activity across the platform."
					descriptionMaxWidthPageIntro
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
