import * as SliderPrimitive from '@radix-ui/react-slider'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const sliderRootVariants = cva('group relative flex touch-none select-none', {
	variants: {
		orientation: {
			/** Default: full-width horizontal track. */
			horizontal: 'w-full items-center',
			/** Stack thumbs vertically; give the root a height (e.g. `h-full` in a fixed-height parent). */
			vertical: 'h-full w-auto flex-col items-center justify-center',
		},
		size: {
			/** Default track and thumb for forms and primary surfaces. */
			regular: '',
			/** Narrower track and smaller thumb for sidebars, dense filters, and toolbars. */
			dense: '',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'regular',
	},
})

const sliderTrackVariants = cva(
	'relative grow overflow-hidden rounded-full bg-secondary',
	{
		variants: {
			orientation: {
				horizontal: '',
				vertical: '',
			},
			size: {
				regular: '',
				dense: '',
			},
		},
		compoundVariants: [
			{ orientation: 'horizontal', size: 'regular', class: 'h-2 w-full' },
			{ orientation: 'horizontal', size: 'dense', class: 'h-1.5 w-full' },
			{ orientation: 'vertical', size: 'regular', class: 'h-full w-2' },
			{ orientation: 'vertical', size: 'dense', class: 'h-full w-1.5' },
		],
		defaultVariants: {
			orientation: 'horizontal',
			size: 'regular',
		},
	},
)

const sliderRangeVariants = cva(
	'absolute bg-primary group-data-[disabled]:bg-primary/50',
	{
		variants: {
			orientation: {
				horizontal: 'h-full',
				vertical: 'w-full',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	},
)

const sliderThumbVariants = cva(
	'block shrink-0 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none group-data-[disabled]:border-primary/50',
	{
		variants: {
			size: {
				regular: 'h-icon-20 w-icon-20',
				dense: 'h-icon-16 w-icon-16',
			},
		},
		defaultVariants: {
			size: 'regular',
		},
	},
)

const MAX_STEP_MARKS = 24

function thumbCountFromProps(value?: number[], defaultValue?: number[]) {
	if (value !== undefined) {
		return Array.isArray(value) ? value.length : 1
	}
	if (defaultValue !== undefined) {
		return Array.isArray(defaultValue) ? defaultValue.length : 1
	}
	return 1
}

/** Values along [min, max] at each `step` increment (inclusive), with float-safe rounding. */
function enumerateStepValues(min: number, max: number, step: number): number[] {
	if (max < min || step <= 0) return [min, max]
	const out: number[] = []
	const n = Math.floor((max - min) / step + 1e-9)
	for (let i = 0; i <= n; i++) {
		const raw = min + i * step
		const v = Math.min(raw, max)
		out.push(Math.round(v * 1e6) / 1e6)
	}
	const last = out[out.length - 1]
	if (last !== undefined && last < max - 1e-9) {
		out.push(max)
	}
	return out
}

function limitMarkCount(values: number[], max: number): number[] {
	if (values.length <= max) return values
	const stride = Math.ceil(values.length / max)
	const out: number[] = []
	for (let i = 0; i < values.length; i += stride) {
		out.push(values[i])
	}
	const lastIn = values[values.length - 1]
	const lastOut = out[out.length - 1]
	if (lastIn !== undefined && lastOut !== lastIn) {
		out.push(lastIn)
	}
	return out.slice(0, max)
}

/** Whether value `m` lies on the primary-filled segment (single thumb: min→value; range: low→high). */
function markIsOnFilledRange(
	m: number,
	min: number,
	sliderValues: number[],
): boolean {
	if (sliderValues.length === 0) return false
	if (sliderValues.length === 1) {
		const t = sliderValues[0] ?? min
		return m >= min - 1e-6 && m <= t + 1e-6
	}
	const lo = Math.min(sliderValues[0], sliderValues[1])
	const hi = Math.max(sliderValues[0], sliderValues[1])
	return m >= lo - 1e-6 && m <= hi + 1e-6
}

/** 4×4px dots (`h-1` / `w-1` → --space-4): white on primary fill, primary @ 50% on secondary track. */
function SliderStepMarksInTrack({
	min,
	max,
	values,
	sliderValues,
}: {
	min: number
	max: number
	values: number[]
	sliderValues: number[]
}) {
	const span = max - min || 1
	return (
		<div className="pointer-events-none absolute inset-0" aria-hidden="true">
			{values.map((v) => {
				const pct = ((v - min) / span) * 100
				const onFill = markIsOnFilledRange(v, min, sliderValues)
				return (
					<span
						key={`${v}`}
						className={cn(
							'pointer-events-none absolute top-1/2 z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full',
							onFill ? 'bg-primary-foreground' : 'bg-primary/50',
						)}
						style={{ left: `${pct}%` }}
					/>
				)
			})}
		</div>
	)
}

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
	VariantProps<typeof sliderRootVariants> & {
		/** Renders circular step dots inside the track (horizontal only). Uses `marks` or enumerates `min`–`max` by `step`. */
		showStepMarks?: boolean
		/** Draw ticks only at these values (sorted, clamped to [min, max]). Overrides step enumeration. */
		marks?: number[]
	}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	SliderProps
>(
	(
		{
			className,
			value,
			defaultValue,
			orientation = 'horizontal',
			size = 'regular',
			min = 0,
			max = 100,
			step = 1,
			showStepMarks = false,
			marks: marksProp,
			onValueChange,
			...props
		},
		ref,
	) => {
		const thumbCount = thumbCountFromProps(value, defaultValue)

		/** Keeps step-dot fill colors in sync when the slider is uncontrolled (Radix value lives internally). */
		const [liveValue, setLiveValue] = React.useState<number[] | undefined>(
			undefined,
		)

		const markValues = React.useMemo(() => {
			if (!showStepMarks || orientation !== 'horizontal') return []
			let raw: number[]
			if (marksProp !== undefined && marksProp.length > 0) {
				raw = [...marksProp]
					.filter((m) => m >= min - 1e-9 && m <= max + 1e-9)
					.sort((a, b) => a - b)
			} else {
				raw = enumerateStepValues(min, max, step)
			}
			return limitMarkCount(raw, MAX_STEP_MARKS)
		}, [showStepMarks, orientation, marksProp, min, max, step])

		const showMarksInTrack =
			showStepMarks && orientation === 'horizontal' && markValues.length > 0

		const sliderValuesForMarks = React.useMemo((): number[] => {
			if (value !== undefined) return value
			if (liveValue !== undefined) return liveValue
			if (defaultValue !== undefined) return defaultValue
			return [min]
		}, [value, liveValue, defaultValue, min])

		return (
			<SliderPrimitive.Root
				ref={ref}
				className={cn(sliderRootVariants({ orientation, size }), className)}
				value={value}
				defaultValue={defaultValue}
				orientation={orientation}
				min={min}
				max={max}
				step={step}
				onValueChange={(v) => {
					if (value === undefined) {
						setLiveValue(v)
					}
					onValueChange?.(v)
				}}
				{...props}
			>
				<SliderPrimitive.Track
					className={sliderTrackVariants({ orientation, size })}
				>
					<SliderPrimitive.Range
						className={cn('z-0', sliderRangeVariants({ orientation }))}
					/>
					{showMarksInTrack ? (
						<SliderStepMarksInTrack
							min={min}
							max={max}
							values={markValues}
							sliderValues={sliderValuesForMarks}
						/>
					) : null}
				</SliderPrimitive.Track>
				{Array.from({ length: thumbCount }, (_, i) => `thumb-${i}`).map(
					(thumbKey) => (
						<SliderPrimitive.Thumb
							key={thumbKey}
							className={sliderThumbVariants({ size })}
						/>
					),
				)}
			</SliderPrimitive.Root>
		)
	},
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
export type { SliderProps }
