import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn, a as Tooltip, b as TooltipTrigger, d as TooltipContent } from "./router-D2WQTUn2.mjs";
import { a as modelHasVisionCapability, l as getModelCatalogBadge, n as formatEurPerTokenFromPer1M, B as Badge, d as getCodingScore, c as getReasoningScore, b as getMathScore, g as getOverallModelScore, p as getModelSubline, q as formatContextLength, o as overallScoreTextClass, r as getSustainabilityGradeStyles } from "./mockData-CaVm0p_Q.mjs";
import { g as getModelProviderLogoSrc, A as Avatar, b as AvatarImage, c as AvatarFallback, a as getProviderInitials } from "./model-provider-logos-CnTBcjZI.mjs";
import { C as Card } from "./card-D8-7PCfA.mjs";
import { E as Eye, Z as Zap, F as Cpu, G as Leaf } from "../_libs/lucide-react.mjs";
function EnergyScorePill({ grade, className }) {
  const g = grade.toUpperCase().charAt(0);
  const styles = getSustainabilityGradeStyles(g);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { delayDuration: 800, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "border-border flex h-7 shrink-0 cursor-default items-center rounded-md border p-0.5",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex h-full min-w-0 items-center justify-center rounded-bl-md rounded-tl-md px-2 py-1",
                styles.box
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Leaf,
                {
                  className: cn("h-icon-16 w-icon-16", styles.icon),
                  "aria-hidden": true
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-6 flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body-sm text-muted-foreground text-center leading-none", children: g }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", children: "Energy efficiency score" })
  ] });
}
const cellSurface = "bg-background flex min-w-0 flex-1 flex-col items-center justify-center rounded-sm p-2";
const valueText = "text-body-sm text-muted-foreground whitespace-nowrap";
function MetricCell({
  className,
  icon: Icon,
  label,
  children
}) {
  const hasIcon = Boolean(Icon);
  const hasLabel = label != null && label !== "";
  if (hasIcon && Icon) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(cellSurface, className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center justify-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-icon-20 w-icon-20 shrink-0 items-center justify-center rounded-md p-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Icon,
        {
          className: "h-icon-16 w-icon-16 text-muted-foreground",
          "aria-hidden": true
        }
      ) }),
      hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: valueText, children: label }),
      !hasLabel && children
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(cellSurface, "text-center", className), children: hasLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: valueText, children: label }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(valueText, "min-w-0"), children }) });
}
function MetricsRow({ className, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid min-w-0 flex-1 grid-cols-3 gap-2", className), children });
}
function ModelCosmosCardFull({
  model,
  className
}) {
  const coding = getCodingScore(model);
  const reasoning = getReasoningScore(model);
  const math = getMathScore(model);
  const overall = getOverallModelScore(model);
  const subline = getModelSubline(model);
  const scoreClass = overallScoreTextClass(overall);
  const grade = (model.sustainability ?? "B").toUpperCase().charAt(0);
  const isDeprecated = model.status === "Deprecated";
  const statusSuffix = model.status === "Active" ? "" : ` · ${model.status}`;
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "hover:border-primary/40 hover:shadow-md flex h-full flex-col gap-4 p-4 transition duration-200 ease-standard",
        isDeprecated && "opacity-50",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-full w-full rounded-md", children: [
            providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarImage,
              {
                src: providerLogoSrc,
                alt: "",
                className: "h-full w-full object-contain"
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-md text-label", children: getProviderInitials(model.provider) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-8 min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground/75", children: model.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EnergyScorePill, { grade }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { delayDuration: 800, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "min-w-9 shrink-0 cursor-default text-left text-lg font-semibold leading-tight",
                        scoreClass
                      ),
                      children: overall > 0 ? `${overall}%` : "—"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", children: "Aggregated benchmark score" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-body-sm text-muted-foreground", children: [
              subline,
              statusSuffix
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-body-sm text-muted-foreground flex min-w-0 flex-1 flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body-sm-strong text-foreground/75 whitespace-nowrap", children: [
              "Coding ",
              coding,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-border h-4 w-px shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "whitespace-nowrap", children: [
              "Reasoning ",
              reasoning,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-border h-4 w-px shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "whitespace-nowrap", children: [
              "Math ",
              math,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MetricsRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCell, { icon: Zap, label: `${model.tokensPerSecond} tok/s` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCell,
              {
                icon: Cpu,
                label: formatContextLength(model.contextLength)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCell,
              {
                label: `€${model.inputCostPer1M} → €${model.outputCostPer1M} / 1M`
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ModelCosmosCardCatalog({
  model,
  className
}) {
  const providerLogoSrc = getModelProviderLogoSrc(model.provider, model.name);
  const isDeprecated = model.status === "Deprecated";
  const showVision = modelHasVisionCapability(model);
  const catalogBadge = getModelCatalogBadge(model);
  const inEur = formatEurPerTokenFromPer1M(model.inputCostPer1M);
  const outEur = formatEurPerTokenFromPer1M(model.outputCostPer1M);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "hover:border-primary/40 hover:shadow-md flex h-full min-h-0 flex-col gap-4 p-4 transition duration-200 ease-standard",
        isDeprecated && "opacity-50",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-full w-full rounded-md", children: [
            providerLogoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarImage,
              {
                src: providerLogoSrc,
                alt: "",
                className: "h-full w-full object-contain"
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-md text-label", children: getProviderInitials(model.provider) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground", children: model.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 flex-1 grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 min-w-0 flex-1 flex-row flex-wrap items-center justify-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-caption text-muted-foreground", children: "Modalities" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-start gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "bg-secondary-foreground/4 flex h-icon-24 w-icon-24 shrink-0 items-center justify-center rounded-md border border-border text-caption font-bold text-foreground",
                    title: "Text",
                    children: "T"
                  }
                ),
                showVision ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "bg-secondary-foreground/4 flex h-icon-24 w-icon-24 shrink-0 items-center justify-center rounded-sm border border-border",
                    title: "Vision",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Eye,
                      {
                        className: "h-icon-16 w-icon-16 text-muted-foreground",
                        "aria-hidden": true
                      }
                    )
                  }
                ) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 min-w-0 flex-1 flex-row flex-wrap items-center justify-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-caption text-muted-foreground", children: "Endpoint" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", size: "20", className: "shrink-0 font-normal", children: catalogBadge })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MetricsRow, { className: "grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCell,
              {
                className: "[&>span]:font-mono [&>span]:tabular-nums",
                label: `in: €${inEur}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCell,
              {
                className: "[&>span]:font-mono [&>span]:tabular-nums",
                label: `out: €${outEur}`
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ModelCosmosCardBasic({
  model,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "hover:border-primary/40 hover:shadow-md flex h-cosmos-card-basic min-h-cosmos-card-basic flex-col gap-3 overflow-hidden p-4 transition duration-200 ease-standard",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 shrink-0 items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 truncate text-lg font-semibold leading-tight text-foreground/75", children: model.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-40 shrink-0 truncate text-right text-body-sm text-muted-foreground", children: model.provider })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-h-0 flex-1 line-clamp-3 text-body-sm text-muted-foreground", children: model.description })
      ]
    }
  );
}
function ModelCosmosCard({
  model,
  className,
  variant = "full"
}) {
  if (variant === "basic") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosCardBasic, { model, className });
  }
  if (variant === "catalog") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosCardCatalog, { model, className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCosmosCardFull, { model, className });
}
export {
  ModelCosmosCard as M
};
