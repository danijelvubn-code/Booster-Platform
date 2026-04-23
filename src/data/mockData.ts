// Tenant
export const tenant = {
  name: "The Space Dreams Pvt Ltd",
  accountType: "Enterprise",
  tokenCredits: 2_450_000,
  tokenCreditsUsed: 1_620_000,
  monthlyBudget: 48_000,
  monthlySpend: 31_200,
  /** Requests served in current billing month (overview KPI). */
  requestsServed: 27_284,
};

// Endpoints
export const endpoints: Array<{
  id: string;
  name: string;
  type: "Production" | "POC" | "Demo";
  defaultDeployment: string;
  budgetUsed: number;
  health: "OK" | "At Risk";
  monthlySpend: number;
  inputTokens: number;
  outputTokens: number;
  endpoint: string;
  tokenBudget: number;
  /** Monthly budget cap in EUR (overview / portfolio cards). */
  monthlyBudgetEur: number;
  performanceProfile: "best-effort" | "premium" | "enterprise";
}> = [
  {
    id: "sp-1",
    name: "Claims Processing",
    type: "Production" as const,
    defaultDeployment: "mistral-large-claims-v2",
    budgetUsed: 127,
    health: "OK" as const,
    monthlySpend: 14_200,
    inputTokens: 2_840_000,
    outputTokens: 1_060_000,
    endpoint: "https://api.booster.ai/v1/endpoints/claims-processing",
    tokenBudget: 5_000_000,
    monthlyBudgetEur: 4_200,
    performanceProfile: "premium",
  },
  {
    id: "sp-2",
    name: "Contract Analysis",
    type: "Production" as const,
    defaultDeployment: "qwen-contracts",
    budgetUsed: 52,
    health: "OK" as const,
    monthlySpend: 9_800,
    inputTokens: 1_520_000,
    outputTokens: 340_000,
    endpoint: "https://api.booster.ai/v1/endpoints/contract-analysis",
    tokenBudget: 3_000_000,
    monthlyBudgetEur: 3_100,
    performanceProfile: "enterprise",
  },
  {
    id: "sp-3",
    name: "Coding Copilot",
    type: "Demo" as const,
    defaultDeployment: "codestral-v1",
    budgetUsed: 75,
    health: "OK" as const,
    monthlySpend: 4_200,
    inputTokens: 420_000,
    outputTokens: 255_000,
    endpoint: "https://api.booster.ai/v1/endpoints/coding-copilot",
    tokenBudget: 1_500_000,
    monthlyBudgetEur: 1_800,
    performanceProfile: "best-effort",
  },
  {
    id: "sp-4",
    name: "Customer Support Bot",
    type: "POC" as const,
    defaultDeployment: "mistral-large-support",
    budgetUsed: 88,
    health: "At Risk" as const,
    monthlySpend: 3_000,
    inputTokens: 580_000,
    outputTokens: 124_000,
    endpoint: "https://api.booster.ai/v1/endpoints/customer-support",
    tokenBudget: 800_000,
    monthlyBudgetEur: 900,
    performanceProfile: "best-effort",
  },
  {
    id: "sp-default",
    name: "Getting Started",
    type: "POC" as const,
    defaultDeployment: "",
    budgetUsed: 0,
    health: "OK" as const,
    monthlySpend: 0,
    inputTokens: 0,
    outputTokens: 0,
    endpoint: "https://api.booster.ai/v1/endpoints/getting-started",
    tokenBudget: 500_000,
    monthlyBudgetEur: 500,
    performanceProfile: "best-effort",
  },
];

// Keep backward compat alias
export const spaces = endpoints;

// Deployments per endpoint
export const deployments: Record<string, Array<{
  id: string;
  name: string;
  model: string;
  version: string;
  mode: "Default" | "Shadow" | "Inactive" | "Shared";
  budgetUsed: number;
  slaStatus: "OK" | "At Risk" | "Breach";
  region: string;
  confidentialCompute: boolean;
  latencyP50: number;
  costPer1MTokens: number;
}>> = {
  "sp-1": [
    { id: "dep-1", name: "mistral-large-claims-v2", model: "Mistral Large", version: "2024-11", mode: "Default", budgetUsed: 78, slaStatus: "OK", region: "EU-West", confidentialCompute: true, latencyP50: 320, costPer1MTokens: 2 },
    
    { id: "dep-3", name: "deepseek-claims-shadow-2", model: "DeepSeek V3", version: "2024-12", mode: "Inactive", budgetUsed: 5, slaStatus: "OK", region: "EU-West", confidentialCompute: false, latencyP50: 190, costPer1MTokens: 0.27 },
  ],
  "sp-2": [
    { id: "dep-4", name: "qwen-contracts", model: "Qwen 2.5 72B", version: "2024-09", mode: "Default", budgetUsed: 62, slaStatus: "OK", region: "US-East", confidentialCompute: true, latencyP50: 410, costPer1MTokens: 1.5 },
    { id: "dep-5", name: "llama-70b-contracts-test", model: "Llama 3.1 70B", version: "2024-07", mode: "Inactive", budgetUsed: 0, slaStatus: "OK", region: "US-East", confidentialCompute: false, latencyP50: 520, costPer1MTokens: 0.9 },
  ],
  "sp-3": [
    { id: "dep-6", name: "codestral-v1", model: "Codestral", version: "2024-05", mode: "Default", budgetUsed: 45, slaStatus: "OK", region: "EU-West", confidentialCompute: false, latencyP50: 150, costPer1MTokens: 1 },
  ],
  "sp-4": [
    { id: "dep-7", name: "mistral-large-support", model: "Mistral Large", version: "2024-11", mode: "Default", budgetUsed: 88, slaStatus: "At Risk", region: "US-East", confidentialCompute: false, latencyP50: 680, costPer1MTokens: 2 },
    
  ],
  "sp-default": [],
};

