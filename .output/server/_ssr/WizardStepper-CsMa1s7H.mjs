import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Label, I as Input } from "./input-CMl7xTE1.mjs";
import { T as Textarea } from "./textarea-DLNnNal7.mjs";
import { c as cn, A as getModelParameterCount } from "./router-D-bBPX7r.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-2jMQWmXc.mjs";
import { g as getModelCatalogProviderRows } from "./model-hosting-providers-DHMjetE5.mjs";
import { o as Check } from "../_libs/lucide-react.mjs";
const USE_CASE_PRESETS = [
  "Code Generation",
  "Document Extraction",
  "Customer Support",
  "Internal Search",
  "Data Analysis",
  "Content Generation",
  "Other"
];
function BasicSetupStep({
  endpointName: _endpointName,
  setEndpointName,
  useCase,
  setUseCase,
  selectedPreset,
  setSelectedPreset,
  showUseCasePresets = true
}) {
  const endpointNameId = reactExports.useId();
  const useCaseId = reactExports.useId();
  const handlePresetClick = (preset) => {
    setSelectedPreset(selectedPreset === preset ? null : preset);
    if (!useCase.trim()) {
      setUseCase(`${preset} use case for enterprise inference endpoint.`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 text-foreground", children: "Basic Setup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Define where the model will run and how it will be identified within your project." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: endpointNameId, children: [
        "Inference Endpoint Name ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: endpointNameId,
          onChange: (event) => setEndpointName(event.target.value),
          placeholder: "Name your endpoint..."
        }
      )
    ] }),
    showUseCasePresets ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Use Case Preset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: USE_CASE_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handlePresetClick(preset),
          className: cn(
            "rounded-md border px-3 py-1.5 text-body-sm transition-colors",
            selectedPreset === preset ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"
          ),
          children: preset
        },
        preset
      )) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: useCaseId, children: "Use Case Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: useCaseId,
            required: true,
            placeholder: "Describe your use case in a few sentences. For example: We need to process insurance claim documents and extract policy numbers, dates, and damage descriptions.",
            value: useCase,
            onChange: (event) => setUseCase(event.target.value),
            rows: 5
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-caption text-muted-foreground", children: "Use case context helps Booster recommend the best model and provider." })
    ] })
  ] });
}
const MISSING_VALUE_PLACEHOLDER = "- -";
function formatEndpointParameters(model) {
  const parameters = getModelParameterCount(model);
  if (!parameters) return MISSING_VALUE_PLACEHOLDER;
  if (parameters >= 1e9) {
    return `${Math.round(parameters / 1e9)}B`;
  }
  if (parameters >= 1e6) return `${Math.round(parameters / 1e6)}M`;
  return String(parameters);
}
function formatEndpointContextWindow(model) {
  const tokens = model.contextLength;
  if (!tokens) return MISSING_VALUE_PLACEHOLDER;
  if (tokens >= 1e3) return `${Math.round(tokens / 1e3)}K`;
  return String(tokens);
}
function formatEndpointMinMemory(model) {
  const parameterCount = getModelParameterCount(model);
  if (!parameterCount) return MISSING_VALUE_PLACEHOLDER;
  return `${Math.round(Math.max(parameterCount * 2, 0) / 1e9)} GB`;
}
function formatEndpointEurPer1M(value) {
  return `€${value.toFixed(2)} / 1M`;
}
function getEndpointModelCatalogRow(model) {
  return getModelCatalogProviderRows(model)[0];
}
function ReviewDetailRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "min-w-0 text-foreground", children: value })
  ] });
}
function ReviewStep({
  endpointName,
  useCase,
  selectedModel,
  inputCostPer1M,
  outputCostPer1M,
  setStep
}) {
  const catalogRow = getEndpointModelCatalogRow(selectedModel);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 text-foreground", children: "Review & Deploy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Review your configuration before deploying." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-start justify-between space-y-0 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-body-sm-strong", children: "Basic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep(0),
            className: "text-caption text-primary",
            children: "Edit"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-2 pt-0 text-body-sm md:grid-cols-[8rem_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Endpoint name:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: endpointName || selectedModel.domain }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Use Case:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: useCase || "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-body-sm-strong", children: "Deployment provider" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-x-8 gap-y-4 pt-0 text-body-sm md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-[minmax(0,7.5rem)_1fr] items-baseline gap-x-4 gap-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Provider",
              value: selectedModel.hosting
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Parameters",
              value: formatEndpointParameters(selectedModel)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Context Window",
              value: formatEndpointContextWindow(selectedModel)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Min. Memory",
              value: formatEndpointMinMemory(selectedModel)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewDetailRow, { label: "Quant", value: catalogRow.quant })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-[minmax(0,7.5rem)_1fr] items-baseline gap-x-4 gap-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Input Tokens",
              value: formatEndpointEurPer1M(inputCostPer1M)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Output Tokens",
              value: formatEndpointEurPer1M(outputCostPer1M)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Certs",
              value: catalogRow.certs.join(", ")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Avg latency",
              value: `${catalogRow.latencyMs}ms`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewDetailRow,
            {
              label: "Tokens / second",
              value: catalogRow.tps.toFixed(1)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-icon-16 w-icon-16 items-center justify-center rounded-full border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Your input data and model responses are never used to train models and will not be shared with other users or third parties." })
    ] })
  ] });
}
const BASE_CLASSES = "inline-flex h-8 max-w-full items-center justify-center truncate rounded-full px-4 py-0 text-center text-caption font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const STATUS_CLASSES = {
  inactive: "border border-border bg-muted text-muted-foreground enabled:hover:bg-accent enabled:hover:text-accent-foreground",
  active: "border-2 border-primary bg-card text-primary ring-4 ring-primary/30 ring-offset-2 ring-offset-card cursor-default",
  completed: "border-2 border-primary bg-primary text-primary-foreground enabled:hover:bg-primary/90 cursor-pointer",
  error: "border-2 border-destructive bg-destructive/10 text-destructive"
};
const WizardStep = reactExports.forwardRef(
  ({ className, status, disabled, type = "button", ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        type,
        disabled,
        className: cn(
          BASE_CLASSES,
          STATUS_CLASSES[status],
          disabled && "cursor-not-allowed opacity-50",
          className
        ),
        ...props
      }
    );
  }
);
WizardStep.displayName = "WizardStep";
function StepConnector({
  active,
  transparent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: cn(
        "h-0.5 min-h-0 min-w-0 flex-1 basis-0 self-center",
        transparent ? "bg-transparent" : active ? "bg-primary" : "bg-border"
      )
    }
  );
}
function resolveStepStatus(index, currentStep, hasError) {
  if (hasError) return "error";
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "inactive";
}
function WizardStepper({
  steps,
  currentStep,
  onStepChange,
  stepErrors,
  className
}) {
  const lastIndex = steps.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Progress",
      className: cn(
        "flex w-full min-w-0 items-center justify-center",
        className
      ),
      children: steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        const leftActive = index > 0 && currentStep >= index;
        const rightActive = index < lastIndex && currentStep > index;
        const allowBack = Boolean(onStepChange) && isComplete;
        const disabled = isUpcoming;
        const hasError = stepErrors?.[index] ?? false;
        const status = resolveStepStatus(index, currentStep, hasError);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex min-w-0 min-h-0 flex-1 items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StepConnector, { transparent: index === 0, active: leftActive }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 flex-col items-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WizardStep,
                {
                  disabled,
                  "aria-current": isCurrent ? "step" : void 0,
                  status,
                  onClick: () => {
                    if (allowBack) {
                      onStepChange?.(index);
                    }
                  },
                  children: step.label
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StepConnector,
                {
                  transparent: index === lastIndex,
                  active: rightActive
                }
              )
            ]
          },
          step.id
        );
      })
    }
  );
}
export {
  BasicSetupStep as B,
  ReviewStep as R,
  WizardStepper as W,
  formatEndpointMinMemory as a,
  formatEndpointContextWindow as b,
  formatEndpointEurPer1M as c,
  formatEndpointParameters as f
};
