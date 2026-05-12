import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned action slot (button, link, badge, …). */
  action?: ReactNode;
  /** Heading level. Defaults to `h2`; choose lower for nested sections. */
  titleAs?: "h2" | "h3" | "h4";
  className?: string;
};

/**
 * In-page section heading: title + optional description on the left,
 * optional action on the right, bottom-aligned in a common parent.
 *
 * Use for sub-sections inside cards / page bodies. For page-level hero
 * headings, use `PageHeader`.
 */
export function SectionHeader({
  title,
  description,
  action,
  titleAs: TitleTag = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="min-w-0 space-y-1">
        <TitleTag className="text-body-strong text-foreground">{title}</TitleTag>
        {description ? (
          <p className="text-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
