import { Search, SlidersHorizontal } from 'lucide-react'
import { useRef } from 'react'

import { MODEL_COSMOS_RESULTS_REGION_ID } from '@/components/model-cosmos/model-cosmos-results-region'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	MODEL_SORT_LABELS,
	type ModelSortId,
} from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

interface ModelCosmosSearchBarProps {
	search: string
	setSearch: (search: string) => void
	showFilters: boolean
	setShowFilters: (show: boolean) => void
	hasActiveFilters: boolean
	sort: ModelSortId
	onSortChange: (sort: ModelSortId) => void
	/** Total models after search + filters + sort (for range text). */
	totalResults: number
	page: number
	pageSize: number
	className?: string
}

export function ModelCosmosSearchBar({
	search,
	setSearch,
	showFilters,
	setShowFilters,
	hasActiveFilters,
	sort,
	onSortChange,
	totalResults,
	page,
	pageSize,
	className,
}: ModelCosmosSearchBarProps) {
	const sortCommittedRef = useRef(false)
	const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
	const safePage = Math.min(page, totalPages)
	const pageStart = (safePage - 1) * pageSize

	return (
		<div
			className={cn(
				'flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
				className,
			)}
		>
			<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
				<div className="min-w-0 w-full max-w-md flex-1">
					<InputField
						placeholder="Search models…"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onClear={() => setSearch('')}
						clearLabel="Clear search"
						leadingIcon={<Search aria-hidden />}
						rootClassName="bg-card"
					/>
				</div>
				<Button
					type="button"
					variant={showFilters ? 'default' : 'outline'}
					size="icon"
					onClick={() => setShowFilters(!showFilters)}
					className="relative shrink-0 focus-visible:ring-inset focus-visible:ring-offset-0"
					aria-label={showFilters ? 'Hide filters' : 'Show filters'}
					aria-expanded={showFilters}
				>
					<SlidersHorizontal className="h-icon-16 w-icon-16" aria-hidden />
					{hasActiveFilters ? (
						<span
							className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[10px] font-semibold leading-none text-success-foreground ring-2 ring-background"
							aria-hidden
						>
							✓
						</span>
					) : null}
				</Button>
			</div>
			<div className="flex min-w-0 shrink-0 flex-nowrap items-center justify-end gap-x-3 overflow-x-auto px-1 py-1 sm:ml-auto">
				{totalResults > 0 ? (
					<span className="text-caption shrink-0 text-muted-foreground whitespace-nowrap text-right">
						Showing {pageStart + 1}–
						{Math.min(pageStart + pageSize, totalResults)} of {totalResults}
					</span>
				) : null}
				<Select
					value={sort}
					onValueChange={(v) => {
						sortCommittedRef.current = true
						onSortChange(v as ModelSortId)
					}}
				>
					<SelectTrigger className="h-control-md w-[240px] shrink-0 bg-card focus:ring-inset focus:ring-offset-0 focus-visible:ring-inset focus-visible:ring-offset-0">
						<SelectValue placeholder="Sort by…">
							Sort by: {MODEL_SORT_LABELS[sort]}
						</SelectValue>
					</SelectTrigger>
					<SelectContent
						onCloseAutoFocus={(e) => {
							if (!sortCommittedRef.current) return
							sortCommittedRef.current = false
							e.preventDefault()
							queueMicrotask(() => {
								document
									.getElementById(MODEL_COSMOS_RESULTS_REGION_ID)
									?.focus({ preventScroll: true })
							})
						}}
					>
						{(Object.keys(MODEL_SORT_LABELS) as ModelSortId[]).map((k) => (
							<SelectItem key={k} value={k}>
								{MODEL_SORT_LABELS[k]}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
