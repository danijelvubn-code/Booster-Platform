import {
	ArrowDownUp,
	ChevronDown,
	Search,
	SlidersHorizontal,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useCaseCategories } from '@/data/mockData'

const COSMOS_SORT_OPTIONS = [
	{ value: 'best-match', label: 'Best match' },
	{ value: 'benchmark-desc', label: 'Highest benchmark score' },
	{ value: 'efficiency-desc', label: 'Highest efficiency' },
	{ value: 'cost-asc', label: 'Lowest cost' },
	{ value: 'speed-desc', label: 'Fastest' },
	{ value: 'context-desc', label: 'Largest context window' },
	{ value: 'name-asc', label: 'Alphabetical' },
] as const

export type CosmosSortOption = (typeof COSMOS_SORT_OPTIONS)[number]['value']

function CosmosSortDropdown({
	sortOption,
	onSortChange,
	align,
}: {
	sortOption: CosmosSortOption
	onSortChange: (v: CosmosSortOption) => void
	align: 'start' | 'end'
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="shrink-0"
					aria-label="Sort models"
				>
					<ArrowDownUp className="h-icon-16 w-icon-16" aria-hidden />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align={align} className="w-64">
				<DropdownMenuLabel className="text-body-sm font-semibold text-foreground">
					Sort by
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup
					value={sortOption}
					onValueChange={(v) => onSortChange(v as CosmosSortOption)}
				>
					{COSMOS_SORT_OPTIONS.map((opt) => (
						<DropdownMenuRadioItem
							key={opt.value}
							value={opt.value}
							className="cursor-pointer"
						>
							{opt.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface ModelCosmosSearchBarProps {
	search: string
	setSearch: (search: string) => void
	showFilters: boolean
	setShowFilters: (show: boolean) => void
	sortOption: CosmosSortOption
	setSortOption: (option: CosmosSortOption) => void
	activeUseCases: string[]
	setActiveUseCases: React.Dispatch<React.SetStateAction<string[]>>
	hasActiveFilters: boolean
	quickFilterCount: number
}

export function ModelCosmosSearchBar({
	search,
	setSearch,
	showFilters,
	setShowFilters,
	sortOption,
	setSortOption,
	activeUseCases,
	setActiveUseCases,
	hasActiveFilters,
	quickFilterCount,
}: ModelCosmosSearchBarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
			{/* Search + filters (left) */}
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
				<CosmosSortDropdown
					sortOption={sortOption}
					onSortChange={setSortOption}
					align="start"
				/>
			</div>

			{/* Quick filter + guided (right) */}
			<div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="min-w-0 max-w-full justify-between gap-2 sm:max-w-xs"
						>
							<span className="flex min-w-0 items-center gap-2">
								<span className="truncate">Quick filter</span>
								{quickFilterCount > 0 ? (
									<Badge
										variant="secondary"
										appearance="pill"
										size="20"
										className="shrink-0 tabular-nums"
									>
										{quickFilterCount}
									</Badge>
								) : null}
							</span>
							<ChevronDown
								className="h-icon-16 w-icon-16 shrink-0 opacity-50"
								aria-hidden
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="flex max-h-components-dropdown w-80 flex-col overflow-hidden p-0"
					>
						<div className="shrink-0 space-y-1 border-b border-border px-3 py-2">
							<DropdownMenuLabel className="p-0 text-body-sm font-semibold text-foreground">
								Use case quick filters
							</DropdownMenuLabel>
							<p className="text-caption text-muted-foreground">
								{quickFilterCount === 0
									? 'Select one or more — models matching any selection are shown.'
									: `${quickFilterCount} selected — models matching any selected use case are shown.`}
							</p>
						</div>
						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1">
							{useCaseCategories.map((uc) => (
								<DropdownMenuCheckboxItem
									key={uc.label}
									className="cursor-pointer items-start py-2 pl-8 pr-3"
									checked={activeUseCases.includes(uc.label)}
									onCheckedChange={(checked) => {
										setActiveUseCases((prev) =>
											checked
												? prev.includes(uc.label)
													? prev
													: [...prev, uc.label]
												: prev.filter((l) => l !== uc.label),
										)
									}}
								>
									<div className="flex flex-col gap-0.5">
										<span className="text-body-sm font-medium">{uc.label}</span>
										<span className="text-caption font-normal text-muted-foreground">
											{uc.subtitle} — {uc.keywords.join(', ')}
										</span>
									</div>
								</DropdownMenuCheckboxItem>
							))}
						</div>
						<div className="shrink-0 border-t border-border bg-popover p-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="w-full"
								disabled={quickFilterCount === 0}
								onClick={() => setActiveUseCases([])}
							>
								Clear all quick filters
							</Button>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
