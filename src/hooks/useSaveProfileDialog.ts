import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from '@/components/ui/sonner'
import {
	deleteUseCaseProfile,
	getSavedUseCaseProfiles,
	saveUseCaseProfile,
} from '@/data/savedUseCaseProfiles'
import type { WizardState } from '@/lib/model-scoring'

interface SaveDialogState {
	isOpen: boolean
	name: string
	shouldExit: boolean
}

export function useSaveProfileDialog(
	state: WizardState,
	currentStep: number,
	loadedProfileId: string | null,
	onProfileSaved: (profileId: string) => void,
) {
	const navigate = useNavigate()
	const [dialogState, setDialogState] = useState<SaveDialogState>({
		isOpen: false,
		name: '',
		shouldExit: false,
	})

	const openDialog = (shouldExit: boolean) => {
		const defaultName = loadedProfileId
			? getSavedUseCaseProfiles().find((p) => p.id === loadedProfileId)?.name ||
				''
			: state.useCase
				? `${state.useCase} profile`
				: ''

		setDialogState({
			isOpen: true,
			name: defaultName,
			shouldExit,
		})
	}

	const closeDialog = () => {
		setDialogState((prev) => ({ ...prev, isOpen: false }))
	}

	const setName = (name: string) => {
		setDialogState((prev) => ({ ...prev, name }))
	}

	const confirmSave = () => {
		if (!dialogState.name.trim()) return

		// Delete old profile if updating
		if (loadedProfileId) {
			deleteUseCaseProfile(loadedProfileId)
		}

		// Save new profile
		const saved = saveUseCaseProfile(
			dialogState.name.trim(),
			state,
			currentStep,
		)
		onProfileSaved(saved.id)

		closeDialog()

		toast.success('Profile saved', {
			description: `"${dialogState.name.trim()}" has been saved. You can resume anytime.`,
		})

		if (dialogState.shouldExit) {
			navigate({ to: '/app/cosmos', search: { hosting: '' } })
		}
	}

	return {
		dialogState,
		openDialog,
		closeDialog,
		setName,
		confirmSave,
	}
}
