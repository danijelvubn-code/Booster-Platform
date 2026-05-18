import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
	'inline-flex select-none items-center justify-center gap-1 rounded-md border px-2 transition-colors ease-standard',
	{
		variants: {
			variant: {
				default: '',
				secondary: '',
				destructive: '',
				success: '',
				warning: '',
				info: '',
				outline: '',
				/** Light gray surface and muted label (e.g. neutral tags, metadata). */
				muted: '',
			},
			appearance: {
				pill: '',
				ghost: '',
			},
			size: {
				'20': 'h-5 text-caption [&>svg]:h-icon-16 [&>svg]:w-icon-16',
				'24': 'h-6 text-caption [&>svg]:h-icon-16 [&>svg]:w-icon-16',
				'28': 'h-icon-28 text-body-sm [&>svg]:h-icon-20 [&>svg]:w-icon-20',
			},
		},
		compoundVariants: [
			{
				appearance: 'pill',
				variant: 'default',
				className:
					'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
			},
			{
				appearance: 'pill',
				variant: 'secondary',
				className:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
			},
			{
				appearance: 'pill',
				variant: 'destructive',
				className:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
			},
			{
				appearance: 'pill',
				variant: 'success',
				className:
					'border-transparent bg-success text-success-foreground hover:bg-success/90',
			},
			{
				appearance: 'pill',
				variant: 'warning',
				className:
					'border-transparent bg-warning text-warning-foreground hover:bg-warning/90',
			},
			{
				appearance: 'pill',
				variant: 'info',
				className:
					'border-transparent bg-info text-info-foreground hover:bg-info/90',
			},
			{
				appearance: 'pill',
				variant: 'outline',
				className:
					'border-border bg-transparent text-muted-foreground hover:border-foreground/30',
			},
			{
				appearance: 'pill',
				variant: 'muted',
				className:
					'border-transparent bg-muted text-muted-foreground hover:bg-muted/80',
			},
			{
				appearance: 'ghost',
				variant: 'default',
				className:
					'bg-primary/[0.04] border-primary/[0.15] text-primary hover:bg-primary/[0.07] hover:border-primary/[0.25]',
			},
			{
				appearance: 'ghost',
				variant: 'secondary',
				className:
					'border-secondary/30 bg-secondary/10 text-secondary-foreground hover:border-secondary/40 hover:bg-secondary/20',
			},
			{
				appearance: 'ghost',
				variant: 'destructive',
				className:
					'border-destructive/20 bg-destructive/5 text-destructive hover:border-destructive/30 hover:bg-destructive/10',
			},
			{
				appearance: 'ghost',
				variant: 'success',
				className:
					'border-success/20 bg-success/5 text-success hover:border-success/30 hover:bg-success/10',
			},
			{
				appearance: 'ghost',
				variant: 'warning',
				className:
					'border-warning/20 bg-warning/5 text-warning hover:border-warning/30 hover:bg-warning/10',
			},
			{
				appearance: 'ghost',
				variant: 'info',
				className:
					'border-info/20 bg-info/5 text-info hover:border-info/30 hover:bg-info/10',
			},
			{
				appearance: 'ghost',
				variant: 'outline',
				className:
					'border-border bg-transparent text-muted-foreground hover:border-foreground/30',
			},
			{
				appearance: 'ghost',
				variant: 'muted',
				className:
					'border-border bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted',
			},
		],
		defaultVariants: {
			variant: 'default',
			appearance: 'pill',
			size: '20',
		},
	},
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {
	type?: 'pill' | 'ghost'
	leadingIcon?: React.ReactNode
	trailingIcon?: React.ReactNode
	onDismiss?: () => void
}

function Badge({
	className,
	variant,
	size,
	appearance,
	type,
	leadingIcon,
	trailingIcon,
	onDismiss,
	children,
	onClick,
	onKeyDown,
	...props
}: BadgeProps) {
	const [isVisible, setIsVisible] = React.useState(true)
	const isDismissible = Boolean(trailingIcon)
	const resolvedAppearance = type ?? appearance

	if (!isVisible) {
		return null
	}

	const handleDismiss = () => {
		setIsVisible(false)
		onDismiss?.()
	}

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		onClick?.(event as React.MouseEvent<HTMLSpanElement>)
		if (event.defaultPrevented || !isDismissible) return
		handleDismiss()
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		onKeyDown?.(event as React.KeyboardEvent<HTMLSpanElement>)
		if (event.defaultPrevented || !isDismissible) return
		if (event.key === 'Enter') {
			event.preventDefault()
			handleDismiss()
		}
	}

	const baseClassName = cn(
		badgeVariants({ variant, appearance: resolvedAppearance, size }),
		isDismissible &&
			'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		className,
	)

	const content = (
		<>
			{leadingIcon}
			<span className="inline-flex min-w-0 items-center gap-1">
				{children}
			</span>
			{trailingIcon}
		</>
	)

	if (isDismissible) {
		return (
			<button
				type="button"
				className={baseClassName}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{content}
			</button>
		)
	}

	return (
		<button
			type="button"
			tabIndex={0}
			className={baseClassName}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...props}
		>
			{content}
		</button>
	)
}

export { Badge, badgeVariants }
