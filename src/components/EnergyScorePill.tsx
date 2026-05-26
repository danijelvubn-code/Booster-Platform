import { Leaf } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { getSustainabilityGradeStyles } from '@/lib/model-metrics'
import { cn } from '@/lib/utils'

export type EnergyScorePillProps = {
	/** Single-letter grade (A–E); mapped to energy / sustainability styling. */
	grade: string
	className?: string
}

/**
 * Compact energy score control: leaf glyph + letter grade. Tooltip after delay explains the metric.
 */
export function EnergyScorePill({ grade, className }: EnergyScorePillProps) {
	const g = grade.toUpperCase().charAt(0)
	const styles = getSustainabilityGradeStyles(g)
	return (
		<Tooltip delayDuration={800}>
			<TooltipTrigger asChild>
				<div
					className={cn(
						'flex h-7 shrink-0 cursor-default items-center gap-1 rounded-md px-2 py-1',
						styles.box,
						className,
					)}
				>
					<Leaf
						className={cn('h-icon-16 w-icon-16 shrink-0', styles.icon)}
						aria-hidden
					/>
					<span
						className={cn(
							'text-body-sm leading-none tabular-nums',
							styles.icon,
						)}
					>
						{g}
					</span>
				</div>
			</TooltipTrigger>
			<TooltipContent side="top">Energy efficiency score</TooltipContent>
		</Tooltip>
	)
}
