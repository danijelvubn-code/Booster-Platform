import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "Single date selection updates correctly",
  "Range selection updates start and end dates",
  "Past dates are disabled in restricted mode",
  "Outside days are visible and consistent in both themes",
] as const;

const formatDate = (date?: Date) => (date ? date.toLocaleDateString() : "Not selected");

const ComponentCalendarLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>();
  const [restrictedDate, setRestrictedDate] = useState<Date | undefined>();

  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="78/100"
      scalabilityScoreNote={
        <p>
          Calendar wraps react-day-picker DayPicker with classNames mapped to layout, semantic colors (primary, accent,
          muted), and buttonVariants for nav and day cells. Range and selection states use design tokens. Remaining work:
          replace fixed w-9/h-9/h-10 grids and text-[0.8rem] with shared tokens where possible; Chevron icons use h-4 w-4 in
          components override.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Root: inline-block, w-fit, p-4</li>
          <li>Layout: flex months, space-y / sm:space-x for responsive month row</li>
          <li>Caption: relative flex, h-10, items-center; label text-sm font-medium</li>
          <li>Nav: buttonVariants ghost + opacity hover; absolute positioning for prev/next</li>
          <li>Cells: selection bg-primary text-primary-foreground; range middle accent; today bg-accent</li>
          <li>Outside/disabled: text-muted-foreground, opacity utilities</li>
          <li>Day button: buttonVariants ghost, h-9 w-9</li>
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
              Nav buttons and day cells use buttonVariants (ghost); full Button audit applies to those surfaces.
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>head_cell: text-[0.8rem] (arbitrary font size)</li>
          <li>Grid sizing: h-9, w-9, w-10, mt-2 — numeric utilities not aligned to control-height / spacing tokens</li>
          <li>IconLeft / IconRight: ChevronLeft and ChevronRight use h-4 w-4 instead of h-icon-16 w-icon-16</li>
          <li>Custom class name strings (e.g. calendar-caption-start) — pair with any global CSS if present</li>
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
          <h1 className="text-2xl font-bold">Components - Calendar</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for calendar selection modes, date restrictions, and theme parity.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Selection Modes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 grid-cols-1">
            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-label">Single Date</p>
              <Calendar mode="single" selected={singleDate} onSelect={setSingleDate} className="rounded-md border" />
              <p className="text-caption text-muted-foreground">
                Selected: <span className="text-foreground">{formatDate(singleDate)}</span>
              </p>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-label">Date Range</p>
              <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} className="rounded-md border" />
              <p className="text-caption text-muted-foreground">
                From: <span className="text-foreground">{formatDate(range?.from)}</span>
              </p>
              <p className="text-caption text-muted-foreground">
                To: <span className="text-foreground">{formatDate(range?.to)}</span>
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-label">Restricted (No Past Dates)</p>
            <Calendar
              mode="single"
              selected={restrictedDate}
              onSelect={setRestrictedDate}
              disabled={{ before: today }}
              className="rounded-md border"
            />
            <p className="text-caption text-muted-foreground">
              Selected: <span className="text-foreground">{formatDate(restrictedDate)}</span>
            </p>
          </div>
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

export default ComponentCalendarLab;
