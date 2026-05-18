import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppSideSheetContent } from "./AppSideSheet-DZB2Zmf2.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { l as Route$2, T as TooltipProvider, a as Tooltip, b as TooltipTrigger, d as TooltipContent, c as cn } from "./router-D2WQTUn2.mjs";
import { g as getModelProviderLogoSrc, A as Avatar, b as AvatarImage, c as AvatarFallback } from "./model-provider-logos-CnTBcjZI.mjs";
import { m as models, B as Badge, g as getOverallModelScore, k as getModelModalityLabel, f as getParamSizeLabel } from "./mockData-CaVm0p_Q.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { I as IconBox } from "./icon-box-hWRXeUTk.mjs";
import { P as Progress } from "./progress-e0U-Jnpd.mjs";
import { S as Separator } from "./separator-DVeUJoWb.mjs";
import { S as Sheet, d as SheetTrigger } from "./sheet-CqC0FH_q.mjs";
import { T as Table$1, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CU-CH7G3.mjs";
import { D as Info, $ as Scale, a0 as Share2, P as Plus, a1 as FileText, F as Cpu, a2 as CodeXml, a3 as Brain, a4 as FlaskConical, a5 as MessageSquare, a6 as MessageSquareMore, a7 as MessageSquareDashed, a8 as Braces, a9 as ArrowUpNarrowWide, k as BadgeCheck, aa as ListTree, ab as FileVolume, ac as BookAudio, ad as AudioWaveform, ae as Hammer, af as Table, ag as BrainCircuit, ah as CircleStop, ai as MemoryStick, aj as Maximize, ak as Binary, al as FileArchive, am as Weight, an as GitBranchPlus, i as Box, n as ArrowLeft, C as ChevronDown, s as Type, V as Video, t as Mic, I as Image } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
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
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const itemElement = event.currentTarget;
    const isOpen = itemElement.getAttribute("data-state") === "open";
    if (!isOpen) return;
    const target = event.target;
    if (!target) return;
    const interactiveTarget = target.closest(
      "a,button,input,select,textarea,label,[role='button'],[role='link'],[data-accordion-prevent-toggle]"
    );
    if (interactiveTarget) return;
    const trigger = itemElement.querySelector(
      "button[aria-expanded='true']"
    );
    trigger?.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      ref,
      className: cn(
        "group border-b last:border-b-0 data-[state=open]:cursor-pointer [&[data-disabled]>h3>button]:text-muted-foreground [&[data-disabled]>h3>button]:opacity-[var(--disabled-opacity)] [&[data-disabled]>h3>button>svg]:text-muted-foreground",
        className
      ),
      onClick: handleClick,
      ...props
    }
  );
});
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between px-5 py-4 text-h3 transition-colors ease-standard group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent data-[disabled]:text-muted-foreground disabled:text-muted-foreground [&[data-state=open]>svg]:rotate-180 disabled:[&>svg]:text-muted-foreground",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 shrink-0 transition-transform duration-200 ease-standard" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-body-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "px-5 pb-4 pt-0 text-muted-foreground transition-colors group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent",
          className
        ),
        children
      }
    )
  }
));
AccordionContent.displayName = Content2.displayName;
const SECTION_IDS = ["overview", "capabilities", "modalities", "endpoints", "features", "specifications", "sources"];
const NAV = [{
  id: "overview",
  label: "Overview"
}, {
  id: "capabilities",
  label: "Capabilities"
}, {
  id: "modalities",
  label: "Modalities"
}, {
  id: "endpoints",
  label: "Endpoints"
}, {
  id: "features",
  label: "Features"
}, {
  id: "specifications",
  label: "Specifications"
}, {
  id: "sources",
  label: "Sources"
}];
function normalizeModalityAvailability(value) {
  if (value === "input_output") return "both";
  if (value === "input_only") return "input";
  return "none";
}
function modalityIcon(key) {
  switch (key) {
    case "text":
      return Type;
    case "image":
      return Image;
    case "audio":
      return Mic;
    case "video":
      return Video;
    default:
      return Type;
  }
}
function modalityRowsFromYaml(model) {
  return [{
    key: "text",
    label: "Text",
    availability: normalizeModalityAvailability(model.modalities.text)
  }, {
    key: "image",
    label: "Image",
    availability: normalizeModalityAvailability(model.modalities.image)
  }, {
    key: "audio",
    label: "Audio",
    availability: normalizeModalityAvailability(model.modalities.audio)
  }, {
    key: "video",
    label: "Video",
    availability: normalizeModalityAvailability(model.modalities.video)
  }];
}
function endpointRowsFromYaml(model) {
  return [{
    key: "chat_completions",
    name: "Chat Completions",
    supported: model.endpoints.chat_completions,
    icon: MessageSquare
  }, {
    key: "responses",
    name: "Responses",
    supported: model.endpoints.responses,
    icon: MessageSquareMore
  }, {
    key: "chat_completions_legacy",
    name: "Chat Completions (Legacy)",
    supported: model.endpoints.chat_completions_legacy,
    icon: MessageSquareDashed
  }, {
    key: "embeddings",
    name: "Embeddings",
    supported: model.endpoints.embeddings,
    icon: Braces
  }, {
    key: "rerank",
    name: "Rerank",
    supported: model.endpoints.rerank,
    icon: ArrowUpNarrowWide
  }, {
    key: "score",
    name: "Score",
    supported: model.endpoints.score,
    icon: BadgeCheck
  }, {
    key: "classify",
    name: "Classify",
    supported: model.endpoints.classify,
    icon: ListTree
  }, {
    key: "audio_transcriptions",
    name: "Audio Transcriptions",
    supported: model.endpoints.audio_transcriptions,
    icon: FileVolume
  }, {
    key: "audio_translations",
    name: "Audio Translations",
    supported: model.endpoints.audio_translations,
    icon: BookAudio
  }];
}
function featureRowsFromYaml(model) {
  return [{
    key: "streaming",
    name: "Streaming",
    supported: model.features.streaming,
    icon: AudioWaveform
  }, {
    key: "tool_use",
    name: "Tool Use",
    supported: model.features.tool_use,
    icon: Hammer
  }, {
    key: "structured_outputs",
    name: "Structured Outputs",
    supported: model.features.structured_outputs,
    icon: Table
  }, {
    key: "reasoning",
    name: "Reasoning",
    supported: model.features.reasoning,
    icon: BrainCircuit
  }, {
    key: "stream_cancellation",
    name: "Stream Cancellation",
    supported: model.features.stream_cancellation,
    icon: CircleStop
  }];
}
function BackToPrevious({
  to,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "-ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-icon-16 w-icon-16", "aria-hidden": true }),
    label
  ] }) });
}
function NavRail({
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-8 flex w-40 shrink-0 flex-col", "aria-label": "Model detail sections", children: NAV.map((item) => {
    const isActive = active === item.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", "aria-current": isActive ? "location" : void 0, onClick: () => onSelect(item.id), className: cn("flex h-model-detail-row w-40 max-w-full shrink-0 items-center gap-3 pr-6 text-left text-body-sm transition-colors", isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-full w-[3px] shrink-0 justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-full w-px rounded-full bg-border", isActive && "w-[3px] bg-primary") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: item.label })
    ] }, item.id);
  }) });
}
function SectionTitle({
  children,
  className
}) {
  const hasCustomWidth = typeof className === "string" && /\bw-/.test(className);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-model-detail-row shrink-0 flex-col justify-center", !hasCustomWidth && "w-28", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "w-full min-w-0 text-h3 text-foreground", children }) });
}
function scoreToPercent(score) {
  if (!Number.isFinite(score)) return 0;
  if (score <= 1) return Math.round(score * 100);
  if (score <= 100) return Math.round(score);
  return Math.round(score);
}
function formatScore(score) {
  return `${scoreToPercent(score)}%`;
}
const CAPABILITY_ROW_DEFS = [{
  label: "Agents",
  match: /efficiency|agent|batch|throughput/i,
  icon: Cpu
}, {
  label: "Coding",
  match: /code|programming|debug/i,
  icon: CodeXml
}, {
  label: "General",
  match: /language|multilingual|custom/i,
  icon: Brain
}, {
  label: "Scientific Reasoning",
  match: /reasoning|math|logical|rag|scientific/i,
  icon: FlaskConical
}];
function capabilityRowsFromYaml(model) {
  const categories = model.capabilities.categories;
  return CAPABILITY_ROW_DEFS.map((def) => {
    const match = categories.find((cat) => def.match.test(cat.name));
    const fallbackScore = categories.length > 0 ? Math.round(categories.reduce((sum, cat) => sum + scoreToPercent(cat.score), 0) / categories.length) : 0;
    return {
      label: def.label,
      score: match ? scoreToPercent(match.score) : fallbackScore,
      icon: def.icon
    };
  });
}
function capabilityAccordionBucketsFromYaml(model) {
  const summaryRows = capabilityRowsFromYaml(model);
  const categories = model.capabilities.categories;
  return CAPABILITY_ROW_DEFS.map((def, index) => ({
    label: def.label,
    icon: def.icon,
    scorePercent: summaryRows[index].score,
    sourceCategories: categories.filter((cat) => def.match.test(cat.name))
  }));
}
function CapabilityCategoryDetailBody({
  category
}) {
  if (!category.subcategogies || category.subcategogies.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "No subcategories yet." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: category.subcategogies.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-md border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 items-center justify-between gap-3 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-foreground", children: sub.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm tabular-nums text-muted-foreground", children: formatScore(sub.score) })
    ] }),
    sub.benchmarks && sub.benchmarks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table$1, { containerClassName: "overflow-x-auto overflow-y-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-10", children: "Benchmark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-10 text-right", children: "Weight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-10 text-right", children: "Score" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sub.benchmarks.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-body-sm", children: b.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm tabular-nums", children: b.weight }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-body-sm tabular-nums", children: formatScore(b.score) })
      ] }, b.id)) })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "No benchmarks yet." }) })
  ] }, sub.name)) });
}
function getMockParameterCount(model) {
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
function normalizeModel(model) {
  const score = getOverallModelScore(model);
  const parameters = getMockParameterCount(model);
  const hasVision = model.strengths.some((s) => /vision|image|multimodal/i.test(s));
  const hasCode = model.category === "Code" || /code/i.test(model.domain);
  return {
    id: model.id,
    name: model.name,
    version: model.version,
    base_model: null,
    description: model.description,
    license: model.hosting === "Booster Powered" ? "Commercial" : "Open Source",
    status: model.status.toLowerCase(),
    modalities: {
      text: "input_output",
      image: hasVision ? "input_only" : "unsupported",
      audio: "unsupported",
      video: "unsupported"
    },
    endpoints: {
      chat_completions: true,
      chat_completions_legacy: false,
      responses: true,
      embeddings: !hasCode,
      rerank: model.capabilities.some((cap) => /rag|language/i.test(cap.name)),
      score: true,
      classify: true,
      audio_transcriptions: false,
      audio_translations: false
    },
    origin: model.provider,
    format: "API",
    quantization: null,
    dtype: "bf16",
    parameters,
    min_memory_bytes: Math.max(parameters * 2, 0),
    input_price_per_1m: model.inputCostPer1M.toFixed(2),
    output_price_per_1m: model.outputCostPer1M.toFixed(2),
    sources: [{
      type: model.hosting,
      repo: model.provider
    }],
    type: getModelModalityLabel(model),
    max_context_length: model.contextLength,
    features: {
      streaming: true,
      tool_use: score >= 80,
      structured_outputs: true,
      reasoning: model.capabilities.some((cap) => /reason/i.test(cap.name)),
      stream_cancellation: true
    },
    capabilities: {
      inteligence_index: score / 100,
      categories: model.capabilities.map((cap) => ({
        name: cap.name,
        score: cap.score,
        subcategogies: cap.subs.map((sub) => ({
          name: sub.name,
          score: sub.score,
          benchmarks: model.benchmarks.filter((benchmark) => benchmark.category === cap.name).map((benchmark) => ({
            id: benchmark.name,
            weight: 1,
            score: benchmark.score
          }))
        }))
      }))
    }
  };
}
const MISSING_VALUE_PLACEHOLDER = "- -";
function formatParameters(parameters) {
  if (!parameters) return MISSING_VALUE_PLACEHOLDER;
  if (parameters >= 1e9) {
    return `${Math.round(parameters / 1e9)}B`;
  }
  if (parameters >= 1e6) return `${Math.round(parameters / 1e6)}M`;
  return String(parameters);
}
function formatContextWindow(tokens) {
  if (!tokens) return MISSING_VALUE_PLACEHOLDER;
  if (tokens >= 1e3) return `${Math.round(tokens / 1e3)}K`;
  return String(tokens);
}
function formatMemoryKpi(bytes) {
  if (!bytes) {
    return {
      memoryValue: MISSING_VALUE_PLACEHOLDER,
      memoryNumber: MISSING_VALUE_PLACEHOLDER,
      memoryUnit: null
    };
  }
  const gb = Math.round(bytes / 1e9);
  return {
    memoryValue: `${gb} GB`,
    memoryNumber: String(gb),
    memoryUnit: "GB"
  };
}
const SPEC_GRID_ROW_FIRST_COL = "border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(4)]:border-b-0";
const SPEC_GRID_ROW_SECOND_COL = "border-b border-transparent py-2 last:border-b-0";
function displayOrMissing(value) {
  return value && value.trim() ? value : MISSING_VALUE_PLACEHOLDER;
}
function formatSpecificationMemory(bytes) {
  if (!bytes) return MISSING_VALUE_PLACEHOLDER;
  return `${Math.round(bytes / 1e9)} GB`;
}
function formatSpecificationContextWindow(tokens) {
  if (!tokens) return MISSING_VALUE_PLACEHOLDER;
  if (tokens >= 1e3) return `${Math.round(tokens / 1e3)}K tokens`;
  return `${tokens} tokens`;
}
function specRowsFromYaml(model) {
  return [{
    icon: Share2,
    label: "Parameters",
    value: formatParameters(model.parameters),
    className: SPEC_GRID_ROW_FIRST_COL
  }, {
    icon: MemoryStick,
    label: "Min. Memory",
    value: formatSpecificationMemory(model.min_memory_bytes),
    className: SPEC_GRID_ROW_FIRST_COL
  }, {
    icon: Maximize,
    label: "Context Length",
    value: formatSpecificationContextWindow(model.max_context_length),
    className: SPEC_GRID_ROW_FIRST_COL
  }, {
    icon: Binary,
    label: "Data Type",
    value: displayOrMissing(model.dtype),
    className: SPEC_GRID_ROW_FIRST_COL
  }, {
    icon: FileArchive,
    label: "Format",
    value: displayOrMissing(model.format),
    className: SPEC_GRID_ROW_SECOND_COL
  }, {
    icon: Weight,
    label: "Quantization",
    value: displayOrMissing(model.quantization),
    className: SPEC_GRID_ROW_SECOND_COL
  }, {
    icon: GitBranchPlus,
    label: "Origin",
    value: displayOrMissing(model.origin),
    className: SPEC_GRID_ROW_SECOND_COL
  }, {
    icon: Box,
    label: "Base Model",
    value: displayOrMissing(model.base_model),
    className: SPEC_GRID_ROW_SECOND_COL
  }];
}
function kpiValueToneClass(value) {
  return value === MISSING_VALUE_PLACEHOLDER ? "text-muted-foreground" : "text-foreground";
}
function StatColumn({
  children,
  showDivider,
  isFirst
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex min-w-0 flex-1 flex-col gap-1", !isFirst && "pl-0", showDivider && "border-r border-border pr-model-detail-kpi-x"), children });
}
function ModelDetailSupportRow({
  icon: Icon,
  label,
  supported,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex h-model-detail-row items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xlg", shape: "circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(supported ? "text-hierarchy-secondary" : "text-hierarchy-disabled"), "aria-hidden": true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("min-w-0 flex-1 text-body-sm", supported ? "text-hierarchy-secondary" : "text-hierarchy-disabled"), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { appearance: "ghost", variant: supported ? "success" : "muted", size: "24", className: "w-control-md shrink-0 justify-center tabular-nums px-1", children: supported ? "Yes" : "No" })
  ] });
}
function SpecRow({
  icon: Icon,
  label,
  value,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex h-model-detail-row items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xlg", shape: "circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "text-hierarchy-secondary", "aria-hidden": true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 text-body-sm text-hierarchy-secondary", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("shrink-0 text-label tabular-nums", value === MISSING_VALUE_PLACEHOLDER ? "text-muted-foreground" : "text-foreground"), children: value })
  ] });
}
function OverviewMetaChip({
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex h-icon-28 max-w-full shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-border bg-card px-2 text-body-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-20 w-icon-20 shrink-0 text-muted-foreground", "aria-hidden": true }),
    children
  ] });
}
function RouteComponent() {
  const {
    modelId
  } = Route$2.useParams();
  const {
    returnTo,
    returnLabel
  } = Route$2.useSearch();
  const model = models.find((m) => m.id === modelId);
  const sectionRefs = reactExports.useRef({});
  const scrollRootRef = reactExports.useRef(null);
  const [activeNav, setActiveNav] = reactExports.useState("overview");
  const modelYaml = reactExports.useMemo(() => model ? normalizeModel(model) : null, [model]);
  const capabilityRows = reactExports.useMemo(() => modelYaml ? capabilityRowsFromYaml(modelYaml) : [], [modelYaml]);
  const capabilityAccordionBuckets = reactExports.useMemo(() => modelYaml ? capabilityAccordionBucketsFromYaml(modelYaml) : [], [modelYaml]);
  const modalityRows = reactExports.useMemo(() => modelYaml ? modalityRowsFromYaml(modelYaml) : [], [modelYaml]);
  const endpointRows = reactExports.useMemo(() => modelYaml ? endpointRowsFromYaml(modelYaml) : [], [modelYaml]);
  const featureRows = reactExports.useMemo(() => modelYaml ? featureRowsFromYaml(modelYaml) : [], [modelYaml]);
  const specRows = reactExports.useMemo(() => modelYaml ? specRowsFromYaml(modelYaml) : [], [modelYaml]);
  const assignRef = reactExports.useCallback((id) => (node) => {
    sectionRefs.current[id] = node;
  }, []);
  const scrollToSection = reactExports.useCallback((id) => {
    setActiveNav(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);
  const handleSectionScroll = reactExports.useCallback(() => {
    const rootTop = scrollRootRef.current?.getBoundingClientRect().top ?? 0;
    const nextActive = [...SECTION_IDS].reverse().find((id) => {
      const sectionTop = sectionRefs.current[id]?.getBoundingClientRect().top ?? Infinity;
      return sectionTop - rootTop <= 120;
    }) ?? "overview";
    setActiveNav(nextActive);
  }, []);
  if (!model) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Model not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app/cosmos", search: {
        hosting: ""
      }, children: "All models" }) })
    ] });
  }
  if (!modelYaml) return null;
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  const providerInitials = modelYaml.sources[0]?.repo?.split("/")[0]?.slice(0, 2)?.toUpperCase() ?? "AI";
  const capabilityScore = `${Math.round(modelYaml.capabilities.inteligence_index * 1e3) / 10}`;
  const endpointsNewPath = "/app/endpoints/create_endpoint";
  const paramLabel = formatParameters(modelYaml.parameters);
  const ctxShort = formatContextWindow(modelYaml.max_context_length);
  const {
    memoryValue,
    memoryNumber,
    memoryUnit
  } = formatMemoryKpi(modelYaml.min_memory_bytes);
  const inputPrice = modelYaml.input_price_per_1m ?? MISSING_VALUE_PLACEHOLDER;
  const outputPrice = modelYaml.output_price_per_1m ?? MISSING_VALUE_PLACEHOLDER;
  const endpointsLeft = endpointRows.slice(0, 5);
  const endpointsRight = endpointRows.slice(5);
  const featuresLeft = featureRows.slice(0, 3);
  const featuresRight = featureRows.slice(3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRootRef, className: "min-h-0 flex-1 overflow-y-auto", onScroll: handleSectionScroll, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container space-y-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackToPrevious, { to: returnTo, label: `Back to ${returnLabel}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-10 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavRail, { active: activeNav, onSelect: scrollToSection }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("overview"), "data-section": "overview", id: "model-detail-overview", className: "relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-bl from-primary/20 via-card to-card opacity-90", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-icon-72 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "!h-[44px] !w-[44px] rounded-lg", children: [
              providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: providerLogoSrc, alt: "", className: "size-full object-contain" }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-lg text-label", children: providerInitials })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 max-w-[600px] flex-1 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 gap-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display font-bold tracking-tight text-foreground", children: modelYaml.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", appearance: "pill", size: "28", className: "font-normal", children: modelYaml.type.toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: modelYaml.status === "active" ? "success" : "muted", appearance: "pill", size: "28", className: "font-normal", children: modelYaml.status === "active" ? "Active" : modelYaml.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-foreground", children: modelYaml.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", className: "shrink-0 text-muted-foreground hover:text-foreground [&_svg]:h-icon-20 [&_svg]:w-icon-20", "aria-label": "About capability score", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { "aria-hidden": true }) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-page-intro", children: "Aggregated score from model capability categories in this catalog." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-display font-bold text-primary tabular-nums", children: capabilityScore })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "CAPABILITY SCORE" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewMetaChip, { icon: Scale, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate text-muted-foreground", children: [
                    "License:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: modelYaml.license ?? "-" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewMetaChip, { icon: Share2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate text-muted-foreground", children: [
                    "Providers:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: modelYaml.sources.length })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "default", size: "default", className: "shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: endpointsNewPath, search: {
                  model: modelYaml.id
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-icon-16", "aria-hidden": true }),
                  "Inference Endpoint"
                ] }) })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-[30vh] flex min-w-0 flex-col gap-8 overflow-x-clip rounded-lg border border-border bg-card shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-stretch gap-5 md:flex-nowrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(StatColumn, { isFirst: true, showDivider: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-h1 font-bold tabular-nums", kpiValueToneClass(paramLabel)), children: paramLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "PARAMETERS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(StatColumn, { showDivider: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-h1 font-bold tabular-nums", kpiValueToneClass(ctxShort)), children: ctxShort }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: "tokens" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "CONTEXT WINDOW" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(StatColumn, { showDivider: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-h1 font-bold tabular-nums", kpiValueToneClass(memoryValue)), children: memoryNumber }),
                memoryUnit ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground", children: memoryUnit }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "MIN. MEMORY" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(StatColumn, { showDivider: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-h1 font-bold tabular-nums", kpiValueToneClass(inputPrice)), children: inputPrice }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-1 text-body-sm text-muted-foreground", children: [
                  "€ / 1M",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", className: "shrink-0 [&_svg]:h-icon-16 [&_svg]:w-icon-16", "aria-label": "Input pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { "aria-hidden": true }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Estimated public list price per 1M input tokens." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "INPUT TOKENS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(StatColumn, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-h1 font-bold tabular-nums", kpiValueToneClass(outputPrice)), children: outputPrice }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-1 text-body-sm text-muted-foreground", children: [
                  "€ / 1M",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", className: "shrink-0 [&_svg]:h-icon-16 [&_svg]:w-icon-16", "aria-label": "Output pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { "aria-hidden": true }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Estimated public list price per 1M output tokens." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "OUTPUT TOKENS" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("capabilities"), "data-section": "capabilities", id: "model-detail-capabilities", className: "flex min-w-0 gap-16 px-6 max-lg:flex-col max-lg:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Capabilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-nowrap items-center justify-between gap-4 pt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-page-intro min-w-0 text-body-sm text-hierarchy-secondary", children: "Capability scores show aggregated performance by task category. Score Breakdown includes subcategories, benchmarks, and weights." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "shrink-0 shadow-xs", children: "Score Breakdown" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AppSideSheetContent, { title: "Score breakdown", description: "Capability score breakdown by category and sub-scores for this model.", maxWidth: "lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-icon-40 w-icon-40 shrink-0 rounded-md", children: [
                        providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: providerLogoSrc, alt: "", className: "size-full object-contain" }) : null,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-md text-caption font-semibold", children: providerInitials })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 truncate text-[20px] font-semibold leading-none text-foreground", children: modelYaml.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-end gap-1 text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[20px] font-semibold tabular-nums leading-none text-foreground", children: formatScore(modelYaml.capabilities.inteligence_index) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Intelligence index" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "w-full rounded-lg border border-border", children: capabilityAccordionBuckets.map((bucket) => {
                    const Icon = bucket.icon;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: bucket.label, className: "border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "h-16 px-4 py-0 text-left text-body-sm [&>svg]:ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full min-w-0 flex-1 items-center justify-between gap-4 text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-2 truncate text-left text-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "lg", shape: "circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "text-hierarchy-secondary", "aria-hidden": true }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-left text-body-sm-strong", children: bucket.label })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 tabular-nums text-foreground", children: formatScore(bucket.scorePercent) })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 pb-4 pt-0 text-foreground", children: bucket.sourceCategories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "No source categories mapped to this group yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: bucket.sourceCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        bucket.sourceCategories.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border pb-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm-strong text-foreground", children: cat.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm tabular-nums text-muted-foreground", children: formatScore(cat.score) })
                        ] }) : null,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CapabilityCategoryDetailBody, { category: cat })
                      ] }, cat.name)) }) })
                    ] }, bucket.label);
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Sub-scores drill-down is available in the detailed methodology view (prototype)." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 max-w-full flex-col gap-3 p-0", children: capabilityRows.map((row) => {
                const Icon = row.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-control-md min-w-0 w-full max-w-full grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] items-center gap-x-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xlg", shape: "circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "text-hierarchy-secondary", "aria-hidden": true }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate text-body-sm text-hierarchy-secondary", children: row.label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: row.score, size: "dense", className: "bg-muted", indicatorClassName: "bg-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-10 shrink-0 text-right text-body font-semibold tabular-nums text-foreground", children: [
                    row.score,
                    "%"
                  ] })
                ] }, row.label);
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("modalities"), "data-section": "modalities", id: "model-detail-modalities", className: "flex gap-16 px-6 max-lg:flex-col max-lg:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { className: "w-[124px] min-w-[124px] basis-[124px]", children: "Modalities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-w-0 flex-1 grid-cols-2 gap-4 lg:grid-cols-4", children: modalityRows.map((row) => {
              const Icon = modalityIcon(row.key);
              const supported = row.availability !== "none";
              const highlight = row.availability === "both" || row.availability === "input";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-2 rounded-lg border bg-card px-4 py-4", highlight ? "border-primary/40" : "border-border", !supported && "opacity-75"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "lg", shape: "square", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(supported ? "text-primary" : "text-muted-foreground"), "aria-hidden": true }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-body-sm", supported ? "text-foreground" : "text-muted-foreground"), children: row.label })
                ] }),
                row.availability === "both" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium text-hierarchy-secondary", children: "Input & Output" }) : row.availability === "input" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium text-hierarchy-secondary", children: "Input" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: "Unsupported" })
              ] }, row.key);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("endpoints"), "data-section": "endpoints", id: "model-detail-endpoints", className: "flex flex-wrap items-start gap-16 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { className: "w-[124px] min-w-[124px] basis-[124px]", children: "Endpoints" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0", "md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-x-10"), children: [
              endpointsLeft.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModelDetailSupportRow, { icon: row.icon, label: row.name, supported: row.supported, className: "border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(5)]:border-b-0" }, row.name)),
              endpointsRight.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModelDetailSupportRow, { icon: row.icon, label: row.name, supported: row.supported, className: "border-b border-transparent py-2 last:border-b-0" }, row.name))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("features"), "data-section": "features", id: "model-detail-features", className: "flex flex-wrap items-start gap-16 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { className: "w-[124px] min-w-[124px] basis-[124px]", children: "Features" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0", "md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-10"), children: [
              featuresLeft.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModelDetailSupportRow, { icon: row.icon, label: row.name, supported: row.supported, className: "border-b border-transparent py-2 last:border-b-0 md:[&:nth-child(3)]:border-b-0" }, row.name)),
              featuresRight.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModelDetailSupportRow, { icon: row.icon, label: row.name, supported: row.supported, className: "border-b border-transparent py-2 last:border-b-0" }, row.name))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("specifications"), "data-section": "specifications", id: "model-detail-specifications", className: "flex flex-wrap items-start gap-16 px-6 max-lg:flex-col max-lg:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { className: "w-auto shrink-0", children: "Specifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid min-h-min min-w-0 max-w-full flex-1 basis-0 grid-cols-1 gap-y-0", "md:grid-flow-col md:grid-cols-2 md:grid-rows-4 md:gap-x-10"), children: specRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(SpecRow, { icon: row.icon, label: row.label, value: row.value, className: row.className }, row.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: assignRef("sources"), "data-section": "sources", id: "model-detail-sources", className: "flex min-w-0 gap-16 px-6 pb-6 max-lg:flex-col max-lg:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Sources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-1 flex-col gap-3", children: modelYaml.sources.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border border-border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBox, { size: "xlg", shape: "circle", className: "bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "text-hierarchy-secondary", "aria-hidden": true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm-strong text-foreground", children: source.repo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: source.type })
              ] })
            ] }, `${source.type}-${source.repo}`)) })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  RouteComponent as component
};
