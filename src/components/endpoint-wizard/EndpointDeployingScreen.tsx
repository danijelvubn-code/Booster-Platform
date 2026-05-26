import { AlertCircle, Rocket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { IconBox } from '@/components/ui/icon-box'
import { Progress } from '@/components/ui/progress'
import type { DeployFailureDetails } from '@/lib/endpoint-deploy'

const DEPLOY_MESSAGES = [
	'Validating endpoint configuration…',
	'Provisioning compute resources…',
	'Loading model weights…',
	'Configuring networking and API routes…',
	'Running health checks…',
	'Finalizing deployment…',
] as const

const FAIL_AT_PROGRESS = 72

export function getRandomDeployDurationMs() {
	return 5000 + Math.random() * 5000
}

type EndpointDeployingScreenProps = {
	endpointName: string
	modelName: string
	durationMs: number
	shouldFail?: boolean
	failureDetails?: DeployFailureDetails
	onComplete: () => void
	onFailure?: () => void
	onRetry: () => void
	onBackToReview: () => void
	onChooseModel: () => void
}

export function EndpointDeployingScreen({
	endpointName,
	modelName,
	durationMs,
	shouldFail = false,
	failureDetails,
	onComplete,
	onFailure,
	onRetry,
	onBackToReview,
	onChooseModel,
}: EndpointDeployingScreenProps) {
	const [phase, setPhase] = useState<'running' | 'failed'>('running')
	const [progress, setProgress] = useState(0)
	const [messageIndex, setMessageIndex] = useState(0)
	const onCompleteRef = useRef(onComplete)
	const onFailureRef = useRef(onFailure)
	const hasSignaledFailureRef = useRef(false)

	onCompleteRef.current = onComplete
	onFailureRef.current = onFailure

	useEffect(() => {
		if (phase === 'failed') return

		const startedAt = performance.now()
		const tick = window.setInterval(() => {
			const elapsed = performance.now() - startedAt
			const pct = Math.min(100, (elapsed / durationMs) * 100)
			const nextMessageIndex = Math.min(
				DEPLOY_MESSAGES.length - 1,
				Math.floor((pct / 100) * DEPLOY_MESSAGES.length),
			)

			if (shouldFail && pct >= FAIL_AT_PROGRESS) {
				window.clearInterval(tick)
				setProgress(FAIL_AT_PROGRESS)
				setMessageIndex(4)
				setPhase('failed')
				if (!hasSignaledFailureRef.current) {
					hasSignaledFailureRef.current = true
					onFailureRef.current?.()
				}
				return
			}

			setProgress(pct)
			setMessageIndex(nextMessageIndex)

			if (elapsed >= durationMs) {
				window.clearInterval(tick)
				setProgress(100)
				setMessageIndex(DEPLOY_MESSAGES.length - 1)
				onCompleteRef.current()
			}
		}, 50)

		return () => window.clearInterval(tick)
	}, [durationMs, phase, shouldFail])

	const activeMessage =
		phase === 'failed'
			? (failureDetails?.failedStep ?? DEPLOY_MESSAGES[messageIndex])
			: DEPLOY_MESSAGES[messageIndex]

	if (phase === 'failed') {
		return (
			<div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 bg-gradient-to-b from-destructive/8 via-transparent to-transparent"
				/>

				<div className="relative flex max-w-lg flex-col items-center gap-4">
					<IconBox
						size="xxxlg"
						shape="circle"
						className="bg-destructive/12"
					>
						<AlertCircle className="text-destructive" aria-hidden />
					</IconBox>

					<div className="space-y-1">
						<h2 className="text-h3 text-foreground">Deployment failed</h2>
						<p className="text-body-sm text-muted-foreground">
							We couldn&apos;t finish setting up{' '}
							<span className="font-medium text-foreground">
								{endpointName}
							</span>{' '}
							with{' '}
							<span className="font-medium text-foreground">{modelName}</span>
						</p>
					</div>
				</div>

				<div className="relative w-full max-w-md space-y-3">
					<div className="flex items-center justify-between gap-3 text-caption text-destructive">
						<span className="min-w-0 truncate text-left">{activeMessage}</span>
						<span className="shrink-0 tabular-nums">
							{Math.round(progress)}%
						</span>
					</div>
					<Progress
						value={progress}
						className="bg-destructive/15"
						indicatorClassName="bg-destructive duration-75 ease-linear"
						aria-label="Deployment progress"
					/>
				</div>

				<Alert variant="destructive" className="max-w-lg text-left">
					<AlertTitle>
						{failureDetails?.title ?? 'Deployment failed'}
					</AlertTitle>
					<AlertDescription>
						{failureDetails?.description ??
							'Something went wrong while provisioning your endpoint. Please try again or choose a different model.'}
					</AlertDescription>
				</Alert>

				<div className="flex flex-wrap items-center justify-center gap-2">
					<Button onClick={onRetry}>Try again</Button>
					<Button variant="outline" onClick={onBackToReview}>
						Back to review
					</Button>
					<Button variant="outline" onClick={onChooseModel}>
						Choose another model
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent"
			/>

			<div className="relative flex flex-col items-center gap-4">
				<div className="relative flex h-20 w-20 items-center justify-center">
					<span className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
					<span className="absolute inset-2 animate-pulse rounded-full bg-primary/10" />
					<IconBox
						size="xxxlg"
						shape="circle"
						className="relative bg-primary/12"
					>
						<Rocket className="text-primary" aria-hidden />
					</IconBox>
				</div>

				<div className="space-y-1">
					<h2 className="text-h3 text-foreground">Deploying endpoint</h2>
					<p className="max-w-sm text-body-sm text-muted-foreground">
						Setting up{' '}
						<span className="font-medium text-foreground">{endpointName}</span>{' '}
						with{' '}
						<span className="font-medium text-foreground">{modelName}</span>
					</p>
				</div>
			</div>

			<div className="relative w-full max-w-md space-y-3">
				<div className="flex items-center justify-between gap-3 text-caption text-muted-foreground">
					<span className="min-w-0 truncate text-left">{activeMessage}</span>
					<span className="shrink-0 tabular-nums">
						{Math.round(progress)}%
					</span>
				</div>
				<Progress
					value={progress}
					indicatorClassName="duration-75 ease-linear"
					aria-label="Deployment progress"
				/>
			</div>
		</div>
	)
}
