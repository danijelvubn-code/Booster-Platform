import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sheet } from '@/components/ui/sheet'
import { AppSideSheetContent } from '@/components/layout/AppSideSheet'
import { Button } from '@/components/ui/button'
import { MoreFiltersBaseModelSection } from '@/components/model-cosmos/filters/MoreFiltersBaseModelSection'
import {
	MORE_FILTERS_CONTEXT_OPTIONS,
	MORE_FILTERS_MODEL_SIZE_OPTIONS,
} from '@/components/model-cosmos/filters/more-filters-options'
import {
	FilterLabelWithInfo,
	MoreFiltersCheckboxGroup,
	MoreFiltersChoiceChips,
} from '@/components/model-cosmos/filters/more-filters-shared'
import type { models } from '@/data/mockData'
import type { ModelFilterState } from '@/lib/model-catalog-filters'
import {
	defaultFilters,
	toggleStringList,
	visibleAccessFormats,
	visibleDataTypes,
	visibleLicenses,
	visibleQuantizations,
} from '@/lib/model-catalog-filters'

function MoreFiltersSection({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) {
	return (
		<section className="space-y-4">
			<h3 className="text-body-sm-strong text-foreground">{title}</h3>
			{children}
		</section>
	)
}

export function MoreFiltersSheet({
	open,
	onOpenChange,
	catalog,
	filters,
	onFiltersChange,
	shownModelCount,
	baseModelPickerOpen,
	onBaseModelPickerOpenChange,
	baseModelPickerQuery,
	onBaseModelPickerQueryChange,
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	catalog: typeof models
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
	shownModelCount: number
	baseModelPickerOpen: boolean
	onBaseModelPickerOpenChange: (open: boolean) => void
	baseModelPickerQuery: string
	onBaseModelPickerQueryChange: (q: string) => void
}) {
	const licenseOptions = useMemo(() => visibleLicenses(catalog), [catalog])
	const dataTypeOpts = useMemo(() => visibleDataTypes(catalog), [catalog])
	const formatOpts = useMemo(() => visibleAccessFormats(catalog), [catalog])
	const quantOpts = useMemo(() => visibleQuantizations(catalog), [catalog])

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<AppSideSheetContent
				title="More filters"
				description="Additional filters for performance, cost, licensing, and technical options in Model Cosmos."
				maxWidth="sheet"
				bottomAccessory={
					<div className="flex items-center justify-between gap-3">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="text-muted-foreground"
							onClick={() => {
								onBaseModelPickerQueryChange('')
								onBaseModelPickerOpenChange(false)
								onFiltersChange({ ...defaultFilters })
							}}
						>
							Clear all
						</Button>
						<Button
							type="button"
							size="sm"
							onClick={() => onOpenChange(false)}
						>
							Show {shownModelCount} models
						</Button>
					</div>
				}
			>
				<div className="space-y-8">
					<MoreFiltersSection title="Performance">
						<div className="space-y-2">
							<Label>Context window</Label>
							<MoreFiltersChoiceChips
								aria-label="Context window"
								options={MORE_FILTERS_CONTEXT_OPTIONS}
								value={filters.contextWindow}
								onSelect={(v) =>
									onFiltersChange({
										...filters,
										contextWindow: v,
									})
								}
							/>
						</div>
					</MoreFiltersSection>
					<Separator />
					<MoreFiltersSection title="Cost & requirements">
						<div className="space-y-2">
							<Label>Model size</Label>
							<MoreFiltersChoiceChips
								aria-label="Model size"
								options={MORE_FILTERS_MODEL_SIZE_OPTIONS}
								value={filters.modelSize}
								onSelect={(v) =>
									onFiltersChange({
										...filters,
										modelSize: v,
									})
								}
							/>
						</div>
					</MoreFiltersSection>
					<Separator />
					<MoreFiltersSection title="Provider & licensing">
						<div className="space-y-2">
							<Label>License</Label>
							<MoreFiltersCheckboxGroup
								aria-label="License"
								options={licenseOptions}
								selected={filters.licenses}
								onToggle={(lic) =>
									onFiltersChange({
										...filters,
										licenses: toggleStringList(filters.licenses, lic),
									})
								}
							/>
						</div>
						<MoreFiltersBaseModelSection
							catalog={catalog}
							filters={filters}
							onFiltersChange={onFiltersChange}
							baseModelPickerOpen={baseModelPickerOpen}
							onBaseModelPickerOpenChange={onBaseModelPickerOpenChange}
							baseModelPickerQuery={baseModelPickerQuery}
							onBaseModelPickerQueryChange={onBaseModelPickerQueryChange}
						/>
					</MoreFiltersSection>
					<Separator />
					<MoreFiltersSection title="Technical">
						<div className="space-y-2">
							<FilterLabelWithInfo info="Numerical format used by the model or serving configuration.">
								Data type
							</FilterLabelWithInfo>
							<MoreFiltersCheckboxGroup
								aria-label="Data type"
								options={dataTypeOpts}
								selected={filters.dataTypes}
								onToggle={(d) =>
									onFiltersChange({
										...filters,
										dataTypes: toggleStringList(filters.dataTypes, d),
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<FilterLabelWithInfo info="Shows how the model is made available, such as API-based or managed access.">
								Access format
							</FilterLabelWithInfo>
							<MoreFiltersCheckboxGroup
								aria-label="Access format"
								options={formatOpts}
								selected={filters.accessFormats}
								onToggle={(f) =>
									onFiltersChange({
										...filters,
										accessFormats: toggleStringList(
											filters.accessFormats,
											f,
										),
									})
								}
							/>
						</div>
						<div className="space-y-2">
							<FilterLabelWithInfo info="Model compression method that can reduce memory or compute requirements.">
								Quantization
							</FilterLabelWithInfo>
							<MoreFiltersCheckboxGroup
								aria-label="Quantization"
								options={quantOpts}
								selected={filters.quantizations}
								onToggle={(q) =>
									onFiltersChange({
										...filters,
										quantizations: toggleStringList(
											filters.quantizations,
											q,
										),
									})
								}
							/>
						</div>
					</MoreFiltersSection>
				</div>
			</AppSideSheetContent>
		</Sheet>
	)
}
