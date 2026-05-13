import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { type ToggleSize, toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

export type ToggleGroupLayout = 'segmented' | 'loose'

const toggleGroupRootVariants = cva('inline-flex w-fit max-w-full shrink-0', {
	variants: {
		layout: {
			segmented: 'justify-start gap-1 bg-primary/7 text-muted-foreground',
			loose: 'flex-wrap items-center gap-2',
		},
		size: {
			sm: '',
			md: '',
			lg: '',
		},
	},
	compoundVariants: [
		{
			layout: 'segmented',
			size: 'sm',
			class: 'h-control-sm items-stretch rounded-md p-0.5',
		},
		{
			layout: 'segmented',
			size: 'md',
			class: 'h-control-md items-stretch rounded-md p-0.5',
		},
		{
			layout: 'segmented',
			size: 'lg',
			class: 'h-control-lg items-center rounded-lg px-1 py-1',
		},
	],
	defaultVariants: {
		layout: 'segmented',
		size: 'md',
	},
})

type ToggleGroupContextValue = {
	variant: VariantProps<typeof toggleVariants>['variant']
	size: ToggleSize
	layout: ToggleGroupLayout
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
	variant: 'default',
	size: 'md',
	layout: 'segmented',
})

export const useToggleGroupContext = () => React.useContext(ToggleGroupContext)

export type ToggleGroupProps = React.ComponentPropsWithoutRef<
	typeof ToggleGroupPrimitive.Root
> &
	VariantProps<typeof toggleVariants> & {
		size?: ToggleSize
		layout?: ToggleGroupLayout
	}

const ToggleGroup = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupProps
>(
	(
		{
			className,
			variant = 'default',
			size = 'md',
			layout = 'segmented',
			children,
			...props
		},
		ref,
	) => (
		<ToggleGroupPrimitive.Root
			ref={ref}
			className={cn(toggleGroupRootVariants({ layout, size }), className)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size, layout }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	),
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
	const context = useToggleGroupContext()

	const v = variant ?? context.variant
	const s = size ?? context.size
	const { layout } = context

	const segmentedChrome =
		layout === 'segmented' && v === 'default'
			? 'data-[state=off]:text-muted-foreground data-[state=off]:hover:bg-primary/12 data-[state=off]:hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm data-[state=on]:[&_svg]:text-primary'
			: undefined

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleVariants({ variant: v, size: s }),
				layout === 'segmented' &&
					(s === 'sm' || s === 'md') &&
					'h-full min-h-0 rounded-sm',
				layout === 'segmented' &&
					s === 'lg' &&
					'h-control-md min-h-0 rounded-md',
				segmentedChrome,
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	)
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
