import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { authService } from '@/services/auth.service'

export function useAuth() {
	const queryClient = useQueryClient()

	// Mock authentication - returns fake user data without backend call
	const {
		data: user,
		isLoading,
		error,
		isError,
	} = useQuery({
		queryKey: queryKeys.auth.me,
		queryFn: async () => {
			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 100))
			// Return mock user data
			return {
				id: 'mock-user-123',
				email: 'user@example.com',
				name: 'Bob Martinez',
				plan: 'Pay Per Use',
				accountStartDate: '2026-02-12',
				tokenUsage: {
					inputTokens: 5_360_000,
					outputTokens: 1_780_000,
				},
			}
		},
		retry: false,
		staleTime: 5 * 60 * 1000,
	})

	const logout = () => {
		queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
		authService.logout()
	}

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		isError,
		error,
		logout,
	}
}
