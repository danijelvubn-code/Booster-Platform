import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-D2WQTUn2.mjs";
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
export {
  CardGrid as C
};
