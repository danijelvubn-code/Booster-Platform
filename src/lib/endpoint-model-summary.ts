import { getModelCatalogProviderRows } from '@/data/model-hosting-providers'
import { getModelParameterCount, type ModelRecord } from '@/lib/model-metrics'

const MISSING_VALUE_PLACEHOLDER = '- -'

export function formatEndpointParameters(model: ModelRecord): string {
	const parameters = getModelParameterCount(model)
	if (!parameters) return MISSING_VALUE_PLACEHOLDER
	if (parameters >= 1_000_000_000) {
		return `${Math.round(parameters / 1_000_000_000)}B`
	}
	if (parameters >= 1_000_000) return `${Math.round(parameters / 1_000_000)}M`
	return String(parameters)
}

export function formatEndpointContextWindow(model: ModelRecord): string {
	const tokens = model.contextLength
	if (!tokens) return MISSING_VALUE_PLACEHOLDER
	if (tokens >= 1000) return `${Math.round(tokens / 1000)}K`
	return String(tokens)
}

export function formatEndpointMinMemory(model: ModelRecord): string {
	const parameterCount = getModelParameterCount(model)
	if (!parameterCount) return MISSING_VALUE_PLACEHOLDER
	return `${Math.round(Math.max(parameterCount * 2, 0) / 1_000_000_000)} GB`
}

export function formatEndpointEurPer1M(value: number): string {
	return `€${value.toFixed(2)} / 1M`
}

export function getEndpointModelCatalogRow(model: ModelRecord) {
	return getModelCatalogProviderRows(model)[0]
}
