// Tenant
export const tenant = {
	name: 'The Space Dreams Pvt Ltd',
	accountType: 'Enterprise',
	tokenCredits: 2_450_000,
	tokenCreditsUsed: 1_620_000,
	monthlyBudget: 48_000,
	monthlySpend: 31_200,
	/** Requests served in current billing month (overview KPI). */
	requestsServed: 27_284,
}

// Endpoints
export const endpoints: Array<{
	id: string
	name: string
	type: 'Production' | 'POC' | 'Demo'
	defaultDeployment: string
	budgetUsed: number
	status: 'Deploying' | 'Running'
	monthlySpend: number
	inputTokens: number
	outputTokens: number
	endpoint: string
	tokenBudget: number
	/** Monthly budget cap in EUR (overview / portfolio cards). */
	monthlyBudgetEur: number
	performanceProfile: 'best-effort' | 'premium' | 'enterprise'
	/** Shown on endpoint detail header. */
	description?: string
}> = [
	{
		id: 'sp-1',
		name: 'Claims Processing',
		type: 'Production' as const,
		defaultDeployment: 'mistral-large-claims-v2',
		description:
			'Process insurance claims with structured extraction, fraud signals, and routing summaries for adjusters.',
		budgetUsed: 127,
		status: 'Running' as const,
		monthlySpend: 14_200,
		inputTokens: 2_840_000,
		outputTokens: 1_060_000,
		endpoint: 'https://api.booster.ai/v1/endpoints/claims-processing',
		tokenBudget: 5_000_000,
		monthlyBudgetEur: 4_200,
		performanceProfile: 'premium',
	},
	{
		id: 'sp-2',
		name: 'Contract Analysis',
		type: 'Production' as const,
		defaultDeployment: 'qwen-contracts',
		description:
			'Analyze legal contracts to identify key clauses, obligations, risks, and compliance requirements for legal review automation.',
		budgetUsed: 52,
		status: 'Running' as const,
		monthlySpend: 9_800,
		inputTokens: 1_520_000,
		outputTokens: 340_000,
		endpoint: 'https://api.booster.ai/v1/endpoints/contract-analysis',
		tokenBudget: 3_000_000,
		monthlyBudgetEur: 3_100,
		performanceProfile: 'enterprise',
	},
	{
		id: 'sp-3',
		name: 'Coding Copilot',
		type: 'Demo' as const,
		defaultDeployment: 'codestral-v1',
		description:
			'Assist engineers with inline completions, refactors, and explanations inside your IDE workflows.',
		budgetUsed: 75,
		status: 'Running' as const,
		monthlySpend: 4_200,
		inputTokens: 420_000,
		outputTokens: 255_000,
		endpoint: 'https://api.booster.ai/v1/endpoints/coding-copilot',
		tokenBudget: 1_500_000,
		monthlyBudgetEur: 1_800,
		performanceProfile: 'best-effort',
	},
	{
		id: 'sp-4',
		name: 'Customer Support Bot',
		type: 'POC' as const,
		defaultDeployment: 'mistral-large-support',
		description:
			'Resolve Tier‑1 tickets with grounded answers, handoffs, and macros aligned to your support playbook.',
		budgetUsed: 88,
		status: 'Running' as const,
		monthlySpend: 3_000,
		inputTokens: 580_000,
		outputTokens: 124_000,
		endpoint: 'https://api.booster.ai/v1/endpoints/customer-support',
		tokenBudget: 800_000,
		monthlyBudgetEur: 900,
		performanceProfile: 'best-effort',
	},
	{
		id: 'sp-default',
		name: 'Getting Started',
		type: 'POC' as const,
		defaultDeployment: '',
		description:
			'A starter inference endpoint for onboarding experiments before you deploy production workloads.',
		budgetUsed: 0,
		status: 'Running' as const,
		monthlySpend: 0,
		inputTokens: 0,
		outputTokens: 0,
		endpoint: 'https://api.booster.ai/v1/endpoints/getting-started',
		tokenBudget: 500_000,
		monthlyBudgetEur: 500,
		performanceProfile: 'best-effort',
	},
]

// Keep backward compat alias
export const spaces = endpoints

// Deployments per endpoint
export const deployments: Record<
	string,
	Array<{
		id: string
		name: string
		model: string
		version: string
		mode: 'Default' | 'Shadow' | 'Inactive' | 'Shared'
		budgetUsed: number
		slaStatus: 'OK' | 'At Risk' | 'Breach'
		region: string
		confidentialCompute: boolean
		latencyP50: number
		costPer1MTokens: number
	}>
> = {
	'sp-1': [
		{
			id: 'dep-1',
			name: 'mistral-large-claims-v2',
			model: 'Mistral Large',
			version: '2024-11',
			mode: 'Default',
			budgetUsed: 78,
			slaStatus: 'OK',
			region: 'EU-West',
			confidentialCompute: true,
			latencyP50: 320,
			costPer1MTokens: 2,
		},

		{
			id: 'dep-3',
			name: 'deepseek-claims-shadow-2',
			model: 'DeepSeek V3',
			version: '2024-12',
			mode: 'Inactive',
			budgetUsed: 5,
			slaStatus: 'OK',
			region: 'EU-West',
			confidentialCompute: false,
			latencyP50: 190,
			costPer1MTokens: 0.27,
		},
	],
	'sp-2': [
		{
			id: 'dep-4',
			name: 'qwen-contracts',
			model: 'Qwen 2.5 72B',
			version: '2024-09',
			mode: 'Default',
			budgetUsed: 62,
			slaStatus: 'OK',
			region: 'US-East',
			confidentialCompute: true,
			latencyP50: 410,
			costPer1MTokens: 1.5,
		},
		{
			id: 'dep-5',
			name: 'llama-70b-contracts-test',
			model: 'Llama 3.1 70B',
			version: '2024-07',
			mode: 'Inactive',
			budgetUsed: 0,
			slaStatus: 'OK',
			region: 'US-East',
			confidentialCompute: false,
			latencyP50: 520,
			costPer1MTokens: 0.9,
		},
	],
	'sp-3': [
		{
			id: 'dep-6',
			name: 'codestral-v1',
			model: 'Codestral',
			version: '2024-05',
			mode: 'Default',
			budgetUsed: 45,
			slaStatus: 'OK',
			region: 'EU-West',
			confidentialCompute: false,
			latencyP50: 150,
			costPer1MTokens: 1,
		},
	],
	'sp-4': [
		{
			id: 'dep-7',
			name: 'mistral-large-support',
			model: 'Mistral Large',
			version: '2024-11',
			mode: 'Default',
			budgetUsed: 88,
			slaStatus: 'At Risk',
			region: 'US-East',
			confidentialCompute: false,
			latencyP50: 680,
			costPer1MTokens: 2,
		},
	],
	'sp-default': [],
}

/** Recent inference requests per endpoint (Observe-style request logs, mock data). */
export type EndpointRequestLogEntry = {
	id: string
	timestamp: string
	latencyMs: number
	inputTokens: number
	outputTokens: number
	apiKeyId: string
}

