import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
	SheetContent,
	SheetDescription,
	SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

/**
 * Shared shell for right-docked product sheets: fixed width token, inset rounded
 * panel on `sm+`, header strip, scrollable body, optional footer.
 *
 * Use with `Sheet` + `SheetTrigger` from `@/components/ui/sheet`; pass arbitrary
 * content as `children`.
 */
const appSideSheetShellVariants = cva(
	[
		'flex flex-col overflow-hidden p-0',
		'[&>button]:left-auto [&>button]:right-4 [&>button]:top-7 [&>button]:-translate-y-1/2',
		'[&>button>svg]:h-icon-20 [&>button>svg]:w-icon-20',
		'sm:top-6 sm:bottom-6 sm:right-6 sm:h-auto sm:rounded-2xl sm:shadow-lg',
	].join(' '),
	{
		variants: {
			maxWidth: {
				sm: 'sm:max-w-modal-sm',
				md: 'sm:max-w-modal-md',
				lg: 'sm:max-w-modal-lg',
				/** 560px — same token as `max-w-modal-auth` / `--modal-size-auth` */
				sheet: 'sm:max-w-modal-auth',
			},
		},
		defaultVariants: {
			maxWidth: 'lg',
		},
	},
)

export type AppSideSheetContentProps = React.ComponentPropsWithoutRef<
	typeof SheetContent
> &
	VariantProps<typeof appSideSheetShellVariants> & {
		title: React.ReactNode
		/** Optional accessibility description (defaults to screen-reader only). */
		description?: React.ReactNode
		descriptionClassName?: string
		headerClassName?: string
		/** Fixed region below the title (e.g. search). Does not scroll with `children`. */
		toolbar?: React.ReactNode
		toolbarClassName?: string
		bodyClassName?: string
		/** Fixed strip below the scroll body (e.g. pagination). */
		bottomAccessory?: React.ReactNode
		bottomAccessoryClassName?: string
		footer?: React.ReactNode
		footerClassName?: string
	}

export const AppSideSheetContent = React.forwardRef<
	React.ElementRef<typeof SheetContent>,
	AppSideSheetContentProps
>(
	(
		{
			className,
			title,
			description,
			descriptionClassName,
			headerClassName,
			toolbar,
			toolbarClassName,
			bodyClassName,
			bottomAccessory,
			bottomAccessoryClassName,
			footer,
			footerClassName,
			maxWidth,
			children,
			side = 'right',
			...props
		},
		ref,
	) => {
		return (
			<SheetContent
				ref={ref}
				side={side}
				className={cn(appSideSheetShellVariants({ maxWidth }), className)}
				{...props}
			>
				<div
					className={cn(
						'flex h-14 shrink-0 items-center border-b border-border px-6 pr-14',
						headerClassName,
					)}
				>
					<SheetTitle className="min-w-0 flex-1 truncate">{title}</SheetTitle>
				</div>
				{description ? (
					<SheetDescription className={cn('sr-only', descriptionClassName)}>
						{description}
					</SheetDescription>
				) : null}
				{toolbar != null ? (
					<div
						className={cn(
							'shrink-0 border-b border-border px-6 py-3',
							toolbarClassName,
						)}
					>
						{toolbar}
					</div>
				) : null}
				<div className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<div
						className={cn(
							'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-6 pl-6 pr-4',
							bodyClassName,
						)}
						style={{ scrollbarGutter: 'stable' }}
					>
						{children}
					</div>
					{bottomAccessory != null ? (
						<div
							className={cn(
								'shrink-0 border-t border-border px-6 py-3',
								bottomAccessoryClassName,
							)}
						>
							{bottomAccessory}
						</div>
					) : null}
				</div>
				{footer ? (
					<div
						className={cn(
							'shrink-0 border-t border-border px-6 py-4',
							footerClassName,
						)}
					>
						{footer}
					</div>
				) : null}
			</SheetContent>
		)
	},
)

AppSideSheetContent.displayName = 'AppSideSheetContent'
