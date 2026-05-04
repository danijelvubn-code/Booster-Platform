import { useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, FileText, Layers, Settings2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsSize } from "@/components/ui/tabs";

const SizeDemo = ({ size, title }: { size: TabsSize; title: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardDescription>
        <span className="text-foreground">size=&quot;{size}&quot;</span> on <span className="text-foreground">Tabs</span> adjusts list height,
        trigger padding, and content top margin.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="a" size={size} className="w-full max-w-modal-md">
        <TabsList>
          <TabsTrigger value="a" className="gap-2">
            <FileText />
            Overview
          </TabsTrigger>
          <TabsTrigger value="b" className="gap-2">
            <BarChart3 />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="c" className="gap-2">
            <Settings2 />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="space-y-2">
          <p className="text-body-sm text-foreground">Primary panel copy for the first tab.</p>
          <p className="text-caption text-muted-foreground">Supporting detail at caption size.</p>
        </TabsContent>
        <TabsContent value="b" className="space-y-2">
          <p className="text-body-sm text-foreground">Second tab content placeholder.</p>
        </TabsContent>
        <TabsContent value="c" className="space-y-2">
          <p className="text-body-sm text-foreground">Third tab content placeholder.</p>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

const ComponentTabsLab = () => {
  const [tab, setTab] = useState("overview");

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="85/100"
      scalabilityScoreNote={
        <p>
          Radix Tabs with a size context: segmented list uses bg-primary/7, control heights, and gap; triggers get inactive
          hover tints, active surface on background with primary text and shadow-sm, icon scale h-icon-16, and focus ring
          tokens. Panel content adds top margin by size and matching focus ring. No other design-system components are
          imported in tabs.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>TabsList: inline-flex, bg-primary/7, text-muted-foreground, gap-1; sm/md/lg use h-control-* and rounded shell padding</li>
          <li>TabsTrigger: per-size padding and text-caption, text-label, or text-body-sm; data-[state=active] bg-background text-primary shadow-sm</li>
          <li>TabsContent: mt-2 or mt-3, focus-visible ring-ring</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Inactive hover uses bg-primary/12 — fractional primary utilities</li>
          <li>Lab uses Lucide icons inside triggers — not part of the primitive file</li>
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
          <h1 className="text-2xl font-bold">Components - Tabs</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Segmented navigation from <span className="text-foreground">@radix-ui/react-tabs</span> with muted list track,
          active surface on <span className="text-foreground">background</span>, and <span className="text-foreground">sm</span> /{" "}
          <span className="text-foreground">md</span> / <span className="text-foreground">lg</span> densities.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Default (md)</CardTitle>
          <CardDescription>Uncontrolled example with keyboard focus rings on triggers and panels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="one" className="w-full max-w-modal-md">
            <TabsList>
              <TabsTrigger value="one">Endpoints</TabsTrigger>
              <TabsTrigger value="two">Models</TabsTrigger>
              <TabsTrigger value="three" disabled>
                Billing (soon)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="one" className="rounded-lg border border-border bg-card p-4 shadow-xs">
              <p className="text-body-sm text-foreground">List and manage inference endpoints for this space.</p>
            </TabsContent>
            <TabsContent value="two" className="rounded-lg border border-border bg-card p-4 shadow-xs">
              <p className="text-body-sm text-foreground">Browse deployed models and version history.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Controlled</CardTitle>
          <CardDescription>
            <span className="text-foreground">value</span> and <span className="text-foreground">onValueChange</span> mirror selection to React state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full max-w-modal-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detail">Detail</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-2">
              <p className="text-body-sm text-muted-foreground">
                Active: <span className="text-label text-foreground">{tab}</span>
              </p>
              <p className="text-body-sm text-foreground">High-level summary content.</p>
            </TabsContent>
            <TabsContent value="detail" className="space-y-2">
              <p className="text-body-sm text-foreground">Drill-down content for the second tab.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With leading icons</CardTitle>
          <CardDescription>Icons inherit trigger sizing via shared SVG utilities on the trigger.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tenant" className="w-full max-w-modal-md">
            <TabsList>
              <TabsTrigger value="tenant" className="gap-2">
                <BarChart3 />
                Business value
              </TabsTrigger>
              <TabsTrigger value="granular" className="gap-2">
                <Layers />
                Granular metrics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tenant">
              <p className="text-body-sm text-foreground">Mirrors the Observe page pattern: icon + label in each trigger.</p>
            </TabsContent>
            <TabsContent value="granular">
              <p className="text-body-sm text-foreground">Second panel for dense telemetry views.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <SizeDemo size="sm" title="Small (sm)" />
      <SizeDemo size="md" title="Medium (md) — default" />
      <SizeDemo size="lg" title="Large (lg)" />
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentTabsLab;
