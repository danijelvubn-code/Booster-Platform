import {
	type ExternalToast,
	Toaster as Sonner,
	toast as sonnerToast,
	type ToasterProps,
} from 'sonner'
import { useTheme } from '@/hooks/use-theme'

/** Auto-dismiss for informational toasts; overridden when `action` / `cancel` is used (see `applyToastDurationDefaults`). */
export const DEFAULT_TOAST_DURATION_MS = 5000

function applyToastDurationDefaults(
	data?: ExternalToast,
): ExternalToast | undefined {
	if (data?.duration !== undefined) {
		return data
	}
	if (data === undefined) {
		return { duration: DEFAULT_TOAST_DURATION_MS }
	}
	const hasInteractiveControl =
		data.action !== undefined || data.cancel !== undefined
	return {
		...data,
		duration: hasInteractiveControl ? Infinity : DEFAULT_TOAST_DURATION_MS,
	}
}

/**
 * Sonner pauses the internal dismiss timer while the pointer hovers the toaster or a toast is
 * focused (`expanded` / `interacting`). That is useful for reading long messages, but it also
 * means devtools / Cursor element picks can leave the toast open indefinitely. We schedule a
 * wall-clock dismiss so informational toasts still honor `duration` (skipped for `Infinity`
 * and for `toast.loading`, which stays until `toast.promise` resolves or you update it).
 */
function scheduleWallClockDismiss(
	id: number | string,
	options: ExternalToast | undefined,
) {
	const ms = options?.duration
	if (ms === undefined || ms === Infinity || !Number.isFinite(ms) || ms <= 0) {
		return
	}
	window.setTimeout(() => {
		sonnerToast.dismiss(id)
	}, ms)
}

type SonnerToast = typeof sonnerToast

export const toast = Object.assign(
	(message: Parameters<SonnerToast>[0], data?: Parameters<SonnerToast>[1]) => {
		const merged = applyToastDurationDefaults(data)
		const id = sonnerToast(message, merged)
		scheduleWallClockDismiss(id, merged)
		return id
	},
	{
		success: (
			message: Parameters<SonnerToast['success']>[0],
			data?: Parameters<SonnerToast['success']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.success(message, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		error: (
			message: Parameters<SonnerToast['error']>[0],
			data?: Parameters<SonnerToast['error']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.error(message, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		info: (
			message: Parameters<SonnerToast['info']>[0],
			data?: Parameters<SonnerToast['info']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.info(message, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		warning: (
			message: Parameters<SonnerToast['warning']>[0],
			data?: Parameters<SonnerToast['warning']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.warning(message, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		message: (
			message: Parameters<SonnerToast['message']>[0],
			data?: Parameters<SonnerToast['message']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.message(message, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		loading: (
			message: Parameters<SonnerToast['loading']>[0],
			data?: Parameters<SonnerToast['loading']>[1],
		) => sonnerToast.loading(message, applyToastDurationDefaults(data)),
		custom: (
			render: Parameters<SonnerToast['custom']>[0],
			data?: Parameters<SonnerToast['custom']>[1],
		) => {
			const merged = applyToastDurationDefaults(data)
			const id = sonnerToast.custom(render, merged)
			scheduleWallClockDismiss(id, merged)
			return id
		},
		promise: sonnerToast.promise,
		dismiss: sonnerToast.dismiss,
		getHistory: sonnerToast.getHistory,
		getToasts: sonnerToast.getToasts,
	},
) as SonnerToast

const defaultToastClassNames: NonNullable<
	ToasterProps['toastOptions']
>['classNames'] = {
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
}

const Toaster = ({ toastOptions, duration, ...props }: ToasterProps) => {
	const { mode } = useTheme()
	const resolvedDuration =
		duration ?? toastOptions?.duration ?? DEFAULT_TOAST_DURATION_MS

	return (
		<Sonner
			position="top-right"
			duration={resolvedDuration}
			theme={(mode === 'auto' ? 'system' : mode) as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				...toastOptions,
				duration: toastOptions?.duration ?? DEFAULT_TOAST_DURATION_MS,
				classNames: {
					...defaultToastClassNames,
					...toastOptions?.classNames,
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
