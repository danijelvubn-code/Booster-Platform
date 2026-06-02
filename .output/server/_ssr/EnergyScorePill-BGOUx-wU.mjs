import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as Tooltip, b as TooltipTrigger, c as cn, d as TooltipContent, N as getSustainabilityGradeStyles } from "./router-D-bBPX7r.mjs";
import { aq as Leaf } from "../_libs/lucide-react.mjs";
const GRADE_BORDER_CLASS = {
  A: "border border-success/30",
  B: "border border-[#65A30D]/30",
  C: "border border-[#D3A532]/30",
  D: "border border-warning/30",
  E: "border border-destructive/30"
};
function EnergyScorePill({
  grade,
  bordered = false,
  className
}) {
  const g = grade.toUpperCase().charAt(0);
  const styles = getSustainabilityGradeStyles(g);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { delayDuration: 800, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex h-7 shrink-0 cursor-default items-center gap-1 rounded-md px-2 py-1",
          styles.box,
          bordered && (GRADE_BORDER_CLASS[g] ?? GRADE_BORDER_CLASS.B),
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Leaf,
            {
              className: cn("h-icon-16 w-icon-16 shrink-0", styles.icon),
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-body-sm leading-none tabular-nums",
                styles.icon
              ),
              children: g
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", children: "Energy efficiency score" })
  ] });
}
export {
  EnergyScorePill as E
};
