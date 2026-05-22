import type { ModelRecord } from '@/lib/model-metrics'

export type ModelLifecycleStatus = ModelRecord['status']

export type ModelLifecycleAlertVariant = 'info' | 'warning' | 'destructive'

export type ModelLifecycleAlertContent = {
	variant: ModelLifecycleAlertVariant
	title: string
	description: string
}

export type ModelStatusBadgeVariant = 'success' | 'info' | 'warning' | 'destructive'

export function canCreateInferenceEndpoint(model: ModelRecord): boolean {
	return model.status !== 'Deprecated'
}

export function getModelStatusBadgeVariant(
	status: ModelLifecycleStatus,
): ModelStatusBadgeVariant {
	switch (status) {
		case 'Active':
			return 'success'
		case 'Beta':
			return 'info'
		case 'Sunsetting':
			return 'warning'
		case 'Deprecated':
			return 'destructive'
		default:
			return 'warning'
	}
}

export function getModelStatusDotClassName(
	status: ModelLifecycleStatus,
): string {
	switch (status) {
		case 'Active':
			return 'bg-success'
		case 'Beta':
			return 'bg-info'
		case 'Sunsetting':
			return 'bg-warning'
		case 'Deprecated':
			return 'bg-destructive'
		default:
			return 'bg-warning'
	}
}

export function getModelLifecycleAlert(
	model: ModelRecord,
): ModelLifecycleAlertContent | null {
	switch (model.status) {
		case 'Active':
			return null
		case 'Beta':
			return {
				variant: 'info',
				title: 'Beta model',
				description:
					'This model is in beta. Behavior, pricing, and availability may change.',
			}
		case 'Sunsetting':
			return {
				variant: 'warning',
				title: 'Model is sunsetting',
				description:
					'This model is being phased out. New deployments are still possible, but we recommend migrating to a newer alternative.',
			}
		case 'Deprecated':
			return {
				variant: 'warning',
				title: 'Model is deprecated',
				description:
					'You can review specs and benchmarks, but new inference endpoints cannot be created.',
			}
		default:
			return null
	}
}

function getNameFamily(name: string): string {
	return name.toLowerCase().split(/\s+/)[0] ?? name.toLowerCase()
}

export function getSuggestedSuccessorModel(
	model: ModelRecord,
	catalog: readonly ModelRecord[],
): ModelRecord | null {
	const family = getNameFamily(model.name)
	const candidates = catalog.filter(
		(m) =>
			m.id !== model.id &&
			m.status === 'Active' &&
			m.provider === model.provider,
	)
	if (candidates.length === 0) return null

	const sameFamily = candidates.filter(
		(m) =>
			getNameFamily(m.name) === family ||
			m.name.toLowerCase().includes(family),
	)
	const pool = sameFamily.length > 0 ? sameFamily : candidates

	return (
		pool.sort((a, b) => b.addedDate.localeCompare(a.addedDate))[0] ?? null
	)
}
