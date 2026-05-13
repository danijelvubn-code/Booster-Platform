import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	id: string
	error?: string
	hint?: string
	required?: boolean
	containerClassName?: string
}

export function InputField({
	label,
	id,
	error,
	hint,
	required,
	containerClassName,
	className,
	...props
}: InputFieldProps) {
	return (
		<div className={cn('space-y-2', containerClassName)}>
			<Label htmlFor={id}>
				{label}
				{required && <span className="text-destructive ml-1">*</span>}
			</Label>
			<Input
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
