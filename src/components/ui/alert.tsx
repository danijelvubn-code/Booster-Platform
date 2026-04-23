import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full border",
  {
    variants: {
      variant: {
        info: "border-info/30 bg-info/12 text-foreground",
        success: "border-success/30 bg-success/12 text-foreground",
        warning: "border-warning/30 bg-warning/12 text-foreground",
        destructive: "border-destructive/30 bg-destructive/12 text-foreground",
      },
      layout: {
        inline: "rounded-lg",
        banner: "rounded-none border-x-0 border-t-0",
      },
      density: {
        default: "p-4",
        compact: "p-3",
      },
    },
    defaultVariants: {
      variant: "info",
      layout: "inline",
      density: "default",
    },
  },
);

const iconColorVariants = cva("", {
  variants: {
    variant: {
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const defaultIconByVariant = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
} as const;

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof alertVariants> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(
  (
    {
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
    },
    ref,
  ) => {
    const VariantIcon = defaultIconByVariant[variant as AlertVariant];
    const iconNode = icon ?? <VariantIcon className="h-icon-16 w-icon-16" aria-hidden="true" />;
    const actionNodes = React.Children.toArray(actions).slice(0, 2);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, layout, density }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {showIcon && (
            <span className={cn("mt-0.5 shrink-0", iconColorVariants({ variant }))}>
              {iconNode}
            </span>
          )}

          <div className="min-w-0 flex-1">{children}</div>

          {actionNodes.length > 0 && (
            <div className="flex shrink-0 items-center gap-2">{actionNodes}</div>
          )}

          {dismissible && (
            <button
              type="button"
              aria-label="Dismiss alert"
              onClick={onDismiss}
              className={cn(
                "shrink-0 rounded-md p-1 text-muted-foreground transition-colors ease-standard hover:bg-accent hover:text-foreground",
              )}
            >
              <X className="h-icon-16 w-icon-16" />
            </button>
          )}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      data-alert-title
      className={cn("mb-1 text-h3", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-alert-description
      className={cn("text-body-sm text-muted-foreground [&_p]:leading-relaxed", className)}
      {...props}
    />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
