import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
import { P as PageHeader } from "./PageHeader-Be83zSdl.mjs";
import { C as Card, a as CardContent } from "./card-2jMQWmXc.mjs";
import { I as IconBox } from "./icon-box-Bmy30hjT.mjs";
import { f as formatCompactTokens } from "./formatters-Dwm0__Q6.mjs";
import { z as LogIn, b as LogOut } from "../_libs/lucide-react.mjs";
function CardGrid({
  children,
  cols = { xs: 1, sm: 2 },
  gap = "gap-4",
  className
}) {
  const gridClasses = cn(
    "grid",
    gap,
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: gridClasses, children });
}
function StatCard({
  icon: Icon,
  label,
  value,
  bgColor = "bg-primary/10",
  textColor = "text-primary",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: cn("border-border shadow-xs", className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-3 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconBox,
      {
        size: "xxxlg",
        shape: "square",
        className: cn("rounded-md", bgColor),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: textColor, "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm font-semibold text-foreground", children: value })
    ] })
  ] }) });
}
function TokenUsageSection({
  sinceLabel,
  inputTokens,
  outputTokens
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        titleSize: "overview",
        breakAt: "md",
        introClassName: "max-w-3xl",
        title: "Token Usage",
        description: `Total consumption since ${sinceLabel}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardGrid, { cols: { xs: 1, sm: 2 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: LogIn,
          label: "Input Tokens",
          value: formatCompactTokens(inputTokens),
          bgColor: "bg-info/12",
          textColor: "text-info",
          className: "border-0 shadow-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: LogOut,
          label: "Output Tokens",
          value: formatCompactTokens(outputTokens),
          bgColor: "bg-success/12",
          textColor: "text-success",
          className: "border-0 shadow-sm"
        }
      )
    ] })
  ] });
}
export {
  CardGrid as C,
  StatCard as S,
  TokenUsageSection as T
};
