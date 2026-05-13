export function endpointDetailPath(endpointId: string): string {
	return `/app/endpoints/${endpointId}`
}

export function endpointEditPath(endpointId: string): string {
	return `/app/endpoints/${endpointId}/edit`
}

/** List / hub used by endpoint detail "back" navigation */
export function endpointsHubPath(): string {
	return '/app/endpoints'
}
