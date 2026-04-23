import { useMemo, useState } from "react";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const checklistItems = [
  "Current page uses aria-current=\"page\" and visible outline (or equivalent) style",
  "Previous / Next labels are exposed to assistive tech via aria-label on links",
  "Ellipsis is decorative only (aria-hidden) with sr-only explanation",
  "Keyboard users can tab through page links in order",
  "Disabled or boundary states are clear when on first or last page",
] as const;

const interactiveTotalPages = 5;

const ComponentPaginationLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  const go = (next: number) => {
    setPage(Math.min(Math.max(1, next), interactiveTotalPages));
  };

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="85/100"
      scalabilityScoreNote={
        <p>
          Pagination is a semantic nav + list that reuses Button variants for links and prev/next. Active page styling
          layers primary-tinted background and border on top of outline. Ellipsis uses control square sizing and icon
          affordance. No full Button component wrapper — only buttonVariants and Lucide icons.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Pagination: nav with aria-label, mx-auto flex justify-center</li>
          <li>PaginationContent: flex row, gap-1; PaginationItem passes through li</li>
          <li>PaginationLink: buttonVariants ghost or outline, default icon size; active adds bg-primary/7, text-primary, border-primary/30, hover tints</li>
          <li>PaginationPrevious / Next: size default, gap-1, pl-3 or pr-3, h-icon-16 chevrons</li>
          <li>PaginationEllipsis: h-control-sm w-control-sm, centered, sr-only “More pages”</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/buttons">
              Button
            </Link>
            {" — "}
            <span className="text-muted-foreground">PaginationLink uses buttonVariants (outline/ghost sizes).</span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Active link: fractional primary utilities (/7, /12, /30) layered on variant styles</li>
          <li>Lucide ChevronLeft, ChevronRight, MoreHorizontal</li>
          <li>Interactive lab: aria-disabled and pointer-events-none opacity disabled on boundary prev/next — not in default primitives</li>
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
          <h1 className="text-2xl font-bold">Components - Pagination</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Page controls for long lists and tables: previous/next, numbered links, and ellipsis for skipped ranges.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Static pattern (many pages)</CardTitle>
          <CardDescription>Typical compact row: first, ellipsis, window, last, plus prev/next.</CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">11</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interactive (stateful)</CardTitle>
          <CardDescription>
            Page {page} of {interactiveTotalPages}. Number links and prev/next update local state only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page <= 1}
                  className={page <= 1 ? "pointer-events-none opacity-[var(--disabled-opacity)]" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(page - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: interactiveTotalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page >= interactiveTotalPages}
                  className={
                    page >= interactiveTotalPages
                      ? "pointer-events-none opacity-[var(--disabled-opacity)]"
                      : undefined
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    go(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Pagination</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">Pagination</span> when results are paged server-side or in large
            client datasets and users need explicit page access.
          </li>
          <li>
            Prefer <span className="text-foreground">infinite scroll</span> or <span className="text-foreground">Load more</span>{" "}
            when scanning feeds where page numbers add little value.
          </li>
          <li>
            Pair with <span className="text-foreground">table</span> or <span className="text-foreground">list</span>{" "}
            layouts and keep page size consistent with API limits.
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

export default ComponentPaginationLab;
