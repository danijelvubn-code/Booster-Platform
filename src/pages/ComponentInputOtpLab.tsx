import { useId, useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/input";

const checklistItems = [
  "Digits paste across slots as one string",
  "Focus ring visible on the active cell (keyboard)",
  "Disabled state dims the control and blocks input",
  "Separator pattern keeps visual grouping clear",
] as const;

const ComponentInputOtpLab = () => {
  const id = useId();
  const basicId = `${id}-basic`;
  const groupedId = `${id}-grouped`;
  const disabledId = `${id}-disabled`;

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [basicValue, setBasicValue] = useState("");
  const [groupedValue, setGroupedValue] = useState("");

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="83/100"
      scalabilityScoreNote={
        <p>
          Built on input-otp with a tokenized slot grid: control dimensions, border-input, background, body type, focus
          ring on the active cell, and disabled opacity on the container. Separator uses a muted Dot affordance. No other
          design-system components are imported in the primitive module.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>InputOTP container: flex, gap-2, has-[:disabled] opacity token, disabled cursor</li>
          <li>InputOTPGroup: flex row alignment for slot runs</li>
          <li>InputOTPSlot: h-control-sm w-control-sm, border-input, bg-background, text-body-sm, first/last rounding, active ring-ring ring-offset-background</li>
          <li>Fake caret: absolute overlay, animate-caret-blink, h-icon-16 w-px bg-foreground</li>
          <li>InputOTPSeparator: text-foreground/50, Dot icon at h-icon-16</li>
        </ul>
      }
      nestedComponents={COMPONENT_LAB_AUDIT_EMPTY}
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>input-otp runtime behavior (paste, patterns) and re-exported REGEXP_* helpers</li>
          <li>Caret line uses w-px — hairline width, not h-icon-*</li>
          <li>Lab uses Label from the input module and font-mono value readouts — demo-only</li>
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
          <h1 className="text-2xl font-bold">Components - Input OTP</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-foreground/75">
          One-time code entry with per-character slots, paste support, and optional grouping separators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Six digits</CardTitle>
          <CardDescription>Single group, digits only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor={basicId} className="text-body-sm text-foreground">
            Verification code
          </Label>
          <InputOTP
            id={basicId}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={basicValue}
            onChange={setBasicValue}
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-caption text-foreground/75">
            Value: <span className="font-mono text-foreground">{basicValue || "—"}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grouped (3 + 3)</CardTitle>
          <CardDescription>Separator between groups for readability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor={groupedId} className="text-body-sm text-foreground">
            Code
          </Label>
          <InputOTP
            id={groupedId}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={groupedValue}
            onChange={setGroupedValue}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-caption text-foreground/75">
            Value: <span className="font-mono text-foreground">{groupedValue || "—"}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Disabled</CardTitle>
          <CardDescription>Non-interactive preview.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor={disabledId} className="text-body-sm text-muted-foreground">
            Locked
          </Label>
          <InputOTP id={disabledId} maxLength={4} pattern={REGEXP_ONLY_DIGITS} defaultValue="1234" disabled>
            <InputOTPGroup>
              {Array.from({ length: 4 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-border p-4 space-y-2">
        <p className="text-label">When to use Input OTP</p>
        <ul className="list-disc pl-5 text-body-sm text-foreground/75 space-y-1">
          <li>
            Use for <span className="text-foreground">SMS or email verification codes</span>, backup codes, or short
            numeric tokens.
          </li>
          <li>
            Pair with <span className="text-foreground">Label</span> and server-side validation; never rely on client
            pattern alone.
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

export default ComponentInputOtpLab;
