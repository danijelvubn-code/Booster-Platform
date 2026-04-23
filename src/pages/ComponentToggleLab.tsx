import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Bold, Italic } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import type { ToggleSize } from "@/components/ui/toggle";

const sizes: ToggleSize[] = ["sm", "md", "lg"];

const checklistItems = [
  "Off state uses muted foreground; on state uses accent background",
  "Hover targets off-state only (default variant) per token rules",
  "Focus ring is visible when tabbing to the control",
  "Disabled state blocks interaction and uses disabled opacity",
  "Icon size matches h-icon-16 / w-icon-16 inside the control",
] as const;

const ComponentToggleLab = () => {
  const [qa, setQa] = useState<Record<string, boolean>>({});
  const [pressed, setPressed] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => qa[item]).length,
    [qa],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          Radix Toggle with CVA: pressed state uses accent background and foreground; default variant hovers muted off-state
          only; outline variant adds border-input and alternate hover. Sizes map to control heights and text-caption,
          text-label, or text-body-sm. Icons inherit h-icon-16 via descendant selector. No other design-system components
          are imported in toggle.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base: inline-flex, rounded-md, ring-ring on focus, disabled opacity token</li>
          <li>data-[state=on]: bg-accent text-accent-foreground; SVG h-icon-16 w-icon-16 text-current</li>
          <li>variant default: transparent + muted; off hover bg-muted</li>
          <li>variant outline: border-input; off hover bg-accent</li>
          <li>size sm/md/lg: h-control-sm/md/lg with matching padding and typography scale</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            Page links to Toggle group and Switch labs for related patterns — not composed inside the primitive
          </li>
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
          <h1 className="text-2xl font-bold">Components - Toggle</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Pressable two-state control from <span className="text-foreground">@radix-ui/react-toggle</span>. Use for toolbars and inline actions; for
          exclusive groups see{" "}
          <Link to="/dev/components/toggle-group" className="text-foreground underline underline-offset-4">
            Toggle group
          </Link>
          . For on/off settings prefer{" "}
          <Link to="/dev/components/switch" className="text-foreground underline underline-offset-4">
            Switch
          </Link>
          .
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variants and sizes</CardTitle>
          <CardDescription>
            <span className="text-foreground">default</span> (ghost-like) and <span className="text-foreground">outline</span>. Sizes align with control height tokens.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sizes.map((size) => (
            <div key={size} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-label">Size: {size}</p>
                <Badge variant="outline" className="text-caption">
                  {size}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Toggle size={size} aria-label={`Default ${size}`}>
                  Default
                </Toggle>
                <Toggle variant="outline" size={size} aria-label={`Outline ${size}`}>
                  Outline
                </Toggle>
                <Toggle
                  size={size}
                  pressed={!!pressed[`d-${size}`]}
                  onPressedChange={(v) => setPressed((p) => ({ ...p, [`d-${size}`]: v }))}
                  aria-label={`Controlled default ${size}`}
                >
                  Controlled
                </Toggle>
                <Toggle size={size} disabled aria-label={`Disabled off ${size}`}>
                  Disabled
                </Toggle>
                <Toggle size={size} disabled pressed aria-label={`Disabled on ${size}`}>
                  Disabled on
                </Toggle>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Icon-only</CardTitle>
          <CardDescription>Use <span className="text-foreground">aria-label</span> for screen readers.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Toggle size="sm" aria-label="Bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" size="md" aria-label="Italic">
            <Italic />
          </Toggle>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">When to use</CardTitle>
          <CardDescription>How this differs from Switch and Toggle group.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-3 text-body-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Toggle</span> — Momentary or sticky pressed state for actions (format bold, pin panel). Parent can
            control <span className="text-foreground">pressed</span> via <span className="text-foreground">onPressedChange</span>.
          </p>
          <p>
            <span className="font-medium text-foreground">Toggle group</span> — Multiple toggles with single or multi selection and optional segmented layout.
          </p>
          <p>
            <span className="font-medium text-foreground">Switch</span> — Binary setting with a sliding thumb; better for settings rows than toolbar actions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA checklist</CardTitle>
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

export default ComponentToggleLab;
