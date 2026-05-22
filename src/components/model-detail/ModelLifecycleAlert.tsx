import { Link } from '@tanstack/react-router'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { models } from '@/data/mockData'
import type { ModelRecord } from '@/lib/model-metrics'
import {
	getModelLifecycleAlert,
	getSuggestedSuccessorModel,
} from '@/lib/model-lifecycle'

interface ModelLifecycleAlertProps {
	model: ModelRecord
	className?: string
}

export function ModelLifecycleAlert({
	model,
	className,
}: ModelLifecycleAlertProps) {
	const alert = getModelLifecycleAlert(model)
	if (!alert) return null

	const successor = getSuggestedSuccessorModel(model, models)

	return (
		<Alert
			variant={alert.variant}
			density="compact"
			className={className}
			actions={
				successor ? (
					<Button asChild variant="outline" size="sm">
						<Link
							to="/app/cosmos/$modelId"
							params={{ modelId: successor.id }}
							search={{ returnTo: '/app/cosmos', returnLabel: 'Cosmos' }}
						>
							View similar models
						</Link>
					</Button>
				) : undefined
			}
		>
			<AlertTitle>{alert.title}</AlertTitle>
			<AlertDescription>{alert.description}</AlertDescription>
		</Alert>
	)
}