// Model Cosmos models
export const models = [
  {
    id: "m-3", name: "Mistral Large", provider: "Mistral AI", version: "2024-11",
    description: "Mistral's flagship model delivering strong multilingual performance at competitive pricing, optimized for speed and efficiency.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 86, subs: [{ name: "Logical Deduction", score: 87 }, { name: "Mathematical", score: 83 }, { name: "Causal Inference", score: 85 }] },
      { name: "Language", score: 90, subs: [{ name: "Summarization", score: 89 }, { name: "Translation", score: 94 }, { name: "Creative Writing", score: 85 }] },
      { name: "Multilingual", score: 93, subs: [{ name: "European Languages", score: 95 }, { name: "Asian Languages", score: 88 }, { name: "Code-switching", score: 91 }] },
      { name: "Efficiency", score: 92, subs: [{ name: "Throughput", score: 94 }, { name: "Token Efficiency", score: 91 }, { name: "Batch Processing", score: 90 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 81.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 73.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 83.7, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 88.1, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 89.4, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 68.9, maxScore: 100, category: "Safety" },
    ],
    popularity: "18.1k", inputCostPer1M: 2, outputCostPer1M: 6, contextLength: 128000, addedDate: "2024-11-05", tokensPerSecond: 105, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 540, availableVersions: ["2024-11", "2024-07", "2024-02"], status: "Active" as const,
  },
  {
    id: "m-5", name: "Codestral", provider: "Mistral AI", version: "2024-05",
    description: "Purpose-built for software engineering tasks — code generation, debugging, refactoring, and technical documentation.",
    domain: "Code & Engineering",
    strengths: ["Code Generation", "Debugging", "Explanation"],
    capabilities: [
      { name: "Code", score: 93, subs: [{ name: "Generation", score: 95 }, { name: "Debugging", score: 92 }, { name: "Refactoring", score: 91 }] },
      { name: "Language", score: 78, subs: [{ name: "Technical Docs", score: 88 }, { name: "Summarization", score: 75 }, { name: "Creative Writing", score: 62 }] },
      { name: "Reasoning", score: 84, subs: [{ name: "Logical Deduction", score: 86 }, { name: "Mathematical", score: 82 }, { name: "Algorithmic", score: 88 }] },
      { name: "Efficiency", score: 91, subs: [{ name: "Throughput", score: 93 }, { name: "Token Efficiency", score: 90 }, { name: "Batch Processing", score: 89 }] },
    ],
    benchmarks: [
      { name: "HumanEval", score: 92.4, maxScore: 100, category: "Code" },
      { name: "MBPP", score: 88.6, maxScore: 100, category: "Code" },
      { name: "DS-1000", score: 85.3, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 79.2, maxScore: 100, category: "Math" },
      { name: "MMLU", score: 72.1, maxScore: 100, category: "Knowledge" },
      { name: "ARC-Challenge", score: 81.5, maxScore: 100, category: "Reasoning" },
    ],
    popularity: "31.2k", inputCostPer1M: 1, outputCostPer1M: 3, contextLength: 32000, addedDate: "2024-05-29", tokensPerSecond: 120, sustainability: "A", category: "Code", hosting: "Booster Powered" as const, avgResponseTokens: 890, availableVersions: ["2024-05", "2024-01"], status: "Active" as const,
  },
  {
    id: "m-7", name: "Llama 3.1 405B", provider: "Meta", version: "2024-07",
    description: "Meta's largest open-source model offering near-frontier performance with full customizability and self-hosting options.",
    domain: "General Purpose",
    strengths: ["Open Source", "Customizable", "Reasoning"],
    capabilities: [
      { name: "Reasoning", score: 89, subs: [{ name: "Logical Deduction", score: 90 }, { name: "Mathematical", score: 87 }, { name: "Causal Inference", score: 88 }] },
      { name: "Language", score: 88, subs: [{ name: "Summarization", score: 90 }, { name: "Translation", score: 85 }, { name: "Creative Writing", score: 87 }] },
      { name: "Code", score: 86, subs: [{ name: "Generation", score: 88 }, { name: "Debugging", score: 84 }, { name: "Explanation", score: 85 }] },
      { name: "Customization", score: 95, subs: [{ name: "Fine-tuning", score: 97 }, { name: "Prompt Engineering", score: 93 }, { name: "Domain Adaptation", score: 94 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 85.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 81.7, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 87.3, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 91.2, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 90.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66.8, maxScore: 100, category: "Safety" },
    ],
    popularity: "5.1k", inputCostPer1M: 3, outputCostPer1M: 9, contextLength: 128000, addedDate: "2024-07-23", tokensPerSecond: 28, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 620, availableVersions: ["2024-07", "2024-04"], status: "Sunsetting" as const,
  },
  {
    id: "m-9", name: "Mistral Nemo", provider: "Mistral AI", version: "2024-07",
    description: "A compact 12B parameter model co-developed with NVIDIA, offering strong performance for its size with excellent efficiency.",
    domain: "General Purpose",
    strengths: ["Compact", "Efficient", "Cost Effective"],
    capabilities: [
      { name: "Reasoning", score: 78, subs: [{ name: "Logical Deduction", score: 79 }, { name: "Mathematical", score: 75 }, { name: "Causal Inference", score: 77 }] },
      { name: "Language", score: 82, subs: [{ name: "Summarization", score: 84 }, { name: "Translation", score: 80 }, { name: "Creative Writing", score: 78 }] },
      { name: "Efficiency", score: 96, subs: [{ name: "Throughput", score: 98 }, { name: "Token Efficiency", score: 95 }, { name: "Batch Processing", score: 94 }] },
      { name: "Multilingual", score: 85, subs: [{ name: "European Languages", score: 88 }, { name: "Asian Languages", score: 80 }, { name: "Code-switching", score: 84 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 68.0, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 65.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 71.4, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 76.8, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 80.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 62.5, maxScore: 100, category: "Safety" },
    ],
    popularity: "14.7k", inputCostPer1M: 0.3, outputCostPer1M: 0.3, contextLength: 128000, addedDate: "2024-07-18", tokensPerSecond: 185, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 380, availableVersions: ["2024-07"], status: "Active" as const,
  },
  {
    id: "m-10", name: "Llama 3.1 70B", provider: "Meta", version: "2024-07",
    description: "Meta's mid-size open-source model balancing strong reasoning with fast inference, ideal for production workloads.",
    domain: "General Purpose",
    strengths: ["Balanced", "Open Source", "Fast"],
    capabilities: [
      { name: "Reasoning", score: 84, subs: [{ name: "Logical Deduction", score: 85 }, { name: "Mathematical", score: 82 }, { name: "Causal Inference", score: 83 }] },
      { name: "Language", score: 86, subs: [{ name: "Summarization", score: 88 }, { name: "Translation", score: 83 }, { name: "Creative Writing", score: 84 }] },
      { name: "Code", score: 82, subs: [{ name: "Generation", score: 84 }, { name: "Debugging", score: 80 }, { name: "Explanation", score: 81 }] },
      { name: "Efficiency", score: 90, subs: [{ name: "Throughput", score: 92 }, { name: "Token Efficiency", score: 89 }, { name: "Batch Processing", score: 88 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 79.3, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 76.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 82.1, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 86.4, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 87.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 63.7, maxScore: 100, category: "Safety" },
    ],
    popularity: "22.3k", inputCostPer1M: 0.9, outputCostPer1M: 0.9, contextLength: 128000, addedDate: "2024-07-23", tokensPerSecond: 72, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 520, availableVersions: ["2024-07", "2024-04"], status: "Active" as const,
  },
  {
    id: "m-11", name: "Qwen 2.5 72B", provider: "Alibaba", version: "2024-09",
    description: "Alibaba's powerful open-source model with exceptional multilingual and mathematical capabilities across 29+ languages.",
    domain: "General Purpose",
    strengths: ["Multilingual", "Mathematics", "Open Source"],
    capabilities: [
      { name: "Reasoning", score: 87, subs: [{ name: "Logical Deduction", score: 88 }, { name: "Mathematical", score: 91 }, { name: "Causal Inference", score: 84 }] },
      { name: "Language", score: 89, subs: [{ name: "Summarization", score: 90 }, { name: "Translation", score: 92 }, { name: "Creative Writing", score: 83 }] },
      { name: "Multilingual", score: 94, subs: [{ name: "European Languages", score: 93 }, { name: "Asian Languages", score: 97 }, { name: "Code-switching", score: 90 }] },
      { name: "Code", score: 85, subs: [{ name: "Generation", score: 87 }, { name: "Debugging", score: 83 }, { name: "Explanation", score: 84 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 83.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 79.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 91.6, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 89.3, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 88.7, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 67.2, maxScore: 100, category: "Safety" },
    ],
    popularity: "8.9k", inputCostPer1M: 1.5, outputCostPer1M: 4, contextLength: 128000, addedDate: "2024-09-19", tokensPerSecond: 65, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 590, availableVersions: ["2024-09", "2024-06"], status: "Beta" as const,
  },
  {
    id: "m-12", name: "DeepSeek V3", provider: "DeepSeek", version: "2024-12",
    description: "A highly efficient open-source model with mixture-of-experts architecture, delivering frontier-level reasoning at low cost.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Cost Efficient", "MoE Architecture"],
    capabilities: [
      { name: "Reasoning", score: 92, subs: [{ name: "Logical Deduction", score: 93 }, { name: "Mathematical", score: 94 }, { name: "Causal Inference", score: 90 }] },
      { name: "Language", score: 88, subs: [{ name: "Summarization", score: 89 }, { name: "Translation", score: 87 }, { name: "Creative Writing", score: 86 }] },
      { name: "Code", score: 90, subs: [{ name: "Generation", score: 92 }, { name: "Debugging", score: 89 }, { name: "Explanation", score: 88 }] },
      { name: "Efficiency", score: 94, subs: [{ name: "Throughput", score: 95 }, { name: "Token Efficiency", score: 96 }, { name: "Batch Processing", score: 92 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 87.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 89.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 93.8, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 94.2, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 92.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 71.3, maxScore: 100, category: "Safety" },
    ],
    popularity: "15.6k", inputCostPer1M: 0.27, outputCostPer1M: 1.1, contextLength: 128000, addedDate: "2024-12-26", tokensPerSecond: 95, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 650, availableVersions: ["2024-12"], status: "Beta" as const,
  },
  {
    id: "m-13", name: "Mixtral 8x22B", provider: "Mistral AI", version: "2024-04",
    description: "Mistral's sparse mixture-of-experts model offering excellent throughput and quality, ideal for high-volume enterprise workloads.",
    domain: "Enterprise & RAG",
    strengths: ["RAG", "Enterprise", "Throughput"],
    capabilities: [
      { name: "RAG", score: 91, subs: [{ name: "Retrieval Accuracy", score: 93 }, { name: "Citation Quality", score: 89 }, { name: "Source Synthesis", score: 90 }] },
      { name: "Language", score: 86, subs: [{ name: "Summarization", score: 88 }, { name: "Translation", score: 85 }, { name: "Structured Extraction", score: 87 }] },
      { name: "Efficiency", score: 93, subs: [{ name: "Throughput", score: 95 }, { name: "Token Efficiency", score: 92 }, { name: "Batch Processing", score: 91 }] },
      { name: "Reasoning", score: 83, subs: [{ name: "Logical Deduction", score: 84 }, { name: "Mathematical", score: 80 }, { name: "Causal Inference", score: 83 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 77.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 70.6, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 76.3, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 85.9, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 86.4, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65.8, maxScore: 100, category: "Safety" },
    ],
    popularity: "11.2k", inputCostPer1M: 2, outputCostPer1M: 6, contextLength: 65000, addedDate: "2024-04-17", tokensPerSecond: 88, sustainability: "A", category: "Enterprise", hosting: "Booster Powered" as const, avgResponseTokens: 560, availableVersions: ["2024-04"], status: "Deprecated" as const,
  },
  {
    id: "m-14", name: "GPT-4o", provider: "OpenAI", version: "2024-08",
    description: "Flagship multimodal model with strong reasoning, vision, and tool use for production assistants.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Multilingual", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 91, subs: [{ name: "Logical Deduction", score: 92 }, { name: "Mathematical", score: 90 }, { name: "Causal Inference", score: 90 }] },
      { name: "Language", score: 92, subs: [{ name: "Summarization", score: 91 }, { name: "Translation", score: 90 }, { name: "Creative Writing", score: 92 }] },
      { name: "Code", score: 88, subs: [{ name: "Generation", score: 90 }, { name: "Debugging", score: 86 }, { name: "Explanation", score: 87 }] },
      { name: "Efficiency", score: 85, subs: [{ name: "Throughput", score: 86 }, { name: "Token Efficiency", score: 84 }, { name: "Batch Processing", score: 84 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 88.7, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 90.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 93.1, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 92.8, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 89.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 72.4, maxScore: 100, category: "Safety" },
    ],
    popularity: "42.1k", inputCostPer1M: 4.5, outputCostPer1M: 13.5, contextLength: 128000, addedDate: "2024-08-12", tokensPerSecond: 78, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 480, availableVersions: ["2024-08"], status: "Active" as const,
  },
  {
    id: "m-15", name: "GPT-4 Turbo", provider: "OpenAI", version: "2024-04",
    description: "Large-context workhorse for agents, retrieval, and long document workflows.",
    domain: "General Purpose",
    strengths: ["Long Context", "Analysis", "Tool Use"],
    capabilities: [
      { name: "Reasoning", score: 88, subs: [{ name: "Logical Deduction", score: 89 }, { name: "Mathematical", score: 86 }, { name: "Causal Inference", score: 87 }] },
      { name: "Language", score: 90, subs: [{ name: "Summarization", score: 92 }, { name: "Translation", score: 88 }, { name: "Creative Writing", score: 89 }] },
      { name: "Code", score: 86, subs: [{ name: "Generation", score: 87 }, { name: "Debugging", score: 85 }, { name: "Explanation", score: 85 }] },
      { name: "Efficiency", score: 82, subs: [{ name: "Throughput", score: 83 }, { name: "Token Efficiency", score: 81 }, { name: "Batch Processing", score: 81 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 86.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 88.0, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 91.4, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 91.0, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 88.0, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 70.1, maxScore: 100, category: "Safety" },
    ],
    popularity: "36.8k", inputCostPer1M: 8, outputCostPer1M: 24, contextLength: 128000, addedDate: "2024-04-09", tokensPerSecond: 55, sustainability: "C", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 720, availableVersions: ["2024-04"], status: "Active" as const,
  },
  {
    id: "m-16", name: "Gemini 1.5 Pro", provider: "Google", version: "2024-05",
    description: "Long-context Gemini variant tuned for research, summarization, and multimodal understanding.",
    domain: "General Purpose",
    strengths: ["Long Context", "Analysis", "Multilingual"],
    capabilities: [
      { name: "Reasoning", score: 87, subs: [{ name: "Logical Deduction", score: 88 }, { name: "Mathematical", score: 86 }, { name: "Causal Inference", score: 86 }] },
      { name: "Language", score: 89, subs: [{ name: "Summarization", score: 91 }, { name: "Translation", score: 88 }, { name: "Creative Writing", score: 87 }] },
      { name: "Code", score: 84, subs: [{ name: "Generation", score: 85 }, { name: "Debugging", score: 82 }, { name: "Explanation", score: 84 }] },
      { name: "Multilingual", score: 90, subs: [{ name: "European Languages", score: 89 }, { name: "Asian Languages", score: 91 }, { name: "Code-switching", score: 88 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 85.9, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 84.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 89.0, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 89.5, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 87.3, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 68.2, maxScore: 100, category: "Safety" },
    ],
    popularity: "19.4k", inputCostPer1M: 2.5, outputCostPer1M: 7.5, contextLength: 1000000, addedDate: "2024-05-14", tokensPerSecond: 48, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 890, availableVersions: ["2024-05"], status: "Active" as const,
  },
  {
    id: "m-17", name: "Gemini 1.5 Flash", provider: "Google", version: "2024-06",
    description: "Fast, cost-efficient Gemini for high-volume chat, classification, and extraction.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Throughput"],
    capabilities: [
      { name: "Reasoning", score: 80, subs: [{ name: "Logical Deduction", score: 81 }, { name: "Mathematical", score: 78 }, { name: "Causal Inference", score: 80 }] },
      { name: "Language", score: 85, subs: [{ name: "Summarization", score: 86 }, { name: "Translation", score: 84 }, { name: "Creative Writing", score: 83 }] },
      { name: "Code", score: 79, subs: [{ name: "Generation", score: 80 }, { name: "Debugging", score: 77 }, { name: "Explanation", score: 79 }] },
      { name: "Efficiency", score: 94, subs: [{ name: "Throughput", score: 96 }, { name: "Token Efficiency", score: 93 }, { name: "Batch Processing", score: 92 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 78.9, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 77.2, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 81.5, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 83.6, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 84.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65.0, maxScore: 100, category: "Safety" },
    ],
    popularity: "28.0k", inputCostPer1M: 0.35, outputCostPer1M: 1.05, contextLength: 1000000, addedDate: "2024-06-20", tokensPerSecond: 210, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 340, availableVersions: ["2024-06"], status: "Active" as const,
  },
  {
    id: "m-18", name: "Gemma 2 27B", provider: "Google", version: "2024-06",
    description: "Open-weights Gemma family model balancing quality and deployability on modest hardware.",
    domain: "General Purpose",
    strengths: ["Open Source", "Cost Efficient", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 82, subs: [{ name: "Logical Deduction", score: 83 }, { name: "Mathematical", score: 80 }, { name: "Causal Inference", score: 82 }] },
      { name: "Language", score: 84, subs: [{ name: "Summarization", score: 85 }, { name: "Translation", score: 83 }, { name: "Creative Writing", score: 83 }] },
      { name: "Code", score: 81, subs: [{ name: "Generation", score: 82 }, { name: "Debugging", score: 79 }, { name: "Explanation", score: 81 }] },
      { name: "Efficiency", score: 88, subs: [{ name: "Throughput", score: 90 }, { name: "Token Efficiency", score: 87 }, { name: "Batch Processing", score: 86 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 75.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 75.0, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 80.6, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 84.4, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 85.1, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 64.3, maxScore: 100, category: "Safety" },
    ],
    popularity: "12.3k", inputCostPer1M: 0.2, outputCostPer1M: 0.2, contextLength: 8192, addedDate: "2024-06-27", tokensPerSecond: 145, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 410, availableVersions: ["2024-06"], status: "Active" as const,
  },
  {
    id: "m-19", name: "EuroLLM 9B", provider: "EuroLLM", version: "2024-10",
    description: "EU-centric open model emphasizing multilingual coverage across official EU languages.",
    domain: "General Purpose",
    strengths: ["Multilingual", "Cost Efficient", "Compliance"],
    capabilities: [
      { name: "Reasoning", score: 76, subs: [{ name: "Logical Deduction", score: 77 }, { name: "Mathematical", score: 73 }, { name: "Causal Inference", score: 76 }] },
      { name: "Language", score: 81, subs: [{ name: "Summarization", score: 82 }, { name: "Translation", score: 84 }, { name: "Creative Writing", score: 78 }] },
      { name: "Multilingual", score: 88, subs: [{ name: "European Languages", score: 91 }, { name: "Asian Languages", score: 72 }, { name: "Code-switching", score: 85 }] },
      { name: "Efficiency", score: 90, subs: [{ name: "Throughput", score: 91 }, { name: "Token Efficiency", score: 89 }, { name: "Batch Processing", score: 89 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 70.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 68.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 74.2, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 78.1, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 79.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 61.0, maxScore: 100, category: "Safety" },
    ],
    popularity: "4.2k", inputCostPer1M: 0.15, outputCostPer1M: 0.45, contextLength: 8192, addedDate: "2024-10-02", tokensPerSecond: 175, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 360, availableVersions: ["2024-10"], status: "Active" as const,
  },
  {
    id: "m-20", name: "EuroLLM 70B", provider: "EuroLLM", version: "2024-10",
    description: "Larger EuroLLM variant for enterprise assistants requiring stronger reasoning and grounding.",
    domain: "Enterprise & RAG",
    strengths: ["RAG", "Enterprise", "Multilingual"],
    capabilities: [
      { name: "RAG", score: 86, subs: [{ name: "Retrieval Accuracy", score: 87 }, { name: "Citation Quality", score: 85 }, { name: "Source Synthesis", score: 85 }] },
      { name: "Reasoning", score: 83, subs: [{ name: "Logical Deduction", score: 84 }, { name: "Mathematical", score: 81 }, { name: "Causal Inference", score: 83 }] },
      { name: "Language", score: 85, subs: [{ name: "Summarization", score: 86 }, { name: "Translation", score: 87 }, { name: "Structured Extraction", score: 84 }] },
      { name: "Efficiency", score: 82, subs: [{ name: "Throughput", score: 83 }, { name: "Token Efficiency", score: 81 }, { name: "Batch Processing", score: 81 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 78.0, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 74.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 82.8, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 85.2, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 84.9, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66.5, maxScore: 100, category: "Safety" },
    ],
    popularity: "3.1k", inputCostPer1M: 1.1, outputCostPer1M: 3.3, contextLength: 32768, addedDate: "2024-10-15", tokensPerSecond: 62, sustainability: "B", category: "Enterprise", hosting: "Booster Powered" as const, avgResponseTokens: 510, availableVersions: ["2024-10"], status: "Beta" as const,
  },
  {
    id: "m-21", name: "Multiverse Core", provider: "Multiverse", version: "2024-09",
    description: "General frontier-class model from Multiverse AI for balanced quality and latency.",
    domain: "General Purpose",
    strengths: ["Balanced", "Speed", "Reasoning"],
    capabilities: [
      { name: "Reasoning", score: 88, subs: [{ name: "Logical Deduction", score: 89 }, { name: "Mathematical", score: 86 }, { name: "Causal Inference", score: 88 }] },
      { name: "Language", score: 87, subs: [{ name: "Summarization", score: 88 }, { name: "Translation", score: 86 }, { name: "Creative Writing", score: 86 }] },
      { name: "Code", score: 85, subs: [{ name: "Generation", score: 86 }, { name: "Debugging", score: 83 }, { name: "Explanation", score: 85 }] },
      { name: "Efficiency", score: 86, subs: [{ name: "Throughput", score: 88 }, { name: "Token Efficiency", score: 85 }, { name: "Batch Processing", score: 84 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 84.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 85.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 88.7, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 88.9, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 87.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 69.8, maxScore: 100, category: "Safety" },
    ],
    popularity: "6.7k", inputCostPer1M: 2.2, outputCostPer1M: 6.6, contextLength: 128000, addedDate: "2024-09-05", tokensPerSecond: 92, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 470, availableVersions: ["2024-09"], status: "Active" as const,
  },
  {
    id: "m-22", name: "Multiverse Edge", provider: "Multiverse", version: "2024-11",
    description: "Edge-optimized Multiverse model for low-latency assistants and mobile backends.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Throughput"],
    capabilities: [
      { name: "Reasoning", score: 78, subs: [{ name: "Logical Deduction", score: 79 }, { name: "Mathematical", score: 75 }, { name: "Causal Inference", score: 78 }] },
      { name: "Language", score: 80, subs: [{ name: "Summarization", score: 81 }, { name: "Translation", score: 79 }, { name: "Creative Writing", score: 79 }] },
      { name: "Code", score: 76, subs: [{ name: "Generation", score: 77 }, { name: "Debugging", score: 74 }, { name: "Explanation", score: 76 }] },
      { name: "Efficiency", score: 95, subs: [{ name: "Throughput", score: 97 }, { name: "Token Efficiency", score: 94 }, { name: "Batch Processing", score: 93 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 72.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 72.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 77.5, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 80.2, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 82.0, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 63.4, maxScore: 100, category: "Safety" },
    ],
    popularity: "5.4k", inputCostPer1M: 0.45, outputCostPer1M: 1.35, contextLength: 32000, addedDate: "2024-11-08", tokensPerSecond: 240, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 280, availableVersions: ["2024-11"], status: "Active" as const,
  },
  {
    id: "m-23", name: "Mistral Small", provider: "Mistral AI", version: "2024-11",
    description: "Compact Mistral model for cost-sensitive workloads with solid multilingual coverage.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 74, subs: [{ name: "Logical Deduction", score: 75 }, { name: "Mathematical", score: 71 }, { name: "Causal Inference", score: 75 }] },
      { name: "Language", score: 79, subs: [{ name: "Summarization", score: 80 }, { name: "Translation", score: 78 }, { name: "Creative Writing", score: 78 }] },
      { name: "Multilingual", score: 82, subs: [{ name: "European Languages", score: 84 }, { name: "Asian Languages", score: 76 }, { name: "Code-switching", score: 81 }] },
      { name: "Efficiency", score: 91, subs: [{ name: "Throughput", score: 93 }, { name: "Token Efficiency", score: 90 }, { name: "Batch Processing", score: 89 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 69.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 70.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 76.0, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 79.5, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 81.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 62.8, maxScore: 100, category: "Safety" },
    ],
    popularity: "21.5k", inputCostPer1M: 0.18, outputCostPer1M: 0.55, contextLength: 32000, addedDate: "2024-11-18", tokensPerSecond: 195, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 320, availableVersions: ["2024-11"], status: "Active" as const,
  },
  {
    id: "m-24", name: "Mixtral 8x7B", provider: "Mistral AI", version: "2023-12",
    description: "Classic sparse MoE model — strong quality per euro for batch and offline workloads.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Throughput", "Open Weights"],
    capabilities: [
      { name: "Reasoning", score: 79, subs: [{ name: "Logical Deduction", score: 80 }, { name: "Mathematical", score: 76 }, { name: "Causal Inference", score: 79 }] },
      { name: "Language", score: 81, subs: [{ name: "Summarization", score: 82 }, { name: "Translation", score: 80 }, { name: "Creative Writing", score: 80 }] },
      { name: "Code", score: 78, subs: [{ name: "Generation", score: 79 }, { name: "Debugging", score: 76 }, { name: "Explanation", score: 78 }] },
      { name: "Efficiency", score: 89, subs: [{ name: "Throughput", score: 91 }, { name: "Token Efficiency", score: 88 }, { name: "Batch Processing", score: 87 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 70.6, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 74.8, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 74.4, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 81.0, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 83.3, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 61.5, maxScore: 100, category: "Safety" },
    ],
    popularity: "33.0k", inputCostPer1M: 0.24, outputCostPer1M: 0.24, contextLength: 32768, addedDate: "2023-12-11", tokensPerSecond: 125, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 440, availableVersions: ["2023-12"], status: "Sunsetting" as const,
  },
  {
    id: "m-25", name: "Llama 3.2 3B", provider: "Meta", version: "2024-09",
    description: "Tiny Llama 3.2 for on-device and ultra-low-latency inference.",
    domain: "General Purpose",
    strengths: ["Speed", "Cost Efficient", "Open Source"],
    capabilities: [
      { name: "Reasoning", score: 68, subs: [{ name: "Logical Deduction", score: 69 }, { name: "Mathematical", score: 64 }, { name: "Causal Inference", score: 68 }] },
      { name: "Language", score: 72, subs: [{ name: "Summarization", score: 73 }, { name: "Translation", score: 70 }, { name: "Creative Writing", score: 71 }] },
      { name: "Code", score: 65, subs: [{ name: "Generation", score: 66 }, { name: "Debugging", score: 62 }, { name: "Explanation", score: 65 }] },
      { name: "Efficiency", score: 97, subs: [{ name: "Throughput", score: 98 }, { name: "Token Efficiency", score: 97 }, { name: "Batch Processing", score: 95 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 63.4, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 62.0, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 66.8, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 71.2, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 74.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 58.1, maxScore: 100, category: "Safety" },
    ],
    popularity: "17.8k", inputCostPer1M: 0.05, outputCostPer1M: 0.15, contextLength: 128000, addedDate: "2024-09-25", tokensPerSecond: 320, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 220, availableVersions: ["2024-09"], status: "Active" as const,
  },
  {
    id: "m-26", name: "Llama 3.2 90B Vision", provider: "Meta", version: "2024-09",
    description: "Vision-capable Llama 3.2 for image+text assistants and document understanding.",
    domain: "General Purpose",
    strengths: ["Multimodal", "Reasoning", "Open Source"],
    capabilities: [
      { name: "Reasoning", score: 85, subs: [{ name: "Logical Deduction", score: 86 }, { name: "Mathematical", score: 83 }, { name: "Causal Inference", score: 85 }] },
      { name: "Language", score: 84, subs: [{ name: "Summarization", score: 85 }, { name: "Translation", score: 82 }, { name: "Creative Writing", score: 83 }] },
      { name: "Code", score: 80, subs: [{ name: "Generation", score: 81 }, { name: "Debugging", score: 78 }, { name: "Explanation", score: 80 }] },
      { name: "Efficiency", score: 78, subs: [{ name: "Throughput", score: 79 }, { name: "Token Efficiency", score: 77 }, { name: "Batch Processing", score: 77 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 80.1, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 78.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 84.2, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 86.0, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 85.5, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 65.2, maxScore: 100, category: "Safety" },
    ],
    popularity: "9.9k", inputCostPer1M: 1.8, outputCostPer1M: 5.4, contextLength: 128000, addedDate: "2024-09-25", tokensPerSecond: 58, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 540, availableVersions: ["2024-09"], status: "Active" as const,
  },
  {
    id: "m-27", name: "Qwen 2 7B", provider: "Alibaba", version: "2024-06",
    description: "Efficient Qwen 2 checkpoint for extraction, chat, and edge deployment.",
    domain: "General Purpose",
    strengths: ["Cost Efficient", "Multilingual", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 72, subs: [{ name: "Logical Deduction", score: 73 }, { name: "Mathematical", score: 70 }, { name: "Causal Inference", score: 72 }] },
      { name: "Language", score: 76, subs: [{ name: "Summarization", score: 77 }, { name: "Translation", score: 78 }, { name: "Creative Writing", score: 74 }] },
      { name: "Multilingual", score: 84, subs: [{ name: "European Languages", score: 82 }, { name: "Asian Languages", score: 88 }, { name: "Code-switching", score: 80 }] },
      { name: "Code", score: 73, subs: [{ name: "Generation", score: 74 }, { name: "Debugging", score: 71 }, { name: "Explanation", score: 73 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 67.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 68.9, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 75.5, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 76.4, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 78.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 60.5, maxScore: 100, category: "Safety" },
    ],
    popularity: "11.1k", inputCostPer1M: 0.12, outputCostPer1M: 0.36, contextLength: 131072, addedDate: "2024-06-07", tokensPerSecond: 205, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 300, availableVersions: ["2024-06"], status: "Active" as const,
  },
  {
    id: "m-28", name: "Qwen 2.5 32B", provider: "Alibaba", version: "2024-09",
    description: "Mid-size Qwen 2.5 with strong math and code for agentic workflows.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Mathematics", "Code Generation"],
    capabilities: [
      { name: "Reasoning", score: 84, subs: [{ name: "Logical Deduction", score: 85 }, { name: "Mathematical", score: 87 }, { name: "Causal Inference", score: 82 }] },
      { name: "Language", score: 83, subs: [{ name: "Summarization", score: 84 }, { name: "Translation", score: 85 }, { name: "Creative Writing", score: 80 }] },
      { name: "Code", score: 86, subs: [{ name: "Generation", score: 87 }, { name: "Debugging", score: 84 }, { name: "Explanation", score: 86 }] },
      { name: "Multilingual", score: 90, subs: [{ name: "European Languages", score: 88 }, { name: "Asian Languages", score: 93 }, { name: "Code-switching", score: 87 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 79.5, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 82.1, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 88.9, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 86.7, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 86.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 66.0, maxScore: 100, category: "Safety" },
    ],
    popularity: "14.4k", inputCostPer1M: 0.8, outputCostPer1M: 2.4, contextLength: 131072, addedDate: "2024-09-19", tokensPerSecond: 88, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 450, availableVersions: ["2024-09"], status: "Active" as const,
  },
  {
    id: "m-29", name: "DeepSeek Coder V2", provider: "DeepSeek", version: "2024-06",
    description: "Code-specialized DeepSeek model for IDE copilots and repo-scale assistance.",
    domain: "Code & Engineering",
    strengths: ["Code Generation", "Debugging", "Explanation"],
    capabilities: [
      { name: "Code", score: 92, subs: [{ name: "Generation", score: 93 }, { name: "Debugging", score: 91 }, { name: "Refactoring", score: 91 }] },
      { name: "Reasoning", score: 83, subs: [{ name: "Logical Deduction", score: 84 }, { name: "Mathematical", score: 82 }, { name: "Algorithmic", score: 85 }] },
      { name: "Language", score: 76, subs: [{ name: "Technical Docs", score: 80 }, { name: "Summarization", score: 74 }, { name: "Creative Writing", score: 60 }] },
      { name: "Efficiency", score: 87, subs: [{ name: "Throughput", score: 89 }, { name: "Token Efficiency", score: 86 }, { name: "Batch Processing", score: 85 }] },
    ],
    benchmarks: [
      { name: "HumanEval", score: 90.2, maxScore: 100, category: "Code" },
      { name: "MBPP", score: 86.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 81.0, maxScore: 100, category: "Math" },
      { name: "MMLU", score: 76.2, maxScore: 100, category: "Knowledge" },
      { name: "ARC-Challenge", score: 84.5, maxScore: 100, category: "Reasoning" },
      { name: "TruthfulQA", score: 64.0, maxScore: 100, category: "Safety" },
    ],
    popularity: "24.6k", inputCostPer1M: 0.35, outputCostPer1M: 1.05, contextLength: 163840, addedDate: "2024-06-17", tokensPerSecond: 72, sustainability: "B", category: "Code", hosting: "Booster Powered" as const, avgResponseTokens: 760, availableVersions: ["2024-06"], status: "Active" as const,
  },
  {
    id: "m-30", name: "DeepSeek Chat", provider: "DeepSeek", version: "2024-12",
    description: "General chat-optimized DeepSeek variant with strong reasoning and low API cost.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Cost Efficient", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 89, subs: [{ name: "Logical Deduction", score: 90 }, { name: "Mathematical", score: 88 }, { name: "Causal Inference", score: 88 }] },
      { name: "Language", score: 86, subs: [{ name: "Summarization", score: 87 }, { name: "Translation", score: 85 }, { name: "Creative Writing", score: 85 }] },
      { name: "Code", score: 84, subs: [{ name: "Generation", score: 85 }, { name: "Debugging", score: 82 }, { name: "Explanation", score: 84 }] },
      { name: "Efficiency", score: 91, subs: [{ name: "Throughput", score: 92 }, { name: "Token Efficiency", score: 90 }, { name: "Batch Processing", score: 90 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 82.3, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 83.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 87.2, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 88.1, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 86.8, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 67.5, maxScore: 100, category: "Safety" },
    ],
    popularity: "18.2k", inputCostPer1M: 0.4, outputCostPer1M: 1.2, contextLength: 64000, addedDate: "2024-12-01", tokensPerSecond: 110, sustainability: "A", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 420, availableVersions: ["2024-12"], status: "Active" as const,
  },
  {
    id: "m-31", name: "Mistral 7B Instruct", provider: "Mistral AI", version: "2023-09",
    description: "Foundational Mistral 7B instruct model — lightweight baseline for fine-tuning.",
    domain: "General Purpose",
    strengths: ["Open Weights", "Cost Efficient", "Speed"],
    capabilities: [
      { name: "Reasoning", score: 70, subs: [{ name: "Logical Deduction", score: 71 }, { name: "Mathematical", score: 66 }, { name: "Causal Inference", score: 70 }] },
      { name: "Language", score: 74, subs: [{ name: "Summarization", score: 75 }, { name: "Translation", score: 73 }, { name: "Creative Writing", score: 73 }] },
      { name: "Code", score: 68, subs: [{ name: "Generation", score: 69 }, { name: "Debugging", score: 65 }, { name: "Explanation", score: 68 }] },
      { name: "Efficiency", score: 93, subs: [{ name: "Throughput", score: 94 }, { name: "Token Efficiency", score: 92 }, { name: "Batch Processing", score: 92 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 64.2, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 63.5, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 69.8, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 73.5, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 76.0, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 58.9, maxScore: 100, category: "Safety" },
    ],
    popularity: "40.5k", inputCostPer1M: 0.08, outputCostPer1M: 0.08, contextLength: 8192, addedDate: "2023-09-27", tokensPerSecond: 165, sustainability: "B", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 350, availableVersions: ["2023-09"], status: "Sunsetting" as const,
  },
  {
    id: "m-32", name: "o1-preview", provider: "OpenAI", version: "2024-12",
    description: "Reasoning-focused OpenAI model with extended chain-of-thought for hard math and planning.",
    domain: "General Purpose",
    strengths: ["Reasoning", "Mathematics", "Analysis"],
    capabilities: [
      { name: "Reasoning", score: 94, subs: [{ name: "Logical Deduction", score: 95 }, { name: "Mathematical", score: 96 }, { name: "Causal Inference", score: 93 }] },
      { name: "Language", score: 86, subs: [{ name: "Summarization", score: 87 }, { name: "Translation", score: 84 }, { name: "Creative Writing", score: 84 }] },
      { name: "Code", score: 87, subs: [{ name: "Generation", score: 88 }, { name: "Debugging", score: 85 }, { name: "Explanation", score: 87 }] },
      { name: "Efficiency", score: 72, subs: [{ name: "Throughput", score: 70 }, { name: "Token Efficiency", score: 72 }, { name: "Batch Processing", score: 73 }] },
    ],
    benchmarks: [
      { name: "MMLU", score: 90.8, maxScore: 100, category: "Knowledge" },
      { name: "HumanEval", score: 92.4, maxScore: 100, category: "Code" },
      { name: "GSM8K", score: 96.2, maxScore: 100, category: "Math" },
      { name: "ARC-Challenge", score: 94.8, maxScore: 100, category: "Reasoning" },
      { name: "HellaSwag", score: 88.2, maxScore: 100, category: "Language" },
      { name: "TruthfulQA", score: 74.0, maxScore: 100, category: "Safety" },
    ],
    popularity: "29.7k", inputCostPer1M: 12, outputCostPer1M: 36, contextLength: 128000, addedDate: "2024-12-05", tokensPerSecond: 35, sustainability: "C", category: "General", hosting: "Booster Powered" as const, avgResponseTokens: 2800, availableVersions: ["2024-12"], status: "Beta" as const,
  },
];

// Recommendations
export const recommendations = [
  {
    id: "rec-1",
    type: "Cost Optimization" as const,
    title: "Switch Claims Processing to DeepSeek V3",
    currentModel: "Mistral Large",
    currentModelId: "m-3",
    recommendedModel: "DeepSeek V3",
    recommendedModelId: "m-12",
    costDelta: -86,
    latencyDelta: -12,
    accuracyDelta: +2.1,
    explanation: "DeepSeek V3 achieves higher reasoning scores at 86% lower cost with its efficient MoE architecture.",
    status: "pending" as const,
    endpoint: "Claims Processing",
  },
  {
    id: "rec-2",
    type: "Performance Upgrade" as const,
    title: "Upgrade Customer Support to Mistral Nemo",
    currentModel: "Mistral Large",
    currentModelId: "m-3",
    recommendedModel: "Mistral Nemo",
    recommendedModelId: "m-9",
    costDelta: -85,
    latencyDelta: -69,
    accuracyDelta: -3.2,
    explanation: "Mistral Nemo reduces latency by 69% and costs 85% less with a moderate accuracy trade-off acceptable for support use cases.",
    status: "pending" as const,
    endpoint: "Customer Support Bot",
  },
  {
    id: "rec-3",
    type: "Sustainability" as const,
    title: "Consider Llama 3.1 70B for Contract Analysis",
    currentModel: "Qwen 2.5 72B",
    currentModelId: "m-11",
    recommendedModel: "Llama 3.1 70B",
    recommendedModelId: "m-10",
    costDelta: -40,
    latencyDelta: -20,
    accuracyDelta: -2.8,
    explanation: "Llama 3.1 70B offers strong reasoning at lower cost with excellent community support and fine-tuning ecosystem.",
    status: "ignored" as const,
    endpoint: "Contract Analysis",
  },
];

// Observability data generators
export const generateUsageData = () => {
  const days = 30;
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(2025, 0, i + 1).toISOString().split("T")[0],
    tokens: Math.floor(40000 + Math.random() * 30000),
    cost: Math.round((800 + Math.random() * 400) * 100) / 100,
  }));
};

export const generateLatencyData = () =>
  Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    p50: Math.floor(200 + Math.random() * 100),
    p95: Math.floor(400 + Math.random() * 200),
    p99: Math.floor(600 + Math.random() * 400),
  }));
