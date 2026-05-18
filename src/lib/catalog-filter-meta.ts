import type { ModelRecord } from '@/lib/model-metrics'
import {
	getCodingScore,
	getMathScore,
	getOverallModelScore,
	getReasoningScore,
	modelHasVisionCapability,
} from '@/lib/model-metrics'

export type CatalogModality = 'text' | 'image' | 'audio' | 'video'

export type CapabilityCategoryId =
	| 'Agents'
	| 'Coding'
	| 'General'
	| 'Scientific Reasoning'

const PARAM_RE = /(\d+(?:\.\d+)?)\s*B\b/i

export function getParamBillions(model: ModelRecord): number | null {
	const m = model.name.match(PARAM_RE)
	return m ? Number.parseFloat(m[1]!) : null
}

export function getCatalogModalities(model: ModelRecord): CatalogModality[] {
	const out: CatalogModality[] = ['text']
	if (modelHasVisionCapability(model)) out.push('image')
	const blob = `${model.description} ${model.strengths.join(' ')}`.toLowerCase()
	if (
		blob.includes('audio') ||
		blob.includes('speech') ||
		blob.includes('tts') ||
		blob.includes('whisper') ||
		blob.includes('voice')
	) {
		out.push('audio')
	}
	if (blob.includes('video')) out.push('video')
	return out
}

/** OpenAI-style APIs — demo metadata derived from provider + model until backend sends real flags. */
export function getCatalogApiCapabilities(model: ModelRecord): string[] {
	const caps = new Set<string>(['Chat Completions'])

	const p = model.provider
	if (
		p === 'OpenAI' ||
		p === 'Google' ||
		p === 'Mistral AI' ||
		p === 'Meta' ||
		p === 'Alibaba' ||
		p === 'DeepSeek'
	) {
		caps.add('Responses')
	}

	if (p === 'OpenAI' || model.name.includes('GPT')) {
		caps.add('Embeddings')
		caps.add('Classify')
		caps.add('Score')
		caps.add('Audio Transcriptions')
		caps.add('Audio Translations')
	}

	if (p === 'Google' || model.name.toLowerCase().includes('gemini')) {
		caps.add('Embeddings')
		caps.add('Rerank')
		caps.add('Score')
	}

	if (p === 'Mistral AI') {
		caps.add('Embeddings')
		caps.add('Rerank')
		caps.add('Classify')
	}

	if (p === 'Meta' || model.name.includes('Llama')) {
		caps.add('Embeddings')
		caps.add('Chat Completions Legacy')
	}

	if (p === 'Alibaba' || p === 'DeepSeek') {
		caps.add('Embeddings')
	}

	return [...caps].sort()
}

export function getCatalogFeatures(model: ModelRecord): string[] {
	const out = new Set<string>(['Streaming'])
	const p = model.provider

	if (
		p === 'OpenAI' ||
		p === 'Google' ||
		p === 'Mistral AI' ||
		p === 'Meta' ||
		p === 'Alibaba' ||
		p === 'DeepSeek'
	) {
		out.add('Tool Use')
	}

	if (p === 'OpenAI' || model.name.toLowerCase().includes('gemini')) {
		out.add('Structured Outputs')
	}

	const reasoningCap = model.capabilities.find((c) => c.name === 'Reasoning')
	if (reasoningCap && reasoningCap.score >= 85) {
		out.add('Reasoning')
	}

	if (p === 'OpenAI' || p === 'Mistral AI') {
		out.add('Stream Cancellation')
	}

	return [...out].sort()
}

export function getCapabilityCategoryScore(
	model: ModelRecord,
	category: CapabilityCategoryId,
): number | null {
	switch (category) {
		case 'Coding': {
			const s = getCodingScore(model)
			return s > 0 ? s : null
		}
		case 'Agents': {
			const s = getReasoningScore(model)
			return s > 0 ? s : null
		}
		case 'Scientific Reasoning': {
			const s = getMathScore(model)
			return s > 0 ? s : null
		}
		case 'General': {
			const lang = model.capabilities.find((c) => c.name === 'Language')
			if (lang) return lang.score
			const overall = getOverallModelScore(model)
			return overall > 0 ? overall : null
		}
		default:
			return null
	}
}

