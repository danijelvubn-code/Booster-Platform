export interface SavedUseCaseProfile {
	id: string
	name: string
	/** If true, this is a platform-provided template — read-only for users */
	platform?: boolean
	state: {
		useCase: string
		customUseCase: string
		objective: string
		monthlyVolume: string
		trafficPattern: string
		audience: string
		maxLatency: string
		ttftCritical: string
		sensitiveData: boolean
		dataTypes: string[]
		moderation: string
		deploymentPref: string
		costSensitivity: string
		monthlyBudget: string
	}
	/** The step the user was on when they saved (so they can resume) */
	lastStep: number
	savedAt: string
}

// In-memory store
const profiles: SavedUseCaseProfile[] = [
	{
		id: 'ucp-platform-1',
		name: 'Customer Support Bot — Production',
		platform: true,
		state: {
			useCase: 'Customer Support Bot',
			customUseCase: '',
			objective: 'Balanced Performance',
			monthlyVolume: '10M – 50M tokens',
			trafficPattern: 'Burst traffic',
			audience: 'Yes – customer-facing',
			maxLatency: '< 1s',
			ttftCritical: 'Yes – interactive UI',
			sensitiveData: true,
			dataTypes: ['PII'],
			moderation: 'Standard moderation',
			deploymentPref: 'Standard environment acceptable',
			costSensitivity: 'Moderate sensitivity',
			monthlyBudget: '$1,000 – $3,000',
		},
		lastStep: 6,
		savedAt: '2026-02-25T14:30:00Z',
	},
	{
		id: 'ucp-platform-2',
		name: 'RAG Knowledge Assistant — Enterprise',
		platform: true,
		state: {
			useCase: 'RAG / Knowledge Assistant',
			customUseCase: '',
			objective: 'Highest Accuracy',
			monthlyVolume: '50M+',
			trafficPattern: 'Steady traffic',
			audience: 'Internal users only',
			maxLatency: '< 2s',
			ttftCritical: 'Moderate importance',
			sensitiveData: true,
			dataTypes: ['Confidential enterprise data'],
			moderation: 'Standard moderation',
			deploymentPref: 'Protected environment required',
			costSensitivity: 'Cost is secondary to quality',
			monthlyBudget: '$3,000+',
		},
		lastStep: 6,
		savedAt: '2026-02-20T10:00:00Z',
	},
	{
		id: 'ucp-platform-3',
		name: 'Code Generation — Dev Tooling',
		platform: true,
		state: {
			useCase: 'Code Generation',
			customUseCase: '',
			objective: 'Fastest Response Time',
			monthlyVolume: '1M – 10M tokens',
			trafficPattern: 'Burst traffic',
			audience: 'Internal users only',
			maxLatency: '< 500ms',
			ttftCritical: 'Yes – interactive UI',
			sensitiveData: false,
			dataTypes: [],
			moderation: 'Minimal filtering',
			deploymentPref: 'Standard environment acceptable',
			costSensitivity: 'Moderate sensitivity',
			monthlyBudget: '$500 – $1,000',
		},
		lastStep: 6,
		savedAt: '2026-02-18T09:00:00Z',
	},
]

export function getSavedUseCaseProfiles(): SavedUseCaseProfile[] {
	return [...profiles]
}

export function saveUseCaseProfile(
	name: string,
	state: SavedUseCaseProfile['state'],
	lastStep: number,
): SavedUseCaseProfile {
	const profile: SavedUseCaseProfile = {
		id: `ucp-${Date.now()}`,
		name,
		state: { ...state, dataTypes: [...state.dataTypes] },
		lastStep,
		savedAt: new Date().toISOString(),
	}
	profiles.push(profile)
	return profile
}

export function deleteUseCaseProfile(id: string): void {
	const idx = profiles.findIndex((p) => p.id === id)
	if (idx !== -1 && !profiles[idx].platform) profiles.splice(idx, 1)
}
