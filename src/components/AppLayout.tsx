import { Outlet } from '@tanstack/react-router'
import AppHeader from '@/components/AppHeader'
import { Toaster } from '@/components/ui/sonner'

export default function AppLayout() {
	return (
		<div className="mvp-shell flex h-dvh flex-col overflow-hidden bg-background">
			<Toaster />
			<AppHeader
				logoHref="/app/overview"
				navPathPrefix="/app"
				comingSoonPaths={['/observe', '/optimize']}
			/>

			{/* Main Content — relative so routes can fill with absolute inset-0 if needed.
			    `pt-[57px]` reserves the height of the fixed AppHeader (h-14 inner + 1px border-b)
			    so route scroll containers start below the header instead of underneath it. */}
			<main className="relative flex min-h-0 flex-1 flex-col overflow-hidden pt-[57px]">
				<Outlet />
			</main>
		</div>
	)
}
