import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ApiCapabilitiesFilter } from '@/components/model-cosmos/filters/ApiCapabilitiesFilter'
import { CapabilityFilter } from '@/components/model-cosmos/filters/CapabilityFilter'
import {
	FILTER_TOOLBAR_ROW_CLASS,
	filterToolbarActionButtonClassName,
} from '@/components/model-cosmos/filters/cosmos-filter-styles'
import { FeaturesFilter } from '@/components/model-cosmos/filters/FeaturesFilter'
import { ModalityFilter } from '@/components/model-cosmos/filters/ModalityFilter'
import { MoreFiltersSheet } from '@/components/model-cosmos/filters/MoreFiltersSheet'
import { PriceFilter } from '@/components/model-cosmos/filters/PriceFilter'
import { ProviderFilter } from '@/components/model-cosmos/filters/ProviderFilter'
import { SelectedFilterChips } from '@/components/model-cosmos/filters/SelectedFilterChips'
import type { models } from '@/data/mockData'
import { buildCosmosModelFilterChips } from '@/lib/cosmos-model-filter-chips'
import {
	applyModelFilters,
	defaultFilters,
	moreFiltersSheetBadgeCount,
	type ModelFilterState,
} from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

type ModelCosmosFilterBarProps = {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
	className?: string
}

export function ModelCosmosFilterBar({
	catalog,
	filters,
	onFiltersChange,
	className,
}: ModelCosmosFilterBarProps) {
	const [moreOpen, setMoreOpen] = useState(false)
	const [baseModelPickerOpen, setBaseModelPickerOpen] = useState(false)
	const [baseModelPickerQuery, setBaseModelPickerQuery] = useState('')

	const shownModelCount = useMemo(
		() => applyModelFilters(catalog, filters, catalog).length,
		[catalog, filters],
	)

	const chipDescriptors = useMemo(
		() => buildCosmosModelFilterChips(filters),
		[filters],
	)

	const moreFiltersActiveCount = useMemo(
		() => moreFiltersSheetBadgeCount(filters),
		[filters],
	)

	return (
		<div className={cn('flex min-w-0 flex-col gap-3', className)}>
			<div className={FILTER_TOOLBAR_ROW_CLASS}>
				<ProviderFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<CapabilityFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<ModalityFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<ApiCapabilitiesFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<FeaturesFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<PriceFilter
					catalog={catalog}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					className={filterToolbarActionButtonClassName(
						moreFiltersActiveCount > 0,
					)}
					onClick={() => setMoreOpen(true)}
				>
					<SlidersHorizontal className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
					More filters
					{moreFiltersActiveCount > 0 ? (
						<Badge variant="secondary" className="shrink-0 px-1.5">
							{moreFiltersActiveCount}
						</Badge>
					) : null}
				</Button>
			</div>

			<SelectedFilterChips
				chips={chipDescriptors.map((c) => ({
					key: c.key,
					label: c.label,
					onRemove: () => onFiltersChange(c.remove(filters)),
				}))}
				onClearAll={() => onFiltersChange({ ...defaultFilters })}
			/>

			<MoreFiltersSheet
				open={moreOpen}
				onOpenChange={setMoreOpen}
				catalog={catalog}
				filters={filters}
				onFiltersChange={onFiltersChange}
				shownModelCount={shownModelCount}
				baseModelPickerOpen={baseModelPickerOpen}
				onBaseModelPickerOpenChange={setBaseModelPickerOpen}
				baseModelPickerQuery={baseModelPickerQuery}
				onBaseModelPickerQueryChange={setBaseModelPickerQuery}
			/>
		</div>
	)
}
