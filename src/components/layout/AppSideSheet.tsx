import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import {
	SheetContent,
	SheetDescription,
	SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

/** Right-docked sheet widths (`sm+`). Default product size is `md` (560px). */
export const sheetWidthClasses = {
	sm: 'max-sm:w-3/4 sm:w-sheet-sm',
	md: 'max-sm:w-3/4 sm:w-sheet-md',
	lg: 'max-sm:w-3/4 sm:w-sheet-lg',
	xl: 'max-sm:w-3/4 sm:w-sheet-xl',
	xxl: 'max-sm:w-3/4 sm:w-sheet-xxl',
} as const

export type SheetWidth = keyof typeof sheetWidthClasses

/**
 * Shared shell for right-docked product sheets: fixed width token, inset rounded
 * panel on `sm+`, header strip, scrollable body, optional footer.
 *
 * Use with `Sheet` + `SheetTrigger` from `@/components/ui/sheet`; pass arbitrary
 * content as `children`. Omit `maxWidth` to use the default `md` (560px).
 */
const appSideSheetShellVariants = cva(
	[
		'flex flex-col gap-0 overflow-hidden p-0',
		'[&>button]:left-auto [&>button]:right-4 [&>button]:top-7 [&>button]:z-20 [&>button]:-translate-y-1/2',
		'[&>button>svg]:h-icon-20 [&>button>svg]:w-icon-20',
		'sm:top-6 sm:bottom-6 sm:right-6 sm:h-auto sm:rounded-2xl sm:shadow-lg',
	].join(' '),
	{
		variants: {
			maxWidth: sheetWidthClasses,
		},
		defaultVariants: {
			maxWidth: 'md',
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
		/** Sticky header + toolbar shell (e.g. `bg-white` when the chrome should match the title bar). */
		chromeClassName?: string
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
			chromeClassName,
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
						'sticky top-0 z-10 shrink-0 bg-background shadow-sm',
						chromeClassName,
					)}
				>
					<div
						className={cn(
							'flex h-14 items-center border-b border-border px-6 pr-14',
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
						<div className={cn('w-full border-b border-border', toolbarClassName)}>
							{toolbar}
						</div>
					) : null}
				</div>
				<div className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<div
						className={cn(
							'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-6 pl-6 pr-4 pt-6 [&>*]:shrink-0',
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
