import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn, m as models } from "./router-D-bBPX7r.mjs";
import { B as Button } from "./button-DCHwUidX.mjs";
import { b as getModelLifecycleAlert, d as getSuggestedSuccessorModel } from "./model-lifecycle-DdncnGhw.mjs";
import { X, F as CircleAlert, aA as TriangleAlert, g as CircleCheck, I as Info } from "../_libs/lucide-react.mjs";
const alertVariants = cva("relative w-full border", {
  variants: {
    variant: {
      info: "border-info/30 bg-info/4 text-foreground",
      success: "border-success/30 bg-success/4 text-foreground",
      warning: "border-warning/30 bg-warning/4 text-foreground",
      destructive: "border-destructive/30 bg-destructive/4 text-foreground"
    },
    layout: {
      inline: "rounded-lg",
      banner: "rounded-none border-x-0 border-t-0"
    },
    density: {
      default: "p-4",
      compact: "p-3"
    }
  },
  defaultVariants: {
    variant: "info",
    layout: "inline",
    density: "default"
  }
});
const iconColorVariants = cva("", {
  variants: {
    variant: {
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive"
    }
  },
  defaultVariants: {
    variant: "info"
  }
});
const defaultIconByVariant = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleAlert
};
const Alert = reactExports.forwardRef(
  ({
    className,
    variant = "info",
    layout,
    density,
    icon,
    showIcon = true,
    dismissible = false,
    onDismiss,
    actions,
    children,
    ...props
  }, ref) => {
    const VariantIcon = defaultIconByVariant[variant];
    const iconNode = icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(VariantIcon, { className: "h-icon-16 w-icon-16", "aria-hidden": "true" });
    const actionNodes = reactExports.Children.toArray(actions).slice(0, 2);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "alert",
        className: cn(alertVariants({ variant, layout, density }), className),
        ...props,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("mt-0.5 shrink-0", iconColorVariants({ variant })),
              children: iconNode
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children }),
          actionNodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: actionNodes }),
          dismissible && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Dismiss alert",
              onClick: onDismiss,
              className: cn(
                "shrink-0 rounded-md p-1 text-muted-foreground transition-colors ease-standard hover:bg-accent hover:text-foreground"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-icon-16 w-icon-16" })
            }
          )
        ] })
      }
    );
  }
);
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "h5",
  {
    ref,
    "data-alert-title": true,
    className: cn("mb-1 text-h3", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    "data-alert-description": true,
    className: cn(
      "text-body-sm text-muted-foreground [&_p]:leading-relaxed",
      className
    ),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
function ModelLifecycleAlert({
  model,
  className
}) {
  const alert = getModelLifecycleAlert(model);
  if (!alert) return null;
  const successor = getSuggestedSuccessorModel(model, models);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Alert,
    {
      variant: alert.variant,
      density: "compact",
      className,
      actions: successor ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app/cosmos/$modelId",
          params: { modelId: successor.id },
          search: { returnTo: "/app/cosmos", returnLabel: "Cosmos" },
          children: "View similar models"
        }
      ) }) : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: alert.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: alert.description })
      ]
    }
  );
}
export {
  Alert as A,
  ModelLifecycleAlert as M,
  AlertTitle as a,
  AlertDescription as b
};
