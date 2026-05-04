import { useId, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";

const ComponentTextareaLab = () => {
  const baseId = useId();
  const [value, setValue] = useState("");

  const field = (props: TextareaProps & { label: string; description?: string }) => {
    const { label, description, id: idProp, ...rest } = props;
    const id = idProp ?? `${baseId}-${label.replace(/\s+/g, "-").toLowerCase()}`;
    return (
      <div className="space-y-2 max-w-modal-md">
        <Label htmlFor={id}>{label}</Label>
        <Textarea id={id} {...rest} />
        {description ? <p className="text-caption text-muted-foreground">{description}</p> : null}
      </div>
    );
  };

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="88/100"
      scalabilityScoreNote={
        <p>
          CVA-based textarea aligned with Input: border-input, bg-background, ring-ring on focus, hover border-ring,
          disabled and read-only muted surfaces, aria-invalid destructive ring, and resize-y. Size variants set min-height,
          padding, and text-caption or text-body-sm. No other design-system components are imported in textarea.tsx.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Shared: rounded-md w-full resize-y, placeholder opacity, ring-offset-background, ease-standard</li>
          <li>sm: min-h-16 px-2 py-2 text-caption</li>
          <li>md: min-h-20 px-3 py-2 text-body-sm</li>
          <li>lg: min-h-24 px-4 py-3 text-body-sm</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Min-height scale (min-h-16/20/24) is fixed per size, not a shared layout token name</li>
          <li>Lab composes Label from the input module and helper copy — not in textarea.tsx</li>
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
          <h1 className="text-2xl font-bold">Components - Textarea</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          Multiline field aligned with single-line <span className="text-foreground">Input</span> tokens: border, focus ring,
          disabled/read-only, and <span className="text-foreground">sm</span> / <span className="text-foreground">md</span> /{" "}
          <span className="text-foreground">lg</span> density. Vertical resize only (<span className="text-foreground">resize-y</span>).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Default (md)</CardTitle>
          <CardDescription>Standard min-height and padding for forms and dialogs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {field({
            label: "Description",
            placeholder: "Describe the change…",
          })}
          {field({
            label: "With helper",
            description: "Helper text uses caption size and muted foreground.",
            placeholder: "Optional notes",
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sizes</CardTitle>
          <CardDescription>
            <span className="text-foreground">size=&quot;sm&quot;</span>, <span className="text-foreground">md</span>, or{" "}
            <span className="text-foreground">lg</span> on <span className="text-foreground">Textarea</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {field({
            label: "Small",
            size: "sm",
            placeholder: "Dense layout",
          })}
          {field({
            label: "Medium (default)",
            size: "md",
            placeholder: "Default density",
          })}
          {field({
            label: "Large",
            size: "lg",
            placeholder: "Roomier padding and min height",
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">States</CardTitle>
          <CardDescription>Invalid uses <span className="text-foreground">aria-invalid</span>; pair with an error message in product UIs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {field({
            label: "Disabled",
            placeholder: "Cannot edit",
            disabled: true,
          })}
          {field({
            label: "Read-only",
            placeholder: "Fixed content",
            readOnly: true,
            defaultValue: "This copy is read-only for reviewers.",
          })}
          {field({
            label: "Invalid",
            placeholder: "Fix validation errors",
            "aria-invalid": true,
            description: "Border and focus ring use destructive tokens when aria-invalid is true.",
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Controlled</CardTitle>
          <CardDescription>
            Character count example: <span className="text-foreground">{value.length}</span> / 280
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-modal-md">
            <Label htmlFor={`${baseId}-controlled`}>Post body</Label>
            <Textarea
              id={`${baseId}-controlled`}
              value={value}
              onChange={(e) => setValue(e.target.value.slice(0, 280))}
              placeholder="What do you want to say?"
              maxLength={280}
              rows={4}
            />
            <p className="text-caption text-muted-foreground">maxLength is optional; this demo caps at 280 in state.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentTextareaLab;
