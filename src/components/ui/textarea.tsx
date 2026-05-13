import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
	'flex w-full resize-y rounded-md border border-input bg-background text-foreground ring-offset-background transition-colors ease-standard placeholder:text-foreground/50 enabled:hover:border-ring read-only:hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground/50 read-only:cursor-default read-only:bg-muted',
	{
		variants: {
			size: {
				sm: 'min-h-16 px-2 py-2 text-caption',
				md: 'min-h-20 px-3 py-2 text-body-sm',
				lg: 'min-h-24 px-4 py-3 text-body-sm',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
)

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
	VariantProps<typeof textareaVariants>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, size, ...props }, ref) => {
		return (
			<textarea
				ref={ref}
				className={cn(textareaVariants({ size }), className)}
				{...props}
			/>
		)
	},
)
Textarea.displayName = 'Textarea'

export { Textarea }
