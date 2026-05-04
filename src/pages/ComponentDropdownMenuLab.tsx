import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Copy, Plug, Settings, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const checklistItems = [
  "Menu opens from trigger click",
  "Keyboard navigation works (up/down/enter/esc)",
  "Checkbox and radio items reflect state",
  "Submenu opens and positions correctly",
  "Disabled items are non-interactive",
] as const;

const ComponentDropdownMenuLab = () => {
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
          Radix Dropdown Menu with popover surfaces, border, shadow-xs, body/caption type, accent focus, inset spacing,
          and disabled opacity token. Content and subcontent share animation and side-offset patterns (default sideOffset 4).
          The primitive module does not wrap other design-system components.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Content / SubContent: z-50, min-w-32, rounded-md, border, bg-popover, p-1, text-popover-foreground, shadow-xs</li>
          <li>Item / SubTrigger: rounded-sm, px-3 py-1.5, text-body-sm, focus and open states on accent</li>
          <li>CheckboxItem / RadioItem: pl-8 pr-3, indicator slot with h-icon-16; disabled opacity token</li>
          <li>Label: px-3 py-1.5, text-caption, text-foreground/75</li>
          <li>Separator: bg-border; Shortcut: text-caption, text-foreground/75, tracking-widest</li>
          <li>Inset rows: pl-8 alignment for labels and items that align with checkbox/radio columns</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation utilities (fade, zoom-95, slide-in-from-*, data-[state] / data-[side]) on content surfaces</li>
          <li>DropdownMenuContent: default sideOffset 4 in component props</li>
          <li>RadioItem indicator: h-2 w-2 fill-current; Lucide Check, ChevronRight, Circle in the primitive</li>
          <li>
            Lab only: trigger uses Button + chevron icon; destructive row and a fixed width (w-56) on content are demo
            patterns
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
          <h1 className="text-2xl font-bold">Components - Dropdown Menu</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          Dropdown menus provide quick actions and settings anchored to a trigger (e.g. kebab menu, profile menu).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scenario Matrix</CardTitle>
          <CardDescription>Click the trigger to open a menu anchored to it.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Options
                <ChevronDown className="h-icon-16 w-icon-16 text-foreground/50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Copy className="mr-2 h-icon-16 w-icon-16" />
                Copy
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Plug className="mr-2 h-icon-16 w-icon-16" />
                Plugins
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:bg-destructive/7 focus:text-destructive">
                <Trash2 className="mr-2 h-icon-16 w-icon-16" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel inset>View</DropdownMenuLabel>
                <DropdownMenuCheckboxItem checked={showDetails} onCheckedChange={(next) => setShowDetails(!!next)}>
                  Show details
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger inset>
                  <Settings className="mr-2 h-icon-16 w-icon-16" />
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-label">When to use Dropdown Menu (vs other menus)</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use <span className="text-foreground">Dropdown Menu</span> for actions/settings anchored to a trigger (profile
            menu, row actions, “more” menu).
          </li>
          <li>
            Use <span className="text-foreground">Context Menu</span> for right-click/long-press actions tied to a specific
            object in a canvas/table.
          </li>
          <li>
            Use <span className="text-foreground">Select</span> when the goal is choosing a value for a form field (not
            running actions).
          </li>
          <li>
            Use <span className="text-foreground">Command</span> for global search + actions (power-user palette).
          </li>
          <li>
            Use <span className="text-foreground">Menubar</span> for persistent app-level menus (desktop-style, top of
            app).
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

export default ComponentDropdownMenuLab;

