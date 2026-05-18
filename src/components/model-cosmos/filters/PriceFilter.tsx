import { useMemo } from 'react'

import { Accordion } from '@/components/ui/accordion'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { CosmosPriceSliderSection } from '@/components/model-cosmos/filters/CosmosPriceSliderSection'
import {
	FilterPopoverClearFooter,
	FilterPopoverHeader,
	FilterPopoverPanel,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import type { models } from '@/data/mockData'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { catalogPriceSliderBoundsEUR } from '@/lib/model-catalog-filters'

export function PriceFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const priceDimsActive =
		(filters.priceInputMaxPer1M != null ? 1 : 0) +
		(filters.priceOutputMaxPer1M != null ? 1 : 0)

	const priceSliderBounds = useMemo(
		() => catalogPriceSliderBoundsEUR(catalog),
		[catalog],
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={priceDimsActive > 0}
					badgeCount={priceDimsActive > 0 ? priceDimsActive : undefined}
				>
					<span>Price</span>
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<FilterPopoverHeader
					title="Cost per token (EUR)"
					description="Set upper limits per 1M tokens. Matches catalog prices in euros; drag handles to exclude more expensive providers."
				/>
				<Accordion
					type="multiple"
					defaultValue={['price-input', 'price-output']}
					className="w-full rounded-none border-0 shadow-none"
				>
					<CosmosPriceSliderSection
						accordionItemValue="price-input"
						kind="input"
						filters={filters}
						onFiltersChange={onFiltersChange}
						bounds={priceSliderBounds}
					/>
					<CosmosPriceSliderSection
						accordionItemValue="price-output"
						kind="output"
						filters={filters}
						onFiltersChange={onFiltersChange}
						bounds={priceSliderBounds}
					/>
				</Accordion>
				<FilterPopoverClearFooter
					disabled={priceDimsActive === 0}
					label="Reset price caps"
					onClear={() =>
						onFiltersChange({
							...filters,
							priceInputMaxPer1M: null,
							priceOutputMaxPer1M: null,
						})
					}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
