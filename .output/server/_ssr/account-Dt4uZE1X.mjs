import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as CardGrid, S as StatCard, T as TokenUsageSection } from "./TokenUsageSection-DhlU4_eG.mjs";
import { P as PageContainer } from "./PageContainer-CazM7ltn.mjs";
import { P as PageHeader } from "./PageHeader-Be83zSdl.mjs";
import { B as Button } from "./button-DCHwUidX.mjs";
import { C as Card, a as CardContent } from "./card-2jMQWmXc.mjs";
import { u as useAuth } from "./use-auth-ChI1tgha.mjs";
import "./router-D-bBPX7r.mjs";
import "./icon-box-Bmy30hjT.mjs";
import { Z as Zap, x as Calendar, y as Mail } from "../_libs/lucide-react.mjs";
import "./formatters-Dwm0__Q6.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
const SUPPORT_EMAIL = "support@booster.x";
function formatMediumDate(isoDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(/* @__PURE__ */ new Date(`${isoDate}T12:00:00`));
}
function RouteComponent() {
  const {
    user
  } = useAuth();
  const displayName = user?.name ?? "My Account";
  const accountStartDate = user?.accountStartDate ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const accountStartLabel = formatMediumDate(accountStartDate);
  const plan = user?.plan ?? "Pay Per Use";
  const tokenUsage = user?.tokenUsage ?? {
    inputTokens: 0,
    outputTokens: 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageContainer, { className: "py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: displayName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardGrid, { cols: {
      xs: 1,
      sm: 2
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Zap, label: "Plan", value: plan }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Calendar, label: "Account Start", value: accountStartLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TokenUsageSection, { sinceLabel: accountStartLabel, inputTokens: tokenUsage.inputTokens, outputTokens: tokenUsage.outputTokens }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-0.5 h-icon-20 w-icon-20 shrink-0 text-muted-foreground sm:mt-0", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium text-foreground", children: "Need help?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
            "Contact ",
            SUPPORT_EMAIL
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "default", className: "w-full shrink-0 sm:w-auto", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${SUPPORT_EMAIL}`, children: "Email Support" }) })
    ] }) })
  ] }) });
}
export {
  RouteComponent as component
};
