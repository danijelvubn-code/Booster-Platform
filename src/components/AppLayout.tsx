import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Box,
  Sparkles,
  Eye,
  Lightbulb,
  HelpCircle,
  LogOut,
  Zap,
  User,
  ChevronDown,
  Bell,
  AlertTriangle,
  Info,
  Gift,
  X,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: "warning" | "info" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    type: "warning",
    title: "Credits expiring soon",
    message: "830,000 token credits expire in 12 days. Use them or contact support to extend.",
    time: "2h ago",
    read: false,
  },
  {
    id: "n2",
    type: "warning",
    title: "Budget threshold reached",
    message: "Customer Support Bot has exceeded 85% of its monthly budget allocation.",
    time: "5h ago",
    read: false,
  },
  {
    id: "n3",
    type: "promo",
    title: "Free shadow deployment trial",
    message: "Deploy any recommendation in Shadow mode and monitor for 15 days at no extra cost.",
    time: "1d ago",
    read: false,
  },
  {
    id: "n4",
    type: "info",
    title: "New model available",
    message: "GPT-4o Turbo (2025-01) is now available in Model Cosmos with improved reasoning scores.",
    time: "2d ago",
    read: true,
  },
  {
    id: "n5",
    type: "info",
    title: "Scheduled maintenance",
    message: "EU-West region will undergo maintenance on Feb 20, 02:00–04:00 UTC. Expect brief latency spikes.",
    time: "3d ago",
    read: true,
  },
  {
    id: "n6",
    type: "info",
    title: "Data privacy commitment",
    message: "Your input data and model responses are never used to train our models and will not be shared with other users or third parties.",
    time: "Pinned",
    read: false,
  },
];

const notifIcon = {
  warning: AlertTriangle,
  info: Info,
  promo: Gift,
};

const notifColor = {
  warning: "text-warning",
  info: "text-info",
  promo: "text-primary",
};

const navItems = [
  { label: "Overview", path: "/overview", icon: LayoutDashboard, alsoActive: [] as string[], tooltip: "" },
  { label: "Inference Endpoints", path: "/endpoints", icon: Box, alsoActive: ["/deploy", "/logs", "/playground"], tooltip: "" },
  { label: "Model Cosmos", path: "/cosmos", icon: Sparkles, alsoActive: [] as string[], tooltip: "Your model library — browse, compare & deploy models" },
  { label: "Observe", path: "/observe", icon: Eye, alsoActive: [] as string[], tooltip: "" },
  { label: "Recommendations", path: "/recommendations", icon: Lightbulb, alsoActive: [] as string[], tooltip: "" },
  { label: "Help", path: "/help", icon: HelpCircle, alsoActive: [] as string[], tooltip: "" },
];

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isImpersonating, impersonatedTenant, logout, stopImpersonation } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Impersonation banner */}
      {isImpersonating && (
        <div className="bg-destructive text-destructive-foreground flex items-center justify-center gap-3 py-2 text-sm font-medium tracking-wide">
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

      {/* Top Nav */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/overview" className="flex items-center gap-1.5 font-bold text-lg mr-8">
            <Zap className="h-5 w-5 text-primary fill-primary" />
            <span className="text-foreground">booster</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.path) || item.alsoActive.some((p) => pathname.startsWith(p));
              const linkEl = (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
              if (item.tooltip) {
                return (
                  <TooltipProvider key={item.path} delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs max-w-[200px]">
                        {item.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return linkEl;
            })}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />


          {/* User area */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{user?.name}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/account")}>
                <User className="h-4 w-4 mr-2" />
                Account
              </DropdownMenuItem>
              {user?.isAdmin && !isImpersonating && (
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Console
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Impersonation watermark */}
      {isImpersonating && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center opacity-[0.03]">
          <span className="text-[120px] font-black rotate-[-30deg] text-destructive select-none">
            IMPERSONATION
          </span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
