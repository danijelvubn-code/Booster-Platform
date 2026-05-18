import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { a as SheetContent, c as SheetTitle, e as SheetDescription } from "./sheet-CqC0FH_q.mjs";
import { c as cn } from "./router-D2WQTUn2.mjs";
const appSideSheetShellVariants = cva(
  [
    "flex flex-col overflow-hidden p-0",
    "[&>button]:left-auto [&>button]:right-4 [&>button]:top-7 [&>button]:-translate-y-1/2",
    "[&>button>svg]:h-icon-20 [&>button>svg]:w-icon-20",
    "sm:top-6 sm:bottom-6 sm:right-6 sm:h-auto sm:rounded-2xl sm:shadow-lg"
  ].join(" "),
  {
    variants: {
      maxWidth: {
        sm: "sm:max-w-modal-sm",
        md: "sm:max-w-modal-md",
        lg: "sm:max-w-modal-lg"
      }
    },
    defaultVariants: {
      maxWidth: "lg"
    }
  }
);
const AppSideSheetContent = reactExports.forwardRef(
  ({
    className,
    title,
    description,
    descriptionClassName,
    headerClassName,
    toolbar,
    toolbarClassName,
    bodyClassName,
    bottomAccessory,
    bottomAccessoryClassName,
    footer,
    footerClassName,
    maxWidth,
    children,
    side = "right",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        ref,
        side,
        className: cn(appSideSheetShellVariants({ maxWidth }), className),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex h-14 shrink-0 items-center border-b border-border px-6 pr-14",
                headerClassName
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "min-w-0 flex-1 truncate", children: title })
            }
          ),
          description ? /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: cn("sr-only", descriptionClassName), children: description }) : null,
          toolbar != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "shrink-0 border-b border-border px-6 py-3",
                toolbarClassName
              ),
              children: toolbar
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-6 pl-6 pr-4",
                  bodyClassName
                ),
                style: { scrollbarGutter: "stable" },
                children
              }
            ),
            bottomAccessory != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "shrink-0 border-t border-border px-6 py-3",
                  bottomAccessoryClassName
                ),
                children: bottomAccessory
              }
            ) : null
          ] }),
          footer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "shrink-0 border-t border-border px-6 py-4",
                footerClassName
              ),
              children: footer
            }
          ) : null
        ]
      }
    );
  }
);
AppSideSheetContent.displayName = "AppSideSheetContent";
export {
  AppSideSheetContent as A
};
