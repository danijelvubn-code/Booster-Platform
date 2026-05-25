import { BENCHMARK_TAXONOMY } from '@/data/capability-taxonomy'
import { modelHasVisionCapability, type ModelRecord } from '@/lib/model-metrics'

/** Catalog benchmark names used as score anchors for taxonomy benchmark ids. */
const TAXONOMY_BENCHMARK_ANCHORS: Record<string, readonly string[]> = {
	commonsenseqa: ['HellaSwag', 'CommonsenseQA'],
	gsm8k: ['GSM8K'],
	arc_easy: ['ARC-Easy', 'ARC-Challenge'],
	arc_challenge: ['ARC-Challenge'],
	healthbench: ['HealthBench', 'TruthfulQA', 'MMLU'],
	mmlu: ['MMLU'],
	mmlu_stem: ['MMLU'],
	medqa: ['MedQA', 'MMLU'],
	mmlu_pro_health: ['MMLU'],
	mmlu_pro_professional_accounting: ['MMLU'],
	mmlu_pro_economics: ['MMLU'],
	mmlu_business_economics_accounting: ['MMLU'],
	mmlu_computer_science: ['MMLU'],
	mmlu_high_school_biology: ['MMLU'],
	mmlu_college_biology: ['MMLU'],
	mmlu_college_medicine: ['MMLU'],
	mmlu_professional_medicine: ['MMLU'],
	mmlu_medical_genetics: ['MMLU'],
	mmlu_virology: ['MMLU'],
	mmlu_clinical_knowledge: ['MMLU'],
	mmlu_nutrition: ['MMLU'],
	mmlu_anatomy: ['MMLU'],
	air_bench: ['TruthfulQA', 'AIR Bench'],
	json_schema_bench_validity: ['MMLU', 'HumanEval'],
	json_schema_bench_compliance: ['MMLU', 'HumanEval'],
	bfcl: ['HumanEval', 'MMLU'],
	swe_bench_verified: ['HumanEval', 'MBPP'],
	humaneval: ['HumanEval'],
	text_to_cypher: ['HumanEval', 'MMLU'],
	ifeval: ['IFEval', 'TruthfulQA'],
	summeval: ['SummEval', 'HellaSwag'],
	booksum: ['BookSum', 'HellaSwag'],
	massive: ['HellaSwag', 'MMLU'],
	clinc150: ['HellaSwag'],
	ag_news: ['HellaSwag'],
	jigsaw_toxic_comment: ['TruthfulQA'],
	ocrbench_v2: ['MMLU'],
	omnidocbench: ['MMLU'],
	infovqa: ['MMLU'],
	docvqa: ['MMLU'],
	mathvision: ['GSM8K', 'MMLU'],
	mmmu: ['MMLU'],
	mmmu_pro: ['MMLU'],
	realworldqa: ['MMLU', 'ARC-Challenge'],
	mmiu: ['MMLU'],
	zerobench: ['ARC-Challenge', 'MMLU'],
	videomme: ['MMLU'],
	mmau: ['MMLU'],
	omnibench: ['MMLU'],
	mmlu_prox: ['MMLU'],
	autocodebench: ['HumanEval', 'MBPP'],
	mteb_europe_v1_sts: ['MMLU', 'HellaSwag'],
	mteb_code_v1_retrieval: ['HumanEval', 'MMLU'],
	mteb_medical_v1_retrieval: ['MMLU', 'MedQA'],
}

const REASONING_CORE = [
	'commonsenseqa',
	'arc_easy',
	'arc_challenge',
	'gsm8k',
] as const

const REASONING_CLINICAL = ['healthbench'] as const

