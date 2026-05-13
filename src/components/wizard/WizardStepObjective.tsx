import { optimizationObjectives } from '@/data/mockData'
import type { WizardState } from '@/lib/model-scoring'
import { OptionCard } from './OptionCard'

interface WizardStepObjectiveProps {
	state: WizardState
	update: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
}

export function WizardStepObjective({
	state,
	update,
}: WizardStepObjectiveProps) {
	return (
		<>
			<div>
				<h2 className="text-lg font-semibold">
					What matters most for this deployment?
				</h2>
				<p className="text-sm text-muted-foreground">
					Select your top priority. We will optimize recommendations
					accordingly.
				</p>
			</div>
			<div className="grid gap-2">
				{optimizationObjectives.map((obj) => (
					<OptionCard
						key={obj.label}
						label={obj.label}
						description={obj.description}
						selected={state.objective === obj.label}
						onClick={() => update('objective', obj.label)}
					/>
				))}
			</div>
		</>
	)
}
