import { createFileRoute, Link } from '@tanstack/react-router'
import { Key, Pencil } from 'lucide-react'
import { useState } from 'react'
import { ApiKeysDialog } from '@/components/ApiKeysDialog'
import { BackButton } from '@/components/BackButton'
import { StatDisplay } from '@/components/StatDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { deployments, endpoints } from '@/data/mockData'
import { formatTokens } from '@/lib/formatters'

export const Route = createFileRoute('/app/endpoints/$endpointId')({
	component: RouteComponent,
})

function RouteComponent() {
	const { endpointId } = Route.useParams()
	const endpoint = endpoints.find((s) => s.id === endpointId)
	const deploymentList = deployments[endpointId] ?? []
	const [showApiKeys, setShowApiKeys] = useState(false)

	const defaultDeployment =
		deploymentList.find((d) => d.mode === 'Default') ?? deploymentList[0]
	const deploymentName =
		defaultDeployment?.name ?? endpoint?.defaultDeployment ?? '—'
	const modelLabel =
		defaultDeployment !== undefined
			? `${defaultDeployment.model} ${defaultDeployment.version}`
			: '—'

	if (!endpoint) {
		return (
			<div className="container py-8">
				<p className="text-body text-muted-foreground">
					Inference Endpoint not found.
				</p>
				<Button asChild variant="ghost" className="mt-4">
					<Link to="/app/overview">← Back to Inference Endpoints</Link>
				</Button>
			</div>
		)
	}

	return (
		<div className="container space-y-8 py-8">
			<BackButton to="/app/overview" label="Inference Endpoints" />

			<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div className="min-w-0 flex-1 space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<h1 className="text-3xl font-bold tracking-tight text-foreground">
							{endpoint.name}
						</h1>
						<Button
							variant="ghost"
							size="icon-sm"
							className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
							aria-label="Edit inference endpoint"
						>
							<Pencil className="h-4 w-4" aria-hidden />
						</Button>
					</div>
					<p className="break-all font-mono text-body-sm text-muted-foreground">
						{endpoint.endpoint}
					</p>
					{endpoint.description ? (
						<p className="max-w-3xl text-body text-muted-foreground">
							{endpoint.description}
						</p>
					) : null}
				</div>
				<div className="shrink-0">
					<Button
						type="button"
						variant="outline"
						onClick={() => setShowApiKeys(true)}
					>
						<Key className="mr-2 h-icon-16 w-icon-16" aria-hidden />
						API Keys
					</Button>
				</div>
			</div>

			<Card className="border border-border shadow-xs">
				<CardHeader className="pb-2">
					<CardTitle className="text-h3">Model</CardTitle>
				</CardHeader>
				<CardContent className="pb-6 pt-2">
					<div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
						<StatDisplay label="Name" value={deploymentName} />
						<StatDisplay label="Model" value={modelLabel} />
						<StatDisplay
							label="Token In"
							value={formatTokens(endpoint.inputTokens)}
						/>
						<StatDisplay
							label="Token Out"
							value={formatTokens(endpoint.outputTokens)}
						/>
					</div>
				</CardContent>
			</Card>

			<ApiKeysDialog
				open={showApiKeys}
				onOpenChange={setShowApiKeys}
				spaceName={endpoint.name}
				spaceId={endpoint.id}
			/>
		</div>
	)
}
