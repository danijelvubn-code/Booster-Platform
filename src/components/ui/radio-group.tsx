import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "flex flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-4",
      className,
    )}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const radioGroupItemVariants = cva(
  "peer aspect-square shrink-0 rounded-full border border-input text-primary ring-offset-background transition-colors data-[state=checked]:border-primary enabled:hover:border-ring enabled:data-[state=unchecked]:hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] disabled:hover:border-input disabled:hover:bg-transparent",
  {
    variants: {
      size: {
        /** Aligns with checkbox `md` (16px). */
        md: "h-icon-16 w-icon-16",
        /** Aligns with checkbox `lg` (20px). */
        lg: "h-icon-20 w-icon-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const radioIndicatorDotVariants = cva("fill-current text-current", {
  variants: {
    size: {
      md: "h-2 w-2",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>;

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ className, size, ...props }, ref) => (
    <RadioGroupPrimitive.Item ref={ref} className={cn(radioGroupItemVariants({ size }), className)} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(radioIndicatorDotVariants({ size }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  ),
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
