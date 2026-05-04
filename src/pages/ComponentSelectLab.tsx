import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const checklistItems = [
  "Trigger height matches control token (h-control-md) and aligns with inputs",
  "Open list respects max height token and scrolls long option sets",
  "Selected value shows check indicator with icon scale tokens",
  "Keyboard navigation and focus ring behave like other form controls",
  "Disabled trigger and disabled items are visibly muted",
  "Groups, labels, and separators read clearly in light and dark themes",
] as const;

const ComponentSelectLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [framework, setFramework] = useState("");
  const [region, setRegion] = useState("eu");
  const [tier, setTier] = useState("pro");

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="83/100"
      scalabilityScoreNote={
        <p>
          Radix Select with trigger styling aligned to inputs (h-control-md, border-input, ring focus, disabled opacity).
          Content uses popover surfaces, max-height token for lists, scroll chrome, and popper viewport sizing tied to
          trigger dimensions. Items use accent focus and a check indicator slot. No other design-system components are
          imported in select.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>SelectTrigger: h-control-md, rounded-md, border-input, bg-background, text-body-sm, ring-ring, ChevronDown h-icon-16</li>
          <li>SelectContent: z-50, max-h-components-dropdown, min-w-32, rounded-md, bg-popover, text-popover-foreground, shadow-md</li>
          <li>Viewport: p-1; popper mode matches trigger width/height via Radix CSS variables</li>
          <li>SelectItem: rounded-sm, py-1.5 pl-8 pr-2, accent focus, check indicator h-icon-16</li>
          <li>SelectLabel: py-1.5 pl-8 pr-2, text-body-sm font-semibold text-muted-foreground</li>
          <li>SelectSeparator: bg-muted; scroll buttons: py-1, text-muted-foreground, chevron icons</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Radix animation and popper translate offsets (data-[side]) on content</li>
          <li>Viewport uses arbitrary min-width/height from Radix CSS variables in popper mode</li>
          <li>Lucide Check, ChevronDown, ChevronUp; lab composes Label — not part of the primitive module</li>
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
          <h1 className="text-2xl font-bold">Components - Select</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Native-styled single choice from <span className="text-foreground">@radix-ui/react-select</span> with shared
          control and popover tokens.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic</CardTitle>
          <CardDescription>Placeholder, then a short list of options.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="select-framework">Framework</Label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger id="select-framework" className="w-full">
                <SelectValue placeholder="Choose a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">With groups</CardTitle>
          <CardDescription>Labels, separator, and many rows to exercise scrolling.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="select-region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="select-region" className="w-full">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Americas</SelectLabel>
                  <SelectItem value="us-east">US East</SelectItem>
                  <SelectItem value="us-west">US West</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  <SelectItem value="eu">EU (Frankfurt)</SelectItem>
                  <SelectItem value="uk">UK (London)</SelectItem>
                  <SelectItem value="ch">Switzerland</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Asia Pacific</SelectLabel>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">States</CardTitle>
          <CardDescription>Pre-selected value and disabled trigger.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-modal-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="select-tier">Plan</Label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger id="select-tier" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="select-disabled">Disabled</Label>
            <Select disabled>
              <SelectTrigger id="select-disabled" className="w-full">
                <SelectValue placeholder="Unavailable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="x">Only for display</SelectItem>
              </SelectContent>
            </Select>
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

export default ComponentSelectLab;
