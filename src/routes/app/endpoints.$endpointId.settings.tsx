import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
	Bell,
	CreditCard,
	Key,
	Settings,
	ShieldCheck,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ApiKeysPanel } from '@/components/ApiKeysPanel'
import { BackButton } from '@/components/BackButton'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/sonner'
import { deployments, endpoints } from '@/data/mockData'
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

type EndpointRecord = (typeof endpoints)[number]

function DeleteEndpointDialog({
	endpoint,
	open,
	onOpenChange,
	showActiveUsageWarning,
	onAfterEndpointDeleted,
}: {
	endpoint: EndpointRecord
	open: boolean
	onOpenChange: (open: boolean) => void
	showActiveUsageWarning: boolean
	onAfterEndpointDeleted: () => void
}) {
	const confirmInputId = `${endpoint.id}-delete-confirm`
	const [confirmText, setConfirmText] = useState('')

	useEffect(() => {
		if (open) setConfirmText('')
	}, [open])

	const confirmationName = endpoint.name
	const nameMatches = confirmText === confirmationName

	const handlePermanentDelete = () => {
		if (!nameMatches) return

		if (endpoint.id === 'sp-default') {
			toast.error('Endpoint could not be deleted', {
				description:
					'This endpoint still has active dependencies. Remove connected API keys, traffic rules, or policies before deleting it.',
			})
			onOpenChange(false)
			return
		}

		const idx = endpoints.findIndex((e) => e.id === endpoint.id)
		if (idx !== -1) endpoints.splice(idx, 1)
		delete deployments[endpoint.id]

		onOpenChange(false)
		toast.success('Endpoint deleted', {
			description: `${confirmationName} has been permanently deleted. Its endpoint URL is no longer active.`,
		})
		onAfterEndpointDeleted()
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg gap-0 overflow-hidden p-0 sm:rounded-lg">
				<div className="space-y-4 p-6 pb-4">
					<DialogHeader className="space-y-2 text-left">
						<DialogTitle className="text-h3">Delete endpoint?</DialogTitle>
					</DialogHeader>
					<div className="space-y-3">
						<p className="text-body-sm text-hierarchy-secondary">
							You are about to permanently delete{' '}
							<span className="font-semibold text-foreground">
								{confirmationName}
							</span>
							.
						</p>
						<p className="text-body-sm text-hierarchy-secondary">
							Applications using this endpoint URL will stop working immediately.
							This cannot be undone.
						</p>
						{showActiveUsageWarning ? (
							<p className="rounded-md border border-destructive/25 bg-destructive/7 px-3 py-2 text-body-sm text-foreground">
								This endpoint has active API usage. Deleting it may break
								connected applications.
							</p>
						) : null}
						<div className="space-y-2">
							<p className="text-body-sm font-medium text-hierarchy-secondary">
								This action will:
							</p>
							<ul className="list-disc space-y-1 pl-5 text-body-sm text-hierarchy-secondary">
								<li>Remove the endpoint configuration</li>
								<li>Disable the endpoint URL</li>
								<li>Revoke or invalidate endpoint-specific API access</li>
								<li>Stop routing traffic through this endpoint</li>
								<li>
									Keep historical usage/logs only if your retention policy allows
									it
								</li>
							</ul>
						</div>
					</div>
					<div className="space-y-2 pt-1">
						<label
							htmlFor={confirmInputId}
							className="text-body-sm font-medium text-foreground"
						>
							To confirm, type the endpoint name below:
						</label>
						<Input
							id={confirmInputId}
							value={confirmText}
							onChange={(e) => setConfirmText(e.target.value)}
							placeholder={`Type "${confirmationName}"`}
							autoComplete="off"
							aria-invalid={confirmText.length > 0 && !nameMatches}
						/>
					</div>
				</div>
				<DialogFooter className="gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:justify-end">
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="destructive"
						disabled={!nameMatches}
						onClick={handlePermanentDelete}
					>
						Delete endpoint permanently
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function GeneralSettingsPreview({
	endpoint,
	nameDraft,
	onNameChange,
	endpointUrl,
	onSave,
	onAfterEndpointDeleted,
}: {
	endpoint: EndpointRecord
	nameDraft: string
	onNameChange: (value: string) => void
	endpointUrl: string
	onSave: () => void
	onAfterEndpointDeleted: () => void
}) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

	const deploymentCount = deployments[endpoint.id]?.length ?? 0
	const showActiveUsageWarning =
		endpoint.type === 'Production' ||
		deploymentCount > 0 ||
		endpoint.inputTokens > 0 ||
		endpoint.monthlySpend > 0

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
					<Input
						id="endpoint-name"
						value={nameDraft}
						onChange={(e) => onNameChange(e.target.value)}
						autoComplete="off"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="endpoint-url" className="text-body-sm-strong">
						Endpoint URL
					</label>
					<Input
						id="endpoint-url"
						value={endpointUrl}
						readOnly
						disabled
						aria-readonly="true"
					/>
				</div>
			</CardContent>
			<div className="border-t border-border p-4">
				<Button type="button" onClick={onSave}>
					Save Changes
				</Button>
			</div>

			<div className="space-y-3 border-t border-border bg-muted/20 p-6">
				<h3 className="text-h3 text-foreground">Danger Zone</h3>
				<div className="flex flex-col gap-4 rounded-lg border border-border bg-white px-4 py-3">
					<div className="space-y-2">
						<p className="text-body-sm-strong text-foreground">Delete endpoint</p>
						<div className="space-y-2 text-body-sm text-hierarchy-secondary">
							<p>
								Permanently delete this endpoint and disable its API URL. Any
								application using this endpoint will stop working immediately.
							</p>
							<p>
								Historical usage and logs may remain available based on your
								organization&apos;s retention policy.
							</p>
						</div>
					</div>
					<Button
						type="button"
						variant="destructive"
						className="self-start"
						onClick={() => setDeleteDialogOpen(true)}
					>
						Delete endpoint
					</Button>
				</div>
			</div>

			<DeleteEndpointDialog
				endpoint={endpoint}
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				showActiveUsageWarning={showActiveUsageWarning}
				onAfterEndpointDeleted={onAfterEndpointDeleted}
			/>
		</Card>
	)
}

