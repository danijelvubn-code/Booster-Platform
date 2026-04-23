import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

export const COMPONENT_LAB_AUDIT_EMPTY = "0 Values Found";

export type ComponentLabAuditPanelProps = {
  /** Score display, e.g. "85/100" — rendered at 24px (text-h1). */
  scalabilityScoreValue?: string;
  /** Optional explanation under the score. */
  scalabilityScoreNote?: ReactNode;
  /** Design tokens used by this component (filled in manually per lab). */
  tokens?: ReactNode;
  /** Nested components: links to other labs + non-token counts (filled in manually). */
  nestedComponents?: ReactNode;
  /** Arbitrary / non-tokenized values (filled in manually). */
  otherValues?: ReactNode;
};

const Placeholder = ({ children }: { children: ReactNode }) => (
  <p className="text-caption text-muted-foreground">{children}</p>
);

/**
 * Right-hand audit column for component labs: tokens, nested components, other values.
 * Content is optional; defaults are placeholders until documented per component.
 */
const ComponentLabAuditPanel = ({
  scalabilityScoreValue,
  scalabilityScoreNote,
  tokens,
  nestedComponents,
  otherValues,
}: ComponentLabAuditPanelProps) => {
  return (
    <aside
      className="flex w-full shrink-0 flex-col gap-4 lg:sticky lg:top-6 lg:w-component-labs-audit lg:self-start"
      aria-label="Component audit: tokens, dependencies, and values"
    >
      {scalabilityScoreValue != null && scalabilityScoreValue.length > 0 && (
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-component-labs-score p-4 shadow-sm">
          <h2 className="text-label font-medium text-foreground">Scalability score</h2>
          <p className="text-h1 text-foreground">{scalabilityScoreValue}</p>
          {scalabilityScoreNote != null && (
            <div className="text-caption text-muted-foreground">{scalabilityScoreNote}</div>
          )}
        </div>
      )}

      <div className="max-h-components-dropdown overflow-y-auto overscroll-contain rounded-lg border border-border bg-card p-4 lg:max-h-none lg:overflow-visible">
        <section className="space-y-2">
          <h2 className="text-label font-medium text-foreground">Design tokens</h2>
          {tokens ?? (
            <Placeholder>
              List semantic tokens used by this component (colors, spacing, typography, radii, motion, etc.).
            </Placeholder>
          )}
        </section>

        <Separator className="my-4" />

        <section className="space-y-2">
          <h2 className="text-label font-medium text-foreground">Components</h2>
          {nestedComponents ?? (
            <>
              <p className="text-caption text-muted-foreground">
                For each nested UI piece, link to its component lab and note how many non-token values it still uses.
              </p>
              <Placeholder>Example: Avatar — link to Avatars lab, non-token count (manual).</Placeholder>
            </>
          )}
        </section>

        <Separator className="my-4" />

        <section className="space-y-2">
          <h2 className="text-label font-medium text-foreground">Other values</h2>
          {otherValues ?? (
            <Placeholder>List one-off classes, literals, or non-tokenized values not covered above.</Placeholder>
          )}
        </section>
      </div>
    </aside>
  );
};

export { ComponentLabAuditPanel };
