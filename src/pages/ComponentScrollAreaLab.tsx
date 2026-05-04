import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const verticalItems = Array.from({ length: 48 }, (_, i) => ({
  id: `row-${i + 1}`,
  title: `Item ${i + 1}`,
}));

const horizontalTags = [
  "Latency",
  "Throughput",
  "Tokens",
  "Cost",
  "Quality",
  "Safety",
  "Routing",
  "Caching",
  "Batching",
  "Streaming",
  "Retries",
  "Timeouts",
  "Observability",
  "Drift",
  "Fallbacks",
  "Regions",
] as const;

const twoAxisRows = 14;
const twoAxisCols = 18;

const checklistItems = [
  "Vertical list scrolls inside a fixed-height scroll area",
  "Horizontal tag row shows a bottom scrollbar when content overflows",
  "Two-axis grid shows vertical and horizontal scrollbars together",
  "Scrollbar thumb reads clearly in light and dark themes",
  "Rounded border on the scroll container matches viewport radius",
  "Pointer wheel and track dragging behave as expected",
] as const;

const ComponentScrollAreaLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="85/100"
      scalabilityScoreNote={
        <p>
          Radix Scroll Area: root is relative with overflow hidden; viewport fills and inherits corner radius. Default
          vertical ScrollBar plus Corner is mounted on the root; horizontal overflow can add an explicit ScrollBar. Track
          uses semantic scrollbar dimensions (w-scroll-area / h-scroll-area) and border transparency; thumb uses
          rounded-full bg-border.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>ScrollArea root: relative overflow-hidden</li>
          <li>Viewport: h-full w-full rounded-inherit</li>
          <li>ScrollBar: vertical track w-scroll-area with py-3 px-px; horizontal: h-scroll-area with px-3 py-px</li>
          <li>ScrollAreaThumb: rounded-full bg-border</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Scrollbar transition-colors duration-200</li>
          <li>Explicit second ScrollBar for horizontal demos — pattern documented in lab, not default on root</li>
          <li>Lab demos: h-chart-md, max-w-modal-*, border, Badge, list rows — not in scroll-area.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Scroll Area</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Custom scrollbars via <span className="text-foreground">@radix-ui/react-scroll-area</span>, styled with design
          tokens.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical list</CardTitle>
          <CardDescription>Fixed height with default vertical scrollbar.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-chart-md rounded-lg border">
            <div className="p-4">
              {verticalItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border-b border-border py-3 text-body-sm text-foreground last:border-b-0"
                >
                  <span className="text-muted-foreground">{String(index + 1).padStart(2, "0")}.</span> {item.title}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Horizontal tags</CardTitle>
          <CardDescription>Overflowing row with an explicit horizontal scrollbar.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-w-modal-sm rounded-lg border">
            <div className="flex w-max gap-2 p-4">
              {horizontalTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical and horizontal</CardTitle>
          <CardDescription>Wide and tall content inside one scroll viewport.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-chart-md max-w-modal-lg rounded-lg border">
            <div className="flex w-max flex-col gap-0 p-4">
              {Array.from({ length: twoAxisRows }, (_, r) => (
                <div
                  key={`row-${r}`}
                  className="flex w-max gap-3 border-b border-border py-2 last:border-b-0"
                >
                  {Array.from({ length: twoAxisCols }, (_, c) => (
                    <span
                      key={`cell-${r}-${c}`}
                      className="text-caption whitespace-nowrap text-muted-foreground"
                    >
                      R{r + 1}C{c + 1}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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

export default ComponentScrollAreaLab;
