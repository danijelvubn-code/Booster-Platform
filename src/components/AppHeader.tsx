import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, LayoutGrid, LogOut, Shield, User } from "lucide-react";

import { BoosterLogo } from "@/components/brand/BoosterLogo";
import { useAuth } from "@/contexts/AuthContext";
import { IS_COMBINED_PROTOTYPE, mvpPath, postMvpPath } from "@/config/prototype-shell";
import { COMPONENT_LABS_DEFAULT_PATH } from "@/lib/component-labs";
import { primaryNavItems } from "@/lib/app-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type AppHeaderProps = {
  /**
   * Use `static` in section labs / previews so the header does not stick over surrounding content.
   * Defaults to `sticky` for the real app shell.
   */
  position?: "sticky" | "static";
  /** Optional pill rendered next to the logo (e.g. `"MVP"`). */
  badge?: ReactNode;
  /** Override the logo target (defaults to `/overview`). */
  logoHref?: string;
  /**
   * Primary nav paths that should render a "Soon" pill and not navigate (used by MVP shell to mark
   * post-MVP-only modules).
   */
  comingSoonPaths?: ReadonlyArray<string>;
  /** Primary nav items to omit entirely (e.g. hide Metrics in MVP). */
  excludeNavPaths?: ReadonlyArray<string>;
  /**
   * Prepended to each primary nav `path` for `Link` targets and active matching (e.g. `"/mvp"` for the MVP shell).
   */
  navPathPrefix?: string;
};

/**
 * Primary product header (logo • primary nav • user menu).
 * Used by `AppLayout` for the real app shell, and by the Section lab to preview/document the section.
 */
const AppHeader = ({
  position = "sticky",
  badge,
  logoHref = postMvpPath("/overview"),
  comingSoonPaths,
  excludeNavPaths,
  navPathPrefix = "",
}: AppHeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isImpersonating, logout, track, setAppTrack } = useAuth();

  const toNavPath = (path: string) => `${navPathPrefix}${path}`;

  const handleVersionSwitch = (toMvp: boolean) => {
    const next = toMvp ? "mvp" : "post-mvp";
    if (next === track) return;
    setAppTrack(next);
    navigate(next === "mvp" ? mvpPath("/overview") : postMvpPath("/overview"));
  };

  const navItems = excludeNavPaths?.length
    ? primaryNavItems.filter((item) => !excludeNavPaths.includes(item.path))
    : primaryNavItems;

  return (
    <header
      className={cn(
        "z-50 w-full border-b border-border bg-card",
        position === "sticky" ? "sticky top-0" : "static",
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
            className="h-icon-40 w-auto"
          />
          {badge ? (
            <span className="ml-1 rounded-md border border-border px-2 py-0.5 text-caption font-medium text-muted-foreground">
              {badge}
            </span>
          ) : null}
        </Link>

        <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2" aria-label="Primary">
          {navItems.map((item) => {
            const itemHref = toNavPath(item.path);
            const isActive =
              pathname.startsWith(itemHref) || item.alsoActive.some((p) => pathname.startsWith(toNavPath(p)));
            const isSoon = comingSoonPaths?.includes(item.path) ?? false;
            const soonPill = isSoon ? (
              <span
                aria-label="Coming soon"
                className="ml-0.5 rounded-md border border-border px-1.5 py-0.5 text-caption font-medium uppercase tracking-wide text-muted-foreground"
              >
                Soon
              </span>
            ) : null;
            const labelGroup = (
              <>
                <item.icon className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
                <span className="whitespace-nowrap">{item.label}</span>
                {soonPill}
              </>
            );
            const itemEl = isSoon ? (
              <span
                key={item.path}
                aria-disabled="true"
                className={cn(
                  "flex cursor-not-allowed items-center gap-1.5 rounded-md px-3 py-2 text-body-sm font-medium",
                  "text-muted-foreground/75",
                )}
              >
                {labelGroup}
              </span>
            ) : (
              <Link
                key={item.path}
                to={itemHref}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-body-sm font-medium transition-colors ease-standard",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {labelGroup}
              </Link>
            );

            const tooltipText = isSoon ? "Coming soon" : item.tooltip;
            if (tooltipText) {
              return (
                <TooltipProvider key={item.path} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>{itemEl}</TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-56 text-caption">
                      {tooltipText}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }
            return itemEl;
          })}
        </nav>

        <div className="flex shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <User className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
                <span className="hidden max-w-40 truncate md:inline">{user?.name ?? "User Name"}</span>
                <ChevronDown className="h-icon-16 w-icon-16 shrink-0 text-foreground/50" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60 p-0">
              <div className="flex items-center justify-between gap-3 border-b px-3 py-2">
                <span className="text-caption text-foreground/75">Theme</span>
                <ThemeToggle />
              </div>
              {IS_COMBINED_PROTOTYPE ? (
                <div
                  className="flex items-center justify-between gap-2 border-b px-3 py-2"
                  onPointerDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <span className="shrink-0 text-caption text-foreground/75">Version</span>
                  <div className="flex min-w-0 items-center justify-end gap-2">
                    <span
                      className={cn(
                        "shrink-0 text-caption",
                        track === "post-mvp" ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      Post
                    </span>
                    <Switch
                      id="app-version-toggle"
                      checked={track === "mvp"}
                      onCheckedChange={handleVersionSwitch}
                      size="md"
                      aria-label="Switch between Post MVP and MVP product"
                    />
                    <span
                      className={cn(
                        "shrink-0 text-caption",
                        track === "mvp" ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      MVP
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="border-b p-1">
                <DropdownMenuItem
                  onClick={() => navigate(track === "mvp" ? mvpPath("/account") : postMvpPath("/account"))}
                >
                  <User className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                  Account
                </DropdownMenuItem>
                {track !== "mvp" ? (
                  <DropdownMenuItem onClick={() => navigate(postMvpPath("/help"))}>
                    <HelpCircle className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Help
                  </DropdownMenuItem>
                ) : null}
                {import.meta.env.DEV && IS_COMBINED_PROTOTYPE ? (
                  <DropdownMenuItem onClick={() => navigate(COMPONENT_LABS_DEFAULT_PATH)}>
                    <LayoutGrid className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Component labs
                  </DropdownMenuItem>
                ) : null}
                {user?.isAdmin && !isImpersonating && (
                  <DropdownMenuItem onClick={() => navigate(postMvpPath("/admin"))}>
                    <Shield className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Admin Console
                  </DropdownMenuItem>
                )}
              </div>
              <div className="border-t p-1">
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                  Sign out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
