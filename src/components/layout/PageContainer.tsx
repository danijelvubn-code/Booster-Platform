import { cn } from '@/lib/utils'

interface PageContainerProps {
	children: React.ReactNode
	gap?: string
	className?: string
}

export function PageContainer({
	children,
	gap = 'gap-6',
	className,
}: PageContainerProps) {
	return (
		<div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-background">
			<div className={cn('container flex flex-col py-8', gap, className)}>
				{children}
			</div>
		</div>
	)
}
