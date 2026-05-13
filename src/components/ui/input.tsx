import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, X } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const labelVariants = cva(
	'text-label text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-[var(--disabled-opacity)]',
)

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
))
Label.displayName = LabelPrimitive.Root.displayName

/** Standalone single-line input (full border). Prefer modular pieces below for addons. */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => (
		<input
			type={type}
			className={cn(
				'flex h-control-md w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm text-foreground ring-offset-background transition-colors ease-standard file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground placeholder:text-foreground/50 enabled:hover:border-ring read-only:hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground/50 read-only:cursor-default read-only:bg-muted',
				className,
			)}
			ref={ref}
			{...props}
		/>
	),
)
Input.displayName = 'Input'

const inputRootShellClass = cn(
	'group/input flex w-full items-stretch rounded-md border border-input bg-background text-foreground ring-offset-background transition-colors ease-standard',
	'hover:border-ring data-[field-disabled=true]:hover:border-input data-[field-readonly=true]:hover:border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
	'data-[invalid=true]:border-destructive data-[invalid=true]:focus-within:border-destructive data-[invalid=true]:focus-within:ring-destructive',
	'data-[success=true]:border-success/30 data-[success=true]:focus-within:border-success data-[success=true]:focus-within:ring-success/40',
	'data-[field-readonly=true]:focus-within:ring-0 data-[field-readonly=true]:focus-within:ring-offset-0 data-[field-readonly=true]:focus-within:border-input',
	'data-[field-readonly=true]:data-[invalid=true]:focus-within:border-destructive',
	'data-[field-readonly=true]:data-[success=true]:focus-within:border-success/30',
)

const inputRootSizeClass = {
	sm: 'h-control-sm text-caption [&_input]:text-caption [&_textarea]:text-caption',
	md: 'h-control-md text-body-sm [&_input]:text-body-sm [&_textarea]:text-body-sm',
	lg: 'h-control-lg text-body-sm [&_input]:text-body-sm [&_textarea]:text-body-sm',
} as const

export type InputRootSize = keyof typeof inputRootSizeClass

const InputRoot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		invalid?: boolean
		success?: boolean
		size?: InputRootSize
		/** When true, hover/focus shell affordances match a disabled field (no hover border). */
		fieldDisabled?: boolean
		/** When true, no hover border (read-only field). */
		fieldReadOnly?: boolean
	}
>(
	(
		{
			className,
			invalid,
			success,
			fieldDisabled,
			fieldReadOnly,
			size = 'md',
			...props
		},
		ref,
	) => (
		<div
			ref={ref}
			data-invalid={invalid ? 'true' : undefined}
			data-success={success ? 'true' : undefined}
			data-field-disabled={fieldDisabled ? 'true' : undefined}
			data-field-readonly={fieldReadOnly ? 'true' : undefined}
			className={cn(inputRootShellClass, inputRootSizeClass[size], className)}
			{...props}
		/>
	),
)
InputRoot.displayName = 'InputRoot'

/** Prefix zone: icon, plain text, protocol/unit, or embed Select/Dropdown (use compact trigger styles). */
const InputPrefixAddon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex shrink-0 items-center gap-2 self-stretch border-r border-border px-3 text-body-sm text-foreground/75 [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0',
			className,
		)}
		{...props}
	/>
))
InputPrefixAddon.displayName = 'InputPrefixAddon'

/** Middle zone: native input + optional lead/trail icons, clear, loading. */
const InputSegment = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex min-h-0 min-w-0 flex-1 items-center gap-2 self-stretch px-3',
			className,
		)}
		{...props}
	/>
))
InputSegment.displayName = 'InputSegment'

const InputLeadIcon = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn(
			'inline-flex shrink-0 text-foreground/50 [&_svg]:h-icon-16 [&_svg]:w-icon-16',
			className,
		)}
		{...props}
	/>
)
InputLeadIcon.displayName = 'InputLeadIcon'

