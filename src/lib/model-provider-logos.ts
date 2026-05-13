import { publicAssetUrl } from '@/lib/public-asset-url'

/** Exact `model.provider` string → logo path. */
const MODEL_PROVIDER_LOGO_BY_PROVIDER: Record<string, string> = {
	'Mistral AI': publicAssetUrl('logos/model-sources/mistral.svg'),
	Meta: publicAssetUrl('logos/model-sources/meta.svg'),
	Alibaba: publicAssetUrl('logos/model-sources/alibaba.svg'),
	DeepSeek: publicAssetUrl('logos/model-sources/deep-seek.svg'),
	Google: publicAssetUrl('logos/model-sources/google.svg'),
	OpenAI: publicAssetUrl('logos/model-sources/openai.svg'),
	EuroLLM: publicAssetUrl('logos/model-sources/eurollm.svg'),
	Multiverse: publicAssetUrl('logos/model-sources/multiverse.svg'),
}

export function getProviderInitials(provider: string): string {
	const parts = provider.trim().split(/\s+/)
	if (parts.length >= 2) {
		const first = parts[0]?.[0] ?? ''
		const second = parts[1]?.[0] ?? ''
		return (first + second).toUpperCase()
	}
	return provider.slice(0, 2).toUpperCase()
}

/**
 * Catalog logo URL for a provider. Alibaba + "Qwen" in the model name uses the Qwen mark.
 */
export function getModelProviderLogoSrc(
	provider: string,
	modelName?: string,
): string | undefined {
	const p = provider.trim()
	if (p === 'Alibaba' && modelName != null && /qwen/i.test(modelName)) {
		return publicAssetUrl('logos/model-sources/qwen.svg')
	}
	return MODEL_PROVIDER_LOGO_BY_PROVIDER[p]
}
