import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "Carousel scrolls via prev/next buttons",
  "Keyboard arrow keys work when carousel is focused",
  "Buttons disable correctly at the ends (non-looping)",
  "Slides are readable in light and dark themes",
  "Spacing and alignment feels consistent",
] as const;

const slides = [
  { title: "Slide 1", description: "Use for showcasing featured content." },
  { title: "Slide 2", description: "Works well for onboarding steps." },
  { title: "Slide 3", description: "Also useful for cards and media." },
  { title: "Slide 4", description: "Keep content concise for scanning." },
] as const;

const ComponentCarouselLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="74/100"
      scalabilityScoreNote={
        <p>
          Embla drives scrolling; the shell uses relative layout, overflow-hidden track, flex slides with spacing-based
          gutters, and Button for prev/next. Semantic spacing appears on items (pl-4 / pt-4). Remaining work: absolute
          control offsets (-left-12, etc.) and percentage transforms are not design tokens; chevrons use h-4 w-4.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Carousel: relative, role=region, aria-roledescription=carousel</li>
          <li>CarouselContent: overflow-hidden; inner flex with -ml-4 (horizontal) or -mt-4 flex-col (vertical)</li>
          <li>CarouselItem: min-w-0 shrink-0 grow-0 basis-full; pl-4 or pt-4 gutter</li>
          <li>CarouselPrevious / CarouselNext: Button with outline + icon-sm defaults, rounded-full, absolute placement</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("buttons")}>
              Button
            </Link>
            {" — "}
            <span className="text-muted-foreground">
              Previous and next controls render the shared Button component (variant outline, size icon-sm).
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Prev/next: -left-12, -right-12, -top-12, -bottom-12 with top-1/2 and translate transforms (not spacing tokens)</li>
          <li>Vertical orientation: rotate-90 on the same controls</li>
          <li>ArrowLeft / ArrowRight: h-4 w-4 instead of h-icon-16 w-icon-16</li>
          <li>embla-carousel-react behavior is JS-driven; styling is className-only above</li>
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
          <h1 className="text-2xl font-bold">Components - Carousel</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">Manual test surface for carousel layout, controls, and states.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Default Carousel</CardTitle>
          <CardDescription>Non-looping carousel with card slides.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Carousel opts={{ align: "start" }} className="mx-auto max-w-modal-md">
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.title} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-base">{slide.title}</CardTitle>
                      <CardDescription>{slide.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-body-sm">
                        The carousel should keep a stable layout as you navigate between slides.
                      </p>
                      <p className="text-body-sm text-muted-foreground">
                        Prefer semantic tokens for surfaces, borders, and typography.
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Previous slide" />
            <CarouselNext aria-label="Next slide" />
          </Carousel>

          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-label">Notes</p>
            <ul className="list-disc pl-5 text-body-sm text-muted-foreground space-y-1">
              <li>Tab to the carousel region and use left/right arrow keys to navigate.</li>
              <li>Controls should be visible and not overlap content at common widths.</li>
            </ul>
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

export default ComponentCarouselLab;

