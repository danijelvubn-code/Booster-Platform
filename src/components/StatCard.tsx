import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IconBox } from '@/components/ui/icon-box'
import { cn } from '@/lib/utils'

interface StatCardProps {
	icon: LucideIcon
	label: string
	value: string
	bgColor?: string
	textColor?: string
	className?: string
}

export function StatCard({
	icon: Icon,
	label,
	value,
	bgColor = 'bg-primary/10',
	textColor = 'text-primary',
	className,
}: StatCardProps) {
	return (
		<Card className={cn('border-border shadow-xs', className)}>
			<CardContent className="flex items-center gap-3 p-4">
				<IconBox
					size="xxxlg"
					shape="square"
					className={cn('rounded-md', bgColor)}
				>
					<Icon className={textColor} aria-hidden />
				</IconBox>
				<div className="min-w-0">
					<p className="text-body-sm text-muted-foreground">{label}</p>
					<p className="text-body-sm font-semibold text-foreground">{value}</p>
				</div>
			</CardContent>
		</Card>
	)
}
