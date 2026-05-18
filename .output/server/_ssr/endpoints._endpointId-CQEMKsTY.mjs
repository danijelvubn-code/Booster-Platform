import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { B as BackButton } from "./BackButton-BsTv_cee.mjs";
import { g as getModelProviderLogoSrc, a as getProviderInitials, A as Avatar, b as AvatarImage, c as AvatarFallback } from "./model-provider-logos-CnTBcjZI.mjs";
import { e as endpoints, i as deployments, m as models, B as Badge } from "./mockData-CaVm0p_Q.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { C as Card, a as CardContent } from "./card-D8-7PCfA.mjs";
import { I as IconBox } from "./icon-box-hWRXeUTk.mjs";
import { a as formatTokens } from "./formatters-Dwm0__Q6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as Route$4 } from "./router-D2WQTUn2.mjs";
import { i as Box, J as Copy, K as Settings } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./public-asset-url-539yhzQl.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
const toastMessages = {
  // Success messages
  created: (itemName, itemType = "Item") => toast.success(`${itemType} Created`, {
    description: `"${itemName}" has been created successfully.`
  }),
  updated: (itemName, itemType = "Item") => toast.success(`${itemType} Updated`, {
    description: `"${itemName}" has been updated successfully.`
  }),
  deleted: (itemName, itemType = "Item") => toast.success(`${itemType} Deleted`, {
    description: `"${itemName}" has been removed.`
  }),
  saved: (itemName) => toast.success("Saved", {
    description: `"${itemName}" has been saved.`
  }),
  // Error messages
  error: (message, title = "Error") => toast.error(title, {
    description: message
  }),
  // Info messages
  copied: (label = "Content") => toast.success(`${label} Copied`, {
    description: "Copied to clipboard."
  }),
  // Generic success
  success: (message, description) => toast.success(message, description ? { description } : void 0)
};
function UnderlyingModelSummary({
  model,
  endpointId,
  endpointName
}) {
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  const providerInitials = getProviderInitials(model.provider);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "!h-8 !w-8 rounded-lg", children: [
        providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: providerLogoSrc, alt: "", className: "!h-8 !w-8 object-contain" }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-lg text-label", children: providerInitials })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/cosmos/$modelId", params: {
        modelId: model.id
      }, search: {
        returnTo: `/app/endpoints/${endpointId}`,
        returnLabel: endpointName
      }, className: "text-[20px] font-bold leading-7 tracking-tight text-foreground transition-colors ease-standard hover:text-primary", children: model.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", appearance: "pill", size: "28", className: "font-normal", children: "LLM" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[600px] text-body-sm text-hierarchy-muted", children: model.description })
  ] });
}
function RouteComponent() {
  const {
    endpointId
  } = Route$4.useParams();
  const {
    returnTo,
    returnLabel
  } = Route$4.useSearch();
  const location = useLocation();
  const endpoint = endpoints.find((s) => s.id === endpointId);
  const deploymentList = deployments[endpointId] ?? [];
  const defaultDeployment = deploymentList.find((d) => d.mode === "Default") ?? deploymentList[0];
  const underlyingModel = models.find((model) => model.name === defaultDeployment?.model && model.version === defaultDeployment?.version) ?? models.find((model) => model.name === defaultDeployment?.model) ?? null;
  if (!endpoint) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground", children: "Inference Endpoint not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/overview", children: "← Back to Inference Endpoints" }) })
    ] });
  }
  if (location.pathname !== `/app/endpoints/${endpointId}`) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(endpoint.endpoint).then(() => toastMessages.copied("Endpoint URL")).catch(() => toastMessages.error("Could not copy endpoint URL."));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container space-y-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { to: returnTo, label: `Back to ${returnLabel}`, className: "ml-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xxxlg", shape: "square", className: "bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "text-primary", "aria-hidden": true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: endpoint.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-hierarchy-secondary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 break-all font-mono text-body-sm", children: endpoint.endpoint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon-sm", className: "h-7 w-7 shrink-0 text-hierarchy-secondary hover:text-foreground", "aria-label": "Copy endpoint URL", onClick: handleCopyEndpoint, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", "aria-hidden": true }) })
            ] }),
            endpoint.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-body text-hierarchy-secondary", children: endpoint.description }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app/endpoints/$endpointId/settings", params: {
            endpointId: endpoint.id
          }, search: {
            returnTo,
            returnLabel
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "mr-2 h-icon-16 w-icon-16", "aria-hidden": true }),
            "Settings"
          ] }) }) })
        ] }),
        underlyingModel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/80", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(UnderlyingModelSummary, { model: underlyingModel, endpointId: endpoint.id, endpointName: endpoint.name })
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-h1 font-bold tabular-nums text-foreground", children: formatTokens(endpoint.inputTokens) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-medium text-muted-foreground", children: "INPUT TOKENS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Tokens sent to the model" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-h1 font-bold tabular-nums text-foreground", children: formatTokens(endpoint.outputTokens) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-medium text-muted-foreground", children: "OUTPUT TOKENS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Tokens generated by the model" })
      ] }) }) })
    ] })
  ] });
}
export {
  RouteComponent as component
};
