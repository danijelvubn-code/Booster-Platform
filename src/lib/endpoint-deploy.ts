import type { ModelRecord } from '@/lib/model-metrics'

/** GPT-4o — demo deployment always fails after health checks. */
const DEPLOY_FAILURE_MODEL_IDS = new Set(['m-14'])

export type DeployFailureDetails = {
	title: string
	description: string
	failedStep: string
}

export function shouldSimulateDeployFailure(model: ModelRecord): boolean {
	return DEPLOY_FAILURE_MODEL_IDS.has(model.id)
}

export function getDeployFailureDetails(model: ModelRecord): DeployFailureDetails {
	if (model.id === 'm-14') {
		return {
			title: 'GPU capacity unavailable',
			description: `Scaleway could not allocate enough inference resources for ${model.name} in EU-West. Your endpoint was not created.`,
			failedStep: 'Running health checks…',
		}
	}

	return {
		title: 'Deployment failed',
		description:
			'Something went wrong while provisioning your endpoint. Please try again or choose a different model.',
		failedStep: 'Finalizing deployment…',
	}
}
