import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/input";

type CheckboxSize = "md" | "lg";

const sizes: CheckboxSize[] = ["md", "lg"];

const checklistItems = [
  "All sizes render aligned with label text",
  "Checked state uses primary tokens",
  "Focus ring is visible (keyboard tab)",
  "Disabled state blocks interaction",
  "No layout shift when toggling",
] as const;

const ComponentCheckboxLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<CheckboxSize, boolean>>({ md: false, lg: true });

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          CVA maps md/lg to icon dimension tokens, radii, and primary surfaces for checked and indeterminate. Border and
          focus ring use semantic tokens; disabled uses var(--disabled-opacity). Icons are Lucide Check and Minus with
          size-scaled icon tokens. Remaining gap: group/peer data-attribute selectors for icon visibility are verbose but
          not arbitrary colors.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base: border border-input, ring-offset-background, focus-visible ring + ring-ring + ring-offset-2</li>
          <li>Disabled: cursor-not-allowed, opacity via var(--disabled-opacity)</li>
          <li>Checked / indeterminate: border-primary, bg-primary, text-primary-foreground</li>
          <li>Size md: h-icon-20 w-icon-20, rounded-sm; size lg: h-icon-24 w-icon-24, rounded-md</li>
          <li>Indicator icons: h-icon-16 w-icon-16 (md) or h-icon-20 w-icon-20 (lg)</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Visibility toggles use group-data-[state=checked] and group-data-[state=indeterminate] on Lucide icons</li>
          <li>Check and Minus from lucide-react (not a design-system component lab)</li>
          <li>
            This lab imports{" "}
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("input")}>
              Label
            </Link>{" "}
            from the input module for pairing.
          </li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to={postMvpPath("/overview")}>
            <ArrowLeft className="mr-1 h-icon-16 w-icon-16" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Checkbox</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">Single checkbox style with 2 sizes (md/lg).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size + State Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sizes.map((size) => {
            const id = `checkbox-${size}`;
            const disabledId = `checkbox-${size}-disabled`;
            const indeterminateId = `checkbox-${size}-indeterminate`;
            const isChecked = values[size];

            return (
              <div key={size} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-label">Size: {size}</p>
                  <Badge variant="outline" className="text-caption">
                    {size}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      size={size}
                      checked={isChecked}
                      onCheckedChange={(next) => setValues((prev) => ({ ...prev, [size]: !!next }))}
                    />
                    <Label htmlFor={id} className="text-body-sm text-foreground">
                      Default
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id={disabledId} size={size} disabled checked />
                    <Label htmlFor={disabledId} className="text-body-sm text-muted-foreground">
                      Disabled (checked)
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id={indeterminateId} size={size} checked="indeterminate" />
                    <Label htmlFor={indeterminateId} className="text-body-sm text-foreground">
                      Indeterminate
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
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

export default ComponentCheckboxLab;

