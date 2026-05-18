import { useMemo } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import {
	FilterPopoverClearFooter,
	FilterPopoverHeader,
	FilterPopoverPanel,
	FilterPopoverScrollBody,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterCheckboxRow } from '@/components/model-cosmos/filters/FilterOptionRow'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import {
	LEGACY_API_CAPABILITY_IDS,
	sortApiCapabilitiesForToolbar,
} from '@/components/model-cosmos/filters/api-endpoints-order'
import type { models } from '@/data/mockData'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { toggleStringList, visibleApiCapabilities } from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

export function ApiCapabilitiesFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const apiOptions = useMemo(
		() => sortApiCapabilitiesForToolbar(visibleApiCapabilities(catalog)),
		[catalog],
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={filters.apiCapabilities.length > 0}
					badgeCount={
						filters.apiCapabilities.length > 0
							? filters.apiCapabilities.length
							: undefined
					}
				>
					<span>Endpoints</span>
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<FilterPopoverHeader
					title="Endpoints"
					description="Filter models by supported API endpoint types. Multiple selections require a model to support all selected endpoints. Match all selected (AND)."
				/>
				<FilterPopoverScrollBody scrollHeightClassName="h-64">
					{apiOptions.map((a) => (
						<FilterCheckboxRow
							key={a}
							className={cn(
								LEGACY_API_CAPABILITY_IDS.has(a) && 'opacity-80',
							)}
						>
							<Checkbox
								checked={filters.apiCapabilities.includes(a)}
								onCheckedChange={() =>
									onFiltersChange({
										...filters,
										apiCapabilities: toggleStringList(
											filters.apiCapabilities,
											a,
										),
									})
								}
							/>
							<span className="text-body-sm">{a}</span>
						</FilterCheckboxRow>
					))}
				</FilterPopoverScrollBody>
				<FilterPopoverClearFooter
					disabled={filters.apiCapabilities.length === 0}
					label="Clear API selections"
					onClear={() =>
						onFiltersChange({ ...filters, apiCapabilities: [] })
					}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
