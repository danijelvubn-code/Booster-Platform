import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageContainer } from "./PageContainer-DlMGeh4_.mjs";
import { P as PageHeader } from "./PageHeader-CUjxzDPz.mjs";
import { m as models, g as getOverallModelScore, a as modelHasVisionCapability, b as getMathScore, c as getReasoningScore, d as getCodingScore, B as Badge } from "./mockData-CaVm0p_Q.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as ModelCosmosCard } from "./ModelCosmosCard-CtZySkxt.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { f as Route$8, c as cn, a as Tooltip, b as TooltipTrigger, d as TooltipContent } from "./router-D2WQTUn2.mjs";
import { I as Input, L as Label } from "./input-BIbIoEB2.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-BD-tUJt9.mjs";
import { R as Root, V as Viewport, C as Corner, S as ScrollAreaScrollbar, a as ScrollAreaThumb } from "../_libs/radix-ui__react-scroll-area.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BDfgR0z7.mjs";
import { S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-CqC0FH_q.mjs";
import { S as Separator } from "./separator-DVeUJoWb.mjs";
import "./model-provider-logos-CnTBcjZI.mjs";
import "./card-D8-7PCfA.mjs";
import { o as Search, C as ChevronDown, p as SlidersHorizontal, X, q as Check, r as Minus, s as Type, V as Video, t as Mic, I as Image } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./public-asset-url-539yhzQl.mjs";
const PARAM_RE = /(\d+(?:\.\d+)?)\s*B\b/i;
function getParamBillions(model) {
  const m = model.name.match(PARAM_RE);
  return m ? Number.parseFloat(m[1]) : null;
}
function getCatalogModalities(model) {
  const out = ["text"];
  if (modelHasVisionCapability(model)) out.push("image");
  const blob = `${model.description} ${model.strengths.join(" ")}`.toLowerCase();
  if (blob.includes("audio") || blob.includes("speech") || blob.includes("tts") || blob.includes("whisper") || blob.includes("voice")) {
    out.push("audio");
  }
  if (blob.includes("video")) out.push("video");
  return out;
}
function getCatalogApiCapabilities(model) {
  const caps = /* @__PURE__ */ new Set(["Chat Completions"]);
  const p = model.provider;
  if (p === "OpenAI" || p === "Google" || p === "Mistral AI" || p === "Meta" || p === "Alibaba" || p === "DeepSeek") {
    caps.add("Responses");
  }
  if (p === "OpenAI" || model.name.includes("GPT")) {
    caps.add("Embeddings");
    caps.add("Classify");
    caps.add("Score");
    caps.add("Audio Transcriptions");
    caps.add("Audio Translations");
  }
  if (p === "Google" || model.name.toLowerCase().includes("gemini")) {
    caps.add("Embeddings");
    caps.add("Rerank");
    caps.add("Score");
  }
  if (p === "Mistral AI") {
    caps.add("Embeddings");
    caps.add("Rerank");
    caps.add("Classify");
  }
  if (p === "Meta" || model.name.includes("Llama")) {
    caps.add("Embeddings");
    caps.add("Chat Completions Legacy");
  }
  if (p === "Alibaba" || p === "DeepSeek") {
    caps.add("Embeddings");
  }
  return [...caps].sort();
}
function getCatalogFeatures(model) {
  const out = /* @__PURE__ */ new Set(["Streaming"]);
  const p = model.provider;
  if (p === "OpenAI" || p === "Google" || p === "Mistral AI" || p === "Meta" || p === "Alibaba" || p === "DeepSeek") {
    out.add("Tool Use");
  }
  if (p === "OpenAI" || model.name.toLowerCase().includes("gemini")) {
    out.add("Structured Outputs");
  }
  const reasoningCap = model.capabilities.find((c) => c.name === "Reasoning");
  if (reasoningCap && reasoningCap.score >= 85) {
    out.add("Reasoning");
  }
  if (p === "OpenAI" || p === "Mistral AI") {
    out.add("Stream Cancellation");
  }
  return [...out].sort();
}
function getCapabilityCategoryScore(model, category) {
  switch (category) {
    case "Coding": {
      const s = getCodingScore(model);
      return s > 0 ? s : null;
    }
    case "Agents": {
      const s = getReasoningScore(model);
      return s > 0 ? s : null;
    }
    case "Scientific Reasoning": {
      const s = getMathScore(model);
      return s > 0 ? s : null;
    }
    case "General": {
      const lang = model.capabilities.find((c) => c.name === "Language");
      if (lang) return lang.score;
      const overall = getOverallModelScore(model);
      return overall > 0 ? overall : null;
    }
    default:
      return null;
  }
}
function getLicenseCategory(model) {
  if (model.provider === "Meta" || model.name.toLowerCase().includes("llama")) {
    return "Open source";
  }
  if (model.status === "Beta") return "Research";
  return "Commercial";
}
function getModelOriginLabel(model) {
  return model.provider;
}
function getModelBaseFamily(model) {
  const n = model.name;
  if (/llama/i.test(n)) return "Llama family";
  if (/mistral/i.test(n)) return "Mistral family";
  if (/gemini/i.test(n)) return "Gemini family";
  if (/qwen/i.test(n)) return "Qwen family";
  if (/gpt/i.test(n)) return "GPT family";
  return null;
}
function getCatalogDataTypes(_model) {
  return ["bf16", "fp16"];
}
function getCatalogAccessFormats(_model) {
  return ["API", "Managed"];
}
function getCatalogQuantizations(model) {
  const out = ["None"];
  if (getParamBillions(model) != null && getParamBillions(model) >= 50) {
    out.push("int8");
  }
  return out;
}
const BOOSTER_POWERED_PROVIDER = "Booster Powered";
const MODEL_SORT_LABELS = {
  recommended: "Recommended",
  capability_desc: "Highest capability score",
  input_price_asc: "Lowest input price",
  output_price_asc: "Lowest output price",
  context_desc: "Largest context window",
  newest: "Newest"
};
const defaultFilters = {
  hosting: [],
  providers: [],
  capabilityScore: "any",
  modalities: [],
  apiCapabilities: [],
  features: [],
  pricePreset: "any",
  capabilityCategory: "",
  capabilityCategoryMin: "0",
  contextWindow: "any",
  modelSize: "any",
  minMemory: "any",
  licenses: [],
  dataTypes: [],
  accessFormats: [],
  quantizations: [],
  origins: [],
  baseModels: []
};
const defaultSort = "recommended";
const CONTEXT_MIN_MAP = {
  "32k": 32e3,
  "64k": 64e3,
  "128k": 128e3,
  "256k": 256e3
};
function contextMinTokens(preset) {
  if (preset === "any") return 0;
  return CONTEXT_MIN_MAP[preset];
}
let priceThresholdsCached;
function getPriceThresholds(catalog) {
  if (priceThresholdsCached && priceThresholdsCached.n === catalog.length) {
    return priceThresholdsCached;
  }
  const inputs = catalog.map((m) => m.inputCostPer1M).sort((a, b) => a - b);
  const n = inputs.length;
  const lowerMax = inputs[Math.max(0, Math.floor(n * 0.33) - 1)] ?? inputs[0] ?? 0;
  const midMax = inputs[Math.max(0, Math.floor(n * 0.66) - 1)] ?? inputs[n - 1] ?? 0;
  priceThresholdsCached = { lowerMax, midMax, n };
  return priceThresholdsCached;
}
function modelMatchesProvider(model, providers) {
  if (providers.length === 0) return true;
  return providers.some(
    (p) => p === BOOSTER_POWERED_PROVIDER ? model.hosting === "Booster Powered" : model.provider === p
  );
}
function providerOptionCounts(catalog) {
  const counts = /* @__PURE__ */ new Map();
  for (const m of catalog) {
    for (const p of /* @__PURE__ */ new Set([
      m.provider,
      ...m.hosting === "Booster Powered" ? [BOOSTER_POWERED_PROVIDER] : []
    ])) {
      counts.set(p, (counts.get(p) ?? 0) + 1);
    }
  }
  return counts;
}
function allProviderOptions(catalog) {
  const set = /* @__PURE__ */ new Set();
  for (const m of catalog) {
    set.add(m.provider);
    if (m.hosting === "Booster Powered") set.add(BOOSTER_POWERED_PROVIDER);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
const ALL_MODALITY_IDS = ["text", "image", "audio", "video"];
function modalityOptionCounts(catalog) {
  const counts = { text: 0, image: 0, audio: 0, video: 0 };
  for (const m of catalog) {
    for (const x of getCatalogModalities(m)) {
      if (x in counts) counts[x]++;
    }
  }
  return counts;
}
function visibleModalities(_catalog) {
  return [...ALL_MODALITY_IDS];
}
function optionSet(catalog, extract) {
  const s = /* @__PURE__ */ new Set();
  for (const m of catalog) {
    for (const x of extract(m)) s.add(x);
  }
  return s;
}
function visibleApiCapabilities(catalog) {
  const preferred = [
    "Chat Completions",
    "Responses",
    "Score",
    "Classify",
    "Embeddings",
    "Rerank",
    "Audio Transcriptions",
    "Audio Translations",
    "Chat Completions Legacy"
  ];
  const have = optionSet(catalog, getCatalogApiCapabilities);
  return preferred.filter((x) => have.has(x));
}
function visibleFeatures(catalog) {
  const preferred = [
    "Streaming",
    "Tool Use",
    "Structured Outputs",
    "Reasoning",
    "Stream Cancellation"
  ];
  const have = optionSet(catalog, getCatalogFeatures);
  return preferred.filter((x) => have.has(x));
}
function visibleBaseModels(catalog) {
  const set = /* @__PURE__ */ new Set();
  for (const m of catalog) {
    const f = getModelBaseFamily(m);
    if (f) set.add(f);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
function visibleLicenses(catalog) {
  const have = new Set(catalog.map((m) => getLicenseCategory(m)));
  return ["Commercial", "Open source", "Research"].filter((x) => have.has(x));
}
function visibleDataTypes(catalog) {
  const have = optionSet(catalog, getCatalogDataTypes);
  return ["bf16", "fp16", "fp32", "int8", "int4"].filter(
    (x) => have.has(x)
  );
}
function visibleAccessFormats(catalog) {
  const have = optionSet(catalog, getCatalogAccessFormats);
  return ["API", "Managed"].filter((x) => have.has(x));
}
function visibleQuantizations(catalog) {
  const have = optionSet(catalog, getCatalogQuantizations);
  return ["None", "int8", "int4"].filter((x) => have.has(x));
}
function overallCapabilityMin(filters) {
  if (filters.capabilityScore === "any") return 0;
  return Number.parseInt(filters.capabilityScore, 10);
}
function categoryMinThreshold(filters) {
  if (filters.capabilityCategoryMin === "0") return 0;
  return Number.parseInt(filters.capabilityCategoryMin, 10);
}
function matchesModelSize(model, preset) {
  if (preset === "any") return true;
  const b = getParamBillions(model);
  if (b == null) return false;
  switch (preset) {
    case "lt10":
      return b < 10;
    case "b10_50":
      return b >= 10 && b < 50;
    case "b50_100":
      return b >= 50 && b < 100;
    case "b100p":
      return b >= 100;
    default:
      return true;
  }
}
function matchesMinMemory(_model, _preset) {
  return true;
}
function applyModelFilters(modelList, filters, catalog = models) {
  const { lowerMax, midMax } = getPriceThresholds(catalog);
  const capMin = overallCapabilityMin(filters);
  const ctxNeed = contextMinTokens(filters.contextWindow);
  const catNeed = categoryMinThreshold(filters);
  return modelList.filter((m) => {
    if (filters.hosting.length > 0 && !filters.hosting.includes(m.hosting))
      return false;
    if (!modelMatchesProvider(m, filters.providers)) return false;
    if (capMin > 0 && getOverallModelScore(m) < capMin) return false;
    if (filters.modalities.length > 0) {
      const have = new Set(getCatalogModalities(m));
      const ok = filters.modalities.some((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.apiCapabilities.length > 0) {
      const have = new Set(getCatalogApiCapabilities(m));
      const ok = filters.apiCapabilities.every((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.features.length > 0) {
      const have = new Set(getCatalogFeatures(m));
      const ok = filters.features.every((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.pricePreset !== "any") {
      const inp = m.inputCostPer1M;
      if (filters.pricePreset === "lower" && inp > lowerMax) return false;
      if (filters.pricePreset === "mid" && (inp <= lowerMax || inp > midMax))
        return false;
      if (filters.pricePreset === "higher" && inp <= midMax) return false;
    }
    if (filters.capabilityCategory !== "" && catNeed > 0) {
      const score = getCapabilityCategoryScore(
        m,
        filters.capabilityCategory
      );
      if (score == null || score < catNeed) return false;
    }
    if (ctxNeed > 0 && m.contextLength < ctxNeed) return false;
    if (filters.modelSize !== "any" && !matchesModelSize(m, filters.modelSize))
      return false;
    if (filters.minMemory !== "any" && !matchesMinMemory(m, filters.minMemory))
      ;
    if (filters.licenses.length > 0 && !filters.licenses.includes(getLicenseCategory(m)))
      return false;
    if (filters.dataTypes.length > 0) {
      const have = new Set(getCatalogDataTypes());
      const ok = filters.dataTypes.some((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.accessFormats.length > 0) {
      const have = new Set(getCatalogAccessFormats());
      const ok = filters.accessFormats.some((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.quantizations.length > 0) {
      const have = new Set(getCatalogQuantizations(m));
      const ok = filters.quantizations.some((x) => have.has(x));
      if (!ok) return false;
    }
    if (filters.origins.length > 0 && !filters.origins.includes(getModelOriginLabel(m)))
      return false;
    if (filters.baseModels.length > 0) {
      const fam = getModelBaseFamily(m);
      if (!fam || !filters.baseModels.includes(fam)) return false;
    }
    return true;
  });
}
function compareModelsForSort(a, b, sort, catalogOrder) {
  switch (sort) {
    case "recommended":
      return (catalogOrder.get(a.id) ?? 0) - (catalogOrder.get(b.id) ?? 0);
    case "capability_desc":
      return getOverallModelScore(b) - getOverallModelScore(a);
    case "input_price_asc":
      return a.inputCostPer1M - b.inputCostPer1M;
    case "output_price_asc":
      return a.outputCostPer1M - b.outputCostPer1M;
    case "context_desc":
      return b.contextLength - a.contextLength;
    case "newest": {
      const da = (/* @__PURE__ */ new Date(`${a.addedDate}T12:00:00`)).getTime();
      const db = (/* @__PURE__ */ new Date(`${b.addedDate}T12:00:00`)).getTime();
      return db - da;
    }
    default:
      return 0;
  }
}
function sortModels(list, sort, catalogOrder) {
  const out = [...list];
  out.sort((a, b) => compareModelsForSort(a, b, sort, catalogOrder));
  return out;
}
const checkboxVariants = cva(
  "group peer shrink-0 border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
  {
    variants: {
      size: {
        md: "h-icon-20 w-icon-20 rounded-sm",
        lg: "h-icon-24 w-icon-24 rounded-md"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current",
  {
    variants: {
      size: {
        md: "scale-100",
        lg: "scale-100"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const checkboxIconVariants = cva("", {
  variants: {
    size: {
      md: "h-icon-16 w-icon-16",
      lg: "h-icon-20 w-icon-20"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const Checkbox = reactExports.forwardRef(({ className, size, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(checkboxVariants({ size }), className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CheckboxIndicator,
      {
        className: cn(checkboxIndicatorVariants({ size })),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Check,
            {
              className: cn(
                "hidden group-data-[state=checked]:block",
                checkboxIconVariants({ size })
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Minus,
            {
              className: cn(
                "hidden group-data-[state=indeterminate]:block",
                checkboxIconVariants({ size })
              )
            }
          )
        ]
      }
    )
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Viewport, { className: "h-full w-full rounded-inherit", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
    ]
  }
));
ScrollArea.displayName = Root.displayName;
const ScrollBar = reactExports.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors duration-200",
      orientation === "vertical" && "h-full w-scroll-area border-l border-l-transparent py-3 px-px",
      orientation === "horizontal" && "h-scroll-area w-full flex-col border-t border-t-transparent px-3 py-px",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
const API_LEGACY = /* @__PURE__ */ new Set(["Chat Completions Legacy"]);
function sortApiCapabilities(opts) {
  return [...opts].sort((a, b) => {
    const la = API_LEGACY.has(a) ? 1 : 0;
    const lb = API_LEGACY.has(b) ? 1 : 0;
    if (la !== lb) return la - lb;
    return a.localeCompare(b);
  });
}
function modalityIcon(id) {
  switch (id) {
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
function modalityLabel(id) {
  return id.slice(0, 1).toUpperCase() + id.slice(1);
}
function FilterTooltip({
  label,
  tooltip,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "rounded-sm text-muted-foreground hover:text-foreground",
          "aria-label": `About ${label}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption", children: "ⓘ" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", className: "max-w-xs", children: tooltip })
    ] })
  ] });
}
function toggleList(list, item) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}
const PRICE_LABELS = {
  any: "Price",
  lower: "Lower cost",
  mid: "Mid cost",
  higher: "Higher cost"
};
function ModelCosmosFilterBar({
  catalog,
  filters,
  onFiltersChange,
  className
}) {
  const [providerSearch, setProviderSearch] = reactExports.useState("");
  const [moreOpen, setMoreOpen] = reactExports.useState(false);
  const providerCounts = reactExports.useMemo(() => providerOptionCounts(catalog), [catalog]);
  const providerOptions = reactExports.useMemo(() => allProviderOptions(catalog), [catalog]);
  const modalityOptions = reactExports.useMemo(() => visibleModalities(), [catalog]);
  const modalityCounts = reactExports.useMemo(() => modalityOptionCounts(catalog), [catalog]);
  const apiOptions = reactExports.useMemo(
    () => sortApiCapabilities(visibleApiCapabilities(catalog)),
    [catalog]
  );
  const featureOptions = reactExports.useMemo(() => visibleFeatures(catalog), [catalog]);
  const licenseOptions = reactExports.useMemo(() => visibleLicenses(catalog), [catalog]);
  const dataTypeOpts = reactExports.useMemo(() => visibleDataTypes(catalog), [catalog]);
  const formatOpts = reactExports.useMemo(() => visibleAccessFormats(catalog), [catalog]);
  const quantOpts = reactExports.useMemo(() => visibleQuantizations(catalog), [catalog]);
  const baseOpts = reactExports.useMemo(() => visibleBaseModels(catalog), [catalog]);
  const filteredProviders = reactExports.useMemo(() => {
    const q = providerSearch.trim().toLowerCase();
    if (!q) return providerOptions;
    return providerOptions.filter((p) => p.toLowerCase().includes(q));
  }, [providerOptions, providerSearch]);
  const showProviderSearch = providerOptions.length > 9;
  const capabilityLabel = filters.capabilityScore === "any" ? "Capability score" : `${filters.capabilityScore}+`;
  const chipGroups = reactExports.useMemo(() => {
    const out = [];
    for (const h of filters.hosting) {
      out.push({
        key: `hosting-${h}`,
        label: `Hosting: ${h}`,
        onRemove: () => onFiltersChange({
          ...filters,
          hosting: filters.hosting.filter((x) => x !== h)
        })
      });
    }
    for (const p of filters.providers) {
      out.push({
        key: `provider-${p}`,
        label: p,
        onRemove: () => onFiltersChange({
          ...filters,
          providers: filters.providers.filter((x) => x !== p)
        })
      });
    }
    if (filters.capabilityScore !== "any") {
      out.push({
        key: "cap-score",
        label: `Capability score: ${filters.capabilityScore}+`,
        onRemove: () => onFiltersChange({ ...filters, capabilityScore: "any" })
      });
    }
    for (const m of filters.modalities) {
      out.push({
        key: `mod-${m}`,
        label: `Modality: ${modalityLabel(m)}`,
        onRemove: () => onFiltersChange({
          ...filters,
          modalities: filters.modalities.filter((x) => x !== m)
        })
      });
    }
    for (const a of filters.apiCapabilities) {
      out.push({
        key: `api-${a}`,
        label: `API: ${a}`,
        onRemove: () => onFiltersChange({
          ...filters,
          apiCapabilities: filters.apiCapabilities.filter((x) => x !== a)
        })
      });
    }
    for (const f of filters.features) {
      out.push({
        key: `feat-${f}`,
        label: `Feature: ${f}`,
        onRemove: () => onFiltersChange({
          ...filters,
          features: filters.features.filter((x) => x !== f)
        })
      });
    }
    if (filters.pricePreset !== "any") {
      out.push({
        key: "price",
        label: `Price: ${PRICE_LABELS[filters.pricePreset]}`,
        onRemove: () => onFiltersChange({ ...filters, pricePreset: "any" })
      });
    }
    if (filters.capabilityCategory !== "" && filters.capabilityCategoryMin !== "0") {
      out.push({
        key: "cat-min",
        label: `${filters.capabilityCategory}: ${filters.capabilityCategoryMin}+`,
        onRemove: () => onFiltersChange({
          ...filters,
          capabilityCategory: "",
          capabilityCategoryMin: "0"
        })
      });
    }
    if (filters.contextWindow !== "any") {
      out.push({
        key: "ctx",
        label: `Context: ${filters.contextWindow}+`,
        onRemove: () => onFiltersChange({ ...filters, contextWindow: "any" })
      });
    }
    if (filters.modelSize !== "any") {
      const sizeLabel = filters.modelSize === "lt10" ? "Under 10B" : filters.modelSize === "b10_50" ? "10B–50B" : filters.modelSize === "b50_100" ? "50B–100B" : "100B+";
      out.push({
        key: "size",
        label: `Model size: ${sizeLabel}`,
        onRemove: () => onFiltersChange({ ...filters, modelSize: "any" })
      });
    }
    if (filters.minMemory !== "any") {
      out.push({
        key: "mem",
        label: `Memory: ${filters.minMemory}`,
        onRemove: () => onFiltersChange({ ...filters, minMemory: "any" })
      });
    }
    for (const lic of filters.licenses) {
      out.push({
        key: `lic-${lic}`,
        label: `License: ${lic}`,
        onRemove: () => onFiltersChange({
          ...filters,
          licenses: filters.licenses.filter((x) => x !== lic)
        })
      });
    }
    for (const d of filters.dataTypes) {
      out.push({
        key: `dt-${d}`,
        label: `Data type: ${d}`,
        onRemove: () => onFiltersChange({
          ...filters,
          dataTypes: filters.dataTypes.filter((x) => x !== d)
        })
      });
    }
    for (const f of filters.accessFormats) {
      out.push({
        key: `fmt-${f}`,
        label: `Access: ${f}`,
        onRemove: () => onFiltersChange({
          ...filters,
          accessFormats: filters.accessFormats.filter((x) => x !== f)
        })
      });
    }
    for (const q of filters.quantizations) {
      out.push({
        key: `q-${q}`,
        label: `Quantization: ${q}`,
        onRemove: () => onFiltersChange({
          ...filters,
          quantizations: filters.quantizations.filter((x) => x !== q)
        })
      });
    }
    for (const o of filters.origins) {
      out.push({
        key: `or-${o}`,
        label: `Origin: ${o}`,
        onRemove: () => onFiltersChange({
          ...filters,
          origins: filters.origins.filter((x) => x !== o)
        })
      });
    }
    for (const b of filters.baseModels) {
      out.push({
        key: `base-${b}`,
        label: `Base: ${b}`,
        onRemove: () => onFiltersChange({
          ...filters,
          baseModels: filters.baseModels.filter((x) => x !== b)
        })
      });
    }
    return out;
  }, [filters, onFiltersChange]);
  const hasChips = chipGroups.length > 0;
  const filterButtonClass = (active) => cn(
    "gap-1 rounded-md border border-input bg-background px-2.5 text-body-sm font-medium shadow-xs",
    active && "border-primary/60 bg-primary/5"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex min-w-0 flex-col gap-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(
              filters.providers.length > 0
            ),
            children: [
              "Provider",
              filters.providers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: filters.providers.length }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "max-w-modal-sm w-full p-0", align: "start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-b border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-body-sm", children: "Provider" }),
            showProviderSearch ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search providers…",
                value: providerSearch,
                onChange: (e) => setProviderSearch(e.target.value),
                className: "h-8"
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 p-2", children: filteredProviders.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: filters.providers.includes(p),
                    onCheckedChange: () => onFiltersChange({
                      ...filters,
                      providers: toggleList(filters.providers, p)
                    })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-body-sm", children: p === BOOSTER_POWERED_PROVIDER ? "Booster Powered" : p }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption text-muted-foreground", children: providerCounts.get(p) ?? 0 })
              ]
            },
            p
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(
              filters.capabilityScore !== "any"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterTooltip,
                {
                  label: "Capability score",
                  tooltip: "Aggregated performance score based on supported capability categories, benchmarks, and weighting. This is a platform evaluation, not an absolute quality ranking.",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: capabilityLabel })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-56 p-2", align: "start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pb-2 text-caption text-muted-foreground", children: "Overall score threshold (Booster evaluation)." }),
          [
            ["any", "Any score"],
            ["90", "90+"],
            ["80", "80+"],
            ["70", "70+"],
            ["60", "60+"]
          ].map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: cn(
                "w-full rounded-md px-2 py-1.5 text-left text-body-sm hover:bg-accent",
                filters.capabilityScore === value && "bg-accent"
              ),
              onClick: () => onFiltersChange({
                ...filters,
                capabilityScore: value
              }),
              children: label
            },
            value
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(filters.modalities.length > 0),
            children: [
              "Modality",
              filters.modalities.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: filters.modalities.length }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-64 p-3", align: "start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterTooltip,
            {
              label: "Modality",
              tooltip: "Filter models by supported input and output types.",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium", children: "Modality" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-muted-foreground", children: "Match any selected modality." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: modalityOptions.map((id) => {
            const Icon = modalityIcon(id);
            const on = filters.modalities.includes(id);
            const count = modalityCounts[id] ?? 0;
            const unavailable = count === 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: unavailable,
                title: unavailable ? "No models in catalog with this modality" : void 0,
                onClick: () => {
                  if (unavailable) return;
                  onFiltersChange({
                    ...filters,
                    modalities: toggleList(filters.modalities, id)
                  });
                },
                className: cn(
                  "flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-body-sm transition-colors",
                  unavailable && "cursor-not-allowed opacity-50 hover:bg-transparent",
                  !unavailable && (on ? "border-primary/60 bg-primary/10" : "hover:bg-accent")
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-16 w-icon-16", "aria-hidden": true }),
                  modalityLabel(id)
                ]
              },
              id
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(
              filters.apiCapabilities.length > 0
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Supported APIs" }),
              filters.apiCapabilities.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: filters.apiCapabilities.length }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "max-w-modal-sm w-full p-0", align: "start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Supported APIs",
                tooltip: "Filter models by supported API endpoint types. Multiple selections require a model to support all selected endpoints.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium", children: "Supported APIs" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-muted-foreground", children: "Match all selected (AND)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 p-2", children: apiOptions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: cn(
                "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent",
                API_LEGACY.has(a) && "opacity-80"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: filters.apiCapabilities.includes(a),
                    onCheckedChange: () => onFiltersChange({
                      ...filters,
                      apiCapabilities: toggleList(
                        filters.apiCapabilities,
                        a
                      )
                    })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm", children: a })
              ]
            },
            a
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(filters.features.length > 0),
            children: [
              "Features",
              filters.features.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: filters.features.length }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "max-w-modal-sm w-full p-0", align: "start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium", children: "Features" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-muted-foreground", children: "Match all selected (AND)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 p-2", children: featureOptions.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: filters.features.includes(f),
                    onCheckedChange: () => onFiltersChange({
                      ...filters,
                      features: toggleList(filters.features, f)
                    })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-1 items-center gap-1 text-body-sm", children: [
                  f,
                  f === "Reasoning" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-caption text-muted-foreground",
                        "aria-label": "About Reasoning feature",
                        children: "ⓘ"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: "Supports reasoning-oriented behavior or reasoning mode where available." })
                  ] }) : null
                ] })
              ]
            },
            f
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: filterButtonClass(filters.pricePreset !== "any"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterTooltip,
                {
                  label: "Price",
                  tooltip: "Token pricing shown per 1M input tokens (preset buckets). Actual cost depends on usage.",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: PRICE_LABELS[filters.pricePreset] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-56 p-2", align: "start", children: [
          ["any", "Any price"],
          ["lower", "Lower cost"],
          ["mid", "Mid cost"],
          ["higher", "Higher cost"]
        ].map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: cn(
              "w-full rounded-md px-2 py-1.5 text-left text-body-sm hover:bg-accent",
              filters.pricePreset === value && "bg-accent"
            ),
            onClick: () => onFiltersChange({
              ...filters,
              pricePreset: value
            }),
            children: label
          },
          value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1",
          onClick: () => setMoreOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-icon-16 w-icon-16" }),
            "More filters"
          ]
        }
      )
    ] }),
    hasChips ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
      chipGroups.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "gap-1 pr-1 font-normal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[240px] truncate", children: c.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "rounded-sm p-0.5 hover:bg-background/80",
                onClick: c.onRemove,
                "aria-label": `Remove ${c.label}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
              }
            )
          ]
        },
        c.key
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "shrink-0 text-muted-foreground",
          onClick: () => onFiltersChange({ ...defaultFilters }),
          children: "Clear all"
        }
      )
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: moreOpen, onOpenChange: setMoreOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "w-full overflow-y-auto sm:max-w-modal-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "More filters" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "mt-4 h-[calc(100vh-8rem)] pr-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-sm font-semibold", children: "Performance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Capability category",
                tooltip: "Filter by category-level performance scores instead of the overall capability score.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Capability category" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.capabilityCategory || "none",
                onValueChange: (v) => onFiltersChange({
                  ...filters,
                  capabilityCategory: v === "none" ? "" : v,
                  capabilityCategoryMin: v === "none" ? "0" : filters.capabilityCategoryMin
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any category" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Any category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Agents", children: "Agents" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Coding", children: "Coding" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "General", children: "General" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Scientific Reasoning", children: "Scientific Reasoning" })
                  ] })
                ]
              }
            ),
            filters.capabilityCategory !== "" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.capabilityCategoryMin,
                onValueChange: (v) => onFiltersChange({
                  ...filters,
                  capabilityCategoryMin: v
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Minimum score" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "Any" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "70", children: "70+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "80", children: "80+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "90+" })
                  ] })
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Context window",
                tooltip: "Maximum amount of text the model can process in one request, measured in tokens.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Context window" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.contextWindow,
                onValueChange: (v) => onFiltersChange({
                  ...filters,
                  contextWindow: v
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "any", children: "Any context window" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "32k", children: "32K+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "64k", children: "64K+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "128k", children: "128K+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "256k", children: "256K+" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-sm font-semibold", children: "Cost & requirements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Model size",
                tooltip: "Approximate model size based on number of parameters. Larger models are not always better for every use case.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Model size" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filters.modelSize,
                onValueChange: (v) => onFiltersChange({
                  ...filters,
                  modelSize: v
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "any", children: "Any size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lt10", children: "Under 10B" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "b10_50", children: "10B–50B" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "b50_100", children: "50B–100B" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "b100p", children: "100B+" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-sm font-semibold", children: "Provider & licensing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "License",
                tooltip: "Filter models by available usage or licensing category.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "License" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: licenseOptions.map((lic) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 rounded-md border border-border px-2 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.licenses.includes(lic),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        licenses: toggleList(filters.licenses, lic)
                      })
                    }
                  ),
                  lic
                ]
              },
              lic
            )) })
          ] }),
          baseOpts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Base model",
                tooltip: "Underlying model family or parent model, when available.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Base model" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-40 overflow-y-auto rounded-md border border-border p-2", children: baseOpts.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.baseModels.includes(b),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        baseModels: toggleList(
                          filters.baseModels,
                          b
                        )
                      })
                    }
                  ),
                  b
                ]
              },
              b
            )) })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-sm font-semibold", children: "Technical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Data type",
                tooltip: "Numerical format used by the model or serving configuration.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Data type" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: dataTypeOpts.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 rounded-md border border-border px-2 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.dataTypes.includes(d),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        dataTypes: toggleList(filters.dataTypes, d)
                      })
                    }
                  ),
                  d
                ]
              },
              d
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Access format",
                tooltip: "Shows how the model is made available, such as API-based or managed access.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Access format" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: formatOpts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 rounded-md border border-border px-2 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.accessFormats.includes(f),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        accessFormats: toggleList(
                          filters.accessFormats,
                          f
                        )
                      })
                    }
                  ),
                  f
                ]
              },
              f
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilterTooltip,
              {
                label: "Quantization",
                tooltip: "Model compression method that can reduce memory or compute requirements.",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantization" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: quantOpts.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "flex items-center gap-2 rounded-md border border-border px-2 py-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.quantizations.includes(q),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        quantizations: toggleList(
                          filters.quantizations,
                          q
                        )
                      })
                    }
                  ),
                  q
                ]
              },
              q
            )) })
          ] })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ModelCosmosResults({
  catalog,
  filters,
  setFilters,
  filtered,
  sortedFiltered,
  page,
  setPage,
  pageSize
}) {
  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const paginatedModels = sortedFiltered.slice(pageStart, pageStart + pageSize);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModelCosmosFilterBar,
      {
        catalog,
        filters,
        onFiltersChange: setFilters
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: paginatedModels.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app/cosmos/$modelId",
          params: { modelId: model.id },
          search: { returnTo: "/app/cosmos", returnLabel: "Cosmos" },
          className: "block h-full min-w-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosCard, { model, variant: "basic" })
        },
        model.id
      )) }),
      filtered.length > pageSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm text-muted-foreground", children: [
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
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground", children: "No models match these filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-body-sm", children: "Try removing some filters or lowering the capability score." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "mt-4",
            onClick: () => setFilters({ ...defaultFilters }),
            children: "Clear all filters"
          }
        )
      ] })
    ] })
  ] });
}
function ModelCosmosSearchBar({
  search,
  setSearch,
  sort,
  onSortChange,
  totalResults,
  page,
  pageSize,
  className
}) {
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const showPaginationRange = totalResults > pageSize && totalResults > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0 flex-1 sm:max-w-md", children: [
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
              placeholder: "Search models…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-10"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:ml-auto", children: [
          showPaginationRange ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-caption text-muted-foreground whitespace-nowrap text-right", children: [
            "Showing ",
            pageStart + 1,
            "–",
            Math.min(pageStart + pageSize, totalResults),
            " of ",
            totalResults
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground whitespace-nowrap", children: "Sort by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sort,
              onValueChange: (v) => onSortChange(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-control-md w-full min-w-[200px] sm:w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(MODEL_SORT_LABELS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: MODEL_SORT_LABELS[k] }, k)) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const COSMOS_PAGE_SIZE = 16;
