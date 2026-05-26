import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
import { X } from "../_libs/lucide-react.mjs";
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-overlay-scrim duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 overflow-y-auto bg-background p-6 shadow-lg ease-in-out duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity duration-200 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-icon-16 w-icon-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-h3 text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-body-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const sheetWidthClasses = {
  sm: "max-sm:w-3/4 sm:w-sheet-sm",
  md: "max-sm:w-3/4 sm:w-sheet-md",
  lg: "max-sm:w-3/4 sm:w-sheet-lg",
  xl: "max-sm:w-3/4 sm:w-sheet-xl",
  xxl: "max-sm:w-3/4 sm:w-sheet-xxl"
};
const appSideSheetShellVariants = cva(
  [
    "flex flex-col gap-0 overflow-hidden p-0",
    "[&>button]:left-auto [&>button]:right-4 [&>button]:top-7 [&>button]:z-20 [&>button]:-translate-y-1/2",
    "[&>button>svg]:h-icon-20 [&>button>svg]:w-icon-20",
    "sm:top-6 sm:bottom-6 sm:right-6 sm:h-auto sm:rounded-2xl sm:shadow-lg"
  ].join(" "),
  {
    variants: {
      maxWidth: sheetWidthClasses
    },
    defaultVariants: {
      maxWidth: "md"
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
    chromeClassName,
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "sticky top-0 z-10 shrink-0 bg-background shadow-sm",
                chromeClassName
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex h-14 items-center border-b border-border px-6 pr-14",
                      headerClassName
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "min-w-0 flex-1 truncate", children: title })
                  }
                ),
                description ? /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: cn("sr-only", descriptionClassName), children: description }) : null,
                toolbar != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-full border-b border-border", toolbarClassName), children: toolbar }) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-6 pl-6 pr-4 pt-6 [&>*]:shrink-0",
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
  AppSideSheetContent as A,
  Sheet as S,
  SheetTrigger as a
};
