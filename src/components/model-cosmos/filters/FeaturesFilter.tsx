import { useMemo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	FilterPopoverClearFooter,
	FilterPopoverHeader,
	FilterPopoverPanel,
	FilterPopoverScrollBody,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterCheckboxRow } from '@/components/model-cosmos/filters/FilterOptionRow'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import type { models } from '@/data/mockData'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { toggleStringList, visibleFeatures } from '@/lib/model-catalog-filters'

export function FeaturesFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const featureOptions = useMemo(
		() => [...visibleFeatures(catalog)].sort((a, b) => a.localeCompare(b)),
		[catalog],
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={filters.features.length > 0}
					badgeCount={
						filters.features.length > 0 ? filters.features.length : undefined
					}
				>
					Features
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<FilterPopoverHeader
					title="Features"
					description="Match all selected (AND)."
				/>
				<FilterPopoverScrollBody scrollHeightClassName="h-64">
					{featureOptions.map((f) => (
						<FilterCheckboxRow key={f}>
							<Checkbox
								checked={filters.features.includes(f)}
								onCheckedChange={() =>
									onFiltersChange({
										...filters,
										features: toggleStringList(filters.features, f),
									})
								}
							/>
							<span className="flex flex-1 items-center gap-1 text-body-sm">
								{f}
								{f === 'Reasoning' ? (
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												type="button"
												className="text-caption text-muted-foreground"
												aria-label="About Reasoning feature"
											>
												ⓘ
											</button>
										</TooltipTrigger>
										<TooltipContent className="max-w-xs">
											Supports reasoning-oriented behavior or reasoning mode
											where available.
										</TooltipContent>
									</Tooltip>
								) : null}
							</span>
						</FilterCheckboxRow>
					))}
				</FilterPopoverScrollBody>
				<FilterPopoverClearFooter
					disabled={filters.features.length === 0}
					label="Clear feature selections"
					onClear={() => onFiltersChange({ ...filters, features: [] })}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
