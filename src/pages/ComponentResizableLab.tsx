import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const checklistItems = [
  "Horizontal and vertical groups resize smoothly with pointer",
  "Handles show focus ring when tabbing to the resize grip",
  "Panel min sizes prevent collapsing below usable width",
  "Borders and muted panels read clearly in light and dark themes",
  "withHandle variant shows grip affordance without breaking layout",
] as const;

const panelShellClass =
  "flex h-full min-h-0 items-center justify-center p-4 text-body-sm text-muted-foreground";

/** Fills vertical split panes: flex + min-h-0 so react-resizable-panels can measure height. */
const panelShellVerticalClass =
  "flex h-full min-h-0 w-full flex-1 items-center justify-center p-4 text-body-sm text-muted-foreground";

const ComponentResizableLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="78/100"
      scalabilityScoreNote={
        <p>
          react-resizable-panels with a styled PanelGroup (direction-aware flex) and a resize handle that uses bg-border,
          a widened after hit target, and focus-visible ring tokens. Optional withHandle adds a bordered muted grip with
          Lucide. Panel is a direct re-export with no extra classes.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>ResizablePanelGroup: flex w-full; vertical stacks via data-[panel-group-direction=vertical]:flex-col</li>
          <li>ResizableHandle: w-px shrink-0 bg-border; focus ring ring-ring ring-offset-background; vertical variant overrides for thickness and hit area</li>
          <li>withHandle grip: rounded-sm border border-border bg-muted, text-muted-foreground icon</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Handle uses pseudo-element after for wider drag target (w-1, positioning utilities)</li>
          <li>Grip container h-4 w-3; GripVertical h-2 w-2 — not h-icon scale</li>
          <li>Vertical handle: rotate-90 on inner div and many group-data layout overrides</li>
          <li>Lab: h-chart-md shells, bg-muted/50 panel fills — demo chrome, not in resizable.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Resizable</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Split layouts using <span className="text-foreground">react-resizable-panels</span> with design-token styling on
          handles and panels.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Horizontal — with handle</CardTitle>
          <CardDescription>Drag the grip or the hit area between panels. Default 50 / 50, min 20% each.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* PanelGroup sets inline height:100%; put h-chart-md on a wrapper so % height resolves. */}
          <div className="h-chart-md overflow-hidden rounded-lg border">
            <ResizablePanelGroup direction="horizontal" className="h-full min-h-0">
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className={cn(panelShellClass, "rounded-l-lg bg-muted/50")}>Panel A</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <div className={cn(panelShellClass, "rounded-r-lg bg-muted/30")}>Panel B</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Horizontal — minimal handle</CardTitle>
          <CardDescription>Same behavior without the grip icon—wider invisible hit target via the handle strip.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-chart-md overflow-hidden rounded-lg border">
            <ResizablePanelGroup direction="horizontal" className="h-full min-h-0">
              <ResizablePanel defaultSize={40} minSize={15}>
                <div className={cn(panelShellClass, "rounded-l-lg bg-muted/50")}>Sources</div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60} minSize={25}>
                <div className={cn(panelShellClass, "rounded-r-lg bg-muted/30")}>Preview</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical</CardTitle>
          <CardDescription>Stacked panels with a horizontal splitter (drag up/down).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-chart-md overflow-hidden rounded-lg border">
            <ResizablePanelGroup direction="vertical" className="h-full min-h-0">
              <ResizablePanel defaultSize={45} minSize={15} className="flex min-h-0 flex-col overflow-hidden">
                <div className={cn(panelShellVerticalClass, "rounded-t-lg bg-muted/50")}>Top</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={55} minSize={20} className="flex min-h-0 flex-col overflow-hidden">
                <div className={cn(panelShellVerticalClass, "rounded-b-lg bg-muted/30")}>Bottom</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
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

export default ComponentResizableLab;
