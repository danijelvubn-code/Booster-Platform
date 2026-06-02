import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { B as BackButton } from "./BackButton-BporfUnx.mjs";
import { g as getPaginationWindow, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectedFilterChips } from "./SelectedFilterChips-CGzwX_Oc.mjs";
import { B as Button } from "./button-DCHwUidX.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-2jMQWmXc.mjs";
import { L as Label } from "./input-CMl7xTE1.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DwSOW1EH.mjs";
import { D as Route$4, e as endpoints, p as deployments, m as models, c as cn, B as endpointRequestLogs, C as apiKeys } from "./router-D-bBPX7r.mjs";
import { a as formatTokens } from "./formatters-Dwm0__Q6.mjs";
import { P as PageContainer } from "./PageContainer-CazM7ltn.mjs";
import { g as getModelProviderLogoSrc, a as getProviderInitials, A as Avatar, b as AvatarImage, c as AvatarFallback } from "./model-provider-logos-CIQpQjcf.mjs";
import { B as Badge } from "./badge-bkIpVg5q.mjs";
import { I as IconBox } from "./icon-box-Bmy30hjT.mjs";
import { E as EndpointStatusBadge } from "./EndpointStatusBadge-DCEUQvqn.mjs";
import { r as resolveEndpointStatus } from "./endpoint-status-CLlA8IN0.mjs";
import { t as toast } from "./sonner-C3D2Kk0w.mjs";
import "../_libs/sonner.mjs";
import { H as RefreshCw, o as Check, J as Copy, K as Settings } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
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
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./public-asset-url-539yhzQl.mjs";
const TIME_RANGE_MS = {
  "24h": 24 * 60 * 60 * 1e3,
  "7d": 7 * 24 * 60 * 60 * 1e3,
  "30d": 30 * 24 * 60 * 60 * 1e3
};
function matchesProcessingTimeFilter(latencyMs, filter) {
  switch (filter) {
    case "under_500":
      return latencyMs < 500;
    case "500_to_1000":
      return latencyMs >= 500 && latencyMs < 1e3;
    case "over_1000":
      return latencyMs >= 1e3;
    default:
      return true;
  }
}
function filterEndpointRequestLogs(rows, {
  timeRange,
  processingTime,
  apiKeyId
}, now = Date.now()) {
  return rows.filter((row) => {
    if (apiKeyId !== "all" && row.apiKeyId !== apiKeyId) return false;
    if (!matchesProcessingTimeFilter(row.latencyMs, processingTime)) {
      return false;
    }
    if (timeRange === "all") return true;
    const cutoff = now - TIME_RANGE_MS[timeRange];
    return new Date(row.timestamp).getTime() >= cutoff;
  });
}
function formatRequestLogTimestamp(iso) {
  try {
    return new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
function formatProcessingTime(ms) {
  if (ms >= 1e3) return `${(ms / 1e3).toFixed(1)} s`;
  return `${ms} ms`;
}
const REQUEST_LOGS_PAGE_SIZE = 20;
const TIME_RANGE_OPTIONS = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "all", label: "All time" }
];
const PROCESSING_TIME_OPTIONS = [
  { value: "all", label: "Any processing time" },
  { value: "under_500", label: "Under 500 ms" },
  { value: "500_to_1000", label: "500 ms – 1 s" },
  { value: "over_1000", label: "Over 1 s" }
];
const DEFAULT_TIME_RANGE = "7d";
const DEFAULT_PROCESSING_TIME = "all";
function getTimeRangeLabel(value) {
  return TIME_RANGE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
function getProcessingTimeLabel(value) {
  return PROCESSING_TIME_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
function getApiKeyName(apiKeyId) {
  return apiKeys.find((key) => key.id === apiKeyId)?.name ?? apiKeyId;
}
function RequestLogsEmptyState({
  message,
  onClearFilters
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-6 mb-6 rounded-lg border border-dashed border-border bg-muted/20 px-6 py-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: message }),
    onClearFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "mt-4",
        onClick: onClearFilters,
        children: "Clear filters"
      }
    ) : null
  ] });
}
function EndpointRequestLogsSection({
  endpointId
}) {
  const rows = endpointRequestLogs[endpointId] ?? [];
  const [timeRange, setTimeRange] = reactExports.useState(DEFAULT_TIME_RANGE);
  const [processingTime, setProcessingTime] = reactExports.useState(DEFAULT_PROCESSING_TIME);
  const [apiKeyId, setApiKeyId] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  reactExports.useEffect(() => {
    setTimeRange(DEFAULT_TIME_RANGE);
    setProcessingTime(DEFAULT_PROCESSING_TIME);
    setApiKeyId("all");
    setPage(1);
  }, [endpointId]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [timeRange, processingTime, apiKeyId]);
  const apiKeyOptions = reactExports.useMemo(() => {
    const ids = [...new Set(rows.map((row) => row.apiKeyId))];
    return ids.map((id) => ({ id, name: getApiKeyName(id) }));
  }, [rows]);
  const filteredRows = reactExports.useMemo(() => {
    const filtered = filterEndpointRequestLogs(rows, {
      timeRange,
      processingTime,
      apiKeyId
    });
    return filtered.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [rows, timeRange, processingTime, apiKeyId]);
  const pagination = getPaginationWindow(
    filteredRows.length,
    page,
    REQUEST_LOGS_PAGE_SIZE
  );
  const paginatedRows = filteredRows.slice(
    pagination.startIndex,
    pagination.endIndexExclusive
  );
  const { safePage, totalPages } = pagination;
  const hasActiveFilters = timeRange !== DEFAULT_TIME_RANGE || processingTime !== DEFAULT_PROCESSING_TIME || apiKeyId !== "all";
  const activeFilterChips = reactExports.useMemo(() => {
    const chips = [];
    if (timeRange !== DEFAULT_TIME_RANGE) {
      chips.push({
        key: "time-range",
        label: getTimeRangeLabel(timeRange),
        onRemove: () => setTimeRange(DEFAULT_TIME_RANGE)
      });
    }
    if (processingTime !== DEFAULT_PROCESSING_TIME) {
      chips.push({
        key: "processing-time",
        label: getProcessingTimeLabel(processingTime),
        onRemove: () => setProcessingTime(DEFAULT_PROCESSING_TIME)
      });
    }
    if (apiKeyId !== "all") {
      chips.push({
        key: "api-key",
        label: getApiKeyName(apiKeyId),
        onRemove: () => setApiKeyId("all")
      });
    }
    return chips;
  }, [timeRange, processingTime, apiKeyId]);
  const clearFilters = () => {
    setTimeRange(DEFAULT_TIME_RANGE);
    setProcessingTime(DEFAULT_PROCESSING_TIME);
    setApiKeyId("all");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-h3", children: "Request logs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Request-level logs for this endpoint. Prompt and response content are not shown." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4 px-0 pb-6 pt-0", children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(RequestLogsEmptyState, { message: "No request logs are available for this endpoint yet. Traffic will appear here once calls are made." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 px-6 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "request-log-time-range", children: "Time range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: timeRange,
              onValueChange: (value) => setTimeRange(value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "request-log-time-range", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_RANGE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "request-log-processing-time", children: "Processing time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: processingTime,
              onValueChange: (value) => setProcessingTime(value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "request-log-processing-time", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PROCESSING_TIME_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "request-log-api-key", children: "API key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: apiKeyId,
              onValueChange: setApiKeyId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "request-log-api-key", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All API keys" }),
                  apiKeyOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.id, children: option.name }, option.id))
                ] })
              ]
            }
          )
        ] })
      ] }),
      hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectedFilterChips,
        {
          chips: activeFilterChips,
          onClearAll: clearFilters
        }
      ) }) : null,
      filteredRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        RequestLogsEmptyState,
        {
          message: hasActiveFilters ? "No request logs match the selected filters." : "No request logs are available for this endpoint yet.",
          onClearFilters: hasActiveFilters ? clearFilters : void 0
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Table,
          {
            size: "sm",
            containerClassName: "overflow-x-auto px-0",
            className: "[&_tr]:h-control-md [&_th]:h-control-md [&_th]:py-0 [&_td]:h-control-md [&_td]:py-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "whitespace-nowrap pl-6", children: "Request timestamp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "whitespace-nowrap", children: "API key" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "whitespace-nowrap text-right", children: "Processing time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "whitespace-nowrap text-right", children: "Input tokens" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "whitespace-nowrap pr-6 text-right", children: "Output tokens" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: paginatedRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-foreground/4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap pl-6 tabular-nums text-muted-foreground", children: formatRequestLogTimestamp(row.timestamp) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap", children: getApiKeyName(row.apiKeyId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-right tabular-nums", children: formatProcessingTime(row.latencyMs) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap text-right tabular-nums", children: formatTokens(row.inputTokens) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "whitespace-nowrap pr-6 text-right tabular-nums", children: formatTokens(row.outputTokens) })
              ] }, row.id)) })
            ]
          }
        ),
        filteredRows.length > REQUEST_LOGS_PAGE_SIZE ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-body-sm text-muted-foreground sm:text-left", children: [
            "Showing ",
            pagination.displayRangeStart,
            "–",
            pagination.displayRangeEnd,
            " of ",
            pagination.totalItems
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: safePage <= 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm tabular-nums text-muted-foreground", children: [
              "Page ",
              safePage,
              " of ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: safePage >= totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                children: "Next"
              }
            )
          ] })
        ] }) : null
      ] })
    ] }) })
  ] });
}
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
  const [endpointUrlCopied, setEndpointUrlCopied] = reactExports.useState(false);
  const copyResetTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);
  reactExports.useEffect(() => {
    setEndpointUrlCopied(false);
  }, [endpointId]);
  const defaultDeployment = deploymentList.find((d) => d.mode === "Default") ?? deploymentList[0];
  const underlyingModel = models.find((model) => model.name === defaultDeployment?.model && model.version === defaultDeployment?.version) ?? models.find((model) => model.name === defaultDeployment?.model) ?? null;
  if (!endpoint) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "gap-4", className: "py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body text-muted-foreground", children: "Inference Endpoint not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/overview", children: "← Back to Inference Endpoints" }) })
    ] });
  }
  if (location.pathname !== `/app/endpoints/${endpointId}`) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(endpoint.endpoint).then(() => {
      toastMessages.copied("Endpoint URL");
      setEndpointUrlCopied(true);
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
      copyResetTimerRef.current = window.setTimeout(() => {
        setEndpointUrlCopied(false);
        copyResetTimerRef.current = null;
      }, 2e3);
    }).catch(() => toastMessages.error("Could not copy endpoint URL."));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-4", className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { to: returnTo, label: `Back to ${returnLabel}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-primary-fade-shell shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xxxlg", shape: "square", className: "bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "text-primary", "aria-hidden": true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: endpoint.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointStatusBadge, { status: resolveEndpointStatus(endpoint) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-hierarchy-secondary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 break-all font-mono text-body-sm", children: endpoint.endpoint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon-sm", className: cn("h-7 w-7 shrink-0 text-hierarchy-secondary hover:text-foreground", endpointUrlCopied && "text-success hover:bg-transparent hover:text-success"), "aria-label": endpointUrlCopied ? "Endpoint URL copied" : "Copy endpoint URL", onClick: handleCopyEndpoint, children: endpointUrlCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", "aria-hidden": true }) })
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
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-h1 font-bold tabular-nums text-foreground", children: formatTokens(endpoint.inputTokens) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-medium text-muted-foreground", children: "INPUT TOKENS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Tokens sent to the model" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-h1 font-bold tabular-nums text-foreground", children: formatTokens(endpoint.outputTokens) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption font-medium text-muted-foreground", children: "OUTPUT TOKENS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-hierarchy-secondary", children: "Tokens generated by the model" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointRequestLogsSection, { endpointId: endpoint.id })
  ] });
}
export {
  RouteComponent as component
};
