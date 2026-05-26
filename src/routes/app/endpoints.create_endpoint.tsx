import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	Info,
	Rocket,
} from 'lucide-react'
import { useMemo, useEffect, useState } from 'react'
import { EndpointModelSelectSheet } from '@/components/endpoint-wizard/EndpointModelSelectSheet'
import { BasicSetupStep } from '@/components/endpoint-wizard/BasicSetupStep'
import { ModelLifecycleAlert } from '@/components/model-detail/ModelLifecycleAlert'
import { ReviewStep } from '@/components/endpoint-wizard/ReviewStep'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { WizardStepper } from '@/components/wizard/WizardStepper'
import {
	deployments,
	endpoints,
	getProviderOptions,
	models,
	type Model,
	type ProviderOption,
} from '@/data/mockData'
import {
	getModelModalityLabel,
	getOverallModelScore,
	getModelParameterCount,
	overallScoreTextClass,
} from '@/lib/model-metrics'
import {
	canCreateInferenceEndpoint,
	getModelStatusBadgeVariant,
} from '@/lib/model-lifecycle'
import {
	getModelProviderLogoSrc,
	getProviderInitials,
} from '@/lib/model-provider-logos'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/endpoints/create_endpoint')({
	validateSearch: (search: Record<string, unknown>) => ({
		model: (search.model as string) ?? '',
	}),
	component: RouteComponent,
})

type StepId = 0 | 1
type EndpointType = 'Production' | 'POC' | 'Demo'

const ENDPOINT_WIZARD_STEPPER_ITEMS = [
	{ id: 'basic', label: 'Basic' },
	{ id: 'review', label: 'Review & Deploy' },
] as const

function formatEurPer1M(value: number): string {
	return `€${value.toFixed(2)} / 1M`
}

/** Cheapest selectable row uses lowest combined In+Out €/1M, then lowest In, then Out. */
function pickCheapestProviderOption(
	providers: ProviderOption[],
): ProviderOption | null {
	if (providers.length === 0) return null
	return providers.reduce((best, p) => {
		const sum = p.inputPer1M + p.outputPer1M
		const bestSum = best.inputPer1M + best.outputPer1M
		if (sum !== bestSum) return sum < bestSum ? p : best
		if (p.inputPer1M !== best.inputPer1M)
			return p.inputPer1M < best.inputPer1M ? p : best
		return p.outputPer1M < best.outputPer1M ? p : best
	})
}

const MISSING_VALUE_PLACEHOLDER = '- -'

function getModelDetailParameterCount(model: Model): number {
	return getModelParameterCount(model)
}

function formatDetailParameters(parameters: number | null | undefined): string {
	if (!parameters) return MISSING_VALUE_PLACEHOLDER
	if (parameters >= 1_000_000_000) {
		return `${Math.round(parameters / 1_000_000_000)}B`
	}
	if (parameters >= 1_000_000) return `${Math.round(parameters / 1_000_000)}M`
	return String(parameters)
}

function formatDetailContextWindow(tokens: number | null | undefined): string {
	if (!tokens) return MISSING_VALUE_PLACEHOLDER
	if (tokens >= 1000) return `${Math.round(tokens / 1000)}K`
	return String(tokens)
}

function formatDetailMemory(bytes: number | null | undefined): string {
	if (!bytes) return MISSING_VALUE_PLACEHOLDER
	return `${Math.round(bytes / 1_000_000_000)} GB`
}

function ModelSummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-3 px-4 py-3">
			<span className="text-body-sm text-muted-foreground">{label}</span>
			<span className="min-w-0 truncate text-right text-body-sm text-foreground">
				{value}
			</span>
		</div>
	)
}

function ModelSummarySidebarEmpty({
	onSelectModel,
}: {
	onSelectModel: () => void
}) {
	return (
		<aside className="min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
			<Card className="relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent"
				/>
				<div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
					<p className="max-w-[240px] text-body-sm text-muted-foreground">
						Please select the underlying model that will serve this inference
						endpoint.
					</p>
					<Button
						type="button"
						className="w-full max-w-[240px]"
						onClick={onSelectModel}
					>
						Browse models
					</Button>
				</div>
			</Card>
		</aside>
	)
}

