import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import {
	applyModelFilters,
	defaultFilters,
	defaultSort,
	isFiltersActive,
	type ModelFilterState,
	type ModelSortId,
	sortModels,
} from '@/components/ModelFilters'
import { ModelCosmosResults } from '@/components/model-cosmos/ModelCosmosResults'
import { ModelCosmosSearchBar } from '@/components/model-cosmos/ModelCosmosSearchBar'
import { models } from '@/data/mockData'

export const Route = createFileRoute('/app/cosmos')({
	validateSearch: (search: Record<string, unknown>) => ({
		hosting: (search.hosting as string) ?? '',
	}),
	component: ModelCosmosPage,
})

const COSMOS_PAGE_SIZE = 16

const modelCatalogOrder = new Map(models.map((m, i) => [m.id, i]))

function ModelCosmosPage() {
	const { hosting: hostingParam } = Route.useSearch()
	const [search, setSearch] = useState('')
	const [filters, setFilters] = useState<ModelFilterState>(() => ({
		...defaultFilters,
		...(hostingParam ? { hosting: [hostingParam] } : {}),
	}))
	const [sort, setSort] = useState<ModelSortId>(defaultSort)
	const [showFilters, setShowFilters] = useState(false)
	const [page, setPage] = useState(1)

	const filtered = useMemo(
		() =>
			applyModelFilters(
				models.filter((m) => {
					const q = search.toLowerCase()
					return (
						m.name.toLowerCase().includes(q) ||
						m.provider.toLowerCase().includes(q)
					)
				}),
				filters,
				models,
			),
		[search, filters],
	)

	const sortedFiltered = useMemo(
		() => sortModels(filtered, sort, modelCatalogOrder),
		[filtered, sort],
	)

	useEffect(() => {
		setPage(1)
	}, [search, filters, sort])

	const hasActiveFilters = isFiltersActive(filters)

	return (
		<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
			<div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
				<PageContainer gap="space-y-6" className="py-6">
					<PageHeader
						title="Model Cosmos"
						description="Explore models designed for different tasks and performance needs. Assign to endpoints and switch anytime without disruption."
						descriptionMaxWidthPageIntro
					/>

					<ModelCosmosSearchBar
						search={search}
						setSearch={setSearch}
						showFilters={showFilters}
						setShowFilters={setShowFilters}
						hasActiveFilters={hasActiveFilters}
						sort={sort}
						onSortChange={setSort}
						totalResults={sortedFiltered.length}
						page={page}
						pageSize={COSMOS_PAGE_SIZE}
					/>

					<ModelCosmosResults
						showFilters={showFilters}
						catalog={models}
						filters={filters}
						setFilters={setFilters}
						filtered={filtered}
						sortedFiltered={sortedFiltered}
						page={page}
						setPage={setPage}
						pageSize={COSMOS_PAGE_SIZE}
					/>
				</PageContainer>
			</div>
		</div>
	)
}