export const endpointRequestLogs: Record<string, EndpointRequestLogEntry[]> = {
	'sp-1': [
		{
			id: 'req_cpk9n2x8',
			timestamp: '2026-05-26T15:00:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 418,
			inputTokens: 1_842,
			outputTokens: 612,
		},
		{
			id: 'req_cpk9mvd1',
			timestamp: '2026-05-26T14:40:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 392,
			inputTokens: 2_104,
			outputTokens: 884,
		},
		{
			id: 'req_cpk9lfzq',
			timestamp: '2026-05-26T14:20:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 12,
			inputTokens: 0,
			outputTokens: 0,
		},
		{
			id: 'req_cpk9k8hm',
			timestamp: '2026-05-26T14:00:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 511,
			inputTokens: 3_420,
			outputTokens: 1_208,
		},
		{
			id: 'req_cpk9j4bw',
			timestamp: '2026-05-26T13:40:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 30_120,
			inputTokens: 980,
			outputTokens: 0,
		},
		{
			id: 'req_cpk9hzr7',
			timestamp: '2026-05-26T13:35:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 445,
			inputTokens: 1_256,
			outputTokens: 340,
		},
		{
			id: 'req_cpk9gw03',
			timestamp: '2026-05-26T13:15:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 403,
			inputTokens: 1_920,
			outputTokens: 556,
		},
		{
			id: 'req_cpk9fv88',
			timestamp: '2026-05-26T12:55:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 467,
			inputTokens: 2_008,
			outputTokens: 604,
		},
		{
			id: 'req_cpk9eu42',
			timestamp: '2026-05-26T12:35:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 521,
			inputTokens: 3_102,
			outputTokens: 892,
		},
		{
			id: 'req_cpk9dt15',
			timestamp: '2026-05-26T12:15:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 389,
			inputTokens: 1_412,
			outputTokens: 298,
		},
		{
			id: 'req_cpk9cs97',
			timestamp: '2026-05-26T12:10:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 442,
			inputTokens: 1_678,
			outputTokens: 421,
		},
		{
			id: 'req_cpk9br61',
			timestamp: '2026-05-26T11:50:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 476,
			inputTokens: 2_210,
			outputTokens: 702,
		},
		{
			id: 'req_cpk9aq33',
			timestamp: '2026-05-26T11:30:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 355,
			inputTokens: 998,
			outputTokens: 214,
		},
		{
			id: 'req_cpk99pp8',
			timestamp: '2026-05-26T11:10:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 498,
			inputTokens: 2_884,
			outputTokens: 1_020,
		},
		{
			id: 'req_cpk98nn6',
			timestamp: '2026-05-26T10:50:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 431,
			inputTokens: 1_544,
			outputTokens: 388,
		},
		{
			id: 'req_cpk97mm4',
			timestamp: '2026-05-26T10:45:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 412,
			inputTokens: 1_722,
			outputTokens: 465,
		},
		{
			id: 'req_cpk96ll2',
			timestamp: '2026-05-26T10:25:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 584,
			inputTokens: 3_556,
			outputTokens: 1_104,
		},
		{
			id: 'req_cpk95kk0',
			timestamp: '2026-05-26T10:05:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 369,
			inputTokens: 1_288,
			outputTokens: 276,
		},
		{
			id: 'req_cpk94jj9',
			timestamp: '2026-05-26T09:45:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 453,
			inputTokens: 2_064,
			outputTokens: 591,
		},
		{
			id: 'req_cpk93ii7',
			timestamp: '2026-05-26T09:25:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 527,
			inputTokens: 2_998,
			outputTokens: 834,
		},
		{
			id: 'req_cpk92hh5',
			timestamp: '2026-05-26T09:20:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 401,
			inputTokens: 1_876,
			outputTokens: 502,
		},
		{
			id: 'req_cpk91gg4',
			timestamp: '2026-05-26T09:00:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 428,
			inputTokens: 1_640,
			outputTokens: 488,
		},
		{
			id: 'req_cpk90ff3',
			timestamp: '2026-05-26T08:40:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 395,
			inputTokens: 2_312,
			outputTokens: 640,
		},
		{
			id: 'req_cpk8zee2',
			timestamp: '2026-05-26T08:20:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 612,
			inputTokens: 3_088,
			outputTokens: 912,
		},
		{
			id: 'req_cpk8ydd1',
			timestamp: '2026-05-26T08:00:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 374,
			inputTokens: 1_104,
			outputTokens: 256,
		},
	],
	'sp-2': [
		{
			id: 'req_cpkaa001',
			timestamp: '2026-05-26T09:00:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 672,
			inputTokens: 4_800,
			outputTokens: 920,
		},
		{
			id: 'req_cpka9yy4',
			timestamp: '2026-05-26T08:40:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 589,
			inputTokens: 3_100,
			outputTokens: 1_440,
		},
		{
			id: 'req_cpka8zz2',
			timestamp: '2026-05-26T08:20:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 701,
			inputTokens: 5_020,
			outputTokens: 780,
		},
	],
	'sp-3': [
		{
			id: 'req_cpkb7aa3',
			timestamp: '2026-05-26T08:00:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 134,
			inputTokens: 312,
			outputTokens: 96,
		},
		{
			id: 'req_cpkb6bb1',
			timestamp: '2026-05-26T07:55:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 118,
			inputTokens: 288,
			outputTokens: 72,
		},
	],
	'sp-4': [
		{
			id: 'req_cpkc5cc9',
			timestamp: '2026-05-26T07:35:00.000Z',
			apiKeyId: 'key-default',
			latencyMs: 891,
			inputTokens: 2_200,
			outputTokens: 412,
		},
		{
			id: 'req_cpkc4dd8',
			timestamp: '2026-05-26T07:15:00.000Z',
			apiKeyId: 'key-1',
			latencyMs: 60_000,
			inputTokens: 1_050,
			outputTokens: 0,
		},
	],
	'sp-default': [],
}

