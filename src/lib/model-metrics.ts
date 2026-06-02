export type ModelRecord = typeof import('@/data/mockData').models[number]

export function getCodingScore(model: ModelRecord): number {
	const c = model.capabilities.find((x) => x.name === 'Code')
	if (c) return c.score
	const b = model.benchmarks.find((x) => x.name === 'HumanEval')
	return b ? Math.round(b.score) : 0
}

export function getReasoningScore(model: ModelRecord): number {
	const c = model.capabilities.find((x) => x.name === 'Reasoning')
	if (c) return c.score
	const b = model.benchmarks.find((x) => x.name === 'ARC-Challenge')
	return b ? Math.round(b.score) : 0
}

export function getMathScore(model: ModelRecord): number {
	const b = model.benchmarks.find((x) => x.name === 'GSM8K')
	if (b) return Math.round(b.score)
	const c = model.capabilities.find((x) => x.name === 'Reasoning')
	const sub = c?.subs.find((s) => s.name === 'Mathematical')
	return sub ? Math.round(sub.score) : 0
}

export function getOverallModelScore(model: ModelRecord): number {
	const a = getCodingScore(model)
	const b = getReasoningScore(model)
	const c = getMathScore(model)
	if (a + b + c === 0) return 0
	return Math.round((a + b + c) / 3)
}

const PARAM_RE = /(\d+(?:\.\d+)?)\s*B/i

/** Shown when model name/description has no parseable parameter size (e.g. card subline). */
export const PARAM_SIZE_MISSING_LABEL = '- -'

export function getParamSizeLabel(name: string): string | null {
	const m = name.match(PARAM_RE)
	return m ? `${m[1]}B` : null
}

/** Canonical parameter size label from catalog data (e.g. `72B`). */
export function getModelParameterSizeLabel(model: ModelRecord): string {
	return model.parameterSize
}

export function parseParameterSizeToCount(label: string): number {
	const m = label.match(/^(\d+(?:\.\d+)?)B$/i)
	if (!m) return 0
	return Number.parseFloat(m[1]) * 1_000_000_000
}

export function getModelParameterCount(model: ModelRecord): number {
	return parseParameterSizeToCount(getModelParameterSizeLabel(model))
}

export function getModelModalityLabel(model: ModelRecord): string {
	if (model.category === 'Code') return 'Code LLM'
	if (model.category === 'Enterprise') return 'Enterprise LLM'
	return 'LLM'
}

/** Small badge on catalog-style model tiles (e.g. Chat vs Code). */
export function getModelCatalogBadge(model: ModelRecord): string {
	if (model.category === 'Code') return 'Code'
	return 'Chat'
}

/** Whether to show a vision / multimodal affordance (e.g. beside text modality). */
export function modelHasVisionCapability(model: ModelRecord): boolean {
	return model.strengths.some((s) => {
		const l = s.toLowerCase()
		return (
			l.includes('multimodal') || l.includes('vision') || l.includes('image')
		)
	})
}

export function modelIsQuantized(model: ModelRecord): boolean {
	return 'quantization' in model && Boolean(model.quantization)
}

export function getModelSubline(model: ModelRecord): string {
	const param = getModelParameterSizeLabel(model)
	const version = `v${model.version}`
	const type = getModelModalityLabel(model)
	const parts = [version, param, type]
	if (modelIsQuantized(model)) parts.push('Quantized')
	return parts.join(' · ')
}

/** Per-token price in EUR when `inputCostPer1M` is EUR per 1M tokens. */
export function formatEurPerTokenFromPer1M(eurPer1M: number): string {
	const per = eurPer1M / 1_000_000
	return per.toFixed(8)
}

/** EUR per 1M tokens for hero metrics (short, two decimals; e.g. `0.89`, `1.20`). */
export function formatEurPer1MForDisplay(eurPer1M: number): string {
	return eurPer1M.toFixed(2)
}

export function formatContextLength(ctx: number): string {
	if (ctx >= 1_000_000) return `${(ctx / 1_000_000).toFixed(0)}M ctx`
	if (ctx >= 1_000) return `${Math.round(ctx / 1_000)}k ctx`
	return `${ctx} ctx`
}

/** Throughput for catalog metric tiles (e.g. `105 tok/s`). */
export function formatTokensPerSecond(tps: number): string {
	if (!Number.isFinite(tps) || tps <= 0) return '—'
	return `${Math.round(tps)} tok/s`
}

/** Compact window label for tables and metric tiles (e.g. `128K`, `1M`). */
export function formatContextWindowShort(ctx: number): string {
	if (ctx >= 1_000_000) return `${(ctx / 1_000_000).toFixed(0)}M`
	if (ctx >= 1_000) return `${Math.round(ctx / 1_000)}K`
	return `${ctx}`
}

/** Energy / efficiency letter → text class (same hues as EnergyScorePill icon). */
const ENERGY_GRADE_FOREGROUND_CLASS: Record<string, string> = {
	A: 'text-success',
	B: 'text-[#65A30D]',
	C: 'text-[#D3A532]',
	D: 'text-warning',
	E: 'text-destructive',
}

/**
 * Capability / aggregate score numerals on cards and detail views: ≥90 → green; otherwise primary text.
 * No score (≤0) → muted foreground.
 */
export function overallScoreTextClass(score: number): string {
	if (score <= 0) return 'text-muted-foreground'
	if (score >= 90) return 'text-success'
	return 'text-foreground'
}

/** Energy grades A–E: icon well uses alpha 7 (0.07); B/C use fixed hex (product exception). */
const GRADE_STYLES: Record<string, { box: string; icon: string }> = {
	A: { box: 'bg-success/7', icon: ENERGY_GRADE_FOREGROUND_CLASS.A },
	B: { box: 'bg-[#65A30D]/7', icon: ENERGY_GRADE_FOREGROUND_CLASS.B },
	C: { box: 'bg-[#D3A532]/7', icon: ENERGY_GRADE_FOREGROUND_CLASS.C },
	D: { box: 'bg-warning/7', icon: ENERGY_GRADE_FOREGROUND_CLASS.D },
	E: { box: 'bg-destructive/7', icon: ENERGY_GRADE_FOREGROUND_CLASS.E },
}

export function getSustainabilityGradeStyles(grade: string) {
	return GRADE_STYLES[grade] ?? GRADE_STYLES.B
}
