import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/observe')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Observe</div>
}
