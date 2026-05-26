import { models } from '@/data/mockData'
import {
	HOSTING_PROVIDER_BOOSTER,
} from '@/data/model-hosting-providers'
import type { ModelRecord } from '@/lib/model-metrics'
import { getOverallModelScore } from '@/lib/model-metrics'
import {
	getCapabilityCategoryScore,
	getCatalogAccessFormats,
	getCatalogApiCapabilities,
	getCatalogDataTypes,
	getCatalogFeatures,
	getCatalogModalities,
	getCatalogQuantizations,
	getLicenseCategory,
	getCapabilitySubcategoryScore,
	getModelBaseFamily,
	getModelOriginLabel,
	getParamBillions,
	type CapabilityCategoryId,
} from '@/lib/catalog-filter-meta'

export const BOOSTER_POWERED_PROVIDER = HOSTING_PROVIDER_BOOSTER

export type ModelSortId =
	| 'capability_desc'
	| 'input_price_asc'
	| 'output_price_asc'
	| 'context_desc'
	| 'newest'

export const MODEL_SORT_LABELS: Record<ModelSortId, string> = {
	capability_desc: 'Capability score',
	input_price_asc: 'Lowest input cost',
	output_price_asc: 'Lowest output cost',
	context_desc: 'Largest context',
	newest: 'Newest',
}

const PRICE_SLIDER_STEP = 0.05

/** Snaps the slider ceiling above catalog max with small headroom, on €/1M axis. */
export function catalogPriceSliderCeilingEUR(
	maxObserved: number,
	step: number = PRICE_SLIDER_STEP,
): number {
	if (!Number.isFinite(maxObserved) || maxObserved <= 0) {
		return Math.max(step * 40, 1)
	}
	const padded = maxObserved * 1.05
	return Math.ceil(padded / step) * step
}

export interface CatalogPriceSliderBoundsEUR {
	step: typeof PRICE_SLIDER_STEP
	input: { min: number; ceiling: number }
	output: { min: number; ceiling: number }
}

export function catalogPriceSliderBoundsEUR(
	catalog: typeof models,
): CatalogPriceSliderBoundsEUR {
	if (catalog.length === 0) {
		return {
			step: PRICE_SLIDER_STEP,
			input: { min: 0, ceiling: 10 },
			output: { min: 0, ceiling: 20 },
		}
	}
	let maxIn = 0
	let maxOut = 0
	for (const m of catalog) {
		if (m.inputCostPer1M > maxIn) maxIn = m.inputCostPer1M
		if (m.outputCostPer1M > maxOut) maxOut = m.outputCostPer1M
	}
	return {
		step: PRICE_SLIDER_STEP,
		input: { min: 0, ceiling: catalogPriceSliderCeilingEUR(maxIn) },
		output: { min: 0, ceiling: catalogPriceSliderCeilingEUR(maxOut) },
	}
}

export type ContextWindowPreset = 'any' | '32k' | '64k' | '128k' | '256k'

export type ModelSizePreset = 'any' | 'lt10' | 'b10_50' | 'b50_100' | 'b100p'

export type CapabilityScorePreset = 'any' | '60' | '70' | '80' | '90'

export type CategoryScoreThreshold = '0' | '60' | '70' | '80' | '90'

export type MinMemoryPreset = 'any' | 'lt50' | '50_150' | '150_300' | '300p'

export interface ModelFilterState {
	/** Exact match on `model.hosting` (e.g. deep links `?hosting=Booster Hosted`). */
	hosting: string[]
	providers: string[]
	capabilityScore: CapabilityScorePreset
	modalities: string[]
	apiCapabilities: string[]
	features: string[]
	/**
	 * Max input EUR per 1M tokens (inclusive). `null` = no ceiling (slider at catalog max UI).
	 */
	priceInputMaxPer1M: number | null
	/**
	 * Max output EUR per 1M tokens (inclusive). `null` = no ceiling (slider at catalog max UI).
	 */
	priceOutputMaxPer1M: number | null
	capabilityCategory: CapabilityCategoryId | ''
	capabilityCategoryMin: CategoryScoreThreshold
	capabilitySubcategories: string[]
	contextWindow: ContextWindowPreset
	modelSize: ModelSizePreset
	minMemory: MinMemoryPreset
	licenses: string[]
	dataTypes: string[]
	accessFormats: string[]
	quantizations: string[]
	origins: string[]
	baseModels: string[]
}

