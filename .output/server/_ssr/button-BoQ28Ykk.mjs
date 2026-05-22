import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-dUByybLQ.mjs";
import { au as LoaderCircle } from "../_libs/lucide-react.mjs";
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-label ring-offset-background transition-colors ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] [&_svg]:pointer-events-none [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Main action in a section.
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Dangerous actions (delete/remove).
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Semantic success actions/feedback (use sparingly).
        success: "bg-success text-success-foreground hover:bg-success/90",
        // Semantic warning actions/feedback (use sparingly).
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        // Semantic informational actions/feedback.
        info: "bg-info text-info-foreground hover:bg-info/90",
        // Neutral actions and filters — card surface reads as opaque white vs page background (light).
        outline: "border border-input bg-card text-foreground hover:bg-primary/4 hover:text-foreground hover:border-ring",
        // Supporting actions.
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Low-emphasis/toolbar actions — no fill; hover darkens text via .ghost-hover-text (foreground mix). Pair with text-info-hover-dim when using text-info.
        ghost: "ghost-hover-text",
        // Inline and navigational actions.
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        // 40px - standard action size.
        default: "h-control-md px-4 py-2",
        // 36px - dense UI size.
        sm: "h-control-sm rounded-md px-3",
        // 48px - emphasis size.
        lg: "h-control-lg rounded-md px-8",
        // 36x36 icon-only size for dense UIs.
        "icon-sm": "h-control-sm w-control-sm",
        // 40x40 icon-only size.
        icon: "h-control-md w-control-md"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({
    className,
    variant,
    size,
    asChild = false,
    leadingIcon,
    trailingIcon,
    loading = false,
    loadingText,
    disabled,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    if (asChild) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slot,
        {
          className: cn(buttonVariants({ variant, size }), className),
          ref,
          "aria-busy": loading || void 0,
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: cn(buttonVariants({ variant, size }), className),
        ref,
        disabled: isDisabled,
        "aria-busy": loading || void 0,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "inline-flex items-center gap-2 pt-px",
                loading && "opacity-0"
              ),
              children: [
                leadingIcon,
                loading && loadingText ? loadingText : children,
                trailingIcon
              ]
            }
          ),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoaderCircle,
            {
              className: "h-icon-16 w-icon-16 animate-spin",
              "aria-hidden": "true"
            }
          ) })
        ]
      }
    );
  }
);
Button.displayName = "Button";
export {
  Button as B
};
