import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Pencil, Plug, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const checklistItems = [
  "Right-click opens the context menu",
  "Keyboard focus/hover states are visible",
  "Checkbox and radio items reflect state",
  "Submenu opens and positions correctly",
  "Disabled items are non-interactive",
] as const;

const ComponentContextMenuLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("system");

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          Radix Context Menu with popover surfaces, border, shadow-xs, body/caption type, accent focus, inset spacing, and
          disabled opacity token. Content and subcontent share animation/side-offset patterns. No other design-system
          components are composed inside the primitive module.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Content / SubContent: z-50, min-w-32, rounded-md, border, bg-popover, p-1, text-popover-foreground, shadow-xs</li>
          <li>Item / SubTrigger: rounded-sm, px-3 py-1.5, text-body-sm, focus and open states on accent</li>
          <li>CheckboxItem / RadioItem: pl-8 pr-3, indicator slot with h-icon-16; disabled opacity token</li>
          <li>Label: px-3 py-1.5, text-caption, text-muted-foreground with opacity variant</li>
          <li>Separator: bg-border; Shortcut: text-caption, text-muted-foreground, tracking-widest</li>
          <li>Inset rows: pl-8 alignment for labels and items that align with checkbox/radio columns</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation utilities (fade-in-80, zoom-95, slide-in-from-*, data-[state] / data-[side]) on content surfaces</li>
          <li>Label: text-muted-foreground/80; RadioItem indicator uses h-2 w-2 fill-current</li>
          <li>Lucide Check, ChevronRight, and Circle embedded in the primitive</li>
          <li>
            Demo only: destructive row uses focus/data-highlighted with destructive/7 — not part of the default item
            styles
          </li>
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
          <h1 className="text-2xl font-bold">Components - Context Menu</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Right-click (or long-press on touch) to open a contextual actions menu.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Demo Surface</CardTitle>
          <CardDescription>Right-click inside the panel below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="rounded-lg border bg-card text-card-foreground p-6 space-y-2">
                <p className="text-label">Context target</p>
                <p className="text-body-sm text-muted-foreground">
                  Try right-clicking here. The menu shows items, checkbox/radio options, and a submenu.
                </p>
              </div>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuItem>
                <Copy className="mr-2 h-icon-16 w-icon-16" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Pencil className="mr-2 h-icon-16 w-icon-16" />
                Rename
                <ContextMenuShortcut>R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <Plug className="mr-2 h-icon-16 w-icon-16" />
                Plugins
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem
                className="text-destructive focus:bg-destructive/7 focus:text-destructive data-[highlighted]:bg-destructive/7 data-[highlighted]:text-destructive"
              >
                <Trash2 className="mr-2 h-icon-16 w-icon-16" />
                Delete
              </ContextMenuItem>
              <ContextMenuSeparator />

              <ContextMenuGroup>
                <ContextMenuLabel inset>View</ContextMenuLabel>
                <ContextMenuCheckboxItem checked={showDetails} onCheckedChange={(next) => setShowDetails(!!next)}>
                  Show details
                </ContextMenuCheckboxItem>
              </ContextMenuGroup>

              <ContextMenuSeparator />

              <ContextMenuSub>
                <ContextMenuSubTrigger inset>Theme</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuRadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                    <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">Purpose & anatomy</p>
        <ul className="list-disc pl-5 text-body-sm text-muted-foreground space-y-1">
          <li>
            <span className="text-foreground">Items</span> are single actions. Icons help scanning; shortcuts communicate power-user paths.
          </li>
          <li>
            <span className="text-foreground">Disabled items</span> keep the action discoverable while preventing mistakes when it’s not available.
          </li>
          <li>
            <span className="text-foreground">Section labels</span> (e.g. “Actions”, “View”) group related commands and use smaller caption styling.
          </li>
          <li>
            <span className="text-foreground">Separators</span> visually split groups to reduce cognitive load in longer menus.
          </li>
          <li>
            <span className="text-foreground">Checkbox items</span> represent toggles (on/off). They reserve left space for the indicator, so text aligns.
          </li>
          <li>
            <span className="text-foreground">Radio groups</span> represent a single choice among options (e.g. theme). The submenu keeps the top level short.
          </li>
        </ul>
        <p className="text-caption text-muted-foreground">
          Note: “inset” aligns labels/submenus with rows that reserve space for checkbox/radio indicators.
        </p>
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
          <p className="pt-2 text-caption text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentContextMenuLab;

