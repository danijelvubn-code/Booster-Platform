import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";
import { getSustainabilityGradeStyles } from "@/lib/model-metrics";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type EnergyScorePillProps = {
  /** Single-letter grade (A–E); mapped to energy / sustainability styling. */
  grade: string;
  className?: string;
};

/**
 * Compact energy score control: leaf glyph + letter grade. Tooltip after delay explains the metric.
 */
export function EnergyScorePill({ grade, className }: EnergyScorePillProps) {
  const g = grade.toUpperCase().charAt(0);
  const styles = getSustainabilityGradeStyles(g);
  return (
    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild>
        <div
          className={cn("border-border flex h-7 shrink-0 cursor-default items-center rounded-md border p-0.5", className)}
        >
          <div
            className={cn(
              "flex h-full min-w-0 items-center justify-center rounded-bl-md rounded-tl-md px-2 py-1",
              styles.box,
            )}
          >
            <Leaf className={cn("h-icon-16 w-icon-16", styles.icon)} aria-hidden />
          </div>
          <div className="flex w-6 flex-col items-center justify-center">
            <span className="text-body-sm text-muted-foreground text-center leading-none">{g}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">Energy efficiency score</TooltipContent>
    </Tooltip>
  );
}