const KNOWLEDGE_GENERAL = ['mmlu'] as const
const KNOWLEDGE_STEM = ['mmlu_stem'] as const
const KNOWLEDGE_MEDICAL = [
	'medqa',
	'mmlu_pro_health',
	'mmlu_high_school_biology',
	'mmlu_college_biology',
	'mmlu_college_medicine',
	'mmlu_professional_medicine',
	'mmlu_medical_genetics',
	'mmlu_virology',
	'mmlu_clinical_knowledge',
	'mmlu_nutrition',
	'mmlu_anatomy',
] as const
const KNOWLEDGE_MEDICAL_LITE = [
	'mmlu_pro_health',
	'mmlu_high_school_biology',
	'mmlu_clinical_knowledge',
] as const
const KNOWLEDGE_BUSINESS = [
	'mmlu_business_economics_accounting',
	'mmlu_pro_professional_accounting',
	'mmlu_pro_economics',
] as const
const KNOWLEDGE_CS = ['mmlu_computer_science'] as const
const KNOWLEDGE_LAW = ['air_bench'] as const

const STRUCTURED_OUTPUT = [
	'json_schema_bench_validity',
	'json_schema_bench_compliance',
] as const
const TOOL_USE = ['bfcl'] as const
const CODING = [
	'humaneval',
	'swe_bench_verified',
	'autocodebench',
	'text_to_cypher',
] as const
const CODING_LITE = ['humaneval', 'swe_bench_verified'] as const
const SAFETY = ['ifeval', 'air_bench'] as const
const SUMMARIZATION = ['summeval', 'booksum'] as const
const SUMMARIZATION_LITE = ['summeval'] as const
const CLASSIFICATION = ['massive', 'clinc150', 'ag_news', 'jigsaw_toxic_comment'] as const
const CLASSIFICATION_LITE = ['massive', 'clinc150'] as const
const DOCUMENT = ['ocrbench_v2', 'omnidocbench', 'infovqa', 'docvqa'] as const
const VISUAL = [
	'mathvision',
	'mmmu',
	'mmmu_pro',
	'realworldqa',
	'mmiu',
	'zerobench',
] as const
const VIDEO = ['videomme'] as const
const AUDIO = ['mmau'] as const
const MULTIMODAL = ['omnibench'] as const
const MULTILINGUAL = ['mmlu_prox'] as const
const EMBEDDING = [
	'mteb_europe_v1_sts',
	'mteb_code_v1_retrieval',
	'mteb_medical_v1_retrieval',
] as const

type BenchmarkProfile = 'general' | 'code' | 'enterprise' | 'vision' | 'compact'

function ids(...groups: readonly (readonly string[])[]): Set<string> {
	return new Set(groups.flat())
}

const PROFILE_BENCHMARK_IDS: Record<BenchmarkProfile, Set<string>> = {
	general: ids(
		REASONING_CORE,
		KNOWLEDGE_GENERAL,
		KNOWLEDGE_STEM,
		KNOWLEDGE_MEDICAL_LITE,
		KNOWLEDGE_BUSINESS,
		KNOWLEDGE_CS,
		STRUCTURED_OUTPUT,
		TOOL_USE,
		CODING_LITE,
		SAFETY,
		SUMMARIZATION_LITE,
		CLASSIFICATION_LITE,
		MULTILINGUAL,
	),
	code: ids(
		REASONING_CORE,
		KNOWLEDGE_GENERAL,
		KNOWLEDGE_STEM,
		KNOWLEDGE_CS,
		CODING,
		TOOL_USE,
		['mteb_code_v1_retrieval'],
	),
	enterprise: ids(
		REASONING_CORE,
		REASONING_CLINICAL,
		KNOWLEDGE_GENERAL,
		KNOWLEDGE_STEM,
		KNOWLEDGE_MEDICAL,
		KNOWLEDGE_BUSINESS,
		KNOWLEDGE_CS,
		KNOWLEDGE_LAW,
		STRUCTURED_OUTPUT,
		TOOL_USE,
		CODING_LITE,
		SAFETY,
		SUMMARIZATION,
		CLASSIFICATION,
		MULTILINGUAL,
		EMBEDDING,
	),
	vision: ids(
		REASONING_CORE,
		KNOWLEDGE_GENERAL,
		KNOWLEDGE_STEM,
		KNOWLEDGE_MEDICAL_LITE,
		CODING_LITE,
		SAFETY,
		SUMMARIZATION_LITE,
		VISUAL,
		DOCUMENT,
		VIDEO,
		AUDIO,
		MULTIMODAL,
	),
	compact: ids(
		REASONING_CORE,
		KNOWLEDGE_GENERAL,
		KNOWLEDGE_STEM,
		CODING_LITE,
		SAFETY,
	),
}

