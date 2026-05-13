import { env } from '@/env'

/**
 * Custom error for API responses
 */
export class APIError extends Error {
	constructor(
		message: string,
		public status: number,
		public statusText: string,
	) {
		super(message)
		this.name = 'APIError'
	}
}

/**
 * Base API client with cookie-based authentication
 */
export async function fetchAPI<T = unknown>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> {
	const url = `${env.VITE_API_URL}${endpoint}`

	const response = await fetch(url, {
		...options,
		credentials: 'include', // Important: automatically sends cookies
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	})

	// If 401: user not authenticated, redirect to backend for login
	if (response.status === 401) {
		window.location.href = `${env.VITE_API_URL}/auth/login` // Backend will handle the redirect to the actual keycloak page and then back to the app
		// Return a promise that never resolves to prevent error boundary from triggering
		// The browser will navigate away before this matters
		return new Promise(() => {}) as Promise<T>
	}

	// If not OK, throw error
	if (!response.ok) {
		const errorText = await response.text()
		throw new APIError(
			errorText || response.statusText,
			response.status,
			response.statusText,
		)
	}

	// If 204 No Content, return null
	if (response.status === 204) {
		return null as T
	}

	return response.json()
}
