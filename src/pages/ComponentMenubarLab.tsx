import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, FileText, Plug, Settings, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

const checklistItems = [
  "Top-level menus open on click/keyboard",
  "Arrow keys move between items and submenus",
  "Checkbox and radio items reflect state",
  "Submenus open to the side and stay focusable",
  "Disabled items are non-interactive",
] as const;

const ComponentMenubarLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showRulers, setShowRulers] = useState(true);
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
          Radix Menubar: horizontal bar uses control height, border-input, and background tokens; triggers use accent open
          and focus states with body type. Menu panels match the popover dropdown family (min widths, shadow-xs, animation
          stack). Default content uses align start, alignOffset -4, and sideOffset 4. No other design-system components are
          composed in the primitive module.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Menubar: flex h-control-md, gap-1, rounded-md, border border-input, bg-background, p-1</li>
          <li>MenubarTrigger: rounded-sm, px-3 py-1.5, text-body-sm font-medium, open/focus on accent</li>
          <li>MenubarContent: z-50, min-w-48, rounded-md, border, bg-popover, p-1, text-popover-foreground, shadow-xs</li>
          <li>MenubarSubContent: min-w-32 (narrower than top-level content)</li>
          <li>Item / SubTrigger: same row pattern as dropdown (rounded-sm, py-1.5, accent focus, inset pl-8)</li>
          <li>CheckboxItem / RadioItem: pl-8 pr-3, indicators; Label and Shortcut use text-caption and text-foreground/75</li>
          <li>Separator: bg-border</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation utilities on content surfaces; default alignOffset -4 on MenubarContent</li>
          <li>RadioItem indicator: h-2 w-2 fill-current; Lucide Check, ChevronRight, Circle in the primitive</li>
          <li>Lab only: destructive item uses focus styles with destructive/7; Lucide icons in demo rows</li>
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
          <h1 className="text-2xl font-bold">Components - Menu Bar</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          A horizontal menu bar for persistent, app-level commands (desktop-style File / Edit / View).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scenario Matrix</CardTitle>
          <CardDescription>Use the menu bar to open nested panels and toggles.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Menubar className="w-fit">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarLabel>Actions</MenubarLabel>
                <MenubarItem>
                  <FileText className="mr-2 h-icon-16 w-icon-16" />
                  New workspace
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <Copy className="mr-2 h-icon-16 w-icon-16" />
                  Duplicate
                  <MenubarShortcut>⌘D</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>
                  <Plug className="mr-2 h-icon-16 w-icon-16" />
                  Connect integration
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="text-destructive focus:bg-destructive/7 focus:text-destructive">
                  <Trash2 className="mr-2 h-icon-16 w-icon-16" />
                  Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked={showRulers} onCheckedChange={(next) => setShowRulers(!!next)}>
                  Show rulers
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger inset>
                    <Settings className="mr-2 h-icon-16 w-icon-16" />
                    Theme
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarRadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                      <MenubarRadioItem value="system">System</MenubarRadioItem>
                      <MenubarRadioItem value="light">Light</MenubarRadioItem>
                      <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Menu Bar (vs other menus)</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">Menu Bar</span> for persistent, discoverable commands along the top of the
            app (desktop-style toolbars).
          </li>
          <li>
            Use <span className="text-foreground">Dropdown Menu</span> for a compact trigger anchored to a button or icon
            (row actions, profile menu).
          </li>
          <li>
            Use <span className="text-foreground">Context Menu</span> for actions tied to a specific surface via
            right-click or long-press.
          </li>
          <li>
            Use <span className="text-foreground">Command</span> for search-first command palettes (⌘K).
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

export default ComponentMenubarLab;
