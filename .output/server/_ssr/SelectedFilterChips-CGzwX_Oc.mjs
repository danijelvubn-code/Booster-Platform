import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root2, V as Value, T as Trigger, I as Icon, P as Portal, C as Content2, a as Viewport, b as Item, c as ItemIndicator, d as ItemText, S as ScrollUpButton, e as ScrollDownButton, L as Label, f as Separator } from "../_libs/radix-ui__react-select.mjs";
import { c as cn } from "./router-D-bBPX7r.mjs";
import { b as badgeVariants } from "./badge-bkIpVg5q.mjs";
import { B as Button } from "./button-DCHwUidX.mjs";
import { C as ChevronDown, o as Check, X, Q as ChevronUp } from "../_libs/lucide-react.mjs";
function getPaginationWindow(totalItems, page, pageSize) {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * safePageSize;
  const endIndexExclusive = Math.min(startIndex + safePageSize, totalItems);
  const displayRangeStart = totalItems > 0 ? startIndex + 1 : 0;
  const displayRangeEnd = totalItems > 0 ? endIndexExclusive : 0;
  return {
    totalItems,
    page,
    pageSize: safePageSize,
    totalPages,
    safePage,
    startIndex,
    endIndexExclusive,
    displayRangeStart,
    displayRangeEnd
  };
}
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-control-md w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-body-sm text-foreground ring-offset-background transition-colors ease-standard placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)] [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 shrink-0 text-foreground/50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-icon-16 w-icon-16" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1 text-muted-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-components-dropdown min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label,
  {
    ref,
    className: cn(
      "py-1.5 pl-8 pr-2 text-body-sm font-semibold text-muted-foreground",
      className
    ),
    ...props
  }
));
SelectLabel.displayName = Label.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm text-foreground outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--disabled-opacity)] focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-icon-16 w-icon-16 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-icon-16 w-icon-16" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
function SelectedFilterChips({
  chips,
  onClearAll
}) {
  if (chips.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
    chips.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          badgeVariants({
            variant: "outline",
            appearance: "pill",
            size: "28"
          }),
          "max-w-full min-w-0 border-border bg-white pr-1 font-normal text-foreground hover:border-border hover:bg-white"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 max-w-[240px] truncate", children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 hover:bg-muted/60",
              onClick: c.onRemove,
              "aria-label": `Remove ${c.label}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3", "aria-hidden": true })
            }
          )
        ]
      },
      c.key
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        className: "shrink-0 text-muted-foreground",
        onClick: onClearAll,
        children: "Clear all"
      }
    )
  ] });
}
export {
  Select as S,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectItem as d,
  SelectedFilterChips as e,
  getPaginationWindow as g
};
