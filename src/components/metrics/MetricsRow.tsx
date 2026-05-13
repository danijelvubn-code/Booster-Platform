import type * as React from 'react'
import { cn } from '@/lib/utils'

export type MetricsRowProps = {
	className?: string
	children: React.ReactNode
}

/**
 * Lays out `MetricCell` items in a row (e.g. three-up on model cards).
 * Each cell is the same component; use `icon` on `MetricCell` for the with-icon variation.
 */
export function MetricsRow({ className, children }: MetricsRowProps) {
	return (
		<div className={cn('grid min-w-0 flex-1 grid-cols-3 gap-2', className)}>
			{children}
		</div>
	)
}
