import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Check, Copy, RefreshCw, Settings } from 'lucide-react'
import { BackButton } from '@/components/BackButton'
import { EndpointRequestLogsSection } from '@/components/endpoint/EndpointRequestLogsSection'
import { PageContainer } from '@/components/layout/PageContainer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IconBox } from '@/components/ui/icon-box'
import {
	deployments,
	endpoints,
	type Model,
	models,
} from '@/data/mockData'
import { formatTokens } from '@/lib/formatters'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import { EndpointStatusBadge } from '@/components/endpoint/EndpointStatusBadge'
import { resolveEndpointStatus } from '@/lib/endpoint-status'
import { toastMessages } from '@/lib/toast-messages'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/endpoints/$endpointId')({
	validateSearch: (search: Record<string, unknown>) => ({
		returnTo:
			typeof search.returnTo === 'string' && search.returnTo.startsWith('/app/')
				? search.returnTo
				: '/app/overview',
		returnLabel:
			typeof search.returnLabel === 'string' && search.returnLabel.trim()
				? search.returnLabel.trim()
				: 'Endpoints',
	}),
	component: RouteComponent,
})

function UnderlyingModelSummary({
	model,
	endpointId,
	endpointName,
}: {
	model: Model
	endpointId: string
	endpointName: string
}) {
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
					search={{
						returnTo: `/app/endpoints/${endpointId}`,
						returnLabel: endpointName,
					}}
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
	const { returnTo, returnLabel } = Route.useSearch()
	const location = useLocation()
	const endpoint = endpoints.find((s) => s.id === endpointId)
	const deploymentList = deployments[endpointId] ?? []

	const [endpointUrlCopied, setEndpointUrlCopied] = useState(false)
	const copyResetTimerRef = useRef<number | null>(null)

	useEffect(() => {
		return () => {
			if (copyResetTimerRef.current !== null) {
				window.clearTimeout(copyResetTimerRef.current)
			}
		}
	}, [])

	useEffect(() => {
		setEndpointUrlCopied(false)
	}, [endpointId])

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
			<PageContainer gap="gap-4" className="py-8">
				<p className="text-body text-muted-foreground">
					Inference Endpoint not found.
				</p>
				<Button asChild variant="ghost" className="mt-4">
					<Link to="/app/overview">← Back to Inference Endpoints</Link>
				</Button>
			</PageContainer>
		)
	}

	if (location.pathname !== `/app/endpoints/${endpointId}`) {
		return <Outlet />
	}

	const handleCopyEndpoint = () => {
		navigator.clipboard
			.writeText(endpoint.endpoint)
			.then(() => {
				toastMessages.copied('Endpoint URL')
				setEndpointUrlCopied(true)
				if (copyResetTimerRef.current !== null) {
					window.clearTimeout(copyResetTimerRef.current)
				}
				copyResetTimerRef.current = window.setTimeout(() => {
					setEndpointUrlCopied(false)
					copyResetTimerRef.current = null
				}, 2000) as unknown as number
			})
			.catch(() => toastMessages.error('Could not copy endpoint URL.'))
	}

	return (
		<PageContainer gap="space-y-4" className="py-6">
			<BackButton
				to={returnTo}
				label={`Back to ${returnLabel}`}
			/>

			<div className="border-primary-fade-shell shadow-sm">
				<div className="relative overflow-hidden rounded-lg bg-card p-6">
					<div
						className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90"
						aria-hidden
					/>

					<div className="relative space-y-6">
						<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<div className="flex flex-wrap items-center gap-2">
									<IconBox size="xxxlg" shape="square" className="bg-primary/10">
										<RefreshCw className="text-primary" aria-hidden />
									</IconBox>
									<h1 className="text-3xl font-bold tracking-tight text-foreground">
										{endpoint.name}
									</h1>
									<EndpointStatusBadge
										status={resolveEndpointStatus(endpoint)}
									/>
								</div>
								<div className="flex min-w-0 items-center gap-2 text-hierarchy-secondary">
									<p className="min-w-0 break-all font-mono text-body-sm">
										{endpoint.endpoint}
									</p>
									<Button
										variant="ghost"
										size="icon-sm"
										className={cn(
											'h-7 w-7 shrink-0 text-hierarchy-secondary hover:text-foreground',
											endpointUrlCopied &&
												'text-success hover:bg-transparent hover:text-success',
										)}
										aria-label={
											endpointUrlCopied
												? 'Endpoint URL copied'
												: 'Copy endpoint URL'
										}
										onClick={handleCopyEndpoint}
									>
										{endpointUrlCopied ? (
											<Check className="h-4 w-4" aria-hidden />
										) : (
											<Copy className="h-4 w-4" aria-hidden />
										)}
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
									search={{ returnTo, returnLabel }}
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
								<UnderlyingModelSummary
									model={underlyingModel}
									endpointId={endpoint.id}
									endpointName={endpoint.name}
								/>
							</>
						) : null}
					</div>
				</div>
			</div>

			<div className="grid gap-5 md:grid-cols-2">
					<Card className="border-0 shadow-sm">
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

					<Card className="border-0 shadow-sm">
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

			<EndpointRequestLogsSection endpointId={endpoint.id} />
		</PageContainer>
	)
}
