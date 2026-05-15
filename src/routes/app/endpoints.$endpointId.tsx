import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { Box, Copy, Settings } from 'lucide-react'
import { BackButton } from '@/components/BackButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IconBox } from '@/components/ui/icon-box'
import { deployments, endpoints, models, type Model } from '@/data/mockData'
import { formatTokens } from '@/lib/formatters'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import { toastMessages } from '@/lib/toast-messages'

export const Route = createFileRoute('/app/endpoints/$endpointId')({
	component: RouteComponent,
})

function UnderlyingModelSummary({ model }: { model: Model }) {
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const providerInitials = getProviderInitials(model.provider)

	return (
		<div className="flex min-w-0 flex-col gap-2">
			<div className="flex flex-wrap items-center gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
					<Avatar className="!h-8 !w-8 rounded-lg">
						{providerLogoSrc ? (
							<AvatarImage
								src={providerLogoSrc}
								alt=""
								className="!h-8 !w-8 object-contain"
							/>
						) : null}
						<AvatarFallback className="rounded-lg text-label">
							{providerInitials}
						</AvatarFallback>
					</Avatar>
				</div>

				<Link
					to="/app/cosmos/$modelId"
					params={{ modelId: model.id }}
					className="text-[20px] font-bold leading-7 tracking-tight text-foreground transition-colors ease-standard hover:text-primary"
				>
					{model.name}
				</Link>
				<Badge
					variant="muted"
					appearance="pill"
					size="28"
					className="font-normal"
				>
					LLM
				</Badge>
			</div>

			<p className="max-w-[600px] text-body-sm text-hierarchy-muted">
				{model.description}
			</p>
		</div>
	)
}

function RouteComponent() {
	const { endpointId } = Route.useParams()
	const location = useLocation()
	const endpoint = endpoints.find((s) => s.id === endpointId)
	const deploymentList = deployments[endpointId] ?? []

	const defaultDeployment =
		deploymentList.find((d) => d.mode === 'Default') ?? deploymentList[0]
	const underlyingModel =
		models.find(
			(model) =>
				model.name === defaultDeployment?.model &&
				model.version === defaultDeployment?.version,
		) ??
		models.find((model) => model.name === defaultDeployment?.model) ??
		null

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

	if (location.pathname !== `/app/endpoints/${endpointId}`) {
		return <Outlet />
	}

	const handleCopyEndpoint = () => {
		navigator.clipboard
			.writeText(endpoint.endpoint)
			.then(() => toastMessages.copied('Endpoint URL'))
			.catch(() => toastMessages.error('Could not copy endpoint URL.'))
	}

	return (
		<div className="container space-y-4 py-6">
				<BackButton
					to="/app/overview"
					label="Back to Overview"
					className="ml-0"
				/>

				<div className="relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 shadow-sm">
					<div
						className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90"
						aria-hidden
					/>

					<div className="relative space-y-6">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<div className="flex flex-wrap items-center gap-2">
									<IconBox size="xxxlg" shape="square" className="bg-primary/10">
										<Box className="text-primary" aria-hidden />
									</IconBox>
									<h1 className="text-3xl font-bold tracking-tight text-foreground">
										{endpoint.name}
									</h1>
								</div>
								<div className="flex min-w-0 items-center gap-2 text-hierarchy-secondary">
									<p className="min-w-0 break-all font-mono text-body-sm">
										{endpoint.endpoint}
									</p>
									<Button
										variant="ghost"
										size="icon-sm"
										className="h-7 w-7 shrink-0 text-hierarchy-secondary hover:text-foreground"
										aria-label="Copy endpoint URL"
										onClick={handleCopyEndpoint}
									>
										<Copy className="h-4 w-4" aria-hidden />
									</Button>
								</div>
								{endpoint.description ? (
									<p className="max-w-3xl text-body text-hierarchy-secondary">
										{endpoint.description}
									</p>
								) : null}
							</div>
							<div className="shrink-0">
								<Button asChild variant="outline">
									<Link
										to="/app/endpoints/$endpointId/settings"
										params={{ endpointId: endpoint.id }}
									>
										<Settings
											className="mr-2 h-icon-16 w-icon-16"
											aria-hidden
										/>
										Settings
									</Link>
								</Button>
							</div>
						</div>

						{underlyingModel ? (
							<>
								<div className="h-px bg-border/80" aria-hidden />
								<UnderlyingModelSummary model={underlyingModel} />
							</>
						) : null}
					</div>
				</div>

				<div className="grid gap-5 md:grid-cols-2">
					<Card className="border border-border shadow-xs">
						<CardContent className="p-6">
							<div className="flex min-w-0 flex-col gap-2">
								<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<p className="text-h1 font-bold tabular-nums text-foreground">
										{formatTokens(endpoint.inputTokens)}
									</p>
									<p className="text-caption font-medium text-muted-foreground">
										INPUT TOKENS
									</p>
								</div>
								<p className="text-body-sm text-hierarchy-secondary">
									Tokens sent to the model
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className="border border-border shadow-xs">
						<CardContent className="p-6">
							<div className="flex min-w-0 flex-col gap-2">
								<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<p className="text-h1 font-bold tabular-nums text-foreground">
										{formatTokens(endpoint.outputTokens)}
									</p>
									<p className="text-caption font-medium text-muted-foreground">
										OUTPUT TOKENS
									</p>
								</div>
								<p className="text-body-sm text-hierarchy-secondary">
									Tokens generated by the model
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

		</div>
	)
}
