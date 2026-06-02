import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-bkIpVg5q.mjs";
import { a as getEndpointStatusBadgeVariant, g as getEndpointStatusLabel } from "./endpoint-status-CLlA8IN0.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
import { O as LoaderCircle } from "../_libs/lucide-react.mjs";
function EndpointStatusBadge({
  status,
  size = "28",
  className
}) {
  const label = getEndpointStatusLabel(status);
  const isDeploying = status === "Deploying";
  const spinnerClassName = size === "24" ? "h-icon-16 w-icon-16" : "h-icon-20 w-icon-20";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: getEndpointStatusBadgeVariant(status),
      appearance: "pill",
      size,
      className: cn("font-normal", className),
      "aria-label": `Status: ${label}`,
      leadingIcon: isDeploying ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        LoaderCircle,
        {
          className: cn(spinnerClassName, "animate-spin"),
          "aria-hidden": true
        }
      ) : void 0,
      children: label
    }
  );
}
export {
  EndpointStatusBadge as E
};
