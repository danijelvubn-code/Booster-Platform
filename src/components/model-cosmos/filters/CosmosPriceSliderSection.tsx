import { useEffect, useState } from 'react'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import type {
	CatalogPriceSliderBoundsEUR,
	ModelFilterState,
} from '@/lib/model-catalog-filters'
import { formatEurPer1MForDisplay } from '@/lib/model-metrics'

function cosmosPriceEuroChip(amount: number) {
	return `€${formatEurPer1MForDisplay(amount)}`
}

/** Label shown above the slider thumb while dragging (matches applied filter rounding / no-limit band). */
function priceSliderDraggingLabel(
	rawThumb: number,
	min: number,
	ceiling: number,
	step: number,
): string {
	if (rawThumb >= ceiling - step / 2) return 'No limit'
	const invStep = 1 / step
	const clamped = Math.min(Math.max(rawThumb, min), ceiling)
	const snapped = Math.round(clamped * invStep) / invStep
	return `${cosmosPriceEuroChip(snapped)} / 1M`
}

export function CosmosPriceSliderSection({
	filters,
	onFiltersChange,
	bounds,
	kind,
	accordionItemValue,
}: {
	filters: ModelFilterState
	onFiltersChange: (next: ModelFilterState) => void
	bounds: CatalogPriceSliderBoundsEUR
	kind: 'input' | 'output'
	accordionItemValue: string
}) {
	const axis = kind === 'input' ? bounds.input : bounds.output
	const { min, ceiling } = axis
	const step = bounds.step
	const maxCap =
		kind === 'input' ? filters.priceInputMaxPer1M : filters.priceOutputMaxPer1M
	const thumbValue = maxCap ?? ceiling

	const [sliderDragging, setSliderDragging] = useState(false)
	const [dragThumbPreview, setDragThumbPreview] = useState(thumbValue)

	useEffect(() => {
		if (!sliderDragging) return
		const endDrag = () => setSliderDragging(false)
		window.addEventListener('pointerup', endDrag)
		window.addEventListener('pointercancel', endDrag)
		return () => {
			window.removeEventListener('pointerup', endDrag)
			window.removeEventListener('pointercancel', endDrag)
		}
	}, [sliderDragging])

	useEffect(() => {
		if (!sliderDragging) setDragThumbPreview(thumbValue)
	}, [thumbValue, sliderDragging])

	const title =
		kind === 'input'
			? 'Input cost per 1M tokens'
			: 'Output cost per 1M tokens'

	const setCap = (v: number | null) => {
		if (kind === 'input')
			onFiltersChange({ ...filters, priceInputMaxPer1M: v })
		else onFiltersChange({ ...filters, priceOutputMaxPer1M: v })
	}

	const onSlide = (vals: number[]) => {
		const raw = vals[0] ?? ceiling
		setDragThumbPreview(raw)
		if (raw >= ceiling - step / 2) {
			setCap(null)
			return
		}
		const invStep = 1 / step
		const clamped = Math.min(Math.max(raw, min), ceiling)
		const snapped = Math.round(clamped * invStep) / invStep
		setCap(snapped)
	}

	const span = ceiling - min
	const thumbPct =
		span > 1e-9
			? ((Math.min(Math.max(dragThumbPreview, min), ceiling) - min) / span) * 100
			: 0

	return (
		<AccordionItem
			value={accordionItemValue}
			className="border-0 border-b border-border last:border-b-0"
		>
			<AccordionTrigger className="px-3 py-3 text-body-sm font-medium text-foreground hover:no-underline [&>svg]:text-muted-foreground">
				{title}
			</AccordionTrigger>
			<AccordionContent className="text-foreground">
				<div
					className="space-y-2 px-3 pb-3 pt-0"
					data-accordion-prevent-toggle
				>
					<p className="text-caption leading-snug text-muted-foreground">
						{maxCap == null
							? 'No limit — move the handle left to exclude more expensive models.'
							: `Showing models up to ${cosmosPriceEuroChip(maxCap)} / 1M (EUR); higher prices are excluded.`}
					</p>
					<div
						className="relative pb-0.5"
						onPointerDownCapture={() => {
							setSliderDragging(true)
							setDragThumbPreview(thumbValue)
						}}
					>
						{sliderDragging ? (
							<div
								className="pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 -translate-x-1/2"
								style={{ left: `${thumbPct}%` }}
								aria-hidden
							>
								<span className="whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-caption font-medium tabular-nums text-popover-foreground shadow-md">
									{priceSliderDraggingLabel(
										dragThumbPreview,
										min,
										ceiling,
										step,
									)}
								</span>
							</div>
						) : null}
						<Slider
							size="dense"
							min={min}
							max={ceiling}
							step={step}
							value={[thumbValue]}
							onValueChange={onSlide}
							aria-label={`${title} (EUR per 1M)`}
						/>
					</div>
					<div className="flex justify-between gap-2 text-caption text-muted-foreground">
						<span>{cosmosPriceEuroChip(min)}</span>
						<span>{cosmosPriceEuroChip(ceiling)}</span>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
