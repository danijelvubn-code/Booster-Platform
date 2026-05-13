import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, ChevronLeft, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { BoosterLogo } from '@/components/brand/BoosterLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/auth/set-password')({
	validateSearch: z.object({ token: z.string() }),
	component: SetPasswordPage,
})

const rules = [
	{ label: 'At least 10 characters', test: (p: string) => p.length >= 10 },
	{
		label: 'Contains at least one number',
		test: (p: string) => /\d/.test(p),
	},
	{
		label: 'Contains at least one uppercase letter',
		test: (p: string) => /[A-Z]/.test(p),
	},
	{
		label: 'Contains at least special character',
		test: (p: string) => /[^A-Za-z0-9]/.test(p),
	},
]

function SetPasswordPage() {
	const { token } = Route.useSearch()

	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const ruleResults = rules.map((r) => r.test(password))
	const allRulesPassed = ruleResults.every(Boolean)
	const isValid = allRulesPassed && password === confirm && password.length > 0

	const handleSubmit = (e: { preventDefault(): void }) => {
		e.preventDefault()
		console.log({ password, token })
		// TODO: submit token + password to API
	}

	return (
		<div className="h-screen flex overflow-hidden relative">
			{/* Full-page background video */}
			<video
				autoPlay
				loop
				muted
				playsInline
				poster="/login-cover.webp"
				className="absolute inset-0 size-full object-cover"
			>
				<source src="/login-cover.webm" type="video/webm" />
			</video>
			<img
				src="/login-cover.webp"
				alt=""
				className="absolute inset-0 object-cover size-full"
			/>
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			{/* Left — branding */}
			<div className="hidden lg:flex flex-1 items-center justify-center relative">
				<BoosterLogo variant="lockup" tone="on-dark" size="xl" />
			</div>

			{/* Right — white card */}
			<div className="w-160 shrink-0 p-10 relative flex">
				<div
					className="flex-1 bg-card rounded-3xl flex flex-col items-center px-10 pt-10 pb-6 gap-6"
					style={{
						boxShadow:
							'0px 25px 60px -15px rgba(16,24,40,0.20), 0px 25px 60px -15px rgba(16,24,40,0.12)',
					}}
				>
					{/* Card header: Back | Logo | spacer */}
					<div className="flex items-center w-full">
						<div className="flex-1">
							<Link
								to="/"
								className="inline-flex items-center gap-1 text-sm font-semibold text-info hover:underline"
							>
								<ChevronLeft className="size-4" />
								Back
							</Link>
						</div>
						<BoosterLogo variant="lockup" size="xs" />
						<div className="flex-1" />
					</div>
					<BoosterLogo variant="lockup" size="xs" />
					{/* Content — vertically centered */}
					<div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
						{/* Heading */}
						<div className="flex flex-col items-center gap-2 text-center">
							<h1 className="text-2xl font-semibold leading-[1.3] text-foreground">
								Chose a new password
							</h1>
							<p className="text-base text-secondary-foreground tracking-wide">
								Passwords must be at least 10 characters long and include a mix
								of letters, numbers, and symbols. Avoid common or previously
								used passwords.
							</p>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-6 w-full"
						>
							<div className="flex flex-col gap-4">
								{/* New password */}
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
									<Input
										name="password"
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter new password..."
										className="h-12 pl-10 pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowPassword((v) => !v)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										<EyeOff className="size-5" />
									</button>
								</div>

								{/* Confirm password */}
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
									<Input
										name="confirm"
										type={showConfirm ? 'text' : 'password'}
										value={confirm}
										onChange={(e) => setConfirm(e.target.value)}
										placeholder="Re-enter new password..."
										className="h-12 pl-10 pr-10"
									/>
									<button
										type="button"
										onClick={() => setShowConfirm((v) => !v)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										<EyeOff className="size-5" />
									</button>
								</div>
							</div>

							{/* Password rules */}
							<div className="bg-muted rounded-lg px-4 py-3 flex flex-col gap-1">
								{rules.map((rule, i) => (
									<div key={rule.label} className="flex items-center gap-2">
										<CheckCircle2
											className={cn(
												'size-4 shrink-0',
												ruleResults[i]
													? 'text-success'
													: 'text-muted-foreground',
											)}
										/>
										<span
											className={cn(
												'text-sm',
												ruleResults[i]
													? 'text-success'
													: 'text-accent-foreground',
											)}
										>
											{rule.label}
										</span>
									</div>
								))}
							</div>

							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={!isValid}
							>
								Submit
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
