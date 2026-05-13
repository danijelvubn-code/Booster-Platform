import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { useId, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/sonner'
import { Switch } from '@/components/ui/switch'
import { deployments, endpoints, models } from '@/data/mockData'

export const Route = createFileRoute('/app/endpoints/$endpointId/deploy')({
	validateSearch: (search: Record<string, unknown>) => ({
		model: (search.model as string) ?? '',
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const confidentialSwitchId = useId()
	const navigate = useNavigate()
	const { endpointId } = Route.useParams()
	const { model: preselectedModelId } = Route.useSearch()

	const endpoint = endpoints.find((e) => e.id === endpointId)
	const model = models.find((m) => m.id === preselectedModelId)
	const selectedModel = model // Use model directly instead of selectedModelId
	const [config, setConfig] = useState({
		confidentialCompute: false,
		version: model?.version || 'latest',
	})

	if (!endpoint) {
		return (
			<div className="container py-8">
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3"
					onClick={() => navigate({ to: '/app/overview' })}
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Endpoints
				</Button>
				<p className="mt-4 text-muted-foreground">Endpoint not found.</p>
			</div>
		)
	}

	if (!model) {
		return (
			<div className="container py-8">
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3"
					onClick={() =>
						navigate({
							to: '/app/endpoints/$endpointId',
							params: { endpointId },
						})
					}
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Endpoint
				</Button>
				<p className="mt-4 text-muted-foreground">
					No model selected. Please select a model from the catalog first.
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
		if (!selectedModel || !endpoint) return

		const regionLabel =
			endpoint.performanceProfile === 'best-effort'
				? 'EU-West'
				: endpoint.performanceProfile === 'premium'
					? 'EU-Central'
					: 'EU-South'

		const newDeployment = {
			id: `dep-${Date.now()}`,
			name: `${selectedModel.name.toLowerCase().replace(/\s+/g, '-')}-${endpoint.name.toLowerCase().replace(/\s+/g, '-')}`,
			model: selectedModel.name,
			version: config.version,
			mode: 'Shared' as const,
			budgetUsed: 0,
			slaStatus: 'OK' as const,
			region: regionLabel,
			confidentialCompute: config.confidentialCompute,
			latencyP50: 0,
			costPer1MTokens: selectedModel.inputCostPer1M,
		}

		if (!deployments[endpointId]) {
			deployments[endpointId] = []
		}
		deployments[endpointId].push(newDeployment)

		// Update endpoint's default deployment if it's the first one
		if (deployments[endpointId].length === 1) {
			endpoint.defaultDeployment = selectedModel.name
		}

		toast.success('Model Deployed', {
			description: `${selectedModel.name} has been deployed to "${endpoint.name}"`,
		})

		navigate({ to: '/app/endpoints/$endpointId', params: { endpointId } })
	}

	// TypeScript assertion: selectedModel is guaranteed to exist after early returns
	if (!selectedModel) return null

	return (
		<div className="container space-y-6 py-8">
			<Button
				variant="ghost"
				size="sm"
				className="-ml-3"
				onClick={() =>
					navigate({ to: '/app/endpoints/$endpointId', params: { endpointId } })
				}
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to Endpoint
			</Button>

			<div>
				<h1 className="text-2xl font-bold">
					Add {selectedModel.name} to Inference Endpoint
				</h1>
				<p className="mt-1 text-body-sm text-muted-foreground">
					{selectedModel.provider} • v{selectedModel.version}
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Endpoint</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div>
							<p className="font-semibold">{endpoint.name}</p>
							<Badge variant="secondary" className="mt-1">
								{endpoint.type}
							</Badge>
						</div>
						<div className="text-sm text-muted-foreground">
							<p>
								<span className="font-medium text-foreground">
									Performance:
								</span>{' '}
								{endpoint.performanceProfile}
							</p>
							<p>
								<span className="font-medium text-foreground">Budget:</span>{' '}
								{endpoint.budgetUsed}% used
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Model</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div>
							<p className="font-semibold">{selectedModel.name}</p>
							<p className="text-sm text-muted-foreground">
								{selectedModel.provider}
							</p>
						</div>
						<div className="text-sm text-muted-foreground">
							<p>
								<span className="font-medium text-foreground">Version:</span>{' '}
								{selectedModel.version}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Deployment Configuration</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor={confidentialSwitchId}>Confidential Compute</Label>
							<p className="text-sm text-muted-foreground">
								Enable additional security and privacy protections for sensitive
								workloads
							</p>
						</div>
						<Switch
							id={confidentialSwitchId}
							checked={config.confidentialCompute}
							onCheckedChange={(checked) =>
								setConfig((prev) => ({ ...prev, confidentialCompute: checked }))
							}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button onClick={handleDeploy} size="lg">
					Add to Endpoint <Check className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
