import illustrationSvg from './use-case-banner-illustration.svg?raw'

import { cn } from '@/lib/utils'

type ModelCosmosUseCaseBannerIllustrationProps = {
	className?: string
}

const illustrationMarkup = illustrationSvg
	.replace(/\swidth="[^"]*"/, '')
	.replace(/\sheight="[^"]*"/, '')
	.replace(/\sshape-rendering="crispEdges"/g, '')
	.replace('<svg ', '<svg aria-hidden="true" shape-rendering="geometricPrecision" ')

export function ModelCosmosUseCaseBannerIllustration({
	className,
}: ModelCosmosUseCaseBannerIllustrationProps) {
	return (
		<div
			className={cn(
				'h-[145px] w-[216px] shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full',
				className,
			)}
			// Exact Figma export — keep markup byte-for-byte aside from responsive sizing.
			dangerouslySetInnerHTML={{ __html: illustrationMarkup }}
		/>
	)
}
