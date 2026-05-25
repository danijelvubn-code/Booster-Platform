import {
	AI_INDEX_CAPABILITY_IDS,
	BENCHMARK_TAXONOMY,
	CAPABILITY_INDEXES,
	CAPABILITY_TAXONOMY,
} from '@/data/capability-taxonomy'
import { getModelTaxonomyBenchmarkScore } from '@/data/model-taxonomy-benchmark-scores'
import type { ModelRecord } from '@/lib/model-metrics'

export type ScoredBenchmark = {
	id: string
	displayName: string
	weight: number
	score: number | null
}

export type ScoredSubcapability = {
	id: string
	displayName: string
	description: string
	weight: number
	score: number | null
	hasBenchmarkResults: boolean
	benchmarks: ScoredBenchmark[]
}

export type ScoredCapability = {
	id: string
	displayName: string
	description: string
	score: number | null
	hasBenchmarkResults: boolean
	subcapabilities: ScoredSubcapability[]
}

export type ScoredIndex = {
	id: string
	displayName: string
	description: string
	score: number | null
}

function getBenchmarkScore(
	model: ModelRecord,
	benchmarkId: string,
): number | null {
	return getModelTaxonomyBenchmarkScore(model, benchmarkId)
}

function weightedAverage(
	items: ReadonlyArray<{ weight: number; score: number | null }>,
): number | null {
	let totalWeight = 0
	let weightedSum = 0
	for (const item of items) {
		if (item.score == null) continue
		totalWeight += item.weight
		weightedSum += item.weight * item.score
	}
	if (totalWeight === 0) return null
	return weightedSum / totalWeight
}

function normalizeBenchmarkWeights(
	benchmarks: ScoredBenchmark[],
): ScoredBenchmark[] {
	if (benchmarks.length === 0) return benchmarks
	if (benchmarks.length === 1) {
		return [{ ...benchmarks[0], weight: 1 }]
	}

	const totalWeight = benchmarks.reduce((sum, benchmark) => sum + benchmark.weight, 0)
	if (totalWeight === 0) {
		const equalWeight = 1 / benchmarks.length
		return benchmarks.map((benchmark) => ({ ...benchmark, weight: equalWeight }))
	}

	return benchmarks.map((benchmark) => ({
		...benchmark,
		weight: benchmark.weight / totalWeight,
	}))
}

function normalizeSubcapabilityWeights(
	subcapabilities: ScoredSubcapability[],
): ScoredSubcapability[] {
	if (subcapabilities.length === 0) return subcapabilities
	if (subcapabilities.length === 1) {
		return [{ ...subcapabilities[0], weight: 1 }]
	}

	const totalWeight = subcapabilities.reduce(
		(sum, subcapability) => sum + subcapability.weight,
		0,
	)
	if (totalWeight === 0) {
		const equalWeight = 1 / subcapabilities.length
		return subcapabilities.map((subcapability) => ({
			...subcapability,
			weight: equalWeight,
		}))
	}

	return subcapabilities.map((subcapability) => ({
		...subcapability,
		weight: subcapability.weight / totalWeight,
	}))
}

function scoreSubcapability(
	model: ModelRecord,
	subcapabilityId: string,
	subcapability: (typeof CAPABILITY_TAXONOMY)[string]['subcapabilities'][string],
): ScoredSubcapability {
	const rawBenchmarks: ScoredBenchmark[] = []
	for (const [benchmarkId, weight] of Object.entries(subcapability.benchmarks)) {
		const score = getBenchmarkScore(model, benchmarkId)
		if (score == null) continue
		rawBenchmarks.push({
			id: benchmarkId,
			displayName: BENCHMARK_TAXONOMY[benchmarkId]?.displayName ?? benchmarkId,
			weight,
			score,
		})
	}

	const benchmarks = normalizeBenchmarkWeights(rawBenchmarks)

	return {
		id: subcapabilityId,
		displayName: subcapability.displayName,
		description: subcapability.description,
		weight: subcapability.weight,
		hasBenchmarkResults: benchmarks.length > 0,
		score: weightedAverage(
			benchmarks.map((benchmark) => ({
				weight: benchmark.weight,
				score: benchmark.score,
			})),
		),
		benchmarks,
	}
}

