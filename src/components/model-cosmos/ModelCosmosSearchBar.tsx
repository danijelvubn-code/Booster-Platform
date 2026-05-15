import { Search, SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ModelCosmosSearchBarProps {
	search: string
	setSearch: (search: string) => void
	showFilters: boolean
	setShowFilters: (show: boolean) => void
	hasActiveFilters: boolean
}

export function ModelCosmosSearchBar({
	search,
	setSearch,
	showFilters,
	setShowFilters,
	hasActiveFilters,
}: ModelCosmosSearchBarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
			<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
				<div className="relative min-w-0 w-full max-w-md flex-1 sm:w-auto">
					<Search
						className="pointer-events-none absolute left-3 top-1/2 h-icon-16 w-icon-16 -translate-y-1/2 text-muted-foreground"
						aria-hidden
					/>
					<Input
						placeholder="Search models..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Button
					variant={showFilters ? 'default' : 'outline'}
					size="icon"
					onClick={() => setShowFilters(!showFilters)}
					className="relative shrink-0"
					aria-label={showFilters ? 'Hide filters' : 'Show filters'}
					aria-expanded={showFilters}
				>
					<SlidersHorizontal className="h-icon-16 w-icon-16" aria-hidden />
					{hasActiveFilters && (
						<span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px]">
							✓
						</span>
					)}
				</Button>
			</div>
		</div>
	)
}
