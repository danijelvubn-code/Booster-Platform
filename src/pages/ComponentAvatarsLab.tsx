import { useMemo, useState } from "react";

import { COMPONENT_LAB_AUDIT_EMPTY, ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const checklistItems = [
  "24px avatar preserves circle shape and centered content",
  "32px avatar preserves circle shape and centered content",
  "40px avatar preserves circle shape and centered content",
  "Initials fallback appears when image cannot be loaded",
  "Initials stay readable in both light and dark themes",
] as const;

const avatarSizes = [
  { label: "24px", avatarClassName: "h-6 w-6", fallbackTextClassName: "pt-px text-caption-strong" },
  { label: "32px", avatarClassName: "h-8 w-8", fallbackTextClassName: "pt-px text-caption-strong" },
  { label: "40px", avatarClassName: "h-10 w-10", fallbackTextClassName: "text-label" },
] as const;

const imageBySize: Record<(typeof avatarSizes)[number]["label"], string> = {
  "24px":
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23d8b4fe'/><circle cx='32' cy='24' r='12' fill='%237c3aed'/><rect x='14' y='42' width='36' height='14' rx='7' fill='%237c3aed'/></svg>",
  "32px":
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2393c5fd'/><circle cx='32' cy='24' r='12' fill='%231d4ed8'/><rect x='14' y='42' width='36' height='14' rx='7' fill='%231d4ed8'/></svg>",
  "40px":
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2386efac'/><circle cx='32' cy='24' r='12' fill='%2315803d'/><rect x='14' y='42' width='36' height='14' rx='7' fill='%2315803d'/></svg>",
};

const initialsBySize: Record<(typeof avatarSizes)[number]["label"], string> = {
  "24px": "AL",
  "32px": "BM",
  "40px": "CJ",
};

const ComponentAvatarsLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="90/100"
      scalabilityScoreNote={
        <p>
          Default root uses semantic avatar dimensions (h-avatar / w-avatar), full rounding, and muted + text-label on
          fallback. Image fills the frame with aspect-square. No nested kit components. Optional follow-up: dedicated
          avatar size tokens if multiple product sizes should not use raw h-6 / h-8 / h-10 overrides.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Avatar root: h-avatar, w-avatar, rounded-full, relative flex, shrink-0, overflow-hidden</li>
          <li>AvatarImage: aspect-square, h-full, w-full</li>
          <li>AvatarFallback: rounded-full, bg-muted, text-label, flex, items-center, justify-center, h-full, w-full</li>
        </ul>
      }
      nestedComponents={
        <p className="text-caption text-muted-foreground">{COMPONENT_LAB_AUDIT_EMPTY}</p>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            This lab overrides size with h-6 / h-8 / h-10 and custom fallback typography classes — not defined in
            avatar.tsx; only the default size token exists in the design system today.
          </li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to="/overview">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Avatars</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manual test surface for avatar sizing and image-to-initials fallback behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Size + Fallback Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {avatarSizes.map((size) => (
            <div key={size.label} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-label">{size.label}</p>
                <Badge variant="outline" className="text-caption">
                  {size.label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-2">
                  <p className="text-caption text-muted-foreground">Image</p>
                  <Avatar className={size.avatarClassName}>
                    <AvatarImage src={imageBySize[size.label]} alt={`${size.label} avatar`} />
                    <AvatarFallback className={size.fallbackTextClassName}>IMG</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <p className="text-caption text-muted-foreground">Initials fallback</p>
                  <Avatar className={size.avatarClassName}>
                    <AvatarImage src="/__avatar_fallback_test__.png" alt={`${size.label} fallback avatar`} />
                    <AvatarFallback className={size.fallbackTextClassName}>
                      {initialsBySize[size.label]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manual QA Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={!!checked[item]}
                onCheckedChange={(next) => setChecked((prev) => ({ ...prev, [item]: !!next }))}
              />
              <span>{item}</span>
            </label>
          ))}
          <p className="pt-2 text-xs text-muted-foreground">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentAvatarsLab;
