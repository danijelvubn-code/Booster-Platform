import { useMemo, useState } from "react";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, Loader2, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const checklistItems = [
  "Dialog opens from trigger",
  "Focus is trapped while dialog is open",
  "Esc closes dialog",
  "Cancel closes without side effects",
  "Action style matches destructive/warning/info intent",
  "Keyboard tab order is logical",
  "Light and dark contrast are readable",
] as const;

const ComponentAlertDialogLab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loadingScenario, setLoadingScenario] = useState(false);

  const completedCount = useMemo(
    () => checklistItems.filter((item) => checked[item]).length,
    [checked],
  );

  return (
    <ComponentLabPageShell
      scalabilityScoreValue="78/100"
      scalabilityScoreNote={
        <p>
          Overlay, modal width, typography, and motion largely use tokens; actions compose the shared Button
          system. Remaining work: replace percentage-based centering and slide keyframe positions with shared layout
          tokens where possible, and keep action variant overrides in labs aligned with Button tokens.
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Overlay: bg-overlay-scrim, fade in/out</li>
          <li>Content: bg-background, border, shadow-lg, max-w-modal-md, gap-4, p-6, sm:rounded-lg</li>
          <li>Typography: text-h3 (title), text-body-sm + text-muted-foreground (description)</li>
          <li>Motion: duration-200, ease-standard, zoom / slide / fade enter-exit animations</li>
          <li>Layout: grid, fixed positioning stack, flex header/footer patterns, space-y-2, sm:space-x-2</li>
          <li>Cancel: outline button variant via buttonVariants + responsive mt-2 sm:mt-0</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("buttons")}>
              Button
            </Link>
            {" — "}
            <span className="text-muted-foreground">
              AlertDialogAction and AlertDialogCancel use buttonVariants(); non-token / variant details are owned by the
              Buttons lab audit.
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Content: left-[50%], top-[50%], translate-x-[-50%], translate-y-[-50%] (percentage centering, not spacing tokens)</li>
          <li>Content: slide animations use top-[48%] for enter/exit offsets</li>
          <li>Lab demos: pass-through className on AlertDialogAction (e.g. bg-destructive) — intent-specific, not in the primitive file</li>
        </ul>
      }
    >
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link to={postMvpPath("/overview")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Components - Alert Dialog</h1>
          <Badge variant="warning" className="text-xs">
            Temporary
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Manual test surface for Alert Dialog variants, actions, and behavior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scenario Matrix</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" leadingIcon={<Trash2 className="h-4 w-4" />}>
                Delete Record
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this record?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone and will permanently remove the selected item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="warning" leadingIcon={<ShieldAlert className="h-4 w-4" />}>
                Promote to Production
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Promote deployment?</AlertDialogTitle>
                <AlertDialogDescription>
                  This routes live traffic to the selected deployment. Confirm before continuing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-warning text-warning-foreground hover:bg-warning/90">
                  Confirm Promote
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button leadingIcon={<Info className="h-4 w-4" />}>
                Run with Loading Action
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Execute operation?</AlertDialogTitle>
                <AlertDialogDescription>
                  This scenario is used to validate loading visuals while confirming an operation.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setLoadingScenario(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    setLoadingScenario(true);
                    setTimeout(() => setLoadingScenario(false), 1200);
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    {loadingScenario && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loadingScenario ? "Running..." : "Run Operation"}
                  </span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Long Content Scenario</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Review before continuing</AlertDialogTitle>
                <AlertDialogDescription>
                  This dialog intentionally uses a longer description to validate readability, spacing, and wrapping behavior
                  across viewport sizes. Ensure the description remains clear, lines do not overflow, and action buttons stay
                  reachable without layout breakage.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">Low Emphasis Trigger</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Low emphasis action</AlertDialogTitle>
                <AlertDialogDescription>
                  Use this to validate that a ghost trigger can still open dialog content correctly.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction>Okay</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
          <p className="text-xs text-muted-foreground pt-2">
            Completed: {completedCount}/{checklistItems.length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage Guidance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Use <strong className="text-foreground">destructive</strong> for irreversible actions (delete/remove).
          </p>
          <p>
            Use <strong className="text-foreground">warning</strong> for risky but reversible actions.
          </p>
          <p>
            Use <strong className="text-foreground">info/default</strong> for neutral confirmation flows.
          </p>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentAlertDialogLab;
