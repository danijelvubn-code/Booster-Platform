import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as cn } from "./router-dUByybLQ.mjs";
import { C as ChevronDown } from "../_libs/lucide-react.mjs";
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const itemElement = event.currentTarget;
    const isOpen = itemElement.getAttribute("data-state") === "open";
    if (!isOpen) return;
    const target = event.target;
    if (!target) return;
    const interactiveTarget = target.closest(
      "a,button,input,select,textarea,label,[role='button'],[role='link'],[data-accordion-prevent-toggle]"
    );
    if (interactiveTarget) return;
    const trigger = itemElement.querySelector(
      "button[aria-expanded='true']"
    );
    trigger?.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      ref,
      className: cn(
        "group border-b last:border-b-0 data-[state=open]:cursor-pointer [&[data-disabled]>h3>button]:text-muted-foreground [&[data-disabled]>h3>button]:opacity-[var(--disabled-opacity)] [&[data-disabled]>h3>button>svg]:text-muted-foreground",
        className
      ),
      onClick: handleClick,
      ...props
    }
  );
});
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between px-5 py-4 text-h3 transition-colors ease-standard group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent data-[disabled]:text-muted-foreground disabled:text-muted-foreground [&[data-state=open]>svg]:rotate-180 disabled:[&>svg]:text-muted-foreground",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-icon-16 w-icon-16 shrink-0 transition-transform duration-200 ease-standard" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-body-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "px-5 pb-4 pt-0 text-muted-foreground transition-colors group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent",
          className
        ),
        children
      }
    )
  }
));
AccordionContent.displayName = Content2.displayName;
export {
  Accordion as A,
  AccordionItem as a,
  AccordionTrigger as b,
  AccordionContent as c
};
