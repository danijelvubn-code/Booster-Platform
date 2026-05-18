import { BOOSTER_POWERED_PROVIDER } from '@/lib/model-catalog-filters'

export function cosmosProviderFilterLabel(filterValue: string): string {
	return filterValue === BOOSTER_POWERED_PROVIDER ? 'Booster' : filterValue
}

export function modalityFilterLabel(modalityId: string): string {
	return modalityId.slice(0, 1).toUpperCase() + modalityId.slice(1)
}
