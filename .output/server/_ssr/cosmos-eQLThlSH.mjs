import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageContainer } from "./PageContainer-Di6eNGHA.mjs";
import { P as PageHeader } from "./PageHeader-Baz_Bnm1.mjs";
import { n as Route$8, m as models, h as getOverallModelScore, c as cn, g as modelHasVisionCapability, i as getMathScore, j as getReasoningScore, k as getCodingScore, a as Tooltip, b as TooltipTrigger, d as TooltipContent, l as formatEurPer1MForDisplay } from "./router-dUByybLQ.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as ModelCosmosCard } from "./ModelCosmosCard-CyJGfZ9B.mjs";
import { g as getPaginationWindow } from "./pagination-window-Bk7NjDnL.mjs";
import { B as Badge, b as badgeVariants } from "./badge-TVJ2MtYX.mjs";
import { B as Button } from "./button-BoQ28Ykk.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, c as PopoverMenuFooter } from "./popover-BEZQPXq5.mjs";
import { R as Root, V as Viewport, C as Corner, S as ScrollAreaScrollbar, a as ScrollAreaThumb } from "../_libs/radix-ui__react-scroll-area.mjs";
import { a as InputField, I as Input, L as Label } from "./input-CTo6zooE.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-oURvK7AO.mjs";
import { S as Separator } from "./separator-sUe_iKu6.mjs";
import { S as Sheet, A as AppSideSheetContent } from "./AppSideSheet-B3GceMgW.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-CmkzRKD2.mjs";
import { R as Root$1, T as Track, a as Range, b as Thumb } from "../_libs/radix-ui__react-slider.mjs";
import "./model-provider-logos-DIoDvw6k.mjs";
import "./card-CjswpSeu.mjs";
import { r as Search, s as SlidersHorizontal, X, C as ChevronDown, o as Check, t as Minus, I as Info, u as Type, V as Video, v as Mic, w as Image } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/t3-oss__env-core.mjs";
import "../_libs/zod.mjs";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
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
const CAPABILITY_CATEGORY_MATCHERS = {
  Agents: /efficiency|agent|batch|throughput/i,
  Coding: /code|programming|debug/i,
  General: /language|multilingual|knowledge|custom/i,
  "Scientific Reasoning": /reasoning|math|logical|scientific/i
};
function getCapabilityCategoryRecords(model, category) {
  const matcher = CAPABILITY_CATEGORY_MATCHERS[category];
  return model.capabilities.filter((cap) => matcher.test(cap.name));
}
function getCapabilitySubcategoryNames(model, category) {
  return getCapabilityCategoryRecords(model, category).flatMap(
    (cap) => cap.subs.map((sub) => sub.name)
  );
}
function getCapabilitySubcategoryScore(model, category, subcategory) {
  for (const cap of getCapabilityCategoryRecords(model, category)) {
    const sub = cap.subs.find((item) => item.name === subcategory);
    if (sub) return sub.score;
  }
  return null;
}
function capabilitySubcategoryViableAtMinScore(catalog, category, subcategory, minScore) {
  if (minScore <= 0) return true;
  for (const m of catalog) {
    const catScore = getCapabilityCategoryScore(m, category);
    if (catScore == null || catScore < minScore) continue;
    const subScore = getCapabilitySubcategoryScore(m, category, subcategory);
    if (subScore != null && subScore >= minScore) return true;
  }
  return false;
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
  capability_desc: "Capability score",
  input_price_asc: "Lowest input cost",
  output_price_asc: "Lowest output cost",
  context_desc: "Largest context",
  newest: "Newest"
};
const PRICE_SLIDER_STEP = 0.05;
function catalogPriceSliderCeilingEUR(maxObserved, step = PRICE_SLIDER_STEP) {
  if (!Number.isFinite(maxObserved) || maxObserved <= 0) {
    return Math.max(step * 40, 1);
  }
  const padded = maxObserved * 1.05;
  return Math.ceil(padded / step) * step;
}
function catalogPriceSliderBoundsEUR(catalog) {
  if (catalog.length === 0) {
    return {
      step: PRICE_SLIDER_STEP,
      input: { min: 0, ceiling: 10 },
      output: { min: 0, ceiling: 20 }
    };
  }
  let maxIn = 0;
  let maxOut = 0;
  for (const m of catalog) {
    if (m.inputCostPer1M > maxIn) maxIn = m.inputCostPer1M;
    if (m.outputCostPer1M > maxOut) maxOut = m.outputCostPer1M;
  }
  return {
    step: PRICE_SLIDER_STEP,
    input: { min: 0, ceiling: catalogPriceSliderCeilingEUR(maxIn) },
    output: { min: 0, ceiling: catalogPriceSliderCeilingEUR(maxOut) }
  };
}
const defaultFilters = {
  hosting: [],
  providers: [],
  capabilityScore: "any",
  modalities: [],
  apiCapabilities: [],
  features: [],
  priceInputMaxPer1M: null,
  priceOutputMaxPer1M: null,
  capabilityCategory: "",
  capabilityCategoryMin: "0",
  capabilitySubcategories: [],
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
function toggleStringList(list, item) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}
function moreFiltersSheetBadgeCount(filters) {
  return (filters.contextWindow !== "any" ? 1 : 0) + (filters.modelSize !== "any" ? 1 : 0) + filters.licenses.length + filters.baseModels.length + filters.dataTypes.length + filters.accessFormats.length + filters.quantizations.length;
}
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
const ALL_MODALITY_IDS = ["text", "image", "audio", "video"];
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
  return ["Commercial", "Open source", "Research"].filter(
    (x) => have.has(x)
  );
}
function visibleDataTypes(catalog) {
  const have = optionSet(catalog, getCatalogDataTypes);
  return ["bf16", "fp16", "fp32", "int8", "int4"].filter((x) => have.has(x));
}
function visibleAccessFormats(catalog) {
  const have = optionSet(catalog, getCatalogAccessFormats);
  return ["API", "Managed"].filter((x) => have.has(x));
}
function visibleQuantizations(catalog) {
  const have = optionSet(catalog, getCatalogQuantizations);
  return ["None", "int8", "int4"].filter((x) => have.has(x));
}
function isFiltersActive(filters) {
  return filters.hosting.length > 0 || filters.providers.length > 0 || filters.capabilityScore !== "any" || filters.modalities.length > 0 || filters.apiCapabilities.length > 0 || filters.features.length > 0 || filters.priceInputMaxPer1M != null || filters.priceOutputMaxPer1M != null || filters.capabilityCategory !== "" || filters.contextWindow !== "any" || filters.modelSize !== "any" || filters.minMemory !== "any" || filters.licenses.length > 0 || filters.dataTypes.length > 0 || filters.accessFormats.length > 0 || filters.quantizations.length > 0 || filters.origins.length > 0 || filters.baseModels.length > 0;
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
function applyModelFilters(modelList, filters, _catalog = models) {
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
    if (filters.priceInputMaxPer1M != null && m.inputCostPer1M > filters.priceInputMaxPer1M)
      return false;
    if (filters.priceOutputMaxPer1M != null && m.outputCostPer1M > filters.priceOutputMaxPer1M)
      return false;
    if (filters.capabilityCategory !== "") {
      const score = getCapabilityCategoryScore(
        m,
        filters.capabilityCategory
      );
      if (score == null || catNeed > 0 && score < catNeed) return false;
    }
    if (filters.capabilityCategory !== "" && filters.capabilitySubcategories.length > 0) {
      const ok = filters.capabilitySubcategories.every((subcategory) => {
        const score = getCapabilitySubcategoryScore(
          m,
          filters.capabilityCategory,
          subcategory
        );
        return score != null && (catNeed === 0 || score >= catNeed);
      });
      if (!ok) return false;
    }
    if (ctxNeed > 0 && m.contextLength < ctxNeed) return false;
    if (filters.modelSize !== "any" && !matchesModelSize(m, filters.modelSize))
      return false;
    if (filters.minMemory !== "any" && !matchesMinMemory(m, filters.minMemory))
      return false;
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
const FILTER_POPOVER_PANEL_WIDTH = "w-[320px] max-w-[320px]";
const FILTER_POPOVER_CHECKBOX_ROW_CLASS = "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ease-standard hover:bg-muted focus-within:bg-muted active:bg-muted/80";
function filterToolbarButtonClassName(active) {
  return cn(
    "gap-1 rounded-md border border-input bg-card px-2.5 text-body-sm font-medium shadow-xs transition-colors ease-standard hover:border-ring",
    active && "border-primary/60 bg-primary/5 hover:border-primary hover:bg-primary/10"
  );
}
function FilterPopoverPanel({
  className,
  align = "start",
  sideOffset,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverContent,
    {
      className: cn(FILTER_POPOVER_PANEL_WIDTH, "p-0", className),
      align,
      sideOffset,
      ...rest,
      children
    }
  );
}
function FilterPopoverHeader({
  title,
  description,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("border-b border-border p-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-medium", children: title }),
    description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-caption text-muted-foreground", children: description }) : null,
    children
  ] });
}
function FilterPopoverScrollBody({
  scrollHeightClassName,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: cn(scrollHeightClassName, className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 p-2", children }) });
}
function FilterPopoverClearFooter({
  disabled,
  label,
  onClear
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverMenuFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      className: "w-full",
      disabled,
      onClick: onClear,
      children: label
    }
  ) });
}
function FilterCheckboxRow({
  className,
  ...props
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox is the labeled control; Radix generates the input association.
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        className: cn(FILTER_POPOVER_CHECKBOX_ROW_CLASS, className),
        ...props
      }
    )
  );
}
const FilterTriggerButton = reactExports.forwardRef(function FilterTriggerButton2({ active, badgeCount, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      type: "button",
      variant: "ghost",
      size: "sm",
      className: cn(filterToolbarButtonClassName(active), className),
      ...props,
      children: [
        children,
        badgeCount != null && badgeCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: badgeCount }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 opacity-50", "aria-hidden": true })
      ]
    }
  );
});
const LEGACY_API_CAPABILITY_IDS = /* @__PURE__ */ new Set(["Chat Completions Legacy"]);
function sortApiCapabilitiesForToolbar(opts) {
  return [...opts].sort((a, b) => {
    const la = LEGACY_API_CAPABILITY_IDS.has(a) ? 1 : 0;
    const lb = LEGACY_API_CAPABILITY_IDS.has(b) ? 1 : 0;
    if (la !== lb) return la - lb;
    return a.localeCompare(b);
  });
}
function ApiCapabilitiesFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const apiOptions = reactExports.useMemo(
    () => sortApiCapabilitiesForToolbar(visibleApiCapabilities(catalog)),
    [catalog]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: filters.apiCapabilities.length > 0,
        badgeCount: filters.apiCapabilities.length > 0 ? filters.apiCapabilities.length : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Endpoints" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverHeader,
        {
          title: "Endpoints",
          description: "Filter models by supported API endpoint types. Multiple selections require a model to support all selected endpoints. Match all selected (AND)."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterPopoverScrollBody, { scrollHeightClassName: "h-64", children: apiOptions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        FilterCheckboxRow,
        {
          className: cn(
            LEGACY_API_CAPABILITY_IDS.has(a) && "opacity-80"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: filters.apiCapabilities.includes(a),
                onCheckedChange: () => onFiltersChange({
                  ...filters,
                  apiCapabilities: toggleStringList(
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
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: filters.apiCapabilities.length === 0,
          label: "Clear API selections",
          onClear: () => onFiltersChange({ ...filters, apiCapabilities: [] })
        }
      )
    ] })
  ] });
}
const COSMOS_TOOLBAR_PROVIDER_OPTIONS = [
  BOOSTER_POWERED_PROVIDER,
  "Scaleway",
  "EUrouter"
];
const MORE_FILTERS_CATEGORY_OPTIONS = [
  { value: "none", label: "Any" },
  { value: "Agents", label: "Agents" },
  { value: "Coding", label: "Coding" },
  { value: "General", label: "General" },
  {
    value: "Scientific Reasoning",
    label: "Scientific Reasoning"
  }
];
const MORE_FILTERS_CONTEXT_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "32k", label: "32K+" },
  { value: "64k", label: "64K+" },
  { value: "128k", label: "128K+" },
  { value: "256k", label: "256K+" }
];
const MORE_FILTERS_MODEL_SIZE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "lt10", label: "<10B" },
  { value: "b10_50", label: "10B–50B" },
  { value: "b50_100", label: "50B–100B" },
  { value: "b100p", label: "100B+" }
];
const TOOLBAR_CAPABILITY_SCORE_OPTIONS = [
  { value: "0", label: "Any" },
  { value: "60", label: "60% +" },
  { value: "70", label: "70% +" },
  { value: "80", label: "80% +" },
  { value: "90", label: "90% +" }
];
const BASE_MODEL_FAMILY_POPULAR_ORDER = [
  "GPT family",
  "Llama family",
  "Mistral family",
  "Qwen family",
  "Gemini family"
];
const BASE_MODEL_POPULAR_FAMILY_SET = new Set(
  BASE_MODEL_FAMILY_POPULAR_ORDER
);
function MoreFiltersChoiceChips({
  options,
  value,
  onSelect,
  "aria-label": ariaLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-wrap gap-2",
      role: "radiogroup",
      "aria-label": ariaLabel,
      children: options.map((opt) => {
        const selected = value === opt.value;
        return (
          // biome-ignore lint/a11y/useSemanticElements: chip-style options use toolbar buttons, not native <input type="radio">.
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": selected,
              onClick: () => onSelect(opt.value),
              className: cn(
                "inline-flex h-8 items-center rounded-md border px-3 text-body-sm transition-colors ease-standard",
                selected ? "border-primary/60 bg-primary/10 text-foreground" : "border-border bg-card text-foreground hover:bg-muted"
              ),
              children: opt.label
            },
            opt.value
          )
        );
      })
    }
  );
}
function MoreFiltersCheckboxGroup({
  options,
  selected,
  onToggle,
  "aria-label": ariaLabel
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: styled toggle chips; fieldset default chrome does not match design.
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "group", "aria-label": ariaLabel, className: "flex flex-wrap gap-2", children: options.map((option) => {
      const isSelected = selected.includes(option);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "aria-pressed": isSelected,
          onClick: () => onToggle(option),
          className: cn(
            "inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-md border px-3 text-body-sm transition-colors ease-standard",
            isSelected ? "border-primary/60 bg-primary/10 text-foreground" : "border-border bg-card text-foreground hover:bg-muted"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-icon-16 w-icon-16 shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Check,
              {
                className: cn(
                  "h-icon-16 w-icon-16 transition-colors ease-standard",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                ),
                "aria-hidden": true
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: option })
          ]
        },
        option
      );
    }) })
  );
}
function FilterLabelWithInfo({
  children,
  info
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children }),
    info ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "inline-flex h-icon-16 w-icon-16 items-center justify-center rounded-full text-muted-foreground transition-colors ease-standard hover:text-foreground [&_svg]:h-icon-16 [&_svg]:w-icon-16",
          "aria-label": "About this filter",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { "aria-hidden": true })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { className: "max-w-xs", children: info })
    ] }) : null
  ] });
}
function CapabilityFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const capabilitySubcategoryOptions = reactExports.useMemo(() => {
    if (filters.capabilityCategory === "") return [];
    const options = /* @__PURE__ */ new Set();
    for (const model of catalog) {
      for (const subcategory of getCapabilitySubcategoryNames(
        model,
        filters.capabilityCategory
      )) {
        options.add(subcategory);
      }
    }
    return [...options].sort((a, b) => a.localeCompare(b));
  }, [catalog, filters.capabilityCategory]);
  const capabilityCategoryMinNumeric = reactExports.useMemo(
    () => filters.capabilityCategoryMin === "0" ? 0 : Number.parseInt(filters.capabilityCategoryMin, 10),
    [filters.capabilityCategoryMin]
  );
  const subcapabilityViableAtMinimum = reactExports.useMemo(() => {
    if (filters.capabilityCategory === "" || capabilityCategoryMinNumeric <= 0) {
      return null;
    }
    const category = filters.capabilityCategory;
    const min = capabilityCategoryMinNumeric;
    const next = /* @__PURE__ */ new Map();
    for (const sub of capabilitySubcategoryOptions) {
      next.set(
        sub,
        capabilitySubcategoryViableAtMinScore(catalog, category, sub, min)
      );
    }
    return next;
  }, [
    capabilityCategoryMinNumeric,
    capabilitySubcategoryOptions,
    catalog,
    filters.capabilityCategory
  ]);
  const capabilityFilterActive = filters.capabilityCategory !== "" || filters.capabilityCategoryMin !== "0" || filters.capabilitySubcategories.length > 0;
  const capabilityFilterCount = (filters.capabilityCategory !== "" ? 1 : 0) + (filters.capabilityCategoryMin !== "0" ? 1 : 0) + filters.capabilitySubcategories.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: capabilityFilterActive,
        badgeCount: capabilityFilterActive ? capabilityFilterCount : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Capability" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Capability" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filters.capabilityCategory || "none",
              onValueChange: (v) => onFiltersChange({
                ...filters,
                capabilityCategory: v === "none" ? "" : v,
                capabilityCategoryMin: v === "none" ? "0" : filters.capabilityCategoryMin,
                capabilitySubcategories: [],
                capabilityScore: "any"
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MORE_FILTERS_CATEGORY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Minimal Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MoreFiltersChoiceChips,
            {
              "aria-label": "Minimum capability score",
              options: TOOLBAR_CAPABILITY_SCORE_OPTIONS,
              value: filters.capabilityCategoryMin,
              onSelect: (v) => {
                const minNeed = v === "0" ? 0 : Number.parseInt(v, 10);
                let nextSubs = filters.capabilitySubcategories;
                if (filters.capabilityCategory !== "" && minNeed > 0) {
                  const cat = filters.capabilityCategory;
                  nextSubs = filters.capabilitySubcategories.filter(
                    (sub) => capabilitySubcategoryViableAtMinScore(
                      catalog,
                      cat,
                      sub,
                      minNeed
                    )
                  );
                }
                onFiltersChange({
                  ...filters,
                  capabilityCategoryMin: v,
                  capabilityScore: "any",
                  capabilitySubcategories: nextSubs
                });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-border pt-3 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subcapability" }),
          filters.capabilityCategory === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "Select a capability first to see related subcapabilities." }) : capabilitySubcategoryOptions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: capabilitySubcategoryOptions.map((subcategory) => {
            const selected = filters.capabilitySubcategories.includes(subcategory);
            const viable = subcapabilityViableAtMinimum?.get(subcategory) ?? true;
            const chipButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !viable,
                onClick: () => onFiltersChange({
                  ...filters,
                  capabilitySubcategories: toggleStringList(
                    filters.capabilitySubcategories,
                    subcategory
                  ),
                  capabilityScore: "any"
                }),
                className: cn(
                  "inline-flex h-8 items-center rounded-md border px-3 text-body-sm transition-colors ease-standard",
                  !viable && "cursor-not-allowed border-border bg-muted/50 text-muted-foreground opacity-60",
                  viable && (selected ? "border-primary/60 bg-primary/10 text-foreground" : "border-border bg-card text-foreground hover:bg-muted")
                ),
                children: subcategory
              },
              subcategory
            );
            return !viable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex", children: chipButton }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipContent, { side: "top", className: "max-w-xs", children: [
                "Subcapabilities that no model can match at",
                " ",
                capabilityCategoryMinNumeric,
                "% or higher are disabled—lower minimal score to enable them."
              ] })
            ] }, subcategory) : /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: chipButton }, subcategory);
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption text-muted-foreground", children: "No subcapabilities available for this capability." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: !capabilityFilterActive,
          label: "Clear capability filters",
          onClear: () => onFiltersChange({
            ...filters,
            capabilityScore: "any",
            capabilityCategory: "",
            capabilityCategoryMin: "0",
            capabilitySubcategories: []
          })
        }
      )
    ] })
  ] });
}
function FeaturesFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const featureOptions = reactExports.useMemo(
    () => [...visibleFeatures(catalog)].sort((a, b) => a.localeCompare(b)),
    [catalog]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: filters.features.length > 0,
        badgeCount: filters.features.length > 0 ? filters.features.length : void 0,
        children: "Features"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverHeader,
        {
          title: "Features",
          description: "Match all selected (AND)."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterPopoverScrollBody, { scrollHeightClassName: "h-64", children: featureOptions.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterCheckboxRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: filters.features.includes(f),
            onCheckedChange: () => onFiltersChange({
              ...filters,
              features: toggleStringList(filters.features, f)
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
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: filters.features.length === 0,
          label: "Clear feature selections",
          onClear: () => onFiltersChange({ ...filters, features: [] })
        }
      )
    ] })
  ] });
}
function cosmosProviderFilterLabel(filterValue) {
  return filterValue === BOOSTER_POWERED_PROVIDER ? "Booster" : filterValue;
}
function modalityFilterLabel(modalityId) {
  return modalityId.slice(0, 1).toUpperCase() + modalityId.slice(1);
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
function ModalityFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const modalityOptions = reactExports.useMemo(() => visibleModalities(), [catalog]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: filters.modalities.length > 0,
        badgeCount: filters.modalities.length > 0 ? filters.modalities.length : void 0,
        children: "Modality"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverHeader,
        {
          title: "Modality",
          description: "Filter models by supported input and output types. Match any selected modality."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: modalityOptions.map((id) => {
        const Icon = modalityIcon(id);
        const on = filters.modalities.includes(id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onFiltersChange({
                ...filters,
                modalities: toggleStringList(filters.modalities, id)
              });
            },
            className: cn(
              "flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-body-sm transition-colors",
              on ? "border-primary/60 bg-primary/10" : "hover:bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-icon-16 w-icon-16", "aria-hidden": true }),
              modalityFilterLabel(id)
            ]
          },
          id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: filters.modalities.length === 0,
          label: "Clear modalities",
          onClear: () => onFiltersChange({ ...filters, modalities: [] })
        }
      )
    ] })
  ] });
}
function filterStringsBySubstring(source, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [...source];
  return source.filter((s) => s.toLowerCase().includes(q));
}
function MoreFiltersBaseModelSection({
  catalog,
  filters,
  onFiltersChange,
  baseModelPickerOpen,
  onBaseModelPickerOpenChange,
  baseModelPickerQuery,
  onBaseModelPickerQueryChange
}) {
  const baseOpts = reactExports.useMemo(() => visibleBaseModels(catalog), [catalog]);
  const popularBaseFamilies = reactExports.useMemo(
    () => BASE_MODEL_FAMILY_POPULAR_ORDER.filter((name) => baseOpts.includes(name)),
    [baseOpts]
  );
  const otherBaseFamilies = reactExports.useMemo(
    () => baseOpts.filter((name) => !BASE_MODEL_POPULAR_FAMILY_SET.has(name)).sort((a, b) => a.localeCompare(b)),
    [baseOpts]
  );
  const filteredPopularBaseFamilies = reactExports.useMemo(
    () => filterStringsBySubstring(popularBaseFamilies, baseModelPickerQuery),
    [popularBaseFamilies, baseModelPickerQuery]
  );
  const filteredOtherBaseFamilies = reactExports.useMemo(
    () => filterStringsBySubstring(otherBaseFamilies, baseModelPickerQuery),
    [otherBaseFamilies, baseModelPickerQuery]
  );
  const baseModelLabelId = reactExports.useId();
  if (baseOpts.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { id: baseModelLabelId, children: "Base model" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Popover,
      {
        open: baseModelPickerOpen,
        onOpenChange: (open) => {
          onBaseModelPickerOpenChange(open);
          if (!open) onBaseModelPickerQueryChange("");
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "aria-labelledby": baseModelLabelId,
              className: cn(
                "h-control-md w-full min-w-0 justify-center px-3 font-normal text-muted-foreground shadow-xs hover:bg-muted/50 hover:text-muted-foreground",
                "[&>:first-child]:w-full [&>:first-child]:min-w-0 [&>:first-child]:justify-between"
              ),
              trailingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "opacity-50", "aria-hidden": true }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-left", children: "Search or select base model" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search base models…",
                value: baseModelPickerQuery,
                onChange: (e) => onBaseModelPickerQueryChange(e.target.value),
                className: "h-8",
                autoComplete: "off",
                autoFocus: true,
                "aria-label": "Search base models"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-2", children: [
              filteredPopularBaseFamilies.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pb-0.5 text-caption font-medium text-muted-foreground", children: "Popular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: filteredPopularBaseFamilies.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterCheckboxRow, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.baseModels.includes(name),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        baseModels: toggleStringList(
                          filters.baseModels,
                          name
                        )
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-body-sm", children: name })
                ] }, name)) })
              ] }) : null,
              filteredOtherBaseFamilies.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pb-0.5 text-caption font-medium text-muted-foreground", children: "All base models" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: filteredOtherBaseFamilies.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterCheckboxRow, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked: filters.baseModels.includes(name),
                      onCheckedChange: () => onFiltersChange({
                        ...filters,
                        baseModels: toggleStringList(
                          filters.baseModels,
                          name
                        )
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-body-sm", children: name })
                ] }, name)) })
              ] }) : null,
              filteredPopularBaseFamilies.length === 0 && filteredOtherBaseFamilies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-caption text-muted-foreground", children: "No matches" }) : null
            ] }) })
          ] })
        ]
      }
    ),
    filters.baseModels.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [...filters.baseModels].sort((a, b) => a.localeCompare(b)).map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          badgeVariants({
            variant: "secondary",
            appearance: "pill",
            size: "24"
          }),
          "max-w-full min-w-0 pr-1 font-normal"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 max-w-[240px] truncate", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-background/80",
              onClick: () => onFiltersChange({
                ...filters,
                baseModels: filters.baseModels.filter((x) => x !== name)
              }),
              "aria-label": `Remove ${name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3", "aria-hidden": true })
            }
          )
        ]
      },
      name
    )) }) : null
  ] });
}
function MoreFiltersSection({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-body-sm-strong text-foreground", children: title }),
    children
  ] });
}
function MoreFiltersSheet({
  open,
  onOpenChange,
  catalog,
  filters,
  onFiltersChange,
  shownModelCount,
  baseModelPickerOpen,
  onBaseModelPickerOpenChange,
  baseModelPickerQuery,
  onBaseModelPickerQueryChange
}) {
  const licenseOptions = reactExports.useMemo(() => visibleLicenses(catalog), [catalog]);
  const dataTypeOpts = reactExports.useMemo(() => visibleDataTypes(catalog), [catalog]);
  const formatOpts = reactExports.useMemo(() => visibleAccessFormats(catalog), [catalog]);
  const quantOpts = reactExports.useMemo(() => visibleQuantizations(catalog), [catalog]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppSideSheetContent,
    {
      title: "More filters",
      description: "Additional filters for performance, cost, licensing, and technical options in Model Cosmos.",
      bottomAccessory: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "text-muted-foreground",
            onClick: () => {
              onBaseModelPickerQueryChange("");
              onBaseModelPickerOpenChange(false);
              onFiltersChange({ ...defaultFilters });
            },
            children: "Clear all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: () => onOpenChange(false),
            children: [
              "Show ",
              shownModelCount,
              " models"
            ]
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MoreFiltersSection, { title: "Performance", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Context window" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MoreFiltersChoiceChips,
            {
              "aria-label": "Context window",
              options: MORE_FILTERS_CONTEXT_OPTIONS,
              value: filters.contextWindow,
              onSelect: (v) => onFiltersChange({
                ...filters,
                contextWindow: v
              })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MoreFiltersSection, { title: "Cost & requirements", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Model size" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MoreFiltersChoiceChips,
            {
              "aria-label": "Model size",
              options: MORE_FILTERS_MODEL_SIZE_OPTIONS,
              value: filters.modelSize,
              onSelect: (v) => onFiltersChange({
                ...filters,
                modelSize: v
              })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MoreFiltersSection, { title: "Provider & licensing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "License" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MoreFiltersCheckboxGroup,
              {
                "aria-label": "License",
                options: licenseOptions,
                selected: filters.licenses,
                onToggle: (lic) => onFiltersChange({
                  ...filters,
                  licenses: toggleStringList(filters.licenses, lic)
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MoreFiltersBaseModelSection,
            {
              catalog,
              filters,
              onFiltersChange,
              baseModelPickerOpen,
              onBaseModelPickerOpenChange,
              baseModelPickerQuery,
              onBaseModelPickerQueryChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MoreFiltersSection, { title: "Technical", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilterLabelWithInfo, { info: "Numerical format used by the model or serving configuration.", children: "Data type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MoreFiltersCheckboxGroup,
              {
                "aria-label": "Data type",
                options: dataTypeOpts,
                selected: filters.dataTypes,
                onToggle: (d) => onFiltersChange({
                  ...filters,
                  dataTypes: toggleStringList(filters.dataTypes, d)
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilterLabelWithInfo, { info: "Shows how the model is made available, such as API-based or managed access.", children: "Access format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MoreFiltersCheckboxGroup,
              {
                "aria-label": "Access format",
                options: formatOpts,
                selected: filters.accessFormats,
                onToggle: (f) => onFiltersChange({
                  ...filters,
                  accessFormats: toggleStringList(
                    filters.accessFormats,
                    f
                  )
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FilterLabelWithInfo, { info: "Model compression method that can reduce memory or compute requirements.", children: "Quantization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MoreFiltersCheckboxGroup,
              {
                "aria-label": "Quantization",
                options: quantOpts,
                selected: filters.quantizations,
                onToggle: (q) => onFiltersChange({
                  ...filters,
                  quantizations: toggleStringList(
                    filters.quantizations,
                    q
                  )
                })
              }
            )
          ] })
        ] })
      ] })
    }
  ) });
}
const sliderRootVariants = cva("group relative flex touch-none select-none", {
  variants: {
    orientation: {
      /** Default: full-width horizontal track. */
      horizontal: "w-full items-center",
      /** Stack thumbs vertically; give the root a height (e.g. `h-full` in a fixed-height parent). */
      vertical: "h-full w-auto flex-col items-center justify-center"
    },
    size: {
      /** Default track and thumb for forms and primary surfaces. */
      regular: "",
      /** Narrower track and smaller thumb for sidebars, dense filters, and toolbars. */
      dense: ""
    }
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "regular"
  }
});
const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: ""
      },
      size: {
        regular: "",
        dense: ""
      }
    },
    compoundVariants: [
      { orientation: "horizontal", size: "regular", class: "h-2 w-full" },
      { orientation: "horizontal", size: "dense", class: "h-1.5 w-full" },
      { orientation: "vertical", size: "regular", class: "h-full w-2" },
      { orientation: "vertical", size: "dense", class: "h-full w-1.5" }
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "regular"
    }
  }
);
const sliderRangeVariants = cva(
  "absolute bg-primary group-data-[disabled]:bg-primary/50",
  {
    variants: {
      orientation: {
        horizontal: "h-full",
        vertical: "w-full"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
const sliderThumbVariants = cva(
  "block shrink-0 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none group-data-[disabled]:border-primary/50",
  {
    variants: {
      size: {
        regular: "h-icon-20 w-icon-20",
        dense: "h-icon-16 w-icon-16"
      }
    },
    defaultVariants: {
      size: "regular"
    }
  }
);
const MAX_STEP_MARKS = 24;
function thumbCountFromProps(value, defaultValue) {
  if (value !== void 0) {
    return Array.isArray(value) ? value.length : 1;
  }
  if (defaultValue !== void 0) {
    return Array.isArray(defaultValue) ? defaultValue.length : 1;
  }
  return 1;
}
function enumerateStepValues(min, max, step) {
  if (max < min || step <= 0) return [min, max];
  const out = [];
  const n = Math.floor((max - min) / step + 1e-9);
  for (let i = 0; i <= n; i++) {
    const raw = min + i * step;
    const v = Math.min(raw, max);
    out.push(Math.round(v * 1e6) / 1e6);
  }
  const last = out[out.length - 1];
  if (last !== void 0 && last < max - 1e-9) {
    out.push(max);
  }
  return out;
}
function limitMarkCount(values, max) {
  if (values.length <= max) return values;
  const stride = Math.ceil(values.length / max);
  const out = [];
  for (let i = 0; i < values.length; i += stride) {
    out.push(values[i]);
  }
  const lastIn = values[values.length - 1];
  const lastOut = out[out.length - 1];
  if (lastIn !== void 0 && lastOut !== lastIn) {
    out.push(lastIn);
  }
  return out.slice(0, max);
}
function markIsOnFilledRange(m, min, sliderValues) {
  if (sliderValues.length === 0) return false;
  if (sliderValues.length === 1) {
    const t = sliderValues[0] ?? min;
    return m >= min - 1e-6 && m <= t + 1e-6;
  }
  const lo = Math.min(sliderValues[0], sliderValues[1]);
  const hi = Math.max(sliderValues[0], sliderValues[1]);
  return m >= lo - 1e-6 && m <= hi + 1e-6;
}
function SliderStepMarksInTrack({
  min,
  max,
  values,
  sliderValues
}) {
  const span = max - min || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: values.map((v) => {
    const pct = (v - min) / span * 100;
    const onFill = markIsOnFilledRange(v, min, sliderValues);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "pointer-events-none absolute top-1/2 z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full",
          onFill ? "bg-primary-foreground" : "bg-primary/50"
        ),
        style: { left: `${pct}%` }
      },
      `${v}`
    );
  }) });
}
const Slider = reactExports.forwardRef(
  ({
    className,
    value,
    defaultValue,
    orientation = "horizontal",
    size = "regular",
    min = 0,
    max = 100,
    step = 1,
    showStepMarks = false,
    marks: marksProp,
    onValueChange,
    ...props
  }, ref) => {
    const thumbCount = thumbCountFromProps(value, defaultValue);
    const [liveValue, setLiveValue] = reactExports.useState(
      void 0
    );
    const markValues = reactExports.useMemo(() => {
      if (!showStepMarks || orientation !== "horizontal") return [];
      let raw;
      if (marksProp !== void 0 && marksProp.length > 0) {
        raw = [...marksProp].filter((m) => m >= min - 1e-9 && m <= max + 1e-9).sort((a, b) => a - b);
      } else {
        raw = enumerateStepValues(min, max, step);
      }
      return limitMarkCount(raw, MAX_STEP_MARKS);
    }, [showStepMarks, orientation, marksProp, min, max, step]);
    const showMarksInTrack = showStepMarks && orientation === "horizontal" && markValues.length > 0;
    const sliderValuesForMarks = reactExports.useMemo(() => {
      if (value !== void 0) return value;
      if (liveValue !== void 0) return liveValue;
      if (defaultValue !== void 0) return defaultValue;
      return [min];
    }, [value, liveValue, defaultValue, min]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Root$1,
      {
        ref,
        className: cn(sliderRootVariants({ orientation, size }), className),
        value,
        defaultValue,
        orientation,
        min,
        max,
        step,
        onValueChange: (v) => {
          if (value === void 0) {
            setLiveValue(v);
          }
          onValueChange?.(v);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Track,
            {
              className: sliderTrackVariants({ orientation, size }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Range,
                  {
                    className: cn("z-0", sliderRangeVariants({ orientation }))
                  }
                ),
                showMarksInTrack ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SliderStepMarksInTrack,
                  {
                    min,
                    max,
                    values: markValues,
                    sliderValues: sliderValuesForMarks
                  }
                ) : null
              ]
            }
          ),
          Array.from({ length: thumbCount }, (_, i) => `thumb-${i}`).map(
            (thumbKey) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Thumb,
              {
                className: sliderThumbVariants({ size })
              },
              thumbKey
            )
          )
        ]
      }
    );
  }
);
Slider.displayName = Root$1.displayName;
function cosmosPriceEuroChip$1(amount) {
  return `€${formatEurPer1MForDisplay(amount)}`;
}
function priceSliderDraggingLabel(rawThumb, min, ceiling, step) {
  if (rawThumb >= ceiling - step / 2) return "No limit";
  const invStep = 1 / step;
  const clamped = Math.min(Math.max(rawThumb, min), ceiling);
  const snapped = Math.round(clamped * invStep) / invStep;
  return `${cosmosPriceEuroChip$1(snapped)} / 1M`;
}
function CosmosPriceSliderSection({
  filters,
  onFiltersChange,
  bounds,
  kind,
  accordionItemValue
}) {
  const axis = kind === "input" ? bounds.input : bounds.output;
  const { min, ceiling } = axis;
  const step = bounds.step;
  const maxCap = kind === "input" ? filters.priceInputMaxPer1M : filters.priceOutputMaxPer1M;
  const thumbValue = maxCap ?? ceiling;
  const [sliderDragging, setSliderDragging] = reactExports.useState(false);
  const [dragThumbPreview, setDragThumbPreview] = reactExports.useState(thumbValue);
  reactExports.useEffect(() => {
    if (!sliderDragging) return;
    const endDrag = () => setSliderDragging(false);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [sliderDragging]);
  reactExports.useEffect(() => {
    if (!sliderDragging) setDragThumbPreview(thumbValue);
  }, [thumbValue, sliderDragging]);
  const title = kind === "input" ? "Input cost per 1M tokens" : "Output cost per 1M tokens";
  const setCap = (v) => {
    if (kind === "input")
      onFiltersChange({ ...filters, priceInputMaxPer1M: v });
    else onFiltersChange({ ...filters, priceOutputMaxPer1M: v });
  };
  const onSlide = (vals) => {
    const raw = vals[0] ?? ceiling;
    setDragThumbPreview(raw);
    if (raw >= ceiling - step / 2) {
      setCap(null);
      return;
    }
    const invStep = 1 / step;
    const clamped = Math.min(Math.max(raw, min), ceiling);
    const snapped = Math.round(clamped * invStep) / invStep;
    setCap(snapped);
  };
  const span = ceiling - min;
  const thumbPct = span > 1e-9 ? (Math.min(Math.max(dragThumbPreview, min), ceiling) - min) / span * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AccordionItem,
    {
      value: accordionItemValue,
      className: "border-0 border-b border-border last:border-b-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-3 py-3 text-body-sm font-medium text-foreground hover:no-underline [&>svg]:text-muted-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-2 px-3 pb-3 pt-0",
            "data-accordion-prevent-toggle": true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caption leading-snug text-muted-foreground", children: maxCap == null ? "No limit — move the handle left to exclude more expensive models." : `Showing models up to ${cosmosPriceEuroChip$1(maxCap)} / 1M (EUR); higher prices are excluded.` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative pb-0.5",
                  onPointerDownCapture: () => {
                    setSliderDragging(true);
                    setDragThumbPreview(thumbValue);
                  },
                  children: [
                    sliderDragging ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 -translate-x-1/2",
                        style: { left: `${thumbPct}%` },
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-caption font-medium tabular-nums text-popover-foreground shadow-md", children: priceSliderDraggingLabel(
                          dragThumbPreview,
                          min,
                          ceiling,
                          step
                        ) })
                      }
                    ) : null,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Slider,
                      {
                        size: "dense",
                        min,
                        max: ceiling,
                        step,
                        value: [thumbValue],
                        onValueChange: onSlide,
                        "aria-label": `${title} (EUR per 1M)`
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 text-caption text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cosmosPriceEuroChip$1(min) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cosmosPriceEuroChip$1(ceiling) })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function PriceFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const priceDimsActive = (filters.priceInputMaxPer1M != null ? 1 : 0) + (filters.priceOutputMaxPer1M != null ? 1 : 0);
  const priceSliderBounds = reactExports.useMemo(
    () => catalogPriceSliderBoundsEUR(catalog),
    [catalog]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: priceDimsActive > 0,
        badgeCount: priceDimsActive > 0 ? priceDimsActive : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Price" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverHeader,
        {
          title: "Cost per token (EUR)",
          description: "Set upper limits per 1M tokens. Matches catalog prices in euros; drag handles to exclude more expensive providers."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Accordion,
        {
          type: "multiple",
          defaultValue: ["price-input", "price-output"],
          className: "w-full rounded-none border-0 shadow-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CosmosPriceSliderSection,
              {
                accordionItemValue: "price-input",
                kind: "input",
                filters,
                onFiltersChange,
                bounds: priceSliderBounds
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CosmosPriceSliderSection,
              {
                accordionItemValue: "price-output",
                kind: "output",
                filters,
                onFiltersChange,
                bounds: priceSliderBounds
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: priceDimsActive === 0,
          label: "Reset price caps",
          onClear: () => onFiltersChange({
            ...filters,
            priceInputMaxPer1M: null,
            priceOutputMaxPer1M: null
          })
        }
      )
    ] })
  ] });
}
function ProviderFilter({
  catalog,
  filters,
  onFiltersChange
}) {
  const [providerSearch, setProviderSearch] = reactExports.useState("");
  const providerCounts = reactExports.useMemo(() => providerOptionCounts(catalog), [catalog]);
  const providerOptions = reactExports.useMemo(
    () => [...COSMOS_TOOLBAR_PROVIDER_OPTIONS],
    []
  );
  const filteredProviders = reactExports.useMemo(() => {
    const q = providerSearch.trim().toLowerCase();
    if (!q) return providerOptions;
    return providerOptions.filter(
      (p) => p.toLowerCase().includes(q) || cosmosProviderFilterLabel(p).toLowerCase().includes(q)
    );
  }, [providerOptions, providerSearch]);
  const showProviderSearch = providerOptions.length > 9;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterTriggerButton,
      {
        active: filters.providers.length > 0,
        badgeCount: filters.providers.length > 0 ? filters.providers.length : void 0,
        children: "Provider"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterPopoverPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterPopoverHeader, { title: "Provider", children: showProviderSearch ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search providers…",
          value: providerSearch,
          onChange: (e) => setProviderSearch(e.target.value),
          className: "mt-2 h-8"
        }
      ) : null }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterPopoverScrollBody, { scrollHeightClassName: "h-72", children: filteredProviders.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterCheckboxRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: filters.providers.includes(p),
            onCheckedChange: () => onFiltersChange({
              ...filters,
              providers: toggleStringList(filters.providers, p)
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-body-sm", children: cosmosProviderFilterLabel(p) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caption text-muted-foreground", children: providerCounts.get(p) ?? 0 })
      ] }, p)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPopoverClearFooter,
        {
          disabled: filters.providers.length === 0,
          label: "Clear providers",
          onClear: () => {
            setProviderSearch("");
            onFiltersChange({ ...filters, providers: [] });
          }
        }
      )
    ] })
  ] });
}
function SelectedFilterChips({
  chips,
  onClearAll
}) {
  if (chips.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
    chips.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          badgeVariants({
            variant: "secondary",
            appearance: "pill",
            size: "24"
          }),
          "max-w-full min-w-0 pr-1 font-normal"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 max-w-[240px] truncate", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-background/80",
              onClick: c.onRemove,
              "aria-label": `Remove ${c.label}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3", "aria-hidden": true })
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
        onClick: onClearAll,
        children: "Clear all"
      }
    )
  ] });
}
function cosmosPriceEuroChip(amount) {
  return `€${formatEurPer1MForDisplay(amount)}`;
}
function buildCosmosModelFilterChips(filters) {
  const out = [];
  for (const h of filters.hosting) {
    out.push({
      key: `hosting-${h}`,
      label: `Hosting: ${h}`,
      remove: (prev) => ({
        ...prev,
        hosting: prev.hosting.filter((x) => x !== h)
      })
    });
  }
  for (const p of filters.providers) {
    out.push({
      key: `provider-${p}`,
      label: cosmosProviderFilterLabel(p),
      remove: (prev) => ({
        ...prev,
        providers: prev.providers.filter((x) => x !== p)
      })
    });
  }
  if (filters.capabilityScore !== "any") {
    out.push({
      key: "cap-score",
      label: `Capability score: ${filters.capabilityScore}+`,
      remove: (prev) => ({ ...prev, capabilityScore: "any" })
    });
  }
  for (const m of filters.modalities) {
    out.push({
      key: `mod-${m}`,
      label: `Modality: ${modalityFilterLabel(m)}`,
      remove: (prev) => ({
        ...prev,
        modalities: prev.modalities.filter((x) => x !== m)
      })
    });
  }
  for (const a of filters.apiCapabilities) {
    out.push({
      key: `api-${a}`,
      label: `API: ${a}`,
      remove: (prev) => ({
        ...prev,
        apiCapabilities: prev.apiCapabilities.filter((x) => x !== a)
      })
    });
  }
  for (const f of filters.features) {
    out.push({
      key: `feat-${f}`,
      label: `Feature: ${f}`,
      remove: (prev) => ({
        ...prev,
        features: prev.features.filter((x) => x !== f)
      })
    });
  }
  if (filters.priceInputMaxPer1M != null) {
    out.push({
      key: "price-input",
      label: `Input ≤ ${cosmosPriceEuroChip(filters.priceInputMaxPer1M)} / 1M`,
      remove: (prev) => ({ ...prev, priceInputMaxPer1M: null })
    });
  }
  if (filters.priceOutputMaxPer1M != null) {
    out.push({
      key: "price-output",
      label: `Output ≤ ${cosmosPriceEuroChip(filters.priceOutputMaxPer1M)} / 1M`,
      remove: (prev) => ({ ...prev, priceOutputMaxPer1M: null })
    });
  }
  if (filters.capabilityCategory !== "") {
    out.push({
      key: "capability-category",
      label: `Capability: ${filters.capabilityCategory}`,
      remove: (prev) => ({
        ...prev,
        capabilityCategory: "",
        capabilityCategoryMin: "0",
        capabilitySubcategories: []
      })
    });
  }
  if (filters.capabilityCategory !== "" && filters.capabilityCategoryMin !== "0") {
    out.push({
      key: "cat-min",
      label: `Minimum score: ${filters.capabilityCategoryMin}+`,
      remove: (prev) => ({
        ...prev,
        capabilityCategoryMin: "0"
      })
    });
  }
  for (const subcategory of filters.capabilitySubcategories) {
    out.push({
      key: `cap-sub-${subcategory}`,
      label: `Subcapability: ${subcategory}`,
      remove: (prev) => ({
        ...prev,
        capabilitySubcategories: prev.capabilitySubcategories.filter(
          (x) => x !== subcategory
        )
      })
    });
  }
  if (filters.contextWindow !== "any") {
    out.push({
      key: "ctx",
      label: `Context: ${filters.contextWindow}+`,
      remove: (prev) => ({ ...prev, contextWindow: "any" })
    });
  }
  if (filters.modelSize !== "any") {
    const sizeLabel = filters.modelSize === "lt10" ? "Under 10B" : filters.modelSize === "b10_50" ? "10B–50B" : filters.modelSize === "b50_100" ? "50B–100B" : "100B+";
    out.push({
      key: "size",
      label: `Model size: ${sizeLabel}`,
      remove: (prev) => ({ ...prev, modelSize: "any" })
    });
  }
  if (filters.minMemory !== "any") {
    out.push({
      key: "mem",
      label: `Memory: ${filters.minMemory}`,
      remove: (prev) => ({ ...prev, minMemory: "any" })
    });
  }
  for (const lic of filters.licenses) {
    out.push({
      key: `lic-${lic}`,
      label: `License: ${lic}`,
      remove: (prev) => ({
        ...prev,
        licenses: prev.licenses.filter((x) => x !== lic)
      })
    });
  }
  for (const d of filters.dataTypes) {
    out.push({
      key: `dt-${d}`,
      label: `Data type: ${d}`,
      remove: (prev) => ({
        ...prev,
        dataTypes: prev.dataTypes.filter((x) => x !== d)
      })
    });
  }
  for (const f of filters.accessFormats) {
    out.push({
      key: `fmt-${f}`,
      label: `Access: ${f}`,
      remove: (prev) => ({
        ...prev,
        accessFormats: prev.accessFormats.filter((x) => x !== f)
      })
    });
  }
  for (const q of filters.quantizations) {
    out.push({
      key: `q-${q}`,
      label: `Quantization: ${q}`,
      remove: (prev) => ({
        ...prev,
        quantizations: prev.quantizations.filter((x) => x !== q)
      })
    });
  }
  for (const o of filters.origins) {
    out.push({
      key: `or-${o}`,
      label: `Origin: ${o}`,
      remove: (prev) => ({
        ...prev,
        origins: prev.origins.filter((x) => x !== o)
      })
    });
  }
  for (const b of filters.baseModels) {
    out.push({
      key: `base-${b}`,
      label: `Base: ${b}`,
      remove: (prev) => ({
        ...prev,
        baseModels: prev.baseModels.filter((x) => x !== b)
      })
    });
  }
  return out;
}
function ModelCosmosFilterBar({
  catalog,
  filters,
  onFiltersChange,
  className
}) {
  const [moreOpen, setMoreOpen] = reactExports.useState(false);
  const [baseModelPickerOpen, setBaseModelPickerOpen] = reactExports.useState(false);
  const [baseModelPickerQuery, setBaseModelPickerQuery] = reactExports.useState("");
  const shownModelCount = reactExports.useMemo(
    () => applyModelFilters(catalog, filters, catalog).length,
    [catalog, filters]
  );
  const chipDescriptors = reactExports.useMemo(
    () => buildCosmosModelFilterChips(filters),
    [filters]
  );
  const moreFiltersActiveCount = reactExports.useMemo(
    () => moreFiltersSheetBadgeCount(filters),
    [filters]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex min-w-0 flex-col gap-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProviderFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CapabilityFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ModalityFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ApiCapabilitiesFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeaturesFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PriceFilter,
        {
          catalog,
          filters,
          onFiltersChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-1",
          onClick: () => setMoreOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-icon-16 w-icon-16", "aria-hidden": true }),
            "More filters",
            moreFiltersActiveCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-0.5 px-1.5", children: moreFiltersActiveCount }) : null
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectedFilterChips,
      {
        chips: chipDescriptors.map((c) => ({
          key: c.key,
          label: c.label,
          onRemove: () => onFiltersChange(c.remove(filters))
        })),
        onClearAll: () => onFiltersChange({ ...defaultFilters })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MoreFiltersSheet,
      {
        open: moreOpen,
        onOpenChange: setMoreOpen,
        catalog,
        filters,
        onFiltersChange,
        shownModelCount,
        baseModelPickerOpen,
        onBaseModelPickerOpenChange: setBaseModelPickerOpen,
        baseModelPickerQuery,
        onBaseModelPickerQueryChange: setBaseModelPickerQuery
      }
    )
  ] });
}
const MODEL_COSMOS_RESULTS_REGION_ID = "model-cosmos-results";
function ModelCosmosResults({
  showFilters,
  catalog,
  filters,
  setFilters,
  filtered,
  sortedFiltered,
  page,
  setPage,
  pageSize
}) {
  const pagination = getPaginationWindow(
    sortedFiltered.length,
    page,
    pageSize
  );
  const paginatedModels = sortedFiltered.slice(
    pagination.startIndex,
    pagination.endIndexExclusive
  );
  const { totalPages, safePage } = pagination;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", children: [
    showFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModelCosmosFilterBar,
      {
        catalog,
        filters,
        onFiltersChange: setFilters
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: MODEL_COSMOS_RESULTS_REGION_ID,
        className: "min-w-0 flex-1 outline-none focus:outline-none",
        "aria-label": "Model search results",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: paginatedModels.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/app/cosmos/$modelId",
              params: { modelId: model.id },
              search: { returnTo: "/app/cosmos", returnLabel: "Cosmos" },
              className: "block h-full min-w-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosCard, { model, variant: "full" })
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
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center text-muted-foreground", children: [
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
          ] }) : null
        ]
      }
    )
  ] });
}
function ModelCosmosSearchBar({
  search,
  setSearch,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  sort,
  onSortChange,
  totalResults,
  page,
  pageSize,
  className
}) {
  const sortCommittedRef = reactExports.useRef(false);
  const pagination = getPaginationWindow(totalResults, page, pageSize);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 w-full max-w-md flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              placeholder: "Search models…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              onClear: () => setSearch(""),
              clearLabel: "Clear search",
              leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": true }),
              rootClassName: "bg-card"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: showFilters ? "default" : "outline",
              size: "icon",
              onClick: () => setShowFilters(!showFilters),
              className: "relative shrink-0 focus-visible:ring-inset focus-visible:ring-offset-0",
              "aria-label": showFilters ? "Hide filters" : "Show filters",
              "aria-expanded": showFilters,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-icon-16 w-icon-16", "aria-hidden": true }),
                hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[10px] font-semibold leading-none text-success-foreground ring-2 ring-background",
                    "aria-hidden": true,
                    children: "✓"
                  }
                ) : null
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 shrink-0 flex-nowrap items-center justify-end gap-x-3 overflow-x-auto px-1 py-1 sm:ml-auto", children: [
          totalResults > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-caption shrink-0 text-muted-foreground whitespace-nowrap text-right", children: [
            "Showing ",
            pagination.displayRangeStart,
            "–",
            pagination.displayRangeEnd,
            " ",
            "of ",
            totalResults
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sort,
              onValueChange: (v) => {
                sortCommittedRef.current = true;
                onSortChange(v);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-control-md w-[240px] shrink-0 bg-card focus:ring-inset focus:ring-offset-0 focus-visible:ring-inset focus-visible:ring-offset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectValue, { placeholder: "Sort by…", children: [
                  "Sort by: ",
                  MODEL_SORT_LABELS[sort]
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectContent,
                  {
                    onCloseAutoFocus: (e) => {
                      if (!sortCommittedRef.current) return;
                      sortCommittedRef.current = false;
                      e.preventDefault();
                      queueMicrotask(() => {
                        document.getElementById(MODEL_COSMOS_RESULTS_REGION_ID)?.focus({ preventScroll: true });
                      });
                    },
                    children: Object.keys(MODEL_SORT_LABELS).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: MODEL_SORT_LABELS[k] }, k))
                  }
                )
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
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => applyModelFilters(models.filter((m) => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q);
  }), filters, models), [search, filters]);
  const sortedFiltered = reactExports.useMemo(() => sortModels(filtered, sort, modelCatalogOrder), [filtered, sort]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [search, filters, sort]);
  const hasActiveFilters = isFiltersActive(filters);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { gap: "space-y-6", className: "py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Model Cosmos", description: "Explore models designed for different tasks and performance needs. Assign to endpoints and switch anytime without disruption.", descriptionMaxWidthPageIntro: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosSearchBar, { search, setSearch, showFilters, setShowFilters, hasActiveFilters, sort, onSortChange: setSort, totalResults: sortedFiltered.length, page, pageSize: COSMOS_PAGE_SIZE }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosResults, { showFilters, catalog: models, filters, setFilters, filtered, sortedFiltered, page, setPage, pageSize: COSMOS_PAGE_SIZE })
  ] });
}
export {
  ModelCosmosPage as component
};
