import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AreaChart } from "@/components/ui/area-chart";
import { LineChart } from "@/components/ui/line-chart";

const checklistItems = [
  "Line renders correctly in light mode",
  "Line renders correctly in dark mode",
  "Hover shows popover card tooltip",
  "Tooltip content is readable and stable",
  "Axes/grid use semantic tokens (no raw colors)",
] as const;

const data = [
  { day: "Mon", value: 1200 },
  { day: "Tue", value: 2400 },
  { day: "Wed", value: 1800 },
  { day: "Thu", value: 3200 },
  { day: "Fri", value: 2800 },
  { day: "Sat", value: 3900 },
  { day: "Sun", value: 4100 },
] as const;

const ComponentLineChartLab = () => {
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
          This lab includes both LineChart and AreaChart (Recharts). Shared pieces: responsive wrapper h-chart-md, axis tick
          renderer with caption + muted fill, card-style tooltip (border-border/30, bg-card, shadow-xs), grid and cursor
          strokes via border alpha token. Series color uses info via oklch CSS variables. Area adds a defs gradient; the
          line chart omits fill.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Chart shell: w-full h-chart-md</li>
          <li>AxisTick: text-caption, fill-muted-foreground on SVG text</li>
          <li>Tooltip: rounded-lg, border-border/30, bg-card, text-card-foreground, shadow-xs, p-3; caption label, body-strong value, bg-info swatch</li>
          <li>CartesianGrid / Tooltip cursor: stroke oklch(var(--border) / var(--alpha-40))</li>
          <li>Line: stroke oklch(var(--info) / 1); Area: same stroke plus linearGradient fill using info + alpha opacity stops</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Recharts strokeWidth 2, activeDot radius 4, and dot={false} on Line — numeric chart API, not Tailwind classes</li>
          <li>Swatch in tooltip uses h-2 w-2 rounded-full bg-info</li>
          <li>Stroke and fill passed as inline oklch(...) strings for Recharts SVG attributes</li>
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
          <h1 className="text-2xl font-bold">Components - Line Chart</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Tokenized Recharts line chart with hover popover card tooltip.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Area Chart</CardTitle>
          <CardDescription>Hover to see the popover card tooltip.</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={[...data]}
            xKey="day"
            yKey="value"
            valueFormatter={(v) => `${v.toLocaleString()} events`}
          />
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">Notes (Area Chart)</p>
        <ul className="list-disc pl-5 text-body-sm text-muted-foreground space-y-1">
          <li>The tooltip uses `bg-card`, `border-border/30`, and `shadow-xs`.</li>
          <li>Fill uses a top-to-bottom gradient with `info` color and tokenized opacity.</li>
        </ul>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Line Chart</CardTitle>
          <CardDescription>Hover to see the popover card tooltip.</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[...data]}
            xKey="day"
            yKey="value"
            valueFormatter={(v) => `${v.toLocaleString()} events`}
          />
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">Notes (Line Chart)</p>
        <ul className="list-disc pl-5 text-body-sm text-muted-foreground space-y-1">
          <li>The tooltip uses `bg-card`, `border-border/30`, and `shadow-xs`.</li>
          <li>Axes use `text-caption` and `muted-foreground` via a custom tick renderer.</li>
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
          <p className="pt-2 text-caption text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentLineChartLab;

