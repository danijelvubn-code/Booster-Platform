import {
	Check,
	Copy,
	ExternalLink,
	Plus,
	X,
} from 'lucide-react'
import { useId, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/sonner'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { apiKeys as initialKeys } from '@/data/mockData'
import { cn } from '@/lib/utils'

/** Match header/body column widths across active + disabled key tables */
const apiKeysTableCol = {
	name: 'min-w-0',
	key: 'w-[140px] min-w-[140px] max-w-[140px]',
	created: 'w-[140px] min-w-[140px] max-w-[140px]',
	lastUsed: 'w-[140px] min-w-[140px] max-w-[140px]',
	actions: 'w-[104px] min-w-[104px] max-w-[104px] whitespace-nowrap text-right',
} as const

interface ApiKey {
	id: string
	name: string
	prefix: string
	createdAt: string
	lastUsed: string | null
	status: 'active' | 'disabled'
	isDefault?: boolean
	/** When set, Copy uses this value (default key); custom keys only show prefix until creation flow. */
	fullKey?: string
}

interface ApiKeysPanelProps {
	spaceName: string
}

/** First 3 + last 4 characters for key previews in the UI. */
function apiKeyMaskedPreview(key: Pick<ApiKey, 'prefix' | 'fullKey'>): string {
	const secret = key.fullKey
	if (secret) {
		if (secret.length <= 7) return secret
		return `${secret.slice(0, 3)}...${secret.slice(-4)}`
	}
	const p = key.prefix
	const parts = p.split('...')
	if (parts.length === 2 && parts[0] !== undefined && parts[1] !== undefined) {
		const head = parts[0]
		const tail = parts[1]
		return `${head.slice(0, 3)}...${tail.slice(-4)}`
	}
	if (p.length <= 7) return p
	return `${p.slice(0, 3)}...${p.slice(-4)}`
}

const generateMockKey = () => {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
	let key = 'bdc_'
	for (let i = 0; i < 32; i++)
		key += chars[Math.floor(Math.random() * chars.length)]
	return key
}

export function ApiKeysPanel({ spaceName }: ApiKeysPanelProps) {
	const keyNameId = useId()
	const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
	const [isCreating, setIsCreating] = useState(false)
	const [newKeyName, setNewKeyName] = useState('')
	const [justCreatedKey, setJustCreatedKey] = useState<string | null>(null)
	const [copiedId, setCopiedId] = useState<string | null>(null)

	const handleCreate = () => {
		if (!newKeyName.trim()) return
		const fullKey = generateMockKey()
		const newKey: ApiKey = {
			id: `key-${Date.now()}`,
			name: newKeyName.trim(),
			prefix: `${fullKey.slice(0, 3)}...${fullKey.slice(-4)}`,
			createdAt: new Date().toISOString().split('T')[0],
			lastUsed: null,
			status: 'active',
			isDefault: false,
		}
		setKeys((prev) => [newKey, ...prev])
		setJustCreatedKey(fullKey)
		setNewKeyName('')
		setIsCreating(false)
		toast.success('API key created', {
			description: `"${newKey.name}" is ready to use. Copy it now - it won't be shown again.`,
		})
	}

	const handleToggleStatus = (id: string) => {
		const key = keys.find((k) => k.id === id)
		const newStatus = key?.status === 'active' ? 'disabled' : 'active'
		setKeys((prev) =>
			prev.map((k) =>
				k.id !== id ? k : { ...k, status: newStatus as ApiKey['status'] },
			),
		)
		toast.success(newStatus === 'disabled' ? 'Key disabled' : 'Key enabled', {
			description:
				newStatus === 'disabled'
					? 'This key can no longer be used for requests.'
					: 'This key is now active again.',
		})
	}

	const handleCopy = (id: string, text: string) => {
		navigator.clipboard.writeText(text)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 2000)
	}

	const defaultKey = keys.find((k) => k.isDefault)
	const customKeys = keys.filter((k) => !k.isDefault)
	const activeCustomKeys = customKeys.filter((k) => k.status === 'active')
	const disabledCustomKeys = customKeys.filter((k) => k.status === 'disabled')

	return (
		<div className="flex flex-col">
			<section
				aria-labelledby="api-keys-panel-heading"
				className="px-6 pb-5 pt-6"
			>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="min-w-0 space-y-1">
						<h2 id="api-keys-panel-heading" className="text-h3 text-foreground">
							API Keys
						</h2>
						<p className="w-[620px] text-body-sm text-muted-foreground">
							Manage API keys for{' '}
							<span className="font-semibold text-foreground">{spaceName}</span>.
							Keys are scoped to the endpoint and apply to all models within it.
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="shrink-0 self-start"
						asChild
					>
						<a
							href="https://docs.booster.cloud/api-keys"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2"
						>
							Learn more
							<ExternalLink className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
						</a>
					</Button>
				</div>
			</section>

			{defaultKey ? <Separator className="w-full shrink-0" decorative /> : null}

			{defaultKey && (
				<section aria-labelledby="default-api-key-heading" className="px-6 py-6">
					<div className="space-y-3 rounded-lg border bg-muted/30 p-4">
					<div className="flex flex-wrap items-center gap-3">
						<h3 id="default-api-key-heading" className="text-base font-semibold text-foreground">
							Default API key
						</h3>
						{defaultKey.status === 'active' ? (
							<Badge variant="success" size="24">
								active
							</Badge>
						) : (
							<Badge
								variant="outline"
								size="24"
								className="border-muted-foreground/30 text-muted-foreground"
							>
								disabled
							</Badge>
						)}
					</div>
					<p className="max-w-[620px] text-body-sm text-hierarchy-secondary">
						Automatically created with this endpoint for quick setup and testing.
						For production use, create dedicated keys so access can be managed,
						rotated, and disabled safely.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
						<code
							className={cn(
								'min-w-0 max-w-full truncate rounded-md border bg-white px-3 py-2 font-mono text-caption',
								defaultKey.status === 'disabled'
									? 'border-dashed text-muted-foreground'
									: 'text-foreground',
							)}
						>
							{apiKeyMaskedPreview(defaultKey)}
						</code>
						<div className="flex shrink-0 flex-wrap gap-2">
							<Button
								type="button"
								size="sm"
								variant="outline"
								onClick={() =>
									handleCopy(
										defaultKey.id,
										defaultKey.fullKey ?? defaultKey.prefix,
									)
								}
							>
								{copiedId === defaultKey.id ? (
									<Check className="mr-1 h-3.5 w-3.5" aria-hidden />
								) : (
									<Copy className="mr-1 h-3.5 w-3.5" aria-hidden />
								)}
								Copy key
							</Button>
							<Button
								type="button"
								size="sm"
								variant="outline"
								onClick={() => handleToggleStatus(defaultKey.id)}
							>
								{defaultKey.status === 'active' ? 'Disable' : 'Enable'}
							</Button>
						</div>
					</div>
					</div>
				</section>
			)}

			{defaultKey ? <Separator className="w-full shrink-0" decorative /> : null}

			<section
				aria-labelledby="custom-api-keys-heading"
				className={cn(
					'space-y-4 px-6 pb-6',
					defaultKey ? 'pt-6' : 'pt-0',
				)}
			>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="min-w-0 space-y-1">
						<h3 id="custom-api-keys-heading" className="text-base font-semibold text-foreground">
							Custom API keys
						</h3>
						<p className="w-[620px] text-body-sm text-muted-foreground">
							Create dedicated keys for production apps, staging environments,
							services, or team-specific access.
						</p>
					</div>
					{!isCreating && !justCreatedKey && (
						<Button
							size="sm"
							variant="default"
							className="shrink-0 self-start"
							onClick={() => setIsCreating(true)}
						>
							<Plus className="mr-1 h-icon-16 w-icon-16" aria-hidden /> Create new key
						</Button>
					)}
				</div>

				{isCreating ? (
					<div className="space-y-3 rounded-lg border border-dashed border-primary/30 p-4">
						<label htmlFor={keyNameId} className="text-body-sm-strong">
							Key name
						</label>
						<Input
							id={keyNameId}
							placeholder="e.g. Backend Service, Analytics Pipeline"
							value={newKeyName}
							onChange={(e) => setNewKeyName(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
							autoFocus
						/>
						<p className="text-caption text-muted-foreground">
							This name will appear in usage reports to help you identify traffic
							sources.
						</p>
						<div className="flex justify-end gap-2">
							<Button
								size="sm"
								variant="ghost"
								onClick={() => {
									setIsCreating(false)
									setNewKeyName('')
								}}
							>
								Cancel
							</Button>
							<Button size="sm" onClick={handleCreate} disabled={!newKeyName.trim()}>
								Generate Key
							</Button>
						</div>
					</div>
				) : null}

				{justCreatedKey && (
					<div className="relative space-y-3 rounded-lg border border-warning/30 bg-warning/4 p-3">
						<Button
							size="sm"
							variant="ghost"
							className="absolute right-2 top-2 h-6 w-6 p-0 text-hierarchy-secondary hover:text-foreground"
							onClick={() => setJustCreatedKey(null)}
						>
							<X className="h-3.5 w-3.5" aria-hidden />
						</Button>
						<p className="pr-8 text-body-sm-strong text-warning">
							New API key created
						</p>
						<p className="text-body-sm text-hierarchy-secondary">
							Copy this key now. For security, it will not be shown again after you
							dismiss this message.
						</p>
						<div className="flex items-center gap-2">
							<code className="min-w-0 flex-1 select-all break-all rounded border border-border bg-white px-3 py-2 font-mono text-caption text-foreground">
								{justCreatedKey}
							</code>
							<Button
								size="sm"
								variant="outline"
								className="shrink-0"
								onClick={() => handleCopy('new', justCreatedKey)}
							>
								{copiedId === 'new' ? (
									<Check className="mr-1 h-3.5 w-3.5" aria-hidden />
								) : (
									<Copy className="mr-1 h-3.5 w-3.5" aria-hidden />
								)}
								Copy key
							</Button>
						</div>
						<p className="text-caption text-hierarchy-secondary">
							Store this key somewhere safe. To create another key, dismiss this
							message first.
						</p>
					</div>
				)}

				{activeCustomKeys.length > 0 && (
					<div>
						<p className="mb-2 text-caption font-medium text-muted-foreground">
							Active keys ({activeCustomKeys.length})
						</p>
						<div className="overflow-hidden rounded-lg border">
							<Table className="table-fixed">
								<TableHeader>
									<TableRow>
										<TableHead className={apiKeysTableCol.name}>Name</TableHead>
										<TableHead className={apiKeysTableCol.key}>Key</TableHead>
										<TableHead className={apiKeysTableCol.created}>Created</TableHead>
										<TableHead className={apiKeysTableCol.lastUsed}>
											Last used
										</TableHead>
										<TableHead className={apiKeysTableCol.actions}>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{activeCustomKeys.map((k) => (
										<TableRow key={k.id}>
											<TableCell className={apiKeysTableCol.name}>
												<div className="flex items-center gap-2">
													<span className="text-body-sm-strong">{k.name}</span>
													<Badge variant="success" className="text-[10px]">
														active
													</Badge>
												</div>
											</TableCell>
											<TableCell className={apiKeysTableCol.key}>
												<code className="block truncate font-mono text-caption text-muted-foreground">
													{apiKeyMaskedPreview(k)}
												</code>
											</TableCell>
											<TableCell
												className={cn(
													'text-caption text-muted-foreground',
													apiKeysTableCol.created,
												)}
											>
												{k.createdAt}
											</TableCell>
											<TableCell
												className={cn(
													'text-caption text-muted-foreground',
													apiKeysTableCol.lastUsed,
												)}
											>
												{k.lastUsed || 'Never'}
											</TableCell>
											<TableCell className={apiKeysTableCol.actions}>
												<Button
													type="button"
													size="sm"
													variant="outline"
													className="h-7 px-3 text-xs"
													onClick={() => handleToggleStatus(k.id)}
												>
													Disable
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}

				{disabledCustomKeys.length > 0 && (
					<div>
						<p className="mb-2 text-caption font-medium text-muted-foreground">
							Disabled keys ({disabledCustomKeys.length})
						</p>
						<div className="overflow-hidden rounded-lg border border-dashed">
							<Table className="table-fixed">
								<TableHeader>
									<TableRow>
										<TableHead className={apiKeysTableCol.name}>Name</TableHead>
										<TableHead className={apiKeysTableCol.key}>Key</TableHead>
										<TableHead className={apiKeysTableCol.created}>Created</TableHead>
										<TableHead className={apiKeysTableCol.lastUsed}>
											Last used
										</TableHead>
										<TableHead className={apiKeysTableCol.actions}>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{disabledCustomKeys.map((k) => (
										<TableRow key={k.id}>
											<TableCell className={apiKeysTableCol.name}>
												<div className="flex items-center gap-2">
													<span className="text-body-sm">{k.name}</span>
													<Badge
														variant="outline"
														className="border-muted-foreground/30 text-[10px] text-muted-foreground"
													>
														disabled
													</Badge>
												</div>
											</TableCell>
											<TableCell className={apiKeysTableCol.key}>
												<code className="block truncate font-mono text-caption text-muted-foreground">
													{apiKeyMaskedPreview(k)}
												</code>
											</TableCell>
											<TableCell
												className={cn(
													'text-caption text-muted-foreground',
													apiKeysTableCol.created,
												)}
											>
												{k.createdAt}
											</TableCell>
											<TableCell
												className={cn(
													'text-caption text-muted-foreground',
													apiKeysTableCol.lastUsed,
												)}
											>
												{k.lastUsed || 'Never'}
											</TableCell>
											<TableCell className={apiKeysTableCol.actions}>
												<Button
													type="button"
													size="sm"
													variant="outline"
													className="h-7 px-3 text-xs"
													onClick={() => handleToggleStatus(k.id)}
												>
													Enable
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}
			</section>
		</div>
	)
}
