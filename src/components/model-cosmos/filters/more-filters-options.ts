import type { CapabilityCategoryId } from '@/lib/catalog-filter-meta'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { BOOSTER_POWERED_PROVIDER } from '@/lib/model-catalog-filters'

export const COSMOS_TOOLBAR_PROVIDER_OPTIONS: readonly string[] = [
	BOOSTER_POWERED_PROVIDER,
	'Scaleway',
	'EUrouter',
]

export const MORE_FILTERS_CATEGORY_OPTIONS: {
	value: 'none' | CapabilityCategoryId
	label: string
}[] = [
	{ value: 'none', label: 'Any' },
	{ value: 'Agents', label: 'Agents' },
	{ value: 'Coding', label: 'Coding' },
	{ value: 'General', label: 'General' },
	{
		value: 'Scientific Reasoning',
		label: 'Scientific Reasoning',
	},
]

export const MORE_FILTERS_CONTEXT_OPTIONS: {
	value: ModelFilterState['contextWindow']
	label: string
}[] = [
	{ value: 'any', label: 'Any' },
	{ value: '32k', label: '32K+' },
	{ value: '64k', label: '64K+' },
	{ value: '128k', label: '128K+' },
	{ value: '256k', label: '256K+' },
]

export const MORE_FILTERS_MODEL_SIZE_OPTIONS: {
	value: ModelFilterState['modelSize']
	label: string
}[] = [
	{ value: 'any', label: 'Any' },
	{ value: 'lt10', label: '<10B' },
	{ value: 'b10_50', label: '10B–50B' },
	{ value: 'b50_100', label: '50B–100B' },
	{ value: 'b100p', label: '100B+' },
]

export const TOOLBAR_CAPABILITY_SCORE_OPTIONS: {
	value: ModelFilterState['capabilityCategoryMin']
	label: string
}[] = [
	{ value: '0', label: 'Any' },
	{ value: '60', label: '60% +' },
	{ value: '70', label: '70% +' },
	{ value: '80', label: '80% +' },
	{ value: '90', label: '90% +' },
]

/** Canonical order for popular base-model families (matches heuristic groupings in catalog). */
export const BASE_MODEL_FAMILY_POPULAR_ORDER: readonly string[] = [
	'GPT family',
	'Llama family',
	'Mistral family',
	'Qwen family',
	'Gemini family',
]

export const BASE_MODEL_POPULAR_FAMILY_SET = new Set(
	BASE_MODEL_FAMILY_POPULAR_ORDER,
)