const modelScoreCache = new Map<string, Record<string, number>>()

function hashString(value: string): number {
	let hash = 0
	for (const char of value) {
		hash = (hash * 31 + char.charCodeAt(0)) | 0
	}
	return Math.abs(hash)
}

function getBenchmarkProfile(model: ModelRecord): BenchmarkProfile {
	if (model.category === 'Code') return 'code'
	if (modelHasVisionCapability(model)) return 'vision'
	if (model.category === 'Enterprise') return 'enterprise'
	if (model.parameterSize === '3B' || model.parameterSize === '7B') {
		return 'compact'
	}
	if (model.parameterSize === '9B') return 'compact'
	return 'general'
}

function getCatalogAnchorScore(
	model: ModelRecord,
	benchmarkId: string,
): number | null {
	const anchors = TAXONOMY_BENCHMARK_ANCHORS[benchmarkId]
	if (!anchors) return null
	for (const anchor of anchors) {
		const match = model.benchmarks.find((benchmark) => benchmark.name === anchor)
		if (match) return match.score
	}
	return null
}

function deriveTaxonomyScore(
	model: ModelRecord,
	benchmarkId: string,
	anchorScore: number,
): number {
	const hash = hashString(`${model.id}:${benchmarkId}`)
	const spread = (hash % 21) - 10
	const tierBoost = hash % 3 === 0 ? 2 : hash % 5 === 0 ? -3 : 0
	const score = anchorScore + spread + tierBoost
	return Math.round(Math.min(100, Math.max(0, score)) * 10) / 10
}

function isBenchmarkEvaluated(
	model: ModelRecord,
	benchmarkId: string,
	profile: BenchmarkProfile,
): boolean {
	if (!(benchmarkId in BENCHMARK_TAXONOMY)) return false
	if (!PROFILE_BENCHMARK_IDS[profile].has(benchmarkId)) return false

	if (profile === 'compact') {
		return hashString(`${model.id}:${benchmarkId}:eval`) % 4 !== 0
	}

	return getCatalogAnchorScore(model, benchmarkId) != null
}

function buildModelTaxonomyBenchmarkScores(
	model: ModelRecord,
): Record<string, number> {
	const profile = getBenchmarkProfile(model)
	const scores: Record<string, number> = {}

	for (const benchmarkId of Object.keys(BENCHMARK_TAXONOMY)) {
		if (!isBenchmarkEvaluated(model, benchmarkId, profile)) continue
		const anchorScore = getCatalogAnchorScore(model, benchmarkId)
		if (anchorScore == null) continue
		scores[benchmarkId] = deriveTaxonomyScore(model, benchmarkId, anchorScore)
	}

	return scores
}

/** Per-model taxonomy benchmark scores for capability breakdown mock data. */
export function getModelTaxonomyBenchmarkScores(
	model: ModelRecord,
): Readonly<Record<string, number>> {
	const cached = modelScoreCache.get(model.id)
	if (cached) return cached

	const scores = buildModelTaxonomyBenchmarkScores(model)
	modelScoreCache.set(model.id, scores)
	return scores
}

export function getModelTaxonomyBenchmarkScore(
	model: ModelRecord,
	benchmarkId: string,
): number | null {
	return getModelTaxonomyBenchmarkScores(model)[benchmarkId] ?? null
}
