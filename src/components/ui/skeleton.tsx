import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const skeletonVariants = cva('rounded-md bg-muted', {
	variants: {
		animation: {
			pulse: 'animate-pulse',
			shimmer: 'relative overflow-hidden',
		},
	},
	defaultVariants: {
		animation: 'pulse',
	},
})

export interface SkeletonProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, animation, ...props }: SkeletonProps) {
	return (
		<div className={cn(skeletonVariants({ animation }), className)} {...props}>
			{animation === 'shimmer' && (
				<span
					aria-hidden
					className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full animate-skeleton-shimmer bg-gradient-to-r from-transparent via-foreground/7 to-transparent"
				/>
			)}
		</div>
	)
}

export { Skeleton, skeletonVariants }
