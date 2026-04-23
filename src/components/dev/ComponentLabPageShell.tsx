import type { ReactNode } from "react";

import { ComponentLabAuditPanel } from "./ComponentLabAuditPanel";
import type { ComponentLabAuditPanelProps } from "./ComponentLabAuditPanel";

export { COMPONENT_LAB_AUDIT_EMPTY } from "./ComponentLabAuditPanel";

export type ComponentLabPageShellProps = {
  children: ReactNode;
} & ComponentLabAuditPanelProps;

/**
 * Two-column layout for component labs: main demo (left) + audit panel (right, 400px on large screens).
 * Pass optional `tokens`, `nestedComponents`, and `otherValues` when documenting a lab manually.
 */
const ComponentLabPageShell = ({
  children,
  scalabilityScoreValue,
  scalabilityScoreNote,
  tokens,
  nestedComponents,
  otherValues,
}: ComponentLabPageShellProps) => {
  return (
    <div className="mx-auto flex w-full max-w-component-labs-row flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">{children}</div>
      <ComponentLabAuditPanel
        scalabilityScoreValue={scalabilityScoreValue}
        scalabilityScoreNote={scalabilityScoreNote}
        tokens={tokens}
        nestedComponents={nestedComponents}
        otherValues={otherValues}
      />
    </div>
  );
};

export { ComponentLabPageShell };
