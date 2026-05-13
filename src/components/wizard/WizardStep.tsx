import { type ComponentPropsWithRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

export type WizardStepStatus = 'inactive' | 'active' | 'completed' | 'error'

export type WizardStepProps = ComponentPropsWithRef<'button'> & {
	/** Visual state of the step pill. */
	status: WizardStepStatus
}

// Base classes applied to all wizard steps
const BASE_CLASSES =
	'max-w-full truncate rounded-full px-4 py-2 text-center text-caption font-medium transition-colors ' +
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

// Status-specific styling (colors, borders, rings)
const STATUS_CLASSES: Record<WizardStepStatus, string> = {
	inactive:
		'border border-border bg-muted text-muted-foreground ' +
		'enabled:hover:bg-accent enabled:hover:text-accent-foreground',

	active:
		'border-2 border-primary bg-card text-primary ' +
		'ring-4 ring-primary/30 ring-offset-2 ring-offset-card ' +
		'cursor-default',

	completed:
		'border-2 border-primary bg-primary text-primary-foreground ' +
		'enabled:hover:bg-primary/90 ' +
		'cursor-pointer',

	error: 'border-2 border-destructive bg-destructive/10 text-destructive',
}

export const WizardStep = forwardRef<HTMLButtonElement, WizardStepProps>(
	({ className, status, disabled, type = 'button', ...props }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				disabled={disabled}
				className={cn(
					BASE_CLASSES,
					STATUS_CLASSES[status],
					disabled && 'cursor-not-allowed opacity-50',
					className,
				)}
				{...props}
			/>
		)
	},
)

WizardStep.displayName = 'WizardStep'
