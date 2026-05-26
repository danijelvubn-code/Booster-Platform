import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	Rocket,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { BasicSetupStep } from '@/components/endpoint-wizard/BasicSetupStep'
import { ModelLifecycleAlert } from '@/components/model-detail/ModelLifecycleAlert'
import { ReviewStep } from '@/components/endpoint-wizard/ReviewStep'
import { PageHeader } from '@/components/layout/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import { WizardStepper } from '@/components/wizard/WizardStepper'
import {
	deployments,
	endpoints,
	models,
	type ProviderOption,
} from '@/data/mockData'
import {
	formatContextWindowShort,
	getOverallModelScore,
	getModelParameterSizeLabel,
	modelHasVisionCapability,
} from '@/lib/model-metrics'
import {
	canCreateInferenceEndpoint,
	getModelStatusBadgeVariant,
} from '@/lib/model-lifecycle'

type StepId = 0 | 1
type Environment = 'Production' | 'Staging' | 'Development'

const ENDPOINT_WIZARD_STEPPER_ITEMS = [
	{ id: 'basic', label: 'Basic' },
	{ id: 'review', label: 'Review & Deploy' },
] as const

function getRecommendedProvider(_modelId: string): ProviderOption {
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

function getProviderOptions(modelId: string): ProviderOption[] {
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

export const Route = createFileRoute('/app/endpoints/deploy_endpoint')({
	validateSearch: (search: Record<string, unknown>) => ({
		model: (search.model as string) ?? '',
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { model: preselectedModelId } = Route.useSearch()

	const defaultModelId =
		preselectedModelId && models.some((m) => m.id === preselectedModelId)
			? preselectedModelId
			: models[0].id

	const [step, setStep] = useState<StepId>(0)
	const [endpointName, setEndpointName] = useState('')
	const [environment] = useState<Environment>('Production')
	const [useCase, setUseCase] = useState('')
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
	const [selectedModelId] = useState(defaultModelId)
	const [isDeploying, setIsDeploying] = useState(false)

	const selectedModel = useMemo(
		() => models.find((m) => m.id === selectedModelId) ?? models[0],
		[selectedModelId],
	)

	const providerOptions = useMemo(
		() => getProviderOptions(selectedModel.id),
		[selectedModel.id],
	)
	const recommendedProvider = useMemo(
		() =>
			providerOptions.find((provider) => provider.recommended) ??
			providerOptions[0],
		[providerOptions],
	)

	const selectedProvider = recommendedProvider

	const canProceed = useMemo(() => {
		if (step === 0) {
			return endpointName.trim().length > 0 && useCase.trim().length > 0
		}
		return canCreateInferenceEndpoint(selectedModel) && Boolean(selectedProvider)
	}, [endpointName, selectedModel, selectedProvider, step, useCase])

	const estimatedMonthlyCost = useMemo(() => {
		const averagePer1M =
			(selectedProvider.inputPer1M + selectedProvider.outputPer1M) / 2
		return averagePer1M.toFixed(0)
	}, [selectedProvider.inputPer1M, selectedProvider.outputPer1M])

	const selectedModelScore = Math.round(getOverallModelScore(selectedModel))
	const modelSizeTag = getModelParameterSizeLabel(selectedModel)
	const modelTags = [
		modelSizeTag,
		modelHasVisionCapability(selectedModel) ? 'MULTIMODAL' : 'TEXT',
		'API',
	]

	const goToStep = (target: StepId) => {
		if (target < step) {
			setStep(target)
		}
	}

	const goNext = () => {
		if (!canProceed) return
		setStep((current) => (current < 1 ? ((current + 1) as StepId) : current))
	}

	const goBack = () => {
		setStep((current) => (current > 0 ? ((current - 1) as StepId) : current))
	}

	const handleDeploy = () => {
		if (
			!canProceed ||
			isDeploying ||
			!canCreateInferenceEndpoint(selectedModel)
		)
			return
		setIsDeploying(true)

		window.setTimeout(() => {
			const newEndpointId = `sp-${Date.now()}`
			const slug = endpointName.trim().toLowerCase().replace(/\s+/g, '-')
			const endpointUrl = `https://api.booster.ai/v1/endpoints/${environment.toLowerCase()}/${slug}`
			const endpointType =
				environment === 'Production'
					? 'Production'
					: environment === 'Staging'
						? 'POC'
						: 'Demo'

			endpoints.push({
				id: newEndpointId,
				name: endpointName.trim(),
				type: endpointType,
				defaultDeployment: selectedModel.name,
				budgetUsed: 0,
				status: 'Running',
				monthlySpend: 0,
				inputTokens: 0,
				outputTokens: 0,
				endpoint: endpointUrl,
				tokenBudget: 1_000_000,
				monthlyBudgetEur: Math.max(1, Math.round(Number(estimatedMonthlyCost))),
				performanceProfile: 'best-effort',
			})

			deployments[newEndpointId] = [
				{
					id: `dep-${Date.now()}`,
					name: `${selectedModel.name.toLowerCase().replace(/\s+/g, '-')}-${slug}`,
					model: selectedModel.name,
					version: selectedModel.version,
					mode: 'Shared',
					budgetUsed: 0,
					slaStatus: 'OK',
					region:
						selectedProvider.provider === 'Scaleway' ? 'EU-West' : 'EU-Central',
					confidentialCompute: false,
					latencyP50: selectedProvider.latencyMs,
					costPer1MTokens: selectedProvider.inputPer1M,
				},
			]

			toast.success('Endpoint deployed', {
				description: `"${endpointName.trim()}" is live on ${selectedProvider.provider}.`,
			})
			navigate({ to: '/app/overview' })
		}, 900)
	}

	return (
		<div className="container max-w-6xl flex h-full min-h-0 flex-1 flex-col gap-4 overflow-hidden py-4">
			<PageHeader
				leading={
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 w-fit"
						onClick={() => window.history.back()}
					>
						<ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
					</Button>
				}
				titleSize="section"
				title="Deploy Inference Endpoint"
				description="Configure and deploy a model inference endpoint with safety and budget controls."
			/>

			<ModelLifecycleAlert model={selectedModel} className="shrink-0" />

			<div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-endpoint-deploy-wizard">
				<aside className="h-full min-w-0 lg:col-span-1">
					<Card className="flex h-full flex-col overflow-hidden p-0">
						<div className="flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-between gap-x-3 border-b border-border bg-success/7 px-4">
							<span className="min-w-0 flex-1 truncate text-body-sm-strong leading-tight text-foreground">
								{selectedModel.name}
							</span>
							<span className="shrink-0 text-h2 leading-none text-success tabular-nums">
								{selectedModelScore}
							</span>
						</div>
						<div className="space-y-4 border-b border-border p-4">
							<p className="text-body-sm text-muted-foreground">
								{selectedModel.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{modelTags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										appearance="ghost"
										size="24"
									>
										{tag}
									</Badge>
								))}
							</div>
						</div>
						<div className="divide-y divide-border">
							<div className="flex items-center justify-between px-4 py-3">
								<span className="text-body-sm text-muted-foreground">
									Status
								</span>
								<Badge
									variant={getModelStatusBadgeVariant(selectedModel.status)}
									size="20"
								>
									{selectedModel.status}
								</Badge>
							</div>
							<div className="flex items-center justify-between px-4 py-3">
								<span className="text-body-sm text-muted-foreground">
									Version
								</span>
								<span className="text-body-sm text-foreground">
									v{selectedModel.version}
								</span>
							</div>
							<div className="flex items-center justify-between px-4 py-3">
								<span className="text-body-sm text-muted-foreground">
									Domain
								</span>
								<span className="text-body-sm text-foreground">
									{selectedModel.domain}
								</span>
							</div>
						</div>
					</Card>
				</aside>

				<section className="min-h-0 h-full min-w-0 lg:col-span-1">
					<Card className="flex h-full flex-col overflow-hidden p-0">
						<div className="flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-center border-b border-border px-4">
							<WizardStepper
								className="min-h-0 min-w-0"
								steps={[...ENDPOINT_WIZARD_STEPPER_ITEMS]}
								currentStep={step}
								onStepChange={(index) => goToStep(index as StepId)}
							/>
						</div>

						{step === 0 ? (
							<BasicSetupStep
								endpointName={endpointName}
								setEndpointName={setEndpointName}
								useCase={useCase}
								setUseCase={setUseCase}
								selectedPreset={selectedPreset}
								setSelectedPreset={setSelectedPreset}
							/>
						) : null}

						{step === 1 ? (
							<ReviewStep
								endpointName={endpointName}
								useCase={useCase}
								selectedModel={selectedModel}
								selectedProvider={selectedProvider}
								setStep={setStep}
							/>
						) : null}

						<div className="border-t border-border p-3">
							<div className="flex items-center justify-between gap-3">
								<Button
									variant="outline"
									onClick={goBack}
									disabled={step === 0 || isDeploying}
								>
									<ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
								</Button>

								{step < 1 ? (
									<Button
										onClick={goNext}
										disabled={!canProceed || isDeploying}
									>
										Next <ArrowRight className="ml-1 h-icon-16 w-icon-16" />
									</Button>
								) : (
									<Button
										onClick={handleDeploy}
										disabled={!canProceed || isDeploying}
									>
										{isDeploying ? (
											<>
												<Activity className="mr-1 h-icon-16 w-icon-16" />{' '}
												Deploying endpoint...
											</>
										) : (
											<>
												<Rocket className="mr-1 h-icon-16 w-icon-16" /> Deploy
												inference endpoint
											</>
										)}
									</Button>
								)}
							</div>
						</div>
					</Card>
				</section>
			</div>
		</div>
	)
}
