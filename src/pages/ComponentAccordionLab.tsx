import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const checklistItems = [
  "Single mode allows only one open item",
  "Multiple mode allows several open items",
  "Default-open item renders expanded state correctly",
  "Disabled item is visibly disabled and not interactive",
  "Long content wraps without layout issues",
  "Trigger/content spacing is consistent across items",
] as const;

const ComponentAccordionLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="85/100"
      scalabilityScoreNote={
        <p>
          Most surfaces use semantic tokens (color, typography, spacing scale, icons, motion duration,
          disabled opacity, accordion animations). No nested kit components in the primitive. Remaining
          work: narrow motion on content and document Radix markup coupling in selectors.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Border: border-b, last:border-b-0</li>
          <li>Color / surface: bg-muted/40, text-muted-foreground, group-hover and disabled variants</li>
          <li>Typography: text-h3 (trigger), text-body-sm (content wrapper)</li>
          <li>Spacing: px-5, py-4, pb-4, pt-0 (spacing scale → space-20 / space-16)</li>
          <li>Icon size: h-icon-16, w-icon-16</li>
          <li>Motion: transition-colors, transition-transform, ease-standard, duration-200 (motion token)</li>
          <li>Opacity: var(--disabled-opacity) on disabled trigger</li>
          <li>Animation: animate-accordion-up, animate-accordion-down</li>
          <li>Layout: flex, flex-1, items-center, justify-between, overflow-hidden</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>AccordionContent root uses transition-all (broader than a single motion token)</li>
          <li>AccordionItem classes include selectors coupled to Radix h3 / button structure</li>
          <li>ChevronDown icon from lucide-react (not a design-system component lab)</li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to={postMvpPath("/overview")}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Accordion</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for accordion modes, states, and content behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Single (default behavior)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full rounded-lg border px-0">
            <AccordionItem value="single-item-1">
              <AccordionTrigger>What is this section for?</AccordionTrigger>
              <AccordionContent>
                Use single mode when users should focus on one section at a time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="single-item-2">
              <AccordionTrigger>Can users close an open item?</AccordionTrigger>
              <AccordionContent>
                Yes. With <code>collapsible</code>, users can close the currently open item.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="single-item-3" disabled>
              <AccordionTrigger>Disabled item</AccordionTrigger>
              <AccordionContent>
                This content should never open while the item is disabled.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Multiple + Default Open</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            type="multiple"
            defaultValue={["multi-item-1", "multi-item-3"]}
            className="w-full rounded-lg border px-0"
          >
            <AccordionItem value="multi-item-1">
              <AccordionTrigger>Initially open item</AccordionTrigger>
              <AccordionContent>
                This item opens by default to validate initial expanded state.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="multi-item-2">
              <AccordionTrigger>Another independent item</AccordionTrigger>
              <AccordionContent>
                Multiple mode allows this to be open together with other items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="multi-item-3">
              <AccordionTrigger>Long content wrapping</AccordionTrigger>
              <AccordionContent>
                This section intentionally contains longer text to validate wrapping and vertical rhythm
                in constrained widths. Ensure trigger alignment remains stable, animation feels smooth,
                and content does not overflow or clip on small screens.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={!!checked[item]}
                onCheckedChange={(next) => setChecked((prev) => ({ ...prev, [item]: !!next }))}
              />
              <span>{item}</span>
            </label>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentAccordionLab;
