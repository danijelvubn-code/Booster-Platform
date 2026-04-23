import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TableSize = "sm" | "md" | "lg";

const TableSizeContext = React.createContext<TableSize>("md");

export const useTableSize = () => React.useContext(TableSizeContext);

const tableHeadVariants = cva(
  "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        sm: "h-control-sm px-2 py-2 text-caption",
        md: "h-control-lg px-4 text-label",
        lg: "min-h-control-lg px-6 py-3 text-label",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const tableCellVariants = cva("align-middle [&:has([role=checkbox])]:pr-0", {
  variants: {
    size: {
      sm: "p-2 text-body-sm",
      md: "p-4 text-body-sm",
      lg: "p-6 text-body",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const tableCaptionVariants = cva("mt-4 text-muted-foreground", {
  variants: {
    size: {
      sm: "text-caption",
      md: "text-body-sm",
      lg: "text-body-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  size?: TableSize;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, size = "md", ...props }, ref) => (
  <TableSizeContext.Provider value={size}>
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-body-sm", className)} {...props} />
    </div>
  </TableSizeContext.Provider>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => {
  const size = useTableSize();
  return <th ref={ref} className={cn(tableHeadVariants({ size }), className)} {...props} />;
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    const size = useTableSize();
    return <td ref={ref} className={cn(tableCellVariants({ size }), className)} {...props} />;
  },
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => {
    const size = useTableSize();
    return <caption ref={ref} className={cn(tableCaptionVariants({ size }), className)} {...props} />;
  },
);
TableCaption.displayName = "TableCaption";

const TableCellStack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex min-w-0 flex-col gap-1", className)} {...props} />
  ),
);
TableCellStack.displayName = "TableCellStack";

const TableCellTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const size = useTableSize();
    const titleClass = size === "lg" ? "text-body-strong" : "text-body-sm-strong";
    return <span ref={ref} className={cn(titleClass, "truncate text-foreground", className)} {...props} />;
  },
);
TableCellTitle.displayName = "TableCellTitle";

const TableCellDescription = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const size = useTableSize();
    const descClass =
      size === "lg" ? "text-body-sm text-muted-foreground" : "text-caption text-muted-foreground";
    return <span ref={ref} className={cn(descClass, "truncate", className)} {...props} />;
  },
);
TableCellDescription.displayName = "TableCellDescription";

type TableCellWithDescriptionProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
};

function TableCellWithDescription({ title, description, className }: TableCellWithDescriptionProps) {
  return (
    <TableCellStack className={className}>
      <TableCellTitle>{title}</TableCellTitle>
      <TableCellDescription>{description}</TableCellDescription>
    </TableCellStack>
  );
}

type TableCellWithAvatarNameProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  avatar: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
};

const TableCellWithAvatarName = React.forwardRef<HTMLDivElement, TableCellWithAvatarNameProps>(
  ({ className, avatar, title, description, ...props }, ref) => (
    <div ref={ref} className={cn("flex min-w-0 items-center gap-2", className)} {...props}>
      <div className="shrink-0">{avatar}</div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <TableCellTitle>{title}</TableCellTitle>
        {description != null ? <TableCellDescription>{description}</TableCellDescription> : null}
      </div>
    </div>
  ),
);
TableCellWithAvatarName.displayName = "TableCellWithAvatarName";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableCellStack,
  TableCellTitle,
  TableCellDescription,
  TableCellWithDescription,
  TableCellWithAvatarName,
};

export type { TableHeadProps, TableCellWithDescriptionProps, TableCellWithAvatarNameProps };
