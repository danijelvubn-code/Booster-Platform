import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, u as useLocation, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BoosterLogo } from "./BoosterLogo-m5XAPojx.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DD7MC06r.mjs";
import { c as cn, T as TooltipProvider, a as Tooltip, b as TooltipTrigger, d as TooltipContent } from "./router-D2WQTUn2.mjs";
import { u as useAuth } from "./use-auth-DX7T230Q.mjs";
import { L as LayoutDashboard, S as Sparkles, E as Eye, W as WandSparkles, U as User, C as ChevronDown, a as CircleQuestionMark, b as LogOut, c as Sun, M as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./public-asset-url-539yhzQl.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
function getInitialMode() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "auto")
    return stored;
  return "light";
}
function applyThemeMode(mode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? prefersDark ? "dark" : "light" : mode;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
  document.documentElement.style.colorScheme = resolved;
}
function useTheme() {
  const [mode, setMode] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);
  function setTheme(nextMode) {
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem("theme", nextMode);
  }
  return { mode, setTheme };
}
function ThemeToggle() {
  const { mode, setTheme } = useTheme();
  const toggleTheme = () => {
    if (mode === "light") {
      setTheme("dark");
    } else if (mode === "dark") {
      setTheme("auto");
    } else {
      setTheme("light");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      className: "h-8 w-8 p-0",
      onClick: toggleTheme,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
const POST_MVP_NAV_PREFIX_COMBINED = "/mvp/post-mvp";
function postMvpPath(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${POST_MVP_NAV_PREFIX_COMBINED}${p}`;
}
const primaryNavItems = [
  {
    label: "Overview",
    path: "/overview",
    icon: LayoutDashboard,
    alsoActive: [],
    tooltip: ""
  },
  {
    label: "Cosmos",
    path: "/cosmos",
    icon: Sparkles,
    alsoActive: [],
    tooltip: "Your model library — browse, compare & deploy models"
  },
  {
    label: "Observe",
    path: "/observe",
    icon: Eye,
    alsoActive: [],
    tooltip: ""
  },
  {
    label: "Optimize",
    path: "/optimize",
    icon: WandSparkles,
    alsoActive: [],
    tooltip: ""
  }
];
const PRIMARY_NAV_TOOLTIP_DELAY_MS = 1e3;
function AppHeader({
  position = "sticky",
  logoHref = postMvpPath("/overview"),
  comingSoonPaths,
  excludeNavPaths,
  navPathPrefix = ""
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const pathname = location.pathname;
  const toNavPath = (path) => `${navPathPrefix}${path}`;
  const navItems = excludeNavPaths?.length ? primaryNavItems.filter((item) => !excludeNavPaths.includes(item.path)) : primaryNavItems;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: cn(
        "z-50 w-full border-b border-border bg-card",
        position === "sticky" ? "sticky top-0" : "static"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 w-full items-center justify-between gap-4 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: logoHref,
            className: "flex shrink-0 items-center gap-1.5 rounded-md outline-none ring-offset-background transition-colors ease-standard focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "aria-label": "Booster home",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              BoosterLogo,
              {
                variant: "lockup",
                tone: "on-light",
                size: "sm",
                presentation: true,
                className: "h-icon-40"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: "flex h-14 min-w-0 flex-1 flex-wrap items-center justify-center gap-2",
            "aria-label": "Primary",
            children: navItems.map((item) => {
              const itemHref = toNavPath(item.path);
              const isActive = pathname.startsWith(itemHref) || item.alsoActive.some((p) => pathname.startsWith(toNavPath(p)));
              const isSoon = comingSoonPaths?.includes(item.path) ?? false;
              const soonPill = isSoon ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-label": "Coming soon",
                  className: "ml-0.5 rounded-md border border-border px-1.5 py-0.5 text-caption font-medium uppercase tracking-wide text-hierarchy-muted",
                  children: "Soon"
                },
                "soon-pill"
              ) : null;
              const labelGroup = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  item.icon,
                  {
                    className: "h-icon-16 w-icon-16 shrink-0",
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: item.label }),
                soonPill
              ] });
              const itemEl = isSoon ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-disabled": "true",
                  className: cn(
                    "flex h-14 cursor-not-allowed items-center gap-1.5 px-3 text-body-sm font-medium",
                    "text-hierarchy-disabled"
                  ),
                  children: labelGroup
                },
                item.path
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: itemHref,
                  className: cn(
                    "app-header-nav-underline-host relative flex h-14 items-center gap-1.5 px-3 text-body-sm font-medium",
                    "outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "after:pointer-events-none after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-150 after:ease-linear",
                    isActive ? "text-primary after:scale-x-100" : "text-hierarchy-secondary transition-colors hover:text-primary"
                  ),
                  children: labelGroup
                },
                item.path
              );
              const tooltipText = isSoon ? "Coming soon" : item.tooltip;
              if (tooltipText) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TooltipProvider,
                  {
                    delayDuration: PRIMARY_NAV_TOOLTIP_DELAY_MS,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: itemEl }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TooltipContent,
                        {
                          side: "bottom",
                          className: "max-w-56 text-caption",
                          children: tooltipText
                        }
                      )
                    ] })
                  },
                  item.path
                );
              }
              return itemEl;
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-icon-16 w-icon-16 shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden max-w-40 truncate md:inline", children: user?.name ?? "User Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                className: "h-icon-16 w-icon-16 shrink-0 text-foreground/50",
                "aria-hidden": true
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "min-w-60 p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption text-foreground/75", children: "Theme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b p-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => navigate({ to: "/app/account" }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-2 h-icon-16 w-icon-16", "aria-hidden": true }),
                    "Account"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleQuestionMark,
                  {
                    className: "mr-2 h-icon-16 w-icon-16",
                    "aria-hidden": true
                  }
                ),
                "Help"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: logout,
                className: "text-destructive focus:text-destructive",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-icon-16 w-icon-16", "aria-hidden": true }),
                  "Sign out"
                ]
              }
            ) })
          ] })
        ] }) })
      ] })
    }
  );
}
function AppLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mvp-shell flex min-h-0 flex-1 flex-col overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppHeader,
      {
        logoHref: "/app/overview",
        navPathPrefix: "/app",
        comingSoonPaths: ["/observe", "/optimize"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative flex min-h-0 flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
const SplitComponent = AppLayout;
export {
  SplitComponent as component
};
