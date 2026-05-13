import { toast } from '@/components/ui/sonner'

/**
 * Standardized toast notification helpers
 * Provides consistent messaging across the app
 */

export const toastMessages = {
	// Success messages
	created: (itemName: string, itemType = 'Item') =>
		toast.success(`${itemType} Created`, {
			description: `"${itemName}" has been created successfully.`,
		}),

	updated: (itemName: string, itemType = 'Item') =>
		toast.success(`${itemType} Updated`, {
			description: `"${itemName}" has been updated successfully.`,
		}),

	deleted: (itemName: string, itemType = 'Item') =>
		toast.success(`${itemType} Deleted`, {
			description: `"${itemName}" has been removed.`,
		}),

	saved: (itemName: string) =>
		toast.success('Saved', {
			description: `"${itemName}" has been saved.`,
		}),

	// Error messages
	error: (message: string, title = 'Error') =>
		toast.error(title, {
			description: message,
		}),

	// Info messages
	copied: (label = 'Content') =>
		toast.success(`${label} Copied`, {
			description: 'Copied to clipboard.',
		}),

	// Generic success
	success: (message: string, description?: string) =>
		toast.success(message, description ? { description } : undefined),
}
