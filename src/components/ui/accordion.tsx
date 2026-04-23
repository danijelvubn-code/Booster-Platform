import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, onClick, ...props }, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const itemElement = event.currentTarget;
    const isOpen = itemElement.getAttribute("data-state") === "open";
    if (!isOpen) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    const interactiveTarget = target.closest(
      "a,button,input,select,textarea,label,[role='button'],[role='link'],[data-accordion-prevent-toggle]",
    );
    if (interactiveTarget) return;

    const trigger = itemElement.querySelector<HTMLElement>("button[aria-expanded='true']");
    trigger?.click();
  };

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "group border-b last:border-b-0 data-[state=open]:cursor-pointer [&[data-disabled]>h3>button]:text-muted-foreground [&[data-disabled]>h3>button]:opacity-[var(--disabled-opacity)] [&[data-disabled]>h3>button>svg]:text-muted-foreground",
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-5 py-4 text-h3 transition-colors ease-standard group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent data-[disabled]:text-muted-foreground disabled:text-muted-foreground [&[data-state=open]>svg]:rotate-180 disabled:[&>svg]:text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-icon-16 w-icon-16 shrink-0 transition-transform duration-200 ease-standard" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "px-5 pb-4 pt-0 text-muted-foreground transition-colors group-hover:bg-muted/40 group-data-[disabled]:bg-transparent group-data-[disabled]:hover:bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
