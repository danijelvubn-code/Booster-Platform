import {
	ChevronDown,
	Image as ImageIcon,
	Mic,
	SlidersHorizontal,
	Type,
	Video,
	X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverMenuFooter,
	PopoverMenuList,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Sheet } from '@/components/ui/sheet'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { models } from '@/data/mockData'
import type { CapabilityCategoryId } from '@/lib/catalog-filter-meta'
import {
	allProviderOptions,
	BOOSTER_POWERED_PROVIDER,
	defaultFilters,
	type ModelFilterState,
	providerOptionCounts,
	visibleAccessFormats,
	visibleApiCapabilities,
	visibleBaseModels,
	visibleDataTypes,
	visibleFeatures,
	visibleLicenses,
	visibleModalities,
	visibleQuantizations,
} from '@/lib/model-catalog-filters'
import { cn } from '@/lib/utils'

const API_LEGACY = new Set(['Chat Completions Legacy'])

/** Toolbar filter popover panels — fixed width 320px. */
const FILTER_POPOVER_WIDTH = 'w-[320px] max-w-[320px]'

/** Checkbox option rows — muted hover reads clearly on `bg-popover`. */
const FILTER_POPOVER_CHECKBOX_ROW_CLASS =
	'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ease-standard hover:bg-muted focus-within:bg-muted active:bg-muted/80'

function sortApiCapabilities(opts: string[]) {
	return [...opts].sort((a, b) => {
		const la = API_LEGACY.has(a) ? 1 : 0
		const lb = API_LEGACY.has(b) ? 1 : 0
		if (la !== lb) return la - lb
		return a.localeCompare(b)
	})
}

function modalityIcon(id: string) {
	switch (id) {
		case 'text':
			return Type
		case 'image':
			return ImageIcon
		case 'audio':
			return Mic
		case 'video':
			return Video
		default:
			return Type
	}
}

function modalityLabel(id: string) {
	return id.slice(0, 1).toUpperCase() + id.slice(1)
}

