import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
	icon: LucideIcon
	label: string
	value: string
	bgColor?: string
	textColor?: string
}

export function StatCard({
	icon: Icon,
	label,
	value,
	bgColor = 'bg-primary/10',
	textColor = 'text-primary',
}: StatCardProps) {
	return (
		<Card className="border-border shadow-xs">
			<CardContent className="flex items-center gap-3 p-4">
				<div
					className={cn(
						'flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-lg',
						bgColor,
					)}
				>
					<Icon className={cn('h-icon-20 w-icon-20', textColor)} aria-hidden />
				</div>
				<div className="min-w-0">
					<p className="text-body-sm text-muted-foreground">{label}</p>
					<p className="text-body-sm font-semibold text-foreground">{value}</p>
				</div>
			</CardContent>
		</Card>
	)
}
