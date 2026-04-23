import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Button usage guidance:
 * - size="default" (40px): standard actions (primary/secondary).
 * - size="sm" (36px): dense UI (tables, toolbars, compact filters).
 * - size="lg" (48px): emphasized actions only (hero/onboarding/featured).
 * - Avoid mixing heights in the same action group unless functionally necessary.
 *
 * Content options:
 * - label
 * - leading icon + label
 * - label + trailing icon
 * - leading icon + label + trailing icon
 * - icon-only (must include aria-label)
 *
 * States:
 * - default, hover, focus-visible, active, disabled, loading.
 * - loading keeps layout width stable.
 */
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
        // Neutral actions and filters.
        // Keep outline buttons unfilled (especially in dark mode): border + text only.
        outline: "border border-input bg-transparent text-foreground hover:bg-primary/4 hover:text-foreground hover:border-ring",
        // Supporting actions.
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Low-emphasis/toolbar actions — no fill; hover darkens text via .ghost-hover-text (foreground mix). Pair with text-info-hover-dim when using text-info.
        ghost: "ghost-hover-text",
        // Inline and navigational actions.
        link: "text-primary underline-offset-4 hover:underline",
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
        icon: "h-control-md w-control-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // Preserve Radix Slot/asChild behavior for link-style buttons.
    // This keeps routing wrappers (e.g. <Button asChild><Link .../></Button>) stable.
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref}
          aria-busy={loading || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        <span className={cn("inline-flex items-center gap-2 pt-px", loading && "opacity-0")}>
          {leadingIcon}
          {loading && loadingText ? loadingText : children}
          {trailingIcon}
        </span>
        {loading && (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Loader2 className="h-icon-16 w-icon-16 animate-spin" aria-hidden="true" />
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
