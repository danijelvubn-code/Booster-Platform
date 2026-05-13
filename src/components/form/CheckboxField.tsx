import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface CheckboxFieldProps {
	label: string
	checked: boolean
	onCheckedChange: (checked: boolean) => void
	id?: string
	disabled?: boolean
	className?: string
	labelClassName?: string
	checkboxClassName?: string
}

export function CheckboxField({
	label,
	checked,
	onCheckedChange,
	id,
	disabled = false,
	className,
	labelClassName,
	checkboxClassName,
}: CheckboxFieldProps) {
	const checkboxId = id || label

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Checkbox
				id={checkboxId}
				checked={checked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
				className={cn('h-3.5 w-3.5', checkboxClassName)}
			/>
			<Label
				htmlFor={checkboxId}
				className={cn(
					'text-xs cursor-pointer font-normal leading-none',
					disabled && 'cursor-not-allowed opacity-50',
					labelClassName,
				)}
			>
				{label}
			</Label>
		</div>
	)
}
