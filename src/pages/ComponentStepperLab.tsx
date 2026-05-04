import { useState, type ReactNode } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";
import { Link } from "react-router-dom";

import { WizardStep } from "@/components/WizardStep";
import { WizardStepper } from "@/components/WizardStepper";
import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";

/** Example flows — real screens build their own `steps` arrays (any length). */
const TWO_STEP_FLOW = [
  { id: "configure", label: "Configure" },
  { id: "review", label: "Review" },
] as const;

const THREE_STEP_FLOW = [
  { id: "basic", label: "Basic" },
  { id: "provider", label: "Model Provider" },
  { id: "review", label: "Review & Deploy" },
] as const;

const FIVE_STEP_FLOW = [
  { id: "scope", label: "Scope" },
  { id: "model", label: "Model" },
  { id: "guardrails", label: "Guardrails" },
  { id: "budget", label: "Budget" },
  { id: "deploy", label: "Deploy" },
] as const;

function StripPreview({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xs">
      <div className="flex h-endpoint-deploy-strip min-h-endpoint-deploy-strip items-center justify-center border-b border-border px-4 py-2">
        {children}
      </div>
      <div className="p-4 text-caption text-muted-foreground">Content area below the step strip (placeholder).</div>
    </div>
  );
}

function StateRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-full shrink-0 text-caption text-muted-foreground sm:w-40">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

const ComponentStepperLab = () => {
  const [interactiveStep, setInteractiveStep] = useState(2);

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          <code className="text-caption">WizardStep</code> is the step pill; <code className="text-caption">WizardStepper</code>{" "}
          adds connectors and flow logic. There is no fixed step count—each flow passes its own{" "}
          <code className="text-caption">steps</code> array. Sources:{" "}
          <code className="text-caption">src/components/WizardStep.tsx</code>,{" "}
          <code className="text-caption">src/components/WizardStepper.tsx</code>.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <code className="text-caption">WizardStepper</code>: only <strong>upcoming</strong> steps use native{" "}
            <code className="text-caption">disabled</code>; completed steps stay enabled for hover/focus and optional
            back navigation when you pass <code className="text-caption">onStepChange</code>.
          </li>
          <li>
            Step surface: <code className="text-caption">inactive</code>, <code className="text-caption">active</code>,{" "}
            <code className="text-caption">completed</code>, <code className="text-caption">error</code>
          </li>
          <li>Inactive / completed hovers: accent and primary/90 via enabled:hover (not applied while disabled)</li>
          <li>Connectors: h-0.5, bg-primary vs bg-border</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("buttons")}>
              Button
            </Link>
            {" — "}shared focus ring pattern.
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            Example screen: <code className="text-caption">MvpCreateEndpointAlt</code> defines a 3-step{" "}
            <code className="text-caption">steps</code> list for that route only.
          </li>
        </ul>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-h2 text-foreground">Wizard stepper</h1>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Layout is driven by whatever <code className="text-caption">steps</code> you pass—two steps, five, or more.
            Completed steps remain fully interactive (hover, focus); only future steps are disabled until you reach them.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-h3 text-foreground">WizardStep states</h2>
          <p className="text-caption text-muted-foreground">
            Hover rows use the real <code className="text-caption">:hover</code> styles. Inactive/completed hover previews
            use <code className="text-caption">demonstrateHover</code> (labs only; product omits it).
          </p>
          <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-xs">
            <StateRow label="Inactive">
              <WizardStep type="button" status="inactive">
                Basic
              </WizardStep>
            </StateRow>
            <StateRow label="Active">
              <WizardStep type="button" status="active">
                Model Provider
              </WizardStep>
            </StateRow>
            <StateRow label="Completed">
              <WizardStep type="button" status="completed">
                Basic
              </WizardStep>
            </StateRow>
            <StateRow label="Disabled (inactive)">
              <WizardStep type="button" status="inactive" disabled>
                Review &amp; Deploy
              </WizardStep>
            </StateRow>
            <StateRow label="Disabled (completed)">
              <WizardStep type="button" status="completed" disabled>
                Basic
              </WizardStep>
            </StateRow>
            <StateRow label="Inactive hover (live)">
              <WizardStep type="button" status="inactive">
                Hover me
              </WizardStep>
            </StateRow>
            <StateRow label="Inactive hover (pinned)">
              <WizardStep type="button" status="inactive" demonstrateHover="inactive">
                Model Provider
              </WizardStep>
            </StateRow>
            <StateRow label="Completed hover (live)">
              <WizardStep type="button" status="completed">
                Hover me
              </WizardStep>
            </StateRow>
            <StateRow label="Completed hover (pinned)">
              <WizardStep type="button" status="completed" demonstrateHover="completed">
                Basic
              </WizardStep>
            </StateRow>
            <StateRow label="Error">
              <WizardStep type="button" status="error">
                Fix validation
              </WizardStep>
            </StateRow>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Two-step flow</h2>
          <StripPreview>
            <WizardStepper steps={[...TWO_STEP_FLOW]} currentStep={0} />
          </StripPreview>
        </section>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Five-step flow (mid progress)</h2>
          <StripPreview>
            <WizardStepper steps={[...FIVE_STEP_FLOW]} currentStep={2} />
          </StripPreview>
        </section>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Step error (three-step example)</h2>
          <p className="text-caption text-muted-foreground">
            <code className="text-caption">stepErrors</code> is parallel to <code className="text-caption">steps</code> by index.
          </p>
          <StripPreview>
            <WizardStepper steps={[...THREE_STEP_FLOW]} currentStep={1} stepErrors={[false, true, false]} />
          </StripPreview>
        </section>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Read-only strip (no navigation)</h2>
          <p className="text-caption text-muted-foreground">
            Without <code className="text-caption">onStepChange</code>, clicks do nothing but completed steps still look and hover as completed—not greyed out.
          </p>
          <StripPreview>
            <WizardStepper steps={[...THREE_STEP_FLOW]} currentStep={1} />
          </StripPreview>
        </section>

        <section className="space-y-3">
          <h2 className="text-h3 text-foreground">Interactive (five steps)</h2>
          <p className="text-caption text-muted-foreground">
            Completed steps call <code className="text-caption">onStepChange</code> to jump back; upcoming steps stay disabled.
          </p>
          <StripPreview>
            <WizardStepper
              steps={[...FIVE_STEP_FLOW]}
              currentStep={interactiveStep}
              onStepChange={setInteractiveStep}
            />
          </StripPreview>
        </section>
      </div>
    </ComponentLabPageShell>
  );
};

export default ComponentStepperLab;
