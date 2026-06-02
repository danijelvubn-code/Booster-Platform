import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
const textareaVariants = cva(
  "flex w-full resize-y rounded-md border border-input bg-background text-foreground ring-offset-background transition-colors ease-standard placeholder:text-foreground/50 enabled:hover:border-ring read-only:hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground/50 read-only:cursor-default read-only:bg-muted",
  {
    variants: {
      size: {
        sm: "min-h-16 px-2 py-2 text-caption",
        md: "min-h-20 px-3 py-2 text-body-sm",
        lg: "min-h-24 px-4 py-3 text-body-sm"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const Textarea = reactExports.forwardRef(
  ({ className, size, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        ref,
        className: cn(textareaVariants({ size }), className),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea as T
};
