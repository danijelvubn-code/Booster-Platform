import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Plus, Rocket } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { endpoints, models } from '@/data/mockData'

export const Route = createFileRoute('/app/deploy')({
	validateSearch: (search: Record<string, unknown>) => ({
		model: (search.model as string) ?? '',
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { model: modelId } = Route.useSearch()
	const model = models.find((m) => m.id === modelId)
	const [selectedEndpointId, setSelectedEndpointId] = useState<string>('')

	if (!model) {
		return (
			<div className="container py-8">
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3"
					onClick={() =>
						navigate({ to: '/app/cosmos', search: { hosting: '' } })
					}
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Model Catalog
				</Button>
				<p className="mt-4 text-muted-foreground">
					Model not found. Please select a model from the catalog.
				</p>
				<Button
					variant="link"
					onClick={() =>
						navigate({ to: '/app/cosmos', search: { hosting: '' } })
					}
				>
					Go to Model Catalog
				</Button>
			</div>
		)
	}

	const handleDeploy = () => {
		if (selectedEndpointId) {
			navigate({
				to: '/app/endpoints/$endpointId/deploy',
				params: { endpointId: selectedEndpointId },
				search: { model: modelId },
			})
		}
	}

	return (
		<div className="container space-y-6 py-8">
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3"
				onClick={() =>
					navigate({
						to: '/app/cosmos/$modelId',
						params: { modelId },
						search: { hosting: '' },
					})
				}
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to Model
			</Button>

			<div>
				<h1 className="text-2xl font-bold">Deploy {model.name}</h1>
				<p className="mt-1 text-body-sm text-muted-foreground">
					Select an endpoint to deploy this model to, or create a new one.
				</p>
			</div>

			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Your Endpoints</h2>
				<Link to="/app/endpoints/create_endpoint" search={{ model: '' }}>
					<Button variant="outline" size="sm">
						<Plus className="mr-1 h-4 w-4" /> Create New Endpoint
					</Button>
				</Link>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{endpoints.length === 0 ? (
					<Card className="col-span-full">
						<CardContent className="p-8 text-center">
							<p className="text-muted-foreground">
								No endpoints available. Create your first endpoint to deploy
								models.
							</p>
							<Link to="/app/endpoints/create_endpoint" search={{ model: '' }}>
								<Button className="mt-4">
									<Plus className="mr-1 h-4 w-4" /> Create Endpoint
								</Button>
							</Link>
						</CardContent>
					</Card>
				) : (
					endpoints.map((endpoint) => (
						<Card
							key={endpoint.id}
							className={`cursor-pointer transition-colors hover:border-primary ${selectedEndpointId === endpoint.id ? 'border-primary bg-primary/5' : ''}`}
							onClick={() => setSelectedEndpointId(endpoint.id)}
						>
							<CardContent className="space-y-3 p-4">
								<div className="flex items-start justify-between">
									<h3 className="font-semibold">{endpoint.name}</h3>
									<Badge variant="secondary" className="text-xs">
										{endpoint.type}
									</Badge>
								</div>
								<div className="space-y-1 text-sm text-muted-foreground">
									<p>
										<span className="font-medium text-foreground">
											Default:
										</span>{' '}
										{endpoint.defaultDeployment}
									</p>
									<p>
										<span className="font-medium text-foreground">Health:</span>{' '}
										{endpoint.health}
									</p>
									<p>
										<span className="font-medium text-foreground">Budget:</span>{' '}
										{endpoint.budgetUsed}%
									</p>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>

			{selectedEndpointId && (
				<div className="flex justify-end">
					<Button onClick={handleDeploy} size="lg">
						<Rocket className="mr-2 h-4 w-4" /> Deploy to Selected Endpoint
					</Button>
				</div>
			)}
		</div>
	)
}
