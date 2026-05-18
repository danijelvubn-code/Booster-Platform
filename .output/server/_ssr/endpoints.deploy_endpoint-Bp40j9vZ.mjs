import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { W as WizardStepper, B as BasicSetupStep, P as ProviderSelectionStep, R as ReviewStep } from "./WizardStepper-DkoXt0bU.mjs";
import { P as PageHeader } from "./PageHeader-CUjxzDPz.mjs";
import { m as models, g as getOverallModelScore, f as getParamSizeLabel, a as modelHasVisionCapability, B as Badge, h as formatContextWindowShort, e as endpoints, i as deployments } from "./mockData-CaVm0p_Q.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { C as Card } from "./card-D8-7PCfA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as Route$6 } from "./router-D2WQTUn2.mjs";
import "./input-BIbIoEB2.mjs";
import "./select-BDfgR0z7.mjs";
import "./table-CU-CH7G3.mjs";
import { n as ArrowLeft, y as RefreshCcw, A as ArrowRight, z as Activity, R as Rocket } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
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
function getRecommendedProvider(_modelId) {
  return {
    id: "recommended",
    provider: "Mistral AI",
    bestFor: "Best overall",
    context: "32K",
    contextTokens: 32e3,
    inputPer1M: 1,
    outputPer1M: 3,
    latencyMs: 620,
    tps: 120,
    quant: "FP16",
    certs: ["GDPR"],
    reason: "Recommended for this endpoint because it offers the best balance of cost, latency, throughput, and compliance for the selected model.",
    recommended: true
  };
}
function getProviderOptions(modelId) {
  const selectedModel = models.find((m) => m.id === modelId) ?? models[0];
  return [getRecommendedProvider(), {
    id: "scaleway",
    provider: "Scaleway",
    bestFor: "EU infrastructure",
    context: "128K",
    contextTokens: 128e3,
    inputPer1M: 2.8,
    outputPer1M: 8.4,
    latencyMs: 640,
    tps: 26.5,
    quant: "INT8",
    certs: ["GDPR"],
    reason: "Scaleway provides larger context and EU infrastructure, but has higher token cost and lower throughput than the recommended option."
  }, {
    id: "nebius",
    provider: "Nebius",
    bestFor: "Lowest latency",
    context: "128K",
    contextTokens: 128e3,
    inputPer1M: 3.1,
    outputPer1M: 9.2,
    latencyMs: 590,
    tps: 29.4,
    quant: "FP16",
    certs: ["GDPR"],
    reason: "Nebius provides lower latency than the recommended option, but has higher token cost and lower throughput for this workload."
  }, {
    id: "fireworks",
    provider: "Fireworks",
    bestFor: "Large context",
    context: "128K",
    contextTokens: 128e3,
    inputPer1M: 2.95,
    outputPer1M: 8.95,
    latencyMs: 610,
    tps: 27.8,
    quant: "Q8",
    certs: ["GDPR"],
    reason: "Fireworks supports larger context windows, but is more expensive and lower throughput than Booster's recommended provider for this endpoint."
  }, {
    id: "model-provider-fallback",
    provider: selectedModel.provider,
    bestFor: "Model-native",
    context: formatContextWindowShort(selectedModel.contextLength),
    contextTokens: selectedModel.contextLength,
    inputPer1M: selectedModel.inputCostPer1M,
    outputPer1M: selectedModel.outputCostPer1M,
    latencyMs: 650,
    tps: Math.max(1, selectedModel.tokensPerSecond - 5),
    quant: "FP16",
    certs: ["GDPR"],
    reason: "Model-native hosting can simplify compatibility, but may not be the strongest cost-latency-throughput balance."
  }].filter((row, index, arr) => arr.findIndex((item) => item.provider === row.provider) === index);
}
function RouteComponent() {
  const navigate = useNavigate();
  const {
    model: preselectedModelId
  } = Route$6.useSearch();
  const defaultModelId = preselectedModelId && models.some((m) => m.id === preselectedModelId) ? preselectedModelId : models[0].id;
  const [step, setStep] = reactExports.useState(0);
  const [endpointName, setEndpointName] = reactExports.useState("");
  const [environment] = reactExports.useState("Production");
  const [useCase, setUseCase] = reactExports.useState("");
  const [selectedPreset, setSelectedPreset] = reactExports.useState(null);
  const [providerSort, setProviderSort] = reactExports.useState("highest-throughput");
  const [selectedModelId] = reactExports.useState(defaultModelId);
  const [selectedProviderId, setSelectedProviderId] = reactExports.useState("recommended");
  const [isDeploying, setIsDeploying] = reactExports.useState(false);
  const selectedModel = reactExports.useMemo(() => models.find((m) => m.id === selectedModelId) ?? models[0], [selectedModelId]);
  const providerOptions = reactExports.useMemo(() => getProviderOptions(selectedModel.id), [selectedModel.id]);
  const recommendedProvider = reactExports.useMemo(() => providerOptions.find((provider) => provider.recommended) ?? providerOptions[0], [providerOptions]);
  const selectedProvider = reactExports.useMemo(() => providerOptions.find((provider) => provider.id === selectedProviderId) ?? recommendedProvider, [providerOptions, recommendedProvider, selectedProviderId]);
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
    if (step === 0) {
      return endpointName.trim().length > 0 && useCase.trim().length > 0;
    }
    if (step === 1) {
      return Boolean(selectedModel) && Boolean(selectedProvider);
    }
    return true;
  }, [endpointName, selectedModel, selectedProvider, step, useCase]);
  const estimatedMonthlyCost = reactExports.useMemo(() => {
    const averagePer1M = (selectedProvider.inputPer1M + selectedProvider.outputPer1M) / 2;
    return averagePer1M.toFixed(0);
  }, [selectedProvider.inputPer1M, selectedProvider.outputPer1M]);
  const selectedModelScore = Math.round(getOverallModelScore(selectedModel));
  const modelSizeTag = getParamSizeLabel(selectedModel.name) ?? "Model";
  const modelTags = [modelSizeTag, modelHasVisionCapability(selectedModel) ? "MULTIMODAL" : "TEXT", "API"];
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
  const handleDeploy = () => {
    if (!canProceed || isDeploying) return;
    setIsDeploying(true);
    window.setTimeout(() => {
      const newEndpointId = `sp-${Date.now()}`;
      const slug = endpointName.trim().toLowerCase().replace(/\s+/g, "-");
      const endpointUrl = `https://api.booster.ai/v1/endpoints/${environment.toLowerCase()}/${slug}`;
      const endpointType = environment === "Production" ? "Production" : environment === "Staging" ? "POC" : "Demo";
      endpoints.push({
        id: newEndpointId,
        name: endpointName.trim(),
        type: endpointType,
        defaultDeployment: selectedModel.name,
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
      toast.success("Endpoint deployed", {
        description: `"${endpointName.trim()}" is live on ${selectedProvider.provider}.`
      });
      navigate({
        to: "/app/overview"
      });
    }, 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl flex h-full min-h-0 flex-1 flex-col gap-4 overflow-hidden py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { leading: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-3 w-fit", onClick: () => window.history.back(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-icon-16 w-icon-16" }),
      " Back"
    ] }), titleSize: "section", title: "Deploy Inference Endpoint", description: "Configure and deploy a model inference endpoint with safety and budget controls." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-endpoint-deploy-wizard", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "h-full min-w-0 lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col overflow-hidden p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-between gap-x-3 border-b border-border bg-success/7 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-body-sm-strong leading-tight text-foreground", children: selectedModel.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-h2 leading-none text-success tabular-nums", children: selectedModelScore })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-b border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: selectedModel.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: modelTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", appearance: "ghost", size: "24", children: tag }, tag)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", size: "20", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "Version" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm text-foreground", children: [
              "v",
              selectedModel.version
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-foreground", children: selectedModel.domain })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto border-t border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", onClick: () => navigate({
          to: "/app/cosmos",
          search: {
            hosting: ""
          }
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "mr-1 h-icon-16 w-icon-16" }),
          " Swap Model"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-0 h-full min-w-0 lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex h-full flex-col overflow-hidden p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip shrink-0 items-center justify-center border-b border-border px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepper, { className: "min-h-0 min-w-0", steps: [...ENDPOINT_WIZARD_STEPPER_ITEMS], currentStep: step, onStepChange: (index) => goToStep(index) }) }),
        step === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(BasicSetupStep, { endpointName, setEndpointName, useCase, setUseCase, selectedPreset, setSelectedPreset }) : null,
        step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderSelectionStep, { providerSort, setProviderSort, selectedProvider, selectedProviderId, setSelectedProviderId, sortedProviders }) : null,
        step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStep, { endpointName, useCase, selectedModel, selectedProvider, estimatedMonthlyCost, setStep }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: goBack, disabled: step === 0 || isDeploying, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-icon-16 w-icon-16" }),
            " Back"
          ] }),
          step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: goNext, disabled: !canProceed || isDeploying, children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-icon-16 w-icon-16" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleDeploy, disabled: !canProceed || isDeploying, children: isDeploying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mr-1 h-icon-16 w-icon-16" }),
            " ",
            "Deploying endpoint..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "mr-1 h-icon-16 w-icon-16" }),
            " Deploy inference endpoint"
          ] }) })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  RouteComponent as component
};
