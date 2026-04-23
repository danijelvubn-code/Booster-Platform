import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/input";

const checklistItems = [
  "Dialog opens from trigger",
  "Focus is trapped while dialog is open",
  "Esc closes dialog",
  "Overlay click closes dialog",
  "Dialog content is readable in light and dark themes",
  "Long content is scrollable (no layout break)",
  "Footer actions remain reachable",
] as const;

const ComponentDialogLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="73/100"
      scalabilityScoreNote={
        <p>
          Overlay uses bg-overlay-scrim; content uses bg-background, border, shadow-lg, and spacing tokens. Header/footer
          helpers are layout-only. Radix open/close animations and centered positioning rely on percentage-based utilities
          and arbitrary slide targets rather than layout tokens alone.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Overlay: fixed inset-0, z-50, bg-overlay-scrim, fade in/out data states</li>
          <li>Content: fixed grid, border, bg-background, p-6, gap-4, shadow-lg, z-50, sm:rounded-lg</li>
          <li>Close control: rounded-sm, opacity transition, focus ring ring-ring ring-offset-background, open accent/muted</li>
          <li>DialogHeader: flex column, responsive text alignment</li>
          <li>DialogFooter: responsive flex direction and gap pattern</li>
          <li>DialogDescription: text-muted-foreground</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Content: left/top 50%, translate -50%, and slide keyframes using 48% / half offsets — not semantic layout tokens</li>
          <li>DialogTitle: text-lg font-semibold tracking-tight (not the heading scale used in labs)</li>
          <li>DialogDescription: text-sm vs text-body-sm elsewhere</li>
          <li>Close icon: h-4 w-4 Lucide X; lab demos compose Button, Input, Label — not part of dialog.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Dialog</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Dialog is used for multi-step actions, forms, and richer confirmation flows (non-destructive).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scenario Matrix</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button leadingIcon={<Settings className="h-icon-16 w-icon-16" />}>Edit settings</Button>
            </DialogTrigger>
            <DialogContent className="max-w-modal-md">
              <DialogHeader>
                <DialogTitle className="text-h3">Project settings</DialogTitle>
                <DialogDescription className="text-body-sm text-foreground/75">
                  Update metadata used across dashboards. Save is disabled until changes are valid.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName" className="text-label">
                    Project name
                  </Label>
                  <Input id="projectName" placeholder="Booster Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail" className="text-label">
                    Owner email (disabled)
                  </Label>
                  <Input id="ownerEmail" placeholder="owner@company.com" disabled />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setSaving(true);
                    setTimeout(() => setSaving(false), 900);
                  }}
                  disabled={saving}
                >
                  <span className="inline-flex items-center gap-2">
                    {saving && <Loader2 className="h-icon-16 w-icon-16 animate-spin" />}
                    {saving ? "Saving..." : "Save changes"}
                  </span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Long content</Button>
            </DialogTrigger>
            <DialogContent className="max-w-modal-md">
              <DialogHeader>
                <DialogTitle className="text-h3">Long content validation</DialogTitle>
                <DialogDescription className="text-body-sm text-foreground/75">
                  This dialog intentionally contains more text to validate scrolling and readability.
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <p key={idx} className="text-body-sm text-foreground/75">
                    Paragraph {idx + 1}. Dialog content should remain readable, wrap naturally, and scroll without pushing
                    actions off-screen.
                  </p>
                ))}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
                </DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <p className="pt-2 text-caption text-foreground/75">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentDialogLab;

