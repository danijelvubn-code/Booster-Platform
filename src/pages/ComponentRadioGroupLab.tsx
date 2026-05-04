import { useId, useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioSize = "md" | "lg";

const sizes: RadioSize[] = ["md", "lg"];

const radioGroupLabelClassName =
  "text-body-sm text-foreground font-normal peer-disabled:text-foreground/50";

const checklistItems = [
  "Vertical and horizontal layouts keep consistent gap tokens",
  "md/lg sizes align with paired label text",
  "Selected item shows filled indicator and primary border",
  "Focus ring is visible when moving focus with the keyboard",
  "Disabled items cannot be selected and look muted",
  "Only one option is selected per group",
] as const;

const ComponentRadioGroupLab = () => {
  const baseId = useId();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [verticalValue, setVerticalValue] = useState("comfort");
  const [horizontalValue, setHorizontalValue] = useState("monthly");
  const [sizeMatrixValue, setSizeMatrixValue] = useState<Record<RadioSize, string>>({
    md: "a",
    lg: "a",
  });

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="86/100"
      scalabilityScoreNote={
        <p>
          Radix Radio Group with layout gap/orientation on the root and CVA on items: icon-scale outer control (md/lg),
          border-input, primary checked and hover states, focus ring, and disabled opacity token. Indicator uses a Lucide
          Circle fill. Labels are composed by consumers (not exported from this module).
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>RadioGroup: flex column gap-2; horizontal orientation uses flex-row, flex-wrap, gap-4</li>
          <li>RadioGroupItem: rounded-full, border-input, text-primary, ring-offset-background, ring on focus-visible, disabled opacity token</li>
          <li>Size variants: md h-icon-16 w-icon-16, lg h-icon-20 w-icon-20</li>
          <li>Checked: border-primary; hover: border-ring and accent background when unchecked</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Indicator dot: Circle with h-2 w-2 (md) or h-3 w-3 (lg) — not h-icon-*</li>
          <li>Lucide Circle inside Radix Indicator</li>
          <li>Lab pairs items with Label from the input module and custom label classes — not part of radio-group.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Radio group</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Single-choice control with <span className="text-foreground">md</span> and <span className="text-foreground">lg</span>{" "}
          sizes, matching checkbox scale.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical (default)</CardTitle>
          <CardDescription>Stacked options with labels—typical for forms and settings panels.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={verticalValue} onValueChange={setVerticalValue}>
            {(
              [
                { value: "eco", label: "Economy" },
                { value: "comfort", label: "Comfort" },
                { value: "flex", label: "Flexible" },
              ] as const
            ).map(({ value, label }) => {
              const itemId = `${baseId}-vertical-${value}`;
              return (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={value} id={itemId} size="md" />
                  <Label htmlFor={itemId} className={radioGroupLabelClassName}>
                    {label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Horizontal</CardTitle>
          <CardDescription>
            Set <span className="text-foreground">orientation=&quot;horizontal&quot;</span> for inline choice groups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={horizontalValue} onValueChange={setHorizontalValue} orientation="horizontal">
            {(
              [
                { value: "monthly", label: "Monthly" },
                { value: "annual", label: "Annual" },
                { value: "custom", label: "Custom", disabled: true },
              ] as const
            ).map(({ value, label, ...rest }) => {
              const itemId = `${baseId}-horizontal-${value}`;
              return (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={value} id={itemId} size="md" {...rest} />
                  <Label htmlFor={itemId} className={radioGroupLabelClassName}>
                    {label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size matrix</CardTitle>
          <CardDescription>Same option set at md and lg for visual comparison.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sizes.map((size) => (
            <div key={size} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-label">Size: {size}</p>
                <Badge variant="outline" className="text-caption">
                  {size}
                </Badge>
              </div>
              <RadioGroup
                value={sizeMatrixValue[size]}
                onValueChange={(v) => setSizeMatrixValue((prev) => ({ ...prev, [size]: v }))}
              >
                {(
                  [
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                  ] as const
                ).map(({ value, label }) => {
                  const itemId = `${baseId}-matrix-${size}-${value}`;
                  return (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem value={value} id={itemId} size={size} />
                      <Label htmlFor={itemId} className={radioGroupLabelClassName}>
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          ))}
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

export default ComponentRadioGroupLab;