function scoreCapability(
	model: ModelRecord,
	capabilityId: string,
): ScoredCapability {
	const capability = CAPABILITY_TAXONOMY[capabilityId]
	const rawSubcapabilities = Object.entries(capability.subcapabilities)
		.map(([subcapabilityId, subcapability]) =>
			scoreSubcapability(model, subcapabilityId, subcapability),
		)
		.filter((subcapability) => subcapability.hasBenchmarkResults)
	const subcapabilities = normalizeSubcapabilityWeights(rawSubcapabilities)

	return {
		id: capabilityId,
		displayName: capability.displayName,
		description: capability.description,
		hasBenchmarkResults: subcapabilities.length > 0,
		score: weightedAverage(
			subcapabilities.map((subcapability) => ({
				weight: subcapability.weight,
				score: subcapability.score,
			})),
		),
		subcapabilities,
	}
}

export function getModelCapabilityScores(
	model: ModelRecord,
): ScoredCapability[] {
	return Object.keys(CAPABILITY_TAXONOMY).map((capabilityId) =>
		scoreCapability(model, capabilityId),
	)
}

export function getModelIndexScores(model: ModelRecord): ScoredIndex[] {
	const capabilities = getModelCapabilityScores(model)
	const capabilityById = new Map(capabilities.map((cap) => [cap.id, cap]))
	const subcapabilityByKey = new Map<string, ScoredSubcapability>()
	for (const capability of capabilities) {
		for (const subcapability of capability.subcapabilities) {
			subcapabilityByKey.set(`${capability.id}.${subcapability.id}`, subcapability)
		}
	}

	return Object.entries(CAPABILITY_INDEXES).map(([indexId, index]) => {
		const weightedItems: Array<{ weight: number; score: number | null }> = []

		if (index.capabilities) {
			for (const [capabilityId, { weight }] of Object.entries(
				index.capabilities,
			)) {
				weightedItems.push({
					weight,
					score: capabilityById.get(capabilityId)?.score ?? null,
				})
			}
		}

		if (index.subcapabilities) {
			for (const [subcapabilityKey, { weight }] of Object.entries(
				index.subcapabilities,
			)) {
				weightedItems.push({
					weight,
					score: subcapabilityByKey.get(subcapabilityKey)?.score ?? null,
				})
			}
		}

		return {
			id: indexId,
			displayName: index.displayName,
			description: index.description,
			score: weightedAverage(weightedItems),
		}
	})
}

export function getModelCapabilityScoreAverage(
	model: ModelRecord,
): number | null {
	const scoredCapabilities = getModelCapabilityScores(model).filter(
		(capability) => capability.hasBenchmarkResults && capability.score != null,
	)
	if (scoredCapabilities.length === 0) return null

	const total = scoredCapabilities.reduce(
		(sum, capability) => sum + capability.score!,
		0,
	)
	return total / scoredCapabilities.length
}

export function getAiIndexScore(model: ModelRecord): number | null {
	const indexes = getModelIndexScores(model)
	return indexes.find((index) => index.id === 'ai_index')?.score ?? null
}

export function getAiIndexCapabilityScores(
	model: ModelRecord,
): ScoredCapability[] {
	const capabilities = getModelCapabilityScores(model)
	const byId = new Map(capabilities.map((cap) => [cap.id, cap]))
	return AI_INDEX_CAPABILITY_IDS.map(
		(id) => byId.get(id) ?? scoreCapability(model, id),
	)
}

export function formatCapabilityWeight(weight: number): string {
	const pct = weight * 100
	if (Number.isInteger(pct)) return `${pct}%`
	return `${pct.toFixed(1)}%`
}