function toggleList(list: string[], item: string) {
	return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

function FilterPopoverClearFooter({
	disabled,
	label,
	onClear,
}: {
	disabled: boolean
	label: string
	onClear: () => void
}) {
	return (
		<PopoverMenuFooter>
			<Button
				type="button"
				variant="outline"
				size="sm"
				className="w-full"
				disabled={disabled}
				onClick={onClear}
			>
				{label}
			</Button>
		</PopoverMenuFooter>
	)
}

type ModelCosmosFilterBarProps = {
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
	className?: string
}

const PRICE_LABELS: Record<ModelFilterState['pricePreset'], string> = {
	any: 'Price',
	lower: 'Lower cost',
	mid: 'Mid cost',
	higher: 'Higher cost',
}

export function ModelCosmosFilterBar({
	catalog,
	filters,
	onFiltersChange,
	className,
}: ModelCosmosFilterBarProps) {
	const [providerSearch, setProviderSearch] = useState('')
	const [moreOpen, setMoreOpen] = useState(false)

	const providerCounts = useMemo(() => providerOptionCounts(catalog), [catalog])
	const providerOptions = useMemo(() => allProviderOptions(catalog), [catalog])
	const modalityOptions = useMemo(() => visibleModalities(catalog), [catalog])
	const apiOptions = useMemo(
		() => sortApiCapabilities(visibleApiCapabilities(catalog)),
		[catalog],
	)
	const featureOptions = useMemo(() => visibleFeatures(catalog), [catalog])
	const licenseOptions = useMemo(() => visibleLicenses(catalog), [catalog])
	const dataTypeOpts = useMemo(() => visibleDataTypes(catalog), [catalog])
	const formatOpts = useMemo(() => visibleAccessFormats(catalog), [catalog])
	const quantOpts = useMemo(() => visibleQuantizations(catalog), [catalog])
	const baseOpts = useMemo(() => visibleBaseModels(catalog), [catalog])

	const filteredProviders = useMemo(() => {
		const q = providerSearch.trim().toLowerCase()
		if (!q) return providerOptions
		return providerOptions.filter((p) => p.toLowerCase().includes(q))
	}, [providerOptions, providerSearch])

	const showProviderSearch = providerOptions.length > 9

	const capabilityLabel =
		filters.capabilityScore === 'any'
			? 'Capability score'
			: `${filters.capabilityScore}+`

	const chipGroups = useMemo(() => {
		type Chip = { key: string; label: string; onRemove: () => void }
		const out: Chip[] = []
		for (const h of filters.hosting) {
			out.push({
				key: `hosting-${h}`,
				label: `Hosting: ${h}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						hosting: filters.hosting.filter((x) => x !== h),
					}),
			})
		}
		for (const p of filters.providers) {
			out.push({
				key: `provider-${p}`,
				label: p,
				onRemove: () =>
					onFiltersChange({
						...filters,
						providers: filters.providers.filter((x) => x !== p),
					}),
			})
		}
		if (filters.capabilityScore !== 'any') {
			out.push({
				key: 'cap-score',
				label: `Capability score: ${filters.capabilityScore}+`,
				onRemove: () => onFiltersChange({ ...filters, capabilityScore: 'any' }),
			})
		}
		for (const m of filters.modalities) {
			out.push({
				key: `mod-${m}`,
				label: `Modality: ${modalityLabel(m)}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						modalities: filters.modalities.filter((x) => x !== m),
					}),
			})
		}
		for (const a of filters.apiCapabilities) {
			out.push({
				key: `api-${a}`,
				label: `API: ${a}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						apiCapabilities: filters.apiCapabilities.filter((x) => x !== a),
					}),
			})
		}
		for (const f of filters.features) {
			out.push({
				key: `feat-${f}`,
				label: `Feature: ${f}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						features: filters.features.filter((x) => x !== f),
					}),
			})
		}
		if (filters.pricePreset !== 'any') {
			out.push({
				key: 'price',
				label: `Price: ${PRICE_LABELS[filters.pricePreset]}`,
				onRemove: () => onFiltersChange({ ...filters, pricePreset: 'any' }),
			})
		}
		if (
			filters.capabilityCategory !== '' &&
			filters.capabilityCategoryMin !== '0'
		) {
			out.push({
				key: 'cat-min',
				label: `${filters.capabilityCategory}: ${filters.capabilityCategoryMin}+`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						capabilityCategory: '',
						capabilityCategoryMin: '0',
					}),
			})
		}
		if (filters.contextWindow !== 'any') {
			out.push({
				key: 'ctx',
				label: `Context: ${filters.contextWindow}+`,
				onRemove: () => onFiltersChange({ ...filters, contextWindow: 'any' }),
			})
		}
		if (filters.modelSize !== 'any') {
			const sizeLabel =
				filters.modelSize === 'lt10'
					? 'Under 10B'
					: filters.modelSize === 'b10_50'
						? '10B–50B'
						: filters.modelSize === 'b50_100'
							? '50B–100B'
							: '100B+'
			out.push({
				key: 'size',
				label: `Model size: ${sizeLabel}`,
				onRemove: () => onFiltersChange({ ...filters, modelSize: 'any' }),
			})
		}
		if (filters.minMemory !== 'any') {
			out.push({
				key: 'mem',
				label: `Memory: ${filters.minMemory}`,
				onRemove: () => onFiltersChange({ ...filters, minMemory: 'any' }),
			})
		}
		for (const lic of filters.licenses) {
			out.push({
				key: `lic-${lic}`,
				label: `License: ${lic}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						licenses: filters.licenses.filter((x) => x !== lic),
					}),
			})
		}
		for (const d of filters.dataTypes) {
			out.push({
				key: `dt-${d}`,
				label: `Data type: ${d}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						dataTypes: filters.dataTypes.filter((x) => x !== d),
					}),
			})
		}
		for (const f of filters.accessFormats) {
			out.push({
				key: `fmt-${f}`,
				label: `Access: ${f}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						accessFormats: filters.accessFormats.filter((x) => x !== f),
					}),
			})
		}
		for (const q of filters.quantizations) {
			out.push({
				key: `q-${q}`,
				label: `Quantization: ${q}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						quantizations: filters.quantizations.filter((x) => x !== q),
					}),
			})
		}
		for (const o of filters.origins) {
			out.push({
				key: `or-${o}`,
				label: `Origin: ${o}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						origins: filters.origins.filter((x) => x !== o),
					}),
			})
		}
		for (const b of filters.baseModels) {
			out.push({
				key: `base-${b}`,
				label: `Base: ${b}`,
				onRemove: () =>
					onFiltersChange({
						...filters,
						baseModels: filters.baseModels.filter((x) => x !== b),
					}),
			})
		}
		return out
	}, [filters, onFiltersChange])

	const hasChips = chipGroups.length > 0

	const filterButtonClass = (active: boolean) =>
		cn(
			'gap-1 rounded-md border border-input bg-card px-2.5 text-body-sm font-medium shadow-xs transition-colors ease-standard hover:border-ring',
			active &&
				'border-primary/60 bg-primary/5 hover:border-primary hover:bg-primary/10',
		)

	return (
		<div className={cn('flex min-w-0 flex-col gap-3', className)}>
			<div className="flex min-w-0 flex-wrap items-center gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.providers.length > 0)}
						>
							Provider
							{filters.providers.length > 0 ? (
								<Badge variant="secondary" className="ml-0.5 px-1.5">
									{filters.providers.length}
								</Badge>
							) : null}
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Provider</p>
							{showProviderSearch ? (
								<Input
									placeholder="Search providers…"
									value={providerSearch}
									onChange={(e) => setProviderSearch(e.target.value)}
									className="mt-2 h-8"
								/>
							) : null}
						</div>
						<ScrollArea className="h-72">
							<div className="space-y-1 p-2">
								{filteredProviders.map((p) => (
									<label
										key={p}
										className={FILTER_POPOVER_CHECKBOX_ROW_CLASS}
									>
										<Checkbox
											checked={filters.providers.includes(p)}
											onCheckedChange={() =>
												onFiltersChange({
													...filters,
													providers: toggleList(filters.providers, p),
												})
											}
										/>
										<span className="flex-1 truncate text-body-sm">
											{p === BOOSTER_POWERED_PROVIDER ? 'Booster Powered' : p}
										</span>
										<span className="text-caption text-muted-foreground">
											{providerCounts.get(p) ?? 0}
										</span>
									</label>
								))}
							</div>
						</ScrollArea>
						<FilterPopoverClearFooter
							disabled={filters.providers.length === 0}
							label="Clear providers"
							onClear={() => {
								setProviderSearch('')
								onFiltersChange({ ...filters, providers: [] })
							}}
						/>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.capabilityScore !== 'any')}
						>
							<span>{capabilityLabel}</span>
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Capability score</p>
							<p className="mt-1 text-caption text-muted-foreground">
								Aggregated performance score based on supported capability
								categories, benchmarks, and weighting. This is a platform
								evaluation, not an absolute quality ranking. Overall score
								threshold (Booster evaluation).
							</p>
						</div>
						<PopoverMenuList>
							{(
								[
									['any', 'Any score'],
									['90', '90+'],
									['80', '80+'],
									['70', '70+'],
									['60', '60+'],
								] as const
							).map(([value, label]) => (
								<button
									key={value}
									type="button"
									className={cn(
										'w-full rounded-md px-2 py-1.5 text-left text-body-sm hover:bg-accent',
										filters.capabilityScore === value && 'bg-accent',
									)}
									onClick={() =>
										onFiltersChange({
											...filters,
											capabilityScore: value,
										})
									}
								>
									{label}
								</button>
							))}
						</PopoverMenuList>
						<FilterPopoverClearFooter
							disabled={filters.capabilityScore === 'any'}
							label="Clear capability score"
							onClear={() =>
								onFiltersChange({ ...filters, capabilityScore: 'any' })
							}
						/>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.modalities.length > 0)}
						>
							Modality
							{filters.modalities.length > 0 ? (
								<Badge variant="secondary" className="ml-0.5 px-1.5">
									{filters.modalities.length}
								</Badge>
							) : null}
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Modality</p>
							<p className="mt-1 text-caption text-muted-foreground">
								Filter models by supported input and output types. Match any
								selected modality.
							</p>
						</div>
						<div className="p-3">
							<div className="flex flex-wrap gap-2">
								{modalityOptions.map((id) => {
									const Icon = modalityIcon(id)
									const on = filters.modalities.includes(id)
									return (
										<button
											key={id}
											type="button"
											onClick={() => {
												onFiltersChange({
													...filters,
													modalities: toggleList(filters.modalities, id),
												})
											}}
											className={cn(
												'flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-body-sm transition-colors',
												on
													? 'border-primary/60 bg-primary/10'
													: 'hover:bg-accent',
											)}
										>
											<Icon className="h-icon-16 w-icon-16" aria-hidden />
											{modalityLabel(id)}
										</button>
									)
								})}
							</div>
						</div>
						<FilterPopoverClearFooter
							disabled={filters.modalities.length === 0}
							label="Clear modalities"
							onClear={() => onFiltersChange({ ...filters, modalities: [] })}
						/>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.apiCapabilities.length > 0)}
						>
							<span>Supported APIs</span>
							{filters.apiCapabilities.length > 0 ? (
								<Badge variant="secondary" className="ml-0.5 px-1.5">
									{filters.apiCapabilities.length}
								</Badge>
							) : null}
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Supported APIs</p>
							<p className="mt-1 text-caption text-muted-foreground">
								Filter models by supported API endpoint types. Multiple
								selections require a model to support all selected endpoints.
								Match all selected (AND).
							</p>
						</div>
						<ScrollArea className="h-64">
							<div className="space-y-1 p-2">
								{apiOptions.map((a) => (
									<label
										key={a}
										className={cn(
											FILTER_POPOVER_CHECKBOX_ROW_CLASS,
											API_LEGACY.has(a) && 'opacity-80',
										)}
									>
										<Checkbox
											checked={filters.apiCapabilities.includes(a)}
											onCheckedChange={() =>
												onFiltersChange({
													...filters,
													apiCapabilities: toggleList(
														filters.apiCapabilities,
														a,
													),
												})
											}
										/>
										<span className="text-body-sm">{a}</span>
									</label>
								))}
							</div>
						</ScrollArea>
						<FilterPopoverClearFooter
							disabled={filters.apiCapabilities.length === 0}
							label="Clear API selections"
							onClear={() =>
								onFiltersChange({ ...filters, apiCapabilities: [] })
							}
						/>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.features.length > 0)}
						>
							Features
							{filters.features.length > 0 ? (
								<Badge variant="secondary" className="ml-0.5 px-1.5">
									{filters.features.length}
								</Badge>
							) : null}
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Features</p>
							<p className="mt-1 text-caption text-muted-foreground">
								Match all selected (AND).
							</p>
						</div>
						<ScrollArea className="h-64">
							<div className="space-y-1 p-2">
								{featureOptions.map((f) => (
									<label key={f} className={FILTER_POPOVER_CHECKBOX_ROW_CLASS}>
										<Checkbox
											checked={filters.features.includes(f)}
											onCheckedChange={() =>
												onFiltersChange({
													...filters,
													features: toggleList(filters.features, f),
												})
											}
										/>
										<span className="flex flex-1 items-center gap-1 text-body-sm">
											{f}
											{f === 'Reasoning' ? (
												<Tooltip>
													<TooltipTrigger asChild>
														<button
															type="button"
															className="text-caption text-muted-foreground"
															aria-label="About Reasoning feature"
														>
															ⓘ
														</button>
													</TooltipTrigger>
													<TooltipContent className="max-w-xs">
														Supports reasoning-oriented behavior or reasoning
														mode where available.
													</TooltipContent>
												</Tooltip>
											) : null}
										</span>
									</label>
								))}
							</div>
						</ScrollArea>
						<FilterPopoverClearFooter
							disabled={filters.features.length === 0}
							label="Clear feature selections"
							onClear={() => onFiltersChange({ ...filters, features: [] })}
						/>
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className={filterButtonClass(filters.pricePreset !== 'any')}
						>
							<span>{PRICE_LABELS[filters.pricePreset]}</span>
							<ChevronDown className="h-icon-16 w-icon-16 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(FILTER_POPOVER_WIDTH, 'p-0')}
						align="start"
					>
						<div className="border-b border-border p-3">
							<p className="text-body-sm font-medium">Price</p>
							<p className="mt-1 text-caption text-muted-foreground">
								Token pricing shown per 1M input tokens (preset buckets). Actual
								cost depends on usage.
							</p>
						</div>
						<PopoverMenuList>
							{(
								[
									['any', 'Any price'],
									['lower', 'Lower cost'],
									['mid', 'Mid cost'],
									['higher', 'Higher cost'],
								] as const
							).map(([value, label]) => (
								<button
									key={value}
									type="button"
									className={cn(
										'w-full rounded-md px-2 py-1.5 text-left text-body-sm hover:bg-accent',
										filters.pricePreset === value && 'bg-accent',
									)}
									onClick={() =>
										onFiltersChange({
											...filters,
											pricePreset: value,
										})
									}
								>
									{label}
								</button>
							))}
						</PopoverMenuList>
						<FilterPopoverClearFooter
							disabled={filters.pricePreset === 'any'}
							label="Clear price filter"
							onClear={() =>
								onFiltersChange({ ...filters, pricePreset: 'any' })
							}
						/>
					</PopoverContent>
				</Popover>

				<Button
					type="button"
					variant="outline"
					size="sm"
					className="gap-1"
					onClick={() => setMoreOpen(true)}
				>
					<SlidersHorizontal className="h-icon-16 w-icon-16" />
					More filters
				</Button>
			</div>

			{hasChips ? (
				<div className="flex min-w-0 flex-wrap items-center gap-2">
					{chipGroups.map((c) => (
						<span
							key={c.key}
							className={cn(
								badgeVariants({
									variant: 'secondary',
									appearance: 'pill',
									size: '24',
								}),
								'max-w-full min-w-0 pr-1 font-normal',
							)}
						>
							<span className="min-w-0 max-w-[240px] truncate">
								{c.label}
							</span>
							<button
								type="button"
								className="inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-background/80"
								onClick={c.onRemove}
								aria-label={`Remove ${c.label}`}
							>
								<X className="h-3 w-3" aria-hidden />
							</button>
						</span>
					))}
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="shrink-0 text-muted-foreground"
						onClick={() => onFiltersChange({ ...defaultFilters })}
					>
						Clear all
					</Button>
				</div>
			) : null}

			<Sheet open={moreOpen} onOpenChange={setMoreOpen}>
				<AppSideSheetContent
					title="More filters"
					description="Additional filters for performance, cost, licensing, and technical options in Model Cosmos."
					maxWidth="sheet"
				>
					<div className="space-y-8">
							<section className="space-y-3">
								<h3 className="text-body-sm font-semibold">Performance</h3>
								<div className="space-y-2">
									<div>
										<Label>Capability category</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Filter by category-level performance scores instead of the
											overall capability score.
										</p>
									</div>
									<Select
										value={filters.capabilityCategory || 'none'}
										onValueChange={(v) =>
											onFiltersChange({
												...filters,
												capabilityCategory:
													v === 'none' ? '' : (v as CapabilityCategoryId),
												capabilityCategoryMin:
													v === 'none' ? '0' : filters.capabilityCategoryMin,
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Any category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">Any category</SelectItem>
											<SelectItem value="Agents">Agents</SelectItem>
											<SelectItem value="Coding">Coding</SelectItem>
											<SelectItem value="General">General</SelectItem>
											<SelectItem value="Scientific Reasoning">
												Scientific Reasoning
											</SelectItem>
										</SelectContent>
									</Select>
									{filters.capabilityCategory !== '' ? (
										<Select
											value={filters.capabilityCategoryMin}
											onValueChange={(v) =>
												onFiltersChange({
													...filters,
													capabilityCategoryMin:
														v as ModelFilterState['capabilityCategoryMin'],
												})
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Minimum score" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">Any</SelectItem>
												<SelectItem value="70">70+</SelectItem>
												<SelectItem value="80">80+</SelectItem>
												<SelectItem value="90">90+</SelectItem>
											</SelectContent>
										</Select>
									) : null}
								</div>
								<div className="space-y-2">
									<div>
										<Label>Context window</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Maximum amount of text the model can process in one
											request, measured in tokens.
										</p>
									</div>
									<Select
										value={filters.contextWindow}
										onValueChange={(v) =>
											onFiltersChange({
												...filters,
												contextWindow: v as ModelFilterState['contextWindow'],
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="any">Any context window</SelectItem>
											<SelectItem value="32k">32K+</SelectItem>
											<SelectItem value="64k">64K+</SelectItem>
											<SelectItem value="128k">128K+</SelectItem>
											<SelectItem value="256k">256K+</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</section>
							<Separator />
							<section className="space-y-3">
								<h3 className="text-body-sm font-semibold">
									Cost &amp; requirements
								</h3>
								<div className="space-y-2">
									<div>
										<Label>Model size</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Approximate model size based on number of parameters.
											Larger models are not always better for every use case.
										</p>
									</div>
									<Select
										value={filters.modelSize}
										onValueChange={(v) =>
											onFiltersChange({
												...filters,
												modelSize: v as ModelFilterState['modelSize'],
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="any">Any size</SelectItem>
											<SelectItem value="lt10">Under 10B</SelectItem>
											<SelectItem value="b10_50">10B–50B</SelectItem>
											<SelectItem value="b50_100">50B–100B</SelectItem>
											<SelectItem value="b100p">100B+</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</section>
							<Separator />
							<section className="space-y-3">
								<h3 className="text-body-sm font-semibold">
									Provider &amp; licensing
								</h3>
								<div className="space-y-2">
									<div>
										<Label>License</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Filter models by available usage or licensing category.
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{licenseOptions.map((lic) => (
											<label
												key={lic}
												className="flex items-center gap-2 rounded-md border border-border px-2 py-1"
											>
												<Checkbox
													checked={filters.licenses.includes(lic)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															licenses: toggleList(filters.licenses, lic),
														})
													}
												/>
												{lic}
											</label>
										))}
									</div>
								</div>
								{baseOpts.length > 0 ? (
									<div className="space-y-2">
										<div>
											<Label>Base model</Label>
											<p className="mt-1 text-caption text-muted-foreground">
												Underlying model family or parent model, when available.
											</p>
										</div>
										<div className="max-h-40 overflow-y-auto rounded-md border border-border p-2">
											{baseOpts.map((b) => (
												<label key={b} className="flex items-center gap-2 py-1">
													<Checkbox
														checked={filters.baseModels.includes(b)}
														onCheckedChange={() =>
															onFiltersChange({
																...filters,
																baseModels: toggleList(filters.baseModels, b),
															})
														}
													/>
													{b}
												</label>
											))}
										</div>
									</div>
								) : null}
							</section>
							<Separator />
							<section className="space-y-3">
								<h3 className="text-body-sm font-semibold">Technical</h3>
								<div className="space-y-2">
									<div>
										<Label>Data type</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Numerical format used by the model or serving
											configuration.
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{dataTypeOpts.map((d) => (
											<label
												key={d}
												className="flex items-center gap-2 rounded-md border border-border px-2 py-1"
											>
												<Checkbox
													checked={filters.dataTypes.includes(d)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															dataTypes: toggleList(filters.dataTypes, d),
														})
													}
												/>
												{d}
											</label>
										))}
									</div>
								</div>
								<div className="space-y-2">
									<div>
										<Label>Access format</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Shows how the model is made available, such as API-based
											or managed access.
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{formatOpts.map((f) => (
											<label
												key={f}
												className="flex items-center gap-2 rounded-md border border-border px-2 py-1"
											>
												<Checkbox
													checked={filters.accessFormats.includes(f)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															accessFormats: toggleList(
																filters.accessFormats,
																f,
															),
														})
													}
												/>
												{f}
											</label>
										))}
									</div>
								</div>
								<div className="space-y-2">
									<div>
										<Label>Quantization</Label>
										<p className="mt-1 text-caption text-muted-foreground">
											Model compression method that can reduce memory or compute
											requirements.
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{quantOpts.map((q) => (
											<label
												key={q}
												className="flex items-center gap-2 rounded-md border border-border px-2 py-1"
											>
												<Checkbox
													checked={filters.quantizations.includes(q)}
													onCheckedChange={() =>
														onFiltersChange({
															...filters,
															quantizations: toggleList(
																filters.quantizations,
																q,
															),
														})
													}
												/>
												{q}
											</label>
										))}
									</div>
								</div>
							</section>
						</div>
				</AppSideSheetContent>
			</Sheet>
		</div>
	)
}
