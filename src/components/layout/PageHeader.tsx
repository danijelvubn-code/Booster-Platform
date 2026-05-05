import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PageHeaderTitleSize = "page" | "section" | "display" | "overview";

export type PageHeaderProps = {
  /** Optional row above the title block (back link, etc.). */
  leading?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned actions — implies hero row layout when non-null. */
  actions?: ReactNode;
  /** Maps typography + heading level. `overview` renders `h2`; others render `h1`. */
  titleSize?: PageHeaderTitleSize;
  /** Hero row breakpoint: Cosmos `sm`, Overview `md`. */
  breakAt?: "sm" | "md";
  /** Constrain intro paragraph width (`max-w-page-intro`). */
  descriptionMaxWidthPageIntro?: boolean;
  /** Left-column modifier on hero (e.g. `max-w-3xl`). */
  introClassName?: string;
  /** Wrapper for actions. */
  actionsClassName?: string;
  className?: string;
};

function titleClasses(size: PageHeaderTitleSize): string {
  switch (size) {
    case "section":
      return "text-h2 text-foreground";
    case "display":
      return "text-display font-bold tracking-tight text-foreground";
    case "overview":
      return "text-lg font-semibold text-foreground";
    case "page":
    default:
      return "text-h1 font-bold tracking-tight text-foreground";
  }
}

/** Page title region: hero (title + description | actions), stacked intro + optional leading, or title-only. */
export function PageHeader({
  leading,
  title,
  description,
  actions,
  titleSize = "page",
  breakAt = "sm",
  descriptionMaxWidthPageIntro = false,
  introClassName,
  actionsClassName,
  className,
}: PageHeaderProps) {
  const TitleTag = titleSize === "overview" ? "h2" : "h1";
  const heroRowClass =
    breakAt === "md"
      ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      : "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between";

  const useHeroSplit = actions != null;

  if (!description && !actions) {
    const header = (
      <header className={cn(className)}>
        <TitleTag className={titleClasses(titleSize)}>{title}</TitleTag>
      </header>
    );
    return leading ? (
      <div className={cn("space-y-4", className)}>
        <div>{leading}</div>
        {header}
      </div>
    ) : (
      header
    );
  }

  if (!useHeroSplit && description) {
    return (
      <div className={cn("space-y-4", className)}>
        {leading ? <div>{leading}</div> : null}
        <header className="space-y-1">
          <TitleTag className={titleClasses(titleSize)}>{title}</TitleTag>
          <p className="text-body-sm text-muted-foreground">{description}</p>
        </header>
      </div>
    );
  }

  const body = (
    <div className={heroRowClass}>
      <div className={cn("space-y-1", introClassName)}>
        <TitleTag className={titleClasses(titleSize)}>{title}</TitleTag>
        {description ? (
          <p
            className={cn(
              "text-body-sm text-muted-foreground",
              descriptionMaxWidthPageIntro && "max-w-page-intro",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div
          className={cn(
            "flex shrink-0 items-center gap-2",
            breakAt === "md" ? "md:pb-0.5" : "sm:pb-0.5",
            actionsClassName,
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );

  if (leading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div>{leading}</div>
        {body}
      </div>
    );
  }

  return <div className={className}>{body}</div>;
}