const modelCatalogOrder = new Map(models.map((m, i) => [m.id, i]));
function ModelCosmosPage() {
  const {
    hosting: hostingParam
  } = Route$8.useSearch();
  const [search, setSearch] = reactExports.useState("");
  const [filters, setFilters] = reactExports.useState(() => ({
    ...defaultFilters,
    ...hostingParam ? {
      hosting: [hostingParam]
    } : {}
  }));
  const [sort, setSort] = reactExports.useState(defaultSort);
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => applyModelFilters(models.filter((m) => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q);
  }), filters, models), [search, filters]);
  const sortedFiltered = reactExports.useMemo(() => sortModels(filtered, sort, modelCatalogOrder), [filtered, sort]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [search, filters, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-6", className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Model Cosmos", description: "Explore models designed for different tasks and performance needs. Assign to endpoints and switch anytime without disruption.", descriptionMaxWidthPageIntro: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosSearchBar, { search, setSearch, sort, onSortChange: setSort, totalResults: sortedFiltered.length, page, pageSize: COSMOS_PAGE_SIZE }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosResults, { catalog: models, filters, setFilters, filtered, sortedFiltered, page, setPage, pageSize: COSMOS_PAGE_SIZE })
  ] }) }) });
}
export {
  ModelCosmosPage as component
};
