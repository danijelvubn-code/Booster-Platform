import { cn } from "@/lib/utils";

import { WizardStep, type WizardStepStatus } from "@/components/WizardStep";

export type WizardStepperStep = { id: string; label: string };

export type WizardStepperProps = {
  /** Steps for this flow only—length is not fixed (e.g. 2, 3, or 5). Each item needs a stable `id`. */
  steps: WizardStepperStep[];
  /** Zero-based index of the active step. */
  currentStep: number;
  onStepChange?: (index: number) => void;
  /** Per-step error (e.g. validation); overrides inactive/active/completed visuals for that index. */
  stepErrors?: boolean[];
  className?: string;
};

function StepConnector({
  active,
  transparent,
}: {
  /** Line reflects completed progress (primary) vs remaining (border). */
  active: boolean;
  transparent?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-0.5 min-h-0 min-w-0 flex-1 basis-0 self-center",
        transparent ? "bg-transparent" : active ? "bg-primary" : "bg-border",
      )}
    />
  );
}

function resolveStepStatus(
  index: number,
  currentStep: number,
  hasError: boolean,
): WizardStepStatus {
  if (hasError) return "error";
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "inactive";
}

/**
 * Horizontal wizard stepper with segmented connectors (Booster DS).
 * Pass any-length `steps` (2, 5, …) per flow. Only **upcoming** steps are `disabled`; **completed**
 * steps stay enabled so they keep full styling, hover, focus, and optional navigation via `onStepChange`.
 * Step visuals use `WizardStep`.
 */
export function WizardStepper({ steps, currentStep, onStepChange, stepErrors, className }: WizardStepperProps) {
  const lastIndex = steps.length - 1;

  return (
    <nav aria-label="Progress" className={cn("flex w-full min-w-0 items-center justify-center", className)}>
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        const leftActive = index > 0 && currentStep >= index;
        const rightActive = index < lastIndex && currentStep > index;

        const allowBack = Boolean(onStepChange) && isComplete;
        const disabled = isUpcoming;
        const hasError = stepErrors?.[index] ?? false;
        const status = resolveStepStatus(index, currentStep, hasError);

        return (
          <div key={step.id} className="flex min-w-0 min-h-0 flex-1 items-center">
            <StepConnector transparent={index === 0} active={leftActive} />
            <div className="flex shrink-0 flex-col items-stretch">
              <WizardStep
                disabled={disabled}
                aria-current={isCurrent ? "step" : undefined}
                status={status}
                onClick={() => {
                  if (allowBack) {
                    onStepChange?.(index);
                  }
                }}
              >
                {step.label}
              </WizardStep>
            </div>
            <StepConnector transparent={index === lastIndex} active={rightActive} />
          </div>
        );
      })}
    </nav>
  );
}

export { WizardStep } from "./WizardStep";
export type { WizardStepDemonstrateHover, WizardStepProps, WizardStepStatus } from "./WizardStep";
