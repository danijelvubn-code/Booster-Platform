/**
 * Centralized query keys for TanStack Query
 * Makes cache invalidation and management easier
 */
export const queryKeys = {
	auth: {
		me: ['auth', 'me'] as const,
	},
	endpoints: {
		all: ['endpoints'] as const,
		detail: (id: string) => ['endpoints', id] as const,
	},
	models: {
		all: ['models'] as const,
		detail: (id: string) => ['models', id] as const,
	},
} as const
