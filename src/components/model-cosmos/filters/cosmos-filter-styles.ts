import { cn } from '@/lib/utils'

/** Toolbar filter popover panels — fixed width 320px. */
export const FILTER_POPOVER_PANEL_WIDTH = 'w-[320px] max-w-[320px]'

/** Checkbox option rows — muted hover reads clearly on `bg-popover`. */
export const FILTER_POPOVER_CHECKBOX_ROW_CLASS =
	'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ease-standard hover:bg-muted focus-within:bg-muted active:bg-muted/80'

/** Equal-width toolbar row; popover triggers render as direct `button` children. */
export const FILTER_TOOLBAR_ROW_CLASS =
	'flex min-w-0 items-stretch gap-2 [&>button]:min-w-0 [&>button]:w-full [&>button]:flex-1'

export function filterToolbarButtonClassName(active: boolean) {
	return cn(
		'w-full justify-between gap-2 rounded-md border border-input bg-card px-2.5 text-body-sm font-medium shadow-xs transition-colors ease-standard hover:border-ring',
		// Button wraps children in an inner span — stretch it so label and chevron split the field.
		'[&>span]:flex [&>span]:w-full [&>span]:min-w-0 [&>span]:items-center [&>span]:justify-between [&>span]:gap-2',
		active &&
			'border-primary/60 bg-white hover:border-primary hover:bg-white',
	)
}

/** Toolbar action button (e.g. More filters) — centered content, no trailing chevron. */
export function filterToolbarActionButtonClassName(active: boolean) {
	return cn(
		filterToolbarButtonClassName(active),
		'justify-center [&>span]:justify-center',
	)
}