const CAPABILITY_CATEGORY_MATCHERS: Record<CapabilityCategoryId, RegExp> = {
	Agents: /efficiency|agent|batch|throughput/i,
	Coding: /code|programming|debug/i,
	General: /language|multilingual|knowledge|custom/i,
	'Scientific Reasoning': /reasoning|math|logical|scientific/i,
}

function getCapabilityCategoryRecords(
	model: ModelRecord,
	category: CapabilityCategoryId,
) {
	const matcher = CAPABILITY_CATEGORY_MATCHERS[category]
	return model.capabilities.filter((cap) => matcher.test(cap.name))
}

export function getCapabilitySubcategoryNames(
	model: ModelRecord,
	category: CapabilityCategoryId,
): string[] {
	return getCapabilityCategoryRecords(model, category).flatMap((cap) =>
		cap.subs.map((sub) => sub.name),
	)
}

export function getCapabilitySubcategoryScore(
	model: ModelRecord,
	category: CapabilityCategoryId,
	subcategory: string,
): number | null {
	for (const cap of getCapabilityCategoryRecords(model, category)) {
		const sub = cap.subs.find((item) => item.name === subcategory)
		if (sub) return sub.score
	}
	return null
}

/**
 * True when at least one catalog model has both the category score and this
 * subcapability score at or above {@link minScore}. Used to disable impossible
 * subcapability chips when a minimal score filter is active.
 */
export function capabilitySubcategoryViableAtMinScore(
	catalog: readonly ModelRecord[],
	category: CapabilityCategoryId,
	subcategory: string,
	minScore: number,
): boolean {
	if (minScore <= 0) return true
	for (const m of catalog) {
		const catScore = getCapabilityCategoryScore(m, category)
		if (catScore == null || catScore < minScore) continue
		const subScore = getCapabilitySubcategoryScore(m, category, subcategory)
		if (subScore != null && subScore >= minScore) return true
	}
	return false
}

export type LicenseCategory = 'Commercial' | 'Open source' | 'Research'

export function getLicenseCategory(model: ModelRecord): LicenseCategory {
	if (model.provider === 'Meta' || model.name.toLowerCase().includes('llama')) {
		return 'Open source'
	}
	if (model.status === 'Beta') return 'Research'
	return 'Commercial'
}

export function getModelOriginLabel(model: ModelRecord): string {
	return model.provider
}

export function getModelBaseFamily(model: ModelRecord): string | null {
	// Lightweight cue for derivatives; real data would come from catalog YAML.
	const n = model.name
	if (/llama/i.test(n)) return 'Llama family'
	if (/mistral/i.test(n)) return 'Mistral family'
	if (/gemini/i.test(n)) return 'Gemini family'
	if (/qwen/i.test(n)) return 'Qwen family'
	if (/gpt/i.test(n)) return 'GPT family'
	return null
}

export type DataTypeLabel = 'bf16' | 'fp16' | 'fp32' | 'int8' | 'int4'

export function getCatalogDataTypes(_model: ModelRecord): DataTypeLabel[] {
	void _model
	return ['bf16', 'fp16']
}

export type AccessFormatLabel = 'API' | 'Managed'

export function getCatalogAccessFormats(
	_model: ModelRecord,
): AccessFormatLabel[] {
	void _model
	return ['API', 'Managed']
}

export type QuantizationLabel = 'None' | 'int8' | 'int4'

export function getCatalogQuantizations(
	model: ModelRecord,
): QuantizationLabel[] {
	const out: QuantizationLabel[] = ['None']
	if (
		getParamBillions(model) != null &&
		(getParamBillions(model) as number) >= 50
	) {
		out.push('int8')
	}
	return out
}
