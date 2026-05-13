import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
	to: string
	label?: string
	icon?: boolean
}

export function BackButton({
	to,
	label = 'Back',
	icon = true,
}: BackButtonProps) {
	return (
		<Button
			asChild
			variant="ghost"
			size="sm"
			className="-ml-3 h-auto px-3 py-2 text-body-sm text-muted-foreground hover:text-foreground"
		>
			<Link to={to}>
				{icon && <ArrowLeft className="mr-2 h-4 w-4 shrink-0" aria-hidden />}
				{label}
			</Link>
		</Button>
	)
}
