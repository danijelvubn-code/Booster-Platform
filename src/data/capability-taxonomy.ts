export type BenchmarkTaxonomy = {
	displayName: string
}

export type SubcapabilityTaxonomy = {
	displayName: string
	description: string
	version: number
	weight: number
	benchmarks: Record<string, number>
}

export type CapabilityTaxonomy = {
	displayName: string
	description: string
	version: number
	subcapabilities: Record<string, SubcapabilityTaxonomy>
}

export type IndexTaxonomy = {
	displayName: string
	description: string
	version: number
	capabilities?: Record<string, { weight: number }>
	subcapabilities?: Record<string, { weight: number }>
}

export const CAPABILITY_INDEXES: Record<string, IndexTaxonomy> = {
	medical: {
		displayName: 'Medical',
		description:
			'Aggregate for medical deployments combining clinical reasoning, clinical knowledge, summarization, and safety',
		version: 1,
		capabilities: {
			safety: { weight: 1 / 4 },
		},
		subcapabilities: {
			'reasoning.medical_clinical': { weight: 1 / 4 },
			'knowledge.medical_clinical': { weight: 1 / 4 },
			'summarization.short_context_summarization': { weight: 1 / 4 },
		},
	},
	financial: {
		displayName: 'Financial',
		description:
			'Aggregate for financial deployments combining financial reasoning, financial knowledge, and safety',
		version: 1,
		capabilities: {
			safety: { weight: 1 / 3 },
		},
		subcapabilities: {
			'reasoning.financial_business': { weight: 1 / 3 },
			'knowledge.financial_business': { weight: 1 / 3 },
		},
	},
	ai_index: {
		displayName: 'AI Index',
		description:
			'Broad aggregate across core capabilities for general AI readiness',
		version: 1,
		capabilities: {
			reasoning: { weight: 1 / 7 },
			knowledge: { weight: 1 / 7 },
			structured_output: { weight: 1 / 7 },
			tool_use: { weight: 1 / 7 },
			coding: { weight: 1 / 7 },
			safety: { weight: 1 / 7 },
			summarization: { weight: 1 / 7 },
		},
	},
}

export const AI_INDEX_CAPABILITY_IDS = [
	'reasoning',
	'knowledge',
	'structured_output',
	'tool_use',
	'coding',
	'safety',
	'summarization',
] as const