const InputTrailIcon = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn(
			'inline-flex shrink-0 text-foreground/50 [&_svg]:h-icon-16 [&_svg]:w-icon-16',
			className,
		)}
		{...props}
	/>
)
InputTrailIcon.displayName = 'InputTrailIcon'

const InputLoadingIndicator = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn('inline-flex shrink-0 text-foreground/50', className)}
		{...props}
	>
		<Loader2 className="h-icon-16 w-icon-16 animate-spin" aria-hidden="true" />
		<span className="sr-only">Loading</span>
	</span>
)
InputLoadingIndicator.displayName = 'InputLoadingIndicator'

const InputControl = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<'input'>
>(({ className, disabled, readOnly, ...props }, ref) => (
	<input
		ref={ref}
		disabled={disabled}
		readOnly={readOnly}
		className={cn(
			'min-w-0 flex-1 bg-transparent py-2 text-body-sm text-foreground outline-none placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:text-foreground/50 read-only:cursor-default read-only:focus-visible:outline-none',
			className,
		)}
		{...props}
	/>
))
InputControl.displayName = 'InputControl'

type InputClearButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	'children'
> & {
	'aria-label': string
}

const InputClearButton = React.forwardRef<
	HTMLButtonElement,
	InputClearButtonProps
>(({ className, ...props }, ref) => (
	<Button
		ref={ref}
		type="button"
		variant="ghost"
		size="icon-sm"
		className={cn('-mr-1 shrink-0', className)}
		{...props}
	>
		<X className="h-icon-16 w-icon-16" aria-hidden="true" />
	</Button>
))
InputClearButton.displayName = 'InputClearButton'

/** Suffix zone: actions (copy, add, invite), units as text, badges, or icon buttons. */
const InputSuffixAddon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex shrink-0 items-center gap-2 self-stretch border-l border-border px-3 text-body-sm text-foreground/75 [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0',
			className,
		)}
		{...props}
	/>
))
InputSuffixAddon.displayName = 'InputSuffixAddon'

/** Optional plain text inside prefix/suffix (protocol, unit, currency label). */
function InputAddonText({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'whitespace-nowrap text-body-sm text-foreground/75',
				className,
			)}
			{...props}
		/>
	)
}
InputAddonText.displayName = 'InputAddonText'

