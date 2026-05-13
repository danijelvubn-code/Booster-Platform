import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { APIError } from '@/lib/api-client'

export default function TanStackQueryProvider({
	children,
}: {
	children: ReactNode
}) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Retry logic
						retry: (failureCount, error) => {
							// Don't retry on 401 (handled by fetchAPI)
							if (error instanceof APIError && error.status === 401) {
								return false
							}
							// Retry up to 3 times for other errors
							return failureCount < 3
						},
						// Stale time: 30 seconds
						staleTime: 30 * 1000,
						// Cache time: 5 minutes
						gcTime: 5 * 60 * 1000,
					},
					mutations: {
						// Optional: global error handler for mutations
						onError: (error) => {
							if (error instanceof APIError) {
								console.error('Mutation error:', error.message)
								// You can add toast notifications here
							}
						},
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
