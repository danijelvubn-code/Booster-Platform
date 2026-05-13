import { useId } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const USE_CASE_PRESETS = [
	'Code Generation',
	'Document Extraction',
	'Customer Support',
	'Internal Search',
	'Data Analysis',
	'Content Generation',
	'Other',
] as const

type BasicSetupStepProps = {
	endpointName: string
	setEndpointName: (value: string) => void
	useCase: string
	setUseCase: (value: string) => void
	selectedPreset: string | null
	setSelectedPreset: (value: string | null) => void
}

export function BasicSetupStep({
	endpointName: _endpointName,
	setEndpointName,
	useCase,
	setUseCase,
	selectedPreset,
	setSelectedPreset,
}: BasicSetupStepProps) {
	const endpointNameId = useId()
	const useCaseId = useId()

	const handlePresetClick = (preset: string) => {
		setSelectedPreset(selectedPreset === preset ? null : preset)
		if (!useCase.trim()) {
			setUseCase(`${preset} use case for enterprise inference endpoint.`)
		}
	}

	return (
		<div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
			<div className="space-y-1">
				<h2 className="text-h3 text-foreground">Basic Setup</h2>
				<p className="text-body-sm text-muted-foreground">
					Define where the model will run and how it will be identified within
					your project.
				</p>
			</div>

			<div className="space-y-2">
				<Label htmlFor={endpointNameId}>
					Inference Endpoint Name <span className="text-destructive">*</span>
				</Label>
				<Input
					id={endpointNameId}
					onChange={(event) => setEndpointName(event.target.value)}
					placeholder="Name your endpoint..."
				/>
			</div>

			<div className="space-y-2">
				<Label>Use Case Preset</Label>
				<div className="flex flex-wrap gap-2">
					{USE_CASE_PRESETS.map((preset) => (
						<button
							key={preset}
							type="button"
							onClick={() => handlePresetClick(preset)}
							className={cn(
								'rounded-md border px-3 py-1.5 text-body-sm transition-colors',
								selectedPreset === preset
									? 'border-primary bg-primary/10 text-primary'
									: 'border-border bg-background text-muted-foreground hover:bg-muted',
							)}
						>
							{preset}
						</button>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor={useCaseId}>Use Case Description</Label>
				<Textarea
					id={useCaseId}
					required
					placeholder="Describe your use case in a few sentences. For example: We need to process insurance claim documents and extract policy numbers, dates, and damage descriptions."
					value={useCase}
					onChange={(event) => setUseCase(event.target.value)}
					rows={5}
				/>
				<p className="text-caption text-muted-foreground">
					Use case context helps Booster recommend the best model and provider.
				</p>
			</div>
		</div>
	)
}
