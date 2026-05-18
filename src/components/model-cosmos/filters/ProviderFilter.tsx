import { useMemo, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import {
	FilterPopoverClearFooter,
	FilterPopoverHeader,
	FilterPopoverPanel,
	FilterPopoverScrollBody,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterCheckboxRow } from '@/components/model-cosmos/filters/FilterOptionRow'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import { COSMOS_TOOLBAR_PROVIDER_OPTIONS } from '@/components/model-cosmos/filters/more-filters-options'
import type { models } from '@/data/mockData'
import { cosmosProviderFilterLabel } from '@/lib/cosmos-filter-display'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import {
	providerOptionCounts,
	toggleStringList,
} from '@/lib/model-catalog-filters'

export function ProviderFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const [providerSearch, setProviderSearch] = useState('')

	const providerCounts = useMemo(() => providerOptionCounts(catalog), [catalog])
	const providerOptions = useMemo(
		() => [...COSMOS_TOOLBAR_PROVIDER_OPTIONS],
		[],
	)

	const filteredProviders = useMemo(() => {
		const q = providerSearch.trim().toLowerCase()
		if (!q) return providerOptions
		return providerOptions.filter(
			(p) =>
				p.toLowerCase().includes(q) ||
				cosmosProviderFilterLabel(p).toLowerCase().includes(q),
		)
	}, [providerOptions, providerSearch])

	const showProviderSearch = providerOptions.length > 9

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={filters.providers.length > 0}
					badgeCount={
						filters.providers.length > 0 ? filters.providers.length : undefined
					}
				>
					Provider
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<FilterPopoverHeader title="Provider">
					{showProviderSearch ? (
						<Input
							placeholder="Search providers…"
							value={providerSearch}
							onChange={(e) => setProviderSearch(e.target.value)}
							className="mt-2 h-8"
						/>
					) : null}
				</FilterPopoverHeader>
				<FilterPopoverScrollBody scrollHeightClassName="h-72">
					{filteredProviders.map((p) => (
						<FilterCheckboxRow key={p}>
							<Checkbox
								checked={filters.providers.includes(p)}
								onCheckedChange={() =>
									onFiltersChange({
										...filters,
										providers: toggleStringList(filters.providers, p),
									})
								}
							/>
							<span className="flex-1 truncate text-body-sm">
								{cosmosProviderFilterLabel(p)}
							</span>
							<span className="text-caption text-muted-foreground">
								{providerCounts.get(p) ?? 0}
							</span>
						</FilterCheckboxRow>
					))}
				</FilterPopoverScrollBody>
				<FilterPopoverClearFooter
					disabled={filters.providers.length === 0}
					label="Clear providers"
					onClear={() => {
						setProviderSearch('')
						onFiltersChange({ ...filters, providers: [] })
					}}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