function ModelSummarySidebar({
	model,
	providerCount,
	inputCostPer1M,
	outputCostPer1M,
}: {
	model: Model
	providerCount: number
	inputCostPer1M: number
	outputCostPer1M: number
}) {
	const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name)
	const capabilityScore = getOverallModelScore(model)
	const parameterCount = getModelDetailParameterCount(model)
	const parameterLabel = formatDetailParameters(parameterCount)
	const minMemoryLabel = formatDetailMemory(Math.max(parameterCount * 2, 0))
	const modalityLabel = getModelModalityLabel(model)
	const providerInitials = getProviderInitials(model.provider)
	const licenseLabel =
		model.hosting === 'Booster Powered' ? 'Commercial' : 'Open Source'

	return (
		<aside className="min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
			<Card className="relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent"
				/>

				<div className="relative space-y-4 border-b border-border p-4">
					<div className="flex items-start gap-3">
						<Avatar className="h-icon-40 w-icon-40 rounded-lg border border-border bg-background">
							{providerLogoSrc ? (
								<AvatarImage src={providerLogoSrc} alt="" />
							) : null}
							<AvatarFallback className="rounded-lg text-body-sm-strong">
								{providerInitials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<h2 className="truncate text-body-sm-strong text-foreground">
								{model.name}
							</h2>
							<p className="text-caption text-muted-foreground">
								{model.provider}
							</p>
						</div>
					</div>

					<p className="text-body-sm text-muted-foreground">
						{model.description}
					</p>

					<div className="flex flex-wrap gap-2">
						<Badge
							variant={getModelStatusBadgeVariant(model.status)}
							appearance="pill"
							size="24"
						>
							{model.status}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{modalityLabel}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{licenseLabel}
						</Badge>
						<Badge variant="outline" appearance="ghost" size="24">
							{providerCount} {providerCount === 1 ? 'provider' : 'providers'}
						</Badge>
					</div>
				</div>

				<div className="relative flex items-center justify-between gap-3 border-b border-border px-4 py-3">
					<div className="flex items-center gap-1">
						<span className="text-body-sm text-muted-foreground">
							Capability score
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="h-icon-16 w-icon-16 cursor-help text-muted-foreground" />
							</TooltipTrigger>
							<TooltipContent className="max-w-page-intro">
								Aggregated score from model capability benchmarks in this
								catalog.
							</TooltipContent>
						</Tooltip>
					</div>
					<span
						className={cn(
							'text-h2 leading-none tabular-nums',
							overallScoreTextClass(capabilityScore),
						)}
					>
						{capabilityScore}
					</span>
				</div>

				<div className="relative divide-y divide-border">
					<ModelSummaryRow label="Parameters" value={parameterLabel} />
					<ModelSummaryRow
						label="Context Window"
						value={formatDetailContextWindow(model.contextLength)}
					/>
					<ModelSummaryRow label="Min. Memory" value={minMemoryLabel} />
					<ModelSummaryRow
						label="Input Tokens"
						value={formatEurPer1M(inputCostPer1M)}
					/>
					<ModelSummaryRow
						label="Output Tokens"
						value={formatEurPer1M(outputCostPer1M)}
					/>
				</div>
			</Card>
		</aside>
	)
}

