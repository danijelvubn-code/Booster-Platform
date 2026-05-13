import { createFileRoute, Link } from '@tanstack/react-router'
import { ModelBenchmarksSection } from '@/components/model-detail/ModelBenchmarksSection'
import { ModelCapabilitiesSection } from '@/components/model-detail/ModelCapabilitiesSection'
import { ModelProvidersSection } from '@/components/model-detail/ModelProvidersSection'
import { ModelSidebar } from '@/components/model-detail/ModelSidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { models } from '@/data/mockData'

export const Route = createFileRoute('/app/cosmos_/$modelId')({
	component: RouteComponent,
})

function RouteComponent() {
	const { modelId } = Route.useParams()
	const model = models.find((m) => m.id === modelId)

	if (!model) {
		return (
			<div className="container py-8">
				<p className="text-body-sm text-muted-foreground">Model not found.</p>
				<Button asChild variant="ghost" className="mt-4">
					<Link to="/app/cosmos" search={{ hosting: '' }}>
						All models
					</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="container space-y-6 py-8">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/app/cosmos" search={{ hosting: '' }}>
								Model Cosmos
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{model.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-[17.5rem_1fr] lg:items-start">
				<ModelSidebar model={model} />

				<Card className="min-w-0 space-y-12 p-6">
					<ModelCapabilitiesSection model={model} />
					<ModelProvidersSection model={model} />
					<ModelBenchmarksSection model={model} />
				</Card>
			</div>
		</div>
	)
}
