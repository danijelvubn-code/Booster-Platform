import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-Dnm4IJqH.mjs";
import { b as getEndpointStatusBadgeVariant, a as getEndpointStatusLabel } from "./endpoint-status-DWtSdrJZ.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
function EndpointStatusBadge({
  status,
  size = "28",
  className
}) {
  const label = getEndpointStatusLabel(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: getEndpointStatusBadgeVariant(status),
      appearance: "pill",
      size,
      className: cn("font-normal", className),
      "aria-label": `Status: ${label}`,
      children: label
    }
  );
}
export {
  EndpointStatusBadge as E
};
