import { Outlet } from '@tanstack/react-router'
import AppHeader from '@/components/AppHeader'

export default function AppLayout() {
	return (
		<div className="mvp-shell flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
			<AppHeader
				badge="MVP"
				logoHref="/app/overview"
				navPathPrefix="/app"
				comingSoonPaths={['/observe', '/optimize']}
			/>

			{/* Main Content — relative so routes can fill with absolute inset-0 if needed */}
			<main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
				<Outlet />
			</main>
		</div>
	)
}
