import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const checklistItems = [
  "Trigger toggles content visibility",
  "Chevron rotates when open",
  "Focus ring is visible on trigger",
  "Content spacing feels consistent",
  "Works in light and dark themes",
] as const;

const ComponentCollapsibleLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="95/100"
      scalabilityScoreNote={
        <p>
          The UI module only re-exports Radix Collapsible Root, Trigger, and Content with no styles or design tokens in
          that file. This lab composes Button, Card, Checkbox, and Chevron; CollapsibleContent gets animation utilities
          (animate-collapsible-up/down) and overflow on the consumer side.
        </p>
      }
      tokens={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to="/overview">
            <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Collapsible</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">Manual test surface for Radix Collapsible behavior and layout.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Default</CardTitle>
          <CardDescription>Card expands/collapses with fluent animation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Collapsible open={open} onOpenChange={setOpen}>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-base">Advanced settings</CardTitle>
                  <CardDescription>Show additional configuration options.</CardDescription>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="group gap-2">
                    {open ? "Hide" : "Show"}
                    <ChevronDown className="h-icon-16 w-icon-16 transition-transform duration-200 ease-standard group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>

              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="border-t">
                  <CardContent className="pt-4 space-y-3">
                    <p className="text-label">Options</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-body-sm">
                        <Checkbox defaultChecked />
                        <span>Enable verbose logging</span>
                      </label>
                      <label className="flex items-center gap-2 text-body-sm">
                        <Checkbox checked="indeterminate" />
                        <span>Partially applied setting (indeterminate)</span>
                      </label>
                      <label className="flex items-center gap-2 text-body-sm">
                        <Checkbox disabled />
                        <span className="text-muted-foreground">Disabled option</span>
                      </label>
                    </div>
                  </CardContent>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-body-sm">
              <Checkbox checked={!!checked[item]} onCheckedChange={(next) => setChecked((prev) => ({ ...prev, [item]: !!next }))} />
              <span>{item}</span>
            </label>
          ))}
          <p className="pt-2 text-caption text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentCollapsibleLab;

