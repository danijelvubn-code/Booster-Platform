import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

import { FILTER_POPOVER_CHECKBOX_ROW_CLASS } from '@/components/model-cosmos/filters/cosmos-filter-styles'

export function FilterCheckboxRow({
	className,
	...props
}: ComponentPropsWithoutRef<'label'>) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Checkbox is the labeled control; Radix generates the input association.
		<label
			className={cn(FILTER_POPOVER_CHECKBOX_ROW_CLASS, className)}
			{...props}
		/>
	)
}
