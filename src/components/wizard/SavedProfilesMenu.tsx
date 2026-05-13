import { Clock, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/sonner'
import {
	deleteUseCaseProfile,
	getSavedUseCaseProfiles,
	type SavedUseCaseProfile,
} from '@/data/savedUseCaseProfiles'

interface SavedProfilesMenuProps {
	onLoadProfile: (profile: SavedUseCaseProfile) => void
	loadedProfileId: string | null
}

export function SavedProfilesMenu({
	onLoadProfile,
	loadedProfileId: _loadedProfileId,
}: SavedProfilesMenuProps) {
	const savedProfiles = getSavedUseCaseProfiles()

	const handleDeleteProfile = (id: string, e: React.MouseEvent) => {
		e.stopPropagation()
		deleteUseCaseProfile(id)
		toast('Profile deleted')
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm">
					<Clock className="h-3.5 w-3.5 mr-1" />
					Saved profiles
					{savedProfiles.length > 0 && (
						<Badge
							variant="secondary"
							appearance="pill"
							size="20"
							className="ml-1 tabular-nums"
						>
							{savedProfiles.length}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-80 p-0">
				<div className="border-b border-border p-3">
					<p className="text-body-sm font-semibold">Saved profiles</p>
					<p className="text-caption text-muted-foreground">
						Load a previous session or a template.
					</p>
				</div>
				<div className="max-h-64 overflow-y-auto p-1">
					{savedProfiles.length === 0 ? (
						<p className="px-3 py-4 text-center text-body-sm text-muted-foreground">
							No saved profiles yet.
						</p>
					) : (
						savedProfiles.map((profile) => (
							<button
								key={profile.id}
								type="button"
								onClick={() => onLoadProfile(profile)}
								className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-accent"
							>
								<div className="min-w-0">
									<p className="text-body-sm-strong truncate text-foreground">
										{profile.name}
									</p>
									<p className="text-caption text-muted-foreground">
										{profile.state.useCase || '—'}
									</p>
								</div>
								<div className="flex shrink-0 items-center gap-1">
									{profile.platform && (
										<Badge
											variant="secondary"
											size="20"
											className="font-normal"
										>
											template
										</Badge>
									)}
									{!profile.platform && (
										<button
											type="button"
											onClick={(e) => handleDeleteProfile(profile.id, e)}
											className="rounded p-1 hover:bg-destructive/10 hover:text-destructive"
										>
											<Trash2 className="h-3.5 w-3.5" />
										</button>
									)}
								</div>
							</button>
						))
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}