// Model Cosmos models
export const models = [
	{
		id: 'm-3',
		name: 'Mistral Large',
		provider: 'Mistral AI',
		version: '2024-11',
		parameterSize: '123B' as const,
		description:
			"Mistral's flagship model delivering strong multilingual performance at competitive pricing, optimized for speed and efficiency.",
		domain: 'General Purpose',
		strengths: ['Cost Efficient', 'Multilingual', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 86,
				subs: [
					{ name: 'Logical Deduction', score: 87 },
					{ name: 'Mathematical', score: 83 },
					{ name: 'Causal Inference', score: 85 },
				],
			},
			{
				name: 'Language',
				score: 90,
				subs: [
					{ name: 'Summarization', score: 89 },
					{ name: 'Translation', score: 94 },
					{ name: 'Creative Writing', score: 85 },
				],
			},
			{
				name: 'Multilingual',
				score: 93,
				subs: [
					{ name: 'European Languages', score: 95 },
					{ name: 'Asian Languages', score: 88 },
					{ name: 'Code-switching', score: 91 },
				],
			},
			{
				name: 'Efficiency',
				score: 92,
				subs: [
					{ name: 'Throughput', score: 94 },
					{ name: 'Token Efficiency', score: 91 },
					{ name: 'Batch Processing', score: 90 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 81.2, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 73.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 83.7, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 88.1,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 89.4, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 68.9, maxScore: 100, category: 'Safety' },
		],
		popularity: '18.1k',
		inputCostPer1M: 0.89,
		outputCostPer1M: 1.2,
		contextLength: 128000,
		addedDate: '2024-11-05',
		tokensPerSecond: 105,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		quantization: 'INT8' as const,
		avgResponseTokens: 540,
		availableVersions: ['2024-11', '2024-07', '2024-02'],
		status: 'Active' as const,
	},
	{
		id: 'm-5',
		name: 'Codestral',
		provider: 'Mistral AI',
		version: '2024-05',
		parameterSize: '22B' as const,
		description:
			'Purpose-built for software engineering tasks — code generation, debugging, refactoring, and technical documentation.',
		domain: 'Code & Engineering',
		strengths: ['Code Generation', 'Debugging', 'Explanation'],
		capabilities: [
			{
				name: 'Code',
				score: 93,
				subs: [
					{ name: 'Generation', score: 95 },
					{ name: 'Debugging', score: 92 },
					{ name: 'Refactoring', score: 91 },
				],
			},
			{
				name: 'Language',
				score: 78,
				subs: [
					{ name: 'Technical Docs', score: 88 },
					{ name: 'Summarization', score: 75 },
					{ name: 'Creative Writing', score: 62 },
				],
			},
			{
				name: 'Reasoning',
				score: 84,
				subs: [
					{ name: 'Logical Deduction', score: 86 },
					{ name: 'Mathematical', score: 82 },
					{ name: 'Algorithmic', score: 88 },
				],
			},
			{
				name: 'Efficiency',
				score: 91,
				subs: [
					{ name: 'Throughput', score: 93 },
					{ name: 'Token Efficiency', score: 90 },
					{ name: 'Batch Processing', score: 89 },
				],
			},
		],
		benchmarks: [
			{ name: 'HumanEval', score: 92.4, maxScore: 100, category: 'Code' },
			{ name: 'MBPP', score: 88.6, maxScore: 100, category: 'Code' },
			{ name: 'DS-1000', score: 85.3, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 79.2, maxScore: 100, category: 'Math' },
			{ name: 'MMLU', score: 72.1, maxScore: 100, category: 'Knowledge' },
			{
				name: 'ARC-Challenge',
				score: 81.5,
				maxScore: 100,
				category: 'Reasoning',
			},
		],
		popularity: '31.2k',
		inputCostPer1M: 1,
		outputCostPer1M: 3,
		contextLength: 32000,
		addedDate: '2024-05-29',
		tokensPerSecond: 120,
		sustainability: 'A',
		category: 'Code',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 890,
		availableVersions: ['2024-05', '2024-01'],
		status: 'Active' as const,
	},
	{
		id: 'm-7',
		name: 'Llama 3.1 405B',
		provider: 'Meta',
		version: '2024-07',
		parameterSize: '405B' as const,
		description:
			"Meta's largest open-source model offering near-frontier performance with full customizability and self-hosting options.",
		domain: 'General Purpose',
		strengths: ['Open Source', 'Customizable', 'Reasoning'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 89,
				subs: [
					{ name: 'Logical Deduction', score: 90 },
					{ name: 'Mathematical', score: 87 },
					{ name: 'Causal Inference', score: 88 },
				],
			},
			{
				name: 'Language',
				score: 88,
				subs: [
					{ name: 'Summarization', score: 90 },
					{ name: 'Translation', score: 85 },
					{ name: 'Creative Writing', score: 87 },
				],
			},
			{
				name: 'Code',
				score: 86,
				subs: [
					{ name: 'Generation', score: 88 },
					{ name: 'Debugging', score: 84 },
					{ name: 'Explanation', score: 85 },
				],
			},
			{
				name: 'Customization',
				score: 95,
				subs: [
					{ name: 'Fine-tuning', score: 97 },
					{ name: 'Prompt Engineering', score: 93 },
					{ name: 'Domain Adaptation', score: 94 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 85.1, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 81.7, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 87.3, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 91.2,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 90.8, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 66.8, maxScore: 100, category: 'Safety' },
		],
		popularity: '5.1k',
		inputCostPer1M: 3,
		outputCostPer1M: 9,
		contextLength: 128000,
		addedDate: '2024-07-23',
		tokensPerSecond: 28,
		sustainability: 'B',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 620,
		availableVersions: ['2024-07', '2024-04'],
		status: 'Sunsetting' as const,
	},
	{
		id: 'm-9',
		name: 'Mistral Nemo',
		provider: 'Mistral AI',
		version: '2024-07',
		parameterSize: '12B' as const,
		description:
			'A compact 12B parameter model co-developed with NVIDIA, offering strong performance for its size with excellent efficiency.',
		domain: 'General Purpose',
		strengths: ['Compact', 'Efficient', 'Cost Effective'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 78,
				subs: [
					{ name: 'Logical Deduction', score: 79 },
					{ name: 'Mathematical', score: 75 },
					{ name: 'Causal Inference', score: 77 },
				],
			},
			{
				name: 'Language',
				score: 82,
				subs: [
					{ name: 'Summarization', score: 84 },
					{ name: 'Translation', score: 80 },
					{ name: 'Creative Writing', score: 78 },
				],
			},
			{
				name: 'Efficiency',
				score: 96,
				subs: [
					{ name: 'Throughput', score: 98 },
					{ name: 'Token Efficiency', score: 95 },
					{ name: 'Batch Processing', score: 94 },
				],
			},
			{
				name: 'Multilingual',
				score: 85,
				subs: [
					{ name: 'European Languages', score: 88 },
					{ name: 'Asian Languages', score: 80 },
					{ name: 'Code-switching', score: 84 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 68.0, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 65.2, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 71.4, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 76.8,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 80.1, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 62.5, maxScore: 100, category: 'Safety' },
		],
		popularity: '14.7k',
		inputCostPer1M: 0.3,
		outputCostPer1M: 0.3,
		contextLength: 128000,
		addedDate: '2024-07-18',
		tokensPerSecond: 185,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 380,
		availableVersions: ['2024-07'],
		status: 'Active' as const,
	},
	{
		id: 'm-10',
		name: 'Llama 3.1 70B',
		provider: 'Meta',
		version: '2024-07',
		parameterSize: '70B' as const,
		description:
			"Meta's mid-size open-source model balancing strong reasoning with fast inference, ideal for production workloads.",
		domain: 'General Purpose',
		strengths: ['Balanced', 'Open Source', 'Fast'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 84,
				subs: [
					{ name: 'Logical Deduction', score: 85 },
					{ name: 'Mathematical', score: 82 },
					{ name: 'Causal Inference', score: 83 },
				],
			},
			{
				name: 'Language',
				score: 86,
				subs: [
					{ name: 'Summarization', score: 88 },
					{ name: 'Translation', score: 83 },
					{ name: 'Creative Writing', score: 84 },
				],
			},
			{
				name: 'Code',
				score: 82,
				subs: [
					{ name: 'Generation', score: 84 },
					{ name: 'Debugging', score: 80 },
					{ name: 'Explanation', score: 81 },
				],
			},
			{
				name: 'Efficiency',
				score: 90,
				subs: [
					{ name: 'Throughput', score: 92 },
					{ name: 'Token Efficiency', score: 89 },
					{ name: 'Batch Processing', score: 88 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 79.3, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 76.8, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 82.1, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 86.4,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 87.2, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 63.7, maxScore: 100, category: 'Safety' },
		],
		popularity: '22.3k',
		inputCostPer1M: 0.9,
		outputCostPer1M: 0.9,
		contextLength: 128000,
		addedDate: '2024-07-23',
		tokensPerSecond: 72,
		sustainability: 'A',
		category: 'General',
		hosting: 'Scaleway' as const,
		quantization: 'INT8' as const,
		avgResponseTokens: 520,
		availableVersions: ['2024-07', '2024-04'],
		status: 'Active' as const,
	},
	{
		id: 'm-11',
		name: 'Qwen 2.5 72B',
		provider: 'Alibaba',
		version: '2024-09',
		parameterSize: '72B' as const,
		description:
			"Alibaba's powerful open-source model with exceptional multilingual and mathematical capabilities across 29+ languages.",
		domain: 'General Purpose',
		strengths: ['Multilingual', 'Mathematics', 'Open Source'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 87,
				subs: [
					{ name: 'Logical Deduction', score: 88 },
					{ name: 'Mathematical', score: 91 },
					{ name: 'Causal Inference', score: 84 },
				],
			},
			{
				name: 'Language',
				score: 89,
				subs: [
					{ name: 'Summarization', score: 90 },
					{ name: 'Translation', score: 92 },
					{ name: 'Creative Writing', score: 83 },
				],
			},
			{
				name: 'Multilingual',
				score: 94,
				subs: [
					{ name: 'European Languages', score: 93 },
					{ name: 'Asian Languages', score: 97 },
					{ name: 'Code-switching', score: 90 },
				],
			},
			{
				name: 'Code',
				score: 85,
				subs: [
					{ name: 'Generation', score: 87 },
					{ name: 'Debugging', score: 83 },
					{ name: 'Explanation', score: 84 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 83.5, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 79.4, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 91.6, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 89.3,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 88.7, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 67.2, maxScore: 100, category: 'Safety' },
		],
		popularity: '8.9k',
		inputCostPer1M: 1.5,
		outputCostPer1M: 4,
		contextLength: 128000,
		addedDate: '2024-09-19',
		tokensPerSecond: 65,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 590,
		availableVersions: ['2024-09', '2024-06'],
		status: 'Beta' as const,
	},
	{
		id: 'm-12',
		name: 'DeepSeek V3',
		provider: 'DeepSeek',
		version: '2024-12',
		parameterSize: '671B' as const,
		description:
			'A highly efficient open-source model with mixture-of-experts architecture, delivering frontier-level reasoning at low cost.',
		domain: 'General Purpose',
		strengths: ['Reasoning', 'Cost Efficient', 'MoE Architecture'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 92,
				subs: [
					{ name: 'Logical Deduction', score: 93 },
					{ name: 'Mathematical', score: 94 },
					{ name: 'Causal Inference', score: 90 },
				],
			},
			{
				name: 'Language',
				score: 88,
				subs: [
					{ name: 'Summarization', score: 89 },
					{ name: 'Translation', score: 87 },
					{ name: 'Creative Writing', score: 86 },
				],
			},
			{
				name: 'Code',
				score: 90,
				subs: [
					{ name: 'Generation', score: 92 },
					{ name: 'Debugging', score: 89 },
					{ name: 'Explanation', score: 88 },
				],
			},
			{
				name: 'Efficiency',
				score: 94,
				subs: [
					{ name: 'Throughput', score: 95 },
					{ name: 'Token Efficiency', score: 96 },
					{ name: 'Batch Processing', score: 92 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 87.1, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 89.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 93.8, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 94.2,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 92.1, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 71.3, maxScore: 100, category: 'Safety' },
		],
		popularity: '15.6k',
		inputCostPer1M: 0.27,
		outputCostPer1M: 1.1,
		contextLength: 128000,
		addedDate: '2024-12-26',
		tokensPerSecond: 95,
		sustainability: 'A',
		category: 'General',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 650,
		availableVersions: ['2024-12'],
		status: 'Beta' as const,
	},
	{
		id: 'm-13',
		name: 'Mixtral 8x22B',
		provider: 'Mistral AI',
		version: '2024-04',
		parameterSize: '141B' as const,
		description:
			"Mistral's sparse mixture-of-experts model offering excellent throughput and quality, ideal for high-volume enterprise workloads.",
		domain: 'Enterprise & RAG',
		strengths: ['RAG', 'Enterprise', 'Throughput'],
		capabilities: [
			{
				name: 'RAG',
				score: 91,
				subs: [
					{ name: 'Retrieval Accuracy', score: 93 },
					{ name: 'Citation Quality', score: 89 },
					{ name: 'Source Synthesis', score: 90 },
				],
			},
			{
				name: 'Language',
				score: 86,
				subs: [
					{ name: 'Summarization', score: 88 },
					{ name: 'Translation', score: 85 },
					{ name: 'Structured Extraction', score: 87 },
				],
			},
			{
				name: 'Efficiency',
				score: 93,
				subs: [
					{ name: 'Throughput', score: 95 },
					{ name: 'Token Efficiency', score: 92 },
					{ name: 'Batch Processing', score: 91 },
				],
			},
			{
				name: 'Reasoning',
				score: 83,
				subs: [
					{ name: 'Logical Deduction', score: 84 },
					{ name: 'Mathematical', score: 80 },
					{ name: 'Causal Inference', score: 83 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 77.8, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 70.6, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 76.3, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 85.9,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 86.4, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 65.8, maxScore: 100, category: 'Safety' },
		],
		popularity: '11.2k',
		inputCostPer1M: 2,
		outputCostPer1M: 6,
		contextLength: 65000,
		addedDate: '2024-04-17',
		tokensPerSecond: 88,
		sustainability: 'A',
		category: 'Enterprise',
		hosting: 'EUrouter' as const,
		quantization: 'INT4' as const,
		avgResponseTokens: 560,
		availableVersions: ['2024-04'],
		status: 'Deprecated' as const,
	},
	{
		id: 'm-14',
		name: 'GPT-4o',
		provider: 'OpenAI',
		version: '2024-08',
		parameterSize: '200B' as const,
		description:
			'Flagship multimodal model with strong reasoning, vision, and tool use for production assistants.',
		domain: 'General Purpose',
		strengths: ['Reasoning', 'Multilingual', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 91,
				subs: [
					{ name: 'Logical Deduction', score: 92 },
					{ name: 'Mathematical', score: 90 },
					{ name: 'Causal Inference', score: 90 },
				],
			},
			{
				name: 'Language',
				score: 92,
				subs: [
					{ name: 'Summarization', score: 91 },
					{ name: 'Translation', score: 90 },
					{ name: 'Creative Writing', score: 92 },
				],
			},
			{
				name: 'Code',
				score: 88,
				subs: [
					{ name: 'Generation', score: 90 },
					{ name: 'Debugging', score: 86 },
					{ name: 'Explanation', score: 87 },
				],
			},
			{
				name: 'Efficiency',
				score: 85,
				subs: [
					{ name: 'Throughput', score: 86 },
					{ name: 'Token Efficiency', score: 84 },
					{ name: 'Batch Processing', score: 84 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 88.7, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 90.2, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 93.1, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 92.8,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 89.1, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 72.4, maxScore: 100, category: 'Safety' },
		],
		popularity: '42.1k',
		inputCostPer1M: 4.5,
		outputCostPer1M: 13.5,
		contextLength: 128000,
		addedDate: '2024-08-12',
		tokensPerSecond: 78,
		sustainability: 'B',
		category: 'General',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 480,
		availableVersions: ['2024-08'],
		status: 'Active' as const,
	},
	{
		id: 'm-15',
		name: 'GPT-4 Turbo',
		provider: 'OpenAI',
		version: '2024-04',
		parameterSize: '175B' as const,
		description:
			'Large-context workhorse for agents, retrieval, and long document workflows.',
		domain: 'General Purpose',
		strengths: ['Long Context', 'Analysis', 'Tool Use'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 88,
				subs: [
					{ name: 'Logical Deduction', score: 89 },
					{ name: 'Mathematical', score: 86 },
					{ name: 'Causal Inference', score: 87 },
				],
			},
			{
				name: 'Language',
				score: 90,
				subs: [
					{ name: 'Summarization', score: 92 },
					{ name: 'Translation', score: 88 },
					{ name: 'Creative Writing', score: 89 },
				],
			},
			{
				name: 'Code',
				score: 86,
				subs: [
					{ name: 'Generation', score: 87 },
					{ name: 'Debugging', score: 85 },
					{ name: 'Explanation', score: 85 },
				],
			},
			{
				name: 'Efficiency',
				score: 82,
				subs: [
					{ name: 'Throughput', score: 83 },
					{ name: 'Token Efficiency', score: 81 },
					{ name: 'Batch Processing', score: 81 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 86.5, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 88.0, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 91.4, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 91.0,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 88.0, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 70.1, maxScore: 100, category: 'Safety' },
		],
		popularity: '36.8k',
		inputCostPer1M: 8,
		outputCostPer1M: 24,
		contextLength: 128000,
		addedDate: '2024-04-09',
		tokensPerSecond: 55,
		sustainability: 'C',
		category: 'General',
		hosting: 'EUrouter' as const,
		avgResponseTokens: 720,
		availableVersions: ['2024-04'],
		status: 'Active' as const,
	},
	{
		id: 'm-16',
		name: 'Gemini 1.5 Pro',
		provider: 'Google',
		version: '2024-05',
		parameterSize: '175B' as const,
		description:
			'Long-context Gemini variant tuned for research, summarization, and multimodal understanding.',
		domain: 'General Purpose',
		strengths: ['Long Context', 'Analysis', 'Multilingual'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 87,
				subs: [
					{ name: 'Logical Deduction', score: 88 },
					{ name: 'Mathematical', score: 86 },
					{ name: 'Causal Inference', score: 86 },
				],
			},
			{
				name: 'Language',
				score: 89,
				subs: [
					{ name: 'Summarization', score: 91 },
					{ name: 'Translation', score: 88 },
					{ name: 'Creative Writing', score: 87 },
				],
			},
			{
				name: 'Code',
				score: 84,
				subs: [
					{ name: 'Generation', score: 85 },
					{ name: 'Debugging', score: 82 },
					{ name: 'Explanation', score: 84 },
				],
			},
			{
				name: 'Multilingual',
				score: 90,
				subs: [
					{ name: 'European Languages', score: 89 },
					{ name: 'Asian Languages', score: 91 },
					{ name: 'Code-switching', score: 88 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 85.9, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 84.1, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 89.0, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 89.5,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 87.3, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 68.2, maxScore: 100, category: 'Safety' },
		],
		popularity: '19.4k',
		inputCostPer1M: 2.5,
		outputCostPer1M: 7.5,
		contextLength: 1000000,
		addedDate: '2024-05-14',
		tokensPerSecond: 48,
		sustainability: 'B',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		quantization: 'INT8' as const,
		avgResponseTokens: 890,
		availableVersions: ['2024-05'],
		status: 'Active' as const,
	},
	{
		id: 'm-17',
		name: 'Gemini 1.5 Flash',
		provider: 'Google',
		version: '2024-06',
		parameterSize: '8B' as const,
		description:
			'Fast, cost-efficient Gemini for high-volume chat, classification, and extraction.',
		domain: 'General Purpose',
		strengths: ['Speed', 'Cost Efficient', 'Throughput'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 80,
				subs: [
					{ name: 'Logical Deduction', score: 81 },
					{ name: 'Mathematical', score: 78 },
					{ name: 'Causal Inference', score: 80 },
				],
			},
			{
				name: 'Language',
				score: 85,
				subs: [
					{ name: 'Summarization', score: 86 },
					{ name: 'Translation', score: 84 },
					{ name: 'Creative Writing', score: 83 },
				],
			},
			{
				name: 'Code',
				score: 79,
				subs: [
					{ name: 'Generation', score: 80 },
					{ name: 'Debugging', score: 77 },
					{ name: 'Explanation', score: 79 },
				],
			},
			{
				name: 'Efficiency',
				score: 94,
				subs: [
					{ name: 'Throughput', score: 96 },
					{ name: 'Token Efficiency', score: 93 },
					{ name: 'Batch Processing', score: 92 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 78.9, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 77.2, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 81.5, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 83.6,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 84.2, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 65.0, maxScore: 100, category: 'Safety' },
		],
		popularity: '28.0k',
		inputCostPer1M: 0.35,
		outputCostPer1M: 1.05,
		contextLength: 1000000,
		addedDate: '2024-06-20',
		tokensPerSecond: 210,
		sustainability: 'A',
		category: 'General',
		hosting: 'EUrouter' as const,
		avgResponseTokens: 340,
		availableVersions: ['2024-06'],
		status: 'Active' as const,
	},
	{
		id: 'm-18',
		name: 'Gemma 2 27B',
		provider: 'Google',
		version: '2024-06',
		parameterSize: '27B' as const,
		description:
			'Open-weights Gemma family model balancing quality and deployability on modest hardware.',
		domain: 'General Purpose',
		strengths: ['Open Source', 'Cost Efficient', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 82,
				subs: [
					{ name: 'Logical Deduction', score: 83 },
					{ name: 'Mathematical', score: 80 },
					{ name: 'Causal Inference', score: 82 },
				],
			},
			{
				name: 'Language',
				score: 84,
				subs: [
					{ name: 'Summarization', score: 85 },
					{ name: 'Translation', score: 83 },
					{ name: 'Creative Writing', score: 83 },
				],
			},
			{
				name: 'Code',
				score: 81,
				subs: [
					{ name: 'Generation', score: 82 },
					{ name: 'Debugging', score: 79 },
					{ name: 'Explanation', score: 81 },
				],
			},
			{
				name: 'Efficiency',
				score: 88,
				subs: [
					{ name: 'Throughput', score: 90 },
					{ name: 'Token Efficiency', score: 87 },
					{ name: 'Batch Processing', score: 86 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 75.2, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 75.0, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 80.6, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 84.4,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 85.1, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 64.3, maxScore: 100, category: 'Safety' },
		],
		popularity: '12.3k',
		inputCostPer1M: 0.2,
		outputCostPer1M: 0.2,
		contextLength: 8192,
		addedDate: '2024-06-27',
		tokensPerSecond: 145,
		sustainability: 'A',
		category: 'General',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 410,
		availableVersions: ['2024-06'],
		status: 'Active' as const,
	},
	{
		id: 'm-19',
		name: 'EuroLLM 9B',
		provider: 'EuroLLM',
		version: '2024-10',
		parameterSize: '9B' as const,
		description:
			'EU-centric open model emphasizing multilingual coverage across official EU languages.',
		domain: 'General Purpose',
		strengths: ['Multilingual', 'Cost Efficient', 'Compliance'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 76,
				subs: [
					{ name: 'Logical Deduction', score: 77 },
					{ name: 'Mathematical', score: 73 },
					{ name: 'Causal Inference', score: 76 },
				],
			},
			{
				name: 'Language',
				score: 81,
				subs: [
					{ name: 'Summarization', score: 82 },
					{ name: 'Translation', score: 84 },
					{ name: 'Creative Writing', score: 78 },
				],
			},
			{
				name: 'Multilingual',
				score: 88,
				subs: [
					{ name: 'European Languages', score: 91 },
					{ name: 'Asian Languages', score: 72 },
					{ name: 'Code-switching', score: 85 },
				],
			},
			{
				name: 'Efficiency',
				score: 90,
				subs: [
					{ name: 'Throughput', score: 91 },
					{ name: 'Token Efficiency', score: 89 },
					{ name: 'Batch Processing', score: 89 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 70.5, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 68.4, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 74.2, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 78.1,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 79.8, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 61.0, maxScore: 100, category: 'Safety' },
		],
		popularity: '4.2k',
		inputCostPer1M: 0.15,
		outputCostPer1M: 0.45,
		contextLength: 8192,
		addedDate: '2024-10-02',
		tokensPerSecond: 175,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 360,
		availableVersions: ['2024-10'],
		status: 'Active' as const,
	},
	{
		id: 'm-20',
		name: 'EuroLLM 70B',
		provider: 'EuroLLM',
		version: '2024-10',
		parameterSize: '70B' as const,
		description:
			'Larger EuroLLM variant for enterprise assistants requiring stronger reasoning and grounding.',
		domain: 'Enterprise & RAG',
		strengths: ['RAG', 'Enterprise', 'Multilingual'],
		capabilities: [
			{
				name: 'RAG',
				score: 86,
				subs: [
					{ name: 'Retrieval Accuracy', score: 87 },
					{ name: 'Citation Quality', score: 85 },
					{ name: 'Source Synthesis', score: 85 },
				],
			},
			{
				name: 'Reasoning',
				score: 83,
				subs: [
					{ name: 'Logical Deduction', score: 84 },
					{ name: 'Mathematical', score: 81 },
					{ name: 'Causal Inference', score: 83 },
				],
			},
			{
				name: 'Language',
				score: 85,
				subs: [
					{ name: 'Summarization', score: 86 },
					{ name: 'Translation', score: 87 },
					{ name: 'Structured Extraction', score: 84 },
				],
			},
			{
				name: 'Efficiency',
				score: 82,
				subs: [
					{ name: 'Throughput', score: 83 },
					{ name: 'Token Efficiency', score: 81 },
					{ name: 'Batch Processing', score: 81 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 78.0, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 74.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 82.8, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 85.2,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 84.9, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 66.5, maxScore: 100, category: 'Safety' },
		],
		popularity: '3.1k',
		inputCostPer1M: 1.1,
		outputCostPer1M: 3.3,
		contextLength: 32768,
		addedDate: '2024-10-15',
		tokensPerSecond: 62,
		sustainability: 'B',
		category: 'Enterprise',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 510,
		availableVersions: ['2024-10'],
		status: 'Beta' as const,
	},
	{
		id: 'm-21',
		name: 'Multiverse Core',
		provider: 'Multiverse',
		version: '2024-09',
		parameterSize: '72B' as const,
		description:
			'General frontier-class model from Multiverse AI for balanced quality and latency.',
		domain: 'General Purpose',
		strengths: ['Balanced', 'Speed', 'Reasoning'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 88,
				subs: [
					{ name: 'Logical Deduction', score: 89 },
					{ name: 'Mathematical', score: 86 },
					{ name: 'Causal Inference', score: 88 },
				],
			},
			{
				name: 'Language',
				score: 87,
				subs: [
					{ name: 'Summarization', score: 88 },
					{ name: 'Translation', score: 86 },
					{ name: 'Creative Writing', score: 86 },
				],
			},
			{
				name: 'Code',
				score: 85,
				subs: [
					{ name: 'Generation', score: 86 },
					{ name: 'Debugging', score: 83 },
					{ name: 'Explanation', score: 85 },
				],
			},
			{
				name: 'Efficiency',
				score: 86,
				subs: [
					{ name: 'Throughput', score: 88 },
					{ name: 'Token Efficiency', score: 85 },
					{ name: 'Batch Processing', score: 84 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 84.2, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 85.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 88.7, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 88.9,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 87.5, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 69.8, maxScore: 100, category: 'Safety' },
		],
		popularity: '6.7k',
		inputCostPer1M: 2.2,
		outputCostPer1M: 6.6,
		contextLength: 128000,
		addedDate: '2024-09-05',
		tokensPerSecond: 92,
		sustainability: 'B',
		category: 'General',
		hosting: 'EUrouter' as const,
		avgResponseTokens: 470,
		availableVersions: ['2024-09'],
		status: 'Active' as const,
	},
	{
		id: 'm-22',
		name: 'Multiverse Edge',
		provider: 'Multiverse',
		version: '2024-11',
		parameterSize: '7B' as const,
		description:
			'Edge-optimized Multiverse model for low-latency assistants and mobile backends.',
		domain: 'General Purpose',
		strengths: ['Speed', 'Cost Efficient', 'Throughput'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 78,
				subs: [
					{ name: 'Logical Deduction', score: 79 },
					{ name: 'Mathematical', score: 75 },
					{ name: 'Causal Inference', score: 78 },
				],
			},
			{
				name: 'Language',
				score: 80,
				subs: [
					{ name: 'Summarization', score: 81 },
					{ name: 'Translation', score: 79 },
					{ name: 'Creative Writing', score: 79 },
				],
			},
			{
				name: 'Code',
				score: 76,
				subs: [
					{ name: 'Generation', score: 77 },
					{ name: 'Debugging', score: 74 },
					{ name: 'Explanation', score: 76 },
				],
			},
			{
				name: 'Efficiency',
				score: 95,
				subs: [
					{ name: 'Throughput', score: 97 },
					{ name: 'Token Efficiency', score: 94 },
					{ name: 'Batch Processing', score: 93 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 72.1, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 72.8, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 77.5, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 80.2,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 82.0, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 63.4, maxScore: 100, category: 'Safety' },
		],
		popularity: '5.4k',
		inputCostPer1M: 0.45,
		outputCostPer1M: 1.35,
		contextLength: 32000,
		addedDate: '2024-11-08',
		tokensPerSecond: 240,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 280,
		availableVersions: ['2024-11'],
		status: 'Active' as const,
	},
	{
		id: 'm-23',
		name: 'Mistral Small',
		provider: 'Mistral AI',
		version: '2024-11',
		parameterSize: '22B' as const,
		description:
			'Compact Mistral model for cost-sensitive workloads with solid multilingual coverage.',
		domain: 'General Purpose',
		strengths: ['Cost Efficient', 'Multilingual', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 74,
				subs: [
					{ name: 'Logical Deduction', score: 75 },
					{ name: 'Mathematical', score: 71 },
					{ name: 'Causal Inference', score: 75 },
				],
			},
			{
				name: 'Language',
				score: 79,
				subs: [
					{ name: 'Summarization', score: 80 },
					{ name: 'Translation', score: 78 },
					{ name: 'Creative Writing', score: 78 },
				],
			},
			{
				name: 'Multilingual',
				score: 82,
				subs: [
					{ name: 'European Languages', score: 84 },
					{ name: 'Asian Languages', score: 76 },
					{ name: 'Code-switching', score: 81 },
				],
			},
			{
				name: 'Efficiency',
				score: 91,
				subs: [
					{ name: 'Throughput', score: 93 },
					{ name: 'Token Efficiency', score: 90 },
					{ name: 'Batch Processing', score: 89 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 69.8, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 70.1, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 76.0, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 79.5,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 81.2, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 62.8, maxScore: 100, category: 'Safety' },
		],
		popularity: '21.5k',
		inputCostPer1M: 0.18,
		outputCostPer1M: 0.55,
		contextLength: 32000,
		addedDate: '2024-11-18',
		tokensPerSecond: 195,
		sustainability: 'A',
		category: 'General',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 320,
		availableVersions: ['2024-11'],
		status: 'Active' as const,
	},
	{
		id: 'm-24',
		name: 'Mixtral 8x7B',
		provider: 'Mistral AI',
		version: '2023-12',
		parameterSize: '47B' as const,
		description:
			'Classic sparse MoE model — strong quality per euro for batch and offline workloads.',
		domain: 'General Purpose',
		strengths: ['Cost Efficient', 'Throughput', 'Open Weights'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 79,
				subs: [
					{ name: 'Logical Deduction', score: 80 },
					{ name: 'Mathematical', score: 76 },
					{ name: 'Causal Inference', score: 79 },
				],
			},
			{
				name: 'Language',
				score: 81,
				subs: [
					{ name: 'Summarization', score: 82 },
					{ name: 'Translation', score: 80 },
					{ name: 'Creative Writing', score: 80 },
				],
			},
			{
				name: 'Code',
				score: 78,
				subs: [
					{ name: 'Generation', score: 79 },
					{ name: 'Debugging', score: 76 },
					{ name: 'Explanation', score: 78 },
				],
			},
			{
				name: 'Efficiency',
				score: 89,
				subs: [
					{ name: 'Throughput', score: 91 },
					{ name: 'Token Efficiency', score: 88 },
					{ name: 'Batch Processing', score: 87 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 70.6, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 74.8, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 74.4, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 81.0,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 83.3, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 61.5, maxScore: 100, category: 'Safety' },
		],
		popularity: '33.0k',
		inputCostPer1M: 0.24,
		outputCostPer1M: 0.24,
		contextLength: 32768,
		addedDate: '2023-12-11',
		tokensPerSecond: 125,
		sustainability: 'B',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 440,
		availableVersions: ['2023-12'],
		status: 'Sunsetting' as const,
	},
	{
		id: 'm-25',
		name: 'Llama 3.2 3B',
		provider: 'Meta',
		version: '2024-09',
		parameterSize: '3B' as const,
		description:
			'Tiny Llama 3.2 for on-device and ultra-low-latency inference.',
		domain: 'General Purpose',
		strengths: ['Speed', 'Cost Efficient', 'Open Source'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 68,
				subs: [
					{ name: 'Logical Deduction', score: 69 },
					{ name: 'Mathematical', score: 64 },
					{ name: 'Causal Inference', score: 68 },
				],
			},
			{
				name: 'Language',
				score: 72,
				subs: [
					{ name: 'Summarization', score: 73 },
					{ name: 'Translation', score: 70 },
					{ name: 'Creative Writing', score: 71 },
				],
			},
			{
				name: 'Code',
				score: 65,
				subs: [
					{ name: 'Generation', score: 66 },
					{ name: 'Debugging', score: 62 },
					{ name: 'Explanation', score: 65 },
				],
			},
			{
				name: 'Efficiency',
				score: 97,
				subs: [
					{ name: 'Throughput', score: 98 },
					{ name: 'Token Efficiency', score: 97 },
					{ name: 'Batch Processing', score: 95 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 63.4, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 62.0, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 66.8, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 71.2,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 74.5, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 58.1, maxScore: 100, category: 'Safety' },
		],
		popularity: '17.8k',
		inputCostPer1M: 0.05,
		outputCostPer1M: 0.15,
		contextLength: 128000,
		addedDate: '2024-09-25',
		tokensPerSecond: 320,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 220,
		availableVersions: ['2024-09'],
		status: 'Active' as const,
	},
	{
		id: 'm-26',
		name: 'Llama 3.2 90B Vision',
		provider: 'Meta',
		version: '2024-09',
		parameterSize: '90B' as const,
		description:
			'Vision-capable Llama 3.2 for image+text assistants and document understanding.',
		domain: 'General Purpose',
		strengths: ['Multimodal', 'Reasoning', 'Open Source'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 85,
				subs: [
					{ name: 'Logical Deduction', score: 86 },
					{ name: 'Mathematical', score: 83 },
					{ name: 'Causal Inference', score: 85 },
				],
			},
			{
				name: 'Language',
				score: 84,
				subs: [
					{ name: 'Summarization', score: 85 },
					{ name: 'Translation', score: 82 },
					{ name: 'Creative Writing', score: 83 },
				],
			},
			{
				name: 'Code',
				score: 80,
				subs: [
					{ name: 'Generation', score: 81 },
					{ name: 'Debugging', score: 78 },
					{ name: 'Explanation', score: 80 },
				],
			},
			{
				name: 'Efficiency',
				score: 78,
				subs: [
					{ name: 'Throughput', score: 79 },
					{ name: 'Token Efficiency', score: 77 },
					{ name: 'Batch Processing', score: 77 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 80.1, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 78.4, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 84.2, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 86.0,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 85.5, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 65.2, maxScore: 100, category: 'Safety' },
		],
		popularity: '9.9k',
		inputCostPer1M: 1.8,
		outputCostPer1M: 5.4,
		contextLength: 128000,
		addedDate: '2024-09-25',
		tokensPerSecond: 58,
		sustainability: 'B',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 540,
		availableVersions: ['2024-09'],
		status: 'Active' as const,
	},
	{
		id: 'm-27',
		name: 'Qwen 2 7B',
		provider: 'Alibaba',
		version: '2024-06',
		parameterSize: '7B' as const,
		description:
			'Efficient Qwen 2 checkpoint for extraction, chat, and edge deployment.',
		domain: 'General Purpose',
		strengths: ['Cost Efficient', 'Multilingual', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 72,
				subs: [
					{ name: 'Logical Deduction', score: 73 },
					{ name: 'Mathematical', score: 70 },
					{ name: 'Causal Inference', score: 72 },
				],
			},
			{
				name: 'Language',
				score: 76,
				subs: [
					{ name: 'Summarization', score: 77 },
					{ name: 'Translation', score: 78 },
					{ name: 'Creative Writing', score: 74 },
				],
			},
			{
				name: 'Multilingual',
				score: 84,
				subs: [
					{ name: 'European Languages', score: 82 },
					{ name: 'Asian Languages', score: 88 },
					{ name: 'Code-switching', score: 80 },
				],
			},
			{
				name: 'Code',
				score: 73,
				subs: [
					{ name: 'Generation', score: 74 },
					{ name: 'Debugging', score: 71 },
					{ name: 'Explanation', score: 73 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 67.2, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 68.9, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 75.5, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 76.4,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 78.8, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 60.5, maxScore: 100, category: 'Safety' },
		],
		popularity: '11.1k',
		inputCostPer1M: 0.12,
		outputCostPer1M: 0.36,
		contextLength: 131072,
		addedDate: '2024-06-07',
		tokensPerSecond: 205,
		sustainability: 'A',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 300,
		availableVersions: ['2024-06'],
		status: 'Active' as const,
	},
	{
		id: 'm-28',
		name: 'Qwen 2.5 32B',
		provider: 'Alibaba',
		version: '2024-09',
		parameterSize: '32B' as const,
		description:
			'Mid-size Qwen 2.5 with strong math and code for agentic workflows.',
		domain: 'General Purpose',
		strengths: ['Reasoning', 'Mathematics', 'Code Generation'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 84,
				subs: [
					{ name: 'Logical Deduction', score: 85 },
					{ name: 'Mathematical', score: 87 },
					{ name: 'Causal Inference', score: 82 },
				],
			},
			{
				name: 'Language',
				score: 83,
				subs: [
					{ name: 'Summarization', score: 84 },
					{ name: 'Translation', score: 85 },
					{ name: 'Creative Writing', score: 80 },
				],
			},
			{
				name: 'Code',
				score: 86,
				subs: [
					{ name: 'Generation', score: 87 },
					{ name: 'Debugging', score: 84 },
					{ name: 'Explanation', score: 86 },
				],
			},
			{
				name: 'Multilingual',
				score: 90,
				subs: [
					{ name: 'European Languages', score: 88 },
					{ name: 'Asian Languages', score: 93 },
					{ name: 'Code-switching', score: 87 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 79.5, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 82.1, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 88.9, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 86.7,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 86.2, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 66.0, maxScore: 100, category: 'Safety' },
		],
		popularity: '14.4k',
		inputCostPer1M: 0.8,
		outputCostPer1M: 2.4,
		contextLength: 131072,
		addedDate: '2024-09-19',
		tokensPerSecond: 88,
		sustainability: 'A',
		category: 'General',
		hosting: 'Scaleway' as const,
		avgResponseTokens: 450,
		availableVersions: ['2024-09'],
		status: 'Active' as const,
	},
	{
		id: 'm-29',
		name: 'DeepSeek Coder V2',
		provider: 'DeepSeek',
		version: '2024-06',
		parameterSize: '236B' as const,
		description:
			'Code-specialized DeepSeek model for IDE copilots and repo-scale assistance.',
		domain: 'Code & Engineering',
		strengths: ['Code Generation', 'Debugging', 'Explanation'],
		capabilities: [
			{
				name: 'Code',
				score: 92,
				subs: [
					{ name: 'Generation', score: 93 },
					{ name: 'Debugging', score: 91 },
					{ name: 'Refactoring', score: 91 },
				],
			},
			{
				name: 'Reasoning',
				score: 83,
				subs: [
					{ name: 'Logical Deduction', score: 84 },
					{ name: 'Mathematical', score: 82 },
					{ name: 'Algorithmic', score: 85 },
				],
			},
			{
				name: 'Language',
				score: 76,
				subs: [
					{ name: 'Technical Docs', score: 80 },
					{ name: 'Summarization', score: 74 },
					{ name: 'Creative Writing', score: 60 },
				],
			},
			{
				name: 'Efficiency',
				score: 87,
				subs: [
					{ name: 'Throughput', score: 89 },
					{ name: 'Token Efficiency', score: 86 },
					{ name: 'Batch Processing', score: 85 },
				],
			},
		],
		benchmarks: [
			{ name: 'HumanEval', score: 90.2, maxScore: 100, category: 'Code' },
			{ name: 'MBPP', score: 86.4, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 81.0, maxScore: 100, category: 'Math' },
			{ name: 'MMLU', score: 76.2, maxScore: 100, category: 'Knowledge' },
			{
				name: 'ARC-Challenge',
				score: 84.5,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'TruthfulQA', score: 64.0, maxScore: 100, category: 'Safety' },
		],
		popularity: '24.6k',
		inputCostPer1M: 0.35,
		outputCostPer1M: 1.05,
		contextLength: 163840,
		addedDate: '2024-06-17',
		tokensPerSecond: 72,
		sustainability: 'B',
		category: 'Code',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 760,
		availableVersions: ['2024-06'],
		status: 'Active' as const,
	},
	{
		id: 'm-30',
		name: 'DeepSeek Chat',
		provider: 'DeepSeek',
		version: '2024-12',
		parameterSize: '671B' as const,
		description:
			'General chat-optimized DeepSeek variant with strong reasoning and low API cost.',
		domain: 'General Purpose',
		strengths: ['Reasoning', 'Cost Efficient', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 89,
				subs: [
					{ name: 'Logical Deduction', score: 90 },
					{ name: 'Mathematical', score: 88 },
					{ name: 'Causal Inference', score: 88 },
				],
			},
			{
				name: 'Language',
				score: 86,
				subs: [
					{ name: 'Summarization', score: 87 },
					{ name: 'Translation', score: 85 },
					{ name: 'Creative Writing', score: 85 },
				],
			},
			{
				name: 'Code',
				score: 84,
				subs: [
					{ name: 'Generation', score: 85 },
					{ name: 'Debugging', score: 82 },
					{ name: 'Explanation', score: 84 },
				],
			},
			{
				name: 'Efficiency',
				score: 91,
				subs: [
					{ name: 'Throughput', score: 92 },
					{ name: 'Token Efficiency', score: 90 },
					{ name: 'Batch Processing', score: 90 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 82.3, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 83.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 87.2, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 88.1,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 86.8, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 67.5, maxScore: 100, category: 'Safety' },
		],
		popularity: '18.2k',
		inputCostPer1M: 0.4,
		outputCostPer1M: 1.2,
		contextLength: 64000,
		addedDate: '2024-12-01',
		tokensPerSecond: 110,
		sustainability: 'A',
		category: 'General',
		hosting: 'EUrouter' as const,
		quantization: 'INT4' as const,
		avgResponseTokens: 420,
		availableVersions: ['2024-12'],
		status: 'Active' as const,
	},
	{
		id: 'm-31',
		name: 'Mistral 7B Instruct',
		provider: 'Mistral AI',
		version: '2023-09',
		parameterSize: '7B' as const,
		description:
			'Foundational Mistral 7B instruct model — lightweight baseline for fine-tuning.',
		domain: 'General Purpose',
		strengths: ['Open Weights', 'Cost Efficient', 'Speed'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 70,
				subs: [
					{ name: 'Logical Deduction', score: 71 },
					{ name: 'Mathematical', score: 66 },
					{ name: 'Causal Inference', score: 70 },
				],
			},
			{
				name: 'Language',
				score: 74,
				subs: [
					{ name: 'Summarization', score: 75 },
					{ name: 'Translation', score: 73 },
					{ name: 'Creative Writing', score: 73 },
				],
			},
			{
				name: 'Code',
				score: 68,
				subs: [
					{ name: 'Generation', score: 69 },
					{ name: 'Debugging', score: 65 },
					{ name: 'Explanation', score: 68 },
				],
			},
			{
				name: 'Efficiency',
				score: 93,
				subs: [
					{ name: 'Throughput', score: 94 },
					{ name: 'Token Efficiency', score: 92 },
					{ name: 'Batch Processing', score: 92 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 64.2, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 63.5, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 69.8, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 73.5,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 76.0, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 58.9, maxScore: 100, category: 'Safety' },
		],
		popularity: '40.5k',
		inputCostPer1M: 0.08,
		outputCostPer1M: 0.08,
		contextLength: 8192,
		addedDate: '2023-09-27',
		tokensPerSecond: 165,
		sustainability: 'B',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 350,
		availableVersions: ['2023-09'],
		status: 'Sunsetting' as const,
	},
	{
		id: 'm-32',
		name: 'o1-preview',
		provider: 'OpenAI',
		version: '2024-12',
		parameterSize: '200B' as const,
		description:
			'Reasoning-focused OpenAI model with extended chain-of-thought for hard math and planning.',
		domain: 'General Purpose',
		strengths: ['Reasoning', 'Mathematics', 'Analysis'],
		capabilities: [
			{
				name: 'Reasoning',
				score: 94,
				subs: [
					{ name: 'Logical Deduction', score: 95 },
					{ name: 'Mathematical', score: 96 },
					{ name: 'Causal Inference', score: 93 },
				],
			},
			{
				name: 'Language',
				score: 86,
				subs: [
					{ name: 'Summarization', score: 87 },
					{ name: 'Translation', score: 84 },
					{ name: 'Creative Writing', score: 84 },
				],
			},
			{
				name: 'Code',
				score: 87,
				subs: [
					{ name: 'Generation', score: 88 },
					{ name: 'Debugging', score: 85 },
					{ name: 'Explanation', score: 87 },
				],
			},
			{
				name: 'Efficiency',
				score: 72,
				subs: [
					{ name: 'Throughput', score: 70 },
					{ name: 'Token Efficiency', score: 72 },
					{ name: 'Batch Processing', score: 73 },
				],
			},
		],
		benchmarks: [
			{ name: 'MMLU', score: 90.8, maxScore: 100, category: 'Knowledge' },
			{ name: 'HumanEval', score: 92.4, maxScore: 100, category: 'Code' },
			{ name: 'GSM8K', score: 96.2, maxScore: 100, category: 'Math' },
			{
				name: 'ARC-Challenge',
				score: 94.8,
				maxScore: 100,
				category: 'Reasoning',
			},
			{ name: 'HellaSwag', score: 88.2, maxScore: 100, category: 'Language' },
			{ name: 'TruthfulQA', score: 74.0, maxScore: 100, category: 'Safety' },
		],
		popularity: '29.7k',
		inputCostPer1M: 12,
		outputCostPer1M: 36,
		contextLength: 128000,
		addedDate: '2024-12-05',
		tokensPerSecond: 35,
		sustainability: 'C',
		category: 'General',
		hosting: 'Booster Hosted' as const,
		avgResponseTokens: 2800,
		availableVersions: ['2024-12'],
		status: 'Beta' as const,
	},
]

export type Model = (typeof models)[number]

// Build capability → sub-capability map from models
// TODO: This will be moved to backend when data is no longer mocked
export const capabilityMap: Record<string, string[]> = {}
models.forEach((m) => {
	m.capabilities.forEach((cap) => {
		if (!capabilityMap[cap.name]) capabilityMap[cap.name] = []
		cap.subs.forEach((sub) => {
			if (!capabilityMap[cap.name].includes(sub.name)) {
				capabilityMap[cap.name].push(sub.name)
			}
		})
	})
})

export const allCapabilities = Object.keys(capabilityMap).sort()

// Hosting providers
export const hostingProviders = ['Openchip', 'Scaleway', 'Booster EU'] as const

// API Keys for endpoints
export const apiKeys = [
	{
		id: 'key-default',
		name: 'Default',
		isDefault: true,
		/** Default endpoint key can be copied anytime in UI (mock full secret). */
		fullKey: 'bdc_7m2qdefaultmocksecret0123456789ab',
		prefix: 'bdc...89ab',
		createdAt: '2025-02-01',
		lastUsed: '5 days ago',
		status: 'active' as const,
	},
	{
		id: 'key-1',
		name: 'Production',
		isDefault: false,
		prefix: 'bdc...x9k2',
		createdAt: '2025-01-15',
		lastUsed: '2 hours ago',
		status: 'active' as const,
	},
]

// Use case categories for model cosmos filtering
export const useCaseCategories = [
	{
		label: 'Conversational Assistant',
		subtitle: 'Chatbots & dialogue',
		keywords: ['Reasoning', 'Multilingual', 'Speed'],
	},
	{
		label: 'Document Summarization',
		subtitle: 'Long-form analysis',
		keywords: ['Long Context', 'Analysis', 'Safety'],
	},
	{
		label: 'Code Generation',
		subtitle: 'Dev tools & copilots',
		keywords: ['Code Generation', 'Debugging'],
	},
	{
		label: 'RAG / Knowledge Assistant',
		subtitle: 'Enterprise search & retrieval',
		keywords: ['RAG', 'Enterprise', 'Long Context', 'Grounding'],
	},
	{
		label: 'Customer Support Bot',
		subtitle: 'Multi-language support',
		keywords: ['Multilingual', 'Speed', 'Tool Use'],
	},
	{
		label: 'Content Generation',
		subtitle: 'Marketing & creative',
		keywords: ['Reasoning', 'Analysis'],
	},
	{
		label: 'Classification',
		subtitle: 'Labeling & categorisation',
		keywords: ['Speed', 'Cost Efficient'],
	},
	{
		label: 'Translation',
		subtitle: 'Cross-language tasks',
		keywords: ['Multilingual'],
	},
	{
		label: 'Multimodal (Text + Image)',
		subtitle: 'Vision & OCR',
		keywords: ['Multimodal', 'Grounding'],
	},
	{
		label: 'Structured Data Extraction',
		subtitle: 'Parsing & formatting',
		keywords: ['RAG', 'Grounding', 'Tool Use'],
	},
]

// Optimization objectives for guided model selection
export const optimizationObjectives = [
	{
		label: 'Lowest Cost',
		description: 'Minimize token and infrastructure costs',
	},
	{
		label: 'Highest Accuracy',
		description: 'Best quality output regardless of cost',
	},
	{
		label: 'Fastest Response Time',
		description: 'Lowest latency for interactive UX',
	},
	{
		label: 'Balanced Performance',
		description: 'Good trade-off across all dimensions',
	},
	{
		label: 'Compliance / Regulated Workloads',
		description: 'Safety, audit, and regulatory focus',
	},
	{
		label: 'Sustainability / Energy Efficient',
		description: 'Lowest carbon footprint',
	},
]

// Benchmark methodology for model detail page
export const benchmarkMethodology = [
	{
		category: 'Agents (25%)',
		evaluation: 'GDPval-AA',
		field: 'Real World Knowledge Work',
		questions: '220 tasks',
		repeats: '1',
		responseType: 'Agentic task completion with file outputs',
		scoring: 'Pairwise comparison (ELO), frozen and scaled',
		weighting: '16.7%',
		toolUsage: true,
	},
	{
		category: 'Agents (25%)',
		evaluation: 'Tau2-Bench Telecom',
		field: 'Agentic Workflows',
		questions: '114',
		repeats: '3',
		responseType: 'Dual control agent-user simulation',
		scoring: 'World state evaluation, pass@1',
		weighting: '8.3%',
		toolUsage: true,
	},
	{
		category: 'Coding (25%)',
		evaluation: 'Terminal-Bench Hard',
		field: 'Agentic Workflows',
		questions: '44',
		repeats: '3',
		responseType: 'Terminal-based task execution',
		scoring: 'Test suite pass/fail, pass@1',
		weighting: '16.7%',
		toolUsage: false,
	},
	{
		category: 'Coding (25%)',
		evaluation: 'SciCode',
		field: 'Code Generation',
		questions: '288 subproblems (test set)',
		repeats: '3',
		responseType: 'Python code (must pass all unit tests)',
		scoring: 'Code execution, pass@1',
		weighting: '8.3%',
		toolUsage: false,
	},
	{
		category: 'General (25%)',
		evaluation: 'AA-LCR',
		field: 'Long Context Reasoning',
		questions: '100',
		repeats: '3',
		responseType: 'Open answer',
		scoring: 'Equality checker LLM, pass@1',
		weighting: '6.25%',
		toolUsage: false,
	},
	{
		category: 'General (25%)',
		evaluation: 'AA-Omniscience',
		field: 'Knowledge and Hallucination',
		questions: '6,000',
		repeats: '1',
		responseType: 'Open answer',
		scoring: '50% accuracy + 50% (1 - hallucination rate)',
		weighting: '12.5%',
		toolUsage: false,
	},
	{
		category: 'General (25%)',
		evaluation: 'IFBench',
		field: 'Instruction Following',
		questions: '294',
		repeats: '5',
		responseType: 'Open answer',
		scoring: 'Extraction and rule-driven assessment, pass@1',
		weighting: '6.25%',
		toolUsage: false,
	},
	{
		category: 'Scientific Reasoning (25%)',
		evaluation: 'HLE',
		field: 'Reasoning and Knowledge',
		questions: '2,158',
		repeats: '1',
		responseType: 'Open answer',
		scoring: 'Equality checker LLM, pass@1',
		weighting: '12.5%',
		toolUsage: false,
	},
	{
		category: 'Scientific Reasoning (25%)',
		evaluation: 'GPQA Diamond',
		field: 'Scientific Reasoning',
		questions: '198',
		repeats: '5',
		responseType: 'Multiple choice (4 options)',
		scoring: 'Regex extraction, pass@1',
		weighting: '6.25%',
		toolUsage: false,
	},
	{
		category: 'Scientific Reasoning (25%)',
		evaluation: 'CritP',
		field: 'Physics Reasoning',
		questions: '70',
		repeats: '5',
		responseType: 'Python functions, symbolic expressions, numerical answers',
		scoring: 'Official grading server, pass@1',
		weighting: '6.25%',
		toolUsage: false,
	},
]

// Recommendations
export const recommendations = [
	{
		id: 'rec-1',
		type: 'Cost Optimization' as const,
		title: 'Switch Claims Processing to DeepSeek V3',
		currentModel: 'Mistral Large',
		currentModelId: 'm-3',
		recommendedModel: 'DeepSeek V3',
		recommendedModelId: 'm-12',
		costDelta: -86,
		latencyDelta: -12,
		accuracyDelta: +2.1,
		explanation:
			'DeepSeek V3 achieves higher reasoning scores at 86% lower cost with its efficient MoE architecture.',
		status: 'pending' as const,
		endpoint: 'Claims Processing',
	},
	{
		id: 'rec-2',
		type: 'Performance Upgrade' as const,
		title: 'Upgrade Customer Support to Mistral Nemo',
		currentModel: 'Mistral Large',
		currentModelId: 'm-3',
		recommendedModel: 'Mistral Nemo',
		recommendedModelId: 'm-9',
		costDelta: -85,
		latencyDelta: -69,
		accuracyDelta: -3.2,
		explanation:
			'Mistral Nemo reduces latency by 69% and costs 85% less with a moderate accuracy trade-off acceptable for support use cases.',
		status: 'pending' as const,
		endpoint: 'Customer Support Bot',
	},
	{
		id: 'rec-3',
		type: 'Sustainability' as const,
		title: 'Consider Llama 3.1 70B for Contract Analysis',
		currentModel: 'Qwen 2.5 72B',
		currentModelId: 'm-11',
		recommendedModel: 'Llama 3.1 70B',
		recommendedModelId: 'm-10',
		costDelta: -40,
		latencyDelta: -20,
		accuracyDelta: -2.8,
		explanation:
			'Llama 3.1 70B offers strong reasoning at lower cost with excellent community support and fine-tuning ecosystem.',
		status: 'ignored' as const,
		endpoint: 'Contract Analysis',
	},
]

// Observability data generators
export const generateUsageData = () => {
	const days = 30
	return Array.from({ length: days }, (_, i) => ({
		date: new Date(2025, 0, i + 1).toISOString().split('T')[0],
		tokens: Math.floor(40000 + Math.random() * 30000),
		cost: Math.round((800 + Math.random() * 400) * 100) / 100,
	}))
}

export const generateLatencyData = () =>
	Array.from({ length: 24 }, (_, i) => ({
		hour: `${i}:00`,
		p50: Math.floor(200 + Math.random() * 100),
		p95: Math.floor(400 + Math.random() * 200),
		p99: Math.floor(600 + Math.random() * 400),
	}))

// Provider options for endpoint wizard
import { formatContextWindowShort } from '@/lib/model-metrics'

export type ProviderOption = {
	id: string
	provider: string
	bestFor: string
	context: string
	contextTokens: number
	inputPer1M: number
	outputPer1M: number
	latencyMs: number
	tps: number
	quant: string
	certs: string[]
	reason: string
	recommended?: boolean
}

export function getRecommendedProvider(_modelId: string): ProviderOption {
	return {
		id: 'recommended',
		provider: 'Mistral AI',
		bestFor: 'Best overall',
		context: '32K',
		contextTokens: 32000,
		inputPer1M: 1,
		outputPer1M: 3,
		latencyMs: 620,
		tps: 120,
		quant: 'FP16',
		certs: ['GDPR'],
		reason:
			'Recommended for this endpoint because it offers the best balance of cost, latency, throughput, and compliance for the selected model.',
		recommended: true,
	}
}

export function getProviderOptions(modelId: string): ProviderOption[] {
	const selectedModel = models.find((m) => m.id === modelId) ?? models[0]
	return [
		getRecommendedProvider(modelId),
		{
			id: 'scaleway',
			provider: 'Scaleway',
			bestFor: 'EU infrastructure',
			context: '128K',
			contextTokens: 128000,
			inputPer1M: 2.8,
			outputPer1M: 8.4,
			latencyMs: 640,
			tps: 26.5,
			quant: 'INT8',
			certs: ['GDPR'],
			reason:
				'Scaleway provides larger context and EU infrastructure, but has higher token cost and lower throughput than the recommended option.',
		},
		{
			id: 'nebius',
			provider: 'Nebius',
			bestFor: 'Lowest latency',
			context: '128K',
			contextTokens: 128000,
			inputPer1M: 3.1,
			outputPer1M: 9.2,
			latencyMs: 590,
			tps: 29.4,
			quant: 'FP16',
			certs: ['GDPR'],
			reason:
				'Nebius provides lower latency than the recommended option, but has higher token cost and lower throughput for this workload.',
		},
		{
			id: 'fireworks',
			provider: 'Fireworks',
			bestFor: 'Large context',
			context: '128K',
			contextTokens: 128000,
			inputPer1M: 2.95,
			outputPer1M: 8.95,
			latencyMs: 610,
			tps: 27.8,
			quant: 'Q8',
			certs: ['GDPR'],
			reason:
				"Fireworks supports larger context windows, but is more expensive and lower throughput than Booster's recommended provider for this endpoint.",
		},
		{
			id: 'model-provider-fallback',
			provider: selectedModel.provider,
			bestFor: 'Model-native',
			context: formatContextWindowShort(selectedModel.contextLength),
			contextTokens: selectedModel.contextLength,
			inputPer1M: selectedModel.inputCostPer1M,
			outputPer1M: selectedModel.outputCostPer1M,
			latencyMs: 650,
			tps: Math.max(1, selectedModel.tokensPerSecond - 5),
			quant: 'FP16',
			certs: ['GDPR'],
			reason:
				'Model-native hosting can simplify compatibility, but may not be the strongest cost-latency-throughput balance.',
		},
	].filter(
		(row, index, arr) =>
			arr.findIndex((item) => item.provider === row.provider) === index,
	)
}
