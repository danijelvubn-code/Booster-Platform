import { cn } from '@/lib/utils'

interface StatDisplayProps {
	label: string
	value: string | React.ReactNode
	variant?: 'vertical' | 'horizontal'
	labelClassName?: string
	valueClassName?: string
	containerClassName?: string
}

/**
 * Unified component for displaying label-value pairs
 * Replaces DetailStat and StatRow patterns
 */
export function StatDisplay({
	label,
	value,
	variant = 'vertical',
	labelClassName,
	valueClassName,
	containerClassName,
}: StatDisplayProps) {
	if (variant === 'horizontal') {
		return (
			<div
				className={cn(
					'flex items-center justify-between gap-3 px-4 py-3',
					containerClassName,
				)}
			>
				<span
					className={cn('text-body-sm text-muted-foreground', labelClassName)}
				>
					{label}
				</span>
				<span className={cn('text-body-sm text-foreground', valueClassName)}>
					{value}
				</span>
			</div>
		)
	}

	// vertical variant (default)
	return (
		<div className={cn('space-y-2', containerClassName)}>
			<p
				className={cn(
					'text-caption-strong uppercase tracking-wide text-muted-foreground',
					labelClassName,
				)}
			>
				{label}
			</p>
			<p className={cn('text-body-strong text-foreground', valueClassName)}>
				{value}
			</p>
		</div>
	)
}
