import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useCaseCategories } from '@/data/mockData'
import type { WizardState } from '@/lib/model-scoring'
import { OptionCard } from './OptionCard'

interface WizardStepUseCaseProps {
	state: WizardState
	update: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
}

const USE_CASES = useCaseCategories.map((u) => u.label)

export function WizardStepUseCase({ state, update }: WizardStepUseCaseProps) {
	const [useCaseSearch, setUseCaseSearch] = useState('')

	const filteredUseCases = useMemo(() => {
		const q = useCaseSearch.toLowerCase()
		return USE_CASES.filter((uc) => uc.toLowerCase().includes(q))
	}, [useCaseSearch])

	return (
		<>
			<div>
				<h2 className="text-lg font-semibold">What are you building?</h2>
				<p className="text-sm text-muted-foreground">
					Help us understand your primary use case so we can recommend the
					best-fit models.
				</p>
			</div>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search use cases..."
					value={useCaseSearch}
					onChange={(e) => setUseCaseSearch(e.target.value)}
					className="pl-9"
				/>
			</div>
			<div className="grid gap-2">
				{filteredUseCases.map((uc) => (
					<OptionCard
						key={uc}
						label={uc}
						selected={state.useCase === uc}
						onClick={() => update('useCase', uc)}
					/>
				))}
				<OptionCard
					label="Other"
					description="Describe your custom use case"
					selected={state.useCase === 'Other'}
					onClick={() => update('useCase', 'Other')}
				/>
			</div>
			{state.useCase === 'Other' && (
				<Input
					placeholder="Describe your use case..."
					value={state.customUseCase}
					onChange={(e) => update('customUseCase', e.target.value)}
					className="mt-2"
				/>
			)}
		</>
	)
}
