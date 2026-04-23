import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "Card surface uses bg-card and readable foreground text",
  "Header/content/footer spacing feels consistent",
  "Descriptions render as muted-foreground",
  "Cards look correct in light and dark themes",
] as const;

const ComponentCardsLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="80/100"
      scalabilityScoreNote={
        <p>
          Card shell uses semantic surface tokens (bg-card, text-card-foreground, border, shadow-xs, rounded-lg) and
          consistent section padding (p-6, pt-0 between blocks). Description uses muted foreground. CardTitle still uses
          raw text-2xl typography instead of the shared heading utilities — main follow-up for scalability.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Card: rounded-lg, border, bg-card, text-card-foreground, shadow-xs</li>
          <li>CardHeader: flex flex-col, space-y-1.5, p-6</li>
          <li>CardDescription: text-sm, text-muted-foreground</li>
          <li>CardContent: p-6 pt-0</li>
          <li>CardFooter: flex items-center, p-6 pt-0</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>CardTitle: text-2xl font-semibold leading-none tracking-tight — not aligned with text-h1 / text-h2 tokens</li>
          <li>CardHeader: space-y-1.5 (fractional spacing scale)</li>
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
          <h1 className="text-2xl font-bold">Components - Cards</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Manual test surface for card composition and spacing.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Common Patterns</CardTitle>
          <CardDescription>Header + content + optional footer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic card</CardTitle>
                <CardDescription>Uses default header spacing and muted description text.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-body-sm">
                  Cards should feel like a stable surface for grouping content. They inherit semantic tokens from the theme.
                </p>
                <p className="text-body-sm text-muted-foreground">Secondary information should be clearly lower emphasis.</p>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Dense content</CardTitle>
                <CardDescription>Content list with consistent spacing.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-label">Status</p>
                    <Badge variant="outline" className="text-caption">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-label">Plan</p>
                    <p className="text-body-sm text-muted-foreground">Pro</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-label">Last updated</p>
                    <p className="text-body-sm text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
              </CardFooter>
            </Card>
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

export default ComponentCardsLab;
