import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Label, I as Input } from "./input-BIbIoEB2.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-D2WQTUn2.mjs";
import { B as Badge } from "./mockData-CaVm0p_Q.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BDfgR0z7.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CU-CH7G3.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-D8-7PCfA.mjs";
import { q as Check, g as CircleCheck } from "../_libs/lucide-react.mjs";
const textareaVariants = cva(
  "flex w-full resize-y rounded-md border border-input bg-background text-foreground ring-offset-background transition-colors ease-standard placeholder:text-foreground/50 enabled:hover:border-ring read-only:hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground/50 read-only:cursor-default read-only:bg-muted",
  {
    variants: {
      size: {
        sm: "min-h-16 px-2 py-2 text-caption",
        md: "min-h-20 px-3 py-2 text-body-sm",
        lg: "min-h-24 px-4 py-3 text-body-sm"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const Textarea = reactExports.forwardRef(
  ({ className, size, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        ref,
        className: cn(textareaVariants({ size }), className),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
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
const PROVIDER_SORT_LABELS = {
  recommended: "Recommended",
  "lowest-cost": "Lowest cost",
  "lowest-latency": "Lowest latency",
  "highest-throughput": "Highest throughput",
  "largest-context": "Largest context"
};
function formatEurPer1M$1(value) {
  return `€${value.toFixed(2)}`;
}
function ProviderSelectionStep({
  providerSort,
  setProviderSort,
  selectedProvider,
  setSelectedProviderId,
  sortedProviders
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 text-foreground", children: "Select deployment provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Select the provider that best matches your cost, performance, context, and compliance requirements." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: providerSort,
          onValueChange: (value) => setProviderSort(value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(PROVIDER_SORT_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "h-14 hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Context" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "In / 1M" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Out / 1M" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Latency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "TPS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Quant." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Certs" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sortedProviders.filter((provider) => provider.id !== "model-provider-fallback").map((provider) => {
        const isSelected = selectedProvider.id === provider.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: cn(
              "h-14 cursor-pointer",
              isSelected ? "bg-primary/5" : "hover:bg-muted/50"
            ),
            onClick: () => setSelectedProviderId(provider.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "flex h-icon-16 w-icon-16 items-center justify-center rounded-full border",
                    isSelected ? "border-primary bg-primary" : "border-border bg-background"
                  ),
                  children: isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-primary-foreground" }) : null
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-body-sm text-foreground", children: provider.provider }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-body-sm text-foreground", children: provider.context }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm text-foreground", children: formatEurPer1M$1(provider.inputPer1M) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm text-foreground", children: formatEurPer1M$1(provider.outputPer1M) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-body-sm text-foreground", children: [
                provider.latencyMs,
                "ms"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm text-foreground", children: provider.tps.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm text-foreground", children: provider.quant }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "success",
                  appearance: "ghost",
                  size: "24",
                  className: "font-normal",
                  leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { "aria-hidden": true }),
                  children: provider.certs.join(", ")
                }
              ) })
            ]
          },
          provider.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-body-sm text-muted-foreground", children: "Provider choice affects cost, latency, throughput, and context window." })
  ] });
}
function formatEurPer1M(value) {
  return `€${value.toFixed(2)}`;
}
function ReviewStep({
  endpointName,
  useCase,
  selectedModel,
  selectedProvider,
  estimatedMonthlyCost,
  setStep
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 text-foreground", children: "Review & Deploy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Review your configuration before deploying. Default budget and safety settings can be changed later." })
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-start justify-between space-y-0 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-body-sm-strong", children: "Deployment provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep(1),
            className: "text-caption text-primary",
            children: "Edit"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 pt-0 text-body-sm md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[6rem_1fr] gap-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Provider:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: selectedProvider.provider.replace(" AI", "") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Context:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: selectedProvider.context }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Quant:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: selectedProvider.quant }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Certs:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: selectedProvider.certs.join(", ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[7rem_1fr] gap-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Input:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            formatEurPer1M(selectedProvider.inputPer1M),
            " / 1M"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Output:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            formatEurPer1M(selectedProvider.outputPer1M),
            " / 1M"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Avg latency:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            selectedProvider.latencyMs,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tokens / second:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: selectedProvider.tps.toFixed(1) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-body-sm-strong", children: "Budget & Safety" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 pt-0 text-body-sm md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[8rem_1fr] gap-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Monthly budget:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "1,000,000 tokens/mo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Est. cost:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            "~€",
            estimatedMonthlyCost,
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[6rem_1fr] gap-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Alert:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "at 80%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Hard stop:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "No" })
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
  ProviderSelectionStep as P,
  ReviewStep as R,
  WizardStepper as W
};
