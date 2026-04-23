import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/input";

const checklistItems = [
  "Drawer opens from trigger",
  "Overlay click closes drawer",
  "Esc closes drawer",
  "Content is readable in light/dark",
  "Footer actions remain reachable",
  "Long content is scrollable",
] as const;

const ComponentDrawerLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="80/100"
      scalabilityScoreNote={
        <p>
          Vaul-based bottom sheet with overlay scrim, background surface, border, and rounded top. Title uses text-h3;
          description uses body scale with foreground opacity. Header/footer are simple grid/flex layouts. Behavior
          (snap, drag, background scale) comes from the library, not additional DS wrappers.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Overlay: fixed inset-0, z-50, bg-overlay-scrim</li>
          <li>Content: fixed bottom sheet, inset-x-0 bottom-0, z-50, flex column, rounded-t-lg, border, bg-background</li>
          <li>Handle: mx-auto, mt-4, rounded-full, bg-muted</li>
          <li>DrawerHeader: grid, p-4, responsive text alignment; DrawerFooter: mt-auto, flex column, gap-2, p-4</li>
          <li>DrawerTitle: text-h3; DrawerDescription: text-body-sm, text-foreground/75</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Content: mt-24 top offset — fixed spacing, not a named layout token</li>
          <li>Drag handle: h-2 w-24 — bespoke dimensions for the affordance</li>
          <li>DrawerHeader: gap-1.5; description uses fractional foreground opacity</li>
          <li>Lab demos: px-4 pb-4, max-h-80 scroll regions, Button/Input/Label — not in drawer.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Drawer</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Drawer is useful for mobile-first flows and secondary tasks that shouldn’t fully block the page.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scenario Matrix</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Button leadingIcon={<Settings className="h-icon-16 w-icon-16" />}>Edit settings</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Project settings</DrawerTitle>
                <DrawerDescription>Update metadata used across dashboards.</DrawerDescription>
              </DrawerHeader>

              <div className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drawerProjectName" className="text-label">
                    Project name
                  </Label>
                  <Input id="drawerProjectName" placeholder="Booster Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drawerOwnerEmail" className="text-label">
                    Owner email (disabled)
                  </Label>
                  <Input id="drawerOwnerEmail" placeholder="owner@company.com" disabled />
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DrawerClose>
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
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Long content</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Long content validation</DrawerTitle>
                <DrawerDescription>Validate scrolling and spacing for longer content.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <p key={idx} className="text-body-sm text-foreground/75">
                      Paragraph {idx + 1}. Drawer content should remain readable and scroll without pushing the footer off-screen.
                    </p>
                  ))}
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="ghost">Close</Button>
                </DrawerClose>
                <Button>Confirm</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Drawer</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>Use for mobile-first flows where a bottom sheet feels natural and keeps context visible.</li>
          <li>Great for secondary tasks: quick edits, filters, details, or lightweight forms.</li>
          <li>Prefer when users should be able to dismiss easily (swipe/overlay tap) and return to the page.</li>
          <li>Avoid for destructive confirmations — use Alert Dialog for that.</li>
          <li>For desktop side panels (left/right), use Sheet instead of Drawer.</li>
        </ul>
      </div>

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

export default ComponentDrawerLab;

