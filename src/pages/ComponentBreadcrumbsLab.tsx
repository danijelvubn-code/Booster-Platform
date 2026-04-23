import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "Text hierarchy is clear for links versus current page",
  "Separator icon spacing remains consistent across item counts",
  "Keyboard focus ring is visible on breadcrumb links",
  "Long paths collapse gracefully with ellipsis pattern",
  "Muted versus active states are distinguishable in both themes",
] as const;

const ComponentBreadcrumbsLab = () => {
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
          List, item, link, page, and separator use typography, color, gap, and icon size tokens; links include focus ring
          utilities. Default separators use Lucide ChevronRight; ellipsis uses MoreHorizontal. Remaining gap: link muted
          color uses a fractional opacity modifier.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>BreadcrumbList: flex, flex-wrap, items-center, gap-2, break-words</li>
          <li>BreadcrumbItem: inline-flex, items-center, gap-2</li>
          <li>BreadcrumbLink: text-body-sm, text-muted-foreground/85, transition-colors, ease-standard, hover:text-foreground, focus-visible ring + ring-ring + ring-offset</li>
          <li>BreadcrumbPage: text-body-sm-strong, text-primary</li>
          <li>BreadcrumbSeparator: text-muted-foreground; nested SVG uses h-icon-16 and w-icon-16</li>
          <li>BreadcrumbEllipsis: h-control-sm, w-control-sm, flex centering, h-icon-16 on icon, sr-only helper text</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>BreadcrumbLink: text-muted-foreground/85 (fractional opacity, not a named token)</li>
          <li>focus-visible:ring-offset-2 uses a numeric offset</li>
          <li>ChevronRight and MoreHorizontal from lucide-react (not design-system component labs)</li>
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
          <h1 className="text-2xl font-bold">Components - Breadcrumbs</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for breadcrumb hierarchy, separators, and truncation patterns.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Common Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-label">Three-level path</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/overview">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/endpoints">Endpoints</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Endpoint</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="space-y-2">
            <p className="text-label">Collapsed long path</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/overview">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/recommendations">Recommendations</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cost Optimization Report</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="space-y-2">
            <p className="text-label">Minimal two-level path</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/account">Account</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>API Keys</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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

export default ComponentBreadcrumbsLab;
