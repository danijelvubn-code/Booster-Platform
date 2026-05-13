import { fetchAPI } from '@/lib/api-client'

export interface Endpoint {
	id: string
	name: string
	url: string
	status: 'active' | 'inactive'
	// Add more fields based on your backend
}

export const endpointsService = {
	/**
	 * Lists all endpoints
	 */
	getAll: () => fetchAPI<Endpoint[]>('/api/endpoints'),

	/**
	 * Gets an endpoint by ID
	 */
	getById: (id: string) => fetchAPI<Endpoint>(`/api/endpoints/${id}`),

	/**
	 * Creates a new endpoint
	 */
	create: (data: Omit<Endpoint, 'id'>) =>
		fetchAPI<Endpoint>('/api/endpoints', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	/**
	 * Updates an endpoint
	 */
	update: (id: string, data: Partial<Endpoint>) =>
		fetchAPI<Endpoint>(`/api/endpoints/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		}),

	/**
	 * Deletes an endpoint
	 */
	delete: (id: string) =>
		fetchAPI<void>(`/api/endpoints/${id}`, {
			method: 'DELETE',
		}),
}