function RouteComponent() {
	const navigate = useNavigate()
	const { model: modelFromSearch } = Route.useSearch()

	const selectedModel = useMemo(() => {
		if (!modelFromSearch || !models.some((m) => m.id === modelFromSearch)) {
			return null
		}
		return models.find((m) => m.id === modelFromSearch) ?? null
	}, [modelFromSearch])

	const [step, setStep] = useState<StepId>(0)
	const [endpointName, setEndpointName] = useState('')
	const [endpointType] = useState<EndpointType>('Production')
	const [useCase, setUseCase] = useState('')
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
	const [selectedProviderId, setSelectedProviderId] =
		useState<string>('recommended')
	const [isDeploying, setIsDeploying] = useState(false)
	const [modelPickerOpen, setModelPickerOpen] = useState(false)

	const openModelPicker = () => {
		setModelPickerOpen(true)
	}

	useEffect(() => {
		if (!selectedModel && step > 0) {
			setStep(0)
		}
	}, [selectedModel, step])

	const providerOptions = useMemo(
		() => (selectedModel ? getProviderOptions(selectedModel.id) : []),
		[selectedModel],
	)

	const selectableProviderOptions = useMemo(
		() =>
			providerOptions.filter((p) => p.id !== 'model-provider-fallback'),
		[providerOptions],
	)

	const cheapestSelectableProvider = useMemo(
		() => pickCheapestProviderOption(selectableProviderOptions),
		[selectableProviderOptions],
	)

	useEffect(() => {
		if (!selectedModel?.id || !cheapestSelectableProvider) return
		setSelectedProviderId(cheapestSelectableProvider.id)
	}, [selectedModel?.id, cheapestSelectableProvider?.id])

	const recommendedProvider = useMemo(
		() =>
			providerOptions.find((provider) => provider.recommended) ??
			providerOptions[0] ??
			null,
		[providerOptions],
	)
	const selectedProvider = useMemo(() => {
		if (!recommendedProvider) return null
		return (
			providerOptions.find((provider) => provider.id === selectedProviderId) ??
			recommendedProvider
		)
	}, [providerOptions, recommendedProvider, selectedProviderId])

	const canProceed = useMemo(() => {
		if (!selectedModel) return false
		if (step === 0) {
			return endpointName.trim().length > 0 && useCase.trim().length > 0
		}
		return canCreateInferenceEndpoint(selectedModel) && Boolean(selectedProvider)
	}, [endpointName, selectedModel, selectedProvider, step, useCase])

	const estimatedMonthlyCost = useMemo(() => {
		if (!selectedProvider) return '0'
		const averagePer1M =
			(selectedProvider.inputPer1M + selectedProvider.outputPer1M) / 2
		return averagePer1M.toFixed(0)
	}, [selectedProvider])

	const providerCount = selectableProviderOptions.length || 1

	const summaryInputCostPer1M =
		selectedProvider?.inputPer1M ?? selectedModel?.inputCostPer1M ?? 0
	const summaryOutputCostPer1M =
		selectedProvider?.outputPer1M ?? selectedModel?.outputCostPer1M ?? 0

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

	const handleCreate = () => {
		if (
			!selectedModel ||
			!selectedProvider ||
			!canProceed ||
			isDeploying ||
			!canCreateInferenceEndpoint(selectedModel)
		)
			return
		setIsDeploying(true)

		window.setTimeout(() => {
			const newEndpointId = `sp-${Date.now()}`
			const slug = endpointName.trim().toLowerCase().replace(/\s+/g, '-')
			const endpointUrl = `https://api.booster.ai/v1/endpoints/${endpointType.toLowerCase()}/${slug}`

			endpoints.push({
				id: newEndpointId,
				name: endpointName.trim(),
				type: endpointType,
				defaultDeployment: selectedModel.name,
				description: useCase.trim(),
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

			toast.success('Inference endpoint deployed', {
				description: `"${endpointName.trim()}" is live on ${selectedProvider.provider}.`,
			})
			navigate({
				to: '/app/endpoints/$endpointId',
				params: { endpointId: newEndpointId },
			})
		}, 900)
	}

	return (
		<>
		<div className="container max-w-6xl flex h-[calc(100vh-3.5rem)] min-h-0 flex-col gap-4 overflow-hidden py-4">
			<PageHeader
				className="shrink-0"
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
				title="Create Inference Endpoint"
				description="Configure and deploy a model inference endpoint with safety and budget controls."
			/>

			{selectedModel ? (
				<ModelLifecycleAlert model={selectedModel} className="shrink-0" />
			) : null}

			<div className="grid min-h-0 flex-1 basis-0 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-endpoint-deploy-wizard">
				{selectedModel ? (
					<ModelSummarySidebar
						model={selectedModel}
						providerCount={providerCount}
						inputCostPer1M={summaryInputCostPer1M}
						outputCostPer1M={summaryOutputCostPer1M}
					/>
				) : (
					<ModelSummarySidebarEmpty onSelectModel={openModelPicker} />
				)}

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
								showUseCasePresets={false}
							/>
						) : null}

						{step === 1 ? (
							selectedModel && selectedProvider ? (
								<ReviewStep
									endpointName={endpointName}
									useCase={useCase}
									selectedModel={selectedModel}
									selectedProvider={selectedProvider}
									setStep={setStep}
								/>
							) : null
						) : null}

						<div className="shrink-0 border-t border-border p-3">
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
										onClick={handleCreate}
										disabled={!canProceed || isDeploying}
									>
										{isDeploying ? (
											<>
												<Activity className="mr-1 h-icon-16 w-icon-16" />
												Deploying endpoint...
											</>
										) : (
											<>
												<Rocket className="mr-1 h-icon-16 w-icon-16" />
												Deploy inference endpoint
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

		<EndpointModelSelectSheet
			open={modelPickerOpen}
			onOpenChange={setModelPickerOpen}
			models={models}
			onConfirm={(modelId) => {
				navigate({
					to: '/app/endpoints/create_endpoint',
					search: { model: modelId },
					replace: true,
				})
				setModelPickerOpen(false)
			}}
		/>
		</>
	)
}
