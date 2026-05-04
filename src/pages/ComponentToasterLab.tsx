import { Link } from "react-router-dom";
import { postMvpPath, dsLabPath } from "@/config/prototype-shell";

import { ComponentLabPageShell } from "@/components/dev/ComponentLabPageShell";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ComponentToasterLab = () => {
  return (
    <ComponentLabPageShell
      scalabilityScoreValue="82/100"
      scalabilityScoreNote={
        <p>
          Thin host: reads the useToast queue, wraps everything in ToastProvider, maps each item to a Toast root with
          title/description in a grid, optional action slot, and ToastClose, then renders ToastViewport once. Visual design
          and variants come from toast.tsx — this file only wires data flow and layout (grid gap-1).
        </p>
      }
      tokens={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Inner content wrapper: grid gap-1 for title and description stack</li>
          <li>All surface, viewport, and motion tokens live on Toast* primitives — not redefined here</li>
        </ul>
      }
      nestedComponents={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>
            <Link className="font-medium text-primary underline-offset-4 hover:underline" to={dsLabPath("toast")}>
              Toast (Radix)
            </Link>
            {" — "}
            <span className="text-muted-foreground">
              ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport imported from toast.tsx.
            </span>
          </li>
        </ul>
      }
      otherValues={
        <ul className="list-disc space-y-1 pl-4 text-caption text-muted-foreground">
          <li>Depends on useToast from @/hooks/use-toast for queue state</li>
          <li>Sonner Toaster is a separate host; app root typically mounts both (see project docs)</li>
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
          <h1 className="text-2xl font-bold">Components - Toaster</h1>
          <Badge variant="warning">Temporary</Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">
          The <span className="text-foreground">Toaster</span> host (<span className="text-foreground">src/components/ui/toaster.tsx</span>)
          mounts <span className="text-foreground">ToastProvider</span>, renders each queued item as a <span className="text-foreground">Toast</span>, and
          provides <span className="text-foreground">ToastViewport</span> for placement. It is included once in the app root next to the Sonner host — see{" "}
          <span className="text-foreground">docs/Toast-and-Sonner.md</span>.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Where it lives</CardTitle>
          <CardDescription>
            <span className="text-foreground">App.tsx</span> renders <span className="text-foreground">&lt;Toaster /&gt;</span> from{" "}
            <span className="text-foreground">@/components/ui/toaster</span>. Notifications are enqueued with{" "}
            <span className="text-foreground">toast()</span> from <span className="text-foreground">@/hooks/use-toast</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" asChild>
            <Link to={dsLabPath("toast")}>Toast API &amp; variants</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Smoke test</CardTitle>
          <CardDescription>Confirms the mounted Toaster receives enqueued toasts (same API as the Toast lab).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => toast({ title: "Toaster is receiving events." })}>
            Ping
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                variant: "success",
                title: "Queue OK",
                description: "Radix Toaster rendered this notice.",
              })
            }
          >
            Success variant
          </Button>
        </CardContent>
      </Card>
    </div>
  </ComponentLabPageShell>
  );
};

export default ComponentToasterLab;
