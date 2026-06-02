import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as BackButton } from "./BackButton-BporfUnx.mjs";
import { P as PageContainer } from "./PageContainer-CazM7ltn.mjs";
import { P as PerformanceBenchmarkDetailsSheet, Q as QWEN35_27B_PERFORMANCE_BENCHMARK, M as ModelPerformanceBenchmarkSection } from "./modelPerformanceBenchmark-BhXLuSHE.mjs";
import { B as Button } from "./button-DCHwUidX.mjs";
import { C as Card, a as CardContent } from "./card-2jMQWmXc.mjs";
import { P as Progress } from "./progress-CzJu4hK9.mjs";
import { t as toast } from "./sonner-C3D2Kk0w.mjs";
import { G as Route$3, a as Tooltip, b as TooltipTrigger, c as cn, d as TooltipContent, m as models, E as optimizationObjectives, F as useCaseCategories } from "./router-D-bBPX7r.mjs";
import { B as Badge } from "./badge-bkIpVg5q.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-BAmoT0uq.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-RUReqGY-.mjs";
import { I as Input } from "./input-CMl7xTE1.mjs";
import "./AppSideSheet-BDD1rKsl.mjs";
import "../_libs/react-dom.mjs";
import "./accordion-KQ13lSDj.mjs";
import "./table-DwSOW1EH.mjs";
import "../_libs/sonner.mjs";
import { Y as Save, _ as Target, S as Sparkles, o as Check, q as ArrowLeft, A as ArrowRight, $ as Clock, T as Trash2, r as Search, a0 as ExternalLink, P as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
const profiles = [
  {
    id: "ucp-platform-1",
    name: "Customer Support Bot — Production",
    platform: true,
    state: {
      useCase: "Customer Support Bot",
      customUseCase: "",
      objective: "Balanced Performance",
      monthlyVolume: "10M – 50M tokens",
      trafficPattern: "Burst traffic",
      audience: "Yes – customer-facing",
      maxLatency: "< 1s",
      ttftCritical: "Yes – interactive UI",
      sensitiveData: true,
      dataTypes: ["PII"],
      moderation: "Standard moderation",
      deploymentPref: "Standard environment acceptable",
      costSensitivity: "Moderate sensitivity",
      monthlyBudget: "$1,000 – $3,000"
    },
    lastStep: 6,
    savedAt: "2026-02-25T14:30:00Z"
  },
  {
    id: "ucp-platform-2",
    name: "RAG Knowledge Assistant — Enterprise",
    platform: true,
    state: {
      useCase: "RAG / Knowledge Assistant",
      customUseCase: "",
      objective: "Highest Accuracy",
      monthlyVolume: "50M+",
      trafficPattern: "Steady traffic",
      audience: "Internal users only",
      maxLatency: "< 2s",
      ttftCritical: "Moderate importance",
      sensitiveData: true,
      dataTypes: ["Confidential enterprise data"],
      moderation: "Standard moderation",
      deploymentPref: "Protected environment required",
      costSensitivity: "Cost is secondary to quality",
      monthlyBudget: "$3,000+"
    },
    lastStep: 6,
    savedAt: "2026-02-20T10:00:00Z"
  },
  {
    id: "ucp-platform-3",
    name: "Code Generation — Dev Tooling",
    platform: true,
    state: {
      useCase: "Code Generation",
      customUseCase: "",
      objective: "Fastest Response Time",
      monthlyVolume: "1M – 10M tokens",
      trafficPattern: "Burst traffic",
      audience: "Internal users only",
      maxLatency: "< 500ms",
      ttftCritical: "Yes – interactive UI",
      sensitiveData: false,
      dataTypes: [],
      moderation: "Minimal filtering",
      deploymentPref: "Standard environment acceptable",
      costSensitivity: "Moderate sensitivity",
      monthlyBudget: "$500 – $1,000"
    },
    lastStep: 6,
    savedAt: "2026-02-18T09:00:00Z"
  }
];
function getSavedUseCaseProfiles() {
  return [...profiles];
}
function saveUseCaseProfile(name, state, lastStep) {
  const profile = {
    id: `ucp-${Date.now()}`,
    name,
    state: { ...state, dataTypes: [...state.dataTypes] },
    lastStep,
    savedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  profiles.push(profile);
  return profile;
}
function deleteUseCaseProfile(id) {
  const idx = profiles.findIndex((p) => p.id === id);
  if (idx !== -1 && !profiles[idx].platform) profiles.splice(idx, 1);
}
function SavedProfilesMenu({
  onLoadProfile,
  loadedProfileId: _loadedProfileId
}) {
  const savedProfiles = getSavedUseCaseProfiles();
  const handleDeleteProfile = (id, e) => {
    e.stopPropagation();
    deleteUseCaseProfile(id);
    toast("Profile deleted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 mr-1" }),
      "Saved profiles",
      savedProfiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "secondary",
          appearance: "pill",
          size: "20",
          className: "ml-1 tabular-nums",
          children: savedProfiles.length
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "end", className: "w-80 p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold", children: "Saved profiles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Load a previous session or a template." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto p-1", children: savedProfiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-4 text-center text-body-sm text-muted-foreground", children: "No saved profiles yet." }) : savedProfiles.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onLoadProfile(profile),
          className: "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-accent",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm-strong truncate text-foreground", children: profile.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: profile.state.useCase || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
              profile.platform && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  size: "20",
                  className: "font-normal",
                  children: "template"
                }
              ),
              !profile.platform && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => handleDeleteProfile(profile.id, e),
                  className: "rounded p-1 hover:bg-destructive/10 hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              )
            ] })
          ]
        },
        profile.id
      )) })
    ] })
  ] });
}
function SaveProfileDialog({
  open,
  onOpenChange,
  saveName,
  setSaveName,
  state,
  currentStep,
  totalSteps,
  saveAndExit,
  onConfirmSave,
  loadedProfileId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: loadedProfileId ? "Update Profile" : "Save Use-Case Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: saveAndExit ? "Save your progress and return to Model Cosmos." : "Save your current selections. You can continue editing or load this profile later." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Profile name...",
          value: saveName,
          onChange: (e) => setSaveName(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && onConfirmSave(),
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
        state.useCase && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: state.useCase }),
        state.objective && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: state.objective }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px]", children: [
          "Step ",
          currentStep + 1,
          "/",
          totalSteps
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onConfirmSave, disabled: !saveName.trim(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-1" }),
        saveAndExit ? "Save & Exit" : "Save"
      ] })
    ] })
  ] }) });
}
function OptionCard({
  label,
  description,
  selected,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "w-full text-left p-3 rounded-lg border transition-all",
        selected ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/40 hover:bg-accent/50"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" })
        ] }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
      ]
    }
  );
}
function WizardStepObjective({
  state,
  update
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "What matters most for this deployment?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select your top priority. We will optimize recommendations accordingly." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: optimizationObjectives.map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OptionCard,
      {
        label: obj.label,
        description: obj.description,
        selected: state.objective === obj.label,
        onClick: () => update("objective", obj.label)
      },
      obj.label
    )) })
  ] });
}
function WizardStepResults({ state, results }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Recommended Models for Your Use Case" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Based on your inputs, here are the best-fit models ranked by suitability." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      state.useCase && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: state.useCase }),
      state.objective && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: state.objective })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: results.map(({ model: m, score, highlights, tags }, idx) => {
      const avgCost = ((m.inputCostPer1M + m.outputCostPer1M) / 2).toFixed(
        2
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: cn(
            "transition-all",
            idx === 0 && "border-primary/40 shadow-sm"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-[10px]", children: "Best Match" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: m.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: m.provider })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: m.description.split(".")[0] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                  score,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Match" })
              ] })
            ] }),
            highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Key Highlights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5", children: highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-1.5 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-success shrink-0" }),
                    h
                  ]
                },
                h
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-md p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Est. P95 Latency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
                  "~",
                  Math.round(1e3 / m.tokensPerSecond * 100),
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-md p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Cost per 1M tokens" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
                  "€",
                  parseFloat(avgCost).toFixed(2)
                ] })
              ] })
            ] }),
            tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-wrap", children: [
              tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px]",
                  children: tag
                },
                tag
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", className: "text-[10px]", children: m.hosting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/app/cosmos/$modelId",
                  params: { modelId: m.id },
                  search: {
                    returnTo: "/app/cosmos/guided",
                    returnLabel: "Guided recommendations"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }),
                    " View Details"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/deploy", search: { model: m.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                " Deploy"
              ] }) })
            ] })
          ] })
        },
        m.id
      );
    }) })
  ] });
}
const USE_CASES = useCaseCategories.map((u) => u.label);
function WizardStepUseCase({ state, update }) {
  const [useCaseSearch, setUseCaseSearch] = reactExports.useState("");
  const filteredUseCases = reactExports.useMemo(() => {
    const q = useCaseSearch.toLowerCase();
    return USE_CASES.filter((uc) => uc.toLowerCase().includes(q));
  }, [useCaseSearch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "What are you building?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Help us understand your primary use case so we can recommend the best-fit models." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search use cases...",
          value: useCaseSearch,
          onChange: (e) => setUseCaseSearch(e.target.value),
          className: "pl-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
      filteredUseCases.map((uc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        OptionCard,
        {
          label: uc,
          selected: state.useCase === uc,
          onClick: () => update("useCase", uc)
        },
        uc
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OptionCard,
        {
          label: "Other",
          description: "Describe your custom use case",
          selected: state.useCase === "Other",
          onClick: () => update("useCase", "Other")
        }
      )
    ] }),
    state.useCase === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Describe your use case...",
        value: state.customUseCase,
        onChange: (e) => update("customUseCase", e.target.value),
        className: "mt-2"
      }
    )
  ] });
}
function useSaveProfileDialog(state, currentStep, loadedProfileId, onProfileSaved) {
  const navigate = useNavigate();
  const [dialogState, setDialogState] = reactExports.useState({
    isOpen: false,
    name: "",
    shouldExit: false
  });
  const openDialog = (shouldExit) => {
    const defaultName = loadedProfileId ? getSavedUseCaseProfiles().find((p) => p.id === loadedProfileId)?.name || "" : state.useCase ? `${state.useCase} profile` : "";
    setDialogState({
      isOpen: true,
      name: defaultName,
      shouldExit
    });
  };
  const closeDialog = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };
  const setName = (name) => {
    setDialogState((prev) => ({ ...prev, name }));
  };
  const confirmSave = () => {
    if (!dialogState.name.trim()) return;
    if (loadedProfileId) {
      deleteUseCaseProfile(loadedProfileId);
    }
    const saved = saveUseCaseProfile(
      dialogState.name.trim(),
      state,
      currentStep
    );
    onProfileSaved(saved.id);
    closeDialog();
    toast.success("Profile saved", {
      description: `"${dialogState.name.trim()}" has been saved. You can resume anytime.`
    });
    if (dialogState.shouldExit) {
      navigate({ to: "/app/cosmos", search: { hosting: "" } });
    }
  };
  return {
    dialogState,
    openDialog,
    closeDialog,
    setName,
    confirmSave
  };
}
const defaultWizardState = {
  useCase: "",
  customUseCase: "",
  objective: "",
  monthlyVolume: "",
  trafficPattern: "",
  audience: "",
  maxLatency: "",
  ttftCritical: "",
  sensitiveData: false,
  dataTypes: [],
  moderation: "",
  deploymentPref: "",
  costSensitivity: "",
  monthlyBudget: ""
};
function scoreModels(state) {
  return models.map((m) => {
    let score = 50;
    const highlights = [];
    const tags = [];
    if (state.useCase === "Code Generation" && m.strengths.includes("Code Generation")) {
      score += 15;
      highlights.push("Purpose-built for code generation");
    }
    if (state.useCase === "RAG / Knowledge Assistant" && m.strengths.includes("RAG")) {
      score += 15;
      highlights.push("Optimized for RAG workflows");
    }
    if (state.useCase === "Document Summarization" && (m.strengths.includes("Long Context") || m.strengths.includes("Analysis"))) {
      score += 12;
      highlights.push("Strong summarization capability");
    }
    if (state.useCase === "Customer Support Bot" && m.strengths.includes("Multilingual")) {
      score += 10;
      highlights.push("Multilingual support for diverse users");
    }
    if (state.useCase === "Translation" && m.strengths.includes("Multilingual")) {
      score += 15;
      highlights.push("Excellent multilingual capabilities");
    }
    if (state.useCase === "Multimodal (Text + Image)" && m.strengths.includes("Multimodal")) {
      score += 15;
      highlights.push("Native multimodal support");
    }
    if (state.useCase === "Conversational Assistant") {
      score += 5;
    }
    if (state.useCase === "Classification" && m.strengths.includes("Speed")) {
      score += 8;
    }
    if (state.useCase === "Content Generation" && m.capabilities.some((c) => c.name === "Language" && c.score >= 90)) {
      score += 10;
      highlights.push("High-quality language generation");
    }
    if (state.objective === "Lowest Cost") {
      if (m.inputCostPer1M <= 1) {
        score += 15;
        tags.push("Cost Efficient");
      } else if (m.inputCostPer1M <= 3) {
        score += 8;
      }
    }
    if (state.objective === "Highest Accuracy") {
      const mmlu = m.benchmarks.find((b) => b.name === "MMLU");
      if (mmlu && mmlu.score >= 85) {
        score += 15;
        highlights.push("Top-tier benchmark accuracy");
        tags.push("High Accuracy");
      }
    }
    if (state.objective === "Fastest Response Time") {
      if (m.tokensPerSecond >= 100) {
        score += 15;
        highlights.push("Ultra-fast inference speed");
      } else if (m.tokensPerSecond >= 50) {
        score += 8;
      }
    }
    if (state.objective === "Balanced Performance") {
      score += 8;
    }
    if (state.objective === "Compliance / Regulated Workloads") {
      const safety = m.benchmarks.find((b) => b.name === "TruthfulQA");
      if (safety && safety.score >= 75) {
        score += 12;
        tags.push("Regulated Safe");
      }
      if (m.strengths.includes("Safety")) {
        score += 10;
        highlights.push("Industry-leading safety features");
      }
    }
    if (state.objective === "Sustainability / Energy Efficient") {
      if (m.sustainability === "A") {
        score += 15;
        tags.push("Eco-Friendly");
      }
    }
    if (state.audience === "Yes – customer-facing") {
      tags.push("Production Ready");
      score += 3;
    }
    if (state.maxLatency === "< 500ms" && m.tokensPerSecond >= 100) {
      score += 8;
      highlights.push("Meets <500ms latency requirement");
    } else if (state.maxLatency === "< 1s" && m.tokensPerSecond >= 50) {
      score += 5;
      highlights.push("Meets <1s latency requirement");
    }
    if (state.costSensitivity === "Highly cost sensitive" && m.inputCostPer1M <= 1) {
      score += 10;
      tags.push("Budget Friendly");
    }
    if (state.sensitiveData && m.hosting === "Booster Hosted") {
      score += 5;
      highlights.push("Self-hosted for data sovereignty");
    }
    if (state.deploymentPref === "Protected environment required" && m.hosting === "Booster Hosted") {
      score += 8;
      tags.push("Regulated Safe");
    }
    score = Math.min(99, Math.max(10, score));
    return {
      model: m,
      score,
      highlights: highlights.slice(0, 3),
      tags: [...new Set(tags)].slice(0, 3)
    };
  }).sort((a, b) => b.score - a.score);
}
const stepsMeta = [{
  title: "Use Case",
  icon: Target
}, {
  title: "Objective",
  icon: Sparkles
}, {
  title: "Results",
  icon: Check
}];
function getInitialWizardState(resumeId) {
  if (!resumeId) return {
    step: 0,
    state: defaultWizardState,
    profileId: null
  };
  const profile = getSavedUseCaseProfiles().find((p) => p.id === resumeId);
  if (!profile) return {
    step: 0,
    state: defaultWizardState,
    profileId: null
  };
  return {
    step: profile.lastStep,
    state: {
      ...profile.state
    },
    profileId: resumeId
  };
}
function RouteComponent() {
  const {
    resume: resumeId
  } = Route$3.useSearch();
  const navigate = useNavigate();
  const initial = getInitialWizardState(resumeId);
  const [step, setStep] = reactExports.useState(initial.step);
  const [state, setState] = reactExports.useState(initial.state);
  const [loadedProfileId, setLoadedProfileId] = reactExports.useState(initial.profileId);
  const [performanceView, setPerformanceView] = reactExports.useState("chart");
  const results = reactExports.useMemo(() => scoreModels(state), [state]);
  const progress = (step + 1) / stepsMeta.length * 100;
  const saveDialog = useSaveProfileDialog(state, step, loadedProfileId, setLoadedProfileId);
  const update = (key, value) => setState((prev) => ({
    ...prev,
    [key]: value
  }));
  const canProceed = () => {
    switch (step) {
      case 0:
        return state.useCase.length > 0;
      case 1:
        return state.objective.length > 0;
      default:
        return true;
    }
  };
  const loadProfile = (profile) => {
    setState({
      ...profile.state
    });
    setStep(profile.lastStep);
    setLoadedProfileId(profile.platform ? null : profile.id);
    toast.success(profile.platform ? "Template loaded" : "Profile loaded", {
      description: profile.platform ? `Started from "${profile.name}" template — save to create your own copy.` : `Resumed "${profile.name}"`
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-6", className: "py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { to: "/app/model-cosmos", label: "Model Cosmos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SavedProfilesMenu, { onLoadProfile: loadProfile, loadedProfileId }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => saveDialog.openDialog(false), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5 mr-1" }),
          " Save"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Guided Model Selection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Answer a few questions and we will recommend the best-fit models for your use case." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Step ",
          step + 1,
          " of ",
          stepsMeta.length,
          ": ",
          stepsMeta[step]?.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(progress),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, size: "dense" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: stepsMeta.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => i < step && setStep(i), className: cn("flex-1 h-1 rounded-full transition-colors", i === step ? "bg-primary" : i < step ? "bg-primary/40 cursor-pointer" : "bg-muted") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", className: "text-xs", children: s.title })
      ] }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepUseCase, { state, update }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepObjective, { state, update }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepResults, { state, results })
    ] }) }),
    step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-lg border border-border bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Performance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Deployment characterization benchmark covering throughput, latency, and energy across representative workloads." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceBenchmarkDetailsSheet, { benchmark: QWEN35_27B_PERFORMANCE_BENCHMARK, view: performanceView, onViewChange: setPerformanceView, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "shrink-0 shadow-xs", children: "Performance details" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModelPerformanceBenchmarkSection, { benchmark: QWEN35_27B_PERFORMANCE_BENCHMARK })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: step === 0, onClick: () => setStep(step - 1), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
        " Back"
      ] }),
      step < stepsMeta.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setStep(step + 1), disabled: !canProceed(), children: [
        "Next ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
        to: "/app/cosmos",
        search: {
          hosting: ""
        }
      }), children: "Back to Model Cosmos" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveProfileDialog, { open: saveDialog.dialogState.isOpen, onOpenChange: saveDialog.closeDialog, saveName: saveDialog.dialogState.name, setSaveName: saveDialog.setName, state, currentStep: step, totalSteps: stepsMeta.length, saveAndExit: saveDialog.dialogState.shouldExit, onConfirmSave: saveDialog.confirmSave, loadedProfileId })
  ] });
}
export {
  RouteComponent as component
};
