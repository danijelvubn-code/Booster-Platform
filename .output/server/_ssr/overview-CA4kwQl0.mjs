import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CardGrid } from "./CardGrid-CAc-QW0J.mjs";
import { B as Badge } from "./badge-TVJ2MtYX.mjs";
import { B as Button } from "./button-BoQ28Ykk.mjs";
import { C as Card, a as CardContent } from "./card-CjswpSeu.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-DazgaAqC.mjs";
import { P as Progress } from "./progress-BjZARylQ.mjs";
import { e as endpoints, c as cn } from "./router-dUByybLQ.mjs";
import { P as PageContainer } from "./PageContainer-Di6eNGHA.mjs";
import { P as PageHeader } from "./PageHeader-Baz_Bnm1.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-jFMufDKA.mjs";
import { P as Plus, B as BookOpen, N as Network, h as Earth, i as Box, j as ShieldCheck, k as BadgeCheck, A as ArrowRight, l as Link2, m as Ellipsis, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const endpointTypeBadgeProps = (type) => {
  if (type === "Production")
    return { variant: "success", appearance: "ghost" };
  if (type === "POC")
    return { variant: "warning", appearance: "ghost" };
  return { variant: "secondary", appearance: "ghost" };
};
function EndpointOverviewCardBasic({
  endpoint,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: cn(
        "border border-border bg-card shadow-xs transition duration-200 ease-standard hover:border-primary/40 hover:shadow-md",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/app/endpoints/$endpointId",
          params: { endpointId: endpoint.id },
          search: { returnTo: "/app/overview", returnLabel: "Endpoints" },
          className: "flex flex-col gap-3 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Box,
                {
                  className: "mt-0.5 h-icon-20 w-icon-20 shrink-0 text-primary",
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-body-strong text-foreground", children: endpoint.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link2,
                {
                  className: "h-icon-16 w-icon-16 shrink-0 text-muted-foreground",
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 truncate text-body-sm text-muted-foreground", children: endpoint.endpoint })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Model:" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: endpoint.defaultDeployment ? "text-foreground/75" : "text-muted-foreground",
                  children: endpoint.defaultDeployment || "—"
                }
              )
            ] })
          ]
        }
      ) })
    }
  );
}
function EndpointOverviewCardFull({
  endpoint,
  className,
  onDelete
}) {
  const typeProps = endpointTypeBadgeProps(endpoint.type);
  const progressValue = Math.min(endpoint.budgetUsed, 100);
  const overBudget = endpoint.budgetUsed > 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: cn(
        "border border-border bg-card shadow-xs transition duration-200 ease-standard hover:border-primary/40 hover:shadow-md",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col gap-4 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/app/endpoints/$endpointId",
            params: { endpointId: endpoint.id },
            search: { returnTo: "/app/overview", returnLabel: "Endpoints" },
            className: "flex min-w-0 flex-1 flex-col gap-4 text-left outline-none ring-offset-background focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-strong text-foreground", children: endpoint.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: typeProps.variant,
                      appearance: typeProps.appearance,
                      size: "24",
                      className: "rounded-md border-0",
                      children: endpoint.type
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-start gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link2,
                    {
                      className: "mt-0.5 h-icon-16 w-icon-16 shrink-0 text-muted-foreground",
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-body-sm text-muted-foreground", children: endpoint.endpoint })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    appearance: "ghost",
                    size: "24",
                    className: "rounded-md",
                    leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Box,
                      {
                        className: "h-icon-16 w-icon-16 text-muted-foreground",
                        "aria-hidden": true
                      }
                    ),
                    children: endpoint.defaultDeployment
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    appearance: "ghost",
                    size: "24",
                    className: "rounded-md",
                    children: [
                      "In: ",
                      endpoint.inputTokens.toLocaleString()
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    appearance: "ghost",
                    size: "24",
                    className: "rounded-md",
                    children: [
                      "Out: ",
                      endpoint.outputTokens.toLocaleString()
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2 text-body-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "Budget: ",
                    endpoint.monthlyBudgetEur.toLocaleString(),
                    " € / month"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn(
                        "text-body-sm-strong",
                        overBudget ? "text-destructive" : "text-foreground"
                      ),
                      children: [
                        endpoint.budgetUsed,
                        "% used"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressValue, tone: "ramp" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon-sm",
              className: "relative z-10 shrink-0",
              "aria-label": `Actions for ${endpoint.name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-icon-16 w-icon-16", "aria-hidden": true })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app/endpoints/$endpointId",
                params: { endpointId: endpoint.id },
                search: {
                  returnTo: "/app/overview",
                  returnLabel: "Endpoints"
                },
                children: "View endpoint"
              }
            ) }),
            onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: "text-destructive focus:text-destructive",
                  onClick: () => onDelete(endpoint.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-icon-16 w-icon-16", "aria-hidden": true }),
                    "Delete endpoint"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }) })
    }
  );
}
function EndpointOverviewCard({
  endpoint,
  className,
  variant = "full",
  onDelete
}) {
  if (variant === "basic") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointOverviewCardBasic, { endpoint, className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EndpointOverviewCardFull,
    {
      endpoint,
      className,
      onDelete
    }
  );
}
function OnboardingRow({
  to,
  icon: Icon,
  title,
  description,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      onClick: onNavigate,
      className: cn(
        "flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card py-2 pl-2 pr-3 shadow-xs",
        "transition-colors ease-standard hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md bg-primary/40 text-primary shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-24 w-icon-24", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-body-sm leading-normal text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-body-sm leading-normal text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex h-icon-40 w-icon-40 shrink-0 items-center justify-center rounded-md text-primary",
            "aria-hidden": true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-icon-24 w-icon-24" })
          }
        )
      ]
    }
  );
}
const ONBOARDING_DISMISSED_KEY = "booster:onboarding-dismissed";
const OnboardingModal = () => {
  const [isOpen, setIsOpen] = reactExports.useState(() => {
    try {
      return localStorage.getItem(ONBOARDING_DISMISSED_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const dismissOnboarding = () => {
    try {
      localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
    } catch {
    }
    setIsOpen(false);
  };
  const organizationPath = "/app/overview";
  const endpointsPath = "/app/endpoints";
  const cosmosPath = "/app/cosmos";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (next) => !next && dismissOnboarding(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "flex max-h-screen max-w-modal-lg flex-col gap-0 overflow-hidden bg-background p-0 shadow-lg sm:rounded-xl [&>button]:hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "space-y-2 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-h2 font-bold leading-snug tracking-tight text-foreground", children: "Welcome to the booster" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-body-sm leading-normal text-muted-foreground normal-case", children: "Here's a quick overview to get you started." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnboardingRow,
          {
            to: organizationPath,
            icon: BookOpen,
            title: "Organization",
            description: "Your shared workspace where users collaborate and usage is managed",
            onNavigate: dismissOnboarding
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnboardingRow,
          {
            to: endpointsPath,
            icon: Network,
            title: "Endpoints",
            description: "Isolated workloads with stable API URL",
            onNavigate: dismissOnboarding
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnboardingRow,
          {
            to: cosmosPath,
            icon: Earth,
            title: "Model Cosmos",
            description: "Browse and compare models before assigning them to endpoints",
            onNavigate: dismissOnboarding
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OnboardingRow,
          {
            to: cosmosPath,
            icon: Box,
            title: "Models",
            description: "Model versions assigned to an endpoint",
            onNavigate: dismissOnboarding
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm leading-relaxed text-foreground", children: "Browse available models in Model Cosmos — your model library. Each Inference Endpoint has one stable URL. The Default model serves all live traffic. Your input data and model responses are never used to train our models and will not be shared with other users or third parties." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-muted px-4 py-3 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShieldCheck,
          {
            className: "mt-0.5 h-icon-16 w-icon-16 shrink-0 text-primary",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 text-body-sm leading-relaxed text-foreground", children: "Your input data and model responses are never used to train our models and will not be shared with other users or third parties." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BadgeCheck,
          {
            className: "mt-0.5 h-icon-16 w-icon-16 shrink-0 text-success",
            "aria-hidden": true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-border bg-background p-8 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "default",
        size: "lg",
        className: "w-full rounded-lg bg-primary font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary",
        onClick: () => dismissOnboarding(),
        children: "Got it, let's go!"
      }
    ) })
  ] }) });
};
const overviewEndpoints = [...endpoints].filter((e) => e.id !== "sp-default").sort((a, b) => b.budgetUsed - a.budgetUsed).slice(0, 4);
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { className: "pt-6 pb-6", gap: "gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Overview", description: "Monitor your endpoints and model inference activity across the platform.", descriptionMaxWidthPageIntro: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { titleSize: "overview", breakAt: "md", introClassName: "max-w-3xl", title: "Endpoints", description: "View and manage the stable API endpoints your applications use for model inference.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "shrink-0", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/endpoints/create_endpoint", search: {
          model: ""
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-icon-16 w-icon-16", "aria-hidden": true }),
          "Create Endpoint"
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrid, { cols: {
          xs: 1,
          md: 2
        }, children: overviewEndpoints.map((endpoint) => /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointOverviewCard, { endpoint, variant: "basic" }, endpoint.id)) })
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
