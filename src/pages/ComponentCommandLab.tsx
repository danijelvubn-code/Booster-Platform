import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator, Calendar, Command as CommandIcon, FileText, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const checklistItems = [
  "Inline command list filters as you type",
  "Dialog command opens and closes correctly",
  "Keyboard navigation feels correct (up/down/enter)",
  "Selected row styling is visible",
  "Empty state renders when no results",
] as const;

const ComponentCommandLab = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="76/100"
      scalabilityScoreNote={
        <p>
          Built on cmdk with popover surfaces, control heights, body/caption type, accent selection, and disabled opacity
          token. CommandDialog composes Dialog. Many cmdk-specific attribute selectors tune group headings and items; some
          heights (max-h-80) and text-xs are not yet unified with the full typography scale.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Command: flex column, overflow-hidden, rounded-md, bg-popover, text-popover-foreground</li>
          <li>CommandInput: border-b, px-3, Search icon h-icon-16; input h-control-md, text-body-sm, placeholder opacity</li>
          <li>CommandList: overflow scroll axes; CommandEmpty: py-6, text-center, text-body-sm</li>
          <li>CommandGroup: p-1, heading utilities for cmdk-group-heading</li>
          <li>CommandItem: rounded-sm, px-2 py-1.5, text-body-sm, data-selected bg-accent, disabled opacity token</li>
          <li>CommandSeparator: bg-border; CommandShortcut: text-caption, text-muted-foreground, tracking-widest</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("dialog")}>
              Dialog
            </Link>
            {" — "}
            <span className="text-muted-foreground">
              CommandDialog wraps content in Dialog and DialogContent (p-0, shadow-lg, overflow-hidden) plus cmdk layout
              overrides.
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>CommandList: max-h-80 (fixed rem height, not a layout token)</li>
          <li>
            CommandDialog + CommandGroup: long attribute selectors targeting cmdk internals (brittle vs pure tokens)
          </li>
          <li>Search icon: text-foreground/50; CommandGroup headings use text-xs in places</li>
          <li>Lucide Search in CommandInput; lab items use other Lucide icons — not in the primitive file</li>
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
          <h1 className="text-2xl font-bold">Components - Command</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Cmdk-based command menu (inline + dialog) using tokenized styles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inline Command</CardTitle>
          <CardDescription>Use this for embedded command menus inside pages or panels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Command className="rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem onSelect={() => navigate(postMvpPath("/overview"))}>
                  <Calendar className="mr-2 h-icon-16 w-icon-16" />
                  <span>Overview</span>
                  <CommandShortcut>↵</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => navigate(postMvpPath("/account"))}>
                  <FileText className="mr-2 h-icon-16 w-icon-16" />
                  <span>Account</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem>
                  <Calculator className="mr-2 h-icon-16 w-icon-16" />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-icon-16 w-icon-16" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Command Dialog</CardTitle>
          <CardDescription>Use this for a global command palette (app-level search/actions).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" onClick={() => setOpen(true)} className="gap-2">
            <CommandIcon className="h-icon-16 w-icon-16" />
            Open command palette
          </Button>
          <p className="text-caption text-muted-foreground">
            In production, you’d usually bind this to a keyboard shortcut (e.g. Cmd/Ctrl + K).
          </p>
        </CardContent>
      </Card>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick actions">
            <CommandItem onSelect={() => { setOpen(false); navigate(postMvpPath("/endpoints")); }}>
              <FileText className="mr-2 h-icon-16 w-icon-16" />
              <span>Go to Endpoints</span>
              <CommandShortcut>G</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { setOpen(false); navigate(postMvpPath("/observe")); }}>
              <Calendar className="mr-2 h-icon-16 w-icon-16" />
              <span>Go to Observe</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

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

export default ComponentCommandLab;

