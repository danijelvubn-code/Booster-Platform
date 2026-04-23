import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const checklistItems = [
  "Horizontal rule spans full width and uses border color token",
  "Vertical rule fills flex row height between toolbar-style controls",
  "Hairline uses px scale (not arbitrary thickness)",
  "Decorative separators do not expose an extra landmark in the accessibility tree",
  "Light and dark themes keep sufficient contrast against surfaces",
] as const;

const ComponentSeparatorLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="92/100"
      scalabilityScoreNote={
        <p>
          Radix Separator with shrink-0 and bg-border. Horizontal uses full width and h-px; vertical uses full height and
          w-px. Defaults to decorative for non-semantic dividers. No other design-system components are composed in the
          module.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>shrink-0 bg-border</li>
          <li>orientation horizontal: h-px w-full</li>
          <li>orientation vertical: h-full w-px</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>decorative prop (default true) controls whether Radix exposes separator semantics</li>
          <li>Lab: toolbar row with Button, divide-y list pattern — not part of separator.tsx</li>
        </ul>
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
          <h1 className="text-2xl font-bold">Components - Separator</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Visual divider from <span className="text-foreground">@radix-ui/react-separator</span> for horizontal and
          vertical layouts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Horizontal</CardTitle>
          <CardDescription>Stacked sections with a full-width rule.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-body-sm font-medium text-foreground">Section title</p>
            <p className="text-body-sm text-muted-foreground">
              Supporting copy uses muted foreground so hierarchy stays clear above the divider.
            </p>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-body-sm font-medium text-foreground">Next block</p>
            <p className="text-body-sm text-muted-foreground">
              Content below the line continues the same spacing scale.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical (inline)</CardTitle>
          <CardDescription>Between actions in a row—parent needs a defined height.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-control-md items-center gap-3 rounded-md border px-3">
            <Button type="button" variant="ghost" size="sm">
              Save
            </Button>
            <Separator orientation="vertical" />
            <Button type="button" variant="ghost" size="sm">
              Share
            </Button>
            <Separator orientation="vertical" />
            <span className="text-body-sm text-muted-foreground">Overflow menu</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">In a list</CardTitle>
          <CardDescription>Repeated separators between compact rows.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-modal-sm divide-y divide-border rounded-md border">
            <div className="px-4 py-3 text-body-sm text-foreground">Primary endpoint</div>
            <div className="px-4 py-3 text-body-sm text-foreground">Staging</div>
            <div className="px-4 py-3 text-body-sm text-muted-foreground">Archived</div>
          </div>
          <p className="mt-4 text-caption text-muted-foreground">
            Lists often use <span className="text-foreground">divide-border</span> instead; the primitive is ideal for
            one-off breaks or toolbars.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-body-sm">
              <Checkbox
                checked={!!checked[item]}
                onCheckedChange={(next) => setChecked((prev) => ({ ...prev, [item]: !!next }))}
              />
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

export default ComponentSeparatorLab;
