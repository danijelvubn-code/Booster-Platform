import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const checklistItems = [
  "Single-thumb sliders move smoothly with pointer and keyboard",
  "Range sliders render two thumbs and update both values",
  "Regular vs dense: track height and thumb size match the size prop",
  "Vertical orientation fills a fixed-height parent and moves with pointer and keyboard",
  "Step marks appear as circles inside the track, aligned to min/max/step or explicit marks",
  "Track uses secondary fill; range uses primary; thumb matches control ring tokens",
  "Disabled state shows reduced opacity and blocks interaction",
  "min / max / step behave as expected for fractional and integer steps",
] as const;

const ComponentSliderLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [volume, setVolume] = useState([72]);
  const [volumeDense, setVolumeDense] = useState([48]);
  const [range, setRange] = useState([25, 75]);
  const [vertical, setVertical] = useState([35]);
  const [temperature, setTemperature] = useState([0.7]);
  const [temperatureMarked, setTemperatureMarked] = useState([0.7]);
  const [stepped, setStepped] = useState([40]);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          Radix Slider with CVA for orientation and size: horizontal vs vertical layout, track thickness (h-2 / h-1.5 or
          w-2 / w-1.5), primary-filled range with disabled tint, and thumbs at h-icon-20 or h-icon-16 with ring tokens.
          Optional step marks render dots inside the track with fill logic tied to the selected range. No other
          design-system components are imported.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Root: flex, touch-none, orientation-specific alignment</li>
          <li>Track: rounded-full bg-secondary; compound variants set track dimensions per orientation and size</li>
          <li>Range: bg-primary; group disabled uses bg-primary/50</li>
          <li>Thumb: rounded-full border-2 border-primary bg-background, ring-ring on focus, h-icon-20 or h-icon-16</li>
          <li>Step marks: h-1 w-1 rounded-full; on-fill bg-primary-foreground, else bg-primary/50</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Step mark positions use inline style left percentage — not pure utility layout</li>
          <li>Enumeration helpers, mark cap (24), and float rounding live in the module</li>
          <li>Lab-only Label and consumer min/max/step demos — not defaults in slider.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Slider</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Range input from <span className="text-foreground">@radix-ui/react-slider</span> with primary range,
          semantic track, optional step marks, regular or dense sizing, and horizontal or vertical orientation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Single value</CardTitle>
          <CardDescription>One thumb; use for volume, percentages, or model parameters.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slider-volume" className="text-label">
                Output level
              </Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider
              id="slider-volume"
              value={volume}
              onValueChange={setVolume}
              min={0}
              max={100}
              step={1}
              aria-label="Output level"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Regular vs dense</CardTitle>
          <CardDescription>
            <span className="text-foreground">regular</span> (default) for primary forms;{" "}
            <span className="text-foreground">dense</span> for sidebars, filter drawers, and compact config panels.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slider-regular" className="text-label">
                Regular track
              </Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider
              id="slider-regular"
              value={volume}
              onValueChange={setVolume}
              min={0}
              max={100}
              step={1}
              size="regular"
              aria-label="Regular size example"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slider-dense" className="text-label">
                Dense track
              </Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">{volumeDense[0]}%</span>
            </div>
            <Slider
              id="slider-dense"
              value={volumeDense}
              onValueChange={setVolumeDense}
              min={0}
              max={100}
              step={1}
              size="dense"
              aria-label="Dense size example"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With step marks</CardTitle>
          <CardDescription>
            Dots sit <span className="text-foreground">inside the track</span> (above the fill). Enable with{" "}
            <span className="text-foreground">showStepMarks</span>; positions follow <span className="text-foreground">min</span> /{" "}
            <span className="text-foreground">max</span> / <span className="text-foreground">step</span>, or pass{" "}
            <span className="text-foreground">marks</span>. Many steps are subsampled for readability.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slider-steps" className="text-label">
                Ten steps (0–90, circles in bar)
              </Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">{stepped[0]}</span>
            </div>
            <Slider
              id="slider-steps"
              value={stepped}
              onValueChange={setStepped}
              min={0}
              max={100}
              step={10}
              showStepMarks
              marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
              aria-label="Slider with ten step dots in track"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slider-marks-explicit" className="text-label">
                Explicit marks (0, 0.5, 1.0, 1.5, 2.0)
              </Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">{temperatureMarked[0].toFixed(1)}</span>
            </div>
            <Slider
              id="slider-marks-explicit"
              value={temperatureMarked}
              onValueChange={setTemperatureMarked}
              min={0}
              max={2}
              step={0.1}
              showStepMarks
              marks={[0, 0.5, 1, 1.5, 2]}
              aria-label="Temperature with explicit marks"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vertical</CardTitle>
          <CardDescription>
            Set <span className="text-foreground">orientation=&quot;vertical&quot;</span> and give the root a
            height (here <span className="text-foreground">h-full</span> inside a fixed-height container).
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md">
          <div className="flex items-center gap-6">
            <div className="flex h-chart-md w-10 shrink-0 flex-col items-center justify-center">
              <Slider
                orientation="vertical"
                value={vertical}
                onValueChange={setVertical}
                min={0}
                max={100}
                step={1}
                aria-label="Vertical level"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-label">Level</Label>
              <p className="text-body-sm tabular-nums text-muted-foreground">{vertical[0]}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fractional step</CardTitle>
          <CardDescription>
            Same as playground temperature: bounded range with decimal steps (e.g. <span className="text-foreground">step=0.1</span>
            ).
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="slider-temp" className="text-label">
              Temperature
            </Label>
            <span className="text-body-sm tabular-nums text-muted-foreground">{temperature[0].toFixed(1)}</span>
          </div>
          <Slider
            id="slider-temp"
            value={temperature}
            onValueChange={setTemperature}
            min={0}
            max={2}
            step={0.1}
            aria-label="Temperature"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Range</CardTitle>
          <CardDescription>Two values in one control; thumbs stay ordered by Radix.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label className="text-label">Selected span</Label>
              <span className="text-body-sm tabular-nums text-muted-foreground">
                {range[0]} – {range[1]}
              </span>
            </div>
            <Slider value={range} onValueChange={setRange} min={0} max={100} step={1} aria-label="Value range" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disabled</CardTitle>
          <CardDescription>Slider root receives disabled; thumbs inherit the muted state.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md">
          <Slider defaultValue={[40]} min={0} max={100} disabled aria-label="Disabled example" />
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

export default ComponentSliderLab;
