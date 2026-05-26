import { X } from 'lucide-react'

import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type SelectedFilterChipItem = {
	key: string
	label: string
	onRemove: () => void
}

export function SelectedFilterChips({
	chips,
	onClearAll,
}: {
	chips: SelectedFilterChipItem[]
	onClearAll: () => void
}) {
	if (chips.length === 0) return null
	return (
		<div className="flex min-w-0 flex-wrap items-center gap-2">
			{chips.map((c) => (
				<span
					key={c.key}
					className={cn(
						badgeVariants({
							variant: 'outline',
							appearance: 'pill',
							size: '28',
						}),
						'max-w-full min-w-0 border-border bg-white pr-1 font-normal text-foreground hover:border-border hover:bg-white',
					)}
				>
					<span className="min-w-0 max-w-[240px] truncate">{c.label}</span>
					<button
						type="button"
						className="inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-muted/60"
						onClick={c.onRemove}
						aria-label={`Remove ${c.label}`}
					>
						<X className="h-3 w-3" aria-hidden />
					</button>
				</span>
			))}
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="shrink-0 text-muted-foreground"
				onClick={onClearAll}
			>
				Clear all
			</Button>
		</div>
	)
}
