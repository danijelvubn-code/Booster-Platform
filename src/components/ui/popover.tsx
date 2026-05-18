import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={cn(
				'z-50 max-w-modal-sm rounded-md border border-border bg-popover p-4 text-body-sm text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className,
			)}
			{...props}
		/>
	</PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/** Vertical action/list region inside popovers (e.g. full-width option buttons). */
function PopoverMenuList({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('flex flex-col gap-1 p-2', className)} {...props} />
	)
}
PopoverMenuList.displayName = 'PopoverMenuList'

/** Sticky footer region inside filter-style popovers (below scrollable body). */
function PopoverMenuFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'shrink-0 border-t border-border bg-popover p-2',
				className,
			)}
			{...props}
		/>
	)
}
PopoverMenuFooter.displayName = 'PopoverMenuFooter'

export {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverMenuList,
	PopoverMenuFooter,
}
