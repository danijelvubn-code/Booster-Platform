import { models } from "@/data/mockData";
import type { PerformanceProfile } from "@/components/PerformanceProfileStep";

export interface SavedConfig {
  id: string;
  name: string;
  modelId: string;
  modelName: string;
  provider: string;
  performanceProfile: PerformanceProfile;
  monthlyBudget: string;
  guardrailsEnabled: number;
  estimatedMonthlyCost: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  sustainability: string;
  tokensPerSecond: number;
  contextLength: number;
  savedAt: string;
}

const profileMultiplier: Record<PerformanceProfile, number> = {
  "best-effort": 1,
  premium: 1.5,
  enterprise: 2.5,
};

// In-memory store
const savedConfigs: SavedConfig[] = [
  // Seed with one example
  {
    id: "sc-1",
    name: "Claims Prod Baseline",
    modelId: "m-3",
    modelName: "Mistral Large",
    provider: "Mistral AI",
    performanceProfile: "premium",
    monthlyBudget: "5000000",
    guardrailsEnabled: 4,
    estimatedMonthlyCost: 30,
    inputCostPer1M: 2,
    outputCostPer1M: 6,
    sustainability: "A",
    tokensPerSecond: 105,
    contextLength: 128000,
    savedAt: "2026-02-20T10:30:00Z",
  },
];

export function getSavedConfigs(): SavedConfig[] {
  return [...savedConfigs];
}

export function saveConfig(params: {
  name: string;
  modelId: string;
  performanceProfile: PerformanceProfile;
  monthlyBudget: string;
  guardrailsEnabled: number;
}): SavedConfig | null {
  const model = models.find((m) => m.id === params.modelId);
  if (!model) return null;

  const budget = parseInt(params.monthlyBudget) || 0;
  const avgCostPer1K = ((model.inputCostPer1M + model.outputCostPer1M) / 2) / 1000;
  const multiplier = profileMultiplier[params.performanceProfile];
  const estimatedMonthlyCost = (budget / 1000) * avgCostPer1K * multiplier;

  const config: SavedConfig = {
    id: `sc-${Date.now()}`,
    name: params.name,
    modelId: params.modelId,
    modelName: model.name,
    provider: model.provider,
    performanceProfile: params.performanceProfile,
    monthlyBudget: params.monthlyBudget,
    guardrailsEnabled: params.guardrailsEnabled,
    estimatedMonthlyCost: Math.round(estimatedMonthlyCost),
    inputCostPer1M: model.inputCostPer1M,
    outputCostPer1M: model.outputCostPer1M,
    sustainability: model.sustainability,
    tokensPerSecond: model.tokensPerSecond,
    contextLength: model.contextLength,
    savedAt: new Date().toISOString(),
  };

  savedConfigs.push(config);
  return config;
}

export function deleteSavedConfig(id: string): void {
  const idx = savedConfigs.findIndex((c) => c.id === id);
  if (idx !== -1) savedConfigs.splice(idx, 1);
}
