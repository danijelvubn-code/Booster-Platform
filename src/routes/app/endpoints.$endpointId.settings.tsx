import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
	Bell,
	Check,
	Copy,
	CreditCard,
	Key,
	Settings,
	ShieldCheck,
	Users,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
import {
	Input,
	InputControl,
	InputRoot,
	InputSegment,
	InputSuffixAddon,
} from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
	savedEndpointName,
	onNameChange,
	descriptionDraft,
	savedDescription,
	onDescriptionChange,
	endpointUrl,
	onSave,
	onAfterEndpointDeleted,
}: {
	endpoint: EndpointRecord
	nameDraft: string
	savedEndpointName: string
	onNameChange: (value: string) => void
	descriptionDraft: string
	savedDescription: string
	onDescriptionChange: (value: string) => void
	endpointUrl: string
	onSave: () => void
	onAfterEndpointDeleted: () => void
}) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [urlCopied, setUrlCopied] = useState(false)
	const copyUrlTimerRef = useRef<number | null>(null)

	useEffect(() => {
		setUrlCopied(false)
	}, [endpointUrl])

	useEffect(
		() => () => {
			if (copyUrlTimerRef.current !== null) {
				window.clearTimeout(copyUrlTimerRef.current)
			}
		},
		[],
	)

	const handleCopyEndpointUrl = () => {
		void navigator.clipboard.writeText(endpointUrl).then(
			() => {
				toast.success('Endpoint URL copied')
				setUrlCopied(true)
				if (copyUrlTimerRef.current !== null) {
					window.clearTimeout(copyUrlTimerRef.current)
				}
				copyUrlTimerRef.current = window.setTimeout(() => {
					setUrlCopied(false)
					copyUrlTimerRef.current = null
				}, 2000)
			},
			() => toast.error('Could not copy endpoint URL.'),
		)
	}

	const deploymentCount = deployments[endpoint.id]?.length ?? 0
	const showActiveUsageWarning =
		endpoint.type === 'Production' ||
		deploymentCount > 0 ||
		endpoint.inputTokens > 0 ||
		endpoint.monthlySpend > 0

	const hasUnsavedChanges =
		nameDraft.trim() !== savedEndpointName.trim() ||
		descriptionDraft.trim() !== savedDescription.trim()

	return (
		<Card className="overflow-hidden border-0 shadow-sm">
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
					<InputRoot
						fieldDisabled
						className="cursor-not-allowed bg-white"
					>
						<InputSegment>
							<InputControl
								id="endpoint-url"
								value={endpointUrl}
								readOnly
								disabled
								aria-readonly="true"
							/>
						</InputSegment>
						<InputSuffixAddon className="px-2">
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								className={cn(
									'-mr-1 shrink-0 text-foreground/75 hover:text-foreground',
									urlCopied &&
										'text-success hover:bg-transparent hover:text-success',
								)}
								aria-label={
									urlCopied ? 'Endpoint URL copied' : 'Copy endpoint URL'
								}
								onClick={handleCopyEndpointUrl}
							>
								{urlCopied ? (
									<Check className="h-4 w-4" aria-hidden />
								) : (
									<Copy className="h-4 w-4" aria-hidden />
								)}
							</Button>
						</InputSuffixAddon>
					</InputRoot>
				</div>
				<div className="space-y-2">
					<label htmlFor="endpoint-description" className="text-body-sm-strong">
						Use Case Description
					</label>
					<Textarea
						id="endpoint-description"
						value={descriptionDraft}
						onChange={(e) => onDescriptionChange(e.target.value)}
						placeholder="Describe your use case in a few sentences. For example: We need to process insurance claim documents and extract policy numbers, dates, and damage descriptions."
						rows={5}
					/>
				</div>
				<Button type="button" onClick={onSave} disabled={!hasUnsavedChanges}>
					Save Changes
				</Button>
			</CardContent>

			<div className="space-y-3 rounded-b-lg border border-destructive/30 bg-destructive/4 p-6">
				<h3 className="text-h3 text-destructive">Danger Zone</h3>
				<div className="flex flex-col gap-4">
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
	const [savedEndpointName, setSavedEndpointName] = useState(
		endpoint?.name ?? '',
	)
	const [descriptionDraft, setDescriptionDraft] = useState(
		endpoint?.description ?? '',
	)
	const [savedDescription, setSavedDescription] = useState(
		endpoint?.description ?? '',
	)

	useEffect(() => {
		if (!endpoint) return
		setNameDraft(endpoint.name)
		setSavedEndpointName(endpoint.name)
		setDescriptionDraft(endpoint.description ?? '')
		setSavedDescription(endpoint.description ?? '')
	}, [endpoint])

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
		const trimmedName = nameDraft.trim()
		if (!trimmedName) {
			toast.error('Could not save settings', {
				description: 'Inference endpoint name cannot be empty.',
			})
			return
		}

		const trimmedDescription = descriptionDraft.trim()
		const nameChanged = trimmedName !== savedEndpointName.trim()
		const descriptionChanged =
			trimmedDescription !== savedDescription.trim()

		if (!nameChanged && !descriptionChanged) {
			return
		}

		endpoint.name = trimmedName
		endpoint.description = trimmedDescription || undefined
		setSavedEndpointName(trimmedName)
		setNameDraft(trimmedName)
		setSavedDescription(trimmedDescription)
		setDescriptionDraft(trimmedDescription)

		toast.success('Settings saved', {
			description:
				nameChanged && descriptionChanged
					? 'Endpoint name and description have been updated.'
					: nameChanged
						? 'Endpoint name has been updated.'
						: 'Use case description has been updated.',
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
							savedEndpointName={savedEndpointName}
							onNameChange={setNameDraft}
							descriptionDraft={descriptionDraft}
							savedDescription={savedDescription}
							onDescriptionChange={setDescriptionDraft}
							endpointUrl={endpoint.endpoint}
							onSave={handleSaveGeneral}
							onAfterEndpointDeleted={() =>
								navigate({ to: '/app/overview', replace: true })
							}
						/>
					) : null}

					{activeSection === 'api-keys' ? (
						<Card className="overflow-hidden border-0 shadow-sm">
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
