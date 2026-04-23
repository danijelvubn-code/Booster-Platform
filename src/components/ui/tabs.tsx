import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TabsSize = "sm" | "md" | "lg";

const TabsSizeContext = React.createContext<TabsSize>("md");

export const useTabsSize = () => React.useContext(TabsSizeContext);

const tabsListVariants = cva(
  "inline-flex w-fit max-w-full shrink-0 justify-start gap-1 bg-primary/7 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-control-sm items-stretch rounded-md p-0.5",
        md: "h-control-md items-stretch rounded-md p-0.5",
        lg: "h-control-lg items-center rounded-lg p-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-muted-foreground ring-offset-background transition-all ease-standard data-[state=inactive]:hover:bg-primary/12 data-[state=inactive]:hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:[&_svg]:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)] [&_svg]:h-icon-16 [&_svg]:w-icon-16 [&_svg]:shrink-0 [&_svg]:text-current",
  {
    variants: {
      size: {
        sm: "h-full min-h-0 rounded-sm px-2 text-caption font-medium",
        md: "h-full min-h-0 rounded-sm px-3 text-label",
        lg: "rounded-md px-4 py-2 text-body-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "mt-2",
        md: "mt-2",
        lg: "mt-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  size?: TabsSize;
};

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ size = "md", ...props }, ref) => (
    <TabsSizeContext.Provider value={size}>
      <TabsPrimitive.Root ref={ref} {...props} />
    </TabsSizeContext.Provider>
  ),
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return (
    <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ size }), className)} {...props} />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return (
    <TabsPrimitive.Trigger ref={ref} className={cn(tabsTriggerVariants({ size }), className)} {...props} />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const size = useTabsSize();
  return (
    <TabsPrimitive.Content ref={ref} className={cn(tabsContentVariants({ size }), className)} {...props} />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
