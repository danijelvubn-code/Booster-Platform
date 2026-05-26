import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ModelCosmosUseCaseBannerIllustration } from '@/components/model-cosmos/ModelCosmosUseCaseBannerIllustration'
import { publicAssetUrl } from '@/lib/public-asset-url'
import { cn } from '@/lib/utils'

const BANNER_BACKGROUND = publicAssetUrl(
	'model-cosmos/use-case-banner-background.png',
)

type ModelCosmosUseCaseBannerProps = {
	className?: string
}

export function ModelCosmosUseCaseBanner({
	className,
}: ModelCosmosUseCaseBannerProps) {
	return (
		<section
			aria-labelledby="model-cosmos-use-case-banner-title"
			className={cn('relative overflow-hidden rounded-xl', className)}
		>
			<img
				src={BANNER_BACKGROUND}
				alt=""
				aria-hidden
				className="pointer-events-none absolute inset-0 h-full w-full object-cover"
			/>

			<div className="relative flex h-[164px] flex-col items-center justify-center gap-4 py-5 pl-4 pr-6 sm:flex-row sm:items-center sm:gap-8 sm:py-6">
				<ModelCosmosUseCaseBannerIllustration className="hidden sm:block" />

				<div className="flex h-full min-w-0 flex-1 flex-col items-end justify-end gap-4 sm:flex-row sm:items-end sm:gap-[172px]">
					<div className="flex min-w-0 flex-1 h-full flex-col justify-center space-y-1.5 sm:space-y-2">
						<h2
							id="model-cosmos-use-case-banner-title"
							className="text-h3 text-white"
						>
							Find models built for your use case
						</h2>
						<p className="max-w-xl text-body text-white/80">
							Walk through a short guided match — describe what you are building,
							set your priorities, and see models ranked for your workflow, from
							coding and chat to vision, enterprise, and custom deployments.
						</p>
					</div>

					<Button
						asChild
						size="default"
						className="shrink-0 bg-white text-foreground shadow-md hover:bg-white/90"
					>
						<Link to="/app/cosmos/guided">
							Start guided match
							<ArrowRight aria-hidden />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
