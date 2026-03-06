// Tenant
export const tenant = {
  name: "The Space Dreams",
  accountType: "Enterprise",
  tokenCredits: 2_450_000,
  tokenCreditsUsed: 1_620_000,
  monthlyBudget: 48_000,
  monthlySpend: 31_200,
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
  endpoint: string;
  tokenBudget: number;
  performanceProfile: "best-effort" | "premium" | "enterprise";
}> = [
  {
    id: "sp-1",
    name: "Claims Processing",
    type: "Production" as const,
    defaultDeployment: "mistral-large-claims-v2",
    budgetUsed: 78,
    health: "OK" as const,
    monthlySpend: 14_200,
    endpoint: "https://api.booster.ai/v1/endpoints/claims-processing",
    tokenBudget: 5_000_000,
    performanceProfile: "premium",
  },
  {
    id: "sp-2",
    name: "Contract Analysis",
    type: "Production" as const,
    defaultDeployment: "qwen-contracts",
    budgetUsed: 62,
    health: "OK" as const,
    monthlySpend: 9_800,
    endpoint: "https://api.booster.ai/v1/endpoints/contract-analysis",
    tokenBudget: 3_000_000,
    performanceProfile: "enterprise",
  },
  {
    id: "sp-3",
    name: "Coding Copilot",
    type: "Demo" as const,
    defaultDeployment: "codestral-v1",
    budgetUsed: 45,
    health: "OK" as const,
    monthlySpend: 4_200,
    endpoint: "https://api.booster.ai/v1/endpoints/coding-copilot",
    tokenBudget: 1_500_000,
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
    endpoint: "https://api.booster.ai/v1/endpoints/customer-support",
    tokenBudget: 800_000,
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
    endpoint: "https://api.booster.ai/v1/endpoints/getting-started",
    tokenBudget: 500_000,
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
