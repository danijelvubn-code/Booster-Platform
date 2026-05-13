import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const switchRootVariants = cva(
	'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
	{
		variants: {
			size: {
				sm: 'h-5 w-9',
				md: 'h-6 w-11',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

const switchThumbVariants = cva(
	'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform ease-standard data-[state=unchecked]:translate-x-0',
	{
		variants: {
			size: {
				sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
				md: 'h-5 w-5 data-[state=checked]:translate-x-5',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

type SwitchProps = React.ComponentPropsWithoutRef<
	typeof SwitchPrimitives.Root
> &
	VariantProps<typeof switchRootVariants>

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(({ className, size = 'md', ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(switchRootVariants({ size }), className)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb className={switchThumbVariants({ size })} />
	</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
export type { SwitchProps }
