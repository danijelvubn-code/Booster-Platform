import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, Label } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const checklistItems = [
  "Opens on trigger click (or Space/Enter when trigger is focused)",
  "Closes on outside click and Escape",
  "Content is portaled with z-index above page chrome",
  "Align and side offset position predictably near the trigger",
  "Focus moves into the panel when opened (Radix default)",
] as const;

const ComponentPopoverLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [align, setAlign] = useState<"start" | "center" | "end">("center");

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="86/100"
      scalabilityScoreNote={
        <p>
          Radix Popover with a single content surface: modal max width cap, border-border, popover colors, body text scale,
          padding, shadow-xs, and outline-none. Defaults align center with sideOffset 4. Open/close uses the shared
          data-state animation stack. The primitive module does not import other design-system components.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>PopoverContent: z-50, max-w-modal-sm, rounded-md, border border-border, bg-popover, p-4, text-body-sm, text-popover-foreground</li>
          <li>shadow-xs, outline-none</li>
          <li>Default align center and sideOffset 4 on Radix Content</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation utilities (fade, zoom-95, slide-in-from-*, data-[state] / data-[side])</li>
          <li>Lab demos: Button triggers, Input/Label, Select, Lucide Info — not part of popover.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Popover</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Lightweight floating panels for inline actions, short forms, and contextual details anchored to a trigger.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic</CardTitle>
          <CardDescription>Click the trigger to toggle the panel.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-modal-sm">
              <div className="space-y-2">
                <p className="text-label text-foreground">Dimensions</p>
                <p className="text-caption text-foreground/75">
                  Popovers work well for secondary actions that should not steal focus like a full modal.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With form fields</CardTitle>
          <CardDescription>Compact filters or quick edits beside the trigger.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-start gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Info className="h-icon-16 w-icon-16" aria-hidden />
                Set label
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-modal-sm space-y-3">
              <div className="space-y-2">
                <Label htmlFor="popover-lab-input">Display name</Label>
                <Input id="popover-lab-input" placeholder="e.g. Production" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button type="button" size="sm">
                  Save
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alignment</CardTitle>
          <CardDescription>Match <span className="text-foreground">PopoverContent</span> alignment to your layout.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="popover-align" className="text-caption text-foreground/75">
              Align
            </Label>
            <Select value={align} onValueChange={(v) => setAlign(v as "start" | "center" | "end")}>
              <SelectTrigger id="popover-align" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="end">End</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center rounded-lg border border-dashed border-input p-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Aligned trigger</Button>
              </PopoverTrigger>
              <PopoverContent align={align} className="w-full max-w-modal-sm">
                <p className="text-caption text-foreground/75">
                  Current align: <span className="text-foreground">{align}</span>
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Popover (vs other overlays)</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">Popover</span> for contextual panels tied to a control (filters, mini-forms,
            explanations) without a full-screen modal.
          </li>
          <li>
            Use <span className="text-foreground">Dialog</span> when you need a focused task, blocking focus trap, and clear
            confirm/cancel framing.
          </li>
          <li>
            Use <span className="text-foreground">Dropdown Menu</span> for lists of actions; use <span className="text-foreground">Hover Card</span> for
            preview-on-hover content.
          </li>
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

export default ComponentPopoverLab;
