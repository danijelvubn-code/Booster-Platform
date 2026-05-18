import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-teuhjnj_.mjs";
import { c as cn } from "./router-D2WQTUn2.mjs";
import { n as ArrowLeft } from "../_libs/lucide-react.mjs";
function BackButton({
  to,
  label = "Back",
  icon = true,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      asChild: true,
      variant: "ghost",
      size: "sm",
      className: cn(
        "-ml-3 h-auto px-3 py-2 text-body-sm text-muted-foreground hover:text-foreground",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4 shrink-0", "aria-hidden": true }),
        label
      ] })
    }
  );
}
export {
  BackButton as B
};
