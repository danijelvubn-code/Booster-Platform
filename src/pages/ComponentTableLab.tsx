import { useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellWithAvatarName,
  TableCellWithDescription,
  TableHead,
  TableHeader,
  TableRow,
  type TableSize,
} from "@/components/ui/table";

const patternRows = [
  {
    pattern: "Regular",
    preview: <span className="text-body-sm text-foreground">Plain cell text</span>,
  },
  {
    pattern: "With description",
    preview: (
      <TableCellWithDescription title="Primary line" description="Secondary line with more context." />
    ),
  },
  {
    pattern: "Avatar only",
    preview: (
      <div className="flex justify-center">
        <Avatar className="h-icon-32 w-icon-32">
          <AvatarFallback className="text-caption">JD</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    pattern: "Avatar and name",
    preview: (
      <TableCellWithAvatarName
        avatar={
          <Avatar className="h-icon-32 w-icon-32">
            <AvatarFallback className="text-caption">AK</AvatarFallback>
          </Avatar>
        }
        title="Alex Kim"
        description="Product · Berlin"
      />
    ),
  },
  {
    pattern: "Checkbox",
    preview: (
      <div className="flex items-center gap-2">
        <Checkbox id="lab-pattern-check" defaultChecked />
        <Label htmlFor="lab-pattern-check" className="text-body-sm text-foreground">
          Select row
        </Label>
      </div>
    ),
  },
  {
    pattern: "Badge",
    preview: (
      <Badge variant="success" className="text-caption">
        Active
      </Badge>
    ),
  },
  {
    pattern: "Numeric (right)",
    preview: (
      <span className="block text-right font-mono text-body-sm tabular-nums text-foreground">12,480</span>
    ),
  },
];

const SizeDemoTable = ({ size, label }: { size: TableSize; label: string }) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    r1: true,
    r2: false,
    r3: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
        <CardDescription>
          Pass <span className="text-foreground">size=&quot;{size}&quot;</span> on <span className="text-foreground">Table</span> to set
          header and cell padding and typography scale.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table size={size}>
          <TableCaption>Example dataset using mixed cell patterns at the {size} density.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <span className="sr-only">Select</span>
              </TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow data-state={selected.r1 ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selected.r1}
                  onCheckedChange={(v) => setSelected((p) => ({ ...p, r1: !!v }))}
                  aria-label="Select row 1"
                />
              </TableCell>
              <TableCell>
                <TableCellWithAvatarName
                  avatar={
                    <Avatar className="h-icon-32 w-icon-32">
                      <AvatarFallback className="text-caption">MR</AvatarFallback>
                    </Avatar>
                  }
                  title="Morgan Rivera"
                  description="Engineering"
                />
              </TableCell>
              <TableCell>
                <TableCellWithDescription title="Inference API" description="Regional endpoint · EU" />
              </TableCell>
              <TableCell>
                <Badge variant="success" className="text-caption">
                  Healthy
                </Badge>
              </TableCell>
              <TableCell>
                <span className="block text-right font-mono tabular-nums text-foreground">842,100</span>
              </TableCell>
            </TableRow>
            <TableRow data-state={selected.r2 ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selected.r2}
                  onCheckedChange={(v) => setSelected((p) => ({ ...p, r2: !!v }))}
                  aria-label="Select row 2"
                />
              </TableCell>
              <TableCell>
                <span className="text-body-sm text-foreground">Unassigned pool</span>
              </TableCell>
              <TableCell>
                <TableCellWithDescription title="Batch queue" description="Scheduled workloads" />
              </TableCell>
              <TableCell>
                <Badge variant="warning" className="text-caption">
                  Degraded
                </Badge>
              </TableCell>
              <TableCell>
                <span className="block text-right font-mono tabular-nums text-foreground">12,004</span>
              </TableCell>
            </TableRow>
            <TableRow data-state={selected.r3 ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  checked={selected.r3}
                  onCheckedChange={(v) => setSelected((p) => ({ ...p, r3: !!v }))}
                  aria-label="Select row 3"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-start">
                  <Avatar className="h-icon-32 w-icon-32">
                    <AvatarFallback className="text-caption">?</AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-body-sm text-foreground">System</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-caption">
                  Idle
                </Badge>
              </TableCell>
              <TableCell>
                <span className="block text-right font-mono tabular-nums text-muted-foreground">—</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ComponentTableLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="87/100"
      scalabilityScoreNote={
        <p>
          Table size context drives CVA on heads, cells, and captions (sm/md/lg padding and typography). Shell wraps the
          native table in an overflow scroller; rows use border-b with hover and selected muted surfaces; footer uses
          border-t and muted tint. Composite helpers (stack, title/description, avatar+name) are layout-only and stay on
          design tokens—no other primitives are imported in table.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Table: scroll wrapper, w-full, caption-bottom, text-body-sm base</li>
          <li>TableHead: font-medium text-muted-foreground; per-size h-control / px / py and text-caption or text-label</li>
          <li>TableCell: per-size padding and text-body-sm or text-body</li>
          <li>TableRow: border-b, hover:bg-muted/50, data-[state=selected]:bg-muted</li>
          <li>TableFooter: border-t bg-muted/50 font-medium</li>
          <li>TableCellTitle / TableCellDescription: size-aware text-body-sm-strong vs text-caption, muted secondary line</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Fractional muted surfaces on row hover and footer (e.g. bg-muted/50)</li>
          <li>Avatar/Badge/Button in the lab are demo content — TableCellWithAvatarName only accepts a ReactNode avatar</li>
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
          <h1 className="text-2xl font-bold">Components - Table</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Semantic table layout with <span className="text-foreground">sm</span>, <span className="text-foreground">md</span>, and{" "}
          <span className="text-foreground">lg</span> cell density, plus reusable cell patterns for common product columns.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cell patterns</CardTitle>
          <CardDescription>
            Compose primitives inside <span className="text-foreground">TableCell</span>; patterns below use the default{" "}
            <span className="text-foreground">md</span> table size.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table size="md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Pattern</TableHead>
                <TableHead>Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patternRows.map((row) => (
                <TableRow key={row.pattern}>
                  <TableCell>
                    <span className="text-label text-foreground">{row.pattern}</span>
                  </TableCell>
                  <TableCell>{row.preview}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SizeDemoTable size="sm" label="Small (sm)" />
      <SizeDemoTable size="md" label="Medium (md) — default" />
      <SizeDemoTable size="lg" label="Large (lg)" />
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentTableLab;
