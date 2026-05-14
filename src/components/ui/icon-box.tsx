import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Fixed outer frame + padded inner slot for Lucide/SVG icons (max size within slot; shape can vary).
 *
 * `xlg` uses `p-[6px]` (no 6px spacing token in theme yet).
 */
const iconBoxVariants = cva(
  "box-border inline-flex shrink-0 items-center justify-center bg-transparent [&_svg]:block [&_svg]:pointer-events-none [&_svg]:min-h-0 [&_svg]:min-w-0 [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:shrink",
  {
    variants: {
      size: {
        sm: "h-4 w-4 p-0.5",
        md: "h-5 w-5 p-0.5",
        lg: "h-6 w-6 p-0.5",
        xlg: "h-8 w-8 p-[6px]",
        xxlg: "h-10 w-10 p-2",
      },
      shape: {
        square: "rounded-md",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "square",
    },
  },
);

const glyphSlotVariants = cva("inline-flex min-h-0 min-w-0 items-center justify-center", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xlg: "h-5 w-5",
      xxlg: "h-6 w-6",
    },
  },
  defaultVariants: { size: "md" },
});

export type IconBoxProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof iconBoxVariants> & {
    children: React.ReactNode;
  };

const IconBox = React.forwardRef<HTMLSpanElement, IconBoxProps>(
  ({ className, size, shape, children, ...props }, ref) => (
    <span ref={ref} className={cn(iconBoxVariants({ size, shape }), className)} {...props}>
      <span className={glyphSlotVariants({ size })}>{children}</span>
    </span>
  ),
);

IconBox.displayName = "IconBox";

export { IconBox };