function RouteComponent() {
	const navigate = useNavigate()
	const { endpointId } = Route.useParams()
	const endpoint = endpoints.find((s) => s.id === endpointId)
	const [activeSection, setActiveSection] =
		useState<SettingsSectionId>('general')
	const [nameDraft, setNameDraft] = useState(endpoint?.name ?? '')

	useEffect(() => {
		if (endpoint) setNameDraft(endpoint.name)
	}, [endpoint?.id, endpoint?.name])

	if (!endpoint) {
		return (
			<PageContainer gap="gap-4" className="py-8">
				<p className="text-body text-muted-foreground">
					Inference Endpoint not found.
				</p>
				<Button asChild variant="ghost" className="mt-4 self-start">
					<Link to="/app/overview">← Back to Inference Endpoints</Link>
				</Button>
			</PageContainer>
		)
	}

	const handleSaveGeneral = () => {
		const trimmed = nameDraft.trim()
		if (!trimmed) {
			toast.error('Inference endpoint name cannot be empty.')
			return
		}
		if (trimmed === endpoint.name) {
			toast.message('No changes to save.')
			return
		}
		endpoint.name = trimmed
		toast.success('Settings saved', {
			description: 'Endpoint name has been updated.',
		})
	}

	return (
		<PageContainer gap="space-y-8" className="max-w-6xl">
			<BackButton
				to={`/app/endpoints/${endpoint.id}`}
				label={`Back to ${nameDraft}`}
			/>

			<div className="flex flex-col gap-8 lg:flex-row lg:items-start">
				<SettingsNav
					activeSection={activeSection}
					onSectionChange={setActiveSection}
				/>
				<div className="min-w-0 flex-1 space-y-6">
					{activeSection === 'general' ? (
						<GeneralSettingsPreview
							endpoint={endpoint}
							nameDraft={nameDraft}
							onNameChange={setNameDraft}
							endpointUrl={endpoint.endpoint}
							onSave={handleSaveGeneral}
							onAfterEndpointDeleted={() =>
								navigate({ to: '/app/overview', replace: true })
							}
						/>
					) : null}

					{activeSection === 'api-keys' ? (
						<Card className="overflow-hidden">
							<CardContent className="p-0">
								<ApiKeysPanel spaceName={endpoint.name} />
							</CardContent>
						</Card>
					) : null}
				</div>
			</div>
		</PageContainer>
	)
}
