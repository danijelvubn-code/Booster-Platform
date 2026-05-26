import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
const progressRootVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        /** Default track height for lists and forms. */
        regular: "h-2",
        /** Compact track (toolbars, dense tables, wizard chrome). */
        dense: "h-1.5"
      },
      tone: {
        /** Solid primary fill (standard progress). */
        default: "",
        /**
         * Usage ramp — paints a green → amber → red gradient (at 50% alpha) on the
         * track itself. The indicator becomes a right-side mask that reveals more
         * of the ramp as `value` grows (low usage = green, high usage = red).
         */
        ramp: "bg-gradient-to-r from-success/50 via-warning/50 to-destructive/50"
      }
    },
    defaultVariants: {
      size: "regular",
      tone: "default"
    }
  }
);
const Progress = reactExports.forwardRef(({ className, value, size, tone, indicatorClassName, ...props }, ref) => {
  const isDeterminate = typeof value === "number" && Number.isFinite(value);
  const isRamp = tone === "ramp";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      ref,
      className: cn(progressRootVariants({ size, tone }), className),
      value,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          className: cn(
            "h-full rounded-full",
            isRamp ? "bg-secondary" : "bg-primary",
            isDeterminate ? "w-full flex-1 transition-all duration-300 ease-standard" : "absolute inset-y-0 left-0 w-1/3 min-w-0 animate-progress-indeterminate",
            indicatorClassName
          ),
          style: isDeterminate ? { transform: `translateX(${isRamp ? value : -(100 - value)}%)` } : void 0
        }
      )
    }
  );
});
Progress.displayName = Root.displayName;
export {
  Progress as P
};
