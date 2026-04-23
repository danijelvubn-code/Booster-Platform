import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

const checklistItems = [
  "Pulse uses built-in animate-pulse (opacity) with muted fill",
  "Shimmer uses horizontal gradient sweep and motion-duration-1800",
  "Both variants keep rounded-md and bg-muted on the shell",
  "Composite layouts preserve spacing scale tokens for either animation",
  "Shimmer band uses via-foreground/7 (alpha-7 token) for a light touch vs bg-muted",
] as const;

const listRowSkeletonClasses = ["h-3 w-full", "h-3 w-11/12", "h-3 w-full", "h-3 w-4/5"] as const;

const PrimitivesDemo = ({ animation }: { animation: "pulse" | "shimmer" }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <p className="text-label text-muted-foreground">Full width bar (control height)</p>
      <Skeleton animation={animation} className="h-control-md w-full" />
    </div>
    <div className="space-y-2">
      <p className="text-label text-muted-foreground">Short line</p>
      <Skeleton animation={animation} className="h-3 w-2/3 max-w-modal-sm" />
    </div>
    <div className="flex flex-wrap items-end gap-3">
      <Skeleton animation={animation} className="h-icon-16 w-icon-16 shrink-0 rounded-full" />
      <Skeleton animation={animation} className="h-icon-24 w-icon-24 shrink-0 rounded-full" />
      <Skeleton animation={animation} className="h-control-sm w-24" />
    </div>
  </div>
);

const ComponentSkeletonLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          CVA-based placeholder: rounded-md bg-muted, default pulse via animate-pulse. Shimmer adds overflow clipping and an
          absolutely positioned gradient band using via-foreground/7 and a named shimmer keyframe. Dimensions and layout
          are entirely consumer classNames.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Base: rounded-md bg-muted</li>
          <li>animation pulse: animate-pulse</li>
          <li>animation shimmer: relative overflow-hidden; inner span bg-gradient-to-r from-transparent via-foreground/7 to-transparent, animate-skeleton-shimmer</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Shimmer overlay: w-1/2 width and translate sweep — layout-specific, not a size token</li>
          <li>Lab demos: h-control-*, h-icon-*, fractional widths — applied by consumers, not defaults in skeleton.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Skeleton</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Set <span className="text-foreground">animation=&quot;pulse&quot;</span> (default) or{" "}
          <span className="text-foreground">animation=&quot;shimmer&quot;</span>. Base styles:{" "}
          <span className="text-foreground">rounded-md</span> and <span className="text-foreground">bg-muted</span>.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Animation styles</CardTitle>
          <CardDescription>
            <span className="text-foreground">pulse</span> — opacity pulse. <span className="text-foreground">shimmer</span>{" "}
            — sliding gradient highlight.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-label font-medium text-foreground">Pulse (default)</p>
            <PrimitivesDemo animation="pulse" />
          </div>
          <div className="space-y-3">
            <p className="text-label font-medium text-foreground">Shimmer</p>
            <PrimitivesDemo animation="shimmer" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Card layout</CardTitle>
          <CardDescription>Same structure with pulse (left) and shimmer (right).</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex gap-4 rounded-lg border p-4">
            <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
          <div className="flex gap-4 rounded-lg border p-4">
            <Skeleton animation="shimmer" className="h-16 w-16 shrink-0 rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <Skeleton animation="shimmer" className="h-4 w-3/4" />
              <Skeleton animation="shimmer" className="h-3 w-full" />
              <Skeleton animation="shimmer" className="h-3 w-5/6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">List rows</CardTitle>
          <CardDescription>Pulse (default) in the bordered panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-modal-md space-y-3 rounded-lg border p-4">
            {listRowSkeletonClasses.map((cls, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-icon-16 w-icon-16 shrink-0 rounded-full" />
                <Skeleton className={cls} />
              </div>
            ))}
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

export default ComponentSkeletonLab;
