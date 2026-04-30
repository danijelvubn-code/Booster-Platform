import { forwardRef, type ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export type WizardStepStatus = "inactive" | "active" | "completed" | "error";

export type WizardStepDemonstrateHover = "inactive" | "completed";

export type WizardStepProps = ComponentPropsWithRef<"button"> & {
  /** Visual state of the step pill. */
  status: WizardStepStatus;
  /**
   * Dev / component lab: show the same surface as :hover without pointer interaction.
   * Omit in product code; inactive + completed hovers use `enabled:hover:` when not disabled.
   */
  demonstrateHover?: WizardStepDemonstrateHover;
};

const baseStepClasses =
  "max-w-full truncate rounded-full px-4 py-2 text-center text-caption font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function statusSurfaceClasses(
  status: WizardStepStatus,
  demonstrateHover: WizardStepDemonstrateHover | undefined,
  disabled: boolean | undefined,
): string {
  const showInactiveHover =
    demonstrateHover === "inactive" && status === "inactive" && !disabled;
  const showCompletedHover =
    demonstrateHover === "completed" && status === "completed" && !disabled;

  switch (status) {
    case "inactive":
      return cn(
        "border border-border bg-muted text-muted-foreground",
        !showInactiveHover &&
          !disabled &&
          "enabled:hover:bg-accent enabled:hover:text-accent-foreground",
        showInactiveHover && "border-border bg-accent text-accent-foreground",
      );
    case "active":
      return cn(
        "border-2 border-primary bg-card text-primary ring-4 ring-primary/30 ring-offset-2 ring-offset-card",
      );
    case "completed":
      return cn(
        "border-2 border-primary bg-primary text-primary-foreground",
        !showCompletedHover && !disabled && "enabled:hover:bg-primary/90",
        showCompletedHover && "bg-primary/90",
      );
    case "error":
      return cn("border-2 border-destructive bg-destructive/10 text-destructive");
  }
}

/**
 * Single wizard progress pill (Booster DS). Pairs with `WizardStepper` connectors.
 *
 * - **inactive**: muted surface; hover lifts to accent when enabled.
 * - **active**: card surface, primary border, focus ring.
 * - **completed**: filled primary; hover darkens slightly when enabled.
 * - **error**: destructive border and soft destructive surface.
 * - **disabled**: pass `disabled`; hover styles do not apply (`enabled:` guards). In `WizardStepper`, only upcoming steps are disabled; completed steps stay enabled.
 */
export const WizardStep = forwardRef<HTMLButtonElement, WizardStepProps>(
  (
    { className, status, disabled, demonstrateHover, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStepClasses,
          statusSurfaceClasses(status, demonstrateHover, disabled),
          disabled && "cursor-not-allowed opacity-50",
          !disabled && status !== "error" && status !== "active" && "cursor-pointer",
          status === "active" && !disabled && "cursor-default",
          className,
        )}
        {...props}
      />
    );
  },
);

WizardStep.displayName = "WizardStep";
