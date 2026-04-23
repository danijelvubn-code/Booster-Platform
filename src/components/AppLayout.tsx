import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { primaryNavItems } from "@/lib/app-nav";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, LogOut, Zap, User, ChevronDown, Shield, LayoutGrid } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isImpersonating, impersonatedTenant, logout, stopImpersonation } = useAuth();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Impersonation banner */}
      {isImpersonating && (
        <div className="bg-destructive text-destructive-foreground flex items-center justify-center gap-3 py-2 text-body-sm font-medium tracking-wide">
          <span>⚠ ADMIN IMPERSONATION MODE — Acting as <strong>{impersonatedTenant}</strong> • All actions logged as Service Provider</span>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 text-xs px-3 bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
            onClick={() => { stopImpersonation(); navigate("/admin"); }}
          >
            Exit Impersonation
          </Button>
        </div>
      )}

      {/* Top Nav — full width: logo | centered primary nav | utilities + user */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-14 w-full items-center justify-between gap-4 px-6">
          <Link
            to="/overview"
            className="flex shrink-0 items-center gap-1.5 font-bold text-lg text-foreground"
          >
            <Zap className="h-icon-20 w-icon-20 text-primary fill-primary" aria-hidden />
            <span>booster</span>
          </Link>

          <nav
            className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2"
            aria-label="Primary"
          >
            {primaryNavItems.map((item) => {
              const isActive = pathname.startsWith(item.path) || item.alsoActive.some((p) => pathname.startsWith(p));
              const linkEl = (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-2 text-body-sm font-medium transition-colors ease-standard",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <item.icon className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
              if (item.tooltip) {
                return (
                  <TooltipProvider key={item.path} delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-56 text-caption">
                        {item.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return linkEl;
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
              <DropdownMenuContent align="end" className="w-56 p-0">
                <div className="flex items-center justify-between gap-3 border-b px-3 py-2">
                  <span className="text-caption text-foreground/75">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="border-b p-1">
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <User className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/help")}>
                    <HelpCircle className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dev/components")}>
                    <LayoutGrid className="mr-2 h-icon-16 w-icon-16" aria-hidden />
                    Components
                  </DropdownMenuItem>
                  {user?.isAdmin && !isImpersonating && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
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

      {/* Impersonation watermark */}
      {isImpersonating && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center opacity-4">
          <span className="text-9xl font-black -rotate-12 text-destructive select-none">
            IMPERSONATION
          </span>
        </div>
      )}

      {/* Main Content — relative so routes (e.g. component labs) can fill with absolute inset-0 */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
