import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Mail } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const checklistItems = [
  "Panel opens after hover delay and closes when pointer leaves",
  "Content is portaled above surrounding UI (z-index)",
  "Side alignment options position predictably",
  "Trigger remains keyboard-focusable; content dismisses on Escape where supported",
] as const;

const ComponentHoverCardLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [align, setAlign] = useState<"start" | "center" | "end">("center");

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="84/100"
      scalabilityScoreNote={
        <p>
          Radix Hover Card with a single content surface: popover colors, border-border, body text scale, padding, and
          elevation shadow. Defaults align center and sideOffset 4. Open/close motion is data-state driven; the module does
          not wrap other design-system components.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>HoverCardContent: z-50, w-64, rounded-md, border border-border, bg-popover, p-4, text-body-sm, text-popover-foreground</li>
          <li>shadow-md, outline-none on the content surface</li>
          <li>Default align center and sideOffset 4 passed to Radix Content</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation utilities (fade, zoom-95, slide-in-from-*, data-[state] / data-[side])</li>
          <li>Default width w-64 — fixed scale width, overridden in labs with w-80 / w-72</li>
          <li>
            Lab demos: Avatar, Button, Select, Lucide icons, openDelay/closeDelay — not part of hover-card.tsx
          </li>
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
          <h1 className="text-2xl font-bold">Components - Hover Card</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Hover cards show rich preview content on hover (profile snippets, definitions, lightweight details) without a
          click.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic</CardTitle>
          <CardDescription>Hover the trigger to open the card.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="outline">Hover for details</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <p className="text-label text-foreground">Latency budget</p>
                <p className="text-caption text-foreground/75">
                  Hover cards are ideal for secondary context that would clutter the main UI if always visible.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With avatar</CardTitle>
          <CardDescription>Common pattern for people or entities.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md text-label text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Avatar className="h-icon-24 w-icon-24">
                  <AvatarFallback className="text-caption">JD</AvatarFallback>
                </Avatar>
                Jordan Lee
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex gap-3">
                <Avatar className="h-icon-32 w-icon-32">
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="min-w-0 space-y-1">
                  <p className="text-label text-foreground">Jordan Lee</p>
                  <p className="text-caption text-foreground/75">Platform · Inference</p>
                  <div className="flex flex-col gap-1 pt-1 text-caption text-foreground/75">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
                      jordan@example.com
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-icon-16 w-icon-16 shrink-0" aria-hidden />
                      Joined March 2026
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alignment</CardTitle>
          <CardDescription>Popover alignment relative to the trigger.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="hovercard-align" className="text-caption text-foreground/75">
              Align
            </Label>
            <Select value={align} onValueChange={(v) => setAlign(v as typeof align)}>
              <SelectTrigger id="hovercard-align" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="end">End</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center py-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="secondary">Aligned trigger</Button>
              </HoverCardTrigger>
              <HoverCardContent align={align} side="top" className="w-72">
                <p className="text-caption text-foreground/75">
                  Alignment controls how the card lines up with the trigger along the cross axis.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-border p-4 space-y-2">
        <p className="text-label">When to use Hover Card</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">Hover Card</span> for previews on hover (profiles, term definitions,
            extra metadata).
          </li>
          <li>
            Use <span className="text-foreground">Tooltip</span> for a single short line and no nested interactive content.
          </li>
          <li>
            Use <span className="text-foreground">Popover</span> when the user must click to open or the content must stay
            open while interacting inside it.
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

export default ComponentHoverCardLab;
