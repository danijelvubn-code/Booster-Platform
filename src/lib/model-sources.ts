import {
	HOSTING_PROVIDER_BOOSTER,
	HOSTING_PROVIDER_EUROUTER,
	HOSTING_PROVIDER_SCALEWAY,
	type CatalogHostingProvider,
	getModelHostingProvider,
} from '@/data/model-hosting-providers'
import {
	getLicenseCategory,
	getModelBaseFamily,
} from '@/lib/catalog-filter-meta'
import { type ModelRecord, modelIsQuantized } from '@/lib/model-metrics'

export type ModelSourceRow = {
	label: string
	value: string
	href?: string
}

const ACCESS_TYPE_BOOSTER = 'Booster hosted'
const ACCESS_TYPE_EXTERNAL = 'External API'

const HUGGINGFACE_ORG: Partial<Record<string, string>> = {
	Meta: 'meta-llama',
	'Mistral AI': 'mistralai',
	Alibaba: 'Qwen',
	DeepSeek: 'deepseek-ai',
}

const EXTERNAL_BASE_URLS: Partial<Record<CatalogHostingProvider, string>> = {
	[HOSTING_PROVIDER_SCALEWAY]: 'https://api.scaleway.com/llm/v1',
	[HOSTING_PROVIDER_EUROUTER]: 'https://api.eurouter.eu/v1',
}

function pushRow(
	rows: ModelSourceRow[],
	label: string,
	value: string | null | undefined,
	href?: string,
) {
	if (!value?.trim()) return
	rows.push({ label, value: value.trim(), href })
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

function getLicenseLabel(model: ModelRecord): string | null {
	const category = getLicenseCategory(model)
	if (category === 'Open source') return 'Open Source'
	if (category === 'Research') return 'Research use terms'
	return 'Commercial'
}

function getSourceType(model: ModelRecord): string | null {
	if (getLicenseCategory(model) === 'Open source') return 'Hugging Face'
	if (model.provider === 'OpenAI') return 'OpenAI Platform'
	if (model.provider === 'Google') return 'Google AI'
	return 'Provider API'
}

function getRepository(
	model: ModelRecord,
): { value: string; href: string } | null {
	if (getLicenseCategory(model) !== 'Open source') return null

	const org = HUGGINGFACE_ORG[model.provider] ?? slugify(model.provider)
	const repoSlug = slugify(model.name)
	const path = `${org}/${repoSlug}`

	return {
		value: path,
		href: `https://huggingface.co/${path}`,
	}
}

function getBaseModelRelationship(model: ModelRecord): string | null {
	const family = getModelBaseFamily(model)
	if (family) return `${family} · Quantized variant`
	return `Quantized variant of ${model.name}`
}

export function getModelSourceRows(model: ModelRecord): ModelSourceRow[] {
	const rows: ModelSourceRow[] = []
	const isBoosterHosted = model.hosting === HOSTING_PROVIDER_BOOSTER
	const isQuantized = modelIsQuantized(model)

	if (isBoosterHosted && !isQuantized) {
		pushRow(rows, 'Provider / creator', model.provider)
		pushRow(rows, 'Access type', ACCESS_TYPE_BOOSTER)
		pushRow(rows, 'Source type', getSourceType(model))
		const repo = getRepository(model)
		if (repo) pushRow(rows, 'Repository', repo.value, repo.href)
		pushRow(rows, 'License', getLicenseLabel(model))
		return rows
	}

	if (isBoosterHosted && isQuantized) {
		pushRow(rows, 'Provider / creator', model.provider)
		pushRow(rows, 'Access type', ACCESS_TYPE_BOOSTER)
		pushRow(rows, 'Format', 'Safetensors')
		const quantization =
			'quantization' in model ? model.quantization : undefined
		pushRow(rows, 'Quantization', quantization ?? null)
		pushRow(rows, 'Base model / variant', getBaseModelRelationship(model))
		const repo = getRepository(model)
		if (repo) pushRow(rows, 'Repository', repo.value, repo.href)
		return rows
	}

	pushRow(rows, 'Provider', model.provider)
	pushRow(rows, 'Access type', ACCESS_TYPE_EXTERNAL)
	pushRow(rows, 'Served by', getModelHostingProvider(model))
	const baseUrl = EXTERNAL_BASE_URLS[getModelHostingProvider(model)]
	if (baseUrl) pushRow(rows, 'Base URL', baseUrl, baseUrl)
	pushRow(rows, 'License or usage terms', getLicenseLabel(model))
	return rows
}
