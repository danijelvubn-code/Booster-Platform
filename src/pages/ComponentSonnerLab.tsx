import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

const checklistItems = [
  "Toasts appear in the top-right corner",
  "Default toast uses background, border, and foreground tokens",
  "Semantic toasts use solid background with a 7% alpha semantic tint on top (token --alpha-7); borders and icons match variant",
  "Description and action buttons match design system typography and buttons",
  "Promise toast shows loading, then success or error with correct variant colors",
  "Toasts stack and dismiss without layout shift",
  "Theme toggle updates Sonner appearance (light / dark / system)",
] as const;

const promiseSleep = (ms: number, shouldFail = false) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("failed"));
      else resolve("ok");
    }, ms);
  });

const ComponentSonnerLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="80/100"
      scalabilityScoreNote={
        <p>
          Wraps the Sonner Toaster with next-themes for light/dark, top-right placement, and toastOptions.classNames for
          default chrome (border-border, bg-background, shadow-lg) plus semantic variants that layer a ::before tint at
          /7 opacity and matching border/icon colors. Action and cancel buttons use primary and muted tokens. Content and
          icons sit above the tint via z-index.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base toast: border border-border, bg-background, text-foreground, shadow-lg</li>
          <li>Title: font-medium text-foreground; description: text-muted-foreground</li>
          <li>actionButton: bg-primary text-primary-foreground; cancelButton: bg-muted text-muted-foreground; closeButton: border-border bg-background</li>
          <li>success / error / warning / info: border at semantic /50, before:bg-*/7, svg color via variant</li>
          <li>loading: border-border, before:bg-muted/7</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Depends on next-themes useTheme — not a local DS component</li>
          <li>Sonner reserves ::after; semantic tints use ::before — documented in source</li>
          <li>Lab triggers use Button and toast.*; Toaster is mounted in app shell, not this page</li>
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
          <h1 className="text-2xl font-bold">Components - Sonner</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Toast host from <span className="text-foreground">sonner</span>, themed with design tokens via{" "}
          <span className="text-foreground">Toaster</span> in the app root (position{" "}
          <span className="text-foreground">top-right</span>). Variants use semantic success, destructive, warning, and
          info colors. Triggers below call <span className="text-foreground">toast.*</span>.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basics</CardTitle>
          <CardDescription>Simple messages and titles with optional description.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => toast("Something happened.")}>
            Default
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Deployment scheduled", {
                description: "We will notify you when the rollout finishes.",
              })
            }
          >
            Title + description
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variants</CardTitle>
          <CardDescription>Semantic helpers for quick feedback.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => toast.success("Changes saved.")}>
            Success
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => toast.error("Request failed.")}>
            Error
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => toast.warning("Quota almost full.")}>
            Warning
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => toast.info("New documentation is available.")}>
            Info
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Action</CardTitle>
          <CardDescription>Optional primary action on the toast.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast("Invite sent", {
                description: "You can resend if they did not get the email.",
                action: {
                  label: "Undo",
                  onClick: () => toast.success("Invite revoked."),
                },
              })
            }
          >
            Toast with action
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Promise</CardTitle>
          <CardDescription>Loading → success or error states for async work.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast.promise(promiseSleep(1600), {
                loading: "Saving preferences…",
                success: "Preferences saved.",
                error: "Could not save preferences.",
              })
            }
          >
            Promise (success)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast.promise(promiseSleep(1200, true), {
                loading: "Connecting…",
                success: "Connected.",
                error: "Connection failed.",
              })
            }
          >
            Promise (error)
          </Button>
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

export default ComponentSonnerLab;
