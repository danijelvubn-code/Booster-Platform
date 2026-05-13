import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		// Redirect to main app
		throw redirect({ to: '/app/overview' })
	},
})
