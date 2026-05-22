import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as Sheet, A as AppSideSheetContent } from "./AppSideSheet-B3GceMgW.mjs";
import { M as ModelCosmosCard } from "./ModelCosmosCard-CyJGfZ9B.mjs";
import { B as Button } from "./button-BoQ28Ykk.mjs";
import { I as Input } from "./input-CTo6zooE.mjs";
import { t as Route$5, m as models, u as getProviderOptions, h as getOverallModelScore, v as getModelModalityLabel, a as Tooltip, b as TooltipTrigger, d as TooltipContent, c as cn, w as overallScoreTextClass, e as endpoints, s as deployments, q as getParamSizeLabel } from "./router-dUByybLQ.mjs";
import { W as WizardStepper, B as BasicSetupStep, P as ProviderSelectionStep, R as ReviewStep } from "./WizardStepper-T4Ognsee.mjs";
import { P as PageHeader } from "./PageHeader-Baz_Bnm1.mjs";
import { g as getModelProviderLogoSrc, a as getProviderInitials, A as Avatar, b as AvatarImage, c as AvatarFallback } from "./model-provider-logos-DIoDvw6k.mjs";
import { B as Badge } from "./badge-TVJ2MtYX.mjs";
import { C as Card } from "./card-CjswpSeu.mjs";
import { t as toast } from "./sonner-C3D2Kk0w.mjs";
import "./select-oURvK7AO.mjs";
import "./table-CQL6aQHO.mjs";
import "../_libs/sonner.mjs";
import { q as ArrowLeft, A as ArrowRight, G as Activity, R as Rocket, I as Info, F as RefreshCcw, r as Search } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./public-asset-url-539yhzQl.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const PAGE_SIZE = 16;
function EndpointModelSelectSheet({
  open,
  onOpenChange,
  models: models2,
  initialSelectedModelId = null,
  onConfirm
}) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [pendingId, setPendingId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const seed = initialSelectedModelId && models2.some((m) => m.id === initialSelectedModelId) ? initialSelectedModelId : null;
    setPendingId(seed);
    setPage(1);
    setSearchQuery("");
  }, [open, initialSelectedModelId, models2]);
  const filtered = reactExports.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return models2;
    return models2.filter(
      (m) => m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q) || m.domain.toLowerCase().includes(q)
    );
  }, [models2, searchQuery]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageSlice = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  reactExports.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppSideSheetContent,
    {
      title: "Select Model",
      description: "Search and choose a model to attach to this inference endpoint.",
      toolbar: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "pointer-events-none absolute left-3 top-1/2 h-icon-16 w-icon-16 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search models…",
            value: searchQuery,
            onChange: (e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            },
            className: "h-control-md pl-9",
            autoComplete: "off",
            "aria-label": "Search models"
          }
        )
      ] }),
      bottomAccessory: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption text-muted-foreground", children: filtered.length === 0 ? "No models match your search." : `${filtered.length} model${filtered.length === 1 ? "" : "s"} · Page ${safePage} of ${totalPages}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
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
      ] }),
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            disabled: !pendingId,
            onClick: () => {
              if (pendingId) onConfirm(pendingId);
            },
            children: "Select Model"
          }
        )
      ] }),
      bodyClassName: "gap-3 py-4 pr-4 pl-6",
      children: pageSlice.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          role: "button",
          tabIndex: 0,
          onClick: () => setPendingId(model.id),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPendingId(model.id);
            }
          },
          className: cn(
            "rounded-lg outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            pendingId === model.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModelCosmosCard,
            {
              model,
              variant: "basic",
              className: cn(
                "h-auto min-h-0 w-full cursor-pointer",
                pendingId === model.id && "border-primary"
              )
            }
          )
        },
        model.id
      ))
    }
  ) });
}
const ENDPOINT_WIZARD_STEPPER_ITEMS = [{
  id: "basic",
  label: "Basic"
}, {
  id: "provider",
  label: "Model Provider"
}, {
  id: "review",
  label: "Review & Deploy"
}];
function formatEurPer1M(value) {
  return `€${value.toFixed(2)} / 1M`;
}
function pickCheapestProviderOption(providers) {
  if (providers.length === 0) return null;
  return providers.reduce((best, p) => {
    const sum = p.inputPer1M + p.outputPer1M;
    const bestSum = best.inputPer1M + best.outputPer1M;
    if (sum !== bestSum) return sum < bestSum ? p : best;
    if (p.inputPer1M !== best.inputPer1M) return p.inputPer1M < best.inputPer1M ? p : best;
    return p.outputPer1M < best.outputPer1M ? p : best;
  });
}
const MISSING_VALUE_PLACEHOLDER = "- -";
function getModelDetailParameterCount(model) {
  const explicitParam = getParamSizeLabel(model.name) ?? getParamSizeLabel(model.description);
  if (explicitParam) {
    return Number.parseFloat(explicitParam.replace("B", "")) * 1e9;
  }
  const haystack = `${model.name} ${model.domain} ${model.category}`.toLowerCase();
  if (haystack.includes("mistral large")) return 123e9;
  if (haystack.includes("codestral")) return 22e9;
  if (haystack.includes("deepseek")) return 671e9;
  if (haystack.includes("qwen")) return 72e9;
  if (haystack.includes("llama")) return 7e10;
  if (haystack.includes("code")) return 22e9;
  if (haystack.includes("enterprise")) return 72e9;
  return 32e9;
}
function formatDetailParameters(parameters) {
  if (!parameters) return MISSING_VALUE_PLACEHOLDER;
  if (parameters >= 1e9) {
    return `${Math.round(parameters / 1e9)}B`;
  }
  if (parameters >= 1e6) return `${Math.round(parameters / 1e6)}M`;
  return String(parameters);
}
function formatDetailContextWindow(tokens) {
  if (!tokens) return MISSING_VALUE_PLACEHOLDER;
  if (tokens >= 1e3) return `${Math.round(tokens / 1e3)}K`;
  return String(tokens);
}
function formatDetailMemory(bytes) {
  if (!bytes) return MISSING_VALUE_PLACEHOLDER;
  return `${Math.round(bytes / 1e9)} GB`;
}
function ModelSummaryRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate text-right text-body-sm text-foreground", children: value })
  ] });
}
function ModelSummarySidebarEmpty({
  onSelectModel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[240px] text-body-sm text-muted-foreground", children: "Please select the underlying model that will serve this inference endpoint." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "w-full max-w-[240px]", onClick: onSelectModel, children: "Browse models" })
    ] })
  ] }) });
}
function ModelSummarySidebar({
  model,
  providerCount,
  onSwapModel,
  inputCostPer1M,
  outputCostPer1M
}) {
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  const capabilityScore = getOverallModelScore(model);
  const parameterCount = getModelDetailParameterCount(model);
  const parameterLabel = formatDetailParameters(parameterCount);
  const minMemoryLabel = formatDetailMemory(Math.max(parameterCount * 2, 0));
  const modalityLabel = getModelModalityLabel(model);
  const providerInitials = getProviderInitials(model.provider);
  const licenseLabel = model.hosting === "Booster Powered" ? "Commercial" : "Open Source";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "min-w-0 self-start lg:col-span-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "relative flex h-full min-h-0 flex-col overflow-hidden border-primary/30 p-0 lg:flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/10 via-transparent to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-4 border-b border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-icon-40 w-icon-40 rounded-lg border border-border bg-background", children: [
          providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: providerLogoSrc, alt: "" }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-lg text-body-sm-strong", children: providerInitials })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-body-sm-strong text-foreground", children: model.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: model.provider })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: model.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", appearance: "pill", size: "24", children: model.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", appearance: "ghost", size: "24", children: modalityLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", appearance: "ghost", size: "24", children: licenseLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", appearance: "ghost", size: "24", children: [
          providerCount,
          " ",
          providerCount === 1 ? "provider" : "providers"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between gap-3 border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "Capability score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-icon-16 w-icon-16 cursor-help text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-page-intro", children: "Aggregated score from model capability benchmarks in this catalog." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-h2 leading-none tabular-nums", overallScoreTextClass(capabilityScore)), children: capabilityScore })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative divide-y divide-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummaryRow, { label: "Parameters", value: parameterLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummaryRow, { label: "Context Window", value: formatDetailContextWindow(model.contextLength) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummaryRow, { label: "Min. Memory", value: minMemoryLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummaryRow, { label: "Input Tokens", value: formatEurPer1M(inputCostPer1M) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummaryRow, { label: "Output Tokens", value: formatEurPer1M(outputCostPer1M) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-auto border-t border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", onClick: onSwapModel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "mr-1 h-icon-16 w-icon-16" }),
      " Swap Model"
    ] }) })
  ] }) });
}
function RouteComponent() {
  const navigate = useNavigate();
  const {
    model: modelFromSearch
  } = Route$5.useSearch();
  const selectedModel = reactExports.useMemo(() => {
    if (!modelFromSearch || !models.some((m) => m.id === modelFromSearch)) {
      return null;
    }
    return models.find((m) => m.id === modelFromSearch) ?? null;
  }, [modelFromSearch]);
  const [step, setStep] = reactExports.useState(0);
  const [endpointName, setEndpointName] = reactExports.useState("");
  const [endpointType] = reactExports.useState("Production");
  const [useCase, setUseCase] = reactExports.useState("");
  const [selectedPreset, setSelectedPreset] = reactExports.useState(null);
  const [providerSort, setProviderSort] = reactExports.useState("highest-throughput");
  const [selectedProviderId, setSelectedProviderId] = reactExports.useState("recommended");
  const [isDeploying, setIsDeploying] = reactExports.useState(false);
  const [modelPickerOpen, setModelPickerOpen] = reactExports.useState(false);
  const [modelPickerSeedId, setModelPickerSeedId] = reactExports.useState(null);
  const openModelPicker = (seedId) => {
    setModelPickerSeedId(seedId);
    setModelPickerOpen(true);
  };
  reactExports.useEffect(() => {
    if (!selectedModel && step > 0) {
      setStep(0);
    }
  }, [selectedModel, step]);
  const providerOptions = reactExports.useMemo(() => selectedModel ? getProviderOptions(selectedModel.id) : [], [selectedModel]);
  const selectableProviderOptions = reactExports.useMemo(() => providerOptions.filter((p) => p.id !== "model-provider-fallback"), [providerOptions]);
  const cheapestSelectableProvider = reactExports.useMemo(() => pickCheapestProviderOption(selectableProviderOptions), [selectableProviderOptions]);
  reactExports.useEffect(() => {
    if (!selectedModel?.id || !cheapestSelectableProvider) return;
    setSelectedProviderId(cheapestSelectableProvider.id);
  }, [selectedModel?.id, cheapestSelectableProvider?.id]);
  const recommendedProvider = reactExports.useMemo(() => providerOptions.find((provider) => provider.recommended) ?? providerOptions[0] ?? null, [providerOptions]);
  const selectedProvider = reactExports.useMemo(() => {
    if (!recommendedProvider) return null;
    return providerOptions.find((provider) => provider.id === selectedProviderId) ?? recommendedProvider;
  }, [providerOptions, recommendedProvider, selectedProviderId]);
  const sortedProviders = reactExports.useMemo(() => {
    const rows = [...providerOptions];
    switch (providerSort) {
      case "lowest-cost":
        rows.sort((a, b) => a.inputPer1M + a.outputPer1M - (b.inputPer1M + b.outputPer1M));
        return rows;
      case "lowest-latency":
        rows.sort((a, b) => a.latencyMs - b.latencyMs);
        return rows;
      case "highest-throughput":
        rows.sort((a, b) => b.tps - a.tps);
        return rows;
      case "largest-context":
        rows.sort((a, b) => b.contextTokens - a.contextTokens);
        return rows;
      default:
        rows.sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)));
        return rows;
    }
  }, [providerOptions, providerSort]);
  const canProceed = reactExports.useMemo(() => {
    if (!selectedModel) return false;
    if (step === 0) {
      return endpointName.trim().length > 0 && useCase.trim().length > 0;
    }
    if (step === 1) {
      return Boolean(selectedProvider);
    }
    return true;
  }, [endpointName, selectedModel, selectedProvider, step, useCase]);
  const estimatedMonthlyCost = reactExports.useMemo(() => {
    if (!selectedProvider) return "0";
    const averagePer1M = (selectedProvider.inputPer1M + selectedProvider.outputPer1M) / 2;
    return averagePer1M.toFixed(0);
  }, [selectedProvider]);
  const providerCount = selectableProviderOptions.length || 1;
  const summaryInputCostPer1M = selectedProvider?.inputPer1M ?? selectedModel?.inputCostPer1M ?? 0;
  const summaryOutputCostPer1M = selectedProvider?.outputPer1M ?? selectedModel?.outputCostPer1M ?? 0;
  const goToStep = (target) => {
    if (target < step) {
      setStep(target);
    }
  };
  const goNext = () => {
    if (!canProceed) return;
    setStep((current) => current < 2 ? current + 1 : current);
  };
  const goBack = () => {
    setStep((current) => current > 0 ? current - 1 : current);
  };
  const handleCreate = () => {
    if (!selectedModel || !selectedProvider || !canProceed || isDeploying) return;
    setIsDeploying(true);
    window.setTimeout(() => {
      const newEndpointId = `sp-${Date.now()}`;
      const slug = endpointName.trim().toLowerCase().replace(/\s+/g, "-");
      const endpointUrl = `https://api.booster.ai/v1/endpoints/${endpointType.toLowerCase()}/${slug}`;
      endpoints.push({
        id: newEndpointId,
        name: endpointName.trim(),
        type: endpointType,
        defaultDeployment: selectedModel.name,
        description: useCase.trim(),
        budgetUsed: 0,
        health: "OK",
        monthlySpend: 0,
        inputTokens: 0,
        outputTokens: 0,
        endpoint: endpointUrl,
        tokenBudget: 1e6,
        monthlyBudgetEur: Math.max(1, Math.round(Number(estimatedMonthlyCost))),
        performanceProfile: "best-effort"
      });
      deployments[newEndpointId] = [{
        id: `dep-${Date.now()}`,
        name: `${selectedModel.name.toLowerCase().replace(/\s+/g, "-")}-${slug}`,
        model: selectedModel.name,
        version: selectedModel.version,
        mode: "Shared",
        budgetUsed: 0,
        slaStatus: "OK",
        region: selectedProvider.provider === "Scaleway" ? "EU-West" : "EU-Central",
        confidentialCompute: false,
        latencyP50: selectedProvider.latencyMs,
        costPer1MTokens: selectedProvider.inputPer1M
      }];
      toast.success("Inference endpoint deployed", {
        description: `"${endpointName.trim()}" is live on ${selectedProvider.provider}.`
      });
      navigate({
        to: "/app/overview"
      });
    }, 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl flex h-[calc(100vh-3.5rem)] min-h-0 flex-col gap-4 overflow-hidden py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { className: "shrink-0", leading: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 w-fit", onClick: () => window.history.back(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-icon-16 w-icon-16" }),
        " Back"
      ] }), titleSize: "section", title: "Create Inference Endpoint", description: "Configure and deploy a model inference endpoint with safety and budget controls." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-0 flex-1 basis-0 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-endpoint-deploy-wizard", children: [
        selectedModel ? /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummarySidebar, { model: selectedModel, providerCount, onSwapModel: () => openModelPicker(selectedModel.id), inputCostPer1M: summaryInputCostPer1M, outputCostPer1M: summaryOutputCostPer1M }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSummarySidebarEmpty, { onSelectModel: () => openModelPicker(null) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-0 h-full min-w-0 lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col overflow-hidden p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-center border-b border-border px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepper, { className: "min-h-0 min-w-0", steps: [...ENDPOINT_WIZARD_STEPPER_ITEMS], currentStep: step, onStepChange: (index) => goToStep(index) }) }),
          step === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(BasicSetupStep, { endpointName, setEndpointName, useCase, setUseCase, selectedPreset, setSelectedPreset, showUseCasePresets: false }) : null,
          step === 1 ? selectedModel && selectedProvider ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderSelectionStep, { providerSort, setProviderSort, selectedProvider, selectedProviderId, setSelectedProviderId, sortedProviders }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-2 overflow-y-auto p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-body-sm text-muted-foreground", children: "Select a model from the catalog to compare deployment providers." }) }) : null,
          step === 2 ? selectedModel && selectedProvider ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStep, { endpointName, useCase, selectedModel, selectedProvider, estimatedMonthlyCost, setStep }) : null : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: goBack, disabled: step === 0 || isDeploying, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-icon-16 w-icon-16" }),
              " Back"
            ] }),
            step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: goNext, disabled: !canProceed || isDeploying, children: [
              "Next ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-icon-16 w-icon-16" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreate, disabled: !canProceed || isDeploying, children: isDeploying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mr-1 h-icon-16 w-icon-16" }),
              "Deploying endpoint..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "mr-1 h-icon-16 w-icon-16" }),
              "Deploy inference endpoint"
            ] }) })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EndpointModelSelectSheet, { open: modelPickerOpen, onOpenChange: setModelPickerOpen, models, initialSelectedModelId: modelPickerSeedId, onConfirm: (modelId) => {
      navigate({
        to: "/app/endpoints/create_endpoint",
        search: {
          model: modelId
        },
        replace: true
      });
      setModelPickerOpen(false);
    } })
  ] });
}
export {
  RouteComponent as component
};
