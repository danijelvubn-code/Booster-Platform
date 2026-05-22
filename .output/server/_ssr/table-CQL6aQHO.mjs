import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./router-dUByybLQ.mjs";
const TableSizeContext = reactExports.createContext("md");
const useTableSize = () => reactExports.useContext(TableSizeContext);
const tableHeadVariants = cva(
  "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        sm: "h-control-sm px-2 py-2 text-caption",
        md: "h-control-lg px-4 text-label",
        lg: "min-h-control-lg px-6 py-3 text-label"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const tableCellVariants = cva("align-middle [&:has([role=checkbox])]:pr-0", {
  variants: {
    size: {
      sm: "p-2 text-body-sm",
      md: "p-4 text-body-sm",
      lg: "p-6 text-body"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const tableCaptionVariants = cva("mt-4 text-muted-foreground", {
  variants: {
    size: {
      sm: "text-caption",
      md: "text-body-sm",
      lg: "text-body-sm"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const Table = reactExports.forwardRef(
  ({ className, size = "md", containerClassName, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableSizeContext.Provider, { value: size, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative w-full overflow-auto", containerClassName), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-body-sm", className),
      ...props
    }
  ) }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const size = useTableSize();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "th",
      {
        ref,
        className: cn(tableHeadVariants({ size }), className),
        ...props
      }
    );
  }
);
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTableSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      ref,
      className: cn(tableCellVariants({ size }), className),
      ...props
    }
  );
});
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTableSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "caption",
    {
      ref,
      className: cn(tableCaptionVariants({ size }), className),
      ...props
    }
  );
});
TableCaption.displayName = "TableCaption";
const TableCellStack = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex min-w-0 flex-col gap-1", className),
    ...props
  }
));
TableCellStack.displayName = "TableCellStack";
const TableCellTitle = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTableSize();
  const titleClass = size === "lg" ? "text-body-strong" : "text-body-sm-strong";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref,
      className: cn(titleClass, "truncate text-foreground", className),
      ...props
    }
  );
});
TableCellTitle.displayName = "TableCellTitle";
const TableCellDescription = reactExports.forwardRef(({ className, ...props }, ref) => {
  const size = useTableSize();
  const descClass = size === "lg" ? "text-body-sm text-muted-foreground" : "text-caption text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref,
      className: cn(descClass, "truncate", className),
      ...props
    }
  );
});
TableCellDescription.displayName = "TableCellDescription";
const TableCellWithAvatarName = reactExports.forwardRef(({ className, avatar, title, description, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "div",
  {
    ref,
    className: cn("flex min-w-0 items-center gap-2", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: avatar }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCellTitle, { children: title }),
        description != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableCellDescription, { children: description }) : null
      ] })
    ]
  }
));
TableCellWithAvatarName.displayName = "TableCellWithAvatarName";
export {
  Table as T,
  TableHeader as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e
};
