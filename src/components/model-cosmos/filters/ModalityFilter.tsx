import {
	Image as ImageIcon,
	Mic,
	Type,
	Video,
} from 'lucide-react'
import { useMemo } from 'react'

import { Popover, PopoverTrigger } from '@/components/ui/popover'
import {
	FilterPopoverClearFooter,
	FilterPopoverHeader,
	FilterPopoverPanel,
} from '@/components/model-cosmos/filters/FilterPopover'
import { FilterTriggerButton } from '@/components/model-cosmos/filters/FilterTriggerButton'
import type { models } from '@/data/mockData'
import { modalityFilterLabel } from '@/lib/cosmos-filter-display'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import { toggleStringList, visibleModalities } from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

function modalityIcon(id: string) {
	switch (id) {
		case 'text':
			return Type
		case 'image':
			return ImageIcon
		case 'audio':
			return Mic
		case 'video':
			return Video
		default:
			return Type
	}
}

export function ModalityFilter({
	catalog,
	filters,
	onFiltersChange,
}: {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
}) {
	const modalityOptions = useMemo(() => visibleModalities(catalog), [catalog])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<FilterTriggerButton
					active={filters.modalities.length > 0}
					badgeCount={
						filters.modalities.length > 0 ? filters.modalities.length : undefined
					}
				>
					Modality
				</FilterTriggerButton>
			</PopoverTrigger>
			<FilterPopoverPanel>
				<FilterPopoverHeader
					title="Modality"
					description="Filter models by supported input and output types. Match any selected modality."
				/>
				<div className="p-3">
					<div className="flex flex-wrap gap-2">
						{modalityOptions.map((id) => {
							const Icon = modalityIcon(id)
							const on = filters.modalities.includes(id)
							return (
								<button
									key={id}
									type="button"
									onClick={() => {
										onFiltersChange({
											...filters,
											modalities: toggleStringList(filters.modalities, id),
										})
									}}
									className={cn(
										'flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-body-sm transition-colors',
										on
											? 'border-primary/60 bg-primary/10'
											: 'hover:bg-accent',
									)}
								>
									<Icon className="h-icon-16 w-icon-16" aria-hidden />
									{modalityFilterLabel(id)}
								</button>
							)
						})}
					</div>
				</div>
				<FilterPopoverClearFooter
					disabled={filters.modalities.length === 0}
					label="Clear modalities"
					onClear={() => onFiltersChange({ ...filters, modalities: [] })}
				/>
			</FilterPopoverPanel>
		</Popover>
	)
}
