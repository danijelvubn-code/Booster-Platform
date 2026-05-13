import { fetchAPI } from '@/lib/api-client'

export interface User {
	id: string
	email: string
	name: string
	plan?: string
	accountStartDate?: string // ISO date string
	tokenUsage?: {
		inputTokens: number
		outputTokens: number
	}
	// Add more fields based on your backend
}

export const authService = {
	/**
	 * Gets current user information
	 */
	getMe: () => fetchAPI<User>('/api/me'),

	/**
	 * Logs out (redirects to backend)
	 */
	logout: () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`
	},
}
