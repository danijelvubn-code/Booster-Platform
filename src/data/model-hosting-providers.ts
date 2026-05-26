import type { ModelRecord } from '@/lib/model-metrics'
import { formatContextWindowShort } from '@/lib/model-metrics'

export const HOSTING_PROVIDER_BOOSTER = 'Booster Powered' as const
export const HOSTING_PROVIDER_SCALEWAY = 'Scaleway' as const
export const HOSTING_PROVIDER_EUROUTER = 'EUrouter' as const

export type CatalogHostingProvider =
	| typeof HOSTING_PROVIDER_BOOSTER
	| typeof HOSTING_PROVIDER_SCALEWAY
	| typeof HOSTING_PROVIDER_EUROUTER

const HOSTING_PROVIDERS = new Set<string>([
	HOSTING_PROVIDER_BOOSTER,
	HOSTING_PROVIDER_SCALEWAY,
	HOSTING_PROVIDER_EUROUTER,
])

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

const HOSTING_PROVIDER_DETAILS: Record<
	CatalogHostingProvider,
	Omit<
		CatalogProviderRow,
		'id' | 'provider' | 'context' | 'inputPer1M' | 'outputPer1M' | 'tps' | 'quant'
	> & {
		contextTokens: number
		inputPer1M: number
		outputPer1M: number
		tps: number
		defaultQuant: string
	}
> = {
	[HOSTING_PROVIDER_BOOSTER]: {
		contextTokens: 0,
		inputPer1M: 0,
		outputPer1M: 0,
		latencyMs: 620,
		tps: 0,
		defaultQuant: 'FP16',
		certs: ['GDPR'],
	},
	[HOSTING_PROVIDER_SCALEWAY]: {
		contextTokens: 128_000,
		inputPer1M: 2.8,
		outputPer1M: 8.4,
		latencyMs: 640,
		tps: 26.5,
		defaultQuant: 'INT8',
		certs: ['GDPR'],
	},
	[HOSTING_PROVIDER_EUROUTER]: {
		contextTokens: 64_000,
		inputPer1M: 2.5,
		outputPer1M: 7.5,
		latencyMs: 680,
		tps: 24.0,
		defaultQuant: 'INT4',
		certs: ['GDPR'],
	},
}

export function getModelHostingProvider(
	model: ModelRecord,
): CatalogHostingProvider {
	if (HOSTING_PROVIDERS.has(model.hosting)) {
		return model.hosting as CatalogHostingProvider
	}
	return HOSTING_PROVIDER_BOOSTER
}

export function getModelHostingProviders(
	model: ModelRecord,
): readonly CatalogHostingProvider[] {
	return [getModelHostingProvider(model)]
}

function modelQuantizationLabel(model: ModelRecord): string {
	if ('quantization' in model && model.quantization) {
		return model.quantization
	}
	return HOSTING_PROVIDER_DETAILS[getModelHostingProvider(model)].defaultQuant
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
		quant: modelQuantizationLabel(model),
		certs: template.certs,
	}
}

export function getModelCatalogProviderRows(
	model: ModelRecord,
): CatalogProviderRow[] {
	return [hostingProviderToCatalogRow(getModelHostingProvider(model), model)]
}
