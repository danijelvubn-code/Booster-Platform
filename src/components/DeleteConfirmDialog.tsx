import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteConfirmDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	itemName: string
	itemType?: string
	onConfirm: () => void
	isLoading?: boolean
	description?: string
}

export function DeleteConfirmDialog({
	open,
	onOpenChange,
	itemName,
	itemType = 'item',
	onConfirm,
	isLoading = false,
	description,
}: DeleteConfirmDialogProps) {
	const defaultDescription = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {itemType}</AlertDialogTitle>
					<AlertDialogDescription>
						{description || defaultDescription}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={isLoading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
