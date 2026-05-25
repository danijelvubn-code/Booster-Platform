import type { ModelRecord } from '@/lib/model-metrics'
import { formatContextWindowShort } from '@/lib/model-metrics'

export const HOSTING_PROVIDER_BOOSTER = 'Booster Powered' as const
export const HOSTING_PROVIDER_SCALEWAY = 'Scaleway' as const
export const HOSTING_PROVIDER_EUROUTER = 'EUrouter' as const

export type CatalogHostingProvider =
	| typeof HOSTING_PROVIDER_BOOSTER
	| typeof HOSTING_PROVIDER_SCALEWAY
	| typeof HOSTING_PROVIDER_EUROUTER

export type CatalogProviderRow = {
	id: string
	provider: string
	context: string
	inputPer1M: number
	outputPer1M: number
	latencyMs: number
	tps: number
	quant: string
	certs: string[]
}

const HOSTING_PROVIDER_ORDER: readonly CatalogHostingProvider[] = [
	HOSTING_PROVIDER_BOOSTER,
	HOSTING_PROVIDER_SCALEWAY,
	HOSTING_PROVIDER_EUROUTER,
]

const HOSTING_PROVIDER_DETAILS: Record<
	CatalogHostingProvider,
	Omit<CatalogProviderRow, 'id' | 'provider' | 'context' | 'inputPer1M' | 'outputPer1M' | 'tps'> & {
		contextTokens: number
		inputPer1M: number
		outputPer1M: number
		tps: number
	}
> = {
	[HOSTING_PROVIDER_BOOSTER]: {
		contextTokens: 0,
		inputPer1M: 0,
		outputPer1M: 0,
		latencyMs: 620,
		tps: 0,
		quant: 'FP16',
		certs: ['GDPR'],
	},
	[HOSTING_PROVIDER_SCALEWAY]: {
		contextTokens: 128_000,
		inputPer1M: 2.8,
		outputPer1M: 8.4,
		latencyMs: 640,
		tps: 26.5,
		quant: 'INT8',
		certs: ['GDPR'],
	},
	[HOSTING_PROVIDER_EUROUTER]: {
		contextTokens: 64_000,
		inputPer1M: 2.5,
		outputPer1M: 7.5,
		latencyMs: 680,
		tps: 24.0,
		quant: 'INT4',
		certs: ['GDPR'],
	},
}

/** Which infrastructure providers host each catalog model (mock data). */
export const MODEL_HOSTING_PROVIDERS: Record<
	string,
	readonly CatalogHostingProvider[]
> = {
	// Booster + Scaleway + EUrouter
	'm-3': [
		HOSTING_PROVIDER_BOOSTER,
		HOSTING_PROVIDER_SCALEWAY,
		HOSTING_PROVIDER_EUROUTER,
	],
	'm-12': [
		HOSTING_PROVIDER_BOOSTER,
		HOSTING_PROVIDER_SCALEWAY,
		HOSTING_PROVIDER_EUROUTER,
	],
	'm-15': [
		HOSTING_PROVIDER_BOOSTER,
		HOSTING_PROVIDER_SCALEWAY,
		HOSTING_PROVIDER_EUROUTER,
	],
	'm-26': [
		HOSTING_PROVIDER_BOOSTER,
		HOSTING_PROVIDER_SCALEWAY,
		HOSTING_PROVIDER_EUROUTER,
	],
	'm-23': [
		HOSTING_PROVIDER_BOOSTER,
		HOSTING_PROVIDER_SCALEWAY,
		HOSTING_PROVIDER_EUROUTER,
	],
	// Booster + Scaleway
	'm-9': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_SCALEWAY],
	'm-10': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_SCALEWAY],
	'm-11': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_SCALEWAY],
	'm-14': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_SCALEWAY],
	'm-24': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_SCALEWAY],
	// Booster + EUrouter
	'm-7': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_EUROUTER],
	'm-13': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_EUROUTER],
	'm-16': [HOSTING_PROVIDER_BOOSTER, HOSTING_PROVIDER_EUROUTER],
	// Booster only
	'm-5': [HOSTING_PROVIDER_BOOSTER],
	'm-29': [HOSTING_PROVIDER_BOOSTER],
	'm-32': [HOSTING_PROVIDER_BOOSTER],
	'm-22': [HOSTING_PROVIDER_BOOSTER],
	'm-27': [HOSTING_PROVIDER_BOOSTER],
	'm-25': [HOSTING_PROVIDER_BOOSTER],
	'm-31': [HOSTING_PROVIDER_BOOSTER],
	'm-19': [HOSTING_PROVIDER_BOOSTER],
	// Scaleway only
	'm-20': [HOSTING_PROVIDER_SCALEWAY],
	'm-18': [HOSTING_PROVIDER_SCALEWAY],
	'm-28': [HOSTING_PROVIDER_SCALEWAY],
	// EUrouter only
	'm-21': [HOSTING_PROVIDER_EUROUTER],
	'm-30': [HOSTING_PROVIDER_EUROUTER],
	'm-17': [HOSTING_PROVIDER_EUROUTER],
}

export function getModelHostingProviders(
	model: ModelRecord,
): readonly CatalogHostingProvider[] {
	return MODEL_HOSTING_PROVIDERS[model.id] ?? [HOSTING_PROVIDER_BOOSTER]
}

function hostingProviderToCatalogRow(
	hostingProvider: CatalogHostingProvider,
	model: ModelRecord,
): CatalogProviderRow {
	const template = HOSTING_PROVIDER_DETAILS[hostingProvider]
	const isBooster = hostingProvider === HOSTING_PROVIDER_BOOSTER

	return {
		id: hostingProvider.toLowerCase().replace(/\s+/g, '-'),
		provider:
			hostingProvider === HOSTING_PROVIDER_BOOSTER ? 'Booster' : hostingProvider,
		context: isBooster
			? formatContextWindowShort(model.contextLength)
			: formatContextWindowShort(template.contextTokens),
		inputPer1M: isBooster ? model.inputCostPer1M : template.inputPer1M,
		outputPer1M: isBooster ? model.outputCostPer1M : template.outputPer1M,
		latencyMs: template.latencyMs,
		tps: isBooster ? model.tokensPerSecond : template.tps,
		quant: template.quant,
		certs: template.certs,
	}
}

export function getModelCatalogProviderRows(
	model: ModelRecord,
): CatalogProviderRow[] {
	const hostingProviders = getModelHostingProviders(model)
	const order = new Map(
		HOSTING_PROVIDER_ORDER.map((provider, index) => [provider, index]),
	)

	return [...hostingProviders]
		.sort(
			(a, b) =>
				(order.get(a) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(b) ?? Number.MAX_SAFE_INTEGER),
		)
		.map((hostingProvider) => hostingProviderToCatalogRow(hostingProvider, model))
}