type InputFieldProps = Omit<React.ComponentProps<'input'>, 'size'> & {
	label?: React.ReactNode
	required?: boolean
	helperText?: React.ReactNode
	errorMessage?: React.ReactNode
	/** @deprecated Use leadingIcon (inside input segment). */
	prefixIcon?: React.ReactNode
	/** @deprecated Use trailingIcon (inside input segment). */
	suffixIcon?: React.ReactNode
	leadingIcon?: React.ReactNode
	trailingIcon?: React.ReactNode
	/** Left addon (text, icon, select, dropdown trigger, etc.). */
	prefixAddon?: React.ReactNode
	/** Right addon (buttons, badge, unit label, etc.). */
	suffixAddon?: React.ReactNode
	/** @deprecated Use prefixAddon with InputAddonText or custom node. */
	prefixValue?: React.ReactNode
	/** @deprecated Use suffixAddon with InputAddonText or custom node. */
	suffixValue?: React.ReactNode
	/** @deprecated Use suffixAddon. */
	action?: React.ReactNode
	loading?: boolean
	onClear?: () => void
	clearLabel?: string
	containerClassName?: string
	rootClassName?: string
	inputClassName?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			id: idProp,
			label,
			required,
			helperText,
			errorMessage,
			prefixIcon,
			suffixIcon,
			leadingIcon,
			trailingIcon,
			prefixAddon,
			suffixAddon,
			prefixValue,
			suffixValue,
			action,
			loading,
			onClear,
			clearLabel = 'Clear',
			containerClassName,
			rootClassName,
			inputClassName,
			className,
			disabled,
			readOnly,
			value,
			defaultValue,
			onChange,
			'aria-invalid': ariaInvalid,
			...props
		},
		ref,
	) => {
		const autoId = React.useId()
		const id = idProp ?? `input-${autoId}`
		const isInvalid =
			ariaInvalid === true || ariaInvalid === 'true' || !!errorMessage

		const isControlled = value !== undefined
		const [uncontrolledValue, setUncontrolledValue] = React.useState(() => {
			if (defaultValue === undefined || defaultValue === null) return ''
			return String(defaultValue)
		})

		const localRef = React.useRef<HTMLInputElement | null>(null)
		React.useImperativeHandle(ref, () => localRef.current as HTMLInputElement)

		const valueString = isControlled ? String(value ?? '') : uncontrolledValue
		const showClear =
			!!onClear && valueString.length > 0 && !disabled && !readOnly && !loading

		const lead = leadingIcon ?? prefixIcon
		const trail = trailingIcon ?? suffixIcon

		const leftAddon =
			prefixAddon ??
			(prefixValue ? <InputAddonText>{prefixValue}</InputAddonText> : null)
		const rightAddon =
			suffixAddon ??
			(suffixValue ? <InputAddonText>{suffixValue}</InputAddonText> : null) ??
			action ??
			null

		const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
			if (!isControlled) setUncontrolledValue(e.target.value)
			onChange?.(e)
		}

		const handleClear = () => {
			onClear?.()
			if (!isControlled && localRef.current) {
				localRef.current.value = ''
				setUncontrolledValue('')
			}
			localRef.current?.focus()
		}

		return (
			<div className={cn('w-full space-y-1', className)}>
				{label !== undefined && (
					<div className="flex items-center justify-between">
						<Label
							htmlFor={id}
							className={cn(
								'inline-flex items-center gap-1',
								disabled && 'text-foreground/50',
							)}
						>
							{label}
							{required && (
								<>
									<span aria-hidden="true" className="text-destructive">
										*
									</span>
									<span className="sr-only">(required)</span>
								</>
							)}
						</Label>
					</div>
				)}

				<InputRoot
					invalid={isInvalid}
					fieldDisabled={disabled}
					fieldReadOnly={readOnly}
					className={cn(
						disabled && 'cursor-not-allowed bg-muted',
						readOnly && 'bg-muted',
						containerClassName,
						rootClassName,
					)}
				>
					{leftAddon && <InputPrefixAddon>{leftAddon}</InputPrefixAddon>}

					<InputSegment>
						{lead && <InputLeadIcon>{lead}</InputLeadIcon>}
						<InputControl
							id={id}
							ref={(node) => {
								localRef.current = node
							}}
							className={inputClassName}
							disabled={disabled}
							readOnly={readOnly}
							aria-invalid={isInvalid || undefined}
							value={isControlled ? value : undefined}
							defaultValue={isControlled ? undefined : defaultValue}
							onChange={handleChange}
							aria-busy={loading || undefined}
							{...props}
						/>
						{loading && <InputLoadingIndicator />}
						{showClear && (
							<InputClearButton aria-label={clearLabel} onClick={handleClear} />
						)}
						{trail && <InputTrailIcon>{trail}</InputTrailIcon>}
					</InputSegment>

					{rightAddon && <InputSuffixAddon>{rightAddon}</InputSuffixAddon>}
				</InputRoot>

				{isInvalid && errorMessage ? (
					<p className="text-caption text-destructive">{errorMessage}</p>
				) : helperText ? (
					<p className="text-caption text-foreground/75">{helperText}</p>
				) : null}
			</div>
		)
	},
)
InputField.displayName = 'InputField'

export {
	Label,
	Input,
	InputRoot,
	InputPrefixAddon,
	InputSegment,
	InputSuffixAddon,
	InputControl,
	InputLeadIcon,
	InputTrailIcon,
	InputClearButton,
	InputLoadingIndicator,
	InputAddonText,
	InputField,
}
