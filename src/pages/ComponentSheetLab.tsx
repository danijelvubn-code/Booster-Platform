import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, PanelRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const checklistItems = [
  "Sheet slides in from the right over 300ms",
  "Overlay uses scrim token and click closes the sheet",
  "Esc closes the sheet and returns focus to the trigger",
  "Close control is keyboard reachable with visible focus ring",
  "Panel uses modal width token at sm breakpoint and scrolls when content is tall",
  "Header, body, and footer spacing stays consistent with other overlays",
] as const;

const ComponentSheetLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="81/100"
      scalabilityScoreNote={
        <p>
          Built on Radix Dialog primitives configured as a slide-over: overlay scrim with fade, CVA panel for left/right
          edges with border and sm:max-w-modal-sm, bg-background, padding, shadow-lg, and 300ms motion. Title uses text-h3;
          description uses body + muted. Header/footer match the dialog layout helpers. Close uses ring tokens and h-icon-16
          Lucide X.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>SheetOverlay: fixed inset-0, z-50, bg-overlay-scrim, duration-300, fade data states</li>
          <li>SheetContent (CVA): fixed full height, w-3/4, border side, overflow-y-auto, gap-4, p-6, shadow-lg, slide in/out per side</li>
          <li>sm:max-w-modal-sm on left and right variants</li>
          <li>Close: rounded-sm, ring-ring ring-offset-background, accent/muted when open, X h-icon-16</li>
          <li>SheetHeader / SheetFooter: responsive alignment and action row pattern</li>
          <li>SheetTitle: text-h3 text-foreground; SheetDescription: text-body-sm text-muted-foreground</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Panel width w-3/4 before sm breakpoint; slide utilities are Radix/tailwind animation classes</li>
          <li>Close control opacity-70 and duration-200 transition</li>
          <li>Lab composes Button, Input, Label inside the sheet — not in sheet.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Sheet</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Right slide-over panel on <span className="text-foreground">@radix-ui/react-dialog</span>—filters, detail
          panes, and secondary flows.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Right sheet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button leadingIcon={<PanelRight className="h-icon-16 w-icon-16" />}>Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet title</SheetTitle>
                <SheetDescription>Inspector-style panel with form fields and actions.</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="sheet-name" className="text-label">
                    Display name
                  </Label>
                  <Input id="sheet-name" placeholder="Booster workspace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sheet-notes" className="text-label">
                    Notes
                  </Label>
                  <Input id="sheet-notes" placeholder="Optional context" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </SheetClose>
                <Button type="button">Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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

export default ComponentSheetLab;
