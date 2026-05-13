import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				{
					text: [
						'display',
						'h1',
						'h2',
						'h3',
						'body',
						'body-strong',
						'body-sm',
						'body-sm-strong',
						'label',
						'caption',
						'caption-strong',
						'caption-mono',
						'code',
					],
				},
			],
		},
	},
})

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
