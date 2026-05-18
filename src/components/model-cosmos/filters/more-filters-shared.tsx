import { Check, Info } from 'lucide-react'
import type { ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function MoreFiltersChoiceChips<V extends string>({
	options,
	value,
	onSelect,
	'aria-label': ariaLabel,
}: {
	options: readonly { value: V; label: string }[]
	value: V
	onSelect: (v: V) => void
	'aria-label': string
}) {
	return (
		<div
			className="flex flex-wrap gap-2"
			role="radiogroup"
			aria-label={ariaLabel}
		>
			{options.map((opt) => {
				const selected = value === opt.value
				return (
					// biome-ignore lint/a11y/useSemanticElements: chip-style options use toolbar buttons, not native <input type="radio">.
					<button
						key={opt.value}
						type="button"
						role="radio"
						aria-checked={selected}
						onClick={() => onSelect(opt.value)}
						className={cn(
							'inline-flex h-8 items-center rounded-md border px-3 text-body-sm transition-colors ease-standard',
							selected
								? 'border-primary/60 bg-primary/10 text-foreground'
								: 'border-border bg-card text-foreground hover:bg-muted',
						)}
					>
						{opt.label}
					</button>
				)
			})}
		</div>
	)
}

export function MoreFiltersCheckboxGroup({
	options,
	selected,
	onToggle,
	'aria-label': ariaLabel,
}: {
	options: readonly string[]
	selected: readonly string[]
	onToggle: (value: string) => void
	'aria-label': string
}) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: styled toggle chips; fieldset default chrome does not match design.
		<div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
			{options.map((option) => {
				const isSelected = selected.includes(option)
				return (
					<button
						key={option}
						type="button"
						aria-pressed={isSelected}
						onClick={() => onToggle(option)}
						className={cn(
							'inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-md border px-3 text-body-sm transition-colors ease-standard',
							isSelected
								? 'border-primary/60 bg-primary/10 text-foreground'
								: 'border-border bg-card text-foreground hover:bg-muted',
						)}
					>
						<span className="inline-flex h-icon-16 w-icon-16 shrink-0 items-center justify-center">
							<Check
								className={cn(
									'h-icon-16 w-icon-16 transition-colors ease-standard',
									isSelected
										? 'text-foreground'
										: 'text-muted-foreground',
								)}
								aria-hidden
							/>
						</span>
						<span className="min-w-0 truncate">{option}</span>
					</button>
				)
			})}
		</div>
	)
}

export function FilterLabelWithInfo({
	children,
	info,
}: {
	children: ReactNode
	info?: ReactNode
}) {
	return (
		<div className="flex items-center gap-1.5">
			<Label>{children}</Label>
			{info ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							className="inline-flex h-icon-16 w-icon-16 items-center justify-center rounded-full text-muted-foreground transition-colors ease-standard hover:text-foreground [&_svg]:h-icon-16 [&_svg]:w-icon-16"
							aria-label="About this filter"
						>
							<Info aria-hidden />
						</button>
					</TooltipTrigger>
					<TooltipContent className="max-w-xs">{info}</TooltipContent>
				</Tooltip>
			) : null}
		</div>
	)
}
