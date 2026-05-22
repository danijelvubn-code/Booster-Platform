import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import { ModelCosmosCard } from '@/components/ModelCosmosCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet } from '@/components/ui/sheet'
import { toast } from '@/components/ui/sonner'
import type { Model } from '@/data/mockData'
import { canCreateInferenceEndpoint } from '@/lib/model-lifecycle'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 16

export type EndpointModelSelectSheetProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	models: Model[]
	/** Highlight this model when the sheet opens (e.g. current model when swapping). */
	initialSelectedModelId?: string | null
	onConfirm: (modelId: string) => void
}

export function EndpointModelSelectSheet({
	open,
	onOpenChange,
	models,
	initialSelectedModelId = null,
	onConfirm,
}: EndpointModelSelectSheetProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [page, setPage] = useState(1)
	const [pendingId, setPendingId] = useState<string | null>(null)

	useEffect(() => {
		if (!open) return
		const seed =
			initialSelectedModelId &&
			models.some((m) => m.id === initialSelectedModelId)
				? initialSelectedModelId
				: null
		setPendingId(seed)
		setPage(1)
		setSearchQuery('')
	}, [open, initialSelectedModelId, models])

	const filtered = useMemo(() => {
		const q = searchQuery.trim().toLowerCase()
		if (!q) return models
		return models.filter(
			(m) =>
				m.name.toLowerCase().includes(q) ||
				m.provider.toLowerCase().includes(q) ||
				m.domain.toLowerCase().includes(q),
		)
	}, [models, searchQuery])

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
	const safePage = Math.min(Math.max(1, page), totalPages)
	const pageSlice = filtered.slice(
		(safePage - 1) * PAGE_SIZE,
		safePage * PAGE_SIZE,
	)

	useEffect(() => {
		if (page > totalPages) setPage(totalPages)
	}, [page, totalPages])

	const pendingModel = pendingId
		? models.find((model) => model.id === pendingId)
		: null
	const canConfirmSelection = Boolean(
		pendingModel && canCreateInferenceEndpoint(pendingModel),
	)

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<AppSideSheetContent
				title="Select Model"
				description="Search and choose a model to attach to this inference endpoint."
				toolbarClassName="px-6 py-3"
				toolbar={
					<div className="relative">
						<Search
							className="pointer-events-none absolute left-3 top-1/2 h-icon-16 w-icon-16 -translate-y-1/2 text-muted-foreground"
							aria-hidden
						/>
						<Input
							type="search"
							placeholder="Search models…"
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setPage(1)
							}}
							className="h-control-md pl-9"
							autoComplete="off"
							aria-label="Search models"
						/>
					</div>
				}
				bottomAccessory={
					<div className="flex flex-wrap items-center justify-between gap-3">
						<span className="text-caption text-muted-foreground">
							{filtered.length === 0
								? 'No models match your search.'
								: `${filtered.length} model${filtered.length === 1 ? '' : 's'} · Page ${safePage} of ${totalPages}`}
						</span>
						<div className="flex items-center gap-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								disabled={safePage <= 1}
								onClick={() => setPage((p) => Math.max(1, p - 1))}
							>
								Previous
							</Button>
							<Button
								type="button"
								variant="outline"
								size="sm"
								disabled={safePage >= totalPages}
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							>
								Next
							</Button>
						</div>
					</div>
				}
				footer={
					<div className="flex flex-col gap-3">
						{pendingModel && !canCreateInferenceEndpoint(pendingModel) ? (
							<p className="text-body-sm text-muted-foreground">
								{pendingModel.name} is deprecated and cannot be attached to a
								new inference endpoint. Choose an active model instead.
							</p>
						) : null}
						<div className="flex justify-end gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button
								type="button"
								disabled={!canConfirmSelection}
								onClick={() => {
									if (!pendingId || !pendingModel) return
									if (!canCreateInferenceEndpoint(pendingModel)) {
										toast.error('Deprecated model cannot be deployed', {
											description:
												'Choose an active or sunsetting model for new inference endpoints.',
										})
										return
									}
									onConfirm(pendingId)
								}}
							>
								Select Model
							</Button>
						</div>
					</div>
				}
				bodyClassName="gap-3 py-4 pr-4 pl-6"
			>
				{pageSlice.map((model) => (
					<div
						key={model.id}
						role="button"
						tabIndex={0}
						onClick={() => setPendingId(model.id)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								setPendingId(model.id)
							}
						}}
						className={cn(
							'rounded-lg outline-none',
							'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
							pendingId === model.id &&
								'ring-2 ring-primary ring-offset-2 ring-offset-background',
						)}
					>
						<ModelCosmosCard
							model={model}
							variant="basic"
							className={cn(
								'h-auto min-h-0 w-full cursor-pointer',
								pendingId === model.id && 'border-primary',
							)}
						/>
					</div>
				))}
			</AppSideSheetContent>
		</Sheet>
	)
}
