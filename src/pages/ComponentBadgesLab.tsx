import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "All badge variants are visually distinct in light mode",
  "All badge variants are visually distinct in dark mode",
  "Typography follows tokenized hierarchy and remains legible",
  "Rounded shape remains consistent across sizes",
  "Interactive badge affordance feels clear and stable",
  "Long label text wraps or truncates without breaking layout",
] as const;

const variants = [
  "default",
  "secondary",
  "success",
  "warning",
  "info",
  "destructive",
  "outline",
] as const;
const badgeSizes = ["20", "24", "28"] as const;
const badgeAppearances = ["pill", "ghost"] as const;
const interactiveBadgeIds = ["beta", "operational", "review", "failed"] as const;

const ComponentBadgesLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [visibleInteractiveBadges, setVisibleInteractiveBadges] = useState<Record<string, boolean>>({
    beta: true,
    operational: true,
    review: true,
    failed: true,
  });

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  const dismissInteractiveBadge = (badgeId: string) => {
    setVisibleInteractiveBadges((prev) => ({ ...prev, [badgeId]: false }));
  };

  const resetInteractiveBadges = () => {
    setVisibleInteractiveBadges({
      beta: true,
      operational: true,
      review: true,
      failed: true,
    });
  };

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          CVA drives variants with semantic colors, borders, typography, and icon size tokens for each size. Pill and
          ghost appearances are mostly tokenized; ghost uses many fractional opacity utilities. Dismissible badges render
          as a button with focus ring tokens. Lab demos use Lucide X as trailingIcon — not part of the primitive file.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base: inline-flex, items-center, justify-center, gap-1, rounded-full, border, px-2, transition-colors, ease-standard</li>
          <li>Sizes: h-5 / h-6 / h-icon-28 with text-caption-strong or text-body-sm-strong; svg slots use h-icon-16 or h-icon-20</li>
          <li>Pill compound variants: bg-*, text-*-foreground, border-transparent or border-border, hover opacity on surfaces</li>
          <li>Ghost compound variants: semantic border/bg/text with /5–/30 opacity on status colors</li>
          <li>Interactive: cursor-pointer, focus-visible:ring-2 ring-ring, ring-offset-2</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Ghost appearance: repeated bg-*/[0.04], border-*/[0.15]-style fractional opacity (not named tokens)</li>
          <li>focus-visible:ring-offset-2 uses numeric offset vs a single ring-offset token</li>
          <li>Leading/trailing icons and Lucide X are consumer-provided in labs, not imported in badge.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Badges</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for badge variants, sizes, and interaction behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Type + Size Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {badgeAppearances.map((appearance) => (
            <div key={appearance} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-label capitalize">{appearance}</p>
                <Badge variant="outline" className="uppercase">
                  Type
                </Badge>
              </div>

              {badgeSizes.map((size) => (
                <div key={`${appearance}-${size}`} className="flex flex-wrap items-center gap-3">
                  {variants.map((variant) => (
                    <Badge
                      key={`${appearance}-${size}-${variant}`}
                      variant={variant}
                      appearance={appearance}
                      size={size}
                    >
                      {variant}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base">Interactive Examples</CardTitle>
            <Button variant="outline" size="sm" onClick={resetInteractiveBadges}>
              Restart
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {visibleInteractiveBadges.beta ? (
            <Badge
              variant="info"
              appearance="ghost"
              size="24"
              leadingIcon={<span className="text-caption-strong">AI</span>}
              trailingIcon={<X className="h-icon-16 w-icon-16" />}
              onDismiss={() => dismissInteractiveBadge("beta")}
            >
              Beta
            </Badge>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {visibleInteractiveBadges.operational ? (
              <Badge
                variant="success"
                appearance="pill"
                size="20"
                trailingIcon={<X className="h-icon-16 w-icon-16" />}
                onDismiss={() => dismissInteractiveBadge("operational")}
              >
                Operational
              </Badge>
            ) : null}
            {visibleInteractiveBadges.review ? (
              <Badge
                variant="warning"
                appearance="ghost"
                size="24"
                trailingIcon={<X className="h-icon-16 w-icon-16" />}
                onDismiss={() => dismissInteractiveBadge("review")}
              >
                Needs Review
              </Badge>
            ) : null}
            {visibleInteractiveBadges.failed ? (
              <Badge
                variant="destructive"
                appearance="pill"
                size="28"
                leadingIcon={<span className="text-caption-strong">!</span>}
                trailingIcon={<X className="h-icon-20 w-icon-20" />}
                onDismiss={() => dismissInteractiveBadge("failed")}
              >
                Failed
              </Badge>
            ) : null}
            {interactiveBadgeIds.every((id) => !visibleInteractiveBadges[id]) ? (
              <Badge variant="secondary">All dismissed</Badge>
            ) : null}
          </div>
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

export default ComponentBadgesLab;
