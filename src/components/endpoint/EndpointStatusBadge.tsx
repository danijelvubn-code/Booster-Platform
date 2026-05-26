import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
	getEndpointStatusBadgeVariant,
	getEndpointStatusLabel,
	type EndpointStatus,
} from '@/lib/endpoint-status'
import { cn } from '@/lib/utils'

export function EndpointStatusBadge({
	status,
	size = '28',
	className,
}: {
	status: EndpointStatus
	size?: '24' | '28'
	className?: string
}) {
	const label = getEndpointStatusLabel(status)
	const isDeploying = status === 'Deploying'
	const spinnerClassName =
		size === '24' ? 'h-icon-16 w-icon-16' : 'h-icon-20 w-icon-20'

	return (
		<Badge
			variant={getEndpointStatusBadgeVariant(status)}
			appearance="pill"
			size={size}
			className={cn('font-normal', className)}
			aria-label={`Status: ${label}`}
			leadingIcon={
				isDeploying ? (
					<Loader2
						className={cn(spinnerClassName, 'animate-spin')}
						aria-hidden
					/>
				) : undefined
			}
		>
			{label}
		</Badge>
	)
}
