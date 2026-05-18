import { ChevronDown, X } from 'lucide-react'
import { useId, useMemo } from 'react'

import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	FilterPopoverPanel,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterCheckboxRow } from '@/components/model-cosmos/filters/FilterOptionRow'
import {
	BASE_MODEL_FAMILY_POPULAR_ORDER,
	BASE_MODEL_POPULAR_FAMILY_SET,
} from '@/components/model-cosmos/filters/more-filters-options'
import type { models } from '@/data/mockData'
import { filterStringsBySubstring } from '@/lib/filter-helpers'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { toggleStringList, visibleBaseModels } from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

export function MoreFiltersBaseModelSection({
	catalog,
	filters,
	onFiltersChange,
	baseModelPickerOpen,
	onBaseModelPickerOpenChange,
	baseModelPickerQuery,
	onBaseModelPickerQueryChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
	baseModelPickerOpen: boolean
	onBaseModelPickerOpenChange: (open: boolean) => void
	baseModelPickerQuery: string
	onBaseModelPickerQueryChange: (q: string) => void
}) {
	const baseOpts = useMemo(() => visibleBaseModels(catalog), [catalog])
	const popularBaseFamilies = useMemo(
		() =>
			BASE_MODEL_FAMILY_POPULAR_ORDER.filter((name) => baseOpts.includes(name)),
		[baseOpts],
	)
	const otherBaseFamilies = useMemo(
		() =>
			baseOpts
				.filter((name) => !BASE_MODEL_POPULAR_FAMILY_SET.has(name))
				.sort((a, b) => a.localeCompare(b)),
		[baseOpts],
	)
	const filteredPopularBaseFamilies = useMemo(
		() => filterStringsBySubstring(popularBaseFamilies, baseModelPickerQuery),
		[popularBaseFamilies, baseModelPickerQuery],
	)
	const filteredOtherBaseFamilies = useMemo(
		() => filterStringsBySubstring(otherBaseFamilies, baseModelPickerQuery),
		[otherBaseFamilies, baseModelPickerQuery],
	)

	const baseModelLabelId = useId()

	if (baseOpts.length === 0) return null

	return (
		<div className="space-y-2">
			<Label id={baseModelLabelId}>Base model</Label>
			<Popover
				open={baseModelPickerOpen}
				onOpenChange={(open) => {
					onBaseModelPickerOpenChange(open)
					if (!open) onBaseModelPickerQueryChange('')
				}}
			>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="outline"
						aria-labelledby={baseModelLabelId}
						className={cn(
							'h-control-md w-full min-w-0 justify-center px-3 font-normal text-muted-foreground shadow-xs hover:bg-muted/50 hover:text-muted-foreground',
							'[&>:first-child]:w-full [&>:first-child]:min-w-0 [&>:first-child]:justify-between',
						)}
						trailingIcon={<ChevronDown className="opacity-50" aria-hidden />}
					>
						<span className="min-w-0 flex-1 truncate text-left">
							Search or select base model
						</span>
					</Button>
				</PopoverTrigger>
				<FilterPopoverPanel>
					<div className="border-b border-border p-2">
						<Input
							placeholder="Search base models…"
							value={baseModelPickerQuery}
							onChange={(e) => onBaseModelPickerQueryChange(e.target.value)}
							className="h-8"
							autoComplete="off"
							autoFocus
							aria-label="Search base models"
						/>
					</div>
					<ScrollArea className="h-72">
						<div className="space-y-3 p-2">
							{filteredPopularBaseFamilies.length > 0 ? (
								<div className="space-y-1">
									<p className="px-2 pb-0.5 text-caption font-medium text-muted-foreground">
										Popular
									</p>
									<div className="space-y-0.5">
										{filteredPopularBaseFamilies.map((name) => (
											<FilterCheckboxRow key={name}>
												<Checkbox
													checked={filters.baseModels.includes(name)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															baseModels: toggleStringList(
																filters.baseModels,
																name,
															),
														})
													}
												/>
												<span className="truncate text-body-sm">{name}</span>
											</FilterCheckboxRow>
										))}
									</div>
								</div>
							) : null}
							{filteredOtherBaseFamilies.length > 0 ? (
								<div className="space-y-1">
									<p className="px-2 pb-0.5 text-caption font-medium text-muted-foreground">
										All base models
									</p>
									<div className="space-y-0.5">
										{filteredOtherBaseFamilies.map((name) => (
											<FilterCheckboxRow key={name}>
												<Checkbox
													checked={filters.baseModels.includes(name)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															baseModels: toggleStringList(
																filters.baseModels,
																name,
															),
														})
													}
												/>
												<span className="truncate text-body-sm">{name}</span>
											</FilterCheckboxRow>
										))}
									</div>
								</div>
							) : null}
							{filteredPopularBaseFamilies.length === 0 &&
							filteredOtherBaseFamilies.length === 0 ? (
								<p className="py-8 text-center text-caption text-muted-foreground">
									No matches
								</p>
							) : null}
						</div>
					</ScrollArea>
				</FilterPopoverPanel>
			</Popover>
			{filters.baseModels.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{[...filters.baseModels]
						.sort((a, b) => a.localeCompare(b))
						.map((name) => (
							<span
								key={name}
								className={cn(
									badgeVariants({
										variant: 'secondary',
										appearance: 'pill',
										size: '24',
									}),
									'max-w-full min-w-0 pr-1 font-normal',
								)}
							>
								<span className="min-w-0 max-w-[240px] truncate">{name}</span>
								<button
									type="button"
									className="inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-background/80"
									onClick={() =>
										onFiltersChange({
											...filters,
											baseModels: filters.baseModels.filter((x) => x !== name),
										})
									}
									aria-label={`Remove ${name}`}
								>
									<X className="h-3 w-3" aria-hidden />
								</button>
							</span>
						))}
				</div>
			) : null}
		</div>
	)
}
