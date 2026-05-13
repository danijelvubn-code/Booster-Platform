import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OptionCardProps {
	label: string
	description?: string
	selected: boolean
	onClick: () => void
}

export function OptionCard({
	label,
	description,
	selected,
	onClick,
}: OptionCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full text-left p-3 rounded-lg border transition-all',
				selected
					? 'border-primary bg-primary/10 ring-1 ring-primary'
					: 'border-border hover:border-primary/40 hover:bg-accent/50',
			)}
		>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{label}</span>
				{selected && <Check className="h-4 w-4 text-primary" />}
			</div>
			{description && (
				<p className="text-xs text-muted-foreground mt-0.5">{description}</p>
			)}
		</button>
	)
}
