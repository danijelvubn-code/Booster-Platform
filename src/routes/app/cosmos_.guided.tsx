import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
	ArrowLeft,
	ArrowRight,
	Check,
	Save,
	Sparkles,
	Target,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/sonner'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { SavedProfilesMenu } from '@/components/wizard/SavedProfilesMenu'
import { SaveProfileDialog } from '@/components/wizard/SaveProfileDialog'
import { WizardStepObjective } from '@/components/wizard/WizardStepObjective'
import { WizardStepResults } from '@/components/wizard/WizardStepResults'
import { WizardStepUseCase } from '@/components/wizard/WizardStepUseCase'
import {
	getSavedUseCaseProfiles,
	type SavedUseCaseProfile,
} from '@/data/savedUseCaseProfiles'
import { useSaveProfileDialog } from '@/hooks/useSaveProfileDialog'
import {
	defaultWizardState,
	scoreModels,
	type WizardState,
} from '@/lib/model-scoring'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/cosmos_/guided')({
	validateSearch: (search: Record<string, unknown>) => ({
		resume: (search.resume as string) ?? '',
	}),
	component: RouteComponent,
})

const stepsMeta = [
	{ title: 'Use Case', icon: Target },
	{ title: 'Objective', icon: Sparkles },
	{ title: 'Results', icon: Check },
]

function getInitialWizardState(resumeId?: string) {
	if (!resumeId) return { step: 0, state: defaultWizardState, profileId: null }

	const profile = getSavedUseCaseProfiles().find((p) => p.id === resumeId)
	if (!profile) return { step: 0, state: defaultWizardState, profileId: null }

	return {
		step: profile.lastStep,
		state: { ...profile.state },
		profileId: resumeId,
	}
}

function RouteComponent() {
	const { resume: resumeId } = Route.useSearch()
	const navigate = useNavigate()

	// Initialize wizard state from URL or defaults
	const initial = getInitialWizardState(resumeId)
	const [step, setStep] = useState(initial.step)
	const [state, setState] = useState<WizardState>(initial.state)
	const [loadedProfileId, setLoadedProfileId] = useState<string | null>(
		initial.profileId,
	)

	// Computed values
	const results = useMemo(() => scoreModels(state), [state])
	const progress = ((step + 1) / stepsMeta.length) * 100

	// Save dialog management (consolidates 3 useState into 1 hook)
	const saveDialog = useSaveProfileDialog(
		state,
		step,
		loadedProfileId,
		setLoadedProfileId,
	)

	// Wizard state updater
	const update = <K extends keyof WizardState>(key: K, value: WizardState[K]) =>
		setState((prev) => ({ ...prev, [key]: value }))

	// Step validation
	const canProceed = () => {
		switch (step) {
			case 0:
				return state.useCase.length > 0
			case 1:
				return state.objective.length > 0
			default:
				return true
		}
	}

	// Profile loading
	const loadProfile = (profile: SavedUseCaseProfile) => {
		setState({ ...profile.state })
		setStep(profile.lastStep)
		setLoadedProfileId(profile.platform ? null : profile.id)
		toast.success(profile.platform ? 'Template loaded' : 'Profile loaded', {
			description: profile.platform
				? `Started from "${profile.name}" template — save to create your own copy.`
				: `Resumed "${profile.name}"`,
		})
	}

	return (
		<div className="container space-y-6 py-8">
			<div className="flex items-center justify-between">
				<BackButton to="/app/model-cosmos" label="Model Cosmos" />
				<div className="flex items-center gap-2">
					<SavedProfilesMenu
						onLoadProfile={loadProfile}
						loadedProfileId={loadedProfileId}
					/>
					<Button
						variant="outline"
						size="sm"
						onClick={() => saveDialog.openDialog(false)}
					>
						<Save className="h-3.5 w-3.5 mr-1" /> Save
					</Button>
				</div>
			</div>

			<div>
				<h1 className="text-2xl font-bold">Guided Model Selection</h1>
				<p className="text-muted-foreground text-sm mt-1">
					Answer a few questions and we will recommend the best-fit models for
					your use case.
				</p>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>
						Step {step + 1} of {stepsMeta.length}: {stepsMeta[step]?.title}
					</span>
					<span>{Math.round(progress)}%</span>
				</div>
				<Progress value={progress} size="dense" />
				<div className="flex gap-1">
					{stepsMeta.map((s, i) => (
						<Tooltip key={s.title}>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={() => i < step && setStep(i)}
									className={cn(
										'flex-1 h-1 rounded-full transition-colors',
										i === step
											? 'bg-primary'
											: i < step
												? 'bg-primary/40 cursor-pointer'
												: 'bg-muted',
									)}
								/>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="text-xs">
								{s.title}
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</div>

			<Card>
				<CardContent className="p-6 space-y-4">
					{step === 0 && <WizardStepUseCase state={state} update={update} />}
					{step === 1 && <WizardStepObjective state={state} update={update} />}
					{step === 2 && <WizardStepResults state={state} results={results} />}
				</CardContent>
			</Card>

			<div className="flex justify-between">
				<Button
					variant="outline"
					disabled={step === 0}
					onClick={() => setStep(step - 1)}
				>
					<ArrowLeft className="h-4 w-4 mr-1" /> Back
				</Button>
				{step < stepsMeta.length - 1 ? (
					<Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
						Next <ArrowRight className="h-4 w-4 ml-1" />
					</Button>
				) : (
					<Button
						variant="outline"
						onClick={() =>
							navigate({ to: '/app/cosmos', search: { hosting: '' } })
						}
					>
						Back to Model Cosmos
					</Button>
				)}
			</div>

			<SaveProfileDialog
				open={saveDialog.dialogState.isOpen}
				onOpenChange={saveDialog.closeDialog}
				saveName={saveDialog.dialogState.name}
				setSaveName={saveDialog.setName}
				state={state}
				currentStep={step}
				totalSteps={stepsMeta.length}
				saveAndExit={saveDialog.dialogState.shouldExit}
				onConfirmSave={saveDialog.confirmSave}
				loadedProfileId={loadedProfileId}
			/>
		</div>
	)
}
