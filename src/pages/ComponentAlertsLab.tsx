import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const checklistItems = [
  "Default alert is readable in light mode",
  "Default alert is readable in dark mode",
  "All variants (info/success/warning/destructive) are visually distinct",
  "Dismiss button works when enabled",
  "Actions area supports up to 2 controls",
  "Banner layout spans full width correctly",
  "Compact density reads clearly in dense areas",
  "Icon alignment and spacing are stable",
  "Long text wraps without breaking layout",
  "Alert title hierarchy is clear and scannable",
] as const;

const ComponentAlertsLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showDismissible, setShowDismissible] = useState(true);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          Variants use semantic status colors with shared opacity, spacing scale for density, layout tokens for inline
          vs banner, and typography utilities for title and description. Icons are Lucide with icon size tokens. The
          primitive does not import Button; action slots in this lab compose Button separately.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Variants (cva): border + bg/foreground using info, success, warning, destructive with /30 and /12 opacity</li>
          <li>Layout: inline (rounded-lg) vs banner (rounded-none, border-x-0, border-t-0)</li>
          <li>Density: p-4 default, p-3 compact (spacing scale)</li>
          <li>Typography: text-h3 (AlertTitle), text-body-sm + text-muted-foreground (AlertDescription)</li>
          <li>Structure: flex, items-start, gap-3 / gap-2, min-w-0 flex-1</li>
          <li>Icons: h-icon-16 w-icon-16; icon color via text-info / success / warning / destructive</li>
          <li>Dismiss control: rounded-md, p-1, text-muted-foreground, transition-colors, ease-standard, hover:bg-accent</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Icon wrapper: mt-0.5 (fractional offset vs strict spacing scale)</li>
          <li>AlertDescription: [&_p]:leading-relaxed for nested paragraphs</li>
          <li>Default icons from lucide-react (Info, CheckCircle2, AlertTriangle, AlertCircle, X)</li>
          <li>Lab only: actions prop uses Button — tracked under Buttons lab, not inside alert.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Alerts</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Manual test surface for inline alert variants and readability.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variant Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="info">
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              Use for neutral contextual feedback inside content sections.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>
              Use for positive completion feedback and confirmations.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>
              Use for cautionary guidance where users should verify intent before proceeding.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              Use this for destructive failures, irreversible action warnings, and high-severity errors.
            </AlertDescription>
          </Alert>

          <Alert
            variant="warning"
            dismissible
            onDismiss={() => setShowDismissible(false)}
            actions={[
              <Button key="later" variant="outline" size="sm">
                Later
              </Button>,
              <Button key="review" variant="warning" size="sm">
                Review
              </Button>,
            ]}
          >
            <AlertTitle>Dismissible + Actions</AlertTitle>
            <AlertDescription>
              This scenario validates dismiss behavior and action slots (max two buttons).
            </AlertDescription>
          </Alert>

          {!showDismissible && (
            <Alert variant="info" density="compact">
              <AlertTitle>Dismiss confirmed</AlertTitle>
              <AlertDescription>
                The dismissible alert above was closed successfully.
              </AlertDescription>
            </Alert>
          )}

          <Alert variant="info" density="compact" showIcon={false}>
            <AlertTitle>Compact + No Icon</AlertTitle>
            <AlertDescription>
              Use compact density in dense layouts and disable icon only when visual noise needs to be reduced.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Banner Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert
            variant="info"
            layout="banner"
            className="-mx-6 px-6"
            actions={
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            }
          >
            <AlertTitle>Global Banner Message</AlertTitle>
            <AlertDescription>
              Banner alerts are intended for page-level/global communication and should be used sparingly.
            </AlertDescription>
          </Alert>

          <Alert variant="warning" layout="banner" className="-mx-6 px-6">
            <AlertTitle>Maintenance Notice</AlertTitle>
            <AlertDescription>
              Short-lived service disruptions may occur during the maintenance window.
            </AlertDescription>
          </Alert>
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
          <p className="text-xs text-muted-foreground pt-2">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentAlertsLab;
