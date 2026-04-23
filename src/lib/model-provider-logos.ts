/** Public URL base for provider marks (files under `public/logos/model-sources/`). */
const BASE = "/logos/model-sources" as const;

/** Exact `model.provider` string → logo path. */
const MODEL_PROVIDER_LOGO_BY_PROVIDER: Record<string, string> = {
  "Mistral AI": `${BASE}/mistral.svg`,
  Meta: `${BASE}/meta.svg`,
  Alibaba: `${BASE}/alibaba.svg`,
  DeepSeek: `${BASE}/deep-seek.svg`,
  Google: `${BASE}/google.svg`,
  OpenAI: `${BASE}/openai.svg`,
  EuroLLM: `${BASE}/eurollm.svg`,
  Multiverse: `${BASE}/multiverse.svg`,
};

export function getProviderInitials(provider: string): string {
  const parts = provider.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  return provider.slice(0, 2).toUpperCase();
}

/**
 * Catalog logo URL for a provider. Alibaba + “Qwen” in the model name uses the Qwen mark.
 */
export function getModelProviderLogoSrc(provider: string, modelName?: string): string | undefined {
  const p = provider.trim();
  if (p === "Alibaba" && modelName != null && /qwen/i.test(modelName)) {
    return `${BASE}/qwen.svg`;
  }
  return MODEL_PROVIDER_LOGO_BY_PROVIDER[p];
}
