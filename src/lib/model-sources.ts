import {
	HOSTING_PROVIDER_BOOSTER,
	HOSTING_PROVIDER_EUROUTER,
	HOSTING_PROVIDER_SCALEWAY,
	type CatalogHostingProvider,
	getModelHostingProvider,
} from '@/data/model-hosting-providers'
import { getLicenseCategory } from '@/lib/catalog-filter-meta'
import type { ModelRecord } from '@/lib/model-metrics'

export type ModelSourceRow = {
	label: string
	value: string
	href?: string
	tag?: string
	className?: string
}

const HUGGINGFACE_ORG: Partial<Record<string, string>> = {
	Meta: 'meta-llama',
	'Mistral AI': 'mistralai',
	Alibaba: 'Qwen',
	DeepSeek: 'deepseek-ai',
}

const EXTERNAL_PROVIDER_BASE_URLS: Partial<Record<string, string>> = {
	OpenAI: 'https://api.openai.com/v1',
	Google: 'https://generativelanguage.googleapis.com',
	Anthropic: 'https://api.anthropic.com',
}

const HOSTING_BASE_URLS: Partial<Record<CatalogHostingProvider, string>> = {
	[HOSTING_PROVIDER_SCALEWAY]: 'https://api.scaleway.com/llm/v1',
	[HOSTING_PROVIDER_EUROUTER]: 'https://api.eurouter.eu/v1',
}

const MISSING_VALUE = '- -'

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
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

function getExternalProviderBaseUrl(model: ModelRecord): string {
	return (
		EXTERNAL_PROVIDER_BASE_URLS[model.provider] ??
		HOSTING_BASE_URLS[getModelHostingProvider(model)] ??
		MISSING_VALUE
	)
}

export function sourceGridRowClassName(
	index: number,
	total: number,
): string {
	const firstColCount = Math.ceil(total / 2)
	const isFirstCol = index < firstColCount

	if (isFirstCol) {
		return `border-b border-transparent last:border-b-0 md:[&:nth-child(${firstColCount})]:border-b-0`
	}

	return 'border-b border-transparent last:border-b-0'
}

export function sourceGridRowsClass(rowCount: number): string {
	switch (rowCount) {
		case 1:
			return 'md:grid-rows-[repeat(1,56px)]'
		case 2:
			return 'md:grid-rows-[repeat(2,56px)]'
		default:
			return 'md:grid-rows-[repeat(2,56px)]'
	}
}

/** Booster: Provider + Type + Repo. API: Provider (External) + Base URL. */
export function getModelSourceRows(model: ModelRecord): ModelSourceRow[] {
	const isBooster = model.hosting === HOSTING_PROVIDER_BOOSTER

	const rows: ModelSourceRow[] = isBooster
		? (() => {
				const repo = getRepository(model)
				return [
					{ label: 'Provider', value: 'Booster' },
					{ label: 'Type', value: 'Hugging Face' },
					{
						label: 'Repo',
						value: repo?.value ?? MISSING_VALUE,
						href: repo?.href,
					},
				]
			})()
		: (() => {
				const baseUrl = getExternalProviderBaseUrl(model)
				return [
					{
						label: 'Provider',
						value: model.provider,
						tag: 'External',
					},
					{
						label: 'Base URL',
						value: baseUrl,
						href: baseUrl !== MISSING_VALUE ? baseUrl : undefined,
					},
				]
			})()

	return rows.map((row, index) => ({
		...row,
		className: sourceGridRowClassName(index, rows.length),
	}))

}
