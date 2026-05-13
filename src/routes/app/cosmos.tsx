import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import {
	applyModelFilters,
	defaultFilters,
	isFiltersActive,
	type ModelFilterState,
} from '@/components/ModelFilters'
import { ModelCosmosResults } from '@/components/model-cosmos/ModelCosmosResults'
import {
	type CosmosSortOption,
	ModelCosmosSearchBar,
} from '@/components/model-cosmos/ModelCosmosSearchBar'
import { Button } from '@/components/ui/button'
import { models, useCaseCategories } from '@/data/mockData'
import { getOverallModelScore } from '@/lib/model-metrics'

export const Route = createFileRoute('/app/cosmos')({
	validateSearch: (search: Record<string, unknown>) => ({
		hosting: (search.hosting as string) ?? '',
	}),
	component: ModelCosmosPage,
})

const COSMOS_PAGE_SIZE = 16

const modelCatalogOrder = new Map(models.map((m, i) => [m.id, i]))

function efficiencyRank(sustainability: string | undefined): number {
	const g = (sustainability ?? 'B').toUpperCase().charAt(0)
	const idx = 'ABCDE'.indexOf(g)
	return idx >= 0 ? 5 - idx : 0
}

function sortCosmosModels(
	list: typeof models,
	option: CosmosSortOption,
): typeof models {
	const out = [...list]
	const byCatalog = (a: (typeof models)[number], b: (typeof models)[number]) =>
		(modelCatalogOrder.get(a.id) ?? 0) - (modelCatalogOrder.get(b.id) ?? 0)

	switch (option) {
		case 'best-match':
			out.sort(byCatalog)
			break
		case 'benchmark-desc':
			out.sort(
				(a, b) =>
					getOverallModelScore(b) - getOverallModelScore(a) || byCatalog(a, b),
			)
			break
		case 'efficiency-desc':
			out.sort(
				(a, b) =>
					efficiencyRank(b.sustainability) - efficiencyRank(a.sustainability) ||
					byCatalog(a, b),
			)
			break
		case 'cost-asc':
			out.sort((a, b) => a.inputCostPer1M - b.inputCostPer1M || byCatalog(a, b))
			break
		case 'speed-desc':
			out.sort(
				(a, b) => b.tokensPerSecond - a.tokensPerSecond || byCatalog(a, b),
			)
			break
		case 'context-desc':
			out.sort((a, b) => b.contextLength - a.contextLength || byCatalog(a, b))
			break
		case 'name-asc':
			out.sort((a, b) => a.name.localeCompare(b.name))
			break
	}
	return out
}

function ModelCosmosPage() {
	const { hosting: hostingParam } = Route.useSearch()
	const [search, setSearch] = useState('')
	const [activeUseCases, setActiveUseCases] = useState<string[]>([])
	const [filters, setFilters] = useState<ModelFilterState>(() => ({
		...defaultFilters,
		...(hostingParam ? { hosting: [hostingParam] } : {}),
	}))
	const [showFilters, setShowFilters] = useState(false)
	const [sortOption, setSortOption] = useState<CosmosSortOption>('best-match')
	const [page, setPage] = useState(1)

	const filtered = useMemo(
		() =>
			applyModelFilters(
				models.filter((m) => {
					const matchSearch =
						m.name.toLowerCase().includes(search.toLowerCase()) ||
						m.provider.toLowerCase().includes(search.toLowerCase())
					const matchUseCase =
						activeUseCases.length === 0 ||
						activeUseCases.some((label) => {
							const f = useCaseCategories.find((u) => u.label === label)
							return f ? m.strengths.some((s) => f.keywords.includes(s)) : false
						})
					return matchSearch && matchUseCase
				}),
				filters,
			),
		[search, activeUseCases, filters],
	)

	const sortedFiltered = useMemo(
		() => sortCosmosModels(filtered, sortOption),
		[filtered, sortOption],
	)

	const quickFilterCount = activeUseCases.length

	useEffect(() => {
		setPage(1)
	}, [])

	const hasActiveFilters = isFiltersActive(filters)

	return (
		<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
			<div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
				<PageContainer gap="space-y-6">
					<PageHeader
						title="Model Cosmos"
						description="Explore models designed for different tasks and performance needs. Assign to endpoints and switch anytime without disruption."
						descriptionMaxWidthPageIntro
						actions={
							<Button asChild>
								<Link
									to="/app/endpoints/create_endpoint"
									search={{ model: '' }}
								>
									<Plus className="h-icon-16 w-icon-16" aria-hidden />
									Create Endpoint
								</Link>
							</Button>
						}
					/>

					<ModelCosmosSearchBar
						search={search}
						setSearch={setSearch}
						showFilters={showFilters}
						setShowFilters={setShowFilters}
						sortOption={sortOption}
						setSortOption={setSortOption}
						activeUseCases={activeUseCases}
						setActiveUseCases={setActiveUseCases}
						hasActiveFilters={hasActiveFilters}
						quickFilterCount={quickFilterCount}
					/>

					<ModelCosmosResults
						showFilters={showFilters}
						filters={filters}
						setFilters={setFilters}
						filtered={filtered}
						sortedFiltered={sortedFiltered}
						hasActiveFilters={hasActiveFilters}
						page={page}
						setPage={setPage}
						pageSize={COSMOS_PAGE_SIZE}
					/>
				</PageContainer>
			</div>
		</div>
	)
}
