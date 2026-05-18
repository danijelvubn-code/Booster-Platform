import { cn } from '@/lib/utils'

/** Toolbar filter popover panels — fixed width 320px. */
export const FILTER_POPOVER_PANEL_WIDTH = 'w-[320px] max-w-[320px]'

/** Checkbox option rows — muted hover reads clearly on `bg-popover`. */
export const FILTER_POPOVER_CHECKBOX_ROW_CLASS =
	'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ease-standard hover:bg-muted focus-within:bg-muted active:bg-muted/80'

export function filterToolbarButtonClassName(active: boolean) {
	return cn(
		'gap-1 rounded-md border border-input bg-card px-2.5 text-body-sm font-medium shadow-xs transition-colors ease-standard hover:border-ring',
		active &&
			'border-primary/60 bg-primary/5 hover:border-primary hover:bg-primary/10',
	)
}
