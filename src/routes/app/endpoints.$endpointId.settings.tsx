import { createFileRoute, Link } from '@tanstack/react-router'
import {
	Bell,
	CreditCard,
	Key,
	Settings,
	ShieldCheck,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { ApiKeysPanel } from '@/components/ApiKeysPanel'
import { BackButton } from '@/components/BackButton'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { endpoints } from '@/data/mockData'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/endpoints/$endpointId/settings')({
	component: RouteComponent,
})

const SETTINGS_NAV = [
	{ id: 'general', label: 'General', icon: Settings, enabled: true },
	{ id: 'api-keys', label: 'API Keys', icon: Key, enabled: true },
	{ id: 'guardrails', label: 'Guardrails', icon: ShieldCheck, enabled: false },
	{ id: 'team-members', label: 'Team Members', icon: Users, enabled: false },
	{ id: 'notifications', label: 'Notifications', icon: Bell, enabled: false },
	{ id: 'budget-usage', label: 'Budget & Usage', icon: CreditCard, enabled: false },
] as const

type SettingsSectionId = (typeof SETTINGS_NAV)[number]['id']

function SettingsNav({
	activeSection,
	onSectionChange,
}: {
	activeSection: SettingsSectionId
	onSectionChange: (section: SettingsSectionId) => void
}) {
	return (
		<nav className="w-full shrink-0 space-y-1 lg:w-64" aria-label="Endpoint settings">
			{SETTINGS_NAV.map((item) => {
				const Icon = item.icon
				const isActive = item.id === activeSection
				return (
					<button
						key={item.id}
						type="button"
						onClick={() => {
							if (item.enabled) onSectionChange(item.id)
						}}
						disabled={!item.enabled}
						className={cn(
							'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-body-sm transition-colors [&_svg]:text-current disabled:opacity-100',
							isActive
								? 'border border-primary/20 bg-primary/10 text-primary shadow-xs'
								: item.enabled
									? 'text-hierarchy-secondary hover:bg-primary/8 hover:text-primary'
									: 'cursor-not-allowed text-hierarchy-disabled',
						)}
						aria-current={isActive ? 'page' : undefined}
						aria-disabled={!item.enabled}
					>
						<Icon className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
						{item.label}
					</button>
				)
			})}
		</nav>
	)
}

function GeneralSettingsPreview({
	endpointName,
	endpointUrl,
}: {
	endpointName: string
	endpointUrl: string
}) {
	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<CardTitle className="text-h3">General</CardTitle>
				<p className="text-body-sm text-muted-foreground">
					Review endpoint identity and runtime protection settings.
				</p>
			</CardHeader>
			<CardContent className="space-y-5">
				<div className="space-y-2">
					<label htmlFor="endpoint-name" className="text-body-sm-strong">
						Inference Endpoint Name
					</label>
					<Input id="endpoint-name" value={endpointName} readOnly />
				</div>
				<div className="space-y-2">
					<label htmlFor="endpoint-url" className="text-body-sm-strong">
						Endpoint URL
					</label>
					<Input id="endpoint-url" value={endpointUrl} readOnly />
				</div>
			</CardContent>
			<div className="border-t border-border p-4">
				<Button type="button">Save Changes</Button>
			</div>
		</Card>
	)
}

function RouteComponent() {
	const { endpointId } = Route.useParams()
	const endpoint = endpoints.find((s) => s.id === endpointId)
	const [activeSection, setActiveSection] =
		useState<SettingsSectionId>('general')

	if (!endpoint) {
		return (
			<div className="container py-8">
				<p className="text-body text-muted-foreground">
					Inference Endpoint not found.
				</p>
				<Button asChild variant="ghost" className="mt-4">
					<Link to="/app/overview">← Back to Inference Endpoints</Link>
				</Button>
			</div>
		)
	}

	return (
		<PageContainer gap="space-y-8" className="max-w-6xl">
			<BackButton
				to={`/app/endpoints/${endpoint.id}`}
				label={`Back to ${endpoint.name}`}
			/>

			<div className="space-y-2">
				<h1 className="text-h2 text-foreground">{endpoint.name}</h1>
				<p className="break-all font-mono text-body-sm text-muted-foreground">
					{endpoint.endpoint}
				</p>
			</div>

			<div className="flex flex-col gap-8 lg:flex-row lg:items-start">
				<SettingsNav
					activeSection={activeSection}
					onSectionChange={setActiveSection}
				/>
				<div className="min-w-0 flex-1 space-y-6">
					{activeSection === 'general' ? (
						<GeneralSettingsPreview
							endpointName={endpoint.name}
							endpointUrl={endpoint.endpoint}
						/>
					) : null}

					{activeSection === 'api-keys' ? (
						<Card className="overflow-hidden">
							<CardContent className="p-6">
								<ApiKeysPanel spaceName={endpoint.name} />
							</CardContent>
						</Card>
					) : null}
				</div>
			</div>
		</PageContainer>
	)
}
