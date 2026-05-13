import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

/**
 * Root host for Radix toasts: wraps `ToastProvider`, maps the `useToast` queue to `Toast` roots,
 * and renders `ToastViewport` for positioning. Mount once in the app shell (see `App.tsx`).
 * Trigger notifications with `toast()` from `@/hooks/use-toast`.
 */
function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, ...props }) => (
				<Toast key={id} {...props}>
					<div className="grid gap-1">
						{title && <ToastTitle>{title}</ToastTitle>}
						{description && <ToastDescription>{description}</ToastDescription>}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	)
}

Toaster.displayName = 'Toaster'

export { Toaster }
