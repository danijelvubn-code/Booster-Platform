import { Link } from '@tanstack/react-router'
import { Link2, MoreHorizontal, RefreshCw, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconBox } from '@/components/ui/icon-box'
import { EndpointStatusBadge } from '@/components/endpoint/EndpointStatusBadge'
import { Progress } from '@/components/ui/progress'
import type { endpoints } from '@/data/mockData'
import {
	resolveEndpointStatus,
} from '@/lib/endpoint-status'
import { cn } from '@/lib/utils'

export type EndpointOverviewRecord = (typeof endpoints)[number]

export type EndpointOverviewCardVariant = 'full' | 'basic'

const endpointCardSurfaceClass =
	'border border-transparent shadow-sm hover:border-primary/40 hover:shadow-md transition duration-200 ease-standard'

const endpointTypeBadgeProps = (type: string) => {
	if (type === 'Production')
		return { variant: 'success' as const, appearance: 'ghost' as const }
	if (type === 'POC')
		return { variant: 'warning' as const, appearance: 'ghost' as const }
	return { variant: 'secondary' as const, appearance: 'ghost' as const }
}

function EndpointIcon({ className }: { className?: string }) {
	return (
		<IconBox
			size="xlg"
			shape="square"
			className={cn('shrink-0 bg-primary/4', className)}
		>
			<RefreshCw className="text-primary" aria-hidden />
		</IconBox>
	)
}

type EndpointOverviewCardProps = {
	endpoint: EndpointOverviewRecord
	className?: string
	/** `basic`: icon, name, URL, model line (phase 1). `full`: badges, tokens, budget bar (phase 2). */
	variant?: EndpointOverviewCardVariant
	onDelete?: (id: string) => void
}

function EndpointOverviewCardBasic({
	endpoint,
	className,
}: {
	endpoint: EndpointOverviewRecord
	className?: string
}) {
	return (
		<Card
			className={cn(
				endpointCardSurfaceClass,
				'bg-card',
				className,
			)}
		>
			<CardContent className="p-4">
				<Link
					to="/app/endpoints/$endpointId"
					params={{ endpointId: endpoint.id }}
					search={{ returnTo: '/app/overview', returnLabel: 'Endpoints' }}
					className="flex flex-col gap-3 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
				>
					<div className="flex min-w-0 items-center gap-2">
						<EndpointIcon />
						<span className="min-w-0 flex-1 truncate text-body-strong text-foreground">
							{endpoint.name}
						</span>
						<EndpointStatusBadge
							status={resolveEndpointStatus(endpoint)}
							size="24"
						/>
					</div>
					<div className="flex min-w-0 items-center gap-1">
						<Link2
							className="h-icon-16 w-icon-16 shrink-0 text-muted-foreground"
							aria-hidden
						/>
						<p className="min-w-0 truncate text-body-sm text-muted-foreground">
							{endpoint.endpoint}
						</p>
					</div>
					<p className="text-body-sm">
						<span className="text-muted-foreground">Model:</span>{' '}
						<span
							className={
								endpoint.defaultDeployment
									? 'text-foreground/75'
									: 'text-muted-foreground'
							}
						>
							{endpoint.defaultDeployment || '—'}
						</span>
					</p>
				</Link>
			</CardContent>
		</Card>
	)
}

function EndpointOverviewCardFull({
	endpoint,
	className,
	onDelete,
}: {
	endpoint: EndpointOverviewRecord
	className?: string
	onDelete?: (id: string) => void
}) {
	const typeProps = endpointTypeBadgeProps(endpoint.type)
	const progressValue = Math.min(endpoint.budgetUsed, 100)
	const overBudget = endpoint.budgetUsed > 100

	return (
		<Card
			className={cn(
				endpointCardSurfaceClass,
				'bg-card',
				className,
			)}
		>
			<CardContent className="flex flex-col gap-4 p-4">
				<div className="flex gap-2">
					<Link
						to="/app/endpoints/$endpointId"
						params={{ endpointId: endpoint.id }}
						search={{ returnTo: '/app/overview', returnLabel: 'Endpoints' }}
						className="flex min-w-0 flex-1 flex-col gap-4 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
					>
						<div className="space-y-3">
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-body-strong text-foreground">
									{endpoint.name}
								</span>
								<EndpointStatusBadge
									status={resolveEndpointStatus(endpoint)}
									size="24"
								/>
								<Badge
									variant={typeProps.variant}
									appearance={typeProps.appearance}
									size="24"
									className="rounded-md border-0"
								>
									{endpoint.type}
								</Badge>
							</div>
							<div className="flex min-w-0 items-start gap-1">
								<Link2
									className="mt-0.5 h-icon-16 w-icon-16 shrink-0 text-muted-foreground"
									aria-hidden
								/>
								<p className="truncate text-body-sm text-muted-foreground">
									{endpoint.endpoint}
								</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							<Badge
								variant="secondary"
								appearance="ghost"
								size="24"
								className="rounded-md"
							>
								{endpoint.defaultDeployment}
							</Badge>
							<Badge
								variant="secondary"
								appearance="ghost"
								size="24"
								className="rounded-md"
							>
								In: {endpoint.inputTokens.toLocaleString()}
							</Badge>
							<Badge
								variant="secondary"
								appearance="ghost"
								size="24"
								className="rounded-md"
							>
								Out: {endpoint.outputTokens.toLocaleString()}
							</Badge>
						</div>

						<div className="space-y-2">
							<div className="flex flex-wrap items-baseline justify-between gap-2 text-body-sm">
								<span className="text-muted-foreground">
									Budget: {endpoint.monthlyBudgetEur.toLocaleString()} € / month
								</span>
								<span
									className={cn(
										'text-body-sm-strong',
										overBudget ? 'text-destructive' : 'text-foreground',
									)}
								>
									{endpoint.budgetUsed}% used
								</span>
							</div>
							<Progress value={progressValue} tone="ramp" />
						</div>
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								className="relative z-10 shrink-0"
								aria-label={`Actions for ${endpoint.name}`}
							>
								<MoreHorizontal className="h-icon-16 w-icon-16" aria-hidden />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuItem asChild>
								<Link
									to="/app/endpoints/$endpointId"
									params={{ endpointId: endpoint.id }}
									search={{
										returnTo: '/app/overview',
										returnLabel: 'Endpoints',
									}}
								>
									View endpoint
								</Link>
							</DropdownMenuItem>
							{onDelete && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="text-destructive focus:text-destructive"
										onClick={() => onDelete(endpoint.id)}
									>
										<Trash2 className="mr-2 h-icon-16 w-icon-16" aria-hidden />
										Delete endpoint
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	)
}

/**
 * Overview / portfolio endpoint tile. Use `variant="basic"` for phase 1 (compact identity + model line)
 * or `variant="full"` for phase 2 (environment badge, actions, token chips, budget bar).
 */
export function EndpointOverviewCard({
	endpoint,
	className,
	variant = 'full',
	onDelete,
}: EndpointOverviewCardProps) {
	if (variant === 'basic') {
		return (
			<EndpointOverviewCardBasic endpoint={endpoint} className={className} />
		)
	}
	return (
		<EndpointOverviewCardFull
			endpoint={endpoint}
			className={className}
			onDelete={onDelete}
		/>
	)
}

export { EndpointOverviewCardBasic, EndpointOverviewCardFull, EndpointIcon }
