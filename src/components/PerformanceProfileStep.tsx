import { ChevronDown, ChevronUp, Crown, Info, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type PerformanceProfile = 'best-effort' | 'premium' | 'enterprise'

interface ProfileOption {
	id: PerformanceProfile
	label: string
	subtitle: string
	description: string
	icon: React.ElementType
	specs: { label: string; value: string }[]
}

const profiles: ProfileOption[] = [
	{
		id: 'best-effort',
		label: 'Best Effort',
		subtitle: 'Cost Optimized',
		description: 'For experimentation and non-critical workloads.',
		icon: Zap,
		specs: [
			{ label: 'Compute', value: 'Shared pool' },
			{ label: 'Priority', value: 'Lower scheduling' },
			{ label: 'TPM', value: 'Up to 50K' },
			{ label: 'RPM', value: 'Up to 100' },
			{ label: 'p95 Latency', value: '1.5–3s' },
			{ label: 'TTFT', value: '<1.2s' },
			{ label: 'Context Length', value: 'Up to 32K tokens' },
			{ label: 'Per-Request Cap', value: '4,096 tokens' },
			{ label: 'Autoscaling', value: 'Reactive' },
			{ label: 'SLA', value: 'None (best effort)' },
		],
	},
	{
		id: 'premium',
		label: 'Steady State',
		subtitle: 'Production Ready',
		description: 'For customer-facing production systems.',
		icon: Crown,
		specs: [
			{ label: 'Compute', value: 'Allocated slice' },
			{ label: 'Priority', value: 'Priority scheduling' },
			{ label: 'TPM', value: 'Up to 250K' },
			{ label: 'RPM', value: 'Up to 500' },
			{ label: 'p95 Latency', value: '<900ms' },
			{ label: 'TTFT', value: '<500ms' },
			{ label: 'Context Length', value: 'Up to 128K tokens' },
			{ label: 'Per-Request Cap', value: '8,192 tokens' },
			{ label: 'Autoscaling', value: 'Proactive + reactive' },
			{ label: 'SLA', value: '99.5% availability' },
		],
	},
	{
		id: 'enterprise',
		label: 'High Throughput',
		subtitle: 'Mission Critical',
		description: 'For business-critical inference pipelines.',
		icon: Shield,
		specs: [
			{ label: 'Compute', value: 'Dedicated allocation' },
			{ label: 'Priority', value: 'Reserved GPU capacity' },
			{ label: 'TPM', value: '500K+' },
			{ label: 'RPM', value: '1000+' },
			{ label: 'p95 Latency', value: '<500ms' },
			{ label: 'TTFT', value: '<250ms' },
			{ label: 'Context Length', value: 'Up to 1M tokens' },
			{ label: 'Per-Request Cap', value: '16,384 tokens' },
			{ label: 'Autoscaling', value: 'Predictive + pre-warmed' },
			{ label: 'SLA', value: '99.9%+ availability' },
		],
	},
]

interface PerformanceProfileStepProps {
	value: PerformanceProfile
	onChange: (profile: PerformanceProfile) => void
}

const PerformanceProfileStep = ({
	value,
	onChange,
}: PerformanceProfileStepProps) => {
	const [expanded, setExpanded] = useState<Set<PerformanceProfile>>(new Set())

	const toggleExpand = (id: PerformanceProfile) => {
		setExpanded((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	return (
		<div className="space-y-4">
			<div>
				<h3 className="text-base font-semibold">Select Performance Profile</h3>
				<p className="text-sm text-muted-foreground mt-1">
					Choose the infrastructure tier that matches your workload
					requirements.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{profiles.map((profile) => {
					const Icon = profile.icon
					const selected = value === profile.id
					const isExpanded = expanded.has(profile.id)
					return (
						<Card
							key={profile.id}
							className={cn(
								'cursor-pointer transition-all hover:shadow-md',
								selected
									? 'ring-2 ring-primary border-primary'
									: 'hover:border-primary/50',
							)}
							onClick={() => onChange(profile.id)}
						>
							<CardContent className="p-4 space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Icon className="h-4 w-4 text-primary" />
										<span className="font-semibold text-sm">
											{profile.label}
										</span>
									</div>
									{selected && (
										<Badge
											variant="default"
											className="text-[10px] px-1.5 py-0"
										>
											Selected
										</Badge>
									)}
								</div>
								<Badge variant="secondary" className="text-xs">
									{profile.subtitle}
								</Badge>
								<p className="text-xs text-muted-foreground">
									{profile.description}
								</p>

								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation()
										toggleExpand(profile.id)
									}}
									className="flex items-center gap-1 text-xs text-primary hover:underline pt-1"
								>
									{isExpanded ? (
										<ChevronUp className="h-3 w-3" />
									) : (
										<ChevronDown className="h-3 w-3" />
									)}
									{isExpanded ? 'Hide details' : 'View details'}
								</button>

								{isExpanded && (
									<div className="space-y-1.5 pt-1 border-t border-border mt-1">
										{profile.specs.map((spec) => (
											<div
												key={spec.label}
												className="flex justify-between text-xs"
											>
												<span className="text-muted-foreground">
													{spec.label}
												</span>
												<span className="font-medium text-right">
													{spec.value}
												</span>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					)
				})}
			</div>

			<div className="rounded-md border border-border bg-muted/50 p-3 flex items-start gap-2">
				<Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
				<p className="text-xs text-muted-foreground">
					Performance settings such as concurrency, scaling policy, and rate
					limits are automatically configured based on your selected profile.
				</p>
			</div>
		</div>
	)
}

export const getProfileSpecs = (profile: PerformanceProfile) => {
	const found = profiles.find((p) => p.id === profile)
	if (!found) {
		throw new Error(`Profile not found: ${profile}`)
	}
	return found
}

export default PerformanceProfileStep
