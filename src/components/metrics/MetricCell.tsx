import type { LucideIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export type MetricCellProps = {
	className?: string
	/**
	 * When set, the icon shows to the left of the value. Omit for text-only.
	 */
	icon?: LucideIcon
	/** Primary string (e.g. `105 tok/s`, or pricing when there is no icon). */
	label?: string
	/** Use when the value is not a plain string (e.g. rich content). Avoid mixing with `label` unless intentional. */
	children?: React.ReactNode
}

const cellSurface =
	'bg-background flex min-w-0 flex-1 flex-col items-center justify-center rounded-sm p-2'

const valueText = 'text-body-sm text-foreground/75 whitespace-nowrap'

/**
 * A single metric cell: one surface, with or without a leading icon.
 * Compose in `MetricsRow` for a row of related metrics.
 */
export function MetricCell({
	className,
	icon: Icon,
	label,
	children,
}: MetricCellProps) {
	const hasIcon = Boolean(Icon)
	const hasLabel = label != null && label !== ''

	if (hasIcon && Icon) {
		return (
			<div className={cn(cellSurface, className)}>
				<div className="flex min-w-0 items-center justify-center gap-2">
					<div className="flex h-icon-24 w-icon-24 shrink-0 items-center justify-center rounded-md">
						<Icon
							className="h-icon-20 w-icon-20 text-foreground/50"
							aria-hidden
						/>
					</div>
					{hasLabel && <span className={valueText}>{label}</span>}
					{!hasLabel && children}
				</div>
			</div>
		)
	}

	return (
		<div className={cn(cellSurface, 'text-center', className)}>
			{hasLabel ? (
				<span className={valueText}>{label}</span>
			) : (
				<div className={cn(valueText, 'min-w-0')}>{children}</div>
			)}
		</div>
	)
}
