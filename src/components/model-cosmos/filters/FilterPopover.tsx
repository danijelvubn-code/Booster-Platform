import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
	PopoverContent,
	PopoverMenuFooter,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import { FILTER_POPOVER_PANEL_WIDTH } from '@/components/model-cosmos/filters/cosmos-filter-styles'

export type FilterPopoverPanelProps = Omit<
	ComponentPropsWithoutRef<typeof PopoverContent>,
	'children'
> & {
	children: ReactNode
}

export function FilterPopoverPanel({
	className,
	align = 'start',
	sideOffset,
	children,
	...rest
}: FilterPopoverPanelProps) {
	return (
		<PopoverContent
			className={cn(FILTER_POPOVER_PANEL_WIDTH, 'p-0', className)}
			align={align}
			sideOffset={sideOffset}
			{...rest}
		>
			{children}
		</PopoverContent>
	)
}

export function FilterPopoverHeader({
	title,
	description,
	children,
	className,
}: {
	title: string
	description?: ReactNode
	children?: ReactNode
	className?: string
}) {
	return (
		<div className={cn('border-b border-border p-3', className)}>
			<p className="text-body-sm font-medium">{title}</p>
			{description ? (
				<p className="mt-1 text-caption text-muted-foreground">{description}</p>
			) : null}
			{children}
		</div>
	)
}

export function FilterPopoverScrollBody({
	scrollHeightClassName,
	children,
	className,
}: {
	scrollHeightClassName: string
	children: ReactNode
	className?: string
}) {
	return (
		<ScrollArea className={cn(scrollHeightClassName, className)}>
			<div className="space-y-1 p-2">{children}</div>
		</ScrollArea>
	)
}

export function FilterPopoverClearFooter({
	disabled,
	label,
	onClear,
}: {
	disabled: boolean
	label: string
	onClear: () => void
}) {
	return (
		<PopoverMenuFooter>
			<Button
				type="button"
				variant="outline"
				size="sm"
				className="w-full"
				disabled={disabled}
				onClick={onClear}
			>
				{label}
			</Button>
		</PopoverMenuFooter>
	)
}
