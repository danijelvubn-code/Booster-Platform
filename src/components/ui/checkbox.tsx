import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "group peer shrink-0 border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
  {
    variants: {
      size: {
        md: "h-icon-20 w-icon-20 rounded-sm",
        lg: "h-icon-24 w-icon-24 rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const checkboxIndicatorVariants = cva("flex items-center justify-center text-current", {
  variants: {
    size: {
      md: "scale-100",
      lg: "scale-100",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const checkboxIconVariants = cva("", {
  variants: {
    size: {
      md: "h-icon-16 w-icon-16",
      lg: "h-icon-20 w-icon-20",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      checkboxVariants({ size }),
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn(checkboxIndicatorVariants({ size }))}>
      <Check className={cn("hidden group-data-[state=checked]:block", checkboxIconVariants({ size }))} />
      <Minus className={cn("hidden group-data-[state=indeterminate]:block", checkboxIconVariants({ size }))} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
