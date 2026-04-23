import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Rocket } from "lucide-react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive"
  | "success"
  | "warning"
  | "info";

const variants: ButtonVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
  "success",
  "warning",
  "info",
];

const checklistItems = [
  "Light mode contrast is readable",
  "Dark mode contrast is readable",
  "Focus ring is visible (keyboard tab)",
  "Active/pressed state feels consistent",
  "Disabled state blocks interaction",
  "Loading keeps width stable",
  "Icon + text alignment is stable",
  "No layout shift on hover/active",
] as const;

const ComponentButtonsLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="90/100"
      scalabilityScoreNote={
        <p>
          Buttons are built with CVA: semantic variants (primary through info, outline, secondary, ghost, link), control
          height tokens, spacing scale padding, text-label, focus rings, and disabled opacity token. Loading uses Loader2.
          asChild composes Radix Slot for anchors. Remaining gap: a few fractional hover surfaces on outline and inner
          pt-px for optical alignment.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base: inline-flex, gap-2, rounded-md, text-label, ring-offset-background, transition-colors, ease-standard</li>
          <li>Focus: focus-visible:ring-2 ring-ring, ring-offset-2; disabled: opacity via var(--disabled-opacity)</li>
          <li>Sizes: h-control-sm/md/lg, w-control-sm/md for icon sizes; px-3, px-4 py-2, px-8</li>
          <li>Variants: bg-*/text-*-foreground and hover /90 for filled styles; outline uses border-input, ring on hover</li>
          <li>Ghost, link, secondary patterns use accent and primary utilities</li>
          <li>Icons: utility targets nested SVG with h-icon-16, w-icon-16, shrink-0; loading spinner matches icon size</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Outline variant: hover:bg-primary/4 (fractional opacity)</li>
          <li>Label row: pt-px on inner span for optical alignment</li>
          <li>Loader2 from lucide-react for loading state</li>
          <li>asChild: Radix Slot (headless) — not a separate UI kit import</li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to="/overview">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Buttons</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Manual test surface for button variants, sizes, and states.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variant + State Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant) => (
            <div key={variant} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium capitalize">{variant}</p>
                <Badge variant="outline" className="text-[10px]">
                  {variant}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button variant={variant}>Default</Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant} leadingIcon={<Rocket className="h-4 w-4" />}>
                  Leading + Label
                </Button>
                <Button variant={variant} trailingIcon={<ArrowRight className="h-4 w-4" />}>
                  Label + Trailing
                </Button>
                <Button
                  variant={variant}
                  leadingIcon={<Rocket className="h-4 w-4" />}
                  trailingIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Both Icons
                </Button>
                <Button variant={variant} loading loadingText="Loading">
                  Loading
                </Button>
                <Button variant={variant} size="icon" aria-label={`${variant} icon action`}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size Matrix (default variant)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-sm" aria-label="Small icon button">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" aria-label="Icon button">
            <Check className="h-4 w-4" />
          </Button>
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
                onCheckedChange={(next) =>
                  setChecked((prev) => ({ ...prev, [item]: !!next }))
                }
              />
              <span>{item}</span>
            </label>
          ))}
          <p className="text-xs text-muted-foreground pt-2">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentButtonsLab;
