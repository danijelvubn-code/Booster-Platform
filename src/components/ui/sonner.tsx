import type * as React from 'react'
import { Toaster as Sonner, toast } from 'sonner'
import { useTheme } from '@/hooks/use-theme'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	const { mode } = useTheme()

	return (
		<Sonner
			position="top-right"
			theme={(mode === 'auto' ? 'system' : mode) as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						'group toast relative overflow-hidden border border-border bg-background text-foreground shadow-lg',
					/** Above the ::before tint (icon / content / actions are not inside one wrapper). */
					content: 'relative z-10',
					icon: 'relative z-10',
					title: 'font-medium text-foreground',
					description: 'text-muted-foreground',
					actionButton: 'relative z-10 bg-primary text-primary-foreground',
					cancelButton: 'relative z-10 bg-muted text-muted-foreground',
					closeButton:
						'relative z-10 border-border bg-background text-muted-foreground',
					/**
					 * Solid `bg-background` below + 7% semantic tint (`/7` → --alpha-7) via ::before.
					 * Use `before:` not `after:` — Sonner reserves ::after for stacked-toast spacing.
					 */
					success:
						'border-success/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-success/7 [&_svg]:text-success',
					error:
						'border-destructive/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-destructive/7 [&_svg]:text-destructive',
					warning:
						'border-warning/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-warning/7 [&_svg]:text-warning',
					info: 'border-info/50 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-info/7 [&_svg]:text-info',
					loading:
						'border-border before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-muted/7',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster, toast }
