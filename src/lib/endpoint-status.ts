import type { ModelStatusBadgeVariant } from '@/lib/model-lifecycle'

export type EndpointStatus = 'Deploying' | 'Running'

const ENDPOINT_STATUS_LABELS: Record<EndpointStatus, string> = {
	Deploying: 'Deploying',
	Running: 'Running',
}

type EndpointStatusSource = {
	status?: string
	/** @deprecated Legacy mock field — mapped to `status` at read time. */
	health?: string
}

export function resolveEndpointStatus(
	endpoint: EndpointStatusSource,
): EndpointStatus {
	if (endpoint.status === 'Deploying' || endpoint.status === 'Running') {
		return endpoint.status
	}
	if (endpoint.health === 'OK') return 'Running'
	if (endpoint.health === 'At Risk') return 'Deploying'
	return 'Running'
}

export function getEndpointStatusLabel(status: EndpointStatus): string {
	return ENDPOINT_STATUS_LABELS[status]
}

export function getEndpointStatusBadgeVariant(
	status: EndpointStatus,
): ModelStatusBadgeVariant {
	switch (status) {
		case 'Deploying':
			return 'info'
		case 'Running':
			return 'success'
		default:
			return 'info'
	}
}

export function getEndpointStatusDotClassName(status: EndpointStatus): string {
	switch (status) {
		case 'Deploying':
			return 'bg-info'
		case 'Running':
			return 'bg-success'
		default:
			return 'bg-info'
	}
}
