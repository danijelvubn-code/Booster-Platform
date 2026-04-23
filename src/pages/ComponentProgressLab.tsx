import { useEffect, useMemo, useRef, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const DETERMINATE_DEMO_MS = 15_000;

const checklistItems = [
  "Regular vs dense sizes match intended density (forms vs toolbars)",
  "Determinate fill animates smoothly when value changes (default duration-300)",
  "15s Start demo advances from 0% to 100% over fifteen seconds",
  "Indeterminate bar slides continuously when value is omitted",
  "Track and fill contrast is clear in light and dark themes",
  "Radix progress semantics remain valid for determinate values",
] as const;

const demoValue = 60;

const ComponentProgressLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [determinateDemoValue, setDeterminateDemoValue] = useState(0);
  const determinateRafRef = useRef<number | null>(null);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  useEffect(() => {
    return () => {
      if (determinateRafRef.current !== null) {
        cancelAnimationFrame(determinateRafRef.current);
      }
    };
  }, []);

  const startDeterminateDemo = () => {
    if (determinateRafRef.current !== null) {
      cancelAnimationFrame(determinateRafRef.current);
      determinateRafRef.current = null;
    }
    setDeterminateDemoValue(0);
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / DETERMINATE_DEMO_MS) * 100);
      setDeterminateDemoValue(pct);
      if (pct < 100) {
        determinateRafRef.current = requestAnimationFrame(tick);
      } else {
        determinateRafRef.current = null;
      }
    };
    determinateRafRef.current = requestAnimationFrame(tick);
  };

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="84/100"
      scalabilityScoreNote={
        <p>
          Radix Progress with CVA-sized tracks (regular vs dense), secondary track surface, and primary fill. Determinate
          mode uses a transform on the indicator; indeterminate uses a sliding segment with a named animation. No other
          design-system components are imported in the primitive module.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Root: relative w-full overflow-hidden rounded-full bg-secondary</li>
          <li>Size variants: regular h-2, dense h-1.5</li>
          <li>Indicator: h-full rounded-full bg-primary; determinate adds transition-all duration-300 ease-standard</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Determinate fill position uses inline style transform translateX — not a Tailwind class</li>
          <li>Indeterminate: absolute segment w-1/3 with animate-progress-indeterminate</li>
          <li>indicatorClassName escape hatch (e.g. transition-none in the lab demo for RAF-driven updates)</li>
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
          <h1 className="text-2xl font-bold">Components - Progress</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Determinate progress for known completion (0–100%) and indeterminate animation when progress is unknown.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sizes</CardTitle>
          <CardDescription>
            <span className="text-foreground">regular</span> (default) and <span className="text-foreground">dense</span>{" "}
            use design tokens only—no manual height classes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-label text-foreground/75">Regular</p>
              <span className="text-body-sm tabular-nums text-foreground">{demoValue}%</span>
            </div>
            <Progress value={demoValue} size="regular" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-label text-foreground/75">Dense</p>
              <span className="text-body-sm tabular-nums text-foreground">{demoValue}%</span>
            </div>
            <Progress value={demoValue} size="dense" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Indeterminate (animated)</CardTitle>
          <CardDescription>
            Omit <span className="text-foreground">value</span> (or pass <span className="text-foreground">undefined</span>
            ) for a sliding segment—use while work is in progress but the percentage is unknown.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-label text-foreground/75">Regular</p>
              <span className="text-body-sm tabular-nums text-muted-foreground">—</span>
            </div>
            <Progress size="regular" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-label text-foreground/75">Dense</p>
              <span className="text-body-sm tabular-nums text-muted-foreground">—</span>
            </div>
            <Progress size="dense" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Determinate animation (0% → 100%)</CardTitle>
          <CardDescription>
            Press Start to animate the fill from empty to full over fifteen seconds. Regular and dense stay in sync.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button type="button" size="sm" onClick={startDeterminateDemo}>
            Start
          </Button>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-label text-foreground/75">Regular</p>
                <span className="text-body-sm tabular-nums text-foreground">{Math.round(determinateDemoValue)}%</span>
              </div>
              <Progress
                value={determinateDemoValue}
                size="regular"
                indicatorClassName="transition-none"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-label text-foreground/75">Dense</p>
                <span className="text-body-sm tabular-nums text-foreground">{Math.round(determinateDemoValue)}%</span>
              </div>
              <Progress value={determinateDemoValue} size="dense" indicatorClassName="transition-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Progress</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">determinate</span> progress when you can map work to 0–100%.
          </li>
          <li>
            Use <span className="text-foreground">indeterminate</span> animation when the total is unknown or the server
            cannot report a percentage yet.
          </li>
          <li>
            Pair with a <span className="text-foreground">short label</span> or percentage when space allows.
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

export default ComponentProgressLab;
