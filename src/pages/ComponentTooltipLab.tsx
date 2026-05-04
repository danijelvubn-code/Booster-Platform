import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const checklistItems = [
  "Tooltip appears after hover delay and hides when pointer leaves",
  "Content is portaled above surrounding UI (z-index)",
  "Side prop positions the bubble predictably",
  "Trigger is keyboard-focusable; tooltip shows on focus",
] as const;

const sides = ["top", "right", "bottom", "left"] as const;

const ComponentTooltipLab = () => {
  const [qa, setQa] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => qa[item]).length,
    [qa],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="83/100"
      scalabilityScoreNote={
        <p>
          Radix Tooltip with tokenized content: popover surface, border-border, text-caption, p-3, drop-shadow-lg (no box
          shadow), default sideOffset 4. TooltipArrow uses fill-popover and stroke-border with pixel dimensions from the
          Radix API; side-specific data selectors nudge arrow alignment. Provider and Root are thin re-exports.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>TooltipContent: z-50, rounded-md, border border-border, bg-popover, text-caption, text-popover-foreground, p-3</li>
          <li>TooltipArrow: fill-popover stroke-border (class-based)</li>
          <li>Enter/exit: fade + zoom + slide utilities keyed by data-[side] / data-[state]</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Arrow width, height, and strokeWidth set via component props (numeric), not Tailwind classes</li>
          <li>App-level TooltipProvider noted in intro; Hover card lab linked for richer previews</li>
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
          <h1 className="text-2xl font-bold">Components - Tooltip</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Short hints on hover or focus from <span className="text-foreground">@radix-ui/react-tooltip</span>. The app root wraps{" "}
          <span className="text-foreground">TooltipProvider</span> so most screens only need{" "}
          <span className="text-foreground">Tooltip</span>, <span className="text-foreground">TooltipTrigger</span>, and{" "}
          <span className="text-foreground">TooltipContent</span>. For richer preview panels see{" "}
          <Link to={dsLabPath("hover-card")} className="text-foreground underline underline-offset-4">
            Hover card
          </Link>
          .
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic</CardTitle>
          <CardDescription>Hover or focus the trigger to show the label.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                With tooltip
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save changes before leaving this page.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="More info">
                <HelpCircle className="h-icon-16 w-icon-16" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Contextual help opens the docs in a new tab.</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sides</CardTitle>
          <CardDescription>
            <span className="text-foreground">side</span> controls placement relative to the trigger.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-6 py-8">
          {sides.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm" className="min-w-24">
                  {side}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side} className="max-w-xs">
                <p>Tooltip on the {side}.</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delay</CardTitle>
          <CardDescription>
            Wrap with <span className="text-foreground">TooltipProvider</span> to tune <span className="text-foreground">delayDuration</span> (ms before open).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-6">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  Instant (0 ms)
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Opens immediately on hover.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={700}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  Slow (700 ms)
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Waits longer before showing — reduces noise in dense UIs.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alignment and offset</CardTitle>
          <CardDescription>
            <span className="text-foreground">align</span> and <span className="text-foreground">sideOffset</span> fine-tune position.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Align end
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="end" sideOffset={8}>
              <p>Aligned to the end of the trigger.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Wider content
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-modal-sm">
              <p>
                Longer helper text still uses popover tokens. Prefer short labels; move detail to a dialog or the help center.
              </p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">When to use</CardTitle>
          <CardDescription>Tooltip vs hover card and toast.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-md space-y-3 text-body-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Tooltip</span> — One line or a short phrase for icon buttons and compact actions. Keep copy brief;
            avoid critical-only information (screen reader users may still get it, but sighted users may miss it if they do not hover).
          </p>
          <p>
            <span className="font-medium text-foreground">Hover card</span> — Richer preview with layout, links, or metadata.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-body-sm">
              <Checkbox
                checked={!!qa[item]}
                onCheckedChange={(next) => setQa((prev) => ({ ...prev, [item]: !!next }))}
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

export default ComponentTooltipLab;
