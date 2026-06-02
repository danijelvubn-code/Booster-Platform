import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as publicAssetUrl } from "./public-asset-url-539yhzQl.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
const LOCKUP_SRC = {
  "on-dark": publicAssetUrl("brand/booster-logo-white.svg"),
  "on-light": publicAssetUrl("brand/booster-logo-black.svg")
};
const MARK_SRC = publicAssetUrl("brand/booster-mark.svg");
const markSizeClass = {
  xs: "h-icon-16 w-icon-16",
  sm: "h-icon-20 w-icon-20",
  md: "h-icon-24 w-icon-24",
  lg: "h-icon-28 w-icon-28",
  xl: "h-icon-60 w-icon-60"
};
const lockupHeightClass = {
  xs: "h-icon-16",
  sm: "h-icon-20",
  md: "h-icon-24",
  lg: "h-icon-28",
  xl: "h-icon-60"
};
function BoosterLogo({
  variant = "lockup",
  tone = "on-light",
  size = "md",
  presentation = false,
  className
}) {
  if (variant === "mark") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: MARK_SRC,
        alt: "",
        className: cn(
          markSizeClass[size],
          "shrink-0 object-contain",
          className
        )
      }
    );
  }
  const alt = presentation ? "" : "Booster";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: LOCKUP_SRC[tone],
      alt,
      className: cn(
        lockupHeightClass[size],
        "w-auto max-w-full shrink-0 object-contain object-left",
        className
      )
    }
  );
}
export {
  BoosterLogo as B
};
