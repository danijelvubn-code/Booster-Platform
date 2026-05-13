import { models } from '@/data/mockData'
import type { ModelRecord } from '@/lib/model-metrics'

export interface WizardState {
	useCase: string
	customUseCase: string
	objective: string
	monthlyVolume: string
	trafficPattern: string
	audience: string
	maxLatency: string
	ttftCritical: string
	sensitiveData: boolean
	dataTypes: string[]
	moderation: string
	deploymentPref: string
	costSensitivity: string
	monthlyBudget: string
}

export const defaultWizardState: WizardState = {
	useCase: '',
	customUseCase: '',
	objective: '',
	monthlyVolume: '',
	trafficPattern: '',
	audience: '',
	maxLatency: '',
	ttftCritical: '',
	sensitiveData: false,
	dataTypes: [],
	moderation: '',
	deploymentPref: '',
	costSensitivity: '',
	monthlyBudget: '',
}

export interface ScoredModel {
	model: ModelRecord
	score: number
	highlights: string[]
	tags: string[]
}

export function scoreModels(state: WizardState): ScoredModel[] {
	return models
		.map((m) => {
			let score = 50
			const highlights: string[] = []
			const tags: string[] = []

			// Use case scoring
			if (
				state.useCase === 'Code Generation' &&
				m.strengths.includes('Code Generation')
			) {
				score += 15
				highlights.push('Purpose-built for code generation')
			}
			if (
				state.useCase === 'RAG / Knowledge Assistant' &&
				m.strengths.includes('RAG')
			) {
				score += 15
				highlights.push('Optimized for RAG workflows')
			}
			if (
				state.useCase === 'Document Summarization' &&
				(m.strengths.includes('Long Context') ||
					m.strengths.includes('Analysis'))
			) {
				score += 12
				highlights.push('Strong summarization capability')
			}
			if (
				state.useCase === 'Customer Support Bot' &&
				m.strengths.includes('Multilingual')
			) {
				score += 10
				highlights.push('Multilingual support for diverse users')
			}
			if (
				state.useCase === 'Translation' &&
				m.strengths.includes('Multilingual')
			) {
				score += 15
				highlights.push('Excellent multilingual capabilities')
			}
			if (
				state.useCase === 'Multimodal (Text + Image)' &&
				m.strengths.includes('Multimodal')
			) {
				score += 15
				highlights.push('Native multimodal support')
			}
			if (state.useCase === 'Conversational Assistant') {
				score += 5
			}
			if (state.useCase === 'Classification' && m.strengths.includes('Speed')) {
				score += 8
			}
			if (
				state.useCase === 'Content Generation' &&
				m.capabilities.some((c) => c.name === 'Language' && c.score >= 90)
			) {
				score += 10
				highlights.push('High-quality language generation')
			}

			// Objective scoring
			if (state.objective === 'Lowest Cost') {
				if (m.inputCostPer1M <= 1) {
					score += 15
					tags.push('Cost Efficient')
				} else if (m.inputCostPer1M <= 3) {
					score += 8
				}
			}
			if (state.objective === 'Highest Accuracy') {
				const mmlu = m.benchmarks.find((b) => b.name === 'MMLU')
				if (mmlu && mmlu.score >= 85) {
					score += 15
					highlights.push('Top-tier benchmark accuracy')
					tags.push('High Accuracy')
				}
			}
			if (state.objective === 'Fastest Response Time') {
				if (m.tokensPerSecond >= 100) {
					score += 15
					highlights.push('Ultra-fast inference speed')
				} else if (m.tokensPerSecond >= 50) {
					score += 8
				}
			}
			if (state.objective === 'Balanced Performance') {
				score += 8
			}
			if (state.objective === 'Compliance / Regulated Workloads') {
				const safety = m.benchmarks.find((b) => b.name === 'TruthfulQA')
				if (safety && safety.score >= 75) {
					score += 12
					tags.push('Regulated Safe')
				}
				if (m.strengths.includes('Safety')) {
					score += 10
					highlights.push('Industry-leading safety features')
				}
			}
			if (state.objective === 'Sustainability / Energy Efficient') {
				if (m.sustainability === 'A') {
					score += 15
					tags.push('Eco-Friendly')
				}
			}

			// Additional criteria scoring
			if (state.audience === 'Yes – customer-facing') {
				tags.push('Production Ready')
				score += 3
			}
			if (state.maxLatency === '< 500ms' && m.tokensPerSecond >= 100) {
				score += 8
				highlights.push('Meets <500ms latency requirement')
			} else if (state.maxLatency === '< 1s' && m.tokensPerSecond >= 50) {
				score += 5
				highlights.push('Meets <1s latency requirement')
			}
			if (
				state.costSensitivity === 'Highly cost sensitive' &&
				m.inputCostPer1M <= 1
			) {
				score += 10
				tags.push('Budget Friendly')
			}
			if (state.sensitiveData && m.hosting === 'Booster Powered') {
				score += 5
				highlights.push('Self-hosted for data sovereignty')
			}
			if (
				state.deploymentPref === 'Protected environment required' &&
				m.hosting === 'Booster Powered'
			) {
				score += 8
				tags.push('Regulated Safe')
			}

			// Clamp score
			score = Math.min(99, Math.max(10, score))

			return {
				model: m,
				score,
				highlights: highlights.slice(0, 3),
				tags: [...new Set(tags)].slice(0, 3),
			}
		})
		.sort((a, b) => b.score - a.score)
}
