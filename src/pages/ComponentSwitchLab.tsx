import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type SwitchSize = "sm" | "md";

const sizes: SwitchSize[] = ["sm", "md"];

const checklistItems = [
  "Unchecked track uses input token; checked track uses primary",
  "Thumb uses background token and moves smoothly between states",
  "Both sizes align with adjacent label text",
  "Focus ring is visible when tabbing to the control",
  "Disabled state blocks interaction and uses disabled opacity",
] as const;

const ComponentSwitchLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [qa, setQa] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<SwitchSize, boolean>>({ sm: false, md: true });

  const completedCount = useMemo(
    () => checklistItems.filter((item) => qa[item]).length,
    [qa],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="84/100"
      scalabilityScoreNote={
        <p>
          Radix Switch with CVA for sm and md tracks: rounded-full, border-transparent, focus ring on ring-offset-background,
          disabled opacity token, unchecked bg-input and checked bg-primary. Thumb uses bg-background, shadow-lg, and
          translate-x jumps per size. No other design-system components are imported in switch.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Root: peer inline-flex, rounded-full, border-2 border-transparent, ease-standard transitions</li>
          <li>Focus: ring-ring ring-offset-2 ring-offset-background</li>
          <li>States: data-[state=unchecked]:bg-input, data-[state=checked]:bg-primary</li>
          <li>sm track: h-5 w-9; md track: h-6 w-11</li>
          <li>Thumb: rounded-full bg-background shadow-lg; checked translate-x per size</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Track dimensions and thumb translate distances are fixed spacing values, not h-control-*</li>
          <li>Lab pairs Switch with Label from the input module — not composed inside the primitive</li>
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
          <h1 className="text-2xl font-bold">Components - Switch</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Toggle from <span className="text-foreground">@radix-ui/react-switch</span> with primary checked track,
          input unchecked track, and sm/md sizes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sizes</CardTitle>
          <CardDescription>Examples: controlled, disabled (on), and uncontrolled (default off).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sizes.map((size) => {
            const id = `switch-${size}`;
            const disabledId = `switch-${size}-disabled`;
            const on = values[size];

            return (
              <div key={size} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-label">Size: {size}</p>
                  <Badge variant="outline" className="text-caption">
                    {size}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={id}
                      size={size}
                      checked={on}
                      onCheckedChange={(next) => setValues((prev) => ({ ...prev, [size]: next }))}
                    />
                    <Label htmlFor={id} className="text-body-sm text-foreground">
                      Controlled
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id={disabledId} size={size} disabled checked />
                    <Label htmlFor={disabledId} className="text-body-sm text-muted-foreground">
                      Disabled (on)
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch defaultChecked={false} size={size} id={`${id}-uncontrolled`} />
                    <Label htmlFor={`${id}-uncontrolled`} className="text-body-sm text-foreground">
                      Uncontrolled (default off)
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
          <CardTitle className="text-base">With Description</CardTitle>
          <CardDescription>Typical settings row: label, helper, switch.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="switch-lab-notify" className="text-label">
                Email alerts
              </Label>
              <p className="text-caption text-muted-foreground">Notify when spend crosses your threshold.</p>
            </div>
            <Switch
              id="switch-lab-notify"
              checked={!!checked["notify"]}
              onCheckedChange={(v) => setChecked((p) => ({ ...p, notify: v }))}
              aria-label="Email alerts"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">When to Use</CardTitle>
          <CardDescription>How each pattern maps to props.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-3 text-body-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Controlled</span> — Pass <span className="text-foreground">checked</span> and{" "}
            <span className="text-foreground">onCheckedChange</span> when React should own the value; this is what we use in product screens.
          </p>
          <p>
            <span className="font-medium text-foreground">Uncontrolled</span> — Use <span className="text-foreground">defaultChecked</span> only when
            you do not need to read the value in parent state; it is optional and shown here for API completeness.
          </p>
          <p>
            <span className="font-medium text-foreground">Disabled</span> — <span className="text-foreground">disabled</span> blocks clicks and keyboard
            toggling and applies the shared disabled opacity token.
          </p>
          <p>
            <span className="font-medium text-foreground">Sizes</span> — <span className="text-foreground">md</span> is the default for forms and
            dialogs; <span className="text-foreground">sm</span> is a denser track and thumb for tight layouts.
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
                checked={!!qa[item]}
                onCheckedChange={(next) => setQa((prev) => ({ ...prev, [item]: !!next }))}
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

export default ComponentSwitchLab;
