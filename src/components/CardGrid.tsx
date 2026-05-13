import { cn } from '@/lib/utils'

interface CardGridProps {
	children: React.ReactNode
	cols?: {
		xs?: number
		sm?: number
		md?: number
		lg?: number
		xl?: number
	}
	gap?: string
	className?: string
}

export function CardGrid({
	children,
	cols = { xs: 1, sm: 2 },
	gap = 'gap-4',
	className,
}: CardGridProps) {
	const gridClasses = cn(
		'grid',
		gap,
		cols.xs && `grid-cols-${cols.xs}`,
		cols.sm && `sm:grid-cols-${cols.sm}`,
		cols.md && `md:grid-cols-${cols.md}`,
		cols.lg && `lg:grid-cols-${cols.lg}`,
		cols.xl && `xl:grid-cols-${cols.xl}`,
		className,
	)

	return <div className={gridClasses}>{children}</div>
}