export const defaultFilters: ModelFilterState = {
	hosting: [],
	providers: [],
	capabilityScore: 'any',
	modalities: [],
	apiCapabilities: [],
	features: [],
	priceInputMaxPer1M: null,
	priceOutputMaxPer1M: null,
	capabilityCategory: '',
	capabilityCategoryMin: '0',
	capabilitySubcategories: [],
	contextWindow: 'any',
	modelSize: 'any',
	minMemory: 'any',
	licenses: [],
	dataTypes: [],
	accessFormats: [],
	quantizations: [],
	origins: [],
	baseModels: [],
}

export const defaultSort: ModelSortId = 'capability_desc'

/** Toggle membership of `item` in a multi-select string filter list. */
export function toggleStringList(list: string[], item: string): string[] {
	return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

/**
 * Counts active “More filters” dimensions for the toolbar badge (sheet-only scope).
 */
export function moreFiltersSheetBadgeCount(filters: ModelFilterState): number {
	return (
		(filters.contextWindow !== 'any' ? 1 : 0) +
		(filters.modelSize !== 'any' ? 1 : 0) +
		filters.licenses.length +
		filters.baseModels.length +
		filters.dataTypes.length +
		filters.accessFormats.length +
		filters.quantizations.length
	)
}

const CONTEXT_MIN_MAP: Record<Exclude<ContextWindowPreset, 'any'>, number> = {
	'32k': 32_000,
	'64k': 64_000,
	'128k': 128_000,
	'256k': 256_000,
}

function contextMinTokens(preset: ContextWindowPreset): number {
	if (preset === 'any') return 0
	return CONTEXT_MIN_MAP[preset]
}

export function modelMatchesProvider(model: ModelRecord, providers: string[]) {
	if (providers.length === 0) return true
	return providers.includes(model.hosting)
}

export function providerOptionCounts(catalog: typeof models) {
	const counts = new Map<string, number>()
	for (const model of catalog) {
		counts.set(model.hosting, (counts.get(model.hosting) ?? 0) + 1)
	}
	return counts
}

export function allProviderOptions(catalog: typeof models): string[] {
	const set = new Set<string>()
	for (const model of catalog) {
		set.add(model.hosting)
	}
	return [...set].sort((a, b) => a.localeCompare(b))
}

const ALL_MODALITY_IDS = ['text', 'image', 'audio', 'video'] as const

export function modalityOptionCounts(
	catalog: typeof models,
): Record<(typeof ALL_MODALITY_IDS)[number], number> {
	const counts = { text: 0, image: 0, audio: 0, video: 0 }
	for (const m of catalog) {
		for (const x of getCatalogModalities(m)) {
			if (x in counts) counts[x as keyof typeof counts]++
		}
	}
	return counts
}

/** All modality filter values, in display order. */
export function visibleModalities(_catalog: typeof models): string[] {
	void _catalog
	return [...ALL_MODALITY_IDS]
}

function optionSet(
	catalog: typeof models,
	extract: (m: ModelRecord) => string[],
): Set<string> {
	const s = new Set<string>()
	for (const m of catalog) {
		for (const x of extract(m)) s.add(x)
	}
	return s
}

export function visibleApiCapabilities(catalog: typeof models): string[] {
	const preferred = [
		'Chat Completions',
		'Responses',
		'Score',
		'Classify',
		'Embeddings',
		'Rerank',
		'Audio Transcriptions',
		'Audio Translations',
		'Chat Completions Legacy',
	]
	const have = optionSet(catalog, getCatalogApiCapabilities)
	return preferred.filter((x) => have.has(x))
}

export function visibleFeatures(catalog: typeof models): string[] {
	const preferred = [
		'Streaming',
		'Tool Use',
		'Structured Outputs',
		'Reasoning',
		'Stream Cancellation',
	]
	const have = optionSet(catalog, getCatalogFeatures)
	return preferred.filter((x) => have.has(x))
}

export function visibleOrigins(catalog: typeof models): string[] {
	return [...new Set(catalog.map(getModelOriginLabel))].sort((a, b) =>
		a.localeCompare(b),
	)
}

export function visibleBaseModels(catalog: typeof models): string[] {
	const set = new Set<string>()
	for (const m of catalog) {
		const f = getModelBaseFamily(m)
		if (f) set.add(f)
	}
	return [...set].sort((a, b) => a.localeCompare(b))
}

export function visibleLicenses(catalog: typeof models): string[] {
	const have = new Set(catalog.map((m) => getLicenseCategory(m)))
	return (['Commercial', 'Open source', 'Research'] as const).filter((x) =>
		have.has(x),
	)
}

export function visibleDataTypes(catalog: typeof models): string[] {
	const have = optionSet(catalog, getCatalogDataTypes)
	return ['bf16', 'fp16', 'fp32', 'int8', 'int4'].filter((x) => have.has(x))
}

export function visibleAccessFormats(catalog: typeof models): string[] {
	const have = optionSet(catalog, getCatalogAccessFormats)
	return (['API', 'Managed'] as const).filter((x) => have.has(x))
}

export function visibleQuantizations(catalog: typeof models): string[] {
	const have = optionSet(catalog, getCatalogQuantizations)
	return ['None', 'int8', 'int4'].filter((x) => have.has(x))
}

export function isFiltersActive(filters: ModelFilterState) {
	return (
		filters.hosting.length > 0 ||
		filters.providers.length > 0 ||
		filters.capabilityScore !== 'any' ||
		filters.modalities.length > 0 ||
		filters.apiCapabilities.length > 0 ||
		filters.features.length > 0 ||
		filters.priceInputMaxPer1M != null ||
		filters.priceOutputMaxPer1M != null ||
		filters.capabilityCategory !== '' ||
		filters.contextWindow !== 'any' ||
		filters.modelSize !== 'any' ||
		filters.minMemory !== 'any' ||
		filters.licenses.length > 0 ||
		filters.dataTypes.length > 0 ||
		filters.accessFormats.length > 0 ||
		filters.quantizations.length > 0 ||
		filters.origins.length > 0 ||
		filters.baseModels.length > 0
	)
}

function overallCapabilityMin(filters: ModelFilterState): number {
	if (filters.capabilityScore === 'any') return 0
	return Number.parseInt(filters.capabilityScore, 10)
}

function categoryMinThreshold(filters: ModelFilterState): number {
	if (filters.capabilityCategoryMin === '0') return 0
	return Number.parseInt(filters.capabilityCategoryMin, 10)
}

function matchesModelSize(
	model: ModelRecord,
	preset: ModelSizePreset,
): boolean {
	if (preset === 'any') return true
	const b = getParamBillions(model)
	if (b == null) return false
	switch (preset) {
		case 'lt10':
			return b < 10
		case 'b10_50':
			return b >= 10 && b < 50
		case 'b50_100':
			return b >= 50 && b < 100
		case 'b100p':
			return b >= 100
		default:
			return true
	}
}

function matchesMinMemory(
	_model: ModelRecord,
	_preset: MinMemoryPreset,
): boolean {
	void _model
	void _preset
	return true
}

export function applyModelFilters(
	modelList: ModelRecord[],
	filters: ModelFilterState,
	_catalog: typeof models = models,
) {
	void _catalog
	const capMin = overallCapabilityMin(filters)
	const ctxNeed = contextMinTokens(filters.contextWindow)
	const catNeed = categoryMinThreshold(filters)

	return modelList.filter((m) => {
		if (filters.hosting.length > 0 && !filters.hosting.includes(m.hosting))
			return false

		if (!modelMatchesProvider(m, filters.providers)) return false

		if (capMin > 0 && getOverallModelScore(m) < capMin) return false

		if (filters.modalities.length > 0) {
			const have = new Set<string>(getCatalogModalities(m))
			const ok = filters.modalities.some((x) => have.has(x))
			if (!ok) return false
		}

		if (filters.apiCapabilities.length > 0) {
			const have = new Set(getCatalogApiCapabilities(m))
			const ok = filters.apiCapabilities.every((x) => have.has(x))
			if (!ok) return false
		}

		if (filters.features.length > 0) {
			const have = new Set(getCatalogFeatures(m))
			const ok = filters.features.every((x) => have.has(x))
			if (!ok) return false
		}

		if (
			filters.priceInputMaxPer1M != null &&
			m.inputCostPer1M > filters.priceInputMaxPer1M
		)
			return false

		if (
			filters.priceOutputMaxPer1M != null &&
			m.outputCostPer1M > filters.priceOutputMaxPer1M
		)
			return false

		if (filters.capabilityCategory !== '') {
			const score = getCapabilityCategoryScore(
				m,
				filters.capabilityCategory as CapabilityCategoryId,
			)
			if (score == null || (catNeed > 0 && score < catNeed)) return false
		}

		if (
			filters.capabilityCategory !== '' &&
			filters.capabilitySubcategories.length > 0
		) {
			const ok = filters.capabilitySubcategories.every((subcategory) => {
				const score = getCapabilitySubcategoryScore(
					m,
					filters.capabilityCategory as CapabilityCategoryId,
					subcategory,
				)
				return score != null && (catNeed === 0 || score >= catNeed)
			})
			if (!ok) return false
		}

		if (ctxNeed > 0 && m.contextLength < ctxNeed) return false

		if (filters.modelSize !== 'any' && !matchesModelSize(m, filters.modelSize))
			return false

		if (filters.minMemory !== 'any' && !matchesMinMemory(m, filters.minMemory))
			return false

		if (
			filters.licenses.length > 0 &&
			!filters.licenses.includes(getLicenseCategory(m))
		)
			return false

		if (filters.dataTypes.length > 0) {
			const have = new Set<string>(getCatalogDataTypes(m))
			const ok = filters.dataTypes.some((x) => have.has(x))
			if (!ok) return false
		}

		if (filters.accessFormats.length > 0) {
			const have = new Set<string>(getCatalogAccessFormats(m))
			const ok = filters.accessFormats.some((x) => have.has(x))
			if (!ok) return false
		}

		if (filters.quantizations.length > 0) {
			const have = new Set<string>(getCatalogQuantizations(m))
			const ok = filters.quantizations.some((x) => have.has(x))
			if (!ok) return false
		}

		if (
			filters.origins.length > 0 &&
			!filters.origins.includes(getModelOriginLabel(m))
		)
			return false

		if (filters.baseModels.length > 0) {
			const fam = getModelBaseFamily(m)
			if (!fam || !filters.baseModels.includes(fam)) return false
		}

		return true
	})
}

export function compareModelsForSort(
	a: ModelRecord,
	b: ModelRecord,
	sort: ModelSortId,
	catalogOrder: Map<string, number>,
): number {
	switch (sort) {
		case 'capability_desc':
			return getOverallModelScore(b) - getOverallModelScore(a)
		case 'input_price_asc':
			return a.inputCostPer1M - b.inputCostPer1M
		case 'output_price_asc':
			return a.outputCostPer1M - b.outputCostPer1M
		case 'context_desc':
			return b.contextLength - a.contextLength
		case 'newest': {
			const da = new Date(`${a.addedDate}T12:00:00`).getTime()
			const db = new Date(`${b.addedDate}T12:00:00`).getTime()
			return db - da
		}
		default:
			return 0
	}
}

export function sortModels(
	list: ModelRecord[],
	sort: ModelSortId,
	catalogOrder: Map<string, number>,
) {
	const out = [...list]
	out.sort((a, b) => compareModelsForSort(a, b, sort, catalogOrder))
	return out
}
