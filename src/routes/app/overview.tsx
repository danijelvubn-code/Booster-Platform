import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { CardGrid } from '@/components/CardGrid'
import { EndpointOverviewCard } from '@/components/EndpointOverviewCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import OnboardingModal from '@/components/OnboardingModal'
import { Button } from '@/components/ui/button'
import { endpoints } from '@/data/mockData'

export const Route = createFileRoute('/app/overview')({
	component: RouteComponent,
})

const overviewEndpoints = [...endpoints]
	.filter((e) => e.id !== 'sp-default')
	.sort((a, b) => b.budgetUsed - a.budgetUsed)
	.slice(0, 4)

/**
 * MVP overview — leaner than post-MVP: no KPI tiles or charts, just the endpoints list.
 */
function RouteComponent() {
	return (
		<>
			<OnboardingModal />
			<PageContainer className="pt-6 pb-6" gap="">
				<section className="flex flex-col gap-3">
					<PageHeader
						titleSize="overview"
						breakAt="md"
						introClassName="max-w-3xl"
						title="Endpoints Above Average Usage"
						description="Endpoints consuming more tokens than their expected monthly average based on their budget."
						actions={
							<Button className="shrink-0" asChild>
								<Link
									to="/app/endpoints/create_endpoint"
									search={{ model: '' }}
								>
									<Plus className="h-icon-16 w-icon-16" aria-hidden />
									Create Endpoint
								</Link>
							</Button>
						}
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
