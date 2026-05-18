import type { ModelFilterState } from '@/lib/model-catalog-filters'
import {
	cosmosProviderFilterLabel,
	modalityFilterLabel,
} from '@/lib/cosmos-filter-display'
import { formatEurPer1MForDisplay } from '@/lib/model-metrics'

function cosmosPriceEuroChip(amount: number) {
	return `€${formatEurPer1MForDisplay(amount)}`
}

export type CosmosModelFilterChip = {
	key: string
	label: string
	/** Returns the next filter state with this chip removed. */
	remove: (prev: ModelFilterState) => ModelFilterState
}

export function buildCosmosModelFilterChips(
	filters: ModelFilterState,
): CosmosModelFilterChip[] {
	const out: CosmosModelFilterChip[] = []

	for (const h of filters.hosting) {
		out.push({
			key: `hosting-${h}`,
			label: `Hosting: ${h}`,
			remove: (prev) => ({
				...prev,
				hosting: prev.hosting.filter((x) => x !== h),
			}),
		})
	}
	for (const p of filters.providers) {
		out.push({
			key: `provider-${p}`,
			label: cosmosProviderFilterLabel(p),
			remove: (prev) => ({
				...prev,
				providers: prev.providers.filter((x) => x !== p),
			}),
		})
	}
	if (filters.capabilityScore !== 'any') {
		out.push({
			key: 'cap-score',
			label: `Capability score: ${filters.capabilityScore}+`,
			remove: (prev) => ({ ...prev, capabilityScore: 'any' }),
		})
	}
	for (const m of filters.modalities) {
		out.push({
			key: `mod-${m}`,
			label: `Modality: ${modalityFilterLabel(m)}`,
			remove: (prev) => ({
				...prev,
				modalities: prev.modalities.filter((x) => x !== m),
			}),
		})
	}
	for (const a of filters.apiCapabilities) {
		out.push({
			key: `api-${a}`,
			label: `API: ${a}`,
			remove: (prev) => ({
				...prev,
				apiCapabilities: prev.apiCapabilities.filter((x) => x !== a),
			}),
		})
	}
	for (const f of filters.features) {
		out.push({
			key: `feat-${f}`,
			label: `Feature: ${f}`,
			remove: (prev) => ({
				...prev,
				features: prev.features.filter((x) => x !== f),
			}),
		})
	}
	if (filters.priceInputMaxPer1M != null) {
		out.push({
			key: 'price-input',
			label: `Input ≤ ${cosmosPriceEuroChip(filters.priceInputMaxPer1M)} / 1M`,
			remove: (prev) => ({ ...prev, priceInputMaxPer1M: null }),
		})
	}
	if (filters.priceOutputMaxPer1M != null) {
		out.push({
			key: 'price-output',
			label: `Output ≤ ${cosmosPriceEuroChip(filters.priceOutputMaxPer1M)} / 1M`,
			remove: (prev) => ({ ...prev, priceOutputMaxPer1M: null }),
		})
	}
	if (filters.capabilityCategory !== '') {
		out.push({
			key: 'capability-category',
			label: `Capability: ${filters.capabilityCategory}`,
			remove: (prev) => ({
				...prev,
				capabilityCategory: '',
				capabilityCategoryMin: '0',
				capabilitySubcategories: [],
			}),
		})
	}
	if (
		filters.capabilityCategory !== '' &&
		filters.capabilityCategoryMin !== '0'
	) {
		out.push({
			key: 'cat-min',
			label: `Minimum score: ${filters.capabilityCategoryMin}+`,
			remove: (prev) => ({
				...prev,
				capabilityCategoryMin: '0',
			}),
		})
	}
	for (const subcategory of filters.capabilitySubcategories) {
		out.push({
			key: `cap-sub-${subcategory}`,
			label: `Subcapability: ${subcategory}`,
			remove: (prev) => ({
				...prev,
				capabilitySubcategories: prev.capabilitySubcategories.filter(
					(x) => x !== subcategory,
				),
			}),
		})
	}
	if (filters.contextWindow !== 'any') {
		out.push({
			key: 'ctx',
			label: `Context: ${filters.contextWindow}+`,
			remove: (prev) => ({ ...prev, contextWindow: 'any' }),
		})
	}
	if (filters.modelSize !== 'any') {
		const sizeLabel =
			filters.modelSize === 'lt10'
				? 'Under 10B'
				: filters.modelSize === 'b10_50'
					? '10B–50B'
					: filters.modelSize === 'b50_100'
						? '50B–100B'
						: '100B+'
		out.push({
			key: 'size',
			label: `Model size: ${sizeLabel}`,
			remove: (prev) => ({ ...prev, modelSize: 'any' }),
		})
	}
	if (filters.minMemory !== 'any') {
		out.push({
			key: 'mem',
			label: `Memory: ${filters.minMemory}`,
			remove: (prev) => ({ ...prev, minMemory: 'any' }),
		})
	}
	for (const lic of filters.licenses) {
		out.push({
			key: `lic-${lic}`,
			label: `License: ${lic}`,
			remove: (prev) => ({
				...prev,
				licenses: prev.licenses.filter((x) => x !== lic),
			}),
		})
	}
	for (const d of filters.dataTypes) {
		out.push({
			key: `dt-${d}`,
			label: `Data type: ${d}`,
			remove: (prev) => ({
				...prev,
				dataTypes: prev.dataTypes.filter((x) => x !== d),
			}),
		})
	}
	for (const f of filters.accessFormats) {
		out.push({
			key: `fmt-${f}`,
			label: `Access: ${f}`,
			remove: (prev) => ({
				...prev,
				accessFormats: prev.accessFormats.filter((x) => x !== f),
			}),
		})
	}
	for (const q of filters.quantizations) {
		out.push({
			key: `q-${q}`,
			label: `Quantization: ${q}`,
			remove: (prev) => ({
				...prev,
				quantizations: prev.quantizations.filter((x) => x !== q),
			}),
		})
	}
	for (const o of filters.origins) {
		out.push({
			key: `or-${o}`,
			label: `Origin: ${o}`,
			remove: (prev) => ({
				...prev,
				origins: prev.origins.filter((x) => x !== o),
			}),
		})
	}
	for (const b of filters.baseModels) {
		out.push({
			key: `base-${b}`,
			label: `Base: ${b}`,
			remove: (prev) => ({
				...prev,
				baseModels: prev.baseModels.filter((x) => x !== b),
			}),
		})
	}
	return out
}
