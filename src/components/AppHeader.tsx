import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronDown, HelpCircle, LogOut, User } from 'lucide-react'

import { BoosterLogo } from '@/components/brand/BoosterLogo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { postMvpPath } from '@/config/prototype-shell'
import { useAuth } from '@/hooks/use-auth'
import { primaryNavItems } from '@/lib/app-nav'
import { cn } from '@/lib/utils'

const PRIMARY_NAV_TOOLTIP_DELAY_MS = 1000

type AppHeaderProps = {
	/**
	 * Use `static` in section labs / previews so the header does not overlay surrounding content.
	 * Defaults to `fixed` for the real app shell — header is pinned to the viewport top and stays
	 * accessible regardless of any inner scroll containers.
	 */
	position?: 'fixed' | 'static'
	/** Override the logo target (defaults to `/overview`). */
	logoHref?: string
	/**
	 * Primary nav paths that should render a "Soon" pill and not navigate (used by MVP shell to mark
	 * post-MVP-only modules).
	 */
	comingSoonPaths?: ReadonlyArray<string>
	/** Primary nav items to omit entirely (e.g. hide Metrics in MVP). */
	excludeNavPaths?: ReadonlyArray<string>
	/**
	 * Prepended to each primary nav `path` for `Link` targets and active matching (e.g. `"/mvp"` for the MVP shell).
	 */
	navPathPrefix?: string
}

/**
 * Primary product header (logo • primary nav • user menu).
 * Used by `AppLayout` for the real app shell.
 */
export default function AppHeader({
	position = 'fixed',
	logoHref = postMvpPath('/overview'),
	comingSoonPaths,
	excludeNavPaths,
	navPathPrefix = '',
}: AppHeaderProps) {
	const location = useLocation()
	const navigate = useNavigate()
	const { user, logout } = useAuth()

	const pathname = location.pathname

	const toNavPath = (path: string) => `${navPathPrefix}${path}`

	const navItems = excludeNavPaths?.length
		? primaryNavItems.filter((item) => !excludeNavPaths.includes(item.path))
		: primaryNavItems

	return (
		<header
			className={cn(
				'z-50 w-full border-b border-border bg-card',
				position === 'fixed' ? 'fixed inset-x-0 top-0' : 'static',
			)}
		>
			<div className="flex h-14 w-full items-center justify-between gap-4 px-6">
				<Link
					to={logoHref}
					className="flex shrink-0 items-center gap-1.5 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					aria-label="Booster home"
				>
					<BoosterLogo
						variant="lockup"
						tone="on-light"
						size="sm"
						presentation
						className="h-icon-40"
					/>
				</Link>

				<nav
					className="flex h-14 min-w-0 flex-1 flex-wrap items-center justify-center gap-2"
					aria-label="Primary"
				>
					{navItems.map((item) => {
						const itemHref = toNavPath(item.path)
						const isActive =
							pathname.startsWith(itemHref) ||
							item.alsoActive.some((p) => pathname.startsWith(toNavPath(p)))
						const isSoon = comingSoonPaths?.includes(item.path) ?? false
						const soonPill = isSoon ? (
							<span
								key="soon-pill"
								aria-label="Coming soon"
								className="ml-0.5 rounded-md border border-border px-1.5 py-0.5 text-caption font-medium uppercase tracking-wide text-hierarchy-muted"
							>
								Soon
							</span>
						) : null
						const labelGroup = (
							<>
								<item.icon
									className="h-icon-16 w-icon-16 shrink-0"
									aria-hidden
								/>
								<span className="whitespace-nowrap">{item.label}</span>
								{soonPill}
							</>
						)
						const itemEl = isSoon ? (
							<span
								key={item.path}
								aria-disabled="true"
								className={cn(
									'flex h-14 cursor-not-allowed items-center gap-1.5 px-3 text-body-sm font-medium',
									'text-hierarchy-disabled',
								)}
							>
								{labelGroup}
							</span>
						) : (
							<Link
								key={item.path}
								to={itemHref}
								className={cn(
									'app-header-nav-underline-host relative flex h-14 items-center gap-1.5 px-3 text-body-sm font-medium',
									'outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
									'after:pointer-events-none after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-150 after:ease-linear',
									isActive
										? 'text-primary after:scale-x-100'
										: 'text-hierarchy-secondary transition-colors hover:text-primary',
								)}
							>
								{labelGroup}
							</Link>
						)

						const tooltipText = isSoon ? 'Coming soon' : item.tooltip
						if (tooltipText) {
							return (
								<TooltipProvider
									key={item.path}
									delayDuration={PRIMARY_NAV_TOOLTIP_DELAY_MS}
								>
									<Tooltip>
										<TooltipTrigger asChild>{itemEl}</TooltipTrigger>
										<TooltipContent
											side="bottom"
											className="max-w-56 text-caption"
										>
											{tooltipText}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)
						}
						return itemEl
					})}
				</nav>

				<div className="flex shrink-0 items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="gap-1.5">
								<User className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
								<span className="hidden max-w-40 truncate md:inline">
									{user?.name ?? 'User Name'}
								</span>
								<ChevronDown
									className="h-icon-16 w-icon-16 shrink-0 text-foreground/50"
									aria-hidden
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="min-w-60 p-0">
							<div className="flex items-center justify-between gap-3 border-b px-3 py-2">
								<span className="text-caption text-foreground/75">Theme</span>
								<ThemeToggle />
							</div>
							<div className="border-b p-1">
								<DropdownMenuItem
									onClick={() => navigate({ to: '/app/account' })}
								>
									<User className="mr-2 h-icon-16 w-icon-16" aria-hidden />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<HelpCircle
										className="mr-2 h-icon-16 w-icon-16"
										aria-hidden
									/>
									Help
								</DropdownMenuItem>
							</div>
							<div className="border-t p-1">
								<DropdownMenuItem
									onClick={logout}
									className="text-destructive focus:text-destructive"
								>
									<LogOut className="mr-2 h-icon-16 w-icon-16" aria-hidden />
									Sign out
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
