import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
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
        xxxlg: "h-12 w-12 p-[6px]"
      },
      shape: {
        square: "rounded-md",
        circle: "rounded-full"
      }
    },
    defaultVariants: {
      size: "md",
      shape: "square"
    }
  }
);
const glyphSlotVariants = cva("inline-flex min-h-0 min-w-0 items-center justify-center", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
      xlg: "h-5 w-5",
      xxlg: "h-6 w-6",
      xxxlg: "h-9 w-9"
    }
  },
  defaultVariants: { size: "md" }
});
const IconBox = reactExports.forwardRef(
  ({ className, size, shape, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, className: cn(iconBoxVariants({ size, shape }), className), ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: glyphSlotVariants({ size }), children }) })
);
IconBox.displayName = "IconBox";
export {
  IconBox as I
};
