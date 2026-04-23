import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "16:9 media block preserves ratio while resizing",
  "1:1 square stays visually balanced at all widths",
  "3:2 layout keeps content centered without clipping",
  "Overflow remains hidden inside rounded corners",
  "Text overlays remain legible on both themes",
] as const;

const ratioExamples = [
  { title: "Landscape 16:9", ratio: 16 / 9, label: "16:9" },
  { title: "Square 1:1", ratio: 1, label: "1:1" },
  { title: "Photo 3:2", ratio: 3 / 2, label: "3:2" },
] as const;

const ComponentAspectRatioLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="92/100"
      scalabilityScoreNote={
        <p>
          The UI wrapper only re-exports Radix Aspect Ratio Root with no classes or tokens in that file. All visual tokens
          (border, radius, overflow, surfaces, type) are applied at call sites such as this lab. Remaining work is
          keeping consumer usage aligned with the design system.
        </p>
      }
      tokens={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to="/overview">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Aspect Ratio</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for fixed-ratio media wrappers and responsive behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ratio Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ratioExamples.map((item) => (
            <div key={item.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                <Badge variant="outline" className="text-[10px]">
                  {item.label}
                </Badge>
              </div>
              <AspectRatio ratio={item.ratio} className="overflow-hidden rounded-lg border">
                <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">
                  Placeholder ({item.label})
                </div>
              </AspectRatio>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={!!checked[item]}
                onCheckedChange={(next) => setChecked((prev) => ({ ...prev, [item]: !!next }))}
              />
              <span>{item}</span>
            </label>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentAspectRatioLab;
