import { useState } from 'react'

interface UseDialogReturn {
	open: boolean
	setOpen: (open: boolean) => void
	onOpenChange: (open: boolean) => void
	openDialog: () => void
	closeDialog: () => void
}

/**
 * Hook for managing dialog open/close state
 * @param initialOpen - Initial open state (default: false)
 * @returns Object with open state and control functions
 */
export function useDialog(initialOpen = false): UseDialogReturn {
	const [open, setOpen] = useState(initialOpen)

	return {
		open,
		setOpen,
		onOpenChange: setOpen,
		openDialog: () => setOpen(true),
		closeDialog: () => setOpen(false),
	}
}
