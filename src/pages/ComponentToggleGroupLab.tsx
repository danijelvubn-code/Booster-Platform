import { useState } from "react";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Bold, Italic, Underline } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ToggleSize } from "@/components/ui/toggle";

const SizeRow = ({ size }: { size: ToggleSize }) => (
  <ToggleGroup type="single" defaultValue="center" size={size} aria-label={`Alignment ${size}`}>
    <ToggleGroupItem value="left" aria-label="Left aligned">
      Left
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Center aligned">
      Center
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Right aligned">
      Right
    </ToggleGroupItem>
  </ToggleGroup>
);

const ComponentToggleGroupLab = () => {
  const [fmt, setFmt] = useState<string[]>([]);

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="86/100"
      scalabilityScoreNote={
        <p>
          Radix Toggle Group with a layout context: segmented mode uses the same primary-tinted track as tabs (bg-primary/7),
          control-height shell, and per-item chrome that matches tab triggers when active (bg-background, text-primary,
          shadow-sm). Loose mode is flex-wrap with gap. Items merge toggleVariants from the Toggle module with optional
          segmented overrides and rounded-sm/md inside the track.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Root: inline-flex w-fit; segmented — bg-primary/7, gap-1, compound h-control-* + padding + rounded shell</li>
          <li>loose: flex-wrap gap-2</li>
          <li>ToggleGroupItem: toggleVariants + segmented height/rounding; default segmented adds on/off hover and on-state tab-like styling</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/toggle">
              Toggle
            </Link>
            {" — "}
            <span className="text-muted-foreground">
              ToggleGroupItem applies toggleVariants (variant/size) from toggle.tsx.
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Segmented default chrome uses data-[state] utilities including bg-primary/12 hover on off</li>
          <li>Lab imports standalone Toggle for comparison — separate from ToggleGroupPrimitive</li>
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
          <h1 className="text-2xl font-bold">Components - Toggle group</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Exclusive or multi-select toggles from <span className="text-foreground">@radix-ui/react-toggle-group</span>, styled
          with the same segmented track pattern as tabs when <span className="text-foreground">layout=&quot;segmented&quot;</span> (default).
          Standalone <span className="text-foreground">Toggle</span> uses accent for the pressed state.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Segmented (single)</CardTitle>
          <CardDescription>
            <span className="text-foreground">type=&quot;single&quot;</span> — one pressed item at a time. Primary on-state matches tab triggers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SizeRow size="sm" />
          <SizeRow size="md" />
          <SizeRow size="lg" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Multiple selection</CardTitle>
          <CardDescription>
            <span className="text-foreground">type=&quot;multiple&quot;</span> with icon-only items (annotate with{" "}
            <span className="text-foreground">aria-label</span>).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup
            type="multiple"
            value={fmt}
            onValueChange={setFmt}
            size="md"
            aria-label="Text formatting"
            className="w-fit"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
          <p className="mt-3 text-caption text-muted-foreground">
            Active: {fmt.length ? fmt.join(", ") : "none"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Loose + outline</CardTitle>
          <CardDescription>
            <span className="text-foreground">layout=&quot;loose&quot;</span> and <span className="text-foreground">variant=&quot;outline&quot;</span> for
            spaced toolbar buttons (no shared track).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup type="single" defaultValue="list" variant="outline" layout="loose" size="md">
            <ToggleGroupItem value="list" aria-label="List view">
              List
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="map" aria-label="Map view">
              Map
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Standalone Toggle</CardTitle>
          <CardDescription>
            Single control outside a group (e.g. sidebar pin) — see the{" "}
            <Link to="/dev/components/toggle" className="text-foreground underline underline-offset-4">
              Toggle
            </Link>{" "}
            lab for variants, sizes, and states.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Toggle size="sm" aria-label="Pin panel (demo)">
            Pin
          </Toggle>
          <Toggle variant="outline" size="md" aria-label="Favorite (demo)">
            Favorite
          </Toggle>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentToggleGroupLab;