export const CAPABILITY_TAXONOMY: Record<string, CapabilityTaxonomy> = {
	reasoning: {
		displayName: 'Reasoning',
		description:
			'Ability to apply logic, commonsense, and domain knowledge to solve problems',
		version: 1,
		subcapabilities: {
			general_commonsense: {
				displayName: 'General / Commonsense',
				description: 'Everyday reasoning and commonsense understanding',
				version: 1,
				weight: 1 / 5,
				benchmarks: { commonsenseqa: 1.0 },
			},
			stem: {
				displayName: 'STEM',
				description:
					'Reasoning over science, technology, engineering, and mathematics problems',
				version: 1,
				weight: 1 / 5,
				benchmarks: {
					gsm8k: 2 / 5,
					arc_easy: 1 / 5,
					arc_challenge: 2 / 5,
				},
			},
			medical_clinical: {
				displayName: 'Medical / Clinical',
				description: 'Clinical and medical reasoning ability',
				version: 1,
				weight: 1 / 5,
				benchmarks: { healthbench: 1.0 },
			},
			financial_business: {
				displayName: 'Financial / Business',
				description: 'Reasoning in finance, accounting, and business domains',
				version: 1,
				weight: 1 / 5,
				benchmarks: {
					mmlu_pro_professional_accounting: 1 / 2,
					mmlu_pro_economics: 1 / 2,
				},
			},
			mathematical: {
				displayName: 'Mathematical',
				description: 'Mathematical problem solving and numerical reasoning',
				version: 1,
				weight: 1 / 5,
				benchmarks: { gsm8k: 1.0 },
			},
		},
	},
	knowledge: {
		displayName: 'Knowledge',
		description: 'Breadth and depth of factual knowledge across domains',
		version: 1,
		subcapabilities: {
			general: {
				displayName: 'General',
				description: 'Broad factual knowledge across academic and general domains',
				version: 1,
				weight: 1 / 6,
				benchmarks: { mmlu: 1.0 },
			},
			stem: {
				displayName: 'STEM',
				description:
					'Factual knowledge in science, technology, engineering, and mathematics',
				version: 1,
				weight: 1 / 6,
				benchmarks: { mmlu_stem: 1.0 },
			},
			medical_clinical: {
				displayName: 'Medical / Clinical',
				description:
					'Breadth of biomedical, clinical, and pharmacological knowledge',
				version: 1,
				weight: 1 / 6,
				benchmarks: {
					medqa: 2 / 5,
					mmlu_pro_health: 2 / 5,
					mmlu_high_school_biology: 1 / 45,
					mmlu_college_biology: 1 / 45,
					mmlu_college_medicine: 1 / 45,
					mmlu_professional_medicine: 1 / 45,
					mmlu_medical_genetics: 1 / 45,
					mmlu_virology: 1 / 45,
					mmlu_clinical_knowledge: 1 / 45,
					mmlu_nutrition: 1 / 45,
					mmlu_anatomy: 1 / 45,
				},
			},
			financial_business: {
				displayName: 'Financial / Business',
				description: 'Knowledge in finance, business, and economics',
				version: 1,
				weight: 1 / 6,
				benchmarks: { mmlu_business_economics_accounting: 1.0 },
			},
			programming_cs: {
				displayName: 'Programming & Computer Science',
				description:
					'Knowledge of computer science fundamentals and programming concepts',
				version: 1,
				weight: 1 / 6,
				benchmarks: { mmlu_computer_science: 1.0 },
			},
			law: {
				displayName: 'Law',
				description: 'Legal knowledge and regulatory understanding',
				version: 1,
				weight: 1 / 6,
				benchmarks: { air_bench: 1.0 },
			},
		},
	},
	structured_output: {
		displayName: 'Structured Output',
		description:
			'Ability to produce well-formed, schema-compliant structured data',
		version: 1,
		subcapabilities: {
			json_validity: {
				displayName: 'JSON Validity',
				description: 'Produces syntactically valid JSON',
				version: 1,
				weight: 0.3,
				benchmarks: { json_schema_bench_validity: 1.0 },
			},
			schema_compliance: {
				displayName: 'Schema Compliance',
				description: 'Adheres to specified JSON schemas',
				version: 1,
				weight: 0.7,
				benchmarks: { json_schema_bench_compliance: 1.0 },
			},
		},
	},
	tool_use: {
		displayName: 'Tool Use',
		description:
			'Ability to select and invoke external tools and APIs correctly',
		version: 1,
		subcapabilities: {
			tool_selection: {
				displayName: 'Tool Selection',
				description: 'Chooses the appropriate tool for a given task',
				version: 1,
				weight: 1 / 2,
				benchmarks: { bfcl: 1.0 },
			},
			tool_calling: {
				displayName: 'Tool Calling',
				description: 'Formats and executes tool calls correctly',
				version: 1,
				weight: 1 / 2,
				benchmarks: { bfcl: 1.0 },
			},
		},
	},
	coding: {
		displayName: 'Coding',
		description:
			'Software engineering capabilities including understanding, generation, and debugging',
		version: 1,
		subcapabilities: {
			code_understanding: {
				displayName: 'Code Understanding',
				description: 'Comprehension of existing codebases and code semantics',
				version: 1,
				weight: 1 / 4,
				benchmarks: { swe_bench_verified: 1.0 },
			},
			code_generation: {
				displayName: 'Code Generation',
				description: 'Generating correct and functional code from specifications',
				version: 1,
				weight: 1 / 4,
				benchmarks: {
					swe_bench_verified: 1 / 2,
					humaneval: 1 / 2,
				},
			},
			code_debugging: {
				displayName: 'Code Debugging',
				description: 'Identifying and fixing bugs in existing code',
				version: 1,
				weight: 1 / 4,
				benchmarks: { swe_bench_verified: 1.0 },
			},
			query_generation: {
				displayName: 'Query Generation',
				description:
					'Generating database and graph queries from natural language',
				version: 1,
				weight: 1 / 4,
				benchmarks: { text_to_cypher: 1.0 },
			},
		},
	},
	safety: {
		displayName: 'Safety',
		description:
			'Adherence to instructions, policies, and regulatory constraints',
		version: 1,
		subcapabilities: {
			instruction_following: {
				displayName: 'Instruction Following',
				description:
					'Ability to follow explicit formatting and behavioral instructions',
				version: 1,
				weight: 1 / 2,
				benchmarks: { ifeval: 1.0 },
			},
			regulations_policies: {
				displayName: 'Regulations / Policies',
				description: 'Compliance with regulatory and policy constraints',
				version: 1,
				weight: 1 / 2,
				benchmarks: { air_bench: 1.0 },
			},
		},
	},
	summarization: {
		displayName: 'Summarization',
		description: 'Ability to distill content into concise and accurate summaries',
		version: 1,
		subcapabilities: {
			short_context_summarization: {
				displayName: 'Short-context Summarization',
				description: 'Summarization of short documents and passages',
				version: 1,
				weight: 1 / 2,
				benchmarks: { summeval: 1.0 },
			},
			long_context_summarization: {
				displayName: 'Long-context Summarization',
				description: 'Summarization of long documents and books',
				version: 1,
				weight: 1 / 2,
				benchmarks: { booksum: 1.0 },
			},
		},
	},
	classification: {
		displayName: 'Classification',
		description: 'Ability to categorize text into predefined classes',
		version: 1,
		subcapabilities: {
			intent_classification: {
				displayName: 'Intent Classification',
				description: 'Identifying user intent from natural language utterances',
				version: 1,
				weight: 1 / 4,
				benchmarks: { massive: 1.0 },
			},
			medical_intent_classification: {
				displayName: 'Medical Intent Classification',
				description: 'Identifying intent in medical and clinical contexts',
				version: 1,
				weight: 1 / 4,
				benchmarks: { clinc150: 1.0 },
			},
			topic_classification: {
				displayName: 'Topic Classification',
				description: 'Assigning topic labels to text documents',
				version: 1,
				weight: 1 / 4,
				benchmarks: { ag_news: 1.0 },
			},
			toxicity_classification: {
				displayName: 'Toxicity Classification',
				description: 'Detecting toxic and harmful content in text',
				version: 1,
				weight: 1 / 4,
				benchmarks: { jigsaw_toxic_comment: 1.0 },
			},
		},
	},
	document_understanding: {
		displayName: 'Document Understanding',
		description:
			'Ability to parse, interpret, and reason over structured documents and images',
		version: 1,
		subcapabilities: {
			text_ocr: {
				displayName: 'Text & OCR',
				description:
					'Optical character recognition and text extraction from document images',
				version: 1,
				weight: 1 / 3,
				benchmarks: {
					ocrbench_v2: 1 / 2,
					omnidocbench: 1 / 2,
				},
			},
			layout_understanding: {
				displayName: 'Layout Understanding',
				description:
					'Comprehension of document structure, tables, and visual layout',
				version: 1,
				weight: 1 / 3,
				benchmarks: {
					omnidocbench: 1 / 2,
					infovqa: 1 / 2,
				},
			},
			document_vqa: {
				displayName: 'Document VQA & Understanding',
				description: 'Visual question answering over document images',
				version: 1,
				weight: 1 / 3,
				benchmarks: {
					docvqa: 1 / 4,
					mathvision: 1 / 4,
					mmmu: 1 / 4,
					mmmu_pro: 1 / 4,
				},
			},
		},
	},
	visual_intelligence: {
		displayName: 'Visual Intelligence',
		description:
			'Ability to perceive, interpret, and reason over visual content',
		version: 1,
		subcapabilities: {
			visual_perception: {
				displayName: 'Visual Perception',
				description: 'Low-level visual understanding of real-world scenes',
				version: 1,
				weight: 1 / 5,
				benchmarks: { realworldqa: 1.0 },
			},
			spatial_structural_reasoning: {
				displayName: 'Spatial & Structural Reasoning',
				description:
					'Understanding of spatial relationships and structural patterns in images',
				version: 1,
				weight: 1 / 5,
				benchmarks: {
					mmiu: 1 / 2,
					zerobench: 1 / 2,
				},
			},
			visual_understanding: {
				displayName: 'Visual Understanding',
				description:
					'Semantic understanding of visual content across diverse domains',
				version: 1,
				weight: 1 / 5,
				benchmarks: {
					mmmu: 1 / 2,
					mmmu_pro: 1 / 2,
				},
			},
			visual_qa: {
				displayName: 'Visual Question Answering',
				description: 'Answering open-ended questions about visual content',
				version: 1,
				weight: 1 / 5,
				benchmarks: {
					zerobench: 1 / 2,
					realworldqa: 1 / 2,
				},
			},
			video_understanding: {
				displayName: 'Video Understanding',
				description: 'Temporal and semantic understanding of video content',
				version: 1,
				weight: 1 / 5,
				benchmarks: { videomme: 1.0 },
			},
		},
	},
	audio_understanding: {
		displayName: 'Audio Understanding',
		description: 'Ability to process and reason over audio and speech',
		version: 1,
		subcapabilities: {
			speech_linguistic_understanding: {
				displayName: 'Speech & Linguistic Understanding',
				description: 'Comprehension of spoken language and acoustic features',
				version: 1,
				weight: 1.0,
				benchmarks: { mmau: 1.0 },
			},
		},
	},
	multimodal_understanding: {
		displayName: 'Multimodal Understanding',
		description:
			'Integrated reasoning across text, vision, audio, and other modalities',
		version: 1,
		subcapabilities: {
			multimodal_reasoning: {
				displayName: 'Multimodal Reasoning',
				description: 'Cross-modal reasoning combining multiple input types',
				version: 1,
				weight: 1.0,
				benchmarks: { omnibench: 1.0 },
			},
		},
	},
	multilingualism: {
		displayName: 'Multilingualism',
		description: 'Capability across natural and programming languages',
		version: 1,
		subcapabilities: {
			languages: {
				displayName: 'Languages',
				description: 'Performance across diverse natural languages',
				version: 1,
				weight: 1 / 2,
				benchmarks: { mmlu_prox: 1.0 },
			},
			programming_languages: {
				displayName: 'Programming Languages',
				description:
					'Code generation and understanding across diverse programming languages',
				version: 1,
				weight: 1 / 2,
				benchmarks: { autocodebench: 1.0 },
			},
		},
	},
	embedding: {
		displayName: 'Embedding',
		description:
			'Quality of text embedding representations for retrieval and semantic tasks',
		version: 1,
		subcapabilities: {
			embedding_retrieval: {
				displayName: 'Embedding & Retrieval',
				description:
					'Effectiveness of embeddings for semantic similarity and retrieval tasks',
				version: 1,
				weight: 1.0,
				benchmarks: {
					mteb_europe_v1_sts: 1 / 3,
					mteb_code_v1_retrieval: 1 / 3,
					mteb_medical_v1_retrieval: 1 / 3,
				},
			},
		},
	},
	reranking: {
		displayName: 'Reranking',
		description: 'Quality of reranking models for retrieval pipelines',
		version: 1,
		subcapabilities: {
			retrieval_ranking: {
				displayName: 'Retrieval & Ranking',
				description:
					'Effectiveness of reranking for improving retrieval precision',
				version: 1,
				weight: 1.0,
				benchmarks: {
					mteb_code_v1_retrieval: 1 / 2,
					mteb_medical_v1_retrieval: 1 / 2,
				},
			},
		},
	},
}

