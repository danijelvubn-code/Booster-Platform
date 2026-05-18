import { Link } from '@tanstack/react-router'

import { ModelCosmosCard } from '@/components/ModelCosmosCard'
import {
	defaultFilters,
	type ModelFilterState,
} from '@/components/ModelFilters'
import { ModelCosmosFilterBar } from '@/components/model-cosmos/ModelCosmosFilterBar'
import { MODEL_COSMOS_RESULTS_REGION_ID } from '@/components/model-cosmos/model-cosmos-results-region'
import { Button } from '@/components/ui/button'
import type { models } from '@/data/mockData'

interface ModelCosmosResultsProps {
	showFilters: boolean
	catalog: typeof models
	filters: ModelFilterState
	setFilters: (filters: ModelFilterState) => void
	filtered: typeof models
	sortedFiltered: typeof models
	page: number
	setPage: (page: number | ((p: number) => number)) => void
	pageSize: number
}

export function ModelCosmosResults({
	showFilters,
	catalog,
	filters,
	setFilters,
	filtered,
	sortedFiltered,
	page,
	setPage,
	pageSize,
}: ModelCosmosResultsProps) {
	const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / pageSize))
	const safePage = Math.min(page, totalPages)
	const pageStart = (safePage - 1) * pageSize
	const paginatedModels = sortedFiltered.slice(pageStart, pageStart + pageSize)

	return (
		<div className="flex min-w-0 flex-col gap-6">
			{showFilters ? (
				<ModelCosmosFilterBar
					catalog={catalog}
					filters={filters}
					onFiltersChange={setFilters}
				/>
			) : null}

			<div
				id={MODEL_COSMOS_RESULTS_REGION_ID}
				className="min-w-0 flex-1 outline-none focus:outline-none"
				role="region"
				aria-label="Model search results"
				tabIndex={-1}
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{paginatedModels.map((model) => (
						<Link
							key={model.id}
							to="/app/cosmos/$modelId"
							params={{ modelId: model.id }}
							search={{ returnTo: '/app/cosmos', returnLabel: 'Cosmos' }}
							className="block h-full min-w-0"
						>
							<ModelCosmosCard model={model} variant="basic" />
						</Link>
					))}
				</div>

				{filtered.length > pageSize && (
					<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={safePage <= 1}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
						>
							Previous
						</Button>
						<span className="text-body-sm text-muted-foreground">
							Page {safePage} of {totalPages}
						</span>
						<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={safePage >= totalPages}
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						>
							Next
						</Button>
					</div>
				)}

				{filtered.length === 0 ? (
					<div className="py-12 text-center text-muted-foreground">
						<p className="text-lg font-medium text-foreground">
							No models match these filters
						</p>
						<p className="mt-1 text-body-sm">
							Try removing some filters or lowering the capability score.
						</p>
						<Button
							variant="outline"
							size="sm"
							className="mt-4"
							onClick={() => setFilters({ ...defaultFilters })}
						>
							Clear all filters
						</Button>
					</div>
				) : null}
			</div>
		</div>
	)
}
