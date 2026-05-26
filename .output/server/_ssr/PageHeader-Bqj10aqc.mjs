import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-D-lR6Urn.mjs";
function titleClasses(size) {
  switch (size) {
    case "section":
      return "text-h2 text-foreground";
    case "display":
      return "text-display font-bold tracking-tight text-foreground";
    case "overview":
      return "text-lg font-semibold text-foreground";
    default:
      return "text-h1 font-bold tracking-tight text-foreground";
  }
}
function PageHeader({
  leading,
  title,
  description,
  actions,
  titleSize = "page",
  breakAt = "sm",
  descriptionMaxWidthPageIntro = false,
  introClassName,
  actionsClassName,
  className
}) {
  const TitleTag = titleSize === "overview" ? "h2" : "h1";
  const heroRowClass = breakAt === "md" ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between" : "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between";
  const useHeroSplit = actions != null;
  if (!description && !actions) {
    const header = /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: cn(className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TitleTag, { className: titleClasses(titleSize), children: title }) });
    return leading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-4", className), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: leading }),
      header
    ] }) : header;
  }
  if (!useHeroSplit && description) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-4", className), children: [
      leading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: leading }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleTag, { className: titleClasses(titleSize), children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-body-sm text-muted-foreground", children: description })
      ] })
    ] });
  }
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: heroRowClass, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-1", introClassName), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TitleTag, { className: titleClasses(titleSize), children: title }),
      description ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: cn(
            "text-body-sm text-muted-foreground",
            descriptionMaxWidthPageIntro && "max-w-page-intro"
          ),
          children: description
        }
      ) : null
    ] }),
    actions ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "flex shrink-0 items-center gap-2",
          breakAt === "md" ? "md:pb-0.5" : "sm:pb-0.5",
          actionsClassName
        ),
        children: actions
      }
    ) : null
  ] });
  if (leading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-4", className), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: leading }),
      body
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: body });
}
export {
  PageHeader as P
};
