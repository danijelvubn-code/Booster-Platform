import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { filterToolbarButtonClassName } from '@/components/model-cosmos/filters/cosmos-filter-styles'

export type FilterTriggerButtonProps = Omit<
	React.ComponentPropsWithoutRef<typeof Button>,
	'variant' | 'size'
> & {
	active: boolean
	/** When set and greater than zero, shows the numeric badge. */
	badgeCount?: number
}

export const FilterTriggerButton = forwardRef<
	React.ElementRef<typeof Button>,
	FilterTriggerButtonProps
>(function FilterTriggerButton(
	{ active, badgeCount, className, children, ...props },
	ref,
) {
	return (
		<Button
			ref={ref}
			type="button"
			variant="ghost"
			size="sm"
			className={cn(filterToolbarButtonClassName(active), className)}
			{...props}
		>
			<span className="flex min-w-0 items-center gap-1 truncate">
				<span className="truncate">{children}</span>
				{badgeCount != null && badgeCount > 0 ? (
					<Badge variant="secondary" className="shrink-0 px-1.5">
						{badgeCount}
					</Badge>
				) : null}
			</span>
			<ChevronDown
				className="h-icon-16 w-icon-16 shrink-0 opacity-50"
				aria-hidden
			/>
		</Button>
	)
})