export const BENCHMARK_TAXONOMY: Record<string, BenchmarkTaxonomy> = {
	commonsenseqa: { displayName: 'CommonsenseQA' },
	gsm8k: { displayName: 'GSM8K' },
	arc_easy: { displayName: 'ARC-Easy' },
	arc_challenge: { displayName: 'ARC-Challenge' },
	healthbench: { displayName: 'HealthBench' },
	mmlu_pro_professional_accounting: {
		displayName: 'MMLU-Pro (Professional Accounting)',
	},
	mmlu_pro_economics: { displayName: 'MMLU-Pro (Economics)' },
	mmlu: { displayName: 'MMLU' },
	mmlu_stem: { displayName: 'MMLU (STEM subsets)' },
	medqa: { displayName: 'MedQA' },
	mmlu_pro_health: { displayName: 'MMLU-Pro (Health)' },
	mmlu_high_school_biology: { displayName: 'MMLU (High School Biology)' },
	mmlu_college_biology: { displayName: 'MMLU (College Biology)' },
	mmlu_college_medicine: { displayName: 'MMLU (College Medicine)' },
	mmlu_professional_medicine: { displayName: 'MMLU (Professional Medicine)' },
	mmlu_medical_genetics: { displayName: 'MMLU (Medical Genetics)' },
	mmlu_virology: { displayName: 'MMLU (Virology)' },
	mmlu_clinical_knowledge: { displayName: 'MMLU (Clinical Knowledge)' },
	mmlu_nutrition: { displayName: 'MMLU (Nutrition)' },
	mmlu_anatomy: { displayName: 'MMLU (Anatomy)' },
	mmlu_business_economics_accounting: {
		displayName: 'MMLU (Business / Economics / Accounting subsets)',
	},
	mmlu_computer_science: { displayName: 'MMLU (Computer Science)' },
	air_bench: { displayName: 'AIR Bench' },
	json_schema_bench_validity: { displayName: 'JSON Schema Bench (Validity)' },
	json_schema_bench_compliance: {
		displayName: 'JSON Schema Bench (Schema Compliance)',
	},
	bfcl: { displayName: 'BFCL' },
	swe_bench_verified: { displayName: 'SWE-bench Verified' },
	humaneval: { displayName: 'HumanEval' },
	text_to_cypher: { displayName: 'Text-to-Cypher' },
	ifeval: { displayName: 'IFEval' },
	summeval: { displayName: 'SummEval' },
	booksum: { displayName: 'BookSum' },
	massive: { displayName: 'MASSIVE' },
	clinc150: { displayName: 'CLINC150' },
	ag_news: { displayName: 'AG News' },
	jigsaw_toxic_comment: { displayName: 'Jigsaw Toxic Comment' },
	ocrbench_v2: { displayName: 'OCRBench-v2' },
	omnidocbench: { displayName: 'OmniDocBench' },
	infovqa: { displayName: 'InfoVQA' },
	docvqa: { displayName: 'DocVQA' },
	mathvision: { displayName: 'MathVision' },
	mmmu: { displayName: 'MMMU' },
	mmmu_pro: { displayName: 'MMMU-Pro' },
	realworldqa: { displayName: 'RealWorldQA' },
	mmiu: { displayName: 'MMIU' },
	zerobench: { displayName: 'ZeroBench' },
	videomme: { displayName: 'VideoMME' },
	mmau: { displayName: 'MMAU' },
	omnibench: { displayName: 'OmniBench' },
	mmlu_prox: { displayName: 'MMLU-prox' },
	autocodebench: { displayName: 'AutoCodeBench' },
	mteb_europe_v1_sts: { displayName: 'MTEB (Europe, v1) — STS' },
	mteb_code_v1_retrieval: { displayName: 'MTEB (Code, v1) — Retrieval' },
	mteb_medical_v1_retrieval: { displayName: 'MTEB (Medical, v1) — Retrieval' },
}
