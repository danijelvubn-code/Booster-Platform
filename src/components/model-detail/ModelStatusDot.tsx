import {
	getModelStatusDotClassName,
	type ModelLifecycleStatus,
} from '@/lib/model-lifecycle'
import { cn } from '@/lib/utils'

interface ModelStatusDotProps {
	status: ModelLifecycleStatus
	className?: string
	variant?: 'inline' | 'avatar'
}

export function ModelStatusDot({
	status,
	className,
	variant = 'inline',
}: ModelStatusDotProps) {
	if (variant === 'avatar') {
		return (
			<span
				className={cn(
					'absolute bottom-0 right-0 rounded-full bg-card p-1 ring-2 ring-card',
					className,
				)}
				aria-label={`Status: ${status}`}
			>
				<span
					className={cn(
						'block size-[10px] rounded-full',
						getModelStatusDotClassName(status),
					)}
					aria-hidden
				/>
			</span>
		)
	}

	return (
		<span
			className={cn(
				'size-2 shrink-0 rounded-full',
				getModelStatusDotClassName(status),
				className,
			)}
			aria-label={`Status: ${status}`}
		/>
	)
}
