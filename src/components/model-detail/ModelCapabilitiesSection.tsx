import {
	Brain,
	Code2,
	Database,
	Eye,
	Globe,
	Languages,
	type LucideIcon,
	Sliders,
	Sparkles,
	Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { sheetWidthClasses } from '@/components/layout/AppSideSheet'
import { type ModelRecord, overallScoreTextClass } from '@/lib/model-metrics'
import { cn } from '@/lib/utils'

function getCapabilityIcon(name: string): LucideIcon {
	const key = name.toLowerCase()
	if (key.includes('reason')) return Brain
	if (key.includes('multilingual')) return Globe
	if (key.includes('language')) return Languages
	if (key.includes('vision')) return Eye
	if (key.includes('code')) return Code2
	if (key.includes('efficien')) return Zap
	if (key.includes('rag')) return Database
	if (key.includes('custom')) return Sliders
	return Sparkles
}

function SectionHeader({
	title,
	subtitle,
	action,
}: {
	title: string
	subtitle?: string
	action?: React.ReactNode
}) {
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-body-strong text-foreground">{title}</h2>
				{action}
			</div>
			{subtitle ? (
				<p className="text-body-sm text-muted-foreground py-1">{subtitle}</p>
			) : null}
		</div>
	)
}

function CapabilityCard({ cap }: { cap: { name: string; score: number } }) {
	const Icon = getCapabilityIcon(cap.name)
	return (
		<Card>
			<CardContent className="flex items-center gap-4 p-0 px-4 py-4">
				<Icon
					className="h-icon-24 w-icon-24 shrink-0 text-foreground/75"
					aria-hidden
				/>
				<span className="text-body-sm flex-1 truncate text-muted-foreground">
					{cap.name}
				</span>
				<span
					className={cn(
						'text-h3 shrink-0 tabular-nums',
						overallScoreTextClass(cap.score),
					)}
				>
					{Math.round(cap.score)}
				</span>
			</CardContent>
		</Card>
	)
}

function CapabilitiesDetailDialog({ model }: { model: ModelRecord }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm">
					Detailed View
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className={cn(
					'inset-y-4 right-4 flex h-auto flex-col gap-0 overflow-hidden rounded-xl border border-border p-0 shadow-xl',
					sheetWidthClasses.md,
				)}
				aria-describedby={undefined}
			>
				<SheetHeader className="h-[60px] flex-row items-center justify-start border-b border-border px-5 py-0 space-y-0">
					<SheetTitle>Capability Details</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-5 py-4">
					<div className="space-y-8">
						{model.capabilities.map((cap, i) => {
							const Icon = getCapabilityIcon(cap.name)
							return (
								<div key={cap.name} className="space-y-5">
									<div className="flex items-center justify-between gap-3">
										<div className="flex items-center gap-2">
											<Icon
												className="h-icon-24 w-icon-24 text-foreground/75"
												aria-hidden
											/>
											<span className="text-body-strong text-foreground">
												{cap.name}
											</span>
										</div>
										<span
											className={cn(
												'text-body-strong text-right tabular-nums',
												overallScoreTextClass(cap.score),
											)}
										>
											{cap.score.toFixed(1)}
										</span>
									</div>
									{cap.subs.length > 0 ? (
										<div className="space-y-3 pl-10">
											{cap.subs.map((sub) => (
												<div
													key={sub.name}
													className="grid grid-cols-[12.5rem_1fr_2.5rem] items-center gap-3"
												>
													<span className="text-body-sm text-foreground">
														{sub.name}
													</span>
													<Progress
														value={Math.max(0, Math.min(100, sub.score))}
														size="dense"
														className="bg-muted"
														indicatorClassName="bg-muted-foreground/75"
														aria-hidden
													/>
													<span
														className={cn(
															'text-body-sm-strong text-right tabular-nums',
															overallScoreTextClass(sub.score),
														)}
													>
														{sub.score.toFixed(1)}
													</span>
												</div>
											))}
										</div>
									) : null}
									{i < model.capabilities.length - 1 ? <Separator /> : null}
								</div>
							)
						})}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

interface ModelCapabilitiesSectionProps {
	model: ModelRecord
}

export function ModelCapabilitiesSection({
	model,
}: ModelCapabilitiesSectionProps) {
	return (
		<section className="space-y-3">
			<SectionHeader
				title="Capabilities"
				subtitle="Capability scores reflect the latest internal evaluation. Energy efficiency reflects energy consumption observed during those evaluations."
				action={<CapabilitiesDetailDialog model={model} />}
			/>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{model.capabilities.slice(0, 4).map((cap) => (
					<CapabilityCard key={cap.name} cap={cap} />
				))}
			</div>
		</section>
	)
}
