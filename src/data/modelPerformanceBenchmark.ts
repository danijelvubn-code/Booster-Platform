export type PerformanceMeasurement = {
	concurrency: number
	ttft_ms: number
	tokens_per_user_per_s: number
	tokens_per_s: number
	kjoules_per_req: number
	kgC02_per_req: number
}

export type TokenStats = {
	min: number
	mean: number
	max: number
}

export type PerformanceWorkload = {
	id: string
	name: string
	token_dataset: string
	distribution: string
	input_tokens: TokenStats
	output_tokens: TokenStats
	measurements: PerformanceMeasurement[]
}

export type ModelPerformanceBenchmark = {
	schema_version: number
	metadata: {
		experiment_id: string
		description: string
		timestamp: string
		provider: string
		model: string
		hardware: string
		deployment_id: string
		kserve_manifest: string
		image: string
	}
	performance: Array<{ workload: PerformanceWorkload }>
}

export const QWEN35_27B_PERFORMANCE_BENCHMARK: ModelPerformanceBenchmark = {
	schema_version: 1,
	metadata: {
		experiment_id: '2026_04_22_1st_characterization',
		description:
			'Auto-generated performance benchmark YAML from full_results_dataframe.json for deployment qwen3.5-27b-azure-h100-1x-fp8-mtp.',
		timestamp: '2026-04-22T08:19:03Z',
		provider: 'Booster-hosted',
		model: 'Qwen/Qwen3.5-27B-FP8',
		hardware: 'azure-h100-1x',
		deployment_id: 'qwen3.5-27b-azure-h100-1x-fp8-mtp',
		kserve_manifest: 'examplemanifest.yaml',
		image: 'vllm/vllm-openai:v0.18.0',
	},
	performance: [
		{
			workload: {
				id: 'document_summarization',
				name: 'Document Summarization',
				token_dataset: 'spec_bench',
				distribution: 'doc_summarization-longbook_sum_p95_32k',
				input_tokens: { min: 10484, mean: 15418.9, max: 27378 },
				output_tokens: { min: 295, mean: 1062.55, max: 2124 },
				measurements: [
					{
						concurrency: 1,
						ttft_ms: 1358.868887,
						tokens_per_user_per_s: 149.618233,
						tokens_per_s: 149.618233,
						kjoules_per_req: 3.775889,
						kgC02_per_req: 0.209981,
					},
					{
						concurrency: 2,
						ttft_ms: 1657.047742,
						tokens_per_user_per_s: 110.634455,
						tokens_per_s: 221.26891,
						kjoules_per_req: 2.188181,
						kgC02_per_req: 0.121687,
					},
					{
						concurrency: 5,
						ttft_ms: 1954.140931,
						tokens_per_user_per_s: 68.673732,
						tokens_per_s: 343.368662,
						kjoules_per_req: 1.523187,
						kgC02_per_req: 0.084706,
					},
					{
						concurrency: 20,
						ttft_ms: 4714.59368,
						tokens_per_user_per_s: 19.677095,
						tokens_per_s: 393.541905,
						kjoules_per_req: 1.308923,
						kgC02_per_req: 0.072791,
					},
					{
						concurrency: 100,
						ttft_ms: 316820.128081,
						tokens_per_user_per_s: 2.68459,
						tokens_per_s: 268.459019,
						kjoules_per_req: 1.828692,
						kgC02_per_req: 0.101696,
					},
				],
			},
		},
		{
			workload: {
				id: 'document_summarization_long',
				name: 'Document Summarization Long',
				token_dataset: 'spec_bench',
				distribution: 'doc_summarization-longbook_sum_p95_128k',
				input_tokens: { min: 30198, mean: 57596.255, max: 190567 },
				output_tokens: { min: 165, mean: 1077.065, max: 2903 },
				measurements: [
					{
						concurrency: 1,
						ttft_ms: 5670.615723,
						tokens_per_user_per_s: 90.36934,
						tokens_per_s: 90.36934,
						kjoules_per_req: 6.360851,
						kgC02_per_req: 0.353734,
					},
					{
						concurrency: 2,
						ttft_ms: 7204.604781,
						tokens_per_user_per_s: 52.150851,
						tokens_per_s: 104.301702,
						kjoules_per_req: 4.841708,
						kgC02_per_req: 0.269253,
					},
					{
						concurrency: 5,
						ttft_ms: 8294.789087,
						tokens_per_user_per_s: 27.311752,
						tokens_per_s: 136.558758,
						kjoules_per_req: 3.891803,
						kgC02_per_req: 0.216427,
					},
					{
						concurrency: 20,
						ttft_ms: 244652.596852,
						tokens_per_user_per_s: 2.196397,
						tokens_per_s: 43.927934,
						kjoules_per_req: 10.479794,
						kgC02_per_req: 0.582793,
					},
				],
			},
		},
		{
			workload: {
				id: 'fixed_synth_bmark',
				name: 'Fixed Synth Bmark',
				token_dataset: 'spec_bench',
				distribution: 'synth-8k1k_fixed',
				input_tokens: { min: 8192, mean: 8192, max: 8192 },
				output_tokens: { min: 1024, mean: 1024, max: 1024 },
				measurements: [
					{
						concurrency: 1,
						ttft_ms: 726.003388,
						tokens_per_user_per_s: 143.074317,
						tokens_per_s: 143.074317,
						kjoules_per_req: 3.119963,
						kgC02_per_req: 0.173505,
					},
					{
						concurrency: 2,
						ttft_ms: 922.390621,
						tokens_per_user_per_s: 119.016462,
						tokens_per_s: 238.032923,
						kjoules_per_req: 1.935776,
						kgC02_per_req: 0.107651,
					},
					{
						concurrency: 5,
						ttft_ms: 1182.162087,
						tokens_per_user_per_s: 86.809918,
						tokens_per_s: 434.04959,
						kjoules_per_req: 1.122145,
						kgC02_per_req: 0.062404,
					},
					{
						concurrency: 20,
						ttft_ms: 2123.279531,
						tokens_per_user_per_s: 36.192739,
						tokens_per_s: 723.85478,
						kjoules_per_req: 0.670921,
						kgC02_per_req: 0.037311,
					},
					{
						concurrency: 100,
						ttft_ms: 75566.86606,
						tokens_per_user_per_s: 7.941675,
						tokens_per_s: 794.167459,
						kjoules_per_req: 0.610995,
						kgC02_per_req: 0.033978,
					},
				],
			},
		},
		{
			workload: {
				id: 'q_and_a',
				name: 'Q And A',
				token_dataset: 'spec_bench',
				distribution: 'QnA-QnA_multiround',
				input_tokens: { min: 47, mean: 432.1, max: 1144 },
				output_tokens: { min: 19, mean: 268.55, max: 744 },
				measurements: [
					{
						concurrency: 1,
						ttft_ms: 66.110115,
						tokens_per_user_per_s: 149.329934,
						tokens_per_s: 149.329934,
						kjoules_per_req: 1.060198,
						kgC02_per_req: 0.058959,
					},
					{
						concurrency: 2,
						ttft_ms: 97.207815,
						tokens_per_user_per_s: 133.218539,
						tokens_per_s: 266.437078,
						kjoules_per_req: 0.407209,
						kgC02_per_req: 0.022645,
					},
					{
						concurrency: 5,
						ttft_ms: 117.247547,
						tokens_per_user_per_s: 114.001088,
						tokens_per_s: 570.00544,
						kjoules_per_req: 0.231549,
						kgC02_per_req: 0.012877,
					},
					{
						concurrency: 20,
						ttft_ms: 255.37201,
						tokens_per_user_per_s: 63.687348,
						tokens_per_s: 1273.746961,
						kjoules_per_req: 0.08583,
						kgC02_per_req: 0.004773,
					},
					{
						concurrency: 100,
						ttft_ms: 3072.783876,
						tokens_per_user_per_s: 20.250581,
						tokens_per_s: 2025.058143,
						kjoules_per_req: 0.073411,
						kgC02_per_req: 0.004082,
					},
				],
			},
		},
	],
}

const MODEL_PERFORMANCE_BENCHMARKS: Record<string, ModelPerformanceBenchmark> =
	{
		'm-11': QWEN35_27B_PERFORMANCE_BENCHMARK,
	}

type ModelPerformanceLookup = {
	id: string
	hosting: string
}

export function getModelPerformanceBenchmark(
	model: ModelPerformanceLookup,
): ModelPerformanceBenchmark | null {
	return (
		MODEL_PERFORMANCE_BENCHMARKS[model.id] ??
		(model.hosting === 'Booster Powered'
			? QWEN35_27B_PERFORMANCE_BENCHMARK
			: null)
	)
}
