import {
	Check,
	Copy,
	ExternalLink,
	Key,
	MoreHorizontal,
	Plus,
	Trash2,
	X,
} from 'lucide-react'
import { useId, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
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

interface ApiKey {
	id: string
	name: string
	prefix: string
	createdAt: string
	lastUsed: string | null
	status: 'active' | 'disabled'
}

interface ApiKeysPanelProps {
	spaceName: string
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
			prefix: `${fullKey.slice(0, 6)}...${fullKey.slice(-4)}`,
			createdAt: new Date().toISOString().split('T')[0],
			lastUsed: null,
			status: 'active',
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

	const handleDelete = (id: string) => {
		setKeys((prev) => prev.filter((k) => k.id !== id))
		toast.success('Key deleted')
	}

	const handleCopy = (id: string, text: string) => {
		navigator.clipboard.writeText(text)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 2000)
	}

	const activeKeys = keys.filter((k) => k.status === 'active')
	const disabledKeys = keys.filter((k) => k.status === 'disabled')

	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<h2 className="flex items-center gap-2 text-h3 text-foreground">
					<Key className="h-icon-20 w-icon-20 text-primary" aria-hidden />
					API Keys
				</h2>
				<p className="text-body-sm text-muted-foreground">
					Manage API keys for{' '}
					<span className="font-semibold text-foreground">{spaceName}</span>.
					Keys are scoped to the endpoint and apply to all models within it.{' '}
					<a
						href="https://docs.booster.cloud/api-keys"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-primary hover:underline"
					>
						<ExternalLink className="h-3 w-3" /> Learn how to use API keys
					</a>
				</p>
			</div>

			{justCreatedKey && (
				<div className="relative space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
					<Button
						size="sm"
						variant="ghost"
						className="absolute right-2 top-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
						onClick={() => setJustCreatedKey(null)}
					>
						<X className="h-3.5 w-3.5" />
					</Button>
					<p className="text-body-sm-strong text-primary">
						New key created - copy it now
					</p>
					<div className="flex items-center gap-2">
						<code className="flex-1 select-all break-all rounded bg-muted px-3 py-2 font-mono text-caption">
							{justCreatedKey}
						</code>
						<Button
							size="sm"
							variant="outline"
							className="shrink-0"
							onClick={() => handleCopy('new', justCreatedKey)}
						>
							{copiedId === 'new' ? (
								<Check className="h-3.5 w-3.5" />
							) : (
								<Copy className="h-3.5 w-3.5" />
							)}
						</Button>
					</div>
					<p className="text-caption text-muted-foreground">
						This key will not be shown again after you dismiss this banner.
					</p>
				</div>
			)}

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
			) : (
				<Button
					size="sm"
					variant="outline"
					onClick={() => setIsCreating(true)}
					className="w-full border-dashed"
				>
					<Plus className="mr-1 h-icon-16 w-icon-16" /> Create New Key
				</Button>
			)}

			{activeKeys.length > 0 && (
				<div>
					<p className="mb-2 text-caption font-medium text-muted-foreground">
						Active keys ({activeKeys.length})
					</p>
					<div className="overflow-hidden rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Key</TableHead>
									<TableHead>Created</TableHead>
									<TableHead>Last used</TableHead>
									<TableHead className="w-10"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{activeKeys.map((k) => (
									<TableRow key={k.id}>
										<TableCell>
											<div className="flex items-center gap-2">
												<span className="text-body-sm-strong">{k.name}</span>
												<Badge variant="success" className="text-[10px]">
													active
												</Badge>
											</div>
										</TableCell>
										<TableCell>
											<code className="font-mono text-caption text-muted-foreground">
												{k.prefix}
											</code>
										</TableCell>
										<TableCell className="text-caption text-muted-foreground">
											{k.createdAt}
										</TableCell>
										<TableCell className="text-caption text-muted-foreground">
											{k.lastUsed || 'Never'}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button size="sm" variant="ghost" className="h-7 w-7 p-0">
														<MoreHorizontal className="h-3.5 w-3.5" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => handleToggleStatus(k.id)}
													>
														<Key className="mr-2 h-4 w-4" /> Disable
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-destructive focus:text-destructive"
														onClick={() => handleDelete(k.id)}
													>
														<Trash2 className="mr-2 h-4 w-4" /> Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			)}

			{disabledKeys.length > 0 && (
				<div>
					<p className="mb-2 text-caption font-medium text-muted-foreground">
						Disabled keys ({disabledKeys.length})
					</p>
					<div className="overflow-hidden rounded-lg border border-dashed">
						<Table>
							<TableBody>
								{disabledKeys.map((k) => (
									<TableRow key={k.id} className="opacity-50">
										<TableCell>
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
										<TableCell className="font-mono text-caption text-muted-foreground">
											{k.prefix}
										</TableCell>
										<TableCell className="text-caption text-muted-foreground">
											{k.createdAt}
										</TableCell>
										<TableCell>
											<Button
												size="sm"
												variant="ghost"
												className="h-7 px-2 text-xs"
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
		</div>
	)
}
