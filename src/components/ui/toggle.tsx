import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors ease-standard hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0 [&_svg]:text-current',
	{
		variants: {
			variant: {
				default:
					'bg-transparent text-muted-foreground data-[state=off]:hover:bg-muted data-[state=off]:hover:text-foreground',
				outline:
					'border border-input bg-transparent text-muted-foreground data-[state=off]:hover:bg-accent data-[state=off]:hover:text-accent-foreground',
			},
			size: {
				sm: 'h-control-sm px-2 text-caption',
				md: 'h-control-md px-3 text-label',
				lg: 'h-control-lg px-4 text-body-sm',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
)

export type ToggleSize = NonNullable<
	VariantProps<typeof toggleVariants>['size']
>

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size }), className)}
		{...props}
	/>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
