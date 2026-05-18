import { Fragment, useMemo } from 'react'

import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	FilterPopoverClearFooter,
	FilterPopoverPanel,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import {
	MORE_FILTERS_CATEGORY_OPTIONS,
	TOOLBAR_CAPABILITY_SCORE_OPTIONS,
} from '@/components/model-cosmos/filters/more-filters-options'
import { MoreFiltersChoiceChips } from '@/components/model-cosmos/filters/more-filters-shared'
import type { models } from '@/data/mockData'
import {
	capabilitySubcategoryViableAtMinScore,
	getCapabilitySubcategoryNames,
	type CapabilityCategoryId,
} from '@/lib/catalog-filter-meta'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { toggleStringList } from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

export function CapabilityFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const capabilitySubcategoryOptions = useMemo(() => {
		if (filters.capabilityCategory === '') return []
		const options = new Set<string>()
		for (const model of catalog) {
			for (const subcategory of getCapabilitySubcategoryNames(
				model,
				filters.capabilityCategory,
			)) {
				options.add(subcategory)
			}
		}
		return [...options].sort((a, b) => a.localeCompare(b))
	}, [catalog, filters.capabilityCategory])

	const capabilityCategoryMinNumeric = useMemo(
		() =>
			filters.capabilityCategoryMin === '0'
				? 0
				: Number.parseInt(filters.capabilityCategoryMin, 10),
		[filters.capabilityCategoryMin],
	)

	const subcapabilityViableAtMinimum = useMemo(() => {
		if (filters.capabilityCategory === '' || capabilityCategoryMinNumeric <= 0) {
			return null
		}
		const category = filters.capabilityCategory as CapabilityCategoryId
		const min = capabilityCategoryMinNumeric
		const next = new Map<string, boolean>()
		for (const sub of capabilitySubcategoryOptions) {
			next.set(
				sub,
				capabilitySubcategoryViableAtMinScore(catalog, category, sub, min),
			)
		}
		return next
	}, [
		capabilityCategoryMinNumeric,
		capabilitySubcategoryOptions,
		catalog,
		filters.capabilityCategory,
	])

	const capabilityFilterActive =
		filters.capabilityCategory !== '' ||
		filters.capabilityCategoryMin !== '0' ||
		filters.capabilitySubcategories.length > 0
	const capabilityFilterCount =
		(filters.capabilityCategory !== '' ? 1 : 0) +
		(filters.capabilityCategoryMin !== '0' ? 1 : 0) +
		filters.capabilitySubcategories.length

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={capabilityFilterActive}
					badgeCount={
						capabilityFilterActive ? capabilityFilterCount : undefined
					}
				>
					<span>Capability</span>
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<div className="space-y-4 p-3">
					<div className="space-y-1.5">
						<Label>Capability</Label>
						<Select
							value={filters.capabilityCategory || 'none'}
							onValueChange={(v) =>
								onFiltersChange({
									...filters,
									capabilityCategory:
										v === 'none' ? '' : (v as CapabilityCategoryId),
									capabilityCategoryMin:
										v === 'none' ? '0' : filters.capabilityCategoryMin,
									capabilitySubcategories: [],
									capabilityScore: 'any',
								})
							}
						>
							<SelectTrigger className="h-8 bg-card">
								<SelectValue placeholder="Any" />
							</SelectTrigger>
							<SelectContent>
								{MORE_FILTERS_CATEGORY_OPTIONS.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Minimal Score</Label>
						<MoreFiltersChoiceChips
							aria-label="Minimum capability score"
							options={TOOLBAR_CAPABILITY_SCORE_OPTIONS}
							value={filters.capabilityCategoryMin}
							onSelect={(v) => {
								const minNeed = v === '0' ? 0 : Number.parseInt(v, 10)
								let nextSubs = filters.capabilitySubcategories
								if (filters.capabilityCategory !== '' && minNeed > 0) {
									const cat = filters.capabilityCategory as CapabilityCategoryId
									nextSubs = filters.capabilitySubcategories.filter((sub) =>
										capabilitySubcategoryViableAtMinScore(
											catalog,
											cat,
											sub,
											minNeed,
										),
									)
								}
								onFiltersChange({
									...filters,
									capabilityCategoryMin: v,
									capabilityScore: 'any',
									capabilitySubcategories: nextSubs,
								})
							}}
						/>
					</div>
					<div className="space-y-2 border-t border-border pt-3 pb-6">
						<Label>Subcapability</Label>
						{filters.capabilityCategory === '' ? (
							<p className="text-caption text-muted-foreground">
								Select a capability first to see related subcapabilities.
							</p>
						) : capabilitySubcategoryOptions.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{capabilitySubcategoryOptions.map((subcategory) => {
									const selected =
										filters.capabilitySubcategories.includes(subcategory)
									const viable =
										subcapabilityViableAtMinimum?.get(subcategory) ?? true
									const chipButton = (
										<button
											key={subcategory}
											type="button"
											disabled={!viable}
											onClick={() =>
												onFiltersChange({
													...filters,
													capabilitySubcategories: toggleStringList(
														filters.capabilitySubcategories,
														subcategory,
													),
													capabilityScore: 'any',
												})
											}
											className={cn(
												'inline-flex h-8 items-center rounded-md border px-3 text-body-sm transition-colors ease-standard',
												!viable &&
													'cursor-not-allowed border-border bg-muted/50 text-muted-foreground opacity-60',
												viable &&
													(selected
														? 'border-primary/60 bg-primary/10 text-foreground'
														: 'border-border bg-card text-foreground hover:bg-muted'),
											)}
										>
											{subcategory}
										</button>
									)
									return !viable ? (
										<Tooltip key={subcategory}>
											<TooltipTrigger asChild>
												<span className="inline-flex">{chipButton}</span>
											</TooltipTrigger>
											<TooltipContent side="top" className="max-w-xs">
												Subcapabilities that no model can match at{' '}
												{capabilityCategoryMinNumeric}% or higher are
												disabled—lower minimal score to enable them.
											</TooltipContent>
										</Tooltip>
									) : (
										<Fragment key={subcategory}>{chipButton}</Fragment>
									)
								})}
							</div>
						) : (
							<p className="text-caption text-muted-foreground">
								No subcapabilities available for this capability.
							</p>
						)}
					</div>
				</div>
				<FilterPopoverClearFooter
					disabled={!capabilityFilterActive}
					label="Clear capability filters"
					onClear={() =>
						onFiltersChange({
							...filters,
							capabilityScore: 'any',
							capabilityCategory: '',
							capabilityCategoryMin: '0',
							capabilitySubcategories: [],
						})
					}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
