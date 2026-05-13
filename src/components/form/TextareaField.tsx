import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface TextareaFieldProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
	id: string
	error?: string
	hint?: string
	required?: boolean
	containerClassName?: string
}

export function TextareaField({
	label,
	id,
	error,
	hint,
	required,
	containerClassName,
	className,
	...props
}: TextareaFieldProps) {
	return (
		<div className={cn('space-y-2', containerClassName)}>
			<Label htmlFor={id}>
				{label}
				{required && <span className="text-destructive ml-1">*</span>}
			</Label>
			<Textarea
				id={id}
				className={cn(error && 'border-destructive', className)}
				aria-invalid={!!error}
				aria-describedby={
					error ? `${id}-error` : hint ? `${id}-hint` : undefined
				}
				{...props}
			/>
			{error && (
				<p id={`${id}-error`} className="text-sm text-destructive">
					{error}
				</p>
			)}
			{hint && !error && (
				<p id={`${id}-hint`} className="text-sm text-muted-foreground">
					{hint}
				</p>
			)}
		</div>
	)
}
