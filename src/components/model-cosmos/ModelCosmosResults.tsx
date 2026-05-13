import { Link } from '@tanstack/react-router'
import { ModelCosmosCard } from '@/components/ModelCosmosCard'
import ModelFilters, {
	defaultFilters,
	type ModelFilterState,
} from '@/components/ModelFilters'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { models } from '@/data/mockData'

interface ModelCosmosResultsProps {
	showFilters: boolean
	filters: ModelFilterState
	setFilters: (filters: ModelFilterState) => void
	filtered: typeof models
	sortedFiltered: typeof models
	hasActiveFilters: boolean
	page: number
	setPage: (page: number | ((p: number) => number)) => void
	pageSize: number
}

export function ModelCosmosResults({
	showFilters,
	filters,
	setFilters,
	filtered,
	sortedFiltered,
	hasActiveFilters,
	page,
	setPage,
	pageSize,
}: ModelCosmosResultsProps) {
	const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / pageSize))
	const safePage = Math.min(page, totalPages)
	const pageStart = (safePage - 1) * pageSize
	const paginatedModels = sortedFiltered.slice(pageStart, pageStart + pageSize)

	return (
		<div className="flex gap-6">
			{/* Optional filter sidebar */}
			{showFilters && (
				<div className="w-64 flex-shrink-0">
					<Card className="sticky top-4">
						<CardContent className="p-4">
							<ModelFilters filters={filters} onChange={setFilters} />
						</CardContent>
					</Card>
				</div>
			)}

			{/* Main content area */}
			<div className="flex-1 min-w-0">
				{/* Results count */}
				{filtered.length > 0 && (
					<div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
						<span className="text-body-sm text-muted-foreground">
							{hasActiveFilters
								? `${filtered.length} model${filtered.length !== 1 ? 's' : ''} found`
								: `${filtered.length} models`}
						</span>
						{filtered.length > pageSize && (
							<span className="text-caption text-muted-foreground">
								Showing {pageStart + 1}–
								{Math.min(pageStart + pageSize, filtered.length)} of{' '}
								{filtered.length}
							</span>
						)}
					</div>
				)}

				{/* Model grid */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{paginatedModels.map((model) => (
						<Link
							key={model.id}
							to="/app/cosmos/$modelId"
							params={{ modelId: model.id }}
							className="block h-full min-w-0"
						>
							<ModelCosmosCard model={model} variant="basic" />
						</Link>
					))}
				</div>

				{/* Pagination */}
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

				{/* Empty state */}
				{filtered.length === 0 && (
					<div className="text-center py-12 text-muted-foreground">
						<p className="text-lg font-medium">No models match your filters</p>
						<p className="text-sm mt-1">Try adjusting your filter criteria</p>
						<Button
							variant="outline"
							size="sm"
							className="mt-3"
							onClick={() => setFilters({ ...defaultFilters })}
						>
							Reset Filters
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
