import { useMemo, useState } from "react";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, LayoutDashboard, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const checklistItems = [
  "Sidebar trigger toggles expand / icon collapse on desktop (md+)",
  "On small viewports the sidebar opens in a sheet overlay",
  "Rail target remains clickable for collapse when using collapsible=\"icon\"",
  "Menu buttons show hover, active, and focus-visible ring using sidebar tokens",
  "Header and footer regions stay pinned within the scrollable content area",
  "Keyboard shortcut Ctrl/Cmd+B toggles the sidebar (documented in checklist only)",
] as const;

const ComponentSidebarLab = () => {
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
          Large shell module: provider sets sidebar width CSS variables and wraps TooltipProvider; desktop sidebar uses
          fixed panels, peer gap, and data-state styling; mobile routes the same tree through Sheet. Menu chrome uses CVA
          for buttons, sidebar-* semantic colors, and optional tooltips when collapsed. It composes several primitives
          (Button trigger, Input, Separator, Skeleton, Sheet) while most layout is custom flex + data-attribute selectors.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Provider: --sidebar-width / --sidebar-width-icon, min-h-svh wrapper, inset variant background hook</li>
          <li>Sidebar surfaces: bg-sidebar, text-sidebar-foreground, sidebar-border, sidebar-accent, sidebar-ring</li>
          <li>SidebarMenuButton / sub components: CVA sizes, ring-sidebar-ring, collapsed icon sizing</li>
          <li>SidebarInset: bg-background, inset variant rounded-xl and shadow at md</li>
          <li>SidebarGroupLabel, SidebarSeparator, rail and menu spacing use sidebar tokens</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/buttons">
              Button
            </Link>
            {" — "}
            <span className="text-muted-foreground">SidebarTrigger</span>
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/input">
              Input
            </Link>
            {" — "}
            <span className="text-muted-foreground">SidebarInput</span>
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/separator">
              Separator
            </Link>
            {" — "}
            <span className="text-muted-foreground">SidebarSeparator</span>
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/sheet">
              Sheet
            </Link>
            {" — "}
            <span className="text-muted-foreground">mobile sidebar container</span>
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/skeleton">
              Skeleton
            </Link>
            {" — "}
            <span className="text-muted-foreground">SidebarMenuSkeleton</span>
          </li>
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/dev/components/tooltip">
              Tooltip
            </Link>
            {" — "}
            <span className="text-muted-foreground">provider on SidebarProvider; SidebarMenuButton tooltips</span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Width constants and cookie persistence in TypeScript (rem strings, not Tailwind classes)</li>
          <li>useIsMobile hook; Cmd/Ctrl+B shortcut in provider</li>
          <li>SidebarMenuSkeleton: random width percentage via inline style variable</li>
          <li>Many calc(), peer-data, and group-data selectors; outline variant uses box-shadow with oklch sidebar vars</li>
          <li>SidebarTrigger: h-7 w-7; Lucide PanelLeft; rail uses raw button + after:[2px] hit area</li>
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
          <h1 className="text-2xl font-bold">Components - Sidebar</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Application shell sidebar: provider, rail, inset main, and grouped menus. On viewports below{" "}
          <span className="text-foreground">md</span> the same tree renders inside a sheet.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interactive layout</CardTitle>
          <CardDescription>
            Resize the window to compare desktop (fixed rail + inset) vs mobile sheet. Uses{" "}
            <span className="text-foreground">collapsible=&quot;icon&quot;</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-lg border">
            <SidebarProvider defaultOpen className="min-h-chart-md w-full">
              <div className="flex w-full">
                <Sidebar collapsible="icon" variant="sidebar">
                  <SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <span className="text-caption font-semibold">B</span>
                          </div>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Booster</span>
                            <span className="truncate text-xs text-muted-foreground">Lab</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive tooltip="Overview">
                              <Link to="/overview">
                                <LayoutDashboard />
                                <span>Overview</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Endpoints">
                              <Link to="/endpoints">
                                <FileText />
                                <span>Endpoints</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton type="button" tooltip="Settings (demo)">
                              <Settings />
                              <span>Settings</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator />
                    <SidebarGroup>
                      <SidebarGroupLabel>Docs</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton type="button" variant="outline">
                              <span className="text-body-sm">Design tokens</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                  <SidebarFooter>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton size="lg" type="button" className="text-sidebar-foreground">
                          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <span className="text-caption">?</span>
                          </div>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Help</span>
                            <span className="truncate text-xs">Component lab</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarFooter>
                  <SidebarRail />
                </Sidebar>

                <SidebarInset>
                  <header className="flex h-control-lg shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    <div className="flex flex-1 items-center gap-2">
                      <span className="text-body-sm font-medium text-foreground">Main area</span>
                      <span className="text-caption text-muted-foreground">(SidebarInset)</span>
                    </div>
                  </header>
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <p className="text-body-sm text-muted-foreground">
                      Primary content lives here. The sidebar uses <span className="text-foreground">peer</span> spacing so
                      this column stays beside the off-canvas gap on desktop.
                    </p>
                    <div className="rounded-lg border bg-muted/30 p-4 text-body-sm text-muted-foreground">
                      Add forms, tables, or detail views in real screens. This block is only to show inset padding and
                      surface contrast.
                    </div>
                  </div>
                </SidebarInset>
              </div>
            </SidebarProvider>
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

export default ComponentSidebarLab;
