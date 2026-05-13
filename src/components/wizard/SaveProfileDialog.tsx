import { Save } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { WizardState } from '@/lib/model-scoring'

interface SaveProfileDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	saveName: string
	setSaveName: (name: string) => void
	state: WizardState
	currentStep: number
	totalSteps: number
	saveAndExit: boolean
	onConfirmSave: () => void
	loadedProfileId: string | null
}

export function SaveProfileDialog({
	open,
	onOpenChange,
	saveName,
	setSaveName,
	state,
	currentStep,
	totalSteps,
	saveAndExit,
	onConfirmSave,
	loadedProfileId,
}: SaveProfileDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						{loadedProfileId ? 'Update Profile' : 'Save Use-Case Profile'}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3 py-2">
					<p className="text-sm text-muted-foreground">
						{saveAndExit
							? 'Save your progress and return to Model Cosmos.'
							: 'Save your current selections. You can continue editing or load this profile later.'}
					</p>
					<Input
						placeholder="Profile name..."
						value={saveName}
						onChange={(e) => setSaveName(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && onConfirmSave()}
						autoFocus
					/>
					<div className="flex flex-wrap gap-1.5">
						{state.useCase && (
							<Badge variant="secondary" className="text-[10px]">
								{state.useCase}
							</Badge>
						)}
						{state.objective && (
							<Badge variant="outline" className="text-[10px]">
								{state.objective}
							</Badge>
						)}
						<Badge variant="outline" className="text-[10px]">
							Step {currentStep + 1}/{totalSteps}
						</Badge>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={onConfirmSave} disabled={!saveName.trim()}>
						<Save className="h-4 w-4 mr-1" />
						{saveAndExit ? 'Save & Exit' : 'Save'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
